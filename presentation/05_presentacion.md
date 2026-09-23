# 05 — Presentación: Estructura Diapositiva por Diapositiva
## "Evolución tecnológica de un proyecto de software: del problema a la solución"
## El Búho Tragón — XXXV Semana Nacional de Investigación y Docencia en Matemáticas 2026

---

## DISEÑO VISUAL GENERAL

**Paleta de colores:** Azul oscuro UNISON `#0e2246` como fondo base / `#071326` para elementos estructurales
**Tipografía:** Sans-serif limpia para el cuerpo; las diapositivas de impacto pueden usar tipo display
**Elemento visual recurrente:** La "línea evolutiva" vertical que se va revelando progresivamente a lo largo de la presentación

**Principio de diseño:** Cada diapositiva tiene **una sola idea central**. El texto en pantalla es mínimo. Todo lo demás va en el guion oral.

---

## DIAPOSITIVA 1 — PORTADA

### Objetivo narrativo
Establecer el contexto institucional y crear expectativa con el contraste del título.

### Contenido visual
- Fondo: azul oscuro UNISON
- Logo del Búho Tragón (o nombre estilizado)
- Texto central:

```
Evolución tecnológica de un proyecto de software:
del problema a la solución

Joaquin Alfredo Castro Córdova
Owen Adiel Solis Zatarain

Universidad de Sonora
XXXV Semana Nacional de Investigación y Docencia en Matemáticas
Septiembre 2026
```

### Texto en pantalla (exacto)
> **Evolución tecnológica de un proyecto de software: del problema a la solución**
> Joaquin Castro · Owen Solis — Universidad de Sonora — 2026

### Guion oral
*(Mientras aparece la diapositiva, antes de hablar, dejar 3-4 segundos de silencio.)*

**Joaquin:** "Buenas tardes. Soy Joaquin Castro. Mi compañero es Owen Solis. Somos estudiantes de la Licenciatura en Ciencias de la Computación de la Universidad de Sonora. Y les vamos a contar la historia de un proyecto que comenzó con una pregunta muy sencilla."

### Duración: 30 segundos
### Transición
→ Joaquin: "¿Cuál era esa pregunta?" *(clic a siguiente diapositiva)*

### Evidencia utilizada
[HISTORIA DEL EQUIPO] Autores reales, institución real, contexto real del proyecto.

### Notas del presentador
- No leer el título en voz alta — ya está proyectado.
- Pausa de 3 segundos antes de hablar para que la audiencia lea.
- Tono: tranquilo, seguro, amigable.

---

## DIAPOSITIVA 2 — EL PROBLEMA

### Objetivo narrativo
Conectar emocionalmente con la audiencia a través de una experiencia reconocible. Establecer que el proyecto nació de algo real.

### Contenido visual
Minimalista: una pregunta grande centrada.

```
¿Dónde venden hamburguesas en el campus?
```

Debajo, en texto más pequeño:
```
Y más importante: ¿a cuánto están?
                   ¿Está abierto ahorita?
```

*Opcional: foto del campus UNISON o una tiendita universitaria.*

### Texto en pantalla (exacto)
> **¿Dónde venden hamburguesas en el campus?**
> *¿A cuánto están? ¿Está abierto?*

### Guion oral
**Joaquin:** "Entrar a la universidad y no conocer el campus. Todos los que estamos aquí lo vivimos alguna vez. Los primeros días no sabes dónde está nada. Y cuando tienes hambre entre clases... empiezas a preguntar. '¿Dónde venden algo barato?' 'Hay una tiendita por el edificio de exactas, creo.' 'En la de mates tienen sopes.' Esa información existe. Solo está dispersa."

"El Búho Tragón nació de ahí. De la idea de reunir esa información en un solo lugar. Al principio era eso: un catálogo de las tienditas del campus de la UNISON en Hermosillo. Nada más."

### Duración: 1 minuto 30 segundos
### Transición
→ "Así que construimos algo." *(clic)*

### Evidencia utilizada
[HISTORIA DEL EQUIPO] Contexto real del origen del proyecto — skill file sección 2.

### Notas del presentador
- La pregunta de la hamburguesa es el hilo narrativo que regresa al final.
- No mencionar tecnologías todavía. Solo el problema.
- Hablar despacio. Esta diapositiva establece el tono de toda la charla.

---

