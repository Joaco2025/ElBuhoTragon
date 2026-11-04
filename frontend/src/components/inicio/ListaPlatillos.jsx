import { useState } from "react";
import { Link } from "react-router-dom";
import { precio, nombreCorto } from "../../lib/formato";
import { estadoApertura } from "../../lib/horario";

const POR_PAGINA = 12;

/** Resultados por platillo: del más barato al más caro, con la cafetería que lo vende */
export default function ListaPlatillos({ platillos, tiendaPorId, ahora }) {
  const [visibles, setVisibles] = useState(POR_PAGINA);
  const mostrados = platillos.slice(0, visibles);

  return (
    <>
      <ul className="grid gap-x-8 md:grid-cols-2">
        {mostrados.map((m) => {
          const tienda = tiendaPorId[m.id_tiendita];
          const abierta = estadoApertura(tienda, ahora).abierta;
          return (
            <li key={m.id_menu}>
              <Link
                to={`/cafeterias/${m.id_tiendita}`}
                className="group flex items-baseline gap-4 rounded-caja -mx-3 px-3 py-3 hover:bg-superficie"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[1.05rem] leading-snug group-hover:underline underline-offset-4 decoration-oro decoration-2">
                    {m.nombre}
                  </span>
                  <span className="block text-sm text-tinta-suave">
                    {nombreCorto(tienda?.nombre)}
                    <span className={abierta ? "text-abierto font-semibold" : ""}>{abierta ? " · abierta" : " · cerrada"}</span>
                    {m.categoria ? ` · ${m.categoria}` : ""}
                  </span>
                </span>
                <span className="font-display text-2xl font-semibold cifras">{precio(m.precio) ?? "s/p"}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {platillos.length > visibles && (
        <button
          type="button"
          onClick={() => setVisibles((v) => v + POR_PAGINA * 2)}
          className="mt-4 min-h-11 px-5 rounded-full bg-superficie font-semibold hover:bg-hundido cursor-pointer cifras"
        >
          Ver más platillos ({platillos.length - visibles} restantes)
        </button>
      )}
    </>
  );
}
