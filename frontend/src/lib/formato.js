const PESOS = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", currencyDisplay: "narrowSymbol" });
const PESOS_ENTEROS = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

/** "$45" o "$45.50"; null si no hay precio */
export function precio(valor) {
  const n = parseFloat(valor);
  if (Number.isNaN(n)) return null;
  return Number.isInteger(n) ? PESOS_ENTEROS.format(n) : PESOS.format(n);
}

/** "$15 a $95" con los precios de una lista de platillos */
export function rangoDePrecios(platillos) {
  const valores = platillos.map((p) => parseFloat(p.precio)).filter((n) => !Number.isNaN(n));
  if (!valores.length) return null;
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  return min === max ? precio(min) : `${precio(min)} a ${precio(max)}`;
}

export function fecha(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}

/** Comparación sin acentos ni mayúsculas, para búsquedas */
export const normalizar = (texto = "") =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** Los nombres en la base vienen sin acentos ("Cafeteria Matematicas"); se muestran tal cual */
export const nombreCorto = (nombre = "") => nombre.replace(/^Cafeter[ií]a\s+/i, "");
