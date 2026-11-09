#!/usr/bin/env python3
"""MentoAula Unit 1 -> Índice -> Test -> reload-safe JSON answers -> Corregir.

Keeps the previously working dashboard-originated SCORM popup sequence.
Matches question text against the supplied answers. Re-discovers radio locators
after SCORM iframe navigation and verifies that all choices remain selected.
Unmatched or unverified questions will never be submitted.
NOTE: If run against the real MentoAula website, Corregir may grade and save
the attempt on the server.
"""

import asyncio
import html
import json
import os
import random
import re
import unicodedata
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

URL = "https://campus.mentoaula.com/"
USERNAME = "SZ3388168C"
PASSWORD = os.getenv("MENTOAULA_PASSWORD", "Mentoaula8168")
INDEX_RE = re.compile(r"^\s*[ÍIíi]\s*n\s*d\s*i\s*c\s*e\s*$", re.I)
RNG = random.SystemRandom()
ANSWER_DELAY_MIN_SECONDS = 10
ANSWER_DELAY_MAX_SECONDS = 15

DEFAULT_ANSWERS = [
  {
    "question": "¿Qué se considera una fruta oleaginosa?",
    "answer": "B"
  },
  {
    "question": "¿Cuál es la duración de la intoxicación por estafilococos?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de los siguientes alimentos son una causa común de salmonella?",
    "answer": "A"
  },
  {
    "question": "¿Qué se puede conseguir calentando suficientemente un alimento contaminado?",
    "answer": "A"
  },
  {
    "question": "¿Cuánto mide el gusano anisakis?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de estos es un cereal?",
    "answer": "A"
  },
  {
    "question": "¿Qué tipo de microorganismo es el responsable de la salmonelosis?",
    "answer": "B"
  },
  {
    "question": "¿Cuál de las siguientes infecciones es la más violenta, con una tasa de mortalidad más alta, entre un 20% y un 30%?",
    "answer": "C"
  },
  {
    "question": "¿Cómo se conoce también la brucelosis?",
    "answer": "A"
  },
  {
    "question": "¿Qué condición favorece que los microorganismos se reproduzcan más rápido?",
    "answer": "A"
  },
  {
    "question": "¿Cómo se llama el valor del pH que está comprendido entre 7 y 14?",
    "answer": "C"
  },
  {
    "question": "¿Qué tipo de microorganismos se clasifican en mohos y levaduras?",
    "answer": "B"
  },
  {
    "question": "¿Qué sustancia natural de los vegetales tiene efecto antimicrobiano?",
    "answer": "A"
  },
  {
    "question": "¿Qué opción describe la contaminación cruzada?",
    "answer": "A"
  },
  {
    "question": "¿A qué tipo de contaminación pertenecen los contaminantes químicos?",
    "answer": "A"
  },
  {
    "question": "¿Cuál es el intervalo de temperatura que se denomina zona de peligro?",
    "answer": "B"
  },
  {
    "question": "¿A partir de qué temperatura, en general, comienzan a morir la mayoría de las bacterias?",
    "answer": "B"
  },
  {
    "question": "¿Cómo se denomina el proceso de congelación ultrarrápida que forma cristales de hielo muy pequeños y mantiene mejor la calidad del alimento?",
    "answer": "B"
  },
  {
    "question": "¿Cuál de los siguientes métodos supone la reducción del contenido de agua de los alimentos por medio de la acción del calor artificial?",
    "answer": "C"
  },
  {
    "question": "¿Cómo se llama al proceso que consiste en aplicar al alimento temperaturas por debajo de 100 °C (generalmente entre 65 y 70 °C)?",
    "answer": "B"
  },
  {
    "question": "¿En qué fase del proceso de higienización se eliminan restos visibles de suciedad?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de los siguientes es uno de los síntomas más comunes que se pueden producir por una alergia?",
    "answer": "A"
  },
  {
    "question": "¿Qué es la destrucción parcial de los microorganismos existentes?",
    "answer": "B"
  },
  {
    "question": "¿Cuántas son las fases básicas en toda operación de higienización?",
    "answer": "A"
  },
  {
    "question": "¿Qué elemento debe estar SIEMPRE definido en un Punto Crítico de Control?",
    "answer": "A"
  },
  {
    "question": "¿Qué se elimina con la esterilización?",
    "answer": "B"
  },
  {
    "question": "¿Qué significa la sigla APPCC?",
    "answer": "B"
  },
  {
    "question": "¿Cuántos son los grupos de sustancias o productos que causan alergias e intolerancias y sobre cuya presencia en los alimentos debe informarse?",
    "answer": "B"
  },
  {
    "question": "¿Cuál de estos productos suele ser un alérgeno común?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de los siguientes es un principio básico del APPCC?",
    "answer": "C"
  },
  {
    "question": "¿Qué técnica consiste en descongelar alimentos dentro del frigorífico?",
    "answer": "A"
  },
  {
    "question": "¿A qué temperatura deben conservarse las comidas congeladas?",
    "answer": "A"
  },
  {
    "question": "¿Cuál es la temperatura ideal de conservación del pescado fresco en refrigeración?",
    "answer": "A"
  },
  {
    "question": "¿Qué indica la presencia de olor a amoniaco en un pescado en filetes?",
    "answer": "A"
  },
  {
    "question": "¿Qué barrera de protección es la membrana exterior que cubre la cáscara?",
    "answer": "C"
  },
  {
    "question": "¿Qué se recomienda hacer con el aceite de fritura cuando está degradado?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de los siguientes NO son alimentos de alto riesgo?",
    "answer": "C"
  },
  {
    "question": "¿Cómo deben ser los ojos de un pescado para identificarlo como fresco?",
    "answer": "A"
  },
  {
    "question": "¿Cuál es la temperatura de fritura máxima?",
    "answer": "B"
  },
  {
    "question": "¿A qué temperatura deben almacenarse, conservarse, transportarse o venderse las comidas calientes preparadas?",
    "answer": "A"
  },
  {
    "question": "¿Qué grupo poblacional se considera más vulnerable a las alergias alimentarias?",
    "answer": "C"
  },
  {
    "question": "¿Cuál de los siguientes síntomas corresponde a una reacción alérgica leve?",
    "answer": "A"
  },
  {
    "question": "¿Qué prueba constituye el estándar de oro para confirmar una alergia alimentaria?",
    "answer": "C"
  },
  {
    "question": "¿Qué tipo de reacción se produce en una intolerancia alimentaria?",
    "answer": "B"
  },
  {
    "question": "¿Qué medida forma parte fundamental del tratamiento de una alergia alimentaria?",
    "answer": "D"
  },
  {
    "question": "¿Qué caracteriza principalmente a una alergia alimentaria?",
    "answer": "A"
  },
  {
    "question": "¿Qué síntoma indica la posible evolución hacia una reacción grave?",
    "answer": "A"
  },
  {
    "question": "¿Cuál de los siguientes es un signo típico de anafilaxia?",
    "answer": "C"
  },
  {
    "question": "¿Qué factor de riesgo incrementa especialmente la probabilidad de desarrollar alergias alimentarias?",
    "answer": "B"
  },
  {
    "question": "¿Qué prueba diagnóstica consiste en aplicar cantidades mínimas del alérgeno sobre la piel?",
    "answer": "B"
  },
  {
    "question": "¿Qué alérgeno puede estar presente de forma oculta en chocolates y bollería industrial?",
    "answer": "B"
  },
  {
    "question": "¿Cuál de los siguientes grupos pertenece a los alérgenos de declaración obligatoria según el Reglamento (UE) 1169/2011?",
    "answer": "B"
  },
  {
    "question": "¿Qué grupo de alérgenos incluye a las almendras, nueces y avellanas?",
    "answer": "C"
  },
  {
    "question": "¿Qué ingrediente emergente puede generar reactividad cruzada con la alergia a crustáceos?",
    "answer": "B"
  },
  {
    "question": "¿Qué es un alérgeno alimentario?",
    "answer": "B"
  },
  {
    "question": "¿Qué característica destaca en los alérgenos emergentes?",
    "answer": "C"
  },
  {
    "question": "¿Qué vía de contaminación cruzada implica el uso compartido de utensilios sin limpieza previa?",
    "answer": "B"
  },
  {
    "question": "¿Cuál es un ejemplo de proteína alergénica del pescado?",
    "answer": "B"
  },
  {
    "question": "¿Cuál de los siguientes se considera un alérgeno emergente de origen vegetal?",
    "answer": "D"
  },
  {
    "question": "¿Cuál es una vía de contaminación cruzada aérea?",
    "answer": "A"
  },
  {
    "question": "¿Qué legislación europea establece los principios de la seguridad alimentaria y la trazabilidad?",
    "answer": "D"
  },
  {
    "question": "¿Qué documento suelen revisar las autoridades sanitarias durante una inspección?",
    "answer": "C"
  },
  {
    "question": "En caso de cambio de proveedor, el establecimiento debe...",
    "answer": "A"
  },
  {
    "question": "¿Cuál de las siguientes es una obligación del establecimiento alimentario?",
    "answer": "C"
  },
  {
    "question": "¿Qué obligación tiene la persona manipuladora respecto a los alérgenos?",
    "answer": "C"
  },
  {
    "question": "¿Qué actuación es correcta durante una inspección sanitaria?",
    "answer": "B"
  },
  {
    "question": "El Real Decreto 126/2015 regula principalmente...",
    "answer": "A"
  },
  {
    "question": "¿Qué elemento debe destacarse tipográficamente en el listado de ingredientes?",
    "answer": "B"
  },
  {
    "question": "¿Cuál es el objetivo principal de la normativa sobre información alimentaria?",
    "answer": "C"
  },
  {
    "question": "¿Qué norma europea establece la obligación de declarar los 14 alérgenos principales en alimentos?",
    "answer": "B"
  },
  {
    "question": "¿Qué afirmación es correcta respecto a la limpieza de alérgenos?",
    "answer": "C"
  },
  {
    "question": "¿Cuál es el orden recomendado en procesos de elaboración?",
    "answer": "A"
  },
  {
    "question": "¿Qué documento es imprescindible solicitar al proveedor para verificar la presencia de alérgenos?",
    "answer": "B"
  },
  {
    "question": "¿Qué práctica es adecuada durante el servicio de un plato apto para personas con alergias?",
    "answer": "D"
  },
  {
    "question": "¿Qué principio debe cumplir el etiquetado de alérgenos?",
    "answer": "B"
  },
  {
    "question": "¿A qué tipo de peligro se asocian los alérgenos en el sistema APPCC?",
    "answer": "C"
  },
  {
    "question": "¿En qué fase del APPCC deben integrarse los alérgenos como peligro?",
    "answer": "C"
  },
  {
    "question": "¿Qué elemento forma parte de un sistema de trazabilidad eficaz?",
    "answer": "C"
  },
  {
    "question": "¿Cuál es una medida adecuada para el almacenamiento seguro de materias primas con alérgenos?",
    "answer": "C"
  },
  {
    "question": "¿Qué incluye un plan de control de alérgenos?",
    "answer": "D"
  },
  {
    "question": "La higiene industrial:",
    "answer": "D"
  },
  {
    "question": "Un accidente que tiene lugar en el camino de casa al trabajo:",
    "answer": "B"
  },
  {
    "question": "¿Cuáles son las categorías en las que se suelen agrupar las condiciones de trabajo?",
    "answer": "B"
  },
  {
    "question": "Un riesgo laboral se define como:",
    "answer": "B"
  },
  {
    "question": "Las consecuencias de los riesgos profesionales",
    "answer": "B"
  },
  {
    "question": "Las condiciones de trabajo son:",
    "answer": "D"
  },
  {
    "question": "El Reglamento de los Servicios de Prevención, aprobado en el Real Decreto 39/1997.",
    "answer": "D"
  },
  {
    "question": "La Ley 31/1995, de prevención de riesgos laborales:",
    "answer": "A"
  },
  {
    "question": "En materia de prevención de riesgos laborales:",
    "answer": "C"
  },
  {
    "question": "¿Cuáles de las siguientes situaciones se corresponden con condiciones de trabajo relacionadas con el medio ambiente físico de trabajo?",
    "answer": "A"
  },
  {
    "question": "¿Cuáles son las principales medidas que se pueden adoptar para evitar el riesgo eléctrico?",
    "answer": "D"
  },
  {
    "question": "El control de la salud del personal de la empresa consiste en:",
    "answer": "D"
  },
  {
    "question": "Indica qué debería hacer una persona que tiene una pequeña herida en una mano y tiene que manipular agentes químicos en el trabajo",
    "answer": "B"
  },
  {
    "question": "Cuando hay situaciones de riesgo derivadas de la exposición a agentes químicos, físicos o biológicos en el trabajo:",
    "answer": "C"
  },
  {
    "question": "Las situaciones de riesgo derivadas de las condiciones de seguridad que se pueden encontrar en un centro de trabajo son:",
    "answer": "A"
  },
  {
    "question": "Hay que adoptar medidas preventivas para reducir el nivel de ruido:",
    "answer": "C"
  },
  {
    "question": "El protocolo de actuación para activar el sistema de emergencia sanitaria consiste en",
    "answer": "A"
  },
  {
    "question": "Un fuego de tipo A:",
    "answer": "B"
  },
  {
    "question": "Para asegurar la evacuación en caso de fallo eléctrico, todos los centros de trabajo deben disponer de:",
    "answer": "B"
  },
  {
    "question": "El riesgo de aparición de los trastornos musculoesqueléticos de los miembros superiores está condicionado por:",
    "answer": "D"
  },
  {
    "question": "¿Una iluminación adecuada puede evitar daños derivados de?",
    "answer": "B"
  },
  {
    "question": "¿El origen de la carga de trabajo puede estar en algunas de las siguientes condiciones de trabajo?",
    "answer": "B"
  },
  {
    "question": "Según la guía del INSST, ¿es usuaria de pantallas de visualización de datos una persona que...?",
    "answer": "A"
  },
  {
    "question": "Cuando se trabaja mucho tiempo de pie, ¿qué medidas deben tenerse en cuenta?",
    "answer": "C"
  },
  {
    "question": "¿Cuáles son las causas principales de las situaciones de riesgo relacionadas con las condiciones de seguridad?",
    "answer": "C"
  },
  {
    "question": "¿Algunas medidas preventivas que puede adoptar el personal respecto a los lugares de trabajo son?",
    "answer": "D"
  },
  {
    "question": "¿Algunas situaciones de riesgo de tareas administrativas y de atención al público relacionadas con las condiciones de seguridad son?",
    "answer": "A"
  },
  {
    "question": "¿Algunas de las causas de la insatisfacción laboral pueden ser?",
    "answer": "A"
  },
  {
    "question": "¿El mantenimiento del orden y la limpieza puede evitar daños por?",
    "answer": "C"
  },
  {
    "question": "En trabajo sentado con pantallas, ¿qué medidas deben adoptarse?",
    "answer": "D"
  },
  {
    "question": "La planificación de la actividad preventiva",
    "answer": "D"
  },
  {
    "question": "Para realizar la evaluación de riesgos",
    "answer": "B"
  },
  {
    "question": "La formación de prevención de riesgos laborales",
    "answer": "B"
  },
  {
    "question": "Para la implantación del sistema de prevención de riesgos laborales en la empresa",
    "answer": "C"
  },
  {
    "question": "El responsable de una empresa puede asumir la organización preventiva personalmente cuando:",
    "answer": "D"
  },
  {
    "question": "Las Comunidades Autónomas tienen funciones en materia de prevención de riesgos laborales",
    "answer": "B"
  },
  {
    "question": "Todas las actividades preventivas pueden ser asumidas por personal propio de la empresa",
    "answer": "C"
  },
  {
    "question": "El organismo que realiza las funciones de vigilancia del cumplimiento de la normativa de prevención de riesgos laborales es:",
    "answer": "C"
  },
  {
    "question": "La integración de la prevención de riesgos laborales",
    "answer": "A"
  },
  {
    "question": "Una empresa debe constituir un Servicio de Prevención Propio:",
    "answer": "A"
  }
]



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


