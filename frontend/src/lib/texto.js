// Reparación de texto con acentos dañados en la base de datos.
// Parte de los menús se capturó con UTF-8 leído como CP850 ("jamón" quedó "jam├│n",
// "•" quedó "ÔÇó"): 171 de ~960 campos en nov 2026. Esto solo corrige lo que se muestra;
// los datos siguen igual hasta que se limpien en el servidor.

// Caracteres 0x80-0xFF de la página de códigos CP850, en orden
const CP850 = "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ";
const BYTE_DE = new Map([...CP850].map((c, i) => [c, 0x80 + i]));
// Dibujo de cajas (no aparece en un menú bien escrito) o "ÔÇ", el inicio de •, “ ” y — dañados
const SOSPECHOSO = /[\u2500-\u259f]|ÔÇ/;
const decodificador = new TextDecoder("utf-8", { fatal: true });

export function repararTexto(texto) {
  if (typeof texto !== "string" || !SOSPECHOSO.test(texto)) return texto;
  const bytes = [];
  for (const c of texto) {
    const codigo = c.charCodeAt(0);
    if (codigo < 0x80) bytes.push(codigo);
    else if (BYTE_DE.has(c)) bytes.push(BYTE_DE.get(c));
    else return texto; // no es este tipo de daño: se deja como está
  }
  try {
    return decodificador.decode(new Uint8Array(bytes));
  } catch {
    return texto;
  }
}

/** Platillo con nombre y descripción reparados */
export const repararPlatillo = (m) => ({ ...m, nombre: repararTexto(m.nombre), descripcion: repararTexto(m.descripcion) });
