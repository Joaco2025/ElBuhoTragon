import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "../chat/ChatWidget";
import { ContextoAsistente } from "../chat/contextoAsistente";
import { ProveedorToast } from "../ui/Toast";
import Esqueleto from "../ui/Esqueleto";
import { Contenedor } from "./EncabezadoPagina";

function CargandoPagina() {
  return (
    <Contenedor className="pt-10" aria-busy="true">
      <span className="sr-only">Cargando página</span>
      <Esqueleto className="h-12 w-2/3 max-w-xl" />
      <Esqueleto className="h-5 w-1/2 max-w-md mt-4" />
      <Esqueleto className="h-64 w-full mt-10" />
    </Contenedor>
  );
}

/** Estructura común: header, contenido de la ruta, pie y el asistente (montados una vez) */
export default function AppShell() {
  const { pathname } = useLocation();
  const [asistente, setAsistente] = useState({ abierto: false, pregunta: "" });

  // Cada página nueva empieza arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const abrir = useCallback((pregunta = "") => setAsistente({ abierto: true, pregunta }), []);
  const cerrar = useCallback(() => setAsistente((a) => ({ ...a, abierto: false })), []);
  const alternar = useCallback(() => setAsistente((a) => ({ abierto: !a.abierto, pregunta: "" })), []);
  const valor = useMemo(() => ({ ...asistente, abrir, cerrar, alternar }), [asistente, abrir, cerrar, alternar]);

  return (
    <ProveedorToast>
      <ContextoAsistente.Provider value={valor}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200] focus:rounded-full focus:bg-tinta focus:px-5 focus:py-3 focus:text-white zona-oscura"
        >
          Saltar al contenido
        </a>
        <div className="min-h-dvh flex flex-col">
          <Header />
          <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
            <Suspense fallback={<CargandoPagina />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
        <ChatWidget />
      </ContextoAsistente.Provider>
    </ProveedorToast>
  );
}
