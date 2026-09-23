---
name: memorable-presentation-prompts-el-buho-tragon
description: Usa esta habilidad cuando el usuario quiera construir, estructurar, mejorar o ensayar la presentación académica "Evolución tecnológica de un proyecto de software: del problema a la solución", basada en el caso de El Búho Tragón. Aplica los principios de Talk Like TED de Carmine Gallo, pero adaptados a una ponencia académica de computación de máximo 30 minutos, con 25 minutos de exposición y 5 minutos de preguntas. Prioriza una narrativa de problema → necesidad → decisión tecnológica → resultado/aprendizaje, evitando convertir la charla en una lista de tecnologías o en una presentación centrada exclusivamente en IA.
---

# Memorable Presentation Prompts
## Aplicados a la ponencia "Evolución tecnológica de un proyecto de software: del problema a la solución"

Esta habilidad adapta el marco *Talk Like TED* de Carmine Gallo al caso real de **El Búho Tragón**, un proyecto desarrollado por estudiantes de la Licenciatura en Ciencias de la Computación de la Universidad de Sonora durante cursos de Ingeniería de Software.

La meta no es hacer que el proyecto parezca más espectacular de lo que fue. La meta es convertir una experiencia real de desarrollo de software en una historia técnica, clara y memorable sobre **cómo las necesidades de un proyecto pueden guiar la incorporación progresiva de tecnologías**.

---

# 0. Contexto específico que debes conocer antes de generar la presentación

## Identidad de la ponencia

- **Título:** Evolución tecnológica de un proyecto de software: del problema a la solución
- **Autores:** Joaquin Alfredo Castro Córdova y Owen Adiel Solis Zatarain
- **Institución:** Universidad de Sonora
- **Área:** Computación
- **Tipo:** Reporte de investigación
- **Audiencia registrada:** Estudiantes de licenciatura
- **Área de conocimiento:** Ciencias de la computación
- **Duración:** máximo 30 minutos; el programa oficial establece **25 minutos de exposición + 5 minutos de preguntas**
- **Clave en el programa:** PCOMP02
- **Evento:** XXXV Semana Nacional de Investigación y Docencia en Matemáticas, Universidad de Sonora, septiembre de 2026
- **Bloque:** Ponencias de Computación

El resumen oficial establece que la ponencia analiza la evolución de El Búho Tragón desde una plataforma básica de consulta hasta un sistema con búsqueda, mapas, reseñas, gestión de información, seguridad e inteligencia artificial, incluyendo modelos de lenguaje y RAG. El eje es la toma de decisiones tecnológicas basada en problemas concretos y la evolución de la arquitectura conforme crece el proyecto.

---

# 1. Línea narrativa obligatoria

La presentación debe seguir principalmente esta línea:

```text
PROBLEMA
   ↓
SOLUCIÓN SENCILLA
   ↓
APARECEN NUEVAS NECESIDADES
   ↓
NUEVAS DECISIONES TECNOLÓGICAS
   ↓
EL SISTEMA CRECE
   ↓
APARECE UNA NECESIDAD DE LENGUAJE NATURAL
   ↓
LLM
   ↓
EL LLM NECESITA INFORMACIÓN DEL PROYECTO
   ↓
RAG
   ↓
EL MODELO NECESITA RECURSOS COMPUTACIONALES
   ↓
ACARUS / YUCA
   ↓
APRENDIZAJE Y REFLEXIÓN
```

La tesis central es:

> **No empezamos preguntándonos qué tecnologías queríamos usar. Empezamos preguntándonos qué problema queríamos resolver. Conforme cambió el problema, cambió la solución.**

Otra frase que puede utilizarse como soundbite:

> **No aprendimos primero la tecnología para después construir el proyecto. Aprendimos la tecnología porque necesitábamos resolver el proyecto.**

No presentar estas frases como slogans vacíos. Deben aparecer respaldadas por ejemplos concretos del desarrollo.

---

# 2. Historia real del proyecto

## Origen

El Búho Tragón nació a partir de una experiencia común al ingresar a la Universidad de Sonora: no conocer con claridad dónde estaban los establecimientos de comida del campus, qué productos ofrecían, cuánto costaban y qué opciones existían.

La primera idea fue sencilla:

> reunir esa información en una plataforma.

El proyecto comenzó durante **Ingeniería de Software I**. La primera versión estaba principalmente orientada a listar establecimientos y productos/precios.

En ese momento no existía la intención de construir desde el principio una arquitectura compleja ni un sistema de IA.

