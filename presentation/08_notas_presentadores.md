# 08 — Notas para los Presentadores
## El Búho Tragón — XXXV Semana Nacional de Investigación y Docencia en Matemáticas 2026
## Guía operativa completa para Joaquin Castro y Owen Solis

---

## DISTRIBUCIÓN DE ROL POR SECCIÓN

| Sección | Diapositiva | Quién habla | Tema |
|---|---|---|---|
| Apertura | 1 | Ambos (alternado) | Presentación personal |
| El problema | 2 | **Joaquin** | Origen — experiencia personal |
| Primera versión | 3 | **Joaquin** | IS1, primer commit |
| El proyecto crece | 4 | **Owen** | Nuevas necesidades |
| Cada necesidad | 5 | **Owen** | Decisiones tecnológicas |
| Arquitectura | 6 | **Owen** | 3 capas del sistema |
| "Hay que meterle IA" | 7 | **Joaquin** | La idea informal |
| ¿Para qué IA? | 8 | **Joaquin** | Caso de uso concreto |
| RAG explicado | 9 | **Joaquin** | Concepto de RAG |
| Pipeline RAG | 10 | **Owen** | 8 pasos técnicos |
| ¿Dónde ejecutamos? | 11 | **Joaquin** | YUCA/ACARUS — momento memorable |
| Complejidad crece | 12 | **Owen** | Problemas nuevos |
| Lo que aprendimos | 13 | **Ambos** (alternado) | 3 lecciones |
| Cierre | 14 | **Ambos** (diálogo) | Retorno al inicio |
| Preguntas | 15 | Cualquiera | Q&A |

**Lógica del reparto:**
- Joaquin lleva el **hilo narrativo** — el problema, el origen, la IA, el momento memorable
- Owen lleva el **hilo técnico** — las decisiones de arquitectura, el pipeline RAG, las dificultades
- Ambos comparten apertura, aprendizajes y cierre para equilibrar la presencia

---

## INSTRUCCIONES PARA JOAQUIN

### Tu historia en esta presentación
Tú eres la voz del **problema que crece**. Empiezas con algo cercano y humano — la experiencia de no saber dónde comer en el campus — y guías a la audiencia a través de la evolución hasta el punto donde la solución se volvió compleja.

### Momentos clave que dependen de ti
1. **La apertura** — El tono de toda la charla depende de cómo empieces.
2. **El typo del primer commit** — Es un detalle pequeño que hace la historia auténtica. No lo expliques demasiado — solo dilo naturalmente.
3. **"Hay que meterle IA"** — La pausa después de esta frase es tu momento más importante antes del clímax.
4. **El momento memorable (diapositiva 11)** — El contraste entre el typo y el modelo de 14B es tu trabajo. Hazlo lento. La pausa antes de "Porque el problema fue creciendo" es el corazón de la charla.

### Frases clave que debes dominar (no leer, solo tener en mente)
- "Esa información existe. Solo está dispersa."
- "El primer commit tiene un typo. Eso no estaba planeado."
- "¿Para qué? Esa fue la pregunta que siguió."
- "Empezamos con esto. Terminamos necesitando esto."
- "Porque el problema fue creciendo."
- "No aprendimos primero la tecnología para después construir el proyecto."

---

## INSTRUCCIONES PARA OWEN

### Tu historia en esta presentación
Tú eres la voz de las **decisiones técnicas**. Cuando el problema existe, tú explicas qué decisión tecnológica tomaron y por qué. Eres el que muestra cómo se ve el pipeline RAG desde adentro.

### Momentos clave que dependen de ti
1. **Las cinco necesidades (diapositiva 4)** — Hay ritmo aquí. Cada necesidad va acompañada de una pausa breve. No atasques.
2. **La tabla de decisiones (diapositiva 5)** — Rápido y concreto. Tres o cuatro ejemplos claros.
3. **Los 8 pasos del RAG (diapositiva 10)** — Es la parte más técnica. Habla despacio. La audiencia puede seguirte, pero necesita tiempo para procesar cada paso.
4. **La complejidad también crece (diapositiva 12)** — El bug del Singleton es un ejemplo excelente de problema de ingeniería real. Descríbelo con precisión pero sin jerga innecesaria.

