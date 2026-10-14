/**
 * Banco de imagenes del prototipo.
 * Cada fotografia se eligio por direccion de arte: arquitectura, luz dura,
 * interiores reales y trabajo tecnico. Se evitan los clichos de stock
 * (apretones de manos, llaves sobre maquetas, bolsas de compra).
 */

const unsplash = (id: string, w = 2000, q = 76) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const img = {
  // Arquitectura y marca
  heroFachada: unsplash('1518005020951-eccb494ad742'),
  reticulaDorada: unsplash('1431576901776-e539bd916ba2'),
  torresNiebla: unsplash('1511818966892-d7d671e672a2'),
  volumenBlanco: unsplash('1479839672679-a46483c0e7c8'),
  museoAngular: unsplash('1487958449943-2429e8be8625'),
  obraEnCurso: unsplash('1541888946425-d81bb19240f5'),

  // Estudio y equipo
  mesaLarga: unsplash('1521737604893-d14cc237f11d'),
  nave: unsplash('1557804506-669a67965ba0'),
  tallerAbierto: unsplash('1559136555-9303baea8ebd'),
  pasilloVidrio: unsplash('1541746972996-4e0b0f43e02a'),
  muroDeNotas: unsplash('1552664730-d307ca884978'),
  trazoTecnico: unsplash('1581092160562-40aa08e78837'),

  // Tecnica
  laboratorio: unsplash('1581091226825-a6a2a5aee158'),
  almacen: unsplash('1553413077-190dd305871c'),
  codigo: unsplash('1555066931-4365d14bab8c'),
  codigoAngulo: unsplash('1461749280684-dccba630e2f6'),
  tableroOscuro: unsplash('1551288049-bebda4e38f71'),
  monitoreo: unsplash('1460925895917-afdab827c52f'),
  manosTeclado: unsplash('1515378791036-0648a3ef77b2'),

  // Industrias
  tienda: unsplash('1441986300917-64674bd600d8'),
  autoNocturno: unsplash('1503376780353-7e6692767b70'),
  autoDesierto: unsplash('1552519507-da3b142c6e3d'),
  restaurante: unsplash('1517248135467-4c7edcad34c4'),
  salonLuz: unsplash('1524758631624-e2822e304c36'),
  mesaServida: unsplash('1414235077428-338989a2e8c0'),
  casaAtardecer: unsplash('1513584684374-8bab748fbf90'),
  torreResidencial: unsplash('1545324418-cc1a3fa10c00'),
  interiorAmplio: unsplash('1554995207-c18c203602cb'),
  gimnasioOscuro: unsplash('1571902943202-507ec2618e8f'),
  pesas: unsplash('1534438327276-14e5300c3a48'),

  // Retratos
  retratoAlcantara: unsplash('1472099645785-5658abf4ff4e', 800),
  retratoBenavides: unsplash('1573496359142-b8d87734a5a2', 800),
  retratoOrtuno: unsplash('1500648767791-00dcc994a43e', 800),
  retratoKimura: unsplash('1507003211169-0a1dd7228f2d', 800),
  retratoLarrea: unsplash('1544005313-94ddf0286df2', 800),
  retratoFuenmayor: unsplash('1519085360753-af0119f7cbe7', 800),
} as const;

export type ImageKey = keyof typeof img;
