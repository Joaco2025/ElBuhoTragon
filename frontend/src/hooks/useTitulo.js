import { useEffect } from "react";

/** Título de la pestaña: "<página> · El Búho Tragón" */
export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · El Búho Tragón` : "El Búho Tragón · Cafeterías de la UNISON";
  }, [titulo]);
}
