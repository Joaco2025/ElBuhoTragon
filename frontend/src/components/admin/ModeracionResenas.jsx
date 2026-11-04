import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Confirmar from "../ui/Confirmar";
import { Estrellas } from "../ui/Estrellas";
import { useToast } from "../ui/contextoToast";
import { escribir } from "../../lib/api";
import { fecha } from "../../lib/formato";

/** Reseñas de una cafetería, con opción de retirarlas */
export default function ModeracionResenas({ resenas, cargando, alCambiar }) {
  const toast = useToast();
  const [borrar, setBorrar] = useState(null);
  const [borrando, setBorrando] = useState(false);

  const confirmar = async () => {
    setBorrando(true);
    try {
      await escribir(`/api/Resenas/${borrar.id_resena}/`, "DELETE");
      toast("Reseña retirada");
      alCambiar();
    } catch {
      toast("No se pudo retirar la reseña. Verifica tus permisos.", "error");
    } finally {
      setBorrando(false);
      setBorrar(null);
    }
  };

  if (cargando) return <p className="text-tinta-suave" role="status">Cargando reseñas…</p>;
  if (!resenas.length) return <p className="text-tinta-suave">Esta cafetería no tiene reseñas.</p>;

  return (
    <>
      <ul className="divide-y divide-hundido">
        {resenas.map((r) => (
          <li key={r.id_resena} className="flex items-start gap-3 py-4">
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold">{r.nombre_usuario || "Anónimo"}</span>
                <Estrellas valor={r.calificacion} tamano={12} />
                <span className="text-sm text-tinta-suave">{fecha(r.fecha_registro)}</span>
              </p>
              <p className="mt-1 whitespace-pre-line break-words">{r.comentario}</p>
            </div>
            <button
              type="button"
              onClick={() => setBorrar(r)}
              className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-tinta-suave hover:bg-error-suave hover:text-error cursor-pointer"
              aria-label={`Retirar reseña de ${r.nombre_usuario || "usuario anónimo"}`}
            >
              <FiTrash2 aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <Confirmar
        abierto={Boolean(borrar)}
        titulo="Retirar reseña"
        mensaje="La reseña se elimina de forma permanente."
        textoConfirmar="Retirar"
        ocupado={borrando}
        alConfirmar={confirmar}
        alCancelar={() => setBorrar(null)}
      />
    </>
  );
}
