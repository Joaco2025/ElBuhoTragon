import { Link } from "react-router-dom";
import { precio, nombreCorto } from "../../lib/formato";
import { primeraApertura } from "../../lib/horario";
import { ILUSTRACIONES } from "../../lib/imagenes";
import Esqueleto from "../ui/Esqueleto";

/**
 * La pizarra de precios del inicio: lo más barato que se puede comer ahora mismo, con
 * la cafetería que lo sirve. Si todo está cerrado, dice a qué hora abren.
 */
export default function Pizarra({ platillos, tienditas, cargando, abiertas }) {
  const porId = Object.fromEntries(tienditas.map((t) => [t.id_tiendita, t]));

  return (
    <section aria-labelledby="pizarra-titulo" className="zona-oscura relative rounded-2xl bg-zona text-white p-5 sm:p-7 lg:p-8 overflow-hidden">
      <img
        src={abiertas || cargando ? ILUSTRACIONES.carta : ILUSTRACIONES.dormido}
        alt=""
        width="160"
        height="160"
        className="absolute -right-3 -top-2 h-24 w-24 sm:h-32 sm:w-32 object-contain"
      />
      <h2 id="pizarra-titulo" className="font-display text-2xl sm:text-[1.75rem] font-semibold leading-tight pr-24 sm:pr-32">
        {cargando ? "Revisando la pizarra" : abiertas ? "Lo más barato para comer ahora" : "Todo cerrado por ahora"}
      </h2>
      <p className="mt-1 text-tinta-clara pr-24 sm:pr-28 cifras">
        {cargando
          ? "Un momento"
          : abiertas
            ? `${abiertas} ${abiertas === 1 ? "cafetería abierta" : "cafeterías abiertas"} en el campus`
            : `La primera abre a las ${primeraApertura(tienditas) ?? "7:00"}. Puedes revisar los menús mientras.`}
      </p>

      {cargando ? (
        <div className="mt-6 space-y-4" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <Esqueleto key={i} className="h-10 bg-white/10" />
          ))}
        </div>
      ) : (
        platillos.length > 0 && (
          <ul className="mt-6 space-y-1">
            {platillos.map((m) => (
              <li key={m.id_menu}>
                <Link
                  to={`/cafeterias/${m.id_tiendita}`}
                  className="group flex items-baseline gap-3 rounded-caja -mx-2 px-2 py-2 hover:bg-white/10"
                >
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] font-semibold leading-snug group-hover:underline underline-offset-4">{m.nombre}</span>
                    <span className="block text-sm text-tinta-clara">{nombreCorto(porId[m.id_tiendita]?.nombre)}</span>
                  </span>
                  {/* Puntos guía, como en la carta impresa */}
                  <span aria-hidden="true" className="flex-1 min-w-6 translate-y-[-0.3em] border-b-2 border-dotted border-white/25" />
                  <span className="font-display text-2xl sm:text-[1.7rem] font-semibold text-oro cifras">{precio(m.precio)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
