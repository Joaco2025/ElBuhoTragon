// Reglas de filtrado del inicio, separadas de la UI para poder reutilizarlas.
import { estadoApertura } from "./horario";
import { normalizar } from "./formato";

export const PRESUPUESTOS = [30, 50, 70, 100];

/** "Facultad Interdisciplinaria de Ciencias Sociales" -> "Ciencias Sociales" */
export const facultadCorta = (nombre = "") => nombre.replace(/^Facultad Interdisciplinaria de\s+/i, "");

/** Categorías que existen en los menús, de la más a la menos común (sin las vacías) */
export function categoriasDisponibles(menus) {
  const conteo = {};
  for (const m of menus) if (m.categoria) conteo[m.categoria] = (conteo[m.categoria] || 0) + 1;
  return Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([nombre]) => nombre);
}

const cabeEnPresupuesto = (m, max) => !max || (parseFloat(m.precio) <= max);

/**
 * @param filtros {q, max, cat, fac, abiertas}
 * @returns {{cafeterias, platillos, porPlatillo: boolean}}
 *   cafeterias: las que pasan todos los filtros, abiertas primero
 *   platillos: platillos que cumplen búsqueda/presupuesto/categoría, del más barato al más caro
 *   porPlatillo: true si hay algún filtro a nivel de platillo (entonces se muestra la lista de platillos)
 */
export function filtrarCatalogo({ tienditas, menus }, filtros, ahora) {
  const termino = normalizar(filtros.q);
  const max = filtros.max ? Number(filtros.max) : null;
  const porPlatillo = Boolean(termino || max || filtros.cat);

  const tiendaVisible = new Map();
  for (const t of tienditas) {
    if (filtros.fac && String(t.id_facultad) !== String(filtros.fac)) continue;
    const estado = estadoApertura(t, ahora);
    if (filtros.abiertas && !estado.abierta) continue;
    tiendaVisible.set(t.id_tiendita, { tiendita: t, estado });
  }

  const platillos = [];
  const tiendasConPlatillo = new Set();
  for (const m of menus) {
    if (!tiendaVisible.has(m.id_tiendita)) continue;
    if (filtros.cat && m.categoria !== filtros.cat) continue;
    if (!cabeEnPresupuesto(m, max)) continue;
    if (termino && !normalizar(m.nombre).includes(termino) && !normalizar(m.descripcion || "").includes(termino)) continue;
    platillos.push(m);
    tiendasConPlatillo.add(m.id_tiendita);
  }
  platillos.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio) || a.nombre.localeCompare(b.nombre));

  const cafeterias = [...tiendaVisible.values()]
    .filter(({ tiendita }) => {
      if (!porPlatillo) return true;
      if (tiendasConPlatillo.has(tiendita.id_tiendita)) return true;
      // Buscar por nombre de cafetería también cuenta, si no hay filtros de precio o categoría
      return termino && !max && !filtros.cat && normalizar(tiendita.nombre).includes(termino);
    })
    .sort((a, b) => Number(b.estado.abierta) - Number(a.estado.abierta) || a.tiendita.nombre.localeCompare(b.tiendita.nombre));

  return { cafeterias, platillos, porPlatillo };
}

// Para la pizarra cuenta lo que es comida; una paleta de $5 no resuelve el almuerzo
const NO_ES_COMIDA = new Set(["Bebidas", "Postres", "Snacks"]);

/** Los platillos más baratos de cafeterías abiertas ahora (la "pizarra" del inicio) */
export function masBaratosAbiertos({ tienditas, menus }, ahora, cuantos = 4) {
  const abiertas = new Set(tienditas.filter((t) => estadoApertura(t, ahora).abierta).map((t) => t.id_tiendita));
  const vistos = new Set();
  return menus
    .filter((m) => abiertas.has(m.id_tiendita) && !Number.isNaN(parseFloat(m.precio)) && !NO_ES_COMIDA.has(m.categoria))
    .sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))
    .filter((m) => {
      // Uno por cafetería, para que la pizarra muestre variedad
      if (vistos.has(m.id_tiendita)) return false;
      vistos.add(m.id_tiendita);
      return true;
    })
    .slice(0, cuantos);
}
