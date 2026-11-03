import json
import multiprocessing as mp
import os
import random
import re
import time
import traceback
import unicodedata
import subprocess
import ctypes
from dataclasses import dataclass
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin

from playwright.sync_api import (
    Frame,
    Locator,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    sync_playwright,
)


# ============================================================
# CONFIGURATION
# ============================================================

LOGIN_URL = "https://campus.mentoaula.com/SecureLogin/Login.aspx"

# Four active users for the 4 GB VPS.  These are the four users with the
# furthest durable progress in the supplied v9 runtime snapshot.  Each user
# still runs in a completely independent OS process/browser/session.
#
# IMPORTANT: the runtime directory name is unchanged (mentoaula_runtime), so
# existing v9 progress.json files are resumed automatically when this script is
# placed next to the previous script/runtime directory.
USERS = [
    ("EZ2696920Z", "Mentoaula6920"),
    ("KZ3076489Z", "Mentoaula6489"),
    ("GZ1779380J", "Mentoaula9380"),
]

# These globals are set separately inside each child process. Because every
# user has a dedicated process, the existing login/re-login helpers can keep
# using USERNAME/PASSWORD without any cross-user race conditions.
USERNAME = ""
PASSWORD = ""

HEADLESS = False

# SCORM popup/window sizing.
#
# IMPORTANT: use the operating system/Chromium MAXIMIZED state instead of
# calculating a size from JavaScript screen.availWidth/availHeight. On some
# Windows scaling / multi-monitor setups Chrome reports a much smaller CSS
# screen (for example 817x600) even though the native window can be much
# larger. Maximizing the real Chromium window avoids that problem.
#
# `no_viewport=True` is also enabled in main() so the SCORM page viewport
# follows the real native window size instead of Playwright forcing a fixed
# emulated viewport.
SCORM_MAXIMIZE_RETRY_SECONDS = 3

# Units 1-5
@dataclass(frozen=True)
class CourseUnit:
    number: int
    heading_selector: str
    body_selector: str
    content_name: str


COURSE_UNITS = [
    CourseUnit(1, "#tod02", "#udpanel02", "Contenido unidad 1"),
    CourseUnit(2, "#tod03", "#udpanel03", "Contenido unidad 2"),
    CourseUnit(3, "#tod04", "#udpanel04", "Contenido unidad 3"),
    CourseUnit(4, "#tod05", "#udpanel05", "Contenido unidad 4"),
    CourseUnit(5, "#tod06", "#udpanel06", "Contenido unidad 5"),
]

# SCORM navigation
NEXT_ARROW_PATH = "M8 4L14 10L8 16"

# Some iSpring slides contain a required "¡Vamos a empezar!" control.
# The older working scripts clicked the visible button image (#img1_...).
# Keep that proven path FIRST, then fall back to text/DOM/core invocation.
REQUIRED_START_TEXT_PATTERN = re.compile(
    # iSpring sometimes renders the label normally ("Vamos a empezar") and
    # sometimes with literal spaces between letters ("V a m o s  a ...").
    r"v\s*a\s*m\s*o\s*s\s+a\s+e\s*m\s*p\s*e\s*z\s*a\s*r",
    re.IGNORECASE,
)

# Exact selector observed in the working iSpring package.
LEGACY_REQUIRED_START_IMAGE_SELECTOR = "#img1_186a02e"

# Same iSpring image number, but tolerate a republished slide suffix.
REQUIRED_START_IMAGE_PREFIX_SELECTOR = "img[id^='img1_']"

# Video play icon used by the existing course.
VIDEO_PLAY_ICON_SELECTOR = "svg[data-play-icon='true']"

# Small pause after a slide loads.
# This is only for stability, not human-like pacing.
SLIDE_PAUSE_SECONDS = 1

# If a video/animation temporarily disables Next, allow enough time
# for the button to become available.
NEXT_WAIT_SECONDS = 360

# ------------------------------------------------------------
# COURSE PACING / DWELL TIMES
# ------------------------------------------------------------
# Pacing model:
#   * while a slide is actively being processed, it gets ONLY 20-30 seconds;
#   * video slides retain the previously requested 5-minute video dwell;
#   * the long 37.5-41h pacing share is NOT waited before Next/Vamos anymore;
#     it is waited only AFTER that slide has successfully completed/advanced,
#     i.e. as an inter-slide pause;
#   * the final slide of a unit is paced only AFTER LMSFinish + popup close, on
#     the main course page;
#   * any small final remainder is waited after all five slide decks are done.
#
# The target is still absolute wall-clock time and is persisted across worker
# restarts. Existing v9 paced_slides remain valid: they simply mean that slide's
# long pacing share has already been paid.
MIN_SLIDE_VIEW_SECONDS = 20
MAX_SLIDE_VIEW_SECONDS = 30
VIDEO_WAIT_SECONDS = 300

MIN_FLOW_HOURS = 37.5
MAX_FLOW_HOURS = 41.0
FLOW_ENDPOINT_MARGIN_SECONDS = 180  # 3 minutes at each end
PACE_JITTER_MIN = 0.92
PACE_JITTER_MAX = 1.08
PACE_KEEPALIVE_SECONDS = 300
PACE_PROGRESS_LOG_SECONDS = 1800

# Session-expiry / transient SCORM recovery. A long 37.5-41 hour run can
# outlive the LMS/SCORM consumption session even while the parent course page
# still looks logged in. Recover the current unit instead of allowing the
# worker to loop on an expired overlay or terminate.
MAX_UNIT_RECOVERY_ATTEMPTS = 100
RECOVERY_RELOGIN_PAUSE_SECONDS = 2
RECOVERY_REOPEN_PAUSE_SECONDS = 2


# Durable long-run resilience / diagnostics.
# Every user owns a separate directory containing an append-only log, an
# atomic progress checkpoint, screenshots and structured diagnostic snapshots.
RUNTIME_ROOT = Path(__file__).resolve().parent / "mentoaula_runtime"
PROGRESS_VERSION = 2
MAX_WORKER_RESTARTS = 20
WORKER_RESTART_DELAY_SECONDS = 15
WORKER_MONITOR_POLL_SECONDS = 5
LOGIN_RETRY_ATTEMPTS = 5
LOGIN_RETRY_DELAY_SECONDS = 10
RECOVERY_BACKOFF_MIN_SECONDS = 3
RECOVERY_BACKOFF_MAX_SECONDS = 20

# v10 watchdog/resource safeguards. The v9 logs proved that a Playwright/Node
# process can remain alive but stop making progress after renderer/heap pressure.
HEARTBEAT_WRITE_MIN_INTERVAL_SECONDS = 10
HEARTBEAT_STALE_SECONDS = 240
HEARTBEAT_STARTUP_GRACE_SECONDS = 300
MEMORY_STATUS_LOG_SECONDS = 300
MIN_AVAILABLE_RAM_MB_FOR_RESTART = 650
LOW_MEMORY_RETRY_DELAY_SECONDS = 60

# The supplied diagnostics show the SCORM consumption session expiring at
# roughly one-hour intervals. Refreshing the SCORM launch between completed
# slides before that limit avoids many fatal overlays and also periodically
# releases Chromium renderer state.
PROACTIVE_SCORM_REFRESH_SECONDS = 38 * 60

# Set by each child process before Playwright starts.
RUNTIME_USER_DIR: Optional[Path] = None
_LAST_HEARTBEAT_MONOTONIC = 0.0

# Known totals for this exact course. Live counters override these whenever
# available, so the pacing remains tolerant of a republished unit.
EXPECTED_UNIT_SLIDES = {
    1: 31,
    2: 48,
    3: 15,
    4: 36,
    5: 39,
}


# ============================================================
# GENERAL HELPERS
# ============================================================

def _user_runtime_dir() -> Optional[Path]:
    return RUNTIME_USER_DIR


def _progress_path() -> Optional[Path]:
    directory = _user_runtime_dir()
    return directory / "progress.json" if directory is not None else None


def _session_log_path() -> Optional[Path]:
    directory = _user_runtime_dir()
    return directory / "session.log" if directory is not None else None


def _heartbeat_path() -> Optional[Path]:
    directory = _user_runtime_dir()
    return directory / "heartbeat.json" if directory is not None else None


def touch_heartbeat(note: str = "active", force: bool = False) -> None:
    """Persist a worker heartbeat used by the launcher to detect hangs."""
    global _LAST_HEARTBEAT_MONOTONIC
    path = _heartbeat_path()
    if path is None:
        return
    now_mono = time.monotonic()
    if (
        not force
        and now_mono - _LAST_HEARTBEAT_MONOTONIC
        < HEARTBEAT_WRITE_MIN_INTERVAL_SECONDS
    ):
        return
    _LAST_HEARTBEAT_MONOTONIC = now_mono
    payload = {
        "username": USERNAME,
        "pid": os.getpid(),
        "updated_at_epoch": time.time(),
        "note": str(note)[:240],
    }
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary = path.with_suffix(".json.tmp")
        temporary.write_text(
            json.dumps(payload, ensure_ascii=False, sort_keys=True),
            encoding="utf-8",
        )
        os.replace(temporary, path)
    except Exception:
        # Heartbeats must never be allowed to kill a healthy worker.
        pass


def log(message: str) -> None:
    user_prefix = f"[{USERNAME}]" if USERNAME else "[launcher]"
    line = f"[{time.strftime('%H:%M:%S')}]{user_prefix} {message}"
    print(line, flush=True)
    touch_heartbeat(message)

    path = _session_log_path()
    if path is not None:
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            with path.open("a", encoding="utf-8", newline="\n") as handle:
                handle.write(line + "\n")
        except Exception:
            # Logging must never be allowed to crash a long-running worker.
            pass


def format_duration(total_seconds: float) -> str:
    total_seconds = max(0, int(round(total_seconds)))
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"


def main_page_needs_login(page: Page) -> bool:
    try:
        user = page.locator("#usuario").first
        password = page.locator("#password").first
        return (
            user.count() > 0
            and password.count() > 0
            and user.is_visible()
            and password.is_visible()
        )
    except Exception:
        return False


def _safe_page_url(page: Optional[Page]) -> Optional[str]:
    if page is None:
        return None
    try:
        if page.is_closed():
            return "<closed>"
        return page.url
    except Exception as error:
        return f"<unavailable: {type(error).__name__}>"


def _safe_page_title(page: Optional[Page]) -> Optional[str]:
    if page is None:
        return None
    try:
        if page.is_closed():
            return "<closed>"
        return page.title()
    except Exception as error:
        return f"<unavailable: {type(error).__name__}>"


def _safe_write_json(path: Path, payload: dict) -> None:
    """Atomic JSON write so a power/process failure cannot half-write state."""
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    text = json.dumps(payload, indent=2, sort_keys=True, ensure_ascii=False)
    temporary.write_text(text, encoding="utf-8")
    os.replace(temporary, path)


def _safe_screenshot(page: Optional[Page], path: Path) -> None:
    try:
        if page is not None and not page.is_closed():
            page.screenshot(path=str(path), full_page=True, timeout=15_000)
    except Exception as error:
        log(f"Diagnostic screenshot failed ({path.name}): {type(error).__name__}: {error}")


class ScormSessionExpired(RuntimeError):
    """Raised when the SCORM player itself reports that its LMS session expired."""

    def __init__(self, counter: Optional[tuple[int, int]] = None):
        self.counter = counter
        if counter:
            detail = f" at slide {counter[0]}/{counter[1]}"
        else:
            detail = ""
        super().__init__(f"SCORM session expired{detail}.")


class RecoverableScormError(RuntimeError):
    """Transient SCORM/window error for which reopening the current unit is safe."""


class ProactiveScormRefresh(RecoverableScormError):
    """Normal maintenance refresh before the LMS' observed ~60-minute expiry."""


def _normalise_visible_text(text: str) -> str:
    text = unicodedata.normalize("NFKD", text or "")
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    return " ".join(text.casefold().split())


def scorm_session_expired(popup: Page) -> bool:
    """
    Detect the fatal MentoAula/SCORM overlay seen during long sessions:

        "La sesión ha caducado."
        "Los progresos no serán almacenados..."
        "Cierre el contenido."

    The slide remains visible behind the overlay, so relying on the slide
    counter or Next locator alone creates a false loop. Check all frames.
    """
    if popup.is_closed():
        return False

    strong_markers = (
        "la sesion ha caducado",
        "los progresos no seran almacenados",
        "vuelva a entrar al curso",
        "cierre el contenido",
    )

    for frame in popup.frames:
        try:
            body = frame.locator("body")
            if body.count() == 0:
                continue
            text = body.inner_text(timeout=1000)
            normalised = _normalise_visible_text(text)
            if "la sesion ha caducado" in normalised and any(
                marker in normalised for marker in strong_markers[1:]
            ):
                return True
        except Exception:
            continue

    return False


