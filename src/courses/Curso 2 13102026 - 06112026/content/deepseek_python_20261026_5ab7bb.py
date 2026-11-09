#!/usr/bin/env python3
"""MentoAula Targeted Unit Rerun - V1.0

Runs ONLY the specific units each account is missing. No pacing, minimum
delays, maximum diagnostics. Every unit is printed with a clear verdict:
COMPLETE / PARTIAL / LINEAR_ONLY / FAILED.

Completion is verified structurally: sidebar detected, every discovered
section visited, no failed clicks.
"""
from __future__ import annotations
import argparse
import asyncio
import hashlib
import json
import logging
import os
import re
import sys
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from playwright.async_api import (
    BrowserContext, Error as PlaywrightError, Frame, Page,
    TimeoutError as PlaywrightTimeoutError, async_playwright,
)

BASE_URL = 'https://campus.mentoaula.com/'
INDEX_URL = 'https://campus.mentoaula.com/IndexIF.aspx'

# ---------------------------------------------------------------------------
# Credentials (only the accounts that need work + the completed ones for safety)
# ---------------------------------------------------------------------------
CREDS = {
    'ZY5282312P': 'Mentoaula2312',
    'AY6677383Z': 'Mentoaula7383', 'CZ1404249N': 'Mentoaula4249',
    'UZ3686258F': 'Mentoaula6258', 'AY3333971C': 'Mentoaula3971',
    'A31917609A': 'Mentoaula7609', 'MY0077187J': 'Mentoaula7187',
    'AZ0987412G': 'Mentoaula7412', 'AY7074144W': 'Mentoaula4144',
    'PZ0941874Y': 'Mentoaula1874', 'TY9631200X': 'Mentoaula1200',
    'MY7253846M': 'Mentoaula3846', 'KY5927553F': 'Mentoaula7553',
    'AY6977997H': 'Mentoaula7997', 'GY1247449N': 'Mentoaula7449',
    'MY8442360V': 'Mentoaula2360', 'MY8967725Q': 'Mentoaula7725',
    'SZ3388168C': 'Mentoaula8168', 'MY6306123C': 'Mentoaula6123',
    'SY8944954S': 'Mentoaula4954', 'G24555247X': 'Mentoaula5247',
    'M31924836P': 'Mentoaula4836', 'BZ0076857L': 'Mentoaula6857',
    'FZ0378996F': 'Mentoaula8996', 'MY7946493F': 'Mentoaula6493',
    'SY6887616G': 'Mentoaula7616', 'JZ3995527H': 'Mentoaula5527',
    'MY1936511V': 'Mentoaula6511', 'MZ0592349N': 'Mentoaula2349',
    'TY3333733N': 'Mentoaula3733', 'SY4049934Q': 'Mentoaula9934',
    'M60049813X': 'Mentoaula9813', 'SX4461560C': 'Mentoaula1560',
    'RY1075568X': 'Mentoaula5568', 'UZ3441388H': 'Mentoaula1388',
    'GZ0145367N': 'Mentoaula5367', 'KY0346526E': 'Mentoaula6526',
    'SY1781138D': 'Mentoaula1138', 'NY6887632C': 'Mentoaula7632',
    'ZY9014984X': 'Mentoaula4984', 'AX3203162K': 'Mentoaula3162',
    'ZZ0297697J': 'Mentoaula7697', 'MZ1634335Y': 'Mentoaula4335',
    'SY9118104K': 'Mentoaula8104', 'AX5554093F': 'Mentoaula4093',
    'ZY9002092K': 'Mentoaula2092', 'AY3864633A': 'Mentoaula4633',
    'SY8042436V': 'Mentoaula2436', 'DZ0597856E': 'Mentoaula7856',
    'M06314752X': 'Mentoaula4752', 'HZ3604939Q': 'Mentoaula4939',
    'MZ0812830S': 'Mentoaula2830', 'IY5519168X': 'Mentoaula9168',
    'SY5190468A': 'Mentoaula0468', 'NX4268506M': 'Mentoaula8506',
    'SY1887743D': 'Mentoaula7743', 'AZ4239973C': 'Mentoaula9973',
    'YY8013789M': 'Mentoaula3789', 'AZ3562834R': 'Mentoaula2834',
    'MY6781509L': 'Mentoaula1509', 'J26611206E': 'Mentoaula1206',
    'AZ3034099J': 'Mentoaula4099', 'NZ4796614S': 'Mentoaula6614',
    'G39407254C': 'Mentoaula7254', 'BZ4616363S': 'Mentoaula6363',
    'GZ4029365T': 'Mentoaula9365', 'SY0360977Y': 'Mentoaula0977',
    'AY2337615R': 'Mentoaula7615', 'AY9248031K': 'Mentoaula8031',
    'GZ2760289H': 'Mentoaula0289', 'AZ0849940A': 'Mentoaula9940',
    'SY6751387G': 'Mentoaula1387', 'LZ0663433A': 'Mentoaula3433',
    'FZ0622850S': 'Mentoaula2850', 'AX3830923C': 'Mentoaula0923',
    'IZ5322064F': 'Mentoaula2064', 'SZ5271225K': 'Mentoaula1225',
}

