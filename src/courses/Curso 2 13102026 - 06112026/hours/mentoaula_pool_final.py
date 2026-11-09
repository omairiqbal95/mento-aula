#!/usr/bin/env python3
"""MentoAula rotating pool — lowest-hours-first, 4h holds, self-contained.

Behaviour:
  • 30 slots, all logged in and doing safe dashboard menu activity.
  • Each user holds for --hold-seconds (default 4h), then rotates out.
  • Picks the user with the LOWEST current hours first (embedded sheet).
  • Refreshes ASP.NET session every 180s (proven context.request.get).
  • Per-user logs: <log-dir>/<username>/events.log
  • Status block every 30s: RAM used/free + per-active-user hours:minutes.
  • Persists accumulated seconds to <log-dir>/state.json → safe to Ctrl+C
    and restart without losing progress.

Requires:  pip install playwright psutil
           python -m playwright install chromium
"""
from __future__ import annotations
import argparse, asyncio, datetime, json, os, random, sys, time
from contextvars import ContextVar
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

try:
    import psutil
except ImportError:
    psutil = None

URL = "https://campus.mentoaula.com/"
INDEX_URL = "https://campus.mentoaula.com/IndexIF.aspx"

# ─────────────────────────────────────────────────────────────────────────────
# Embedded account data (username, password, initial HORAS as "HH:MM:SS")
# ─────────────────────────────────────────────────────────────────────────────
RAW = """\
ZY5282312P 13:18:47
AY6677383Z 34:26:39
CZ1404249N 40:10:42
UZ3686258F 36:57:27
AY3333971C 26:28:45
A31917609A 35:34:03
MY0077187J 39:12:51
AZ0987412G 36:26:05
AY7074144W 46:39:50
PZ0941874Y 45:02:22
TY9631200X 46:16:57
MY7253846M 33:50:32
KY5927553F 36:06:56
AY6977997H 37:58:00
GY1247449N 32:37:42
MY8442360V 43:11:21
MY8967725Q 37:13:15
SZ3388168C 25:10:48
MY6306123C 39:31:20
SY8944954S 36:03:42
G24555247X 35:51:37
M31924836P 29:17:47
BZ0076857L 33:36:45
FZ0378996F 33:45:42
MY7946493F 29:57:24
SY6887616G 30:15:45
JZ3995527H 36:51:55
MY1936511V 28:19:51
MZ0592349N 32:52:45
TY3333733N 30:27:59
SY4049934Q 40:37:21
M60049813X 40:12:26
SX4461560C 37:06:11
RY1075568X 32:36:45
UZ3441388H 42:45:44
GZ0145367N 39:35:17
KY0346526E 32:22:34
SY1781138D 41:29:59
NY6887632C 35:26:56
ZY9014984X 34:36:07
AX3203162K 31:30:49
ZZ0297697J 34:53:59
MZ1634335Y 33:33:39
SY9118104K 34:46:34
AX5554093F 33:29:34
ZY9002092K 37:35:13
AY3864633A 38:19:16
SY8042436V 41:13:59
DZ0597856E 42:15:46
M06314752X 37:19:27
HZ3604939Q 43:58:56
MZ0812830S 41:09:26
IY5519168X 28:47:09
SY5190468A 42:40:09
NX4268506M 41:32:41
SY1887743D 43:00:44
AZ4239973C 45:59:12
YY8013789M 46:03:46
AZ3562834R 34:49:40
MY6781509L 41:47:30
J26611206E 29:53:51
AZ3034099J 33:29:00
NZ4796614S 43:51:01
G39407254C 37:59:42
BZ4616363S 37:24:18
GZ4029365T 45:49:33
SY0360977Y 32:39:27
AY2337615R 35:22:19
AY9248031K 30:55:51
GZ2760289H 35:53:44
AZ0849940A 31:06:31
SY6751387G 32:25:47
LZ0663433A 29:27:10
FZ0622850S 30:46:07
AX3830923C 30:02:21
IZ5322064F 25:27:23
SZ5271225K 25:41:28
"""

def _parse_hms(s: str) -> int:
    h, m, sec = s.split(":")
    return int(h) * 3600 + int(m) * 60 + int(sec)

def fmt_hms(seconds: float) -> str:
    s = int(seconds)
    return f"{s // 3600:02d}:{(s % 3600) // 60:02d}:{s % 60:02d}"

