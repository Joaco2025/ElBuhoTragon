# 06 — Guion Completo de la Ponencia
## "Evolución tecnológica de un proyecto de software: del problema a la solución"
## El Búho Tragón — XXXV Semana Nacional de Investigación y Docencia en Matemáticas 2026

**Instrucciones de lectura:**
- `[J]` = Joaquin habla
- `[O]` = Owen habla
- `[AMBOS]` = turnos alternados rápidos
- `*(clic)*` = avanzar diapositiva
- `*(pausa)*` = silencio intencional
- Las marcas de tiempo son aproximadas — ajustar al ritmo natural

---

## ANTES DE COMENZAR (Preparación técnica)

Verificar antes de entrar al salón:
- [ ] Presentación abierta en la computadora del evento
- [ ] Diapositiva 1 (Portada) en pantalla
- [ ] Si hay demo disponible: prueba de conectividad con el backend HPC
- [ ] Micrófono funcionando
- [ ] Agua en el podio

---

## SECCIÓN 1 — APERTURA [00:00 – 00:30]

*(Ambos frente al auditorio. La diapositiva 1 ya está proyectada. 3-4 segundos de silencio para que la audiencia lea el título.)*

**[J]:** "Buenas tardes. Soy Joaquin Castro."

**[O]:** "Y yo soy Owen Solis."

**[J]:** "Somos estudiantes de la Licenciatura en Ciencias de la Computación de la Universidad de Sonora. Y les vamos a contar la historia de un proyecto que comenzó con una pregunta muy sencilla."

*(clic)*

---

## SECCIÓN 2 — EL PROBLEMA [00:30 – 02:00]

*(Diapositiva 2: ¿Dónde venden hamburguesas?)*

**[J]:** "Entrar a la universidad y no conocer el campus."

*(pausa breve)*

"Todos los que estamos aquí lo vivimos alguna vez. Los primeros días no sabes dónde está nada. Y cuando tienes hambre entre clases... empiezas a preguntar."

"'¿Dónde venden algo barato?' 'Hay una tiendita por el edificio de exactas, creo.' 'En la de mates tienen sopes.' Esa información existe. Solo está dispersa."

*(pausa)*

"El Búho Tragón nació de ahí. De la idea de reunir esa información en un solo lugar. Las cafeterías del campus — en la UNISON les decimos 'tienditas' — sus menús, sus precios, sus horarios."

"Al principio era eso: un catálogo. Nada más."

*(clic)*

---

## SECCIÓN 3 — LA PRIMERA VERSIÓN [02:00 – 03:30]

*(Diapositiva 3: Primera solución)*

**[J]:** "La primera versión era exactamente lo que necesitábamos en ese momento: un catálogo."

"Una base de datos con información de las cafeterías. Una API para consultarlos. Una interfaz para verlos. Eso era Ingeniería de Software I."

"La idea no era construir algo complejo desde el principio. Era resolver el problema que teníamos. Con lo que sabíamos en ese momento."

*(pausa, con una pequeña sonrisa)*

"Y aquí está algo que vale la pena decir: el primer commit del repositorio tiene un typo en el nombre. 'Crear Estructura del Peoyecto', con la 'o' y la 'y' invertidas. Eso no fue planeado, pero es auténtico — evidencia de que fue un proyecto real, hecho por estudiantes reales, probablemente un martes por la noche."

*(pausa)*

"Pero cuando retomamos el proyecto en Ingeniería de Software II... el problema ya no era el mismo."

*(clic)*

---

## SECCIÓN 4 — EL PROYECTO EMPIEZA A CRECER [03:30 – 05:30]

*(Diapositiva 4: El proyecto crece — las preguntas)*

*(Owen toma la palabra)*

**[O]:** "En Ingeniería de Software II el objetivo cambió. Ya no era solo mantener un catálogo — era construir una plataforma más completa."

"Y conforme empezamos a trabajar, fueron apareciendo preguntas que el sistema aún no podía responder."

