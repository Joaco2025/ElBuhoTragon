// Estado de apertura de una cafetería a partir de hora_apertura / hora_cierre ("HH:MM:SS").
// La base de datos no guarda días de la semana: se asume el mismo horario todos los días,
// igual que la versión anterior del sitio.

const aMinutos = (hora) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

export const horaCorta = (hora) => (hora ? hora.slice(0, 5) : null);

export const rangoHorario = (tiendita) =>
  tiendita?.hora_apertura && tiendita?.hora_cierre
    ? `${horaCorta(tiendita.hora_apertura)} a ${horaCorta(tiendita.hora_cierre)}`
    : null;

/**
 * @returns {{abierta: boolean, conHorario: boolean, texto: string}}
 *   texto: frase corta para mostrar ("Abierta hasta las 19:00", "Abre mañana a las 07:00")
 */
export function estadoApertura(tiendita, ahora = new Date()) {
  if (!tiendita?.hora_apertura || !tiendita?.hora_cierre) {
    return { abierta: false, conHorario: false, texto: "Horario sin registrar" };
  }
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const inicio = aMinutos(tiendita.hora_apertura);
  const fin = aMinutos(tiendita.hora_cierre);
  const apertura = horaCorta(tiendita.hora_apertura);
  const cierre = horaCorta(tiendita.hora_cierre);

  if (minutos >= inicio && minutos < fin) {
    const restante = fin - minutos;
    return {
      abierta: true,
      conHorario: true,
      texto: restante <= 45 ? `Cierra en ${restante} min` : `Abierta hasta las ${cierre}`,
    };
  }
  return {
    abierta: false,
    conHorario: true,
    texto: minutos < inicio ? `Abre hoy a las ${apertura}` : `Abre mañana a las ${apertura}`,
  };
}

/** Hora de apertura más temprana entre varias cafeterías (para "todo cerrado, abren a las…") */
export function primeraApertura(tienditas) {
  const horas = tienditas.map((t) => t.hora_apertura).filter(Boolean).sort();
  return horas.length ? horaCorta(horas[0]) : null;
}
