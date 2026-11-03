import re
import time
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

# Single user
USERNAME = "CY9095914A"
PASSWORD = "Mentoaula5914"

HEADLESS = False

# Unit 1
UNIT_HEADING_SELECTOR = "#tod02"
UNIT_BODY_SELECTOR = "#udpanel02"
UNIT_CONTENT_NAME = "Contenido unidad 1"

# SCORM navigation
NEXT_ARROW_PATH = "M8 4L14 10L8 16"

# Some iSpring slides contain a required "¡Vamos a empezar!" control.
# The older working scripts clicked the visible button image (#img1_...).
# Keep that proven path FIRST, then fall back to text/DOM/core invocation.
REQUIRED_START_TEXT_PATTERN = re.compile(
    r"vamos\s+a\s+empezar",
    re.IGNORECASE,
)

# Exact selector observed in this Unit 1 package.
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


# ============================================================
# GENERAL HELPERS
# ============================================================

def log(message: str) -> None:
    print(f"[{time.strftime('%H:%M:%S')}] {message}", flush=True)


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

    # Wait specifically for Unit 1 heading.
    page.locator(UNIT_HEADING_SELECTOR).wait_for(
        state="attached",
        timeout=60_000,
    )

    log("Login successful.")


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
# OPEN UNIT 1
# ============================================================

def expand_unit_1(page: Page) -> None:
    body = page.locator(UNIT_BODY_SELECTOR).first

    if body.count() and body.is_visible():
        return

    log("Opening Unit 1 panel...")

    heading = page.locator(UNIT_HEADING_SELECTOR).first

    heading.wait_for(
        state="visible",
        timeout=20_000,
    )

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


def open_unit_1_content(page: Page) -> Page:
    handle_time_remaining_modal(page)
    expand_unit_1(page)

    link = (
        page.locator(f"{UNIT_BODY_SELECTOR} a")
        .filter(has_text=UNIT_CONTENT_NAME)
        .first
    )

    link.wait_for(
        state="visible",
        timeout=20_000,
    )

    link.scroll_into_view_if_needed()

    direct_url = extract_content_url(
        link,
        page.url,
    )

    pages_before = set(
        id(candidate)
        for candidate in page.context.pages
    )

    log(f"Opening '{UNIT_CONTENT_NAME}'...")

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
        raise RuntimeError(
            "Could not open Contenido unidad 1."
        )

    try:
        popup.wait_for_load_state(
            "domcontentloaded",
            timeout=60_000,
        )
    except PlaywrightTimeoutError:
        pass

    log("Contenido unidad 1 opened.")

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


def visible_vamos_text_in_frame(
    frame: Frame,
) -> Optional[Locator]:
    """Return the visible text node for '¡Vamos a empezar!' in one frame."""

    selectors = [
        "span",
        "a",
        "button",
        "[role='button']",
        "[onclick]",
    ]

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
    for frame in popup.frames:
        try:
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

        return find_clickable_parent(
            text_node,
            require_visible=False,
        )

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
            .replace(/[¡!]/g, "")
            .replace(/\s+/g, " ")
            .trim()
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
            visible(el) && normalize(el.textContent).includes("vamos a empezar")
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

    raise RuntimeError(
        "Detected the 'Vamos a empezar' slide, but all click/core "
        "activation methods failed. The script stopped here deliberately "
        "instead of waiting six minutes for Next."
    )


def play_video_if_present(
    popup: Page,
) -> bool:
    """
    Starts a video if a visible Play control exists.

    It does NOT sleep for five minutes. The script simply waits
    until Next becomes enabled.
    """

    for frame in popup.frames:

        try:
            controls = frame.locator(
                VIDEO_PLAY_ICON_SELECTOR
            )

            for index in range(controls.count()):
                icon = controls.nth(index)

                if not icon.is_visible():
                    continue

                clickable = find_clickable_parent(icon)

                log("Video detected. Clicking Play...")

                clickable.click(
                    timeout=5_000,
                    force=True,
                )

                popup.wait_for_timeout(500)

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
) -> Optional[Locator]:

    deadline = time.monotonic() + timeout_seconds

    while time.monotonic() < deadline:

        if popup.is_closed():
            raise RuntimeError(
                "SCORM popup closed unexpectedly."
            )

        button = find_usable_next_button(
            popup
        )

        if button is not None:
            return button

        popup.wait_for_timeout(500)

    return None


