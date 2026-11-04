// Pasaporte Tragón (experimental, PASAPORTE_ACTIVO): /cafeterias
// Una cafetería cuenta como visitada cuando el usuario publicó una reseña en ella.
import { useEffect, useMemo, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import EncabezadoPagina, { Contenedor } from "../components/layout/EncabezadoPagina";
import FichaCafeteria from "../components/cafeteria/FichaCafeteria";
import EstadoVacio from "../components/ui/EstadoVacio";
import Esqueleto from "../components/ui/Esqueleto";
import Boton from "../components/ui/Boton";
import Aviso from "../components/ui/Aviso";
import { useCatalogo } from "../hooks/useCatalogo";
import { useAhora } from "../hooks/useAhora";
import { useTitulo } from "../hooks/useTitulo";
import { pedir } from "../lib/api";
import { idUsuarioDelToken, useSesion } from "../lib/sesion";

function nivelDe(progreso) {
  if (progreso > 90) return "Leyenda del campus";
  if (progreso > 50) return "Tragón experto";
  if (progreso > 25) return "Explorador";
  if (progreso > 0) return "Iniciado";
  return "Novato";
}

export default function Cafeterias() {
  useTitulo("Pasaporte Tragón");
  const sesion = useSesion();
  const ahora = useAhora();
  const { tienditas, menusPorTiendita, facultadPorId, cargando, error } = useCatalogo();
  const [visitadas, setVisitadas] = useState({ ids: new Set(), cargando: true, error: false });

  const idUsuario = sesion ? idUsuarioDelToken(sesion.token) : null;

  useEffect(() => {
    if (!idUsuario) return;
    pedir("/api/Resenas/")
      .then((resenas) =>
        setVisitadas({
          ids: new Set((resenas || []).filter((r) => r.id_usuario === idUsuario).map((r) => r.id_tiendita)),
          cargando: false,
          error: false,
        })
      )
      .catch(() => setVisitadas({ ids: new Set(), cargando: false, error: true }));
  }, [idUsuario]);

  const ordenadas = useMemo(
    () => [...tienditas].sort((a, b) => Number(visitadas.ids.has(b.id_tiendita)) - Number(visitadas.ids.has(a.id_tiendita))),
    [tienditas, visitadas.ids]
  );

  if (!sesion || !idUsuario) {
    return (
      <Contenedor className="pt-10">
        <EstadoVacio
          nivel="h1"
          titulo="Tu Pasaporte Tragón"
          accion={
            <Boton to="/login" state={{ desde: "/cafeterias" }}>
              <FiLogIn aria-hidden="true" /> Iniciar sesión
            </Boton>
          }
        >
          Inicia sesión para ver qué cafeterías ya visitaste. Cada reseña que publicas sella una cafetería en tu pasaporte.
        </EstadoVacio>
      </Contenedor>
    );
  }

  const total = tienditas.length;
  const cuenta = [...visitadas.ids].filter((id) => tienditas.some((t) => t.id_tiendita === id)).length;
  const progreso = total ? (cuenta / total) * 100 : 0;
  const listo = !cargando && !visitadas.cargando;

  return (
    <Contenedor className="pt-8 sm:pt-12">
      <EncabezadoPagina
        titulo={`Pasaporte de ${sesion.usuario}`}
        descripcion="Cada cafetería en la que dejas una reseña queda sellada aquí."
      />

      <section aria-label="Tu avance" className="zona-oscura mt-8 rounded-2xl bg-azul-hondo text-white p-6 sm:p-8">
        {listo ? (
          <>
            <div className="flex flex-wrap items-end gap-x-10 gap-y-4 cifras">
              <p>
                <span className="block text-tinta-clara">Nivel</span>
                <span className="font-display text-3xl sm:text-4xl font-semibold text-oro">{nivelDe(progreso)}</span>
              </p>
              <p>
                <span className="block text-tinta-clara">Cafeterías selladas</span>
                <span className="font-display text-3xl sm:text-4xl font-semibold">
                  {cuenta} de {total}
                </span>
              </p>
            </div>
            <div
              className="mt-6 h-3 rounded-full bg-white/15 overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progreso)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Cafeterías visitadas"
            >
              <div className="h-full rounded-full bg-oro transition-[width] duration-700" style={{ width: `${progreso}%` }} />
            </div>
          </>
        ) : (
          <Esqueleto className="h-24 bg-white/10" />
        )}
      </section>

      {(error || visitadas.error) && (
        <Aviso tipo="error" className="mt-6">
          No se pudo cargar todo tu pasaporte. Recarga la página para intentarlo de nuevo.
        </Aviso>
      )}

      <section aria-labelledby="titulo-sellos" className="mt-12">
        <h2 id="titulo-sellos" className="font-display text-3xl font-semibold">
          Cafeterías
        </h2>
        {listo ? (
          <ul className="mt-5 grid gap-3 lg:grid-cols-2">
            {ordenadas.map((t) => (
              <li key={t.id_tiendita} className="grid">
                <FichaCafeteria
                  tiendita={t}
                  platillos={menusPorTiendita[t.id_tiendita]}
                  facultad={facultadPorId[t.id_facultad]}
                  ahora={ahora}
                  visitada={visitadas.ids.has(t.id_tiendita)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 grid gap-3 lg:grid-cols-2" aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => (
              <Esqueleto key={i} className="h-40" />
            ))}
          </div>
        )}
      </section>
    </Contenedor>
  );
}
