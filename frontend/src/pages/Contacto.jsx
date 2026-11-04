// Contacto: /contacto
// No hay backend de correo: el formulario abre la app de correo del usuario con el mensaje
// ya escrito (mailto:). La versión anterior mostraba "Mensaje recibido" sin enviar nada.
import { useState } from "react";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import EncabezadoPagina, { Contenedor } from "../components/layout/EncabezadoPagina";
import Campo from "../components/ui/Campo";
import Boton from "../components/ui/Boton";
import Aviso from "../components/ui/Aviso";
import { useTitulo } from "../hooks/useTitulo";

const CORREO = "a223201053@unison.mx";
const REPOSITORIO = "https://github.com/OwenSolis03/IS2_ElBuhoTragon";

const MOTIVOS = ["Precio o platillo desactualizado", "Horario incorrecto", "Cafetería que falta", "Problema con mi cuenta", "Otro"];

export default function Contacto() {
  useTitulo("Contacto");
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [abierto, setAbierto] = useState(false);

  const enviar = (e) => {
    e.preventDefault();
    const asunto = `[El Búho Tragón] ${motivo}`;
    const cuerpo = `${mensaje.trim()}\n\n${nombre.trim() ? `— ${nombre.trim()}` : ""}`;
    window.location.href = `mailto:${CORREO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setAbierto(true);
  };

  return (
    <Contenedor className="pt-8 sm:pt-12">
      <EncabezadoPagina
        titulo="Contacto"
        descripcion="¿Viste un precio que cambió, un horario incorrecto o una cafetería que falta? Avísanos y lo corregimos."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <form onSubmit={enviar} className="rounded-2xl bg-superficie p-5 sm:p-8 space-y-5">
          <Campo como="select" etiqueta="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)}>
            {MOTIVOS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Campo>
          <Campo etiqueta="Tu nombre (opcional)" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Campo
            como="textarea"
            etiqueta="Mensaje"
            required
            rows={5}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Por ejemplo: en la cafetería de Derecho la torta de pierna ya cuesta $75."
          />
          {abierto && (
            <Aviso tipo="info">
              Se abrió tu app de correo con el mensaje listo; envíalo desde ahí. Si no se abrió, escribe a {CORREO}.
            </Aviso>
          )}
          <Boton type="submit">
            <FiMail aria-hidden="true" /> Escribir correo
          </Boton>
        </form>

        <div className="space-y-8">
          <section aria-labelledby="contacto-correo">
            <h2 id="contacto-correo" className="font-display text-2xl font-semibold">Correo</h2>
            <a href={`mailto:${CORREO}`} className="mt-1 inline-flex min-h-11 items-center font-semibold text-azul underline underline-offset-4 break-all">
              {CORREO}
            </a>
          </section>
          <section aria-labelledby="contacto-donde">
            <h2 id="contacto-donde" className="font-display text-2xl font-semibold">Dónde estamos</h2>
            <p className="mt-2 flex gap-2.5 text-[1.05rem]">
              <FiMapPin className="mt-1.5 shrink-0 text-tinta-suave" aria-hidden="true" />
              <span>
                Departamento de Matemáticas, Licenciatura en Ciencias de la Computación. Universidad de Sonora, Hermosillo, Sonora.
              </span>
            </p>
          </section>
          <section aria-labelledby="contacto-codigo">
            <h2 id="contacto-codigo" className="font-display text-2xl font-semibold">Código</h2>
            <a href={REPOSITORIO} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-azul underline underline-offset-4">
              Repositorio en GitHub <FiExternalLink aria-hidden="true" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </section>
        </div>
      </div>
    </Contenedor>
  );
}
