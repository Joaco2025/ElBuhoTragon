import { useState } from "react";
import { FiImage } from "react-icons/fi";
import Campo from "../ui/Campo";
import Boton from "../ui/Boton";
import Aviso from "../ui/Aviso";
import Foto from "../ui/Foto";
import { fotoPrincipal, reducirImagen } from "../../lib/imagenes";
import { facultadCorta } from "../../lib/catalogo";

const CAMPOS = ["nombre", "direccion", "id_facultad", "hora_apertura", "hora_cierre", "latitud", "longitud"];

const inicial = (t) => Object.fromEntries(CAMPOS.map((c) => [c, t?.[c] == null ? "" : String(t[c])]));

/**
 * Datos de una cafetería, para crear (sin `tiendita`) o editar.
 * alGuardar(cuerpo) recibe el objeto listo para la API: vacíos como null y la foto
 * solo si se eligió una nueva (en edición, omitir imagen_url conserva la actual).
 */
export default function FormCafeteria({ tiendita, facultades, alGuardar, alCancelar }) {
  const [datos, setDatos] = useState(() => inicial(tiendita));
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const elegirFoto = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    try {
      setImagen(await reducirImagen(archivo));
    } catch {
      setError("No se pudo leer esa imagen. Prueba con un JPG o PNG.");
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (!datos.nombre.trim() || !datos.id_facultad) return setError("El nombre y la facultad son obligatorios.");
    setError("");
    setGuardando(true);
    const cuerpo = Object.fromEntries(CAMPOS.map((c) => [c, datos[c].trim() === "" ? null : datos[c].trim()]));
    if (imagen) cuerpo.imagen_url = imagen;
    try {
      await alGuardar(cuerpo);
    } catch (err) {
      setError(err.status === 403 || err.status === 401 ? "Tu sesión no tiene permisos de administrador." : "No se pudo guardar. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const vistaPrevia = imagen ? { src: imagen } : fotoPrincipal(tiendita);

  return (
    <form onSubmit={guardar} noValidate className="space-y-5">
      <Campo etiqueta="Nombre" name="nombre" required value={datos.nombre} onChange={cambiar} />
      <Campo etiqueta="Ubicación en el campus" name="direccion" value={datos.direccion} onChange={cambiar} placeholder="Ej. Edificio 10I, planta baja" />
      <Campo como="select" etiqueta="Facultad" name="id_facultad" required value={datos.id_facultad} onChange={cambiar}>
        <option value="">Elige una facultad</option>
        {facultades.map((f) => (
          <option key={f.id_facultad} value={f.id_facultad}>
            {facultadCorta(f.nombre)}
          </option>
        ))}
      </Campo>
      <div className="grid grid-cols-2 gap-4">
        <Campo etiqueta="Abre" name="hora_apertura" type="time" step="60" value={datos.hora_apertura.slice(0, 5)} onChange={cambiar} />
        <Campo etiqueta="Cierra" name="hora_cierre" type="time" step="60" value={datos.hora_cierre.slice(0, 5)} onChange={cambiar} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Campo etiqueta="Latitud" name="latitud" type="number" step="any" inputMode="decimal" value={datos.latitud} onChange={cambiar} placeholder="29.083" />
        <Campo etiqueta="Longitud" name="longitud" type="number" step="any" inputMode="decimal" value={datos.longitud} onChange={cambiar} placeholder="-110.961" />
      </div>
      <p className="-mt-2 text-sm text-tinta-suave">En Google Maps: clic derecho sobre el lugar y copia las coordenadas.</p>

      <div className="flex items-center gap-4">
        {vistaPrevia && <Foto foto={vistaPrevia} className="w-28 rounded-caja shrink-0" />}
        <label className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-hundido font-semibold cursor-pointer hover:bg-linea has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-azul">
          <FiImage aria-hidden="true" />
          {vistaPrevia ? "Cambiar foto" : "Subir foto"}
          <input type="file" accept="image/*" onChange={elegirFoto} className="sr-only" />
        </label>
      </div>

      {error && <Aviso tipo="error">{error}</Aviso>}

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        {alCancelar && (
          <Boton variante="secundario" onClick={alCancelar}>
            Cancelar
          </Boton>
        )}
        <Boton type="submit" disabled={guardando}>
          {guardando ? "Guardando…" : tiendita ? "Guardar cambios" : "Crear cafetería"}
        </Boton>
      </div>
    </form>
  );
}
