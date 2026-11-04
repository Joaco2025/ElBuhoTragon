// Tema de color: "oscuro" (por defecto) o "claro". Se guarda en localStorage por visitante;
// index.html lo aplica antes de pintar y aquí se cambia en vivo.
import { useEffect, useState } from "react";

const LLAVE = "tema";
const EVENTO = "tema-cambiado";
// Debe coincidir con --color-fondo de cada tema (barra del navegador en móvil)
const COLOR_BARRA = { oscuro: "#0B1730", claro: "#F4F6F9" };

export function temaActual() {
  return document.documentElement.dataset.tema === "claro" ? "claro" : "oscuro";
}

export function aplicarTema(tema) {
  const raiz = document.documentElement;
  if (tema === "claro") raiz.dataset.tema = "claro";
  else delete raiz.dataset.tema;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLOR_BARRA[tema]);
  try {
    localStorage.setItem(LLAVE, tema);
  } catch {
    // Navegación privada o almacenamiento bloqueado: el tema dura lo que la pestaña
  }
  window.dispatchEvent(new Event(EVENTO));
}

/** [tema, alternar] */
export function useTema() {
  const [tema, setTema] = useState(temaActual);
  useEffect(() => {
    const actualizar = () => setTema(temaActual());
    window.addEventListener(EVENTO, actualizar);
    return () => window.removeEventListener(EVENTO, actualizar);
  }, []);
  return [tema, () => aplicarTema(tema === "oscuro" ? "claro" : "oscuro")];
}