*(si hay animación, las preguntas aparecen una por una; si no, Owen las señala al hablar)*

"'¿Dónde exactamente está esa tiendita?' Una dirección de texto no es suficiente para alguien que no conoce el campus. Necesitas ver el mapa."

*(pausa corta)*

"'¿Está abierta ahorita?' No solo quiero saber qué venden — quiero saber si puedo ir en este momento o no."

*(pausa corta)*

"'¿Qué opina la gente?' Si ya tengo el sistema, ¿por qué no permitir que los usuarios compartan su experiencia?"

*(pausa corta)*

"'¿Quién puede modificar la información?' Si alguien actualiza los precios o el menú, necesitamos saber quién tiene esa autorización."

*(pausa)*

"Cada una de esas preguntas introdujo una decisión tecnológica. No porque quisiéramos usar esas tecnologías. Sino porque el problema las necesitaba."

*(clic)*

---

## SECCIÓN 5 — CADA NECESIDAD, UNA DECISIÓN [05:30 – 07:30]

*(Diapositiva 5: Tabla Necesidad → Decisión)*

**[O]:** "Veamos cómo se tradujo eso en decisiones concretas."

"Para la ubicación: usamos Leaflet con OpenStreetMap. Una librería de mapas de código abierto, sin costo de API. Almacenamos las coordenadas de cada cafetería en la base de datos. Así el mapa sabe exactamente dónde poner cada marcador."

"Para los horarios: añadimos campos de hora de apertura y cierre. El frontend calcula en tiempo real — usando el reloj del navegador — si una cafetería está abierta ahorita."

"Para la autenticación: JWT. JSON Web Tokens. Es la forma estándar de hacer autenticación en aplicaciones con frontend y backend separados. Stateless: el servidor no necesita guardar sesiones."

"Noten el patrón aquí. En ningún caso elegimos primero la tecnología. Primero apareció el problema. Después pensamos qué solución necesitaba."

*(pausa)*

"Y si hay una idea que queremos que se lleven de esta charla, es exactamente esa."

*(clic)*

---

## SECCIÓN 6 — LA ARQUITECTURA RESULTANTE [07:30 – 09:00]

*(Diapositiva 6: Arquitectura en 3 capas)*

**[O]:** "Esta es la arquitectura que resulta de todas esas decisiones. Tres capas desacopladas."

"El frontend: una SPA hecha con React. Maneja la interfaz, los mapas, el chat, las reseñas y el panel de administración."

"El backend: Django con Django REST Framework. Sirve la API, maneja la autenticación, y accede a la base de datos SQLite donde viven las 14 cafeterías y los 482 platillos que tenemos registrados."

"Y hay una tercera capa que es la más interesante de esta charla: el motor de IA. Ahí es donde vive el chatbot. Ahí es donde ocurre RAG. Ahí es donde corre el modelo de lenguaje."

*(pausa)*

"Pero antes de llegar al motor de IA... hay que hablar de cómo llegamos a necesitarlo."

*(clic)*

---

## SECCIÓN 7 — "HAY QUE METERLE IA" [09:00 – 10:00]

*(Diapositiva 7: "Hay que meterle IA.")*

*(Joaquin toma la palabra — regresa al frente)*

**[J]:** "Y llegamos al momento en que alguien dentro del equipo dijo esto."

*(señala la diapositiva)*

"'Hay que meterle IA.'"

*(pausa larga — 2-3 segundos)*

"Honestamente, no fue un plan sofisticado. Fue una idea que surgió en el equipo. Pero lo interesante es la pregunta que vino después."

"¿Para qué? ¿Qué problema concreto dentro de este sistema podría resolverse con inteligencia artificial?"

*(pausa)*

"Y la respuesta que encontramos fue esta..."

*(clic inmediato)*

---

## SECCIÓN 8 — ¿PARA QUÉ IA? [10:00 – 11:30]