## DIAPOSITIVA 3 — LA PRIMERA SOLUCIÓN

### Objetivo narrativo
Mostrar la primera versión del proyecto: sencilla, directa, apropiada para el problema de ese momento.

### Contenido visual
Dos columnas o un diagrama simple:

**Columna izquierda — El problema**
```
¿Dónde está la tiendita?
¿Qué venden?
¿Cuánto cuesta?
```

**Columna derecha — La primera solución**
```
Base de datos de cafeterías
API REST
Interfaz web (catálogo)
```

Debajo: pequeño timeline mostrando "Ingeniería de Software I → Ingeniería de Software II"

### Texto en pantalla (exacto)
> **Primera versión:** catálogo de cafeterías
> *(Ingeniería de Software I — Abril 2025)*

### Guion oral
**Joaquin:** "La primera versión era exactamente lo que necesitábamos en ese momento: un catálogo. Una base de datos con información de las cafeterías. Una API para consultarlos. Una interfaz para verlos."

"El proyecto comenzó en Ingeniería de Software I. La idea no era construir algo complejo desde el principio. Era resolver el problema que teníamos. Con lo que sabíamos en ese momento."

"Y aquí está algo que vale la pena decir: el primer commit del repositorio tiene un typo en el nombre. 'Crear Estructura del Peoyecto', con la 'o' y la 'y' cambiadas. Eso es evidencia de que fue un proyecto real, hecho por estudiantes reales, un lunes por la tarde."

*(Esto puede generar una sonrisa en el auditorio — es auténtico.)*

### Duración: 1 minuto 30 segundos
### Transición
→ "Pero cuando retomamos el proyecto en IS2, el problema ya no era el mismo." *(clic)*

### Evidencia utilizada
[REPO] Commits marzo-abril 2025; primer commit `5bac08b "Crear Estructura del Peoyecto"` (typo real); commits SCRUM-6 (API REST) y SCRUM-8 (BD conectada).

### Notas del presentador
- El typo del primer commit es un detalle auténtico que humaniza el proyecto.
- Mostrar solo la esencia de la primera versión — no meterse en detalles técnicos todavía.

---

## DIAPOSITIVA 4 — EL PROYECTO EMPIEZA A CRECER

### Objetivo narrativo
El momento de transición de IS1 a IS2. Las nuevas necesidades empiezan a aparecer. Introducir la idea de que cada necesidad trae una decisión.

### Contenido visual
Una lista de preguntas que van apareciendo (idealmente animadas, una por una):

```
"¿Dónde exactamente está esa tiendita?"

"¿Está abierta ahorita?"

"¿Qué opina la gente de ese lugar?"

"¿Quién puede actualizar la información?"

"¿Cómo sé que eres tú y no otra persona?"
```

### Texto en pantalla (exacto)
> **Cada pregunta nueva... es un problema nuevo.**

### Guion oral
**Owen:** "En Ingeniería de Software II el objetivo cambió. Ya no era solo mantener un catálogo — era construir una plataforma más completa. Y conforme empezamos a trabajar, fueron apareciendo preguntas que el sistema aún no podía responder."

"'¿Dónde exactamente está esa tiendita?' Una dirección de texto no es suficiente para alguien que no conoce el campus. Necesitas ver el mapa."

"'¿Está abierta ahorita?' No solo quiero saber qué venden — quiero saber si puedo ir en este momento."

"'¿Qué opina la gente?' Si ya tengo el sistema, ¿por qué no permitir que los usuarios compartan su experiencia?"

"'¿Quién puede modificar la información?' Si alguien actualiza el menú o los precios, necesitamos saber quién tiene esa autorización."

"Cada una de esas preguntas introdujo una decisión tecnológica. No porque quisiéramos usar esas tecnologías. Sino porque el problema las necesitaba."

### Duración: 2 minutos
### Transición
→ "Veamos cómo se tradujo eso en decisiones concretas." *(clic)*

### Evidencia utilizada
[REPO] Componentes actuales del frontend que responden a cada necesidad; commits nov 2025 mencionando cada funcionalidad.

### Notas del presentador
- Owen toma la palabra aquí — primer cambio de presentador.
- Si es posible, mostrar las preguntas apareciendo una por una (animación de clic).
- El tono debe ser de descubrimiento, no de catálogo.

---

## DIAPOSITIVA 5 — CADA NECESIDAD, UNA DECISIÓN