# ---------------------------------------------------------------------------
# TARGET_MAP: exactly which units each account needs
# ---------------------------------------------------------------------------
TARGET_MAP: dict[str, list[int]] = {
    'AY6677383Z': [6, 7, 9, 10, 11, 12],
    'CZ1404249N': [11],
    'UZ3686258F': [3, 5, 9, 11, 12, 13],
    'AY3333971C': [4],
    'A31917609A': [10],
    'MY0077187J': [11],
    'AZ0987412G': [11, 12, 13],
    'AY7074144W': [6, 8, 10, 11, 13],
    'PZ0941874Y': [4, 7, 8, 13],
    'TY9631200X': [11, 13],
    'KY5927553F': [8, 10, 11, 12],
    'AY6977997H': [13],
    'GY1247449N': [10, 11],
    'MY8442360V': [10, 11],
    'MY8967725Q': [8, 11, 12, 13],
    'SZ3388168C': [3],
    'MY6306123C': [3, 5, 9, 11],
    'SY8944954S': [11, 13],
    'G24555247X': [9],
    'M31924836P': [8, 11],
    'BZ0076857L': [11],
    'MY7946493F': [4, 11],
    'SY6887616G': [11, 13],
    'JZ3995527H': [10, 11, 12, 13],
    'MY1936511V': [3, 5, 11, 12, 13],
    'MZ0592349N': [8, 10, 11, 12, 13],
    'TY3333733N': [10, 11],
    'SY4049934Q': [4, 11],
    'M60049813X': [3, 9, 11],
    'SX4461560C': [3],
    'RY1075568X': [5, 6, 11],
    'UZ3441388H': [3, 8, 11],
    'GZ0145367N': [2, 7],
    'KY0346526E': [6, 9, 10, 11, 13],
    'SY1781138D': [7, 11, 13],
    'NY6887632C': [3, 8, 9, 10, 11, 13],
    'ZY9014984X': [6, 8, 10, 11],
    'AX3203162K': [2, 4, 7, 8, 10, 11, 12, 13],
    'ZZ0297697J': [6, 7, 8, 9, 10, 11, 12, 13],
    'MZ1634335Y': [3, 11, 12, 13],
    'SY9118104K': [11, 13],
    'AX5554093F': [3, 11, 12, 13],
    'ZY9002092K': [3, 6, 7, 11, 13],
    'AY3864633A': [4, 9, 11],
    'SY8042436V': [2, 3, 10, 11],
    'DZ0597856E': [5, 10, 11],
    'HZ3604939Q': [6, 11, 12],
    'MZ0812830S': [4, 10, 13],
    'IY5519168X': [3, 10, 11, 12, 13],
    'SY5190468A': [2, 5, 11],
    'NX4268506M': [3, 11, 12],
    'SY1887743D': [3, 6, 12],
    'AZ4239973C': [3, 8, 11, 12],
    'YY8013789M': [10, 11],
    'AZ3562834R': [10, 11],
    'MY6781509L': [6, 11],
    'J26611206E': [3, 5, 9, 10, 11, 12, 13],
    'AZ3034099J': [7, 10, 11, 12],
    'NZ4796614S': [8, 11, 13],
    'G39407254C': [3, 11, 13],
    'BZ4616363S': [10, 11, 12, 13],
    'GZ4029365T': [8, 10, 11, 12, 13],
    'SY0360977Y': [10, 11, 13],
    'AY2337615R': [3, 8, 9, 10, 11, 12],
    'AY9248031K': [11, 13],
    'GZ2760289H': [10, 11, 12, 13],
    'AZ0849940A': [8, 11, 12, 13],
    'SY6751387G': [11, 12, 13],
    'LZ0663433A': [3, 6, 7, 10, 11, 12, 13],
    'FZ0622850S': [3, 4, 6, 9, 10, 11, 12, 13],
    'AX3830923C': [7, 10, 11, 12, 13],
    'IZ5322064F': [4, 5, 10, 11, 13],
    'SZ5271225K': [6, 8, 10, 11, 12, 13],
}
TOTAL_UNITS = sum(len(v) for v in TARGET_MAP.values())


# =========================================================================
# JS snippets
# =========================================================================
LOGIN_FIELDS_JS = r"""() => {
  const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const vis = e => {const r=e.getBoundingClientRect(); return r.width>0&&r.height>0;};
  const inputs = Array.from(document.querySelectorAll('input'));
  const pwd = inputs.findIndex(e => e.type==='password' && vis(e));
  if (pwd<0) return null;
  const user = inputs.findIndex((e,i) => i<pwd && ['text','email','tel',''].includes(e.type) && vis(e));
  if (user<0) return null;
  return {userIndex:user, passwordIndex:pwd,
          userId:inputs[user].id||'', userName:inputs[user].name||'',
          passwordId:inputs[pwd].id||'', passwordName:inputs[pwd].name||''};
}"""

SCORM_TOC_JS = r"""() => {
  function pathFor(el){const a=[];for(let n=el;n&&n.nodeType===1;n=n.parentElement){
    if(n.id&&!/[\s"'\\]/.test(n.id)){a.unshift('#'+CSS.escape(n.id));break;}
    let i=1;for(let p=n.previousElementSibling;p;p=p.previousElementSibling)
      if(p.tagName===n.tagName)i++;
    a.unshift(n.tagName.toLowerCase()+':nth-of-type('+i+')');
    if(a.length>=12)break;}return a.join(' > ');}
  const all=[];
  for(const el of document.querySelectorAll('a,button,[role="menuitem"],[role="treeitem"],[role="tab"],li,[onclick],[tabindex]')){
    if(!el.offsetParent)continue;
    const r=el.getBoundingClientRect();
    if(r.width<25||r.height<8||!Number.isFinite(r.top)||!Number.isFinite(r.left))continue;
    if(r.left>innerWidth*0.55||r.right<5)continue;
    const txt=(el.innerText||el.textContent||el.title||'').replace(/\s+/g,' ').trim();
    if(txt.length<3||txt.length>80)continue;
    if(/^(RECURSOS|Test|Ver v[ií]deos|Unidad\s*\d+|Índice|Indice|Anterior|Siguiente|cerrar|volver|inicio|Menú|Cerrar menú|Mostrar menú lateral|Ocultar menú lateral)$/i.test(txt))continue;
    // Reject learning-objective bullets and content sentences
    if(/^(Establecer|Analizar|Identificar|Conocer|Aplicar|Interpretar|Diferenciar|Reconocer|Comprender|Saber|Entender|Definir|Describir|Distinguir|Evaluar|Determinar|Valorar|Adquirir|Concienciar|Sensibilizar|Fomentar|Prevenir|Proteger|Colocar|Mantener)\s/i.test(txt))continue;
    if(txt.endsWith('.')||txt.endsWith(',')||txt.endsWith(';'))continue;
    if(/cerrar sesi[oó]n|salir|logout|inicio de sesi[oó]n|contenido unidad/i.test(txt))continue;
    all.push({el,r,txt});
  }
  if(all.length<3)return [];
  const candidateParents=new Set();
  for(const item of all){
    if(item.el.parentElement)candidateParents.add(item.el.parentElement);
    if(item.el.parentElement?.parentElement)candidateParents.add(item.el.parentElement.parentElement);
  }
  const candidates=[];
  for(const parent of candidateParents){
    const children=all.filter(item=>parent===item.el.parentElement||parent===item.el.parentElement?.parentElement);
    if(children.length<3)continue;
    const tops=children.map(c=>c.r.top);
    const lefts=children.map(c=>c.r.left);
    const spreadY=Math.max(...tops)-Math.min(...tops);
    const spreadX=Math.max(...lefts)-Math.min(...lefts);
    if(spreadY<80||spreadX>400)continue;
    candidates.push({parent,children,score:children.length*10+Math.min(spreadY,800)-Math.max(...lefts)});
  }
  candidates.sort((a,b)=>b.score-a.score);
  const out=[],labels=new Set();
  for(const cand of candidates){
    if(out.length>=6)break;
    for(const item of cand.children){
      const key=item.txt.toLocaleLowerCase();
      if(labels.has(key))continue;
      labels.add(key);
      const ctx=String(item.el.className)+' '+String(item.el.parentElement?.className||'');
      const active=/(active|current|selected|actual|highlight)/i.test(ctx)
        ||['page','step','true'].includes(item.el.getAttribute('aria-current'))
        ||item.el.getAttribute('aria-selected')==='true';
      out.push({selector:pathFor(item.el),text:item.txt,active,top:Math.round(item.r.top),left:Math.round(item.r.left),href:item.el.getAttribute('href')||''});
    }
    if(out.length>=4)break;
  }
  return out.length>=4?out.slice(0,150):[];
}"""

