import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Campo from "../ui/Campo";
import Boton from "../ui/Boton";
import Aviso from "../ui/Aviso";
import { Estrellas, SelectorEstrellas } from "../ui/Estrellas";
import { useToast } from "../ui/contextoToast";
import { escribir } from "../../lib/api";
import { fecha } from "../../lib/formato";
import { idUsuarioDelToken, useSesion } from "../../lib/sesion";

const LIMITE = 1000;

function FormResena({ idTiendita, alPublicar }) {
  const sesion = useSesion();
  const { pathname } = useLocation();
  const toast = useToast();
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!sesion) {
    return (
      <div className="rounded-caja bg-superficie p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-[1.05rem]">Inicia sesión con tu cuenta para calificar esta cafetería.</p>
        <Boton to="/login" state={{ desde: pathname }} variante="primario" className="shrink-0">
          <FiLogIn aria-hidden="true" /> Iniciar sesión
        </Boton>
      </div>
    );
  }

  const publicar = async (e) => {
    e.preventDefault();
    setError("");
    if (!calificacion) return setError("Elige de 1 a 5 estrellas.");
    if (!comentario.trim()) return setError("Escribe un comentario breve sobre tu visita.");

    const idUsuario = idUsuarioDelToken(sesion.token);
    if (!idUsuario) return setError("Tu sesión ya no es válida. Cierra sesión y vuelve a entrar.");

    setEnviando(true);
    try {
      // Mismo cuerpo que la versión anterior; el backend toma al autor del token
      await escribir("/api/Resenas/", "POST", {
        id_tiendita: idTiendita,
        calificacion,
        comentario: comentario.trim(),
        id_usuario: idUsuario,
      });
      setCalificacion(0);
      setComentario("");
      toast("Reseña publicada");
      alPublicar();
    } catch (err) {
      setError(
        err.status === 401
          ? "Tu sesión expiró. Vuelve a iniciar sesión para publicar."
          : err.status === 429
            ? "Publicaste varias reseñas seguidas. Espera un momento e inténtalo de nuevo."
            : err.status
              ? err.message || "No se pudo publicar la reseña."
              : "Sin conexión con el servidor. Revisa tu red e inténtalo de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={publicar} noValidate className="rounded-caja bg-superficie p-5 sm:p-6 space-y-5">
      <p className="font-semibold text-lg">Tu opinión, {sesion.usuario}</p>
      <SelectorEstrellas valor={calificacion} onChange={setCalificacion} />
      <Campo
        como="textarea"
        etiqueta="Comentario"
        rows={3}
        maxLength={LIMITE}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="¿Qué pediste? ¿Qué tal el sabor, el precio, la espera?"
        ayuda={`${comentario.length} de ${LIMITE} caracteres`}
      />
      {error && <Aviso tipo="error">{error}</Aviso>}
      <Boton type="submit" disabled={enviando}>
        {enviando ? "Publicando…" : "Publicar reseña"}
      </Boton>
    </form>
  );
}

/** Opiniones de la comunidad: resumen, formulario y lista */
export default function Resenas({ idTiendita, resenas, cargando, error, recargar }) {
  const promedio = resenas.length ? resenas.reduce((s, r) => s + r.calificacion, 0) / resenas.length : null;

  return (
    <section aria-labelledby="titulo-opiniones">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="titulo-opiniones" className="font-display text-3xl sm:text-4xl font-semibold">
          Opiniones
        </h2>
        {promedio && (
          <p className="flex items-center gap-2 cifras">
            <span className="font-display text-2xl font-semibold">{promedio.toFixed(1)}</span>
            <Estrellas valor={promedio} />
            <span className="text-tinta-suave">
              {resenas.length} {resenas.length === 1 ? "opinión" : "opiniones"}
            </span>
          </p>
        )}
      </div>

      <div className="mt-5">
        <FormResena idTiendita={idTiendita} alPublicar={recargar} />
      </div>

      {error ? (
        <Aviso tipo="error" className="mt-6">
          No se pudieron cargar las opiniones.{" "}
          <button type="button" onClick={recargar} className="underline font-semibold cursor-pointer">
            Reintentar
          </button>
        </Aviso>
      ) : cargando ? null : resenas.length === 0 ? (
        <p className="mt-6 text-tinta-suave text-[1.05rem]">Todavía nadie la ha calificado. La primera opinión ayuda a los demás.</p>
      ) : (
        <ul className="mt-8 space-y-7">
          {resenas.map((r) => (
            <li key={r.id_resena}>
              <article>
                <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="h-9 w-9 rounded-full bg-hundido flex items-center justify-center font-bold uppercase" aria-hidden="true">
                    {(r.nombre_usuario || "?").charAt(0)}
                  </span>
                  <h3 className="font-semibold">{r.nombre_usuario || "Estudiante UNISON"}</h3>
                  <Estrellas valor={r.calificacion} />
                  <time dateTime={r.fecha_registro} className="text-sm text-tinta-suave">
                    {fecha(r.fecha_registro)}
                  </time>
                </header>
                <p className="mt-2 sm:pl-12 text-[1.05rem] leading-relaxed whitespace-pre-line break-words">{r.comentario}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm text-tinta-suave">
        Las opiniones son de la comunidad y se moderan según los <Link to="/terminos" className="underline">términos de uso</Link>.
      </p>
    </section>
  );
}
