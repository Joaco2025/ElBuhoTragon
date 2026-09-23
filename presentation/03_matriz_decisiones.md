# 03 — Matriz de Decisiones Tecnológicas
## El Búho Tragón — Base para la Narrativa de la Ponencia
**Principio:** Cada tecnología fue una respuesta a una necesidad, no un punto de partida.

---

## MARCO ANALÍTICO

Cada decisión sigue el esquema:
**NECESIDAD → PROBLEMA → ALTERNATIVAS → CRITERIOS → DECISIÓN → RESULTADO → APRENDIZAJE**

---

## DECISIÓN 1: Framework de Backend — Django

| Campo | Contenido |
|---|---|
| **Necesidad** | El catálogo necesitaba una forma de gestionar datos de cafeterías, menús y responder peticiones desde el frontend |
| **Problema** | Construir una API REST desde cero es complejo y propenso a errores de seguridad |
| **Alternativas** | [POR CONFIRMAR] — Posiblemente Flask, FastAPI, Node.js/Express |
| **Criterios** | [POR CONFIRMAR] — Posiblemente: conocimiento previo del equipo, ecosistema, ORM integrado |
| **Decisión** | Django 5 + Django REST Framework |
| **Resultado** | API REST funcional con ORM para BD, serializers, autenticación, panel admin nativo |
| **Aprendizaje** | [CONFIRMAR] El tutorial de Django (`backend/polls/`) quedó como vestigio — el equipo aprendió Django mientras construía el proyecto |
| **Evidencia** | [REPO] `backend/apps/cafeteria/`, `backend/polls/` (residuo tutorial), `requirements.txt` |

---

## DECISIÓN 2: Base de Datos — MySQL → SQLite

| Campo | Contenido |
|---|---|
| **Necesidad** | Almacenar y consultar datos de facultades, cafeterías, menús, usuarios y reseñas |
| **Problema** | Inicialmente se usó MySQL. En el clúster HPC (YUCA) o en el entorno de desarrollo, MySQL generó problemas de configuración/disponibilidad |
| **Alternativas** | MySQL (ya en uso), SQLite, PostgreSQL |
| **Criterios** | [POR CONFIRMAR] — Posiblemente: facilidad de despliegue, no necesitar servidor de BD separado, portabilidad del archivo `.db` |
| **Decisión** | Migración a SQLite (diciembre 2025); MySQL mantenido como opción de producción en documentación |
| **Resultado** | La BD SQLite (`el_buho_tragon.db`) viaja en el repositorio, simplifica el despliegue |
| **Aprendizaje** | [CONFIRMAR] Qué dificultades encontraron con MySQL que motivaron el cambio |
| **Evidencia** | [REPO] `sql/` contiene dumps de BD llamada `ComidaCampus` (MySQL previa); commits `3e2bf23 Preparando para migrar a sqlite`, `f9a7340 DB en sqlite funcional` (nov-dic 2025) |

---

## DECISIÓN 3: Frontend — React + Vite + TailwindCSS

| Campo | Contenido |
|---|---|
| **Necesidad** | Interfaz de usuario interactiva para consultar cafeterías, ver mapas, filtrar y chatear |
| **Problema** | Una interfaz estática o con templates de Django no hubiera permitido la interactividad requerida (filtros en tiempo real, mapa, chat flotante) |
| **Alternativas** | [POR CONFIRMAR] — Posiblemente: Django Templates + htmx, Vue.js, Angular |
| **Criterios** | [POR CONFIRMAR] — Posiblemente: conocimiento del equipo, ecosistema, SPA para mejor UX |
| **Decisión** | React 19 + Vite 6 + TailwindCSS 4 |
| **Resultado** | SPA con routing dinámico, componentes reutilizables, build optimizado |
| **Aprendizaje** | La URL hardcodeada (`http://127.0.0.1:8000` en 19 lugares) muestra que la configuración de despliegue fue una consideración tardía |
| **Evidencia** | [REPO] `frontend/package.json`, `main.jsx`, 19 URLs hardcodeadas confirmadas |

---

## DECISIÓN 4: Mapas — Leaflet