ACCOUNTS: list[tuple[str, str, int]] = []
for line in RAW.strip().splitlines():
    parts = line.split()
    if len(parts) != 2:
        continue
    user, hms = parts
    pwd = "Mentoaula" + user[-5:-1]
    ACCOUNTS.append((user, pwd, _parse_hms(hms)))

# ─────────────────────────────────────────────────────────────────────────────
# State
# ─────────────────────────────────────────────────────────────────────────────
ACTIVE = ContextVar("active_user", default="pool")
SECRETS: tuple[str, ...] = tuple(p for _, p, _ in ACCOUNTS)
LOG_DIR: Path | None = None

LOW_RAM_ARGS = [
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
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

# ─────────────────────────────────────────────────────────────────────────────
# Logging
# ─────────────────────────────────────────────────────────────────────────────
def _ts() -> str:
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def _sanitize(t: str) -> str:
    out = str(t)
    for secret in SECRETS:
        if len(secret) >= 4 and secret in out:
            out = out.replace(secret, "[REDACTED]")
    return out

def pool_log(msg: str) -> None:
    line = f"[{_ts()}] [pool] {_sanitize(msg)}"
    print(line, flush=True)
    if LOG_DIR:
        (LOG_DIR / "pool.log").parent.mkdir(parents=True, exist_ok=True)
        with (LOG_DIR / "pool.log").open("a", encoding="utf-8") as f:
            f.write(line + "\n")

def user_log(username: str, msg: str) -> None:
    if LOG_DIR is None:
        return
    path = LOG_DIR / username / "events.log"
    path.parent.mkdir(parents=True, exist_ok=True)
    line = f"[{_ts()}] {_sanitize(msg)}"
    with path.open("a", encoding="utf-8") as f:
        f.write(line + "\n")

# ─────────────────────────────────────────────────────────────────────────────
# User / pool state
# ─────────────────────────────────────────────────────────────────────────────
class UserState:
    __slots__ = ("username", "password", "initial_seconds",
                 "accumulated_seconds", "active_since", "sessions")

    def __init__(self, username: str, password: str, initial_seconds: int,
                 accumulated_seconds: float = 0.0):
        self.username = username
        self.password = password
        self.initial_seconds = initial_seconds
        self.accumulated_seconds = float(accumulated_seconds)
        self.active_since: float | None = None
        self.sessions = 0

    def total_seconds(self) -> float:
        active = (time.monotonic() - self.active_since) if self.active_since is not None else 0.0
        return self.initial_seconds + self.accumulated_seconds + active

    def start_session(self) -> None:
        self.active_since = time.monotonic()
        self.sessions += 1

    def end_session(self) -> float:
        """Freeze accumulated_seconds at end; return session length."""
        if self.active_since is None:
            return 0.0
        delta = time.monotonic() - self.active_since
        self.accumulated_seconds += delta
        self.active_since = None
        return delta

class Pool:
    def __init__(self, states: dict[str, UserState], target_seconds: int):
        self.states = states
        self.target_seconds = target_seconds
        self.in_use: set[str] = set()

    def pick_next(self) -> UserState | None:
        candidates = [
            s for s in self.states.values()
            if s.username not in self.in_use and s.total_seconds() < self.target_seconds
        ]
        if not candidates:
            return None
        candidates.sort(key=lambda s: s.total_seconds())
        chosen = candidates[0]
        self.in_use.add(chosen.username)
        return chosen

    def release(self, state: UserState) -> None:
        self.in_use.discard(state.username)

    def pending_count(self) -> int:
        return sum(
            1 for s in self.states.values()
            if s.username not in self.in_use and s.total_seconds() < self.target_seconds
        )

    def below_target(self) -> int:
        return sum(1 for s in self.states.values() if s.total_seconds() < self.target_seconds)

    def all_done(self) -> bool:
        return self.below_target() == 0

# ─────────────────────────────────────────────────────────────────────────────
# Playwright helpers
# ─────────────────────────────────────────────────────────────────────────────
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
        f = await first_visible(page, [lambda p: p.locator("#my-tour-button-finish")], 2.0)
        if f:
            await f.click(timeout=6000)
            user_log(ACTIVE.get(), "welcome tour dismissed")
    except Exception:
        pass

async def click_login(page, timeout_ms: int) -> None:
    btn = await first_visible(page, [lambda p: p.locator("#btnLogin")], 25)
    if not btn:
        raise RuntimeError("login button not found")
    try:
        await btn.scroll_into_view_if_needed(timeout=3000)
    except Exception:
        pass
    try:
        await btn.click(timeout=timeout_ms, no_wait_after=True)
    except PWTimeout:
        user_log(ACTIVE.get(), "click timeout; JS fallback")
        await page.evaluate(
            """() => {
                const b = document.querySelector('#btnLogin');
                if (!b) throw new Error('no #btnLogin');
                b.dispatchEvent(new MouseEvent('click',
                  {bubbles:true, cancelable:true, view:window}));
            }"""
        )

async def login(page, username: str, password: str, click_timeout_ms: int = 20000) -> None:
    await page.goto(URL, wait_until="domcontentloaded", timeout=45000)
    u = await first_visible(page, [lambda p: p.locator("#usuario")], 30)
    p = await first_visible(page, [lambda p: p.locator("#password")], 30)
    if not u or not p:
        raise RuntimeError("login fields not found")
    await u.fill(username)
    await p.fill(password)
    await click_login(page, click_timeout_ms)
    dash = await first_visible(page, [lambda p: p.locator("#tod01")], 45)
    if dash is None:
        raise RuntimeError("dashboard not detected after login")
    await dismiss_tour(page)

async def refresh_session(context) -> tuple[bool, str]:
    """Return (alive, reason). Exceptions = assume alive (retry)."""
    try:
        resp = await context.request.get(INDEX_URL, timeout=15000)
        if "SecureLogin/Login.aspx" in resp.url:
            return False, "redirect to login"
        text = (await resp.text())[:8000]
        if 'id="usuario"' in text and 'id="password"' in text:
            return False, "login form in response"
        return True, "ok"
    except Exception as exc:
        return True, f"refresh error {type(exc).__name__} (assumed alive)"

async def do_menu_activity(page) -> int:
    """Safe activity: toggle accordions (never open units), move mouse, scroll."""
    actions = 0
    # Toggle 3 random accordion headers
    try:
        unit_ids = list(range(1, 14))
        random.shuffle(unit_ids)
        for u in unit_ids[:3]:
            if page.is_closed():
                break
            try:
                h = page.locator(f"#tod{u:02d}").first
                if await h.count() and await h.is_visible():
                    url_before = page.url
                    await h.click(timeout=3000, no_wait_after=True)
                    await asyncio.sleep(random.uniform(0.3, 0.9))
                    if page.url != url_before:
                        user_log(ACTIVE.get(),
                                 f"WARN URL changed after accordion #{u:02d} click: {page.url}")
                        # Return to dashboard if we accidentally navigated
                        try:
                            await page.goto(INDEX_URL, wait_until="domcontentloaded",
                                            timeout=15000)
                        except Exception:
                            pass
                        break
                    # Toggle back
                    await h.click(timeout=3000, no_wait_after=True)
                    await asyncio.sleep(random.uniform(0.2, 0.5))
                    actions += 2
            except Exception:
                pass
    except Exception:
        pass

    # Mouse + gentle scroll
    try:
        await page.mouse.move(random.randint(80, 1100), random.randint(80, 650))
        await asyncio.sleep(0.2)
        await page.evaluate("window.scrollTo(0, Math.random() * 350)")
        await asyncio.sleep(0.25)
        await page.evaluate("window.scrollTo(0, 0)")
        actions += 1
    except Exception:
        pass

    return actions

# ─────────────────────────────────────────────────────────────────────────────
# Worker
# ─────────────────────────────────────────────────────────────────────────────
async def worker(browser, pool: Pool, args, wid: int) -> None:
    """Take lowest-hours user from pool, run for hold_seconds, rotate out."""
    while True:
        state = pool.pick_next()
        if state is None:
            return
        ACTIVE.set(state.username)
        state.start_session()
        user_log(state.username, f"session start (slot {wid})")

        context = None
        page = None
        try:
            context = await browser.new_context(
                viewport={"width": 900, "height": 650},
                locale="es-ES",
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/131.0.0.0 Safari/537.36"
                ),
            )
            context.set_default_timeout(15000)
            page = await context.new_page()
            page.set_default_navigation_timeout(45000)

            # Stagger initial logins a bit
            await asyncio.sleep(random.uniform(0, args.launch_stagger))

            try:
                await login(page, state.username, state.password, args.click_timeout)
            except Exception as exc:
                user_log(state.username, f"login failed: {type(exc).__name__}: {str(exc)[:100]}")
                state.end_session()
                pool.release(state)
                await asyncio.sleep(random.uniform(15, 30))
                continue

            user_log(state.username, "logged in")

            start_mono = time.monotonic()
            deadline = start_mono + args.hold_seconds
            next_activity = start_mono + random.uniform(30, 60)
            next_refresh = start_mono + args.refresh_interval
            consecutive_expired = 0

            while time.monotonic() < deadline:
                if page.is_closed():
                    user_log(state.username, "page closed unexpectedly")
                    break

                now = time.monotonic()
                next_event = min(next_activity, next_refresh, deadline)
                await asyncio.sleep(max(0.1, min(next_event - now, 5.0)))

                if time.monotonic() >= next_activity:
                    try:
                        n = await do_menu_activity(page)
                        user_log(state.username, f"activity ok ({n} actions)")
                    except Exception as exc:
                        user_log(state.username, f"activity error: {type(exc).__name__}")
                    next_activity = time.monotonic() + random.uniform(60, 120)

                if time.monotonic() >= next_refresh:
                    ok, reason = await refresh_session(context)
                    if ok:
                        consecutive_expired = 0
                        user_log(state.username, f"keepalive ok ({reason})")
                    else:
                        consecutive_expired += 1
                        user_log(state.username,
                                 f"refresh says expired ({reason}) [{consecutive_expired}/2]")
                        if consecutive_expired >= 2:
                            user_log(state.username, "session confirmed dead; attempting re-login")
                            try:
                                await page.close()
                                page = await context.new_page()
                                await login(page, state.username, state.password,
                                            args.click_timeout)
                                user_log(state.username, "re-login ok, continuing session")
                                consecutive_expired = 0
                            except Exception as exc:
                                user_log(state.username,
                                         f"re-login failed: {type(exc).__name__}")
                                break
                        else:
                            next_refresh = time.monotonic() + 15
                            continue
                    next_refresh = time.monotonic() + args.refresh_interval

            elapsed = state.end_session()
            user_log(state.username,
                     f"session end after {fmt_hms(elapsed)} "
                     f"(total {fmt_hms(state.total_seconds())})")
        except asyncio.CancelledError:
            state.end_session()
            raise
        except Exception as exc:
            state.end_session()
            user_log(state.username, f"worker error: {type(exc).__name__}: {str(exc)[:150]}")
        finally:
            pool.release(state)
            if context is not None:
                try:
                    await context.close()
                except Exception:
                    pass