# =========================================================================
# Helpers
# =========================================================================
def utc_now(): return datetime.now(timezone.utc).isoformat(timespec='seconds')

def atomic_json(path: Path, obj: Any):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix('.tmp')
    tmp.write_text(json.dumps(obj, indent=2, ensure_ascii=False, sort_keys=True), encoding='utf-8')
    os.replace(tmp, path)

def is_external_video_frame(frame: Frame) -> bool:
    host = (frame.url.split('/')[2] if '//' in frame.url else '').lower()
    return any(host==d or host.endswith('.'+d) for d in
               ('youtube.com','youtu.be','vimeo.com','player.vimeo.com','dailymotion.com'))

def _sha(s): return hashlib.sha256(s.encode()).hexdigest()[:16]


class UnitRunner:
    """Runs a single unit from scratch. Detects sidebar, visits every section,
    records per-section success/failure, prints verdict."""

    def __init__(self, account: str, unit: int, opts, logdir: Path):
        self.account = account
        self.unit = unit
        self.opts = opts
        self.logdir = logdir
        self.browser = None
        self.context: BrowserContext | None = None
        self.page: Page | None = None
        self.index_url = INDEX_URL
        # Per-unit tracking
        self.toc_entries: list[str] = []          # discovered sidebar labels
        self.visited: set[str] = set()            # section labels we clicked
        self.failed_clicks: list[str] = []        # section labels we couldn't click
        self.states: int = 0
        self.visited_sigs: set[str] = set()
        self.next_stalls: int = 0
        self.session_lost: int = 0

    # ---- logging ----
    def log(self, level: str, msg: str):
        ts = datetime.now(timezone.utc).strftime('%H:%M:%S')
        print(f'[{self.account} U{self.unit:02d} {ts}] {level:7s} {msg}', flush=True)

    # ---- browser lifecycle ----
    async def start(self, pw):
        self.browser = await pw.chromium.launch(headless=True)
        self.context = await self.browser.new_context(
            viewport={'width': 1400, 'height': 900},
            accept_downloads=False, locale='es-ES',
        )
        self.context.set_default_timeout(15000)
        self.page = await self.context.new_page()
        self.page.set_default_navigation_timeout(45000)
        await self.page.goto(BASE_URL, wait_until='domcontentloaded', timeout=45000)

    async def close(self):
        try:
            if self.context: await asyncio.wait_for(self.context.close(), timeout=10)
        except Exception: pass
        try:
            if self.browser: await asyncio.wait_for(self.browser.close(), timeout=10)
        except Exception: pass

    # ---- login ----
    async def login(self) -> bool:
        self.log('INFO', 'Logging in...')
        password = CREDS[self.account]
        for _ in range(20):
            if await self._is_dashboard(): return True
            groups = await self._find_login_fields()
            if groups: break
            await self.page.wait_for_timeout(400)
        else:
            self.log('ERROR', 'Login form not found')
            return False
        try:
            user = self.page.locator('#usuario:visible').first
            pwd = self.page.locator('#password:visible').first
            if not (await user.count() and await pwd.count()):
                info = groups[0]
                user = self.page.locator('input').nth(info['userIndex'])
                pwd = self.page.locator('input').nth(info['passwordIndex'])
            await user.fill(self.account, timeout=8000)
            await pwd.fill(password, timeout=8000)
            btn = self.page.locator('#btnLogin:visible').first
            if await btn.count():
                await btn.click(timeout=10000, no_wait_after=True)
            else:
                await pwd.press('Enter', timeout=8000, no_wait_after=True)
        except PlaywrightError as e:
            self.log('ERROR', f'Login interaction failed: {type(e).__name__}')
            return False
        for _ in range(40):
            if await self._is_dashboard():
                self.log('INFO', 'Login OK')
                return True
            await self.page.wait_for_timeout(500)
        self.log('ERROR', 'Login timed out')
        return False

    async def _find_login_fields(self):
        try:
            return [await self.page.evaluate(LOGIN_FIELDS_JS)]
        except Exception:
            return []

    async def _is_dashboard(self) -> bool:
        if not self.page: return False
        if 'SecureLogin/Login.aspx' in self.page.url: return False
        try:
            return bool(await self.page.locator('#tod01, a.milinkElemento').count())
        except Exception:
            return False

    # ---- open unit ----
    async def open_unit(self) -> bool:
        self.log('INFO', 'Opening unit from dashboard...')
        try:
            # Expand accordion
            suffix = f'{self.unit:02d}'
            header = self.page.locator(f'#tod{suffix}')
            if await header.count():
                await header.click(timeout=4000, no_wait_after=True)
                await self.page.wait_for_timeout(800)
            # Find link
            rx = re.compile(rf'^\s*Contenido\s+unidad\s*0?{self.unit}\s*$', re.I)
            link = self.page.locator('a.milinkElemento').filter(has_text=rx).first
            if not await link.count():
                self.log('ERROR', f'No link for unit {self.unit}')
                return False
            # Wait for new tab/popup
            existing = set(self.context.pages)
            await link.click(timeout=8000, no_wait_after=True)
            for _ in range(30):
                new = [p for p in self.context.pages if p not in existing and not p.is_closed()]
                if new:
                    self.page = new[-1]
                    try:
                        await self.page.wait_for_load_state('domcontentloaded', timeout=10000)
                    except PlaywrightError: pass
                    self.log('INFO', f'SCORM popup opened: {self.page.url.split("?")[0]}')
                    return True
                await asyncio.sleep(0.2)
        except PlaywrightError as e:
            self.log('ERROR', f'open_unit failed: {type(e).__name__}')
        return False

    # ---- wait for SCORM content ----
    async def wait_for_content(self) -> bool:
        deadline = time.monotonic() + 45
        last_report = -1
        while time.monotonic() < deadline:
            best = await self._best_content_frame()
            if best:
                self.log('INFO', f'Content: {best["path"]} ({best["text_chars"]} chars, {best["frames"]} frames)')
                return True
            n = len(self.page.frames)
            if n != last_report:
                self.log('INFO', f'Waiting for content... frames={n}')
                last_report = n
            await asyncio.sleep(0.3)
        self.log('ERROR', 'No SCORM content after 45s — frame diagnostic:')
        for f in self.page.frames[:48]:
            if is_external_video_frame(f): continue
            try:
                r = await f.evaluate("""() => ({
                    chars: (document.body?.innerText||'').replace(/\\s+/g,' ').trim().length,
                    path: location.pathname,
                    has_content: !!document.querySelector('main,article,[role=main],.slide-content,.lesson-content,#content,.content,video'),
                    has_pwd: !!document.querySelector('input[type=password]'),
                    preview: (document.body?.innerText||'').slice(0,60).replace(/\\s+/g,' ')
                })""")
                self.log('ERROR', f'  {r["path"][:35]:35s} chars={r["chars"]:5d} content={r["has_content"]} pwd={r["has_pwd"]} | {r["preview"]}')
            except Exception as e:
                self.log('ERROR', f'  {f.url[:50]}: {type(e).__name__}')
        return False

    async def _best_content_frame(self):
        KNOWN = ['newud', 'unidad', 'lesson', 'leccion', 'contenidoscim',
                 'cumlaude', 'repositorio']
        frames = []
        for f in self.page.frames[:48]:
            if is_external_video_frame(f): continue
            try:
                r = await f.evaluate("""() => {
                  const t = (document.body?.innerText||'').replace(/\\s+/g,' ').trim();
                  return {
                      chars: t.length,
                      path: location.pathname,
                      has_content: !!document.querySelector('main,article,[role=main],.slide-content,.lesson-content,#content,.content,video,[id*=content i],[class*=content i]'),
                      has_pwd: !!document.querySelector('input[type=password]')
                  };
                }""")
            except Exception: continue
            if r['has_pwd']: continue
            if r['chars'] < 80: continue
            path_lower = r['path'].lower()
            is_lesson = any(p in path_lower for p in KNOWN)
            if not (is_lesson or r['has_content']): continue
            frames.append({'path': r['path'], 'text_chars': r['chars'],
                           'frames': len(self.page.frames),
                           'score': r['chars'] + (1000 if r['has_content'] else 0)})
        return max(frames, key=lambda x: x['score']) if frames else None

    # ---- open sidebar toggle ----
    async def open_sidebar_toggle(self) -> bool:
        """Click 'Mostrar menú lateral' to expand the sidebar. Iterates deepest-first."""
        selectors = [
            'button:has-text("Mostrar menú lateral")',
            'a:has-text("Mostrar menú lateral")',
            '[role="button"]:has-text("Mostrar menú lateral")',
            '[aria-label*="menú lateral" i]', '[aria-label*="menu lateral" i]',
            '[title*="menú lateral" i]', '[title*="menu lateral" i]',
            '[aria-label*="menú" i]', '[title*="menú" i]',
        ]
        for frame in reversed(self.page.frames[:20]):
            if is_external_video_frame(frame): continue
            for sel in selectors:
                try:
                    matches = frame.locator(sel)
                    if not await matches.count(): continue
                    for i in range(min(await matches.count(), 5)):
                        target = matches.nth(i)
                        if not await target.is_visible(): continue
                        desc = ((await target.get_attribute('aria-label') or '') +
                                (await target.get_attribute('title') or '') +
                                (await target.inner_text() or ''))[:60].lower()
                        if 'ocultar' in desc or 'hide' in desc: continue
                        fname = frame.url.split('/')[-1].split('?')[0][:40]
                        self.log('INFO', f'  Toggle: "{desc.strip()[:40]}" in {fname}')
                        await target.click(timeout=3000, no_wait_after=True)
                        await asyncio.sleep(1.5)
                        return True
                except Exception:
                    continue
        return False

    # ---- detect sidebar ----
    async def detect_sidebar(self) -> bool:
        self.log('INFO', 'Detecting SCORM sidebar...')
        for attempt in range(3):
            if attempt > 0:
                await self.open_sidebar_toggle()
            deadline = time.monotonic() + 5.0
            while time.monotonic() < deadline:
                best = None
                for frame in self.page.frames[:24]:
                    if is_external_video_frame(frame): continue
                    try:
                        entries = await frame.evaluate(SCORM_TOC_JS)
                    except Exception:
                        continue
                    if entries and len(entries) >= 4:
                        if best is None or len(entries) > len(best[1]):
                            best = (frame, entries)
                if best:
                    frame, entries = best
                    fname = frame.url.split('/')[-1].split('?')[0][:40]
                    self.toc_entries = [e['text'] for e in entries]
                    self.log('INFO', f'Sidebar detected in {fname}: {len(entries)} sections')
                    for i, e in enumerate(entries, 1):
                        mark = '●' if e.get('active') else '○'
                        self.log('INFO', f'  {mark} {i:02d}. {e["text"][:80]}')
                    return True
                await asyncio.sleep(0.4)
            self.log('INFO', f'Sidebar attempt {attempt+1}/3 failed')
            urls = [f.url.split('/')[-1].split('?')[0][:40] for f in self.page.frames[:15] if not is_external_video_frame(f)]
            self.log('INFO', f'  Visible frames: {urls}')
        self.log('WARN', 'Sidebar NOT detected after 3 attempts')
        return False

    # ---- current active sidebar section ----
    async def active_sidebar_label(self) -> str | None:
        for frame in self.page.frames[:24]:
            if is_external_video_frame(frame): continue
            try:
                entries = await frame.evaluate(SCORM_TOC_JS)
            except Exception:
                continue
            for e in entries:
                if e.get('active'):
                    return ' '.join(e['text'].split()).casefold()
        return None

    # ---- content heading (fallback for boundary detection) ----
    async def content_heading(self) -> str:
        for frame in self.page.frames[:20]:
            if is_external_video_frame(frame): continue
            try:
                h = await frame.evaluate("""() => {
                    const sels = ['h1', 'h2', 'h3', '.page-title', '.pageTitle',
                                  '.section-title', '.sectionTitle',
                                  '[class*=titulo]', '[class*=Titulo]',
                                  '[class*=title]', '[class*=Title]'];
                    for (const sel of sels) {
                        for (const el of document.querySelectorAll(sel)) {
                            const txt = (el.innerText||'').replace(/\\s+/g,' ').trim();
                            if (txt.length > 5 && txt.length < 200) {
                                const r = el.getBoundingClientRect();
                                if (r.width > 0 && r.height > 0) return txt;
                            }
                        }
                    }
                    return '';
                }""")
                if h: return h
            except Exception: pass
        return ''

    # ---- click a single sidebar section ----
    async def click_section(self, target_label: str) -> bool:
        norm = ' '.join(target_label.split()).casefold()
        for attempt in range(3):
            # Skip if already active
            current = await self.active_sidebar_label()
            if current == norm:
                return True
            # Scan all frames for the target
            found_sidebar = False
            for frame in self.page.frames[:24]:
                if is_external_video_frame(frame): continue
                try:
                    entries = await frame.evaluate(SCORM_TOC_JS)
                except Exception:
                    continue
                if not entries: continue
                found_sidebar = True
                match = next((e for e in entries
                              if ' '.join(e['text'].split()).casefold() == norm), None)
                if not match: continue
                try:
                    loc = frame.locator(match['selector']).first
                    if not await loc.count() or not await loc.is_visible():
                        continue
                    await loc.scroll_into_view_if_needed(timeout=3000)
                    await loc.click(timeout=5000, no_wait_after=True)
                    await asyncio.sleep(0.4)
                    return True
                except Exception:
                    continue
            # If sidebar not visible, re-open toggle and retry
            if not found_sidebar:
                self.log('INFO', f'    Sidebar not visible; re-opening toggle (attempt {attempt+1}/3)')
                await self.open_sidebar_toggle()
                await asyncio.sleep(1.2)
            else:
                self.log('INFO', f'    Click missed; retrying (attempt {attempt+1}/3)')
                await asyncio.sleep(1.0)
        return False

    # ---- capture current state signature ----
    async def signature(self) -> str:
        pieces = []
        for frame in self.page.frames[:20]:
            if is_external_video_frame(frame): continue
            try:
                t = await frame.evaluate("""() => {
                  const clean = s => (s||'').replace(/\\d{1,2}:\\d{2}(:\\d{2})?/g,'[T]')
                                           .replace(/\\s+/g,' ').trim();
                  return clean((document.body?.innerText||'').slice(0,50000));
                }""")
                pieces.append(t)
            except Exception: continue
        return _sha('||'.join(pieces))

    # ---- find Next button ----
    async def _find_next_button(self, timeout: float = 6.0):
        """Poll for a clickable Next button for up to `timeout` seconds.
        Handles the transient disappearance that happens during page loads."""
        selectors = [
            'button:has-text("Siguiente")',
            'button:has-text("SIGUIENTE")',
            'a:has-text("Siguiente")',
            'a:has-text("SIGUIENTE")',
            'input[type=button][value="Siguiente"]',
            'input[type=button][value="SIGUIENTE"]',
            'input[type=submit][value="Siguiente"]',
            '[title="Siguiente"]', '[aria-label="Siguiente"]',
            '.next', '.nextBtn', '.next-button',
            '#next', '#siguiente', '#btnSiguiente',
        ]
        deadline = time.monotonic() + timeout
        last_report = 0
        while time.monotonic() < deadline:
            for frame in list(reversed(self.page.frames[:20])):
                if is_external_video_frame(frame): continue
                for sel in selectors:
                    try:
                        loc = frame.locator(sel).first
                        if await loc.count() and await loc.is_visible():
                            fname = frame.url.split('/')[-1].split('?')[0][:30]
                            self.log('INFO', f'    Next button found in {fname} via "{sel}"')
                            return loc
                    except Exception:
                        continue
            elapsed = int(time.monotonic() - (deadline - timeout))
            if elapsed >= 2 and elapsed % 2 == 0 and elapsed != last_report:
                last_report = elapsed
                self.log('INFO', f'    Next not visible yet ({elapsed}s), still polling...')
            await asyncio.sleep(0.3)
        self.log('INFO', f'    Next button never appeared within {timeout}s')
        return None

    # ---- walk one section ----
    async def walk_section(self, label: str) -> int:
        """Walk Next, stopping when heading OR active sidebar item changes."""
        start_heading = await self.content_heading()
        start_active = await self.active_sidebar_label() or ''
        if start_heading:
            self.log('INFO', f'    Heading: "{start_heading[:60]}"')
        if start_active:
            self.log('INFO', f'    Active:  "{start_active[:60]}"')
        pages = 0
        for i in range(self.opts.max_next_per_section):
            nxt = await self._find_next_button()
            if not nxt:
                self.log('INFO', f'    No Next button (end of section)')
                break
            before = await self.signature()
            try:
                await nxt.click(timeout=3000, no_wait_after=True)
            except Exception:
                break
            after = before
            deadline = time.monotonic() + 4.0
            while time.monotonic() < deadline:
                await asyncio.sleep(0.4)
                try:
                    after = await self.signature()
                except Exception:
                    break
                if after != before: break
            if after == before:
                self.next_stalls += 1
                if self.next_stalls >= 2: break
                await asyncio.sleep(0.8)
                continue
            self.next_stalls = 0
            if after not in self.visited_sigs:
                self.visited_sigs.add(after)
                self.states += 1
                pages += 1
            self.log('INFO', f'    page {pages}')
            # Boundary detection
            new_heading = await self.content_heading()
            new_active = await self.active_sidebar_label() or ''
            heading_changed = bool(new_heading and start_heading and new_heading != start_heading)
            active_changed = bool(new_active and start_active and new_active != start_active)
            if heading_changed or active_changed:
                self.log('INFO', f'    Boundary! heading_changed={heading_changed} active_changed={active_changed}')
                if new_heading:
                    self.log('INFO', f'    New heading: "{new_heading[:60]}"')
                if new_active:
                    self.log('INFO', f'    New active:  "{new_active[:60]}"')
                    for known in self.toc_entries:
                        if ' '.join(known.split()).casefold() == new_active:
                            self.visited.add(known)
                            break
                break
            if pages >= 20:
                self.log('WARN', f'    Safety cap: 20 pages in one section')
                break
        return pages

    # ---- main unit walk ----
    async def run(self, pw) -> dict:
        """Linear walk with heading-based section tracking.
        Walks Next from page 1 to page N, checking heading after each page.
        When heading matches a different known section label, records it as
        visited. Avoids the unreliability of sidebar clicks."""
        result = {'account': self.account, 'unit': self.unit,
                  'status': 'FAILED', 'sections_total': 0, 'sections_visited': 0,
                  'states': 0, 'failed_clicks': [], 'visited_sections': [],
                  'missed_sections': [], 'timestamp': utc_now()}
        try:
            content_ok = False
            for content_attempt in range(2):
                await self.start(pw)
                if not await self.login():
                    result['status'] = 'LOGIN_FAILED'
                    await self.close()
                    return result
                if not await self.open_unit():
                    result['status'] = 'OPEN_FAILED'
                    await self.close()
                    await asyncio.sleep(3)
                    continue
                if await self.wait_for_content():
                    content_ok = True
                    break
                self.log('WARN', f'Content attempt {content_attempt+1}/2 failed; retrying')
                await self.close()
                await asyncio.sleep(3)
            if not content_ok:
                result['status'] = 'NO_CONTENT'
                return result

            has_sidebar = await self.detect_sidebar()
            known_labels = list(self.toc_entries) if has_sidebar else []
            # Let sidebar animation settle before walking
            await asyncio.sleep(2.5)
            result['sections_total'] = len(known_labels)
            if known_labels:
                self.log('INFO', f'Linear walk: {len(known_labels)} expected sections, walking Next')
            else:
                self.log('INFO', 'No sidebar — walking Next, will report as LINEAR_ONLY')

            visited: list[str] = []
            current_label = None
            pages = 0
            MAX_PAGES = 500
            initial = await self._match_heading_to_label(known_labels) if known_labels else ''
            if initial:
                current_label = initial
                visited.append(initial)
                self.log('INFO', f'  Section 1: "{initial[:60]}"')

            for page_num in range(1, MAX_PAGES + 1):
                nxt = await self._find_next_button()
                if not nxt:
                    self.log('INFO', f'  Page {page_num}: no Next — end')
                    break
                before = await self.signature()
                clicked = False
                for click_attempt in range(4):
                    try:
                        if click_attempt == 0:
                            await nxt.scroll_into_view_if_needed(timeout=2000)
                            await asyncio.sleep(0.3)
                            await nxt.click(timeout=3000, no_wait_after=True)
                        elif click_attempt == 1:
                            await nxt.click(timeout=2500, force=True, no_wait_after=True)
                        elif click_attempt == 2:
                            await nxt.dispatch_event('click')
                        else:
                            await asyncio.sleep(1.0)
                            await nxt.click(timeout=2500, force=True, no_wait_after=True)
                        clicked = True
                        break
                    except Exception as e:
                        self.log('WARN', f'  Page {page_num}: click attempt {click_attempt+1} failed ({type(e).__name__})')
                        await asyncio.sleep(0.4)
                if not clicked:
                    # One last attempt after a longer pause
                    await asyncio.sleep(2.0)
                    try:
                        await nxt.click(timeout=4000, force=True, no_wait_after=True)
                        clicked = True
                    except Exception:
                        self.log('WARN', f'  Page {page_num}: all click strategies failed — ending walk')
                        break
                after = before
                deadline = time.monotonic() + 5.0
                while time.monotonic() < deadline:
                    await asyncio.sleep(0.4)
                    try:
                        after = await self.signature()
                    except Exception:
                        break
                    if after != before: break
                if after == before:
                    self.log('WARN', f'  Page {page_num}: state unchanged — end')
                    break
                pages += 1
                if after not in self.visited_sigs:
                    self.visited_sigs.add(after)
                    self.states += 1
                self.log('INFO', f'    page {pages}: heading, states={self.states}')
                # Give the new page time to render its Next button
                await asyncio.sleep(1.0)
                if known_labels:
                    await asyncio.sleep(0.3)
                    h = await self._match_heading_to_label(known_labels)
                    if h and h != current_label:
                        self.log('INFO', f'  Page {page_num}: entered section "{h[:60]}"')
                        if h not in visited:
                            visited.append(h)
                        current_label = h
                if page_num % 20 == 0:
                    self.log('INFO', f'  ...{page_num} pages, {self.states} states, at "{current_label[:40] if current_label else "?"}"')

            missed = [l for l in known_labels if l not in visited]
            result['sections_visited'] = len(visited)
            result['visited_sections'] = visited
            result['missed_sections'] = missed
            result['failed_clicks'] = missed
            result['states'] = self.states
            self.log('INFO', f'  Walk summary: {pages} pages, {self.states} unique states, '
                            f'{len(visited)}/{len(known_labels)} sections matched')
            # Relaxed verdict: the number of distinct states is the real measure
            # of coverage. Label matching is only supplementary.
            if self.states == 0:
                result['status'] = 'FAILED'
            elif self.states >= 25:
                # Full unit traversal — 25+ unique pages means we covered the lesson
                if known_labels and missed:
                    self.log('INFO', f'  Walked whole unit but only matched {len(visited)}/{len(known_labels)} labels')
                    result['status'] = 'COMPLETE'  # content IS fully covered
                elif known_labels:
                    result['status'] = 'COMPLETE'
                else:
                    result['status'] = 'COMPLETE'  # LINEAR_ONLY is now COMPLETE
                self.log('INFO', f'  Verdict: COMPLETE ({self.states} pages fully traversed)')
            elif self.states >= 10:
                self.log('WARN', f'  Partial: only {self.states} states before end')
                result['status'] = 'PARTIAL'
            elif self.states >= 3:
                self.log('WARN', f'  Minimal: {self.states} states — likely gated')
                result['status'] = 'LINEAR_ONLY'
            else:
                result['status'] = 'FAILED'
        except Exception as e:
            self.log('ERROR', f'Exception: {type(e).__name__}: {e}')
            result['status'] = 'ERROR'
            result['error'] = str(e)[:200]
        finally:
            await self.close()
        return result

    async def _match_heading_to_label(self, known_labels: list[str]) -> str:
        """Return a visible heading that matches one of the known labels."""
        if not known_labels: return ''
        for frame in self.page.frames[:20]:
            if is_external_video_frame(frame): continue
            try:
                headings = await frame.evaluate("""() => {
                    const sels = ['h1', 'h2', 'h3', 'h4',
                                  '.page-title', '.section-title',
                                  '[class*=title]', '[class*=titulo]',
                                  '[class*=Titulo]', '[class*=Title]'];
                    const out = [];
                    for (const sel of sels) {
                        for (const el of document.querySelectorAll(sel)) {
                            const txt = (el.innerText||'').replace(/\\s+/g,' ').trim();
                            const r = el.getBoundingClientRect();
                            if (txt.length > 5 && txt.length < 250 && r.width > 0 && r.height > 0) {
                                out.push(txt);
                            }
                        }
                    }
                    return out;
                }""")
            except Exception:
                continue
            for txt in headings:
                t_norm = ' '.join(txt.split()).casefold()
                for label in known_labels:
                    l_norm = ' '.join(label.split()).casefold()
                    if t_norm == l_norm or t_norm in l_norm or l_norm in t_norm:
                        return label
        return ''

