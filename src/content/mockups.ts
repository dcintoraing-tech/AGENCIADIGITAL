import type { MockupProps } from '@/components/dashboard/Mockup';

/**
 * Interfaz representativa de cada proyecto, construida en codigo.
 * Las series son fijas para que la maqueta sea reproducible.
 */
export const mockups: Record<string, Omit<MockupProps, 'className'>> = {
  flama: {
    producto: 'FLAMA OPS',
    secciones: ['Pedidos', 'Inventario', 'Apartados', 'Tiendas', 'Devoluciones'],
    activa: 1,
    tituloPanel: 'Inventario consolidado — 9 puntos de venta',
    indicadores: [
      { etiqueta: 'Disponible', valor: '18 402' },
      { etiqueta: 'Apartado', valor: '1 136', delta: '12 min' },
      { etiqueta: 'Ruptura', valor: '14', delta: '-78 %' },
      { etiqueta: 'Surtido', valor: '2.4 h' },
    ],
    serie: [62, 58, 71, 69, 83, 78, 92, 88, 101, 96, 112, 108, 124, 119, 133, 128, 141, 137, 152, 148, 161, 157, 168, 164, 177, 172, 186, 181, 194, 203],
    filas: [
      { a: 'FL-0118', b: 'Sudadera oversize · Roma Norte', c: '36', estado: 'riesgo' },
      { a: 'FL-0077', b: 'Playera basica · Monterrey', c: '9', estado: 'critico' },
      { a: 'FL-0392', b: 'Pantalon cargo · Guadalajara', c: '212', estado: 'ok' },
      { a: 'FL-0455', b: 'Gorra bordada · Vallejo', c: '341', estado: 'ok' },
    ],
  },

  nero: {
    producto: 'NERO TALLER',
    secciones: ['Agenda', 'Recepcion', 'Expedientes', 'Bahias', 'Clientes'],
    activa: 2,
    tituloPanel: 'Expedientes del dia — 4 sucursales',
    indicadores: [
      { etiqueta: 'En taller', valor: '23' },
      { etiqueta: 'Bahias', valor: '81 %', delta: '+34 %' },
      { etiqueta: 'Recepcion', valor: '6 min' },
      { etiqueta: 'Firmados', valor: '100 %' },
    ],
    serie: [12, 14, 13, 16, 15, 18, 17, 19, 18, 21, 20, 23, 22, 24, 23, 26, 25, 27, 26, 29, 28, 30, 29, 32, 31, 33, 32, 35, 34, 36],
    filas: [
      { a: 'EX-4821', b: 'Porsche Panamera · San Pedro', c: '18 tomas', estado: 'ok' },
      { a: 'EX-4822', b: 'BMW M4 · Valle Oriente', c: '18 tomas', estado: 'ok' },
      { a: 'EX-4823', b: 'Audi RS6 · Cumbres', c: '14 tomas', estado: 'riesgo' },
      { a: 'EX-4824', b: 'Mercedes AMG · San Pedro', c: '18 tomas', estado: 'ok' },
    ],
  },

  'casa-27': {
    producto: 'CASA 27',
    secciones: ['Reservas', 'Habitaciones', 'Experiencias', 'Llegadas', 'Tarifas'],
    activa: 3,
    tituloPanel: 'Llegadas de hoy — 27 habitaciones',
    indicadores: [
      { etiqueta: 'Ocupacion', valor: '92 %' },
      { etiqueta: 'Directa', valor: '64 %', delta: '+63 %' },
      { etiqueta: 'Extras', valor: '2.4x' },
      { etiqueta: 'Tarifa media', valor: '4 180' },
    ],
    serie: [48, 52, 50, 56, 54, 61, 58, 64, 62, 68, 66, 72, 70, 75, 73, 79, 77, 82, 80, 85, 83, 88, 86, 90, 88, 92, 90, 94, 92, 96],
    filas: [
      { a: '14:00', b: 'Suite Jardin · 2 noches · traslado', c: '2 pax', estado: 'ok' },
      { a: '15:30', b: 'Habitacion Patio · 4 noches · cena', c: '2 pax', estado: 'ok' },
      { a: '16:00', b: 'Suite Terraza · 1 noche', c: '3 pax', estado: 'riesgo' },
      { a: '18:45', b: 'Habitacion Valle · 3 noches · recorrido', c: '2 pax', estado: 'ok' },
    ],
  },

  vertice: {
    producto: 'VERTICE',
    secciones: ['Inventario', 'Unidades', 'Contratos', 'Asesores', 'Direccion'],
    activa: 0,
    tituloPanel: 'Inventario comercial — 11 desarrollos',
    indicadores: [
      { etiqueta: 'Unidades', valor: '1 240' },
      { etiqueta: 'Apartadas', valor: '186' },
      { etiqueta: 'Ciclo', valor: '41 d', delta: '-11 d' },
      { etiqueta: 'Duplicadas', valor: '0' },
    ],
    serie: [22, 26, 24, 30, 28, 34, 32, 38, 36, 43, 41, 47, 45, 52, 50, 56, 54, 61, 59, 65, 63, 70, 68, 74, 72, 79, 77, 83, 81, 88],
    filas: [
      { a: 'ALT-A-304', b: 'Altavista · 86 m2 · apartada', c: '3.2 M', estado: 'riesgo' },
      { a: 'ALT-B-112', b: 'Altavista · 104 m2 · contrato', c: '4.1 M', estado: 'ok' },
      { a: 'PAR-C-901', b: 'Parque Sur · 72 m2 · disponible', c: '2.4 M', estado: 'ok' },
      { a: 'PAR-C-902', b: 'Parque Sur · 72 m2 · escriturada', c: '2.4 M', estado: 'ok' },
    ],
  },

  athletica: {
    producto: 'ATHLETICA',
    secciones: ['Socios', 'Accesos', 'Clases', 'Retencion', 'Cobranza'],
    activa: 3,
    tituloPanel: 'Socios en riesgo — semana 14',
    indicadores: [
      { etiqueta: 'Socios', valor: '14 002' },
      { etiqueta: 'Bajas', valor: '6.9 %', delta: '-27 %' },
      { etiqueta: 'En riesgo', valor: '120' },
      { etiqueta: 'AUC', valor: '0.83' },
    ],
    serie: [94, 92, 95, 91, 93, 89, 91, 87, 89, 85, 87, 83, 85, 81, 83, 79, 81, 77, 79, 75, 77, 73, 75, 71, 73, 70, 72, 69, 71, 68],
    filas: [
      { a: 'S-20418', b: 'Centro · 2 semanas sin asistir', c: '0.81', estado: 'critico' },
      { a: 'S-19772', b: 'Juriquilla · ritmo a la baja', c: '0.74', estado: 'critico' },
      { a: 'S-21033', b: 'Milenio · sin reservar clase', c: '0.62', estado: 'riesgo' },
      { a: 'S-18290', b: 'Centro · cobro rechazado', c: '0.58', estado: 'riesgo' },
    ],
  },

  forma: {
    producto: 'FORMA',
    secciones: ['Proyectos', 'Horas', 'Gastos', 'Rentabilidad', 'Facturacion'],
    activa: 3,
    tituloPanel: 'Rentabilidad por proyecto — cierre dia 2',
    indicadores: [
      { etiqueta: 'Margen', valor: '34.6 %' },
      { etiqueta: 'Horas mes', valor: '6 218' },
      { etiqueta: 'Cierre', valor: 'Dia 2', delta: '-16 d' },
      { etiqueta: 'Lectura IA', valor: '96.4 %' },
    ],
    serie: [28, 31, 29, 34, 32, 37, 35, 40, 38, 43, 41, 46, 44, 49, 47, 52, 50, 55, 53, 58, 56, 61, 59, 64, 62, 67, 65, 70, 68, 73],
    filas: [
      { a: 'P-0391', b: 'Due diligence · sector salud', c: '41 %', estado: 'ok' },
      { a: 'P-0402', b: 'Reestructura · manufactura', c: '28 %', estado: 'riesgo' },
      { a: 'P-0377', b: 'Plan estrategico · retail', c: '12 %', estado: 'critico' },
      { a: 'P-0410', b: 'Valuacion · energia', c: '38 %', estado: 'ok' },
    ],
  },
};
