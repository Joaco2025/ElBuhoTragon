import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiMessageCircle, FiMoon, FiSun, FiX } from "react-icons/fi";
import { PASAPORTE_ACTIVO } from "../../config";
import { cerrarSesion, useSesion } from "../../lib/sesion";
import { ILUSTRACIONES } from "../../lib/imagenes";
import { useTema } from "../../lib/tema";
import { useAsistente } from "../chat/contextoAsistente";
import { clasesBoton } from "../ui/clasesBoton";

function enlaces(sesion) {
  return [
    { to: "/", texto: "Explorar", fin: true },
    { to: "/facultad", texto: "Mapa" },
    PASAPORTE_ACTIVO && { to: "/cafeterias", texto: "Pasaporte", fin: true },
    sesion?.esAdmin && { to: "/admin/dashboard", texto: "Administrar" },
  ].filter(Boolean);
}

const claseEnlace = ({ isActive }) =>
  `relative inline-flex items-center h-11 px-3 rounded-full text-[0.95rem] font-semibold transition-colors ${
    isActive ? "bg-hundido text-tinta" : "text-tinta-suave hover:text-tinta hover:bg-hundido"
  }`;

export default function Header() {
  const sesion = useSesion();
  const asistente = useAsistente();
  const [tema, alternarTema] = useTema();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const panel = useRef(null);
  const botonMenu = useRef(null);

  // Cerrar el menú móvil al navegar
  useEffect(() => setMenuAbierto(false), [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;
    panel.current?.querySelector("a, button")?.focus();
    const alTeclear = (e) => {
      if (e.key === "Escape") {
        setMenuAbierto(false);
        botonMenu.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [menuAbierto]);

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  const lista = enlaces(sesion);

  return (
    <header className="sticky top-0 z-50 bg-superficie">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-[4.5rem] flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 rounded-full pr-2" aria-label="El Búho Tragón, inicio">
          <img src={ILUSTRACIONES.carta} alt="" width="44" height="44" className="h-10 w-10 sm:h-11 sm:w-11 object-contain" />
          <span translate="no" className="font-display text-[1.35rem] sm:text-2xl font-bold leading-none tracking-tight">El Búho Tragón</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex items-center gap-1 ml-4">
          {lista.map((e) => (
            <NavLink key={e.to} to={e.to} end={e.fin} className={claseEnlace}>
              {e.texto}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => asistente.alternar()}
            aria-expanded={asistente.abierto}
            aria-controls="asistente"
            className={clasesBoton({ variante: "oro", tamano: "chico", className: "whitespace-nowrap max-lg:h-11 max-lg:w-11 max-lg:px-0 max-lg:justify-center" })}
          >
            <FiMessageCircle size={18} aria-hidden="true" />
            <span className="max-lg:sr-only">Pregúntale al Buhito</span>
          </button>

          <button
            type="button"
            onClick={alternarTema}
            title={tema === "oscuro" ? "Modo claro" : "Modo oscuro"}
            className="max-md:hidden h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer transition-colors"
          >
            {tema === "oscuro" ? <FiSun size={20} aria-hidden="true" /> : <FiMoon size={20} aria-hidden="true" />}
            <span className="sr-only">{tema === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}</span>
          </button>

          <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
            {sesion ? (
              <>
                <span className="text-sm text-tinta-suave px-2 max-lg:hidden">
                  Hola, <strong className="text-tinta font-semibold">{sesion.usuario}</strong>
                </span>
                <button type="button" onClick={salir} className={clasesBoton({ variante: "fantasma", tamano: "chico" })}>
                  <FiLogOut aria-hidden="true" />
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={clasesBoton({ variante: "fantasma", tamano: "chico" })}>
                  Iniciar sesión
                </Link>
                <Link to="/registro" className={clasesBoton({ variante: "primario", tamano: "chico" })}>
                  Crear cuenta
                </Link>
              </>
            )}
          </div>

          <button
            ref={botonMenu}
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            className="md:hidden h-11 w-11 rounded-full flex items-center justify-center bg-hundido text-tinta cursor-pointer"
          >
            {menuAbierto ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
            <span className="sr-only">{menuAbierto ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div
          id="menu-movil"
          ref={panel}
          className="md:hidden absolute inset-x-0 top-full bg-superficie shadow-[0_16px_32px_-12px_rgba(14,34,70,0.35)] animate-aparecer max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
        >
          <nav aria-label="Principal" className="px-4 pt-2 pb-4 flex flex-col gap-1">
            {lista.map((e) => (
              <NavLink
                key={e.to}
                to={e.to}
                end={e.fin}
                className={({ isActive }) =>
                  `flex items-center min-h-12 px-4 rounded-caja text-lg font-semibold ${isActive ? "bg-hundido" : "hover:bg-hundido"}`
                }
              >
                {e.texto}
              </NavLink>
            ))}
          </nav>
          <div className="px-4 pb-2">
            <button
              type="button"
              onClick={alternarTema}
              className="w-full flex items-center gap-3 min-h-12 px-4 rounded-caja text-lg font-semibold hover:bg-hundido cursor-pointer"
            >
              {tema === "oscuro" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              {tema === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            </button>
          </div>
          <div className="px-4 pb-5 pt-1">
            {sesion ? (
              <div className="flex items-center justify-between gap-3 bg-fondo rounded-caja px-4 py-3">
                <span className="text-tinta-suave">
                  Sesión de <strong className="text-tinta">{sesion.usuario}</strong>
                </span>
                <button type="button" onClick={salir} className={clasesBoton({ variante: "secundario", tamano: "chico" })}>
                  <FiLogOut aria-hidden="true" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className={clasesBoton({ variante: "secundario", className: "justify-center" })}>
                  Iniciar sesión
                </Link>
                <Link to="/registro" className={clasesBoton({ variante: "primario", className: "justify-center" })}>
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
