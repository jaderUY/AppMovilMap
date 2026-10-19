export type TipoPunto = |'cafeteria'| 'biblioteca'|'bano'|'parque'|'museo'|'monumento'|'restaurante';

export interface Coordenada {
  lat: number;
  lng: number;
}

export interface PuntoInteres extends Coordenada {
  id: string;
  nombre: string;
  tipo: TipoPunto;
  foto: string;
  descripcion?: string;
}