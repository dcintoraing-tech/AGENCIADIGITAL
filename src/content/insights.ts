import { img } from './images';

export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'subtitulo'; texto: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'cita'; texto: string };

export type Articulo = {
  slug: string;
  categoria: string;
  titulo: string;
  bajada: string;
  fecha: string;
  fechaLegible: string;
  lectura: string;
  autor: string;
  cargoAutor: string;
  imagen: string;
  destacado?: boolean;
  cuerpo: Bloque[];
};

export const articulos: Articulo[] = [
  {
    slug: 'automatizar-no-es-digitalizar',
    categoria: 'Automatizacion',
    titulo: 'Automatizar no es digitalizar un proceso roto',
    bajada:
      'La mayoria de los proyectos de automatizacion fallan porque empiezan copiando el procedimiento actual en lugar de cuestionarlo.',
    fecha: '2026-03-18',
    fechaLegible: '18 de marzo, 2026',
    lectura: '6 min',
    autor: 'Irene Solis',
    cargoAutor: 'Directora de ingenieria',
    imagen: img.almacen,
    destacado: true,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Llega la solicitud: automatizar la aprobacion de ordenes de compra. El procedimiento actual tiene siete firmas. La tentacion es construir un flujo con siete pantallas de aprobacion y declarar la victoria.',
      },
      {
        tipo: 'parrafo',
        texto:
          'Cuando preguntamos por que son siete, nadie lo sabe. Rastreando el origen aparece una respuesta frecuente: hubo un fraude en 2014 y se agrego una firma. Luego otro incidente y otra firma. Nadie quito ninguna.',
      },
      { tipo: 'subtitulo', texto: 'Primero el conteo, despues el codigo' },
      {
        tipo: 'parrafo',
        texto:
          'Antes de automatizar medimos. Cuantas ordenes pasan al mes, cuantas se rechazan y en que firma. El dato suele ser contundente: en un cliente, seis de las siete firmas aprobaron el 100 % de las ordenes durante dieciocho meses. Solo una rechazaba algo alguna vez.',
      },
      {
        tipo: 'parrafo',
        texto:
          'Automatizar las siete habria funcionado tecnicamente y habria sido un desperdicio. Lo que hicimos fue proponer un cambio de politica: aprobacion por monto, con una sola revision real y muestreo aleatorio para auditoria.',
      },
      { tipo: 'cita', texto: 'La automatizacion mas rentable suele ser la que elimina el paso en lugar de acelerarlo.' },
      { tipo: 'subtitulo', texto: 'Tres preguntas antes de escribir una linea' },
      {
        tipo: 'lista',
        items: [
          'Cuantas veces al mes ocurre este paso y cuanto tiempo consume en total.',
          'Que porcentaje de las veces el paso cambia el resultado.',
          'Que pasaria manana si el paso dejara de existir.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Si la tercera pregunta no tiene respuesta clara, el paso es candidato a desaparecer. Si tiene respuesta, ya sabemos que estamos protegiendo y podemos automatizarlo con criterio.',
      },
      { tipo: 'subtitulo', texto: 'El costo de automatizar lo innecesario' },
      {
        tipo: 'parrafo',
        texto:
          'Un flujo automatizado no es gratis: hay que mantenerlo, documentarlo y explicarlo a cada persona que entra al equipo. Cada paso que conservamos sin justificacion se vuelve deuda permanente, con la diferencia de que ahora esta escrita en codigo y cuesta mas quitarla.',
      },
    ],
  },
  {
    slug: 'ia-cuando-si-cuando-no',
    categoria: 'Inteligencia artificial',
    titulo: 'Cuando si conviene meter un modelo, y cuando no',
    bajada:
      'Una regla practica: si el problema se puede resolver con una consulta SQL y tres condicionales, no necesita un modelo de lenguaje.',
    fecha: '2026-02-24',
    fechaLegible: '24 de febrero, 2026',
    lectura: '7 min',
    autor: 'Tomas Rivadeneira',
    cargoAutor: 'Lider de datos e IA',
    imagen: img.laboratorio,
    destacado: true,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'En los ultimos dos anos revisamos cuarenta y tres solicitudes de clientes que empezaban con la frase queremos usar inteligencia artificial. Construimos modelo en once. En las otras treinta y dos habia una solucion mas barata, mas rapida y mas facil de auditar.',
      },
      { tipo: 'subtitulo', texto: 'La prueba de las tres condiciones' },
      {
        tipo: 'parrafo',
        texto:
          'Un modelo de lenguaje gana cuando se cumplen las tres a la vez. Si falta una, casi siempre hay una alternativa mejor.',
      },
      {
        tipo: 'lista',
        items: [
          'La entrada no tiene estructura fija: texto libre, documentos escaneados, correos, notas de campo.',
          'Las reglas son demasiadas o cambian seguido, y escribirlas una por una seria interminable.',
          'El error tiene costo acotado y existe una via de revision humana razonable.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'La tercera condicion es la que mas se ignora. Un modelo con 96 % de exactitud suena excelente hasta que el 4 % restante son pagos a proveedores. Lo que vuelve viable ese 96 % no es el numero, es que el sistema sepa cuando no esta seguro y pida ayuda.',
      },
      { tipo: 'subtitulo', texto: 'Medir antes de prometer' },
      {
        tipo: 'parrafo',
        texto:
          'Nunca comprometemos un numero de exactitud antes de evaluar. En FORMA pasamos dos semanas midiendo lectura de facturas contra cuatrocientos documentos reales del cliente, etiquetados a mano. Solo despues fijamos el umbral de confianza bajo el cual un humano revisa.',
      },
      {
        tipo: 'cita',
        texto: 'Un modelo sin evaluacion no es un producto, es una apuesta que paga el cliente.',
      },
      { tipo: 'subtitulo', texto: 'Lo aburrido que si funciona' },
      {
        tipo: 'parrafo',
        texto:
          'Los casos donde la IA rinde de verdad rara vez se ven impresionantes en una demostracion: extraer catorce campos de un documento, enrutar un correo al area correcta, encontrar el parrafo relevante en un contrato de ochenta paginas. Ahorran horas todos los dias y nadie escribe una nota de prensa sobre ellos.',
      },
    ],
  },
  {
    slug: 'excel-como-sintoma',
    categoria: 'Sistemas empresariales',
    titulo: 'El Excel que sostiene la empresa es un sintoma, no el problema',
    bajada:
      'Cuando una hoja de calculo se vuelve critica, alguien entendio el negocio mejor que el software que compraron. Conviene escucharlo.',
    fecha: '2026-01-30',
    fechaLegible: '30 de enero, 2026',
    lectura: '5 min',
    autor: 'Irene Solis',
    cargoAutor: 'Directora de ingenieria',
    imagen: img.obraEnCurso,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'En casi todas las empresas con las que trabajamos hay un archivo. Tiene veinte pestanas, formulas que nadie se atreve a tocar y el nombre de una sola persona en el historial de cambios. Si esa persona se enferma, el area se detiene.',
      },
      {
        tipo: 'parrafo',
        texto:
          'La reaccion instintiva es despreciarlo. Nosotros hacemos lo contrario: ese archivo es la mejor especificacion funcional disponible. Alguien lo construyo resolviendo problemas reales, uno por uno, durante anos.',
      },
      { tipo: 'subtitulo', texto: 'Leer el archivo antes de reemplazarlo' },
      {
        tipo: 'parrafo',
        texto:
          'En FORMA dedicamos cuatro dias a leer cinco hojas de calculo con la persona que las mantenia. Encontramos reglas de negocio que no aparecian en ningun manual: como se prorratea un gasto compartido, que pasa cuando un consultor factura en otra moneda, por que ciertos clientes se cierran el dia 25.',
      },
      {
        tipo: 'parrafo',
        texto:
          'Ninguna de esas reglas estaba en el pliego original del proyecto. Todas eran indispensables.',
      },
      { tipo: 'cita', texto: 'La hoja de calculo no es el enemigo. Es la documentacion que nadie escribio.' },
      { tipo: 'subtitulo', texto: 'Que si justifica reemplazarla' },
      {
        tipo: 'lista',
        items: [
          'Mas de una persona necesita escribir al mismo tiempo.',
          'El historico importa y hay que poder auditar quien cambio que.',
          'El volumen rompe la herramienta: tiempos de apertura, archivos que se corrompen.',
          'La informacion tiene que alimentar otros procesos de forma confiable.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Si no se cumple ninguna, quiza el proyecto correcto no sea un sistema nuevo sino ordenar el archivo y respaldarlo bien. Lo hemos recomendado mas de una vez, y hemos perdido proyectos por recomendarlo.',
      },
    ],
  },
  {
    slug: 'checkout-que-no-estorba',
    categoria: 'E-commerce',
    titulo: 'El checkout no se optimiza, se quita de en medio',
    bajada:
      'Cada campo adicional en el pago cuesta conversion. La pregunta util no es como mejorarlo, sino que campos podemos eliminar hoy.',
    fecha: '2025-12-11',
    fechaLegible: '11 de diciembre, 2025',
    lectura: '5 min',
    autor: 'Lucia Bermudez',
    cargoAutor: 'Directora de diseno',
    imagen: img.tienda,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'El checkout de FLAMA tenia seis pasos y diecinueve campos. En movil lo abandonaba el 71 % de quienes llegaban con producto en el carrito. El encargo original fue mejorar el diseno del checkout. El trabajo real fue discutir que informacion hacia falta de verdad.',
      },
      { tipo: 'subtitulo', texto: 'Cada campo necesita un dueno' },
      {
        tipo: 'parrafo',
        texto:
          'Recorrimos los diecinueve campos preguntando quien usa este dato y para que. Cuatro no los usaba nadie: se habian agregado por si acaso. Tres se podian derivar del codigo postal. Dos los podia recordar el navegador.',
      },
      {
        tipo: 'parrafo',
        texto: 'Quedaron diez campos en una sola pantalla. La conversion movil subio 41 % sin tocar el precio ni la oferta.',
      },
      { tipo: 'subtitulo', texto: 'Detalles que suman mas que un rediseno' },
      {
        tipo: 'lista',
        items: [
          'Teclado numerico en los campos numericos. Parece obvio y se omite constantemente.',
          'Autocompletado estandar del navegador en direcciones y tarjeta.',
          'Validacion al salir del campo, nunca mientras se escribe.',
          'El total visible en todo momento, sin sorpresas al final.',
          'Pago como invitado antes que cualquier registro.',
        ],
      },
      {
        tipo: 'cita',
        texto: 'Nadie entra a una tienda para disfrutar el formulario de pago. El mejor checkout es el que casi no se nota.',
      },
    ],
  },
  {
    slug: 'kpi-antes-del-tablero',
    categoria: 'Datos',
    titulo: 'Definan el indicador antes de pedir el tablero',
    bajada:
      'La mitad de los proyectos de BI se atoran porque dos areas llaman igual a cosas distintas. Eso se resuelve en una reunion, no con una herramienta.',
    fecha: '2025-11-06',
    fechaLegible: '6 de noviembre, 2025',
    lectura: '6 min',
    autor: 'Tomas Rivadeneira',
    cargoAutor: 'Lider de datos e IA',
    imagen: img.tableroOscuro,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Ventas dice que el mes cerro en 4.2 millones. Finanzas dice 3.8. Las dos areas tienen razon: una cuenta al emitir el pedido y la otra al facturar. Llevaban dos anos discutiendolo en cada junta.',
      },
      {
        tipo: 'parrafo',
        texto:
          'Ningun tablero resuelve eso. Un tablero lo unico que hace es mostrar el desacuerdo mas rapido y en mejor tipografia.',
      },
      { tipo: 'subtitulo', texto: 'El diccionario primero' },
      {
        tipo: 'parrafo',
        texto:
          'Antes de modelar nada escribimos un diccionario de indicadores. Cada entrada responde cuatro preguntas y la firma una persona con nombre y apellido.',
      },
      {
        tipo: 'lista',
        items: [
          'Que mide exactamente, en una frase sin ambiguedad.',
          'En que momento se cuenta el evento.',
          'Que casos quedan excluidos y por que.',
          'Quien responde por el numero cuando alguien lo cuestiona.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Es la parte menos vistosa del proyecto y la que mas discusiones evita. En VERTICE nos tomo tres sesiones acordar que significa unidad vendida. Despues de eso, construir el tablero fue trabajo mecanico.',
      },
      { tipo: 'cita', texto: 'Un numero sin dueno no es un indicador, es una opinion con formato.' },
    ],
  },
  {
    slug: 'interfaces-que-envejecen-bien',
    categoria: 'UX / UI',
    titulo: 'Interfaces que envejecen bien',
    bajada:
      'Lo que hace que un sistema interno siga siendo usable a los cinco anos no es el estilo visual, es la coherencia de sus reglas.',
    fecha: '2025-10-02',
    fechaLegible: '2 de octubre, 2025',
    lectura: '5 min',
    autor: 'Lucia Bermudez',
    cargoAutor: 'Directora de diseno',
    imagen: img.volumenBlanco,
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Un sistema interno vive mucho mas que una campana. Las plataformas que construimos en 2019 siguen en uso diario. Las que envejecieron peor no fueron las menos bonitas, fueron las que tomaron decisiones distintas para problemas iguales.',
      },
      { tipo: 'subtitulo', texto: 'Las reglas que sostienen el tiempo' },
      {
        tipo: 'lista',
        items: [
          'Una accion destructiva se confirma siempre igual, en toda la aplicacion.',
          'Los estados vacios explican que hacer, no solo que no hay nada.',
          'Los errores dicen que paso y cual es el siguiente paso.',
          'Las tablas se filtran y se ordenan del mismo modo en cada pantalla.',
          'Lo que se puede deshacer se avisa; lo que no, se confirma.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Nada de esto es sofisticado. Es disciplina sostenida durante meses, que se nota cuando alguien entra al sistema por primera vez y entiende la segunda pantalla porque ya entendio la primera.',
      },
      { tipo: 'subtitulo', texto: 'Disenar con datos reales' },
      {
        tipo: 'parrafo',
        texto:
          'Nunca disenamos con contenido de relleno. Pedimos un extracto real desde la primera semana: nombres largos, campos vacios, importes negativos, el cliente que se llama igual que otro. El diseno que sobrevive a los datos reales es el unico que sirve.',
      },
      {
        tipo: 'cita',
        texto: 'Si la interfaz solo funciona con el ejemplo perfecto, no es una interfaz: es una maqueta.',
      },
    ],
  },
];

export const getArticulo = (slug: string) => articulos.find((a) => a.slug === slug);

export const articulosRelacionados = (slug: string, n = 3) =>
  articulos.filter((a) => a.slug !== slug).slice(0, n);
