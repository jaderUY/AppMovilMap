import { Coordenada } from '../models/punto-interes.model.js';

/** Distancia haversine en metros entre dos coordenadas. */
export function calcularDistanciaMetros(a: Coordenada, b: Coordenada): number {
  const R = 6_371_000;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

export function formatearDistancia(metros: number): string {
  return metros < 1000
    ? `${metros.toFixed(0)} m`
    : `${(metros / 1000).toFixed(2)} km`;
}