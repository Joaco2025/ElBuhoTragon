import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { useAtraparFoco } from "../../hooks/useAtraparFoco";

/**
 * Ventana modal accesible. `ancho`: clase de max-width.
 * `pie`: botones de acción, alineados a la derecha.
 */
export default function Dialogo({ abierto, titulo, descripcion, alCerrar, children, pie, ancho = "max-w-lg" }) {
  const ref = useRef(null);
  const id = useId();
  useAtraparFoco(ref, abierto, alCerrar);
  if (!abierto) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-velo/60 animate-aparecer" onClick={alCerrar} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-titulo`}
        aria-describedby={descripcion ? `${id}-desc` : undefined}
        className={`relative w-full ${ancho} max-h-[92dvh] flex flex-col bg-superficie rounded-t-2xl sm:rounded-2xl shadow-[0_24px_64px_-12px_rgba(14,34,70,0.5)] animate-aparecer`}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6 pb-3">
          <div>
            <h2 id={`${id}-titulo`} className="font-display text-2xl sm:text-[1.75rem] leading-tight font-semibold">
              {titulo}
            </h2>
            {descripcion && (
              <p id={`${id}-desc`} className="mt-1.5 text-tinta-suave">
                {descripcion}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={alCerrar}
            className="-mr-2 h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer"
            aria-label="Cerrar"
          >
            <FiX size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 pb-5">{children}</div>
        {pie && <div className="flex flex-wrap justify-end gap-3 px-5 sm:px-7 py-4 bg-fondo rounded-b-2xl">{pie}</div>}
      </div>
    </div>,
    document.body
  );
}