### Frases clave que debes dominar
- "En ningún caso elegimos primero la tecnología. Primero apareció el problema."
- "Un vector que captura el significado semántico de la consulta."
- "RAG escala mejor porque siempre recupera solo lo relevante."
- "Cada decisión tecnológica que tomas hoy crea restricciones que descubres mañana."
- "El repositorio tiene más de 20 commits en un solo día de 'Fixes al Buhito'."

---

## LOGÍSTICA DEL DÍA

### Antes de entrar al salón
- [ ] Cargar la presentación en la computadora del evento (llevar copia en USB)
- [ ] Verificar que la diapositiva 1 está en pantalla
- [ ] Probar el avance de diapositivas con el control remoto/mouse
- [ ] Si hay demo disponible: verificar conexión al backend HPC
- [ ] Confirmar quién va al podio primero (puede ser los dos de pie, pueden turnarse)

### Durante la presentación
- Joaquin inicia al lado izquierdo del auditorio (o al frente), Owen al lado derecho
- El que no está hablando escucha pero está presente — no sacar el teléfono
- Los cambios de turno son fluidos — no hay que anunciarlo

### Señales de coordinación entre presentadores
- Cuando uno termina su parte, una pausa natural es suficiente para que el otro tome la palabra
- Si uno pierde el hilo, el otro puede retomarlo con: "Lo que Owen/Joaquin está diciendo es que..."
- No interrumpirse — si uno empieza a hablar, el otro espera

---

## CONTROL DE TIEMPO EN VIVO

### Marcadores de tiempo durante la charla
| Momento | Tiempo transcurrido |
|---|---|
| Inicio de diapositiva 4 | ~3 min |
| Inicio de diapositiva 7 | ~9 min |
| Inicio de diapositiva 10 | ~13 min 30 s |
| Inicio de diapositiva 11 | ~16 min |
| Inicio de diapositiva 13 | ~20 min |
| Final de cierre | ~23 min 30 s |

### Si van adelantados (más de 2 min por debajo del tiempo)
- En diapositiva 8: mostrar demo si está disponible (hasta 1 min extra)
- En diapositiva 10: expandir la analogía de embeddings

### Si van retrasados (más de 2 min por encima del tiempo)
- Diapositiva 5: reducir a 2 ejemplos de necesidad→decisión
- Diapositiva 10: omitir pasos 1 y 2 (reformulación y fuzzy matching)
- Diapositiva 12: solo mencionar el bug del Singleton, omitir los otros dos

---

## MANEJO DE PREGUNTAS

### Protocolo
1. Escuchar la pregunta completa antes de responder.
2. Si la pregunta no se entendió bien: "Perdón, ¿podrías repetir la pregunta?"
3. Si la pregunta es muy técnica: el que la sabe mejor responde, aunque no sea su "turno".
4. Si no saben la respuesta: ser honestos. "Esa información tendríamos que verificarla / está fuera del alcance de lo que pudimos documentar."
5. No sobrepasar 60 segundos por pregunta.

### División de preguntas
- Preguntas de **arquitectura y decisiones generales** → Cualquiera puede responder
- Preguntas sobre **RAG pipeline** → Owen preferiblemente
- Preguntas sobre **historia del proyecto y decisiones de IA** → Joaquin preferiblemente
- Preguntas de **seguridad** → Cualquiera, con honestidad sobre las limitaciones

---

## PREGUNTAS QUE DEBEN CONFIRMAR ANTES DE LA PONENCIA

Estas respuestas requieren discusión entre Joaquin y Owen **antes** del evento:

1. **¿Qué APIs comerciales exploraron y por qué las descartaron?**
   - La presentación menciona que la investigación llevó a APIs comerciales. ¿Cuáles? ¿OpenAI, Anthropic, otro? ¿Por qué no las usaron: costo, privacidad, otra razón?

2. **¿Por qué migraron de MySQL a SQLite?**
   - El repositorio muestra la migración claramente (commits nov-dic 2025), pero la motivación no está documentada. ¿Fue por el despliegue en HPC? ¿Por problemas de configuración local?

3. **¿Qué era "Turing" (turing.mat.uson.mx)?**
   - Hay una referencia a este servidor en el README del módulo RAG, que fue eliminada en febrero 2026. ¿Fue un servidor del departamento de Matemáticas? ¿Personal? ¿Cuándo y por qué pasaron a YUCA?

