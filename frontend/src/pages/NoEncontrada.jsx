// Cualquier ruta que no existe
import { Contenedor } from "../components/layout/EncabezadoPagina";
import EstadoVacio from "../components/ui/EstadoVacio";
import Boton from "../components/ui/Boton";
import { useTitulo } from "../hooks/useTitulo";

export default function NoEncontrada() {
  useTitulo("Página no encontrada");
  return (
    <Contenedor className="pt-10">
      <EstadoVacio nivel="h1" titulo="Esta página no existe" accion={<Boton to="/">Ver las cafeterías</Boton>}>
        Puede que el enlace esté incompleto o que la página haya cambiado de lugar.
      </EstadoVacio>
    </Contenedor>
  );
}
