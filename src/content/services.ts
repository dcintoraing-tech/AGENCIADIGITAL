import { img } from './images';

export type Servicio = {
  id: string;
  indice: string;
  titulo: string;
  resumen: string;
  descripcion: string;
  capacidades: string[];
  entregables: string[];
  imagen: string;
  /** Dato que aparece al recorrer el servicio: ancla la promesa en algo medible. */
  dato: { valor: string; etiqueta: string };
};

export const servicios: Servicio[] = [
  {
    id: 'desarrollo-web',
    indice: '01',
    titulo: 'Desarrollo web',
    resumen: 'Sitios corporativos, landing pages, plataformas y experiencias digitales.',
    descripcion:
      'Construimos la cara publica de la empresa con la misma exigencia tecnica que un sistema interno: rendimiento medido, accesibilidad real y un gestor de contenido que el equipo de marketing pueda usar sin pedir ayuda.',
    capacidades: [
      'Arquitectura de informacion y contenido',
      'Diseno de interfaz y sistema visual',
      'Next.js con renderizado en servidor',
      'CMS sin cabeza y edicion en vivo',
      'Core Web Vitals y SEO tecnico',
      'Analitica y pruebas A/B',
    ],
    entregables: ['Sistema de diseno', 'Sitio en produccion', 'Panel de contenido', 'Manual de uso'],
    imagen: img.museoAngular,
    dato: { valor: '0.9 s', etiqueta: 'LCP mediano de los sitios que mantenemos' },
  },
  {
    id: 'software-a-medida',
    indice: '02',
    titulo: 'Software a medida',
    resumen: 'Sistemas internos, plataformas empresariales y aplicaciones web.',
    descripcion:
      'Cuando el proceso ya no cabe en una hoja de calculo, disenamos el sistema que lo sostiene. Modelamos el dominio con la gente que lo opera, no con un diagrama heredado de otra empresa.',
    capacidades: [
      'Levantamiento de procesos en campo',
      'Modelado de dominio y base de datos',
      'Roles, permisos y auditoria',
      'Migracion desde Excel y sistemas viejos',
      'Aplicaciones web y modo sin conexion',
      'Pruebas automatizadas y despliegue continuo',
    ],
    entregables: ['Modelo de datos', 'Sistema en produccion', 'Migracion de historicos', 'Capacitacion'],
    imagen: img.obraEnCurso,
    dato: { valor: '14 sem', etiqueta: 'Plazo tipico de un sistema operativo completo' },
  },
  {
    id: 'ecommerce',
    indice: '03',
    titulo: 'E-commerce',
    resumen: 'Tiendas online y experiencias de compra personalizadas.',
    descripcion:
      'Comercio que no termina en el boton de pagar. Conectamos catalogo, inventario, logistica y posventa para que la tienda refleje lo que de verdad hay en el almacen.',
    capacidades: [
      'Catalogo y motor de busqueda',
      'Pasarelas de pago y antifraude',
      'Inventario sincronizado con el ERP',
      'Logistica y seguimiento de envios',
      'Programas de lealtad y recompra',
      'Checkout optimizado por dispositivo',
    ],
    entregables: ['Tienda en produccion', 'Integracion con inventario', 'Tablero comercial', 'Flujo posventa'],
    imagen: img.tienda,
    dato: { valor: '+41 %', etiqueta: 'Mejora mediana en conversion movil' },
  },
  {
    id: 'automatizacion',
    indice: '04',
    titulo: 'Automatizacion',
    resumen: 'Automatizacion de procesos repetitivos y flujos empresariales.',
    descripcion:
      'Identificamos las tareas que consumen horas sin aportar criterio y las convertimos en flujos que corren solos. La persona se queda con la decision; la maquina se queda con el tramite.',
    capacidades: [
      'Mapa de procesos y horas invertidas',
      'Orquestacion de flujos y colas de trabajo',
      'Documentos, firmas y expedientes',
      'Conciliaciones y cargas masivas',
      'Alertas y escalamientos',
      'Bitacora de cada ejecucion',
    ],
    entregables: ['Mapa de automatizacion', 'Flujos en produccion', 'Tablero de ejecuciones', 'Plan de contingencia'],
    imagen: img.almacen,
    dato: { valor: '310 h', etiqueta: 'Horas liberadas al mes en el mayor despliegue' },
  },
  {
    id: 'inteligencia-artificial',
    indice: '05',
    titulo: 'Inteligencia artificial',
    resumen: 'Integracion de IA en procesos, sistemas y productos.',
    descripcion:
      'Usamos modelos donde hay texto desordenado, clasificacion ambigua o volumen que ninguna persona puede leer. Siempre con evaluacion previa, limites de costo y una via de revision humana.',
    capacidades: [
      'Extraccion y estructura de documentos',
      'Clasificacion y enrutamiento',
      'Busqueda semantica sobre informacion propia',
      'Asistentes internos con permisos',
      'Evaluacion de calidad y sesgo',
      'Control de costo por operacion',
    ],
    entregables: ['Prueba de concepto evaluada', 'Modelo en produccion', 'Panel de calidad', 'Protocolo de revision'],
    imagen: img.laboratorio,
    dato: { valor: '96.4 %', etiqueta: 'Exactitud en extraccion de documentos fiscales' },
  },
  {
    id: 'datos-bi',
    indice: '06',
    titulo: 'Datos & BI',
    resumen: 'Dashboards, indicadores, reportes y sistemas de informacion.',
    descripcion:
      'Antes del tablero viene el acuerdo: que significa cada numero y quien responde por el. Despues construimos el modelo, el flujo de carga y la vista que se abre en la junta del lunes.',
    capacidades: [
      'Diccionario de indicadores',
      'Modelo dimensional y almacen de datos',
      'Flujos de extraccion y carga',
      'Tableros ejecutivos y operativos',
      'Reportes programados',
      'Control de accesos por area',
    ],
    entregables: ['Diccionario de KPI', 'Almacen de datos', 'Tableros por area', 'Reportes automaticos'],
    imagen: img.tableroOscuro,
    dato: { valor: '4 min', etiqueta: 'Latencia del cierre operativo diario' },
  },
  {
    id: 'integraciones',
    indice: '07',
    titulo: 'Integraciones',
    resumen: 'APIs, servicios externos, pagos, mapas, autenticacion y plataformas de terceros.',
    descripcion:
      'La mayoria de los proyectos no fallan por el codigo nuevo, fallan en la costura con lo que ya existe. Disenamos esa costura: contratos claros, reintentos, trazabilidad y un plan para cuando el tercero se cae.',
    capacidades: [
      'Diseno y documentacion de APIs',
      'ERP, CRM y facturacion',
      'Pagos, cobranza y conciliacion',
      'Identidad y inicio de sesion unico',
      'Mapas, mensajeria y notificaciones',
      'Monitoreo de contratos y fallos',
    ],
    entregables: ['Contratos de API', 'Capa de integracion', 'Monitoreo y alertas', 'Documentacion viva'],
    imagen: img.codigo,
    dato: { valor: '99.95 %', etiqueta: 'Disponibilidad de la capa de integracion' },
  },
];
