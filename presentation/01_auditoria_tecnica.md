# 01 — Auditoría Técnica del Proyecto
## El Búho Tragón — Para la Ponencia Académica
**Preparado por:** Equipo de análisis (Auditor técnico + Investigador)
**Fecha:** Septiembre 2026
**Propósito:** Base de evidencia para la ponencia "Evolución tecnológica de un proyecto de software: del problema a la solución"

---

## RESUMEN EJECUTIVO

El Búho Tragón es un sistema web de guía gastronómica para la comunidad de la Universidad de Sonora (UNISON), campus Hermosillo. Permite consultar cafeterías universitarias (localmente llamadas "tienditas"), sus menús, precios, ubicaciones y horarios; dejar reseñas; y consultar mediante lenguaje natural a través de un asistente IA basado en RAG.

El proyecto nació en Ingeniería de Software I (IS1) como un catálogo sencillo y evolucionó durante Ingeniería de Software II (IS2) hasta incorporar mapas interactivos, autenticación JWT, panel de administración, reseñas, y finalmente un motor de Recuperación Aumentada por Generación (RAG) sobre una supercomputadora institucional.

---

## 1. ESTRUCTURA REAL DEL PROYECTO

### Árbol principal
```
IS2_ElBuhoTragon/
├── backend/              # API REST — Django 5 + DRF
│   ├── apps/cafeteria/   # Dominio principal: modelos, vistas, serializers, chatbot
│   ├── config/           # Settings, URLs, WSGI/ASGI
│   ├── export_for_rag.py # Pipeline: BD → JSON para RAG
│   ├── fix_encoding.py   # Saneador de acentos
│   └── import_to_sqlite.py
├── frontend/             # SPA — React 19 + Vite 6 + Tailwind 4
│   └── src/
│       ├── components/   # Header, Footer, CampusMap, ChatWidget, CafeCard
│       └── pages/        # Home, Cafeterias, PlantillaCafeteria, Login, AdminDashboard…
├── llm_rag/              # Motor RAG — FAISS + CrossEncoder + Qwen
│   ├── rag_engine_hpc.py # Clase BuhoRAG (motor central)
│   ├── rag_utils.py      # Coordenadas UNISON, alias estudiantiles, Haversine
│   └── rag_data_fixed.json # 482 platillos, 14 cafeterías (base vectorial)
└── sql/                  # Scripts SQL — respaldo e importación inicial
```

### Archivos muertos / código legado confirmado
| Archivo | Estado | Evidencia |
|---|---|---|
| `frontend/src/pages/CafeDetails.jsx` | Vacío (0 bytes) | Sustituido por `PlantillaCafeteria.jsx` |
| `frontend/src/App.jsx` | Código muerto | No importado en `main.jsx`; contiene mock estático `cafeteriasFake` |
| `frontend/src/components/CafeCardGlass.jsx` | Código muerto | Solo importado por `App.jsx` (código muerto) |
| `backend/polls/` | Residuo tutorial Django | No en `INSTALLED_APPS` |
| `backend/apps/cafeteria/urls.py` | Duplicado parcial | Rutas redeclaradas directamente en `config/urls.py` |

**Interpretación para la presentación:** La existencia de `App.jsx` con un array `cafeteriasFake` sugiere que hubo una versión previa orientada a mock data antes de conectar la BD. [INFERENCIA — CONFIRMAR CON EQUIPO]

---

## 2. STACK TECNOLÓGICO VERIFICADO

### Backend
| Componente | Tecnología | Versión confirmada |
|---|---|---|
| Lenguaje | Python | 3.10+ (probado en 3.14.0) |
| Framework web | Django | 5.1.8 (backend/) / 5.2.8 (raíz) |
| API REST | Django REST Framework | 3.16.0 |
| Autenticación | Simple JWT | 5.5.0 |
| Filtrado | django-filter | 24.3 |
| CORS | django-cors-headers | 4.7.0 |
| Variables de entorno | python-dotenv | 1.1.0 |
| Base de datos dev | SQLite | (incluida en repo, 8 MB, 482 menús, 14 cafeterías) |
| Base de datos prod | MySQL | Soportado pero no activo en `settings.py` |

**Nota importante:** La carpeta `sql/` contiene dumps exportados de una base MySQL previa llamada `ComidaCampus`. [REPO] Esto evidencia que la BD pasó de MySQL a SQLite en algún momento del desarrollo.

