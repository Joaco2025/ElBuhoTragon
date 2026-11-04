import { createContext, useContext } from "react";

/** { abierto, abrir(preguntaInicial?), cerrar, alternar } — lo provee AppShell */
export const ContextoAsistente = createContext({
  abierto: false,
  pregunta: "",
  abrir: () => {},
  cerrar: () => {},
  alternar: () => {},
});

export const useAsistente = () => useContext(ContextoAsistente);
