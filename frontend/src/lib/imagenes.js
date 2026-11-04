// Fotos de las cafeterías.
// 1. Copias locales optimizadas (public/img/tienditas/<id>-480|960.webp, ~30 KB): rápidas y
//    servidas por el CDN de Amplify. El mapeo es por id de la base, como en la versión anterior.
// 2. La foto que guardó el admin, vía GET /api/Tienditas/<id>/imagen/ (con caché HTTP de un día).
// 3. Si el backend es el anterior, imagen_url ya viene en la respuesta como data URL.
import { API_URL } from "../config";

const CON_FOTO_LOCAL = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15]);

const fotoLocal = (id) =>
  CON_FOTO_LOCAL.has(id)
    ? {
        src: `/img/tienditas/${id}-480.webp`,
        srcSet: `/img/tienditas/${id}-480.webp 480w, /img/tienditas/${id}-960.webp 960w`,
      }
    : null;

const fotoDelServidor = (t) => {
  if (t.imagen_url) return { src: t.imagen_url };
  if (t.tiene_imagen) return { src: `${API_URL}/api/Tienditas/${t.id_tiendita}/imagen/` };
  return null;
};

/** Para listas: prioriza lo ligero */
export const fotoMiniatura = (t) => (t ? fotoLocal(t.id_tiendita) || fotoDelServidor(t) : null);

/** Para la ficha: prioriza la foto vigente del admin y cae a la local si falla */
export function fotoPrincipal(t) {
  if (!t) return null;
  const servidor = fotoDelServidor(t);
  const local = fotoLocal(t.id_tiendita);
  return servidor ? { ...servidor, respaldo: local?.src } : local;
}

export const ILUSTRACIONES = {
  carta: "/img/buho-carta.webp",
  cartel: "/img/buho-cartel.webp",
  dormido: "/img/buho-dormido.webp",
};

/**
 * Lee una foto elegida por el admin y la devuelve como data URL JPEG de máximo `lado` px.
 * Se guarda en imagen_url igual que antes (data URL), solo que mucho más ligera.
 */
export function reducirImagen(archivo, lado = 1280, calidad = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, lado / Math.max(img.width, img.height));
      const lienzo = document.createElement("canvas");
      lienzo.width = Math.round(img.width * escala);
      lienzo.height = Math.round(img.height * escala);
      lienzo.getContext("2d").drawImage(img, 0, 0, lienzo.width, lienzo.height);
      URL.revokeObjectURL(url);
      resolve(lienzo.toDataURL("image/jpeg", calidad));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}
