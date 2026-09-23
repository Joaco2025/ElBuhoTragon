# 04 — Narrativa de la Presentación
## "Evolución tecnológica de un proyecto de software: del problema a la solución"
## El Búho Tragón

---

## IDEA CENTRAL

> **La tecnología no fue el punto de partida. Fue la respuesta a los problemas que el proyecto fue encontrando.**

Versión soundbite:
> "No empezamos preguntándonos qué tecnologías queríamos usar. Empezamos preguntándonos qué problema queríamos resolver. Conforme cambió el problema, cambió la solución."

---

## TITULAR PRINCIPAL

> **"Del directorio de tienditas al clúster de supercomputo: cómo un problema pequeño se volvió un sistema complejo"**

Alternativas más cortas:
- *"El problema que no para de crecer"*
- *"Comenzamos con una lista. Terminamos con un RAG."*
- *"La tecnología llegó después. El problema llegó primero."*

---

## LOS TRES ACTOS

### ACTO 1: "El problema era sencillo."
**Duración sugerida:** ~4 minutos
**Tono:** Cercano, coloquial, reconocible

**Historia:**
Entrar a la universidad y no saber dónde están las tienditas del campus. No saber qué venden. No saber cuánto cuesta. No saber si están abiertas. La información existe pero está dispersa: un cartel aquí, un letrero allá, un compañero que te dice "en la de exactas hay hamburguesas". 

La primera idea fue simple: reunir esa información en un solo lugar. Nada más.

**Tecnología en este acto:** Ninguna todavía. Solo el problema.

**Transición al Acto 2:**
> "Así que construimos algo sencillo. Pero el problema no se quedó sencillo."

---

### ACTO 2: "El problema empezó a crecer."
**Duración sugerida:** ~8 minutos
**Tono:** Técnico pero accesible; mostrar decisiones, no solo tecnologías

**Historia:**
Una vez que existía el catálogo, aparecieron nuevas preguntas:
- ¿Dónde exactamente está esa tiendita? → Mapas
- ¿Está abierta ahorita? → Horarios
- ¿Qué me recomendarías? → Reseñas
- ¿Quién puede modificar la información? → Administración + roles
- ¿Cómo sé que eres tú y no alguien más? → Autenticación

Cada pregunta nueva introdujo una decisión tecnológica nueva. No porque el equipo quisiera usar esas tecnologías, sino porque el problema las necesitaba.

**Evolución arquitectónica visible:**
```
Catálogo estático
    ↓
Django + BD + API REST
    ↓
+ Leaflet (mapas)
    ↓
+ JWT (autenticación)
    ↓
+ Panel de administración CRUD
    ↓
+ Reseñas
```

**Decisión destacada en este acto:**
La migración de MySQL a SQLite — una decisión que el repositorio evidencia claramente con commits específicos ("Preparando para migrar a sqlite", "DB en sqlite funcional").

**Transición al Acto 3:**
> "Y entonces alguien dijo: 'hay que meterle IA.'"

*[Pausa]*

> "Y la pregunta que siguió fue: ¿para qué?"

---

### ACTO 3: "La solución también empezó a crecer."
**Duración sugerida:** ~9 minutos
**Tono:** Técnico, honesto sobre dificultades, sin exagerar

**Historia:**
La frase "hay que meterle IA" es honesta — no surgió de un plan estratégico sofisticado. Surgió como una idea dentro del equipo. Pero antes de hacer cualquier cosa, tuvieron que responder: ¿para qué queríamos IA dentro de este sistema?

La respuesta concreta: los usuarios quieren preguntar en lenguaje natural. "¿Dónde venden torta cubana más barata?" no es una consulta que un filtro tradicional maneje bien.

A partir de ahí surgieron nuevas preguntas:
- ¿Qué modelo? → Investigación
- ¿API comercial o modelo abierto? → [CONFIRMAR] Exploración de costos/privacidad
- ¿Cómo conectar el modelo con nuestros datos? → RAG
- ¿Cómo recuperar información relevante? → Embeddings + FAISS
- ¿Cómo refinar los resultados? → CrossEncoder
- ¿Dónde ejecutamos el modelo? → El problema del cómputo
- YUCA / ACARUS

**Momento memorable (≈ 2/3 de la charla):**
El salto visual más impactante de la presentación:

```
¿Dónde está la tiendita?
        ↓
¿Qué venden? ¿Cuánto cuesta?
        ↓
¿Dónde puedo comer algo barato cerca de ingeniería?
        ↓
"El sistema tiene que entender esa pregunta."
```

Y luego:
```
LISTA DE TIENDITAS
        ↓
React + Django + SQLite + JWT + Leaflet
        ↓
LLM + Embeddings + FAISS + CrossEncoder + RAG + Qwen + YUCA
```

Pregunta al auditorio:
> **"¿Cómo llegamos de aquí a allá?"**
> **"Porque el problema fue creciendo."**

---

## CIERRE

**Duración:** ~2 minutos

El cierre vuelve a la pregunta del inicio:
> "¿Qué tecnología necesitas para responder dónde venden hamburguesas en una universidad?"

Y la respuesta completa es:
- Si la pregunta es exacta: una base de datos y un buscador.
- Si el usuario no sabe qué buscar exactamente: lenguaje natural.
- Para lenguaje natural: un modelo de lenguaje.
- Para que el modelo conozca tus datos: RAG.
- Para RAG: embeddings + búsqueda vectorial.
- Para el modelo: infraestructura de cómputo.
- Para todo lo demás: las decisiones que se van tomando conforme el problema crece.

**Frase de cierre:**
> "No aprendimos primero la tecnología para después construir el proyecto. Aprendimos la tecnología porque necesitábamos resolver el proyecto."

---

