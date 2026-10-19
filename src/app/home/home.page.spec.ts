import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { HomePage } from './home.page';
import { MapService } from '../core/services/map.service.ts';
import { GeolocationService } from '../core/services/geolocation.service.ts';
import { RoutingService } from '../core/services/routing.service.ts';
import { ToastController } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mapSvc: Record<string, jest.Mock>;
  let geoSvc: { getCurrentPosition: jest.Mock };

  beforeEach(async () => {
    mapSvc = {
      init: jest.fn(), focusOn: jest.fn(), addUserMarker: jest.fn(),
      addPuntoMarker: jest.fn(), dibujarRuta: jest.fn(),
      invalidateSize: jest.fn(), destroy: jest.fn(),
    };
    
    geoSvc = {
      getCurrentPosition: jest.fn().mockResolvedValue({ lat: 4.6, lng: -74.08 } as any),
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: MapService, useValue: mapSvc },
        { provide: GeolocationService, useValue: geoSvc },
        { provide: RoutingService, useValue: { obtenerRuta: jest.fn() } },
        { provide: ToastController, useValue: { create: jest.fn().mockResolvedValue({ present: jest.fn() }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('inicializa el mapa con la ubicación del usuario', () => {
    expect(geoSvc.getCurrentPosition).toHaveBeenCalled();
    expect(mapSvc['init']).toHaveBeenCalled();
    expect(mapSvc['addUserMarker']).toHaveBeenCalled();
  });

  it('registra los 20 puntos de interés', () => {
    expect(mapSvc['addPuntoMarker']).toHaveBeenCalledTimes(20);
  });

  it('destruye el mapa al salir', () => {
    fixture.destroy();
    expect(mapSvc['destroy']).toHaveBeenCalled();
  });
});