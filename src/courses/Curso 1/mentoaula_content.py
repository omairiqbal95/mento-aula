from concurrent.futures import ProcessPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional
import json
import logging
import multiprocessing
import random
import re
import time
import traceback
from urllib.parse import urljoin

from playwright.sync_api import (
    Download,
    Frame,
    Locator,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    sync_playwright,
)

# ============================================================
# MENTOAULA CONTENT-ONLY AUTOMATION
# ============================================================
# This script intentionally contains NO test-answer configuration and NO exam
# submission logic.  Its job is long-running course-content completion only.

LOGIN_URL = "https://campus.mentoaula.com/SecureLogin/Login.aspx"

USERS = [
    ("AX5865276T", "Mentoaula5276"),
    ("R60049296E", "Mentoaula9296"),
    ("MY2069038H", "Mentoaula9038"),
    ("NZ4521732Y", "Mentoaula1732"),
    ("EZ2696920Z", "Mentoaula6920"),
    ("KZ3076489Z", "Mentoaula6489"),
    ("GZ1779380J", "Mentoaula9380"),
]

COURSE_DIALOG_IFRAME = "#ifrmemergentemodal"

DOWNLOAD_DIRECTORY = Path("downloads_content")
LOG_DIRECTORY = Path("logs_content")
DIAGNOSTIC_DIRECTORY = Path("diagnostics_content")
CURRENT_USERNAME = "unknown-user"
CURRENT_PASSWORD = ""
LOGGER = logging.getLogger("mentoaula_content")

DEFAULT_TIMEOUT_MS = 20_000
SHORT_TIMEOUT_MS = 10_000
TOUR_TIMEOUT_MS = 3_000

MIN_SLIDE_VIEW_SECONDS = 20
MAX_SLIDE_VIEW_SECONDS = 30
VIDEO_WAIT_SECONDS = 300
SCORM_SESSION_CHECK_SECONDS = 10 * 60
SCORM_LOAD_TIMEOUT_SECONDS = 120
SCORM_NEXT_TIMEOUT_SECONDS = 90
SCORM_TRANSITION_TIMEOUT_SECONDS = 30
SCORM_NEXT_CLICK_ATTEMPTS = 3
SCORM_RETRY_PAUSE_SECONDS = 2

NEXT_ARROW_PATH = "M8 4L14 10L8 16"
REQUIRED_START_IMAGE_SELECTOR = "#img1_186a02e"
VIDEO_PLAY_ICON_SELECTOR = "svg[data-play-icon='true']"

# Fallback only.  The live X de Y SCORM counter is authoritative whenever it
# is available.
UNIT_SLIDE_COUNTS = {
    1: 31,
    2: 48,
    3: 15,
    4: 36,
    5: 39,
}

HEADLESS = False
SLOW_MOTION_MS = 200

# Course-content phase target.  Normal slide/video time counts toward this.
MIN_CONTENT_HOURS = 40.0
MAX_CONTENT_HOURS = 41.0

ACTION_DELAY_MIN_SECONDS = 1.5
ACTION_DELAY_MAX_SECONDS = 4.0

# Course information + five SCORM units + four activities + glossary = 11
# pacing checkpoints.  Unit 3 has no configured activity.
CONTENT_PACE_CHECKPOINTS = 11

# Browser starts are staggered to reduce simultaneous Chromium/SCORM spikes.
MAX_CONCURRENT_USERS = len(USERS)
USER_START_STAGGER_SECONDS = 12