*(Diapositiva 8: El chatbot, ejemplo de consulta)*

**[J]:** "Los usuarios pueden buscar en el catálogo. Pueden filtrar por facultad, por categoría, por precio. Pero no pueden hacer una pregunta como esta:"

*(señala la diapositiva con la pregunta de ejemplo)*

"'¿Dónde venden torta cubana más barata?'"

"Esta pregunta tiene varias partes: un producto, una comparación de precios, y posiblemente una restricción de distancia. Un filtro de texto tradicional no sabe cómo interpretar todo eso junto."

"Pero un modelo de lenguaje sí puede. Y el usuario no tiene que aprender la sintaxis del sistema — habla como hablaría con cualquier persona."

*(pausa)*

"Ese fue el caso de uso que justificó incorporar un modelo de lenguaje: permitir que los usuarios consultaran información de las cafeterías mediante lenguaje natural."

"Una vez que teníamos el caso de uso claro... empezaron las preguntas técnicas."

*(clic)*

---

## SECCIÓN 9 — DEL LENGUAJE NATURAL AL RAG [11:30 – 13:30]

*(Diapositiva 9: RAG explicado)*

**[J]:** "La primera pregunta técnica: ¿cómo le das al modelo acceso a tus datos?"

"La respuesta más obvia: meto todo al prompt. Le doy al modelo la información completa de todas las cafeterías, todos los menús, todos los precios."

"Tenemos 482 platillos en 14 cafeterías. No es una cantidad enorme, pero es más de lo que conviene poner en el contexto de cada consulta. Y conforme la plataforma crezca... ese número crece también."

*(pausa)*

"La solución se llama RAG: Retrieval-Augmented Generation. Generación aumentada por recuperación. La idea: antes de pedirle al modelo que responda, primero buscamos en nuestra base de datos cuáles son los documentos más relevantes para esa pregunta. Después le damos solo esos documentos al modelo como contexto."

"Es la diferencia entre preguntarle algo a alguien que habla muy bien, y preguntarle lo mismo después de haberle dado el documento específico que necesita consultar. Con RAG, el modelo tiene la información correcta frente a él antes de responder."

*(clic)*

---

## SECCIÓN 10 — EL PIPELINE RAG [13:30 – 16:00]

*(Diapositiva 10: Los 8 pasos del pipeline)*

*(Owen toma la palabra)*

**[O]:** "Esto es lo que ocurre dentro del sistema cuando un usuario hace una pregunta. Ocho pasos."

*(Owen señala cada paso al hablar)*

"Uno: si hay historial de conversación, el modelo reformula la pregunta. Así, si antes preguntaste '¿qué venden en exactas?' y ahora preguntas '¿y en mates?', el sistema sabe que estás preguntando por la cafetería del edificio de Matemáticas."

"Dos: si mencionaste un lugar del campus — 'cerca de exactas', 'en mates', 'por derecho' — el sistema hace matching sobre un diccionario de más de 35 apodos estudiantiles de la UNISON. Ese diccionario lo construimos nosotros manualmente."

"Tres: la pregunta se convierte en un vector de 384 dimensiones usando un modelo de embeddings multilingüe. Un vector que captura el significado semántico de la consulta."

"Cuatro: ese vector se compara con todos los documentos vectorizados en FAISS — el índice vectorial. Nos quedamos con los 50 más similares semánticamente."

"Cinco: si hay ubicación GPS, filtramos para quedarnos solo con cafeterías que estén a menos de 2.5 kilómetros."

"Seis: un segundo modelo — un CrossEncoder — re-evalúa esos documentos con más precisión y nos da el top 10."

"Siete: esos 10 fragmentos de información van al modelo Qwen como contexto. Con temperatura 0.1 para respuestas precisas, no creativas."

"Ocho: la respuesta."

*(pausa)*

"Pero todo esto necesita ejecutarse en algún lugar. Y ahí apareció otro problema."

