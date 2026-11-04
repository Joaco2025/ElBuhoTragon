import { ILUSTRACIONES } from "../../lib/imagenes";
import { Contenedor } from "./EncabezadoPagina";

/** Disposición de inicio de sesión y registro: formulario a la izquierda, motivo a la derecha */
export default function PantallaCuenta({ titulo, descripcion, children, pie }) {
  return (
    <Contenedor className="pt-8 sm:pt-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16 items-start">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">{titulo}</h1>
          {descripcion && <p className="mt-3 text-lg text-tinta-suave">{descripcion}</p>}
          <div className="mt-8 rounded-2xl bg-superficie p-5 sm:p-8">{children}</div>
          {pie && <div className="mt-6 text-[1.05rem]">{pie}</div>}
        </div>

        <aside aria-label="Para qué sirve tu cuenta" className="zona-oscura hidden lg:flex flex-col justify-between self-stretch rounded-2xl bg-azul-hondo text-white p-10">
          <img src={ILUSTRACIONES.cartel} alt="" width="220" height="220" className="h-52 w-52 object-contain" />
          <div>
            <p className="font-display text-3xl font-semibold leading-tight">Con tu cuenta UNISON puedes calificar cada cafetería.</p>
            <p className="mt-3 text-tinta-clara text-lg">
              Tus opiniones ayudan a otros estudiantes a decidir dónde comer entre clases. Ver menús y precios no requiere cuenta.
            </p>
          </div>
        </aside>
      </div>
    </Contenedor>
  );
}
