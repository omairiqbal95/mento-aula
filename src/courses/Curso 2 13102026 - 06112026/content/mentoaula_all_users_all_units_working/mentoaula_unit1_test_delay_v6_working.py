#!/usr/bin/env python3
"""MentoAula Unit 1 -> Índice -> Test -> random answers (10–15s apart) -> Corregir.

Keeps the previously working dashboard-originated SCORM popup sequence.
Only clicks the explicit Corregir control after selecting quiz answers.
NOTE: If run against the real MentoAula website, Corregir may grade and save
the attempt on the server.
"""

import asyncio
import os
import random
import re
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

URL = "https://campus.mentoaula.com/"
USERNAME = "SZ3388168C"
PASSWORD = os.getenv("MENTOAULA_PASSWORD", "Mentoaula8168")
INDEX_RE = re.compile(r"^\s*[ÍIíi]\s*n\s*d\s*i\s*c\s*e\s*$", re.I)
RNG = random.SystemRandom()
ANSWER_DELAY_MIN_SECONDS = 10
ANSWER_DELAY_MAX_SECONDS = 15


async def pause_between_answers():
    seconds = RNG.uniform(ANSWER_DELAY_MIN_SECONDS, ANSWER_DELAY_MAX_SECONDS)
    print(f"  Waiting {seconds:.1f} seconds before the next answer...")
    await asyncio.sleep(seconds)


async def first_visible(page, selectors, seconds=15):
    """Find visible control in the main document or any nested iframe."""
    until = asyncio.get_running_loop().time() + seconds
    while asyncio.get_running_loop().time() < until:
        for frame in page.frames[:40]:
            for make in selectors:
                try:
                    item = make(frame).first
                    if await item.count() and await item.is_visible():
                        return item
                except Exception:
                    pass
        await asyncio.sleep(0.2)
    return None


async def open_unit1(dashboard, context):
    header = await first_visible(dashboard, [lambda f: f.locator("#tod01")], 30)
    if not header:
        raise RuntimeError("Unit 1 heading (#tod01) not found.")

    finish = await first_visible(dashboard,
        [lambda f: f.locator("#my-tour-button-finish")], 1.5)
    if finish:
        await finish.click(timeout=5000)

    link = dashboard.locator("#udpanel01 a.milinkElemento").filter(
        has_text=re.compile(r"Contenido\s+unidad\s*0?1\b", re.I)).first
    for frame in dashboard.frames:
        candidate = frame.locator("#udpanel01 a.milinkElemento").filter(
            has_text=re.compile(r"Contenido\s+unidad\s*0?1\b", re.I)).first
        if await candidate.count():
            link = candidate
            break
    if not await link.count():
        raise RuntimeError("Cannot find 'Contenido unidad 1'.")

    if not await link.is_visible():
        print("Expanding Unit 1...")
        await header.click(timeout=6000, no_wait_after=True)

    for attempt in range(2):
        try:
            await link.wait_for(state="visible", timeout=4500)
            await asyncio.sleep(0.4)
            if await link.is_visible():
                break
        except PWTimeout:
            pass
        if attempt == 0:
            await header.click(timeout=6000, no_wait_after=True)
    else:
        raise RuntimeError("Unit 1 dropdown did not stay open.")

    print("Opening 'Contenido unidad 1' from the dashboard...")
    # IMPORTANT: don't navigate to a copied SCORM URL; it disconnects the LMS.
    async with context.expect_page(timeout=15000) as popup_event:
        await link.dispatch_event("click", timeout=6000)
    lesson = await popup_event.value
    await lesson.wait_for_load_state("domcontentloaded", timeout=25000)
    await lesson.bring_to_front()
    print("Unit 1 opened.")
    return lesson


async def check_campus_connected(page):
    for frame in page.frames[:40]:
        try:
            text = await frame.locator("body").inner_text(timeout=600)
            if "El Campus está cerrado" in text or "El Campus esta cerrado" in text:
                raise RuntimeError("Campus connection closed; log in again.")
        except PWTimeout:
            pass


