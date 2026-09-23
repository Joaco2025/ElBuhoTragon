# 02 — Línea Temporal de Evolución del Proyecto
## El Búho Tragón
**Clasificación de evidencia:** [REPO] = repositorio | [DOCS] = documentación | [HISTORIA] = equipo | [INFERENCIA] | [CONFIRMAR]

---

## LÍNEA TEMPORAL RECONSTRUIDA

```
MARZO 2025          INICIO DEL PROYECTO (IS1)
    │
    ▼
ABRIL 2025          PRIMERA ESTRUCTURA TÉCNICA
    │
    ▼
MAYO–NOV 2025       EXPANSIÓN FUNCIONAL (IS2)
    │
    ▼
NOV–DIC 2025        INCORPORACIÓN DE IA / RAG
    │
    ▼
FEB 2026            DOCUMENTACIÓN Y REFACTOR
    │
    ▼
MAY 2026            RAG PRODUCTION-READY
    │
    ▼
AGO–SEP 2026        PULIDO FINAL
```

---

## ETAPAS DETALLADAS

### ETAPA 0 — Idea Original
**Evidencia:** [HISTORIA DEL EQUIPO] + skill file
**Período estimado:** Antes de marzo 2025

La idea nació de una experiencia cotidiana al ingresar a la UNISON: no saber con claridad dónde estaban los establecimientos de comida del campus, qué vendían, cuánto costaba ni qué opciones existían. 

La primera idea fue sencilla: reunir esa información en una plataforma.

En este punto la solución imaginada era básicamente un catálogo/directorio. No existía ninguna intención de construir una arquitectura compleja.

**[CONFIRMAR CON EQUIPO]:** ¿Quién propuso la idea inicial y en qué contexto exactamente?

---

### ETAPA 1 — Primera Estructura del Proyecto (IS1)
**Evidencia:** [REPO] Commits más antiguos
**Período:** Marzo–Abril 2025

| Fecha | Commit | Significado |
|---|---|---|
| 2025-03-27 | `5bac08b Crear Estructura del Peoyecto` | Primer commit — incluso con typo en el título |
| 2025-04-05 | `3d658a9 Agregar estructura del backend` | Estructura inicial backend |
| 2025-04-05 | `fca30f8 Agregar estructura del proyecto` | |
| 2025-04-06 | `402303f Initial commit` | |
| 2025-04-12 | `763eb3f IDS21-2 Informacion Actualizada` | Referencia a tarea de IS1 (IDS21 = Ingeniería de Software) |
| 2025-04-12 | `24062bb SCRUM-1 Archivo de informacion actualizado` | Primer uso de SCRUM como metodología |
| 2025-04-13 | `71001c6 Respaldo de la base de datos agregada` | BD incorporada al repo |
| 2025-04-14 | `f056c83 SCRUM-8 Base de Datos Conectada y Modelo Migrado` | BD conectada a Django |
| 2025-04-14 | `8fcf4ed SCRUM-6 API Rest Agregada al Proyecto` | Primera API REST |
| 2025-04-15 | `5bedeec Autenticacion de Usuarios Agregado` | Primer sistema de auth |
| 2025-04-17 | `592f336 Nuevas carpetas de components, utils y pages` | Estructura React organizada |

**Observaciones [REPO]:**
- Los commits de SCRUM confirman que el equipo usó metodología ágil desde el inicio
- La BD ya existía antes de conectarla a Django (commits de "Respaldo" antes de "Base de Datos Conectada")
- El primer commit con typo es humanamente auténtico y demuestra que fue un proyecto real de estudiantes

**[INFERENCIA]:** La nomenclatura `IDS21` y `SCRUM-X` sugiere que IS1 tenía tareas numeradas y gestión de backlog. El proyecto pudo haber comenzado incluso antes en IS1 y migrado a IS2 con una nueva estructura.

**¿Qué había en esta primera versión?** [CONFIRMAR CON EQUIPO]
Basado en los commits: un backend Django con una BD, una API REST y autenticación básica. El frontend tenía componentes y páginas organizadas. La funcionalidad principal sería catálogo/listado.

---

### ETAPA 2 — Expansión del Frontend / Integración
**Evidencia:** [REPO] Commits abril 2025
**Período:** Abril 2025

