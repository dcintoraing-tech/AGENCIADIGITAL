/** Contenido de la seccion de IA y automatizacion. */

export const lab = {
  titulo: 'No automatizamos por moda.',
  intro:
    'Usamos modelos cuando hay texto desordenado, volumen que nadie puede leer o una clasificacion que cambia cada mes. Cuando el problema se resuelve con una consulta y tres condicionales, lo decimos y cobramos menos.',
  nota:
    'Cada despliegue lleva evaluacion previa contra datos reales del cliente, umbral de confianza acordado y una via de revision humana. Si el modelo no supera a la linea base, no entra a produccion.',
} as const;

export type EtapaFlujo = {
  clave: string;
  titulo: string;
  texto: string;
  detalle: string[];
};

/** DATOS -> IA -> PROCESAMIENTO -> RESULTADO */
export const flujo: EtapaFlujo[] = [
  {
    clave: 'datos',
    titulo: 'Datos',
    texto: 'Entra lo que la empresa ya produce todos los dias.',
    detalle: ['Facturas y tickets', 'Correos y adjuntos', 'Registros del ERP', 'Notas de campo', 'Formularios'],
  },
  {
    clave: 'modelo',
    titulo: 'Modelo',
    texto: 'Extraccion, clasificacion y busqueda sobre informacion propia.',
    detalle: ['Extraccion de campos', 'Clasificacion y enrutamiento', 'Busqueda semantica', 'Resumen con cita de origen'],
  },
  {
    clave: 'proceso',
    titulo: 'Procesamiento',
    texto: 'Validacion, reglas de negocio y umbral de confianza.',
    detalle: ['Validacion contra catalogos', 'Reglas de negocio', 'Revision humana bajo umbral', 'Bitacora de cada paso'],
  },
  {
    clave: 'resultado',
    titulo: 'Resultado',
    texto: 'El dato entra al sistema que lo necesita, no a un informe.',
    detalle: ['Registro en el ERP', 'Alerta al responsable', 'Indicador actualizado', 'Documento generado'],
  },
];

export type CasoIA = {
  titulo: string;
  texto: string;
  metrica: { valor: string; etiqueta: string };
};

export const casosIA: CasoIA[] = [
  {
    titulo: 'Lectura de documentos',
    texto:
      'Facturas, tickets y remisiones fotografiados con el telefono. El modelo extrae catorce campos y solo pide revision cuando su confianza baja del umbral.',
    metrica: { valor: '96.4 %', etiqueta: 'Exactitud sobre 400 documentos reales' },
  },
  {
    titulo: 'Clasificacion y enrutamiento',
    texto:
      'Correos y solicitudes que llegan a una bandeja general y terminan en el area correcta sin que nadie los lea primero.',
    metrica: { valor: '-6 h', etiqueta: 'Tiempo de primera respuesta' },
  },
  {
    titulo: 'Generacion de reportes',
    texto:
      'El informe mensual redactado desde los datos del periodo, con las cifras citando la consulta que las produjo.',
    metrica: { valor: '2 dias', etiqueta: 'Reducidos a quince minutos' },
  },
  {
    titulo: 'Busqueda sobre informacion propia',
    texto:
      'Contratos, manuales y politicas consultables en lenguaje natural, con la referencia exacta al parrafo de origen.',
    metrica: { valor: '80 pag', etiqueta: 'Contrato medio consultado en segundos' },
  },
  {
    titulo: 'Asistentes internos',
    texto:
      'Un asistente que responde solo sobre lo que el usuario tiene permiso de ver, y que dice no se cuando no lo sabe.',
    metrica: { valor: '0', etiqueta: 'Accesos fuera de permiso en auditoria' },
  },
  {
    titulo: 'Automatizacion administrativa',
    texto:
      'Conciliaciones, cargas masivas, expedientes y firmas. Tramite sin criterio humano es tramite automatizable.',
    metrica: { valor: '310 h', etiqueta: 'Liberadas al mes en el mayor despliegue' },
  },
];
