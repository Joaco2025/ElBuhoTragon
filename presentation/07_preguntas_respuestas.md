# 07 — Preguntas y Respuestas Preparadas
## El Búho Tragón — XXXV Semana Nacional de Investigación y Docencia en Matemáticas 2026
## Bloque de 5 minutos de preguntas

**Instrucciones:** Responder en 20-60 segundos por pregunta. Si no se sabe con certeza, decirlo honestamente. Las respuestas marcadas con [CONFIRMAR] deben ser discutidas con el equipo antes de la ponencia.

---

## CATEGORÍA A — ARQUITECTURA

### A1. ¿Por qué separaron el frontend del backend?
**Respuesta:** "La separación nos permite desarrollar cada capa de forma independiente. El frontend puede ser cualquier cliente — web, móvil en el futuro — y el backend solo se preocupa por servir datos correctamente. En términos prácticos: dos personas pueden trabajar en paralelo sin pisarse. Es el modelo estándar para aplicaciones web modernas con equipos pequeños."
**Evidencia:** [REPO] Arquitectura SPA + API REST
**Duración:** ~30 segundos

---

### A2. ¿Por qué Django y no otro framework de Python?
**Respuesta:** "Django viene con muchas cosas incluidas: ORM, panel de administración, sistema de migraciones, autenticación. Para un proyecto universitario con tiempo limitado, ese ecosistema reduce el tiempo de implementación. Django REST Framework sobre Django es la combinación estándar para APIs en Python. También puede haber un factor de conocimiento previo del equipo — es el framework más enseñado en cursos de Python web."
**Evidencia:** [REPO] `backend/polls/` — vestigio del tutorial de Django, sugiere que el equipo lo aprendió con el tutorial estándar
**[CONFIRMAR]** ¿Fue una elección del equipo o fue indicada por el curso?
**Duración:** ~35 segundos

---

### A3. ¿Por qué usaron SQLite y no una BD más robusta?
**Respuesta:** "El proyecto comenzó con MySQL — hay evidencia de eso en los archivos SQL del repositorio, que referencian una base llamada `ComidaCampus`. En diciembre de 2025 migraron a SQLite. SQLite tiene la ventaja de que el archivo de base de datos puede estar en el repositorio y no requiere un servidor separado — simplifica mucho el despliegue y el desarrollo local. Para la escala actual del proyecto — 482 platillos, 14 cafeterías — SQLite es completamente suficiente."
**Evidencia:** [REPO] Commits "Preparando para migrar a sqlite", "DB en sqlite funcional" (nov-dic 2025); carpeta `sql/` con dumps de MySQL
**[CONFIRMAR]** ¿Por qué específicamente se decidió migrar de MySQL a SQLite?
**Duración:** ~40 segundos

---

### A4. ¿Cómo evolucionó la arquitectura a lo largo del proyecto?
**Respuesta:** "La arquitectura fue creciendo por capas conforme aparecían necesidades. La primera versión solo tenía backend + BD + interfaz básica. Después se añadió Leaflet para mapas, JWT para autenticación, el panel administrativo para CRUD. Y en la última etapa se añadió el módulo de IA como una capa separada — `llm_rag/` — que se conecta al backend vía un Singleton. No fue un diseño top-down; fue bottom-up, guiado por problemas concretos."
**Evidencia:** [REPO] Historia Git, vestigios de código muerto (`App.jsx`, `CafeDetails.jsx`), estructura de carpetas
**Duración:** ~40 segundos

---

## CATEGORÍA B — INGENIERÍA DE SOFTWARE

### B1. ¿Qué metodología usaron?
**Respuesta:** "Los commits del repositorio mencionan SCRUM — hay referencias a 'SCRUM-1', 'SCRUM-6', 'SCRUM-8' desde la etapa de IS1. También hay referencias a IDS21, que parece ser el identificador de la materia. Usamos gestión de backlog con sprints, aunque la intensidad de la metodología probablemente varió a lo largo del proyecto."
**Evidencia:** [REPO] Commits "SCRUM-6 API Rest Agregada", "SCRUM-8 Base de Datos Conectada", "IDS21-2 Informacion Actualizada"
**[CONFIRMAR]** ¿Qué herramienta usaron para el backlog (Jira, Trello, Notion)?
**Duración:** ~30 segundos