### Objetivo narrativo
Mostrar visualmente el patrón NECESIDAD → DECISIÓN → TECNOLOGÍA. Reforzar la idea central de la ponencia.

### Contenido visual
Una tabla simple o diagrama de dos columnas:

```
NECESIDAD                       →  DECISIÓN
─────────────────────────────────────────────
"¿Dónde físicamente?"           →  Mapas (Leaflet)
"¿Abierto o cerrado?"           →  Horarios en la BD
"¿Qué opina la gente?"          →  Sistema de reseñas
"¿Quién puede editar?"          →  Roles + autenticación JWT
"¿Cómo administro el sistema?"  →  Panel de administración
```

### Texto en pantalla (exacto)
> **Problema → Necesidad → Decisión**
*(Esta frase debe ser visualmente prominente)*

### Guion oral
**Owen:** "Para la ubicación: usamos Leaflet con OpenStreetMap. Es una librería de mapas de código abierto que se integra bien con React y no tiene costo de API. Almacenamos las coordenadas de cada cafetería directamente en la base de datos. Así el mapa sabe exactamente dónde poner cada marcador."

"Para los horarios: añadimos campos de hora de apertura y cierre en la base de datos. El frontend calcula en tiempo real — usando el reloj del navegador — si una cafetería está abierta en este momento. Eso suena simple, pero hay que hacerlo bien."

"Para la autenticación: usamos JWT — JSON Web Tokens. Es la forma estándar de hacer autenticación en aplicaciones web con frontend y backend separados. El token viaja en cada petición y el servidor sabe quién eres."

"Noten el patrón: en ningún caso elegimos primero la tecnología. Primero apareció el problema, después pensamos qué solución necesitaba."

### Duración: 2 minutos
### Transición
→ "Y así quedó la arquitectura después de todo eso." *(clic)*

### Evidencia utilizada
[REPO] `CampusMap.jsx` con Leaflet; campo `hora_apertura`/`hora_cierre` en modelo; `Simple JWT` en `settings.py`; `AdminDashboard.jsx`.

### Notas del presentador
- Mantener el ritmo ágil aquí — son conceptos que la audiencia entiende rápido.
- No profundizar en cada tecnología. El mensaje es el patrón, no los detalles.

---

## DIAPOSITIVA 6 — LA ARQUITECTURA RESULTANTE

### Objetivo narrativo
Mostrar cómo luce arquitecturalmente el sistema después de todas esas decisiones. Una sola vista clara. No un diagrama de 30 cajas.

### Contenido visual
Diagrama simplificado en tres bloques:

```
┌─────────────────────────────────────┐
│  FRONTEND                           │
│  React 19 · Vite · Tailwind         │
│  Mapas · Chat · Reseñas · Admin     │
└──────────────┬──────────────────────┘
               │ HTTP / JSON
┌──────────────▼──────────────────────┐
│  BACKEND                            │
│  Django 5 · Django REST Framework   │
│  JWT · SQLite                       │
│  14 cafeterías · 482 platillos      │
└──────────────┬──────────────────────┘
               │ Singleton RAG
┌──────────────▼──────────────────────┐
│  MOTOR RAG                          │
│  FAISS · CrossEncoder · Qwen        │
│  Clúster Yuca — ACARUS              │
└─────────────────────────────────────┘
```

### Texto en pantalla (exacto)
> **Arquitectura en 3 capas**
> Frontend · Backend · Motor de IA

### Guion oral
**Owen:** "Esta es la arquitectura que resulta de todas esas decisiones. Tres capas desacopladas."

"El frontend es una SPA — Single Page Application — hecha con React. Maneja la interfaz, los mapas, el chat, las reseñas y el panel de administración. Se comunica con el backend mediante HTTP."

"El backend es Django con Django REST Framework. Sirve la API, maneja la autenticación con JWT, y accede a la base de datos SQLite donde viven las 14 cafeterías y los 482 platillos que tenemos registrados."

"Y hay una tercera capa que en este momento es la más interesante: el motor de IA. Ahí es donde vive el chatbot. Ahí es donde ocurre RAG. Ahí es donde corre el modelo de lenguaje. Y ahí es donde la historia se pone más interesante."

### Duración: 1 minuto 30 segundos
### Transición
→ "Pero antes de llegar al motor de IA... hay que hablar de cómo llegamos a necesitarlo." *(clic)*

