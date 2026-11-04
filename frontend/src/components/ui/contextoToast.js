import { createContext, useContext } from "react";

/** mostrar(mensaje, tipo = "exito" | "error"); lo provee <ProveedorToast> */
export const ContextoToast = createContext(() => {});

export const useToast = () => useContext(ContextoToast);
