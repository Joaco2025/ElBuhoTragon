// Mapa del campus: /facultad
import { Suspense, lazy, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import EncabezadoPagina, { Contenedor } from "../components/layout/EncabezadoPagina";
import EstadoApertura from "../components/ui/EstadoApertura";
import EstadoVacio from "../components/ui/EstadoVacio";
import Esqueleto from "../components/ui/Esqueleto";
import Boton from "../components/ui/Boton";
import { puntoDeTiendita } from "../components/map/puntos";
import { useCatalogo } from "../hooks/useCatalogo";
import { useAhora } from "../hooks/useAhora";
import { useTitulo } from "../hooks/useTitulo";
import { estadoApertura } from "../lib/horario";
import { facultadCorta } from "../lib/catalogo";

// MapLibre pesa ~300 KB comprimido: solo se descarga en las páginas con mapa
const BuhoMap = lazy(() => import("../components/map/BuhoMap"));

export default function Facultad() {
  useTitulo("Mapa del campus");
  const navigate = useNavigate();
  const ahora = useAhora();
  const { tienditas, facultadPorId, cargando, error, recargar } = useCatalogo();

  const puntos = useMemo(() => tienditas.map(puntoDeTiendita).filter(Boolean), [tienditas]);
  const abrir = useCallback((punto) => navigate(`/cafeterias/${punto.id}`), [navigate]);

  // La misma información que el mapa, como lista (también para quien navega con teclado o lector)
  const lista = useMemo(
    () =>
      [...tienditas].sort(
        (a, b) => Number(estadoApertura(b, ahora).abierta) - Number(estadoApertura(a, ahora).abierta) || a.nombre.localeCompare(b.nombre)
      ),
    [tienditas, ahora]
  );

  return (
    <Contenedor className="pt-8 sm:pt-12">
      <EncabezadoPagina
        titulo="Mapa del campus"
        descripcion="Dónde está cada cafetería de la Unidad Regional Centro. Toca un punto para ver su horario y abrir su menú."
      />

      {error ? (
        <EstadoVacio titulo="No se pudieron cargar las cafeterías" accion={<Boton onClick={recargar}>Reintentar</Boton>} className="mt-8">
          Revisa tu conexión e inténtalo otra vez.
        </EstadoVacio>
      ) : (
        <div className="mt-8 sm:mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section aria-label="Mapa interactivo" className="relative h-[60dvh] min-h-[420px] lg:h-[72dvh] overflow-hidden rounded-2xl bg-hundido max-sm:-mx-4 max-sm:rounded-none">
            <Suspense fallback={<div className="h-full w-full bg-hundido" />}>
              <BuhoMap puntos={puntos} onAbrirPunto={abrir} />
            </Suspense>
            {cargando && (
              <p className="absolute right-3 top-3 rounded-full bg-superficie px-4 py-2 text-sm font-semibold shadow" role="status">
                Ubicando cafeterías…
              </p>
            )}
          </section>

          <section aria-labelledby="titulo-lista-mapa" className="lg:max-h-[72dvh] lg:overflow-y-auto lg:pr-1">
            <h2 id="titulo-lista-mapa" className="font-display text-2xl font-semibold">
              {cargando ? "Cafeterías" : `${tienditas.length} cafeterías`}
            </h2>
            {cargando ? (
              <div className="mt-4 space-y-2" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                  <Esqueleto key={i} className="h-16" />
                ))}
              </div>
            ) : (
              <ul className="mt-3 space-y-1">
                {lista.map((t) => (
                  <li key={t.id_tiendita}>
                    <Link to={`/cafeterias/${t.id_tiendita}`} className="block rounded-caja px-3 py-2.5 -mx-3 hover:bg-superficie">
                      <span className="block font-semibold leading-snug">{t.nombre}</span>
                      <span className="block text-sm text-tinta-suave">{t.direccion || facultadCorta(facultadPorId[t.id_facultad])}</span>
                      <EstadoApertura tiendita={t} ahora={ahora} className="mt-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </Contenedor>
  );
}
