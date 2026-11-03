#!/usr/bin/env python3
"""V11.1 standalone authorised MentoAula multi-account navigation load test.

V9: Wait for video study-time requirements before attempting SCORM Next.
Detect and retry legitimate minimum-study-time gates without treating
a transient warning as a new lesson page.

Designed for sites with ASP.NET forms, popup lessons, SCORM/iframe content,
Next/Previous controls and reveal-style learning interactions.

The script does NOT answer or submit tests, bypass access controls, or crawl
unrelated parts of the account. Extracted content is for authorized local use.
"""
from __future__ import annotations

import argparse
import csv
import zipfile
import asyncio
import getpass
import hashlib
import json
import logging
import os
import re
import shutil
import sys
import unicodedata
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse, parse_qsl, urlencode, urlunparse

from playwright.async_api import (
    BrowserContext,
    Error as PlaywrightError,
    Frame,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    async_playwright,
)

BASE_URL = 'https://campus.mentoaula.com/'
INDEX_URL = 'https://campus.mentoaula.com/IndexIF.aspx'
DOWNLOAD_EXTENSIONS = {
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.zip', '.rar', '.7z', '.txt', '.csv', '.rtf', '.odt', '.ods',
    '.mp3', '.mp4', '.webm', '.wav', '.vtt', '.srt', '.epub',
}
EXCLUDED_ACTION_RE = re.compile(
    r'\b(?:examen|exam|evaluaci[oó]n|cuestionario|quiz|test|'
    r'enviar|submit|entregar|calificar|comprobar|corregir|'
    r'finalizar|terminar|salir|logout|cerrar sesi[oó]n|'
    r'comprar|pagar|delete|borrar|eliminar|reiniciar)\b', re.I
)
NEXT_RE = re.compile(r'(siguiente|next|continuar|avanzar|adelante|forward|stepnext|gonext|slide-next)', re.I)
REVEAL_RE = re.compile(
    r'(ver m[aá]s|mostrar|desplegar|ampliar|saber m[aá]s|'
    r'descubrir|informaci[oó]n|leer m[aá]s|abrir|'
    r'expand|reveal|more info|learn more|hotspot)', re.I
)
MENU_RE = re.compile(r'(tema|apartado|lecci[oó]n|cap[ií]tulo|secci[oó]n|p[aá]gina\s*\d+|m[oó]dulo|unit\s*\d+)', re.I)
STUDY_GATE_RE = re.compile(
    r'(?:tiempo\s+m[ií]nimo\s+de\s+estudio|tiempo\s+m[ií]nimo\s+de\s+lectura|'
    r'es\s+necesario\s+un\s+tiempo|tiempo\s+de\s+estudio\s+para\s+poder\s+avanzar|'
    r'antes\s+de\s+(?:poder\s+)?(?:avanzar|continuar).*tiempo|'
    r'minimum\s+(?:study|reading)\s+time|time\s+required\s+before\s+(?:continuing|proceeding))', re.I
)

def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec='seconds')

def safe_name(text: str, max_length: int = 90) -> str:
    text = unicodedata.normalize('NFKD', str(text)).encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^a-zA-Z0-9._-]+', '_', text).strip('._-')
    return (text[:max_length] or 'file')

def json_write(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding='utf-8')

def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8', errors='replace')

def redact_url(url: str) -> str:
    try:
        parts = urlparse(url)
        if not parts.query:
            return url
        safe_pairs = [(k, '[redacted]' if re.search(
            r'(token|key|secret|auth|session|password|pass|sig|ticket|code)', k, re.I
        ) else v) for k, v in parse_qsl(parts.query, keep_blank_values=True)]
        return urlunparse(parts._replace(query=urlencode(safe_pairs)))
    except Exception:
        return url

def _sha(value: str | bytes) -> str:
    raw = value.encode('utf-8', errors='replace') if isinstance(value, str) else value
    return hashlib.sha256(raw).hexdigest()[:16]

def is_external_video_frame(frame: Frame) -> bool:
    host = (urlparse(frame.url).hostname or '').lower()
    return any(host == domain or host.endswith('.' + domain) for domain in (
        'youtube.com','youtube-nocookie.com','youtu.be','googlevideo.com',
        'vimeo.com','player.vimeo.com','dailymotion.com'))

def parse_units(spec: str) -> list[int]:
    values: set[int] = set()
    for part in spec.split(','):
        part = part.strip()
        if '-' in part:
            a, b = part.split('-', 1)
            values.update(range(int(a), int(b) + 1))
        elif part:
            values.add(int(part))
    if not values or not all(1 <= n <= 13 for n in values):
        raise ValueError('Units must be between 1 and 13.')
    return sorted(values)

INSPECT_JS = r"""() => {
  const visible = el => {
    try {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' &&
        +cs.opacity !== 0 && r.width > 1 && r.height > 1;
    } catch (_) { return false; }
  };
  const norm = t => (t || '').replace(/\s+/g, ' ').trim();
  const take = (arr, max) => Array.from(arr).slice(0, max);
  return {
    title: document.title || '', url: location.href, lang: document.documentElement?.lang || '',
    text: (document.body?.innerText || '').slice(0, 1400000),
    fontFamily: getComputedStyle(document.body || document.documentElement).fontFamily,
    fontSize: getComputedStyle(document.body || document.documentElement).fontSize,
    stylesheets: Array.from(document.styleSheets||[]).slice(0,150).map(f=>({href:f.href||'',disabled:f.disabled})),
    loadedFontFaces: Array.from(document.fonts || []).slice(0,100).map(f => ({
      family:f.family, style:f.style, weight:f.weight, status:f.status
    })),
    headings: take(document.querySelectorAll('h1,h2,h3,h4,h5,h6'), 200).filter(visible).map(e => ({tag:e.tagName, text:norm(e.innerText)})),
    images: take(document.images, 1500).map(e => ({alt:e.alt || '', title:e.title || '', src:e.currentSrc || e.src || '', width:e.naturalWidth || 0, height:e.naturalHeight || 0})),
    links: take(document.querySelectorAll('a[href]'), 3000).map(e => ({text:norm(e.innerText || e.title || e.getAttribute('aria-label')), href:e.href, visible: visible(e)})),
    controls: take(document.querySelectorAll('button,input[type=button],input[type=submit],summary,[role=button],[role=tab]'), 1200).filter(visible).map(e => ({tag:e.tagName, text:norm(e.innerText || e.value || ''), title:e.title || '', ariaLabel:e.getAttribute('aria-label') || '', id:e.id || '', className:String(e.className || '').slice(0,200)})),
    video: take(document.querySelectorAll('video,audio,source'), 200).map(e => ({src:e.currentSrc || e.src || '', type:e.getAttribute('type') || ''})),
    media: take(document.querySelectorAll('video,audio,source,track,iframe[src],a[href], [data-video], [data-src]'), 2500).map(e => {
        const tag=e.tagName.toLowerCase(), url=e.currentSrc || e.src || e.href || e.getAttribute('data-video') || e.getAttribute('data-src') || '';
        const relevant = ['video','audio','source','track'].includes(tag) || /youtu\.?be|vimeo|\.(mp4|webm|mp3|m3u8|vtt|srt)(?:\?|#|$)/i.test(url) || (tag==='iframe' && /video|media|reproductor|player/i.test(url));
        return relevant ? {tag,url, title:e.title || e.getAttribute('aria-label') || '', kind:e.getAttribute('kind') || '', srclang:e.getAttribute('srclang') || '', label:e.getAttribute('label') || '', poster:e.poster || '', duration: Number.isFinite(e.duration) ? e.duration : null, width:e.videoWidth || null, height:e.videoHeight || null, text:norm(e.innerText).slice(0,250)} : null;
      }).filter(Boolean),
    visibleDetails: document.querySelectorAll('details[open]').length,
  };
}"""

CONTROLS_JS = r"""(mode) => {
  function pathFor(el) {
    const parts = [];
    for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
      if (node.id && !/[\s"'\\]/.test(node.id)) { parts.unshift('#' + CSS.escape(node.id)); break; }
      let i = 1;
      for (let prev = node.previousElementSibling; prev; prev = prev.previousElementSibling)
        if (prev.tagName === node.tagName) i++;
      parts.unshift(node.tagName.toLowerCase() + ':nth-of-type(' + i + ')');
      if (parts.length >= 12) break;
    }
    return parts.join(' > ');
  }
  const elements = document.querySelectorAll('a,button,input[type=button],input[type=image],input[type=submit],summary,[role=button],[role=tab],[aria-label],[title],.next,.nextBtn,.next-button,.hotspot,.accordion-header,[onclick]');
  const out = [];
  for (const el of elements) {
    if (out.length >= 1000) break;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0 || r.width < 3 || r.height < 3 || el.disabled || el.getAttribute('aria-disabled') === 'true') continue;
    const txt = [el.innerText, el.value, el.title, el.getAttribute('aria-label'), el.getAttribute('alt')].filter(Boolean).join(' ').replace(/\s+/g,' ').trim().slice(0,200);
    const hints = [el.id, el.getAttribute('class'), el.getAttribute('rel'), el.getAttribute('data-action'), el.getAttribute('onclick')].filter(Boolean).join(' ').slice(0,250);
    const nestedIconHints = Array.from(el.querySelectorAll('i,svg,img')).slice(0,5).map(x => [x.getAttribute('class'), x.getAttribute('aria-label'), x.getAttribute('alt')].filter(Boolean).join(' ')).join(' ');
    const name = (txt + ' ' + hints + ' ' + nestedIconHints).trim();
    if (/examen|exam|evaluaci[oó]n|cuestionario|quiz|test|enviar|submit|entregar|calificar|comprobar|corregir|finalizar|terminar|salir|logout|cerrar sesi[oó]n|comprar|pagar|delete|borrar|eliminar|reiniciar/i.test(txt)) continue;
    if (/contenido\s+unidad\s*\d+|siguiente\s+unidad|next\s+unit/i.test(txt)) continue;
    let ok=false, score=0;
    if (mode==='next') {
      ok=/siguiente|next|continuar|avanzar|adelante|forward|stepnext|gonext|slide-next|fa-angle-right|fa-chevron-right|arrow-right|chevron-forward|swiper-button-next|slick-next/i.test(name) || /^(>|›|»|→|⟶|❯)$/i.test(txt);
      if (/\b(next|siguiente)\b/i.test(txt)) score += 20;
      if (/next|siguiente/i.test(hints)) score += 14;
      if (/continuar|avanzar/i.test(txt)) score += 8;
      if (/^(>|›|»|→|⟶|❯)$/.test(txt)) score += 2;
      if (r.top > innerHeight * 0.69) score += 17;
      if (r.left < innerWidth * 0.20 && r.top < innerHeight * 0.70) score -= 20;
      if (el.closest('nav,header,footer')) score -= 3;
    } else if (mode==='reveal') {
      ok=/ver m[aá]s|mostrar|desplegar|ampliar|saber m[aá]s|descubrir|informaci[oó]n|leer m[aá]s|abrir|expand|reveal|more info|learn more|hotspot/i.test(name) || el.getAttribute('role') === 'tab' || el.tagName.toLowerCase() === 'summary' || el.hasAttribute('aria-expanded');
      if (/contenido\s+unidad|siguiente|next|anterior|prev/i.test(txt)) ok=false;
      if (el.hasAttribute('aria-expanded') && el.getAttribute('aria-expanded') !== 'false') ok=false;
      if (el.tagName.toLowerCase() === 'summary' && el.closest('details')?.open) ok=false;
      if (el.getAttribute('role') === 'tab') score += 10;
      if (el.tagName.toLowerCase() === 'summary') score += 10;
    } else if (mode==='menu') {
      ok=/tema|apartado|lecci[oó]n|cap[ií]tulo|secci[oó]n|p[aá]gina\s*\d+|m[oó]dulo/i.test(txt) || (el.getAttribute('role') === 'tab' && !!txt);
      if (/unidad\s*\d+/i.test(txt)) ok=false;
    }
    if (!ok) continue;
    if (el.closest('form') && /respuesta|answer|quiz|examen|evaluaci[oó]n/i.test(name)) continue;
    out.push({selector:pathFor(el), text:txt, hints:hints.slice(0,120), score, tag:el.tagName});
  }
  return out.sort((a,b)=>b.score-a.score).slice(0,90);
}"""

SCORM_TOC_JS = r"""() => {
  function pathFor(el) {
    const parts=[];
    for(let n=el;n&&n.nodeType===1;n=n.parentElement) {
      if(n.id && !/[\\s\"'\\\\]/.test(n.id)) {parts.unshift('#'+CSS.escape(n.id));break;}
      let i=1;for(let p=n.previousElementSibling;p;p=p.previousElementSibling)
        if(p.tagName===n.tagName)i++;
      parts.unshift(n.tagName.toLowerCase()+':nth-of-type('+i+')');
      if(parts.length>=12)break;
    }
    return parts.join(' > ');
  }
  const els = document.querySelectorAll('a,button,[role="menuitem"],[role="treeitem"],[role="tab"],li,[onclick],[tabindex],.menu-item,.nav-item,.list-group-item');
  const out=[], dedup=new Set();
  const containers=Array.from(document.querySelectorAll('aside,nav,[class*="sidebar" i],[id*="sidebar" i],[class*="menu" i],[id*="menu" i],[class*="indice" i],[id*="indice" i],[class*="index" i],[id*="index" i],[class*="toc" i],[id*="toc" i],[class*="panel" i],[id*="panel" i]'));
  const likely=containers.map(el=>({el,r:el.getBoundingClientRect(),items:el.querySelectorAll('a,li,button,[role="menuitem"]').length,txt:(el.innerText||'').toLowerCase()}))
    .filter(x=>x.r.left<200 && x.r.width>140 && x.r.width<innerWidth*.72 && x.r.height>150 && x.items>=4)
    .sort((a,b)=> (/(unidad|resumen|introducci|objetivos)/.test(b.txt)?100:0)+b.items - (/(unidad|resumen|introducci|objetivos)/.test(a.txt)?100:0)-a.items);
  const panel=likely.length ? likely[0].el : null;
  for(const el of els) {
    if(panel && !panel.contains(el))continue;
    const r=el.getBoundingClientRect(), cs=getComputedStyle(el);
    if(r.width<15 || r.height<10 || cs.display==='none'||cs.visibility==='hidden'|| +cs.opacity===0 || r.left>Math.min(innerWidth*.52,800) || r.right<0 || !Number.isFinite(r.top))continue;
    if(!panel && r.top<40)continue;
    if(!panel && r.right>Math.min(innerWidth*.72,700))continue;
    const txt=(el.innerText || el.textContent || el.title || '').replace(/\s+/g,' ').trim();
    if(txt.length<3 || txt.length>150)continue;
    if(/^(RECURSOS|Test|Ver v[ií]deos|Unidad\s*\d+|Índice|Indice|Anterior|Siguiente|cerrar|volver|inicio)$/i.test(txt))continue;
    if(/cerrar sesi[oó]n|salir|logout|inicio de sesi[oó]n|contenido unidad/i.test(txt))continue;
    if(/^[\d\s.,:]+$/.test(txt))continue;
    const actionable=el.matches('a,button,[role="menuitem"],[role="treeitem"],[role="tab"],[onclick],[tabindex]') || cs.cursor==='pointer' || el.matches('li,.menu-item,.nav-item,.list-group-item');
    if(!actionable)continue;
    const child=el.querySelector('a,button,[role="menuitem"],[role="treeitem"],[role="tab"],[onclick]');
    if(child && child.getBoundingClientRect().width>2)continue;
    const href=el.getAttribute('href')||'';
    if(/^https?:/i.test(href)&&!href.includes(location.hostname))continue;
    const key=txt.toLocaleLowerCase()+'_'+Math.round(r.top/7);
    if(dedup.has(key))continue;
    dedup.add(key);
    const ctx=(el.parentElement?.className||'')+' '+(el.parentElement?.parentElement?.className||'');
    const active=/(active|current|selected|actual|highlight)/i.test(String(el.className)+' '+ctx) || ['page','step','true'].includes(el.getAttribute('aria-current')) || el.getAttribute('aria-selected')==='true';
    out.push({selector:pathFor(el), text:txt, active, top:Math.round(r.top), left:Math.round(r.left), href});
  }
  return out.length>=2 ? out.slice(0,150) : [];
}"""

