/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        canvas: "#0e2246",       // Azul oscuro institucional UNISON (con más presencia)
        canvasDeep: "#071326",   // Azul estructural más profundo (Header y Footer)
        panel: "#122b56",        // Superficie nivel 1
        surface: "#163466",      // Superficie nivel 2
        surfaceHover: "#1b3d75", // Hover sutil
        surfaceBorder: "rgba(255, 255, 255, 0.08)",
        
        // --- PALETA INSTITUCIONAL UNISON OSCURA ---
        unisonBlue: "#163A70",        // Azul principal UNISON
        unisonBlueDeep: "#0D2345",    // Azul profundo UNISON
        unisonBlueLight: "#204a8e",   // Azul acento legible sobre negro
        unisonGold: "#8A741F",        // Amarillo dorado sobrio UNISON
        unisonGoldLight: "#B39A3A",   // Amarillo claro puntual
        unisonRed: "#702B32",         // Rojo vino UNISON
        unisonRedDeep: "#421C21",     // Rojo profundo UNISON

        paper: "#F2F2F0",        // Blanco editorial sobrio
        silver: "#d4d4d4",       // Gris claro
        muted: "#737373",        // Gris informativo
        statusOpen: "#22c55e",   // Indicador funcional abierto
        statusClosed: "#525252", // Indicador funcional cerrado
      },
    },
  },
  plugins: [],
}