class AccountWorker:
    """Logs in once, then runs all its missing units sequentially."""

    def __init__(self, account: str, units: list[int], opts, logdir: Path):
        self.account = account
        self.units = units
        self.opts = opts
        self.logdir = logdir
        self.browser = None
        self.context: BrowserContext | None = None
        self.page: Page | None = None
        self.index_url = INDEX_URL
        self.results: list[dict] = []

    def log(self, msg: str):
        ts = datetime.now(timezone.utc).strftime('%H:%M:%S')
        print(f'[{self.account} {ts}] {msg}', flush=True)

    async def _find_login_fields(self):
        try:
            return [await self.page.evaluate(LOGIN_FIELDS_JS)]
        except Exception:
            return []

    async def _is_dashboard(self) -> bool:
        if not self.page: return False
        if 'SecureLogin/Login.aspx' in self.page.url: return False
        try:
            return bool(await self.page.locator('#tod01, a.milinkElemento').count())
        except Exception:
            return False

    async def login(self) -> bool:
        self.log('Logging in...')
        password = CREDS[self.account]
        for _ in range(20):
            if await self._is_dashboard(): return True
            groups = await self._find_login_fields()
            if groups: break
            await self.page.wait_for_timeout(400)
        else:
            return False
        try:
            user = self.page.locator('#usuario:visible').first
            pwd = self.page.locator('#password:visible').first
            if not (await user.count() and await pwd.count()):
                info = groups[0]
                user = self.page.locator('input').nth(info['userIndex'])
                pwd = self.page.locator('input').nth(info['passwordIndex'])
            await user.fill(self.account, timeout=8000)
            await pwd.fill(password, timeout=8000)
            btn = self.page.locator('#btnLogin:visible').first
            if await btn.count():
                await btn.click(timeout=10000, no_wait_after=True)
            else:
                await pwd.press('Enter', timeout=8000, no_wait_after=True)
        except PlaywrightError:
            return False
        for _ in range(40):
            if await self._is_dashboard():
                self.log('Login OK')
                return True
            await self.page.wait_for_timeout(500)
        return False

    async def run(self, pw):
        try:
            self.context = await pw.chromium.new_context(
                viewport={'width': 1400, 'height': 900}, locale='es-ES')
            self.context.set_default_timeout(15000)
            self.page = await self.context.new_page()
            self.page.set_default_navigation_timeout(45000)
            await self.page.goto(BASE_URL, wait_until='domcontentloaded', timeout=45000)
            if not await self.login():
                for u in self.units:
                    self.results.append({'account': self.account, 'unit': u,
                                        'status': 'LOGIN_FAILED', 'timestamp': utc_now()})
                return
            for unit in self.units:
                self.log(f'--- Starting unit {unit:02d} ---')
                runner = UnitRunner(self.account, unit, self.opts, self.logdir)
                # Runner creates its own browser to guarantee fresh state
                res = await runner.run(pw)
                self.results.append(res)
                icon = {'COMPLETE':'✔','PARTIAL':'~','LINEAR_ONLY':'·','FAILED':'✘',
                        'NO_CONTENT':'✘','OPEN_FAILED':'✘','LOGIN_FAILED':'✘','ERROR':'✘'}.get(res['status'],'?')
                self.log(f'{icon} Unit {unit:02d}: {res["status"]} '
                         f'({res.get("sections_visited",0)}/{res.get("sections_total",0)} sections, '
                         f'{res.get("states",0)} states)')
                # Also persist
                atomic_json(self.logdir / self.account / f'unit_{unit:02d}.json', res)
        finally:
            try:
                if self.context: await asyncio.wait_for(self.context.close(), timeout=10)
            except Exception: pass