# Extract the quiz's radio groups and nearby question text from the SCORM iframe.
# The original random-answer script already handled these controls; we retain
# its grouping model but add question text to match against the JSON list.
QUESTION_GROUPS_JS = r"""() => {
  const visibleText = e => (e.innerText || e.textContent || '').replace(/\s+/g,' ').trim();
  const groupSelector = 'fieldset,[role="group"],.question,.pregunta,'+
    '[class*="question" i],[class*="pregunta" i],'+
    '[id*="question" i],[id*="pregunta" i]';
  const radios = [...document.querySelectorAll('input[type="radio"]')];
  const blocks = [...document.querySelectorAll(groupSelector)];
  const groups = new Map();

  function contextsFor(nodes) {
    const contexts = [];
    const unique = new Set();
    const first = nodes[0];
    for (let a = first, depth = 0; a && depth < 14; a = a.parentElement, depth++) {
      if (!nodes.every(n => a.contains(n))) continue;
      if (a.tagName === 'BODY' || a.tagName === 'HTML') break;
      const txt = visibleText(a);
      if (txt && txt.length <= 11000 && !unique.has(txt)) {
        contexts.push(txt); unique.add(txt);
      }
      // Some SCORM templates render the question in a preceding row/header,
      // with all answers in the immediately following row.
      let previous = a.previousElementSibling;
      for (let j=0; previous && j<2; previous=previous.previousElementSibling,j++) {
        if (previous.querySelector('input[type="radio"],[role="radio"]')) break;
        const prompt = visibleText(previous);
        const joined = (prompt + ' ' + txt).trim();
        if (prompt.length <= 800 && joined.length <= 11000 && !unique.has(joined)) {
          contexts.push(joined); unique.add(joined);
        }
      }
    }
    return contexts;
  }

  function optionInfo(e, index) {
    const label = (e.labels && e.labels[0]) || e.closest('label');
    return {index, disabled:e.disabled, checked:e.checked, value:e.value || '',
      label:visibleText(label || e.parentElement || e).slice(0,350)};
  }

  radios.forEach((e, i) => {
    const block = e.closest(groupSelector);
    const key = e.name ? 'name:' + e.name :
      block ? 'block:' + blocks.indexOf(block) : 'unnamed:' + i;
    if (!groups.has(key)) groups.set(key, {key, elements:[],options:[]});
    const g=groups.get(key);
    g.elements.push(e);
    g.options.push(optionInfo(e,i));
  });

  const native = [...groups.values()].filter(g => g.options.length >= 2)
    .map(g => ({kind:'native',key:g.key,options:g.options,
       contexts:contextsFor(g.elements)}));

  const custom = [...document.querySelectorAll('[role="radiogroup"]')].map((el,index) => {
    const els = [...el.querySelectorAll('[role="radio"]')];
    return {kind:'aria',key:'aria:'+index,index,
      options:els.map((e,i)=>({index:i,disabled:e.getAttribute('aria-disabled')==='true',
        checked:e.getAttribute('aria-checked')==='true',
        label:visibleText(e).slice(0,350),value:e.getAttribute('data-value')||''})),
      contexts:contextsFor(els.length ? els : [el])};
  }).filter(g=>g.options.length>=2);

  // Don't count a custom radiogroup again if it wraps native radio inputs.
  return [...native,...custom.filter(g=>!document.querySelectorAll('[role="radiogroup"]')[g.index]
      .querySelector('input[type="radio"]'))];
}"""


