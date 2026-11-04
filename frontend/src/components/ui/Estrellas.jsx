import { useId, useState } from "react";
import { FaStar } from "react-icons/fa";

// Token por tema con al menos 3:1 sobre la superficie (contraste para gráficos, WCAG 1.4.11)
const LLENA = "text-estrella";
const VACIA = "text-linea";

/** Calificación de solo lectura */
export function Estrellas({ valor, tamano = 14, className = "" }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${valor} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} size={tamano} aria-hidden="true" className={n <= Math.round(valor) ? LLENA : VACIA} />
      ))}
    </span>
  );
}

/** Selector de 1 a 5 como grupo de radios: funciona con flechas del teclado */
export function SelectorEstrellas({ valor, onChange, etiqueta = "Calificación" }) {
  const [hover, setHover] = useState(0);
  const nombre = useId();
  const mostrado = hover || valor;

  return (
    <fieldset>
      <legend className="text-sm font-semibold mb-1.5">{etiqueta}</legend>
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="relative h-11 w-11 flex items-center justify-center rounded-full cursor-pointer hover:bg-hundido has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-foco"
            onMouseEnter={() => setHover(n)}
          >
            <input
              type="radio"
              name={nombre}
              value={n}
              checked={valor === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <FaStar size={26} aria-hidden="true" className={`transition-colors ${n <= mostrado ? LLENA : VACIA}`} />
            <span className="sr-only">
              {n} {n === 1 ? "estrella" : "estrellas"}
            </span>
          </label>
        ))}
        <span className="ml-2 text-sm text-tinta-suave cifras" aria-hidden="true">
          {valor ? `${valor} de 5` : ""}
        </span>
      </div>
    </fieldset>
  );
}