---

## Evolución en Ingeniería de Software II

Al retomar el proyecto en Ingeniería de Software II, el objetivo pasó de mantener un catálogo sencillo a desarrollar una plataforma más completa.

Conforme surgieron nuevas necesidades se incorporaron:

- búsqueda;
- mapas y representación espacial;
- reseñas;
- herramientas de administración;
- usuarios;
- autenticación;
- mecanismos relacionados con seguridad;
- posteriormente, interacción mediante lenguaje natural.

La selección tecnológica fue progresiva.

La idea que debe quedar clara es:

> **cada funcionalidad nueva introdujo un problema nuevo, y ese problema obligó a considerar una solución tecnológica.**

---

# 3. El momento de "hay que meterle IA"

Dentro del equipo apareció inicialmente la idea informal de:

> **"Hay que meterle IA."**

No debe presentarse como si desde el comienzo existiera un plan sofisticado de inteligencia artificial.

La idea comenzó como una ocurrencia/joke interna y posteriormente se convirtió en una pregunta de ingeniería:

> **¿Para qué queremos IA dentro de este sistema?**

La respuesta concreta fue permitir que los usuarios consultaran información mediante lenguaje natural.

Ejemplos:

- "¿Qué venden en esta tienda?"
- "¿Dónde venden hamburguesas?"
- consultas sobre productos, precios y establecimientos;
- consultas que pueden involucrar ubicación.

La presentación debe enfatizar que **la IA no fue incorporada simplemente porque era una tecnología popular**, sino porque apareció una interacción que podía beneficiarse del lenguaje natural.

---

# 4. Investigación tecnológica para la IA

El equipo no tenía inicialmente experiencia profunda en:

- modelos de lenguaje;
- embeddings;
- búsqueda vectorial;
- RAG;
- infraestructura para inferencia de modelos.

La incorporación de IA implicó aprendizaje durante el propio desarrollo.

Primero se investigaron alternativas comerciales mediante APIs, incluyendo servicios de proveedores de modelos.

Después se exploraron modelos abiertos, entre otros factores por los costos asociados a las APIs comerciales.

También apareció una restricción de infraestructura:

> **¿Dónde vamos a ejecutar el modelo?**

Uno de los integrantes comenzó a trabajar con recursos de **ACARUS** y la supercomputadora **YUCA**, lo que abrió la posibilidad de experimentar con modelos de lenguaje utilizando infraestructura de alto rendimiento.

Esta parte debe contarse como una evolución de restricciones:

```text
Queremos lenguaje natural
        ↓
Necesitamos un modelo
        ↓
El modelo necesita datos relevantes
        ↓
Necesitamos recuperación de información
        ↓
RAG
        ↓
El modelo necesita recursos de cómputo
        ↓
YUCA / infraestructura HPC
```

---

# 5. RAG como caso técnico principal

RAG debe ser uno de los momentos técnicos importantes, pero no convertirse en el tema completo de la charla.

Explicación base:

> El modelo de lenguaje no es la fuente de verdad de los datos de El Búho Tragón. El sistema recupera información relevante de los datos de la aplicación y utiliza esa información como contexto para generar una respuesta.

Conceptualmente:

```text
Pregunta del usuario
        ↓
Representación de la consulta
        ↓
Embeddings
        ↓
Búsqueda vectorial
        ↓
Información relevante
        ↓
Contexto
        ↓
Modelo de lenguaje
        ↓
Respuesta
```

El proyecto utiliza componentes relacionados con:

- sentence-transformers;
- embeddings;
- FAISS;
- búsqueda/re-ranking;
- modelos Qwen;
- RAG.

En la infraestructura de YUCA se experimentó con **Qwen 2.5 14B**, mientras que el proyecto también contempla modelos Qwen de menor tamaño para otros escenarios.

No inventes motivaciones específicas que no estén documentadas. Si la motivación de una decisión no está explícita en el código, README o contexto proporcionado por los autores, etiquétala como:

> **"motivación a confirmar con el equipo"**

---

# 6. Tecnologías convencionales: comprimirlas

No conviertas la presentación en una lista de frameworks.

La infraestructura convencional debe explicarse en una sola sección breve.

El proyecto utiliza tecnologías de desarrollo web como:

- React/Vite/Tailwind en frontend;
- Django/Django REST Framework en backend;
- base de datos relacional;
- autenticación/JWT;
- Leaflet para mapas;
- componentes de búsqueda, reseñas y administración.

