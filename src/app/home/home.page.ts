import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Geolocation } from "@capacitor/geolocation";
import * as L from "leaflet";

interface PuntoInteres {
  nombre: string;
  tipo: 'cafeteria' | 'biblioteca' | 'bano';
  lat: number;
  lng: number;
}

const PUNTOS: PuntoInteres[] = [
  { nombre: 'Cafetería Central', tipo: 'cafeteria', lat: 4.6016861, lng: -74.0644734 },
  { nombre: 'Biblioteca Principal', tipo: 'biblioteca', lat: 4.60971, lng: -74.08175 },
  { nombre: 'Baños Bloque A', tipo: 'bano', lat: 4.5717552, lng: -74.0969228 },
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true
})
export class HomePage implements AfterViewInit {
  private map!: L.Map;
  private ubicacionUsuario!: { lat: number; lng: number };
  private rutaActual?: L.Polyline;

  private iconoUsuario = L.icon({
    iconUrl: '../../assets/icon/marker.png',
    iconSize: [30, 40],
    popupAnchor: [0, -20]
  });

  private iconosPorTipo: Record<string, L.Icon> = {
    cafeteria: L.icon({ iconUrl: '../../assets/icon/cafe.png', iconSize: [30, 30] }),
    biblioteca: L.icon({ iconUrl: '../../assets/icon/book.png', iconSize: [30, 30] }),
    bano: L.icon({ iconUrl: '../../assets/icon/bano.png', iconSize: [30, 30] }),
  };

  constructor() {}

  ngAfterViewInit(): void {
    this.Punto();
  }

  async Punto() {
    const point = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = point.coords;
    this.ubicacionUsuario = { lat: latitude, lng: longitude };

    this.map = L.map('map').setView([latitude, longitude], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude], { icon: this.iconoUsuario })
      .addTo(this.map)
      .bindPopup('Estás aquí!!!')
      .openPopup();

    PUNTOS.forEach(p => {
      const distancia = this.calcularDistancia(latitude, longitude, p.lat, p.lng);
      const distanciaTexto = distancia < 1000
        ? `${distancia.toFixed(0)} m`
        : `${(distancia / 1000).toFixed(2)} km`;

      const marker = L.marker([p.lat, p.lng], { icon: this.iconosPorTipo[p.tipo] })
        .addTo(this.map)
        .bindPopup(`<strong>${p.nombre}</strong>
Distancia: ${distanciaTexto}`);

      marker.on('click', () => this.trazarRuta(p.lat, p.lng));
    });

    setTimeout(() => this.map.invalidateSize(), 100);
  }

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) ** 2 +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private async obtenerRuta(origenLat: number, origenLng: number, destinoLat: number, destinoLng: number): Promise<L.LatLng[]> {
    const url = `https://router.project-osrm.org/route/v1/foot/${origenLng},${origenLat};${destinoLng},${destinoLat}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontró ruta');
    }

    return data.routes[0].geometry.coordinates.map(
      (coord: [number, number]) => L.latLng(coord[1], coord[0])
    );
  }

  async trazarRuta(destinoLat: number, destinoLng: number) {
    try {
      const coordenadas = await this.obtenerRuta(
        this.ubicacionUsuario.lat,
        this.ubicacionUsuario.lng,
        destinoLat,
        destinoLng
      );

      if (this.rutaActual) {
        this.map.removeLayer(this.rutaActual);
      }

      this.rutaActual = L.polyline(coordenadas, {
        color: '#c9042f',
        weight: 5,
        opacity: 0.8
      }).addTo(this.map);

      this.map.fitBounds(this.rutaActual.getBounds(), { padding: [50, 50] });

    } catch (error) {
      console.error('Error trazando ruta:', error);
    }
  }
}