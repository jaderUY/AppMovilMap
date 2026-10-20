import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Coordenada } from '../models/punto-interes.model.js';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  private readonly OSRM = 'https://router.project-osrm.org/route/v1/foot';

  async obtenerRuta(origen: Coordenada, destino: Coordenada): Promise<L.LatLng[]> {
    const url =
      `${this.OSRM}/${origen.lng},${origen.lat};${destino.lng},${destino.lat}` +
      `?overview=full&geometries=geojson`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM respondió ${res.status}`);

    const data = await res.json();
    const route = data?.routes?.[0];
    if (!route) throw new Error('No se encontró ruta');

    return (route.geometry.coordinates as [number, number][]).map(
      ([lng, lat]) => L.latLng(lat, lng)
    );
  }
}