La presentación puede resumirlo como:

> "Para la aplicación web utilizamos tecnologías convencionales para este tipo de sistemas, separando la interfaz, la lógica del servidor y los datos."

Después, pasar rápidamente a las decisiones que sí tienen una historia interesante.

---

# 7. Audiencia y nivel técnico

La audiencia está registrada como estudiantes de licenciatura dentro del área de Ciencias de la Computación.

El evento incluye otras ponencias de computación sobre:

- modelado estadístico aplicado;
- LLMs y matemáticas;
- análisis de señales EEG;
- ciencia de datos.

Por lo tanto:

- no explicar durante varios minutos qué es una base de datos;
- no hacer tutoriales de React o Django;
- sí explicar con claridad las decisiones técnicas;
- sí utilizar diagramas;
- sí explicar RAG de manera comprensible;
- sí mostrar por qué una arquitectura creció;
- sí hablar de restricciones y trade-offs;
- evitar jerga sin explicar.

La audiencia debe poder seguir la historia aunque no conozca previamente el proyecto.

---

# 8. El papel de la IA dentro de la narrativa

La IA es importante, pero **NO debe convertirse en el título ni en el eje absoluto de la presentación**.

La estructura correcta es:

```text
Problema
  ↓
Evolución del software
  ↓
Nuevas necesidades
  ↓
Tecnologías convencionales
  ↓
Nueva necesidad de interacción
  ↓
IA
  ↓
RAG
  ↓
Infraestructura
```

La estructura incorrecta sería:

```text
IA
LLM
LLM
RAG
LLM
IA
RAG
```

La presentación debe mostrar que la IA fue **una etapa particularmente interesante de la evolución**, no que todo el proyecto existió para justificar el uso de IA.

---

# 9. Marco obligatorio para analizar cada decisión tecnológica

Cada tecnología que merezca una explicación debe pasar por este esquema:

### Necesidad
¿Qué problema concreto apareció?

### Alternativas
¿Qué tipos de soluciones podían considerarse?

### Criterios
¿Qué factores importaban?

Ejemplos:

- funcionalidad;
- complejidad;
- recursos disponibles;
- costo;
- facilidad de integración;
- posibilidades de evolución;
- infraestructura.

### Decisión
¿Qué solución se incorporó?

### Resultado
¿Qué permitió hacer?

### Aprendizaje
¿Qué descubrió el equipo?

No es necesario utilizar literalmente estos seis encabezados en las diapositivas. Es el marco de razonamiento que debe existir detrás de ellas.

---

# 10. Regla de evidencia

Distingue siempre entre:

### Evidencia directa
Algo que puede comprobarse en el repositorio, código, README, documentación o material proporcionado.

### Historia proporcionada por los autores
Algo que forma parte del relato real del equipo aunque no aparezca necesariamente en el código.

### Inferencia
Una interpretación razonable del desarrollo, pero que no debe presentarse como hecho.

### Información pendiente de confirmar
Algo que requiere preguntarle a los autores.

Nunca inventes:

- razones de selección;
- benchmarks;
- comparaciones de rendimiento;
- costos;
- tecnologías probadas;
- decisiones descartadas;
- resultados experimentales;
- fechas;
- métricas.

Si falta información, escribe:

> **[CONFIRMAR CON EL EQUIPO]**

Esto es especialmente importante en una ponencia académica.

---

# 11. Los 7 prompts

---

## 1. Creador de titulares amigables para Twitter

**Objetivo:** Destilar toda la presentación en un solo mensaje central que se pueda repetir.

Estoy preparando una presentación académica titulada:

> **"Evolución tecnológica de un proyecto de software: del problema a la solución"**

sobre el caso de **El Búho Tragón**, para estudiantes de licenciatura en Ciencias de la Computación.

El objetivo es mostrar cómo un proyecto que comenzó como una solución sencilla para consultar establecimientos y precios evolucionó mediante nuevas necesidades y decisiones tecnológicas hasta incorporar búsqueda, mapas, reseñas, gestión, seguridad, modelos de lenguaje y RAG.

El mensaje central es:

> **No empezamos preguntándonos qué tecnologías queríamos usar. Empezamos preguntándonos qué problema queríamos resolver. Conforme cambió el problema, cambió la solución.**

Ayúdame a crear un "titular amigable para Twitter" para esta presentación.

Criterios:

- máximo 140 caracteres;
- simple;
- específico;
- claro;
- técnicamente honesto;
- no debe reducir la presentación a IA;
- debe poder repetirse naturalmente al menos tres veces.

Da 5 opciones. Para cada opción explica:

1. por qué es memorable;
2. en qué momento de la charla puede aparecer;
3. qué parte de la historia del Búho la respalda.

---

## 2. Arquitecto de gancho emocional

**Objetivo:** Construir una apertura que comience con el problema real y no con una definición académica.

La apertura estándar NO debe ser:

> "El desarrollo de software es un proceso..."

En su lugar, comienza con la experiencia de entrar a la universidad y no saber:

- dónde están las tienditas;
- qué venden;
- cuánto cuestan las cosas.

Diseña 3 opciones de apertura de aproximadamente 60-90 segundos:

### Opción 1: historia
Cuenta el origen de El Búho Tragón.

### Opción 2: pregunta
Utiliza una pregunta como:

> "¿Qué tecnología necesitas para responder dónde venden hamburguesas dentro de una universidad?"

### Opción 3: contraste
Compara:

> "Empezamos queriendo hacer una lista de tienditas. Terminamos trabajando con modelos de lenguaje, embeddings, RAG y una supercomputadora."

No exageres la historia. El objetivo es mostrar evolución.

Para cada opción entrega:

- guion exacto;
- indicaciones de diapositiva;
- principio retórico utilizado;
- transición hacia la siguiente sección.

---

## 3. Traductor de conceptos abstractos

Utiliza este prompt especialmente para:

- arquitectura evolutiva;
- embeddings;
- búsqueda vectorial;
- RAG;
- relación entre LLM y datos propios;
- infraestructura HPC;
- trade-offs tecnológicos.

Para cada concepto genera tres analogías.

Las analogías deben ser técnicamente fieles.

Por ejemplo, para RAG, una analogía puede partir de la diferencia entre:

> "preguntarle algo a una persona que sabe lenguaje"

y

> "darle a esa persona el documento específico que necesita consultar antes de responder."

No utilices analogías que introduzcan una idea técnicamente incorrecta.

Para cada analogía entrega:

- nombre;
- explicación;
- correspondencia técnica;
- guion de 2-3 frases;
- qué riesgo de malentendido tiene.

---

## 4. Diseñador del momento que deja con la boca abierta

El momento pico debe aparecer aproximadamente a dos tercios de la charla.

Para esta presentación, explora especialmente tres posibilidades:

### Opción A: la evolución del problema

Mostrar:

```text
"¿Dónde está la tiendita?"
        ↓
"¿Qué venden?"
        ↓
"¿Dónde venden hamburguesas?"
        ↓
"¿Puede el sistema entender la pregunta?"
```

### Opción B: salto de complejidad

Mostrar visualmente:

```text
LISTA DE TIENDITAS

        ↓

REACT + DJANGO + BD + MAPAS + USUARIOS

        ↓

EMBEDDINGS + FAISS + RAG + QWEN + YUCA
```

Y preguntar:

> "¿Cómo llegamos de una lista de tienditas a esto?"

### Opción C: demostración

Si la demo está disponible y es estable, utilizar una consulta real como:

> "¿Dónde venden hamburguesas?"

o una consulta que aproveche ubicación/contexto.

Nunca diseñes una demo que dependa de datos que no hayan sido verificados.

---

## 5. Estructurador de la regla del tres

La presentación debe organizarse en **tres grandes capítulos narrativos**, aunque pueda contener varias diapositivas.

Propón una estructura alrededor de:

### Pilar 1: Un problema sencillo
Origen + primera versión.

### Pilar 2: El problema crece
Nuevas necesidades + decisiones tecnológicas + arquitectura.

### Pilar 3: Cuando la solución también se vuelve un problema
IA + RAG + infraestructura + aprendizaje.

Para cada pilar proporciona:

- título corto;
- historia principal;
- evidencia;
- transición;
- duración sugerida.

No fuerces toda la información del proyecto dentro de estos tres pilares. Filtra.

---

## 6. Refinador del tono conversacional

Reescribe cualquier sección para que suene como un estudiante de Ciencias de la Computación explicando honestamente un proyecto que desarrolló.

Restricciones:

- frases cortas;
- voz activa;
- evitar lenguaje corporativo;
- evitar "solución disruptiva", "innovador", "revolucionario", etc.;
- evitar exageraciones;
- definir acrónimos al aparecer;
- explicar RAG en lenguaje natural antes de usar el acrónimo;
- no sonar como un paper leído en voz alta;
- conservar precisión técnica.