| Campo | Contenido |
|---|---|
| **Necesidad** | Los usuarios necesitaban saber dónde físicamente estaban las cafeterías dentro del campus |
| **Problema** | Una dirección de texto ("Edificio 3-A") no es suficiente para alguien que no conoce el campus |
| **Alternativas** | [POR CONFIRMAR] — Google Maps API (de pago), Mapbox, OpenStreetMap/Leaflet (gratuito) |
| **Criterios** | Gratuidad, facilidad de integración con React, tiles de OpenStreetMap disponibles sin API key |
| **Decisión** | Leaflet + React-Leaflet con tiles de OpenStreetMap |
| **Resultado** | Mapa interactivo centrado en UNISON (`[29.0837, -110.9613]`) con marcadores por cafetería; coordenadas almacenadas en BD |
| **Aprendizaje** | Se tuvo que resolver el bug clásico de Vite/Leaflet con `DefaultIcon` — las imágenes de marcadores no se cargan correctamente con Vite sin configuración especial |
| **Evidencia** | [REPO] `CampusMap.jsx`, campos `latitud`/`longitud` en modelo `Tienditas`, `Leaflet` en `package.json` |

---

## DECISIÓN 5: Autenticación — JWT (Simple JWT)

| Campo | Contenido |
|---|---|
| **Necesidad** | Distinguir usuarios regulares de administradores; proteger el panel de administración |
| **Problema** | Las sesiones de Django son stateful y no se integran limpiamente con un frontend SPA separado |
| **Alternativas** | Django Sessions (stateful), JWT, OAuth/terceros |
| **Criterios** | Stateless, compatible con SPA, soporte nativo en Django REST Framework |
| **Decisión** | Simple JWT con tokens Access (60 min) + Refresh (1 día) |
| **Resultado** | Autenticación funcional; tokens en localStorage; validación `@unison.mx` |
| **Aprendizaje** | La implementación quedó incompleta: los ViewSets no exigen tokens, y el frontend accede a endpoints protegidos sin enviar headers de autorización en todos los casos |
| **Evidencia** | [REPO] `settings.py:SIMPLE_JWT`, `login_view` en `views.py`, tokens en `localStorage` |

---

## DECISIÓN 6: Incorporar Inteligencia Artificial — Por qué y para qué

| Campo | Contenido |
|---|---|
| **Necesidad** | La plataforma tenía búsqueda por categoría/facultad, pero no podía responder preguntas en lenguaje natural como "¿Dónde venden hamburguesas baratas cerca de ingeniería?" |
| **Problema** | La búsqueda tradicional requiere que el usuario conozca los términos exactos. El lenguaje natural es más natural para la consulta de información gastronómica |
| **Alternativas** | Mejorar la búsqueda tradicional, usar API comercial (OpenAI, Google), modelo abierto local/HPC |
| **Criterios** | [CONFIRMAR] — Posiblemente: costo, control sobre los datos, acceso a infraestructura HPC |
| **Decisión** | Modelo abierto (Qwen) en infraestructura HPC + RAG |
| **Resultado** | Chatbot "El Buhito" que responde preguntas en lenguaje natural sobre cafeterías, precios, ubicaciones |
| **Aprendizaje** | La IA no fue el punto de partida. Fue la respuesta a una necesidad de interacción más natural |
| **Evidencia** | [REPO] `ChatWidget.jsx`, `/api/chatbot/`, clase `BuhoRAG`; [HISTORIA] skill file sección 3 |

---

## DECISIÓN 7: Arquitectura de IA — RAG vs otras opciones

| Campo | Contenido |
|---|---|
| **Necesidad** | El modelo de lenguaje no conoce los datos específicos de las cafeterías de la UNISON |
| **Problema** | No se puede poner toda la información de 482 platillos y 14 cafeterías en el prompt de cada consulta (límite de contexto + ineficiencia) |
| **Alternativas** | Fine-tuning del modelo, poner toda la información en el system prompt, RAG |
| **Criterios** | Eficiencia, actualización dinámica de datos, reducción de alucinaciones, factibilidad técnica |
| **Decisión** | RAG: embeddings + FAISS + re-ranking + LLM |
| **Resultado** | El sistema recupera solo los chunks relevantes a la consulta, los entrega como contexto al LLM, y genera respuestas basadas en datos reales |
| **Aprendizaje** | RAG añade complejidad (pipeline de 8 pasos, desincronización BD-RAG) pero permite datos actualizables sin re-entrenar el modelo |
| **Evidencia** | [REPO] `rag_engine_hpc.py` pipeline completo, `rag_data_fixed.json` (482 registros), caché FAISS |