LOGIN_SUBMIT_SELECTOR = 'button, input[type="submit"], input[type="button"], input[type="image"], a, [role="button"]'

LOGIN_FIELDS_JS = r"""() => {
  const all = Array.from(document.querySelectorAll('input'));
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const vis = e => {const r=e.getBoundingClientRect(),c=getComputedStyle(e); return r.width>0 && r.height>0 && c.visibility!=='hidden' && c.display!=='none';};
  const fieldInfo = (el,i) => { const f=el.closest('form'); const lab=el.labels ? Array.from(el.labels).map(x=>x.innerText||'').join(' ') : ''; return {el,i,form:f, hint:norm([el.id,el.name,el.placeholder,el.getAttribute('aria-label'),el.autocomplete,lab].join(' '))}; };
  const pass=all.map(fieldInfo).filter(x=>x.el.type==='password' && vis(x.el) && !x.el.disabled);
  const usernames=all.map(fieldInfo).filter(x=>['text','email','tel',''].includes(x.el.type) && vis(x.el) && !x.el.disabled && !x.el.readOnly);
  const results=[];
  for (const p of pass) for (const u of usernames) {
    const same = !!p.form && p.form===u.form;
    const loginHint = /(usuario|user|login|dni|nif|correo|email|account|identificacion|documento)/.test(u.hint);
    const otherHint = /(reset|forgot|recuper|restable|contrasena|password|repetir|confirmar|newpass|nueva)/.test(u.hint);
    let score = 25 + (same ? 70 : 0) + (loginHint?55:0) - (otherHint?95:0);
    if (/username/.test(u.el.autocomplete||'')) score+=45;
    if (/current-password/.test(p.el.autocomplete||'')) score+=30;
    if (/reset|forgot|recuper|restable/.test(norm([p.form?.id,p.form?.className].join(' ')))) score-=110;
    if (u.el.type==='email' && !loginHint) score-=30;
    if (!loginHint && u.el.type==='text') score+=5;
    if (u.i>p.i) score-=22;
    score -= Math.min(30,Math.abs(p.i-u.i)*2);
    results.push({userIndex:u.i,passwordIndex:p.i,score, userId:u.el.id||'',userName:u.el.name||'', passwordId:p.el.id||'',passwordName:p.el.name||''});
  }
  return results.sort((a,b)=>b.score-a.score).slice(0,10);
}"""

LOGIN_BUTTONS_JS = r"""(passwordIndex) => {
  const inputs=Array.from(document.querySelectorAll('input'));
  const password=inputs[passwordIndex];
  const form=password?.closest('form');
  const elements=Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"], input[type="image"], a, [role="button"]'));
  const norm=s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const vis=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e); return r.width>0 && r.height>0 && c.display!=='none' && c.visibility!=='hidden' && !e.disabled;};
  return elements.map((e,index)=>{
    const txt=norm([e.innerText,e.textContent,e.getAttribute('aria-label'),e.title,e.id,e.name,e.value,e.className,e.getAttribute('alt')].join(' ').slice(0,400));
    const same=!!form && e.closest('form')===form;
    const type=(e.type||'').toLowerCase();
    let score=(same?42:0) + (type==='submit'?25:0) + (type==='image'?18:0);
    if (/(acced|entrar|iniciar|login|log-in|sign.?in|ingresar|conectar|continuar|identificar)/.test(txt)) score+=105;
    if (/(olvid|forgot|restable|recuper|contrasena|password|reset|cancel|registr|volver|atras|salir|idioma|cerrar|menu)/.test(txt)) score-=190;
    if (type==='button' && !same) score-=20;
    if (e.tagName.toLowerCase()==='a' && !/(acced|entrar|iniciar|login|sign.?in)/.test(txt)) score-=80;
    if (form && e.closest('form')!==form && !/(acced|entrar|iniciar|login|sign.?in)/.test(txt)) score-=50;
    return {index,score,kind:e.tagName.toLowerCase()+'/'+type};
  }).filter(x=>vis(elements[x.index])).sort((a,b)=>b.score-a.score).slice(0,10);
}"""

