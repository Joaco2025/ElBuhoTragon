import { ILUSTRACIONES } from "../../lib/imagenes";

/**
 * Estados vacíos, de error y "no encontrado", con uno de los búhos de la marca.
 * `buho`: "cartel" (sin resultados, error), "dormido" (cerrado), "carta".
 */
export default function EstadoVacio({ buho = "cartel", titulo, children, accion, nivel = "h2", className = "" }) {
  const Titulo = nivel;
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-5 sm:gap-8 text-center sm:text-left py-10 ${className}`}>
      <img src={ILUSTRACIONES[buho]} alt="" width="160" height="160" className="h-32 w-32 sm:h-40 sm:w-40 shrink-0 object-contain" />
      <div className="max-w-md">
        <Titulo className="font-display text-2xl sm:text-3xl font-semibold leading-tight">{titulo}</Titulo>
        {children && <div className="mt-2 text-tinta-suave text-[1.05rem]">{children}</div>}
        {accion && <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">{accion}</div>}
      </div>
    </div>
  );
}