# ============================================================
# SCORM TRACKING
# ============================================================

def commit_scorm(popup: Page) -> None:
    """
    Calls LMSCommit('') if this SCORM package exposes window.API.
    """

    script = """
    () => {
        try {
            const api = window.API;

            if (
                api &&
                typeof api.LMSCommit === 'function'
            ) {
                return api.LMSCommit('');
            }
        } catch (e) {}

        return null;
    }
    """

    for frame in popup.frames:

        try:
            result = frame.evaluate(script)

            if result is not None:
                log(
                    f"SCORM commit result: {result}"
                )
                return

        except Exception:
            continue


def finish_scorm(popup: Page) -> None:
    """
    Commit and finish the SCORM session before closing.
    """

    script = """
    () => {
        try {
            const api = window.API;

            if (!api)
                return null;

            let commitResult = null;
            let finishResult = null;

            if (
                typeof api.LMSCommit === 'function'
            ) {
                commitResult = api.LMSCommit('');
            }

            if (
                typeof api.LMSFinish === 'function'
            ) {
                finishResult = api.LMSFinish('');
            }

            return {
                commit: commitResult,
                finish: finishResult
            };

        } catch (e) {
            return null;
        }
    }
    """

    for frame in popup.frames:

        try:
            result = frame.evaluate(script)

            if result:
                log(
                    "Final SCORM commit/finish: "
                    f"{result}"
                )
                return

        except Exception:
            continue


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

        new_counter = read_slide_counter(
            popup
        )

        if new_counter is not None:

            if old_counter is None:
                return new_counter

            if new_counter[0] != old_counter[0]:
                return new_counter

        popup.wait_for_timeout(250)

    return read_slide_counter(popup)


