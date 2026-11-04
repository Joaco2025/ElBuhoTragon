import { Link } from "react-router-dom";
import { clasesBoton } from "./clasesBoton";

/** <Boton> o, con `to`, un <Link> con el mismo aspecto */
export default function Boton({ variante, tamano, className, to, type = "button", children, ...props }) {
  const clases = clasesBoton({ variante, tamano, className });
  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={clases} {...props}>
      {children}
    </button>
  );
}