El tono debe sentirse conversacional, pero apropiado para una ponencia universitaria.

No escribir como una charla TED genérica.

---

## 7. Puliendo soundbites dignos de cita

Mensaje central:

> **No empezamos preguntándonos qué tecnologías queríamos usar. Empezamos preguntándonos qué problema queríamos resolver.**

Genera 5 soundbites de menos de 15 palabras utilizando:

- contraste;
- anáfora;
- quiasmo;
- paralelismo.

Candidatos conceptuales:

- problema antes que tecnología;
- evolución;
- aprendizaje durante el desarrollo;
- complejidad que aparece con nuevas necesidades;
- IA como respuesta a una necesidad concreta.

Evita frases vacías como "la tecnología transforma el futuro".

---

# 12. Flujo de trabajo obligatorio

Para construir la presentación completa utiliza los prompts en este orden:

1. **Creador de titulares**
2. **Regla del tres**
3. **Arquitecto de gancho**
4. **Mapa de evolución tecnológica**
5. **Traductor de conceptos**
6. **Diseñador del momento pico**
7. **Refinador conversacional**
8. **Soundbites**
9. **Revisión final de evidencia**

El agente debe conservar las decisiones tomadas en pasos anteriores.

---

# 13. Estructura recomendada de la presentación

La presentación final debe apuntar a aproximadamente **23-25 minutos de exposición**, dejando el resto del bloque para preguntas.

Propuesta narrativa inicial:

### 1. Portada
30 s

### 2. El problema
1.5 min

### 3. Primera solución
1.5 min

### 4. El proyecto empieza a crecer
2 min

### 5. Cada necesidad introduce una decisión
2 min

### 6. Arquitectura resultante
1.5 min

### 7. Caso: mapas, usuarios y gestión
2 min

### 8. "Hay que meterle IA"
1 min

### 9. La pregunta real: ¿para qué IA?
2 min

### 10. Del lenguaje natural al RAG
2.5 min

### 11. RAG por dentro
2 min

### 12. ¿Dónde ejecutamos el modelo?
2 min

### 13. La complejidad también crece
1.5 min

### 14. Qué aprendimos
2 min

### 15. Cierre
1 min

La duración final puede variar. El agente debe priorizar la historia y no rellenar tiempo.

---

# 14. Diseño visual

La presentación debe ser visual y no un documento de texto proyectado.

## Principios

- Una idea principal por diapositiva.
- Pocas palabras.
- Diagramas simples.
- Capturas reales del proyecto cuando aporten evidencia.
- Código sólo cuando sea estrictamente necesario.
- No usar bloques gigantes de código.
- No llenar las diapositivas con logos de tecnologías.
- Utilizar la evolución como recurso visual.

## Recurso visual principal

Usar una línea evolutiva:

```text
Problema
   ↓
Catálogo
   ↓
Búsqueda
   ↓
Mapas
   ↓
Usuarios
   ↓
Gestión
   ↓
Lenguaje natural
   ↓
RAG
   ↓
HPC
```

Esta línea puede aparecer varias veces, revelándose progresivamente.

---

# 15. Qué NO debe hacer el agente

No debe:

- convertir la presentación en una lista de tecnologías;
- convertirla en una charla exclusivamente sobre IA;
- inventar decisiones que no estén documentadas;
- inventar métricas;
- inventar benchmarks;
- presentar RAG como magia;
- decir que una tecnología fue elegida "porque era la mejor" sin evidencia;
- usar jerga innecesaria;
- explicar durante varios minutos tecnologías convencionales;
- sobrecargar las diapositivas;
- hacer afirmaciones de investigación que el proyecto no respalde;
- transformar una experiencia de curso en una historia artificialmente épica;
- ocultar limitaciones o dificultades;
- confundir "lo que existe actualmente" con "lo que ocurrió históricamente".

---

# 16. Qué SÍ debe buscar

Busca especialmente:

- momentos de cambio;
- decisiones;
- problemas que aparecieron después de una solución;
- tecnologías sustituidas;
- experimentos;
- limitaciones;
- decisiones por costo;
- decisiones por infraestructura;
- decisiones por facilidad de integración;
- aprendizaje durante el desarrollo;
- errores o intentos fallidos que sean útiles para la historia;
- diferencias entre Ingeniería de Software I e Ingeniería de Software II;
- diferencias entre la arquitectura inicial y la actual;
- conexiones entre requerimientos y componentes técnicos.

