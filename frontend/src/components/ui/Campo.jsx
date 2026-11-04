import { useId } from "react";

const CLASE_CONTROL =
  "w-full rounded-caja bg-superficie border border-borde-campo text-tinta text-base px-3.5 py-3 " +
  "placeholder:text-tinta-suave/80 transition-colors hover:border-tinta-suave " +
  "focus:outline-none focus-visible:outline-3 focus-visible:outline-azul focus-visible:outline-offset-1 " +
  "aria-[invalid=true]:border-error disabled:bg-hundido";

/**
 * Etiqueta visible + control + texto de ayuda o error, enlazados con aria-describedby.
 * `como`: "input" (por defecto), "textarea" o "select".
 */
export default function Campo({ etiqueta, ayuda, error, como = "input", className = "", children, adorno, ...props }) {
  const id = useId();
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const describedBy = [idAyuda, idError].filter(Boolean).join(" ") || undefined;
  const Control = como;

  return (
    <div className={className}>
      <label htmlFor={props.id || id} className="block text-sm font-semibold text-tinta mb-1.5">
        {etiqueta}
      </label>
      <div className="relative">
        <Control
          id={props.id || id}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${CLASE_CONTROL} ${adorno ? "pr-12" : ""} ${como === "textarea" ? "resize-y min-h-28" : ""}`}
          {...props}
        >
          {children}
        </Control>
        {adorno && <div className="absolute inset-y-0 right-1 flex items-center">{adorno}</div>}
      </div>
      {ayuda && (
        <p id={idAyuda} className="mt-1.5 text-sm text-tinta-suave">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={idError} className="mt-1.5 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