---

### B2. ¿Tienen pruebas automatizadas?
**Respuesta:** "No. Ese es un punto de deuda técnica que reconocemos. El archivo `tests.py` en Django solo tiene el comentario inicial — nunca se implementaron pruebas. En el frontend no hay configuración de Vitest ni Jest. Lo que sí tenemos es una auditoría de ejecución manual donde se verificaron todos los endpoints. Para un proyecto futuro, lo primero que agregaríamos serían pruebas de permisos y del cálculo de horarios."
**Evidencia:** [REPO] `backend/apps/cafeteria/tests.py` con solo el comentario de Django; sin `vitest.config.js` en frontend
**Duración:** ~35 segundos

---

### B3. ¿Qué deuda técnica identificaron?
**Respuesta:** "La más importante es de seguridad: los ViewSets de Django no tienen restricciones de permisos, entonces actualmente cualquiera puede modificar o borrar cafeterías sin autenticarse. También hay 19 URLs hardcodeadas en el frontend — `http://127.0.0.1:8000` — que impiden el despliegue directo. Y el pipeline de actualización del RAG es manual: si cambias la BD, tienes que correr tres scripts para que el chatbot vea esos cambios. Todo eso está documentado."
**Evidencia:** [REPO] `PROJECT_CONTEXT.md`, `AUDITORIA_TECNICA.md`, código de `views.py` sin `permission_classes`
**Duración:** ~40 segundos

---

### B4. ¿Qué harían diferente si comenzaran hoy?
**Respuesta:** "Tres cosas principalmente. Primero: la seguridad desde el principio, no como capa posterior. Segundo: variables de entorno para las URLs del frontend desde el día uno. Y tercero: automatizar la actualización del índice RAG cuando cambia la BD — un gancho de Django que dispare la re-exportación automáticamente. Son tres cambios que habrían ahorrado trabajo posterior."
**[CONFIRMAR]** Discutir con el equipo para asegurarse que estas son las respuestas genuinas.
**Duración:** ~35 segundos

---

## CATEGORÍA C — IA / LLM

### C1. ¿Por qué un LLM y no mejorar la búsqueda tradicional?
**Respuesta:** "La búsqueda tradicional requiere que el usuario use los términos correctos. Si buscas 'hamburguesa' en un catálogo que lo llama 'hamburguesa americana', podrías no encontrarlo. Pero además, hay preguntas que combinan múltiples criterios — precio, distancia, disponibilidad — que un filtro combinado puede manejar pero de forma torpe. El lenguaje natural resuelve eso de una forma más natural para el usuario. La búsqueda tradicional sigue existiendo en el catálogo — el LLM es para las preguntas más complejas."
**Evidencia:** [REPO] `Home.jsx` con filtros tradicionales; `ChatWidget.jsx` como capa adicional
**Duración:** ~40 segundos

---

### C2. ¿Por qué no usar una API comercial como OpenAI o Anthropic?
**Respuesta:** "Es una pregunta válida. Las APIs comerciales tienen la ventaja de la simplicidad: una llamada HTTP y tienes el modelo disponible. El costo recurrente por consulta es el factor principal en este caso — para un proyecto universitario en desarrollo activo, acumularse puede ser significativo. También está el tema de control: con un modelo local en HPC, los datos de las consultas de los usuarios no salen de la infraestructura universitaria. Y tuvimos acceso a ACARUS, que hizo factible la alternativa."
**[CONFIRMAR]** ¿Evaluaron alguna API comercial específicamente? ¿Cuáles y por qué las descartaron?
**Evidencia:** [REPO + DOCS] README menciona YUCA/ACARUS como infraestructura
**Duración:** ~40 segundos

---

### C3. ¿Qué tan buenas son las respuestas del chatbot? ¿Alucina?
**Respuesta:** "El sistema tiene varias capas de control para reducir alucinaciones. La temperatura de 0.1 — muy baja — significa que el modelo casi no improvisa; prefiere respuestas muy cercanas a lo que los datos dicen. El system prompt tiene instrucciones explícitas de no inventar información. Y si la información no está en el contexto recuperado, el modelo está instruido a decir que no tiene esa información. RAG en sí ya reduce mucho las alucinaciones porque el modelo responde basándose en fragmentos de datos reales, no en conocimiento generalizado."
**Evidencia:** [REPO] `rag_engine_hpc.py`: `temperature=0.1`, `repetition_penalty=1.05`, prompt anti-alucinación
**Duración:** ~45 segundos