class Exporter:
    def __init__(self, args: argparse.Namespace):
        self.args = args
        self.root = Path(args.output).expanduser().resolve()
        self.root.mkdir(parents=True, exist_ok=True)
        (self.root / 'logs').mkdir(exist_ok=True)
        logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', handlers=[logging.StreamHandler(sys.stdout), logging.FileHandler(self.root / 'logs' / 'scraper.log', encoding='utf-8')])
        self.log = logging.getLogger('mentoaula')
        self.browser = None
        self.context: BrowserContext | None = None
        self.main: Page | None = None
        self.index_url = INDEX_URL
        self.page_counts: dict[int, int] = defaultdict(int)
        self.visited: dict[int, set[str]] = defaultdict(set)
        self.errors: list[dict[str, Any]] = []
        self.unit_results: dict[str, Any] = {}
        self.asset_tasks: set[asyncio.Task] = set()
        self.asset_semaphore = asyncio.Semaphore(5)
        self.asset_seen: set[str] = set()
        self.asset_records: list[dict] = []
        self.download_seen: set[str] = set()
        old_assets=self.root/'assets_manifest.json'
        if old_assets.exists() and not args.fresh:
            try:
                self.asset_records=json.loads(old_assets.read_text(encoding='utf-8'))
                self.asset_seen={record['url'] for record in self.asset_records if record.get('url')}
            except (OSError,ValueError,KeyError): pass
        self.current_unit: int | None = None
        self.unit_links: dict[int, str] = {}
        self.media_by_unit: dict[int, dict[str, dict]] = defaultdict(dict)
        self.toc_by_unit: dict[int, list[str]] = defaultdict(list)
        self.topic_scanned: dict[int, set[str]] = defaultdict(set)
        self.current_action: str = ''
        self.run_started: str = utc_now()
        self.network_by_unit: dict[int, dict[str,dict]] = defaultdict(dict)
        self.reauth_attempts = 0
        self.kept_scorm_pages: list[Page] = []
        self.video_waited: dict[int, set[str]] = defaultdict(set)
        self.study_wait_log: list[dict[str, Any]] = []

    def report_error(self, where: str, error: BaseException | str) -> None:
        msg = str(error)[:1000]
        self.log.warning('%s: %s', where, msg)
        self.errors.append({'when': utc_now(), 'where': where, 'error': msg})

    def _on_response(self, response) -> None:
        try:
            rtype = response.request.resource_type
            if rtype not in {'image', 'font', 'stylesheet', 'media', 'script'}: return
            if rtype == 'script' and self.args.no_scripts: return
            url = response.url
            if self.current_unit is not None and rtype=='media':
                self.network_by_unit[self.current_unit][url] = {'url':redact_url(url), 'status':response.status, 'content_type':response.headers.get('content-type',''), 'kind':rtype}
                self.add_media(self.current_unit, [{'url':url,'tag':'network_media'}], 'network')
            if self.args.no_assets or len(self.asset_seen)>=self.args.max_assets: return
            if url in self.asset_seen or not url.startswith(('https://', 'http://')): return
            if rtype == 'script' and urlparse(url).hostname != urlparse(BASE_URL).hostname: return
            self.asset_seen.add(url)
            task = asyncio.create_task(self.capture_asset(response, rtype, self.current_unit))
            self.asset_tasks.add(task)
            task.add_done_callback(self.asset_tasks.discard)
        except Exception as exc:
            self.report_error('asset callback', exc)

    async def capture_asset(self, response, rtype: str, unit_loading: int | None = None) -> None:
        async with self.asset_semaphore:
            await self._capture_asset_inner(response,rtype,unit_loading)

    async def _capture_asset_inner(self,response,rtype,unit_loading):
        try:
            size = int(response.headers.get('content-length', '0'))
            if size > self.args.max_download_mb * 1024 * 1024: return
            data = await response.body()
            if not data or len(data) > self.args.max_download_mb * 1024 * 1024: return
            parts = urlparse(response.url)
            name = safe_name(Path(parts.path).name or rtype, 65)
            if '.' not in name: name += {'image':'.img', 'font':'.font', 'stylesheet':'.css', 'media':'.media', 'script':'.js'}.get(rtype,'')
            filename = f'{_sha(response.url)}_{name}'
            rel = Path('assets') / safe_name(parts.netloc, 70) / filename
            output = self.root / rel
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_bytes(data)
            self.asset_records.append({'url':redact_url(response.url), 'file':str(rel), 'type':rtype,'size_bytes':len(data),'unit_loading':unit_loading})
        except Exception as exc:
            self.log.debug('Asset not saved: %s', exc)

    async def start(self, pw) -> None:
        self.browser = await pw.chromium.launch(headless=self.args.headless, slow_mo=self.args.slow_mo)
        self.context = await self.browser.new_context(viewport={'width': 1500, 'height': 980}, accept_downloads=True, locale='es-ES', service_workers='allow')
        self.context.set_default_timeout(12000)
        self.context.on('response', self._on_response)
        self.main = await self.context.new_page()
        self.main.set_default_navigation_timeout(45000)
        await self.main.goto(BASE_URL, wait_until='domcontentloaded', timeout=45000)

    def get_credentials(self) -> tuple[str, str]:
        stored = {}
        credentials_file = Path(self.args.credentials_file).expanduser()
        if credentials_file.is_file():
            try:
                stored = json.loads(credentials_file.read_text(encoding='utf-8-sig'))
                if not isinstance(stored, dict): raise ValueError('expected a JSON object')
            except (OSError, ValueError) as exc:
                raise RuntimeError(f'Invalid credentials file {credentials_file}: {exc}') from exc
        username = (self.args.username or os.environ.get('MENTOAULA_USERNAME') or stored.get('username') or '').strip()
        password = os.environ.get('MENTOAULA_PASSWORD') or stored.get('password') or ''
        if not username: raise RuntimeError('Set username in credentials.local.json or pass --username.')
        if not password and self.args.prompt_password: password = getpass.getpass('MentoAula password (hidden): ')
        if not password and not self.args.manual_login: raise RuntimeError('No password provided. Put it in credentials.local.json or set MENTOAULA_PASSWORD.')
        return username, password

    async def is_authenticated(self) -> bool:
        assert self.main
        if await self.is_login_page(self.main): return False
        if 'SecureLogin/Login.aspx' in self.main.url: return False
        for frame in self.main.frames[:30]:
            if is_external_video_frame(frame): continue
            try:
                if (await frame.locator('#lblInfoSession, #ctl02_divFormacion, #tod01, [id^="udpanel"] a.milinkElemento').count()): return True
            except PlaywrightError: pass
        return False

    async def login_field_groups(self) -> list[tuple[Frame, dict]]:
        assert self.main
        groups = []
        for frame in self.main.frames[:12]:
            if is_external_video_frame(frame): continue
            try:
                result = await frame.evaluate(LOGIN_FIELDS_JS)
                if result: groups.extend((frame, data) for data in result)
            except PlaywrightError: pass
        groups.sort(key=lambda pair: pair[1]['score'], reverse=True)
        return groups

    async def save_login_diagnostics(self, message: str) -> None:
        assert self.main
        frames = []
        for frame in self.main.frames[:12]:
            try:
                fields = await frame.evaluate("""() => Array.from(document.querySelectorAll('input')).slice(0,60).filter(e => {const r=e.getBoundingClientRect(); return r.width>0 && r.height>0;}).map(e => ({type:e.type||'', id:(e.id||'').slice(0,70), name:(e.name||'').slice(0,70), placeholder:(e.placeholder||'').slice(0,70)}))""")
                frames.append({'url':redact_url(frame.url), 'fields':fields})
            except Exception: pass
        json_write(self.root/'logs'/'login_diagnostics.json', {'time':utc_now(), 'error':message, 'url':redact_url(self.main.url), 'frames':frames, 'message':'Contains only field metadata, never form input values.'})
        try: await self.main.screenshot(path=str(self.root/'logs'/'login_failure.png'), timeout=6000)
        except Exception: pass
        self.log.error('Login unsuccessful; inspect logs/login_diagnostics.json and login_failure.png.')

    async def login(self) -> None:
        assert self.main
        if await self.is_authenticated():
            self.log.info('Already authenticated: %s', redact_url(self.main.url))
            return
        if self.args.manual_login:
            if self.args.headless: raise RuntimeError('--manual-login requires --headed; headless mode cannot accept browser interaction.')
            self.log.info('Manual login debug mode; press Enter after finishing in browser.')
            await asyncio.to_thread(input, 'Press Enter after opening the course dashboard: ')
            if not await self.is_authenticated(): raise RuntimeError('Dashboard not detected after manual login.')
            return
        username, password = self.get_credentials()
        self.log.info('Automatic login (headless=%s). Waiting for visible login form...', self.args.headless)
        groups = []
        for _ in range(24):
            if await self.is_authenticated():
                self.log.info('Authenticated dashboard detected.')
                return
            groups = await self.login_field_groups()
            if groups: break
            await self.main.wait_for_timeout(450)
        if not groups:
            await self.save_login_diagnostics('No visible username/password pair after waiting for login page.')
            raise RuntimeError('Login form not detected. See logs/login_diagnostics.json.')
        frame, fields = groups[0]
        try:
            exact = frame.locator('#usuario:visible')
            exact_pass = frame.locator('#password:visible')
            if await exact.count() and await exact_pass.count():
                user, passwd = exact.first, exact_pass.first
                self.log.info('Using verified MentoAula login controls #usuario / #password')
            else:
                user = frame.locator('input').nth(fields['userIndex'])
                passwd = frame.locator('input').nth(fields['passwordIndex'])
            await user.fill(username, timeout=8000)
            await passwd.fill(password, timeout=8000)
            self.log.info('Filled credential fields (user=%s, password=%s).', fields.get('userName') or fields.get('userId') or '(unnamed)', fields.get('passwordName') or fields.get('passwordId') or '(unnamed)')
            exact_button = frame.locator('#btnLogin:visible')
            buttons = await frame.evaluate(LOGIN_BUTTONS_JS, fields['passwordIndex'])
            button = buttons[0] if buttons else None
            if await exact_button.count():
                self.log.info('Submitting verified MentoAula button #btnLogin')
                await exact_button.first.click(timeout=10000, no_wait_after=True)
            elif button and button['score'] >= 16:
                self.log.info('Submitting login using %s control.', button['kind'])
                await frame.locator(LOGIN_SUBMIT_SELECTOR).nth(button['index']).click(timeout=10000, no_wait_after=True)
            else:
                self.log.info('Submitting login by pressing Enter in password field.')
                await passwd.press('Enter', timeout=8000, no_wait_after=True)
        except PlaywrightError as exc:
            await self.save_login_diagnostics(f'Login form interaction failed: {type(exc).__name__}')
            raise RuntimeError('Unable to submit login. See logs/login_diagnostics.json.') from None
        finally: password = None
        timeout_seconds = max(5, self.args.login_timeout_ms / 1000)
        loop = asyncio.get_running_loop()
        expires = loop.time() + timeout_seconds
        last_status = 0
        while loop.time() < expires:
            if await self.is_authenticated():
                self.log.info('Login verified successfully: %s', redact_url(self.main.url))
                return
            remaining = expires - loop.time()
            if int(remaining) % 8 == 0 and int(remaining) != last_status:
                last_status = int(remaining)
                self.log.info('Waiting for authenticated dashboard (%ds remaining)...', max(0,int(remaining)))
            await self.main.wait_for_timeout(450)
        await self.save_login_diagnostics('Login submission did not reach the course dashboard.')
        raise RuntimeError('Automatic login failed. Verify credentials / account status; site may require a CAPTCHA/MFA or different form. Review logs/login_diagnostics.json. No bypass attempted.')

    async def is_login_page(self, page: Page) -> bool:
        try:
            if 'SecureLogin/Login.aspx' in page.url: return True
            for fr in page.frames[:20]:
                if is_external_video_frame(fr): continue
                if await fr.locator('input[type=password]:visible').count(): return True
            return False
        except PlaywrightError: return False

    async def goto_index(self) -> None:
        assert self.main
        current = urlparse(self.main.url)
        desired = urlparse(self.index_url)
        same_document = (current.scheme, current.netloc, current.path, current.query) == (desired.scheme, desired.netloc, desired.path, desired.query)
        if not same_document:
            await self.main.goto(self.index_url, wait_until='domcontentloaded', timeout=45000)
        if self.args.delay_ms > 0: await self.main.wait_for_timeout(self.args.delay_ms)
        if await self.is_login_page(self.main):
            if self.reauth_attempts >= 2: raise RuntimeError('Dashboard session lost more than twice. Aborting to avoid repeated authentication.')
            self.reauth_attempts += 1
            self.log.warning('Dashboard session lost; making bounded automatic re-login (%d/2)',self.reauth_attempts)
            await self.login()
            if not await self.is_authenticated(): raise RuntimeError('Automatic re-login did not restore dashboard')

    async def frame_data(self, frame: Frame) -> tuple[dict, str] | None:
        try:
            data = await frame.evaluate(INSPECT_JS)
            html = await frame.content()
            return data, html
        except (PlaywrightError, Exception) as exc:
            self.log.debug('Frame unavailable: %s', exc)
            return None

    async def capture_home(self) -> None:
        assert self.main
        self.log.info('Saving course overview / frontend and page font information.')
        directory = self.root / 'overview'
        directory.mkdir(exist_ok=True)
        try:
            result = await self.frame_data(self.main.main_frame)
            if result:
                data, html = result
                json_write(directory / 'page.json', data)
                write_text(directory / 'page.html', html)
                write_text(directory / 'page.txt', data.get('text',''))
                json_write(directory / 'fonts.json', {'fontFamily':data.get('fontFamily'), 'fontSize':data.get('fontSize'), 'lang':data.get('lang'), 'title':data.get('title'), 'loadedFontFaces':data.get('loadedFontFaces', [])})
            frame_index = []
            for i, frame in enumerate(self.main.frames[1:32], 1):
                if is_external_video_frame(frame): continue
                result = await self.frame_data(frame)
                if not result: continue
                frame_data, frame_html = result
                folder = directory / 'frames' / f'frame_{i:02d}'
                json_write(folder / 'page.json', frame_data)
                write_text(folder / 'page.html', frame_html)
                write_text(folder / 'page.txt', frame_data.get('text', ''))
                frame_index.append({'frame':i,'url':redact_url(frame.url), 'chars':len(frame_data.get('text',''))})
            json_write(directory / 'frames_index.json',frame_index)
            await self.screenshot(self.main, directory / 'page.png')
        except Exception as exc:
            self.report_error('overview capture', exc)

    async def screenshot(self, page: Page, destination: Path) -> None:
        try: await page.screenshot(path=str(destination), full_page=True, animations='disabled', timeout=15000)
        except Exception:
            try: await page.screenshot(path=str(destination), full_page=False, timeout=8000)
            except Exception as exc: self.report_error('screenshot', exc)

    def add_media(self, unit: int, items: list[dict], source: str) -> None:
        for item in items:
            url = str(item.get('url') or item.get('src') or '').strip()
            poster = str(item.get('poster') or '').strip()
            for u, kind in [(url, item.get('tag','media')), (poster, 'poster')]:
                if not u or not u.startswith(('https://', 'http://', 'blob:')): continue
                key = _sha(u)
                old = self.media_by_unit[unit].get(key)
                if old:
                    old['sources'] = sorted(set(old.get('sources',[]) + [source]))
                    continue
                record = {**item, 'url':redact_url(u), 'tag':kind, 'sources':[source], 'seen_at':utc_now()}
                self.media_by_unit[unit][key] = record
                if re.search(r'youtu|vimeo|\.mp4|\.webm|\.vtt|\.srt|\.m3u8',u,re.I): self.log.info('Unit %02d | media found | %s',unit,redact_url(u)[:155])

    async def toc(self, page: Page) -> list[tuple[Frame, dict]]:
        found=[]
        for frame in page.frames[:24]:
            if is_external_video_frame(frame): continue
            try:
                candidates=await frame.evaluate(SCORM_TOC_JS)
                if not candidates: continue
                for c in candidates: found.append((frame,c))
            except Exception as exc: self.log.debug('TOC inspection failed: %s',exc)
        groups: dict[int,list[tuple[Frame,dict]]] = defaultdict(list)
        for fr,it in found: groups[id(fr)].append((fr,it))
        if not groups: return []
        best = max(groups.values(),key=lambda group:(sum(bool(re.search(r'(introducci[oó]n|objetivos|resumen|ejercicios|mapa conceptual|\d+\. )',x['text'],re.I)) for _,x in group), len(group)))
        results=[]
        labels=set()
        for fr,it in sorted(best,key=lambda pair:pair[1]['top']):
            key=it['text'].casefold()
            if key not in labels:
                labels.add(key)
                results.append((fr,it))
        return results[:100]

    async def ensure_scorm_toc(self, page: Page, unit: int) -> list[tuple[Frame, dict]]:
        result = await self.toc(page)
        if result: return result
        selectors = ('[aria-label*="menú" i], [aria-label*="menu" i], [title*="menú lateral" i], [title*="menu lateral" i], button:has-text("Mostrar menú lateral"), a:has-text("Mostrar menú lateral"), [role="button"]:has-text("Mostrar menú lateral")')
        for frame in reversed(page.frames[:32]):
            if is_external_video_frame(frame): continue
            try:
                matches=frame.locator(selectors)
                for i in range(min(await matches.count(),12)):
                    target=matches.nth(i)
                    if not await target.is_visible(): continue
                    description=(await target.get_attribute('aria-label') or await target.get_attribute('title') or '').lower()
                    if 'ocultar' in description or 'hide' in description: continue
                    self.log.info('Unit %02d | opening SCORM side menu in nested frame',unit)
                    await target.click(timeout=3500,no_wait_after=True)
                    break
            except Exception as exc: self.log.debug('Open SCORM menu skipped in frame: %s',type(exc).__name__)
        loop=asyncio.get_running_loop()
        deadline=loop.time()+3.5
        while loop.time()<deadline:
            result=await self.toc(page)
            if result:
                self.log.info('Unit %02d | SCORM TOC discovered after opening menu (%d sections)',unit,len(result))
                return result
            await asyncio.sleep(0.15)
        return []

    async def find_toc_entry(self, page: Page, unit: int, label: str) -> tuple[Frame, dict] | None:
        norm_label = ' '.join(label.split()).casefold()
        for pass_no in range(2):
            candidates = await (self.ensure_scorm_toc(page, unit) if pass_no == 0 else self.toc(page))
            exact = next(((fr, item) for fr, item in candidates if ' '.join(item.get('text', '').split()).casefold() == norm_label), None)
            if exact: return exact
            if pass_no == 0:
                for frame in page.frames[:24]:
                    if is_external_video_frame(frame): continue
                    try:
                        await frame.evaluate(r"""() => {
                          const els=[...document.querySelectorAll('aside,nav,[class*="sidebar" i],[id*="sidebar" i],[class*="menu" i],[id*="menu" i],[class*="indice" i],[id*="indice" i]')];
                          for(const el of els){
                            const r=el.getBoundingClientRect();
                            if(r.left<110 && r.width>130 && r.width<innerWidth*.72 && /mapa conceptual|introducci[oó]n|resumen/i.test(el.innerText||'')) {
                               el.scrollTop=0;
                               for(const child of el.querySelectorAll('*')){ if(child.scrollHeight>child.clientHeight+100 && child.clientWidth>100 && child.clientWidth<550) child.scrollTop=0; }
                               break;
                            }
                          }
                        }""")
                    except Exception: pass
        return None

    async def active_topic(self, page: Page) -> str | None:
        menu = await self.toc(page)
        for _, item in menu:
            if item['active']: return item['text']
        return None

    async def scroll_for_lazy_content(self, page: Page) -> None:
        if self.args.scroll_steps <= 0: return
        for frame in page.frames[:24]:
            if is_external_video_frame(frame): continue
            try:
                await frame.evaluate("""async (steps) => { const sleep=ms=>new Promise(r=>setTimeout(r,ms)); const root=document.scrollingElement || document.documentElement; const h=Math.max(root.scrollHeight,document.body?.scrollHeight||0); const old=root.scrollTop; for(let i=1;i<=steps;i++) {root.scrollTop=(h-innerHeight)*i/steps;await sleep(50);} root.scrollTop=old; }""",self.args.scroll_steps)
            except Exception: pass

    def save_unit_progress(self, unit: int, status: str = 'in_progress') -> None:
        folder=self.root / 'units' / f'unidad_{unit:02d}'
        json_write(folder / 'media_links.json',list(self.media_by_unit[unit].values()))
        video_lines=['# Video and media references','', 'Extracted URLs and media metadata; video files are not guaranteed to be downloaded.','']
        for i,item in enumerate(self.media_by_unit[unit].values(),1):
            video_lines.extend([f"## {i}. {item.get('title') or item.get('text') or item.get('tag','media')}", '', f"URL: {item.get('url','')}", f"Type: {item.get('tag','')}",''])
        write_text(folder/'videos_and_media.md','\n'.join(video_lines))
        if self.network_by_unit[unit]: json_write(folder / 'network_media.json',list(self.network_by_unit[unit].values()))
        json_write(folder / 'coverage_audit.json', { 'unit':unit, 'discovered_topics':self.toc_by_unit[unit], 'scanned_topics':sorted(self.topic_scanned[unit]), 'unscanned_topics':[x for x in self.toc_by_unit[unit] if x not in self.topic_scanned[unit]], 'saved_states':self.page_counts[unit], 'note':'Navigation exploration does not guarantee that every activity or slide was accessible.'})
        json_write(folder / 'navigation.json', { 'sections':self.toc_by_unit[unit], 'scanned':sorted(self.topic_scanned[unit])})
        snapshot={ 'updated_at':utc_now(), 'unit':unit, 'status':status, 'last_action':self.current_action, 'saved_pages':self.page_counts[unit], 'sidebar_sections_discovered':len(self.toc_by_unit[unit]), 'sidebar_sections_scanned':len(self.topic_scanned[unit]), 'media_links':len(self.media_by_unit[unit]), 'network_media_requests':len(self.network_by_unit[unit]) }
        json_write(folder / 'progress.json', snapshot)
        json_write(self.root / 'live_progress.json',snapshot)

    async def dashboard_frames(self) -> list[Frame]:
        assert self.main
        candidates=[]
        for frame in self.main.frames[:35]:
            if is_external_video_frame(frame): continue
            try:
                count=await frame.locator('[id^="tod"][id$="01"], #tod02, #tod03, #tod13').count()
                if count: candidates.append((count,frame))
            except PlaywrightError: continue
        candidates.sort(key=lambda x:x[0],reverse=True)
        return [fr for _,fr in candidates]

    async def wait_for_dashboard_units(self, minimum: int = 1, seconds: float = 14) -> bool:
        deadline=asyncio.get_running_loop().time()+seconds
        while asyncio.get_running_loop().time()<deadline:
            frames=await self.dashboard_frames()
            if frames:
                try:
                    if sum([await fr.locator('a.milinkElemento').count() for fr in frames]) >= minimum: return True
                except PlaywrightError: pass
            await asyncio.sleep(0.18)
        return False

    async def catalog_dashboard_units(self) -> list[dict]:
        assert self.main
        entries=[]
        frames=await self.dashboard_frames()
        for frame in frames:
            try:
                rows=await frame.evaluate(r"""() => {
                  return Array.from(document.querySelectorAll('[id^="tod"]')).flatMap(header => {
                    if(!/^tod\d+$/i.test(header.id))return [];
                    const n=Number(header.id.slice(3));
                    if(n<1 || n>13)return [];
                    const body=document.getElementById('udpanel'+String(n).padStart(2,'0'));
                    const links=Array.from(body?.querySelectorAll('a.milinkElemento')||[]);
                    const a=links.find(el=>new RegExp('Contenido\\s+unidad\\s+0?'+n+'(?!\\d)','i').test(el.textContent||''))||links[0];
                    const onclick=a?.getAttribute('onclick')||'';
                    const match=onclick.match(/window\.open\(\s*['"]([^'"]+)/i);
                    let scorm='';
                    try {if(match)scorm=new URL(match[1],location.href).href;}catch(e){}
                    return [{unit:n,title:(header.innerText||'').replace(/\s+/g,' ').trim(), heading_id:header.id,panel_id:body?.id||'',has_link:!!a, link_text:(a?.textContent||'').trim(),scorm_link:scorm, panel_visible:!!body && getComputedStyle(body).display!=='none'}];
                  });
                }""")
                for e in rows: e['dashboard_frame']=redact_url(frame.url)
                entries.extend(rows)
            except Exception as exc: self.log.debug('Dashboard catalog inspection: %s',exc)
        dedup={}
        for e in entries:
            n=e.get('unit')
            if isinstance(n,int) and 1<=n<=13 and (n not in dedup or e.get('has_link')): dedup[n]=e
        result=[dedup[n] for n in sorted(dedup)]
        json_write(self.root/'overview'/'dashboard_units.json',result)
        self.log.info('Dashboard units detected: %d/13 (SCORM links: %d) / frames: %d', len(result),sum(bool(e.get('scorm_link')) for e in result),len(frames))
        return result

    async def expand_dashboard_unit(self, unit: int) -> bool:
        suffix=f'{unit:02d}'
        for frame in await self.dashboard_frames():
            header=frame.locator(f'#tod{suffix}')
            panel=frame.locator(f'#udpanel{suffix}')
            try:
                if not (await header.count() and await panel.count()): continue
                link=panel.locator('a.milinkElemento').filter(has_text=re.compile(rf'contenido\s+unidad\s*0?{unit}(?!\d)',re.I))
                if not await link.count(): continue
                if await link.first.is_visible(): return True
                self.log.info('Unit %02d | expanding accordion %s | frame: %s', unit,f"#tod{suffix}",redact_url(frame.url))
                await header.click(timeout=5000, no_wait_after=True)
                try: await link.first.wait_for(state='visible',timeout=2800)
                except PlaywrightTimeoutError:
                    toggle=header.locator(f'#togglaTema{suffix},.badge').first
                    if await toggle.count() and await toggle.is_visible():
                        await toggle.click(timeout=2500,no_wait_after=True)
                        await link.first.wait_for(state='visible',timeout=2200)
                return await link.first.is_visible()
            except PlaywrightError as exc: self.log.debug('Unit %02d expand failed on frame %s: %s',unit,redact_url(frame.url),exc)
        return False

    async def find_unit_link(self, unit: int):
        rx=re.compile(rf'^\s*Contenido\s+unidad\s*0?{unit}\s*$',re.I)
        frames=await self.dashboard_frames()
        for frame in frames:
            try:
                precise=frame.locator(f'#udpanel{unit:02d} a.milinkElemento').filter(has_text=rx)
                if await precise.count() and await precise.first.is_visible(): return precise.first
            except PlaywrightError: pass
        for frame in frames:
            try:
                others=frame.locator('a.milinkElemento').filter(has_text=rx)
                for i in range(min(await others.count(),20)):
                    if await others.nth(i).is_visible(): return others.nth(i)
            except PlaywrightError: pass
        return None

    async def open_unit(self, unit: int) -> Page | None:
        assert self.main and self.context
        await self.goto_index()
        await self.wait_for_dashboard_units()
        expanded = await self.expand_dashboard_unit(unit)
        target = await self.find_unit_link(unit)
        catalog = await self.catalog_dashboard_units()
        fallback = next((e.get('scorm_link', '') for e in catalog if e.get('unit') == unit), '')
        if fallback and urlparse(fallback).hostname != urlparse(BASE_URL).hostname: fallback = ''
        if not target and not fallback:
            self.report_error(f'unit {unit}', 'No authorized course link found')
            return None
        self.unit_links[unit] = redact_url(fallback or '(clicked dashboard)')
        existing = set(self.context.pages)
        if target:
            self.log.info('Unit %02d | triggering SCORM window.open and waiting for popup', unit)
            try: await target.click(timeout=8500, no_wait_after=True)
            except PlaywrightError as exc: self.log.warning('Unit %02d | click failed (%s); using documented URL', unit, type(exc).__name__)
        else: self.log.warning('Unit %02d | accordion not visible (%s); using documented URL', unit, expanded)
        lesson = None
        if target:
            deadline = asyncio.get_running_loop().time() + 5.0
            while asyncio.get_running_loop().time() < deadline:
                popups = [pg for pg in self.context.pages if pg not in existing and not pg.is_closed()]
                if popups:
                    lesson = popups[-1]
                    break
                reused = [pg for pg in self.context.pages if pg is not self.main and not pg.is_closed() and 'ScormPlayer.aspx' in pg.url]
                if fallback:
                    expected = dict(parse_qsl(urlparse(fallback).query))
                    wanted = expected.get('IdScorm')
                    if wanted: reused = [pg for pg in reused if f'IdScorm={wanted}' in pg.url]
                if reused:
                    lesson = reused[-1]
                    break
                if re.search(r'/Herramientas/Scorm/Consumo/(ScormPlayer|ScormConsumoVisualizacion)\.aspx', self.main.url, re.I):
                    lesson = self.main
                    break
                for frame in self.main.frames:
                    if frame is not self.main.main_frame and re.search(r'/Herramientas/Scorm/Consumo/', frame.url, re.I):
                        lesson = self.main
                        break
                if lesson: break
                await asyncio.sleep(0.10)
        if lesson is None and fallback:
            self.log.warning('Unit %02d | no SCORM popup in 5 seconds; using captured dashboard SCORM URL', unit)
            lesson = await self.context.new_page()
            await lesson.goto(fallback, wait_until='domcontentloaded', timeout=35000)
        if lesson is None:
            self.report_error(f'unit {unit}', 'No popup, embedded SCORM or fallback URL')
            return None
        if lesson is not self.main:
            try: await lesson.wait_for_load_state('domcontentloaded', timeout=11000)
            except PlaywrightError: pass
        if lesson is not self.main and lesson.url == 'about:blank':
            deadline = asyncio.get_running_loop().time() + 5
            while asyncio.get_running_loop().time() < deadline and not lesson.is_closed():
                if lesson.url != 'about:blank': break
                try:
                    if await lesson.locator('body').inner_text(timeout=500): break
                except PlaywrightError: pass
                await asyncio.sleep(0.10)
        self.log.info('Unit %02d | SCORM candidate %s | frames=%d', unit, redact_url(lesson.url), len(lesson.frames))
        return lesson

    async def content_evidence(self, page: Page) -> list[dict]:
        found = []
        for frame in page.frames[:48]:
            if is_external_video_frame(frame): continue
            try:
                obj = await frame.evaluate(r"""() => {
                  const t = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
                  return {title:document.title||'', text_chars:t.length, text_sample:t.slice(0,220), links:document.querySelectorAll('a[href]').length, media:document.querySelectorAll('video,source,track,iframe[src]').length, headings:document.querySelectorAll('h1,h2,h3,h4').length, has_sidebar:!!document.querySelector('aside,nav,[role=menu],[class*=sidebar],#nav'), has_password:!!document.querySelector('input[type=password],#btnLogin'), iframe_count:document.querySelectorAll('iframe').length, has_content_node:!!document.querySelector('main,article,[role="main"],.slide-content,.lesson-content,.scorm-content,video')};
                }""")
                host = (urlparse(frame.url).hostname or '').lower()
                path = urlparse(frame.url).path.lower()
                is_lesson_url = ( ('contenidos.edavanza.com' in host and re.search(r'\.(?:php|html?|aspx)$', path)) or ('contents.contenidoscumlaude.com' in host and re.search(r'/unidad[^/]*\.html?$', path)) or ('/contenidoscim/' in path and re.search(r'(?:unidad|leccion|lesson)', path)) or bool(re.search(r'/newud11\.php$', path)) or bool(re.search(r'/unidad\d+\.html?$', path)) )
                is_meaningful = not obj['has_password'] and ( (is_lesson_url and (obj['text_chars'] >= 35 or obj['has_content_node'] or obj['media'] > 0)) or (frame is not page.main_frame and obj['text_chars'] >= 100 and obj['has_content_node'] and 'indexif.aspx' not in path) or (frame is page.main_frame and 'scorm' in path and obj['text_chars'] >= 200 and obj['has_content_node']) or (obj['text_chars'] >= 120 and obj['has_content_node'] and obj['has_sidebar'] and obj['headings'] >= 1 and 'indexif.aspx' not in path) )
                found.append({'url': redact_url(frame.url), 'host':host,'path':path, 'is_lesson_url':bool(is_lesson_url), 'is_meaningful':bool(is_meaningful), **obj})
            except PlaywrightError: continue
        return found

    async def lesson_is_loaded(self, page: Page) -> bool:
        return any(f['is_meaningful'] for f in await self.content_evidence(page))

    async def save_lesson_diagnostic(self, page: Page, unit: int, reason: str) -> None:
        json_write(self.root / 'logs' / f'unit_{unit:02d}_lesson_diagnostic.json', {'at':utc_now(), 'reason': reason, 'page_url':redact_url(page.url), 'frames':await self.content_evidence(page)})

    async def wait_for_scorm(self, page: Page, unit: int) -> None:
        deadline = asyncio.get_running_loop().time() + 30.0
        last_report = 0
        while asyncio.get_running_loop().time() < deadline and not page.is_closed():
            evidence = await self.content_evidence(page)
            meaningful = [e for e in evidence if e['is_meaningful']]
            if meaningful:
                deepest = meaningful[-1]
                self.log.info('Unit %02d | real lesson content detected: %s (%d chars; %d frames)', unit, deepest['path'], deepest['text_chars'], len(evidence))
                return
            count = len(evidence)
            if count != last_report:
                self.log.info('Unit %02d | waiting for nested SCORM content; frames=%d', unit, count)
                last_report = count
            await asyncio.sleep(0.25)
        self.log.warning('Unit %02d | no confirmed course content after bounded wait', unit)

    async def signature(self, page: Page) -> str:
        pieces = []
        for frame in page.frames[:32]:
            if is_external_video_frame(frame): continue
            try:
                data = await frame.evaluate(r"""() => {
                  const clean = s => (s || '').replace(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g,'[TIMER]').replace(/\b\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}(?::\d{2})?\b/g,'[DATETIME]').replace(/\s+/g,' ').trim();
                  const visible = el => { const r=el.getBoundingClientRect(),c=getComputedStyle(el); return r.width>1 && r.height>1 && c.display!=='none' && c.visibility!=='hidden' && +c.opacity!==0; };
                  const root = Array.from(document.querySelectorAll('main,article,[role="main"],.lesson-content,.course-content,.scorm-content,.slide-content,.swiper-slide-active,.tab-pane.active')).filter(visible).sort((a,b)=>(b.innerText||'').length - (a.innerText||'').length)[0];
                  const active = Array.from(document.querySelectorAll('[aria-selected="true"],[aria-current="page"],.active,.current,.selected')).filter(visible).slice(0,25).map(x=>clean((x.innerText||'').slice(0,90))).filter(Boolean);
                  const texts = (root?.innerText || document.body?.innerText || '');
                  return { path:location.pathname,title:document.title, text:clean(texts).slice(0,180000), headings:Array.from(document.querySelectorAll('h1,h2,h3,h4')).filter(visible).slice(0,40).map(e=>clean(e.innerText)), active, media:Array.from(document.querySelectorAll('video,source,iframe[src],img[src]')).filter(visible).slice(0,80).map(e=>e.currentSrc || e.src || e.poster || ''), expanded:Array.from(document.querySelectorAll('[aria-expanded="true"],details[open]')).filter(visible).slice(0,40).map(e=>e.id||clean(e.innerText).slice(0,50)) };
                }""")
                if data: pieces.append(data)
            except PlaywrightError: continue
        return _sha(json.dumps(pieces, sort_keys=True, ensure_ascii=False))

    async def wait_for_state_change(self, page: Page, old_signature: str, timeout_seconds: float = 0.75) -> str:
        signature=await self.signature(page)
        if signature!=old_signature or page.is_closed(): return signature
        loop=asyncio.get_running_loop()
        deadline=loop.time()+timeout_seconds
        while loop.time()<deadline and not page.is_closed():
            await asyncio.sleep(min(0.09,max(0.01,deadline-loop.time())))
            signature=await self.signature(page)
            if signature!=old_signature: return signature
        return signature

    async def capture_state(self, page: Page, unit: int, action: str, force: bool = False) -> bool:
        if page.is_closed() or self.page_counts[unit] >= self.args.max_pages_per_unit: return False
        self.current_action = action
        await self.scroll_for_lazy_content(page)
        sig = await self.signature(page)
        if not force and sig in self.visited[unit]: return False
        if await self.is_login_page(page):
            self.log.warning('Unit %02d: capture refused because a login form is visible',unit)
            return False
        self.visited[unit].add(sig)
        self.page_counts[unit] += 1
        n = self.page_counts[unit]
        directory = self.root / 'units' / f'unidad_{unit:02d}' / 'pages' / f'{n:04d}'
        directory.mkdir(parents=True, exist_ok=True)
        meta = {'unit':unit, 'page':n, 'timestamp':utc_now(), 'action':action, 'signature':sig,'browser_url':redact_url(page.url),'frames':[]}
        for i, frame in enumerate(page.frames[:24]):
            if is_external_video_frame(frame): continue
            result = await self.frame_data(frame)
            if not result: continue
            data, html = result
            directory_part = directory if i == 0 else directory / 'frames' / f'frame_{i:02d}'
            directory_part.mkdir(parents=True, exist_ok=True)
            write_text(directory_part / 'page.html', html)
            write_text(directory_part / 'page.txt', data.get('text',''))
            self.add_media(unit,data.get('media',[]),f'page_{n:04d}_frame_{i:02d}')
            text_urls=re.findall(r'https?://[^\s<>\"\']+',data.get('text',''))
            for raw in text_urls[:250]:
                url=raw.rstrip(').,;]}')
                if re.search(r'youtu\.?be|vimeo|\.(?:mp4|webm|mp3|vtt|srt)(?:[?&#]|$)',url,re.I): self.add_media(unit,[{'url':url,'tag':'text_reference'}],f'page_{n:04d}_text')
            for link in data.get('links',[]):
                url=link.get('href','')
                if re.search(r'(youtu\.?be|vimeo|\.(mp4|webm|vtt|srt|m3u8)(?:\?|#|$))',url,re.I): self.add_media(unit,[{'url':url,'tag':'link','text':link.get('text','')}],f'page_{n:04d}_link')
            json_write(directory_part / 'page.json', data)
            meta['frames'].append({'index':i,'name':frame.name,'url':redact_url(frame.url), 'chars':len(data.get('text','')), 'folder':str(directory_part.relative_to(directory))})
            if not self.args.no_downloads:
                captions=[{'href':m.get('url','')} for m in data.get('media',[]) if m.get('tag')=='track' or re.search(r'\.(vtt|srt)(\?|$)',m.get('url',''),re.I)]
                await self.download_documents(data.get('links',[])+captions,unit)
        json_write(directory / 'meta.json', meta)
        if self.args.screenshots=='all' or (self.args.screenshots=='topics' and any(action.startswith(x) for x in ('unit opened','sidebar:','topic:'))):
            await self.screenshot(page, directory / 'screenshot.png')
        primary_texts = []
        for frame_info in meta['frames']:
            subdir = directory / frame_info['folder']
            try:
                contents = (subdir / 'page.txt').read_text(encoding='utf-8').strip()
                if contents and contents not in primary_texts: primary_texts.append(contents)
            except OSError: pass
        with (self.root / 'units' / f'unidad_{unit:02d}' / 'contenido_completo.md').open('a', encoding='utf-8') as f:
            f.write(f'\n\n---\n\n## Página capturada {n:04d} — {action}\n\n')
            f.write(f'URL: {redact_url(page.url)}\n\n')
            for j, content in enumerate(primary_texts): f.write(f'### Texto visible {j+1}\n\n{content}\n\n')
        self.save_unit_progress(unit)
        self.log.info('PROGRESS | Unit %02d | saved %04d | sections %d/%d | media %d | %s | %d frames', unit, n, len(self.topic_scanned[unit]), len(self.toc_by_unit[unit]), len(self.media_by_unit[unit]), action, len(meta['frames']))
        return True

    async def download_documents(self, links: list[dict], unit: int) -> None:
        assert self.context
        if len(self.download_seen) >= 350: return
        for link in links:
            url = link.get('href','')
            if not url or not url.startswith(('http://','https://')): continue
            parsed = urlparse(url)
            suffix = Path(parsed.path).suffix.lower()
            if suffix not in DOWNLOAD_EXTENSIONS: continue
            if parsed.hostname != urlparse(BASE_URL).hostname: continue
            if url in self.download_seen: continue
            self.download_seen.add(url)
            try:
                response = await self.context.request.get(url, timeout=12000, max_redirects=3)
                if not response.ok: continue
                length = int(response.headers.get('content-length','0'))
                if length > self.args.max_download_mb * 1024 * 1024: continue
                payload = await response.body()
                if len(payload) > self.args.max_download_mb * 1024 * 1024: continue
                name = f'{_sha(url)}_{safe_name(Path(parsed.path).name, 100)}'
                dest = self.root / 'units' / f'unidad_{unit:02d}' / 'downloads' / name
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(payload)
                with (dest.parent / 'downloads.jsonl').open('a', encoding='utf-8') as out:
                    out.write(json.dumps({'url':redact_url(url), 'file':name, 'bytes':len(payload)}, ensure_ascii=False)+'\n')
                self.log.info('Downloaded lesson resource: %s', name)
            except Exception as exc: self.log.debug('Resource download failed: %s', exc)

    async def controls(self, page: Page, mode: str) -> list[tuple[Frame, dict]]:
        result = []
        for frame in page.frames[:24]:
            if is_external_video_frame(frame): continue
            try:
                candidates = await frame.evaluate(CONTROLS_JS, mode)
                for item in candidates: result.append((frame, item))
            except Exception as exc: self.log.debug('Control inspection failed: %s', exc)
        result.sort(key=lambda item: (item[1].get('score', 0), int(item[0] != page.main_frame)), reverse=True)
        return result

    async def click_control(self, frame: Frame, info: dict, delay: int | None = None) -> bool:
        try:
            loc = frame.locator(info['selector']).first
            if await loc.count() == 0 or not await loc.is_visible() or not await loc.is_enabled(): return False
            await loc.scroll_into_view_if_needed(timeout=4000)
            await loc.click(timeout=5500, no_wait_after=True)
            pause=self.args.delay_ms if delay is None else delay
            if pause>0: await asyncio.sleep(pause/1000)
            return True
        except Exception as exc:
            self.log.debug('Click failed [%s]: %s', info.get('text',''), exc)
            return False

    async def explore_reveals(self, page: Page, unit: int) -> None:
        if self.args.no_reveals: return
        tried = set()
        for _ in range(self.args.max_reveals_per_page):
            if self.page_counts[unit] >= self.args.max_pages_per_unit or page.is_closed(): return
            options = await self.controls(page, 'reveal')
            chosen = None
            for frame, info in options:
                label = (info.get('text') or '').strip()
                if re.search(r'(?i)mostrar\s*/\s*ocultar|mostrar\s+men[uú]\s+lateral|ocultar\s+men[uú]\s+lateral',label): continue
                key = (frame.url, info['selector'])
                if key not in tried:
                    chosen = frame, info, key
                    break
            if chosen is None: return
            frame, info, key = chosen
            tried.add(key)
            before = await self.signature(page)
            if not await self.click_control(frame, info): continue
            after = await self.wait_for_state_change(page,before,0.45)
            if before != after:
                label = (info.get('text') or info.get('hints') or 'interactive')[:75]
                await self.capture_state(page, unit, f'reveal: {label}')
                if await self.maybe_dismiss_overlay(page): await self.capture_state(page, unit, 'after closing overlay')

    async def maybe_dismiss_overlay(self, page: Page) -> bool:
        try:
            for frame in reversed(page.frames[:24]):
                close = frame.locator('[aria-modal=true] button[aria-label*="cerrar" i], [role=dialog] button[aria-label*="close" i], .modal.show .close, .modal.show .btn-close').first
                if await close.count() and await close.is_visible():
                    await close.click(timeout=2200)
                    return True
        except Exception: pass
        return False

    async def visible_video_players(self, page: Page) -> list[dict]:
        videos: list[dict] = []
        for frame in page.frames[:32]:
            if is_external_video_frame(frame): continue
            try:
                found = await frame.evaluate(r"""() => {
                  function shown(e) { const r = e.getBoundingClientRect(), st = getComputedStyle(e); if (r.width < 150 || r.height < 85 || st.display === 'none' || st.visibility === 'hidden' || Number(st.opacity) === 0) return false; for (let p=e.parentElement;p;p=p.parentElement) { const c=getComputedStyle(p); if (c.display==='none' || c.visibility==='hidden') return false; } return true; }
                  const out=[];
                  for(const e of document.querySelectorAll('video,iframe[src],embed[src],object[data]')) {
                    if(!shown(e)) continue;
                    const tag=e.tagName.toLowerCase();
                    const url= e.currentSrc || e.src || e.data || e.getAttribute('src') || e.querySelector('source[src]')?.src || e.poster || '';
                    if(tag !== 'video' && !/youtube|youtu\.be|vimeo|\.mp4|video|reproductor|player/i.test(url)) continue;
                    const box = e.closest('section,article,[class*=video],[class*=player]');
                    const nearby=(box?.querySelector('h1,h2,h3,h4,h5')?.innerText || e.parentElement?.querySelector('h1,h2,h3,h4,h5')?.innerText || '').trim();
                    out.push({tag, url, nearby:nearby.slice(0,100), poster: e.poster || '', duration:Number.isFinite(e.duration)?e.duration:null});
                  }
                  return out.slice(0,15);
                }""")
                for item in found:
                    item['frame'] = frame.url
                    videos.append(item)
            except PlaywrightError: continue
        return videos

    async def study_gate_visible(self, page: Page) -> str:
        for frame in page.frames[:32]:
            if is_external_video_frame(frame): continue
            try:
                snippets = await frame.evaluate(r"""() => {
                  const visible = e => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && Number(c.opacity) !== 0 && r.width > 1 && r.height > 1; };
                  const sels='[role="alert"],[aria-live],.alert,.toast,.tooltip,[class*="aviso"],[class*="warning"],[class*="mensaje"],.ui-dialog,.swal2-popup,.popover,body';
                  const out=[];
                  for(const e of document.querySelectorAll(sels)) { if(!visible(e)) continue; const text=(e.innerText || '').replace(/\s+/g,' ').trim(); if(text) out.push(text.slice(0,40000)); }
                  return out.slice(-30);
                }""")
                for text in snippets:
                    match = STUDY_GATE_RE.search(text)
                    if match: return text[max(0, match.start()-30):match.end()+110].strip()
            except PlaywrightError: continue
        return ''

    async def wait_study_time(self, page: Page, unit: int, seconds: int, reason: str) -> None:
        seconds = max(0, seconds)
        if not seconds: return
        self.log.info('Unit %02d | STUDY WAIT | %s | %ds (browser stays open)', unit, reason, seconds)
        deadline = asyncio.get_running_loop().time() + seconds
        period = max(1, self.args.wait_log_every)
        while not page.is_closed():
            left = max(0, deadline - asyncio.get_running_loop().time())
            if left <= 0: break
            await asyncio.sleep(min(left, period))
            left = max(0, deadline - asyncio.get_running_loop().time())
            if left > 0: self.log.info('Unit %02d | STUDY WAIT | %ds remaining | %s', unit, round(left), reason)
        self.study_wait_log.append({'unit':unit, 'reason':reason, 'requested_seconds':seconds,'timestamp':utc_now()})
        json_write(self.root / 'logs' / 'study_waits.json', self.study_wait_log)
        self.log.info('Unit %02d | STUDY WAIT finished | %s', unit, reason)

    async def wait_for_current_video(self, page: Page, unit: int) -> bool:
        videos = await self.visible_video_players(page)
        if not videos: return False
        unique = sorted({(v['frame'], v['url'], v.get('poster',''), v['nearby']) for v in videos})
        key = _sha(json.dumps(unique, ensure_ascii=False))
        if key not in self.video_waited[unit]:
            self.video_waited[unit].add(key)
            example = next((v['url'] for v in videos if v['url']), '(embedded video)')
            self.log.info('Unit %02d | VIDEO DETECTED | %d visible player(s) | %s', unit, len(videos), redact_url(example)[:130])
            await self.wait_study_time(page,unit,self.args.video_wait_seconds, 'visible video before Siguiente')
        return True

    async def guarded_next_click(self, page: Page, frame: Frame, info: dict, unit: int, before: str) -> bool:
        label = (info.get('text') or info.get('hints') or 'next')[:75]
        for attempt in range(self.args.gate_retries + 1):
            if page.is_closed(): return False
            if attempt:
                await self.wait_study_time(page,unit,self.args.gate_retry_wait_seconds, f'minimum study time, retry {attempt}/{self.args.gate_retries}')
                options = await self.controls(page,'next')
                if not options: return False
                frame, info = options[0]
                label = (info.get('text') or info.get('hints') or 'next')[:75]
                before = await self.signature(page)
            clicked = await self.click_control(frame,info)
            if not clicked:
                if attempt == 0: return False
                continue
            after = await self.wait_for_state_change(page,before,1.2)
            gate = await self.study_gate_visible(page)
            if gate:
                self.log.warning('Unit %02d | NEXT BLOCKED by minimum study time: %s', unit, gate[:155])
                if attempt < self.args.gate_retries: continue
                self.log.warning('Unit %02d | study-time limit still active after %d retries; leaving page for later', unit,self.args.gate_retries)
                return False
            if before != after:
                if after not in self.visited[unit]: await self.capture_state(page,unit,f'next: {label}')
                return True
            label_info=(info.get('text','')+' '+info.get('hints',''))
            if STUDY_GATE_RE.search(label_info) and attempt < self.args.gate_retries:
                self.log.warning('Unit %02d | Next remained unchanged with a study-time tooltip; retrying',unit)
                continue
            return False
        return False

    async def try_next(self, page: Page, unit: int) -> bool:
        await self.wait_for_current_video(page, unit)
        before=await self.signature(page)
        options=await self.controls(page,'next')
        for frame, info in options[:18]:
            if page.is_closed(): return False
            if EXCLUDED_ACTION_RE.search(info.get('text','')): continue
            if await self.guarded_next_click(page,frame,info,unit,before): return True
        return False

    async def try_menu(self, page: Page, unit: int, used: set[str]) -> bool:
        if self.args.no_menu_explore: return False
        options = await self.controls(page, 'menu')
        for frame, info in options[:45]:
            key = frame.url + ' ' + info['selector'] + ' ' + info.get('text','')
            if key in used: continue
            used.add(key)
            before = await self.signature(page)
            if not await self.click_control(frame, info): continue
            after = await self.wait_for_state_change(page,before,0.65)
            if before != after and after not in self.visited[unit]:
                await self.capture_state(page, unit, 'topic menu: ' + info.get('text','')[:75])
                return True
        return False

    async def explore_course_resources(self, page: Page, unit: int) -> None:
        for label,pattern in [ ('Recursos',r'^\s*recursos\s*$'), ('Ver vídeos',r'^\s*ver v[ií]deos\s*$'), ]:
            if page.is_closed() or self.page_counts[unit]>=self.args.max_pages_per_unit: return
            clicked=False
            for frame in page.frames[:24]:
                try:
                    candidate=frame.locator('a,button,[role=button]').filter(has_text=re.compile(pattern,re.I))
                    for j in range(min(await candidate.count(),8)):
                        loc=candidate.nth(j)
                        if await loc.is_visible():
                            before=await self.signature(page)
                            await loc.click(timeout=4500,no_wait_after=True)
                            if self.args.delay_ms>0: await page.wait_for_timeout(self.args.delay_ms)
                            after=await self.wait_for_state_change(page,before,0.65)
                            if after!=before: await self.capture_state(page,unit,'resource panel: '+label)
                            clicked=True
                            break
                except Exception as exc: self.log.debug('Optional resource panel %s: %s',label,exc)
                if clicked: break

    async def walk_topic(self, page: Page, unit: int, topic: str) -> None:
        seen_here:set[str]=set()
        baseline=await self.active_topic(page)
        moved=0
        for step in range(self.args.max_next_per_topic):
            if page.is_closed() or self.page_counts[unit]>=self.args.max_pages_per_unit: break
            current=await self.signature(page)
            if current in seen_here: break
            seen_here.add(current)
            await self.explore_reveals(page,unit)
            before_active=await self.active_topic(page)
            changed=await self.try_next(page,unit)
            if not changed:
                choices=await self.controls(page,'next')
                json_write(self.root/'logs'/f'unit_{unit:02d}_next_stall.json',{ 'at':utc_now(),'topic':topic,'next_clicks':moved, 'active_topic':before_active,'frame_urls':[redact_url(f.url) for f in page.frames[:24]], 'candidates':[{'text':it.get('text',''),'selector':it.get('selector',''), 'score':it.get('score',0)} for _,it in choices[:12]] })
                self.log.warning('Unit %02d | Next stalled after %d clicks on %s; continuing via sidebar', unit,moved,topic[:75])
                break
            moved+=1
            after_active=await self.active_topic(page)
            if after_active and before_active and after_active!=before_active:
                self.log.info('Unit %02d | section transition %r -> %r',unit,before_active,after_active)
                break
            if after_active and baseline and after_active!=baseline: break
        self.log.info('Unit %02d | finished section %r | %d Next clicks',unit,topic,moved)

    async def walk_unit(self, page: Page, unit: int) -> None:
        await self.wait_for_scorm(page,unit)
        if await self.is_login_page(page):
            await self.save_lesson_diagnostic(page, unit, 'SCORM redirected to login')
            raise RuntimeError('SCORM redirected to login; lesson content was not extracted.')
        self.log.info('Unit %02d | inspecting SCORM player %s',unit,redact_url(page.url))
        if not await self.lesson_is_loaded(page):
            await self.save_lesson_diagnostic(page, unit, 'No SCORM content detected')
            self.log.warning('Unit %02d | see logs/unit_%02d_lesson_diagnostic.json for frame-by-frame evidence', unit, unit)
            raise RuntimeError('SCORM lesson content not detected (possibly a redirect, timeout, or blocked content).')
        evidence = await self.content_evidence(page)
        json_write(self.root / 'logs' / f'unit_{unit:02d}_content_evidence.json', evidence)
        await self.capture_state(page,unit,'unit opened')
        toc = await self.ensure_scorm_toc(page,unit)
        if toc:
            names=[item['text'] for _,item in toc]
            self.toc_by_unit[unit]=list(dict.fromkeys(self.toc_by_unit[unit]+names))
            self.log.info('Unit %02d | SCORM menu: %d sections: %s',unit,len(names),' | '.join(names)[:750])
            self.save_unit_progress(unit)
            tried=set()
            for _, initial in toc:
                if page.is_closed() or self.page_counts[unit]>=self.args.max_pages_per_unit: break
                name=initial['text']
                if name in tried: continue
                tried.add(name)
                target=await self.find_toc_entry(page,unit,name)
                if not target:
                    self.log.warning('Unit %02d | sidebar entry not recovered: %s',unit,name)
                    continue
                frame,info=target
                self.log.info('Unit %02d | section %d/%d: %s',unit,len(tried),len(toc),name)
                old_sig=await self.signature(page)
                if not await self.click_control(frame,info):
                    self.log.warning('Unit %02d | could not click section: %s',unit,name)
                    continue
                new_sig=await self.wait_for_state_change(page,old_sig,0.95)
                if old_sig!=new_sig: await self.capture_state(page,unit,'sidebar: '+name)
                else:
                    if self.args.delay_ms>0: await page.wait_for_timeout(self.args.delay_ms)
                    await self.capture_state(page,unit,'sidebar: '+name)
                await self.walk_topic(page,unit,name)
                self.topic_scanned[unit].add(name)
                self.save_unit_progress(unit)
            self.log.info('Unit %02d | SCORM sidebar scan finished; checking remaining Next routes.',unit)
            await self.explore_course_resources(page,unit)
        else: self.log.warning('Unit %02d | SCORM menu not detected; falling back to Next and generic menus.',unit)
        used_menu:set[str]=set()
        recent:set[str]=set()
        for _ in range(self.args.max_next_per_topic):
            if page.is_closed() or self.page_counts[unit]>=self.args.max_pages_per_unit: break
            before=await self.signature(page)
            if before in recent: break
            recent.add(before)
            await self.explore_reveals(page,unit)
            if await self.try_next(page,unit): continue
            if not toc and await self.try_menu(page,unit,used_menu): continue
            break
        status = ('safety_page_limit' if self.page_counts[unit]>=self.args.max_pages_per_unit else 'navigation_exhausted' if self.page_counts[unit]>0 else 'empty_extraction')
        self.save_unit_progress(unit,status)
        self.log.info('Unit %02d | stopped (%s); saved %d states, discovered %d media links', unit,status,self.page_counts[unit],len(self.media_by_unit[unit]))

    def save_summary(self) -> None:
        requested = parse_units(self.args.units)
        extracted = [u for u in requested if self.page_counts[u]>0]
        missing = [u for u in requested if self.page_counts[u]==0]
        with (self.root/'coverage_summary.csv').open('w', newline='', encoding='utf-8') as f:
            writer=csv.writer(f)
            writer.writerow(['unit','saved_states','sidebar_discovered','sidebar_scanned', 'media_links','status'])
            for u in requested: writer.writerow([u,self.page_counts[u],len(self.toc_by_unit[u]), len(self.topic_scanned[u]),len(self.media_by_unit[u]), self.unit_results.get(str(u),{}).get('status','not_attempted')])
        json_write(self.root / 'manifest.json', { 'generated_at':utc_now(), 'source':BASE_URL, 'requested_units':requested,'units_with_saved_content':extracted, 'units_without_saved_content':missing, 'result':'no_course_content' if not extracted else 'partial' if missing else 'content_extracted_not_certified_complete', 'scope':'authenticated course index + Contenido unidad 1-13 only', 'units':self.unit_results, 'total_saved_states':sum(self.page_counts.values()), 'assets_captured':len(self.asset_records), 'media_links':sum(len(x) for x in self.media_by_unit.values()), 'linked_downloads_attempted':len(self.download_seen), 'errors':self.errors, })
        json_write(self.root / 'assets_manifest.json', self.asset_records)
        lines = ['# MentoAula local course export', '', 'The export includes a course overview, saved lesson states, raw HTML,', 'visible text, structured JSON, screenshots, browser assets and linked resources.', '', '## Units', '']
        for k, info in sorted(self.unit_results.items(), key=lambda item:int(item[0])): lines.append(f"- Unit {int(k):02d}: {info['saved_states']} states; {info['status']}")
        lines += ['', '## Notes', '', '- `navigation_exhausted` means no more **safe automated** controls were found; it does not certify full course completion.', '- Some interactive lessons, videos, canvas text, blocked quizzes or gated pages require manual review.', '- HTML/JSON may contain student data or temporary session values. Keep this folder private.', '- Check `logs/scraper.log` and the screenshots for anything missed.', '']
        write_text(self.root / 'README_EXPORT.md', '\n'.join(lines))
        for unit,network in self.network_by_unit.items(): json_write(self.root/'units'/f'unidad_{unit:02d}'/'network_media.json',list(network.values()))

