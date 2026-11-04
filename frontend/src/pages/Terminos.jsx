// Términos de uso: /terminos
import PaginaLegal from "../components/layout/PaginaLegal";
import { useTitulo } from "../hooks/useTitulo";

const SECCIONES = [
  {
    id: "proyecto",
    titulo: "Qué es este sitio",
    contenido: (
      <p>
        El Búho Tragón es un proyecto académico de software hecho para la comunidad de la Universidad de Sonora. Sirve para consultar
        las cafeterías del campus Hermosillo: dónde están, sus horarios y sus menús con precio.
      </p>
    ),
  },
  {
    id: "exactitud",
    titulo: "Exactitud de la información",
    contenido: (
      <p>
        Los precios, menús y horarios se recopilan en los propios establecimientos. Se actualizan con frecuencia, pero cada cafetería
        puede cambiar precios o disponibilidad sin aviso, sobre todo en periodos de exámenes y vacaciones.
      </p>
    ),
  },
  {
    id: "resenas",
    titulo: "Opiniones de la comunidad",
    contenido: (
      <p>
        Las opiniones deben ser respetuosas y referirse a la experiencia en la cafetería. El equipo puede retirar contenido ofensivo,
        publicitario o ajeno al servicio.
      </p>
    ),
  },
  {
    id: "identidad",
    titulo: "Propiedad intelectual",
    contenido: (
      <p>
        Los logotipos institucionales se usan solo para identificar el contexto académico; este no es un sitio oficial de la UNISON. El
        código y el diseño pertenecen a sus desarrolladores del Departamento de Matemáticas.
      </p>
    ),
  },
];

export default function Terminos() {
  useTitulo("Términos de uso");
  return (
    <PaginaLegal
      titulo="Términos de uso"
      descripcion="Reglas para consultar el sitio y participar con opiniones."
      secciones={SECCIONES}
    />
  );
}
