---
name: buho-frontend
description: Pautas para cambiar el frontend de El Búho Tragón - identidad "La carta del campus", tokens de color y tipografía, componentes React compartidos, llamadas a la API, rediseños y cómo previsualizarlos. Úsala al editar cualquier cosa en frontend/ (páginas, componentes, estilos, textos) o al planear un cambio estético.
---

# Frontend de El Búho Tragón (React 19 + Vite 6 + Tailwind 4)

Lee primero `buho-contexto` si no lo has hecho.

## Identidad visual (resumen; el detalle y el historial están en `.better-react-web-ui.md`)

Rediseño de noviembre de 2026 ("La carta del campus"), con modo oscuro por defecto y claro opcional. La identidad anterior (Cormorant, mono en mayúsculas, tarjetas 3:4) ya no aplica.

- **Idea:** la pizarra de precios de las cafeterías es la interfaz. El inicio responde "¿cuánto traes?" con platillos reales, su precio, quién los vende y si está abierta.
- **Voz:** útil y cercana, frases cortas en segunda persona, sentence case. Sin etiquetas en mayúsculas espaciadas ni "eyebrows".
- **Dos temas, oscuro por defecto.** Mismos nombres de token con valores distintos: oscuro en `@theme` y claro en `:root[data-tema="claro"]` (`frontend/src/index.css`). El botón sol/luna del header los alterna (`lib/tema.js`, guardado en `localStorage`; `index.html` lo aplica antes de pintar). Todo componente nuevo debe verse bien en ambos.
- **Colores:** `fondo`, `superficie`, `hundido` (superficies por paso de tono); `tinta`, `tinta-suave`; acción `azul` / `azul-hondo`; `zona` para paneles destacados (pizarra, pie); `oro` como relleno (texto encima: `sobre-oro`); estados `abierto`, `cerrado` (gris), `error`. Tabla completa con contrastes en `.better-react-web-ui.md`.
- **Pares que rompen un tema:** `text-white` sobre `bg-tinta` → `text-sobre-tinta`; `text-tinta` sobre `bg-oro` → `text-sobre-oro`; enlaces `text-enlace` (no `text-azul`); foco `outline-foco`; velos `bg-velo/…`; texto sobre `bg-error` → `text-fondo`.
- **Tipografía:** `font-display` (Newsreader) para títulos y precios; `font-sans` (Plus Jakarta Sans) para la interfaz; clase `.cifras` para números alineados. Sin `font-mono`.
- **Ilustración:** los búhos de la marca en sus colores reales (`lib/imagenes.js` → `ILUSTRACIONES`): carta, cartel (estados vacíos) y dormido (todo cerrado).
- **Evitar:** morados, gradientes, glassmorphism, neón, filas de tarjetas idénticas con icono, números 01/02/03, crema con terracota.

## Estructura

| Carpeta | Qué hay |
|---|---|
| `src/main.jsx` | Rutas. Todas cuelgan de `AppShell`; las páginas se cargan con `React.lazy` salvo el inicio |
| `components/layout/` | `AppShell` (header, pie, chat y avisos montados una vez), `Header`, `Footer`, `EncabezadoPagina` + `Contenedor`, `PantallaCuenta`, `PaginaLegal` |
| `components/ui/` | Primitivas: `Boton`, `Campo`, `CampoContrasena`, `Chips`, `Aviso`, `Dialogo`, `Confirmar`, `Pestanas`, `EstadoApertura`, `Estrellas`, `Foto`, `EstadoVacio`, `Esqueleto`, `Toast` |
| `components/chat/` | `ChatWidget` y `contextoAsistente` (`useAsistente().abrir(pregunta?)` abre el Buhito desde cualquier página) |
| `components/cafeteria/`, `inicio/`, `admin/` | Piezas de cada pantalla |
| `lib/` | `api.js` (fetch + caché del catálogo), `horario.js`, `catalogo.js` (filtros), `formato.js`, `sesion.js`, `imagenes.js`, `texto.js` |
| `hooks/` | `useCatalogo`, `useAhora`, `useTitulo`, `useAtraparFoco` |

Antes de crear un componente, busca si ya existe en `ui/`. No copies lógica de horarios, sesión o precios: está en `lib/`.

## Reglas de código