---

## CATEGORÍA D — RAG

### D1. ¿Por qué RAG y no fine-tuning del modelo?
**Respuesta:** "Fine-tuning entrena el modelo en los datos del dominio para que 'memorice' la información. El problema es que esa información cambia: los precios cambian, los menús cambian, abren tienditas nuevas. Con RAG, actualizar la información es más sencillo: cambias el JSON de datos y reconstruyes el índice FAISS. Con fine-tuning tendrías que re-entrenar el modelo cada vez. Para datos dinámicos, RAG es más mantenible."
**Evidencia:** [REPO] `export_for_rag.py` + `fix_encoding.py` + `warmup_rag.py` — pipeline de actualización
**Duración:** ~35 segundos

---

### D2. ¿Por qué no meter todos los datos en el prompt?
**Respuesta:** "Tres razones. Primero, el costo computacional: un prompt enorme en cada consulta tarda más en procesarse y usa más VRAM. Segundo, la calidad de atención: los modelos de lenguaje tienen ventanas de contexto limitadas y cuando el contexto es muy largo, la atención del modelo se dispersa — puede ignorar partes importantes. Tercero, escalabilidad: si el catálogo crece, un prompt estático deja de ser práctico. RAG escala mejor porque siempre recupera solo lo relevante."
**Evidencia:** [REPO] `rag_data_fixed.json` con 482 registros — corpus manejable pero que crecería en producción
**Duración:** ~40 segundos

---

### D3. ¿Para qué el CrossEncoder si ya tienen FAISS?
**Respuesta:** "FAISS usa un bi-encoder: convierte la pregunta en un vector y los documentos en vectores, y busca por cercanía vectorial. Es muy rápido pero aproximado — busca similitud de forma independiente para pregunta y documento. El CrossEncoder evalúa la pregunta y cada documento juntos, lo que da una estimación de relevancia más precisa pero más lenta. La solución estándar en sistemas de búsqueda modernos es hacer los dos: FAISS rápido para reducir de miles a 50 candidatos, CrossEncoder preciso para reducir de 50 a 10."
**Evidencia:** [REPO] `rag_engine_hpc.py` con ambas etapas claramente separadas
**Duración:** ~45 segundos

---

### D4. ¿Cómo construyeron los chunks del índice FAISS?
**Respuesta:** "Agrupamos los menús por cafetería y por categoría de platillo. Entonces un chunk es: el nombre de la cafetería, su ubicación, su horario, y todos los platillos de una categoría — por ejemplo, 'MENÚ (ANTOJITOS): Sope de frijoles $25 MXN, Taco de canasta $20 MXN...'. Esa estructura permite que una consulta sobre antojitos recupere el chunk de antojitos de las cafeterías relevantes, sin traer chunks de otros menús que no son pertinentes."
**Evidencia:** [REPO] `rag_engine_hpc.py:build_index()` — estructura exacta de chunks documentada en `AUDITORIA_TECNICA.md`
**Duración:** ~35 segundos

---

## CATEGORÍA E — INFRAESTRUCTURA

### E1. ¿Por qué YUCA y no un servicio de cloud como AWS o Google Cloud?
**Respuesta:** "El factor principal es el costo. Los servicios cloud de GPU son caros para proyectos universitarios — ejecutar un modelo de 14B de forma continua en AWS puede acumularse rápidamente. ACARUS es infraestructura institucional de la UNISON — el acceso es gratuito para investigación y proyectos académicos. Eso fue lo que hizo factible usar Qwen2.5-14B en lugar de un modelo más pequeño o una API de terceros."
**[CONFIRMAR]** ¿Cómo obtuvieron acceso a ACARUS/YUCA? ¿A través de un profesor o por solicitud directa?
**Evidencia:** [REPO] README describe ACARUS/YUCA; `requirements_hpc.txt` es el archivo de dependencias para el clúster
**Duración:** ~35 segundos