*(clic)*

---

## SECCIÓN 11 — ¿DÓNDE EJECUTAMOS? / MOMENTO MEMORABLE [16:00 – 18:00]

*(Diapositiva 11: El salto de complejidad)*

*(Joaquin toma la palabra)*

**[J]:** "Qwen2.5-14B-Instruct. El modelo que usamos para generar las respuestas. Catorce mil millones de parámetros."

"En precisión FP16 necesita aproximadamente 28 gigabytes de VRAM. Para poner eso en contexto: una laptop de gama alta tiene 8 gigabytes de VRAM. Una laptop gaming tope de gama tiene 16."

*(pausa)*

"No podíamos ejecutar este modelo en nuestras laptops."

"Y una API comercial — OpenAI, Anthropic, Google — tiene costos por consulta que en un proyecto universitario no son triviales."

*(pausa)*

"Pero resulta que la Universidad de Sonora tiene el ACARUS — el Área de Cómputo de Alto Rendimiento. Y dentro del ACARUS está el clúster Yuca. Con GPUs AMD Instinct MI210. Con ROCm. Con suficiente VRAM para ejecutar el modelo."

"Un integrante del equipo comenzó a trabajar con esos recursos. Y ahí fue posible."

*(pausa más larga — 2-3 segundos)*

*(señalar la pantalla, el contraste entre el primer commit y el HPC)*

"Empezamos con esto."

*(señalar el typo del primer commit)*

"'Crear Estructura del Peoyecto'. Marzo de 2025."

*(pausa)*

"Terminamos necesitando esto."

*(señalar el HPC, el modelo de 14B)*

"Qwen2.5-14B-Instruct. AMD Instinct MI210. Clúster Yuca."

*(pausa)*

"¿Cómo llegamos de aquí a allá?"

*(pausa)*

"Porque el problema fue creciendo."

*(clic)*

---

## SECCIÓN 12 — LA COMPLEJIDAD TAMBIÉN CRECE [18:00 – 20:00]

*(Diapositiva 12: Problemas nuevos)*

**[O]:** "Cuando incorporamos el RAG, no resolvimos solo el problema del lenguaje natural. Creamos problemas nuevos."

"El más interesante: el motor RAG es un Singleton — una única instancia compartida entre todos los usuarios. En agosto de este año descubrimos que esa instancia estaba guardando el historial de conversación de un usuario y mezclándolo con la siguiente consulta de otro usuario. Un bug clásico de estado compartido. Lo encontramos, lo corregimos — está en el historial Git del proyecto."

*(pausa corta)*

"Otro problema: el chatbot no lee la base de datos en tiempo real. Lee un archivo JSON que generamos manualmente. Si alguien agrega una cafetería nueva desde el panel de administración... el chatbot no lo sabe hasta que corremos tres scripts. Eso es deuda técnica. Lo sabemos y está documentado."

*(pausa corta)*

"Y la seguridad: la implementamos progresivamente. Hay endpoints de escritura que actualmente no requieren autenticación. No es intencional — es el resultado de construir funcionalidad primero y reforzar permisos después."

*(pausa)*

"La moraleja: cada decisión tecnológica que tomas hoy crea restricciones y problemas que descubres mañana. Y eso no es un fracaso — es ingeniería de software."

*(clic)*

---

## SECCIÓN 13 — LO QUE APRENDIMOS [20:00 – 22:00]

*(Diapositiva 13: Las tres lecciones)*

**[J]:** "Tres cosas que nos llevamos del proceso."

"La primera: el problema guía la tecnología, no al revés. Cuando llegamos a mapas, a reseñas, a RAG — no fue porque queríamos usar esas tecnologías. Fue porque el problema las necesitaba. Eso parece obvio, pero en la práctica es fácil caer en la trampa de elegir primero la tecnología y después buscarle un problema."

