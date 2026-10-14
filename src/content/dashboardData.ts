/**
 * Datos del tablero de demostracion.
 * Son series fijas y deterministas: nada de valores aleatorios en render, que
 * romperian la hidratacion y harian irreproducible cualquier captura.
 */

export const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export type Periodo = '30d' | '90d' | '12m';

export const ingresos: Record<Periodo, number[]> = {
  '30d': [182, 176, 195, 210, 203, 188, 171, 198, 224, 236, 219, 241, 258, 247, 263, 255, 272, 289, 274, 296, 311, 298, 317, 332, 321, 344, 358, 347, 369, 384],
  '90d': [142, 151, 147, 163, 158, 174, 169, 186, 181, 197, 192, 208, 203, 219, 214, 231, 226, 242, 237, 254, 249, 266, 261, 278, 273, 290, 285, 302, 297, 314],
  '12m': [168, 182, 176, 201, 215, 208, 232, 247, 239, 268, 291, 312],
};

export const objetivo: Record<Periodo, number[]> = {
  '30d': [190, 190, 200, 200, 200, 200, 200, 210, 210, 210, 220, 220, 240, 240, 250, 250, 260, 270, 270, 280, 290, 290, 300, 310, 310, 320, 330, 330, 340, 350],
  '90d': [150, 150, 155, 160, 160, 170, 170, 180, 180, 190, 190, 200, 200, 210, 210, 220, 220, 230, 230, 240, 240, 250, 250, 260, 260, 270, 270, 280, 280, 290],
  '12m': [170, 175, 185, 195, 205, 215, 225, 235, 245, 258, 272, 288],
};

export const kpis: Record<Periodo, { clave: string; etiqueta: string; valor: string; delta: number; nota: string }[]> = {
  '30d': [
    { clave: 'ingreso', etiqueta: 'Ingreso', valor: '7.84 M', delta: 12.4, nota: 'vs. 30 dias previos' },
    { clave: 'pedidos', etiqueta: 'Pedidos', valor: '3 142', delta: 8.1, nota: '104 por dia' },
    { clave: 'ticket', etiqueta: 'Ticket medio', valor: '2 495', delta: 3.9, nota: 'MXN por pedido' },
    { clave: 'margen', etiqueta: 'Margen bruto', valor: '41.2 %', delta: -1.4, nota: 'presion en logistica' },
  ],
  '90d': [
    { clave: 'ingreso', etiqueta: 'Ingreso', valor: '21.6 M', delta: 18.7, nota: 'vs. trimestre previo' },
    { clave: 'pedidos', etiqueta: 'Pedidos', valor: '9 014', delta: 14.2, nota: '100 por dia' },
    { clave: 'ticket', etiqueta: 'Ticket medio', valor: '2 397', delta: 4.0, nota: 'MXN por pedido' },
    { clave: 'margen', etiqueta: 'Margen bruto', valor: '42.8 %', delta: 2.1, nota: 'mejora en compras' },
  ],
  '12m': [
    { clave: 'ingreso', etiqueta: 'Ingreso', valor: '82.4 M', delta: 31.5, nota: 'vs. ano anterior' },
    { clave: 'pedidos', etiqueta: 'Pedidos', valor: '34 806', delta: 26.8, nota: '95 por dia' },
    { clave: 'ticket', etiqueta: 'Ticket medio', valor: '2 367', delta: 3.7, nota: 'MXN por pedido' },
    { clave: 'margen', etiqueta: 'Margen bruto', valor: '42.1 %', delta: 1.2, nota: 'estable todo el ano' },
  ],
};

export const canales = [
  { nombre: 'Tienda en linea', valor: 44, color: 'accent' as const },
  { nombre: 'Punto de venta', valor: 31, color: 'ink' as const },
  { nombre: 'Mayoreo', valor: 17, color: 'muted' as const },
  { nombre: 'Marketplace', valor: 8, color: 'faint' as const },
];

export const regiones = [
  { nombre: 'Occidente', codigo: 'OCC', valor: 2840, variacion: 14.2, x: 24, y: 52 },
  { nombre: 'Centro', codigo: 'CEN', valor: 4120, variacion: 9.8, x: 47, y: 58 },
  { nombre: 'Norte', codigo: 'NOR', valor: 3310, variacion: 21.6, x: 38, y: 24 },
  { nombre: 'Bajio', codigo: 'BAJ', valor: 1960, variacion: -3.4, x: 40, y: 46 },
  { nombre: 'Sureste', codigo: 'SUR', valor: 1240, variacion: 6.1, x: 73, y: 72 },
  { nombre: 'Peninsula', codigo: 'PEN', valor: 880, variacion: 11.9, x: 86, y: 54 },
];

export const operacion = [
  { sku: 'FL-0241', producto: 'Chamarra tecnica', almacen: 'Vallejo', existencia: 148, reservado: 32, estado: 'ok' as const, rotacion: 4.2 },
  { sku: 'FL-0118', producto: 'Sudadera oversize', almacen: 'Vallejo', existencia: 36, reservado: 29, estado: 'riesgo' as const, rotacion: 7.8 },
  { sku: 'FL-0392', producto: 'Pantalon cargo', almacen: 'Guadalajara', existencia: 212, reservado: 18, estado: 'ok' as const, rotacion: 2.6 },
  { sku: 'FL-0077', producto: 'Playera basica', almacen: 'Monterrey', existencia: 9, reservado: 9, estado: 'critico' as const, rotacion: 11.4 },
  { sku: 'FL-0455', producto: 'Gorra bordada', almacen: 'Vallejo', existencia: 341, reservado: 12, estado: 'ok' as const, rotacion: 1.9 },
  { sku: 'FL-0203', producto: 'Tenis de lona', almacen: 'Guadalajara', existencia: 54, reservado: 41, estado: 'riesgo' as const, rotacion: 6.3 },
];

export const embudo = [
  { etapa: 'Visitas', valor: 148200 },
  { etapa: 'Ficha de producto', valor: 61400 },
  { etapa: 'Carrito', valor: 18900 },
  { etapa: 'Checkout', valor: 9450 },
  { etapa: 'Compra', valor: 6180 },
];

/** Serie corta para el panel del encabezado. */
export const pulso = [14, 18, 16, 22, 19, 26, 24, 31, 28, 35, 33, 41, 38, 46, 52];
