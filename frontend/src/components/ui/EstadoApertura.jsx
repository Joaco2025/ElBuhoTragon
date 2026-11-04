import { estadoApertura } from "../../lib/horario";

/**
 * "Abierta hasta las 19:00" / "Abre mañana a las 07:00". El color nunca va solo: el texto
 * dice el estado.
 */
export default function EstadoApertura({ tiendita, ahora, grande = false, className = "" }) {
  const { abierta, texto } = estadoApertura(tiendita, ahora);
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold cifras ${grande ? "text-base" : "text-sm"} ${
        abierta ? "text-abierto" : "text-cerrado"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`shrink-0 rounded-full ${grande ? "h-2.5 w-2.5" : "h-2 w-2"} ${
          abierta ? "bg-abierto ring-4 ring-abierto/15" : "bg-cerrado/60"
        }`}
      />
      {texto}
    </span>
  );
}