**[O]:** "La segunda: aprendimos durante el desarrollo. No sabíamos RAG cuando empezamos. No sabíamos embeddings, ni FAISS, ni cómo integrar un LLM con Django. Lo investigamos, lo implementamos, nos equivocamos, lo corregimos. El repositorio tiene más de 20 commits en un solo día de 'Fixes al Buhito' — eso es aprender en tiempo real."

**[J]:** "Y la tercera: cada solución crea su propio problema nuevo. Agregar el chatbot creó el bug del Singleton. Agregar autenticación dejó endpoints sin proteger. Agregar FAISS creó el problema de desincronización con la BD. La ingeniería de software es eso: resolver problemas que aparecen al resolver otros problemas. Y eso no para."

*(clic)*

---

## SECCIÓN 14 — CIERRE [22:00 – 23:30]

*(Diapositiva 14: La línea evolutiva completa + frase final)*

*(Ambos al frente)*

**[O]:** "Volvamos a la pregunta del principio."

**[J]:** "¿Qué tecnología necesitas para responder dónde venden hamburguesas en una universidad?"

**[O]:** "Si la pregunta es exacta: una base de datos y un buscador."

**[J]:** "Si el usuario no sabe qué buscar exactamente: necesitas lenguaje natural."

**[O]:** "Para lenguaje natural: un modelo de lenguaje."

**[J]:** "Para que el modelo conozca tus datos: RAG."

**[O]:** "Para RAG: embeddings, búsqueda vectorial, re-ranking."

**[J]:** "Para el modelo: infraestructura de cómputo."

*(pausa — ambos al mismo ritmo)*

**[O]:** "Y para todo lo demás: las decisiones que vas tomando conforme el problema crece."

*(pausa)*

**[J]:** "No aprendimos primero la tecnología para después construir el proyecto."

*(pausa)*

**[J]:** "Aprendimos la tecnología porque necesitábamos resolver el proyecto."

*(pausa — 3 segundos)*

**[O]:** "Muchas gracias."

*(clic a diapositiva 15)*

---

## SECCIÓN 15 — PREGUNTAS [23:30 – 28:30]

*(Diapositiva 15: Pantalla de espera con información del proyecto)*

"Quedamos a sus preguntas."

*(Ver documento 07_preguntas_respuestas.md para respuestas preparadas)*

---

## NOTAS GENERALES DE EJECUCIÓN

### Ritmo y pausas
- Las pausas son intencionales. No llenarlas con "este... este...".
- Cuando aparece una marca de `*(pausa)*`, es un silencio real de 2-3 segundos.
- Hablar más lento de lo que se siente natural — el micrófono y la acústica del salón hacen que se perciba normal.

### Cambios de presentador
| Momento | Transición |
|---|---|
| Diapositiva 3→4 | Joaquin cierra, Owen entra sin pausa |
| Diapositiva 6→7 | Owen cierra, Joaquin retoma al frente |
| Diapositiva 9→10 | Joaquin cierra, Owen entra sin pausa |
| Diapositiva 10→11 | Owen cierra, Joaquin retoma |
| Diapositivas 13-14 | Se alternan activamente |

### Si el tiempo se acorta
Prioridad de corte (de menor a mayor importancia narrativa):
1. Diapositiva 5: reducir a 2 ejemplos de necesidad→decisión (en vez de 4)
2. Diapositiva 10: omitir pasos 1 y 2 del pipeline (reformulación y fuzzy matching)
3. Diapositiva 12: quedarse solo con el bug del Singleton

### Si el tiempo sobra
- Diapositiva 8: mostrar demo en vivo (si disponible y estable)
- Diapositiva 10: explicar brevemente qué son los embeddings con la analogía de la distancia semántica
- Diapositiva 12: ampliar sobre la deuda técnica de seguridad

### Contacto visual
- Hablar al auditorio, no a la pantalla.
- El ponente puede mirar la pantalla para señalar un elemento específico, luego volver al auditorio.
- Si hay notas impresas, glancear brevemente — no leer.
