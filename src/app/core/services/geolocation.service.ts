import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Coordenada } from '../models/punto-interes.model.js';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  async getCurrentPosition(): Promise<Coordenada> {
    const perms = await Geolocation.checkPermissions();
    if (perms.location !== 'granted') {
      await Geolocation.requestPermissions();
    }
    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10_000,
    });
    return { lat: pos.coords.latitude, lng: pos.coords.longitude };
  }
}