## ESTRUCTURA NARRATIVA DE CADA SECCIÓN

### SECCIÓN 1 — APERTURA: El problema (recomendado: contraste)
**Opción elegida:** Contraste
> "Empezamos queriendo hacer una lista de tienditas. Terminamos trabajando con modelos de lenguaje, embeddings, búsqueda vectorial y una supercomputadora. Esta es la historia de cómo llegamos de un lugar al otro."

**Por qué esta apertura:** Establece inmediatamente la tensión narrativa (punto A → punto B) y hace que la audiencia quiera saber cómo ocurrió el salto.

---

### SECCIÓN 2 — LA PRIMERA VERSIÓN
**Mensaje:** El problema era resolver la falta de información sobre tienditas. La primera solución fue directa.
**Evidencia:** [REPO] commits marzo-abril 2025; [HISTORIA] skill file sección 2
**Duración:** ~1.5 min

---

### SECCIÓN 3 — EL PROYECTO CRECE
**Mensaje:** Cada funcionalidad nueva nació de una pregunta que el sistema aún no podía responder.
**Evidencia:** [REPO] commits nov 2025; componentes actuales del frontend
**Duración:** ~3 min

---

### SECCIÓN 4 — LA ARQUITECTURA RESULTANTE
**Mensaje:** No fue diseñada de inicio — fue creciendo.
**Evidencia:** [REPO] vestigios (`CafeDetails.jsx` vacío, `App.jsx` con mocks, `polls/` tutorial Django)
**Duración:** ~2 min

---

### SECCIÓN 5 — "HAY QUE METERLE IA"
**Mensaje:** La idea informal se convirtió en una pregunta de ingeniería.
**Evidencia:** [HISTORIA] skill file sección 3; [REPO] aparición de `rag_engine.py` (nov 2025)
**Duración:** ~1 min

---

### SECCIÓN 6 — ¿PARA QUÉ IA?
**Mensaje:** La IA tiene un caso de uso concreto: lenguaje natural para consultas sobre cafeterías.
**Evidencia:** [REPO] `ChatWidget.jsx`, `/api/chatbot/`, ejemplos de consultas en README
**Duración:** ~1.5 min

---

### SECCIÓN 7 — DEL LENGUAJE NATURAL AL RAG
**Mensaje:** El LLM no conoce nuestros datos. Necesitamos conectarlos.
**Evidencia:** [REPO] clase `BuhoRAG`, pipeline RAG, `rag_data_fixed.json`
**Duración:** ~3 min

---

### SECCIÓN 8 — EL MOMENTO MEMORABLE (momento pico)
**Mensaje:** ¿Cómo llegamos de una lista de tienditas a todo esto?
**Evidencia:** [REPO] toda la arquitectura actual vs primer commit
**Duración:** ~1.5 min

---

### SECCIÓN 9 — ¿DÓNDE EJECUTAMOS EL MODELO?
**Mensaje:** Un problema nuevo: el modelo necesita recursos que no tenemos localmente.
**Evidencia:** [REPO] `rag_engine_hpc.py`, fallback HTTP 503, README sobre YUCA
**Duración:** ~2 min

---

### SECCIÓN 10 — LO QUE APRENDIMOS
**Mensaje:** No aprendimos la tecnología y luego la aplicamos. La aplicamos y así la aprendimos.
**Evidencia:** [REPO] vestigios de iteración (23+ commits de fixes en un día), bugs conocidos, deuda técnica
**Duración:** ~2 min

---

### SECCIÓN 11 — CIERRE
**Mensaje:** El problema guió la solución. No al revés.
**Duración:** ~1 min

---

## ANALOGÍAS RECOMENDADAS

### Para RAG
**La analogía del libro de consulta:**
> "Imaginen preguntarle algo a alguien que habla muy bien. Si le preguntan '¿cuánto cuesta la torta cubana en la tiendita de exactas?', probablemente no va a saber. Pero si antes de responder le damos el menú actualizado de esa tiendita... ahora puede responder con precisión. Eso es esencialmente lo que hace RAG: antes de que el modelo responda, le damos la información relevante que necesita."

**Riesgo de malentendido:** Podría parecer que el modelo "lee" el documento completo. Aclarar que FAISS recupera solo los fragmentos más relevantes.

### Para Embeddings
**La analogía de la distancia semántica:**
> "Los embeddings convierten palabras y frases en números — vectores. Lo interesante es que palabras con significados similares quedan cerca en ese espacio numérico. 'Hamburguesa' y 'burger' estarían cerca. 'Hamburguesa' y 'contabilidad' estarían lejos. Esa 'cercanía' es la que usamos para encontrar los documentos más relevantes a una consulta."

### Para el Salto de Complejidad
**La analogía de la lista de compras:**
> "Imaginen que empezaron haciendo una lista de compras. Simple. Después alguien dijo 'oye, ¿podemos ordenarla por pasillo del supermercado?' Después: '¿y si indicamos el precio de cada cosa?' Después: '¿y si el sistema calcula cuánto gastaríamos?' Nunca planearon hacer una aplicación de gestión de compras. Fueron respondiendo preguntas una a la vez."

---

## LO QUE NO DEBE APARECER EN LA PRESENTACIÓN

- "El Búho Tragón es un proyecto de IA" — es incorrecto respecto al enfoque
- Listas de 15 logos de tecnologías sin contexto
- "Utilizamos tecnología innovadora/disruptiva/de vanguardia"
- Benchmarks de performance inventados
- Comparaciones de modelos sin evidencia
- Afirmar que APIs comerciales fueron descartadas sin confirmarlo con el equipo
- Ocultar las vulnerabilidades de seguridad — son parte honesta de la historia del proyecto
- Fingir que todo estuvo planeado desde el principio