# ─────────────────────────────────────────────────────────────────────────────
# Status reporter
# ─────────────────────────────────────────────────────────────────────────────
def process_tree_rss_gib() -> float:
    if psutil is None:
        return 0.0
    try:
        p = psutil.Process(os.getpid())
        total = p.memory_info().rss
        for child in p.children(recursive=True):
            try:
                total += child.memory_info().rss
            except psutil.NoSuchProcess:
                pass
        return total / (1024 ** 3)
    except Exception:
        return 0.0

async def status_reporter(pool: Pool, args) -> None:
    while True:
        await asyncio.sleep(args.status_interval)
        active = [s for s in pool.states.values() if s.username in pool.in_use]
        active.sort(key=lambda s: s.total_seconds())

        mem_used = mem_total = mem_avail = 0.0
        if psutil is not None:
            m = psutil.virtual_memory()
            mem_total = m.total / (1024 ** 3)
            mem_avail = m.available / (1024 ** 3)
            mem_used = mem_total - mem_avail
        tree_rss = process_tree_rss_gib()

        sep = "═" * 96
        print(sep)
        print(f"STATUS {datetime.datetime.now().strftime('%H:%M:%S')}  │  "
              f"slots {len(active)}/{args.slots}  │  "
              f"RAM OS {mem_used:.1f}/{mem_total:.1f} GiB (avail {mem_avail:.1f})  │  "
              f"chromium tree {tree_rss:.1f} GiB")
        below = pool.below_target()
        print(f"Users below {args.target_hours}h target: {below}/{len(pool.states)}  │  "
              f"queued: {pool.pending_count()}")
        if active:
            print(f"{'USER':<13} {'TOTAL':<10} {'SESSION':<10}")
            print("─" * 96)
            for s in active:
                sess = (time.monotonic() - s.active_since) if s.active_since else 0
                print(f"{s.username:<13} {fmt_hms(s.total_seconds()):<10} {fmt_hms(sess):<10}")
        print(sep, flush=True)

