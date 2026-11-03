"""V11.1 SCORM sidebar recovery enhancement for authorised navigation testing.

Does not interact with assessments, change server-side completion, or bypass gates.
Does not export course content or authentication materials.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

UNIT_TITLES = {
    1: "Enfermedades transmitidas por los alimentos",
    2: "Alteración y contaminación de alimentos",
    3: "Prevención de enfermedades de transmisión alimentaria",
    4: "Manipulación de comidas preparadas",
    5: "Alergias e intolerancias alimentarias",
    6: "Tipos de alérgenos",
    7: "Prevención de riesgos en alergias alimentarias",
    8: "Legislación y normativa aplicable y de obligado cumplimiento",
    9: "Gestión de alérgenos en el sector de la alimentación",
    10: "Conceptos básicos sobre seguridad y salud en el trabajo",
    11: "Riesgos generales y su prevención",
    12: "Riesgos específicos y su prevención en el sector correspondiente a la actividad de la empresa",
    13: "Elementos básicos de gestión de la prevención de riesgos",
}
# Conservative minima: reject single-page/empty navigation, not presume full coverage.
MIN_ENTRIES = {1:5,2:6,3:5,4:5,5:6,6:5,7:6,8:5,9:5,10:5,11:12,12:5,13:5}

# JS deliberately returns sidebar LABELS only. No lesson content, passwords, or tokens.
SIDEBAR_JS = r'''() => {
  const norm=s=>(s||'').replace(/\s+/g,' ').trim();
  const visible=e=>{try{const c=getComputedStyle(e),r=e.getBoundingClientRect();
    return c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity!==0&&r.width>2&&r.height>2;
  }catch{return false;}};
  const pathFor=el=>{const p=[];for(let e=el;e&&e.nodeType===1;e=e.parentElement){
    if(e.id&&!/[\s"'\\]/.test(e.id)){p.unshift('#'+CSS.escape(e.id));break;}
    let n=1;for(let a=e.previousElementSibling;a;a=a.previousElementSibling)if(a.tagName===e.tagName)n++;
    p.unshift(e.tagName.toLowerCase()+':nth-of-type('+n+')');if(p.length>=16)break;
  }return p.join(' > ');};
  // Always anchor to an actual left-hand navigation panel, not lesson-body text.
  const nodes=[...document.querySelectorAll('aside,nav,[role="tree"],'+
    '[class*="sidebar" i],[id*="sidebar" i],[class*="menu" i],'+
    '[id*="menu" i],[class*="indice" i],[id*="indice" i],'+
    '[class*="index" i],[id*="index" i],[class*="temario" i],'+
    '[class*="navega" i],[class*="scroll" i],div,ul')];
  const panels=nodes.map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);
    const scroll=e.scrollHeight>e.clientHeight+45;
    const marker=/^(?:aside|nav)$/i.test(e.tagName)||/sidebar|menu|indice|index|temario|nav|scroll|tree/i.test((e.id||'')+' '+String(e.className||''));
    const txt=(e.innerText||'').toLowerCase();
    let score=(scroll?30:0)+(marker?20:0)+(r.left<55?18:0)+
      (/mapa conceptual|introducci[oó]n|objetivos|resumen/.test(txt)?30:0)+
      (e.querySelectorAll('a,li,[role="treeitem"]').length>=3?20:0);
    return {e,r,score,scroll,marker,chars:txt.length};
  }).filter(x=>x.r.left>=-20&&x.r.left<100&&x.r.width>=125&&x.r.width<=440&&
    x.r.height>=130&&x.r.height<=innerHeight+120&&visible(x.e)&&
    (x.marker||x.scroll)&&x.chars>30);
  panels.sort((a,b)=>b.score-a.score || a.r.width-b.r.width);
  const panel=panels[0]?.e;
  if(!panel)return {items:[],hasPanel:false,panel:null};
  const elements=panel.querySelectorAll('a,button,[role="treeitem"],[role="menuitem"],'+
    '[role="tab"],[onclick],[tabindex],li,span,p,div');
  const items=[],seen=new Set();
  for(const e of elements){
    if(!visible(e))continue;
    const r=e.getBoundingClientRect();
    if(r.left<0||r.left>425||r.width>415||r.height>120)continue;
    // Ignore parent rows with concatenated nested section labels.
    const own=norm([...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' '));
    let label=own||norm(e.innerText||e.textContent||'');
    if(!own && e.children.length>1)continue;
    if(label.length<3||label.length>145)continue;
    if(/^(recursos|test|ver v[ií]deos|anterior|siguiente|cerrar|volver|inicio|mostrar men[uú] lateral|ocultar men[uú] lateral)$/i.test(label))continue;
    if(/^unidad\s*\d+\s*:?$/i.test(label)||/finalizar sesi[oó]n|cerrar sesi[oó]n|logout/i.test(label))continue;
    // Avoid capturing sub-elements duplicated in an actionable parent.
    const parent=e.parentElement;
    if(e.tagName==='DIV'&&parent&&norm(parent.innerText||'')===label&&
       parent.matches('a,button,[role="treeitem"],[onclick],li'))continue;
    const clickable=e.matches('a,button,[role="treeitem"],[role="menuitem"],[role="tab"],[onclick],[tabindex]') ||
      getComputedStyle(e).cursor==='pointer';
    let target=e;
    if(!clickable){
      const ancestor=e.closest('a,button,[role="treeitem"],[role="menuitem"],[onclick],li');
      if(ancestor&&panel.contains(ancestor)){
        // Prefer exact-text label over a parent containing other nested items.
        if(norm(ancestor.innerText||'')===label||ancestor.tagName==='LI')target=ancestor;
      }
    }
    const normalized=label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    if(seen.has(normalized))continue;
    seen.add(normalized);
    const cls=String(target.className||'');
    const active=/\b(active|current|selected|actual|highlight)\b/i.test(cls)||
       target.getAttribute('aria-current')==='page'||target.getAttribute('aria-selected')==='true';
    items.push({text:label,selector:pathFor(target),top:Math.round(r.top),left:Math.round(r.left),
      active,href:'',hasPanel:true});
  }
  return {items:items.slice(0,200),hasPanel:true,panel:{
    selector:pathFor(panel),scrollTop:panel.scrollTop,scrollHeight:panel.scrollHeight,
    clientHeight:panel.clientHeight,items:items.length}};
}'''

# Inspect and expand only explicit disclosure controls, never the whole lesson row.
EXPAND_JS = r'''(already) => {
  const roots=[...document.querySelectorAll('aside,nav,[role="tree"],'+
    '[class*="sidebar" i],[id*="sidebar" i],[class*="menu" i],'+
    '[id*="menu" i],[class*="indice" i],[id*="indice" i],'+
    '[class*="index" i],[id*="index" i],[class*="temario" i],'+
    '[class*="navega" i],[class*="scroll" i],div,ul')].filter(e=>{
       const r=e.getBoundingClientRect();return r.left>=-20&&r.left<100&&r.width>=125&&
       r.width<=440&&r.height>=130&&r.height<=innerHeight+120&&
       (/sidebar|menu|indice|index|temario|nav|scroll|tree/i.test((e.id||'')+' '+String(e.className||''))||
        e.scrollHeight>e.clientHeight+45)&&
       /mapa conceptual|introducci[oó]n|objetivos|resumen/i.test(e.innerText||'');
    });
  roots.sort((a,b)=>(b.scrollHeight-b.clientHeight)-(a.scrollHeight-a.clientHeight));
  const root=roots[0];if(!root)return null;
  const pathFor=el=>{const p=[];for(let e=el;e&&e.nodeType===1;e=e.parentElement){
    if(e.id&&!/[\s"'\\]/.test(e.id)){p.unshift('#'+CSS.escape(e.id));break;}
    let n=1;for(let a=e.previousElementSibling;a;a=a.previousElementSibling)if(a.tagName===e.tagName)n++;
    p.unshift(e.tagName.toLowerCase()+':nth-of-type('+n+')');if(p.length>=16)break;
  }return p.join(' > ');};
  const elements=root.querySelectorAll('[aria-expanded="false"],details:not([open]) > summary,'+
    '[class*="caret-right" i],[class*="chevron-right" i],[class*="angle-right" i]');
  for(const el of elements){
    const r=el.getBoundingClientRect(),s=getComputedStyle(el);
    if(r.width<=1||r.height<=1||s.display==='none'||s.visibility==='hidden')continue;
    // Textual links are not safe disclosure controls unless explicitly aria-expanded=false.
    const aria=el.getAttribute('aria-expanded')==='false';
    const summary=el.matches('summary')&&el.closest('details')&&!el.closest('details').open;
    const icon=/caret-right|chevron-right|angle-right/i.test(String(el.className||''))&&r.width<42;
    if(!(aria||summary||icon))continue;
    if(icon&&!aria&&!summary){
      const parent=el.parentElement;
      if(!parent||!parent.querySelector('ul,[class*="sub" i]'))continue;
    }
    const selector=pathFor(el);if(already.includes(selector))continue;
    return {selector,label:(el.parentElement?.innerText||'').replace(/\s+/g,' ').trim().slice(0,100)};
  }
  return null;
}'''


def _norm(value: str) -> str:
    value = unicodedata.normalize('NFKD', str(value or ''))
    value = ''.join(x for x in value if not unicodedata.combining(x))
    value = value.translate(str.maketrans({'“':'"','”':'"','‘':"'",'’':"'"}))
    return re.sub(r'\s+', ' ',value).strip().casefold()


def install(Exporter, LoadNavigator, scope):
    """Monkeypatch only menu detection/recovery and conservative validation.

    Scope contains original globals, notably `is_external_video_frame`.
    """
    old_run = LoadNavigator.run_single_unit
    external=scope['is_external_video_frame']

    async def detect(page):
        groups=[]
        for frame in page.frames[:32]:
            if external(frame):continue
            try:
                result=await frame.evaluate(SIDEBAR_JS)
                if not isinstance(result,dict) or not result.get('hasPanel'):continue
                rows=result.get('items') or []
                if rows:groups.append((frame,rows,result.get('panel') or {}))
            except Exception:
                continue
        if not groups:return []
        def rank(group):
            rows=group[1]
            markers=sum(bool(re.search(r'introducci[oó]n|objetivos|resumen|mapa conceptual|\d+\.\s+',i['text'],re.I)) for i in rows)
            return (markers,len(rows))
        frame,rows,_ = max(groups,key=rank)
        dedup=set();ordered=[]
        for row in rows:
            key=_norm(row.get('text',''))
            if key and key not in dedup:
                dedup.add(key);ordered.append((frame,row))
        return ordered

    async def toc(self,page):
        items=await detect(page)
        if items:return items
        # If a site's DOM is unfamiliar, retain the original scanner as a fallback.
        return await _original_toc(self,page)

    _original_toc=Exporter.toc

    async def expand_menu(self,page,unit,max_clicks=20):
        clicked=0;visited_by_frame=defaultdict(set)
        for _ in range(max_clicks):
            target=None
            for frame in page.frames[:32]:
                if external(frame):continue
                try:
                    prior=list(visited_by_frame[id(frame)])
                    item=await frame.evaluate(EXPAND_JS,prior)
                    if item and item.get('selector'):
                        target=(frame,item);break
                except Exception:continue
            if not target:break
            frame,item=target
            visited_by_frame[id(frame)].add(item['selector'])
            try:
                loc=frame.locator(item['selector']).first
                if await loc.is_visible() and await loc.is_enabled():
                    await loc.scroll_into_view_if_needed(timeout=2000)
                    await loc.click(timeout=2500,no_wait_after=True)
                    clicked+=1
                    await asyncio.sleep(0.07)
            except Exception as exc:
                self.log.debug('Unit %02d expand disclosure failed: %s',unit,type(exc).__name__)
        if clicked:
            self.log.info('Unit %02d | expanded %d SCORM disclosure controls',unit,clicked)
        return clicked

    async def full_toc(self,page,unit,expand=True):
        initial=await detect(page)
        if not initial:
            # Open the actual SCORM menu toggle, without the original fallback
            # that wrote diagnostic files under the bogus '(never-created)' root.
            toggle=('button:has-text("Mostrar menú lateral"),'
                    'a:has-text("Mostrar menú lateral"),'
                    '[aria-label*="Mostrar menú" i],'
                    '[title*="Mostrar menú" i]')
            for fr in reversed(page.frames[:32]):
                if external(fr):continue
                try:
                    loc=fr.locator(toggle)
                    for idx in range(min(await loc.count(),6)):
                        item=loc.nth(idx)
                        if await item.is_visible():
                            await item.click(timeout=2500,no_wait_after=True)
                            await asyncio.sleep(0.12)
                            break
                except Exception:pass
        if expand:
            await expand_menu(self,page,unit)
        results=await detect(page)
        if results:return results
        return await _original_toc(self,page)

    async def ensure_scorm_toc(self,page,unit):
        return await full_toc(self,page,unit,expand=True)

    async def find_toc_entry(self,page,unit,label):
        # Re-resolve the element fresh, because the UI replaces DOM nodes on Next.
        for pass_idx in range(3):
            sections=await full_toc(self,page,unit,expand=pass_idx>=1)
            matches=[(fr,i) for fr,i in sections if _norm(i['text'])==_norm(label)]
            if matches:return matches[0]
            # Traverse an independent, scrollable sidebar without moving the
            # article body or assuming that every chapter is presently on screen.
            if pass_idx==1:
                for fraction in (0.0,0.25,0.5,0.75,1.0):
                    for frame in page.frames[:32]:
                        if external(frame):continue
                        try:
                            await frame.evaluate('''(fraction) => {
                              const els=[...document.querySelectorAll('*')].filter(e=>{
                                const r=e.getBoundingClientRect();
                                return r.left>=-20&&r.left<100&&r.width>125&&r.width<440&&
                                       r.height>130&&e.scrollHeight>e.clientHeight+50;
                              });
                              els.sort((a,b)=>b.scrollHeight-b.clientHeight-(a.scrollHeight-a.clientHeight));
                              for(const e of els.slice(0,2))e.scrollTop=fraction*(e.scrollHeight-e.clientHeight);
                            }''',fraction)
                        except Exception:pass
                    sections=await detect(page)
                    matches=[(fr,it) for fr,it in sections if _norm(it.get('text'))==_norm(label)]
                    if matches:return matches[0]
        self.log.warning('Unit %02d | entry remains unavailable after expansion/scroll: %s',unit,label[:110])
        await diagnostic(self,page,unit,'unrecoverable section',label)
        return None

    async def diagnostic(self,page,unit,reason,label=''):
        folder=Path(self.opts.log_dir)/self.account.username/'sidebar_diagnostics'
        folder.mkdir(parents=True,exist_ok=True)
        frames=[]
        for ix,frame in enumerate(page.frames[:32]):
            if external(frame):continue
            try:
                state=await frame.evaluate(SIDEBAR_JS)
                if not state.get('hasPanel'):continue
                frames.append({'frame_index':ix,'menu':state.get('panel'),
                               'labels':[x['text'] for x in state.get('items',[])[:130]]})
            except Exception:continue
        # Structural metadata only, no authentication headers or course text.
        from datetime import datetime, timezone
        data={'timestamp':datetime.now(timezone.utc).isoformat(), 'unit':unit,
              'expected_unit_title':UNIT_TITLES.get(unit),'reason':reason,
              'missing_section':label,'frames':frames}
        try:
            name=f'unit_{unit:02d}_{re.sub(r"[^a-z0-9]+","_",reason.lower())}.json'
            (folder/name).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
        except OSError:pass

    async def run_single_unit(self,unit):
        try:
            result=await old_run(self,unit)
        except Exception as exc:
            # The original walker only records missing labels in its console.
            # Persist structural evidence with the account that encountered it.
            last=next((p for p in reversed(self.kept_scorm_pages) if not p.is_closed()),None)
            if last is not None and ('navigation incomplete' in str(exc) or 'unverified' in str(exc)):
                try:await diagnostic(self,last,unit,'sidebar coverage failed',str(exc)[:130])
                except Exception:pass
            raise
        found=self.toc_by_unit.get(unit,[])
        minimum=MIN_ENTRIES.get(unit,4)
        if len(found)<minimum:
            self.log.error('Unit %02d | unreliable sidebar coverage: only %d entries detected; expected at least %d',unit,len(found),minimum)
            last=next((p for p in reversed(self.kept_scorm_pages) if not p.is_closed()),None)
            if last is not None:
                try:await diagnostic(self,last,unit,'too few sidebar entries')
                except Exception:pass
            raise RuntimeError(f'Unit {unit} unverified: only {len(found)} menu entries (minimum {minimum})')
        return result

    async def safe_walk_unit(self,page,unit):
        # Existing walker uses our enhanced ensure/find calls. If menu remains
        # entirely absent, its old generic Next fallback cannot claim completion.
        await _original_walk(self,page,unit)
        if not self.toc_by_unit.get(unit):
            await diagnostic(self,page,unit,'no sidebar discovered')
            raise RuntimeError(f'Unit {unit} unverified: SCORM sidebar never detected')

    _original_walk=Exporter.walk_unit
    Exporter.toc=toc
    Exporter.ensure_scorm_toc=ensure_scorm_toc
    Exporter.find_toc_entry=find_toc_entry
    LoadNavigator.walk_unit=safe_walk_unit
    LoadNavigator.run_single_unit=run_single_unit
    logging.getLogger('mentoaula.loadtest').info('V11.1 hierarchical sidebar enhancement enabled')
