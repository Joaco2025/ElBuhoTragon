import { useEffect, useState } from "react";

/** La hora actual, refrescada cada minuto (para que "abierta/cerrada" cambie sola) */
export function useAhora() {
  const [ahora, setAhora] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return ahora;
}