4. **¿Probaron otros modelos Qwen (3B, 7B) antes del 14B?**
   - El README menciona `Qwen2.5-3B-Instruct` como alternativa para menos recursos. ¿Lo probaron? ¿Cuál fue la diferencia?

5. **¿De quién fue la idea de incorporar IA al proyecto?**
   - La skill file dice que surgió informalmente en el equipo. ¿Fue de uno de los dos autores? ¿Del profesor? ¿Cómo pasó exactamente?

6. **¿Cómo obtuvieron acceso a ACARUS/YUCA?**
   - ¿A través de un profesor? ¿Por solicitud directa? Esto puede ser interesante para la audiencia.

7. **¿Cuál es la decisión tecnológica que más discutirían en retrospectiva?**
   - Esta es una pregunta muy probable del auditorio. Tener una respuesta genuina preparada.

---

## SOUNDBITES PARA RECORDAR

Si necesitan improvisar o retomar el hilo, estas frases funcionan como anclas:

- **"El problema guía la tecnología, no al revés."** ← La tesis central
- **"Cada solución trajo su propio problema nuevo."** ← Para la sección de complejidad
- **"No aprendimos la tecnología primero. La aprendimos porque la necesitábamos."** ← El cierre
- **"¿Cómo llegamos de una lista de tienditas a esto? Porque el problema fue creciendo."** ← El momento memorable

---

## PREPARACIÓN RECOMENDADA

### 1 semana antes
- [ ] Leer este documento completo
- [ ] Leer el guion completo (06_guion_completo.md) en voz alta, una vez cada uno
- [ ] Confirmar las preguntas marcadas como [CONFIRMAR CON EQUIPO]
- [ ] Definir si habrá demo en vivo (y si sí, verificarla en el entorno de presentación)

### 3 días antes
- [ ] Primer ensayo completo cronometrado (sin pausar)
- [ ] Ajustar tiempos según el resultado del ensayo
- [ ] Revisar preguntas del documento 07_preguntas_respuestas.md

### 1 día antes
- [ ] Ensayo con control de diapositivas
- [ ] Ensayo de Q&A (uno hace preguntas, el otro responde)
- [ ] Cargar la presentación en el formato final que usarán

### El día de la ponencia
- [ ] Llegar 20 minutos antes para verificar equipos
- [ ] No ensayar el guion completo de nuevo — generar ansiedad innecesaria
- [ ] Revisar las notas de soundbites para tener las frases frescas
- [ ] Beber agua antes de entrar

---

## MANEJO DE LOS NERVIOS

Es normal. Algunas técnicas:

- **Hablar más lento de lo que parece natural** — el micrófono y el salón hacen que se perciba normal, no lento.
- **Las pausas son aliadas** — el silencio consciente no es torpeza, es presencia.
- **Si pierden la línea** — no hay que disculparse. Solo decir "y lo que sigue es..." y continuar.
- **El auditorio quiere que les vaya bien** — son estudiantes y profesores que genuinamente quieren aprender algo. Nadie viene a una ponencia a esperar que el presentador falle.

---

## DATOS TÉCNICOS IMPORTANTES PARA RECORDAR

Para tener frescos el día de la ponencia:

| Dato | Valor |
|---|---|
| Cafeterías en el sistema | 14 |
| Platillos registrados | 482 |
| Facultades | 6 |
| Dimensiones de los embeddings | 384 |
| Distancia máxima de filtro geográfico | 2500 metros |
| Tokens máximos de respuesta del LLM | 250 |
| Temperatura del LLM | 0.1 |
| VRAM aproximada del modelo | ~28 GB |
| Modelo LLM | Qwen2.5-14B-Instruct |
| Modelo embeddings | paraphrase-multilingual-MiniLM-L12-v2 |
| Infraestructura HPC | Clúster Yuca — ACARUS — UNISON |
| GPU en Yuca | AMD Instinct MI210 (ROCm) |
| Fecha primer commit | Marzo 2025 |
| Fecha creación de rag_engine.py | Noviembre 2025 |

---

## UN RECORDATORIO FINAL

Esta es la historia real de un proyecto que desarrollaron. No necesitan ser perfectos — necesitan ser honestos. La audiencia valora la autenticidad más que la perfección. Si algo salió mal en el proyecto, cuéntenlo — es la parte más educativa. Si no saben responder algo, díganlo — es lo más profesional que pueden hacer.

Buena suerte.