def raise_if_scorm_session_expired(popup: Page) -> None:
    if not scorm_session_expired(popup):
        return

    counter = None
    try:
        counter = read_slide_counter(popup)
    except Exception:
        pass

    raise ScormSessionExpired(counter)


def close_expired_scorm_content(popup: Page) -> None:
    """Best-effort click of the expired-session 'Cerrar Contenido' control."""
    if popup.is_closed():
        return

    for frame in popup.frames:
        for selector in (
            "button:has-text('Cerrar Contenido')",
            "a:has-text('Cerrar Contenido')",
            "[role='button']:has-text('Cerrar Contenido')",
            "button:has-text('Cerrar')",
            "a:has-text('Cerrar')",
        ):
            try:
                candidate = frame.locator(selector).first
                if candidate.count() and candidate.is_visible():
                    candidate.click(force=True, timeout=3000)
                    popup.wait_for_timeout(500)
                    return
            except Exception:
                continue


@dataclass
class ContentPacer:
    """
    Durable wall-clock pacer for Units 1-5.

    The finishing deadline is stored as an absolute UNIX timestamp, not a
    process-local monotonic clock. Therefore a worker/browser restart preserves
    the original 37.5-41 hour target instead of selecting a new target.
    """

    started_at_epoch: float
    target_seconds: float
    target_finish_epoch: float
    observed_totals: dict[int, int]
    paced_slides: set[tuple[int, int]]
    dwelled_slides: set[tuple[int, int]]
    video_waited_slides: set[tuple[int, int]]
    last_confirmed_slides: dict[int, int]
    completed_units: set[int]
    run_completed: bool = False

    @classmethod
    def create(cls) -> "ContentPacer":
        minimum = MIN_FLOW_HOURS * 3600 + FLOW_ENDPOINT_MARGIN_SECONDS
        maximum = MAX_FLOW_HOURS * 3600 - FLOW_ENDPOINT_MARGIN_SECONDS
        target_seconds = random.uniform(minimum, maximum)
        started = time.time()

        pacer = cls(
            started_at_epoch=started,
            target_seconds=target_seconds,
            target_finish_epoch=started + target_seconds,
            observed_totals={},
            paced_slides=set(),
            dwelled_slides=set(),
            video_waited_slides=set(),
            last_confirmed_slides={},
            completed_units=set(),
            run_completed=False,
        )
        pacer.save()
        log(
            "Units 1-5 target duration selected: "
            f"{target_seconds / 3600:.2f} hours "
            f"({format_duration(target_seconds)})."
        )
        return pacer

    @classmethod
    def load_or_create(cls) -> "ContentPacer":
        path = _progress_path()
        if path is None or not path.exists():
            return cls.create()

        try:
            raw = json.loads(path.read_text(encoding="utf-8"))
            if int(raw.get("version", 0)) != PROGRESS_VERSION:
                raise ValueError(
                    f"unsupported progress version {raw.get('version')}"
                )

            pacer = cls(
                started_at_epoch=float(raw["started_at_epoch"]),
                target_seconds=float(raw["target_seconds"]),
                target_finish_epoch=float(raw["target_finish_epoch"]),
                observed_totals={
                    int(k): int(v) for k, v in raw.get("observed_totals", {}).items()
                },
                paced_slides={
                    (int(item[0]), int(item[1]))
                    for item in raw.get("paced_slides", [])
                },
                dwelled_slides={
                    (int(item[0]), int(item[1]))
                    for item in raw.get("dwelled_slides", [])
                },
                video_waited_slides={
                    (int(item[0]), int(item[1]))
                    for item in raw.get("video_waited_slides", [])
                },
                last_confirmed_slides={
                    int(k): int(v)
                    for k, v in raw.get("last_confirmed_slides", {}).items()
                },
                completed_units={int(v) for v in raw.get("completed_units", [])},
                run_completed=bool(raw.get("run_completed", False)),
            )

            log(
                "Loaded durable progress checkpoint: "
                f"completed units={sorted(pacer.completed_units)}, "
                f"last confirmed={pacer.last_confirmed_slides}, "
                f"target remaining={format_duration(pacer.remaining_seconds())}."
            )
            if pacer.target_finish_epoch < time.time() and not pacer.run_completed:
                log(
                    "WARNING: persisted target finish time has already passed. "
                    "Recovery will continue safely, but the original wall-clock "
                    "37.5-41 hour window can no longer be guaranteed."
                )
            return pacer
        except Exception as error:
            # Do not silently discard potentially valuable progress. Preserve the
            # damaged file for diagnosis and start a clean state only after logging.
            backup = path.with_name(
                f"progress-corrupt-{time.strftime('%Y%m%d-%H%M%S')}.json"
            )
            try:
                path.replace(backup)
            except Exception:
                pass
            log(
                "WARNING: could not load progress checkpoint; starting a fresh "
                f"pacing state. {type(error).__name__}: {error}"
            )
            return cls.create()

    def to_dict(self) -> dict:
        return {
            "version": PROGRESS_VERSION,
            "username": USERNAME,
            "started_at_epoch": self.started_at_epoch,
            "target_seconds": self.target_seconds,
            "target_finish_epoch": self.target_finish_epoch,
            "observed_totals": self.observed_totals,
            "paced_slides": sorted([list(v) for v in self.paced_slides]),
            "dwelled_slides": sorted([list(v) for v in self.dwelled_slides]),
            "video_waited_slides": sorted([list(v) for v in self.video_waited_slides]),
            "last_confirmed_slides": self.last_confirmed_slides,
            "completed_units": sorted(self.completed_units),
            "run_completed": self.run_completed,
            "updated_at_epoch": time.time(),
        }

    def save(self) -> None:
        path = _progress_path()
        if path is None:
            return
        try:
            _safe_write_json(path, self.to_dict())
        except Exception as error:
            # Losing a checkpoint is serious enough to surface, but not serious
            # enough to kill an otherwise healthy SCORM session.
            log(f"WARNING: progress checkpoint write failed: {type(error).__name__}: {error}")

    def elapsed_seconds(self) -> float:
        return max(0.0, time.time() - self.started_at_epoch)

    def remaining_seconds(self) -> float:
        return max(0.0, self.target_finish_epoch - time.time())

    def register_counter(self, unit_number: int, counter: tuple[int, int]) -> None:
        _current, total = counter
        if total > 0 and self.observed_totals.get(unit_number) != total:
            self.observed_totals[unit_number] = total
            self.save()

    def confirm_counter(self, unit_number: int, counter: tuple[int, int]) -> None:
        _current, total = counter
        changed = False
        if total > 0 and self.observed_totals.get(unit_number) != total:
            self.observed_totals[unit_number] = total
            changed = True

        current, _total = counter
        previous = self.last_confirmed_slides.get(unit_number, 0)
        if current > previous:
            self.last_confirmed_slides[unit_number] = current
            changed = True

        if changed:
            self.save()

    def checkpoint_for_unit(self, unit_number: int) -> int:
        return max(1, self.last_confirmed_slides.get(unit_number, 1))

    def mark_dwelled(self, unit_number: int, slide: int) -> None:
        key = (unit_number, slide)
        if key not in self.dwelled_slides:
            self.dwelled_slides.add(key)
            self.save()

    def mark_video_waited(self, unit_number: int, slide: int) -> None:
        key = (unit_number, slide)
        if key not in self.video_waited_slides:
            self.video_waited_slides.add(key)
            self.save()

    def mark_paced(self, unit_number: int, slide: int) -> None:
        key = (unit_number, slide)
        if key not in self.paced_slides:
            self.paced_slides.add(key)
            self.save()

    def mark_unit_completed(self, unit_number: int) -> None:
        if unit_number not in self.completed_units:
            self.completed_units.add(unit_number)
            self.save()

    def mark_run_completed(self) -> None:
        self.run_completed = True
        self.save()

    def remaining_slide_slots(
        self,
        unit_number: int,
        current_slide: int,
        current_total: int,
    ) -> int:
        self.observed_totals[unit_number] = current_total
        slots = max(1, current_total - current_slide + 1)

        for future_unit in range(unit_number + 1, 6):
            if future_unit in self.completed_units:
                continue
            slots += self.observed_totals.get(
                future_unit,
                EXPECTED_UNIT_SLIDES[future_unit],
            )
        return max(1, slots)

    def extra_delay_for_slide(
        self,
        unit_number: int,
        current_slide: int,
        current_total: int,
    ) -> float:
        key = (unit_number, current_slide)
        if key in self.paced_slides:
            return 0.0

        remaining = self.remaining_seconds()
        if remaining <= 0:
            return 0.0

        slots = self.remaining_slide_slots(
            unit_number,
            current_slide,
            current_total,
        )

        if slots <= 1:
            return remaining

        ideal = remaining / slots
        delay = ideal * random.uniform(PACE_JITTER_MIN, PACE_JITTER_MAX)
        reserved_for_future = MIN_SLIDE_VIEW_SECONDS * (slots - 1)
        maximum_now = max(0.0, remaining - reserved_for_future)
        return max(0.0, min(delay, maximum_now))



def login(page: Page) -> None:
    log("Opening login page...")

    page.goto(
        LOGIN_URL,
        wait_until="domcontentloaded",
        timeout=60_000,
    )

    page.locator("#usuario").wait_for(
        state="visible",
        timeout=20_000,
    )

    page.locator("#password").wait_for(
        state="visible",
        timeout=20_000,
    )

    page.locator("#btnLogin").wait_for(
        state="visible",
        timeout=20_000,
    )

    page.locator("#usuario").fill(USERNAME)
    page.locator("#password").fill(PASSWORD)

    log("Logging in...")

    page.locator("#btnLogin").click(
        no_wait_after=True,
        timeout=20_000,
    )

    # Wait for the first course-unit heading to confirm successful login.
    page.locator(COURSE_UNITS[0].heading_selector).wait_for(
        state="attached",
        timeout=60_000,
    )

    log("Login successful.")


def login_with_retries(page: Page, reason: str = "login") -> None:
    last_error: Optional[Exception] = None
    for attempt in range(1, LOGIN_RETRY_ATTEMPTS + 1):
        try:
            login(page)
            return
        except Exception as error:
            last_error = error
            log(
                f"{reason}: login attempt {attempt}/{LOGIN_RETRY_ATTEMPTS} failed: "
                f"{type(error).__name__}: {error}"
            )
            directory = _user_runtime_dir()
            if directory is not None:
                _safe_screenshot(
                    page,
                    directory / f"login-failure-attempt-{attempt}-{time.strftime('%Y%m%d-%H%M%S')}.png",
                )
            if attempt < LOGIN_RETRY_ATTEMPTS:
                page.wait_for_timeout(LOGIN_RETRY_DELAY_SECONDS * 1000)

    raise RuntimeError(
        f"{reason}: login failed after {LOGIN_RETRY_ATTEMPTS} attempts: {last_error}"
    ) from last_error


def close_first_login_tour(page: Page) -> None:
    """Close Mentoaula's introductory tour if it appears."""

    button = page.locator("#my-tour-button-finish")

    try:
        button.wait_for(
            state="visible",
            timeout=3_000,
        )

        log("Closing first-login tour...")
        button.click()

    except PlaywrightTimeoutError:
        pass


def handle_time_remaining_modal(page: Page) -> None:
    """Clicks 'Sí, continuar' if Mentoaula displays its session warning."""

    try:
        dialogs = page.locator(
            ".ui-dialog:visible, [role='dialog']:visible"
        )

        for index in range(dialogs.count()):
            dialog = dialogs.nth(index)

            try:
                text = dialog.inner_text()
            except Exception:
                continue

            if "Aviso de tiempo restante" not in text:
                continue

            log("Time remaining warning detected.")

            selectors = [
                "button:has-text('Sí, continuar')",
                "button:has-text('Si, continuar')",
                "input[value*='continuar']",
                "a:has-text('Sí, continuar')",
                "a:has-text('Si, continuar')",
            ]

            for selector in selectors:
                button = dialog.locator(selector).first

                try:
                    if button.count() and button.is_visible():
                        button.click(force=True)
                        log("Clicked 'Sí, continuar'.")
                        return
                except Exception:
                    continue

    except Exception:
        pass


