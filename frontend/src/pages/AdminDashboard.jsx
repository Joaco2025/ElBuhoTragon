// Panel de administración: /admin/dashboard
// Ocultarlo a quien no es admin es cosmético: el backend rechaza las escrituras (EsAdmin).
import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiExternalLink, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import EncabezadoPagina, { Contenedor } from "../components/layout/EncabezadoPagina";
import FormCafeteria from "../components/admin/FormCafeteria";
import EditorMenu from "../components/admin/EditorMenu";
import ModeracionResenas from "../components/admin/ModeracionResenas";
import Boton from "../components/ui/Boton";
import Dialogo from "../components/ui/Dialogo";
import Confirmar from "../components/ui/Confirmar";
import Pestanas from "../components/ui/Pestanas";
import EstadoVacio from "../components/ui/EstadoVacio";
import Esqueleto from "../components/ui/Esqueleto";
import Foto from "../components/ui/Foto";
import { useToast } from "../components/ui/contextoToast";
import { useCatalogo } from "../hooks/useCatalogo";
import { useTitulo } from "../hooks/useTitulo";
import { escribir, invalidarCatalogo, pedir } from "../lib/api";
import { facultadCorta } from "../lib/catalogo";
import { rangoHorario } from "../lib/horario";
import { fotoMiniatura } from "../lib/imagenes";
import { useSesion } from "../lib/sesion";
import { repararPlatillo } from "../lib/texto";

function EditorCafeteria({ tiendita, facultades, alGuardarInfo }) {
  const [pestana, setPestana] = useState("info");
  const [menu, setMenu] = useState({ lista: [], cargando: true });
  const [resenas, setResenas] = useState({ lista: [], cargando: true });
  const id = tiendita.id_tiendita;

  const cargarMenu = useCallback(() => {
    pedir(`/api/Menus/?id_tiendita=${id}`)
      .then((d) => setMenu({ lista: Array.isArray(d) ? d.map(repararPlatillo) : [], cargando: false }))
      .catch(() => setMenu({ lista: [], cargando: false }));
  }, [id]);
  const cargarResenas = useCallback(() => {
    pedir(`/api/Resenas/?id_tiendita=${id}`)
      .then((d) => setResenas({ lista: Array.isArray(d) ? d : [], cargando: false }))
      .catch(() => setResenas({ lista: [], cargando: false }));
  }, [id]);

  useEffect(() => {
    cargarMenu();
    cargarResenas();
  }, [cargarMenu, cargarResenas]);

  return (
    <Pestanas
      etiqueta="Secciones de la cafetería"
      activa={pestana}
      onChange={setPestana}
      pestanas={[
        { id: "info", etiqueta: "Datos", contenido: <FormCafeteria tiendita={tiendita} facultades={facultades} alGuardar={alGuardarInfo} /> },
        {
          id: "menu",
          etiqueta: `Menú (${menu.cargando ? "…" : menu.lista.length})`,
          contenido: menu.cargando ? (
            <p role="status" className="text-tinta-suave">Cargando menú…</p>
          ) : (
            <EditorMenu
              idTiendita={id}
              platillos={menu.lista}
              alCambiar={() => {
                invalidarCatalogo();
                cargarMenu();
              }}
            />
          ),
        },
        {
          id: "resenas",
          etiqueta: `Reseñas (${resenas.cargando ? "…" : resenas.lista.length})`,
          contenido: <ModeracionResenas resenas={resenas.lista} cargando={resenas.cargando} alCambiar={cargarResenas} />,
        },
      ]}
    />
  );
}

