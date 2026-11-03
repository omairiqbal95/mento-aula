from concurrent.futures import ProcessPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, Sequence
import json
import logging
import multiprocessing
import random
import re
import time
import traceback

from playwright.sync_api import (
    Locator,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    sync_playwright,
)

# ============================================================
# MENTOAULA TEST / EXAM AUTOMATION
# ============================================================
# This script intentionally contains NO SCORM slide-viewing code.

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

LOG_DIRECTORY = Path("logs_tests")
DIAGNOSTIC_DIRECTORY = Path("diagnostics_tests")
CURRENT_USERNAME = "unknown-user"
CURRENT_PASSWORD = ""
LOGGER = logging.getLogger("mentoaula_tests")

DEFAULT_TIMEOUT_MS = 20_000
SHORT_TIMEOUT_MS = 10_000
TOUR_TIMEOUT_MS = 3_000
ACTION_DELAY_MIN_SECONDS = 1.5
ACTION_DELAY_MAX_SECONDS = 4.0

HEADLESS = False
SLOW_MOTION_MS = 200

# 'all' = initial evaluation + Unit 1..5 tests + final exam.
# 'initial_only' = only Evaluación inicial. Useful for completely fresh
# accounts if that evaluation is required before Unit 1 content unlocks.
TEST_MODE = "all"

# The actual per-question and 120-second review delays count toward this.
MIN_TEST_PHASE_HOURS = 1.0
MAX_TEST_PHASE_HOURS = 2.0

