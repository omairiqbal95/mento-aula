#!/usr/bin/env python3
"""MentoAula v13: resumable multi-account sequential-unit runner.

Based on verified v12 navigation and answer matching. Loads a separate local JSON
file of authorised account credentials; does not write passwords to logs/state.

IMPORTANT: Corregir can record real assessment attempts. A unit's
'corregir_clicked' status means the button was clicked, NOT that a pass or
completion was confirmed by MentoAula.

Python 3.10+, playwright: pip install playwright && python -m playwright install chromium
"""
from __future__ import annotations

import argparse
import asyncio
import builtins
from contextvars import ContextVar
import datetime
import difflib
import html
import json
import os
import random
import re
import sqlite3
import sys
import time
import unicodedata
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

URL = "https://campus.mentoaula.com/"
INDEX_RE = re.compile(r"^\s*[ÍIíi]\s*n\s*d\s*i\s*c\s*e\s*$", re.I)
RNG = random.SystemRandom()
ACTIVE_USER = ContextVar("active_user", default="manager")
LOG_PATH: Path | None = None
SECRET_VALUES: tuple[str, ...] = ()

def sanitized(value):
    message = str(value)
    for secret in SECRET_VALUES:
        if len(secret) >= 6 and secret in message:
            message = message.replace(secret, '[REDACTED]')
    return message

def print(*objects, **kwargs):
    """Timestamped and account-prefixed line logging; never include passwords."""
    message = sanitized(" ".join(str(x) for x in objects))
    timestamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    line = f"[{timestamp}] [{ACTIVE_USER.get()}] {message}"
    builtins.print(line, file=sys.stdout, flush=True)
    if LOG_PATH is not None:
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with LOG_PATH.open('a', encoding='utf-8') as f:
            f.write(line+'\n')

def parse_delay(value: str) -> tuple[float, float]:
    """Parse --delay SECONDS or --delay MIN-MAX (inclusive range in seconds)."""
    match = re.fullmatch(
        r"\s*(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?\s*",
        value,
    )
    if not match:
        raise argparse.ArgumentTypeError(
            "Invalid delay. Use --delay 0, --delay 12 or --delay 10-15."
        )
    low = float(match.group(1))
    high = float(match.group(2)) if match.group(2) is not None else low
    if high < low:
        raise argparse.ArgumentTypeError("Delay MAX must be >= MIN.")
    return low, high

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
    "question": "¿Cuáles de las siguientes situaciones se corresponden con condiciones del trabajo relacionadas con el medio ambiente físico de trabajo?",
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



async def pause_between_answers(delay_range: tuple[float, float]):
    """Wait between distinct answers, unless --delay 0 is specified."""
    minimum, maximum = delay_range
    if maximum == 0:
        return
    seconds = RNG.uniform(minimum, maximum) if minimum != maximum else minimum
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


