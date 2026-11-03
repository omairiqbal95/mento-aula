#!/usr/bin/env python3
"""MentoAula keep-alive: login all accounts, idle, optional rotation."""
from __future__ import annotations
import argparse, asyncio, collections, datetime, json, random, sys
from contextvars import ContextVar
from pathlib import Path
from playwright.async_api import async_playwright

URL = "https://campus.mentoaula.com/"
INDEX_URL = "https://campus.mentoaula.com/IndexIF.aspx"
ACTIVE = ContextVar("active", default="manager")
LOG_PATH: Path | None = None
SECRETS: tuple[str, ...] = ()

LOW_RAM_ARGS = [
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-extensions",
    "--disable-background-networking",
    "--disable-sync",
    "--disable-default-apps",
    "--disable-component-update",
    "--disable-breakpad",
    "--disable-client-side-phishing-detection",
    "--disable-popup-blocking",
    "--disable-prompt-on-repost",
    "--disable-translate",
    "--metrics-recording-only",
    "--no-default-browser-check",
    "--no-first-run",
    "--safebrowsing-disable-auto-update",
    "--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter",
    "--blink-settings=imagesEnabled=false",
    "--js-flags=--max-old-space-size=128",
    "--disk-cache-size=1048576",
    "--media-cache-size=1048576",
]

def sanitized(t: str) -> str:
    out = str(t)
    for s in SECRETS:
        if len(s) >= 4 and s in out:
            out = out.replace(s, "[REDACTED]")
    return out

def log(msg: str) -> None:
    ts = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    line = f"[{ts}] [{ACTIVE.get()}] {sanitized(msg)}"
    print(line, flush=True)
    if LOG_PATH is not None:
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(line + "\n")

async def first_visible(page, selectors, seconds: float = 20):
    until = asyncio.get_running_loop().time() + seconds
    while asyncio.get_running_loop().time() < until:
        for frame in page.frames[:20]:
            for make in selectors:
                try:
                    loc = make(frame).first
                    if await loc.count() and await loc.is_visible():
                        return loc
                except Exception:
                    pass
        await asyncio.sleep(0.2)
    return None

async def dismiss_tour(page) -> None:
    try:
        f = await first_visible(page, [lambda p: p.locator("#my-tour-button-finish")], 2.5)
        if f:
            await f.click(timeout=6000)
            log("tour dismissed")
    except Exception:
        pass

async def login(page, username: str, password: str) -> None:
    await page.goto(URL, wait_until="domcontentloaded", timeout=45000)
    u = await first_visible(page, [lambda p: p.locator("#usuario")], 30)
    p = await first_visible(page, [lambda p: p.locator("#password")], 30)
    b = await first_visible(page, [lambda p: p.locator("#btnLogin")], 30)
    if not all((u, p, b)):
        raise RuntimeError("login form not found")
    await u.fill(username)
    await p.fill(password)
    await b.click(timeout=15000)
    d = await first_visible(page, [lambda p: p.locator("#tod01")], 45)
    if d is None:
        raise RuntimeError("dashboard not detected")
    log("logged in")
    await dismiss_tour(page)

async def keepalive_forever(context, page, username: str, password: str, args) -> None:
    relogins = 0
    while True:
        await asyncio.sleep(args.interval)
        if page.is_closed():
            raise RuntimeError("page closed")
        expired = False
        try:
            resp = await context.request.get(INDEX_URL, timeout=20000)
            text = await resp.text()
            expired = ('id="usuario"' in text) or ("SecureLogin/Login.aspx" in resp.url)
        except Exception as exc:
            log(f"refresh failed: {type(exc).__name__}")
            expired = True
        if expired:
            if relogins >= args.relogin_retries:
                raise RuntimeError(f"relogin limit reached ({args.relogin_retries})")
            relogins += 1
            log(f"session expired; re-login {relogins}/{args.relogin_retries}")
            try:
                await page.close()
            except Exception:
                pass
            page = await context.new_page()
            await login(page, username, password)
            relogins = 0
            continue
        try:
            await page.mouse.move(random.randint(10, 700), random.randint(10, 500))
        except Exception:
            pass
        log(f"keepalive ok (next {args.interval:.0f}s)")

async def worker(browser, queue, accounts, args, wid: int):
    while True:
        try:
            username = queue.popleft()
        except IndexError:
            return
        ACTIVE.set(username)
        context = None
        try:
            context = await browser.new_context(viewport={"width": 900, "height": 650}, locale="es-ES")
            context.set_default_timeout(15000)
            page = await context.new_page()
            page.set_default_navigation_timeout(45000)
            await login(page, username, accounts[username])
            if args.rotate_every > 0:
                try:
                    await asyncio.wait_for(
                        keepalive_forever(context, page, username, accounts[username], args),
                        timeout=args.rotate_every,
                    )
                except asyncio.TimeoutError:
                    log(f"slot {wid}: rotate out after {args.rotate_every}s")
            else:
                await keepalive_forever(context, page, username, accounts[username], args)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            log(f"worker error: {type(exc).__name__}: {str(exc)[:200]}")
        finally:
            if context is not None:
                try:
                    await context.close()
                except Exception:
                    pass

async def main_async(args) -> None:
    global LOG_PATH, SECRETS
    data = json.loads(args.accounts.read_text(encoding="utf-8-sig"))
    accounts: dict[str, str] = {}
    for row in data:
        u, p = row.get("username"), row.get("password")
        if not u or not p:
            raise ValueError("bad row in accounts file")
        accounts[u] = p
    SECRETS = tuple(accounts.values())
    LOG_PATH = args.log_dir / "keepalive.log"
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    log(f"accounts: {len(accounts)} | concurrency: {args.concurrency} | "
        f"interval: {args.interval}s | rotate_every: {args.rotate_every}s | loop: {args.loop}")

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=not args.headed, args=LOW_RAM_ARGS)
        try:
            while True:
                queue = collections.deque(accounts.keys())
                workers = [
                    asyncio.create_task(worker(browser, queue, accounts, args, i))
                    for i in range(args.concurrency)
                ]
                await asyncio.gather(*workers)
                if not args.loop:
                    break
                log("cycle complete; restarting")
                await asyncio.sleep(10)
        finally:
            await browser.close()

def parse_args():
    p = argparse.ArgumentParser(description="MentoAula login keep-alive (idle only, minimal RAM)")
    p.add_argument("--accounts", type=Path, default=Path("mentoaula_accounts.json"))
    p.add_argument("--concurrency", type=int, default=10,
                   help="simultaneous browser contexts (32GB machine: 60-77 realistic)")
    p.add_argument("--interval", type=float, default=300.0,
                   help="seconds between session refreshes (default 300)")
    p.add_argument("--rotate-every", type=float, default=0.0,
                   help="0 = keep first N users forever; >0 = cycle users through N slots every T seconds")
    p.add_argument("--loop", action="store_true",
                   help="restart the rotation cycle when the queue empties (only meaningful with --rotate-every > 0)")
    p.add_argument("--relogin-retries", type=int, default=3)
    p.add_argument("--log-dir", type=Path, default=Path("mentoaula_keepalive_logs"))
    p.add_argument("--headed", action="store_true")
    args = p.parse_args()
    if not 1 <= args.concurrency <= 100:
        p.error("--concurrency must be 1..100")
    if args.interval < 60:
        p.error("--interval must be >= 60")
    if args.rotate_every > 0 and args.rotate_every < args.interval:
        p.error("--rotate-every must be >= --interval")
    return args

if __name__ == "__main__":
    args = parse_args()
    try:
        asyncio.run(main_async(args))
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)