# ============================================================
# OPEN COURSE UNIT
# ============================================================

def expand_unit(page: Page, unit: CourseUnit) -> None:
    body = page.locator(unit.body_selector).first

    if body.count() and body.is_visible():
        return

    log(f"Opening Unit {unit.number} panel...")

    heading = page.locator(unit.heading_selector).first

    heading.wait_for(
        state="visible",
        timeout=20_000,
    )

    heading.scroll_into_view_if_needed()
    heading.click()

    body.wait_for(
        state="visible",
        timeout=20_000,
    )


def extract_content_url(
    link: Locator,
    base_url: str,
) -> Optional[str]:
    """
    Extract URL from href or JavaScript window.open().
    """

    onclick = link.get_attribute("onclick") or ""
    href = link.get_attribute("href") or ""

    match = re.search(
        r"window\.open\(\s*['\"]([^'\"]+)",
        onclick,
    )

    if match:
        return urljoin(base_url, match.group(1))

    if href and not href.startswith(
        ("#", "javascript:")
    ):
        return urljoin(base_url, href)

    return None



def resize_scorm_popup(popup: Page) -> None:
    """
    Maximize the REAL Chromium window that owns the SCORM popup.

    This deliberately does not derive a pixel size from JavaScript
    ``screen.availWidth``. Chromium can report CSS-screen dimensions that are
    much smaller than the native Windows desktop when display scaling or
    multiple monitors are involved.

    Browser.setWindowBounds(windowState="maximized") asks the operating
    system to use the largest available work area for that popup. Because the
    browser context is created with ``no_viewport=True``, the page viewport
    then grows with the native window.
    """

    if popup.is_closed():
        return

    cdp = None
    try:
        cdp = popup.context.new_cdp_session(popup)
        window_info = cdp.send("Browser.getWindowForTarget")
        window_id = window_info["windowId"]

        # Chromium accepts a state change without explicit dimensions.
        cdp.send(
            "Browser.setWindowBounds",
            {
                "windowId": window_id,
                "bounds": {"windowState": "maximized"},
            },
        )

        popup.wait_for_timeout(750)

        bounds = cdp.send(
            "Browser.getWindowBounds",
            {"windowId": window_id},
        ).get("bounds", {})

        metrics = popup.evaluate(
            """
            () => ({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                screenWidth: screen.width,
                screenHeight: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight
            })
            """
        )

        log(
            "SCORM popup MAXIMIZED via Chromium: "
            f"bounds={bounds.get('width')}x{bounds.get('height')} "
            f"at ({bounds.get('left')},{bounds.get('top')}), "
            f"viewport={metrics.get('innerWidth')}x{metrics.get('innerHeight')}, "
            f"outer={metrics.get('outerWidth')}x{metrics.get('outerHeight')}."
        )
        return

    except Exception as cdp_error:
        log(
            "Chromium maximize unavailable; trying DOM maximize fallback: "
            f"{cdp_error}"
        )
    finally:
        if cdp is not None:
            try:
                cdp.detach()
            except Exception:
                pass

    # Fallback for non-Chromium-like environments. This path is not normally
    # expected to run, but keeping it makes the script tolerant of CDP failure.
    try:
        result = popup.evaluate(
            """
            () => {
                try {
                    window.moveTo(0, 0);
                    window.resizeTo(screen.availWidth, screen.availHeight);
                    return {
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                        outerWidth: window.outerWidth,
                        outerHeight: window.outerHeight
                    };
                } catch (e) {
                    return { error: String(e) };
                }
            }
            """
        )
        popup.wait_for_timeout(500)
        log(
            "SCORM popup DOM fallback result: "
            f"viewport={result.get('innerWidth')}x{result.get('innerHeight')}, "
            f"outer={result.get('outerWidth')}x{result.get('outerHeight')}."
        )
    except Exception as error:
        log(f"Could not maximize SCORM popup: {error}")


def open_unit_content(page: Page, unit: CourseUnit) -> Page:
    handle_time_remaining_modal(page)
    try:
        expand_unit(page, unit)

        link = (
            page.locator(f"{unit.body_selector} a")
            .filter(has_text=unit.content_name)
            .first
        )

        link.wait_for(
            state="visible",
            timeout=20_000,
        )

        link.scroll_into_view_if_needed()
    except PlaywrightTimeoutError as error:
        raise RecoverableScormError(
            f"Timed out locating/opening {unit.content_name}: {error}"
        ) from error

    direct_url = extract_content_url(
        link,
        page.url,
    )

    pages_before = set(
        id(candidate)
        for candidate in page.context.pages
    )

    log(f"Opening '{unit.content_name}'...")

    try:
        with page.expect_popup(timeout=20_000) as popup_info:
            link.click()

        popup = popup_info.value

    except PlaywrightTimeoutError:
        log(
            "Popup event was not detected. "
            "Checking existing browser pages..."
        )

        popup = None

        for candidate in page.context.pages:
            if (
                candidate is not page
                and id(candidate) not in pages_before
                and not candidate.is_closed()
            ):
                popup = candidate
                break

        # Last fallback: use course-provided launch URL.
        if popup is None and direct_url:
            log(
                "Opening course-provided SCORM URL directly..."
            )

            popup = page.context.new_page()

            popup.goto(
                direct_url,
                wait_until="domcontentloaded",
                timeout=60_000,
            )

    if popup is None:
        raise RecoverableScormError(
            f"Could not open {unit.content_name}."
        )

    try:
        popup.wait_for_load_state(
            "domcontentloaded",
            timeout=60_000,
        )
    except PlaywrightTimeoutError:
        pass

    # A stale LMS session can redirect the launch popup itself to Login even
    # though a popup was successfully created. Treat that as recoverable so
    # the unit wrapper can re-authenticate and retry immediately.
    if main_page_needs_login(popup):
        try:
            popup.close()
        except Exception:
            pass
        raise RecoverableScormError(
            f"{unit.content_name} launch redirected to the login page."
        )

    if main_page_needs_login(page):
        try:
            popup.close()
        except Exception:
            pass
        raise RecoverableScormError(
            f"Main LMS session expired while launching {unit.content_name}."
        )

    # Make every Unit 1-5 SCORM content popup larger before slide processing.
    resize_scorm_popup(popup)
    popup.wait_for_timeout(300)

    raise_if_scorm_session_expired(popup)
    log(f"{unit.content_name} opened.")

    return popup


# ============================================================
# SCORM SLIDE DETECTION
# ============================================================

def read_slide_counter(
    popup: Page,
) -> Optional[tuple[int, int]]:
    """
    Searches every SCORM frame for counters such as:

        1 de 31
        2 de 31
        ...
        31 de 31

    Returns:
        (current_slide, total_slides)

    Example:
        (5, 31)
    """

    pattern = re.compile(
        r"\b(\d+)\s+de\s+(\d+)\b",
        re.IGNORECASE,
    )

    for frame in popup.frames:

        try:
            body = frame.locator("body")

            if body.count() == 0:
                continue

            text = body.inner_text(
                timeout=2_000,
            )

            matches = pattern.findall(text or "")

            for current_text, total_text in matches:

                current = int(current_text)
                total = int(total_text)

                # Ignore obviously unrelated counters.
                if (
                    total > 1
                    and current >= 1
                    and current <= total
                    and total <= 500
                ):
                    return current, total

        except Exception:
            continue

    return None


# ============================================================
# SPECIAL SLIDE CONTROLS
# ============================================================

def find_clickable_parent(
    element: Locator,
    require_visible: bool = True,
) -> Locator:
    """
    Return the nearest clickable ancestor.

    iSpring often gives the <a> itself a zero-sized box while an absolutely
    positioned child <span>/<img> is visible.  For DOM-triggered clicks we
    therefore sometimes need the clickable ancestor even when Playwright does
    not consider that ancestor directly visible.
    """

    try:
        clickable = element.locator(
            "xpath=ancestor::*["
            "self::button or "
            "self::a or "
            "@role='button' or "
            "@onclick"
            "][1]"
        )

        if clickable.count() > 0:
            candidate = clickable.first

            if not require_visible or candidate.is_visible():
                return candidate

    except Exception:
        pass

    return element


def _compact_visible_text(value: str) -> str:
    """Normalize iSpring text so letter-spacing in the DOM cannot hide labels."""

    normalized = unicodedata.normalize("NFD", value or "")
    normalized = "".join(
        ch for ch in normalized
        if unicodedata.category(ch) != "Mn"
    )

    # Keep only letters/digits.  Therefore all of these become the same key:
    #   "¡Vamos a empezar!"
    #   "¡V a m o s  a  e m p e z a r!"
    #   "VAMOS\nA\nEMPEZAR"
    return "".join(ch.lower() for ch in normalized if ch.isalnum())


def visible_vamos_text_in_frame(
    frame: Frame,
) -> Optional[Locator]:
    """
    Return a visible element containing the '¡Vamos a empezar!' label.

    Do not rely only on Playwright's has_text regex.  Some of these iSpring
    packages put literal spaces between every displayed letter, which is what
    Unit 2 does.  We compact the live DOM text before comparing it.
    """

    target = "vamosaempezar"

    selectors = [
        "span",
        "a",
        "button",
        "[role='button']",
        "[onclick]",
    ]

    # Fast path for normally rendered text.
    for selector in selectors:
        try:
            candidates = frame.locator(selector).filter(
                has_text=REQUIRED_START_TEXT_PATTERN
            )

            for index in range(candidates.count()):
                candidate = candidates.nth(index)

                if candidate.is_visible():
                    return candidate

        except Exception:
            continue

    # Strong fallback for iSpring's letter-spaced DOM text.
    for selector in selectors:
        try:
            candidates = frame.locator(selector)

            for index in range(candidates.count()):
                candidate = candidates.nth(index)

                try:
                    if not candidate.is_visible():
                        continue

                    text = candidate.text_content(timeout=1_000) or ""

                    if target in _compact_visible_text(text):
                        return candidate

                except Exception:
                    continue

        except Exception:
            continue

    return None


def find_required_start_control(
    popup: Page,
) -> Optional[Locator]:
    """
    Locate the required iSpring start control.

    Priority intentionally mirrors the older working scripts:
      1) the known visible button image;
      2) a republished img1_* button whose ancestor calls gotoSlide();
      3) the visible 'Vamos a empezar' text / its clickable ancestor.
    """

    # 1. Proven path from the older scripts: click the visible image itself.
    #    For the multi-unit runner, also require the expected visible label so
    #    an unrelated img1_* asset in another package can never be mis-clicked.
    for frame in popup.frames:
        try:
            if visible_vamos_text_in_frame(frame) is None:
                continue

            image = frame.locator(
                LEGACY_REQUIRED_START_IMAGE_SELECTOR
            ).first

            if image.count() and image.is_visible():
                return image

        except Exception:
            continue

    # 2. Tolerate a different iSpring-generated suffix, but require the image
    #    to sit inside a link/control whose inline handler contains gotoSlide.
    for frame in popup.frames:
        try:
            # Only consider generic img1_* controls on a frame that also
            # visibly contains the expected label; this avoids mistaking an
            # unrelated clickable image on another slide for the start button.
            if visible_vamos_text_in_frame(frame) is None:
                continue

            images = frame.locator(
                REQUIRED_START_IMAGE_PREFIX_SELECTOR
            )

            for index in range(images.count()):
                image = images.nth(index)

                if not image.is_visible():
                    continue

                clickable = image.locator(
                    "xpath=ancestor::*[contains(@onclick, 'gotoSlide')][1]"
                )

                if clickable.count() > 0:
                    return image

        except Exception:
            continue

    # 3. Text fallback.  Do NOT require the enclosing <a> to have a non-zero
    #    Playwright bounding box; iSpring commonly positions the child text
    #    absolutely and leaves the link itself effectively zero-sized.
    for frame in popup.frames:
        text_node = visible_vamos_text_in_frame(frame)

        if text_node is None:
            continue

        # Return the visible text node itself.  A physical click on the child
        # bubbles to the enclosing iSpring <a>, and unlike that <a> the child
        # normally has a real bounding box.  Attempt 2 below can still climb
        # to the clickable ancestor for a direct DOM click().
        return text_node

    return None