# ─────────────────────────────────────────────────────────────────────────────
# Persistence
# ─────────────────────────────────────────────────────────────────────────────
def save_state(path: Path, states: dict[str, UserState]) -> None:
    payload = {
        "updated_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "states": {
            u: {"initial": s.initial_seconds, "accumulated": s.accumulated_seconds,
                "sessions": s.sessions}
            for u, s in states.items()
        },
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    tmp.replace(path)

def load_state(path: Path, states: dict[str, UserState]) -> None:
    if not path.is_file():
        return
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        for user, rec in data.get("states", {}).items():
            if user in states:
                states[user].accumulated_seconds = float(rec.get("accumulated", 0.0))
                states[user].sessions = int(rec.get("sessions", 0))
        pool_log(f"state loaded from {path}: "
                 f"{sum(1 for s in states.values() if s.accumulated_seconds > 0)} users resumed")
    except Exception as exc:
        pool_log(f"could not load state: {type(exc).__name__}")

# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────
async def main_async(args) -> None:
    global LOG_DIR
    LOG_DIR = args.log_dir
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    states = {u: UserState(u, p, h) for u, p, h in ACCOUNTS}
    load_state(LOG_DIR / "state.json", states)

    target_seconds = int(args.target_hours * 3600)
    pool = Pool(states, target_seconds)

    # Print plan
    pool_log(f"accounts: {len(states)} | slots: {args.slots} | "
             f"hold: {args.hold_seconds}s | refresh: {args.refresh_interval}s | "
             f"target: {args.target_hours}h")
    lowest = sorted(states.values(), key=lambda s: s.total_seconds())[:5]
    pool_log("priority order (lowest 5): " +
             ", ".join(f"{s.username}={fmt_hms(s.total_seconds())}" for s in lowest))

    save_task = None

    async def periodic_save():
        while True:
            await asyncio.sleep(60)
            try:
                save_state(LOG_DIR / "state.json", states)
            except Exception:
                pass

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=not args.headed, args=LOW_RAM_ARGS)
        try:
            save_task = asyncio.create_task(periodic_save())
            status_task = asyncio.create_task(status_reporter(pool, args))

            workers = [
                asyncio.create_task(worker(browser, pool, args, i))
                for i in range(args.slots)
            ]
            await asyncio.gather(*workers)

            save_task.cancel()
            status_task.cancel()
            await asyncio.gather(save_task, status_task, return_exceptions=True)
            save_state(LOG_DIR / "state.json", states)
            pool_log(f"all workers exited. below target: {pool.below_target()}")
        finally:
            if save_task and not save_task.done():
                save_task.cancel()
            save_state(LOG_DIR / "state.json", states)
            await browser.close()

