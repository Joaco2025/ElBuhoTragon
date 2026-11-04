// Acceso a la API. Las URLs salen siempre de API_URL (config.js).
import { API_URL, authHeaders } from "../config";
import { repararPlatillo } from "./texto";

export class ErrorApi extends Error {
  constructor(status, datos) {
    super(datos?.detail || datos?.error || `HTTP ${status}`);
    this.status = status;
    this.datos = datos;
  }
}

async function leerCuerpo(res) {
  const tipo = res.headers.get("content-type") || "";
  if (res.status === 204) return null;
  return tipo.includes("application/json") ? res.json().catch(() => null) : null;
}

/** GET (o lo que diga `opciones`) que devuelve JSON o lanza ErrorApi */
export async function pedir(ruta, opciones = {}) {
  const res = await fetch(`${API_URL}${ruta}`, opciones);
  const datos = await leerCuerpo(res);
  if (!res.ok) throw new ErrorApi(res.status, datos);
  return datos;
}

/** POST/PUT/PATCH/DELETE con la sesión actual */
export function escribir(ruta, metodo, cuerpo) {
  return pedir(ruta, {
    method: metodo,
    headers: { ...(cuerpo !== undefined ? { "Content-Type": "application/json" } : {}), ...authHeaders() },
    body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
  });
}

// --- Catálogo (cafeterías, menús y facultades) ---
// Se descarga una vez y se comparte entre páginas durante unos minutos.
// `?sin_imagen=1` pide la lista sin las fotos en base64 (de ~7.5 MB a ~4 KB). Si el
// backend publicado todavía no lo soporta, ignora el parámetro y la respuesta trae
// imagen_url como antes: el sitio sigue funcionando, solo más lento.
const VIGENCIA_MS = 5 * 60 * 1000;
let catalogo = null; // { promesa, hora }

export function obtenerCatalogo({ forzar = false } = {}) {
  if (!forzar && catalogo && Date.now() - catalogo.hora < VIGENCIA_MS) return catalogo.promesa;
  const promesa = Promise.all([
    pedir("/api/Tienditas/?sin_imagen=1"),
    pedir("/api/Menus/"),
    pedir("/api/Facultades/"),
  ]).then(([tienditas, menus, facultades]) => ({
    tienditas: Array.isArray(tienditas) ? tienditas : [],
    menus: Array.isArray(menus) ? menus.map(repararPlatillo) : [],
    facultades: Array.isArray(facultades) ? facultades : [],
  }));
  catalogo = { promesa, hora: Date.now() };
  promesa.catch(() => {
    catalogo = null; // permitir reintento
  });
  return promesa;
}

/** Después de que el admin cambia algo */
export function invalidarCatalogo() {
  catalogo = null;
}

/** El catálogo ya descargado (o null), para pintar sin esperar */
export async function catalogoEnMemoria() {
  if (!catalogo) return null;
  try {
    return await catalogo.promesa;
  } catch {
    return null;
  }
}