async def open_test(lesson):
    test_selectors = [
        lambda f: f.get_by_role("link", name=re.compile(r"^Test$", re.I)),
        lambda f: f.get_by_role("button", name=re.compile(r"^Test$", re.I)),
        lambda f: f.get_by_text("Test", exact=True),
    ]
    test = await first_visible(lesson, test_selectors, 3)
    if not test:
        print("Opening right-side Índice...")
        index_selectors = [
            lambda f: f.get_by_text(INDEX_RE),
            lambda f: f.locator('button[title*="ndice" i],a[title*="ndice" i],'
                                '[aria-label*="ndice" i],[id*="indice" i]'),
            lambda f: f.locator('button,a,[role="button"],[onclick]').filter(has_text=INDEX_RE),
        ]
        toggle = await first_visible(lesson, index_selectors, 20)
        if not toggle:
            await check_campus_connected(lesson)
            raise RuntimeError("Índice control not found.")
        await toggle.click(timeout=5000, no_wait_after=True)
        test = await first_visible(lesson, test_selectors, 15)
    if not test:
        await check_campus_connected(lesson)
        raise RuntimeError("Test link not found.")
    await test.click(timeout=7000, no_wait_after=True)
    print("Unit 1 Test opened.")


# Browser only reports possible native radio groups. A name is normally one
# question; if a radio is unnamed, the closest question/fieldset groups it.
RADIO_GROUPS_JS = r"""() => {
  const els = Array.from(document.querySelectorAll('input[type="radio"]'));
  const blocks = Array.from(document.querySelectorAll(
    'fieldset,[role="group"],.question,.pregunta,[class*="question" i],'+
    '[class*="pregunta" i],[id*="question" i],[id*="pregunta" i]'));
  return els.map((e,i) => {
    const block = e.closest('fieldset,[role="group"],.question,.pregunta,'+
      '[class*="question" i],[class*="pregunta" i],'+
      '[id*="question" i],[id*="pregunta" i]');
    const blockId = block ? blocks.indexOf(block) : -1;
    return {index:i, group:e.name ? 'name:'+e.name :
      (block ? 'block:'+blockId : 'unnamed:'+i),
      disabled:e.disabled, value:e.value, checked:e.checked};
  });
}"""


async def click_radio(frame, index):
    """Use a real click (including its JS change handlers), not value injection."""
    radio = frame.locator('input[type="radio"]').nth(index)
    try:
        await radio.check(timeout=3000)
    except Exception:
        # Custom-styled radio inputs may be hidden beneath a clickable label.
        await radio.evaluate("""e => {
          const label = e.labels && e.labels[0];
          if (label) label.click(); else e.click();
        }""")
    if not await radio.is_checked():
        raise RuntimeError("The selected radio did not become checked.")


async def randomize_radio_groups(frame, rows):
    groups = {}
    for row in rows:
        if not row['disabled']:
            groups.setdefault(row['group'], []).append(row['index'])
    # A single group of many (>6) options is not a standard one-question group:
    # don't blindly select only one and claim to have answered every question.
    if len(groups) == 1 and len(next(iter(groups.values()))) > 6:
        raise RuntimeError("Radio options exist, but question grouping is ambiguous.")
    selected = 0
    for number, (group, options) in enumerate(groups.items(), 1):
        if len(options) < 2:
            continue
        if selected:
            await pause_between_answers()
        choice_index = RNG.choice(options)
        await click_radio(frame, choice_index)
        choice = await frame.locator('input[type="radio"]').nth(choice_index).evaluate(
            "e => (e.labels?.[0]?.innerText || e.value || '').trim().slice(0, 100)")
        print(f"  Question {number}: selected {choice or 'a random option'}")
        selected += 1
    return selected


async def randomize_aria_groups(frame):
    """Handle custom quizzes with ARIA radiogroups instead of HTML inputs."""
    group_nodes = frame.locator('[role="radiogroup"]')
    selected = 0
    for i in range(await group_nodes.count()):
        radios = group_nodes.nth(i).locator('[role="radio"]:not([aria-disabled="true"])')
        n = await radios.count()
        if n < 2:
            continue
        if selected:
            await pause_between_answers()
        chosen = radios.nth(RNG.randrange(n))
        await chosen.click(timeout=3000)
        print(f"  Question {i + 1}: selected a random custom radio option")
        selected += 1
    return selected