export default function AdminDashboard() {
  useTitulo("Administrar");
  const sesion = useSesion();
  const toast = useToast();
  const { tienditas, facultades, facultadPorId, menusPorTiendita, cargando, error, recargar } = useCatalogo();
  const [creando, setCreando] = useState(false);
  const [editando, setEditando] = useState(null);
  const [borrar, setBorrar] = useState(null);
  const [borrando, setBorrando] = useState(false);

  const actualizar = () => {
    invalidarCatalogo();
    recargar();
  };

  if (!sesion?.esAdmin) {
    return (
      <Contenedor className="pt-10">
        <EstadoVacio
          nivel="h1"
          titulo="Esta sección es para administradores"
          accion={sesion ? <Boton to="/">Volver al inicio</Boton> : <Boton to="/login" state={{ desde: "/admin/dashboard" }}>Iniciar sesión</Boton>}
        >
          {sesion ? "Tu cuenta no tiene permisos de administración." : "Inicia sesión con una cuenta de administrador para continuar."}
        </EstadoVacio>
      </Contenedor>
    );
  }

  const crear = async (cuerpo) => {
    await escribir("/api/Tienditas/", "POST", cuerpo);
    setCreando(false);
    toast("Cafetería creada");
    actualizar();
  };

  const guardarInfo = async (cuerpo) => {
    await escribir(`/api/Tienditas/${editando.id_tiendita}/`, "PUT", cuerpo);
    toast("Cambios guardados");
    setEditando(null);
    actualizar();
  };

  const confirmarBorrado = async () => {
    setBorrando(true);
    try {
      await escribir(`/api/Tienditas/${borrar.id_tiendita}/`, "DELETE");
      toast("Cafetería eliminada");
      actualizar();
    } catch {
      toast("No se pudo eliminar la cafetería", "error");
    } finally {
      setBorrando(false);
      setBorrar(null);
    }
  };

  return (
    <Contenedor className="pt-8 sm:pt-12">
      <EncabezadoPagina titulo="Administrar cafeterías" descripcion="Datos, menús y reseñas de cada cafetería del sitio.">
        <Boton onClick={() => setCreando(true)}>
          <FiPlus aria-hidden="true" /> Nueva cafetería
        </Boton>
      </EncabezadoPagina>

      <div className="mt-10">
        {error ? (
          <EstadoVacio titulo="No se pudo cargar el catálogo" accion={<Boton onClick={recargar}>Reintentar</Boton>}>
            Revisa tu conexión e inténtalo otra vez.
          </EstadoVacio>
        ) : cargando ? (
          <div className="space-y-2" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <Esqueleto key={i} className="h-20" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-superficie">
            <table className="w-full text-left">
              <caption className="sr-only">Cafeterías registradas</caption>
              <thead className="bg-hundido text-sm">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Cafetería</th>
                  <th scope="col" className="px-4 py-3 font-semibold max-md:hidden">Facultad</th>
                  <th scope="col" className="px-4 py-3 font-semibold max-sm:hidden">Horario</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right max-sm:hidden">Platillos</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hundido">
                {tienditas.map((t) => (
                  <tr key={t.id_tiendita} className="hover:bg-fondo">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Foto foto={fotoMiniatura(t)} sizes="64px" className="w-16 rounded-[0.375rem] shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold leading-snug">{t.nombre}</p>
                          <Link to={`/cafeterias/${t.id_tiendita}`} className="inline-flex items-center gap-1 text-sm text-azul underline underline-offset-2">
                            Ver ficha <FiExternalLink size={12} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-tinta-suave max-md:hidden">{facultadCorta(facultadPorId[t.id_facultad] || "")}</td>
                    <td className="px-4 py-3 cifras max-sm:hidden">{rangoHorario(t) || <span className="text-tinta-suave">Sin horario</span>}</td>
                    <td className="px-4 py-3 text-right cifras max-sm:hidden">{menusPorTiendita[t.id_tiendita]?.length ?? 0}</td>
                    <td className="px-2 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEditando(t)}
                          className="h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer"
                          aria-label={`Editar ${t.nombre}`}
                        >
                          <FiEdit2 aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setBorrar(t)}
                          className="h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-error-suave hover:text-error cursor-pointer"
                          aria-label={`Eliminar ${t.nombre}`}
                        >
                          <FiTrash2 aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialogo abierto={creando} titulo="Nueva cafetería" alCerrar={() => setCreando(false)}>
        <FormCafeteria facultades={facultades} alGuardar={crear} alCancelar={() => setCreando(false)} />
      </Dialogo>

      <Dialogo abierto={Boolean(editando)} titulo={editando?.nombre ?? ""} alCerrar={() => setEditando(null)} ancho="max-w-2xl">
        {editando && <EditorCafeteria tiendita={editando} facultades={facultades} alGuardarInfo={guardarInfo} />}
      </Dialogo>

      <Confirmar
        abierto={Boolean(borrar)}
        titulo="Eliminar cafetería"
        mensaje={`“${borrar?.nombre}” desaparecerá del sitio. No se puede deshacer.`}
        ocupado={borrando}
        alConfirmar={confirmarBorrado}
        alCancelar={() => setBorrar(null)}
      />
    </Contenedor>
  );
}