def parse_args():
    p = argparse.ArgumentParser(description="MentoAula rotating pool (lowest-hours-first)")
    p.add_argument("--slots", type=int, default=30,
                   help="concurrent users (default 30)")
    p.add_argument("--hold-seconds", type=float, default=4 * 3600,
                   help="seconds each user holds before rotation (default 14400 = 4h)")
    p.add_argument("--refresh-interval", type=float, default=180,
                   help="session refresh interval (default 180s)")
    p.add_argument("--target-hours", type=float, default=60.0,
                   help="stop a user's inclusion once total >= this (default 60h)")
    p.add_argument("--launch-stagger", type=float, default=15,
                   help="random delay between login starts (default 15s)")
    p.add_argument("--click-timeout", type=int, default=20000,
                   help="login button click timeout ms (default 20000)")
    p.add_argument("--status-interval", type=float, default=30,
                   help="seconds between status blocks (default 30)")
    p.add_argument("--log-dir", type=Path, default=Path("mentoaula_pool_final_logs"))
    p.add_argument("--headed", action="store_true")
    args = p.parse_args()

    if not 1 <= args.slots <= 40:
        p.error("--slots must be 1..40")
    if not 60 <= args.refresh_interval <= 240:
        p.error("--refresh-interval must be 60..240 (server timeout is ~5min)")
    if args.hold_seconds < 60:
        p.error("--hold-seconds must be >= 60")
    if args.target_hours < 1:
        p.error("--target-hours must be >= 1")
    if psutil is None:
        print("WARNING: psutil not installed. RAM stats will be missing. "
              "pip install psutil", file=sys.stderr)
    return args

if __name__ == "__main__":
    try:
        asyncio.run(main_async(parse_args()))
    except KeyboardInterrupt:
        print("\nInterrupted. State saved; rerun same command to resume.", file=sys.stderr)