async def choose_random_answers(lesson, timeout=25):
    """Wait for SCORM Test iframe and choose one random answer per question.

    Supports native radio inputs and accessible custom radiogroups. Deliberately
    does not guess and click random links if no answer controls are recognised.
    """
    print("Looking for the question form (including the SCORM iframe)...")
    until = asyncio.get_running_loop().time() + timeout
    while asyncio.get_running_loop().time() < until:
        for frame in reversed(lesson.frames[:40]):
            try:
                rows = await frame.evaluate(RADIO_GROUPS_JS)
                if rows:
                    total = await randomize_radio_groups(frame, rows)
                    if total:
                        return total
                if await frame.locator('[role="radiogroup"]').count():
                    total = await randomize_aria_groups(frame)
                    if total:
                        return total
            except RuntimeError:
                raise
            except Exception:
                pass  # SCORM iframe may still be loading.
        await asyncio.sleep(0.25)
    raise RuntimeError("No supported answer controls found in the Test iframe.")


async def click_corregir(lesson, timeout=25):
    """Click only the explicit 'Corregir' control inside any quiz iframe.

    Never guess a submit control by its position or click unrelated buttons.
    """
    exact = re.compile(r"^\s*Corregir\s*$", re.I)
    selectors = [
        lambda f: f.get_by_role("button", name=exact),
        lambda f: f.locator('input[type="submit"],input[type="button"]').filter(
            has_text=exact),
        lambda f: f.get_by_role("link", name=exact),
        lambda f: f.locator('button,a,[role="button"],[onclick]').filter(has_text=exact),
        lambda f: f.get_by_text("Corregir", exact=True),
    ]
    print("Looking for the Corregir button (including SCORM iframes)...")
    until = asyncio.get_running_loop().time() + timeout
    while asyncio.get_running_loop().time() < until:
        # Reverse order prioritises the innermost quiz iframe over the player.
        for frame in reversed(lesson.frames[:40]):
            for make in selectors:
                try:
                    control = make(frame).first
                    if not await control.count() or not await control.is_visible():
                        continue
                    if not await control.is_enabled():
                        continue
                    await control.click(timeout=5000, no_wait_after=True)
                    print("Clicked Corregir. The site may now grade/save this attempt.")
                    return
                except Exception:
                    # The question frame can rerender while the control is found.
                    continue
        await asyncio.sleep(0.25)
    raise RuntimeError("Could not find an enabled, visible Corregir control.")


async def save_diagnostics(lesson):
    try:
        await lesson.screenshot(path="mentoaula_unit1_test_diagnostic.png", full_page=True)
        print("Diagnostic screenshot: mentoaula_unit1_test_diagnostic.png")
    except Exception:
        pass
    # Save only the quiz iframe HTML, locally. It may contain course data.
    for frame in reversed(lesson.frames[:40]):
        try:
            if 'loadSco' in frame.url or 'scorm' in frame.url.lower() or \
                    await frame.locator('input[type="radio"], [role="radiogroup"]').count():
                Path("mentoaula_test_frame.html").write_text(
                    await frame.content(), encoding="utf-8")
                print("Diagnostic HTML: mentoaula_test_frame.html")
                break
        except Exception:
            pass


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=["--disable-popup-blocking"])
        context = await browser.new_context(viewport={"width": 1400, "height": 900}, locale="es-ES")
        dashboard = await context.new_page()
        lesson = None
        try:
            await dashboard.goto(URL, wait_until="domcontentloaded", timeout=45000)
            user = await first_visible(dashboard, [lambda f: f.locator("#usuario")], 25)
            pwd = await first_visible(dashboard, [lambda f: f.locator("#password")], 25)
            submit = await first_visible(dashboard, [lambda f: f.locator("#btnLogin")], 25)
            if not all((user, pwd, submit)):
                raise RuntimeError("Login form missing.")
            await user.fill(USERNAME)
            await pwd.fill(PASSWORD)
            await submit.click()
            print("Logged in.")
            lesson = await open_unit1(dashboard, context)
            await check_campus_connected(lesson)
            await open_test(lesson)
            total = await choose_random_answers(lesson)
            if total < 1:
                raise RuntimeError("No questions answered; refusing to click Corregir.")
            print(f"Selected random answers for {total} questions.")
            await click_corregir(lesson)
            print("SUCCESS: Corregir clicked. Browser remains open for inspection.")
        except Exception as exc:
            print("ERROR:", exc)
            if lesson:
                await save_diagnostics(lesson)
        finally:
            await asyncio.to_thread(input, "Press ENTER to close the browser...")
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