def normalize_question(text):
    """Ignore punctuation, accents, whitespace and blank underscores."""
    text = html.unescape(str(text or ""))
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = text.casefold()
    return " ".join(re.findall(r"[a-z0-9]+", text))


def load_answers():
    """Read user-maintained JSON if nearby, otherwise use embedded uploaded list."""
    names = ["respuestas_preguntas_y_respuestas.json",
             "respuestas_preguntas_y_respuestas(1).json"]
    candidates = [directory / name for directory in (Path.cwd(), Path(__file__).resolve().parent)
                  for name in names]
    source = next((path for path in candidates if path.is_file()), None)
    items = json.loads(source.read_text(encoding="utf-8-sig")) if source else DEFAULT_ANSWERS
    answer_map = {}
    for item in items:
        if not isinstance(item, dict) or "question" not in item or "answer" not in item:
            raise ValueError("Every JSON entry needs 'question' and 'answer'.")
        question = str(item["question"]).strip()
        answer = str(item["answer"]).strip().upper()
        if answer not in {"A", "B", "C", "D"}:
            raise ValueError(f"Invalid answer {answer!r} for: {question}")
        key = normalize_question(question)
        if key in answer_map and answer_map[key][1] != answer:
            raise ValueError(f"Conflicting answers for: {question}")
        answer_map[key] = (question, answer)
    print(f"Loaded {len(answer_map)} distinct question/answer pairs " +
          (f"from {source.name}." if source else "embedded from your uploaded JSON."))
    return answer_map


