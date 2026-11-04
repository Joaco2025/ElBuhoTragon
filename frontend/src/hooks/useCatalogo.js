import { useCallback, useEffect, useMemo, useState } from "react";
import { obtenerCatalogo } from "../lib/api";

const VACIO = { tienditas: [], menus: [], facultades: [] };

/**
 * Cafeterías, menús y facultades con índices útiles.
 * @returns {{tienditas, menus, facultades, facultadPorId, menusPorTiendita, cargando, error, recargar}}
 */
export function useCatalogo() {
  const [datos, setDatos] = useState(VACIO);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback((forzar = false) => {
    let vigente = true;
    setCargando(true);
    setError(null);
    obtenerCatalogo({ forzar })
      .then((d) => vigente && setDatos(d))
      .catch((e) => {
        console.error("No se pudo cargar el catálogo:", e);
        if (vigente) setError(e);
      })
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, []);

  useEffect(() => cargar(), [cargar]);

  const facultadPorId = useMemo(
    () => Object.fromEntries(datos.facultades.map((f) => [f.id_facultad, f.nombre])),
    [datos.facultades]
  );

  const menusPorTiendita = useMemo(() => {
    const mapa = {};
    for (const m of datos.menus) (mapa[m.id_tiendita] ||= []).push(m);
    return mapa;
  }, [datos.menus]);

  return { ...datos, facultadPorId, menusPorTiendita, cargando, error, recargar: () => cargar(true) };
}