import contextvars
import collections
import time
import heapq
import random
import signal
import threading
import traceback
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from typing import Optional

try: import psutil
except ImportError as error: raise SystemExit('Missing psutil. Install: python -m pip install psutil playwright') from error

sys.dont_write_bytecode = True

ACCOUNTS = (
    ('AY6677383Z', 'Mentoaula7383'), ('CZ1404249N', 'Mentoaula4249'), ('UZ3686258F', 'Mentoaula6258'), ('AY3333971C', 'Mentoaula3971'), ('A31917609A', 'Mentoaula7609'), ('MY0077187J', 'Mentoaula7187'), ('AZ0987412G', 'Mentoaula7412'), ('AY7074144W', 'Mentoaula4144'), ('PZ0941874Y', 'Mentoaula1874'), ('TY9631200X', 'Mentoaula1200'), ('MY7253846M', 'Mentoaula3846'), ('KY5927553F', 'Mentoaula7553'), ('AY6977997H', 'Mentoaula7997'), ('GY1247449N', 'Mentoaula7449'), ('MY8442360V', 'Mentoaula2360'), ('MY8967725Q', 'Mentoaula7725'), ('SZ3388168C', 'Mentoaula8168'), ('MY6306123C', 'Mentoaula6123'), ('SY8944954S', 'Mentoaula4954'), ('G24555247X', 'Mentoaula5247'), ('M31924836P', 'Mentoaula4836'), ('BZ0076857L', 'Mentoaula6857'), ('FZ0378996F', 'Mentoaula8996'), ('MY7946493F', 'Mentoaula6493'), ('SY6887616G', 'Mentoaula7616'), ('JZ3995527H', 'Mentoaula5527'), ('MY1936511V', 'Mentoaula6511'), ('MZ0592349N', 'Mentoaula2349'), ('TY3333733N', 'Mentoaula3733'), ('SY4049934Q', 'Mentoaula9934'), ('M60049813X', 'Mentoaula9813'), ('SX4461560C', 'Mentoaula1560'), ('RY1075568X', 'Mentoaula5568'), ('UZ3441388H', 'Mentoaula1388'), ('GZ0145367N', 'Mentoaula5367'), ('KY0346526E', 'Mentoaula6526'), ('SY1781138D', 'Mentoaula1138'), ('NY6887632C', 'Mentoaula7632'), ('ZY9014984X', 'Mentoaula4984'), ('AX3203162K', 'Mentoaula3162'), ('ZZ0297697J', 'Mentoaula7697'), ('MZ1634335Y', 'Mentoaula4335'), ('SY9118104K', 'Mentoaula8104'), ('AX5554093F', 'Mentoaula4093'), ('ZY9002092K', 'Mentoaula2092'), ('AY3864633A', 'Mentoaula4633'), ('SY8042436V', 'Mentoaula2436'), ('DZ0597856E', 'Mentoaula7856'), ('M06314752X', 'Mentoaula4752'), ('HZ3604939Q', 'Mentoaula4939'), ('MZ0812830S', 'Mentoaula2830'), ('IY5519168X', 'Mentoaula9168'), ('SY5190468A', 'Mentoaula0468'), ('NX4268506M', 'Mentoaula8506'), ('SY1887743D', 'Mentoaula7743'), ('AZ4239973C', 'Mentoaula9973'), ('YY8013789M', 'Mentoaula3789'), ('AZ3562834R', 'Mentoaula2834'), ('MY6781509L', 'Mentoaula1509'), ('J26611206E', 'Mentoaula1206'), ('AZ3034099J', 'Mentoaula4099'), ('NZ4796614S', 'Mentoaula6614'), ('G39407254C', 'Mentoaula7254'), ('BZ4616363S', 'Mentoaula6363'), ('GZ4029365T', 'Mentoaula9365'), ('SY0360977Y', 'Mentoaula0977'), ('AY2337615R', 'Mentoaula7615'), ('AY9248031K', 'Mentoaula8031'), ('GZ2760289H', 'Mentoaula0289'), ('AZ0849940A', 'Mentoaula9940'), ('SY6751387G', 'Mentoaula1387'), ('LZ0663433A', 'Mentoaula3433'), ('FZ0622850S', 'Mentoaula2850'), ('AX3830923C', 'Mentoaula0923'), ('IZ5322064F', 'Mentoaula2064'), ('SZ5271225K', 'Mentoaula1225'),
)
assert len(ACCOUNTS) == 76 and len({u for u,_ in ACCOUNTS}) == 76
ACCOUNT_BY_ID = dict(ACCOUNTS)
ACCOUNT_CONTEXT = contextvars.ContextVar('mentoaula_worker_id', default='')
_GIB = 1024**3