def required_start_control_is_visible(
    popup: Page,
) -> bool:
    """True while the visible 'Vamos a empezar' slide is still on screen."""

    for frame in popup.frames:
        try:
            exact = frame.locator(
                LEGACY_REQUIRED_START_IMAGE_SELECTOR
            ).first

            if exact.count() and exact.is_visible():
                return True
        except Exception:
            pass

        try:
            if visible_vamos_text_in_frame(frame) is not None:
                return True
        except Exception:
            pass

    return False


def wait_for_required_start_result(
    popup: Page,
    old_counter: Optional[tuple[int, int]],
    timeout_seconds: float = 4.0,
) -> tuple[bool, Optional[tuple[int, int]]]:
    """
    After a start-button activation, confirm success either because the live
    counter advanced or because the visible 'Vamos a empezar' control vanished.
    """

    deadline = time.monotonic() + timeout_seconds
    last_counter = read_slide_counter(popup)

    while time.monotonic() < deadline:
        last_counter = read_slide_counter(popup)

        if (
            old_counter is not None
            and last_counter is not None
            and last_counter[0] != old_counter[0]
        ):
            return True, last_counter

        if not required_start_control_is_visible(popup):
            # The old slide disappeared even if the counter is still updating.
            return True, last_counter

        popup.wait_for_timeout(200)

    return False, last_counter


def invoke_vamos_core_directly(
    popup: Page,
) -> Optional[dict]:
    """
    Last-resort iSpring fallback.

    The supplied HTML uses an inline handler equivalent to:
        core.processTriggerEffect(this)
        core.gotoSlide(2, this)

    This function extracts the target from the live DOM and calls the same
    iSpring core API directly, without hard-coding the generated coreSpr_* ID.
    """

    script = r"""
    () => {
        const normalize = (value) => (value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // iSpring can store the visible label as "V a m o s  a ...".
            // Remove every non-alphanumeric character before comparing.
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();

        const visible = (el) => {
            if (!el) return false;
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return style.display !== "none" &&
                   style.visibility !== "hidden" &&
                   rect.width > 0 && rect.height > 0;
        };

        const textNodes = Array.from(
            document.querySelectorAll("span, a, button, [role='button'], [onclick]")
        );

        const textEl = textNodes.find((el) =>
            visible(el) && normalize(el.textContent).includes("vamosaempezar")
        );

        if (!textEl) {
            return {found: false, reason: "visible text not found"};
        }

        const clickable = textEl.closest(
            "a[onclick], button[onclick], [role='button'][onclick], [onclick], a, button, [role='button']"
        ) || textEl;

        const onclick = clickable.getAttribute("onclick") || "";
        const targetMatch = onclick.match(/gotoSlide\(\s*(\d+)/i);
        const coreIdMatch = onclick.match(
            /getElementById\(\s*['\"]([^'\"]+)['\"]\s*\)\.getCore\(\)/i
        );

        if (!targetMatch) {
            return {
                found: true,
                reason: "gotoSlide target not present in onclick",
                id: clickable.id || "",
                onclick: onclick
            };
        }

        const target = Number(targetMatch[1]);
        const possibleCoreNodes = [];

        if (coreIdMatch) {
            const exactCoreNode = document.getElementById(coreIdMatch[1]);
            if (exactCoreNode) possibleCoreNodes.push(exactCoreNode);
        }

        for (const node of document.querySelectorAll("[id^='coreSpr_']")) {
            if (!possibleCoreNodes.includes(node)) {
                possibleCoreNodes.push(node);
            }
        }

        for (const coreNode of possibleCoreNodes) {
            try {
                if (typeof coreNode.getCore !== "function") continue;
                const core = coreNode.getCore();
                if (!core || typeof core.gotoSlide !== "function") continue;

                if (typeof core.processTriggerEffect === "function") {
                    try { core.processTriggerEffect(clickable); } catch (e) {}
                }

                core.gotoSlide(target, clickable);

                return {
                    found: true,
                    invoked: true,
                    target: target,
                    coreId: coreNode.id || "",
                    clickableId: clickable.id || ""
                };
            } catch (e) {}
        }

        return {
            found: true,
            invoked: false,
            target: target,
            reason: "iSpring core object not callable",
            onclick: onclick
        };
    }
    """

    for frame in popup.frames:
        try:
            result = frame.evaluate(script)

            if result and result.get("found"):
                return result

        except Exception:
            continue

    return None


def click_required_start_control(
    popup: Page,
    old_counter: Optional[tuple[int, int]] = None,
) -> tuple[bool, Optional[tuple[int, int]]]:
    """
    Robustly activate '¡Vamos a empezar!'.

    Returns:
        (detected, resulting_counter)

    If the special control is detected but every activation method fails, this
    raises immediately instead of sitting for NEXT_WAIT_SECONDS on that slide.
    """

    control = find_required_start_control(popup)

    if control is None:
        return False, old_counter

    log("'Vamos a empezar' control detected.")

    try:
        debug_id = control.get_attribute("id") or "<no id>"
        debug_text = (control.text_content(timeout=1_000) or "").strip()
        log(
            "Start control match: "
            f"id={debug_id}, text={debug_text!r}"
        )
    except Exception:
        pass

    # --------------------------------------------------------
    # Attempt 1: older proven behavior -- physical click on the
    # visible image/text element so the event bubbles to its <a>.
    # --------------------------------------------------------
    try:
        try:
            control.scroll_into_view_if_needed()
        except Exception:
            pass

        log("Trying normal/forced click on the in-slide control...")

        try:
            control.click(timeout=5_000)
        except Exception:
            control.click(timeout=5_000, force=True)

        succeeded, new_counter = wait_for_required_start_result(
            popup,
            old_counter,
            timeout_seconds=4.0,
        )

        if succeeded:
            return True, new_counter

    except Exception as error:
        log(
            "Physical click did not complete the transition: "
            f"{type(error).__name__}: {error}"
        )

    # --------------------------------------------------------
    # Attempt 2: execute HTMLElement.click() on the enclosing
    # clickable ancestor.  This works even when iSpring gives
    # the <a> a zero-sized Playwright bounding box.
    # --------------------------------------------------------
    try:
        current = find_required_start_control(popup)

        if current is not None:
            clickable = find_clickable_parent(
                current,
                require_visible=False,
            )

            log("Trying DOM click() on the iSpring clickable element...")
            clickable.evaluate("(el) => el.click()")

            succeeded, new_counter = wait_for_required_start_result(
                popup,
                old_counter,
                timeout_seconds=4.0,
            )

            if succeeded:
                return True, new_counter

    except Exception as error:
        log(
            "DOM click() did not complete the transition: "
            f"{type(error).__name__}: {error}"
        )

    # --------------------------------------------------------
    # Attempt 3: invoke the exact live iSpring core.gotoSlide()
    # target extracted from the button's inline onclick.
    # --------------------------------------------------------
    log("Trying direct iSpring gotoSlide() fallback...")
    result = invoke_vamos_core_directly(popup)

    if result:
        log(f"Direct iSpring fallback result: {result}")

        succeeded, new_counter = wait_for_required_start_result(
            popup,
            old_counter,
            timeout_seconds=6.0,
        )

        if succeeded:
            return True, new_counter

    raise RecoverableScormError(
        "Detected the 'Vamos a empezar' slide, but all click/core "
        "activation methods failed. Reopening the unit from its checkpoint."
    )


def _video_is_paused(video: Locator) -> bool:
    try:
        return bool(
            video.evaluate(
                "(el) => !!(el && !el.ended && el.paused)"
            )
        )
    except Exception:
        return False


def _find_video_play_control(frame: Frame) -> Optional[Locator]:
    """
    Find a visible video Play control across different iSpring/player builds.

    The original course sometimes exposes svg[data-play-icon='true'], but a
    captured failure showed a large centered circular Play overlay that did not
    match that selector. The fallbacks below are deliberately conservative:
    explicit Play metadata first, then a centered medium-sized clickable SVG.
    """
    selectors = [
        VIDEO_PLAY_ICON_SELECTOR,
        ".vjs-big-play-button",
        ".plyr__control--overlaid",
        ".jw-icon-playback",
        "button[aria-label*='play' i]",
        "[role='button'][aria-label*='play' i]",
        "button[title*='play' i]",
        "[role='button'][title*='play' i]",
        "button[aria-label*='reproduc' i]",
        "[role='button'][aria-label*='reproduc' i]",
        "[class*='play-button' i]",
        "[class*='playbutton' i]",
        "[id*='play-button' i]",
        "[id*='playbutton' i]",
    ]

    for selector in selectors:
        try:
            candidates = frame.locator(selector)
            for index in range(candidates.count()):
                candidate = candidates.nth(index)
                if candidate.is_visible():
                    return find_clickable_parent(candidate, require_visible=False)
        except Exception:
            continue

    # Geometry fallback for the exact failure captured from Unit 1 slide 2:
    # a large white circular Play control centered over the video, with no
    # useful stable ID/class exposed to the old selector.
    try:
        viewport = frame.evaluate("() => ({w: innerWidth, h: innerHeight})")
        width = float(viewport.get("w") or 0)
        height = float(viewport.get("h") or 0)
        if width <= 0 or height <= 0:
            return None

        candidates = frame.locator("button, [role='button'], a[href], [onclick]")
        best = None
        best_score = None

        for index in range(min(candidates.count(), 500)):
            candidate = candidates.nth(index)
            try:
                if not candidate.is_visible():
                    continue
                box = candidate.bounding_box()
                if not box:
                    continue
                w = float(box.get("width") or 0)
                h = float(box.get("height") or 0)
                if min(w, h) < 36 or max(w, h) > 240:
                    continue

                cx = float(box.get("x") or 0) + w / 2
                cy = float(box.get("y") or 0) + h / 2
                if not (0.25 * width <= cx <= 0.75 * width):
                    continue
                if not (0.20 * height <= cy <= 0.80 * height):
                    continue

                has_graphic = candidate.locator("svg, polygon, path").count() > 0
                text = (candidate.text_content(timeout=500) or "").strip().casefold()
                metadata = " ".join(
                    filter(
                        None,
                        [
                            candidate.get_attribute("class"),
                            candidate.get_attribute("id"),
                            candidate.get_attribute("aria-label"),
                            candidate.get_attribute("title"),
                        ],
                    )
                ).casefold()

                explicit = any(token in metadata for token in ("play", "reproduc"))
                if not explicit and not has_graphic:
                    continue

                # Prefer explicit metadata, then closeness to the frame centre.
                centre_distance = abs(cx - width / 2) + abs(cy - height / 2)
                score = (100000 if explicit else 0) - centre_distance
                if best is None or score > best_score:
                    best = candidate
                    best_score = score
            except Exception:
                continue

        if best is not None:
            return find_clickable_parent(best, require_visible=False)
    except Exception:
        pass

    return None


def play_video_if_present(
    popup: Page,
) -> bool:
    """Start a visible video using multiple player-specific and generic fallbacks."""
    raise_if_scorm_session_expired(popup)

    for frame in popup.frames:
        control = _find_video_play_control(frame)
        if control is not None:
            try:
                debug = {
                    "id": control.get_attribute("id"),
                    "class": control.get_attribute("class"),
                    "aria": control.get_attribute("aria-label"),
                    "title": control.get_attribute("title"),
                }
            except Exception:
                debug = {}

            log(f"Video Play control detected: {debug}. Clicking Play...")
            try:
                control.click(timeout=5_000)
            except Exception as first_error:
                try:
                    control.click(timeout=5_000, force=True)
                except Exception:
                    try:
                        control.evaluate("(el) => el.click()")
                    except Exception as final_error:
                        log(
                            "Video Play control click failed: "
                            f"{type(first_error).__name__}: {first_error}; "
                            f"DOM fallback: {type(final_error).__name__}: {final_error}"
                        )
                        continue

            popup.wait_for_timeout(750)
            return True

        # Last fallback: if a native HTML5 <video> is visibly paused, click the
        # video surface itself. A real Playwright click supplies a user gesture.
        try:
            videos = frame.locator("video")
            for index in range(videos.count()):
                video = videos.nth(index)
                if not video.is_visible() or not _video_is_paused(video):
                    continue
                log("Paused HTML5 video detected. Clicking video surface to play...")
                try:
                    video.click(timeout=5_000, force=True)
                except Exception as error:
                    log(f"HTML5 video click failed: {type(error).__name__}: {error}")
                    continue
                popup.wait_for_timeout(750)
                if not _video_is_paused(video):
                    return True
        except Exception:
            continue

    return False