| Fecha | Commit | Significado |
|---|---|---|
| 2025-04-16 | `fcf02f3 Informacion ejecutar el backend actualizada` | Documentación |
| 2025-04-17 | `eaf8ce5 Carpeta de Documentacion Agregada` | Se incorpora documentación formal |

**[INFERENCIA]:** La aparición de una "Carpeta de Documentacion" sugiere que el proyecto ya estaba siendo evaluado formalmente. Posiblemente cierre de IS1.

---

### ETAPA 3 — Inicio de IS2 / Expansión Funcional
**Evidencia:** [REPO] Commits mayo–noviembre 2025
**Período:** Mayo–Noviembre 2025

Aunque hay un gap en los commits (de abril a diciembre), el estado del código actual y la skill file describen:

- **Búsqueda:** `Home.jsx` implementa filtros por facultad, categoría y presupuesto. [REPO]
- **Mapas:** `CampusMap.jsx` con Leaflet, centrado en UNISON, coordenadas por cafetería. [REPO]
- **Reseñas:** Modelo `Resenas`, endpoint `/api/Resenas/`, vista `PlantillaCafeteria.jsx`. [REPO]
- **Administración:** `AdminDashboard.jsx` con CRUD completo de cafeterías, menús y moderación. [REPO]
- **Usuarios/Autenticación:** JWT, registro `@unison.mx`, roles admin/estudiante. [REPO]

Los commits de noviembre 2025 (rama `intento_sqlite`) confirman esta expansión:

| Fecha | Commit | Significado |
|---|---|---|
| 2025-11-30 | `5b16953 feat(fullstack): implementacion de rutas dinamicas y plantilla maestra, dashboard administrativo con CRUD completo` | Gran commit funcional |
| 2025-11-30 | `48c7b4f feat(fullstack): refactorización del frontend hacia enrutamiento dinámico...` | Arquitectura moderna |
| 2025-11-30 | `8b7242b feat(fullstack): auth completa, dashboard admin y conexion estable BD en rama test` | Auth + Admin completos |
| 2025-11-30 | `cac88d6 añadida función crear/eliminar cafeterias directamente a la base de datos en dashboard` | CRUD cafeterías |

**Observación importante [REPO]:** El commit `5b16953` de noviembre 2025 es el primer commit que menciona "rutas dinámicas y plantilla maestra, dashboard administrativo". Esto sugiere que toda la expansión mayor ocurrió durante IS2, probablemente en el segundo semestre 2025.

---

### ETAPA 4 — Aparición del Módulo de IA / Primera Versión del RAG
**Evidencia:** [REPO] Commits noviembre 2025
**Período:** Noviembre 2025

Esta es la etapa más interesante narrativamente. Los commits muestran una secuencia de iteraciones intensas:

| Fecha | Commit | Significado |
|---|---|---|
| 2025-11-26 | `f90704e Actualizado rag_engine.py` | Primera aparición del motor RAG |
| 2025-11-26 | `b44be06 Actualizado requirements.txt` | Dependencias de IA añadidas |
| 2025-11-26 | múltiples | `Actualizado rag_engine.py` (×7 commits en el mismo día) | Iteración intensa en un solo día |
| 2025-11-27 | `b9ed200 rag_engine_hpc.py creado` | Primera versión del motor para HPC |
| 2025-11-27 | `064c6b0 rag_engine_hpc.py actualizado` | Adaptación a infraestructura HPC |
| 2025-11-27 | `07d5556 Cambios en requirements para HPC` | Dependencias específicas para clúster |
| 2025-11-30 | `aa6ed34 Agregados Terminos, Privacidad y Contacto` | Completando páginas legales |

**Análisis narrativo [REPO + INFERENCIA]:**
- Hay dos archivos distintos: `rag_engine.py` (versión local) y `rag_engine_hpc.py` (versión HPC). Esto indica que primero se desarrolló localmente y luego se adaptó al clúster.
- Los 7 commits de `rag_engine.py` en un solo día (26-nov) sugieren una sesión intensiva de debug/iteración.
- La creación de `rag_engine_hpc.py` un día después implica que rápidamente se identificó que la versión local no era suficiente para el modelo que querían ejecutar.