### Evidencia utilizada
[REPO] Estructura de carpetas; `settings.py:DATABASES`; `el_buho_tragon.db` (14 cafeterías, 482 menús); `llm_rag/` carpeta.

### Notas del presentador
- Mostrar el diagrama limpio — no abrumar con detalles.
- El "y ahí es donde la historia se pone más interesante" debe sonar natural, no forzado.

---

## DIAPOSITIVA 7 — "HAY QUE METERLE IA"

### Objetivo narrativo
El momento de transición narrativa más importante. Honesto y humano — no finjas que fue un plan estratégico. La idea surgió de forma informal y se convirtió en una pregunta de ingeniería.

### Contenido visual
Fondo oscuro. Una sola frase grande:

```
"Hay que meterle IA."
```

Debajo, en contraste:

```
...¿para qué?
```

### Texto en pantalla (exacto)
> **"Hay que meterle IA."**
> *¿Para qué?*

### Guion oral
**Joaquin:** "Y llegamos al momento en que alguien dentro del equipo dijo esto."

*(Señalar la diapositiva.)*

"'Hay que meterle IA.'"

*(Pausa corta.)*

"Honestamente, no fue un plan sofisticado desde el principio. Fue una idea que surgió en el equipo. Pero lo interesante es la pregunta que vino después: ¿para qué? ¿Qué problema concreto dentro de este sistema podría resolverse con inteligencia artificial?"

"Y la respuesta que encontramos fue esta: los usuarios pueden buscar en el catálogo. Pueden filtrar por facultad, por categoría, por precio. Pero no pueden hacer una pregunta como esta..."

*(Transición a la siguiente diapositiva.)*

### Duración: 1 minuto
### Transición
→ Joaquin: "...como esta." *(clic inmediato)*

### Evidencia utilizada
[HISTORIA DEL EQUIPO] Skill file sección 3 — la idea informal que se convirtió en pregunta de ingeniería.

### Notas del presentador
- Esta es una de las diapositivas más importantes narrativamente. No apresurarse.
- La pausa después de "Hay que meterle IA" es intencional.
- El retorno de Joaquin aquí es natural — él llevó la historia del problema, Owen llevó la arquitectura.

---

## DIAPOSITIVA 8 — ¿PARA QUÉ IA? EL CASO DE USO

### Objetivo narrativo
Mostrar el caso de uso concreto que justificó la IA. No "IA por moda" — IA como respuesta a una necesidad específica.

### Contenido visual
Cuadro de diálogo estilo chatbot:

```
👤 Usuario:
"¿Dónde venden torta cubana más barata?"

🦉 El Buhito:
"La torta cubana más barata está disponible en
 la Tiendita de Exactas a $45.00 MXN, que está
 a unos 120 metros de tu ubicación actual."
```

Abajo, una nota:
```
La búsqueda tradicional no puede responder esto.
El lenguaje natural sí puede.
```

### Texto en pantalla (exacto)
> **"¿Dónde venden torta cubana más barata?"**
> *La búsqueda de palabras clave no es suficiente.*

### Guion oral
**Joaquin:** "¿Dónde venden torta cubana más barata? Esta pregunta tiene varias partes: un producto, una comparación de precios, y posiblemente una restricción de distancia. Un buscador de texto tradicional no sabe cómo interpretar todo eso junto."

"Pero un modelo de lenguaje sí puede. Y el usuario no tiene que aprender la sintaxis del sistema — habla como hablaría con cualquier persona."

"Ese fue el caso de uso que justificó incorporar un modelo de lenguaje: permitir que los usuarios consultaran información de las cafeterías mediante lenguaje natural. Preguntas sobre productos, precios, ubicaciones, horarios — todo en lenguaje natural."

"Una vez que teníamos el caso de uso claro, empezaron las preguntas técnicas. Y fueron varias."

### Duración: 1 minuto 30 segundos
### Transición
→ "La primera: ¿qué modelo?" *(clic)*

### Evidencia utilizada
[REPO] `ChatWidget.jsx` que captura la pregunta; `/api/chatbot/` endpoint; ejemplos en README ("¿Dónde venden Torta Cubana más barata?").

### Notas del presentador
- Si se tiene una demo disponible y estable, este es el lugar ideal para mostrarla brevemente (30 segundos).
- Si no hay demo, el cuadro de diálogo estático funciona igual de bien.

---

