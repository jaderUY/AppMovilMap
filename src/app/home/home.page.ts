import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { locateOutline } from 'ionicons/icons';

import { MapService } from '../core/services/map.service.ts';
import { GeolocationService } from '../core/services/geolocation.service.ts';
import { RoutingService } from '../core/services/routing.service.ts';
import { PUNTOS_INTERES } from '../core/data/puntos-interes.data.ts';
import { Coordenada, PuntoInteres } from '../core/models/punto-interes.model.ts';
import { calcularDistanciaMetros } from '../core/utils/geo.utils.ts';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton,
  ],
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly mapSvc = inject(MapService);
  private readonly geoSvc = inject(GeolocationService);
  private readonly routingSvc = inject(RoutingService);
  private readonly toastCtrl = inject(ToastController);

  private readonly CENTRO_BOGOTA: Coordenada = { lat: 4.5981, lng: -74.0758 };
  private ubicacion?: Coordenada;
  private marcadoresCargados = false;

  readonly puntos = PUNTOS_INTERES;

  constructor() {
    addIcons({ locateOutline });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.localizar();
  }

  ngOnDestroy(): void {
    this.mapSvc.destroy();
  }

  async localizar(): Promise<void> {
    const pos = await this.obtenerUbicacionSegura();
    this.ubicacion = pos;

    this.mapSvc.init('map', pos);
    this.mapSvc.addUserMarker(pos);
    this.mapSvc.focusOn(pos);
    this.mapSvc.invalidateSize();

    if (!this.marcadoresCargados) {
      this.puntos.forEach((punto) => {
        const dist = calcularDistanciaMetros(pos, punto);
        this.mapSvc.addPuntoMarker(punto, dist, (p) => this.trazarRuta(p));
      });
      this.marcadoresCargados = true;
    }
  }

  private async obtenerUbicacionSegura(): Promise<Coordenada> {
    try {
      return await this.geoSvc.getCurrentPosition();
    } catch {
      await this.mostrarToast(
        'No se pudo obtener tu ubicación, centrando en Bogotá'
      );
      return this.CENTRO_BOGOTA;
    }
  }

  private async trazarRuta(punto: PuntoInteres): Promise<void> {
    if (!this.ubicacion) return;
    try {
      const coords = await this.routingSvc.obtenerRuta(this.ubicacion, punto);
      this.mapSvc.dibujarRuta(coords);
    } catch (err) {
      console.error('Error trazando ruta:', err);
      await this.mostrarToast('No se pudo trazar la ruta');
    }
  }

  private async mostrarToast(message: string): Promise<void> {
    const t = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
    });
    await t.present();
  }
}