def configure_file_logging(log_file: Path) -> None:
    """Writes concise process logs to a file and nothing to the console."""
    log_file.parent.mkdir(parents=True, exist_ok=True)
    LOGGER.handlers.clear()
    LOGGER.setLevel(logging.INFO)
    LOGGER.propagate = False

    handler = logging.FileHandler(log_file, mode="a", encoding="utf-8")
    handler.setFormatter(logging.Formatter(
        "%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    ))
    LOGGER.addHandler(handler)


def print(*values, sep: str = " ", end: str = "\n", **_kwargs) -> None:
    """Compatibility wrapper: existing print calls become file log entries."""
    message = sep.join(str(value) for value in values).rstrip("\n")
    if message:
        LOGGER.info(message)


def log_exception(message: str) -> None:
    LOGGER.error("%s\n%s", message, traceback.format_exc())



@dataclass
class ContentPacer:
    username: str
    target_end: datetime
    checkpoints_remaining: int = CONTENT_PACE_CHECKPOINTS

    @classmethod
    def create(cls, username: str) -> "ContentPacer":
        target_hours = random.uniform(MIN_CONTENT_HOURS, MAX_CONTENT_HOURS)
        target_end = datetime.now() + timedelta(hours=target_hours)
        print(
            f"[{username}] Content target duration: {target_hours:.2f} hours; "
            f"target completion: {target_end.isoformat(timespec='seconds')}"
        )
        return cls(username=username, target_end=target_end)

    def wait_after_step(
        self,
        page: Page,
        username: str,
        password: str,
        label: str,
    ) -> None:
        if self.checkpoints_remaining <= 0:
            return

        remaining_seconds = max(
            0.0,
            (self.target_end - datetime.now()).total_seconds(),
        )
        base_delay = remaining_seconds / self.checkpoints_remaining
        delay_seconds = min(
            remaining_seconds,
            base_delay * random.uniform(0.90, 1.10),
        )
        self.checkpoints_remaining -= 1

        print(
            f"[{self.username}] Completed: {label}. "
            f"Content pacing delay: {delay_seconds / 60:.1f} minutes."
        )
        sleep_with_progress(
            page,
            delay_seconds,
            username,
            password,
            label,
        )

    def wait_until_target_end(
        self,
        page: Page,
        username: str,
        password: str,
    ) -> None:
        remaining_seconds = max(
            0.0,
            (self.target_end - datetime.now()).total_seconds(),
        )
        if remaining_seconds > 0:
            print(
                f"[{self.username}] Content actions finished early; "
                f"holding the authenticated session for "
                f"{remaining_seconds / 60:.1f} minutes."
            )
            sleep_with_progress(
                page,
                remaining_seconds,
                username,
                password,
                "final content-duration hold",
            )

def sleep_with_progress(
    page: Page,
    total_seconds: float,
    username: str,
    password: str,
    label: str,
    report_every_seconds: int = 3600,
    session_check_every_seconds: int = 300,
) -> None:
    """
    Waits for the pacing period and restores the authenticated session when
    the site logs the user out. The already completed course step is not
    repeated; after the wait finishes, execution continues with the next step.
    """

    deadline = time.monotonic() + max(0.0, total_seconds)
    next_report = time.monotonic() + report_every_seconds
    next_session_check = time.monotonic() + session_check_every_seconds

    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            ensure_course_page_ready(page, username, password)
            return

        time.sleep(min(30.0, remaining))
        now = time.monotonic()

        if now >= next_session_check:
            next_session_check = now + session_check_every_seconds

            try:
                if session_has_expired(page):
                    print(
                        f"[{username}] Session expired while waiting after "
                        f"'{label}'. Logging in again..."
                    )
                    save_diagnostic_screenshot(
                        page, username, f"session-expired-{safe_name(label)}"
                    )
                    restore_course_session(page, username, password)
                    print(
                        f"[{username}] Session restored. The next course "
                        f"section will run when the pacing wait finishes."
                    )
                else:
                    # Healthy periodic checks are intentionally not logged.
                    pass

            except PlaywrightTimeoutError as error:
                raise RuntimeError(
                    f"[{username}] Could not verify or restore the browser "
                    f"session while waiting after '{label}'. "
                    f"Current URL: {page.url}"
                ) from error

        if now >= next_report:
            print(
                f"[{username}] Still pacing after '{label}'; "
                f"{max(0.0, remaining) / 60:.1f} minutes remain."
            )
            next_report = now + report_every_seconds


def safe_name(value: str) -> str:
    return "".join(
        character if character.isalnum() or character in {"-", "_"} else "-"
        for character in value
    ).strip("-")


def save_diagnostic_screenshot(page: Page, username: str, label: str) -> Path:
    directory = DIAGNOSTIC_DIRECTORY / username
    directory.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    destination = directory / f"{label}-{timestamp}.png"
    try:
        page.screenshot(path=str(destination), full_page=True)
    except Exception as error:
        LOGGER.warning("[%s] Could not save screenshot: %s", username, error)
    return destination


def capture_page_diagnostics(
    page: Page,
    username: str,
    label: str,
    selector: Optional[str] = None,
) -> dict:
    """Captures compact machine-readable state plus screenshot and HTML."""
    directory = DIAGNOSTIC_DIRECTORY / username
    directory.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    stem = f"{safe_name(label)}-{timestamp}"
    screenshot_path = directory / f"{stem}.png"
    html_path = directory / f"{stem}.html"
    json_path = directory / f"{stem}.json"

    diagnostic = {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "username": username,
        "label": label,
        "url": page.url,
        "selector": selector,
    }

    try:
        diagnostic["title"] = page.title()
    except Exception as error:
        diagnostic["title_error"] = str(error)

    try:
        diagnostic["ready_state"] = page.evaluate("document.readyState")
    except Exception as error:
        diagnostic["ready_state_error"] = str(error)

    try:
        diagnostic["login_page_detected"] = session_has_expired(page)
    except Exception as error:
        diagnostic["login_detection_error"] = str(error)

    if selector:
        try:
            locator = page.locator(selector)
            count = locator.count()
            diagnostic["locator"] = {"count": count}
            if count:
                first = locator.first
                diagnostic["locator"].update({
                    "visible": first.is_visible(),
                    "enabled": first.is_enabled(),
                    "bounding_box": first.bounding_box(),
                    "text": (first.text_content() or "").strip()[:300],
                })
        except Exception as error:
            diagnostic["locator_error"] = str(error)

    try:
        diagnostic["visible_overlays"] = page.locator(
            ".ui-widget-overlay:visible, .modal:visible, "
            ".modal-backdrop:visible, [role='dialog']:visible"
        ).evaluate_all(
            "elements => elements.slice(0, 10).map(e => ({"
            "tag: e.tagName, id: e.id, className: String(e.className), "
            "text: (e.innerText || '').trim().slice(0, 300)}))"
        )
    except Exception as error:
        diagnostic["overlay_detection_error"] = str(error)

    try:
        page.screenshot(path=str(screenshot_path), full_page=True)
        diagnostic["screenshot"] = str(screenshot_path.resolve())
    except Exception as error:
        diagnostic["screenshot_error"] = str(error)

    try:
        html_path.write_text(page.content(), encoding="utf-8")
        diagnostic["html"] = str(html_path.resolve())
    except Exception as error:
        diagnostic["html_error"] = str(error)

    json_path.write_text(
        json.dumps(diagnostic, indent=2, ensure_ascii=False, default=str),
        encoding="utf-8",
    )
    diagnostic["json"] = str(json_path.resolve())
    return diagnostic


def handle_time_remaining_modal(page: Page) -> bool:
    """
    Handles Mentoaula's 'Aviso de tiempo restante' warning.

    Returns True when a visible warning was found and 'Sí, continuar' was
    clicked successfully.
    """
    try:
        dialogs = page.locator(".ui-dialog:visible, [role='dialog']:visible")
        for index in range(dialogs.count()):
            dialog = dialogs.nth(index)
            try:
                text_value = (dialog.inner_text() or "").strip()
            except Exception:
                continue

            if "Aviso de tiempo restante" not in text_value:
                continue

            LOGGER.info(
                "[%s] Time-remaining warning detected; continuing session.",
                CURRENT_USERNAME,
            )

            continue_selectors = [
                "button:has-text('Sí, continuar')",
                "button:has-text('Si, continuar')",
                "input[type='button'][value*='continuar']",
                "input[type='submit'][value*='continuar']",
                "a:has-text('Sí, continuar')",
                "a:has-text('Si, continuar')",
            ]

            for selector in continue_selectors:
                button = dialog.locator(selector).first
                try:
                    if button.count() > 0 and button.is_visible():
                        button.click(timeout=5_000, force=True)
                        page.wait_for_timeout(500)
                        LOGGER.info(
                            "[%s] 'Sí, continuar' clicked.",
                            CURRENT_USERNAME,
                        )
                        return True
                except Exception:
                    continue

            # Text fallback for legacy markup.
            try:
                button = dialog.get_by_text(
                    re.compile(r"^\s*S[ií],?\s*continuar\s*$", re.I)
                ).first
                if button.count() > 0 and button.is_visible():
                    button.click(timeout=5_000, force=True)
                    page.wait_for_timeout(500)
                    return True
            except Exception:
                pass

    except Exception as error:
        LOGGER.debug(
            "[%s] Time-warning inspection failed: %s",
            CURRENT_USERNAME,
            error,
        )

    return False

def dismiss_transient_ui(page: Page) -> None:
    """Closes known transient UI without dismissing meaningful course dialogs."""
    # Always prefer continuing the session over closing the warning.
    for _ in range(3):
        if not handle_time_remaining_modal(page):
            break

    selectors = [
        "#my-tour-button-finish:visible",
        ".modal:visible [data-dismiss='modal']:visible",
        ".modal:visible .btn-close:visible",
    ]

    for selector in selectors:
        locator = page.locator(selector)
        while locator.count() > 0:
            try:
                locator.last.click(timeout=2_000, force=True)
                page.wait_for_timeout(300)
            except Exception:
                break

def ensure_course_page_ready(
    page: Page,
    username: str,
    password: str,
    required_selector: Optional[str] = None,
) -> None:
    """Repairs an expired or partially stale course page."""
    if session_has_expired(page):
        LOGGER.warning("[%s] Session expired; restoring it.", username)
        restore_course_session(page, username, password)

    dismiss_transient_ui(page)
    selector = required_selector or (
        "#tod01, #tod02, #ctl02_idEncabezadoEvaluacion, "
        "a:has-text('Evaluación inicial')"
    )
    known_control = page.locator(selector).first

    try:
        known_control.wait_for(state="attached", timeout=SHORT_TIMEOUT_MS)
        return
    except PlaywrightTimeoutError:
        LOGGER.warning(
            "[%s] Course UI missing; reloading the course page once.", username
        )

    page.reload(wait_until="domcontentloaded", timeout=60_000)
    page.wait_for_timeout(1_000)
    if session_has_expired(page):
        restore_course_session(page, username, password)
    dismiss_transient_ui(page)
    page.locator(selector).first.wait_for(
        state="attached", timeout=DEFAULT_TIMEOUT_MS
    )


def robust_click(
    page: Page,
    locator: Locator,
    description: str,
    timeout_ms: int = SHORT_TIMEOUT_MS,
) -> None:
    """Clicks with normal, forced, and DOM-click fallbacks."""
    locator.wait_for(state="attached", timeout=timeout_ms)
    locator.scroll_into_view_if_needed(timeout=timeout_ms)

    try:
        locator.click(timeout=timeout_ms)
        return
    except PlaywrightTimeoutError:
        LOGGER.warning(
            "[%s] Normal click blocked for %s; trying forced click.",
            CURRENT_USERNAME, description,
        )

    dismiss_transient_ui(page)
    try:
        locator.click(timeout=5_000, force=True)
        return
    except Exception:
        LOGGER.warning(
            "[%s] Forced click failed for %s; trying DOM click.",
            CURRENT_USERNAME, description,
        )

    locator.evaluate("element => element.click()")


def session_has_expired(page: Page) -> bool:
    """Returns True when the browser is on, or has returned to, login."""

    try:
        username_field = page.locator("#usuario")
        password_field = page.locator("#password")

        if (
            username_field.count() > 0
            and password_field.count() > 0
            and username_field.first.is_visible()
            and password_field.first.is_visible()
        ):
            return True
    except Exception:
        pass

    return "SecureLogin/Login.aspx" in page.url


def restore_course_session(page: Page, username: str, password: str) -> None:
    """Logs in again and verifies that the main course page is available."""

    page.goto(LOGIN_URL, wait_until="domcontentloaded", timeout=60_000)
    login(page, username, password)
    close_first_login_tour(page)

    # The course page can legitimately have collapsed panels. We only verify
    # that at least one known top-level course control is attached.
    known_course_control = page.locator(
        "#tod01, #tod02, #ctl02_idEncabezadoEvaluacion, a:has-text('Evaluación inicial')"
    ).first
    known_course_control.wait_for(state="attached", timeout=DEFAULT_TIMEOUT_MS)

def action_delay(page: Page) -> None:
    page.wait_for_timeout(
        int(
            random.uniform(
                ACTION_DELAY_MIN_SECONDS,
                ACTION_DELAY_MAX_SECONDS,
            ) * 1_000
        )
    )

# ============================================================
# Course structure used by content automation only
# ============================================================

@dataclass(frozen=True)
class CourseUnit:
    number: int
    heading_selector: str
    body_selector: str
    content_name: str
    activity_name: Optional[str] = None


COURSE_UNITS = [
    CourseUnit(
        1, "#tod02", "#udpanel02", "Contenido unidad 1",
        "SMR099-SEAD025PO-UD1-ACTIVIDAD 1-POSIBLES ENFERMEDADES",
    ),
    CourseUnit(
        2, "#tod03", "#udpanel03", "Contenido unidad 2",
        "SMR099-SEAD025PO-UD2-ACTIVIDAD 2-RIESGO BIOLOGICO",
    ),
    CourseUnit(3, "#tod04", "#udpanel04", "Contenido unidad 3", None),
    CourseUnit(
        4, "#tod05", "#udpanel05", "Contenido unidad 4",
        "SMR099-SEAD025PO-UD4-ACTIVIDAD 3-PLANIFICACION ACTIVIDAD PREVENTIVA",
    ),
    CourseUnit(
        5, "#tod06", "#udpanel06", "Contenido unidad 5",
        "SMR099-SEAD025PO-UD5-ACTIVIDAD FINAL-EVALUA TU COMPETENCIA",
    ),
]

def print_section(title: str) -> None:
    print()
    print("=" * 60)
    print(title)
    print("=" * 60)


def get_course_frame(page: Page):
    return page.frame_locator(COURSE_DIALOG_IFRAME)


def get_latest_visible_dialog(page: Page) -> Locator:
    return page.locator(".ui-dialog:visible").last


def close_latest_dialog(page: Page) -> None:
    """
    Closes the most recently opened visible jQuery dialog using
    the X button in its title bar.
    """

    dialog = get_latest_visible_dialog(page)

    dialog.wait_for(
        state="visible",
        timeout=SHORT_TIMEOUT_MS,
    )

    close_button = dialog.locator(
        ".ui-dialog-titlebar-close"
    )

    close_button.wait_for(
        state="visible",
        timeout=SHORT_TIMEOUT_MS,
    )

    close_button.click()

    dialog.wait_for(
        state="hidden",
        timeout=SHORT_TIMEOUT_MS,
    )

    print("Popup closed.")


def expand_panel(
    page: Page,
    heading_selector: str,
    body_selector: str,
) -> None:
    """Expands a panel and recovers from stale or obstructed UI state."""
    body = page.locator(body_selector).first
    if body.count() > 0 and body.is_visible():
        return

    LOGGER.info("[%s] Opening panel %s.", CURRENT_USERNAME, heading_selector)
    last_error: Optional[Exception] = None

    for attempt in range(1, 4):
        try:
            ensure_course_page_ready(
                page, CURRENT_USERNAME, CURRENT_PASSWORD, heading_selector
            )
            dismiss_transient_ui(page)

            heading = page.locator(heading_selector).first
            robust_click(
                page, heading, f"panel {heading_selector}", SHORT_TIMEOUT_MS
            )
            body.wait_for(state="visible", timeout=SHORT_TIMEOUT_MS)
            return
        except Exception as error:
            last_error = error
            if attempt < 3:
                LOGGER.warning(
                    "[%s] Panel %s attempt %d failed; refreshing before retry.",
                    CURRENT_USERNAME, heading_selector, attempt,
                )
                try:
                    page.reload(wait_until="domcontentloaded", timeout=60_000)
                    page.wait_for_timeout(1_000)
                    if session_has_expired(page):
                        restore_course_session(
                            page, CURRENT_USERNAME, CURRENT_PASSWORD
                        )
                except Exception as recovery_error:
                    last_error = recovery_error
                continue

    diagnostic = capture_page_diagnostics(
        page,
        CURRENT_USERNAME,
        f"panel-failure-{safe_name(heading_selector)}",
        heading_selector,
    )
    locator_state = diagnostic.get("locator", {})
    overlays = diagnostic.get("visible_overlays", [])
    reason = (
        "login page detected" if diagnostic.get("login_page_detected")
        else "selector missing" if locator_state.get("count", 0) == 0
        else "selector hidden" if not locator_state.get("visible", False)
        else "selector disabled" if not locator_state.get("enabled", True)
        else "overlay/dialog blocking interaction" if overlays
        else "panel did not open after three recovery attempts"
    )
    raise RuntimeError(
        f"Could not expand panel {heading_selector}: {reason}. "
        f"URL={page.url}. Diagnostics={diagnostic.get('json')}."
    ) from last_error


def find_panel_link(
    page: Page,
    body_selector: str,
    link_text: str,
) -> Locator:
    """
    Finds a course item link inside a specific unit panel.
    """

    return (
        page.locator(f"{body_selector} a")
        .filter(has_text=link_text)
        .first
    )


# ============================================================
# 5. Login workflow
# ============================================================

def login(page: Page, username: str, password: str) -> None:
    """Logs in with retries and tolerates slow post-login navigation."""
    print_section("Login")

    course_ready = (
        "#tod01, #tod02, #ctl02_idEncabezadoEvaluacion, "
        "a:has-text('Evaluación inicial')"
    )
    last_error: Optional[Exception] = None

    for attempt in range(1, 4):
        try:
            print(
                "Opening login page..."
                if attempt == 1
                else f"Retrying login ({attempt}/3)..."
            )
            page.goto(
                LOGIN_URL,
                wait_until="domcontentloaded",
                timeout=60_000,
            )

            username_field = page.locator("#usuario").first
            password_field = page.locator("#password").first
            login_button = page.locator("#btnLogin").first

            username_field.wait_for(state="visible", timeout=DEFAULT_TIMEOUT_MS)
            password_field.wait_for(state="visible", timeout=DEFAULT_TIMEOUT_MS)
            login_button.wait_for(state="visible", timeout=DEFAULT_TIMEOUT_MS)

            action_delay(page)
            username_field.fill(username)
            action_delay(page)
            password_field.fill(password)

            # Do not let a slow scheduled navigation make the click itself fatal.
            login_button.click(no_wait_after=True, timeout=DEFAULT_TIMEOUT_MS)

            deadline = time.monotonic() + 60.0
            while time.monotonic() < deadline:
                ready = page.locator(course_ready).first
                if ready.count() > 0:
                    try:
                        if ready.is_visible():
                            print(f"[{username}] Login successful.")
                            return
                    except Exception:
                        pass

                # A completed navigation that still shows the login form means
                # authentication was rejected or the site returned to login.
                if time.monotonic() + 2.0 < deadline:
                    page.wait_for_timeout(1_000)

            raise PlaywrightTimeoutError(
                "Course page did not become ready after login submission."
            )

        except Exception as error:
            last_error = error
            LOGGER.warning(
                "[%s] Login attempt %d/3 failed: %s",
                username, attempt, error,
            )
            if attempt < 3:
                try:
                    page.wait_for_timeout(2_000)
                except Exception:
                    pass
                continue

    diagnostic = capture_page_diagnostics(
        page, username, "login-failure", "#btnLogin"
    )
    raise RuntimeError(
        "Authentication failed, or the course page did not load after "
        f"three attempts. Diagnostics: {diagnostic.get('json')}"
    ) from last_error


def close_first_login_tour(page: Page) -> None:
    """
    Closes the first-login campus tour when it appears.
    """

    print("Checking for first-time campus tour...")

    finish_button = page.locator(
        "#my-tour-button-finish"
    )

    try:
        finish_button.wait_for(
            state="visible",
            timeout=TOUR_TIMEOUT_MS,
        )

        finish_button.click()

        page.locator("#my-tour-tooltip").wait_for(
            state="hidden",
            timeout=SHORT_TIMEOUT_MS,
        )

        print("First-time campus tour closed.")

    except PlaywrightTimeoutError:
        pass


# ============================================================
# 6. Exam workflow
# ============================================================

def save_download(
    download: Download,
    description: str,
) -> None:
    DOWNLOAD_DIRECTORY.mkdir(
        parents=True,
        exist_ok=True,
    )

    user_download_directory = DOWNLOAD_DIRECTORY / CURRENT_USERNAME
    user_download_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    destination = (
        user_download_directory /
        download.suggested_filename
    )

    download.save_as(str(destination))

    print(
        f"{description} downloaded to: "
        f"{destination.resolve()}"
    )


def open_document(
    page: Page,
    heading_selector: str,
    body_selector: str,
    link_text: str,
    description: str,
) -> None:
    """
    Opens a PDF link.

    The file may either download directly or open in a new tab.
    """

    print_section(link_text)

    expand_panel(
        page=page,
        heading_selector=heading_selector,
        body_selector=body_selector,
    )

    document_link = find_panel_link(
        page=page,
        body_selector=body_selector,
        link_text=link_text,
    )

    document_link.wait_for(
        state="visible",
        timeout=SHORT_TIMEOUT_MS,
    )

    document_link.scroll_into_view_if_needed()

    captured_downloads: list[Download] = []
    captured_popups: list[Page] = []

    def capture_download(download: Download) -> None:
        captured_downloads.append(download)

    def capture_popup(popup: Page) -> None:
        captured_popups.append(popup)

    page.on("download", capture_download)
    page.on("popup", capture_popup)

    try:
        robust_click(page, document_link, f"document link {link_text}")
        page.wait_for_timeout(5_000)

    finally:
        page.remove_listener(
            "download",
            capture_download,
        )
        page.remove_listener(
            "popup",
            capture_popup,
        )

    if captured_downloads:
        save_download(
            download=captured_downloads[0],
            description=description,
        )
        return

    if captured_popups:
        document_page = captured_popups[-1]

        try:
            document_page.wait_for_load_state(
                "domcontentloaded",
                timeout=SHORT_TIMEOUT_MS,
            )
        except PlaywrightTimeoutError:
            pass

        print(
            f"{description} opened in a browser tab: "
            f"{document_page.url}"
        )

        if not document_page.is_closed():
            document_page.close()

        print(f"{description} tab closed.")
        return

    print(
        f"'{link_text}' was clicked, but no download "
        "or new browser tab was detected."
    )


# ============================================================
# 8. Interactive-content workflow
# ============================================================

def extract_window_open_url(link: Locator, base_url: str) -> Optional[str]:
    """Extracts the first URL passed to window.open from a link handler."""
    onclick = link.get_attribute("onclick") or ""
    href = link.get_attribute("href") or ""
    match = re.search(r"window\.open\(\s*['\"]([^'\"]+)", onclick)
    if match:
        return urljoin(base_url, match.group(1))
    if href and not href.startswith(("#", "javascript:")):
        return urljoin(base_url, href)
    return None


def find_reused_content_page(
    page: Page,
    pages_before: set[int],
    expected_url: Optional[str],
) -> Optional[Page]:
    candidates = [
        candidate
        for candidate in page.context.pages
        if not candidate.is_closed()
    ]

    for candidate in candidates:
        if id(candidate) not in pages_before and candidate is not page:
            return candidate

    if expected_url:
        expected_path = expected_url.split("?", 1)[0]
        for candidate in reversed(candidates):
            if candidate is page:
                continue
            try:
                if expected_path in candidate.url:
                    return candidate
            except Exception:
                continue

    return None



def visible_next_button_in_frame(frame: Frame) -> Optional[Locator]:
    """Returns a visible Next/Siguiente control from a SCORM frame."""
    selectors = [
        (
            "button:has("
            f"svg.uikit-primary-button__right-icon "
            f"path[d='{NEXT_ARROW_PATH}'])"
        ),
        (
            "[role='button']:has("
            f"svg.uikit-primary-button__right-icon "
            f"path[d='{NEXT_ARROW_PATH}'])"
        ),
        f"button:has(svg path[d='{NEXT_ARROW_PATH}'])",
        f"[role='button']:has(svg path[d='{NEXT_ARROW_PATH}'])",
        f"svg:has(path[d='{NEXT_ARROW_PATH}'])",
        "button:has-text('Siguiente')",
        "[role='button']:has-text('Siguiente')",
        "a:has-text('Siguiente')",
        "button:has-text('Next')",
        "[role='button']:has-text('Next')",
        "a:has-text('Next')",
    ]

    for selector in selectors:
        candidates = frame.locator(selector)

        for index in range(candidates.count()):
            candidate = candidates.nth(index)
            try:
                if not candidate.is_visible():
                    continue

                tag_name = candidate.evaluate(
                    "element => element.tagName.toLowerCase()"
                )
                if tag_name in {"svg", "path"}:
                    clickable = candidate.locator(
                        "xpath=ancestor::*["
                        "self::button or self::a or "
                        "@role='button' or @onclick][1]"
                    )
                    if (
                        clickable.count() > 0
                        and clickable.first.is_visible()
                    ):
                        return clickable.first

                return candidate
            except Exception:
                continue

    return None


def next_button_is_usable(button: Locator) -> bool:
    try:
        if not button.is_visible():
            return False
        if button.get_attribute("disabled") is not None:
            return False
        if (button.get_attribute("aria-disabled") or "").lower() == "true":
            return False
        if "disabled" in (button.get_attribute("class") or "").lower():
            return False
        return button.is_enabled()
    except Exception:
        return False


def find_usable_next_button(content_popup: Page) -> Optional[Locator]:
    """Returns the first currently usable Next control across all SCORM frames."""
    for frame in content_popup.frames:
        try:
            button = visible_next_button_in_frame(frame)
            if button is not None and next_button_is_usable(button):
                return button
        except Exception:
            continue
    return None


def wait_for_next_button(
    content_popup: Page,
    timeout_seconds: int,
) -> tuple[Frame, Locator]:
    """Waits until a visible and enabled Next control is available."""
    deadline = time.monotonic() + timeout_seconds

    while time.monotonic() < deadline:
        if content_popup.is_closed():
            raise RuntimeError("The SCORM content window closed unexpectedly.")

        for frame in content_popup.frames:
            try:
                button = visible_next_button_in_frame(frame)
                if button is not None and next_button_is_usable(button):
                    return frame, button
            except Exception:
                continue

        content_popup.wait_for_timeout(500)

    raise RuntimeError(
        "No visible and enabled Next button appeared in the SCORM content."
    )

def find_required_start_control(
    content_popup: Page,
) -> Optional[Locator]:
    for frame in content_popup.frames:
        try:
            image = frame.locator(REQUIRED_START_IMAGE_SELECTOR).first
            if image.count() == 0 or not image.is_visible():
                continue

            clickable = image.locator(
                "xpath=ancestor::*["
                "self::button or self::a or "
                "@role='button' or @onclick][1]"
            )
            if clickable.count() > 0 and clickable.first.is_visible():
                return clickable.first
            return image
        except Exception:
            continue

    return None


def click_required_start_control_if_present(
    content_popup: Page,
) -> bool:
    control = find_required_start_control(content_popup)
    if control is None:
        return False

    LOGGER.info(
        "[%s] Required in-slide control detected; clicking it.",
        CURRENT_USERNAME,
    )
    control.scroll_into_view_if_needed()

    try:
        control.click(timeout=DEFAULT_TIMEOUT_MS)
    except PlaywrightTimeoutError:
        control.click(force=True, timeout=DEFAULT_TIMEOUT_MS)

    content_popup.wait_for_timeout(1_000)
    return True


def find_video_play_control(content_popup: Page) -> Optional[Locator]:
    for frame in content_popup.frames:
        try:
            icons = frame.locator(VIDEO_PLAY_ICON_SELECTOR)
            for index in range(icons.count()):
                icon = icons.nth(index)
                if not icon.is_visible():
                    continue

                clickable = icon.locator(
                    "xpath=ancestor::*["
                    "self::button or self::a or "
                    "@role='button' or @onclick][1]"
                )
                if clickable.count() > 0 and clickable.first.is_visible():
                    return clickable.first
                return icon
        except Exception:
            continue

    return None


def play_video_if_present(
    content_popup: Page,
    unit: CourseUnit,
    slide_number: int,
) -> bool:
    control = find_video_play_control(content_popup)
    if control is None:
        return False

    LOGGER.info(
        "[%s] Unit %d slide %d contains video; clicking Play.",
        CURRENT_USERNAME,
        unit.number,
        slide_number,
    )

    control.scroll_into_view_if_needed()
    try:
        control.click(timeout=DEFAULT_TIMEOUT_MS)
    except PlaywrightTimeoutError:
        control.click(force=True, timeout=DEFAULT_TIMEOUT_MS)

    LOGGER.info(
        "[%s] Watching Unit %d slide %d video for %d seconds.",
        CURRENT_USERNAME,
        unit.number,
        slide_number,
        VIDEO_WAIT_SECONDS,
    )
    content_popup.wait_for_timeout(VIDEO_WAIT_SECONDS * 1_000)
    return True


def ensure_session_during_scorm(
    main_page: Page,
    last_check: float,
    unit: CourseUnit,
    slide_number: int,
) -> float:
    if time.monotonic() - last_check < SCORM_SESSION_CHECK_SECONDS:
        return last_check

    try:
        ensure_course_page_ready(
            main_page,
            CURRENT_USERNAME,
            CURRENT_PASSWORD,
            unit.heading_selector,
        )
    except Exception:
        restore_course_session(
            main_page,
            CURRENT_USERNAME,
            CURRENT_PASSWORD,
        )

    LOGGER.info(
        "[%s] Session check completed during Unit %d slide %d.",
        CURRENT_USERNAME,
        unit.number,
        slide_number,
    )
    return time.monotonic()


def read_slide_counter(
    content_popup: Page,
) -> Optional[tuple[int, int]]:
    """
    Auto-detects SCORM counters such as '2 de 31' from any nested frame.

    Returns (current_slide, total_slides).  This live value is authoritative;
    UNIT_SLIDE_COUNTS is retained only as a fallback for packages that expose
    no readable counter.
    """
    pattern = re.compile(r"\b(\d+)\s+de\s+(\d+)\b", re.I)

    for frame in content_popup.frames:
        try:
            body = frame.locator("body")
            if body.count() == 0:
                continue

            body_text = body.inner_text(timeout=2_000) or ""
            for current_text, total_text in pattern.findall(body_text):
                current = int(current_text)
                total = int(total_text)

                # Avoid unrelated page counters while accepting realistic
                # course sizes.
                if 1 <= current <= total and 2 <= total <= 500:
                    return current, total
        except Exception:
            continue

    return None


def wait_for_slide_counter(
    content_popup: Page,
    timeout_seconds: int = 15,
) -> Optional[tuple[int, int]]:
    """Waits briefly for a temporarily hidden live X/Y counter to reappear."""
    deadline = time.monotonic() + timeout_seconds
    while time.monotonic() < deadline:
        counter = read_slide_counter(content_popup)
        if counter is not None:
            return counter
        if content_popup.is_closed():
            raise RuntimeError("The SCORM content window closed unexpectedly.")
        content_popup.wait_for_timeout(250)
    return None


def read_visible_slide_number(
    content_popup: Page,
    total_slides: Optional[int] = None,
) -> Optional[int]:
    """
    Compatibility wrapper for older recovery code.

    When a live SCORM counter exists, its current slide is returned regardless
    of the configured fallback total.
    """
    counter = read_slide_counter(content_popup)
    if counter is not None:
        return counter[0]
    return None

def read_scorm_tracking_state(content_popup: Page) -> Optional[dict]:
    """
    Reads SCORM 1.2 tracking values from whichever frame owns window.API.

    This is diagnostic/verification only; it does not fabricate course state.
    """
    script = """
    () => {
        try {
            const api = window.API;
            if (!api || typeof api.LMSGetValue !== 'function') {
                return null;
            }
            const safeGet = (name) => {
                try { return api.LMSGetValue(name); }
                catch (e) { return null; }
            };
            let lastError = null;
            try {
                lastError = typeof api.LMSGetLastError === 'function'
                    ? api.LMSGetLastError()
                    : null;
            } catch (e) {}
            return {
                lesson_location: safeGet('cmi.core.lesson_location'),
                lesson_status: safeGet('cmi.core.lesson_status'),
                suspend_data_length: String(
                    safeGet('cmi.suspend_data') || ''
                ).length,
                session_time: safeGet('cmi.core.session_time'),
                last_error: lastError,
                frame_url: location.href
            };
        } catch (e) {
            return null;
        }
    }
    """

    for frame in content_popup.frames:
        try:
            state = frame.evaluate(script)
            if state:
                return state
        except Exception:
            continue

    return None

def commit_scorm_progress(
    content_popup: Page,
    unit: CourseUnit,
    slide_number: int,
) -> Optional[dict]:
    """
    Requests an LMSCommit from the real SCORM API when available and logs the
    resulting tracking values.
    """
    script = """
    () => {
        try {
            const api = window.API;
            if (!api || typeof api.LMSCommit !== 'function') {
                return null;
            }
            let result = null;
            let error = null;
            try { result = api.LMSCommit(''); }
            catch (e) { error = String(e); }
            let lastError = null;
            try {
                lastError = typeof api.LMSGetLastError === 'function'
                    ? api.LMSGetLastError()
                    : null;
            } catch (e) {}
            const safeGet = (name) => {
                try { return api.LMSGetValue(name); }
                catch (e) { return null; }
            };
            return {
                commit_result: result,
                commit_error: error,
                lesson_location: safeGet('cmi.core.lesson_location'),
                lesson_status: safeGet('cmi.core.lesson_status'),
                last_error: lastError,
                frame_url: location.href
            };
        } catch (e) {
            return null;
        }
    }
    """

    for frame in content_popup.frames:
        try:
            state = frame.evaluate(script)
            if state:
                LOGGER.info(
                    "[%s] SCORM commit Unit %d slide %d: result=%s, "
                    "location=%r, status=%r, error=%r.",
                    CURRENT_USERNAME,
                    unit.number,
                    slide_number,
                    state.get("commit_result"),
                    state.get("lesson_location"),
                    state.get("lesson_status"),
                    state.get("last_error"),
                )
                return state
        except Exception:
            continue

    LOGGER.warning(
        "[%s] No callable SCORM API was found while committing Unit %d slide %d.",
        CURRENT_USERNAME,
        unit.number,
        slide_number,
    )
    return None

def finish_scorm_session(
    content_popup: Page,
    unit: CourseUnit,
) -> None:
    """Commits and then calls LMSFinish at the natural end of a unit."""
    script = """
    () => {
        try {
            const api = window.API;
            if (!api) return null;
            let commit = null;
            let finish = null;
            let error = null;
            try {
                if (typeof api.LMSCommit === 'function') {
                    commit = api.LMSCommit('');
                }
            } catch (e) {
                error = 'commit: ' + String(e);
            }
            try {
                if (typeof api.LMSFinish === 'function') {
                    finish = api.LMSFinish('');
                }
            } catch (e) {
                error = (error ? error + '; ' : '') + 'finish: ' + String(e);
            }
            let lastError = null;
            try {
                lastError = typeof api.LMSGetLastError === 'function'
                    ? api.LMSGetLastError()
                    : null;
            } catch (e) {}
            return {commit, finish, error, lastError, frame_url: location.href};
        } catch (e) {
            return null;
        }
    }
    """

    for frame in content_popup.frames:
        try:
            result = frame.evaluate(script)
            if result:
                LOGGER.info(
                    "[%s] SCORM finish Unit %d: commit=%s, finish=%s, "
                    "last_error=%r.",
                    CURRENT_USERNAME,
                    unit.number,
                    result.get("commit"),
                    result.get("finish"),
                    result.get("lastError"),
                )
                content_popup.wait_for_timeout(2_000)
                return
        except Exception:
            continue


def wait_for_slide_transition(
    content_popup: Page,
    previous_counter: Optional[tuple[int, int]],
    target_slide: Optional[int] = None,
    timeout_seconds: int = SCORM_TRANSITION_TIMEOUT_SECONDS,
    allow_weak_fallback: bool = False,
) -> Optional[tuple[int, int]]:
    """
    Waits for a SCORM slide transition.

    IMPORTANT: when a real live counter was available before the click, only a
    real counter advance is accepted.  The old implementation could fabricate
    the next slide merely because the Next button became usable again, which
    produced loops such as 1/31 -> fake 2/31 -> 1/31.

    A weak synthetic fallback is allowed only for packages that genuinely have
    no readable counter at all.
    """
    deadline = time.monotonic() + timeout_seconds

    while time.monotonic() < deadline:
        if content_popup.is_closed():
            raise RuntimeError("The SCORM content window closed unexpectedly.")

        observed = read_slide_counter(content_popup)
        if observed is not None:
            if previous_counter is None:
                return observed

            previous_slide, _previous_total = previous_counter
            if observed[0] > previous_slide:
                if target_slide is None or observed[0] >= target_slide:
                    return observed

        content_popup.wait_for_timeout(250)

    if not allow_weak_fallback or previous_counter is None:
        return None

    # Counter-less packages only: Next becoming usable again is weaker evidence
    # of movement.  Never use this path when a real X/Y counter was available.
    try:
        wait_for_next_button(content_popup, timeout_seconds=5)
        previous_slide, previous_total = previous_counter
        expected = target_slide or (previous_slide + 1)
        return min(expected, previous_total), previous_total
    except Exception:
        return None


def advance_scorm_slide(
    content_popup: Page,
    unit: CourseUnit,
    current_slide: int,
    total_slides: int,
    live_counter: Optional[tuple[int, int]],
    transition_timeout_seconds: int = SCORM_TRANSITION_TIMEOUT_SECONDS,
) -> tuple[int, int]:
    """
    Clicks Next and confirms one real slide advance.

    If a live X/Y counter exists, the counter itself must advance.  A failed
    click is retried up to SCORM_NEXT_CLICK_ATTEMPTS times without advancing the
    local checkpoint.
    """
    had_live_counter = live_counter is not None
    previous_counter = (
        live_counter if had_live_counter else (current_slide, total_slides)
    )
    target_slide = current_slide + 1

    for click_attempt in range(1, SCORM_NEXT_CLICK_ATTEMPTS + 1):
        # Before retrying, check whether a delayed transition from the previous
        # click finally appeared.  This avoids double-clicking and skipping.
        now_counter = read_slide_counter(content_popup)
        if had_live_counter and now_counter is not None:
            if now_counter[0] > current_slide:
                return now_counter

        _frame, next_button = wait_for_next_button(
            content_popup,
            timeout_seconds=SCORM_NEXT_TIMEOUT_SECONDS,
        )
        next_button.scroll_into_view_if_needed()

        LOGGER.info(
            "[%s] Unit %d slide %d/%d: clicking Next (attempt %d/%d).",
            CURRENT_USERNAME,
            unit.number,
            current_slide,
            total_slides,
            click_attempt,
            SCORM_NEXT_CLICK_ATTEMPTS,
        )

        try:
            next_button.click(timeout=DEFAULT_TIMEOUT_MS)
        except PlaywrightTimeoutError:
            next_button.click(force=True, timeout=DEFAULT_TIMEOUT_MS)

        observed = wait_for_slide_transition(
            content_popup,
            previous_counter,
            target_slide=target_slide,
            timeout_seconds=transition_timeout_seconds,
            allow_weak_fallback=not had_live_counter,
        )

        if observed is not None:
            if not had_live_counter or observed[0] > current_slide:
                return observed

        # Give a late UI transition a final chance before another click.
        content_popup.wait_for_timeout(SCORM_RETRY_PAUSE_SECONDS * 1_000)
        late_counter = read_slide_counter(content_popup)
        if had_live_counter and late_counter is not None:
            if late_counter[0] > current_slide:
                return late_counter

        LOGGER.warning(
            "[%s] Unit %d did not confirm movement from slide %d after "
            "Next attempt %d/%d; retrying without changing checkpoint.",
            CURRENT_USERNAME,
            unit.number,
            current_slide,
            click_attempt,
            SCORM_NEXT_CLICK_ATTEMPTS,
        )

    raise RuntimeError(
        f"Unit {unit.number} did not confirm a real transition from "
        f"slide {current_slide} after {SCORM_NEXT_CLICK_ATTEMPTS} Next attempts."
    )


def fast_forward_to_checkpoint(
    content_popup: Page,
    unit: CourseUnit,
    target_slide: int,
    fallback_total: Optional[int] = None,
) -> int:
    """
    Reaches a locally confirmed checkpoint after a SCORM retry without
    repeating the normal 20–30 second dwell time.

    The live 'X de Y' counter is preferred.  Configured unit counts are used
    only when the SCORM package does not expose a readable counter.
    """
    fallback_total = fallback_total or UNIT_SLIDE_COUNTS.get(unit.number, 500)
    counter = read_slide_counter(content_popup)
    counter_seen = counter is not None
    current = counter[0] if counter else 1
    total = counter[1] if counter else fallback_total

    if current >= target_slide:
        return current

    LOGGER.info(
        "[%s] Unit %d reopened at slide %d/%d; fast-forwarding to confirmed "
        "checkpoint slide %d.",
        CURRENT_USERNAME,
        unit.number,
        current,
        total,
        target_slide,
    )

    safety_clicks = 0

    while current < target_slide:
        click_required_start_control_if_present(content_popup)

        # If a video overlay blocks navigation on a previously confirmed slide,
        # start it but do not repeat the full viewing period.
        video = find_video_play_control(content_popup)
        if video is not None:
            try:
                video.click(timeout=5_000, force=True)
                content_popup.wait_for_timeout(2_000)
            except Exception:
                pass

        live_counter = read_slide_counter(content_popup)
        if live_counter is not None:
            counter_seen = True
        elif counter_seen:
            live_counter = wait_for_slide_counter(content_popup, 15)
            if live_counter is None:
                raise RuntimeError(
                    f"Unit {unit.number} live slide counter disappeared during "
                    "checkpoint recovery."
                )

        current, total = advance_scorm_slide(
            content_popup,
            unit,
            current,
            total,
            live_counter=live_counter,
            transition_timeout_seconds=20,
        )

        commit_scorm_progress(content_popup, unit, current)

        safety_clicks += 1
        if safety_clicks > 500:
            raise RuntimeError(
                f"Safety stop while fast-forwarding Unit {unit.number}: "
                "more than 500 Next clicks."
            )

    return current

def read_unit_progress_percent(
    main_page: Page,
    unit: CourseUnit,
) -> Optional[int]:
    """Reads Mentoaula's 'Páginas visitadas' percentage after closing SCORM."""
    try:
        ensure_course_page_ready(
            main_page,
            CURRENT_USERNAME,
            CURRENT_PASSWORD,
            unit.heading_selector,
        )
        expand_panel(main_page, unit.heading_selector, unit.body_selector)

        values = main_page.locator(
            f"{unit.body_selector} .progress-bar-percent"
        )
        for index in range(values.count()):
            text_value = (values.nth(index).inner_text() or "").strip()
            match = re.search(r"(\d+)\s*%", text_value)
            if match:
                return int(match.group(1))
    except Exception:
        return None

    return None


def view_all_unit_slides(
    main_page: Page,
    content_popup: Page,
    unit: CourseUnit,
    progress: dict,
) -> None:
    """
    Views a complete SCORM unit.

    Last-slide detection is driven primarily by the live SCORM counter
    (for example '31 de 31'), matching the proven single-user test.  The
    configured UNIT_SLIDE_COUNTS value is only a fallback when no readable
    counter is available.
    """
    fallback_total = UNIT_SLIDE_COUNTS.get(unit.number, 500)

    try:
        content_popup.wait_for_load_state(
            "domcontentloaded",
            timeout=60_000,
        )
    except PlaywrightTimeoutError:
        pass

    # Flexible readiness: live counter, required interaction, video, usable
    # Next button, or populated nested content.
    deadline = time.monotonic() + SCORM_LOAD_TIMEOUT_SECONDS
    ready = False

    while time.monotonic() < deadline:
        if read_slide_counter(content_popup) is not None:
            ready = True
            break

        if (
            find_required_start_control(content_popup) is not None
            or find_video_play_control(content_popup) is not None
            or find_usable_next_button(content_popup) is not None
        ):
            ready = True
            break

        try:
            populated_frames = 0
            for frame in content_popup.frames[1:]:
                body = frame.locator("body")
                if (
                    body.count()
                    and len((body.inner_text(timeout=1_000) or "").strip()) > 20
                ):
                    populated_frames += 1
            if populated_frames >= 1 and len(content_popup.frames) >= 2:
                # A populated nested frame means the SCORM package itself has
                # loaded, even if its counter/controls are still animating.
                LOGGER.info(
                    "[%s] Unit %d SCORM nested content loaded; waiting briefly "
                    "for navigation controls.",
                    CURRENT_USERNAME,
                    unit.number,
                )
                content_popup.wait_for_timeout(2_000)
                ready = True
                break
        except Exception:
            pass

        content_popup.wait_for_timeout(1_000)

    if not ready:
        raise RuntimeError(
            f"Unit {unit.number} SCORM content never became interactive."
        )

    confirmed_slide = int(progress.get("confirmed_slide", 1))
    counter = read_slide_counter(content_popup)

    if counter is not None:
        actual_slide, detected_total = counter
        progress["detected_total"] = detected_total
    else:
        actual_slide = 1
        detected_total = int(progress.get("detected_total", fallback_total))

    if actual_slide < confirmed_slide:
        actual_slide = fast_forward_to_checkpoint(
            content_popup,
            unit,
            confirmed_slide,
            fallback_total=detected_total,
        )
        counter = read_slide_counter(content_popup)
        if counter is not None:
            actual_slide, detected_total = counter
            progress["detected_total"] = detected_total

    elif actual_slide > confirmed_slide:
        confirmed_slide = actual_slide
        progress["confirmed_slide"] = confirmed_slide

    LOGGER.info(
        "[%s] Unit %d starting/resuming at slide %d/%d; local checkpoint=%d%s.",
        CURRENT_USERNAME,
        unit.number,
        actual_slide,
        detected_total,
        confirmed_slide,
        " (live total detected)" if counter is not None else " (fallback total)",
    )

    initial_scorm_state = read_scorm_tracking_state(content_popup)
    if initial_scorm_state:
        LOGGER.info(
            "[%s] Unit %d initial SCORM state: location=%r, status=%r, error=%r.",
            CURRENT_USERNAME,
            unit.number,
            initial_scorm_state.get("lesson_location"),
            initial_scorm_state.get("lesson_status"),
            initial_scorm_state.get("last_error"),
        )

    last_session_check = time.monotonic()
    current_slide = max(actual_slide, confirmed_slide)
    total_slides = detected_total
    counter_seen = bool(progress.get("counter_seen", counter is not None))
    if counter is not None:
        progress["counter_seen"] = True
    safety_clicks = 0

    while True:
        if content_popup.is_closed():
            raise RuntimeError(
                f"Unit {unit.number} SCORM popup closed unexpectedly."
            )

        # Re-read every iteration because the player is authoritative.
        live_counter = read_slide_counter(content_popup)
        if live_counter is not None:
            live_current, live_total = live_counter
            current_slide = live_current
            total_slides = live_total
            counter_seen = True
            progress["counter_seen"] = True
            progress["detected_total"] = live_total
        elif counter_seen:
            # This package has already proven that it exposes a live counter.
            # Do not silently downgrade to synthetic/counter-less progress if
            # that counter is only temporarily hidden.
            live_counter = wait_for_slide_counter(content_popup, 15)
            if live_counter is None:
                raise RuntimeError(
                    f"Unit {unit.number} live slide counter disappeared while "
                    f"at confirmed slide {progress.get('confirmed_slide', current_slide)}."
                )
            live_current, live_total = live_counter
            current_slide = live_current
            total_slides = live_total
            progress["detected_total"] = live_total

        last_session_check = ensure_session_during_scorm(
            main_page,
            last_session_check,
            unit,
            current_slide,
        )

        # If the player explicitly says X of X, this is the final slide.
        if live_counter is not None and current_slide >= total_slides:
            final_wait = random.randint(
                MIN_SLIDE_VIEW_SECONDS,
                MAX_SLIDE_VIEW_SECONDS,
            )
            LOGGER.info(
                "[%s] Viewing Unit %d final slide %d/%d for %d seconds.",
                CURRENT_USERNAME,
                unit.number,
                current_slide,
                total_slides,
                final_wait,
            )
            content_popup.wait_for_timeout(final_wait * 1_000)

            click_required_start_control_if_present(content_popup)
            play_video_if_present(content_popup, unit, current_slide)

            progress["confirmed_slide"] = current_slide
            commit_scorm_progress(content_popup, unit, current_slide)

            LOGGER.info(
                "[%s] Live SCORM counter confirms final slide %d/%d for Unit %d.",
                CURRENT_USERNAME,
                current_slide,
                total_slides,
                unit.number,
            )
            break

        dwell_seconds = random.randint(
            MIN_SLIDE_VIEW_SECONDS,
            MAX_SLIDE_VIEW_SECONDS,
        )
        LOGGER.info(
            "[%s] Viewing Unit %d slide %d/%d for %d seconds.",
            CURRENT_USERNAME,
            unit.number,
            current_slide,
            total_slides,
            dwell_seconds,
        )
        content_popup.wait_for_timeout(dwell_seconds * 1_000)

        click_required_start_control_if_present(content_popup)
        play_video_if_present(content_popup, unit, current_slide)

        if live_counter is None:
            # Without a readable counter, absence of Next is the only practical
            # final-slide fallback.  Wait the full normal timeout first.
            try:
                wait_for_next_button(
                    content_popup,
                    timeout_seconds=SCORM_NEXT_TIMEOUT_SECONDS,
                )
            except RuntimeError:
                LOGGER.info(
                    "[%s] Unit %d has no readable slide counter and no usable "
                    "Next control after %d seconds; treating current content "
                    "as the final slide.",
                    CURRENT_USERNAME,
                    unit.number,
                    SCORM_NEXT_TIMEOUT_SECONDS,
                )
                progress["confirmed_slide"] = current_slide
                commit_scorm_progress(content_popup, unit, current_slide)
                break

        # Re-resolve/click/verify inside one helper.  The helper never advances
        # a live-counter checkpoint unless the real counter actually moves.
        current_slide, total_slides = advance_scorm_slide(
            content_popup,
            unit,
            current_slide,
            total_slides,
            live_counter=live_counter,
        )
        progress["confirmed_slide"] = current_slide
        progress["detected_total"] = total_slides

        commit_scorm_progress(
            content_popup,
            unit,
            current_slide,
        )

        LOGGER.info(
            "[%s] Confirmed Unit %d slide %d/%d.",
            CURRENT_USERNAME,
            unit.number,
            current_slide,
            total_slides,
        )

        safety_clicks += 1
        if safety_clicks > 500:
            raise RuntimeError(
                f"Safety stop in Unit {unit.number}: more than 500 Next clicks."
            )

    LOGGER.info(
        "[%s] All slides for Unit %d were confirmed; final detected position=%d/%d.",
        CURRENT_USERNAME,
        unit.number,
        progress.get("confirmed_slide", current_slide),
        progress.get("detected_total", total_slides),
    )

def close_content_popup(
    content_popup: Page,
    unit: CourseUnit,
) -> None:
    if content_popup.is_closed():
        return

    # Give the SCORM API a chance to persist the final state before unload.
    finish_scorm_session(content_popup, unit)
    content_popup.wait_for_timeout(2_000)

    selectors = [
        "button[aria-label='Close']",
        "button[aria-label='Cerrar']",
        "[role='button'][aria-label='Close']",
        "[role='button'][aria-label='Cerrar']",
        "button:has-text('Cerrar')",
        "button:has-text('Close')",
        ".close",
        ".modal-close",
        "[data-close]",
    ]

    for frame in content_popup.frames:
        for selector in selectors:
            try:
                controls = frame.locator(selector)
                for index in range(controls.count()):
                    control = controls.nth(index)
                    if control.is_visible():
                        LOGGER.info(
                            "[%s] Clicking SCORM close control for Unit %d.",
                            CURRENT_USERNAME,
                            unit.number,
                        )
                        control.click(timeout=5_000)
                        content_popup.wait_for_timeout(2_000)
                        if content_popup.is_closed():
                            return
            except Exception:
                continue

    if not content_popup.is_closed():
        LOGGER.info(
            "[%s] No usable in-content X found for Unit %d; closing popup "
            "after SCORM finish.",
            CURRENT_USERNAME,
            unit.number,
        )
        content_popup.close()

def open_interactive_content(
    page: Page,
    unit: CourseUnit,
) -> None:
    print_section(unit.content_name)
    last_error: Optional[Exception] = None

    # This checkpoint survives popup/session retries within the same worker.
    progress = {"confirmed_slide": 1}

    for attempt in range(1, 4):
        content_popup: Optional[Page] = None

        try:
            ensure_course_page_ready(
                page,
                CURRENT_USERNAME,
                CURRENT_PASSWORD,
                unit.heading_selector,
            )
            dismiss_transient_ui(page)

            expand_panel(
                page=page,
                heading_selector=unit.heading_selector,
                body_selector=unit.body_selector,
            )

            content_link = find_panel_link(
                page=page,
                body_selector=unit.body_selector,
                link_text=unit.content_name,
            )
            content_link.wait_for(
                state="visible",
                timeout=SHORT_TIMEOUT_MS,
            )
            content_link.scroll_into_view_if_needed()

            direct_url = extract_window_open_url(content_link, page.url)
            pages_before = {
                id(candidate)
                for candidate in page.context.pages
            }

            try:
                with page.expect_popup(
                    timeout=DEFAULT_TIMEOUT_MS
                ) as popup_info:
                    robust_click(
                        page,
                        content_link,
                        f"content link {unit.content_name}",
                    )
                content_popup = popup_info.value

            except PlaywrightTimeoutError:
                content_popup = find_reused_content_page(
                    page,
                    pages_before,
                    direct_url,
                )

                if content_popup is None and direct_url:
                    LOGGER.warning(
                        "[%s] '%s' popup event was missed; opening the "
                        "course-provided SCORM launch URL directly.",
                        CURRENT_USERNAME,
                        unit.content_name,
                    )
                    content_popup = page.context.new_page()
                    content_popup.goto(
                        direct_url,
                        wait_until="domcontentloaded",
                        timeout=60_000,
                    )

            if content_popup is None:
                raise RuntimeError(
                    f"'{unit.content_name}' did not open."
                )

            if session_has_expired(content_popup):
                close_content_popup(content_popup, unit)
                restore_course_session(
                    page,
                    CURRENT_USERNAME,
                    CURRENT_PASSWORD,
                )
                continue

            LOGGER.info(
                "[%s] '%s' opened (attempt %d/3); checkpoint slide=%d.",
                CURRENT_USERNAME,
                unit.content_name,
                attempt,
                progress["confirmed_slide"],
            )

            view_all_unit_slides(
                page,
                content_popup,
                unit,
                progress,
            )

            close_content_popup(content_popup, unit)
            content_popup = None

            # Return to/reload the LMS so the displayed progress reflects the
            # committed SCORM state.
            ensure_course_page_ready(
                page,
                CURRENT_USERNAME,
                CURRENT_PASSWORD,
                unit.heading_selector,
            )
            try:
                page.reload(
                    wait_until="domcontentloaded",
                    timeout=60_000,
                )
                page.wait_for_timeout(2_000)
                if session_has_expired(page):
                    restore_course_session(
                        page,
                        CURRENT_USERNAME,
                        CURRENT_PASSWORD,
                    )
            except Exception:
                pass

            percent = read_unit_progress_percent(page, unit)
            if percent is not None:
                LOGGER.info(
                    "[%s] Unit %d LMS reports %d%% pages visited after close.",
                    CURRENT_USERNAME,
                    unit.number,
                    percent,
                )
                if percent <= 5 and UNIT_SLIDE_COUNTS[unit.number] > 5:
                    LOGGER.warning(
                        "[%s] Unit %d still reports only %d%% after all slides; "
                        "SCORM tracking did not persist as expected.",
                        CURRENT_USERNAME,
                        unit.number,
                        percent,
                    )
            else:
                LOGGER.warning(
                    "[%s] Could not read LMS progress percentage for Unit %d.",
                    CURRENT_USERNAME,
                    unit.number,
                )

            LOGGER.info(
                "[%s] '%s' completed.",
                CURRENT_USERNAME,
                unit.content_name,
            )
            return

        except Exception as error:
            last_error = error

            LOGGER.warning(
                "[%s] '%s' attempt %d/3 failed at confirmed slide %d: %s",
                CURRENT_USERNAME,
                unit.content_name,
                attempt,
                progress["confirmed_slide"],
                error,
            )

            if (
                content_popup is not None
                and not content_popup.is_closed()
            ):
                try:
                    close_content_popup(content_popup, unit)
                except Exception:
                    pass

            if attempt < 3:
                restore_course_session(
                    page,
                    CURRENT_USERNAME,
                    CURRENT_PASSWORD,
                )
                continue

    diagnostic = capture_page_diagnostics(
        page,
        CURRENT_USERNAME,
        (
            "interactive-content-failure-"
            f"{safe_name(unit.content_name)}"
        ),
    )
    diagnostic["last_confirmed_slide"] = progress["confirmed_slide"]

    raise RuntimeError(
        f"Could not complete '{unit.content_name}' after three attempts. "
        f"Last confirmed slide: {progress['confirmed_slide']}. "
        f"Diagnostics: {diagnostic.get('json')}"
    ) from last_error

# ============================================================
# 9. Activity workflow

def open_activity(
    page: Page,
    unit: CourseUnit,
) -> None:
    """
    Opens and closes a unit activity.

    Units without an activity are skipped.
    """

    if not unit.activity_name:
        return

    print_section(unit.activity_name)

    expand_panel(
        page=page,
        heading_selector=unit.heading_selector,
        body_selector=unit.body_selector,
    )

    activity_link = find_panel_link(
        page=page,
        body_selector=unit.body_selector,
        link_text=unit.activity_name,
    )

    activity_link.wait_for(
        state="visible",
        timeout=SHORT_TIMEOUT_MS,
    )

    robust_click(page, activity_link, f"activity link {unit.activity_name}")

    get_latest_visible_dialog(page).wait_for(
        state="visible",
        timeout=DEFAULT_TIMEOUT_MS,
    )

    get_course_frame(page).locator("body").wait_for(
        state="visible",
        timeout=DEFAULT_TIMEOUT_MS,
    )

    print(f"'{unit.activity_name}' popup opened.")
    print("Closing activity popup...")

    close_latest_dialog(page)

    print(
        f"'{unit.activity_name}' popup closed. "
        "Moving on."
    )


# ============================================================
# 10. Unit workflow
# ============================================================

# ============================================================
# Content-only workflow
# ============================================================

def download_course_information(page: Page) -> None:
    open_document(
        page=page,
        heading_selector="#tod01",
        body_selector="#udpanel01",
        link_text="Información del curso",
        description="Course information",
    )


def download_glossary(page: Page) -> None:
    open_document(
        page=page,
        heading_selector="#tod07",
        body_selector="#udpanel07",
        link_text="Glosario",
        description="Glossary",
    )


def verify_content_access(page: Page) -> None:
    """Fail early with a useful message if Unit 1 is still locked."""
    try:
        expand_panel(page, "#tod02", "#udpanel02")
        link = find_panel_link(
            page,
            "#udpanel02",
            "Contenido unidad 1",
        )
        link.wait_for(state="visible", timeout=SHORT_TIMEOUT_MS)
    except Exception as error:
        raise RuntimeError(
            "Unit 1 content is not accessible. On a completely fresh account, "
            "Mentoaula may require the Evaluación inicial first. Run "
            "mentoaula_tests.py with TEST_MODE='initial_only', then rerun the "
            "content script."
        ) from error


def complete_content_course(
    page: Page,
    pacer: ContentPacer,
    username: str,
    password: str,
) -> None:
    verify_content_access(page)

    # Non-SCORM documents are useful course content but should not destroy a
    # 40-hour run if the browser handles the PDF differently on one account.
    try:
        download_course_information(page)
    except Exception as error:
        LOGGER.warning(
            "[%s] Course-information step failed non-fatally: %s",
            username,
            error,
        )
    pacer.wait_after_step(page, username, password, "course information")

    for unit in COURSE_UNITS:
        # SCORM completion is the core purpose of this script, so a unit failure
        # remains fatal after the built-in three recovery attempts.
        open_interactive_content(page=page, unit=unit)
        pacer.wait_after_step(
            page,
            username,
            password,
            f"unit {unit.number} interactive content",
        )

        # Activities in the original script were only opened and closed. Keep
        # that behaviour, but do not sacrifice completed SCORM work if an
        # optional activity dialog itself is unavailable.
        if unit.activity_name:
            try:
                open_activity(page=page, unit=unit)
            except Exception as error:
                LOGGER.warning(
                    "[%s] Unit %d activity failed non-fatally: %s",
                    username,
                    unit.number,
                    error,
                )
            pacer.wait_after_step(
                page,
                username,
                password,
                f"unit {unit.number} activity",
            )

    try:
        download_glossary(page)
    except Exception as error:
        LOGGER.warning(
            "[%s] Glossary step failed non-fatally: %s",
            username,
            error,
        )
    pacer.wait_after_step(page, username, password, "glossary")
    pacer.wait_until_target_end(page, username, password)


def run_user(
    username: str,
    password: str,
    startup_delay_seconds: float = 0.0,
) -> str:
    global CURRENT_USERNAME, CURRENT_PASSWORD
    CURRENT_USERNAME = username
    CURRENT_PASSWORD = password
    configure_file_logging(LOG_DIRECTORY / f"{username}.log")

    if startup_delay_seconds > 0:
        LOGGER.info(
            "[%s] Worker launch stagger: waiting %.1f seconds before browser start.",
            username,
            startup_delay_seconds,
        )
        time.sleep(startup_delay_seconds)

    LOGGER.info("[%s] Content worker started.", username)
    pacer = ContentPacer.create(username)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=HEADLESS,
            slow_mo=SLOW_MOTION_MS,
        )
        context = browser.new_context(accept_downloads=True)
        page = context.new_page()

        try:
            login(page, username, password)
            close_first_login_tour(page)
            complete_content_course(page, pacer, username, password)
            print_section(f"CONTENT COMPLETED - {username}")
            return f"{username}: CONTENT COMPLETED"

        except PlaywrightTimeoutError as error:
            diagnostic = capture_page_diagnostics(
                page, username, "content-playwright-timeout"
            )
            log_exception(
                f"[{username}] Content Playwright timeout. Diagnostics: "
                f"{diagnostic.get('json')}"
            )
            return f"{username}: CONTENT PLAYWRIGHT TIMEOUT - {error}"

        except Exception as error:
            diagnostic = capture_page_diagnostics(
                page, username, "content-workflow-error"
            )
            log_exception(
                f"[{username}] Content workflow error: {error}. Diagnostics: "
                f"{diagnostic.get('json')}"
            )
            return f"{username}: CONTENT ERROR - {type(error).__name__}: {error}"

        finally:
            try:
                context.close()
            finally:
                browser.close()


def main() -> None:
    configure_file_logging(LOG_DIRECTORY / "summary.log")
    print_section(f"STARTING CONTENT PHASE FOR {len(USERS)} USERS")
    worker_count = min(MAX_CONCURRENT_USERS, len(USERS))
    print(
        f"Launching {len(USERS)} users; max workers={worker_count}; "
        f"startup stagger={USER_START_STAGGER_SECONDS}s."
    )

    with ProcessPoolExecutor(max_workers=worker_count) as executor:
        futures = {
            executor.submit(
                run_user,
                username,
                password,
                index * USER_START_STAGGER_SECONDS,
            ): username
            for index, (username, password) in enumerate(USERS)
        }

        results: list[str] = []
        for future in as_completed(futures):
            username = futures[future]
            try:
                result = future.result()
            except Exception as error:
                result = (
                    f"{username}: CONTENT WORKER FAILED - "
                    f"{type(error).__name__}: {error}"
                )
            results.append(result)
            print(result)

    print_section("ALL CONTENT WORKERS FINISHED")
    for result in sorted(results):
        print(result)


if __name__ == "__main__":
    multiprocessing.freeze_support()
    main()