# ============================================================
# NEXT BUTTON
# ============================================================

def visible_next_button_in_frame(
    frame: Frame,
) -> Optional[Locator]:

    selectors = [
        (
            "button:has("
            "svg.uikit-primary-button__right-icon "
            f"path[d='{NEXT_ARROW_PATH}'])"
        ),
        (
            "[role='button']:has("
            "svg.uikit-primary-button__right-icon "
            f"path[d='{NEXT_ARROW_PATH}'])"
        ),
        f"button:has(svg path[d='{NEXT_ARROW_PATH}'])",
        f"[role='button']:has(svg path[d='{NEXT_ARROW_PATH}'])",

        # Additional text fallbacks.
        "button:has-text('Siguiente')",
        "[role='button']:has-text('Siguiente')",
        "button:has-text('Next')",
        "[role='button']:has-text('Next')",
    ]

    for selector in selectors:

        try:
            candidates = frame.locator(selector)

            for index in range(candidates.count()):
                candidate = candidates.nth(index)

                if candidate.is_visible():
                    return find_clickable_parent(
                        candidate
                    )

        except Exception:
            continue

    return None


def next_button_is_usable(
    button: Locator,
) -> bool:

    try:
        if not button.is_visible():
            return False

        if button.get_attribute("disabled") is not None:
            return False

        if (
            button.get_attribute("aria-disabled")
            == "true"
        ):
            return False

        classes = (
            button.get_attribute("class") or ""
        ).lower()

        if "disabled" in classes:
            return False

        return button.is_enabled()

    except Exception:
        return False


def find_usable_next_button(
    popup: Page,
) -> Optional[Locator]:

    for frame in popup.frames:

        try:
            button = visible_next_button_in_frame(
                frame
            )

            if (
                button is not None
                and next_button_is_usable(button)
            ):
                return button

        except Exception:
            continue

    return None


def wait_for_next_button(
    popup: Page,
    timeout_seconds: int,
    main_page: Optional[Page] = None,
) -> Optional[Locator]:

    started = time.monotonic()
    deadline = started + timeout_seconds
    maximize_retried = False

    while time.monotonic() < deadline:

        touch_heartbeat("waiting for Next")
        if popup.is_closed():
            raise RecoverableScormError(
                "SCORM popup closed unexpectedly."
            )

        raise_if_scorm_session_expired(popup)

        try:
            handle_time_remaining_modal(popup)
        except Exception:
            pass
        if main_page is not None:
            try:
                handle_time_remaining_modal(main_page)
            except Exception:
                pass
            if main_page_needs_login(main_page):
                raise RecoverableScormError(
                    "Main LMS session expired while waiting for Next."
                )

        button = find_usable_next_button(
            popup
        )

        if button is not None:
            return button

        # iSpring can recalculate its responsive layout a moment after the
        # popup opens. If the navigation is still hidden after a few seconds,
        # maximize the native window again and force a resize event so the
        # player recomputes the bottom navigation immediately.
        if (
            not maximize_retried
            and time.monotonic() - started >= SCORM_MAXIMIZE_RETRY_SECONDS
        ):
            maximize_retried = True
            log(
                "Next is still hidden; re-maximizing SCORM window "
                "and forcing iSpring relayout..."
            )
            resize_scorm_popup(popup)
            try:
                popup.evaluate(
                    """
                    () => {
                        window.dispatchEvent(new Event('resize'));
                        window.dispatchEvent(new Event('orientationchange'));
                    }
                    """
                )
            except Exception:
                pass
            popup.wait_for_timeout(750)
            continue

        popup.wait_for_timeout(500)

    return None


# ============================================================
# SCORM TRACKING / DIAGNOSTICS
# ============================================================

def inspect_scorm_tracking(popup: Page) -> Optional[dict]:
    """Read useful SCORM 1.2 state from the live API without mutating it."""
    if popup.is_closed():
        return None

    script = r"""
    () => {
        const candidates = [];
        const add = (value, source) => {
            try {
                if (value && !candidates.some(x => x.api === value)) {
                    candidates.push({api: value, source});
                }
            } catch (e) {}
        };

        try { add(window.API, "window.API"); } catch (e) {}
        try { add(window.parent && window.parent.API, "window.parent.API"); } catch (e) {}
        try { add(window.top && window.top.API, "window.top.API"); } catch (e) {}
        try { add(window.opener && window.opener.API, "window.opener.API"); } catch (e) {}

        for (const item of candidates) {
            const api = item.api;
            try {
                const get = (name) => {
                    try {
                        if (typeof api.LMSGetValue === "function") {
                            return api.LMSGetValue(name);
                        }
                    } catch (e) {}
                    return null;
                };
                let lastError = null;
                let errorString = null;
                let diagnostic = null;
                try {
                    if (typeof api.LMSGetLastError === "function") {
                        lastError = api.LMSGetLastError();
                    }
                } catch (e) {}
                try {
                    if (lastError != null && typeof api.LMSGetErrorString === "function") {
                        errorString = api.LMSGetErrorString(String(lastError));
                    }
                } catch (e) {}
                try {
                    if (lastError != null && typeof api.LMSGetDiagnostic === "function") {
                        diagnostic = api.LMSGetDiagnostic(String(lastError));
                    }
                } catch (e) {}

                return {
                    api_source: item.source,
                    lesson_location: get("cmi.core.lesson_location"),
                    lesson_status: get("cmi.core.lesson_status"),
                    session_time: get("cmi.core.session_time"),
                    total_time: get("cmi.core.total_time"),
                    last_error: lastError,
                    error_string: errorString,
                    diagnostic: diagnostic
                };
            } catch (e) {}
        }
        return null;
    }
    """

    for frame in popup.frames:
        try:
            result = frame.evaluate(script)
            if result:
                return result
        except Exception:
            continue
    return None


def log_scorm_diagnostics(popup: Optional[Page], label: str) -> Optional[dict]:
    if popup is None:
        return None
    try:
        if popup.is_closed():
            log(f"SCORM diagnostics [{label}]: popup is closed.")
            return None
        tracking = inspect_scorm_tracking(popup)
        counter = read_slide_counter(popup)
        expired = scorm_session_expired(popup)
        log(
            f"SCORM diagnostics [{label}]: counter={counter}, expired={expired}, "
            f"tracking={tracking}."
        )
        return tracking
    except Exception as error:
        log(
            f"SCORM diagnostics [{label}] failed: {type(error).__name__}: {error}"
        )
        return None


def _find_scorm_api_and_commit_script() -> str:
    return r"""
    () => {
        const candidates = [];
        const add = (value, source) => {
            try {
                if (value && !candidates.some(x => x.api === value)) {
                    candidates.push({api: value, source});
                }
            } catch (e) {}
        };
        try { add(window.API, "window.API"); } catch (e) {}
        try { add(window.parent && window.parent.API, "window.parent.API"); } catch (e) {}
        try { add(window.top && window.top.API, "window.top.API"); } catch (e) {}
        try { add(window.opener && window.opener.API, "window.opener.API"); } catch (e) {}

        for (const item of candidates) {
            const api = item.api;
            try {
                if (typeof api.LMSCommit !== "function") continue;
                const commit = api.LMSCommit("");
                let lastError = null;
                let errorString = null;
                try {
                    if (typeof api.LMSGetLastError === "function") {
                        lastError = api.LMSGetLastError();
                    }
                } catch (e) {}
                try {
                    if (lastError != null && typeof api.LMSGetErrorString === "function") {
                        errorString = api.LMSGetErrorString(String(lastError));
                    }
                } catch (e) {}
                const get = (name) => {
                    try {
                        return typeof api.LMSGetValue === "function" ? api.LMSGetValue(name) : null;
                    } catch (e) { return null; }
                };
                return {
                    api_source: item.source,
                    commit,
                    lesson_location: get("cmi.core.lesson_location"),
                    lesson_status: get("cmi.core.lesson_status"),
                    last_error: lastError,
                    error_string: errorString
                };
            } catch (e) {}
        }
        return null;
    }
    """


def _scorm_result_is_false(value) -> bool:
    if value is False:
        return True
    if isinstance(value, str) and value.strip().casefold() == "false":
        return True
    return False


def commit_scorm(popup: Page, log_result: bool = True) -> Optional[dict]:
    if popup.is_closed():
        return None
    raise_if_scorm_session_expired(popup)
    script = _find_scorm_api_and_commit_script()

    for frame in popup.frames:
        try:
            result = frame.evaluate(script)
        except Exception:
            continue
        if result is not None:
            if log_result:
                log(
                    "SCORM commit: "
                    f"result={result.get('commit')}, "
                    f"location={result.get('lesson_location')!r}, "
                    f"status={result.get('lesson_status')!r}, "
                    f"last_error={result.get('last_error')!r}, "
                    f"error={result.get('error_string')!r}."
                )
            if _scorm_result_is_false(result.get("commit")):
                raise RecoverableScormError(
                    "LMSCommit returned false; continuing would risk losing progress."
                )
            return result

    if log_result:
        log("WARNING: SCORM commit could not locate a callable API.")
    return None


def finish_scorm(popup: Page) -> Optional[dict]:
    """Commit and finish the SCORM session before closing."""
    if popup.is_closed():
        return None
    raise_if_scorm_session_expired(popup)

    script = r"""
    () => {
        const candidates = [];
        const add = (value, source) => {
            try {
                if (value && !candidates.some(x => x.api === value)) {
                    candidates.push({api: value, source});
                }
            } catch (e) {}
        };
        try { add(window.API, "window.API"); } catch (e) {}
        try { add(window.parent && window.parent.API, "window.parent.API"); } catch (e) {}
        try { add(window.top && window.top.API, "window.top.API"); } catch (e) {}
        try { add(window.opener && window.opener.API, "window.opener.API"); } catch (e) {}

        for (const item of candidates) {
            const api = item.api;
            try {
                let commit = null;
                let finish = null;
                if (typeof api.LMSCommit === "function") commit = api.LMSCommit("");
                if (typeof api.LMSFinish === "function") finish = api.LMSFinish("");
                let lastError = null;
                let errorString = null;
                try { if (typeof api.LMSGetLastError === "function") lastError = api.LMSGetLastError(); } catch (e) {}
                try { if (lastError != null && typeof api.LMSGetErrorString === "function") errorString = api.LMSGetErrorString(String(lastError)); } catch (e) {}
                return {api_source: item.source, commit, finish, last_error: lastError, error_string: errorString};
            } catch (e) {}
        }
        return null;
    }
    """

    for frame in popup.frames:
        try:
            result = frame.evaluate(script)
        except Exception:
            continue
        if result:
            log(f"Final SCORM commit/finish: {result}")
            if (
                _scorm_result_is_false(result.get("commit"))
                or _scorm_result_is_false(result.get("finish"))
            ):
                raise RecoverableScormError(
                    f"Final SCORM commit/finish reported failure: {result}."
                )
            return result

    log("WARNING: final SCORM commit/finish could not locate a callable API.")
    return None


# ============================================================
# PACING / LONG-WAIT HELPERS
# ============================================================

def wait_with_keepalive(
    main_page: Page,
    popup: Page,
    total_seconds: float,
    label: str,
    commit_during_wait: bool = True,
) -> None:
    """
    Wait without leaving the browser/session unattended for hours.

    Long pacing waits are broken into short chunks. During them we dismiss the
    Mentoaula "Aviso de tiempo restante" dialog and periodically commit the
    SCORM session. If the main page has actually returned to Login, we restore
    that main-page session without touching the still-open SCORM popup.
    """

    total_seconds = max(0.0, float(total_seconds))
    if total_seconds <= 0:
        return

    deadline = time.monotonic() + total_seconds
    next_commit = time.monotonic() + PACE_KEEPALIVE_SECONDS
    next_progress_log = time.monotonic() + PACE_PROGRESS_LOG_SECONDS

    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return

        if popup.is_closed():
            raise RecoverableScormError(
                f"SCORM popup closed unexpectedly during delay: {label}."
            )

        touch_heartbeat(f"waiting: {label}")
        raise_if_scorm_session_expired(popup)
        popup.wait_for_timeout(int(min(30.0, remaining) * 1000))
        raise_if_scorm_session_expired(popup)
        now = time.monotonic()

        # Keep the parent Mentoaula session alive while the SCORM popup stays
        # on the same slide for a long pacing period.
        try:
            handle_time_remaining_modal(main_page)
        except Exception:
            pass

        try:
            handle_time_remaining_modal(popup)
        except Exception:
            pass

        if main_page_needs_login(main_page):
            log(
                "Main Mentoaula session expired during pacing. "
                "The current SCORM launch is now treated as stale and will be reopened."
            )
            raise RecoverableScormError(
                f"Main LMS session expired during delay: {label}."
            )

        if commit_during_wait and now >= next_commit:
            next_commit = now + PACE_KEEPALIVE_SECONDS
            commit_scorm(popup, log_result=False)

        if now >= next_progress_log:
            next_progress_log = now + PACE_PROGRESS_LOG_SECONDS
            log(
                f"Still waiting on {label}; "
                f"{format_duration(max(0.0, deadline - now))} remaining."
            )


