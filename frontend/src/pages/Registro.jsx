// Registro: /registro
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PantallaCuenta from "../components/layout/PantallaCuenta";
import Campo from "../components/ui/Campo";
import CampoContrasena from "../components/ui/CampoContrasena";
import Boton from "../components/ui/Boton";
import Aviso from "../components/ui/Aviso";
import { useTitulo } from "../hooks/useTitulo";
import { pedir } from "../lib/api";

const VACIO = { nombre_usuario: "", email: "", contrasena: "" };

// El backend responde {campo: ["mensaje", ...]} (DRF); se muestra junto a cada campo
const primerMensaje = (valor) => (Array.isArray(valor) ? valor[0] : valor);

export default function Registro() {
  useTitulo("Crear cuenta");
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [general, setGeneral] = useState("");
  const [creada, setCreada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const formulario = useRef(null);
  const enfocarError = useRef(false);

  // Tras un envío con errores, el foco va al primer campo marcado (no mientras se escribe)
  useEffect(() => {
    if (!enfocarError.current) return;
    enfocarError.current = false;
    formulario.current?.querySelector("[aria-invalid=true]")?.focus();
  }, [errores]);

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    if (errores[e.target.name]) setErrores({ ...errores, [e.target.name]: undefined });
  };

  const registrar = async (e) => {
    e.preventDefault();
    setGeneral("");
    const propios = {};
    if (!datos.nombre_usuario.trim()) propios.nombre_usuario = "Escribe un nombre de usuario.";
    if (!datos.email.trim().toLowerCase().endsWith("@unison.mx")) propios.email = "Usa tu correo institucional, que termina en @unison.mx.";
    if (!datos.contrasena) propios.contrasena = "Escribe una contraseña.";
    enfocarError.current = true;
    setErrores(propios);
    if (Object.keys(propios).length) return;

    setEnviando(true);
    try {
      await pedir("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, email: datos.email.trim() }),
      });
      setCreada(true);
      setDatos(VACIO);
    } catch (err) {
      if (err.status === 400 && err.datos) {
        enfocarError.current = true;
        setErrores({
          nombre_usuario: primerMensaje(err.datos.nombre_usuario),
          email: primerMensaje(err.datos.email),
          contrasena: primerMensaje(err.datos.contrasena),
        });
        if (err.datos.detail) setGeneral(err.datos.detail);
      } else {
        setGeneral(
          err.status === 429
            ? "Se hicieron muchos registros desde esta red. Inténtalo más tarde."
            : err.status
              ? "El servidor no pudo crear la cuenta. Inténtalo más tarde."
              : "Sin conexión con el servidor. Revisa tu red e inténtalo de nuevo."
        );
      }
    } finally {
      setEnviando(false);
    }
  };

  if (creada) {
    return (
      <PantallaCuenta titulo="Cuenta creada" descripcion="Ya puedes iniciar sesión con tu usuario y contraseña.">
        <Aviso tipo="exito">Tu cuenta quedó registrada.</Aviso>
        <Boton to="/login" className="mt-6 w-full justify-center">
          Iniciar sesión
        </Boton>
      </PantallaCuenta>
    );
  }

  return (
    <PantallaCuenta
      titulo="Crear cuenta"
      descripcion="Solo necesitas tu correo de la UNISON."
      pie={
        <p>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-enlace underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      }
    >
      <form ref={formulario} onSubmit={registrar} noValidate className="space-y-5">
        {general && <Aviso tipo="error">{general}</Aviso>}
        <Campo
          etiqueta="Nombre de usuario"
          name="nombre_usuario"
          autoComplete="username"
          spellCheck={false}
          autoCapitalize="none"
          required
          value={datos.nombre_usuario}
          onChange={cambiar}
          error={errores.nombre_usuario}
          ayuda="Es el nombre que aparecerá en tus opiniones."
        />
        <Campo
          etiqueta="Correo institucional"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          inputMode="email"
          required
          value={datos.email}
          onChange={cambiar}
          error={errores.email}
          placeholder="a222000000@unison.mx"
        />
        <CampoContrasena
          etiqueta="Contraseña"
          name="contrasena"
          autoComplete="new-password"
          required
          value={datos.contrasena}
          onChange={cambiar}
          error={errores.contrasena}
          ayuda="Mínimo 8 caracteres, que no sea solo números ni una contraseña común."
        />
        <Boton type="submit" disabled={enviando} className="w-full justify-center">
          {enviando ? "Creando cuenta…" : "Crear cuenta"}
        </Boton>
        <p className="text-sm text-tinta-suave">
          Qué datos guardamos y cómo se usan: <Link to="/privacidad" className="underline">aviso de privacidad</Link> y{" "}
          <Link to="/terminos" className="underline">términos de uso</Link>.
        </p>
      </form>
    </PantallaCuenta>
  );
}