async def open_unit(dashboard, context, unit):
    """Open a numbered unit via the live dashboard (not a guessed/copied SCORM URL)."""
    if not 1 <= unit <= 13:
        raise ValueError(f"Unit number out of range: {unit}")
    suffix = f"{unit:02d}"
    header = await first_visible(dashboard, [lambda f: f.locator(f"#tod{suffix}")], 30)
    if not header:
        raise RuntimeError(f"Unit {unit} heading (#tod{suffix}) not found.")

    # Dismiss the introductory tour if it appears, as in v8.
    finish = await first_visible(dashboard,
        [lambda f: f.locator("#my-tour-button-finish")], 1.5)
    if finish:
        try:
            await finish.click(timeout=5000)
        except Exception:
            pass

    # Locate this unit's link in its own accordion, not the first matching link
    # elsewhere on the page or an old session's saved SCORM URL.
    pattern = re.compile(rf"Contenido\s+unidad\s*0?{unit}(?!\d)", re.I)
    link = None
    for frame in dashboard.frames[:40]:
        try:
            candidate = frame.locator(f"#udpanel{suffix} a.milinkElemento").filter(
                has_text=pattern).first
            if await candidate.count():
                link = candidate
                break
        except Exception:
            continue
    if link is None:
        raise RuntimeError(f"Cannot find 'Contenido unidad {unit}' in its accordion.")

    # Don't click the header twice without rechecking visibility: accordions toggle.
    if not await link.is_visible():
        print(f"Expanding Unit {unit}...")
        await header.click(timeout=6000, no_wait_after=True)

    for attempt in range(3):
        try:
            await link.wait_for(state="visible", timeout=4500)
            await asyncio.sleep(0.4)  # wait for the accordion's sliding animation
            if await link.is_visible():
                break
        except PWTimeout:
            pass
        if attempt < 2 and not await link.is_visible():
            await header.click(timeout=6000, no_wait_after=True)
    else:
        raise RuntimeError(f"Unit {unit} accordion did not remain open.")

    print(f"Opening 'Contenido unidad {unit}' from the dashboard...")
    # Always execute the real dashboard onclick, which both opens the popup
    # and registers the visit with the LMS. Do not copy the SCORM link into goto().
    async with context.expect_page(timeout=15000) as popup_event:
        await link.dispatch_event("click", timeout=6000)
    lesson = await popup_event.value
    await lesson.wait_for_load_state("domcontentloaded", timeout=25000)
    await lesson.bring_to_front()
    print(f"Unit {unit} opened.")
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
    print("Test opened.")


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
    // Keep the original option label for A/B/C/D identification.
    const labelText = visibleText(label || e.parentElement || e).slice(0,350);
    // In several MentoAula themes the radio input and the actual option text
    // are placed in adjacent cells. Collect only a local, single-radio row;
    // never pull the whole quiz into an option and risk a false match.
    let nearby = '';
    for (const root of [label, e.closest('tr'), e.closest('li'),
                         e.parentElement, e.parentElement?.parentElement]) {
      if (!root || root.querySelectorAll('input[type="radio"]').length !== 1) continue;
      const candidate = visibleText(root);
      if (candidate.length > nearby.length && candidate.length <= 700)
        nearby = candidate;
    }
    return {index, disabled:e.disabled, checked:e.checked, value:e.value || '',
      label:labelText, nearby:nearby.slice(0,700)};
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

  // Some MentoAula quizzes put the prompt in a SEPARATE preceding row,
  // outside the shared ancestor of its radio buttons. The old scanner then
  // produced only "name:resp8"/"name:resp9" with no matchable question.
  // A DOM text Range between the previous and current radio groups captures
  // the intervening question, independent of wrapping tables/divs/iframes.
  const orderedGroups = [...groups.values()].filter(g => g.options.length >= 2);
  const native = orderedGroups.map((g,i) => {
    const contexts = [];
    try {
      const range = document.createRange();
      if (i === 0) range.setStart(document.body, 0);
      else range.setStartAfter(orderedGroups[i-1].elements.at(-1));
      range.setEndBefore(g.elements[0]);
      const between = range.toString().trim();
      if (between) contexts.push(between.slice(-9000));
    } catch (_) { /* Ignore exotic DOM order; use nearest ancestors. */ }
    contexts.push(...contextsFor(g.elements));
    return {kind:'native',key:g.key,options:g.options,contexts};
  });

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
    # In these tests the HTML uses both "100 ºC" and "100 °C".
    # Unicode decomposition would otherwise turn the former into "100 oc".
    text = re.sub(r"[º°]\s*(?=[CcFf]\b)", "", text)
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = text.casefold()
    normalized = " ".join(re.findall(r"[a-z0-9]+", text))
    # Unit 10 test wording differs slightly from the user's answer JSON.
    normalized = normalized.replace("condiciones del trabajo relacionadas", 
                                    "condiciones de trabajo relacionadas")
    return normalized


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


def unit_answer_scope(answer_map, unit):
    """Limit matching to the 10 known questions for this unit.

    The uploaded list contains 120 unique Q/As because Units 6 and 7 share
    the SAME ten questions. Its entries are otherwise grouped by unit.
    Return all entries if a different user-supplied JSON does not follow that
    structure, rather than silently omitting additional answers.
    """
    start = (unit - 1) * 10 if unit <= 6 else (unit - 2) * 10
    batch = DEFAULT_ANSWERS[start:start + 10]
    selected = {
        key: answer_map[key]
        for item in batch
        if (key := normalize_question(item['question'])) in answer_map
    }
    if len(selected) == 10:
        return selected
    print(f"Unit {unit}: only {len(selected)}/10 canonical answers found; using full supplied JSON.")
    return answer_map


