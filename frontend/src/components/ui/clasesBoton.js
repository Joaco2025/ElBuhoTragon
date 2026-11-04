// Botones planos de un solo relleno, siempre redondos y de al menos 44 px de alto.
const VARIANTES = {
  primario: "bg-azul text-white hover:bg-azul-hondo active:bg-azul-hondo",
  secundario: "bg-hundido text-tinta hover:bg-linea active:bg-linea",
  oro: "bg-oro text-tinta hover:brightness-95 active:brightness-90",
  peligro: "bg-error text-white hover:brightness-110 active:brightness-95",
  fantasma: "text-azul hover:bg-hundido active:bg-linea",
};

const TAMANOS = {
  normal: "min-h-11 px-5 text-[0.95rem]",
  chico: "min-h-10 px-4 text-sm",
  icono: "h-11 w-11 justify-center",
};

export function clasesBoton({ variante = "primario", tamano = "normal", className = "" } = {}) {
  return [
    "inline-flex items-center gap-2 rounded-full font-semibold transition-[background-color,filter,transform] duration-150",
    "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer select-none",
    VARIANTES[variante],
    TAMANOS[tamano],
    className,
  ].join(" ");
}