## DIAPOSITIVA 9 — DEL LENGUAJE NATURAL AL RAG

### Objetivo narrativo
Explicar RAG de forma clara y accesible antes de entrar en los detalles técnicos. La analogía del libro de consulta.

### Contenido visual
Un diagrama de flujo simple (izquierda a derecha o de arriba a abajo):

```
¿Por qué no meter todo al prompt?

482 platillos × datos por platillo = demasiado

Solución:
Pregunta del usuario
      ↓
Buscar solo lo relevante
      ↓
Darle ESO al modelo
      ↓
El modelo responde con contexto real
```

### Texto en pantalla (exacto)
> **RAG: Retrieval-Augmented Generation**
> *Recuperar antes de generar*

### Guion oral
**Joaquin:** "Cuando incorporas un modelo de lenguaje, la pregunta inmediata es: ¿cómo le das acceso a tus datos?"

"La respuesta más obvia es: meto todo al prompt. Le doy al modelo la información completa de todas las cafeterías, todos los menús, todos los precios. Tenemos 482 platillos en 14 cafeterías — no es una cantidad enorme, pero es más de lo que conviene poner en el contexto de cada consulta."

"La solución se llama RAG: Retrieval-Augmented Generation. Generación aumentada por recuperación. La idea es: antes de pedirle al modelo que responda, primero buscamos en nuestra base de datos cuáles son los documentos más relevantes para la pregunta. Después le damos solo esos documentos al modelo como contexto."

"Es la diferencia entre preguntarle algo a alguien que habla muy bien, y preguntarle lo mismo después de haberle dado el documento específico que necesita consultar. Con RAG, el modelo tiene la información correcta frente a él antes de responder."

### Duración: 2 minutos
### Transición
→ "Veamos cómo funciona eso técnicamente." *(clic)*

### Evidencia utilizada
[REPO] `rag_data_fixed.json` (482 registros); clase `BuhoRAG`; prompt en `rag_engine_hpc.py`.

### Notas del presentador
- Esta es la diapositiva técnicamente más densa — hablar claro y con pausas.
- La audiencia son estudiantes de computación: pueden seguir la lógica, pero no asumas que conocen RAG.

---

## DIAPOSITIVA 10 — EL PIPELINE DEL RAG (MOMENTO CENTRAL)

### Objetivo narrativo
El momento técnico más importante de la presentación. Mostrar el pipeline completo de forma visual y comprensible.

### Contenido visual
Diagrama de flujo vertical — el más visual de la presentación:

```
Pregunta: "¿Dónde venden torta cubana más barata?"
        ↓
Reformulación con contexto del historial [Qwen]
        ↓
Detección de ubicación con fuzzy matching [thefuzz]
        ↓
Conversión a vector [MiniLM — 384 dimensiones]
        ↓
Búsqueda semántica [FAISS — top 50]
        ↓
Filtro de distancia geográfica [Haversine < 2500m]
        ↓
Re-ranking de relevancia [CrossEncoder — top 10]
        ↓
Generación de respuesta [Qwen2.5-14B-Instruct]
        ↓
"La torta cubana más barata está en..."
```

### Texto en pantalla (exacto)
> **8 pasos entre la pregunta y la respuesta**

### Guion oral
**Owen:** "Esto es lo que ocurre dentro del sistema cuando un usuario hace una pregunta. Ocho pasos."

"Primero, si hay historial de conversación, el modelo reformula la pregunta para que tenga contexto completo. Así, si la pregunta anterior fue 'qué vende exactas' y la siguiente es '¿y mates?', el sistema sabe que te estás refiriendo a la cafetería del edificio de Matemáticas."

"Segundo: si el usuario mencionó un edificio o zona del campus — 'cerca de exactas', 'en mates', 'por derecho' — el sistema hace fuzzy matching sobre un diccionario de más de 35 apodos estudiantiles de la UNISON. Ese diccionario lo construimos nosotros manualmente."

"Tercero: la pregunta se convierte en un vector de 384 dimensiones usando un modelo de embeddings multilingüe. Un vector que captura el significado semántico, no solo las palabras."

"Cuarto: ese vector se compara con todos los documentos vectorizados en FAISS. Nos quedamos con los 50 más similares semánticamente."

"Quinto: si hay ubicación GPS, filtramos para quedarnos solo con cafeterías que estén a menos de 2.5 kilómetros."

