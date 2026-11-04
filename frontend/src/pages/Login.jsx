// Inicio de sesión: /login
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PantallaCuenta from "../components/layout/PantallaCuenta";
import Campo from "../components/ui/Campo";
import CampoContrasena from "../components/ui/CampoContrasena";
import Boton from "../components/ui/Boton";
import Aviso from "../components/ui/Aviso";
import { useTitulo } from "../hooks/useTitulo";
import { pedir } from "../lib/api";
import { guardarSesion } from "../lib/sesion";
import { PASAPORTE_ACTIVO } from "../config";

export default function Login() {
  useTitulo("Iniciar sesión");
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const datos = await pedir("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!datos?.success) throw Object.assign(new Error(datos?.error), { status: 400 });
      guardarSesion(datos);
      // Vuelve a la página desde la que se pidió iniciar sesión (p. ej. para dejar una reseña)
      navigate(location.state?.desde || "/", { replace: true });
    } catch (err) {
      setError(
        err.status === 429
          ? "Demasiados intentos. Espera unos minutos antes de volver a intentar."
          : err.status
            ? err.datos?.error || "Usuario o contraseña incorrectos."
            : "Sin conexión con el servidor. Revisa tu red e inténtalo de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PantallaCuenta
      titulo="Iniciar sesión"
      descripcion={`Entra para publicar opiniones${PASAPORTE_ACTIVO ? " y llevar tu Pasaporte Tragón" : ""}.`}
      pie={
        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-semibold text-enlace underline underline-offset-4">
            Crea una con tu correo @unison.mx
          </Link>
        </p>
      }
    >
      <form onSubmit={entrar} className="space-y-5">
        {error && <Aviso tipo="error">{error}</Aviso>}
        <Campo
          etiqueta="Nombre de usuario"
          name="username"
          autoComplete="username"
          spellCheck={false}
          autoCapitalize="none"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <CampoContrasena
          etiqueta="Contraseña"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Boton type="submit" disabled={enviando} className="w-full justify-center">
          {enviando ? "Entrando…" : "Iniciar sesión"}
        </Boton>
      </form>
    </PantallaCuenta>
  );
}
