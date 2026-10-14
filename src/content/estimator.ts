/**
 * Cotizador de demostracion.
 * Las cifras son un orden de magnitud realista para el mercado hispanohablante,
 * no una tarifa. El objetivo es dar una referencia util antes de la primera
 * conversacion, no sustituirla.
 */

export type Opcion<T extends string = string> = {
  valor: T;
  titulo: string;
  nota: string;
  /** Multiplicador o incremento sobre la base, segun el eje. */
  factor: number;
  semanas: number;
};

export const tiposProyecto: Opcion[] = [
  { valor: 'sitio', titulo: 'Sitio corporativo', nota: 'Presencia, contenido y captacion', factor: 1, semanas: 6 },
  { valor: 'ecommerce', titulo: 'E-commerce', nota: 'Catalogo, pago y posventa', factor: 2.1, semanas: 11 },
  { valor: 'sistema', titulo: 'Sistema interno', nota: 'Operacion, roles y procesos', factor: 2.8, semanas: 14 },
  { valor: 'plataforma', titulo: 'Plataforma / SaaS', nota: 'Producto con clientes externos', factor: 3.6, semanas: 18 },
  { valor: 'dashboard', titulo: 'Datos y tableros', nota: 'Modelo, carga e indicadores', factor: 1.7, semanas: 9 },
  { valor: 'automatizacion', titulo: 'Automatizacion', nota: 'Flujos y tramites sin intervencion', factor: 1.4, semanas: 7 },
];

export const complejidades: Opcion[] = [
  { valor: 'directa', titulo: 'Directa', nota: 'El proceso esta claro y documentado', factor: 1, semanas: 0 },
  { valor: 'media', titulo: 'Media', nota: 'Varias areas y reglas por acordar', factor: 1.35, semanas: 3 },
  { valor: 'alta', titulo: 'Alta', nota: 'Migracion, historicos o normativa', factor: 1.8, semanas: 7 },
];

export const volumenes: Opcion[] = [
  { valor: 'equipo', titulo: 'Hasta 25', nota: 'Un equipo o un area', factor: 1, semanas: 0 },
  { valor: 'empresa', titulo: '25 a 250', nota: 'Varias areas de la empresa', factor: 1.25, semanas: 2 },
  { valor: 'masiva', titulo: 'Mas de 250', nota: 'Toda la organizacion o clientes finales', factor: 1.55, semanas: 4 },
];

export type Extra = { valor: string; titulo: string; nota: string; costo: number; semanas: number };

export const integraciones: Extra[] = [
  { valor: 'erp', titulo: 'ERP o contabilidad', nota: 'SAP, Odoo, Contpaqi, Holded', costo: 95000, semanas: 3 },
  { valor: 'pagos', titulo: 'Pagos y cobranza', nota: 'Stripe, Mercado Pago, conciliacion', costo: 62000, semanas: 2 },
  { valor: 'crm', titulo: 'CRM', nota: 'HubSpot, Salesforce, Pipedrive', costo: 48000, semanas: 2 },
  { valor: 'identidad', titulo: 'Identidad corporativa', nota: 'Inicio de sesion unico, Entra ID', costo: 42000, semanas: 1 },
  { valor: 'logistica', titulo: 'Logistica y envios', nota: 'Paqueteria, rastreo, etiquetas', costo: 55000, semanas: 2 },
  { valor: 'ia', titulo: 'Modelo de IA', nota: 'Lectura, clasificacion o busqueda', costo: 120000, semanas: 4 },
];

export const disenos: Opcion[] = [
  { valor: 'sistema', titulo: 'Sistema existente', nota: 'Partimos de su manual de marca', factor: 1, semanas: 0 },
  { valor: 'medida', titulo: 'Diseno a medida', nota: 'Interfaz propia sobre su identidad', factor: 1.3, semanas: 3 },
  { valor: 'identidad', titulo: 'Identidad completa', nota: 'Marca, sistema visual y producto', factor: 1.65, semanas: 6 },
];

/** Base de referencia en pesos mexicanos. */
export const BASE = 185000;

export type Seleccion = {
  tipo: string;
  complejidad: string;
  volumen: string;
  integraciones: string[];
  diseno: string;
};

export const estimar = (s: Seleccion) => {
  const t = tiposProyecto.find((o) => o.valor === s.tipo) ?? tiposProyecto[0];
  const c = complejidades.find((o) => o.valor === s.complejidad) ?? complejidades[0];
  const v = volumenes.find((o) => o.valor === s.volumen) ?? volumenes[0];
  const d = disenos.find((o) => o.valor === s.diseno) ?? disenos[0];
  const extras = integraciones.filter((i) => s.integraciones.includes(i.valor));

  const nucleo = BASE * t.factor * c.factor * v.factor * d.factor;
  const sumaExtras = extras.reduce((a, e) => a + e.costo, 0);
  const centro = nucleo + sumaExtras;

  const semanas =
    t.semanas + c.semanas + v.semanas + d.semanas + extras.reduce((a, e) => a + e.semanas, 0);

  return {
    min: Math.round((centro * 0.85) / 5000) * 5000,
    max: Math.round((centro * 1.2) / 5000) * 5000,
    semanasMin: semanas,
    semanasMax: semanas + Math.ceil(semanas * 0.3),
    perfiles: Math.max(2, Math.round(2 + t.factor * 0.8 + extras.length * 0.4)),
    detalle: [
      { concepto: t.titulo, peso: Math.round((BASE * t.factor) / centro * 100) },
      { concepto: `Complejidad ${c.titulo.toLowerCase()}`, peso: Math.round((BASE * t.factor * (c.factor - 1)) / centro * 100) },
      { concepto: d.titulo, peso: Math.round((BASE * t.factor * c.factor * v.factor * (d.factor - 1)) / centro * 100) },
      { concepto: 'Integraciones', peso: Math.round((sumaExtras / centro) * 100) },
    ].filter((x) => x.peso > 0),
  };
};

/** En Mexico el simbolo de peso es el mismo que el del dolar: se explicita la moneda. */
export const formatoMXN = (n: number) =>
  `${new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n)} MXN`;