---

## DECISIÓN 8: Modelo de Embeddings — paraphrase-multilingual-MiniLM-L12-v2

| Campo | Contenido |
|---|---|
| **Necesidad** | Convertir las consultas en lenguaje natural y los documentos de cafeterías en vectores para búsqueda semántica |
| **Problema** | Se necesitaba un modelo de embeddings que funcionara bien en español (las consultas y los datos son en español) |
| **Alternativas** | [POR CONFIRMAR] — Posiblemente modelos en inglés, text-embedding-ada (OpenAI), otros multilingual |
| **Criterios** | Soporte multilingüe (español), código abierto, tamaño manejable, integrable vía sentence-transformers |
| **Decisión** | `paraphrase-multilingual-MiniLM-L12-v2` (384 dimensiones) |
| **Resultado** | Embeddings semánticos en español/inglés; vectores de 384 dimensiones; modelo pequeño (~500 MB) |
| **Aprendizaje** | [CONFIRMAR] ¿Se evaluaron otros modelos de embeddings? |
| **Evidencia** | [REPO] `rag_engine_hpc.py`, `requirements.txt` de `llm_rag/` |

---

## DECISIÓN 9: Índice Vectorial — FAISS

| Campo | Contenido |
|---|---|
| **Necesidad** | Buscar eficientemente los chunks más relevantes entre todos los documentos vectorizados |
| **Problema** | Una búsqueda lineal entre todos los vectores es lenta conforme crece el corpus |
| **Alternativas** | [POR CONFIRMAR] — ChromaDB, Pinecone, Weaviate, Milvus, FAISS |
| **Criterios** | Código abierto, sin servidor externo requerido, integración con Python, velocidad |
| **Decisión** | FAISS `IndexFlatL2` (búsqueda exacta por distancia euclidiana L2) |
| **Resultado** | Índice vectorial en memoria con caché en disco (< 10 ms de carga si el JSON no cambió) |
| **Aprendizaje** | La implementación de caché del índice fue una optimización importante: sin caché, la construcción del índice tardaría en cada arranque |
| **Evidencia** | [REPO] `rag_engine_hpc.py:build_index()`, caché `.cache/faiss.index` + `docs_meta.pkl` |

---

## DECISIÓN 10: Re-ranking — CrossEncoder

| Campo | Contenido |
|---|---|
| **Necesidad** | Los embeddings recuperan chunks semánticamente similares, pero no necesariamente los más relevantes para la consulta específica |
| **Problema** | La búsqueda vectorial inicial (bi-encoder) es rápida pero aproximada. Necesitamos refinar los resultados |
| **Alternativas** | Solo usar los resultados del bi-encoder, re-ranking con CrossEncoder, BM25 |
| **Criterios** | Mejora en relevancia de resultados sin costo computacional prohibitivo (el CrossEncoder solo evalúa los top-k, no todo el corpus) |
| **Decisión** | CrossEncoder `ms-marco-MiniLM-L-6-v2` sobre los top-k resultados de FAISS |
| **Resultado** | Dos etapas: bi-encoder rápido → CrossEncoder preciso → top 10 chunks para el LLM |
| **Aprendizaje** | La arquitectura bi-encoder + re-ranking es un patrón estándar en sistemas RAG de producción |
| **Evidencia** | [REPO] `rag_engine_hpc.py`, imports de `cross_encoder` |

---

## DECISIÓN 11: LLM — Qwen2.5-14B-Instruct

