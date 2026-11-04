import EncabezadoPagina, { Contenedor } from "./EncabezadoPagina";

/** Términos, privacidad y textos similares: secciones con título, medida de lectura cómoda */
export default function PaginaLegal({ titulo, descripcion, secciones, actualizado }) {
  return (
    <Contenedor className="pt-8 sm:pt-12">
      <EncabezadoPagina titulo={titulo} descripcion={descripcion} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <nav aria-label="En esta página" className="lg:sticky lg:top-24 self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {secciones.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex min-h-11 items-center rounded-full lg:rounded-caja px-4 lg:px-3 bg-superficie lg:bg-transparent font-semibold hover:bg-hundido">
                  {s.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-[68ch] space-y-10">
          {secciones.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`}>
              <h2 id={`${s.id}-t`} className="font-display text-2xl sm:text-3xl font-semibold">
                {s.titulo}
              </h2>
              <div className="mt-3 space-y-3 text-[1.08rem] leading-relaxed">{s.contenido}</div>
            </section>
          ))}
          {actualizado && <p className="text-sm text-tinta-suave">Última actualización: {actualizado}</p>}
        </div>
      </div>
    </Contenedor>
  );
}