# Each fingerprint is copied from the user-provided Unit 10/11 answer options.
# It is an alternative identification signal when the LMS exposes only a
# group name such as name:resp9 instead of the prompt. Never infer from respN.
# The target question must be present in the supplied answer map, and EXACTLY
# ONE fingerprint must match the visible option text in the current group.
OPTION_FINGERPRINTS_RAW = {
    "La higiene industrial:":
        "Es una ciencia no médica que trata de identificar, evaluar y controlar los riesgos ocasionados por agentes físicos, químicos o biológicos",
    "Las consecuencias de los riesgos profesionales":
        "Tienen un aspecto económico y humano que repercute en la persona accidentada y su familia",
    "La Ley 31/1995, de prevención de riesgos laborales:":
        "Traspone la directiva marco sobre salud y seguridad en el trabajo al ordenamiento jurídico español",
    "En materia de prevención de riesgos laborales:":
        "Las empresas deben garantizar la protección de las personas que trabajan en ellas",
    "¿Cuáles de las siguientes situaciones se corresponden con condiciones del trabajo relacionadas con el medio ambiente físico de trabajo?":
        "El uso de maquinaria ruidosa, la realización de trabajos al aire libre y el uso de productos químicos",
    "Un riesgo laboral se define como:":
        "La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo",
    "El Reglamento de los Servicios de Prevención, aprobado en el Real Decreto 39/1997.":
        "Establece modalidades de organización de los recursos para desarrollar la actividad preventiva",
    "Un accidente que tiene lugar en el camino de casa al trabajo:":
        "Puede ser considerado accidente de trabajo y se denomina in itinere",
    "¿Cuáles son las categorías en las que se suelen agrupar las condiciones de trabajo?":
        "Condiciones de seguridad, medio ambiente físico de trabajo, los contaminantes, carga de trabajo",
    "Las condiciones de trabajo son:":
        "Aquellas características del trabajo que pueden tener una influencia significativa en la generación de riesgos",
    "Hay que adoptar medidas preventivas para reducir el nivel de ruido:":
        "Cuando el nivel diario equivalente supera los 80 dB y el nivel pico los 135 dB",
    "El protocolo de actuación para activar el sistema de emergencia sanitaria consiste en":
        "Proteger a la persona accidentada de otros riesgos, luego avisar a la asistencia sanitaria especializada",
    "Un fuego de tipo A:":
        "Es aquel en el que se produce la combustión de materiales sólidos y el mejor agente extintor es el agua pulverizada",
    "Las situaciones de riesgo derivadas de las condiciones de seguridad que se pueden encontrar en un centro de trabajo son:":
        "Caída de personas y de objetos, choques, contactos eléctricos o incendios",
    "Indica qué debería hacer una persona que tiene una pequeña herida en una mano y tiene que manipular agentes químicos en el trabajo":
        "Tendría que protegerse la herida y usar guantes de protección frente a agentes químicos",
    "¿Cuáles son las principales medidas que se pueden adoptar para evitar el riesgo eléctrico?":
        "Mantener las instalaciones y los equipos de trabajo eléctricos en perfecto estado",
    "El riesgo de aparición de los trastornos musculoesqueléticos de los miembros superiores está condicionado por:":
        "La combinación de fuerza, repetición, postura y falta de descanso",
    "Para asegurar la evacuación en caso de fallo eléctrico, todos los centros de trabajo deben disponer de:":
        "Un sistema de iluminación de emergencia que permita la evacuación",
    "Cuando hay situaciones de riesgo derivadas de la exposición a agentes químicos, físicos o biológicos en el trabajo:":
        "Primero hay que adoptar medidas de control sobre el foco de emisión, luego sobre el medio de propagación",
    "El control de la salud del personal de la empresa consiste en:":
        "Detectar precozmente lesiones derivadas de la actividad laboral",
}
OPTION_FINGERPRINTS = {
    normalize_question(question): normalize_question(fingerprint)
    for question, fingerprint in OPTION_FINGERPRINTS_RAW.items()
}


def match_by_option_text(options, answer_map):
    """Conservatively identify question from distinctive option wording."""
    observed = [normalize_question(str(option.get('label', '')) + ' ' +
                                   str(option.get('nearby', '')))
                for option in options]
    matched = [key for key, needle in OPTION_FINGERPRINTS.items()
               if key in answer_map and len(needle) >= 35 and
               any(needle in value for value in observed)]
    if len(matched) == 1:
        return answer_map[matched[0]]
    return None


