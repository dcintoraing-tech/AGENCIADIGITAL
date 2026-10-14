'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { AreaChart, DonutChart, Funnel, RegionMap } from './charts';
import {
  canales,
  embudo,
  ingresos,
  kpis,
  objetivo,
  operacion,
  regiones,
  type Periodo,
} from '@/content/dashboardData';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

const PERIODOS: { valor: Periodo; etiqueta: string }[] = [
  { valor: '30d', etiqueta: '30 dias' },
  { valor: '90d', etiqueta: '90 dias' },
  { valor: '12m', etiqueta: '12 meses' },
];

type Columna = 'producto' | 'existencia' | 'reservado' | 'rotacion';

const ESTADOS = {
  ok: { texto: 'Suficiente', clase: 'text-muted border-line' },
  riesgo: { texto: 'En riesgo', clase: 'text-ink border-ink' },
  critico: { texto: 'Critico', clase: 'text-accent border-accent' },
} as const;

/**
 * Tablero de demostracion. Es una interfaz real y manipulable: cambiar el
 * periodo, seleccionar una region u ordenar la tabla recalcula lo que se ve.
 * Sirve para enseñar que el estudio construye sistemas de informacion, no solo
 * paginas.
 */
export function DemoDashboard() {
  const [periodo, setPeriodo] = useState<Periodo>('90d');
  const [region, setRegion] = useState<string | null>(null);
  const [orden, setOrden] = useState<{ col: Columna; desc: boolean }>({
    col: 'rotacion',
    desc: true,
  });

  const regionActiva = regiones.find((r) => r.codigo === region) ?? null;

  const filas = useMemo(() => {
    const copia = [...operacion];
    copia.sort((a, b) => {
      const { col, desc } = orden;
      const va = a[col];
      const vb = b[col];
      const cmp = typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number);
      return desc ? -cmp : cmp;
    });
    return copia;
  }, [orden]);

  const ordenarPor = (col: Columna) =>
    setOrden((o) => (o.col === col ? { col, desc: !o.desc } : { col, desc: true }));

  return (
    <div className="border border-line bg-surface">
      {/* Barra superior */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-blink rounded-full bg-accent" />
          <span className="font-mono text-label uppercase tracking-[0.12em]">
            FLAMA — Operacion comercial
          </span>
        </div>

        <div className="flex items-center gap-1" role="group" aria-label="Periodo">
          {PERIODOS.map((p) => (
            <button
              key={p.valor}
              type="button"
              onClick={() => setPeriodo(p.valor)}
              aria-pressed={periodo === p.valor}
              className={cn(
                'border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200',
                periodo === p.valor
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line text-muted hover:border-ink hover:text-ink',
              )}
            >
              {p.etiqueta}
            </button>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
        {kpis[periodo].map((k) => (
          <div key={k.clave} className="bg-surface p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              {k.etiqueta}
            </span>
            <motion.span
              key={`${k.clave}-${periodo}`}
              className="tnum mt-2.5 block text-[1.75rem] font-bold leading-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              {k.valor}
            </motion.span>
            <span className="mt-2.5 flex items-baseline gap-2">
              <span
                className={cn(
                  'tnum font-mono text-[11px]',
                  k.delta >= 0 ? 'text-accent' : 'text-muted',
                )}
              >
                {k.delta >= 0 ? '+' : ''}
                {k.delta.toFixed(1)} %
              </span>
              <span className="text-[10px] text-faint">{k.nota}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Grafica principal y canales */}
      <div className="grid gap-px border-b border-line bg-line lg:grid-cols-3">
        <div className="bg-surface p-5 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Ingreso contra objetivo
            </span>
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
                <span className="h-px w-4 bg-accent" />
                Real
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
                <span className="h-px w-4 border-t border-dashed border-muted" />
                Objetivo
              </span>
            </span>
          </div>
          <div className="mt-5">
            <AreaChart
              key={periodo}
              datos={ingresos[periodo]}
              referencia={objetivo[periodo]}
              alto={190}
            />
          </div>
        </div>

        <div className="bg-surface p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Canal de venta
          </span>
          <div className="mt-4 flex items-center gap-5">
            <div className="h-24 w-24 shrink-0">
              <DonutChart partes={[...canales]} />
            </div>
            <ul className="min-w-0 flex-1 space-y-2">
              {canales.map((c) => (
                <li key={c.nombre} className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11px] text-muted">{c.nombre}</span>
                  <span className="tnum shrink-0 font-mono text-[11px]">{c.valor} %</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Region y embudo */}
      <div className="grid gap-px border-b border-line bg-line lg:grid-cols-2">
        <div className="bg-surface p-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Pedidos por region
            </span>
            {regionActiva ? (
              <button
                type="button"
                onClick={() => setRegion(null)}
                className="font-mono text-[10px] uppercase text-accent"
              >
                Quitar filtro
              </button>
            ) : (
              <span className="font-mono text-[10px] uppercase text-faint">Selecciona una</span>
            )}
          </div>

          <RegionMap
            regiones={regiones}
            activa={region ?? undefined}
            alSeleccionar={(c) => setRegion((r) => (r === c ? null : c))}
            className="mt-3"
          />

          <div className="mt-2 border-t border-line pt-4">
            {regionActiva ? (
              <motion.div
                key={regionActiva.codigo}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="text-sm">{regionActiva.nombre}</span>
                <span className="flex items-baseline gap-3">
                  <span className="tnum text-sm">
                    {regionActiva.valor.toLocaleString('es-MX')} pedidos
                  </span>
                  <span
                    className={cn(
                      'tnum font-mono text-[11px]',
                      regionActiva.variacion >= 0 ? 'text-accent' : 'text-muted',
                    )}
                  >
                    {regionActiva.variacion >= 0 ? '+' : ''}
                    {regionActiva.variacion} %
                  </span>
                </span>
              </motion.div>
            ) : (
              <p className="text-[11px] text-faint">
                Seis regiones activas. El area del circulo es proporcional al volumen de pedidos.
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Embudo de compra
          </span>
          <Funnel etapas={[...embudo]} className="mt-5" />
          <p className="mt-5 border-t border-line pt-4 text-[11px] text-faint">
            La caida mas grande sigue estando entre la ficha de producto y el carrito.
          </p>
        </div>
      </div>

      {/* Tabla de operacion */}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Inventario por SKU
          </span>
          <span className="font-mono text-[10px] uppercase text-faint">
            Ordena por cualquier columna
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2.5 pr-4 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                  SKU
                </th>
                {(
                  [
                    ['producto', 'Producto'],
                    ['existencia', 'Existencia'],
                    ['reservado', 'Reservado'],
                    ['rotacion', 'Rotacion'],
                  ] as [Columna, string][]
                ).map(([col, etiqueta]) => (
                  <th key={col} scope="col" className="py-2.5 pr-4">
                    <button
                      type="button"
                      onClick={() => ordenarPor(col)}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint transition-colors hover:text-ink"
                    >
                      {etiqueta}
                      <span className={cn('transition-opacity', orden.col === col ? 'opacity-100' : 'opacity-25')}>
                        {orden.col === col && !orden.desc ? '↑' : '↓'}
                      </span>
                    </button>
                  </th>
                ))}
                <th scope="col" className="py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <motion.tr
                  key={f.sku}
                  layout
                  transition={{ duration: 0.45, ease: ease.out }}
                  className="border-b border-line/60 last:border-0"
                >
                  <td className="py-3 pr-4 font-mono text-[11px] text-faint">{f.sku}</td>
                  <td className="py-3 pr-4 text-sm">
                    {f.producto}
                    <span className="ml-2 text-[11px] text-faint">{f.almacen}</span>
                  </td>
                  <td className="tnum py-3 pr-4 text-sm">{f.existencia}</td>
                  <td className="tnum py-3 pr-4 text-sm text-muted">{f.reservado}</td>
                  <td className="tnum py-3 pr-4 text-sm">{f.rotacion.toFixed(1)}</td>
                  <td className="py-3">
                    <span
                      className={cn(
                        'inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]',
                        ESTADOS[f.estado].clase,
                      )}
                    >
                      {ESTADOS[f.estado].texto}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