MAX_CONCURRENT_USERS = len(USERS)
USER_START_STAGGER_SECONDS = 8

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
class TestPhaseTimer:
    username: str
    target_end: datetime

    @classmethod
    def create(cls, username: str) -> "TestPhaseTimer":
        target_hours = random.uniform(MIN_TEST_PHASE_HOURS, MAX_TEST_PHASE_HOURS)
        target_end = datetime.now() + timedelta(hours=target_hours)
        print(
            f"[{username}] Test-phase target duration: {target_hours:.2f} hours; "
            f"target completion: {target_end.isoformat(timespec='seconds')}"
        )
        return cls(username=username, target_end=target_end)

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
        if remaining_seconds <= 0:
            return

        print(
            f"[{username}] Tests finished before target duration; "
            f"holding session for {remaining_seconds / 60:.1f} minutes."
        )
        sleep_with_progress(
            page,
            remaining_seconds,
            username,
            password,
            "final test-duration hold",
            report_every_seconds=900,
            session_check_every_seconds=120,
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
# 2. Answer configuration
# ============================================================

INITIAL_EVALUATION_ANSWERS = [
    "A",  # Question 1
    "B",  # Question 2
    "C",  # Question 3
    "A",  # Question 4
    "B",  # Question 5
    "C",  # Question 6
    "A",  # Question 7
    "A",  # Question 8
    "A",  # Question 9
    "C",  # Question 10
]


UNIT_1_TEST_ANSWERS = [
    "A",  # Question 1
    "C",  # Question 2
    "B",  # Question 3
    "B",  # Question 4
    "B",  # Question 5
    "A",  # Question 6
    "A",  # Question 7
    "A",  # Question 8
    "A",  # Question 9
    "C",  # Question 10
]


UNIT_2_TEST_ANSWERS = [
    "C",  # Question 1
    "B",  # Question 2
    "B",  # Question 3
    "B",  # Question 4
    "A",  # Question 5
    "A",  # Question 6
    "B",  # Question 7
    "B",  # Question 8
    "A",  # Question 9
    "A",  # Question 10
]


UNIT_3_TEST_ANSWERS = [
    "A",  # Question 1
    "B",  # Question 2
    "A",  # Question 3
    "A",  # Question 4
    "B",  # Question 5
]


UNIT_4_TEST_ANSWERS = [
    "A",  # Question 1
    "C",  # Question 2
    "C",  # Question 3
    "A",  # Question 4
    "A",  # Question 5
]


UNIT_5_TEST_ANSWERS = [
    "B",  # Question 1
    "B",  # Question 2
    "A",  # Question 3
    "C",  # Question 4
    "B",  # Question 5
    "B",  # Question 6
    "B",  # Question 7
    "A",  # Question 8
    "A",  # Question 9
    "A",  # Question 10
]


FINAL_EXAM_ANSWERS = [
    "B",  # Question 1
    "B",  # Question 2
    "C",  # Question 3
    "B",  # Question 4
    "B",  # Question 5
    "A",  # Question 6
    "B",  # Question 7
    "B",  # Question 8
    "C",  # Question 9
    "A",  # Question 10
]

# ============================================================
# Unit-test structure
# ============================================================

@dataclass(frozen=True)
class TestUnit:
    number: int
    heading_selector: str
    body_selector: str
    test_name: str
    test_answers: Sequence[str]


TEST_UNITS = [
    TestUnit(1, "#tod02", "#udpanel02", "Test unidad 1", UNIT_1_TEST_ANSWERS),
    TestUnit(2, "#tod03", "#udpanel03", "Test unidad 2", UNIT_2_TEST_ANSWERS),
    TestUnit(3, "#tod04", "#udpanel04", "Test unidad 3", UNIT_3_TEST_ANSWERS),
    TestUnit(4, "#tod05", "#udpanel05", "Test unidad 4", UNIT_4_TEST_ANSWERS),
    TestUnit(5, "#tod06", "#udpanel06", "Test unidad 5", UNIT_5_TEST_ANSWERS),
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

def wait_for_exam_state(
    page: Page,
    exam_name: str,
) -> str:
    """
    Waits for one of the meaningful states inside the exam iframe.

    Returns:
        "available" when exam questions are displayed.
        "unavailable" when the site reports that the exam cannot be taken.
        "iframe-login" when the exam iframe has been redirected to login.
        "unknown" when no recognised state appears before the timeout.
    """

    exam_frame = get_course_frame(page)

    radios = exam_frame.locator(
        "input[type='radio'][name*='RepeaterExamen']"
    )
    unavailable_message = exam_frame.locator(
        "#MessageBoxModal_lblMensajeLibre"
    )
    iframe_login = exam_frame.locator(
        "#usuario, #password, #btnLogin, "
        "form[action*='Login'], input[name*='usuario']"
    )

    state_locator = exam_frame.locator(
        "input[type='radio'][name*='RepeaterExamen'], "
        "#MessageBoxModal_lblMensajeLibre, "
        "#usuario, #password, #btnLogin, "
        "form[action*='Login'], input[name*='usuario']"
    ).first

    try:
        state_locator.wait_for(
            state="attached",
            timeout=30_000,
        )
    except PlaywrightTimeoutError:
        LOGGER.warning(
            "[%s] No recognised state appeared in '%s' within 30 seconds.",
            CURRENT_USERNAME, exam_name,
        )
        return "unknown"

    # Give legacy ASP.NET controls a moment to complete rendering.
    page.wait_for_timeout(1_000)

    if radios.count() > 0 and radios.first.is_visible():
        print(f"'{exam_name}' loaded.")
        return "available"

    if unavailable_message.count() > 0 and unavailable_message.first.is_visible():
        message = (
            unavailable_message.first.text_content() or
            "The exam is unavailable."
        ).strip()
        print(f"'{exam_name}' unavailable: {message}")
        return "unavailable"

    if iframe_login.count() > 0:
        try:
            login_visible = any(
                iframe_login.nth(index).is_visible()
                for index in range(min(iframe_login.count(), 8))
            )
        except Exception:
            login_visible = True

        if login_visible:
            LOGGER.warning(
                "[%s] '%s' opened a login page inside the exam iframe.",
                CURRENT_USERNAME, exam_name,
            )
            return "iframe-login"

    return "unknown"


def close_exam_dialog_if_present(page: Page, exam_name: str) -> None:
    """Closes the visible exam dialog without masking recovery errors."""
    try:
        if page.locator(".ui-dialog:visible").count() > 0:
            close_latest_dialog(page)
            LOGGER.info(
                "[%s] Closed '%s' dialog before recovery.",
                CURRENT_USERNAME, exam_name,
            )
    except Exception as error:
        LOGGER.warning(
            "[%s] Could not close '%s' dialog during recovery: %s",
            CURRENT_USERNAME, exam_name, error,
        )


def get_exam_question_names(page: Page) -> list[str]:
    """
    Returns the unique HTML name attribute for each question's
    radio-button group.
    """

    exam_frame = get_course_frame(page)

    radios = exam_frame.locator(
        "input[type='radio'][name*='RepeaterExamen']"
    )

    return radios.evaluate_all(
        """
        elements => [
            ...new Set(elements.map(element => element.name))
        ]
        """
    )


class ExamSessionExpired(RuntimeError):
    """Raised when authentication expires while an exam is in progress."""


def exam_session_has_expired(page: Page) -> bool:
    """Checks both the outer course page and the exam iframe for login state."""
    if session_has_expired(page):
        return True

    try:
        iframe_login = get_course_frame(page).locator(
            "#usuario, #password, #btnLogin, "
            "form[action*='Login'], input[name*='usuario']"
        )
        for index in range(min(iframe_login.count(), 8)):
            try:
                if iframe_login.nth(index).is_visible():
                    return True
            except Exception:
                continue
    except Exception:
        pass

    return False


def wait_during_exam(
    page: Page,
    seconds: float,
    exam_name: str,
    phase: str,
) -> None:
    """
    Waits in short chunks so Mentoaula's time warning can be handled and an
    expired main/iframe session is detected before more exam actions are made.
    """
    deadline = time.monotonic() + max(0.0, seconds)

    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            break

        page.wait_for_timeout(int(min(5.0, remaining) * 1_000))
        handle_time_remaining_modal(page)

        if exam_session_has_expired(page):
            raise ExamSessionExpired(
                f"Authentication expired during '{exam_name}' while {phase}."
            )

    # One final check immediately before the caller performs the next action.
    handle_time_remaining_modal(page)
    if exam_session_has_expired(page):
        raise ExamSessionExpired(
            f"Authentication expired during '{exam_name}' while {phase}."
        )


def select_exam_answers(
    page: Page,
    exam_name: str,
    answers: Sequence[str],
) -> None:
    """
    Selects the configured A, B, or C option for each question.
    """

    exam_frame = get_course_frame(page)
    question_names = get_exam_question_names(page)

    question_count = len(question_names)

    print(
        f"Found {question_count} questions "
        f"in '{exam_name}'."
    )

    if len(answers) != question_count:
        raise ValueError(
            f"{len(answers)} answers were configured for "
            f"'{exam_name}', but the page contains "
            f"{question_count} questions."
        )

    for question_index, radio_name in enumerate(question_names):
        question_number = question_index + 1
        answer = answers[question_index].strip().upper()

        if answer not in {"A", "B", "C"}:
            raise ValueError(
                f"Invalid answer {answer!r} for question "
                f"{question_number} in '{exam_name}'."
            )

        options = exam_frame.locator(
            f"input[type='radio'][name='{radio_name}']"
        )

        option_count = options.count()
        option_index = ord(answer) - ord("A")

        if option_count == 0:
            raise RuntimeError(
                f"No options were found for question "
                f"{question_number} in '{exam_name}'."
            )

        if option_index >= option_count:
            raise ValueError(
                f"Question {question_number} in '{exam_name}' "
                f"has only {option_count} option(s); "
                f"option {answer} does not exist."
            )

        selected_option = options.nth(option_index)

        selected_option.scroll_into_view_if_needed()

        # Wait 20-30 seconds before answering each question
        delay = random.randint(20, 30)
        LOGGER.info(
            "[%s] Waiting %d seconds before answering question %d.",
            CURRENT_USERNAME,
            delay,
            question_number,
        )
        wait_during_exam(
            page,
            delay,
            exam_name,
            f"waiting before question {question_number}",
        )

        try:
            selected_option.check(force=True)
        except Exception as error:
            if exam_session_has_expired(page):
                raise ExamSessionExpired(
                    f"Authentication expired while selecting question "
                    f"{question_number} in '{exam_name}'."
                ) from error
            raise

        if not selected_option.is_checked():
            if exam_session_has_expired(page):
                raise ExamSessionExpired(
                    f"Authentication expired after selecting question "
                    f"{question_number} in '{exam_name}'."
                )
            raise RuntimeError(
                f"Failed to select option {answer} for "
                f"question {question_number} in '{exam_name}'."
            )


    print(
        f"All answers for '{exam_name}' were selected."
    )


def submit_exam(
    page: Page,
    exam_name: str,
) -> None:
    """
    Submits the current exam, waits for the results page,
    and closes the outer dialog.
    """

    exam_frame = get_course_frame(page)

    submit_button = exam_frame.locator(
        "#BtnAceptar2"
    )

    submit_button.wait_for(
        state="visible",
        timeout=DEFAULT_TIMEOUT_MS,
    )

    submit_button.scroll_into_view_if_needed()

    print(f"Submitting '{exam_name}'...")

    # Spend 2 minutes reviewing answers before submitting
    LOGGER.info(
        "[%s] Reviewing answers for 120 seconds before submitting '%s'.",
        CURRENT_USERNAME,
        exam_name,
    )
    wait_during_exam(
        page,
        120,
        exam_name,
        "reviewing answers before submission",
    )

    action_delay(page)
    handle_time_remaining_modal(page)
    if exam_session_has_expired(page):
        raise ExamSessionExpired(
            f"Authentication expired immediately before submitting '{exam_name}'."
        )

    try:
        submit_button.click(
            timeout=DEFAULT_TIMEOUT_MS,
        )
    except Exception as error:
        if exam_session_has_expired(page):
            raise ExamSessionExpired(
                f"Authentication expired while submitting '{exam_name}'."
            ) from error
        raise

    print("'Enviar test' was clicked.")

    # The results page exposes the Salir button.
    try:
        exam_frame.locator("#BtnCancelar").wait_for(
            state="visible",
            timeout=DEFAULT_TIMEOUT_MS,
        )
    except PlaywrightTimeoutError as error:
        if exam_session_has_expired(page):
            raise ExamSessionExpired(
                f"Authentication expired after submitting '{exam_name}'."
            ) from error
        raise

    print(f"Results for '{exam_name}' loaded.")
    print(f"Closing '{exam_name}' window...")

    close_latest_dialog(page)

    print(
        f"'{exam_name}' window closed. Moving on."
    )


def wait_for_exam_dialog_or_login(
    page: Page,
    exam_name: str,
    timeout_seconds: int = 30,
) -> str:
    """
    Waits after clicking an exam link and detects the race where the main
    session redirects to Login before the exam dialog can open.

    Returns 'dialog', 'login', or 'timeout'.
    """
    deadline = time.monotonic() + timeout_seconds

    while time.monotonic() < deadline:
        handle_time_remaining_modal(page)

        if session_has_expired(page):
            LOGGER.warning(
                "[%s] Main session expired immediately after clicking '%s'.",
                CURRENT_USERNAME,
                exam_name,
            )
            return "login"

        try:
            dialogs = page.locator(".ui-dialog:visible")
            if dialogs.count() > 0:
                return "dialog"
        except Exception:
            pass

        page.wait_for_timeout(500)

    if session_has_expired(page):
        return "login"
    return "timeout"

def complete_exam(
    page: Page,
    exam_name: str,
    answers: Sequence[str],
    panel_heading_selector: Optional[str] = None,
    panel_body_selector: Optional[str] = None,
) -> None:
    """
    Opens, completes, submits, and closes an exam.

    Exam endpoints can expire independently from the outer course page. When
    the iframe displays its own login page, this function closes the dialog,
    restores the main session, resolves the exam link again, and retries.
    """

    print_section(exam_name)
    maximum_attempts = 3

    for attempt in range(1, maximum_attempts + 1):
        if attempt > 1:
            LOGGER.info(
                "[%s] Retrying '%s' (%d/%d).",
                CURRENT_USERNAME, exam_name, attempt, maximum_attempts,
            )

        # Re-resolve locators on every attempt because login/reload replaces DOM.
        if panel_heading_selector and panel_body_selector:
            expand_panel(
                page=page,
                heading_selector=panel_heading_selector,
                body_selector=panel_body_selector,
            )
            exam_link = find_panel_link(
                page=page,
                body_selector=panel_body_selector,
                link_text=exam_name,
            )
        else:
            exam_link = page.get_by_text(
                exam_name,
                exact=True,
            ).first

        exam_link.wait_for(
            state="visible",
            timeout=SHORT_TIMEOUT_MS,
        )
        dismiss_transient_ui(page)
        robust_click(page, exam_link, f"exam link {exam_name}")

        post_click_state = wait_for_exam_dialog_or_login(
            page,
            exam_name,
            timeout_seconds=30,
        )

        if post_click_state == "login":
            LOGGER.info(
                "[%s] Recovering authentication after '%s' click.",
                CURRENT_USERNAME,
                exam_name,
            )
            restore_course_session(
                page,
                CURRENT_USERNAME,
                CURRENT_PASSWORD,
            )
            continue

        if post_click_state != "dialog":
            LOGGER.warning(
                "[%s] '%s' did not open a dialog after click; retrying.",
                CURRENT_USERNAME,
                exam_name,
            )
            if attempt < maximum_attempts:
                if session_has_expired(page):
                    restore_course_session(
                        page,
                        CURRENT_USERNAME,
                        CURRENT_PASSWORD,
                    )
                else:
                    dismiss_transient_ui(page)
                    page.wait_for_timeout(1_000)
                continue
            raise RuntimeError(
                f"'{exam_name}' did not open after the click."
            )

        state = wait_for_exam_state(page=page, exam_name=exam_name)

        if state == "available":
            try:
                select_exam_answers(
                    page=page,
                    exam_name=exam_name,
                    answers=answers,
                )
                submit_exam(
                    page=page,
                    exam_name=exam_name,
                )
                return
            except ExamSessionExpired as error:
                LOGGER.warning(
                    "[%s] %s Closing '%s', restoring authentication, and retrying.",
                    CURRENT_USERNAME,
                    error,
                    exam_name,
                )
                close_exam_dialog_if_present(page, exam_name)
                if attempt >= maximum_attempts:
                    break
                restore_course_session(
                    page, CURRENT_USERNAME, CURRENT_PASSWORD
                )
                page.wait_for_timeout(2_000)
                continue

        if state == "unavailable":
            print(f"Closing '{exam_name}' window...")
            close_latest_dialog(page)
            print(f"'{exam_name}' closed. Moving on.")
            return

        close_exam_dialog_if_present(page, exam_name)

        if attempt >= maximum_attempts:
            break

        if state == "iframe-login":
            LOGGER.info(
                "[%s] Restoring session because '%s' iframe authentication expired.",
                CURRENT_USERNAME, exam_name,
            )
        else:
            LOGGER.info(
                "[%s] Refreshing session after an unrecognised '%s' iframe state.",
                CURRENT_USERNAME, exam_name,
            )

        restore_course_session(
            page, CURRENT_USERNAME, CURRENT_PASSWORD
        )
        page.wait_for_timeout(2_000)

    raise RuntimeError(
        f"'{exam_name}' could not be loaded after {maximum_attempts} attempts."
    )


# ============================================================

# ============================================================
# Test-only workflow
# ============================================================

def complete_initial_evaluation(page: Page) -> None:
    complete_exam(
        page=page,
        exam_name="Evaluación inicial",
        answers=INITIAL_EVALUATION_ANSWERS,
    )


def complete_final_exam(page: Page) -> None:
    print_section("Preparing final examination")

    evaluation_section = page.locator("#i02")
    if not evaluation_section.is_visible():
        robust_click(
            page,
            page.locator("#ctl02_idEncabezadoEvaluacion").first,
            "final evaluation section",
        )
        evaluation_section.wait_for(
            state="visible",
            timeout=SHORT_TIMEOUT_MS,
        )

    complete_exam(
        page=page,
        exam_name="Examen final",
        answers=FINAL_EXAM_ANSWERS,
    )


def complete_test_phase(
    page: Page,
    timer: TestPhaseTimer,
    username: str,
    password: str,
) -> None:
    mode = TEST_MODE.strip().lower()
    if mode not in {"all", "initial_only"}:
        raise ValueError("TEST_MODE must be 'all' or 'initial_only'.")

    complete_initial_evaluation(page)

    if mode == "initial_only":
        print(f"[{username}] Initial-evaluation-only mode completed.")
        return

    for unit in TEST_UNITS:
        complete_exam(
            page=page,
            exam_name=unit.test_name,
            answers=unit.test_answers,
            panel_heading_selector=unit.heading_selector,
            panel_body_selector=unit.body_selector,
        )

    complete_final_exam(page)
    timer.wait_until_target_end(page, username, password)


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

    LOGGER.info("[%s] Test worker started; mode=%s.", username, TEST_MODE)
    timer = TestPhaseTimer.create(username)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=HEADLESS,
            slow_mo=SLOW_MOTION_MS,
        )
        context = browser.new_context()
        page = context.new_page()

        try:
            login(page, username, password)
            close_first_login_tour(page)
            complete_test_phase(page, timer, username, password)
            print_section(f"TEST PHASE COMPLETED - {username}")
            return f"{username}: TEST PHASE COMPLETED"

        except PlaywrightTimeoutError as error:
            diagnostic = capture_page_diagnostics(
                page, username, "tests-playwright-timeout"
            )
            log_exception(
                f"[{username}] Test Playwright timeout. Diagnostics: "
                f"{diagnostic.get('json')}"
            )
            return f"{username}: TEST PLAYWRIGHT TIMEOUT - {error}"

        except Exception as error:
            diagnostic = capture_page_diagnostics(
                page, username, "tests-workflow-error"
            )
            log_exception(
                f"[{username}] Test workflow error: {error}. Diagnostics: "
                f"{diagnostic.get('json')}"
            )
            return f"{username}: TEST ERROR - {type(error).__name__}: {error}"

        finally:
            try:
                context.close()
            finally:
                browser.close()


def main() -> None:
    configure_file_logging(LOG_DIRECTORY / "summary.log")
    print_section(f"STARTING TEST PHASE FOR {len(USERS)} USERS")
    print(f"TEST_MODE={TEST_MODE!r}")
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
                    f"{username}: TEST WORKER FAILED - "
                    f"{type(error).__name__}: {error}"
                )
            results.append(result)
            print(result)

    print_section("ALL TEST WORKERS FINISHED")
    for result in sorted(results):
        print(result)


if __name__ == "__main__":
    multiprocessing.freeze_support()
    main()
