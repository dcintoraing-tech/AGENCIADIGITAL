import { img } from './images';

export type Paso = {
  indice: string;
  titulo: string;
  frase: string;
  texto: string;
  entregables: string[];
  duracion: string;
  imagen: string;
};

export const proceso: Paso[] = [
  {
    indice: '01',
    titulo: 'Descubrir',
    frase: 'Entendemos el negocio.',
    texto:
      'Nos sentamos donde ocurre el trabajo. Entrevistas, observacion en campo y revision de los sistemas que ya existen. Salimos con el problema redactado en una frase que el cliente reconoce como suya.',
    entregables: ['Mapa de procesos', 'Inventario de sistemas', 'Problema definido', 'Criterios de exito'],
    duracion: '2 a 3 semanas',
    imagen: img.muroDeNotas,
  },
  {
    indice: '02',
    titulo: 'Estrategia',
    frase: 'Definimos la solucion.',
    texto:
      'Decidimos que se construye y, sobre todo, que no. Elegimos la arquitectura, acordamos los indicadores que vamos a mover y fijamos un alcance que cabe en el presupuesto real.',
    entregables: ['Arquitectura tecnica', 'Alcance por fases', 'Indicadores acordados', 'Plan y presupuesto'],
    duracion: '2 semanas',
    imagen: img.trazoTecnico,
  },
  {
    indice: '03',
    titulo: 'Diseno',
    frase: 'Construimos la experiencia.',
    texto:
      'Disenamos sobre datos reales, nunca sobre contenido de relleno. Prototipamos los flujos criticos y los probamos con las personas que van a usarlos todos los dias.',
    entregables: ['Sistema de diseno', 'Prototipo navegable', 'Pruebas con usuarios', 'Especificacion de interfaz'],
    duracion: '3 a 5 semanas',
    imagen: img.volumenBlanco,
  },
  {
    indice: '04',
    titulo: 'Desarrollo',
    frase: 'Convertimos el diseno en producto.',
    texto:
      'Ciclos de dos semanas con entregas visibles. Codigo tipado, revisado y con pruebas automatizadas. El cliente entra al entorno de pruebas desde el primer ciclo.',
    entregables: ['Entregas quincenales', 'Entorno de pruebas', 'Cobertura de pruebas', 'Documentacion tecnica'],
    duracion: '8 a 16 semanas',
    imagen: img.codigoAngulo,
  },
  {
    indice: '05',
    titulo: 'Lanzamiento',
    frase: 'Ponemos el proyecto en produccion.',
    texto:
      'Migracion de historicos, capacitacion por rol y liberacion progresiva. Acompanamos los primeros dias en sitio, porque es cuando aparecen los casos que nadie habia contado.',
    entregables: ['Migracion de datos', 'Capacitacion por rol', 'Plan de liberacion', 'Guardia de arranque'],
    duracion: '2 a 6 semanas',
    imagen: img.torresNiebla,
  },
  {
    indice: '06',
    titulo: 'Evolucion',
    frase: 'Seguimos mejorandolo.',
    texto:
      'Monitoreo, correcciones y nuevas funciones priorizadas por uso real. Revisamos juntos los indicadores a los tres y a los doce meses, y ajustamos lo que no se movio.',
    entregables: ['Monitoreo y alertas', 'Mantenimiento', 'Revision trimestral', 'Hoja de ruta viva'],
    duracion: 'continuo',
    imagen: img.monitoreo,
  },
];
