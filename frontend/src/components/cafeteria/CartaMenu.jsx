import { useDeferredValue, useId, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { normalizar, precio } from "../../lib/formato";

const SIN_CATEGORIA = "Otros";

function agrupar(platillos) {
  const grupos = new Map();
  for (const p of platillos) {
    const cat = p.categoria || SIN_CATEGORIA;
    if (!grupos.has(cat)) grupos.set(cat, []);
    grupos.get(cat).push(p);
  }
  for (const lista of grupos.values()) lista.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
  // Las categorías con más platillos primero; "Otros" al final
  return [...grupos.entries()].sort((a, b) => (a[0] === SIN_CATEGORIA) - (b[0] === SIN_CATEGORIA) || b[1].length - a[1].length);
}

const anclaDe = (cat) => `carta-${normalizar(cat).replace(/[^a-z0-9]+/g, "-")}`;

/** La carta de una cafetería: buscador, atajos por categoría y platillos con su precio */
export default function CartaMenu({ platillos }) {
  const id = useId();
  const [busqueda, setBusqueda] = useState("");
  const termino = normalizar(useDeferredValue(busqueda));

  const filtrados = useMemo(
    () =>
      termino
        ? platillos.filter((p) => normalizar(`${p.nombre} ${p.descripcion || ""} ${p.categoria || ""}`).includes(termino))
        : platillos,
    [platillos, termino]
  );
  const grupos = useMemo(() => agrupar(filtrados), [filtrados]);

  if (!platillos.length) {
    return <p className="mt-4 text-lg text-tinta-suave">Esta cafetería todavía no tiene su menú registrado.</p>;
  }

  return (
    <div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {grupos.length > 1 && !termino && (
          <nav aria-label="Categorías de la carta" className="-mx-1 flex gap-2 overflow-x-auto pb-1 px-1">
            {grupos.map(([cat, lista]) => (
              <a
                key={cat}
                href={`#${anclaDe(cat)}`}
                className="shrink-0 inline-flex items-center min-h-11 px-4 rounded-full bg-superficie font-semibold hover:bg-hundido cifras"
              >
                {cat} <span className="ml-1.5 text-tinta-suave font-medium">{lista.length}</span>
              </a>
            ))}
          </nav>
        )}
        <div className="relative sm:ml-auto sm:w-72 shrink-0">
          <label htmlFor={`${id}-buscar`} className="sr-only">
            Buscar en esta carta
          </label>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tinta-suave" aria-hidden="true" />
          <input
            id={`${id}-buscar`}
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar en la carta"
            className="w-full min-h-11 rounded-full bg-superficie border border-borde-campo pl-11 pr-11 focus:outline-none focus-visible:outline-3 focus-visible:outline-foco [&::-webkit-search-cancel-button]:hidden"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="absolute right-0.5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido cursor-pointer"
              aria-label="Borrar búsqueda en la carta"
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {termino && (
        <p className="mt-4 text-tinta-suave cifras" aria-live="polite">
          {filtrados.length ? `${filtrados.length} de ${platillos.length} platillos` : "Ningún platillo coincide con tu búsqueda."}
        </p>
      )}

      <div className="mt-6 space-y-10">
        {grupos.map(([cat, lista]) => (
          <section key={cat} id={anclaDe(cat)} aria-labelledby={`${anclaDe(cat)}-t`} className="scroll-mt-24">
            <h3 id={`${anclaDe(cat)}-t`} className="font-display text-2xl font-semibold">
              {cat}
            </h3>
            <ul className="mt-2 divide-y divide-hundido">
              {lista.map((p) => (
                <li key={p.id_menu} className="flex items-baseline gap-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[1.05rem] leading-snug">{p.nombre}</p>
                    {p.descripcion && <p className="mt-0.5 text-[0.95rem] text-tinta-suave max-w-prose">{p.descripcion}</p>}
                  </div>
                  <p className="font-display text-xl sm:text-2xl font-semibold cifras whitespace-nowrap">{precio(p.precio) ?? "Sin precio"}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