"Sexto: un CrossEncoder — un segundo modelo — re-evalúa esos documentos con más precisión y nos da el top 10."

"Séptimo: esos 10 chunks de información van al modelo Qwen como contexto. Temperatura 0.1 para respuestas precisas, no creativas."

"Octavo: la respuesta."

### Duración: 2 minutos 30 segundos
### Transición
→ "Pero todo esto necesita ejecutarse en algún lugar. Y ahí apareció otro problema." *(clic)*

### Evidencia utilizada
[REPO] `rag_engine_hpc.py` pipeline completo, `rag_utils.py` (KNOWN_LOCATIONS), parámetros de inferencia verificados.

### Notas del presentador
- Este es el momento técnico central. Owen lo narra — él llevó la arquitectura.
- Si el tiempo aprieta, puede comprimirse a 6 pasos omitiendo la reformulación y el fuzzy matching.
- El número "8 pasos" en pantalla da estructura a la audiencia.

---

## DIAPOSITIVA 11 — ¿DÓNDE EJECUTAMOS EL MODELO? (MOMENTO MEMORABLE)

### Objetivo narrativo
El salto de complejidad más impactante. De "lista de tienditas" a "supercomputadora". El momento que deja con la boca abierta.

### Contenido visual
**OPCIÓN A: El salto visual (recomendada)**

Pantalla dividida o dos momentos secuenciales:

```
PUNTO DE PARTIDA:             PUNTO DE LLEGADA:
                              
"Crear Estructura              Qwen2.5-14B-Instruct
 del Peoyecto"                 ~28 GB VRAM
 [typo real, mar 2025]         AMD Instinct MI210
                               GPU ROCm
                               Clúster Yuca — ACARUS
                               Universidad de Sonora
```

Y la pregunta grande:
```
¿Cómo llegamos de aquí a allá?
Porque el problema fue creciendo.
```

### Texto en pantalla (exacto)
> **"¿Cómo llegamos de una lista de tienditas a esto?"**
> *Porque el problema fue creciendo.*

### Guion oral
**Joaquin:** "Qwen2.5-14B-Instruct. El modelo que usamos para generar las respuestas. Catorce mil millones de parámetros. En precisión FP16 necesita aproximadamente 28 gigabytes de VRAM. Para poner eso en contexto: una laptop de gama alta tiene 8 gigabytes de VRAM. Una laptop gaming tope de gama tiene 16."

"No podíamos ejecutar este modelo en nuestras laptops. Y una API comercial — OpenAI, Anthropic, Google — tiene costos por consulta que en un proyecto universitario no son triviales."

"Pero resulta que la Universidad de Sonora tiene el ACARUS — el Área de Cómputo de Alto Rendimiento — y dentro del ACARUS está el clúster Yuca. Con GPUs AMD Instinct MI210. Con ROCm. Con 64 gigabytes de VRAM por GPU."

*(Pausa.)*

"Un integrante del equipo comenzó a trabajar con esos recursos. Y ahí fue posible ejecutar el modelo."

*(Mostrar el contraste visual.)*

"Empezamos con esto." *(señalar primer commit / typo)* "Terminamos necesitando esto." *(señalar el HPC)*

"¿Cómo llegamos? Porque el problema fue creciendo."

### Duración: 2 minutos
### Transición
→ "Y eso trajo su propia complejidad." *(clic)*

### Evidencia utilizada
[REPO] `rag_engine_hpc.py`: model_id Qwen2.5-14B-Instruct, torch.float16, AMD GPU ROCm; README sobre YUCA; primer commit con typo `5bac08b`.

### Notas del presentador
- **Este es el momento memorable de la presentación.** Hacer la pausa después de describir el HPC.
- El contraste del typo vs el modelo de 14B es auténtico y poderoso.
- Volver a Joaquin aquí — él llevó la historia del problema y este es el cierre de ese arco.

---

## DIAPOSITIVA 12 — LA COMPLEJIDAD TAMBIÉN CRECE

### Objetivo narrativo
Honestidad sobre las dificultades. RAG añade problemas nuevos. La seguridad quedó incompleta. El pipeline de actualización es manual. Estos son aprendizajes reales.

### Contenido visual
Tres puntos concisos:

