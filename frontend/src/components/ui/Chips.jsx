import { useId } from "react";

/**
 * Opciones excluyentes con aspecto de botones (radios nativos: flechas del teclado,
 * lectores de pantalla y formulario funcionan sin código extra).
 * opciones: [{valor, etiqueta}]
 * desplazable: en pantallas chicas, una sola fila con scroll horizontal en vez de varias
 */
export default function Chips({ leyenda, opciones, valor, onChange, ocultarLeyenda = false, desplazable = false, className = "" }) {
  const nombre = useId();
  return (
    <fieldset className={className}>
      <legend className={ocultarLeyenda ? "sr-only" : "text-sm font-semibold mb-2"}>{leyenda}</legend>
      <div className={`flex gap-2 ${desplazable ? "max-sm:-mx-4 max-sm:px-4 max-sm:overflow-x-auto max-sm:pb-1 sm:flex-wrap [scrollbar-width:none]" : "flex-wrap"}`}>
        {opciones.map((o) => {
          const activo = String(valor) === String(o.valor);
          return (
            <label
              key={o.valor}
              className={`shrink-0 inline-flex items-center min-h-11 px-4 rounded-full text-[0.95rem] font-semibold cursor-pointer select-none transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-foco has-[:focus-visible]:outline-offset-2 ${
                activo ? "bg-tinta text-sobre-tinta" : "bg-superficie text-tinta hover:bg-hundido"
              }`}
            >
              <input type="radio" name={nombre} value={o.valor} checked={activo} onChange={() => onChange(o.valor)} className="sr-only" />
              {o.etiqueta}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
