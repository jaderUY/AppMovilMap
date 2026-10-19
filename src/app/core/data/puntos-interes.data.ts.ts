import { PuntoInteres } from '../models/punto-interes.model.ts';

// NOTA: las fotos son placeholders (picsum). Reemplaza `foto` por
// `assets/puntos/<id>.jpg` cuando tengas las imágenes reales del sitio.
export const PUNTOS_INTERES: readonly PuntoInteres[] = [
  { id: 'plaza-bolivar',   nombre: 'Plaza de Bolívar',              tipo: 'monumento',  lat: 4.5981, lng: -74.0758, foto: 'https://picsum.photos/seed/plaza-bolivar/400/250',   descripcion: 'Corazón histórico de Bogotá' },
  { id: 'monserrate',      nombre: 'Cerro de Monserrate',           tipo: 'monumento',  lat: 4.6056, lng: -74.0556, foto: 'https://picsum.photos/seed/monserrate/400/250',      descripcion: 'Mirador con vista panorámica de la ciudad' },
  { id: 'museo-oro',       nombre: 'Museo del Oro',                 tipo: 'museo',      lat: 4.6019, lng: -74.0718, foto: 'https://picsum.photos/seed/museo-oro/400/250',       descripcion: 'Orfebrería prehispánica' },
  { id: 'museo-botero',    nombre: 'Museo Botero',                  tipo: 'museo',      lat: 4.5971, lng: -74.0731, foto: 'https://picsum.photos/seed/museo-botero/400/250' },
  { id: 'museo-nacional',  nombre: 'Museo Nacional',                tipo: 'museo',      lat: 4.6156, lng: -74.0688, foto: 'https://picsum.photos/seed/museo-nacional/400/250' },
  { id: 'torre-colpatria', nombre: 'Torre Colpatria',               tipo: 'monumento',  lat: 4.6108, lng: -74.0708, foto: 'https://picsum.photos/seed/torre-colpatria/400/250' },
  { id: 'parque-93',       nombre: 'Parque de la 93',               tipo: 'parque',     lat: 4.6768, lng: -74.0483, foto: 'https://picsum.photos/seed/parque-93/400/250' },
  { id: 'simon-bolivar',   nombre: 'Parque Simón Bolívar',          tipo: 'parque',     lat: 4.6584, lng: -74.0933, foto: 'https://picsum.photos/seed/simon-bolivar/400/250' },
  { id: 'jardin-botanico', nombre: 'Jardín Botánico',               tipo: 'parque',     lat: 4.6681, lng: -74.0993, foto: 'https://picsum.photos/seed/jardin-botanico/400/250' },
  { id: 'parque-virrey',   nombre: 'Parque El Virrey',              tipo: 'parque',     lat: 4.6784, lng: -74.0483, foto: 'https://picsum.photos/seed/parque-virrey/400/250' },
  { id: 'parque-nacional', nombre: 'Parque Nacional',               tipo: 'parque',     lat: 4.6303, lng: -74.0684, foto: 'https://picsum.photos/seed/parque-nacional/400/250' },
  { id: 'biblio-virgilio', nombre: 'Biblioteca Virgilio Barco',     tipo: 'biblioteca', lat: 4.6569, lng: -74.0869, foto: 'https://picsum.photos/seed/virgilio-barco/400/250' },
  { id: 'biblio-blaa',     nombre: 'Biblioteca Luis Ángel Arango',  tipo: 'biblioteca', lat: 4.5965, lng: -74.0731, foto: 'https://picsum.photos/seed/blaa/400/250' },
  { id: 'unal',            nombre: 'Universidad Nacional',          tipo: 'biblioteca', lat: 4.6382, lng: -74.0844, foto: 'https://picsum.photos/seed/unal/400/250' },
  { id: 'candelaria',      nombre: 'La Candelaria',                 tipo: 'monumento',  lat: 4.5959, lng: -74.0733, foto: 'https://picsum.photos/seed/candelaria/400/250' },
  { id: 'zona-t',          nombre: 'Zona T',                        tipo: 'restaurante', lat: 4.6699, lng: -74.0525, foto: 'https://picsum.photos/seed/zona-t/400/250' },
  { id: 'andino',          nombre: 'Centro Comercial Andino',       tipo: 'cafeteria',  lat: 4.6678, lng: -74.0504, foto: 'https://picsum.photos/seed/andino/400/250' },
  { id: 'maloka',          nombre: 'Maloka',                        tipo: 'museo',      lat: 4.6261, lng: -74.1226, foto: 'https://picsum.photos/seed/maloka/400/250' },
  { id: 'campin',          nombre: 'Estadio El Campín',             tipo: 'monumento',  lat: 4.6459, lng: -74.0777, foto: 'https://picsum.photos/seed/campin/400/250' },
  { id: 'usaquen',         nombre: 'Usaquén',                       tipo: 'restaurante', lat: 4.6956, lng: -74.0322, foto: 'https://picsum.photos/seed/usaquen/400/250' },
];