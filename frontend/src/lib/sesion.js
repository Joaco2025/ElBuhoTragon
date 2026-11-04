// Sesión guardada en localStorage por el login (mismas llaves que antes:
// access_token, refresh_token, username, es_admin). Ocultar botones según la sesión es
// cosmético: el permiso real lo decide el backend (permissions.py).
import { useEffect, useState } from "react";

export function leerSesion() {
  const usuario = localStorage.getItem("username");
  const token = localStorage.getItem("access_token");
  if (!usuario || !token) return null;
  const admin = localStorage.getItem("es_admin");
  return { usuario, token, esAdmin: admin === "1" || admin === "true" };
}

export function guardarSesion({ access_token, refresh_token, username, es_admin }) {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("username", username);
  localStorage.setItem("es_admin", es_admin);
  // El evento "storage" solo llega a las otras pestañas; a esta se le avisa a mano
  window.dispatchEvent(new Event("storage"));
}

export function cerrarSesion() {
  localStorage.clear();
  window.dispatchEvent(new Event("storage"));
}

/** user_id del payload del JWT (sin verificar: el backend lo vuelve a sacar del token) */
export function idUsuarioDelToken(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json).user_id ?? null;
  } catch {
    return null;
  }
}

export function useSesion() {
  const [sesion, setSesion] = useState(leerSesion);
  useEffect(() => {
    const actualizar = () => setSesion(leerSesion());
    window.addEventListener("storage", actualizar);
    return () => window.removeEventListener("storage", actualizar);
  }, []);
  return sesion;
}
