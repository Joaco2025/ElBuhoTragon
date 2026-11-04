import { useId } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Chips from "../ui/Chips";
import { PRESUPUESTOS, facultadCorta } from "../../lib/catalogo";

const OPCIONES_PRESUPUESTO = [{ valor: "", etiqueta: "Lo que sea" }, ...PRESUPUESTOS.map((p) => ({ valor: String(p), etiqueta: `$${p}` }))];

/** Buscador y filtros del inicio. `filtros` y `cambiar(clave, valor)` vienen de la URL. */
export default function Filtros({ filtros, cambiar, limpiar, categorias, facultades, hayFiltros }) {
  const id = useId();

  return (
    <section aria-label="Buscar y filtrar" className="space-y-5 sm:space-y-6">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor={`${id}-q`} className="sr-only">
          Buscar platillo o cafetería
        </label>
        <FiSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-tinta-suave" size={22} aria-hidden="true" />
        <input
          id={`${id}-q`}
          type="search"
          value={filtros.q}
          onChange={(e) => cambiar("q", e.target.value)}
          placeholder="Busca un platillo o cafetería"
          autoComplete="off"
          enterKeyHint="search"
          className="w-full h-16 rounded-full bg-superficie border-2 border-transparent pl-14 pr-14 text-lg placeholder:text-tinta-suave/80 shadow-[0_1px_0_rgba(14,34,70,0.04)] hover:border-hundido focus:outline-none focus-visible:border-azul focus-visible:outline-3 focus-visible:outline-azul focus-visible:outline-offset-2 [&::-webkit-search-cancel-button]:hidden"
        />
        {filtros.q && (
          <button
            type="button"
            onClick={() => cambiar("q", "")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer"
            aria-label="Borrar búsqueda"
          >
            <FiX size={20} aria-hidden="true" />
          </button>
        )}
      </form>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[auto_1fr] lg:gap-x-10">
        <Chips leyenda="¿Cuánto traes?" opciones={OPCIONES_PRESUPUESTO} valor={filtros.max} onChange={(v) => cambiar("max", v)} desplazable />

        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <label className="inline-flex items-center gap-3 min-h-11 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filtros.abiertas}
              onChange={(e) => cambiar("abiertas", e.target.checked ? "1" : "")}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="relative h-7 w-12 rounded-full bg-borde-campo transition-colors peer-checked:bg-abierto peer-focus-visible:outline-3 peer-focus-visible:outline-azul peer-focus-visible:outline-offset-2 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
            />
            <span className="font-semibold">Solo abiertas ahora</span>
          </label>

          <div>
            <label htmlFor={`${id}-fac`} className="block text-sm font-semibold mb-2">
              Zona del campus
            </label>
            <select
              id={`${id}-fac`}
              value={filtros.fac}
              onChange={(e) => cambiar("fac", e.target.value)}
              className="min-h-11 max-w-full rounded-full bg-superficie border border-borde-campo pl-4 pr-9 text-[0.95rem] font-semibold cursor-pointer focus:outline-none focus-visible:outline-3 focus-visible:outline-azul"
            >
              <option value="">Todas las facultades</option>
              {facultades.map((f) => (
                <option key={f.id_facultad} value={f.id_facultad}>
                  {facultadCorta(f.nombre)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {categorias.length > 0 && (
        <Chips
          leyenda="Tipo de comida"
          opciones={[{ valor: "", etiqueta: "Todo" }, ...categorias.map((c) => ({ valor: c, etiqueta: c }))]}
          valor={filtros.cat}
          onChange={(v) => cambiar("cat", v)}
          desplazable
        />
      )}

      {hayFiltros && (
        <button type="button" onClick={limpiar} className="inline-flex items-center gap-2 min-h-11 font-semibold text-azul underline underline-offset-4 cursor-pointer hover:text-azul-hondo">
          <FiX aria-hidden="true" /> Quitar filtros
        </button>
      )}
    </section>
  );
}