```
Problema nuevo 1:
El chatbot mezclaba conversaciones entre usuarios
[Bug Singleton — agosto 2026]

Problema nuevo 2:
Actualizar los datos del chatbot requiere
ejecutar 3 scripts manualmente

Problema nuevo 3:
La seguridad se implementó por partes
(aún hay endpoints sin protección de escritura)
```

### Texto en pantalla (exacto)
> **Cada solución trajo su propio problema nuevo.**

### Guion oral
**Owen:** "Cuando incorporamos el RAG, no resolvimos solo el problema del lenguaje natural. Creamos problemas nuevos."

"El más interesante: el motor RAG es un Singleton — una única instancia compartida entre todos los usuarios. En agosto de este año descubrimos que esa instancia estaba guardando el historial de conversación de un usuario y mezclándolo con la siguiente consulta de otro usuario diferente. Un bug clásico de estado compartido. Lo encontramos, lo corregimos — pero apareció por la naturaleza del diseño."

"Otro problema: el chatbot no lee la base de datos en tiempo real. Lee un archivo JSON que generamos manualmente. Si alguien agrega una cafetería nueva desde el panel de administración, el chatbot no lo sabe hasta que corremos tres scripts: exportar la BD, limpiar el archivo, reconstruir el índice FAISS. Eso es deuda técnica — lo sabemos y está documentado."

"Y la seguridad: la implementamos progresivamente. Hay endpoints de escritura que actualmente cualquiera puede llamar sin autenticarse. No es un diseño intencional — es el resultado de construir funcionalidad primero y reforzar permisos después. En producción eso habría que corregirlo."

"La moraleja: cada decisión tecnológica que tomas hoy crea restricciones y problemas que descubres mañana."

### Duración: 2 minutos
### Transición
→ "Y de todo eso... hay cosas que aprendimos." *(clic)*

### Evidencia utilizada
[REPO] Commit `14bd5a0` (fix historial compartido); pipeline manual de actualización RAG; vulnerabilidades de seguridad documentadas en `PROJECT_CONTEXT.md`.

### Notas del presentador
- Esta diapositiva es honesta sobre las limitaciones — eso la hace más creíble y educativa.
- No disculparse por las limitaciones. Presentarlas como aprendizajes genuinos.

---

## DIAPOSITIVA 13 — LO QUE APRENDIMOS

### Objetivo narrativo
Las lecciones concretas y transferibles. Lo que la audiencia puede llevarse consigo.

### Contenido visual
Tres lecciones numeradas, breves:

```
1. El problema guía la tecnología, no al revés.

2. Aprender en el camino es parte del proceso.

3. Cada solución crea su propio problema nuevo.
```

### Texto en pantalla (exacto)
> **Tres lecciones:**
> 1. El problema guía la tecnología
> 2. El aprendizaje ocurre durante el desarrollo
> 3. Cada solución crea restricciones nuevas

### Guion oral
**Joaquin:** "Lo primero: el problema guía la tecnología, no al revés. Cuando llegamos a mapas, a reseñas, a RAG, no fue porque queríamos usar esas tecnologías. Fue porque el problema las necesitaba. Eso parece obvio, pero en la práctica es fácil caer en la trampa de elegir una tecnología y luego buscar un problema donde usarla."

**Owen:** "Lo segundo: aprendimos durante el desarrollo. No sabíamos RAG cuando empezamos. No sabíamos embeddings. No sabíamos FAISS. Lo investigamos, lo implementamos, nos equivocamos, lo corregimos. El repositorio tiene más de 20 commits en un solo día de 'Fixes al Buhito' — eso es aprender en tiempo real."

**Joaquin:** "Y lo tercero: cada solución crea su propio problema nuevo. Agregar el chatbot creó el bug del Singleton. Agregar autenticación dejó endpoints sin proteger. Agregar el índice FAISS creó el problema de desincronización con la BD. La ingeniería de software es eso: resolver problemas que aparecen al resolver otros problemas."

### Duración: 2 minutos
### Transición
→ *(Sin transición verbal — pausa natural antes del cierre)*

### Evidencia utilizada
[REPO] 23+ commits de fixes en un día; bugs conocidos documentados; historial de commits como evidencia de aprendizaje iterativo.

### Notas del presentador
- Repartir las tres lecciones entre los dos presentadores — más dinámico.
- Hablar con convicción. Estas son conclusiones genuinas, no fórmulas.

---

## DIAPOSITIVA 14 — CIERRE

