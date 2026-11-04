// El Buhito: asistente sobre las cafeterías (RAG en Bedrock, endpoint /api/chatbot/).
// Contrato: {message, lat, lon, history} con history = últimos 6 pares [pregunta, respuesta];
// el backend corta mensajes de más de 500 caracteres. Las respuestas se muestran como
// texto plano (nunca HTML): vienen de un LLM.
import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiX } from "react-icons/fi";
import { API_URL } from "../../config";
import { ILUSTRACIONES } from "../../lib/imagenes";
import { useAtraparFoco } from "../../hooks/useAtraparFoco";
import { useAsistente } from "./contextoAsistente";

const LIMITE = 500;

const SALUDO = {
  tipo: "bot",
  texto: "Hola, soy el Buhito. Pregúntame qué comer, cuánto cuesta o qué cafetería te queda cerca.",
};

const SUGERENCIAS = [
  "¿Qué cafeterías están abiertas ahora?",
  "Algo de comer por menos de $50",
  "¿Dónde como cerca de Medicina?",
  "¿Quién tiene desayunos?",
];

function paresDeHistorial(historial) {
  const pares = [];
  for (let i = 0; i < historial.length - 1; i++) {
    if (historial[i].tipo === "usuario" && historial[i + 1].tipo === "bot") {
      pares.push([historial[i].texto, historial[i + 1].texto]);
    }
  }
  return pares.slice(-6);
}

// Si el usuario no responde al permiso, no se espera para siempre
function ubicacionActual() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 6000, maximumAge: 5 * 60 * 1000 }
    );
  });
}

// El modelo a veces escribe "\n" literal o junta las viñetas en una línea
function limpiarRespuesta(texto) {
  let limpio = texto.includes("\\n") ? texto.replace(/\\n/g, "\n") : texto;
  if (limpio.includes("•") && !limpio.includes("\n•")) {
    limpio = limpio
      .split("•")
      .map((parte, i) => (i === 0 ? parte : "• " + parte.trim()))
      .join("\n")
      .trim();
  }
  return limpio;
}

