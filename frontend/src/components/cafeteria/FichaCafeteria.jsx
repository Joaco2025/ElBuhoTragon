import { memo } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiMapPin } from "react-icons/fi";
import Foto from "../ui/Foto";
import EstadoApertura from "../ui/EstadoApertura";
import { fotoMiniatura } from "../../lib/imagenes";
import { rangoDePrecios } from "../../lib/formato";
import { facultadCorta } from "../../lib/catalogo";

/**
 * Una cafetería en una lista: foto, nombre, dónde está, si está abierta y su rango de precios.
 * Toda la ficha es un solo enlace (una parada de tabulador).
 */
function FichaCafeteria({ tiendita, platillos = [], facultad, ahora, coincidencias = [], visitada = false, prioridad = false }) {
  const rango = rangoDePrecios(platillos);

  return (
    <Link
      to={`/cafeterias/${tiendita.id_tiendita}`}
      className="group flex gap-4 sm:gap-5 rounded-caja bg-superficie p-3 sm:p-4 transition-colors hover:bg-oro-suave/60 active:bg-oro-suave"
    >
      <Foto
        foto={fotoMiniatura(tiendita)}
        prioridad={prioridad}
        sizes="(min-width: 640px) 176px, 112px"
        className="w-28 sm:w-44 shrink-0 rounded-[0.375rem] self-start"
      />
      <div className="min-w-0 flex-1 flex flex-col">
        <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight text-balance group-hover:underline underline-offset-4 decoration-2 decoration-oro">
          {tiendita.nombre}
        </h3>
        {(tiendita.direccion || facultad) && (
          <p className="mt-1 flex items-start gap-1.5 text-[0.92rem] text-tinta-suave">
            <FiMapPin className="mt-1 shrink-0" size={14} aria-hidden="true" />
            <span className="line-clamp-2">{tiendita.direccion || facultadCorta(facultad)}</span>
          </p>
        )}
        <EstadoApertura tiendita={tiendita} ahora={ahora} className="mt-2" />

        {coincidencias.length > 0 && (
          <p className="mt-2 text-[0.92rem] text-tinta line-clamp-2">
            <span className="font-semibold">Tiene: </span>
            {coincidencias.slice(0, 3).map((m) => m.nombre).join(", ")}
            {coincidencias.length > 3 && ` y ${coincidencias.length - 3} más`}
          </p>
        )}

        <div className="mt-auto pt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {rango && <span className="font-display text-lg font-semibold cifras">{rango}</span>}
          <span className="text-sm text-tinta-suave cifras">
            {platillos.length ? `${platillos.length} platillos` : "Menú sin registrar"}
          </span>
          {visitada && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-abierto">
              <FiCheck aria-hidden="true" /> Visitada
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(FichaCafeteria);
