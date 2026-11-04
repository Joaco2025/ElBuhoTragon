import { useEffect, useRef } from "react";

const ENFOCABLES = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Diálogos abiertos, el último arriba: solo ese atiende Escape y Tab (p. ej. una
// confirmación abierta dentro del editor del admin)
const pila = [];

/** Atrapa el foco dentro de `ref` mientras `activo`, cierra con Escape y devuelve el foco al salir */
export function useAtraparFoco(ref, activo, alCerrar) {
  const cerrarActual = useRef(alCerrar);
  useEffect(() => {
    cerrarActual.current = alCerrar;
  });

  useEffect(() => {
    if (!activo) return;
    const anterior = document.activeElement;
    const nodo = ref.current;
    const primero = nodo?.querySelector("[data-autofocus]") || nodo?.querySelector(ENFOCABLES);
    primero?.focus();
    const marca = {};
    pila.push(marca);

    const alTeclear = (e) => {
      if (pila[pila.length - 1] !== marca) return;
      if (e.key === "Escape") {
        cerrarActual.current?.();
        return;
      }
      if (e.key !== "Tab" || !nodo) return;
      const lista = [...nodo.querySelectorAll(ENFOCABLES)].filter((el) => el.offsetParent !== null);
      if (!lista.length) return;
      const [inicio, fin] = [lista[0], lista[lista.length - 1]];
      if (e.shiftKey && document.activeElement === inicio) {
        fin.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === fin) {
        inicio.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", alTeclear);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      pila.splice(pila.indexOf(marca), 1);
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflow;
      anterior?.focus?.();
    };
  }, [activo, ref]);
}
