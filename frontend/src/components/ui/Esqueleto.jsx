/** Bloque gris de carga; respeta prefers-reduced-motion (index.css corta la animación) */
export default function Esqueleto({ className = "" }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-caja bg-hundido ${className}`} />;
}