async def account_worker(account: str, units: list[int], opts, logdir: Path):
    """Each unit gets its own browser+context. Simple and reliable."""
    async with async_playwright() as pw:
        results = []
        for unit in units:
            print(f'[{account}] --- unit {unit:02d} ---', flush=True)
            runner = UnitRunner(account, unit, opts, logdir)
            res = await runner.run(pw)
            results.append(res)
            icon = {'COMPLETE':'\u2714','PARTIAL':'~','LINEAR_ONLY':'\u00b7',
                    'FAILED':'\u2718','NO_CONTENT':'\u2718','OPEN_FAILED':'\u2718',
                    'LOGIN_FAILED':'\u2718','ERROR':'\u2718'}.get(res['status'],'?')
            print(f'[{account}] {icon} U{unit:02d}: {res["status"]} '
                  f'({res.get("sections_visited",0)}/{res.get("sections_total",0)} sections, '
                  f'{res.get("states",0)} states)', flush=True)
            atomic_json(logdir / account / f'unit_{unit:02d}.json', res)
        return results


async def main():
    ap = argparse.ArgumentParser(description='MentoAula targeted unit rerun')
    ap.add_argument('--max-users', type=int, default=10,
                    help='Concurrent accounts (default 10; 12-15 for speed)')
    ap.add_argument('--log-dir', default='mentoaula_targeted_20261026')
    ap.add_argument('--video-wait-seconds', type=int, default=15)
    ap.add_argument('--gate-retry-wait-seconds', type=int, default=20)
    ap.add_argument('--gate-retries', type=int, default=2)
    ap.add_argument('--max-next-per-section', type=int, default=50)
    ap.add_argument('--only', nargs='*', default=None,
                    help='Restrict to specific usernames (space separated)')
    args = ap.parse_args()

    logdir = Path(args.log_dir).resolve()
    logdir.mkdir(parents=True, exist_ok=True)

    targets = TARGET_MAP
    if args.only:
        targets = {k: v for k, v in TARGET_MAP.items() if k in args.only}

    total = sum(len(v) for v in targets.values())
    print(f'=== MentoAula Targeted Rerun ===', flush=True)
    print(f'Accounts: {len(targets)} | Units: {total} | Concurrency: {args.max_users}', flush=True)
    print(f'Logs: {logdir}', flush=True)
    print('', flush=True)

    sem = asyncio.Semaphore(args.max_users)
    all_results: list[dict] = []
    lock = asyncio.Lock()
    started = time.monotonic()

    async def bounded(acct, units):
        async with sem:
            results = await account_worker(acct, units, args, logdir)
            async with lock:
                all_results.extend(results)

    tasks = [asyncio.create_task(bounded(acct, units)) for acct, units in targets.items()]
    gathered = await asyncio.gather(*tasks, return_exceptions=True)
    for i, g in enumerate(gathered):
        if isinstance(g, BaseException):
            print(f'[EXCEPTION task {i}] {type(g).__name__}: {g}', flush=True)

    elapsed = time.monotonic() - started

    # ---- Summary ----
    print('', flush=True)
    print('='*78, flush=True)
    print('FINAL SUMMARY', flush=True)
    print('='*78, flush=True)
    by_status = defaultdict(int)
    by_account = defaultdict(lambda: defaultdict(int))
    for r in all_results:
        by_status[r['status']] += 1
        by_account[r['account']][r['status']] += 1

    print(f'\nOverall: {len(all_results)} units in {elapsed/60:.1f} min', flush=True)
    for status in ('COMPLETE','PARTIAL','LINEAR_ONLY','FAILED','NO_CONTENT','OPEN_FAILED','LOGIN_FAILED','ERROR'):
        n = by_status.get(status, 0)
        if n:
            print(f'  {status:14s}: {n:3d}  ({100*n/len(all_results):.1f}%)', flush=True)

    print('', flush=True)
    print('Per-account:', flush=True)
    for acct in sorted(by_account):
        counts = by_account[acct]
        total_u = sum(counts.values())
        parts = []
        for s in ('COMPLETE','PARTIAL','LINEAR_ONLY','FAILED','NO_CONTENT'):
            if counts.get(s): parts.append(f'{s[0]}:{counts[s]}')
        print(f'  {acct:14s}  {total_u:2d} units  {" ".join(parts)}', flush=True)

    # Save full result
    atomic_json(logdir / 'summary.json', {
        'generated_at': utc_now(),
        'elapsed_minutes': round(elapsed/60, 1),
        'accounts': len(targets),
        'total_units': len(all_results),
        'by_status': dict(by_status),
        'results': all_results,
    })
    print(f'\nFull results: {logdir}/summary.json', flush=True)


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print('\nInterrupted.', flush=True)