import { useCallback, useDeferredValue, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { Contenedor } from "../components/layout/EncabezadoPagina";
import Filtros from "../components/inicio/Filtros";
import Pizarra from "../components/inicio/Pizarra";
import ListaPlatillos from "../components/inicio/ListaPlatillos";
import FichaCafeteria from "../components/cafeteria/FichaCafeteria";
import EstadoVacio from "../components/ui/EstadoVacio";
import Esqueleto from "../components/ui/Esqueleto";
import Boton from "../components/ui/Boton";
import { useCatalogo } from "../hooks/useCatalogo";
import { useAhora } from "../hooks/useAhora";
import { useTitulo } from "../hooks/useTitulo";
import { categoriasDisponibles, filtrarCatalogo, masBaratosAbiertos } from "../lib/catalogo";
import { normalizar } from "../lib/formato";
import { estadoApertura } from "../lib/horario";

const CLAVES = ["q", "max", "cat", "fac", "abiertas"];

export default function Home() {
  useTitulo(null);
  const catalogo = useCatalogo();
  const ahora = useAhora();
  const [params, setParams] = useSearchParams();

  const filtros = {
    q: params.get("q") ?? "",
    max: params.get("max") ?? "",
    cat: params.get("cat") ?? "",
    fac: params.get("fac") ?? "",
    abiertas: params.get("abiertas") === "1",
  };
  // Escribir no espera al filtrado de ~500 platillos
  const qDiferida = useDeferredValue(filtros.q);
  const filtrosEfectivos = { ...filtros, q: qDiferida };
  const claveFiltros = JSON.stringify(filtrosEfectivos);

  const cambiar = useCallback(
    (clave, valor) =>
      setParams(
        (actual) => {
          const siguiente = new URLSearchParams(actual);
          if (valor) siguiente.set(clave, valor);
          else siguiente.delete(clave);
          return siguiente;
        },
        // Escribir en el buscador no llena el historial; los demás filtros sí se pueden deshacer con Atrás
        { replace: clave === "q", preventScrollReset: true }
      ),
    [setParams]
  );
  const limpiar = () => setParams({}, { preventScrollReset: true });
  const hayFiltros = CLAVES.some((c) => params.get(c));

  const { tienditas, menus, facultades, menusPorTiendita, facultadPorId, cargando, error, recargar } = catalogo;
  const categorias = useMemo(() => categoriasDisponibles(menus), [menus]);
  const tiendaPorId = useMemo(() => Object.fromEntries(tienditas.map((t) => [t.id_tiendita, t])), [tienditas]);

  // `ahora` cambia cada minuto: los estados de apertura se recalculan solos
  const resultado = useMemo(
    () => filtrarCatalogo({ tienditas, menus }, JSON.parse(claveFiltros), ahora),
    [tienditas, menus, claveFiltros, ahora]
  );
  const pizarra = useMemo(() => masBaratosAbiertos({ tienditas, menus }, ahora), [tienditas, menus, ahora]);
  const abiertas = useMemo(() => tienditas.filter((t) => estadoApertura(t, ahora).abierta).length, [tienditas, ahora]);

  const termino = normalizar(qDiferida);
  const coincidenciasDe = (id) =>
    termino ? (menusPorTiendita[id] || []).filter((m) => normalizar(m.nombre).includes(termino)) : [];

  return (
    <>
      <Contenedor as="section" aria-labelledby="titulo-inicio" className="pt-8 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:items-center">
          <div>
            <h1 id="titulo-inicio" className="font-display text-[2.6rem] leading-[1] sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
              ¿Qué comes hoy en el campus?
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl text-tinta-suave text-pretty">
              Menús con precio, horarios y ubicación de las cafeterías de la Universidad de Sonora, campus Hermosillo.
            </p>
            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 cifras">
              {[
                [tienditas.length, "cafeterías"],
                [menus.length, "platillos con precio"],
                [facultades.length, "facultades"],
              ].map(([n, texto]) => (
                <div key={texto} className="flex items-baseline gap-2">
                  <dt className="sr-only">{texto}</dt>
                  <dd className="font-display text-3xl font-semibold">{cargando ? "…" : n}</dd>
                  <span aria-hidden="true" className="text-tinta-suave">{texto}</span>
                </div>
              ))}
            </dl>
          </div>
          <Pizarra platillos={pizarra} tienditas={tienditas} cargando={cargando} abiertas={abiertas} />
        </div>
      </Contenedor>

      <Contenedor className="mt-12 sm:mt-16">
        <Filtros
          filtros={filtros}
          cambiar={cambiar}
          limpiar={limpiar}
          categorias={categorias}
          facultades={facultades}
          hayFiltros={hayFiltros}
        />
      </Contenedor>

      <Contenedor className="mt-10 sm:mt-12">
        {error ? (
          <EstadoVacio
            titulo="No se pudo cargar la guía"
            accion={
              <Boton onClick={recargar}>
                <FiRefreshCw aria-hidden="true" /> Reintentar
              </Boton>
            }
          >
            El servidor no respondió. Revisa tu conexión; si sigue fallando, el servicio puede estar en mantenimiento.
          </EstadoVacio>
        ) : cargando ? (
          <div aria-busy="true" className="grid gap-3 lg:grid-cols-2">
            <span className="sr-only">Cargando cafeterías</span>
            {Array.from({ length: 6 }, (_, i) => (
              <Esqueleto key={i} className="h-40" />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {resultado.porPlatillo && (
              <section aria-labelledby="titulo-platillos">
                <h2 id="titulo-platillos" className="font-display text-3xl sm:text-4xl font-semibold cifras" aria-live="polite">
                  {resultado.platillos.length
                    ? `${resultado.platillos.length} ${resultado.platillos.length === 1 ? "platillo" : "platillos"}`
                    : "Ningún platillo coincide"}
                </h2>
                {resultado.platillos.length > 0 ? (
                  <div className="mt-4">
                    <ListaPlatillos key={claveFiltros} platillos={resultado.platillos} tiendaPorId={tiendaPorId} ahora={ahora} />
                  </div>
                ) : (
                  <p className="mt-2 text-tinta-suave">Prueba con otra palabra o sube el presupuesto.</p>
                )}
              </section>
            )}

            <section aria-labelledby="titulo-cafeterias">
              <h2 id="titulo-cafeterias" className="font-display text-3xl sm:text-4xl font-semibold cifras">
                {resultado.porPlatillo || hayFiltros
                  ? `${resultado.cafeterias.length} ${resultado.cafeterias.length === 1 ? "cafetería" : "cafeterías"}`
                  : "Cafeterías del campus"}
              </h2>
              {resultado.cafeterias.length > 0 ? (
                <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                  {resultado.cafeterias.map(({ tiendita }, i) => (
                    <li key={tiendita.id_tiendita} className="grid">
                      <FichaCafeteria
                        tiendita={tiendita}
                        platillos={menusPorTiendita[tiendita.id_tiendita]}
                        facultad={facultadPorId[tiendita.id_facultad]}
                        ahora={ahora}
                        coincidencias={coincidenciasDe(tiendita.id_tiendita)}
                        prioridad={i < 2}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <EstadoVacio
                  nivel="p"
                  buho={filtros.abiertas ? "dormido" : "cartel"}
                  titulo={filtros.abiertas ? "No hay cafeterías abiertas con esos filtros" : "Nada coincide con tu búsqueda"}
                  accion={<Boton variante="secundario" onClick={limpiar}>Quitar filtros</Boton>}
                >
                  {filtros.abiertas ? "Quita “Solo abiertas ahora” para ver los menús de todas." : "Revisa la ortografía o busca algo más general, como “torta” o “café”."}
                </EstadoVacio>
              )}
            </section>
          </div>
        )}
      </Contenedor>
    </>
  );
}