def wait_basic_slide_dwell(
    main_page: Page,
    popup: Page,
    unit_number: int,
    current_slide: int,
    total_slides: int,
) -> None:
    dwell_seconds = random.randint(
        MIN_SLIDE_VIEW_SECONDS,
        MAX_SLIDE_VIEW_SECONDS,
    )
    log(
        f"Viewing Unit {unit_number} slide "
        f"{current_slide}/{total_slides} for {dwell_seconds} seconds."
    )
    wait_with_keepalive(
        main_page,
        popup,
        dwell_seconds,
        f"Unit {unit_number} slide {current_slide}/{total_slides}",
        commit_during_wait=False,
    )


def wait_video_dwell(
    main_page: Page,
    popup: Page,
    unit_number: int,
    current_slide: int,
    total_slides: int,
) -> None:
    log(
        f"Watching Unit {unit_number} slide {current_slide}/{total_slides} "
        f"video for {VIDEO_WAIT_SECONDS} seconds."
    )
    wait_with_keepalive(
        main_page,
        popup,
        VIDEO_WAIT_SECONDS,
        f"Unit {unit_number} video slide {current_slide}/{total_slides}",
        commit_during_wait=True,
    )


def wait_inter_slide_pacing(
    main_page: Page,
    popup: Page,
    pacer: ContentPacer,
    unit_number: int,
    current_slide: int,
    total_slides: int,
) -> None:
    extra_seconds = pacer.extra_delay_for_slide(
        unit_number,
        current_slide,
        total_slides,
    )

    if extra_seconds <= 0:
        return

    remaining_slots = pacer.remaining_slide_slots(
        unit_number,
        current_slide,
        total_slides,
    )

    log(
        f"INTER-SLIDE pacing after completed Unit {unit_number} slide "
        f"{current_slide}/{total_slides}: waiting "
        f"{format_duration(extra_seconds)}; "
        f"estimated slide slots remaining={remaining_slots}; "
        f"course target remaining={format_duration(pacer.remaining_seconds())}."
    )

    wait_with_keepalive(
        main_page,
        popup,
        extra_seconds,
        f"inter-slide pacing after Unit {unit_number} slide {current_slide}/{total_slides}",
        commit_during_wait=True,
    )
    pacer.mark_paced(unit_number, current_slide)


def wait_on_main_page(
    main_page: Page,
    total_seconds: float,
    label: str,
) -> None:
    """Long wait with no SCORM popup open; safe place for final-slide pacing."""
    total_seconds = max(0.0, float(total_seconds))
    if total_seconds <= 0:
        return

    deadline = time.monotonic() + total_seconds
    next_progress_log = time.monotonic() + PACE_PROGRESS_LOG_SECONDS

    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return

        touch_heartbeat(f"main-page wait: {label}")
        main_page.wait_for_timeout(int(min(30.0, remaining) * 1000))

        try:
            handle_time_remaining_modal(main_page)
        except Exception:
            pass

        if main_page_needs_login(main_page):
            log(f"Main Mentoaula session expired during {label}; re-authenticating safely.")
            login_with_retries(main_page, reason=f"main-page wait recovery: {label}")
            close_first_login_tour(main_page)

        now = time.monotonic()
        if now >= next_progress_log:
            next_progress_log = now + PACE_PROGRESS_LOG_SECONDS
            log(
                f"Still waiting on {label}; "
                f"{format_duration(max(0.0, deadline - now))} remaining."
            )


def wait_closed_final_slide_pacing(
    main_page: Page,
    pacer: ContentPacer,
    unit_number: int,
    current_slide: int,
    total_slides: int,
) -> None:
    """Pay the final slide's long pacing share only after SCORM is closed."""
    extra_seconds = pacer.extra_delay_for_slide(
        unit_number,
        current_slide,
        total_slides,
    )
    if extra_seconds <= 0:
        return

    log(
        f"POST-UNIT pacing after completed Unit {unit_number} final slide "
        f"{current_slide}/{total_slides}: waiting {format_duration(extra_seconds)}; "
        f"course target remaining={format_duration(pacer.remaining_seconds())}."
    )
    wait_on_main_page(
        main_page,
        extra_seconds,
        f"post-unit pacing after Unit {unit_number} final slide",
    )
    pacer.mark_paced(unit_number, current_slide)


def wait_for_final_course_target(main_page: Page, pacer: ContentPacer) -> None:
    """After all slide decks are finished, absorb any small remaining target time."""
    remaining = pacer.remaining_seconds()
    if remaining <= 0:
        return
    log(
        "All Units 1-5 slide decks are complete. Waiting the final remaining "
        f"target time on the main course page: {format_duration(remaining)}."
    )
    wait_on_main_page(main_page, remaining, "final course pacing after all slide decks")


# ============================================================
# SLIDE NAVIGATION
# ============================================================

def wait_for_slide_change(
    popup: Page,
    old_counter: Optional[tuple[int, int]],
    timeout_seconds: int = 30,
) -> Optional[tuple[int, int]]:

    deadline = time.monotonic() + timeout_seconds

    while time.monotonic() < deadline:

        touch_heartbeat("waiting for slide counter transition")
        if popup.is_closed():
            raise RecoverableScormError(
                "SCORM popup closed while waiting for slide change."
            )

        raise_if_scorm_session_expired(popup)

        new_counter = read_slide_counter(
            popup
        )

        if new_counter is not None:

            if old_counter is None:
                return new_counter

            if new_counter[0] != old_counter[0]:
                return new_counter

        popup.wait_for_timeout(250)

    final_counter = read_slide_counter(popup)
    if old_counter is None:
        return final_counter
    if final_counter is not None and final_counter[0] != old_counter[0]:
        return final_counter
    return None


def click_next_with_fallback(popup: Page, next_button: Locator, label: str) -> None:
    """Click Next with fresh-locator, force and DOM fallbacks; never leak timeout."""
    raise_if_scorm_session_expired(popup)

    try:
        next_button.scroll_into_view_if_needed(timeout=5000)
    except Exception:
        pass

    first_error: Optional[Exception] = None
    try:
        next_button.click(timeout=10_000)
        return
    except Exception as error:
        first_error = error
        log(f"Next normal click failed on {label}: {type(error).__name__}: {error}")

    raise_if_scorm_session_expired(popup)

    fresh = find_usable_next_button(popup)
    if fresh is not None:
        try:
            fresh.click(timeout=10_000, force=True)
            log(f"Next forced-click fallback succeeded on {label}.")
            return
        except Exception as error:
            log(f"Next forced click failed on {label}: {type(error).__name__}: {error}")

        raise_if_scorm_session_expired(popup)
        try:
            fresh.evaluate("(el) => el.click()")
            log(f"Next DOM click() fallback invoked on {label}.")
            return
        except Exception as error:
            log(f"Next DOM click failed on {label}: {type(error).__name__}: {error}")

    raise RecoverableScormError(
        f"All Next click methods failed on {label}; first error was "
        f"{type(first_error).__name__ if first_error else 'unknown'}: {first_error}."
    )


def process_all_slides(
    popup: Page,
    main_page: Page,
    unit_number: int,
    pacer: ContentPacer,
    scorm_opened_at: float,
) -> Optional[tuple[int, int]]:
    """
    Navigate the SCORM deck.

    v10 timing rule:
      - active slide dwell is only 20-30 seconds (+ 5 minutes for a real video);
      - the long 37.5-41h pacing delay happens only AFTER that slide has
        successfully advanced, never before Next/Vamos;
      - final-slide long pacing is deferred to the main page after the popup
        has been finished/closed by the caller.
    """

    log("Waiting for SCORM content...")
    initial_counter = None
    deadline = time.monotonic() + 120

    while time.monotonic() < deadline:
        touch_heartbeat("waiting for SCORM readiness")
        if popup.is_closed():
            raise RecoverableScormError(
                "SCORM popup closed while waiting for content readiness."
            )
        raise_if_scorm_session_expired(popup)

        initial_counter = read_slide_counter(popup)
        if initial_counter:
            pacer.confirm_counter(unit_number, initial_counter)
            break

        button = find_usable_next_button(popup)
        if button:
            break

        popup.wait_for_timeout(500)

    counter = read_slide_counter(popup)
    if counter:
        pacer.confirm_counter(unit_number, counter)
        log(f"Detected slide {counter[0]} of {counter[1]}.")
    else:
        log(
            "No slide counter detected. Will recover instead of assuming final "
            "completion if navigation also disappears."
        )

    clicks = 0
    final_counter: Optional[tuple[int, int]] = None

    while True:
        touch_heartbeat(f"Unit {unit_number} slide loop")
        if popup.is_closed():
            raise RecoverableScormError("SCORM popup closed unexpectedly.")

        raise_if_scorm_session_expired(popup)
        popup.wait_for_timeout(SLIDE_PAUSE_SECONDS * 1000)
        counter = read_slide_counter(popup)

        if counter:
            pacer.confirm_counter(unit_number, counter)
            current, total = counter
            final_counter = counter
            log(f"Currently on slide {current}/{total}.")

            slide_key = (unit_number, current)
            if slide_key not in pacer.dwelled_slides:
                wait_basic_slide_dwell(
                    main_page,
                    popup,
                    unit_number,
                    current,
                    total,
                )
                pacer.mark_dwelled(unit_number, current)

            # Final slide: no long wait while it is open. Play video if needed,
            # then return so caller can LMSFinish/close first and pace afterward.
            if current >= total:
                video_started = play_video_if_present(popup)
                if video_started and slide_key not in pacer.video_waited_slides:
                    wait_video_dwell(
                        main_page,
                        popup,
                        unit_number,
                        current,
                        total,
                    )
                    pacer.mark_video_waited(unit_number, current)

                log("LAST SLIDE DETECTED. No long pacing wait will occur inside it.")
                break

            # Vamos slide: dwell is done; activate immediately. Only after the
            # transition succeeds do we pay the old slide's long pacing share.
            if required_start_control_is_visible(popup):
                start_detected, after_start = click_required_start_control(
                    popup,
                    old_counter=counter,
                )

                if start_detected:
                    if after_start is not None:
                        pacer.confirm_counter(unit_number, after_start)
                        log(
                            "'Vamos a empezar' completed; player now reports "
                            f"slide {after_start[0]}/{after_start[1]}."
                        )
                    else:
                        log(
                            "'Vamos a empezar' completed; waiting for the new "
                            "slide counter to settle."
                        )

                    commit_scorm(popup)
                    wait_inter_slide_pacing(
                        main_page,
                        popup,
                        pacer,
                        unit_number,
                        current,
                        total,
                    )

                    if (
                        time.monotonic() - scorm_opened_at
                        >= PROACTIVE_SCORM_REFRESH_SECONDS
                    ):
                        raise ProactiveScormRefresh(
                            f"Routine refresh after completed slide {current}/{total}; "
                            f"SCORM launch age reached "
                            f"{format_duration(time.monotonic() - scorm_opened_at)}."
                        )
                    continue

            # Start a real video if present; the 5-minute video dwell is part of
            # content handling, not the long inter-slide pacing delay.
            video_started = play_video_if_present(popup)
            if video_started and slide_key not in pacer.video_waited_slides:
                wait_video_dwell(
                    main_page,
                    popup,
                    unit_number,
                    current,
                    total,
                )
                pacer.mark_video_waited(unit_number, current)

        else:
            # Counterless fallback. Do not insert long pacing because there is
            # no reliable completed-slide key to persist it against.
            start_detected, after_start = click_required_start_control(
                popup,
                old_counter=counter,
            )
            if start_detected:
                if after_start is not None:
                    pacer.confirm_counter(unit_number, after_start)
                    log(
                        "'Vamos a empezar' completed; player now reports "
                        f"slide {after_start[0]}/{after_start[1]}."
                    )
                commit_scorm(popup)
                continue
            play_video_if_present(popup)

        # ----------------------------------------------------
        # Wait for Next
        # ----------------------------------------------------
        if main_page_needs_login(main_page):
            raise RecoverableScormError(
                "Main LMS session expired immediately before Next navigation."
            )

        if counter:
            current, total = counter
            next_button = wait_for_next_button(
                popup,
                NEXT_WAIT_SECONDS,
                main_page=main_page,
            )
            if next_button is None:
                raise RecoverableScormError(
                    f"Slide {current}/{total} is not the last slide, but Next "
                    "never became available within the configured timeout."
                )
        else:
            next_button = wait_for_next_button(
                popup,
                15,
                main_page=main_page,
            )
            if next_button is None:
                raise_if_scorm_session_expired(popup)
                raise RecoverableScormError(
                    "Slide counter is unavailable and no usable Next button "
                    "appeared; refusing to assume completion. Reopen from checkpoint."
                )

        # ----------------------------------------------------
        # CLICK NEXT
        # ----------------------------------------------------
        old_counter = counter
        log("Clicking Next...")
        label = (
            f"Unit {unit_number} slide {old_counter[0]}/{old_counter[1]}"
            if old_counter is not None
            else f"Unit {unit_number} counterless slide"
        )
        click_next_with_fallback(popup, next_button, label)
        clicks += 1

        new_counter = wait_for_slide_change(
            popup,
            old_counter,
            timeout_seconds=30,
        )

        if new_counter:
            pacer.confirm_counter(unit_number, new_counter)
            final_counter = new_counter
            log(f"Moved to slide {new_counter[0]}/{new_counter[1]}.")
        else:
            raise_if_scorm_session_expired(popup)
            if old_counter is not None:
                raise RecoverableScormError(
                    f"Next click did not advance from slide "
                    f"{old_counter[0]}/{old_counter[1]}."
                )
            log("Slide changed but no counter could be read.")

        commit_scorm(popup)

        # The key v10 change: long pacing is paid only AFTER successful
        # completion/transition of the old slide.
        if old_counter is not None:
            wait_inter_slide_pacing(
                main_page,
                popup,
                pacer,
                unit_number,
                old_counter[0],
                old_counter[1],
            )

        # Based on the supplied diagnostics, proactively recycle a SCORM launch
        # well before its repeatable ~60-minute expiry. This is a normal
        # maintenance refresh, not a failure and does not consume retry budget.
        if (
            old_counter is not None
            and time.monotonic() - scorm_opened_at
            >= PROACTIVE_SCORM_REFRESH_SECONDS
        ):
            raise ProactiveScormRefresh(
                f"Routine refresh after completed slide "
                f"{old_counter[0]}/{old_counter[1]}; SCORM launch age reached "
                f"{format_duration(time.monotonic() - scorm_opened_at)}."
            )

        if clicks > 500:
            raise RecoverableScormError(
                "Safety stop: more than 500 Next clicks detected in one SCORM launch."
            )

    log(
        f"Finished navigating Unit {unit_number}. "
        f"Next clicked {clicks} times."
    )
    return final_counter


