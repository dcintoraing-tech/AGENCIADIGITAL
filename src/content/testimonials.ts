import { img } from './images';

export type Testimonio = {
  id: string;
  texto: string;
  autor: string;
  cargo: string;
  empresa: string;
  retrato: string;
  proyecto?: string;
  /** Peso editorial: define el tamano del bloque en la composicion. */
  peso: 'principal' | 'medio' | 'breve';
};

export const testimonios: Testimonio[] = [
  {
    id: 'forma',
    texto:
      'Pasamos de trabajar con cinco archivos de Excel a tener toda la operacion centralizada en una sola plataforma. El cierre que nos tomaba dieciocho dias ahora esta listo el dia 2.',
    autor: 'Gonzalo Ortuno',
    cargo: 'Socio director',
    empresa: 'FORMA',
    retrato: img.retratoOrtuno,
    proyecto: 'forma',
    peso: 'principal',
  },
  {
    id: 'flama',
    texto:
      'Dejamos de vender cosas que ya no teniamos. Suena basico, pero nos costaba doscientas cancelaciones a la semana y la mitad del tiempo de atencion a clientes.',
    autor: 'Rodrigo Alcantara',
    cargo: 'Director general',
    empresa: 'FLAMA',
    retrato: img.retratoAlcantara,
    proyecto: 'flama',
    peso: 'medio',
  },
  {
    id: 'vertice',
    texto:
      'Teniamos once verdades distintas sobre el mismo negocio. Ahora hay una, y esta disponible a las siete de la manana sin que nadie arme un consolidado.',
    autor: 'Paulina Larrea',
    cargo: 'Directora comercial',
    empresa: 'VERTICE',
    retrato: img.retratoLarrea,
    proyecto: 'vertice',
    peso: 'medio',
  },
  {
    id: 'athletica',
    texto:
      'No necesitabamos mas datos, necesitabamos saber a quien llamar el lunes. Eso es exactamente lo que nos entregaron.',
    autor: 'Daniel Kimura',
    cargo: 'Director de experiencia',
    empresa: 'ATHLETICA',
    retrato: img.retratoKimura,
    proyecto: 'athletica',
    peso: 'breve',
  },
  {
    id: 'casa-27',
    texto:
      'Discutieron con nosotros tres veces antes de aceptar el alcance que pediamos. Tenian razon las tres. El proyecto salio mas chico y funciono mejor.',
    autor: 'Marina Benavides',
    cargo: 'Directora',
    empresa: 'CASA 27',
    retrato: img.retratoBenavides,
    proyecto: 'casa-27',
    peso: 'medio',
  },
  {
    id: 'nero',
    texto:
      'Lo que mas me sorprendio fue que dos de sus ingenieros pasaran una semana en el taller antes de escribir una linea de codigo. Nadie habia hecho eso antes.',
    autor: 'Ismael Fuenmayor',
    cargo: 'Director de operaciones',
    empresa: 'NERO',
    retrato: img.retratoFuenmayor,
    proyecto: 'nero',
    peso: 'breve',
  },
];
