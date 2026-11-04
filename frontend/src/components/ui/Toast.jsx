import { useCallback, useRef, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { ContextoToast } from "./contextoToast";

/** Notificaciones breves tras una acción ("Reseña publicada"). Una a la vez. */
export function ProveedorToast({ children }) {
  const [toast, setToast] = useState(null);
  const temporizador = useRef(null);

  const mostrar = useCallback((mensaje, tipo = "exito") => {
    clearTimeout(temporizador.current);
    setToast({ mensaje, tipo, clave: Date.now() });
    temporizador.current = setTimeout(() => setToast(null), 5000);
  }, []);

  return (
    <ContextoToast.Provider value={mostrar}>
      {children}
      {/* La región viva existe siempre para que los lectores de pantalla anuncien el cambio */}
      <div aria-live="polite" className="fixed inset-x-0 bottom-4 z-[120] flex justify-center px-4 pointer-events-none">
        {toast && (
          <div
            key={toast.clave}
            className={`zona-oscura pointer-events-auto animate-aparecer flex items-center gap-3 rounded-full pl-4 pr-1.5 py-1.5 shadow-[0_12px_32px_-8px_rgba(14,34,70,0.45)] text-[0.95rem] font-medium ${
              toast.tipo === "error" ? "bg-error text-fondo" : "bg-zona text-white"
            }`}
          >
            {toast.tipo === "error" ? <FiAlertCircle aria-hidden="true" /> : <FiCheckCircle aria-hidden="true" className="text-oro" />}
            <span>{toast.mensaje}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/15 cursor-pointer"
              aria-label="Cerrar aviso"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </ContextoToast.Provider>
  );
}