**[CONFIRMAR CON EQUIPO]:**
- ¿Cuándo y cómo accedieron por primera vez a ACARUS/YUCA?
- ¿Qué modelo intentaron ejecutar en `rag_engine.py` (versión local)?
- ¿El `rag_engine.py` original usaba una API comercial, llama.cpp u otro enfoque?

---

### ETAPA 5 — Fixes Intensivos al "Buhito" + Migración a SQLite
**Evidencia:** [REPO] Commits noviembre–diciembre 2025
**Período:** Noviembre–Diciembre 2025

| Fecha | Commits | Significado |
|---|---|---|
| 2025-11-30 | `87d2b36 Fixes al Buhito` (×13 commits) | Bugs del chatbot, probablemente en HPC |
| 2025-11-30 | `f9a7340 DB en sqlite funcional` | Migración exitosa a SQLite |
| 2025-11-30 | `3e2bf23 Preparando para migrar a sqlite` | Migración desde MySQL |
| 2025-12-01 | múltiples | `Fixes de formato en respuesta LLM` (×10 commits) | Problemas de formato en las respuestas del LLM |

**Análisis narrativo [REPO + INFERENCIA]:**
- Los 13 commits de "Fixes al Buhito" en un día son evidencia directa de que integrar el chatbot tuvo fricción considerable.
- Los 10 commits de "Fixes de formato en respuesta LLM" indican que el LLM generaba respuestas con formato incorrecto (asteriscos, saltos de línea, etc.) que requerían post-procesamiento.
- La migración a SQLite ocurrió en paralelo con el desarrollo del RAG. [CONFIRMAR CON EQUIPO] ¿Por qué se migró de MySQL a SQLite en ese momento?

---

### ETAPA 6 — RAG Production-Ready + Refactor Limpieza
**Evidencia:** [REPO] Commits mayo–agosto 2026
**Período:** Febrero–Agosto 2026

| Fecha | Commit | Significado |
|---|---|---|
| 2026-02-18 | `d2f1b8b docs: Expand README` | Primera documentación completa del proyecto |
| 2026-02-18 | `e5c722d docs: Remove SSH tunnel access instructions` | Se elimina referencia a servidor "Turing" (anterior a YUCA) |
| 2026-05-03 | `60fccae feat: implement production-ready RAG engine with fuzzy location mapping, category-based indexing, and Llama-cpp integration` | RAG completo con mapeo de ubicaciones |
| 2026-08-20 | `629aeb4 refactor: extraer utilidades RAG y limpiar código de legado` | Separación de `rag_utils.py` |
| 2026-08-20 | `de747cb feat: optimización final RAG para HPC, caché FAISS y limpieza de código` | Caché FAISS, optimizaciones finales |
| 2026-08-23 | `14bd5a0 fix: reparar integración del RAG del chatbot y eliminar historial compartido entre usuarios` | Bug crítico: historial compartido entre usuarios (Singleton) |
| 2026-09-16 | `ffd78a5 feat(frontend): refine El Buho Tragon UI and design system` | Pulido visual final |

**Observaciones narrativas importantes [REPO]:**
1. El commit `60fccae` menciona "Llama-cpp integration" en su descripción. Esto es un vestigio histórico importante: el motor tuvo una fase con llama.cpp antes de usar Transformers/Qwen directamente.
2. El commit `e5c722d` elimina instrucciones de SSH tunnel a `turing.mat.uson.mx`. "Turing" parece haber sido un servidor anterior (posiblemente del departamento de Matemáticas, dada la URL `.mat.uson.mx`) antes de acceder a YUCA/ACARUS.
3. El bug "historial compartido entre usuarios" (agosto 2026) es muy valioso narrativamente: el Singleton del RAG guardaba historial de una conversación y lo mezclaba con la siguiente. Problema clásico de estado compartido en arquitecturas singleton.

**[CONFIRMAR CON EQUIPO]:**
- ¿Qué era "Turing" (turing.mat.uson.mx)? ¿Un servidor del departamento de Matemáticas?
- ¿Cuándo exactamente pasaron de Turing a YUCA/ACARUS?
- ¿Llegaron a usar llama.cpp en producción o fue solo un intento?

---

### ETAPA 7 — Estado Actual
**Evidencia:** [REPO]
**Período:** Septiembre 2026

