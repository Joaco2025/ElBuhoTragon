# Rediseño del frontend (noviembre de 2026, rama `nuevo-front`)

Resumen técnico del rediseño "La carta del campus" y del cambio aditivo en el backend que lo acompaña. Las reglas de diseño están en `.better-react-web-ui.md` y las de código en `.claude/skills/buho-frontend/SKILL.md`.

## Qué cambió en el frontend

- **Identidad:** fondo claro, tinta azul UNISON, dorado como acento, Newsreader + Plus Jakarta Sans, búhos de la marca en sus colores reales. Sin texto mono ni etiquetas en mayúsculas.
- **Inicio:** buscador de platillos con precio de todo el campus, presupuesto ("¿cuánto traes?"), "solo abiertas ahora", zona del campus y tipo de comida (categorías tomadas de los datos). Los filtros viven en la URL. Una "pizarra" muestra lo más barato para comer en cafeterías abiertas en ese momento.
- **Ficha de cafetería:** estado ("Abierta hasta las 19:00" / "Abre mañana a las 07:00"), rango de precios, "Cómo llegar" (Google Maps a pie), carta agrupada por categoría con buscador, mapa, reseñas. Botón para preguntarle al Buhito por esa cafetería.
- **Mapa:** mapa claro + lista de cafeterías con su estado (alternativa accesible al mapa).
- **Cuenta:** login y registro con errores junto a cada campo; tras iniciar sesión se vuelve a la página de origen.
- **Admin:** tabla con miniaturas, diálogos accesibles (foco atrapado, Escape, pestañas con flechas), confirmación antes de borrar. Las fotos nuevas se reducen en el navegador a 1280 px JPEG antes de guardarse.
- **Contacto:** el formulario abre el correo del usuario con el mensaje escrito (`mailto:`). Antes mostraba "Mensaje recibido" sin enviar nada.
- **Página 404** para rutas que no existen.
- **Arquitectura:** `AppShell` monta header, pie, chat y avisos una sola vez; páginas con carga diferida; lógica compartida en `lib/` y `hooks/`; primitivas en `components/ui/`. Se eliminaron `App.jsx` (muerto), `tailwind.config.mjs` (Tailwind 4 no lo leía) y las copias duplicadas de `src/assets/public/`.

Contratos que **no** cambiaron: rutas, llaves de `localStorage` (`access_token`, `refresh_token`, `username`, `es_admin`), cuerpos de login, registro, reseñas, CRUD del admin y del chatbot.

## Cambio aditivo en el backend

En `TienditasViewSet` (`backend/apps/cafeteria/views.py`) y `TienditasSinImagenSerializer`:

| Petición | Qué hace |
|---|---|
| `GET /api/Tienditas/` | **Igual que antes** (incluye `imagen_url` en base64) |
| `GET /api/Tienditas/?sin_imagen=1` | Omite `imagen_url` y agrega `tiene_imagen` (bool). No lee el base64 de la base (`defer`). Solo aplica a GET |
| `GET /api/Tienditas/<id>/?sin_imagen=1` | Igual, para una cafetería |
| `GET /api/Tienditas/<id>/imagen/` | La foto como archivo (`image/jpeg`/`png`/`webp`/`gif`), con `ETag`, `Cache-Control: public, max-age=300, stale-while-revalidate=86400` y `X-Content-Type-Options: nosniff`. Responde 304 si el ETag coincide, 302 si `imagen_url` es una URL http(s), 404 si no hay foto o el dato no es una imagen válida |

- Permisos: los de siempre (`EsAdminOSoloLectura`); el endpoint de imagen es de solo lectura y tiene throttle por IP (`ImagenThrottle`, `THROTTLE_IMAGEN`, 600/minuto por defecto).
- Sin migraciones, sin cambios en modelos ni en datos, sin dependencias nuevas, sin servicios de AWS nuevos.
- Pruebas: `ImagenesTienditasTests` en `backend/apps/cafeteria/tests.py` (11 casos: respuesta por defecto intacta, modo ligero en lista y detalle, escrituras del admin no afectadas, imagen con tipo y caché, 304, redirección, 404, límite por IP y solo lectura).
- Efecto medido con la base de desarrollo: la lista pasa de 7.8 MB a 3.6 KB.

### Compatibilidad con el backend publicado

El frontend pide `?sin_imagen=1`. El backend en producción hoy ignora ese parámetro y responde como siempre (con `imagen_url`), y el frontend usa ese campo: **el sitio funciona con ambos backends**. La mejora de velocidad llega cuando se publique este backend.

## Limitaciones conocidas

1. **Las fotos del endpoint no se redimensionan** (no hay Pillow en el servidor): cada una pesa ~0.3–0.9 MB. Por eso las listas usan las copias locales optimizadas (`public/img/tienditas/<id>-480|960.webp`, ~30 KB) y solo la ficha pide la foto del servidor.
2. **Las copias locales se mapean por id** (`lib/imagenes.js`, igual que la versión anterior). Si el admin cambia la foto de una cafetería que tiene copia local, las listas seguirán mostrando la local hasta regenerarla. La cafetería 14 (Tortas de Calidad) ya no usa por error la foto de Civil-Minas: usa la suya del servidor.
3. **Caché de la foto:** 5 minutos en el navegador y luego revalidación con ETag. Un cambio de foto tarda como máximo eso en verse.
4. **Texto dañado en la base:** 171 de ~960 campos de menús tienen acentos dañados (UTF-8 leído como CP850: "jam├│n"). `lib/texto.js` los corrige al mostrar; los datos siguen igual. Arreglarlos en la base requiere un script aparte (pendiente, con autorización).
5. **Horarios sin días:** la base no guarda qué días abre cada cafetería; el sitio asume el mismo horario todos los días (igual que antes).
6. **Contacto sin backend:** depende de que el usuario tenga una app de correo configurada.
7. **Navegadores antiguos:** se usan `dvh`, `:has()`, `inert` y `text-wrap: balance`; en navegadores de antes de 2023 algunos detalles degradan sin romper la página.