def match_question(contexts, answer_map, options=None):
    """Match a question using local context; no guessing from group number.

    First match exact normalized question text. For a tiny typography/edit
    difference, consider only a whole interrogative sentence and require an
    exceptionally high similarity plus a clear gap from alternatives.
    """
    for raw_context in contexts:
        context = normalize_question(raw_context)
        matches = [key for key in answer_map if len(key) >= 12 and key in context]
        if len(matches) == 1:
            return answer_map[matches[0]]
        # A broader ancestor can contain several questions; never decide
        # based on which one happened to be earlier in the JSON.

    for raw_context in contexts[:5]:
        candidates = re.findall(r"¿[^?\n]{12,650}\?", raw_context)
        for sentence in reversed(candidates):
            fragment = normalize_question(sentence)
            ranking = sorted(
                ((difflib.SequenceMatcher(None, fragment, key).ratio(), key)
                 for key in answer_map if len(key) >= 12), reverse=True
            )
            if ranking and ranking[0][0] >= 0.975 and (
                len(ranking) == 1 or ranking[0][0] - ranking[1][0] >= 0.08
            ):
                return answer_map[ranking[0][1]]
    if options:
        return match_by_option_text(options, answer_map)
    return None


def unmatched_context(group):
    """A local question-text preview for debugging (no credentials/HTML)."""
    contexts = group.get('contexts') or []
    lines = []
    for item in contexts[:3]:
        item = re.sub(r"\s+", " ", item).strip()
        if item and item not in lines:
            lines.append(item[-330:])
    return ' | '.join(lines) or '(no nearby question text found)'


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
                matched = match_question(g['contexts'], answer_map, g['options'])
                if not matched:
                    hints = ' | '.join(
                        (o.get('nearby') or o.get('label') or '')[:115]
                        for o in g.get('options', [])[:3]
                    )
                    unmatched.append(
                        f"{g['key']} | nearby: {unmatched_context(g)} | options: {hints[:260]}"
                    )
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


async def select_mapped_answers(lesson, answer_map, delay_range=(10.0, 15.0), timeout=25):
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
            await pause_between_answers(delay_range)

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


async def save_diagnostics(lesson, unit):
    folder = Path("mentoaula_diagnostics") / ACTIVE_USER.get()
    folder.mkdir(parents=True, exist_ok=True)
    try:
        await lesson.screenshot(path=str(folder / f"unit_{unit:02d}_screenshot.png"), full_page=True)
        print(f"Diagnostic screenshot: {folder / f'unit_{unit:02d}_screenshot.png'}")
    except Exception:
        pass
    # Save only the quiz iframe HTML, locally. It may contain course data.
    for frame in reversed(lesson.frames[:40]):
        try:
            if 'loadSco' in frame.url or 'scorm' in frame.url.lower() or \
                    await frame.locator('input[type="radio"], [role="radiogroup"]').count():
                (folder / f"unit_{unit:02d}_frame.html").write_text(
                    await frame.content(), encoding="utf-8")
                print(f"Diagnostic HTML: {folder / f'unit_{unit:02d}_frame.html'}")
                break
        except Exception:
            pass


def parse_units(spec):
    """Accept '1-13', '2-13', or '1,3,5-7' (one-based unit numbers)."""
    found = []
    for fragment in spec.split(","):
        fragment = fragment.strip()
        if not fragment:
            raise ValueError(f"Invalid unit range: {spec!r}")
        if "-" in fragment:
            left, right = fragment.split("-", 1)
            first, last = int(left), int(right)
            if first > last:
                raise ValueError(f"Unit range must be ascending: {fragment}")
            values = range(first, last + 1)
        else:
            values = [int(fragment)]
        for unit in values:
            if not 1 <= unit <= 13:
                raise ValueError(f"Unit {unit} is outside the supported 1-13 range")
            if unit not in found:
                found.append(unit)
    return found




# ---- Multi-account scheduling, durable checkpoints, and resume -------------

DONE_STATUSES = {"corregir_clicked", "selected_not_submitted"}
REVIEW_STATUSES = {"submit_intent", "review_required"}


def utc_now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")


def load_accounts(path: Path):
    if not path.is_file():
        raise FileNotFoundError(f"Accounts file missing: {path} (see bundled mentoaula_accounts.json)")
    values = json.loads(path.read_text(encoding="utf-8-sig"))
    if not isinstance(values, list) or not values:
        raise ValueError("Accounts JSON must be a nonempty array.")
    accounts = {}
    for row in values:
        if not isinstance(row, dict):
            raise ValueError("Each account must be {username, password}.")
        username, password = row.get("username"), row.get("password")
        if not isinstance(username, str) or not re.fullmatch(r"[A-Za-z0-9]{6,30}", username):
            raise ValueError("Invalid username in credentials file.")
        if not isinstance(password, str) or not password:
            raise ValueError(f"Missing password for {username}.")
        if username in accounts:
            raise ValueError(f"Duplicate username: {username}")
        accounts[username] = password
    return accounts