El sistema actualmente tiene:
- Frontend SPA completo con diseño visual pulido (identidad "Hungry Owl")
- Backend Django con API REST completa
- RAG funcionando en YUCA con Qwen2.5-14B-Instruct
- 14 cafeterías, 482 platillos vectorizados
- Deuda técnica conocida (seguridad, URLs hardcodeadas, tests inexistentes)

---

## RESUMEN CRONOLÓGICO PARA LA PRESENTACIÓN

| Período | Hito | Evidencia |
|---|---|---|
| Mar 2025 | Primer commit del proyecto | [REPO] `5bac08b` |
| Abr 2025 | BD conectada + primera API REST + auth básica | [REPO] Commits SCRUM-6, SCRUM-8 |
| Abr 2025 | Primera documentación formal | [REPO] `eaf8ce5` |
| May–Oct 2025 | [GAP EN COMMITS] — Desarrollo IS2 | [INFERENCIA] |
| Nov 2025 | Rutas dinámicas, CRUD admin, auth completa | [REPO] `5b16953`, `8b7242b` |
| Nov 2025 | Primera aparición de `rag_engine.py` | [REPO] `f90704e` |
| Nov 2025 | Creación de `rag_engine_hpc.py` para clúster | [REPO] `b9ed200` |
| Nov–Dic 2025 | 23+ commits de fixes al "Buhito" + formato LLM | [REPO] |
| Dic 2025 | Migración MySQL → SQLite | [REPO] `f9a7340` |
| Feb 2026 | Documentación completa, eliminar referencia a "Turing" | [REPO] `d2f1b8b`, `e5c722d` |
| May 2026 | RAG production-ready con fuzzy matching y FAISS caché | [REPO] `60fccae` |
| Ago 2026 | Refactor RAG: extracción a `rag_utils.py`, optimizaciones HPC | [REPO] `629aeb4`, `de747cb` |
| Ago 2026 | Fix crítico: historial compartido entre usuarios (Singleton bug) | [REPO] `14bd5a0` |
| Sep 2026 | UI final "Hungry Owl" | [REPO] `ffd78a5` |

---

## ETAPAS MARCADAS POR STATUS

| Etapa del prompt | Status | Evidencia |
|---|---|---|
| 1. Idea original | ✅ Confirmada | [HISTORIA DEL EQUIPO] + skill |
| 2. Primera versión | ✅ Confirmada | [REPO] commits mar-abr 2025 |
| 3. Evolución IS2 | ✅ Confirmada (evidencia de llegada) | [REPO] commits nov 2025 |
| 4. Búsqueda | ✅ Confirmada | [REPO] `Home.jsx` filtros |
| 5. Mapas | ✅ Confirmada | [REPO] `CampusMap.jsx`, Leaflet |
| 6. Reseñas | ✅ Confirmada | [REPO] modelo `Resenas`, vista |
| 7. Administración | ✅ Confirmada | [REPO] `AdminDashboard.jsx` |
| 8. Usuarios/auth/seguridad | ✅ Confirmada (parcialmente) | [REPO] JWT, `@unison.mx` |
| 9. Idea de IA | ✅ Confirmada | [HISTORIA] + aparición `rag_engine.py` |
| 10. Caso de uso concreto (lenguaje natural) | ✅ Confirmada | [REPO] endpoint `/api/chatbot/`, ChatWidget |
| 11. APIs comerciales | ❓ NO CONFIRMADO EN REPOSITORIO | [CONFIRMAR CON EQUIPO] |
| 12. Exploración modelos abiertos | 🟡 Inferida | [REPO] mención llama.cpp en commit 60fccae |
| 13. Embeddings | ✅ Confirmada | [REPO] `paraphrase-multilingual-MiniLM-L12-v2` |
| 14. Búsqueda vectorial | ✅ Confirmada | [REPO] FAISS `IndexFlatL2` |
| 15. RAG | ✅ Confirmada | [REPO] clase `BuhoRAG` completa |
| 16. Modelos Qwen | ✅ Confirmada | [REPO] `Qwen2.5-14B-Instruct` |
| 17. Ejecución local/HPC | ✅ Confirmada | [REPO] `rag_engine.py` vs `rag_engine_hpc.py` |
| 18. ACARUS/YUCA | ✅ Confirmada | [REPO + DOCS] README, PROJECT_CONTEXT |
| 19. Estado actual | ✅ Confirmada | [REPO] último commit sep 2026 |
