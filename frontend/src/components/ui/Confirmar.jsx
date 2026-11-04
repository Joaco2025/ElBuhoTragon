import Dialogo from "./Dialogo";
import Boton from "./Boton";

/** Confirmación antes de una acción que no se puede deshacer */
export default function Confirmar({ abierto, titulo, mensaje, textoConfirmar = "Eliminar", ocupado = false, alConfirmar, alCancelar }) {
  return (
    <Dialogo
      abierto={abierto}
      titulo={titulo}
      alCerrar={alCancelar}
      ancho="max-w-md"
      pie={
        <>
          <Boton variante="secundario" onClick={alCancelar} data-autofocus>
            Cancelar
          </Boton>
          <Boton variante="peligro" onClick={alConfirmar} disabled={ocupado}>
            {ocupado ? "Eliminando…" : textoConfirmar}
          </Boton>
        </>
      }
    >
      <p className="text-[1.05rem]">{mensaje}</p>
    </Dialogo>
  );
}
