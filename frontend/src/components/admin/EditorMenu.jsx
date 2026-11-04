import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Campo from "../ui/Campo";
import Boton from "../ui/Boton";
import Aviso from "../ui/Aviso";
import Confirmar from "../ui/Confirmar";
import { useToast } from "../ui/contextoToast";
import { escribir } from "../../lib/api";
import { precio } from "../../lib/formato";

// Mismas categorías que ofrecía el panel anterior
const CATEGORIAS = ["Desayuno", "Almuerzo", "Comida", "Comida Corrida", "Vegana / Vegetariana", "Fit / Saludable", "Bebidas", "Postres", "Snacks"];

const VACIO = { nombre: "", precio: "", descripcion: "", categoria: "" };

/** Alta, edición y baja de platillos de una cafetería */
export default function EditorMenu({ idTiendita, platillos, alCambiar }) {
  const toast = useToast();
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null); // id_menu
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [borrar, setBorrar] = useState(null);
  const [borrando, setBorrando] = useState(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const cancelar = () => {
    setForm(VACIO);
    setEditando(null);
    setError("");
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || form.precio === "") return setError("El platillo necesita nombre y precio.");
    setError("");
    setGuardando(true);
    const cuerpo = { ...form, nombre: form.nombre.trim(), id_tiendita: idTiendita, precio: parseFloat(form.precio) };
    try {
      if (editando) await escribir(`/api/Menus/${editando}/`, "PUT", cuerpo);
      else await escribir("/api/Menus/", "POST", cuerpo);
      toast(editando ? "Platillo actualizado" : "Platillo agregado");
      cancelar();
      alCambiar();
    } catch {
      setError("No se pudo guardar el platillo. Revisa tu sesión e inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const confirmarBorrado = async () => {
    setBorrando(true);
    try {
      await escribir(`/api/Menus/${borrar.id_menu}/`, "DELETE");
      toast("Platillo eliminado");
      if (editando === borrar.id_menu) cancelar();
      alCambiar();
    } catch {
      toast("No se pudo eliminar el platillo", "error");
    } finally {
      setBorrando(false);
      setBorrar(null);
    }
  };

  const ordenados = [...platillos].sort((a, b) => (a.categoria || "").localeCompare(b.categoria || "") || a.nombre.localeCompare(b.nombre));

  return (
    <div className="space-y-8">
      <form onSubmit={guardar} noValidate className="rounded-caja bg-fondo p-4 sm:p-5 space-y-4">
        <p className="font-semibold text-lg">{editando ? "Editar platillo" : "Agregar platillo"}</p>
        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <Campo etiqueta="Nombre" name="nombre" value={form.nombre} onChange={cambiar} required />
          <Campo etiqueta="Precio ($)" name="precio" type="number" min="0" step="0.5" inputMode="decimal" value={form.precio} onChange={cambiar} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo como="select" etiqueta="Categoría" name="categoria" value={form.categoria} onChange={cambiar}>
            <option value="">Sin categoría</option>
            {[...new Set([...CATEGORIAS, form.categoria].filter(Boolean))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Campo>
          <Campo etiqueta="Descripción" name="descripcion" value={form.descripcion} onChange={cambiar} placeholder="Ingredientes o porción" />
        </div>
        {error && <Aviso tipo="error">{error}</Aviso>}
        <div className="flex flex-wrap justify-end gap-3">
          {editando && (
            <Boton variante="secundario" onClick={cancelar}>
              Cancelar edición
            </Boton>
          )}
          <Boton type="submit" disabled={guardando}>
            {guardando ? "Guardando…" : editando ? "Guardar platillo" : "Agregar platillo"}
          </Boton>
        </div>
      </form>

      <div>
        <p className="font-semibold text-lg cifras">Menú actual ({platillos.length})</p>
        {ordenados.length === 0 ? (
          <p className="mt-3 text-tinta-suave">Todavía no hay platillos.</p>
        ) : (
          <ul className="mt-2 divide-y divide-hundido">
            {ordenados.map((p) => (
              <li key={p.id_menu} className={`flex items-center gap-3 py-3 ${editando === p.id_menu ? "bg-oro-suave -mx-2 px-2 rounded-caja" : ""}`}>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug">{p.nombre}</p>
                  <p className="text-sm text-tinta-suave line-clamp-1">{[p.categoria, p.descripcion].filter(Boolean).join(" · ") || "Sin categoría"}</p>
                </div>
                <span className="font-display text-lg font-semibold cifras">{precio(p.precio)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditando(p.id_menu);
                    setForm({ nombre: p.nombre, precio: p.precio ?? "", descripcion: p.descripcion || "", categoria: p.categoria || "" });
                  }}
                  className="h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer"
                  aria-label={`Editar ${p.nombre}`}
                >
                  <FiEdit2 aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setBorrar(p)}
                  className="h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-error-suave hover:text-error cursor-pointer"
                  aria-label={`Eliminar ${p.nombre}`}
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Confirmar
        abierto={Boolean(borrar)}
        titulo="Eliminar platillo"
        mensaje={`Se quitará “${borrar?.nombre}” del menú.`}
        ocupado={borrando}
        alConfirmar={confirmarBorrado}
        alCancelar={() => setBorrar(null)}
      />
    </div>
  );
}
