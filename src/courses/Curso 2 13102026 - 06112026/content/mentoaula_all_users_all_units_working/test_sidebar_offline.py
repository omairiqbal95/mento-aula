#!/usr/bin/env python3
"""Offline UI regression checks with Chromium; no MentoAula credentials or network."""
import asyncio
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from mentoaula_sidebar_hierarchy import SIDEBAR_JS, EXPAND_JS, _norm, install
from playwright.async_api import async_playwright

HTML='''<!doctype html><html><head><style>
body{margin:0;background:#eee;font-family:Arial}#nav{position:absolute;left:0;top:0;width:330px;height:800px;
 overflow-y:auto;background:white}#article{margin-left:375px;padding:30px}
.group{padding:8px 10px} .disclosure{cursor:pointer;display:inline-block;padding:3px}
.child{padding:7px 36px;cursor:pointer} .hidden{display:none}
</style></head><body>
<aside id="nav" class="scorm-sidebar">
<h2>UNIDAD 11</h2><h2>Riesgos generales y su prevención</h2>
<div class="child" onclick="choose('Mapa conceptual')">Mapa conceptual</div>
<div class="child" onclick="choose('Introducción')">Introducción</div>
<div class="child" onclick="choose('Objetivos')">Objetivos</div>
''' + '\n'.join('''<div class="group"><button aria-expanded="false" aria-controls="section%d" class="disclosure" onclick="toggle(%d)">▸</button><span>%d. %s</span></div>
<div id="section%d" class="hidden">%s</div>'''%(i,i,i,name,i, '\n'.join('<div class="child" onclick="choose(this.innerText)">%d.%d. %s</div>'%(i,j,'Contenido '+str(i)+'-'+str(j)) for j in range(1,8))) for i,name in enumerate([
'Riesgos ligados a las condiciones de seguridad','Las señales de seguridad','Riesgos ligados al medio ambiente de trabajo',
'La carga de trabajo, la fatiga y la insatisfacción laboral','La protección de la Seguridad y la salud de los trabajadores en el trabajo',
'Planes de emergencia y evacuación','Primeros auxilios','El control de la salud de los trabajadores'],1)) + '''
<div class="child" onclick="choose('Resumen')">Resumen</div>
</aside><main id="article"><h1>Objetivos</h1><button onclick="choose('Siguiente')">Siguiente</button></main>
<script>
function toggle(i){let c=document.querySelector('#section'+i);let b=document.querySelector('[aria-controls="section'+i+'"]');
let open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));c.classList.toggle('hidden',open);}
function choose(s){document.querySelector('#article h1').innerText=s;}
</script></body></html>'''

async def test():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page=await b.new_page(viewport={'width':1200,'height':900})
  await page.set_content(HTML)
  before=await page.evaluate(SIDEBAR_JS)
  print('initial:',len(before['items']),before['panel'])
  assert before['hasPanel'] and len(before['items'])>=5
  done=set()
  for _ in range(25):
   node=await page.evaluate(EXPAND_JS,list(done))
   if not node:break
   done.add(node['selector'])
   await page.locator(node['selector']).click()
  after=await page.evaluate(SIDEBAR_JS)
  print('expanded:',len(after['items']),len(done),'includes late:',any('8.7' in x['text'] for x in after['items']))
  assert len(done)==8, (len(done),done)
  assert len(after['items'])>=50, after['items']
  assert any('8.7.' in x['text'] for x in after['items'])
  assert len([x for x in after['items'] if _norm(x['text']) == 'objetivos'])==1
  late=next(x for x in after['items'] if '8.7.' in x['text'])
  await page.locator(late['selector']).scroll_into_view_if_needed()
  await page.locator(late['selector']).click()
  assert '8.7.' in await page.locator('#article h1').inner_text()
  print('PASS: nested menu expanded, all entries discovered, offscreen subsection selected')
  await b.close()

if __name__=='__main__': asyncio.run(test())
