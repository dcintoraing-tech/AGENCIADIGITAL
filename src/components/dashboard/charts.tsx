'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------
   Graficas dibujadas a mano en SVG.
   Sin libreria: el control del trazo, de la rejilla y del color importa mas
   que la comodidad, y mantiene el paquete ligero.
   ------------------------------------------------------------------------- */

const escalar = (datos: number[], ancho: number, alto: number, relleno = 0) => {
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  const rango = max - min || 1;
  const paso = datos.length > 1 ? ancho / (datos.length - 1) : ancho;
  return datos.map((v, i) => [
    i * paso,
    relleno + (alto - relleno * 2) * (1 - (v - min) / rango),
  ] as const);
};

/** Curva suave de Catmull-Rom convertida a bezier cubica. */
const trazoSuave = (puntos: readonly (readonly [number, number])[]) => {
  if (puntos.length < 2) return '';
  let d = `M${puntos[0][0]},${puntos[0][1]}`;
  for (let i = 0; i < puntos.length - 1; i++) {
    const p0 = puntos[i - 1] ?? puntos[i];
    const p1 = puntos[i];
    const p2 = puntos[i + 1];
    const p3 = puntos[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
};

/* --- Linea de area con referencia opcional ------------------------------- */

export function AreaChart({
  datos,
  referencia,
  className,
  alto = 180,
  animar = true,
}: {
  datos: number[];
  referencia?: number[];
  className?: string;
  alto?: number;
  animar?: boolean;
}) {
  const id = useId();
  const W = 600;
  const H = alto;
  const todos = referencia ? [...datos, ...referencia] : datos;
  const min = Math.min(...todos);
  const max = Math.max(...todos);
  const aPuntos = (serie: number[]) =>
    serie.map((v, i) => [
      (i / (serie.length - 1)) * W,
      8 + (H - 16) * (1 - (v - min) / (max - min || 1)),
    ] as const);

  const linea = trazoSuave(aPuntos(datos));
  const area = `${linea} L${W},${H} L0,${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height: alto }}
      role="img"
      aria-label="Evolucion del periodo"
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-accent))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rejilla horizontal: cuatro lineas, suficientes para leer la escala */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={0}
          x2={W}
          y1={8 + ((H - 16) / 3) * i}
          y2={8 + ((H - 16) / 3) * i}
          stroke="rgb(var(--c-line))"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {referencia && (
        <path
          d={trazoSuave(aPuntos(referencia))}
          fill="none"
          stroke="rgb(var(--c-muted))"
          strokeWidth={1.25}
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      )}

      <path d={area} fill={`url(#g-${id})`} />
      <motion.path
        d={linea}
        fill="none"
        stroke="rgb(var(--c-accent))"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        initial={animar ? { pathLength: 0 } : false}
        animate={animar ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.3, ease: ease.out }}
      />
    </svg>
  );
}

/* --- Sparkline compacta --------------------------------------------------- */

export function Sparkline({
  datos,
  className,
  color = 'accent',
}: {
  datos: number[];
  className?: string;
  color?: 'accent' | 'ink';
}) {
  const puntos = escalar(datos, 100, 28, 2);
  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className={cn('h-7 w-full', className)}
      aria-hidden
    >
      <path
        d={trazoSuave(puntos)}
        fill="none"
        stroke={color === 'accent' ? 'rgb(var(--c-accent))' : 'rgb(var(--c-ink))'}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* --- Barras verticales ---------------------------------------------------- */

export function BarChart({
  datos,
  etiquetas,
  className,
  alto = 150,
}: {
  datos: number[];
  etiquetas?: string[];
  className?: string;
  alto?: number;
}) {
  const max = Math.max(...datos);
  return (
    <div className={cn('flex w-full items-end gap-[3px]', className)} style={{ height: alto }}>
      {datos.map((v, i) => (
        <div key={i} className="group relative flex h-full flex-1 items-end">
          <motion.div
            className="w-full bg-ink/15 transition-colors duration-200 group-hover:bg-accent"
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / max) * 100}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: ease.out, delay: i * 0.02 }}
          />
          {etiquetas?.[i] && (
            <span className="pointer-events-none absolute -bottom-5 left-1/2 hidden -translate-x-1/2 font-mono text-[9px] uppercase text-faint sm:block">
              {etiquetas[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* --- Anillo de participacion --------------------------------------------- */

const tonos = {
  accent: 'rgb(var(--c-accent))',
  ink: 'rgb(var(--c-ink))',
  muted: 'rgb(var(--c-muted))',
  faint: 'rgb(var(--c-faint))',
} as const;

export function DonutChart({
  partes,
  className,
}: {
  partes: { nombre: string; valor: number; color: keyof typeof tonos }[];
  className?: string;
}) {
  const total = partes.reduce((a, p) => a + p.valor, 0);
  const R = 56;
  const C = 2 * Math.PI * R;
  let acumulado = 0;

  return (
    <svg viewBox="0 0 140 140" className={cn('h-full w-full', className)} role="img" aria-label="Participacion por canal">
      <g transform="rotate(-90 70 70)">
        {partes.map((p) => {
          const largo = (p.valor / total) * C;
          const offset = acumulado;
          acumulado += largo;
          return (
            <motion.circle
              key={p.nombre}
              cx={70}
              cy={70}
              r={R}
              fill="none"
              stroke={tonos[p.color]}
              strokeWidth={16}
              strokeDasharray={`${largo - 2} ${C - largo + 2}`}
              initial={{ strokeDashoffset: -offset, opacity: 0 }}
              whileInView={{ strokeDashoffset: -offset, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: ease.out }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* --- Embudo horizontal ---------------------------------------------------- */

export function Funnel({
  etapas,
  className,
}: {
  etapas: { etapa: string; valor: number }[];
  className?: string;
}) {
  const max = etapas[0]?.valor ?? 1;
  return (
    <ul className={cn('space-y-3', className)}>
      {etapas.map((e, i) => {
        const pct = (e.valor / max) * 100;
        const conversion = i === 0 ? null : (e.valor / etapas[i - 1].valor) * 100;
        return (
          <li key={e.etapa}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {e.etapa}
              </span>
              <span className="tnum text-sm text-ink">
                {e.valor.toLocaleString('es-MX')}
                {conversion !== null && (
                  <span className="ml-2 font-mono text-[10px] text-faint">
                    {conversion.toFixed(1)} %
                  </span>
                )}
              </span>
            </div>
            <div className="h-1.5 w-full bg-line">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: ease.out, delay: i * 0.08 }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* --- Mapa esquematico de regiones ---------------------------------------- */

export function RegionMap({
  regiones,
  activa,
  alSeleccionar,
  className,
}: {
  regiones: { nombre: string; codigo: string; valor: number; variacion: number; x: number; y: number }[];
  activa?: string;
  alSeleccionar?: (codigo: string) => void;
  className?: string;
}) {
  const max = Math.max(...regiones.map((r) => r.valor));

  return (
    <div className={cn('relative aspect-[4/3] w-full', className)}>
      <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* Rejilla de referencia: el mapa es esquematico, no cartografico */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 12.5} y1={0} x2={i * 12.5} y2={80} stroke="rgb(var(--c-line))" strokeWidth={0.3} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 13.3} x2={100} y2={i * 13.3} stroke="rgb(var(--c-line))" strokeWidth={0.3} />
        ))}
      </svg>

      {regiones.map((r) => {
        const escala = 0.45 + (r.valor / max) * 0.55;
        const seleccionada = activa === r.codigo;
        return (
          <button
            key={r.codigo}
            type="button"
            onClick={() => alSeleccionar?.(r.codigo)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
            aria-pressed={seleccionada}
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                seleccionada ? 'bg-accent' : 'bg-ink/25 group-hover:bg-ink/50',
              )}
              style={{ width: `${escala * 54}px`, height: `${escala * 54}px` }}
            />
            <span className="mt-1.5 block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {r.codigo}
            </span>
          </button>
        );
      })}
    </div>
  );
}