def match_question(contexts, answer_map):
    """Match only an unambiguous, verbatim question in its nearest container."""
    for raw_context in contexts:
        context = normalize_question(raw_context)
        matches = [key for key in answer_map if len(key) >= 20 and key in context]
        if len(matches) == 1:
            return answer_map[matches[0]]
        # Larger ancestors can contain several questions. Don't choose a
        # 'best guess' when two or more questions match.
    return None


def answer_option(options, letter):
    """Prefer explicit A/B/C/D option labels; otherwise use display order."""
    enabled = [opt for opt in options if not opt["disabled"]]
    if len(enabled) < 2 or len(enabled) > 6:
        return None
    explicit = {}
    for opt in enabled:
        label = html.unescape(opt.get("label") or "").strip()
        value = (opt.get("value") or "").strip().upper()
        m = re.match(r"^([ABCD])(?:[.)\]:\-]|\s+)", label, re.I)
        if m:
            explicit[m.group(1).upper()] = opt
        elif value in {"A", "B", "C", "D"}:
            explicit[value] = opt
    if letter in explicit:
        return explicit[letter]
    if explicit:
        # Partial letter labeling may indicate an unusual choice layout.
        return None
    index = ord(letter) - ord("A")
    return enabled[index] if index < len(enabled) else None