### Frontend
| Componente | Tecnología | Versión |
|---|---|---|
| Framework | React | 19.0.0 |
| Bundler | Vite | 6.4.1 |
| Estilos | TailwindCSS | 4.1.4 |
| Routing | React Router DOM | 7.5.2 |
| Mapas | Leaflet + React-Leaflet | 1.9.4 / 5.0.0 |
| Iconos | React Icons | 5.5.0 |

### RAG / Inteligencia Artificial
| Componente | Tecnología | Versión / Detalle |
|---|---|---|
| Embeddings | sentence-transformers | `paraphrase-multilingual-MiniLM-L12-v2` (384 dim) |
| Índice vectorial | FAISS | `IndexFlatL2` |
| Re-ranking | CrossEncoder | `cross-encoder/ms-marco-MiniLM-L-6-v2` |
| LLM principal | Qwen2.5-14B-Instruct | ~28 GB VRAM (FP16) |
| Framework ML | PyTorch | ≥2.1.0 |
| HuggingFace | Transformers | ≥4.40.0, <4.46.0 |
| Fuzzy matching | thefuzz | ≥0.22.1 |
| Infraestructura | Clúster Yuca — ACARUS (UNISON) | GPU AMD Instinct MI210 + ROCm |

---

## 3. BASE DE DATOS — ESQUEMA REAL

Verificado directamente con `PRAGMA table_info()` sobre `el_buho_tragon.db`:

| Tabla | Registros actuales | Campos principales |
|---|---|---|
| `Facultades` | 6 | id_facultad, nombre, descripcion, localizacion |
| `Tienditas` | 14 | id_tiendita, nombre, id_facultad(FK), direccion, latitud, longitud, imagen_url, hora_apertura, hora_cierre |
| `Menus` | 482 | id_menu, nombre, descripcion, precio, id_tiendita(FK), categoria |
| `Usuarios` | 4 | id_usuarios, nombre_usuario, contrasena, email, es_admin, fecha_registro |
| `resenas` | 0 | id_resena, calificacion, comentario, fecha_res, id_tiendita(FK), id_usuario(FK) |

**Observación narrativa:** El nombre `Tienditas` (y no "Cafeterías") es significativo. Es el nombre coloquial que los estudiantes UNISON usan para referirse a los puestos de comida del campus. El modelo de datos usa el lenguaje real del problema.

**Historia del motor de BD:** [REPO] Los archivos en `sql/` referencian una base `ComidaCampus` y el README menciona soporte MySQL. La rama `intento_sqlite` (commit `3e2bf23`, nov 2025) y los commits "DB en sqlite funcional" indican una migración posterior de MySQL a SQLite.

---

## 4. AUTENTICACIÓN Y AUTORIZACIÓN

### Lo que funciona
- Endpoint `/api/login/` verifica contraseña con PBKDF2 y emite JWT (access: 60 min, refresh: 1 día)
- El registro a `/api/register` fuerza `es_admin=0`
- El frontend valida correo `@unison.mx` en el formulario de registro

### Problemas de autorización (confirmados por código y prueba empírica)
| Vulnerabilidad | Nivel | Evidencia |
|---|---|---|
| ViewSets sin permisos: cualquiera puede crear/editar/borrar cafeterías sin token | 🚨 CRÍTICO | `views.py`, verificado con prueba HTTP real |
| `GET /api/Usuarios/` expone hashes PBKDF2 de contraseñas | 🚨 CRÍTICO | `serializers.py:fields='__all__'`, verificado |
| El frontend registra usuarios en `/api/Usuarios/` (permite `es_admin:1`) | 🚨 CRÍTICO | `Registro.jsx:L43`, verificado |
| Reseñas: el backend confía en el `id_usuario` del body sin verificar token | 🔥 ALTO | `views.py:ResenaViewSet` |

**Valor narrativo:** Estos hallazgos son honestamente interesantes para la presentación. Muestran que la seguridad fue una capa que se fue adquiriendo progresivamente conforme crecía el proyecto, no algo diseñado desde el principio. [INFERENCIA — CONFIRMAR NARRATIVA CON EQUIPO]

---

## 5. MÓDULO RAG — PIPELINE COMPLETO

El motor RAG (`llm_rag/rag_engine_hpc.py`) implementa la clase `BuhoRAG` con el siguiente flujo:

```
POST /api/chatbot/
  ↓
views.py: _sanitize_history() (máx 6 turnos, 1000 chars)
  ↓
get_rag_engine().query()   [Singleton: una instancia compartida]
  ↓
_reformulate_query(): Qwen reescribe la pregunta con contexto del historial
  ↓
get_coords_from_query(): thefuzz > 85% sobre KNOWN_LOCATIONS (35+ alias UNISON)
  ↓
Regex: detecta presupuesto r'(\d+)\s*(pesos|mxn|\$)'
  ↓
encode(): paraphrase-multilingual-MiniLM-L12-v2 → vector 384 dim
  ↓
FAISS IndexFlatL2: recupera top-k chunks (mín 50)
  ↓
Filtro diversidad: máx 3 chunks por cafetería
  ↓
Filtro Haversine: descarta si > 2500 metros; inyecta "DISTANCIA: X metros"
  ↓
CrossEncoder: re-ranking ms-marco-MiniLM-L-6-v2 → top 10
  ↓
Qwen2.5-14B-Instruct: inferencia (temp=0.1, max_tokens=250)
  ↓
Post-proceso: limpia asteriscos **, fuerza saltos en viñetas •
  ↓
JSON { answer, metadata }
```

### Parámetros de inferencia verificados
- `temperature=0.1` (precisión máxima, creatividad mínima)
- `top_p=0.9`
- `do_sample=True`
- `repetition_penalty=1.05`
- `max_new_tokens=250`

### Caché FAISS
- Archivos: `llm_rag/.cache/faiss.index` + `docs_meta.pkl` + `cache.key`
- La clave de caché es `v2:<mtime_del_json>`: si el JSON no cambió, la carga tarda < 10 ms.

### Desincronización BD ↔ RAG
El RAG lee `rag_data_fixed.json`, **no** la BD en caliente. Para propagar cambios:
```
python export_for_rag.py → python fix_encoding.py → python manage.py warmup_rag
```
Este pipeline es manual. [REPO] Punto de deuda técnica relevante para la presentación.

---

## 6. FRONTEND — RUTAS Y COMPONENTES CLAVE

| Ruta | Componente | Función |
|---|---|---|
| `/` | `Home.jsx` | Catálogo, carrusel, buscador, filtro por facultad/categoría/horario |
| `/cafeterias` | `Cafeterias.jsx` | "Pasaporte Tragón" — gamificación por reseñas |
| `/cafeterias/:id` | `PlantillaCafeteria.jsx` | Detalle, mapa individual, menú, reseñas |
| `/facultad` | `Facultad.jsx` | Mapa campus completo |
| `/login` | `Login.jsx` | JWT |
| `/registro` | `Registro.jsx` | Valida `@unison.mx` |
| `/admin/dashboard` | `AdminDashboard.jsx` | CRUD cafeterías/menús, moderación reseñas |

### Mecanismos notables
- **Horario en tiempo real:** `getHorarioStatus()` compara hora del navegador vs `hora_apertura`/`hora_cierre` de cada cafetería → clasifica "Abiertas Ahora" / "Cerradas"
- **Pasaporte Tragón:** Gamificación — porcentaje de cafeterías reseñadas, rangos (Novato → Leyenda del Campus)
- **GPS en el chat:** `navigator.geolocation.getCurrentPosition` → empaqueta lat/lon en el request al chatbot
- **Mapa Leaflet:** Centrado en Rectoría UNISON `[29.0837, -110.9613]`; resuelve el bug clásico de Vite con `DefaultIcon`

---

## 7. SEGURIDAD — RESUMEN

| Área | Estado |
|---|---|
| Contraseñas | Hasheadas con PBKDF2 (Django) ✅ |
| JWT | Access 60 min, Refresh 1 día ✅ |
| Validación dominio `@unison.mx` | Implementada en frontend ✅ |
| Permisos de escritura en ViewSets | Sin protección 🚨 |
| Exposición de hashes en GET /api/Usuarios/ | Confirmada 🚨 |
| Escalación de privilegios en registro | Confirmada 🚨 |
| URLs hardcodeadas en frontend | 19 ocurrencias ⚠️ |
| DJANGO_SECRET_KEY sin .env.example | Sin archivo base ⚠️ |
| Prompt injection en RAG | Riesgo medio, sin filtrado previo ⚠️ |

---

## 8. PRUEBAS AUTOMATIZADAS

