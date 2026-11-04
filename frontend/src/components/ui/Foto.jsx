import { useState } from "react";
import { ILUSTRACIONES } from "../../lib/imagenes";

/**
 * Foto con carga diferida, caja de proporción fija (sin saltos de layout) y respaldo:
 * si la imagen falla, prueba `foto.respaldo` y al final muestra el búho de la carta.
 * `sizes` le dice al navegador qué ancho de srcSet descargar.
 */
export default function Foto({ foto, alt = "", proporcion = "aspect-[4/3]", sizes = "(min-width: 768px) 320px, 40vw", prioridad = false, className = "" }) {
  const [intento, setIntento] = useState(0);
  const candidatos = [foto?.src, foto?.respaldo].filter(Boolean);
  const src = candidatos[intento];

  return (
    <div className={`relative overflow-hidden bg-hundido ${proporcion} ${className}`}>
      {src ? (
        <img
          src={src}
          srcSet={intento === 0 ? foto.srcSet : undefined}
          sizes={foto?.srcSet && intento === 0 ? sizes : undefined}
          alt={alt}
          loading={prioridad ? "eager" : "lazy"}
          fetchPriority={prioridad ? "high" : undefined}
          decoding="async"
          onError={() => setIntento((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img src={ILUSTRACIONES.carta} alt="" className="absolute inset-0 m-auto h-1/2 w-1/2 object-contain opacity-60" />
      )}
    </div>
  );
}