| Campo | Contenido |
|---|---|
| **Necesidad** | Un modelo de lenguaje que genere respuestas coherentes, en español, basadas en el contexto recuperado |
| **Problema** | Los modelos pequeños alucinan más. Los modelos grandes necesitan mucha VRAM (>24 GB) |
| **Alternativas** | Qwen2.5-3B (ligero), Qwen2.5-7B, Qwen2.5-14B, APIs comerciales (OpenAI, Anthropic) |
| **Criterios** | Calidad de respuesta en español, disponibilidad de recursos en YUCA (AMD Instinct MI210, ROCm), código abierto |
| **Decisión** | Qwen2.5-14B-Instruct (~28 GB VRAM en FP16) |
| **Resultado** | Respuestas de alta calidad en español; parámetros conservadores (temp=0.1) para minimizar alucinaciones |
| **Aprendizaje** | El README menciona que también se contemplan modelos más pequeños (`Qwen2.5-3B-Instruct`) para escenarios con menos recursos |
| **Evidencia** | [REPO] `rag_engine_hpc.py:model_id="Qwen/Qwen2.5-14B-Instruct"`, `requirements_hpc.txt`, README |

---

## DECISIÓN 12: Infraestructura HPC — ACARUS/YUCA

| Campo | Contenido |
|---|---|
| **Necesidad** | Ejecutar Qwen2.5-14B-Instruct requiere ~28 GB de VRAM — ninguna laptop de desarrollo puede hacerlo |
| **Problema** | Sin GPU de alta gama, el modelo no es ejecutable localmente. Una API comercial tendría costos recurrentes |
| **Alternativas** | API comercial (OpenAI, Anthropic, Google), GPU cloud (AWS, Google Cloud), HPC institucional |
| **Criterios** | Costo (gratuito si se tiene acceso institucional), disponibilidad, ROCm compatible con AMD Instinct MI210 |
| **Decisión** | Clúster Yuca de ACARUS — Área de Cómputo de Alto Rendimiento de la UNISON |
| **Resultado** | Inferencia del LLM en GPU AMD Instinct MI210 con ROCm; fallback defensivo 503 en local |
| **Aprendizaje** | El acceso a HPC desbloquea capacidades que de otro modo serían inaccesibles; el fallback defensivo en Django fue una decisión de ingeniería importante para el desarrollo local |
| **Evidencia** | [REPO] `rag_engine_hpc.py`, `requirements_hpc.txt`, `warmup_rag.py`, README; [DOCS] PROJECT_CONTEXT |

---

## TABLA RESUMEN — PROBLEMA → TECNOLOGÍA

| Problema aparecido | Tecnología incorporada | Cuándo | Evidencia |
|---|---|---|---|
| Necesito gestionar datos y servir una API | Django + DRF | Abr 2025 | [REPO] SCRUM-6 |
| Necesito almacenar datos | SQLite (antes MySQL) | Abr 2025 / migración Dic 2025 | [REPO] commits |
| Necesito una UI interactiva | React + Vite + Tailwind | Abr 2025 | [REPO] package.json |
| Necesito mostrar ubicaciones físicas | Leaflet + OpenStreetMap | Nov 2025 | [REPO] CampusMap.jsx |
| Necesito identificar a los usuarios | JWT (Simple JWT) | Abr–Nov 2025 | [REPO] settings.py |
| Los usuarios quieren consultar en lenguaje natural | LLM | Nov 2025 | [REPO] rag_engine.py |
| El LLM no conoce mis datos | Embeddings + RAG | Nov 2025 | [REPO] BuhoRAG |
| Necesito buscar documentos relevantes | FAISS | Nov 2025 | [REPO] rag_engine_hpc.py |
| Los resultados de búsqueda son imprecisos | CrossEncoder (re-ranking) | Nov 2025 | [REPO] cross_encoder |
| No tengo GPU para ejecutar el modelo | ACARUS/YUCA | Nov 2025 | [REPO] rag_engine_hpc.py |
| El RAG tarda en inicializar | Caché FAISS en disco | Ago 2026 | [REPO] `.cache/faiss.index` |
| El historial de chat se mezcla entre usuarios | Fix Singleton | Ago 2026 | [REPO] commit `14bd5a0` |
