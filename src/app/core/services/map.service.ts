import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Coordenada, PuntoInteres, TipoPunto } from '../models/punto-interes.model.js';
import { formatearDistancia } from '../utils/geo.utils.js';

@Injectable({ providedIn: 'root' })
export class MapService {
  private map?: L.Map;
  private rutaActual?: L.Polyline;
  private userMarker?: L.Marker;

  // Icons personalizados por tipo (los que ya tienes en assets/icon/).
  private readonly iconosPorTipo: Partial<Record<TipoPunto, L.Icon>> = {
    cafeteria:  L.icon({ iconUrl: 'assets/icon/cafe.png',   iconSize: [30, 30], popupAnchor: [0, -15] }),
    biblioteca: L.icon({ iconUrl: 'assets/icon/book.png',   iconSize: [30, 30], popupAnchor: [0, -15] }),
    bano:       L.icon({ iconUrl: 'assets/icon/bano.png',   iconSize: [30, 30], popupAnchor: [0, -15] }),
  };

  private readonly iconoUsuario = L.icon({
    iconUrl: 'assets/icon/marker.png',
    iconSize: [30, 40],
    popupAnchor: [0, -20],
  });

  private readonly iconoFallback = L.divIcon({
    className: 'fallback-marker',
    html: '<span></span>',
    iconSize: [22, 22],
    popupAnchor: [0, -11],
  });

  init(containerId: string, centro: Coordenada, zoom = 16): L.Map {
    if (this.map) return this.map;
    this.map = L.map(containerId).setView([centro.lat, centro.lng], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    return this.map;
  }

  focusOn(centro: Coordenada, zoom = 17): void {
    this.map?.setView([centro.lat, centro.lng], zoom);
  }

  addUserMarker(pos: Coordenada): void {
    if (!this.map) return;
    this.userMarker?.remove();
    this.userMarker = L.marker([pos.lat, pos.lng], { icon: this.iconoUsuario })
      .addTo(this.map)
      .bindPopup('Estás aquí')
      .openPopup();
  }

  addPuntoMarker(
    punto: PuntoInteres,
    distanciaMetros: number,
    onRuta: (p: PuntoInteres) => void
  ): void {
    if (!this.map) return;

    const icon = this.iconosPorTipo[punto.tipo] ?? this.iconoFallback;
    const marker = L.marker([punto.lat, punto.lng], { icon }).addTo(this.map);

    const html = `
      <div class="punto-popup">
        <img src="${punto.foto}" alt="${punto.nombre}" loading="lazy" />
        <h3>${punto.nombre}</h3>
        <p class="coords">
          <strong>Lat:</strong> ${punto.lat.toFixed(5)}<br/>
          <strong>Lng:</strong> ${punto.lng.toFixed(5)}
        </p>
        <p class="dist"><strong>Distancia:</strong> ${formatearDistancia(distanciaMetros)}</p>
        <button type="button" class="btn-ruta">Cómo llegar</button>
      </div>`;

    marker.bindPopup(html, { maxWidth: 300, className: 'punto-popup-wrap' });

    marker.on('popupopen', () => {
      const el = marker.getPopup()?.getElement();
      const btn = el?.querySelector<HTMLButtonElement>('.btn-ruta');
      if (btn) btn.onclick = () => onRuta(punto);
    });
  }

  dibujarRuta(coordenadas: L.LatLng[]): void {
    if (!this.map) return;
    this.limpiarRuta();
    this.rutaActual = L.polyline(coordenadas, {
      color: '#c9042f',
      weight: 5,
      opacity: 0.8,
    }).addTo(this.map);
    this.map.fitBounds(this.rutaActual.getBounds(), { padding: [50, 50] });
  }

  limpiarRuta(): void {
    if (this.rutaActual) {
      this.map?.removeLayer(this.rutaActual);
      this.rutaActual = undefined;
    }
  }

  invalidateSize(): void {
    requestAnimationFrame(() => this.map?.invalidateSize());
  }

  destroy(): void {
    this.map?.remove();
    this.map = undefined;
    this.userMarker = undefined;
    this.rutaActual = undefined;
  }
}

