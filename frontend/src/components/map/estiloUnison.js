// Estilo del mapa con la paleta del sitio (fondo claro, tinta azul UNISON).
// Base: estilo "positron" de OpenFreeMap (vectorial, gratuito, sin llave, datos de OpenStreetMap).
// Se descarga una vez, se recolorea capa por capa y se le agregan edificios en 3D.
// Antes se usaba el estilo "dark" con la paleta nocturna; cambió con la identidad de nov 2026.

const ESTILO_BASE = "https://tiles.openfreemap.org/styles/positron";

// Tonos derivados de los tokens de frontend/src/index.css (@theme)
const PALETA = {
  // Suelo un par de tonos más oscuro que la página para que las calles blancas se lean
  fondo: "#D9E0E9",
  suelo: "#D3DAE4",
  agua: "#A9C3E2",
  parque: "#C9DCC2",
  edificio: "#C3CDDA",
  edificio3d: "#B3BFD1",
  calleMenor: "#FFFFFF",
  calleMayor: "#FFFFFF",
  autopista: "#F1D58A",    // oro aclarado
  borde: "#A9B4C5",
  linea: "#8792A6",
  texto: "#45526A",        // tinta-suave
  textoFuerte: "#0E2246",  // tinta
  halo: "#FFFFFF",
};

// [prefijo del id de capa, propiedad de pintura, color]; gana la primera coincidencia
const REGLAS = [
  ["background", "background-color", PALETA.fondo],
  ["water_name", "text-color", PALETA.texto],
  ["waterway_line_label", "text-color", PALETA.texto],
  ["waterway", "line-color", PALETA.agua],
  ["water", "fill-color", PALETA.agua],
  ["landuse_residential", "fill-color", PALETA.suelo],
  ["park", "fill-color", PALETA.parque],
  ["landcover_wood", "fill-color", PALETA.parque],
  ["building", "fill-color", PALETA.edificio],
  ["aeroway", "fill-color", PALETA.edificio],
  ["road_area_pier", "fill-color", PALETA.fondo],
  ["road_pier", "line-color", PALETA.fondo],
  ["highway_path", "line-color", PALETA.calleMenor],
  ["highway_minor", "line-color", PALETA.calleMenor],
  ["highway_major_casing", "line-color", PALETA.borde],
  ["highway_major", "line-color", PALETA.calleMayor],
  ["highway_motorway_casing", "line-color", PALETA.borde],
  ["highway_motorway_bridge_casing", "line-color", PALETA.borde],
  ["highway_motorway", "line-color", PALETA.autopista],
  ["tunnel_motorway", "line-color", PALETA.borde],
  ["highway-name", "text-color", PALETA.texto],
  ["railway", "line-color", PALETA.linea],
  ["boundary", "line-color", PALETA.linea],
  ["label_city", "text-color", PALETA.textoFuerte],
  ["label", "text-color", PALETA.texto],
];

function recolorear(estilo) {
  for (const capa of estilo.layers) {
    const regla = REGLAS.find(([prefijo, propiedad]) =>
      capa.id.startsWith(prefijo) && propiedad.startsWith(capa.type === "symbol" ? "text" : capa.type)
    );
    if (regla) capa.paint = { ...capa.paint, [regla[1]]: regla[2] };
    if (capa.type === "symbol" && capa.paint?.["text-halo-color"] !== undefined) {
      capa.paint["text-halo-color"] = PALETA.halo;
    }
  }

  // Edificios en 3D al acercarse (altura real de OpenStreetMap cuando existe)
  const indiceEtiquetas = estilo.layers.findIndex((capa) => capa.type === "symbol");
  estilo.layers.splice(indiceEtiquetas, 0, {
    id: "edificios-3d",
    type: "fill-extrusion",
    source: "openmaptiles",
    "source-layer": "building",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": PALETA.edificio3d,
      "fill-extrusion-height": ["coalesce", ["get", "render_height"], 6],
      "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
      "fill-extrusion-opacity": 0.85,
    },
  });
  return estilo;
}

let estiloEnCache = null;

// Una sola descarga por visita, compartida por todos los mapas de la página
export function cargarEstiloUnison() {
  if (!estiloEnCache) {
    estiloEnCache = fetch(ESTILO_BASE)
      .then((res) => {
        if (!res.ok) throw new Error(`Estilo del mapa: HTTP ${res.status}`);
        return res.json();
      })
      .then(recolorear)
      .catch((error) => {
        estiloEnCache = null; // permitir reintento en la siguiente carga
        throw error;
      });
  }
  return estiloEnCache;
}