Si una pieza del repositorio parece interesante pero no se conoce su historia, marcar:

> **[PREGUNTAR A LOS AUTORES]**

---

# 17. Relación con el repositorio

El repositorio de referencia es:

https://github.com/OwenSolis03/IS2_ElBuhoTragon

El agente debe tratar el repositorio como **fuente técnica**, no como fuente absoluta de la historia.

Debe distinguir:

```text
REPOSITORIO
↓
qué existe

HISTORIA DEL EQUIPO
↓
por qué se hizo

PRESENTACIÓN
↓
qué vale la pena contar
```

La existencia de una tecnología en el repositorio no demuestra por sí sola la razón histórica por la que fue seleccionada.

---

# 18. Entregables esperados del agente

Cuando se le solicite generar la presentación, producir:

## A. Mensaje central
Una frase.

## B. Estructura narrativa
Tres capítulos.

## C. Guion de presentación
Por diapositiva:

- número;
- título;
- objetivo;
- contenido visual;
- texto mínimo en pantalla;
- guion oral;
- transición;
- duración;
- evidencia utilizada.

## D. Inventario de evidencia
Separar:

- confirmado;
- documentado;
- inferido;
- por confirmar.

## E. Preguntas posibles
Preparar preguntas técnicas y conceptuales, especialmente sobre:

- selección tecnológica;
- arquitectura;
- RAG;
- embeddings;
- búsqueda vectorial;
- modelos;
- infraestructura;
- seguridad;
- limitaciones;
- decisiones que podrían haberse tomado de otra manera.

## F. Ensayo temporal
Calcular duración aproximada del guion y detectar secciones que excedan el límite.

---

# 19. Preguntas que la audiencia probablemente podría hacer

Preparar respuestas para preguntas como:

### Sobre arquitectura
- ¿Por qué separar frontend y backend?
- ¿Por qué Django?
- ¿Por qué usar una base de datos relacional?
- ¿Cómo evolucionó la arquitectura?

### Sobre búsqueda
- ¿La búsqueda es tradicional o semántica?
- ¿Qué problema resolvió la búsqueda?
- ¿Por qué utilizar embeddings?

### Sobre IA
- ¿Por qué un LLM?
- ¿Por qué no una API comercial?
- ¿Qué problema resuelve RAG?
- ¿Por qué no simplemente poner toda la información en el prompt?
- ¿Cómo reducen alucinaciones?
- ¿Qué modelo utilizaron?
- ¿Qué diferencia hubo entre modelos pequeños y el 14B?

### Sobre infraestructura
- ¿Por qué YUCA?
- ¿Qué recursos necesitaba el modelo?
- ¿Qué limitaciones encontraron?
- ¿Qué cambiarían si tuvieran más recursos?

### Sobre ingeniería de software
- ¿Qué decisión tecnológica cambiarían?
- ¿Qué deuda técnica quedó?
- ¿Qué parte fue más difícil de integrar?
- ¿Qué aprendieron sobre seleccionar tecnologías?
- ¿Qué harían diferente si comenzaran hoy?

Las respuestas deben ser honestas. Si el proyecto no tiene información suficiente para responder, indicar qué debe confirmar el equipo.

---

# 20. Principios centrales de la presentación

| Principio | Aplicación en El Búho Tragón |
|---|---|
| Descubre tu pasión | La historia nace de una experiencia real del equipo |
| Cuenta historias | El proyecto se cuenta como una evolución, no como un inventario |
| Enseña algo nuevo | Mostrar cómo una necesidad termina llevando a decisiones tecnológicas |
| Entrega un momento definitivo | El salto de catálogo a LLM/RAG/YUCA |
| Prioriza la brevedad | Máximo 25 minutos de exposición |
| Prioriza lo visual | Línea evolutiva, arquitectura y flujo RAG |
| Hazlo memorable | Repetir la idea problema → necesidad → tecnología |

---

# 21. Principio final

Antes de generar cualquier diapositiva, responder:

> **"¿Cuál es la única idea que quiero que la audiencia recuerde mañana?"**

La respuesta debe estar relacionada con:

> **La tecnología no fue el punto de partida del proyecto. Fue la respuesta a los problemas que el proyecto fue encontrando.**

Todo lo demás debe estar al servicio de esa idea.

Si una diapositiva no ayuda a demostrarla, cuestionarla, ejemplificarla o hacerla memorable, probablemente debe eliminarse.
