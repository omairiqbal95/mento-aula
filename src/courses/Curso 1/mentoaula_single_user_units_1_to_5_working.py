import re
import time
import unicodedata
from dataclasses import dataclass
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
USERNAME = "SY4212452Q"
PASSWORD = "Mentoaula2452"

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

    # Wait for the first course-unit heading to confirm successful login.
    page.locator(COURSE_UNITS[0].heading_selector).wait_for(
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
        raise RuntimeError(
            f"Could not open {unit.content_name}."
        )

    try:
        popup.wait_for_load_state(
            "domcontentloaded",
            timeout=60_000,
        )
    except PlaywrightTimeoutError:
        pass

    # Make every Unit 1-5 SCORM content popup larger before slide processing.
    resize_scorm_popup(popup)
    popup.wait_for_timeout(300)

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

    started = time.monotonic()
    deadline = started + timeout_seconds
    maximize_retried = False

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
    unit_number: int,
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
        f"Finished navigating Unit {unit_number}. "
        f"Next clicked {clicks} times."
    )


# ============================================================
# MAIN
# ============================================================

def main() -> None:

    with sync_playwright() as playwright:

        browser = playwright.chromium.launch(
            headless=HEADLESS,
            args=["--start-maximized"],
        )

        # Let the page viewport follow the actual native Chrome window.
        # This is essential for iSpring's responsive navigation controls:
        # with Playwright's default fixed viewport, the bottom-right Next
        # control can remain hidden even when the native window is larger.
        context = browser.new_context(no_viewport=True)
        page = context.new_page()

        popup: Optional[Page] = None
        current_unit: Optional[CourseUnit] = None

        try:
            # --------------------------------------------
            # 1. Login once
            # --------------------------------------------
            login(page)
            close_first_login_tour(page)
            handle_time_remaining_modal(page)

            # --------------------------------------------
            # 2. Process Contenido unidades 1-5 in order
            # --------------------------------------------
            for unit in COURSE_UNITS:
                current_unit = unit
                popup = None

                log("")
                log("=" * 60)
                log(f"STARTING UNIT {unit.number}")
                log("=" * 60)

                handle_time_remaining_modal(page)

                popup = open_unit_content(
                    page,
                    unit,
                )

                process_all_slides(
                    popup,
                    unit_number=unit.number,
                )

                log(
                    f"Finishing SCORM session for Unit {unit.number}..."
                )

                finish_scorm(
                    popup
                )

                popup.wait_for_timeout(
                    2000
                )

                if not popup.is_closed():
                    log(
                        f"Closing Unit {unit.number} SCORM window..."
                    )
                    popup.close()

                popup = None

                # Give the main course page a moment to receive/update
                # the completion status before opening the next package.
                page.wait_for_timeout(1000)
                handle_time_remaining_modal(page)

                log(
                    f"UNIT {unit.number} CONTENT COMPLETED SUCCESSFULLY."
                )

            log("")
            log(
                "UNITS 1-5 CONTENT COMPLETED SUCCESSFULLY."
            )

        except Exception as error:

            if current_unit is not None:
                prefix = f"Unit {current_unit.number}: "
                unit_suffix = f"-unit-{current_unit.number}"
            else:
                prefix = ""
                unit_suffix = ""

            log(
                f"ERROR: {prefix}{type(error).__name__}: "
                f"{error}"
            )

            # Useful screenshots if a unit fails.
            try:
                page.screenshot(
                    path=f"failure-main-page{unit_suffix}.png",
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
                        path=f"failure-scorm{unit_suffix}.png",
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