---

### E2. ¿Qué pasa si YUCA no está disponible?
**Respuesta:** "Hay un fallback defensivo en Django: si las dependencias del RAG — FAISS, PyTorch — no están instaladas en el entorno local, el endpoint `/api/chatbot/` responde con HTTP 503 Service Unavailable. El resto de la aplicación sigue funcionando con normalidad — catálogo, mapas, reseñas, autenticación. Eso fue una decisión de diseño explícita para que el desarrollo local no requiera la infraestructura HPC."
**Evidencia:** [REPO] `views.py:chatbot_query()` con bloque try/except ImportError; verificado empíricamente (HTTP 503 en entorno local)
**Duración:** ~35 segundos

---

### E3. ¿Cuánto tarda en responder el chatbot?
**Respuesta:** "La primera consulta después de arrancar el servidor tarda más — carga el modelo en VRAM, que son varios gigabytes. Las consultas subsecuentes son mucho más rápidas. El README del módulo RAG dice que las consultas después de la carga inicial tardan aproximadamente 1 a 3 segundos. No tenemos métricas formales de latencia medidas bajo carga — es una limitación de las pruebas que hicimos."
**Evidencia:** [DOCS] README del módulo RAG con tabla de performance
**Duración:** ~30 segundos

---

## CATEGORÍA F — SEGURIDAD

### F1. ¿Por qué los endpoints no tienen autenticación?
**Respuesta:** "Es deuda técnica documentada. Los ViewSets de Django heredan permisos por defecto, y en DRF si no se especifica `permission_classes`, el permiso implícito es `AllowAny`. La autenticación se implementó para el sistema de login, pero no se propagó a los permisos de escritura de los ViewSets. En producción eso se corregiría con `IsAuthenticated` o `IsAdminUser` en cada ViewSet. No es una decisión intencional — fue una omisión que quedó documentada."
**Evidencia:** [REPO] `views.py` sin `permission_classes` en ViewSets; `PROJECT_CONTEXT.md` listando vulnerabilidades
**Duración:** ~35 segundos

---

### F2. ¿Hay riesgo de prompt injection?
**Respuesta:** "Sí, está identificado como riesgo medio. La pregunta del usuario se concatena directamente en el bloque del prompt al modelo. Si alguien enviara una instrucción maliciosa diseñada para hacer que el modelo ignore sus instrucciones originales — lo que se llama jailbreak — no hay un filtrado previo que lo bloquee. El system prompt tiene instrucciones estrictas de formato y comportamiento, lo que mitiga parcialmente el riesgo, pero no es una defensa completa. Para una versión de producción sería necesario un filtrado previo de la entrada."
**Evidencia:** [REPO] `AUDITORIA_TECNICA.md` sección de seguridad, `rag_engine_hpc.py` construcción del prompt
**Duración:** ~40 segundos

---

## CATEGORÍA G — DECISIONES TECNOLÓGICAS

### G1. ¿Qué decisión tecnológica consideran más discutible?
**Respuesta:** "Probablemente la de no centralizar las URLs del frontend desde el principio. Las 19 referencias hardcodeadas a `http://127.0.0.1:8000` en el código fuente son el tipo de cosa que en un proyecto más maduro se configura con una variable de entorno desde el día uno. Fue una decisión de 'lo arreglamos después' que después no se arregló a tiempo. En Vite es simple — `import.meta.env.VITE_API_URL` — pero por comodidad inmediata se fue acumulando."
**Evidencia:** [REPO] 19 ocurrencias verificadas de la URL hardcodeada
**[CONFIRMAR]** ¿Hay otra decisión que el equipo considera más discutible?
**Duración:** ~35 segundos

---

### G2. ¿Por qué eligieron Qwen y no Llama, Mistral u otro modelo?
**Respuesta:** "El commit `60fccae` en el repositorio menciona 'Llama-cpp integration', lo que sugiere que hubo al menos un intento con llama.cpp antes de la versión actual. Qwen2.5 tiene excelente soporte para español y fue diseñado para seguir instrucciones con precisión — eso es importante para un sistema donde queremos respuestas específicas basadas en datos reales, no respuestas creativas. También hay compatibilidad específica con ROCm para las GPUs AMD de YUCA."
**[CONFIRMAR]** ¿Probaron específicamente otros modelos antes de Qwen? ¿Cuáles? ¿Qué problema encontraron?
**Evidencia:** [REPO] Commit `60fccae` con mención de llama.cpp; `rag_engine_hpc.py:model_id`
**Duración:** ~35 segundos

