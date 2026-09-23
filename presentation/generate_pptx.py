"""
Script para generar la presentación PPTX de El Búho Tragón
"Evolución tecnológica de un proyecto de software: del problema a la solución"
XXXV Semana Nacional de Investigación y Docencia en Matemáticas 2026
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import os

# === COLORES ===
COLOR_FONDO = RGBColor(0x0E, 0x22, 0x46)       # Azul oscuro UNISON #0e2246
COLOR_FONDO_OSCURO = RGBColor(0x07, 0x13, 0x26) # #071326
COLOR_ACENTO = RGBColor(0xB3, 0x9A, 0x3A)       # Dorado #B39A3A
COLOR_TEXTO_PRINCIPAL = RGBColor(0xF2, 0xF2, 0xF0) # Blanco marfil
COLOR_TEXTO_SECUNDARIO = RGBColor(0xA0, 0xB4, 0xC8) # Azul grisáceo claro
COLOR_ACENTO2 = RGBColor(0x4A, 0x9E, 0xD4)     # Azul claro
COLOR_ALERTA = RGBColor(0xFF, 0x7A, 0x5A)       # Naranja suave

prs = Presentation()
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)

BLANK_LAYOUT = prs.slide_layouts[6]  # Blank layout

def set_slide_bg(slide, color=COLOR_FONDO):
    """Set slide background color."""
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_text_box(slide, text, left, top, width, height, font_size=18, bold=False,
                  color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.LEFT, italic=False):
    """Add a text box to a slide."""
    txBox = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.italic = italic
    return txBox

def add_multiline_text(slide, lines, left, top, width, height, font_size=16,
                        bold=False, color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.LEFT,
                        line_spacing=None):
    """Add a text box with multiple lines (list of (text, bold, color, size) tuples or strings)."""
    txBox = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = txBox.text_frame
    tf.word_wrap = True
    first = True
    for item in lines:
        if isinstance(item, str):
            text, b, c, s = item, bold, color, font_size
        else:
            text = item.get('text', '')
            b = item.get('bold', bold)
            c = item.get('color', color)
            s = item.get('size', font_size)
        if first:
            p = tf.paragraphs[0]
            first = False
        else:
            p = tf.add_paragraph()
        p.alignment = align
        run = p.add_run()
        run.text = text
        run.font.size = Pt(s)
        run.font.bold = b
        run.font.color.rgb = c
    return txBox

def add_divider(slide, top, color=COLOR_ACENTO, width=11, left=1.15):
    """Add a thin horizontal divider line."""
    line = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        Inches(left), Inches(top), Inches(width), Inches(0.03)
    )
    line.fill.solid()
    line.fill.fore_color.rgb = color
    line.line.fill.background()

def add_section_label(slide, text, top=0.2, left=0.5, color=COLOR_ACENTO):
    """Add a small section label at the top."""
    add_text_box(slide, text, left, top, 4, 0.35, font_size=9, bold=True,
                  color=color, italic=True)

def add_speaker_tag(slide, name, top=6.9, left=0.5):
    """Add a speaker indicator at the bottom."""
    add_text_box(slide, f"▸ {name}", left, top, 4, 0.35, font_size=9, bold=False,
                  color=COLOR_TEXTO_SECUNDARIO)

# ============================================================
# SLIDE 1 — PORTADA
# ============================================================
slide1 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide1)

# Decorative top bar
bar = slide1.shapes.add_shape(1, Inches(0), Inches(0), Inches(13.33), Inches(0.08))
bar.fill.solid(); bar.fill.fore_color.rgb = COLOR_ACENTO; bar.line.fill.background()

# Title
txBox = slide1.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.33), Inches(2.2))
tf = txBox.text_frame; tf.word_wrap = True
p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
run = p.add_run()
run.text = "Evolución tecnológica de un proyecto de software:"
run.font.size = Pt(32); run.font.bold = True; run.font.color.rgb = COLOR_TEXTO_PRINCIPAL
p2 = tf.add_paragraph(); p2.alignment = PP_ALIGN.CENTER
run2 = p2.add_run()
run2.text = "del problema a la solución"
run2.font.size = Pt(32); run2.font.bold = True; run2.font.color.rgb = COLOR_ACENTO

# Owl emoji / project name
add_text_box(slide1, "🦉  El Búho Tragón", 1.0, 3.9, 11.33, 0.6, font_size=20,
              bold=False, color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

add_divider(slide1, 4.7)

# Authors
add_text_box(slide1, "Joaquin Alfredo Castro Córdova  ·  Owen Adiel Solis Zatarain",
              1.0, 4.85, 11.33, 0.5, font_size=15, bold=True,
              color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.CENTER)

add_text_box(slide1, "Universidad de Sonora  ·  Licenciatura en Ciencias de la Computación",
              1.0, 5.4, 11.33, 0.45, font_size=13, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

add_text_box(slide1, "XXXV Semana Nacional de Investigación y Docencia en Matemáticas  ·  Septiembre 2026",
              1.0, 5.9, 11.33, 0.45, font_size=11, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

# Bottom bar
bar2 = slide1.shapes.add_shape(1, Inches(0), Inches(7.42), Inches(13.33), Inches(0.08))
bar2.fill.solid(); bar2.fill.fore_color.rgb = COLOR_ACENTO; bar2.line.fill.background()

# ============================================================
# SLIDE 2 — EL PROBLEMA
# ============================================================
slide2 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide2)
add_section_label(slide2, "ACTO 1 — EL PROBLEMA ERA SENCILLO")

# Big question
txBox2 = slide2.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.33), Inches(2.0))
tf2 = txBox2.text_frame; tf2.word_wrap = True
p = tf2.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
run = p.add_run()
run.text = "¿Dónde venden hamburguesas en el campus?"
run.font.size = Pt(34); run.font.bold = True; run.font.color.rgb = COLOR_TEXTO_PRINCIPAL

add_divider(slide2, 3.7, color=COLOR_ACENTO2, width=6, left=3.66)

add_multiline_text(slide2, [
    {'text': '¿A cuánto están?', 'bold': False, 'color': COLOR_TEXTO_SECUNDARIO, 'size': 20},
    {'text': '¿Está abierto ahorita?', 'bold': False, 'color': COLOR_TEXTO_SECUNDARIO, 'size': 20},
    {'text': '¿Qué venden de bueno?', 'bold': False, 'color': COLOR_TEXTO_SECUNDARIO, 'size': 20},
], 1.0, 3.85, 11.33, 1.5, align=PP_ALIGN.CENTER)

add_text_box(slide2, "La información existe. Solo está dispersa.",
              1.0, 5.5, 11.33, 0.6, font_size=16, bold=True,
              color=COLOR_ACENTO, align=PP_ALIGN.CENTER)
add_speaker_tag(slide2, "Joaquin Castro")

# ============================================================
# SLIDE 3 — PRIMERA SOLUCIÓN
# ============================================================
slide3 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide3)
add_section_label(slide3, "ACTO 1 — LA PRIMERA SOLUCIÓN")

add_text_box(slide3, "Primera versión: un catálogo", 0.6, 0.55, 12, 0.7,
              font_size=26, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide3, 1.4)

# Two columns
# Left: Problem
add_text_box(slide3, "El problema", 0.7, 1.6, 5.0, 0.45, font_size=14, bold=True, color=COLOR_ACENTO)
add_multiline_text(slide3, [
    "¿Dónde está la tiendita?",
    "¿Qué venden?",
    "¿Cuánto cuesta?",
], 0.7, 2.1, 5.0, 1.5, font_size=16, color=COLOR_TEXTO_PRINCIPAL)

# Right: Solution
add_text_box(slide3, "La solución", 7.0, 1.6, 5.5, 0.45, font_size=14, bold=True, color=COLOR_ACENTO)
add_multiline_text(slide3, [
    "Base de datos de cafeterías",
    "API REST",
    "Interfaz web (catálogo)",
], 7.0, 2.1, 5.5, 1.5, font_size=16, color=COLOR_TEXTO_PRINCIPAL)

# Vertical divider
vdiv = slide3.shapes.add_shape(1, Inches(6.4), Inches(1.55), Inches(0.03), Inches(2.2))
vdiv.fill.solid(); vdiv.fill.fore_color.rgb = COLOR_ACENTO; vdiv.line.fill.background()

add_divider(slide3, 4.15)

add_text_box(slide3, "Ingeniería de Software I  ·  Primer commit: Marzo 2025",
              0.7, 4.3, 12, 0.45, font_size=13, bold=False,
              color=COLOR_TEXTO_SECUNDARIO)

# Typo note
txNote = slide3.shapes.add_textbox(Inches(0.7), Inches(4.9), Inches(12), Inches(0.5))
tf = txNote.text_frame; tf.word_wrap = True
p = tf.paragraphs[0]
run1 = p.add_run(); run1.text = "Primer commit real: "; run1.font.size = Pt(13)
run1.font.color.rgb = COLOR_TEXTO_SECUNDARIO
run2 = p.add_run(); run2.text = '"Crear Estructura del Peoyecto"'
run2.font.size = Pt(13); run2.font.color.rgb = COLOR_ACENTO; run2.font.italic = True
run3 = p.add_run(); run3.text = "  (typo real — evidencia de que fue un proyecto auténtico)"
run3.font.size = Pt(13); run3.font.color.rgb = COLOR_TEXTO_SECUNDARIO

add_speaker_tag(slide3, "Joaquin Castro")

# ============================================================
# SLIDE 4 — EL PROYECTO CRECE
# ============================================================
slide4 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide4)
add_section_label(slide4, "ACTO 2 — EL PROBLEMA EMPEZÓ A CRECER")

add_text_box(slide4, "Cada pregunta nueva... es un problema nuevo.", 0.6, 0.55, 12, 0.7,
              font_size=26, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide4, 1.4)

questions = [
    ("¿Dónde exactamente está esa tiendita?", "→  Mapas"),
    ("¿Está abierta ahorita?",                "→  Horarios"),
    ("¿Qué opina la gente de ese lugar?",     "→  Reseñas"),
    ("¿Quién puede actualizar la información?", "→  Administración"),
    ("¿Cómo sé que eres tú y no otra persona?", "→  Autenticación"),
]

y = 1.55
for q, sol in questions:
    txBox = slide4.shapes.add_textbox(Inches(0.7), Inches(y), Inches(12.5), Inches(0.5))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    run1 = p.add_run(); run1.text = q
    run1.font.size = Pt(17); run1.font.color.rgb = COLOR_TEXTO_PRINCIPAL
    run2 = p.add_run(); run2.text = f"   {sol}"
    run2.font.size = Pt(17); run2.font.color.rgb = COLOR_ACENTO; run2.font.bold = True
    y += 0.85

add_speaker_tag(slide4, "Owen Solis")

# ============================================================
# SLIDE 5 — CADA NECESIDAD, UNA DECISIÓN
# ============================================================
slide5 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide5)
add_section_label(slide5, "ACTO 2 — DECISIONES TECNOLÓGICAS")

add_text_box(slide5, "Problema  →  Necesidad  →  Decisión", 0.6, 0.55, 12, 0.7,
              font_size=28, bold=True, color=COLOR_ACENTO)
add_divider(slide5, 1.4)

rows = [
    ("Ubicación física desconocida",         "Leaflet + OpenStreetMap"),
    ("Horarios de apertura/cierre",          "Campo en BD + cálculo en frontend"),
    ("Opiniones de otros estudiantes",       "Sistema de reseñas (Modelo + API)"),
    ("Control de acceso a edición",          "JWT + roles admin/estudiante"),
    ("Gestión de datos del catálogo",        "Panel de administración CRUD"),
]

y = 1.55
for necesidad, decision in rows:
    txBox = slide5.shapes.add_textbox(Inches(0.7), Inches(y), Inches(12.5), Inches(0.5))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    run1 = p.add_run(); run1.text = f"• {necesidad:<45}"
    run1.font.size = Pt(16); run1.font.color.rgb = COLOR_TEXTO_PRINCIPAL
    run2 = p.add_run(); run2.text = f"  →  {decision}"
    run2.font.size = Pt(16); run2.font.color.rgb = COLOR_ACENTO2; run2.font.bold = True
    y += 0.82

add_text_box(slide5, "En ningún caso elegimos primero la tecnología. Primero apareció el problema.",
              0.7, 6.5, 12, 0.55, font_size=14, bold=True,
              color=COLOR_ACENTO, align=PP_ALIGN.LEFT, italic=True)
add_speaker_tag(slide5, "Owen Solis")

# ============================================================
# SLIDE 6 — ARQUITECTURA RESULTANTE
# ============================================================
slide6 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide6)
add_section_label(slide6, "ACTO 2 — ARQUITECTURA EN 3 CAPAS")

add_text_box(slide6, "La arquitectura que resultó de esas decisiones", 0.6, 0.55, 12, 0.6,
              font_size=24, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide6, 1.28)

# Three layer boxes
layer_data = [
    (COLOR_ACENTO2,    "FRONTEND",  "React 19  ·  Vite 6  ·  TailwindCSS 4\nMapas (Leaflet)  ·  Chat  ·  Reseñas  ·  Admin"),
    (COLOR_ACENTO,     "BACKEND",   "Django 5  ·  Django REST Framework\nJWT  ·  SQLite  ·  14 cafeterías  ·  482 platillos"),
    (COLOR_ALERTA,     "MOTOR RAG", "FAISS  ·  CrossEncoder  ·  Qwen2.5-14B-Instruct\nClúster Yuca — ACARUS — Universidad de Sonora"),
]

y_start = 1.5
box_h = 1.35
gap = 0.4
arrow_h = 0.3

for i, (color, label, content) in enumerate(layer_data):
    y = y_start + i * (box_h + gap + arrow_h)

    # Box background
    rect = slide6.shapes.add_shape(1, Inches(2.0), Inches(y), Inches(9.33), Inches(box_h))
    rect.fill.solid(); rect.fill.fore_color.rgb = RGBColor(0x10, 0x28, 0x50)
    rect.line.color.rgb = color; rect.line.width = Pt(1.5)

    # Label
    add_text_box(slide6, label, 2.3, y + 0.1, 2.5, 0.4, font_size=13, bold=True, color=color)
    # Content
    add_text_box(slide6, content, 2.3, y + 0.52, 8.7, 0.75, font_size=14, color=COLOR_TEXTO_PRINCIPAL)

    # Arrow down (except last)
    if i < 2:
        arrow_y = y + box_h + 0.05
        add_text_box(slide6, "↓", 6.4, arrow_y, 0.5, 0.3, font_size=16, bold=True, color=COLOR_ACENTO, align=PP_ALIGN.CENTER)

add_speaker_tag(slide6, "Owen Solis")

# ============================================================
# SLIDE 7 — "HAY QUE METERLE IA"
# ============================================================
slide7 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide7, COLOR_FONDO_OSCURO)

add_text_box(slide7, '"Hay que meterle IA."', 0.8, 2.0, 11.73, 1.5,
              font_size=44, bold=True, color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.CENTER)

add_divider(slide7, 3.7, color=COLOR_ACENTO, width=5, left=4.16)

add_text_box(slide7, "¿Para qué?", 0.8, 3.85, 11.73, 0.9,
              font_size=32, bold=False, color=COLOR_ACENTO, align=PP_ALIGN.CENTER, italic=True)

add_text_box(slide7, "La idea informal se convirtió en una pregunta de ingeniería.",
              0.8, 5.2, 11.73, 0.6, font_size=15, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

add_speaker_tag(slide7, "Joaquin Castro")

# ============================================================
# SLIDE 8 — ¿PARA QUÉ IA?
# ============================================================
slide8 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide8)
add_section_label(slide8, "ACTO 3 — EL CASO DE USO DE LA IA")

add_text_box(slide8, "El caso de uso concreto: lenguaje natural", 0.6, 0.55, 12, 0.6,
              font_size=24, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide8, 1.28)

# Chat bubble example
chat_bg = slide8.shapes.add_shape(1, Inches(1.5), Inches(1.5), Inches(10.33), Inches(2.8))
chat_bg.fill.solid(); chat_bg.fill.fore_color.rgb = RGBColor(0x10, 0x28, 0x50)
chat_bg.line.color.rgb = COLOR_ACENTO2; chat_bg.line.width = Pt(1.0)

add_multiline_text(slide8, [
    {'text': '👤  Usuario:', 'bold': True, 'color': COLOR_ACENTO2, 'size': 15},
    {'text': '"¿Dónde venden torta cubana más barata?"', 'bold': True, 'color': COLOR_TEXTO_PRINCIPAL, 'size': 20},
    {'text': '', 'bold': False, 'color': COLOR_TEXTO_PRINCIPAL, 'size': 8},
    {'text': '🦉  El Buhito:', 'bold': True, 'color': COLOR_ACENTO, 'size': 15},
    {'text': '"La torta cubana más barata está en la Tiendita de Exactas\na $45.00 MXN, a 120 metros de tu ubicación actual."', 'bold': False, 'color': COLOR_TEXTO_PRINCIPAL, 'size': 17},
], 1.8, 1.6, 9.8, 2.5)

add_divider(slide8, 4.5)

add_text_box(slide8, "La búsqueda tradicional no puede responder esto.",
              0.7, 4.65, 12, 0.45, font_size=15, bold=True, color=COLOR_ALERTA)
add_text_box(slide8, "El lenguaje natural sí puede. Y el usuario no necesita aprender la sintaxis del sistema.",
              0.7, 5.2, 12, 0.45, font_size=14, bold=False, color=COLOR_TEXTO_SECUNDARIO)
add_speaker_tag(slide8, "Joaquin Castro")

# ============================================================
# SLIDE 9 — DEL LENGUAJE NATURAL AL RAG
# ============================================================
slide9 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide9)
add_section_label(slide9, "ACTO 3 — ¿POR QUÉ RAG?")

add_text_box(slide9, "RAG: Retrieval-Augmented Generation", 0.6, 0.55, 12, 0.6,
              font_size=26, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide9, 1.28)

# Comparison
add_text_box(slide9, "❌  Sin RAG", 0.7, 1.45, 5.5, 0.45, font_size=16, bold=True, color=COLOR_ALERTA)
add_multiline_text(slide9, [
    "Poner todos los datos al prompt",
    "482 platillos × datos = prompt gigante",
    "Ineficiente · se dispersa la atención",
    "No escala",
], 0.7, 1.95, 5.5, 2.0, font_size=15, color=COLOR_TEXTO_PRINCIPAL)

add_text_box(slide9, "✅  Con RAG", 7.1, 1.45, 5.5, 0.45, font_size=16, bold=True, color=COLOR_ACENTO2)
add_multiline_text(slide9, [
    "Buscar primero lo relevante",
    "Dar solo eso al modelo como contexto",
    "El modelo responde con datos reales",
    "Escala cuando crecen los datos",
], 7.1, 1.95, 5.5, 2.0, font_size=15, color=COLOR_TEXTO_PRINCIPAL)

# Vertical divider
vdiv9 = slide9.shapes.add_shape(1, Inches(6.5), Inches(1.4), Inches(0.03), Inches(2.7))
vdiv9.fill.solid(); vdiv9.fill.fore_color.rgb = COLOR_ACENTO; vdiv9.line.fill.background()

add_divider(slide9, 4.3)

add_text_box(slide9, "La clave: antes de generar, recuperar.",
              0.7, 4.45, 12, 0.5, font_size=18, bold=True,
              color=COLOR_ACENTO, align=PP_ALIGN.CENTER)
add_speaker_tag(slide9, "Joaquin Castro")

# ============================================================
# SLIDE 10 — PIPELINE RAG
# ============================================================
slide10 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide10)
add_section_label(slide10, "ACTO 3 — EL PIPELINE DEL RAG")

add_text_box(slide10, "8 pasos entre la pregunta y la respuesta", 0.6, 0.55, 12, 0.6,
              font_size=26, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide10, 1.28)

steps = [
    ("1", "Reformulación",    "Qwen reescribe la pregunta con contexto del historial"),
    ("2", "Fuzzy Matching",   "Detecta alias del campus: 'exactas', 'mates', 'conta'... (35+ apodos)"),
    ("3", "Embedding",        "Convierte la consulta en vector de 384 dimensiones (MiniLM-L12)"),
    ("4", "FAISS",            "Búsqueda semántica en el índice vectorial  →  top 50"),
    ("5", "Filtro geográfico","Descarta cafeterías a más de 2,500 metros (Haversine)"),
    ("6", "Re-ranking",       "CrossEncoder re-evalúa la relevancia  →  top 10"),
    ("7", "Generación",       "Qwen2.5-14B-Instruct genera respuesta  (temp=0.1)"),
    ("8", "Respuesta",        "Texto limpio al usuario"),
]

y = 1.5
col1_w = 0.45
col2_w = 1.8
col3_left = 3.0

for num, label, detail in steps:
    # Number circle
    circle = slide10.shapes.add_shape(9, Inches(0.5), Inches(y - 0.04), Inches(0.38), Inches(0.38))
    circle.fill.solid(); circle.fill.fore_color.rgb = COLOR_ACENTO; circle.line.fill.background()
    add_text_box(slide10, num, 0.5, y - 0.04, 0.38, 0.38, font_size=11, bold=True,
                  color=COLOR_FONDO_OSCURO, align=PP_ALIGN.CENTER)
    # Label
    add_text_box(slide10, label, 1.0, y - 0.03, 2.0, 0.4, font_size=13, bold=True, color=COLOR_ACENTO2)
    # Detail
    add_text_box(slide10, detail, 3.2, y - 0.03, 9.7, 0.4, font_size=12, color=COLOR_TEXTO_PRINCIPAL)
    y += 0.64

add_speaker_tag(slide10, "Owen Solis")

# ============================================================
# SLIDE 11 — MOMENTO MEMORABLE: ¿DÓNDE EJECUTAMOS?
# ============================================================
slide11 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide11, COLOR_FONDO_OSCURO)
add_section_label(slide11, "ACTO 3 — EL MOMENTO MEMORABLE", top=0.2)

# Left side: origin
add_text_box(slide11, "PUNTO DE PARTIDA", 0.5, 0.7, 5.8, 0.45, font_size=12, bold=True, color=COLOR_TEXTO_SECUNDARIO)
txb = slide11.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(5.8), Inches(2.5))
tf = txb.text_frame; tf.word_wrap = True
p = tf.paragraphs[0]
r1 = p.add_run(); r1.text = '"Crear Estructura del '; r1.font.size = Pt(22); r1.font.color.rgb = COLOR_TEXTO_PRINCIPAL
r2 = p.add_run(); r2.text = 'Peoyecto'; r2.font.size = Pt(22); r2.font.color.rgb = COLOR_ALERTA; r2.font.bold = True
r3 = p.add_run(); r3.text = '"'; r3.font.size = Pt(22); r3.font.color.rgb = COLOR_TEXTO_PRINCIPAL
p2 = tf.add_paragraph()
r4 = p2.add_run(); r4.text = "Marzo 2025"; r4.font.size = Pt(14); r4.font.color.rgb = COLOR_TEXTO_SECUNDARIO; r4.font.italic = True

# Center arrow
add_text_box(slide11, "?", 5.9, 2.8, 1.5, 1.0, font_size=54, bold=True, color=COLOR_ACENTO, align=PP_ALIGN.CENTER)
add_text_box(slide11, "¿Cómo llegamos\nde aquí a allá?", 5.5, 3.9, 2.3, 0.9, font_size=12, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

# Right side: arrival
add_text_box(slide11, "PUNTO DE LLEGADA", 7.3, 0.7, 5.5, 0.45, font_size=12, bold=True, color=COLOR_TEXTO_SECUNDARIO)
add_multiline_text(slide11, [
    {'text': 'Qwen2.5-14B-Instruct', 'bold': True, 'color': COLOR_ACENTO, 'size': 22},
    {'text': '~28 GB VRAM  ·  FP16', 'bold': False, 'color': COLOR_TEXTO_PRINCIPAL, 'size': 15},
    {'text': 'AMD Instinct MI210  ·  ROCm', 'bold': False, 'color': COLOR_TEXTO_PRINCIPAL, 'size': 15},
    {'text': 'Clúster Yuca — ACARUS', 'bold': False, 'color': COLOR_ACENTO2, 'size': 15},
    {'text': 'Universidad de Sonora', 'bold': False, 'color': COLOR_TEXTO_SECUNDARIO, 'size': 13},
], 7.3, 1.2, 5.5, 2.5)

# Divider horizontal
add_divider(slide11, 5.0, color=COLOR_ACENTO, width=12, left=0.5)

# Punchline
add_text_box(slide11, "Porque el problema fue creciendo.", 0.5, 5.15, 12.33, 0.8,
              font_size=28, bold=True, color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.CENTER)
add_speaker_tag(slide11, "Joaquin Castro  ← MOMENTO MEMORABLE")

# ============================================================
# SLIDE 12 — LA COMPLEJIDAD TAMBIÉN CRECE
# ============================================================
slide12 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide12)
add_section_label(slide12, "ACTO 3 — LA COMPLEJIDAD TAMBIÉN CRECE")

add_text_box(slide12, "Cada solución trajo su propio problema nuevo.", 0.6, 0.55, 12, 0.6,
              font_size=25, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide12, 1.28)

problems = [
    ("Bug del Singleton",
     "El motor RAG compartía historial de conversación entre usuarios distintos.\nFix: agosto 2026 — commit documentado en el repositorio."),
    ("Desincronización BD ↔ RAG",
     "El chatbot no lee la BD en caliente. Lee un archivo JSON generado manualmente.\nActualizar requiere correr 3 scripts. Deuda técnica documentada."),
    ("Seguridad implementada por partes",
     "Los ViewSets del backend no tienen permisos de escritura.\nCualquier usuario no autenticado puede modificar cafeterías. Identificado y documentado."),
]

y = 1.55
for title, detail in problems:
    # Colored indicator
    ind = slide12.shapes.add_shape(1, Inches(0.6), Inches(y + 0.05), Inches(0.08), Inches(0.55))
    ind.fill.solid(); ind.fill.fore_color.rgb = COLOR_ALERTA; ind.line.fill.background()
    add_text_box(slide12, title, 0.9, y, 11.5, 0.4, font_size=16, bold=True, color=COLOR_ALERTA)
    add_text_box(slide12, detail, 0.9, y + 0.42, 11.5, 0.65, font_size=13, color=COLOR_TEXTO_PRINCIPAL)
    y += 1.5

add_text_box(slide12, "La moraleja: cada decisión tecnológica crea restricciones que descubres después.",
              0.6, 6.4, 12.5, 0.5, font_size=13, bold=True,
              color=COLOR_ACENTO, align=PP_ALIGN.LEFT, italic=True)
add_speaker_tag(slide12, "Owen Solis")

# ============================================================
# SLIDE 13 — LO QUE APRENDIMOS
# ============================================================
slide13 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide13)
add_section_label(slide13, "CIERRE — LO QUE APRENDIMOS")

add_text_box(slide13, "Tres aprendizajes.", 0.6, 0.55, 12, 0.6,
              font_size=28, bold=True, color=COLOR_TEXTO_PRINCIPAL)
add_divider(slide13, 1.28)

lessons = [
    ("1", "El problema guía la tecnología, no al revés.",
          "No elegimos tecnologías para buscarles un problema. El problema apareció y la tecnología vino después."),
    ("2", "Aprendemos durante el desarrollo.",
          "No sabíamos RAG, embeddings ni FAISS cuando empezamos. 20+ commits de fixes en un día son evidencia de aprendizaje real."),
    ("3", "Cada solución crea su propio problema nuevo.",
          "El Singleton, la desincronización, los permisos incompletos. La ingeniería de software es eso."),
]

y = 1.5
for num, title, detail in lessons:
    circle = slide13.shapes.add_shape(9, Inches(0.55), Inches(y), Inches(0.55), Inches(0.55))
    circle.fill.solid(); circle.fill.fore_color.rgb = COLOR_ACENTO; circle.line.fill.background()
    add_text_box(slide13, num, 0.55, y + 0.05, 0.55, 0.45, font_size=14, bold=True,
                  color=COLOR_FONDO_OSCURO, align=PP_ALIGN.CENTER)
    add_text_box(slide13, title, 1.3, y, 11.3, 0.42, font_size=17, bold=True, color=COLOR_ACENTO2)
    add_text_box(slide13, detail, 1.3, y + 0.44, 11.3, 0.55, font_size=14, color=COLOR_TEXTO_PRINCIPAL)
    y += 1.45

add_speaker_tag(slide13, "Ambos (alternado)")

# ============================================================
# SLIDE 14 — CIERRE
# ============================================================
slide14 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide14, COLOR_FONDO_OSCURO)

# Evolution line (compact)
evo = [
    "Problema: no sé dónde comer",
    "Catálogo de tienditas",
    "Búsqueda y filtros",
    "Mapas (Leaflet)",
    "Reseñas + Autenticación JWT",
    "Panel de administración",
    "Lenguaje natural → LLM",
    "RAG: Embeddings + FAISS + CrossEncoder",
    "Infraestructura HPC: Qwen + YUCA",
]

add_text_box(slide14, "La línea completa:", 0.5, 0.3, 6.0, 0.4, font_size=13, bold=True, color=COLOR_TEXTO_SECUNDARIO)
y = 0.75
for item in evo:
    add_text_box(slide14, f"→  {item}", 0.5, y, 6.5, 0.35, font_size=11.5, color=COLOR_TEXTO_PRINCIPAL)
    y += 0.56

# Punchline
add_divider(slide14, 2.1, color=COLOR_ACENTO, width=5.8, left=7.0)

add_text_box(slide14, '"La tecnología fue la respuesta.\n El problema fue la pregunta."',
              7.0, 2.3, 6.0, 1.8, font_size=22, bold=True,
              color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.CENTER)

add_divider(slide14, 4.3, color=COLOR_ACENTO, width=5.8, left=7.0)

add_text_box(slide14, "No aprendimos primero la tecnología\npara después construir el proyecto.\n\nAprendimos la tecnología porque\nnecesitábamos resolver el proyecto.",
              7.0, 4.5, 6.0, 2.0, font_size=15, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER, italic=True)

add_speaker_tag(slide14, "Ambos")

# ============================================================
# SLIDE 15 — PREGUNTAS
# ============================================================
slide15 = prs.slides.add_slide(BLANK_LAYOUT)
set_slide_bg(slide15)

# Top bar
bar15 = slide15.shapes.add_shape(1, Inches(0), Inches(0), Inches(13.33), Inches(0.08))
bar15.fill.solid(); bar15.fill.fore_color.rgb = COLOR_ACENTO; bar15.line.fill.background()

add_text_box(slide15, "Preguntas", 0.8, 2.0, 11.73, 1.2, font_size=48, bold=True,
              color=COLOR_TEXTO_PRINCIPAL, align=PP_ALIGN.CENTER)

add_divider(slide15, 3.5)

add_text_box(slide15, "El Búho Tragón", 0.8, 3.7, 11.73, 0.5, font_size=18, bold=True,
              color=COLOR_ACENTO, align=PP_ALIGN.CENTER)

add_text_box(slide15, "Joaquin Alfredo Castro Córdova  ·  Owen Adiel Solis Zatarain",
              0.8, 4.25, 11.73, 0.45, font_size=14, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

add_text_box(slide15, "Universidad de Sonora  ·  2026",
              0.8, 4.75, 11.73, 0.4, font_size=13, bold=False,
              color=COLOR_TEXTO_SECUNDARIO, align=PP_ALIGN.CENTER)

add_text_box(slide15, "github.com/OwenSolis03/IS2_ElBuhoTragon",
              0.8, 5.35, 11.73, 0.4, font_size=13, bold=False,
              color=COLOR_ACENTO2, align=PP_ALIGN.CENTER, italic=True)

# Bottom bar
bar15b = slide15.shapes.add_shape(1, Inches(0), Inches(7.42), Inches(13.33), Inches(0.08))
bar15b.fill.solid(); bar15b.fill.fore_color.rgb = COLOR_ACENTO; bar15b.line.fill.background()

# === SAVE ===
output_path = "/home/joako/Workspace/Proyectos/IS2_ElBuhoTragon/presentation/09_presentacion.pptx"
prs.save(output_path)
print(f"✅ Presentación guardada en: {output_path}")
print(f"   Total de diapositivas: {len(prs.slides)}")