def frame_was_replaced(exc):
    """Treat navigation/detachment as an uncertain click, not as a failed answer."""
    message = str(exc).lower()
    return any(fragment in message for fragment in (
        "frame was detached", "frame has been detached", "frame detached",
        "execution context was destroyed", "navigation to", "navigating",
        "target closed", "frame was removed",
    ))


async def click_radio(frame, index):
    """Select a radio using real browser events; don't reuse after a page navigation."""
    radio = frame.locator('input[type="radio"]').nth(index)
    try:
        # Don't wait for a page navigation triggered by the course's change handler.
        await radio.check(timeout=3000, no_wait_after=True)
    except Exception as exc:
        if frame_was_replaced(exc):
            raise  # Selection may have succeeded; re-scan before retrying.
        # Some courses hide their inputs below a styled label.
        await radio.evaluate("""e => {
          const label = e.labels && e.labels[0];
          if (label) label.click(); else e.click();
        }""")


async def scan_questions(lesson, answer_map, timeout=25):
    """Return a fresh frame plus all currently visible question groups.

    This function intentionally never holds an old frame across navigations.
    """
    deadline = asyncio.get_running_loop().time() + timeout
    while asyncio.get_running_loop().time() < deadline:
        for frame in reversed(lesson.frames[:40]):
            try:
                groups = await frame.evaluate(QUESTION_GROUPS_JS)
            except Exception:
                continue  # The SCORM frame may be reloading right now.
            if not groups:
                continue
            choices, unmatched = [], []
            for g in groups:
                matched = match_question(g['contexts'], answer_map)
                if not matched:
                    unmatched.append(g['key'])
                    continue
                question, letter = matched
                option = answer_option(g['options'], letter)
                if option is None:
                    unmatched.append(f"{question[:85]} (answer {letter} unavailable)")
                    continue
                choices.append((g, question, letter, option))
            return frame, groups, choices, unmatched
        await asyncio.sleep(0.2)
    raise RuntimeError("Quiz controls disappeared after SCORM navigation; "
                       "nothing was submitted.")