def json_write_dummy(*_args, **_kwargs): return None
def write_text_dummy(*_args, **_kwargs): return None

def utc_iso(): return datetime.now(timezone.utc).isoformat(timespec='seconds')

def atomic_json(path: Path, obj: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix('.tmp')
    temp.write_text(json.dumps(obj, ensure_ascii=False, indent=2, sort_keys=True), encoding='utf-8')
    os.replace(temp, path)

def pretty_seconds(duration):
    duration=max(0,int(duration))
    return f'{duration//86400}d {(duration%86400)//3600}h {(duration%3600)//60}m'

def target_seconds(username, min_hours:float, max_hours:float):
    token=int(hashlib.sha256(('mentoaula-v11:'+username).encode()).hexdigest()[:14],16)
    portion = token / float(0xFFFFFFFFFFFFFF)
    return (min_hours + portion*(max_hours-min_hours))*3600.0

class UserLogRouter(logging.Handler):
    def __init__(self, directory:Path, console_verbose=False):
        super().__init__(logging.INFO)
        self.directory=directory
        self.console_verbose=console_verbose
        self.handles={}
        self.mutex=threading.Lock()
        self._formatter=logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')

    def emit(self, record):
        ident=ACCOUNT_CONTEXT.get()
        msg=self._formatter.format(record)
        msg=re.sub(r'(ScormPlayer\.aspx)\?\S+',r'\1?[redacted]',msg,flags=re.I)
        msg=re.sub(r'(?i)(password|passwd|contrase.na|token)=\S+',r'\1=[redacted]',msg)
        with self.mutex:
            if ident:
                try:
                    if ident not in self.handles:
                        folder=self.directory/ident
                        folder.mkdir(parents=True, exist_ok=True)
                        self.handles[ident]=(folder/'events.log').open('a',encoding='utf-8',buffering=1)
                    self.handles[ident].write(msg+'\n')
                except Exception: pass
            if self.console_verbose or not ident or record.levelno>=logging.WARNING:
                print((f'[{ident}] ' if ident else '')+msg,flush=True)

    def close(self):
        with self.mutex:
            for fh in self.handles.values():
                try:fh.close()
                except OSError: pass
            self.handles.clear()
        super().close()

@dataclass
class AccountState:
    username:str
    seconds:float
    completed_units:list[int]=field(default_factory=list)
    status:str='pending'
    unit_current:int=0
    nav_states:int=0
    topic_count:int=0
    last_action:str=''
    unit_started_monotonic:float=0.0
    session_started_monotonic:float=0.0
    current_attempt:int=0
    total_retries:int=0
    last_error:str=''
    launched_at:str=''
    updated_at:str=''
    finished_at:str=''
    persisted_at:str=''

    def progress_record(self):
        return { 'account':self.username, 'status':self.status, 'target_session_hours':round(self.seconds/3600,3), 'completed_unit_navigations':self.completed_units, 'completed_unit_count':len(self.completed_units), 'total_units':13, 'current_unit':self.unit_current, 'current_unit_states':self.nav_states, 'current_unit_toc_entries':self.topic_count, 'last_navigation_action':self.last_action, 'retries':self.total_retries, 'last_error':self.last_error[:300], 'session_started_at':self.launched_at, 'updated_at':utc_iso(), 'finished_at':self.finished_at, 'description':'NAVIGATION ONLY; not a training certificate or proof of human attendance.' }

EXPECTED_STATES={1:110,2:97,3:350,4:83,5:82,6:61,7:65,8:68,9:105,10:135,11:1053,12:658,13:159}

def navigator_arguments(opts):
    return argparse.Namespace( username=None, credentials_file='(not used)',prompt_password=False, manual_login=False,login_timeout_ms=35000,headless=not opts.headed, slow_mo=0,units='1-13',output='(disabled)', no_assets=True,no_scripts=True,no_downloads=True, no_reveals=opts.no_reveals,no_menu_explore=False, max_pages_per_unit=opts.max_pages_per_unit, max_next_per_topic=opts.max_next_per_topic, max_reveals_per_page=opts.max_reveals_per_page, delay_ms=0,video_wait_seconds=opts.video_wait_seconds, gate_retry_wait_seconds=opts.gate_retry_wait_seconds, gate_retries=opts.gate_retries,wait_log_every=opts.wait_log_every, scroll_steps=0,screenshots='none',fresh=False,skip_completed=False, max_assets=0,max_download_mb=0,scrapling=False,strict_coverage=False )

class LoadNavigator(Exporter):
    def __init__(self, account:AccountState, opts, progress_callback):
        self.account=account
        self.opts=opts
        self.args=navigator_arguments(opts)
        self.root=Path('(never-created)')
        self.log=logging.getLogger('mentoaula.loadtest')
        self.browser=None
        self.context=None
        self.main=None
        self.index_url=INDEX_URL
        self.page_counts=defaultdict(int)
        self.visited=defaultdict(set)
        self.errors=[]
        self.unit_results={}
        self.asset_tasks=set()
        self.asset_semaphore=asyncio.Semaphore(1)
        self.asset_seen=set()
        self.asset_records=[]
        self.download_seen=set()
        self.current_unit=None
        self.unit_links={}
        self.media_by_unit=defaultdict(dict)
        self.toc_by_unit=defaultdict(list)
        self.topic_scanned=defaultdict(set)
        self.current_action=''
        self.run_started=utc_now()
        self.network_by_unit=defaultdict(dict)
        self.reauth_attempts=0
        self.kept_scorm_pages=[]
        self.video_waited=defaultdict(set)
        self.study_wait_log=[]
        self._progress_callback=progress_callback
        self.unit_budget=account.seconds/13
        self._pacing_start=0.0
        self._pace_count=0

    def get_credentials(self): return self.account.username, ACCOUNT_BY_ID[self.account.username]

    async def dismiss_welcome_tour(self, max_wait_seconds: float = 2.5) -> bool:
        if not self.main or self.main.is_closed(): return False
        deadline = asyncio.get_running_loop().time() + max(0, max_wait_seconds)
        while True:
            for frame in self.main.frames[:30]:
                try:
                    tooltip = frame.locator('#my-tour-tooltip').first
                    if not await tooltip.count() or not await tooltip.is_visible(): continue
                    finish = frame.locator('#my-tour-button-finish').first
                    if not await finish.count(): raise RuntimeError('First-visit tour is visible, but Finalizar button is missing.')
                    self.log.info('WELCOME TOUR | first-visit overlay detected; clicking Finalizar')
                    try:
                        await finish.click(timeout=6000, no_wait_after=True)
                        await tooltip.wait_for(state='hidden', timeout=5000)
                    except PlaywrightError as exc: raise RuntimeError('Unable to dismiss first-visit campus tour using Finalizar: '+type(exc).__name__) from None
                    self.log.info('WELCOME TOUR | dismissed successfully; unit controls are accessible')
                    return True
                except RuntimeError: raise
                except PlaywrightError: continue
            if asyncio.get_running_loop().time() >= deadline: return False
            await asyncio.sleep(0.20)

    async def login(self):
        await super().login()
        await self.dismiss_welcome_tour(max_wait_seconds=2.5)

    async def goto_index(self):
        await super().goto_index()
        await self.dismiss_welcome_tour(max_wait_seconds=0.8)

    async def start(self,pw):
        self.browser=await pw.chromium.launch(headless=self.args.headless, slow_mo=0, args=['--disable-extensions','--disable-background-networking'])
        self.context=await self.browser.new_context(viewport={'width':1200,'height':800}, accept_downloads=False,locale='es-ES',service_workers='allow')
        self.context.set_default_timeout(12000)
        self.main=await self.context.new_page()
        self.main.set_default_navigation_timeout(45000)
        await self.main.goto(BASE_URL,wait_until='domcontentloaded',timeout=45000)

    def _on_response(self,response):return
    async def capture_home(self):return
    async def screenshot(self,*_args,**_kwargs):return
    async def download_documents(self,*_args,**_kwargs):return
    async def content_evidence(self,page):
        rows = await super().content_evidence(page)
        for row in rows:
            row.pop('text_sample', None)
            row.pop('title', None)
        return rows

    async def save_login_diagnostics(self,message): self.log.error('Login diagnostic (no lesson or screenshot saved): %s',message)

    async def save_lesson_diagnostic(self,page,unit,reason):
        rows=await self.content_evidence(page)
        brief=[{'path':r.get('path','')[:110], 'text_chars':r.get('text_chars',0), 'is_meaningful':r.get('is_meaningful',False), 'iframe_count':r.get('iframe_count',0)} for r in rows[:12]]
        self.log.error('Unit %02d lesson diagnostic (NO lesson content stored): %s | frames=%d | frame_metadata=%s',unit,reason,len(rows),brief)
    def save_unit_progress(self,unit,status='in_progress'): self._progress_callback(self, unit, status)
    def save_summary(self):return

    async def capture_state(self,page,unit,action,force=False):
        if page.is_closed() or self.page_counts[unit]>=self.args.max_pages_per_unit: return False
        sig=await self.signature(page)
        if not force and sig in self.visited[unit]:return False
        if await self.is_login_page(page):return False
        self.visited[unit].add(sig)
        self.page_counts[unit]+=1
        self.current_action=action
        self._pace_count+=1
        self.account.nav_states=self.page_counts[unit]
        self.account.last_action=action[:140]
        self.account.topic_count=len(self.topic_scanned[unit])
        if self.page_counts[unit]%25==0: self.log.info('Unit %02d: %d distinct states, %d/%d sections',unit, self.page_counts[unit],len(self.topic_scanned[unit]),len(self.toc_by_unit[unit]))
        if self.opts.pacing_enabled:
            expected=max(1,EXPECTED_STATES.get(unit,80))
            nominal=self.unit_budget*0.84/expected
            dwell=min(self.opts.max_dwell_seconds,max(self.opts.min_dwell_seconds,nominal))
            left=max(0,self._pacing_start+self.unit_budget-time.monotonic())
            if dwell>0 and left>0: await asyncio.sleep(min(dwell,left))
        return True

    async def wait_study_time(self,page,unit,seconds,reason):
        if seconds<=0:return
        self.log.info('Unit %02d study/video waiting %ds: %s',unit,seconds,reason)
        await asyncio.sleep(seconds)

    async def run_single_unit(self, unit:int):
        self.current_unit=unit
        self.account.unit_current=unit
        self.account.unit_started_monotonic=time.monotonic()
        self.account.nav_states=0
        self.account.topic_count=0
        self.account.last_action='opening unit'
        self._pacing_start=time.monotonic()
        self._pace_count=0
        lesson=None
        try:
            lesson=await self.open_unit(unit)
            if lesson is None: raise RuntimeError(f'Unit {unit} did not open a SCORM popup')
            await self.walk_unit(lesson,unit)
            count=self.page_counts[unit]
            if count == 0: raise RuntimeError(f'Unit {unit} contained no detected lesson states')
            if count>=self.opts.max_pages_per_unit:
                self.log.warning(f'Unit {unit} reached state safety cap: {count}, but continuing.')
            missing=set(self.toc_by_unit[unit])-self.topic_scanned[unit]
            if missing:
                self.log.warning('Unit %02d: %d discovered menu entries were not traversed',unit,len(missing))
            self.account.topic_count=len(self.topic_scanned[unit])
            self.log.info('Unit %02d navigation end: %d states, %d/%d menu entries visited',unit, count,len(self.topic_scanned[unit]),len(self.toc_by_unit[unit]))
            if self.opts.pacing_enabled:
                remain=self._pacing_start+self.unit_budget-time.monotonic()
                if remain>0:
                    self.log.info('Unit %02d paced dwell remaining: %s',unit,pretty_seconds(remain))
                    await asyncio.sleep(remain)
            return count
        finally:
            self.current_unit=None
            if lesson and lesson is not self.main and not lesson.is_closed():
                if lesson not in self.kept_scorm_pages: self.kept_scorm_pages.append(lesson)

    async def close(self):
        try:
            if self.context: await asyncio.wait_for(self.context.close(),timeout=12)
        except Exception: pass
        try:
            if self.browser: await asyncio.wait_for(self.browser.close(),timeout=12)
        except Exception: pass

class LoadScheduler:
    def __init__(self, opts):
        self.opts=opts
        self.log_root=Path(opts.log_dir).resolve()
        self.log_root.mkdir(parents=True,exist_ok=True)
        self.states={}
        selected_accounts=ACCOUNTS[:opts.limit_accounts] if opts.limit_accounts else ACCOUNTS
        for name,password in selected_accounts:
            state=AccountState(name,target_seconds(name,opts.min_hours,opts.max_hours))
            file=self.log_root/name/'progress.json'
            if opts.resume and file.is_file():
                try:
                    previous=json.loads(file.read_text(encoding='utf-8'))
                    state.completed_units=sorted({int(u) for u in previous.get('completed_unit_navigations',[]) if 1<=int(u)<=13})
                    if previous.get('status')=='navigation_complete' and len(state.completed_units)==13:
                        state.status='navigation_complete'
                        state.finished_at=previous.get('finished_at','')
                except (OSError,ValueError,KeyError,TypeError):pass
            self.states[name]=state
        self.pending=collections.deque(s.username for s in self.states.values() if s.status!='navigation_complete')
        self.tasks={}
        self.peak_rss=0
        self.started=time.monotonic()
        self.stop_requested=False
        self.global_last_admit=-1e12
        self.last_progress_write={}
        self.dynamic_max_users=opts.max_users
        self.evicted_workers=set()
        self.pressure_checks=0
        self.last_eviction=0.0
        self.last_mem_per_worker_gb=opts.worker_budget_gb
        self.healthy_checks=0
        self.previous_cpu=0.0
        self.last_monitor=None
        self.router=UserLogRouter(self.log_root,console_verbose=opts.verbose)
        self.log=logging.getLogger('mentoaula.loadtest')

    def init_logging(self):
        for name in ('mentoaula','mentoaula.loadtest'):
            logger=logging.getLogger(name)
            logger.handlers.clear()
            logger.setLevel(logging.INFO)
            logger.propagate=True
        root=logging.getLogger()
        root.handlers.clear()
        root.setLevel(logging.INFO)
        root.addHandler(self.router)

    def record(self,state:AccountState,urgent=False):
        now=time.monotonic()
        if not urgent and now-self.last_progress_write.get(state.username,0)<self.opts.progress_seconds: return
        state.updated_at=utc_iso()
        atomic_json(self.log_root/state.username/'progress.json',state.progress_record())
        self.last_progress_write[state.username]=now

    def progress_hook(self, nav:LoadNavigator, unit:int,status:str):
        state=nav.account
        state.nav_states=nav.page_counts[unit]
        state.topic_count=len(nav.topic_scanned[unit])
        self.record(state)

    def health(self):
        vm=psutil.virtual_memory()
        available=vm.available/_GIB
        total=vm.total/_GIB
        usage=vm.percent
        cpu=psutil.cpu_percent(interval=None)
        try:
            root=psutil.Process(os.getpid())
            procs=[root]+root.children(recursive=True)
        except psutil.Error: procs=[]
        rss=0
        uss=0
        for proc in procs:
            try:
                mi=proc.memory_info()
                rss+=mi.rss
                try:uss+=proc.memory_full_info().uss
                except Exception:pass
            except psutil.Error:pass
        self.peak_rss=max(self.peak_rss,rss)
        count=max(1,len(self.tasks))
        observed=(rss/_GIB)/count if self.tasks else 0.0
        self.last_mem_per_worker_gb=max(self.opts.worker_budget_gb, observed*self.opts.overhead_factor)
        result=dict(total=total,available=available,used_pct=usage,cpu=cpu, rss=rss/_GIB,uss=uss/_GIB,worker_budget=self.last_mem_per_worker_gb, sessions=len(self.tasks),commit_ok=True)
        self.last_monitor=result
        return result

    def can_admit(self,m):
        if self.stop_requested or not self.pending:return False
        if len(self.tasks)>=self.dynamic_max_users:return False
        if time.monotonic()-self.global_last_admit<self.opts.launch_interval_seconds:return False
        reserve=max(self.opts.reserve_gb, m['total']*self.opts.reserve_fraction)
        required=reserve+m['worker_budget']
        if m['available']<required:return False
        if m['cpu']>self.opts.cpu_ceiling:return False
        if m['used_pct']>self.opts.ram_ceiling:return False
        if self.healthy_checks<self.opts.healthy_checks:return False
        return True

    def estimated_eta_seconds(self):
        now=time.monotonic()
        maxc=max(1,self.dynamic_max_users)
        ready=[]
        for name in self.tasks:
            s=self.states[name]
            remaining_units=13-len(s.completed_units)
            if s.status=='navigation_complete':continue
            base=s.seconds*remaining_units/13
            if s.unit_started_monotonic:
                elapsed=now-s.unit_started_monotonic
                base=max(0,base-min(elapsed,s.seconds/13))
            ready.append(max(0,base))
        while len(ready)<maxc:ready.append(0)
        heapq.heapify(ready)
        for name in self.pending:
            s=self.states[name]
            remaining_units=13-len(s.completed_units)
            job=s.seconds*remaining_units/13
            earliest=heapq.heappop(ready)
            heapq.heappush(ready,earliest+job+self.opts.launch_interval_seconds)
        return max(ready,default=0)

    async def user_task(self, user_name:str):
        state=self.states[user_name]
        token=ACCOUNT_CONTEXT.set(user_name)
        nav=None
        state.status='running'
        state.session_started_monotonic=time.monotonic()
        state.launched_at=utc_iso()
        state.current_attempt+=1
        self.record(state,urgent=True)
        try:
            async with async_playwright() as pw:
                nav=LoadNavigator(state,self.opts,self.progress_hook)
                nav.get_credentials()
                await nav.start(pw)
                await nav.login()
                if 'IndexIF.aspx' in nav.main.url:nav.index_url=nav.main.url
                else:await nav.goto_index()
                await nav.wait_for_dashboard_units(minimum=1,seconds=15)
                await nav.catalog_dashboard_units()
                
                for unit in range(1,14):
                    if unit in state.completed_units:continue
                    if self.stop_requested: raise asyncio.CancelledError()
                    
                    unit_success = False
                    for attempt in range(self.opts.max_retries + 1):
                        try:
                            self.log.info('BEGIN unit %02d/13 (attempt %d/%d). Target total %.2f hours',unit, attempt+1, self.opts.max_retries+1, state.seconds/3600)
                            
                            # Reset state for this unit in case of retry
                            nav.visited[unit].clear()
                            nav.page_counts[unit] = 0
                            nav.toc_by_unit[unit].clear()
                            nav.topic_scanned[unit].clear()
                            nav.media_by_unit[unit].clear()
                            
                            # Ensure previous lesson popups for this unit are closed (except dashboard)
                            for p in nav.context.pages:
                                if p is not nav.main and not p.is_closed():
                                    try: await p.close()
                                    except: pass
                                    
                            await nav.run_single_unit(unit)
                            unit_success = True
                            break
                        except Exception as e:
                            self.log.warning('Unit %02d failed (attempt %d/%d): %s', unit, attempt+1, self.opts.max_retries+1, str(e)[:150])
                            if attempt == self.opts.max_retries:
                                self.log.error('Unit %02d completely failed after max retries. Skipping.', unit)
                                break
                            await asyncio.sleep(5) # Short delay before retry

                    if unit_success:
                        state.completed_units.append(unit)
                        state.completed_units.sort()
                        self.log.info('NAVIGATED unit %02d/13; %d units navigated',unit,len(state.completed_units))
                    else:
                        state.last_error = f'Unit {unit} failed after max retries'
                        
                    self.record(state,urgent=True)
                
                state.status='navigation_complete'
                state.unit_current=0
                state.finished_at=utc_iso()
                self.record(state,urgent=True)
                self.log.info('ALL 13 units traversed (automated load-test navigation only).')
        except asyncio.CancelledError:
            state.status='interrupted'
            state.last_error='Interrupted; resuming from last finished unit on next run'
            self.record(state,urgent=True)
            raise
        except Exception as exc:
            state.status='error'
            state.last_error=f'{type(exc).__name__}: {str(exc)[:200]}'
            state.total_retries+=1
            self.log.error('Account session failed: %s',state.last_error)
            self.record(state,urgent=True)
        finally:
            try:
                if nav:await nav.close()
            except Exception:pass
            ACCOUNT_CONTEXT.reset(token)

    async def heartbeat(self):
        while not self.stop_requested:
            await asyncio.sleep(self.opts.monitor_seconds)
            m=await asyncio.to_thread(self.health)
            required=max(self.opts.reserve_gb,m['total']*self.opts.reserve_fraction)+m['worker_budget']
            if m['available']>=required and m['used_pct']<=self.opts.ram_ceiling and m['cpu']<=self.opts.cpu_ceiling: self.healthy_checks+=1
            else:self.healthy_checks=0
            for name in self.tasks: self.record(self.states[name])
            completed=sum(s.status=='navigation_complete' for s in self.states.values())
            failed=sum(s.status=='failed' for s in self.states.values())
            eta=self.estimated_eta_seconds()
            snapshot={ 'timestamp':utc_iso(),'total_accounts':len(self.states), 'navigated_all_units':completed,'failed_accounts':failed, 'active_accounts':len(self.tasks),'queued_accounts':len(self.pending), 'dynamic_session_limit':self.dynamic_max_users, 'total_units_navigated':sum(len(s.completed_units) for s in self.states.values()), 'total_unit_navigations_expected':13*len(self.states), 'estimated_time_remaining_hours':round(eta/3600,2), 'estimated_finish_utc':(datetime.now(timezone.utc)+timedelta(seconds=eta)).isoformat(timespec='seconds'), 'estimate_notice':'Optimistic scheduling estimate; resource pressure and failures can extend it.', 'system':m, 'active_ids':list(self.tasks) }
            atomic_json(self.log_root/'summary.json',snapshot)
            print(f'[STATUS] active {len(self.tasks):2d}/{self.dynamic_max_users} | queue {len(self.pending):2d} | '
                  f'accounts navigated {completed:2d}/{len(self.states)} | units {snapshot["total_units_navigated"]}/{13*len(self.states)} | '
                  f'RAM available {m["available"]:.1f} GiB | tree RSS {m["rss"]:.1f} GiB | '
                  f'CPU {m["cpu"]:.0f}% | ETA {pretty_seconds(eta)}',flush=True)

    async def run(self):
        self.init_logging()
        psutil.cpu_percent(interval=None)
        print('MentoAula V11.1: authorised browser load-test mode. No lesson content exported.',flush=True)
        print('Navigation-only evidence; never treat this as human training completion.',flush=True)
        print(f'Accounts: {len(self.states)} (excluding previously handled account) | cap: {self.opts.max_users} | target: {self.opts.min_hours:g}–{self.opts.max_hours:g}h per account',flush=True)
        print(f'Only operational logs written to: {self.log_root}',flush=True)
        self.health()
        beat=asyncio.create_task(self.heartbeat())
        try:
            while self.pending or self.tasks:
                await asyncio.sleep(self.opts.monitor_seconds)
                if self.opts.max_runtime_minutes and time.monotonic()-self.started>=self.opts.max_runtime_minutes*60:
                    print('[STOP] Requested time-box reached; saving per-account checkpoints.',flush=True)
                    break
                for name,task in list(self.tasks.items()):
                    if task.done():
                        try:task.result()
                        except asyncio.CancelledError:pass
                        except Exception as exc: print(f'[WARN] Unexpected worker error {type(exc).__name__}',flush=True)
                        self.tasks.pop(name,None)
                        state=self.states[name]
                        if name in self.evicted_workers:
                            self.evicted_workers.remove(name)
                            self.pending.append(name)
                            state.status='queued_low_ram'
                            self.record(state,urgent=True)
                        elif state.status not in ('navigation_complete','interrupted'):
                            if state.total_retries<=self.opts.max_retries:
                                self.pending.append(name)
                                state.status='queued_retry'
                                self.record(state,urgent=True)
                            else:
                                state.status='failed'
                                self.record(state,urgent=True)
                m=await asyncio.to_thread(self.health)
                reserve=max(self.opts.reserve_gb,m['total']*self.opts.reserve_fraction)
                if m['available']>=reserve+m['worker_budget'] and m['cpu']<=self.opts.cpu_ceiling and m['used_pct']<=self.opts.ram_ceiling: self.healthy_checks+=1
                else:self.healthy_checks=0
                critical=(m['available']<self.opts.critical_free_gb or m['used_pct']>=self.opts.critical_ram_percent or m['cpu']>=self.opts.critical_cpu_percent)
                self.pressure_checks=(self.pressure_checks+1 if critical else 0)
                if self.pressure_checks>=2 and len(self.tasks)>1:
                    victim=max(self.tasks,key=lambda k:self.states[k].session_started_monotonic)
                    self.dynamic_max_users=max(1,len(self.tasks)-1)
                    self.evicted_workers.add(victim)
                    self.tasks[victim].cancel()
                    self.last_eviction=time.monotonic()
                    self.pressure_checks=0
                    print(f'[PRESSURE] RAM/CPU near critical levels; suspending {victim} and reducing concurrency ceiling to {self.dynamic_max_users}.',flush=True)
                if (self.dynamic_max_users<self.opts.max_users and not critical and time.monotonic()-self.last_eviction>=900 and m['available']>max(self.opts.reserve_gb,m['total']*self.opts.reserve_fraction)+ 2*m['worker_budget'] and m['cpu']<50):
                    self.dynamic_max_users+=1
                    self.last_eviction=time.monotonic()
                    print(f'[RECOVER] Raised allowed concurrency to {self.dynamic_max_users}',flush=True)
                if self.can_admit(m):
                    name=self.pending.popleft()
                    print(f'[ADMIT] {name} | now {len(self.tasks)+1}/{self.dynamic_max_users} | RAM available {m["available"]:.2f} GiB | estimated new worker {m["worker_budget"]:.2f} GiB | OS reserve {reserve:.1f} GiB',flush=True)
                    self.tasks[name]=asyncio.create_task(self.user_task(name),name=f'worker-{name}')
                    self.global_last_admit=time.monotonic()
                    self.healthy_checks=0
                if not self.tasks and self.pending and time.monotonic()-self.started>self.opts.no_capacity_timeout_minutes*60:
                    if m['available']<reserve+m['worker_budget']:
                        print('[PAUSED] Insufficient free RAM to start even one worker. Waiting for applications to release memory.',flush=True)
                        self.started=time.monotonic()
            completed=sum(s.status=='navigation_complete' for s in self.states.values())
            failed=sum(s.status=='failed' for s in self.states.values())
            print(f'RUN ENDED: {completed} accounts navigated all 13 units; {failed} failures; See {self.log_root}',flush=True)
        except KeyboardInterrupt:
            self.stop_requested=True
        finally:
            self.stop_requested=True
            for task in self.tasks.values():task.cancel()
            if self.tasks:await asyncio.gather(*self.tasks.values(),return_exceptions=True)
            beat.cancel()
            await asyncio.gather(beat,return_exceptions=True)
            self.router.close()

def loadtest_options():
    p=argparse.ArgumentParser(description='V11.1 adaptive concurrent MentoAula authorised navigation load test')
    p.add_argument('--max-users',type=int,default=12,help='Maximum simultaneous browser users (default 12, hard max 16)')
    p.add_argument('--limit-accounts',type=int,default=0,help='Only run the first N accounts for bounded pilot (default 0 = all 76)')
    p.add_argument('--max-runtime-minutes',type=float,default=0,help='Stop gracefully after N minutes (default 0 = no time limit)')
    p.add_argument('--min-hours',type=float,default=29)
    p.add_argument('--max-hours',type=float,default=35)
    p.add_argument('--reserve-gb',type=float,default=6.0,help='Physical RAM kept available to Windows')
    p.add_argument('--reserve-fraction',type=float,default=0.18)
    p.add_argument('--worker-budget-gb',type=float,default=1.5,help='Estimated GiB cost of another browser session')
    p.add_argument('--overhead-factor',type=float,default=1.35)
    p.add_argument('--cpu-ceiling',type=float,default=75.0,help='No admission above this system CPU percent')
    p.add_argument('--ram-ceiling',type=float,default=83.0,help='No admission above this system RAM percent')
    p.add_argument('--critical-free-gb',type=float,default=3.0,help='Emergency RAM headroom threshold')
    p.add_argument('--critical-ram-percent',type=float,default=91.0)
    p.add_argument('--critical-cpu-percent',type=float,default=95.0)
    p.add_argument('--launch-interval-seconds',type=float,default=120,help='Stagger worker starts')
    p.add_argument('--healthy-checks',type=int,default=2)
    p.add_argument('--monitor-seconds',type=float,default=15)
    p.add_argument('--progress-seconds',type=float,default=60)
    p.add_argument('--max-retries',type=int,default=2)
    p.add_argument('--no-capacity-timeout-minutes',type=float,default=20)
    p.add_argument('--log-dir',default='mentoaula_load_logs')
    p.add_argument('--min-dwell-seconds',type=float,default=0)
    p.add_argument('--max-dwell-seconds',type=float,default=600)
    p.add_argument('--no-pacing',dest='pacing_enabled',action='store_false',help='FAST smoke test, do not enforce 29–35 hour schedule')
    p.add_argument('--video-wait-seconds',type=int,default=180)
    p.add_argument('--gate-retry-wait-seconds',type=int,default=60)
    p.add_argument('--gate-retries',type=int,default=4)
    p.add_argument('--max-pages-per-unit',type=int,default=1600)
    p.add_argument('--max-next-per-topic',type=int,default=250)
    p.add_argument('--max-reveals-per-page',type=int,default=20)
    p.add_argument('--wait-log-every',type=int,default=60)
    p.add_argument('--headed',action='store_true')
    p.add_argument('--no-reveals',action='store_true')
    p.add_argument('--verbose',action='store_true',help='Print each browser navigation log to console')
    p.add_argument('--no-resume',dest='resume',action='store_false')
    p.add_argument('--list-accounts',action='store_true',help='Print account count and usernames (NOT passwords), then exit')
    p.add_argument('--dry-run',action='store_true',help='Inspect schedule/machine without launching logins')
    args=p.parse_args()
    if args.limit_accounts<0 or args.limit_accounts>76 or args.max_runtime_minutes<0: p.error('limit-accounts must be 0..76 and max-runtime-minutes must be >=0')
    if not 1<=args.max_users<=30: p.error('max-users must be 1 to 30. Increase only after a real multi-account benchmark.')
    if not 0<args.min_hours<=args.max_hours<=1000:p.error('invalid hours')
    if args.reserve_gb<3 or args.worker_budget_gb<0.5 or args.launch_interval_seconds<0: p.error('Reserve at least 4 GiB and estimate at least 0.5 GiB per worker')
    if args.critical_free_gb<2 or args.critical_ram_percent<=args.ram_ceiling or args.critical_cpu_percent<=args.cpu_ceiling: p.error('Critical thresholds must exceed admission thresholds; critical free RAM >=2 GiB')
    if args.monitor_seconds<3 or args.healthy_checks<1 or args.max_dwell_seconds<0 or args.max_retries<0: p.error('invalid monitor, dwell or retry parameters')
    return args

async def v11_main():
    opts=loadtest_options()
    if opts.list_accounts:
        print('Queued accounts:',len(ACCOUNTS))
        for username,_ in ACCOUNTS:print(username)
        return
    if opts.dry_run:
        mem=psutil.virtual_memory()
        reserve=max(opts.reserve_gb,mem.total/_GIB*opts.reserve_fraction)
        capacity=min(opts.max_users,max(0,int((mem.available/_GIB-reserve)//opts.worker_budget_gb)))
        print(f'DRY-RUN: {len(ACCOUNTS)} accounts, installed {mem.total/_GIB:.1f} GiB, available {mem.available/_GIB:.1f} GiB, reserve {reserve:.1f} GiB, RAM-only starting capacity {capacity} (requires live verification)')
        print('No logins and no files written in dry-run mode.')
        return
    scheduler=LoadScheduler(opts)
    await scheduler.run()

if __name__=='__main__':
    try:
        asyncio.run(v11_main())
    except KeyboardInterrupt:
        print('Stopped. Re-run to resume from last fully traversed unit.')