# ============================================================
# SCORM RECOVERY
# ============================================================

def fast_forward_to_checkpoint(
    popup: Page,
    main_page: Page,
    unit_number: int,
    target_slide: int,
    pacer: ContentPacer,
) -> None:
    """
    If a reopened SCORM package resumes earlier than the last confirmed slide,
    advance back to the checkpoint without re-applying the 20-30 s / overall
    pacing waits. This is recovery only; normal first-pass navigation is
    unchanged.
    """
    target_slide = max(1, int(target_slide))
    if target_slide <= 1:
        return

    log(
        f"Recovery checkpoint for Unit {unit_number}: "
        f"target slide {target_slide}."
    )

    deadline = time.monotonic() + 30 * 60
    actions = 0

    while time.monotonic() < deadline:
        if popup.is_closed():
            raise RecoverableScormError(
                "SCORM popup closed during checkpoint recovery."
            )
        raise_if_scorm_session_expired(popup)
        try:
            handle_time_remaining_modal(main_page)
        except Exception:
            pass
        if main_page_needs_login(main_page):
            raise RecoverableScormError(
                "Main LMS session expired during checkpoint fast-forward."
            )

        counter = read_slide_counter(popup)
        if counter is None:
            popup.wait_for_timeout(500)
            continue

        current, total = counter
        pacer.confirm_counter(unit_number, counter)
        effective_target = min(target_slide, total)
        if target_slide > total:
            log(
                f"Recovery checkpoint {target_slide} exceeds live Unit {unit_number} "
                f"total {total}; clamping recovery target to {effective_target}."
            )

        if current >= effective_target:
            log(
                f"Recovery checkpoint reached: slide {current}/{total}."
            )
            return

        log(
            f"Recovery fast-forward: slide {current}/{total} -> "
            f"checkpoint {effective_target}."
        )

        if required_start_control_is_visible(popup):
            detected, after = click_required_start_control(
                popup,
                old_counter=counter,
            )
            if detected:
                if after is not None:
                    pacer.confirm_counter(unit_number, after)
                commit_scorm(popup)
                actions += 1
                continue

        play_video_if_present(popup)

        next_button = wait_for_next_button(
            popup,
            NEXT_WAIT_SECONDS,
            main_page=main_page,
        )
        if next_button is None:
            raise RecoverableScormError(
                f"No usable Next while recovering Unit {unit_number} "
                f"from slide {current}/{total}."
            )

        click_next_with_fallback(
            popup,
            next_button,
            f"Unit {unit_number} recovery slide {current}/{total}",
        )

        new_counter = wait_for_slide_change(
            popup,
            counter,
            timeout_seconds=30,
        )
        if new_counter is None:
            raise_if_scorm_session_expired(popup)
            raise RecoverableScormError(
                f"Recovery Next did not advance from slide {current}/{total}."
            )

        pacer.confirm_counter(unit_number, new_counter)
        commit_scorm(popup)
        actions += 1

        if actions > 500:
            raise RecoverableScormError(
                "Safety stop during checkpoint fast-forward."
            )

    raise RecoverableScormError(
        f"Timed out fast-forwarding Unit {unit_number} to slide {target_slide}."
    )


def hard_reauthenticate(page: Page) -> None:
    """Rebuild the parent LMS session from the login page."""
    log("Re-authenticating the main Mentoaula session...")
    login_with_retries(page, reason="re-authentication")
    close_first_login_tour(page)
    handle_time_remaining_modal(page)
    page.wait_for_timeout(RECOVERY_RELOGIN_PAUSE_SECONDS * 1000)


def diagnose_recovery(
    main_page: Optional[Page],
    popup: Optional[Page],
    unit: Optional[CourseUnit],
    error: BaseException,
    attempt: int,
    pacer: Optional[ContentPacer] = None,
) -> None:
    """Persist a structured diagnostic snapshot for every recovery/fatal event."""
    directory = _user_runtime_dir()
    if directory is None:
        return

    timestamp = time.strftime("%Y%m%d-%H%M%S")
    unit_number = unit.number if unit is not None else None
    stem = f"diagnostic-{timestamp}-unit-{unit_number or 'none'}-attempt-{attempt}"

    counter = None
    expired = None
    tracking = None
    popup_closed = None
    if popup is not None:
        try:
            popup_closed = popup.is_closed()
        except Exception:
            popup_closed = None
        if popup_closed is False:
            try:
                counter = read_slide_counter(popup)
            except Exception:
                pass
            try:
                expired = scorm_session_expired(popup)
            except Exception:
                pass
            try:
                tracking = inspect_scorm_tracking(popup)
            except Exception:
                pass

    payload = {
        "timestamp_epoch": time.time(),
        "username": USERNAME,
        "unit": unit_number,
        "attempt": attempt,
        "error_type": type(error).__name__,
        "error": str(error),
        "traceback": traceback.format_exc(),
        "main_page_url": _safe_page_url(main_page),
        "main_page_title": _safe_page_title(main_page),
        "main_page_needs_login": (
            main_page_needs_login(main_page) if main_page is not None else None
        ),
        "popup_url": _safe_page_url(popup),
        "popup_title": _safe_page_title(popup),
        "popup_closed": popup_closed,
        "slide_counter": counter,
        "scorm_session_expired": expired,
        "scorm_tracking": tracking,
        "checkpoint": (
            pacer.checkpoint_for_unit(unit_number)
            if pacer is not None and unit_number is not None
            else None
        ),
        "completed_units": (
            sorted(pacer.completed_units) if pacer is not None else None
        ),
        "target_remaining_seconds": (
            pacer.remaining_seconds() if pacer is not None else None
        ),
    }

    try:
        _safe_write_json(directory / f"{stem}.json", payload)
    except Exception as diag_error:
        log(
            f"Could not write structured diagnostic: "
            f"{type(diag_error).__name__}: {diag_error}"
        )

    _safe_screenshot(main_page, directory / f"{stem}-main.png")
    _safe_screenshot(popup, directory / f"{stem}-scorm.png")

    log(
        f"Diagnostic snapshot saved: {stem}; counter={counter}, "
        f"expired={expired}, tracking={tracking}."
    )


# ============================================================
# MAIN
# ============================================================