**Estado: Inexistentes.**
- `backend/apps/cafeteria/tests.py`: solo el comentario `# Create your tests here.`
- No hay configuración de Vitest, Jest ni Cypress en frontend.
- `npm run lint` genera 5 errores de variables no usadas y 1 warning de hooks.

---

## 9. EVIDENCIA DE VESTIGIOS TECNOLÓGICOS

| Vestigio | Tecnología | Significado narrativo |
|---|---|---|
| `sql/` con dumps de `ComidaCampus` | MySQL | Hubo una etapa con MySQL antes de migrar a SQLite |
| `backend/polls/` | Tutorial Django | El equipo aprendió Django con el tutorial estándar |
| `App.jsx` con `cafeteriasFake` | Mock data | Etapa de prototipado sin BD conectada |
| `CafeDetails.jsx` (0 bytes) | Placeholder vacío | Intento de página de detalle que fue reemplazado |
| `CafeCardGlass.jsx` | Glassmorphism | Variante de diseño descartada |
| `rag_engine.py` referenciado en README | Versión anterior del motor | El motor evolucionó: `rag_engine.py` → `rag_engine_hpc.py` |
| Mención de "Turing" en README del RAG | Servidor anterior | El README menciona `turing.mat.uson.mx` antes de YUCA/ACARUS |
| `llm_rag/README.md` menciona "Llama-cpp" en commit | Intento con llama.cpp | Commit `60fccae` menciona "Llama-cpp integration" antes de cambiar a Qwen vía Transformers |

---

## 10. PUNTOS DE MAYOR INTERÉS TÉCNICO PARA LA PONENCIA

Ordenados por potencial narrativo:

1. **La migración de MySQL a SQLite** — decisión arquitectónica concreta con evidencia en el repo
2. **La aparición del módulo `llm_rag/` como carpeta separada** — evidencia de que la IA fue un módulo añadido, no diseñado originalmente
3. **La evolución `rag_engine.py` → `rag_engine_hpc.py`** — el motor tuvo que adaptarse a la infraestructura HPC
4. **La mención de "Turing" → "Yuca/ACARUS"** — el proyecto pasó por al menos un servidor antes de llegar al clúster actual
5. **El pipeline manual BD → RAG** — deuda técnica que nació de la necesidad de mantener el RAG actualizado
6. **La desincronización entre seguridad del frontend y el backend** — la seguridad se implementó en partes, no de forma holística
7. **El `App.jsx` con `cafeteriasFake`** — evidencia de prototipado antes de la BD real
8. **Los 482 platillos en el JSON vectorizado** — el conocimiento del dominio tuvo que ser estructurado manualmente para que el LLM lo pudiera consumir

---

## CLASIFICACIÓN FINAL DE EVIDENCIA

### ✅ [REPO] — Confirmado directamente en el repositorio
- Estructura de carpetas y archivos
- Stack tecnológico y versiones
- Esquema de BD y cantidad de registros
- Pipeline RAG completo
- Vulnerabilidades de seguridad
- Archivos huérfanos
- Historial Git con fechas

### 📖 [DOCUMENTACIÓN] — En README / PROJECT_CONTEXT / AUDITORIA_TECNICA
- Descripción de la infraestructura YUCA/ACARUS
- Flujos de ejecución
- Configuración de parámetros de inferencia

### 💬 [HISTORIA DEL EQUIPO] — Según skill y contexto del proyecto
- La idea nació de la experiencia real de no conocer las tienditas
- La frase "hay que meterle IA" fue una idea informal antes de convertirse en caso de uso
- La investigación de APIs comerciales antes de modelos abiertos

### 🔍 [INFERENCIA] — Razonable pero no documentada explícitamente
- El `App.jsx` con mocks sugiere prototipado previo a la BD
- La progresión IS1 → IS2 explicaría el salto arquitectónico
- La mención de "Turing" implica al menos un servidor intermedio antes de YUCA

### ❓ [CONFIRMAR CON EQUIPO]
- ¿Cuándo exactamente surgió la idea de IA y de quién?
- ¿Qué APIs comerciales investigaron y por qué las descartaron?
- ¿Cuándo y por qué migraron de MySQL a SQLite?
- ¿Qué modelos Qwen de menor tamaño probaron antes del 14B?
- ¿Qué ocurrió con "Turing" — era un servidor personal o institucional?
- ¿Por qué eligieron `paraphrase-multilingual-MiniLM-L12-v2` sobre otras alternativas de embeddings?
- ¿Cuándo y cómo accedieron a ACARUS/YUCA?
