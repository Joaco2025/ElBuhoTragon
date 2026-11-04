// Ficha de una cafetería: /cafeterias/:id
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock, FiExternalLink, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { Contenedor } from "../components/layout/EncabezadoPagina";
import CartaMenu from "../components/cafeteria/CartaMenu";
import Resenas from "../components/cafeteria/Resenas";
import { useAsistente } from "../components/chat/contextoAsistente";
import Boton from "../components/ui/Boton";
import { clasesBoton } from "../components/ui/clasesBoton";
import EstadoApertura from "../components/ui/EstadoApertura";
import EstadoVacio from "../components/ui/EstadoVacio";
import Esqueleto from "../components/ui/Esqueleto";
import Foto from "../components/ui/Foto";
import { puntoDeTiendita } from "../components/map/puntos";
import { useAhora } from "../hooks/useAhora";
import { useTitulo } from "../hooks/useTitulo";
import { catalogoEnMemoria, pedir } from "../lib/api";
import { facultadCorta } from "../lib/catalogo";
import { rangoDePrecios } from "../lib/formato";
import { rangoHorario } from "../lib/horario";
import { fotoPrincipal } from "../lib/imagenes";
import { repararTexto, repararPlatillo } from "../lib/texto";

// MapLibre pesa ~300 KB comprimido: solo se descarga cuando la página muestra el mapa
const BuhoMap = lazy(() => import("../components/map/BuhoMap"));

/** Cafetería y su menú: del catálogo ya descargado si existe, si no de la API */
async function cargarCafeteria(id) {
  const enMemoria = await catalogoEnMemoria();
  const tiendita = enMemoria?.tienditas.find((t) => String(t.id_tiendita) === String(id));
  if (tiendita) {
    return {
      tiendita,
      menu: enMemoria.menus.filter((m) => m.id_tiendita === tiendita.id_tiendita),
      facultades: enMemoria.facultades,
    };
  }
  const [t, menu, facultades] = await Promise.all([
    pedir(`/api/Tienditas/${id}/?sin_imagen=1`),
    pedir(`/api/Menus/?id_tiendita=${id}`),
    pedir("/api/Facultades/").catch(() => []),
  ]);
  return { tiendita: t, menu: Array.isArray(menu) ? menu.map(repararPlatillo) : [], facultades };
}