class SingleInstanceLock:
    """OS lock released on normal exit AND abrupt process termination."""
    def __init__(self, path):
        self.path = Path(path)
        self.handle = None

    def __enter__(self):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.handle = self.path.open("a+b")
        self.handle.seek(0)
        self.handle.write(b"0")
        self.handle.flush()
        try:
            if os.name == "nt":
                import msvcrt
                self.handle.seek(0)
                msvcrt.locking(self.handle.fileno(), msvcrt.LK_NBLCK, 1)
            else:
                import fcntl
                fcntl.flock(self.handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError as exc:
            self.handle.close()
            raise RuntimeError("Another run is using this state file; stop that run first.") from exc
        return self

    def __exit__(self, *unused):
        try:
            if self.handle is not None:
                if os.name == "nt":
                    import msvcrt
                    self.handle.seek(0)
                    msvcrt.locking(self.handle.fileno(), msvcrt.LK_UNLCK, 1)
                else:
                    import fcntl
                    fcntl.flock(self.handle.fileno(), fcntl.LOCK_UN)
        finally:
            if self.handle is not None:
                self.handle.close()


class State:
    def __init__(self, path: Path, units: list[int], accounts: dict, no_correct: bool):
        path.parent.mkdir(parents=True, exist_ok=True)
        self.path = path
        self.db = sqlite3.connect(str(path), timeout=30)
        self.db.execute("PRAGMA journal_mode=WAL")
        self.db.execute("PRAGMA synchronous=FULL")
        self.db.executescript("""
            CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS users (
                position INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE
            );
            CREATE TABLE IF NOT EXISTS units (
                username TEXT NOT NULL, unit INTEGER NOT NULL,
                status TEXT NOT NULL, answers INTEGER NOT NULL DEFAULT 0,
                details TEXT NOT NULL DEFAULT '', updated_utc TEXT NOT NULL,
                PRIMARY KEY(username, unit)
            );
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL,
                username TEXT NOT NULL, unit INTEGER, status TEXT NOT NULL,
                message TEXT NOT NULL
            );
        """)
        existing_units = self.meta('units')
        existing_mode = self.meta('no_correct')
        if existing_units is not None and json.loads(existing_units) != units:
            raise RuntimeError("Existing state was created for different --units. Use the same --units or a different --state file.")
        if existing_mode is not None and bool(json.loads(existing_mode)) != no_correct:
            raise RuntimeError("Existing state was created with a different --no-correct mode. Use a new --state file for that mode.")
        if existing_units is None:
            self.db.execute("INSERT INTO meta VALUES (?,?)", ('units',json.dumps(units)))
            self.db.execute("INSERT INTO meta VALUES (?,?)", ('no_correct',json.dumps(no_correct)))
        self.units = units
        self.no_correct = no_correct
        saved = [r[0] for r in self.db.execute("SELECT username FROM users ORDER BY position")]
        missing = set(saved) - set(accounts)
        if missing:
            raise RuntimeError("Previously scheduled users missing from credentials: " + ", ".join(sorted(missing)))
        new = list(set(accounts) - set(saved))
        RNG.shuffle(new)
        for index, username in enumerate(new, start=len(saved)):
            self.db.execute("INSERT INTO users (position,username) VALUES (?,?)", (index,username))
        self.db.commit()
        self.ordered_users = [r[0] for r in self.db.execute('SELECT username FROM users ORDER BY position')]
        self.accounts = accounts
        self.snapshot_path = path.with_suffix('.progress.json')
        self.snapshot()

    def meta(self, key):
        row=self.db.execute('SELECT value FROM meta WHERE key=?',(key,)).fetchone()
        return row[0] if row else None

    def get(self, username, unit):
        row = self.db.execute("SELECT status, answers, details FROM units WHERE username=? AND unit=?", (username,unit)).fetchone()
        return None if row is None else {'status':row[0], 'answers':row[1], 'details':row[2]}

    def set(self, username, unit, status, answers=0, details=''):
        # Store state and history in a single synchronous COMMIT before proceeding.
        now=utc_now()
        with self.db:
            self.db.execute("""
                INSERT INTO units (username,unit,status,answers,details,updated_utc)
                VALUES (?,?,?,?,?,?)
                ON CONFLICT(username,unit) DO UPDATE SET status=excluded.status,
                  answers=excluded.answers,details=excluded.details,updated_utc=excluded.updated_utc
            """,(username,unit,status,int(answers),sanitized(details)[:500],now))
            self.db.execute('INSERT INTO events (timestamp,username,unit,status,message) VALUES (?,?,?,?,?)',
                            (now,username,unit,status,sanitized(details)[:500]))
        self.snapshot()

    def record(self, username, status, details):
        with self.db:
            self.db.execute('INSERT INTO events (timestamp,username,unit,status,message) VALUES (?,?,?,?,?)',
                            (utc_now(),username,None,status,sanitized(details)[:500]))

    def pending(self, username, retry_uncertain=False):
        remaining=[]
        for unit in self.units:
            row=self.get(username,unit)
            if row and row['status'] in DONE_STATUSES:
                continue
            if row and row['status'] in REVIEW_STATUSES and not retry_uncertain:
                continue
            remaining.append(unit)
        return remaining

    def counts(self):
        done_status = 'selected_not_submitted' if self.no_correct else 'corregir_clicked'
        done = self.db.execute('SELECT COUNT(*) FROM units WHERE status=? AND unit IN ('+(','.join('?'*len(self.units)))+')',
                               (done_status,*self.units)).fetchone()[0]
        review = self.db.execute('SELECT COUNT(*) FROM units WHERE status IN ("submit_intent","review_required")').fetchone()[0]
        total=len(self.ordered_users)*len(self.units)
        finished = sum(not self.pending(u) and all((self.get(u,n) or {}).get('status') == done_status
                                                   for n in self.units) for u in self.ordered_users)
        return {'done':done,'review':review,'total':total,'percent':round(100.0*done/total,2) if total else 100.0,
                'finished_users':finished,'total_users':len(self.ordered_users)}

    def snapshot(self):
        counts=self.counts()
        rows=self.db.execute('SELECT username,unit,status,answers,details,updated_utc FROM units ORDER BY username,unit')
        outcomes={u:{} for u in self.ordered_users}
        for u,n,s,a,d,t in rows:
            if u in outcomes and n in self.units:
                outcomes[u][str(n)]={'status':s,'answers':a,'details':d,'updated_utc':t}
        payload={'updated_utc':utc_now(), 'units':self.units, 'summary':counts,
                 'users_random_order':self.ordered_users, 'results':outcomes}
        self.snapshot_path.parent.mkdir(parents=True,exist_ok=True)
        tmp=self.snapshot_path.with_suffix('.tmp')
        tmp.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
        tmp.replace(self.snapshot_path)

    def close(self):
        self.db.close()


async def sleep_range(delay, label):
    lo,hi=delay
    if hi <= 0: return
    wait = RNG.uniform(lo,hi) if lo!=hi else lo
    print(f'{label}: {wait:.1f}s')
    await asyncio.sleep(wait)


def report_progress(state, user, unit, status, answers):
    c=state.counts()
    print(f'PROGRESS | {user} | Unit {unit:02d} | {status} | {answers} answers | '
          f'{c["done"]}/{c["total"]} units ({c["percent"]:.2f}%) | '
          f'{c["finished_users"]}/{c["total_users"]} users finished | '
          f'{c["review"]} for review')


async def process_one_unit(state, dashboard, context, username, unit, answer_map, args):
    """A committed submit_intent avoids silent double-submission after a crash."""
    lesson=None
    state.set(username,unit,'running')
    try:
        await dashboard.bring_to_front()
        lesson=await open_unit(dashboard, context, unit)
        await check_campus_connected(lesson)
        await open_test(lesson)
        scoped=unit_answer_scope(answer_map,unit)
        answered=await select_mapped_answers(lesson, scoped, delay_range=args.answer_delay)
        if answered != 10:
            raise RuntimeError(f'Expected 10 verified answers, found {answered}; not submitting')
        if args.no_correct:
            state.set(username,unit,'selected_not_submitted',answers=answered,
                      details='10 answers verified; --no-correct')
            report_progress(state,username,unit,'selected_not_submitted',answered)
            return True
        # An interruption after this commit could mean the result was saved.
        # Do NOT silently retry a potentially graded unit when resuming.
        state.set(username,unit,'submit_intent',answers=answered,
                  details='All answers selected; about to click Corregir')
        await click_corregir(lesson)
        state.set(username,unit,'corregir_clicked',answers=answered,
                  details='Corregir clicked; grade/server acceptance not confirmed')
        report_progress(state,username,unit,'corregir_clicked',answered)
        await asyncio.sleep(1.5)
        return True
    except asyncio.CancelledError:
        print(f'Interrupted during Unit {unit}; checkpoint preserved.')
        raise
    except Exception as exc:
        before=state.get(username,unit)
        uncertain=before and before['status'] in REVIEW_STATUSES
        status='review_required' if uncertain else 'error'
        message=f'{type(exc).__name__}: {str(exc)[:300]}'
        state.set(username,unit,status,answers=before['answers'] if before else 0,details=message)
        print(f'UNIT ERROR | Unit {unit:02d} | {status}: {message}')
        if lesson is not None and not lesson.is_closed():
            await save_diagnostics(lesson,unit)
        report_progress(state,username,unit,status,0)
        return False
    finally:
        if lesson is not None and not lesson.is_closed():
            try: await lesson.close()
            except Exception: pass


async def login_account(context, username, password):
    dashboard = await context.new_page()
    await dashboard.goto(URL, wait_until='domcontentloaded',timeout=45000)
    user=await first_visible(dashboard,[lambda f:f.locator('#usuario')],30)
    pwd=await first_visible(dashboard,[lambda f:f.locator('#password')],30)
    submit=await first_visible(dashboard,[lambda f:f.locator('#btnLogin')],30)
    if not all((user,pwd,submit)):
        raise RuntimeError('Login form missing')
    await user.fill(username)
    await pwd.fill(password)
    await submit.click(timeout=15000)
    # Wait for authenticated dashboard instead of accepting a click as login.
    unit_header=await first_visible(dashboard,[lambda f:f.locator('#tod01')],45)
    if unit_header is None:
        raise RuntimeError('Login not confirmed: unit dashboard not found')
    print('Logged in; authenticated dashboard detected.')
    return dashboard


async def run_account(browser, state, username, args, answer_map):
    token=ACTIVE_USER.set(username)
    context=None
    try:
        todo=state.pending(username,args.retry_uncertain)
        if not todo:
            return
        print(f'START | {len(todo)} remaining unit tests. Session isolated.')
        context=await browser.new_context(viewport={'width':1400,'height':900},locale='es-ES',
                                          accept_downloads=False)
        dashboard=None
        for attempt in range(1,args.login_retries+1):
            try:
                dashboard=await login_account(context,username,state.accounts[username])
                break
            except asyncio.CancelledError: raise
            except Exception as exc:
                print(f'Login attempt {attempt}/{args.login_retries} failed: {type(exc).__name__} ({str(exc)[:130]})')
                if attempt >= args.login_retries: raise
                # Recreate the dashboard page, not the user's isolation context.
                for pg in list(context.pages):
                    try: await pg.close()
                    except Exception: pass
                await asyncio.sleep(min(attempt*5,20))
        for i,unit in enumerate(todo):
            if i: await sleep_range(args.test_delay, 'Between tests')
            print(f'UNIT START | {unit:02d} | {i+1}/{len(todo)} remaining')
            ok=await process_one_unit(state,dashboard,context,username,unit,answer_map,args)
            if not ok and args.stop_account_on_error:
                print(f'Stopping this account after Unit {unit} failure; other accounts continue.')
                break
        current=state.counts()
        print(f'ACCOUNT DONE | Global {current["done"]}/{current["total"]} ({current["percent"]:.2f}%).')
    except asyncio.CancelledError:
        print('Session cancelled; completed checkpoints preserved.')
        raise
    except Exception as exc:
        error=f'{type(exc).__name__}: {str(exc)[:250]}'
        print(f'ACCOUNT ERROR | {error}')
        state.record(username,'account_error',error)
    finally:
        if context is not None:
            try: await context.close()
            except Exception: pass
        ACTIVE_USER.reset(token)


async def orchestrate(args):
    global LOG_PATH, SECRET_VALUES
    accounts=load_accounts(args.accounts)
    SECRET_VALUES = tuple(accounts.values())
    units=parse_units(args.units)
    answer_map=load_answers()
    LOG_PATH=args.state.with_suffix('.log')
    state=State(args.state,units,accounts,args.no_correct)
    try:
        pending=[u for u in state.ordered_users if state.pending(u,args.retry_uncertain)]
        counts=state.counts()
        print(f'Accounts supplied: {len(accounts)} distinct accounts.')
        print(f'Units/account: {len(units)} | Total units: {counts["total"]} | '
              f'Already done: {counts["done"]} ({counts["percent"]:.2f}%).')
        print(f'Pending accounts: {len(pending)} | max concurrency {args.concurrency} | '
              f'bootstrap gap {args.launch_interval:g}s')
        print(f'Answer delay {args.answer_delay}, test delay {args.test_delay}, '
              f'Corregir {"DISABLED" if args.no_correct else "ENABLED"}.')
        if counts['review'] and not args.retry_uncertain:
            print(f'WARNING: {counts["review"]} unit(s) potentially submitted; '
                  'skipping pending review to prevent duplicate attempts.')
        if not pending:
            print('No runnable pending accounts. Check the progress JSON for any review_required units.')
            return
        semaphore=asyncio.Semaphore(args.concurrency)
        running=[]
        last_launch=None
        async with async_playwright() as pw:
            browser=await pw.chromium.launch(headless=not args.headed,
                                            args=['--disable-popup-blocking'])
            try:
                for idx,username in enumerate(pending,start=1):
                    await semaphore.acquire()
                    if last_launch is not None:
                        seconds=max(0.0,args.launch_interval-(time.monotonic()-last_launch))
                        if seconds:
                            print(f'Next user bootstrap in {seconds:.1f}s ({idx}/{len(pending)}).')
                            await asyncio.sleep(seconds)
                    # Allocating a slot and recording the start are synchronous;
                    # so no two users bootstrap within the configured gap.
                    last_launch=time.monotonic()
                    print(f'BOOTSTRAP {idx}/{len(pending)} | {username}')
                    async def one(user=username):
                        try:
                            await run_account(browser,state,user,args,answer_map)
                        finally:
                            semaphore.release()
                    task=asyncio.create_task(one(),name=f'mendo-{username}')
                    running.append(task)
                await asyncio.gather(*running)
            finally:
                if running:
                    for task in running:
                        if not task.done(): task.cancel()
                    await asyncio.gather(*running,return_exceptions=True)
                await browser.close()
        state.snapshot()
        counts=state.counts()
        print(f'FINAL | {counts["done"]}/{counts["total"]} unit tests '
              f'({counts["percent"]:.2f}%) | '
              f'{counts["finished_users"]}/{counts["total_users"]} users fully processed | '
              f'{counts["review"]} to review')
        print(f'Checkpoint: {args.state} | Snapshot: {state.snapshot_path} | Log: {LOG_PATH}')
    finally:
        state.snapshot()
        state.close()


def main():
    parser=argparse.ArgumentParser(description='Resume-safe MentoAula multi-account test navigation, selection and correction')
    parser.add_argument('--accounts',type=Path,default=Path(__file__).with_name('mentoaula_accounts.json'))
    parser.add_argument('--units',default='1-13',help='e.g. 1-13 or 2,10,11,13')
    parser.add_argument('--answer-delay','--delay',type=parse_delay,default=(5.0,10.0),dest='answer_delay',
                        metavar='SECONDS|MIN-MAX',help='Pause BETWEEN answer selections (default 5-10)')
    parser.add_argument('--test-delay',type=parse_delay,default=(30.0,60.0),metavar='SECONDS|MIN-MAX',
                        help='Pause BETWEEN tests per account (default 30-60)')
    parser.add_argument('--concurrency',type=int,default=35,help='Maximum simultaneously active accounts (default 35)')
    parser.add_argument('--launch-interval',type=float,default=180.0,help='Minimum seconds between account starts (default 180)')
    parser.add_argument('--state',type=Path,default=Path('mentoaula_multi_state.sqlite'),
                        help='Persistent SQLite checkpoint; reuse path to resume')
    parser.add_argument('--headed',action='store_true',help='Show browser windows (not recommended for many users)')
    parser.add_argument('--no-correct',action='store_true',help='Do not click Corregir; use a separate --state file')
    parser.add_argument('--retry-uncertain',action='store_true',
                        help='Explicitly retry potentially submitted attempts; may create duplicates')
    parser.add_argument('--login-retries',type=int,default=2)
    parser.add_argument('--stop-account-on-error',action='store_true',
                        help='Stop failed account and resume later; others continue')
    args=parser.parse_args()
    if not 1<=args.concurrency<=35:
        parser.error('--concurrency must be between 1 and 35')
    if args.launch_interval<0: parser.error('--launch-interval must be nonnegative')
    if not 1<=args.login_retries<=5: parser.error('--login-retries must be between 1 and 5')
    try:
        lock_path=args.state.with_suffix('.lock')
        with SingleInstanceLock(lock_path):
            asyncio.run(orchestrate(args))
    except KeyboardInterrupt:
        builtins.print('Interrupted. Checkpoints saved; rerun the same command to resume.',flush=True)
    except Exception as exc:
        builtins.print(f'ERROR: {type(exc).__name__}: {exc}',file=sys.stderr,flush=True)
        sys.exit(1)

if __name__=='__main__':
    main()
