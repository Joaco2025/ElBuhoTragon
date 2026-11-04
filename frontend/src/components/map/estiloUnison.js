// Estilo del mapa con la paleta del sitio, en sus dos temas (oscuro por defecto y claro).
// Base: estilo "positron" de OpenFreeMap (vectorial, gratuito, sin llave, datos de OpenStreetMap).
// Se descarga una vez, se recolorea capa por capa según el tema y se le agregan edificios en 3D.

const ESTILO_BASE = "https://tiles.openfreemap.org/styles/positron";

// Tonos derivados de los tokens de frontend/src/index.css (@theme y [data-tema="claro"])
const PALETAS = {
  oscuro: {
    fondo: "#0E1D3B",
    suelo: "#12234A",
    agua: "#0A2A55",
    parque: "#12324A",
    edificio: "#1C3160",       // hundido
    edificio3d: "#26427C",
    calleMenor: "#2A4A85",
    calleMayor: "#3460A8",
    autopista: "#8A6F1E",      // oro apagado
    borde: "#0B1730",          // fondo
    linea: "#3A4D73",
    texto: "#A8B5CC",          // tinta-suave
    textoFuerte: "#ECF0F6",    // tinta
    halo: "#0B1730",
  },
  claro: {
    // Suelo un par de tonos más oscuro que la página para que las calles blancas se lean
    fondo: "#D9E0E9",
    suelo: "#D3DAE4",
    agua: "#A9C3E2",
    parque: "#C9DCC2",
    edificio: "#C3CDDA",
    edificio3d: "#B3BFD1",
    calleMenor: "#FFFFFF",
    calleMayor: "#FFFFFF",
    autopista: "#F1D58A",      // oro aclarado
    borde: "#A9B4C5",
    linea: "#8792A6",
    texto: "#45526A",          // tinta-suave
    textoFuerte: "#0E2246",    // tinta
    halo: "#FFFFFF",
  },
};

// [prefijo del id de capa, propiedad de pintura, clave de la paleta]; gana la primera coincidencia
const REGLAS = [
  ["background", "background-color", "fondo"],
  ["water_name", "text-color", "texto"],
  ["waterway_line_label", "text-color", "texto"],
  ["waterway", "line-color", "agua"],
  ["water", "fill-color", "agua"],
  ["landuse_residential", "fill-color", "suelo"],
  ["park", "fill-color", "parque"],
  ["landcover_wood", "fill-color", "parque"],
  ["building", "fill-color", "edificio"],
  ["aeroway", "fill-color", "edificio"],
  ["road_area_pier", "fill-color", "fondo"],
  ["road_pier", "line-color", "fondo"],
  ["highway_path", "line-color", "calleMenor"],
  ["highway_minor", "line-color", "calleMenor"],
  ["highway_major_casing", "line-color", "borde"],
  ["highway_major", "line-color", "calleMayor"],
  ["highway_motorway_casing", "line-color", "borde"],
  ["highway_motorway_bridge_casing", "line-color", "borde"],
  ["highway_motorway", "line-color", "autopista"],
  ["tunnel_motorway", "line-color", "borde"],
  ["highway-name", "text-color", "texto"],
  ["railway", "line-color", "linea"],
  ["boundary", "line-color", "linea"],
  ["label_city", "text-color", "textoFuerte"],
  ["label", "text-color", "texto"],
];

function recolorear(base, tema) {
  const paleta = PALETAS[tema] ?? PALETAS.oscuro;
  const estilo = structuredClone(base);
  for (const capa of estilo.layers) {
    const regla = REGLAS.find(([prefijo, propiedad]) =>
      capa.id.startsWith(prefijo) && propiedad.startsWith(capa.type === "symbol" ? "text" : capa.type)
    );
    if (regla) capa.paint = { ...capa.paint, [regla[1]]: paleta[regla[2]] };
    if (capa.type === "symbol" && capa.paint?.["text-halo-color"] !== undefined) {
      capa.paint["text-halo-color"] = paleta.halo;
    }
    // El fondo de las zonas residenciales de positron se desvanece con el zoom; aquí se deja fijo
    if (capa.id === "landuse_residential") capa.paint["fill-opacity"] = 0.8;
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
      "fill-extrusion-color": paleta.edificio3d,
      "fill-extrusion-height": ["coalesce", ["get", "render_height"], 6],
      "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
      "fill-extrusion-opacity": 0.85,
    },
  });
  return estilo;
}

let baseEnCache = null;

// Una sola descarga por visita, compartida por todos los mapas y los dos temas
function cargarBase() {
  if (!baseEnCache) {
    baseEnCache = fetch(ESTILO_BASE)
      .then((res) => {
        if (!res.ok) throw new Error(`Estilo del mapa: HTTP ${res.status}`);
        return res.json();
      })
      .catch((error) => {
        baseEnCache = null; // permitir reintento en la siguiente carga
        throw error;
      });
  }
  return baseEnCache;
}

/** Estilo listo para MapLibre en el tema pedido ("oscuro" o "claro"); siempre una copia nueva */
export function cargarEstiloUnison(tema = "oscuro") {
  return cargarBase().then((base) => recolorear(base, tema));
}
