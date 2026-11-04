import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

const TIPOS = {
  error: { clases: "bg-error-suave text-error", Icono: FiAlertCircle, rol: "alert" },
  exito: { clases: "bg-abierto-suave text-abierto", Icono: FiCheckCircle, rol: "status" },
  info: { clases: "bg-oro-suave text-oro-tinta", Icono: FiInfo, rol: "status" },
};

/** Mensaje en línea (errores de formulario, confirmaciones) */
export default function Aviso({ tipo = "info", children, className = "" }) {
  const { clases, Icono, rol } = TIPOS[tipo];
  return (
    <div role={rol} className={`flex items-start gap-2.5 rounded-caja px-4 py-3 text-[0.95rem] font-medium ${clases} ${className}`}>
      <Icono className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
