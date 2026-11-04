import { useId, useRef } from "react";

/**
 * Pestañas accesibles (patrón WAI-ARIA): flechas izquierda/derecha, Inicio y Fin.
 * pestanas: [{id, etiqueta, contenido}]
 */
export default function Pestanas({ pestanas, activa, onChange, etiqueta }) {
  const base = useId();
  const refs = useRef({});

  const mover = (e, i) => {
    const total = pestanas.length;
    const destino = { ArrowRight: (i + 1) % total, ArrowLeft: (i - 1 + total) % total, Home: 0, End: total - 1 }[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    const id = pestanas[destino].id;
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={etiqueta} className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-1">
        {pestanas.map((p, i) => {
          const seleccionada = p.id === activa;
          return (
            <button
              key={p.id}
              ref={(el) => (refs.current[p.id] = el)}
              type="button"
              role="tab"
              id={`${base}-tab-${p.id}`}
              aria-selected={seleccionada}
              aria-controls={`${base}-panel-${p.id}`}
              tabIndex={seleccionada ? 0 : -1}
              onClick={() => onChange(p.id)}
              onKeyDown={(e) => mover(e, i)}
              className={`shrink-0 min-h-11 px-4 rounded-full font-semibold cursor-pointer transition-colors cifras ${
                seleccionada ? "bg-tinta text-sobre-tinta" : "text-tinta-suave hover:bg-hundido hover:text-tinta"
              }`}
            >
              {p.etiqueta}
            </button>
          );
        })}
      </div>
      {pestanas.map((p) => (
        <div
          key={p.id}
          role="tabpanel"
          id={`${base}-panel-${p.id}`}
          aria-labelledby={`${base}-tab-${p.id}`}
          hidden={p.id !== activa}
          tabIndex={0}
          className="mt-5 focus-visible:outline-offset-4"
        >
          {p.id === activa && p.contenido}
        </div>
      ))}
    </div>
  );
}
