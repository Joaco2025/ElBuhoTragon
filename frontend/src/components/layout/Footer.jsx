import { Link } from "react-router-dom";
import UnisonLogo from "../../assets/unison-logo.png";
import { ILUSTRACIONES } from "../../lib/imagenes";

const enlace = "inline-flex min-h-11 items-center text-tinta-clara hover:text-white underline-offset-4 hover:underline";

export default function Footer() {
  return (
    <footer className="zona-oscura bg-azul-hondo text-white mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
          <div className="flex items-start gap-4">
            <img src={ILUSTRACIONES.carta} alt="" width="72" height="72" className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] object-contain shrink-0" />
            <div>
              <p translate="no" className="font-display text-3xl sm:text-4xl font-bold leading-none tracking-tight">El Búho Tragón</p>
              <p className="mt-3 max-w-sm text-tinta-clara">
                Precios, menús y horarios de las cafeterías de la Universidad de Sonora, campus Hermosillo.
              </p>
            </div>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-6 md:col-span-1">
            <Link to="/" className={enlace}>Explorar</Link>
            <Link to="/facultad" className={enlace}>Mapa</Link>
            <Link to="/contacto" className={enlace}>Contacto</Link>
            <Link to="/terminos" className={enlace}>Términos</Link>
            <Link to="/privacidad" className={enlace}>Privacidad</Link>
          </nav>

          <div className="md:justify-self-end">
            <img src={UnisonLogo} alt="Universidad de Sonora" width="160" height="55" className="h-12 w-auto object-contain brightness-0 invert" loading="lazy" />
          </div>
        </div>

        <p className="mt-12 text-sm text-tinta-clara">
          Proyecto de Ingeniería de Software II, Departamento de Matemáticas. No es un sitio oficial de la UNISON.
          <span className="block sm:inline sm:ml-1">© {new Date().getFullYear()} El Búho Tragón.</span>
        </p>
      </div>
    </footer>
  );
}
