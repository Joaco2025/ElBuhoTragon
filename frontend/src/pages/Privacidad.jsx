// Aviso de privacidad: /privacidad
import PaginaLegal from "../components/layout/PaginaLegal";
import { useTitulo } from "../hooks/useTitulo";

const SECCIONES = [
  {
    id: "principio",
    titulo: "Sin venta de datos",
    contenido: (
      <p>
        El Búho Tragón no vende, transfiere ni comparte información de sus usuarios con terceros ni con empresas de publicidad. No usa
        rastreadores comerciales ni cookies de terceros.
      </p>
    ),
  },
  {
    id: "cuenta",
    titulo: "Datos de tu cuenta",
    contenido: (
      <p>
        Al registrarte guardamos tu nombre de usuario, tu correo institucional (@unison.mx) y tu contraseña cifrada con un algoritmo
        de hash seguro. Se usan solo para iniciar sesión y para firmar tus opiniones.
      </p>
    ),
  },
  {
    id: "ubicacion",
    titulo: "Ubicación",
    contenido: (
      <p>
        El asistente puede pedir tu ubicación para calcular qué cafetería te queda más cerca. Las coordenadas se usan solo para responder
        esa pregunta y no se guardan. Si no das permiso, el asistente responde igual, sin distancias.
      </p>
    ),
  },
  {
    id: "contacto",
    titulo: "Contacto",
    contenido: (
      <p>
        Para dudas sobre tus datos o tu cuenta, escribe al equipo de desarrollo desde la página de contacto, en el Departamento de
        Matemáticas de la Universidad de Sonora.
      </p>
    ),
  },
];

export default function Privacidad() {
  useTitulo("Aviso de privacidad");
  return (
    <PaginaLegal
      titulo="Aviso de privacidad"
      descripcion="Qué datos guarda el sitio, para qué y qué no hace con ellos."
      secciones={SECCIONES}
    />
  );
}