async def select_mapped_answers(lesson, answer_map, timeout=25):
    """Re-scan after every answer and verify every choice before correction.

    MentoAula can navigate/recreate ScormPlayer.aspx while a radio is clicked.
    A cached frame or radio locator from the beginning of the quiz then fails.
    """
    print('Finding the quiz questions (including SCORM iframes)...')
    _, groups, choices, unmatched = await scan_questions(lesson, answer_map, timeout)
    print(f'Detected {len(groups)} questions: {len(choices)} matched, '
          f'{len(unmatched)} unmatched.')
    if unmatched or not choices:
        for key in unmatched:
            print('  Unmatched:', key)
        raise RuntimeError('Some questions were not matched to your JSON. '
                           'Corregir will NOT be clicked.')

    # Map normalized text to the expected answer, not to an old DOM index.
    expected = {normalize_question(q): (q, letter) for _, q, letter, _ in choices}
    if len(expected) != len(groups):
        raise RuntimeError('Duplicate or ambiguous question groups; '
                           'Corregir will NOT be clicked.')

    attempts = {key: 0 for key in expected}
    last_attempted_question = None
    total_actions = 0
    order = list(expected)

    # Limit attempts so we don't loop forever if the SCORM app doesn't retain
    # radio selections after navigating to a fresh document.
    while True:
        frame, current_groups, current_choices, missing = await scan_questions(
            lesson, answer_map, timeout=25)
        if missing:
            raise RuntimeError('Question text changed or became unmatched after '
                               'SCORM reload; Corregir will NOT be clicked.')
        current = {normalize_question(q): (g, q, letter, opt)
                   for g, q, letter, opt in current_choices}
        if set(current) != set(expected) or len(current_groups) != len(expected):
            raise RuntimeError('The set of quiz questions changed during answering; '
                               'Corregir will NOT be clicked.')

        pending = [key for key in order if not current[key][3].get('checked')]
        if not pending:
            print(f'All {len(expected)} answers verified as selected in the current quiz.')
            return len(expected)

        key = pending[0]
        g, question, letter, option = current[key]
        if attempts[key] >= 3:
            raise RuntimeError(f'Answer would not remain selected after reloading: '
                               f'{question[:100]}; Corregir will NOT be clicked.')
        if last_attempted_question is not None and key != last_attempted_question:
            await pause_between_answers()

        # Re-read the live frame and radio index EACH iteration. It may have
        # been recreated after the previous question was selected.
        attempts[key] += 1
        total_actions += 1
        last_attempted_question = key
        try:
            if g['kind'] == 'native':
                await click_radio(frame, option['index'])
            else:
                await frame.locator('[role="radiogroup"]').nth(g['index']) \
                    .locator('[role="radio"]').nth(option['index']) \
                    .click(timeout=4000, no_wait_after=True)
        except Exception as exc:
            if frame_was_replaced(exc):
                print(f'  SCORM navigated while selecting {question[:70]}: '
                      'checking the newly loaded quiz...')
            else:
                # UI may be transient or rerendering; safely re-scan/retry.
                print(f'  Radio interaction interrupted ({type(exc).__name__}); '
                      'checking again...')
        print(f'  {len(expected) - len(pending) + 1}/{len(expected)}: '
              f'{question[:100]} -> {letter} '
              f'(attempt {attempts[key]})')
        # No cached frame or locator is referenced after this point.
        await asyncio.sleep(0.4)


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
            answer_map = load_answers()
            total = await select_mapped_answers(lesson, answer_map)
            if total < 1:
                raise RuntimeError("No questions answered; refusing to click Corregir.")
            print(f"Selected JSON-matched answers for {total} questions.")
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