---

## CATEGORÍA H — TRABAJO FUTURO

### H1. ¿Qué sigue para el proyecto?
**Respuesta:** "Hay tres líneas claras. Primero: seguridad — proteger los endpoints de escritura con permisos de administrador. Segundo: automatización del pipeline RAG — que cuando un administrador cambie datos en la BD, el índice FAISS se actualice automáticamente sin intervención manual. Y tercero: el 'Pasaporte Tragón' — una funcionalidad de gamificación que ya existe en el frontend y asigna rangos según cuántas cafeterías has reseñado — podría expandirse con más mecánicas."
**Evidencia:** [REPO] `Cafeterias.jsx` con el Pasaporte Tragón; deuda técnica documentada
**Duración:** ~35 segundos

---

### H2. ¿Considerarían hacer una app móvil?
**Respuesta:** "El backend ya está diseñado para ser agnóstico del cliente — es una API REST que puede ser consumida por cualquier cliente, incluyendo una app móvil. React Native comparte mucho ecosistema con React web, así que no sería un salto enorme. El uso de geolocalización — que ya funciona en el navegador con `navigator.geolocation` — es especialmente valioso en móvil. No está en los planes inmediatos, pero la arquitectura lo permitiría."
**Evidencia:** [REPO] `ChatWidget.jsx` con geolocalización; API REST sin estado servidor
**Duración:** ~30 segundos

---

## PREGUNTAS DIFÍCILES — RESPUESTAS ESPECIALES

### "¿Esto es investigación o es un proyecto de curso?"
**Respuesta:** "Es ambas. Nació como proyecto universitario para las materias de Ingeniería de Software I y II. Lo que lo convierte en un reporte de investigación es el análisis sistemático que presentamos: documentamos la evolución arquitectónica, identificamos las decisiones tecnológicas y sus motivaciones, analizamos la deuda técnica, y extraemos aprendizajes transferibles. El objeto de estudio es el proceso de desarrollo de software guiado por problemas."
**Duración:** ~40 segundos

---

### "¿En producción real funciona?"
**Respuesta:** "El sistema web — catálogo, mapas, reseñas, autenticación — funciona en desarrollo local y ha sido verificado. El módulo RAG funciona cuando se ejecuta en el clúster YUCA con la GPU adecuada. Lo que falta para un despliegue de producción real son principalmente las correcciones de seguridad que mencionamos. La URL del proyecto en producción institucional es proyectoscc.unison.mx — mencionada en la configuración de CORS."
**Evidencia:** [REPO] `settings.py:CORS_ALLOWED_ORIGINS` con `proyectoscc.unison.mx`
**Duración:** ~35 segundos

---

### "¿Por qué 14 cafeterías? ¿Hay más en el campus?"
**Respuesta:** "Las 14 cafeterías registradas son las que el equipo logró documentar durante el proyecto. El campus UNISON tiene más locales de comida — hay tienditas en varias facultades que no están en el sistema todavía. Eso también es parte de la naturaleza de un proyecto universitario: los datos requieren trabajo de campo. La estructura del sistema permite añadir más cafeterías — el equipo de administradores puede hacerlo desde el panel."
**[CONFIRMAR]** ¿Cuántas cafeterías aproximadamente hay en total en el campus?
**Duración:** ~30 segundos

---

## POSTURA ANTE PREGUNTAS SIN RESPUESTA

Si alguien hace una pregunta que no saben responder:

**Opción A (preferida):** "Esa es una pregunta que necesitaríamos verificar con más detalle. Lo que puedo decirte es... [lo que sí saben]."

**Opción B:** "Honestamente, eso está fuera del alcance de lo que pudimos documentar en el tiempo del proyecto."

**Lo que nunca hacer:** Inventar una respuesta que suena plausible pero no está respaldada por evidencia real.
