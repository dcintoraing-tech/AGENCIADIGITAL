import { img } from './images';

export const site = {
  nombre: 'ARQO',
  eslogan: 'De la idea a la obra.',
  descripcion:
    'Estudio de ingenieria de producto digital. Convertimos operaciones complejas en productos simples: plataformas, sistemas internos, comercio, datos y automatizacion.',
  url: 'https://arqo.studio',
  fundacion: 2018,

  // El concepto de marca: un arco sostiene porque reparte el peso.
  concepto: {
    titulo: 'Un arco no se sostiene por su forma.',
    cuerpo:
      'Se sostiene por como reparte el peso. Los sistemas que construimos funcionan igual: cada pieza carga lo que le toca y el conjunto aguanta cuando el negocio crece.',
  },

  contacto: {
    email: 'proyectos@arqo.studio',
    telefono: '+52 33 2415 0890',
    whatsapp: '+52 33 2415 0890',
    direcciones: [
      { ciudad: 'Guadalajara', linea: 'Av. Americas 1545, piso 9. Jal., Mexico' },
      { ciudad: 'Madrid', linea: 'Calle Sagasta 22, 2 izq. Madrid, Espana' },
    ],
    horario: 'Lunes a viernes, 9:00 a 18:00 (GMT-6)',
  },

  redes: [
    { nombre: 'LinkedIn', url: 'https://linkedin.com', handle: '/company/arqo-studio' },
    { nombre: 'GitHub', url: 'https://github.com', handle: '/arqo-studio' },
    { nombre: 'Dribbble', url: 'https://dribbble.com', handle: '/arqostudio' },
    { nombre: 'Instagram', url: 'https://instagram.com', handle: '@arqo.studio' },
  ],

  nav: [
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Proceso', href: '/proceso' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Ideas', href: '/ideas' },
  ],

  cta: { label: 'Iniciar proyecto', href: '/contacto' },
} as const;

export const metricas = [
  { valor: 35, sufijo: '+', etiqueta: 'Proyectos digitales', nota: 'entregados desde 2018' },
  { valor: 18, sufijo: '+', etiqueta: 'Empresas', nota: 'de 4 paises' },
  { valor: 12, sufijo: '+', etiqueta: 'Industrias', nota: 'retail, salud, logistica, inmobiliaria' },
  { valor: 99, sufijo: '%', etiqueta: 'Compromiso', nota: 'proyectos entregados en alcance' },
] as const;

export const equipo = {
  titulo: 'Un estudio pequeno que entrega como uno grande.',
  cuerpo: [
    'ARQO nacio en 2018 cuando una arquitecta que escribia codigo y un ingeniero de datos se cansaron de entregar presentaciones que nadie podia usar. Montaron un estudio con una regla: nada se presenta si no funciona.',
    'Hoy somos catorce personas entre Guadalajara y Madrid. Disenadores que entienden bases de datos, ingenieros que revisan interlineados y un equipo de datos que se sienta con operaciones antes de escribir una sola consulta.',
  ],
  principios: [
    {
      titulo: 'Primero el problema',
      texto: 'Antes de proponer tecnologia pasamos dias dentro de la operacion. Casi siempre el problema no es el que nos contaron.',
    },
    {
      titulo: 'Entregamos en produccion',
      texto: 'No vendemos prototipos. Cada proyecto termina con usuarios reales trabajando dentro del sistema.',
    },
    {
      titulo: 'Codigo que se puede heredar',
      texto: 'Documentado, tipado y con pruebas. Si manana nos cambian por un equipo interno, que lo puedan tomar sin reescribirlo.',
    },
    {
      titulo: 'Medimos lo que cambiamos',
      texto: 'Acordamos los indicadores antes de empezar y los revisamos a los tres y a los doce meses.',
    },
  ],
  fotos: {
    principal: img.mesaLarga,
    secundaria: img.nave,
  },
} as const;