def run_user_session(
    username: str,
    password: str,
    start_barrier=None,
    restart_index: int = 0,
) -> None:
    global USERNAME, PASSWORD, RUNTIME_USER_DIR
    USERNAME = username
    PASSWORD = password
    RUNTIME_USER_DIR = RUNTIME_ROOT / USERNAME
    RUNTIME_USER_DIR.mkdir(parents=True, exist_ok=True)
    touch_heartbeat("worker starting", force=True)

    log("")
    log("=" * 72)
    log(
        f"WORKER STARTED (restart_index={restart_index}, pid={os.getpid()}). "
        f"Runtime directory: {RUNTIME_USER_DIR}"
    )
    log("=" * 72)

    popup: Optional[Page] = None
    current_unit: Optional[CourseUnit] = None
    page: Optional[Page] = None
    context = None
    browser = None
    pacer: Optional[ContentPacer] = None

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                headless=HEADLESS,
                args=["--start-maximized"],
            )
            context = browser.new_context(no_viewport=True)
            page = context.new_page()

            if start_barrier is not None:
                log("Browser ready; waiting for the other selected users...")
                try:
                    start_barrier.wait(timeout=180)
                except Exception as error:
                    log(
                        "Bootstrap barrier did not complete cleanly; continuing "
                        f"independently: {type(error).__name__}: {error}"
                    )
                else:
                    log("Bootstrap barrier released. Starting login.")
            else:
                log("Restarted worker browser ready; resuming independently.")

            # Restore the original pacing deadline/checkpoints before login so
            # a process/browser restart never resets course timing.
            pacer = ContentPacer.load_or_create()
            if pacer.run_completed:
                log("Persistent progress says Units 1-5 are already completed; nothing to resume.")
                return

            login_with_retries(page, reason="initial/resume login")
            close_first_login_tour(page)
            handle_time_remaining_modal(page)

            for unit in COURSE_UNITS:
                current_unit = unit

                if unit.number in pacer.completed_units:
                    log(
                        f"Skipping Unit {unit.number}: durable checkpoint marks it completed."
                    )
                    continue

                recovery_attempt = 0
                log("")
                log("=" * 60)
                log(f"STARTING UNIT {unit.number}")
                log("=" * 60)

                while True:
                    popup = None
                    try:
                        handle_time_remaining_modal(page)
                        if main_page_needs_login(page):
                            hard_reauthenticate(page)

                        popup = open_unit_content(page, unit)
                        checkpoint = pacer.checkpoint_for_unit(unit.number)
                        fast_forward_to_checkpoint(
                            popup,
                            page,
                            unit.number,
                            checkpoint,
                            pacer,
                        )

                        scorm_opened_at = time.monotonic()
                        final_counter = process_all_slides(
                            popup,
                            main_page=page,
                            unit_number=unit.number,
                            pacer=pacer,
                            scorm_opened_at=scorm_opened_at,
                        )

                        raise_if_scorm_session_expired(popup)
                        log_scorm_diagnostics(
                            popup,
                            f"Unit {unit.number} before finish",
                        )
                        log(f"Finishing SCORM session for Unit {unit.number}...")
                        finish_scorm(popup)
                        popup.wait_for_timeout(2000)

                        if not popup.is_closed():
                            log(f"Closing Unit {unit.number} SCORM window...")
                            popup.close()
                        popup = None

                        page.wait_for_timeout(1000)
                        handle_time_remaining_modal(page)
                        pacer.mark_unit_completed(unit.number)

                        # The final slide's long pacing share is deliberately
                        # paid only after LMSFinish and popup close.
                        if final_counter is not None:
                            wait_closed_final_slide_pacing(
                                page,
                                pacer,
                                unit.number,
                                final_counter[0],
                                final_counter[1],
                            )

                        log(f"UNIT {unit.number} CONTENT COMPLETED SUCCESSFULLY.")
                        break

                    except ProactiveScormRefresh as error:
                        checkpoint = pacer.checkpoint_for_unit(unit.number)
                        log(
                            f"PROACTIVE SCORM REFRESH in Unit {unit.number}: {error} "
                            f"Checkpoint=slide {checkpoint}."
                        )
                        try:
                            if popup is not None and not popup.is_closed():
                                try:
                                    commit_scorm(popup, log_result=False)
                                except Exception:
                                    pass
                                try:
                                    finish_scorm(popup)
                                except Exception:
                                    pass
                                if not popup.is_closed():
                                    popup.close()
                        except Exception:
                            pass
                        popup = None

                        if main_page_needs_login(page):
                            hard_reauthenticate(page)
                        page.wait_for_timeout(1500)
                        log(
                            f"Reopening Unit {unit.number} after proactive refresh "
                            f"from checkpoint slide {checkpoint}..."
                        )
                        continue

                    except (ScormSessionExpired, RecoverableScormError) as error:
                        recovery_attempt += 1
                        checkpoint = pacer.checkpoint_for_unit(unit.number)
                        log(
                            f"RECOVERABLE SCORM FAILURE in Unit {unit.number}: "
                            f"{type(error).__name__}: {error}"
                        )
                        log(
                            f"Recovery attempt {recovery_attempt}/{MAX_UNIT_RECOVERY_ATTEMPTS}; "
                            f"last confirmed checkpoint=slide {checkpoint}."
                        )
                        log_scorm_diagnostics(
                            popup,
                            f"Unit {unit.number} recovery attempt {recovery_attempt}",
                        )
                        diagnose_recovery(
                            page,
                            popup,
                            unit,
                            error,
                            recovery_attempt,
                            pacer,
                        )

                        if recovery_attempt > MAX_UNIT_RECOVERY_ATTEMPTS:
                            raise RuntimeError(
                                f"Unit {unit.number} exceeded maximum SCORM recovery attempts."
                            ) from error

                        try:
                            if popup is not None and not popup.is_closed():
                                if isinstance(error, ScormSessionExpired):
                                    close_expired_scorm_content(popup)
                                if not popup.is_closed():
                                    popup.close()
                        except Exception:
                            pass
                        popup = None

                        # Do not preserve/reuse an old SCORM launch after any LMS
                        # authentication loss or navigation failure. Rebuild the
                        # parent session, reopen the same unit, then fast-forward
                        # back to the durable checkpoint.
                        hard_reauthenticate(page)
                        backoff = min(
                            RECOVERY_BACKOFF_MAX_SECONDS,
                            RECOVERY_BACKOFF_MIN_SECONDS * max(1, recovery_attempt),
                        )
                        page.wait_for_timeout(
                            int((RECOVERY_REOPEN_PAUSE_SECONDS + backoff) * 1000)
                        )
                        log(f"Reopening Unit {unit.number} after controlled recovery...")
                        continue

            # All SCORM slide decks are now finished/closed. If jitter, video,
            # recovery or fast navigation left any time before the absolute
            # 37.5-41h deadline, wait it here on the main page rather than in a
            # SCORM slide.
            wait_for_final_course_target(page, pacer)
            pacer.mark_run_completed()
            log("")
            elapsed = pacer.elapsed_seconds()
            log("UNITS 1-5 CONTENT COMPLETED SUCCESSFULLY.")
            log(
                "Actual Units 1-5 elapsed time: "
                f"{elapsed / 3600:.2f} hours ({format_duration(elapsed)}); "
                f"selected target={format_duration(pacer.target_seconds)}."
            )

    except Exception as error:
        if current_unit is not None:
            prefix = f"Unit {current_unit.number}: "
        else:
            prefix = ""
        log(f"FATAL WORKER ERROR: {prefix}{type(error).__name__}: {error}")
        diagnose_recovery(
            page,
            popup,
            current_unit,
            error,
            attempt=-1,
            pacer=pacer,
        )
        raise

    finally:
        try:
            if popup is not None and not popup.is_closed():
                popup.close()
        except Exception:
            pass
        try:
            if context is not None:
                context.close()
        except Exception:
            pass
        try:
            if browser is not None:
                browser.close()
        except Exception:
            pass
        log("Browser closed.")


def _available_memory_mb() -> Optional[int]:
    """Return available physical RAM on Windows without extra dependencies."""
    if os.name != "nt":
        return None
    try:
        class MEMORYSTATUSEX(ctypes.Structure):
            _fields_ = [
                ("dwLength", ctypes.c_ulong),
                ("dwMemoryLoad", ctypes.c_ulong),
                ("ullTotalPhys", ctypes.c_ulonglong),
                ("ullAvailPhys", ctypes.c_ulonglong),
                ("ullTotalPageFile", ctypes.c_ulonglong),
                ("ullAvailPageFile", ctypes.c_ulonglong),
                ("ullTotalVirtual", ctypes.c_ulonglong),
                ("ullAvailVirtual", ctypes.c_ulonglong),
                ("ullAvailExtendedVirtual", ctypes.c_ulonglong),
            ]

        status = MEMORYSTATUSEX()
        status.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
        if not ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(status)):
            return None
        return int(status.ullAvailPhys // (1024 * 1024))
    except Exception:
        return None


def _heartbeat_age_seconds(username: str, started_epoch: float) -> Optional[float]:
    path = RUNTIME_ROOT / username / "heartbeat.json"
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        updated = float(raw.get("updated_at_epoch", 0.0))
        # Ignore a heartbeat left behind by an older worker/run.
        if updated < started_epoch - 2:
            return max(0.0, time.time() - started_epoch)
        return max(0.0, time.time() - updated)
    except Exception:
        return max(0.0, time.time() - started_epoch)


def _terminate_worker_tree(process: mp.Process, username: str) -> None:
    """Kill a hung Python worker and its Chromium/Node descendants."""
    if process.pid is None:
        return
    try:
        if os.name == "nt":
            subprocess.run(
                ["taskkill", "/PID", str(process.pid), "/T", "/F"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                timeout=20,
                check=False,
            )
        else:
            process.terminate()
    except Exception as error:
        print(
            f"[launcher] Could not terminate full process tree for {username}: "
            f"{type(error).__name__}: {error}",
            flush=True,
        )
        try:
            process.terminate()
        except Exception:
            pass


def _spawn_worker(
    ctx,
    username: str,
    password: str,
    barrier,
    restart_index: int,
) -> mp.Process:
    process = ctx.Process(
        target=run_user_session,
        args=(username, password, barrier, restart_index),
        name=f"mentoaula-{username}",
    )
    process.start()
    return process


def main() -> None:
    """Launch, monitor and independently restart the four user workers."""
    mp.freeze_support()
    RUNTIME_ROOT.mkdir(parents=True, exist_ok=True)
    ctx = mp.get_context("spawn")
    start_barrier = ctx.Barrier(len(USERS), timeout=180)

    print(f"Launching {len(USERS)} Mentoaula users concurrently...", flush=True)
    print(
        "Selected users: " + ", ".join(username for username, _ in USERS),
        flush=True,
    )
    print(f"Runtime/diagnostics directory: {RUNTIME_ROOT}", flush=True)

    workers: dict[str, dict] = {}
    for username, password in USERS:
        workers[username] = {
            "password": password,
            "process": _spawn_worker(
                ctx,
                username,
                password,
                start_barrier,
                restart_index=0,
            ),
            "restarts": 0,
            "done": False,
            "restart_at": None,
            "started_epoch": time.time(),
        }

    terminal_failures: list[tuple[str, int | None]] = []
    next_memory_log = 0.0

    try:
        while not all(record["done"] for record in workers.values()):
            now = time.monotonic()

            if now >= next_memory_log:
                next_memory_log = now + MEMORY_STATUS_LOG_SECONDS
                available_mb = _available_memory_mb()
                if available_mb is not None:
                    print(
                        f"[launcher] Available physical RAM: {available_mb} MB.",
                        flush=True,
                    )

            for username, record in workers.items():
                if record["done"]:
                    continue

                process: Optional[mp.Process] = record["process"]

                if process is not None and process.is_alive():
                    age = _heartbeat_age_seconds(
                        username,
                        record.get("started_epoch", time.time()),
                    )
                    runtime_age = time.time() - record.get("started_epoch", time.time())
                    if (
                        age is not None
                        and runtime_age >= HEARTBEAT_STARTUP_GRACE_SECONDS
                        and age >= HEARTBEAT_STALE_SECONDS
                    ):
                        print(
                            f"[launcher] {username} heartbeat is stale for "
                            f"{int(age)}s while process is still alive. Treating worker "
                            "as hung and recycling its full process tree.",
                            flush=True,
                        )
                        _terminate_worker_tree(process, username)
                        process.join(timeout=20)

                if process is not None and not process.is_alive():
                    process.join(timeout=0)
                    exitcode = process.exitcode
                    record["process"] = None

                    if exitcode == 0:
                        record["done"] = True
                        print(
                            f"[launcher] {username} completed successfully.",
                            flush=True,
                        )
                        continue

                    if record["restarts"] >= MAX_WORKER_RESTARTS:
                        record["done"] = True
                        terminal_failures.append((username, exitcode))
                        print(
                            f"[launcher] {username} exhausted {MAX_WORKER_RESTARTS} "
                            f"worker restarts; last exit code={exitcode}.",
                            flush=True,
                        )
                        continue

                    record["restarts"] += 1
                    record["restart_at"] = now + WORKER_RESTART_DELAY_SECONDS
                    print(
                        f"[launcher] {username} exited with code {exitcode}. "
                        f"Scheduling independent restart {record['restarts']}/"
                        f"{MAX_WORKER_RESTARTS} in {WORKER_RESTART_DELAY_SECONDS}s.",
                        flush=True,
                    )

                if (
                    record["process"] is None
                    and not record["done"]
                    and record["restart_at"] is not None
                    and now >= record["restart_at"]
                ):
                    available_mb = _available_memory_mb()
                    if (
                        available_mb is not None
                        and available_mb < MIN_AVAILABLE_RAM_MB_FOR_RESTART
                    ):
                        print(
                            f"[launcher] Delaying restart of {username}: only "
                            f"{available_mb} MB RAM available (< "
                            f"{MIN_AVAILABLE_RAM_MB_FOR_RESTART} MB). Retrying in "
                            f"{LOW_MEMORY_RETRY_DELAY_SECONDS}s.",
                            flush=True,
                        )
                        record["restart_at"] = now + LOW_MEMORY_RETRY_DELAY_SECONDS
                        continue

                    print(
                        f"[launcher] Restarting {username} from durable checkpoint...",
                        flush=True,
                    )
                    record["process"] = _spawn_worker(
                        ctx,
                        username,
                        record["password"],
                        barrier=None,
                        restart_index=record["restarts"],
                    )
                    record["started_epoch"] = time.time()
                    record["restart_at"] = None

            time.sleep(WORKER_MONITOR_POLL_SECONDS)

    except KeyboardInterrupt:
        print("\n[launcher] Ctrl+C received; terminating child workers...", flush=True)
        for record in workers.values():
            process = record.get("process")
            if process is not None and process.is_alive():
                _terminate_worker_tree(process, "Ctrl+C")
        for record in workers.values():
            process = record.get("process")
            if process is not None:
                try:
                    process.join(timeout=10)
                except Exception:
                    pass
        raise

    if terminal_failures:
        print("", flush=True)
        print("One or more user processes exhausted automatic restart recovery:", flush=True)
        for username, exitcode in terminal_failures:
            print(f"  - {username}: exit code {exitcode}", flush=True)
        raise SystemExit(1)

    print("", flush=True)
    print(f"ALL {len(USERS)} USER PROCESSES COMPLETED SUCCESSFULLY.", flush=True)


if __name__ == "__main__":
    main()