def process_all_slides(
    popup: Page,
) -> None:

    log("Waiting for SCORM content...")

    initial_counter = None

    deadline = time.monotonic() + 120

    while time.monotonic() < deadline:

        initial_counter = read_slide_counter(
            popup
        )

        if initial_counter:
            break

        button = find_usable_next_button(
            popup
        )

        if button:
            break

        try:
            click_required_start_control(
                popup,
                old_counter=initial_counter,
            )
        except RuntimeError:
            # If the special slide is already visible during readiness,
            # surface the real failure rather than hiding it.
            raise

        popup.wait_for_timeout(500)

    counter = read_slide_counter(
        popup
    )

    if counter:
        log(
            f"Detected slide {counter[0]} "
            f"of {counter[1]}."
        )
    else:
        log(
            "No slide counter detected. "
            "Will use Next-button disappearance "
            "as final-slide detection."
        )

    clicks = 0

    while True:

        if popup.is_closed():
            raise RuntimeError(
                "SCORM popup closed unexpectedly."
            )

        popup.wait_for_timeout(
            SLIDE_PAUSE_SECONDS * 1000
        )

        counter = read_slide_counter(
            popup
        )

        # Best final-slide detection:
        # current == total.
        if counter:

            current, total = counter

            log(
                f"Currently on slide "
                f"{current}/{total}."
            )

            if current >= total:
                log(
                    "LAST SLIDE DETECTED."
                )
                break

        # Some slides contain a required "¡Vamos a empezar!" control.
        # The handler validates the transition and uses progressively stronger
        # fallbacks (old image click -> DOM click -> direct iSpring gotoSlide).
        start_detected, after_start = click_required_start_control(
            popup,
            old_counter=counter,
        )

        if start_detected:
            if after_start is not None:
                log(
                    "'Vamos a empezar' completed; player now reports "
                    f"slide {after_start[0]}/{after_start[1]}."
                )
            else:
                log(
                    "'Vamos a empezar' completed; waiting for the new "
                    "slide counter to settle."
                )

            commit_scorm(
                popup
            )

            # The in-slide control is itself the navigation action.  Never
            # click the bottom-right Next arrow in the same iteration.
            continue

        # Start video if one is present.
        play_video_if_present(
            popup
        )

        # ----------------------------------------------------
        # Wait for Next
        # ----------------------------------------------------

        if counter:
            current, total = counter

            # We KNOW this isn't the final slide, therefore
            # wait properly for Next to become usable.
            next_button = wait_for_next_button(
                popup,
                NEXT_WAIT_SECONDS,
            )

            if next_button is None:
                raise RuntimeError(
                    f"Slide {current}/{total} is not the "
                    "last slide, but Next never became "
                    "available."
                )

        else:
            # Without a counter, give the player some time.
            next_button = wait_for_next_button(
                popup,
                15,
            )

            if next_button is None:
                log(
                    "No usable Next button found. "
                    "Assuming this is the last slide."
                )
                break

        # ----------------------------------------------------
        # CLICK NEXT
        # ----------------------------------------------------

        old_counter = counter

        next_button.scroll_into_view_if_needed()

        log("Clicking Next...")

        try:
            next_button.click(
                timeout=10_000,
            )

        except PlaywrightTimeoutError:
            next_button.click(
                timeout=10_000,
                force=True,
            )

        clicks += 1

        new_counter = wait_for_slide_change(
            popup,
            old_counter,
            timeout_seconds=30,
        )

        if new_counter:
            log(
                f"Moved to slide "
                f"{new_counter[0]}/"
                f"{new_counter[1]}."
            )
        else:
            log(
                "Slide changed but no counter "
                "could be read."
            )

        commit_scorm(
            popup
        )

        # Infinite-loop protection.
        if clicks > 500:
            raise RuntimeError(
                "Safety stop: more than 500 "
                "Next clicks detected."
            )

    log(
        f"Finished navigating Unit 1. "
        f"Next clicked {clicks} times."
    )


# ============================================================
# MAIN
# ============================================================

def main() -> None:

    with sync_playwright() as playwright:

        browser = playwright.chromium.launch(
            headless=HEADLESS,
        )

        context = browser.new_context()

        page = context.new_page()

        popup: Optional[Page] = None

        try:
            # --------------------------------------------
            # 1. Login
            # --------------------------------------------

            login(page)

            close_first_login_tour(
                page
            )

            handle_time_remaining_modal(
                page
            )

            # --------------------------------------------
            # 2. Open Contenido unidad 1
            # --------------------------------------------

            popup = open_unit_1_content(
                page
            )

            # --------------------------------------------
            # 3. Navigate all slides
            # --------------------------------------------

            process_all_slides(
                popup
            )

            # --------------------------------------------
            # 4. Save SCORM progress
            # --------------------------------------------

            log(
                "Finishing SCORM session..."
            )

            finish_scorm(
                popup
            )

            popup.wait_for_timeout(
                2000
            )

            # --------------------------------------------
            # 5. Close everything
            # --------------------------------------------

            if not popup.is_closed():
                log(
                    "Closing SCORM window..."
                )
                popup.close()

            log(
                "UNIT 1 TEST COMPLETED SUCCESSFULLY."
            )

        except Exception as error:

            log(
                f"ERROR: {type(error).__name__}: "
                f"{error}"
            )

            # Useful screenshot if it fails.
            try:
                page.screenshot(
                    path="failure-main-page.png",
                    full_page=True,
                )
            except Exception:
                pass

            if (
                popup is not None
                and not popup.is_closed()
            ):
                try:
                    popup.screenshot(
                        path="failure-scorm.png",
                        full_page=True,
                    )
                except Exception:
                    pass

            raise

        finally:

            try:
                if (
                    popup is not None
                    and not popup.is_closed()
                ):
                    popup.close()
            except Exception:
                pass

            context.close()
            browser.close()

            log("Browser closed.")


if __name__ == "__main__":
    main()