/** Título de página (h1) con su descripción y, opcionalmente, acciones a la derecha */
export default function EncabezadoPagina({ titulo, descripcion, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight text-balance">
          {titulo}
        </h1>
        {descripcion && <p className="mt-3 text-lg text-tinta-suave max-w-2xl text-pretty">{descripcion}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-3 shrink-0">{children}</div>}
    </div>
  );
}

/** Contenedor con los márgenes del sitio */
export function Contenedor({ as = "div", className = "", children, ...props }) {
  const Etiqueta = as;
  return (
    <Etiqueta className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </Etiqueta>
  );
}