1. **Solo tokens.** Nada de hex sueltos en componentes. Si hace falta un color nuevo, agrégalo en los **dos** temas de `index.css` y en `.better-react-web-ui.md` con su contraste en cada uno.
2. **API solo vía `lib/api.js` / `config.js`.** `pedir(ruta)` para leer y `escribir(ruta, metodo, cuerpo)` para POST/PUT/PATCH/DELETE (ya agrega `authHeaders()`). Nunca escribas `http://127.0.0.1:8000` en un componente.
3. **Catálogo compartido.** Usa `useCatalogo()`; pide `/api/Tienditas/?sin_imagen=1` (sin las fotos en base64) y lo guarda 5 minutos. Tras escribir algo en el admin llama a `invalidarCatalogo()`. Si el backend publicado no soporta `sin_imagen`, la respuesta trae `imagen_url` y todo sigue funcionando.
4. **Fotos:** usa `<Foto>` con `fotoMiniatura(t)` en listas y `fotoPrincipal(t)` en la ficha. Nunca pongas el base64 de `imagen_url` en una lista si existe la versión local o `/api/Tienditas/<id>/imagen/`.
5. **Sin HTML crudo.** No uses `dangerouslySetInnerHTML`: el texto del chatbot y de las reseñas viene de usuarios o de un LLM.
6. **La seguridad vive en el backend.** Ocultar un botón de admin en React es cosmético; el permiso real lo da `permissions.py`.
7. **El chatbot** (`components/chat/ChatWidget.jsx`) manda `{message, lat, lon, history}` con máximo 6 turnos; el backend corta mensajes de más de 500 caracteres (el input también limita a 500).
8. **Texto dañado:** parte de los menús en la base tiene acentos dañados ("jam├│n"). `lib/texto.js` (`repararPlatillo`) lo corrige al mostrar; aplícalo a cualquier lugar nuevo que lea menús o reseñas.
9. Iconos: `react-icons/fi` y `react-icons/fa`, siempre con `aria-hidden="true"`; los botones de solo icono llevan `aria-label`. No agregues librerías de componentes (shadcn, MUI) sin acordarlo.
10. **Mapas: MapLibre GL.** Usa siempre `components/map/BuhoMap.jsx` cargado con `React.lazy` (pesa ~300 KB gzip y no debe ir en el bundle principal). Los colores del mapa están en `components/map/estiloUnison.js` (estilo **positron** de OpenFreeMap recoloreado con una paleta por tema y edificios 3D; `BuhoMap` cambia el estilo en vivo al cambiar el tema); cámbialos ahí si cambian los tokens. Los popups se arman con nodos de texto, nunca con `setHTML`. Para mapas dentro de una página con scroll pasa `gestosCooperativos`.
11. **Accesibilidad mínima:** controles de 44 px, foco visible (lo da `index.css`), etiqueta visible en cada campo (`Campo`), diálogos con `Dialogo` (atrapa foco, Escape, devuelve el foco), estados vacíos y de error con `EstadoVacio`. Respeta `prefers-reduced-motion` (regla global).
12. **Filtros en la URL.** El inicio guarda búsqueda y filtros en `?q=&max=&cat=&fac=&abiertas=1`; los filtros nuevos también van ahí.

## Trabajar un cambio visual

```bash
cd frontend
npm run dev:api-real    # datos reales del sitio, sin backend local
```

⚠️ En este modo lo que guardes se escribe en producción. Navega y revisa, pero no envíes formularios de prueba.

Para probar formularios, login o el admin, usa el backend local contra una **copia** de la base: `DJANGO_DB_PATH=/ruta/copia.db venv/bin/python manage.py runserver` y `npm run dev` (apunta a `http://127.0.0.1:8000`).

Para tareas de diseño puntuales usa las skills genéricas de `.agents/skills/` (por ejemplo `critique`, `polish`, `a11y`, `adapt` para responsive, `hierarchy`, `harden`), siempre dentro de la identidad de arriba.

## Rediseño grande: flujo recomendado

1. Rama nueva (por ejemplo `feat/rediseno-<tema>`).
2. Cambia primero los tokens y la tipografía (`index.css`, `index.html`), luego las primitivas de `components/ui/` y `components/layout/`, y al final las páginas.
3. Revisa en móvil (375–390 px), tableta (768 px) y escritorio, **en los dos temas**. Comprueba contraste en cada uno: dorado solo como relleno.
4. `npm run build` y `npm run lint` sin errores ni avisos.
5. Publica la vista previa: `deploy/amplify/deploy-frontend.sh preview` y compártela.
6. Con la aprobación: PR, merge a `main` y publicación del sitio principal (ver `buho-publicar`).

## Al terminar

Corre la checklist de `buho-revision`.