### Objetivo narrativo
Volver a la pregunta del inicio y cerrar el círculo narrativo. Dejar una idea memorable que la audiencia pueda llevarse.

### Contenido visual
La línea evolutiva completa que se ha ido construyendo durante toda la presentación, ahora visible de principio a fin:

```
PROBLEMA: no sé dónde comer en el campus
        ↓
Catálogo de tienditas
        ↓
+ Búsqueda y filtros
        ↓
+ Mapas (Leaflet)
        ↓
+ Reseñas
        ↓
+ Autenticación (JWT)
        ↓
+ Panel de administración
        ↓
+ Lenguaje natural → LLM
        ↓
+ RAG (Embeddings + FAISS + CrossEncoder)
        ↓
+ Infraestructura HPC (Qwen + YUCA)
```

Debajo, la frase final:

```
"La tecnología fue la respuesta.
 El problema fue la pregunta."
```

### Texto en pantalla (exacto)
> **"La tecnología fue la respuesta. El problema fue la pregunta."**

### Guion oral
**Owen:** "Volvamos a la pregunta del principio."

**Joaquin:** "¿Qué tecnología necesitas para responder dónde venden hamburguesas en una universidad?"

**Owen:** "Si la pregunta es exacta: una base de datos y un buscador."

**Joaquin:** "Si el usuario no sabe qué buscar exactamente: necesitas lenguaje natural."

**Owen:** "Para lenguaje natural: un modelo de lenguaje."

**Joaquin:** "Para que el modelo conozca tus datos: RAG."

**Owen:** "Para RAG: embeddings, búsqueda vectorial, re-ranking."

**Joaquin:** "Para el modelo: infraestructura de cómputo."

**Ambos / Owen:** "Y para todo lo demás: las decisiones que vas tomando conforme el problema crece."

*(Pausa.)*

**Joaquin:** "No aprendimos primero la tecnología para después construir el proyecto. Aprendimos la tecnología porque necesitábamos resolver el proyecto."

*(Pausa.)*

**Owen:** "Muchas gracias."

### Duración: 1 minuto 30 segundos
### Transición
→ "Quedamos a sus preguntas." *(queda en pantalla la diapositiva de cierre)*

### Evidencia utilizada
Toda la presentación — el cierre integra todos los elementos.

### Notas del presentador
- El diálogo alternado final debe sonar natural, no recitado. Ensayarlo varias veces.
- La pausa antes de "No aprendimos primero..." es el momento más importante de todo el cierre.
- Mantener la diapositiva de cierre en pantalla durante las preguntas — es limpio y da contexto.

---

## DIAPOSITIVA 15 — PREGUNTAS (Pantalla de espera)

### Contenido visual
```
Preguntas

El Búho Tragón
Joaquin Castro · Owen Solis
Universidad de Sonora — 2026

github.com/OwenSolis03/IS2_ElBuhoTragon
```

### Notas del presentador
- Esta diapositiva queda en pantalla durante los 5 minutos de preguntas.
- No proyectar las respuestas en pantalla — solo escuchar y responder verbalmente.

---

## RESUMEN DE TIEMPOS

| Diapositiva | Título | Presentador | Tiempo |
|---|---|---|---|
| 1 | Portada | Joaquin | 0:30 |
| 2 | El problema | Joaquin | 1:30 |
| 3 | Primera solución | Joaquin | 1:30 |
| 4 | El proyecto crece | Owen | 2:00 |
| 5 | Cada necesidad, una decisión | Owen | 2:00 |
| 6 | Arquitectura resultante | Owen | 1:30 |
| 7 | "Hay que meterle IA" | Joaquin | 1:00 |
| 8 | ¿Para qué IA? | Joaquin | 1:30 |
| 9 | Del lenguaje natural al RAG | Joaquin | 2:00 |
| 10 | El pipeline del RAG | Owen | 2:30 |
| 11 | ¿Dónde ejecutamos? (Momento memorable) | Joaquin | 2:00 |
| 12 | La complejidad también crece | Owen | 2:00 |
| 13 | Lo que aprendimos | Ambos | 2:00 |
| 14 | Cierre | Ambos | 1:30 |
| **TOTAL** | | | **~23:30** |

*Margen de seguridad: ~1-1.5 minutos para pausas naturales, transiciones y variaciones de ritmo.*
*Máximo real con preguntas: 30 minutos (25 exposición + 5 Q&A)*
