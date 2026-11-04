import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Campo from "./Campo";

/** Campo de contraseña con botón para mostrarla */
export default function CampoContrasena(props) {
  const [visible, setVisible] = useState(false);
  return (
    <Campo
      {...props}
      type={visible ? "text" : "password"}
      adorno={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:text-tinta hover:bg-hundido cursor-pointer"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={visible}
        >
          {visible ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}
        </button>
      }
    />
  );
}
