import { img } from './images';

export type Proyecto = {
  slug: string;
  indice: string;
  nombre: string;
  industria: string;
  anio: number;
  lugar: string;
  /** Frase corta para la rejilla editorial. */
  resumen: string;
  descripcion: string;
  servicios: string[];
  tecnologias: string[];
  portada: string;
  galeria: { src: string; alt: string; pie: string }[];
  resultado: { valor: string; etiqueta: string };
  metricas: { valor: string; etiqueta: string }[];
  problema: { titulo: string; parrafos: string[]; puntos: string[] };
  solucion: { titulo: string; parrafos: string[]; piezas: { nombre: string; texto: string }[] };
  proceso: { fase: string; semanas: string; texto: string }[];
  impacto: { titulo: string; parrafos: string[] };
  cita: { texto: string; autor: string; cargo: string };
  /** Peso en la rejilla: define la composicion asimetrica de la portada. */
  escala: 'alta' | 'media' | 'ancha';
};

export const proyectos: Proyecto[] = [
  {
    slug: 'flama',
    indice: '01',
    nombre: 'FLAMA',
    industria: 'Marca urbana / E-commerce',
    anio: 2024,
    lugar: 'Ciudad de Mexico',
    resumen: 'Una tienda que sabe lo que hay en el almacen.',
    descripcion:
      'Rediseno completo del comercio de una marca de ropa urbana con nueve tiendas fisicas y un inventario que nunca coincidia con el sitio.',
    servicios: ['E-commerce', 'Integraciones', 'Datos & BI'],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Stripe', 'Algolia', 'Vercel'],
    portada: img.tienda,
    galeria: [
      {
        src: img.tienda,
        alt: 'Interior de una tienda FLAMA',
        pie: 'Punto de venta en Roma Norte. El inventario de piso alimenta el catalogo en linea cada noventa segundos.',
      },
      {
        src: img.almacen,
        alt: 'Pasillo del centro de distribucion',
        pie: 'Centro de distribucion en Vallejo. El apartado de existencias ocurre aqui, no en el checkout.',
      },
      {
        src: img.manosTeclado,
        alt: 'Equipo de operaciones trabajando',
        pie: 'Mesa de control de pedidos: una sola vista para los nueve puntos de venta.',
      },
    ],
    resultado: { valor: '+41 %', etiqueta: 'Conversion movil' },
    metricas: [
      { valor: '+41 %', etiqueta: 'Conversion en movil' },
      { valor: '-78 %', etiqueta: 'Cancelaciones por falta de stock' },
      { valor: '1.1 s', etiqueta: 'Carga de ficha de producto' },
    ],
    problema: {
      titulo: 'El sitio vendia lo que ya no existia',
      parrafos: [
        'FLAMA crecio de dos a nueve tiendas en tres anos. El comercio en linea se monto en una plataforma generica que leia el inventario una vez al dia, de madrugada. Para las once de la manana el catalogo era ficcion.',
        'Cada semana se cancelaban cerca de doscientos pedidos porque la prenda ya se habia vendido en piso. Atencion a clientes dedicaba la mitad de su tiempo a pedir disculpas y a tramitar reembolsos.',
      ],
      puntos: [
        'Inventario sincronizado una vez cada 24 horas',
        'Nueve puntos de venta sin vista consolidada',
        'Checkout de seis pasos, abandonado por el 71 % en movil',
        'Devoluciones gestionadas por correo y hoja de calculo',
      ],
    },
    solucion: {
      titulo: 'Un solo inventario, muchas vitrinas',
      parrafos: [
        'Construimos una capa de inventario unificada que recibe eventos del punto de venta y del centro de distribucion, y que aparta existencias en el momento en que una prenda entra al carrito, no cuando se confirma el pago.',
        'Sobre esa base rehicimos la tienda con un checkout de un paso, busqueda por atributos reales de la prenda y un panel donde operaciones ve los nueve puntos en la misma pantalla.',
      ],
      piezas: [
        {
          nombre: 'Capa de inventario',
          texto: 'Servicio que concilia punto de venta, almacen y tienda con apartado temporal de doce minutos.',
        },
        {
          nombre: 'Checkout de un paso',
          texto: 'Pago en una pantalla, direcciones guardadas y meses sin intereses sin salir del sitio.',
        },
        {
          nombre: 'Busqueda por atributo',
          texto: 'Indice que entiende talla, corte, material y temporada; no solo el nombre de la prenda.',
        },
        {
          nombre: 'Mesa de control',
          texto: 'Tablero operativo con pedidos, apartados, rupturas de stock y tiempos de surtido.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Descubrimiento',
        semanas: '2 semanas',
        texto: 'Dos de nuestros ingenieros trabajaron turnos completos en tienda y en el centro de distribucion para ver donde se perdia la sincronia.',
      },
      {
        fase: 'Arquitectura',
        semanas: '3 semanas',
        texto: 'Modelo de inventario basado en eventos, con conciliacion nocturna como red de seguridad y no como mecanismo principal.',
      },
      {
        fase: 'Construccion',
        semanas: '9 semanas',
        texto: 'Tienda, capa de inventario y panel en paralelo. Liberacion progresiva por tienda, empezando por el punto de venta mas pequeno.',
      },
      {
        fase: 'Operacion',
        semanas: 'continuo',
        texto: 'Tres meses de acompanamiento con revision semanal de rupturas de stock y ajuste del tiempo de apartado.',
      },
    ],
    impacto: {
      titulo: 'De disculparse a vender',
      parrafos: [
        'A los cuatro meses las cancelaciones por falta de existencia bajaron 78 % y el equipo de atencion dejo de dedicar la manana a reembolsos.',
        'La conversion en movil subio 41 % y, por primera vez, el area comercial pudo planear una campana sabiendo cuanto producto habia realmente disponible.',
      ],
    },
    cita: {
      texto: 'Dejamos de vender cosas que ya no teniamos. Suena basico, pero nos costaba doscientas cancelaciones a la semana.',
      autor: 'Rodrigo Alcantara',
      cargo: 'Director general, FLAMA',
    },
    escala: 'alta',
  },

  {
    slug: 'nero',
    indice: '02',
    nombre: 'NERO',
    industria: 'Automotriz / Detallado',
    anio: 2024,
    lugar: 'Monterrey',
    resumen: 'La agenda que dejo de perder autos.',
    descripcion:
      'Plataforma de reservas, expediente fotografico y control de taller para una cadena de detallado automotriz de alta gama.',
    servicios: ['Software a medida', 'Automatizacion', 'Desarrollo web'],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Twilio', 'Cloudflare R2'],
    portada: img.autoNocturno,
    galeria: [
      {
        src: img.autoNocturno,
        alt: 'Automovil en movimiento de noche',
        pie: 'NERO atiende vehiculos de coleccion: cada servicio exige evidencia antes y despues.',
      },
      {
        src: img.autoDesierto,
        alt: 'Automovil deportivo en exteriores',
        pie: 'El expediente fotografico acompana al vehiculo desde la recepcion hasta la entrega.',
      },
      {
        src: img.codigoAngulo,
        alt: 'Codigo fuente en pantalla',
        pie: 'Firma del expediente: el cliente aprueba los danos preexistentes desde su propio telefono.',
      },
    ],
    resultado: { valor: '-92 %', etiqueta: 'Disputas por danos' },
    metricas: [
      { valor: '-92 %', etiqueta: 'Disputas por danos preexistentes' },
      { valor: '+34 %', etiqueta: 'Ocupacion de bahias' },
      { valor: '6 min', etiqueta: 'Tiempo de recepcion por vehiculo' },
    ],
    problema: {
      titulo: 'Cuatro sucursales, cuatro agendas de papel',
      parrafos: [
        'NERO trabaja con autos que valen mas que el taller. Cada recepcion se documentaba con fotos sueltas en el telefono del recepcionista y una hoja firmada que se archivaba en una carpeta.',
        'Cuando un cliente reclamaba un rayon, nadie podia demostrar si ya venia. En 2023 la cadena pago cuatro reclamaciones que, segun el equipo, no eran suyas.',
      ],
      puntos: [
        'Agenda en cuadernos, una por sucursal',
        'Evidencia fotografica dispersa en telefonos personales',
        'Sin visibilidad de ocupacion de bahias entre sucursales',
        'Recordatorios enviados a mano, uno por uno',
      ],
    },
    solucion: {
      titulo: 'Un expediente que el cliente firma antes de bajar del auto',
      parrafos: [
        'Disenamos una recepcion guiada: el recepcionista recorre el vehiculo con una pauta de dieciocho tomas, el sistema las ordena y genera un expediente que el cliente revisa y firma en su telefono antes de entregar las llaves.',
        'La agenda se unifico en las cuatro sucursales con visibilidad de bahias en vivo, y los recordatorios por mensaje salen solos a las cuarenta y ocho y a las tres horas.',
      ],
      piezas: [
        {
          nombre: 'Recepcion guiada',
          texto: 'Pauta de dieciocho tomas con guias en pantalla; la camara no deja avanzar si falta un angulo.',
        },
        {
          nombre: 'Expediente firmado',
          texto: 'Enlace temporal al telefono del cliente, con firma y sello de tiempo.',
        },
        {
          nombre: 'Agenda unica',
          texto: 'Ocupacion de bahias por sucursal, con reasignacion entre sedes cuando una se satura.',
        },
        {
          nombre: 'Mensajeria automatica',
          texto: 'Confirmacion, recordatorio, aviso de vehiculo listo y encuesta posterior.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Descubrimiento',
        semanas: '2 semanas',
        texto: 'Acompanamos treinta recepciones reales para disenar la pauta fotografica con los recepcionistas, no sobre ellos.',
      },
      {
        fase: 'Prototipo',
        semanas: '2 semanas',
        texto: 'Probamos la pauta en una sola sucursal durante dos semanas antes de escribir el sistema definitivo.',
      },
      {
        fase: 'Construccion',
        semanas: '8 semanas',
        texto: 'Aplicacion de recepcion, expediente firmado y agenda unificada, con modo sin conexion para el area de lavado.',
      },
      {
        fase: 'Despliegue',
        semanas: '3 semanas',
        texto: 'Sucursal por sucursal, con una persona de ARQO presente el primer dia de cada una.',
      },
    ],
    impacto: {
      titulo: 'La evidencia dejo de ser un problema',
      parrafos: [
        'En el ano siguiente al despliegue, las disputas por danos preexistentes cayeron 92 %. Las dos que quedaron se resolvieron en minutos mostrando el expediente firmado.',
        'La agenda unificada subio la ocupacion de bahias 34 % al permitir mover trabajos entre sucursales el mismo dia.',
      ],
    },
    cita: {
      texto: 'Antes discutiamos con el cliente mirando fotos borrosas. Ahora abrimos el expediente que el mismo firmo y la conversacion dura treinta segundos.',
      autor: 'Ismael Fuenmayor',
      cargo: 'Director de operaciones, NERO',
    },
    escala: 'ancha',
  },

  {
    slug: 'casa-27',
    indice: '03',
    nombre: 'CASA 27',
    industria: 'Hospitalidad / Hotel',
    anio: 2023,
    lugar: 'Oaxaca',
    resumen: 'Reservar directo volvio a tener sentido.',
    descripcion:
      'Sitio, motor de reservas directas y sistema de operacion para un hotel boutique de veintisiete habitaciones.',
    servicios: ['Desarrollo web', 'Software a medida', 'Integraciones'],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Sanity', 'API del gestor hotelero'],
    portada: img.restaurante,
    galeria: [
      {
        src: img.restaurante,
        alt: 'Comedor del hotel en penumbra',
        pie: 'El comedor de CASA 27. La reserva de mesa y la de habitacion viven en el mismo sistema.',
      },
      {
        src: img.salonLuz,
        alt: 'Sala luminosa del hotel',
        pie: 'Las fichas de habitacion se fotografiaron con luz natural a la hora real de entrada.',
      },
      {
        src: img.mesaServida,
        alt: 'Mesa servida',
        pie: 'Experiencias gastronomicas ofrecidas al reservar, no en un correo posterior.',
      },
    ],
    resultado: { valor: '+63 %', etiqueta: 'Reserva directa' },
    metricas: [
      { valor: '+63 %', etiqueta: 'Reservas por canal directo' },
      { valor: '-18 pts', etiqueta: 'Dependencia de agencias en linea' },
      { valor: '2.4x', etiqueta: 'Venta de extras por reserva' },
    ],
    problema: {
      titulo: 'Un hotel bonito con una reserva fea',
      parrafos: [
        'CASA 27 llenaba sus habitaciones, pero el 81 % llegaba por agencias en linea que se quedaban con una comision de dos digitos. El sitio propio era un folleto con un boton que abria un motor de reservas de otra empresa, con otro diseno y otro idioma.',
        'Internamente, la recepcion llevaba el control de extras, traslados y experiencias en una hoja compartida que se rompia cada temporada alta.',
      ],
      puntos: [
        '81 % de la ocupacion proveniente de agencias en linea',
        'Motor de reservas externo, sin la identidad del hotel',
        'Extras y traslados gestionados en hoja de calculo',
        'Sin fotografia propia: imagenes de catalogo del corporativo anterior',
      ],
    },
    solucion: {
      titulo: 'El sitio es el motor de reservas',
      parrafos: [
        'Eliminamos el salto a un tercero: la disponibilidad, la tarifa y el pago ocurren dentro del sitio, con el mismo lenguaje visual de principio a fin. La sincronia con el gestor hotelero mantiene los calendarios alineados en ambos sentidos.',
        'Los extras dejaron de ser un correo posterior y pasaron a ser parte del flujo: cena de bienvenida, traslado desde el aeropuerto, recorrido por el valle. Todo con inventario propio y cupo por dia.',
      ],
      piezas: [
        {
          nombre: 'Motor propio',
          texto: 'Disponibilidad, tarifas dinamicas y pago en el mismo dominio, sin redireccion.',
        },
        {
          nombre: 'Sincronia bidireccional',
          texto: 'Integracion con el gestor hotelero y los canales externos para evitar sobreventa.',
        },
        {
          nombre: 'Catalogo de experiencias',
          texto: 'Extras con cupo diario, proveedor asignado y confirmacion automatica.',
        },
        {
          nombre: 'Tablero de recepcion',
          texto: 'Llegadas del dia, extras contratados, traslados y notas por huesped.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Descubrimiento',
        semanas: '2 semanas',
        texto: 'Tres noches de estancia del equipo para entender el recorrido real del huesped y la friccion de la recepcion.',
      },
      {
        fase: 'Contenido',
        semanas: '3 semanas',
        texto: 'Sesion fotografica propia con luz natural a la hora real de entrada y redaccion de las veintisiete fichas.',
      },
      {
        fase: 'Construccion',
        semanas: '10 semanas',
        texto: 'Sitio, motor de reservas, catalogo de experiencias y tablero de recepcion.',
      },
      {
        fase: 'Temporada',
        semanas: '4 semanas',
        texto: 'Acompanamiento durante la primera temporada alta con guardia activa los fines de semana.',
      },
    ],
    impacto: {
      titulo: 'Menos comision, mas margen',
      parrafos: [
        'En doce meses la reserva directa crecio 63 % y la dependencia de agencias bajo dieciocho puntos. El ahorro en comisiones pago el proyecto antes del octavo mes.',
        'La venta de extras se multiplico por 2.4 simplemente por ofrecerlos en el momento en que el huesped ya decidio viajar.',
      ],
    },
    cita: {
      texto: 'Antes el huesped nos conocia por una foto de catalogo y reservaba en una pagina que no era nuestra. Ahora todo el recorrido es nuestro.',
      autor: 'Marina Benavides',
      cargo: 'Directora, CASA 27',
    },
    escala: 'media',
  },

  {
    slug: 'vertice',
    indice: '04',
    nombre: 'VERTICE',
    industria: 'Inmobiliaria',
    anio: 2025,
    lugar: 'Guadalajara',
    resumen: 'Mil doscientas unidades en una sola pantalla.',
    descripcion:
      'Sistema de comercializacion inmobiliaria: inventario de unidades, recorrido de venta, contratos y tablero de direccion para once desarrollos.',
    servicios: ['Software a medida', 'Datos & BI', 'Automatizacion'],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Python', 'Power BI', 'Firma electronica'],
    portada: img.casaAtardecer,
    galeria: [
      {
        src: img.casaAtardecer,
        alt: 'Desarrollo residencial al atardecer',
        pie: 'Once desarrollos activos, de vivienda media a residencial alto.',
      },
      {
        src: img.torreResidencial,
        alt: 'Torre residencial',
        pie: 'Cada unidad tiene estado, reserva, apartado y contrato en un solo registro.',
      },
      {
        src: img.interiorAmplio,
        alt: 'Interior de departamento muestra',
        pie: 'El recorrido de venta arranca en la unidad, no en el prospecto.',
      },
    ],
    resultado: { valor: '-11 dias', etiqueta: 'Ciclo de venta' },
    metricas: [
      { valor: '-11 dias', etiqueta: 'Ciclo promedio de cierre' },
      { valor: '1 240', etiqueta: 'Unidades bajo control' },
      { valor: '0', etiqueta: 'Unidades vendidas dos veces' },
    ],
    problema: {
      titulo: 'Cada desarrollo era una empresa distinta',
      parrafos: [
        'VERTICE comercializaba once desarrollos con once hojas de calculo, cada una con su propia nomenclatura de unidades, sus propios estados y su propio responsable. La direccion recibia un consolidado los martes, hecho a mano.',
        'Dos veces en 2024 se aparto la misma unidad a dos clientes distintos. El costo no fue solo comercial: una de esas operaciones termino en una negociacion legal.',
      ],
      puntos: [
        'Once inventarios independientes sin nomenclatura comun',
        'Consolidado manual semanal para direccion',
        'Contratos generados en procesador de texto, uno por uno',
        'Sin trazabilidad de quien aparto que unidad y cuando',
      ],
    },
    solucion: {
      titulo: 'Una unidad, un estado, un responsable',
      parrafos: [
        'Unificamos los once inventarios en un modelo donde la unidad es la entidad central y su estado solo cambia por eventos registrados: reserva, apartado, contrato, escrituracion. Cada cambio deja huella de quien, cuando y con que documento.',
        'Sobre ese modelo montamos la generacion automatica de contratos con firma electronica y un tablero de direccion que se actualiza solo.',
      ],
      piezas: [
        {
          nombre: 'Inventario unico',
          texto: 'Mil doscientas cuarenta unidades con nomenclatura normalizada y bloqueo por concurrencia.',
        },
        {
          nombre: 'Recorrido de venta',
          texto: 'Reserva, apartado y contrato como estados con reglas y vigencias explicitas.',
        },
        {
          nombre: 'Contratos automaticos',
          texto: 'Generacion desde plantilla con los datos de la unidad y firma electronica integrada.',
        },
        {
          nombre: 'Tablero de direccion',
          texto: 'Avance comercial por desarrollo, velocidad de venta y proyeccion de ingreso.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Normalizacion',
        semanas: '4 semanas',
        texto: 'El trabajo mas duro: conciliar once nomenclaturas y migrar tres anos de historico sin perder operaciones en curso.',
      },
      {
        fase: 'Modelo',
        semanas: '3 semanas',
        texto: 'Definicion de estados, vigencias y reglas de apartado con el area comercial y con juridico en la misma mesa.',
      },
      {
        fase: 'Construccion',
        semanas: '12 semanas',
        texto: 'Inventario, recorrido de venta, contratos y tablero. Liberacion por desarrollo, del mas chico al mas grande.',
      },
      {
        fase: 'Adopcion',
        semanas: '6 semanas',
        texto: 'Capacitacion a sesenta y dos asesores y acompanamiento en sala de ventas durante los primeros cierres.',
      },
    ],
    impacto: {
      titulo: 'La direccion dejo de esperar al martes',
      parrafos: [
        'El consolidado manual desaparecio: el tablero muestra el avance de los once desarrollos en vivo. El ciclo promedio de cierre bajo once dias, sobre todo por la generacion automatica de contratos.',
        'Desde el despliegue no se ha vuelto a apartar una unidad a dos clientes. El bloqueo por concurrencia lo hace imposible por diseno.',
      ],
    },
    cita: {
      texto: 'Teniamos once verdades distintas sobre el mismo negocio. Ahora hay una, y esta disponible a las siete de la manana.',
      autor: 'Paulina Larrea',
      cargo: 'Directora comercial, VERTICE',
    },
    escala: 'ancha',
  },

  {
    slug: 'athletica',
    indice: '05',
    nombre: 'ATHLETICA',
    industria: 'Fitness / Gimnasios',
    anio: 2023,
    lugar: 'Queretaro',
    resumen: 'Predecir quien esta a punto de irse.',
    descripcion:
      'Aplicacion de socios, control de acceso y modelo de retencion para una cadena de seis gimnasios con catorce mil socios activos.',
    servicios: ['Software a medida', 'Inteligencia artificial', 'Datos & BI'],
    tecnologias: ['Next.js', 'React Native', 'Python', 'PostgreSQL', 'scikit-learn', 'Supabase'],
    portada: img.gimnasioOscuro,
    galeria: [
      {
        src: img.gimnasioOscuro,
        alt: 'Interior de gimnasio en penumbra',
        pie: 'Seis sedes, catorce mil socios activos y una rotacion mensual del 9.4 %.',
      },
      {
        src: img.pesas,
        alt: 'Area de pesas',
        pie: 'El acceso por codigo alimenta el modelo de asistencia en vivo.',
      },
      {
        src: img.monitoreo,
        alt: 'Pantalla de monitoreo',
        pie: 'Tablero de retencion: cada sede recibe su lista de socios en riesgo cada lunes.',
      },
    ],
    resultado: { valor: '-27 %', etiqueta: 'Bajas mensuales' },
    metricas: [
      { valor: '-27 %', etiqueta: 'Bajas mensuales' },
      { valor: '0.83', etiqueta: 'AUC del modelo de abandono' },
      { valor: '14 000', etiqueta: 'Socios activos en la plataforma' },
    ],
    problema: {
      titulo: 'Se enteraban de la baja cuando ya era baja',
      parrafos: [
        'ATHLETICA perdia 9.4 % de sus socios cada mes y solo lo sabia cuando alguien cancelaba la domiciliacion. El equipo de retencion trabajaba sobre una lista de bajas, es decir, sobre gente que ya se habia ido.',
        'Los datos existian: accesos, reservas de clase, uso de casilleros. Estaban en tres sistemas que no se hablaban entre si.',
      ],
      puntos: [
        'Rotacion mensual del 9.4 % sin senal anticipada',
        'Accesos, clases y cobranza en sistemas separados',
        'Campanas de retencion dirigidas a toda la base por igual',
        'Sin aplicacion propia: reservas por telefono o en recepcion',
      ],
    },
    solucion: {
      titulo: 'La asistencia avisa antes que la cancelacion',
      parrafos: [
        'Unificamos accesos, reservas y cobranza en un solo almacen y entrenamos un modelo de abandono con dieciocho meses de historico. La senal mas fuerte resulto ser simple: dos semanas consecutivas por debajo del ritmo habitual de cada persona.',
        'Cada lunes el modelo entrega a cada sede una lista corta de socios en riesgo con el motivo probable. No es un numero: es un nombre y una razon por la que llamarlo.',
      ],
      piezas: [
        {
          nombre: 'Almacen unificado',
          texto: 'Accesos, clases, casilleros y cobranza en un modelo comun por socio.',
        },
        {
          nombre: 'Modelo de abandono',
          texto: 'Gradient boosting sobre dieciocho meses de historico, reentrenado cada mes. AUC 0.83.',
        },
        {
          nombre: 'Lista de riesgo',
          texto: 'Veinte socios por sede cada lunes, con motivo probable y accion sugerida.',
        },
        {
          nombre: 'Aplicacion de socio',
          texto: 'Acceso por codigo, reserva de clase y progreso personal.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Consolidacion',
        semanas: '4 semanas',
        texto: 'Extraccion e historificacion de tres sistemas con criterios distintos de identidad del socio.',
      },
      {
        fase: 'Exploracion',
        semanas: '3 semanas',
        texto: 'Analisis de senales. Descartamos ocho hipotesis del negocio antes de encontrar la que si predecia.',
      },
      {
        fase: 'Modelo',
        semanas: '4 semanas',
        texto: 'Entrenamiento, validacion temporal y definicion del umbral junto al equipo de retencion.',
      },
      {
        fase: 'Producto',
        semanas: '9 semanas',
        texto: 'Aplicacion de socio, control de acceso y tablero de retencion por sede.',
      },
    ],
    impacto: {
      titulo: 'Llamar a tiempo',
      parrafos: [
        'Las bajas mensuales cayeron 27 % en el primer semestre. El cambio no fue tecnologico sino de momento: la misma llamada, hecha tres semanas antes, funciona.',
        'La aplicacion absorbio el 71 % de las reservas de clase y libero a recepcion de una tarea que consumia tres horas diarias por sede.',
      ],
    },
    cita: {
      texto: 'No necesitabamos mas datos, necesitabamos saber a quien llamar el lunes. Eso es lo que nos dieron.',
      autor: 'Daniel Kimura',
      cargo: 'Director de experiencia, ATHLETICA',
    },
    escala: 'alta',
  },

  {
    slug: 'forma',
    indice: '06',
    nombre: 'FORMA',
    industria: 'Negocios / SaaS',
    anio: 2025,
    lugar: 'Madrid',
    resumen: 'Cinco archivos de Excel, una sola plataforma.',
    descripcion:
      'Plataforma de gestion para despachos de consultoria: proyectos, horas, facturacion y rentabilidad por cliente, con lectura automatica de documentos.',
    servicios: ['Software a medida', 'Inteligencia artificial', 'Integraciones', 'Datos & BI'],
    tecnologias: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'Claude', 'Supabase', 'Vercel'],
    portada: img.pasilloVidrio,
    galeria: [
      {
        src: img.pasilloVidrio,
        alt: 'Pasillo de una oficina de consultoria',
        pie: 'FORMA opera con cuarenta y un consultores en tres paises.',
      },
      {
        src: img.tableroOscuro,
        alt: 'Tablero de indicadores',
        pie: 'Rentabilidad por proyecto, disponible el dia 2 de cada mes en lugar del dia 18.',
      },
      {
        src: img.muroDeNotas,
        alt: 'Sesion de trabajo con notas en la pared',
        pie: 'El modelo de datos se definio en dos sesiones con socios y con administracion.',
      },
    ],
    resultado: { valor: '16 dias', etiqueta: 'Antes el cierre mensual' },
    metricas: [
      { valor: '16 dias', etiqueta: 'Adelanto del cierre mensual' },
      { valor: '96.4 %', etiqueta: 'Exactitud leyendo facturas' },
      { valor: '41', etiqueta: 'Consultores en la plataforma' },
    ],
    problema: {
      titulo: 'La rentabilidad se sabia dieciocho dias tarde',
      parrafos: [
        'FORMA gestionaba cuarenta y un consultores con cinco archivos de Excel: uno de proyectos, uno de horas, uno de gastos, uno de facturacion y uno maestro que intentaba unirlos. Lo mantenia una sola persona.',
        'El cierre mensual llegaba el dia 18. Para entonces, un proyecto que perdia dinero llevaba mes y medio perdiendolo.',
      ],
      puntos: [
        'Cinco hojas de calculo enlazadas y una persona que las sostenia',
        'Cierre mensual disponible el dia 18',
        'Gastos capturados a mano desde fotos de tickets',
        'Sin vista de rentabilidad por proyecto en curso',
      ],
    },
    solucion: {
      titulo: 'Capturar una vez, ver en todos lados',
      parrafos: [
        'Construimos la plataforma alrededor del registro de horas, que es el unico dato que el consultor produce todos los dias. Todo lo demas se deriva de ahi: avance, costo, margen y facturacion.',
        'Los gastos se capturan fotografiando el documento: un modelo lee importe, fecha, proveedor e impuestos, y solo pide intervencion humana cuando su confianza baja del umbral acordado.',
      ],
      piezas: [
        {
          nombre: 'Registro de horas',
          texto: 'Captura en menos de treinta segundos al dia, con imputacion a proyecto y tarea.',
        },
        {
          nombre: 'Lectura de documentos',
          texto: 'Extraccion de facturas y tickets con revision humana solo bajo el umbral de confianza.',
        },
        {
          nombre: 'Rentabilidad en vivo',
          texto: 'Margen por proyecto y por cliente actualizado con cada hora imputada.',
        },
        {
          nombre: 'Facturacion',
          texto: 'Propuesta de factura generada desde lo realmente imputado, con integracion contable.',
        },
      ],
    },
    proceso: [
      {
        fase: 'Descubrimiento',
        semanas: '3 semanas',
        texto: 'Entrevistas con socios, consultores y administracion. Las tres areas describian procesos distintos para lo mismo.',
      },
      {
        fase: 'Evaluacion de IA',
        semanas: '2 semanas',
        texto: 'Antes de construir, medimos la lectura de documentos contra cuatrocientas facturas reales para fijar el umbral de revision.',
      },
      {
        fase: 'Construccion',
        semanas: '13 semanas',
        texto: 'Plataforma completa con migracion de dos anos de historico desde los cinco archivos.',
      },
      {
        fase: 'Transicion',
        semanas: '5 semanas',
        texto: 'Operacion en paralelo durante dos cierres mensuales antes de apagar las hojas de calculo.',
      },
    ],
    impacto: {
      titulo: 'El cierre llego al dia 2',
      parrafos: [
        'El cierre mensual paso del dia 18 al dia 2. Los socios revisan rentabilidad por proyecto mientras el proyecto sigue vivo y todavia se puede corregir.',
        'La captura de gastos dejo de ser una tarea: el 87 % de los documentos entra sin que nadie los toque.',
      ],
    },
    cita: {
      texto: 'Pasamos de trabajar con cinco archivos de Excel a tener toda la operacion centralizada en una sola plataforma. El cierre que nos tomaba dieciocho dias ahora esta listo el dia 2.',
      autor: 'Gonzalo Ortuno',
      cargo: 'Socio director, FORMA',
    },
    escala: 'media',
  },
];

export const getProyecto = (slug: string) => proyectos.find((p) => p.slug === slug);

export const proyectoVecino = (slug: string) => {
  const i = proyectos.findIndex((p) => p.slug === slug);
  return {
    anterior: proyectos[(i - 1 + proyectos.length) % proyectos.length],
    siguiente: proyectos[(i + 1) % proyectos.length],
  };
};