export default function PlantillaCafeteria() {
  const { id } = useParams();
  const ahora = useAhora();
  const asistente = useAsistente();
  const [estado, setEstado] = useState({ cargando: true, error: null, datos: null });
  const [resenas, setResenas] = useState({ lista: [], cargando: true, error: false });

  const cargarResenas = useCallback(() => {
    setResenas((r) => ({ ...r, cargando: true, error: false }));
    pedir(`/api/Resenas/?id_tiendita=${id}`)
      .then((d) =>
        setResenas({
          lista: Array.isArray(d) ? d.map((r) => ({ ...r, comentario: repararTexto(r.comentario) })) : [],
          cargando: false,
          error: false,
        })
      )
      .catch(() => setResenas({ lista: [], cargando: false, error: true }));
  }, [id]);

  const cargar = useCallback(() => {
    let vigente = true;
    setEstado({ cargando: true, error: null, datos: null });
    cargarCafeteria(id)
      .then((datos) => vigente && setEstado({ cargando: false, error: null, datos }))
      .catch((error) => vigente && setEstado({ cargando: false, error, datos: null }));
    return () => {
      vigente = false;
    };
  }, [id]);

  useEffect(() => cargar(), [cargar]);
  useEffect(() => cargarResenas(), [cargarResenas]);

  const tiendita = estado.datos?.tiendita;
  useTitulo(tiendita?.nombre ?? (estado.error ? "Cafetería no encontrada" : "Cafetería"));

  // Memorizados para que el mapa no rehaga el marcador en cada render
  const puntoMapa = useMemo(() => (tiendita ? [puntoDeTiendita(tiendita)].filter(Boolean) : []), [tiendita]);
  const centroMapa = useMemo(() => (puntoMapa[0] ? [puntoMapa[0].lat, puntoMapa[0].lon] : null), [puntoMapa]);

  if (estado.cargando) {
    return (
      <Contenedor className="pt-8" aria-busy="true">
        <span className="sr-only">Cargando cafetería</span>
        <Esqueleto className="h-5 w-40" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_440px]">
          <div className="space-y-4">
            <Esqueleto className="h-14 w-4/5" />
            <Esqueleto className="h-6 w-1/2" />
            <Esqueleto className="h-6 w-2/3" />
          </div>
          <Esqueleto className="aspect-[4/3]" />
        </div>
        <div className="mt-14 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Esqueleto key={i} className="h-12" />
          ))}
        </div>
      </Contenedor>
    );
  }

  if (estado.error) {
    const noExiste = estado.error.status === 404;
    return (
      <Contenedor className="pt-10">
        <EstadoVacio
          nivel="h1"
          titulo={noExiste ? "No encontramos esa cafetería" : "No se pudo cargar la cafetería"}
          accion={
            <>
              {!noExiste && <Boton onClick={cargar}>Reintentar</Boton>}
              <Boton to="/" variante={noExiste ? "primario" : "secundario"}>
                Ver todas las cafeterías
              </Boton>
            </>
          }
        >
          {noExiste
            ? "Puede que se haya dado de baja o que el enlace esté incompleto."
            : "El servidor no respondió. Revisa tu conexión e inténtalo de nuevo."}
        </EstadoVacio>
      </Contenedor>
    );
  }

  const { menu, facultades } = estado.datos;
  const facultad = facultades?.find((f) => f.id_facultad === tiendita.id_facultad)?.nombre;
  const horario = rangoHorario(tiendita);
  const rango = rangoDePrecios(menu);
  const destino = puntoMapa[0]
    ? `https://www.google.com/maps/dir/?api=1&destination=${puntoMapa[0].lat},${puntoMapa[0].lon}&travelmode=walking`
    : null;

  return (
    <>
      <Contenedor className="pt-6 sm:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 min-h-11 font-semibold text-enlace hover:underline underline-offset-4">
          <FiArrowLeft aria-hidden="true" /> Todas las cafeterías
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_440px] lg:gap-14 lg:items-center">
          <div>
            <h1 className="font-display text-[2.5rem] leading-[1.02] sm:text-6xl font-semibold tracking-tight text-balance">{tiendita.nombre}</h1>
            <div className="mt-5 space-y-2.5 text-[1.05rem]">
              <EstadoApertura tiendita={tiendita} ahora={ahora} grande />
              {horario && (
                <p className="flex items-center gap-2.5 cifras">
                  <FiClock className="shrink-0 text-tinta-suave" aria-hidden="true" />
                  <span>
                    Horario: {horario} <span className="text-tinta-suave">(según el calendario escolar)</span>
                  </span>
                </p>
              )}
              {(tiendita.direccion || facultad) && (
                <p className="flex items-start gap-2.5">
                  <FiMapPin className="mt-1 shrink-0 text-tinta-suave" aria-hidden="true" />
                  <span>
                    {tiendita.direccion}
                    {facultad && <span className="block text-tinta-suave">{facultadCorta(facultad)}</span>}
                  </span>
                </p>
              )}
            </div>
            {rango && (
              <p className="mt-6 cifras">
                <span className="font-display text-3xl font-semibold">{rango}</span>
                <span className="ml-2 text-tinta-suave">en {menu.length} platillos</span>
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {destino && (
                <a href={destino} target="_blank" rel="noopener noreferrer" className={clasesBoton({ variante: "primario" })}>
                  <FiExternalLink aria-hidden="true" /> Cómo llegar
                  <span className="sr-only">(abre Google Maps en otra pestaña)</span>
                </a>
              )}
              <Boton variante="secundario" onClick={() => asistente.abrir(`¿Qué me recomiendas en ${tiendita.nombre}?`)}>
                <FiMessageCircle aria-hidden="true" /> Preguntar al Buhito
              </Boton>
            </div>
          </div>

          <Foto
            foto={fotoPrincipal(tiendita)}
            alt={`Fachada de ${tiendita.nombre}`}
            prioridad
            sizes="(min-width: 1024px) 440px, 100vw"
            className="rounded-2xl max-lg:-mx-4 max-lg:rounded-none sm:max-lg:mx-0 sm:max-lg:rounded-2xl"
          />
        </div>
      </Contenedor>

      <Contenedor className="mt-14 sm:mt-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-x-14">
          <section aria-labelledby="titulo-carta" className="min-w-0">
            <h2 id="titulo-carta" className="font-display text-3xl sm:text-4xl font-semibold">
              Menú
            </h2>
            <CartaMenu platillos={menu} />
          </section>

          {puntoMapa.length > 0 && (
            <aside aria-labelledby="titulo-ubicacion" className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-24">
                <h2 id="titulo-ubicacion" className="font-display text-2xl font-semibold">
                  Dónde está
                </h2>
                <div className="mt-4 h-72 lg:h-80 overflow-hidden rounded-2xl bg-hundido">
                  <Suspense fallback={<div className="h-full w-full bg-hundido" />}>
                    <BuhoMap puntos={puntoMapa} centro={centroMapa} zoom={17} gestosCooperativos />
                  </Suspense>
                </div>
                {tiendita.direccion && <p className="mt-3 text-tinta-suave">{tiendita.direccion}</p>}
                {destino && (
                  <a href={destino} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 min-h-11 font-semibold text-enlace underline underline-offset-4">
                    Abrir en Google Maps <FiExternalLink aria-hidden="true" />
                    <span className="sr-only">(en otra pestaña)</span>
                  </a>
                )}
              </div>
            </aside>
          )}

          <div className="min-w-0">
            <Resenas
              idTiendita={tiendita.id_tiendita}
              resenas={resenas.lista}
              cargando={resenas.cargando}
              error={resenas.error}
              recargar={cargarResenas}
            />
          </div>
        </div>
      </Contenedor>
    </>
  );
}