export default function ChatWidget() {
  const { abierto, cerrar, pregunta } = useAsistente();
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [historial, setHistorial] = useState([SALUDO]);
  const panel = useRef(null);
  const entrada = useRef(null);
  const final = useRef(null);

  useAtraparFoco(panel, abierto, cerrar);

  // Pregunta sugerida desde otra página ("Preguntar por esta cafetería")
  useEffect(() => {
    if (abierto && pregunta) {
      setMensaje(pregunta);
      requestAnimationFrame(() => entrada.current?.focus());
    }
  }, [abierto, pregunta]);

  useEffect(() => {
    final.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [historial, cargando]);

  const enviar = async (texto) => {
    const contenido = (typeof texto === "string" ? texto : mensaje).trim().slice(0, LIMITE);
    if (!contenido || cargando) return;

    const anterior = historial;
    setHistorial([...anterior, { tipo: "usuario", texto: contenido }]);
    setMensaje("");
    setCargando(true);

    try {
      const ubicacion = await ubicacionActual();
      const res = await fetch(`${API_URL}/api/chatbot/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: contenido,
          lat: ubicacion?.lat,
          lon: ubicacion?.lon,
          history: paresDeHistorial(anterior),
        }),
      });
      const datos = await res.json().catch(() => ({}));
      if (res.status === 429) throw new Error("limite");
      if (!datos.success) throw new Error(datos.error || "Respuesta sin éxito");
      setHistorial((h) => [...h, { tipo: "bot", texto: limpiarRespuesta(datos.answer) }]);
    } catch (error) {
      console.error("Error con el asistente:", error);
      setHistorial((h) => [
        ...h,
        {
          tipo: "bot",
          error: true,
          texto:
            error.message === "limite"
              ? "Llegaste al límite de preguntas por ahora. Intenta de nuevo en un rato."
              : "No pude responder en este momento. Revisa tu conexión e inténtalo otra vez.",
        },
      ]);
    } finally {
      setCargando(false);
      entrada.current?.focus();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-velo/55 transition-opacity duration-200 ${abierto ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={cerrar}
        aria-hidden="true"
      />

      <aside
        id="asistente"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="asistente-titulo"
        inert={!abierto}
        className={`fixed inset-y-0 right-0 z-[95] w-full sm:w-[440px] flex flex-col bg-fondo shadow-[-24px_0_48px_-16px_rgba(14,34,70,0.4)] duration-300 ease-[var(--ease-salida)] ${
          // Al abrir, la visibilidad cambia de inmediato (si se animara, el foco no podría entrar);
          // al cerrar, se oculta al terminar el deslizamiento
          abierto ? "translate-x-0 visible transition-[translate]" : "translate-x-full invisible transition-[translate,visibility]"
        }`}
      >
        <div className="flex items-center gap-3 bg-superficie px-4 sm:px-5 h-16 sm:h-[4.5rem] shrink-0">
          <img src={ILUSTRACIONES.carta} alt="" width="40" height="40" className="h-10 w-10 object-contain" />
          <div className="min-w-0">
            <h2 id="asistente-titulo" className="font-display text-xl font-bold leading-tight">
              El Buhito
            </h2>
            <p className="text-sm text-tinta-suave leading-tight">Responde con los menús y horarios del sitio</p>
          </div>
          <button
            type="button"
            onClick={cerrar}
            className="ml-auto h-11 w-11 rounded-full flex items-center justify-center text-tinta-suave hover:bg-hundido hover:text-tinta cursor-pointer"
            aria-label="Cerrar asistente"
          >
            <FiX size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-5 space-y-3" role="log" aria-live="polite" aria-relevant="additions">
          {historial.map((m, i) => (
            <div key={i} className={`flex ${m.tipo === "usuario" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[88%] px-4 py-3 text-[0.98rem] leading-relaxed whitespace-pre-line break-words ${
                  m.tipo === "usuario"
                    ? "bg-azul text-white rounded-2xl rounded-br-md"
                    : m.error
                      ? "bg-error-suave text-error rounded-2xl rounded-bl-md"
                      : "bg-superficie text-tinta rounded-2xl rounded-bl-md"
                }`}
              >
                <span className="sr-only">{m.tipo === "usuario" ? "Tú: " : "Buhito: "}</span>
                {m.texto}
              </p>
            </div>
          ))}

          {historial.length === 1 && !cargando && (
            <div className="pt-3">
              <p className="text-sm font-semibold text-tinta-suave mb-2">Puedes empezar con</p>
              <ul className="flex flex-col gap-2">
                {SUGERENCIAS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => enviar(s)}
                      className="w-full text-left min-h-11 px-4 py-2.5 rounded-caja bg-superficie hover:bg-oro-suave text-tinta transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cargando && (
            <div className="flex justify-start" role="status">
              <span className="inline-flex items-center gap-1.5 bg-superficie rounded-2xl rounded-bl-md px-4 py-3.5">
                <span className="sr-only">El Buhito está escribiendo</span>
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-2 w-2 rounded-full bg-tinta-suave animate-pulse" style={{ animationDelay: `${d}ms` }} aria-hidden="true" />
                ))}
              </span>
            </div>
          )}
          <div ref={final} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar();
          }}
          className="bg-superficie px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0"
        >
          <label htmlFor="asistente-entrada" className="sr-only">
            Tu pregunta para el Buhito
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="asistente-entrada"
              ref={entrada}
              data-autofocus
              rows={1}
              value={mensaje}
              maxLength={LIMITE}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviar();
                }
              }}
              placeholder="Escribe tu pregunta"
              className="flex-1 resize-none max-h-32 rounded-3xl bg-fondo border border-borde-campo px-4 py-3 text-base placeholder:text-tinta-suave/80 focus:outline-none focus-visible:outline-3 focus-visible:outline-foco"
            />
            <button
              type="submit"
              disabled={!mensaje.trim() || cargando}
              className="h-12 w-12 shrink-0 rounded-full bg-azul text-white flex items-center justify-center hover:bg-azul-hondo disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Enviar pregunta"
            >
              <FiArrowUp size={20} aria-hidden="true" />
            </button>
          </div>
          {mensaje.length > LIMITE - 80 && (
            <p className="mt-1.5 text-sm text-tinta-suave cifras" aria-live="polite">
              {LIMITE - mensaje.length} caracteres disponibles
            </p>
          )}
        </form>
      </aside>
    </>
  );
}
