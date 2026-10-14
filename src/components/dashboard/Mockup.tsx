'use client';

import { AreaChart, Sparkline } from './charts';
import { cn } from '@/lib/utils';

export type MockupProps = {
  producto: string;
  secciones: string[];
  activa?: number;
  indicadores: { etiqueta: string; valor: string; delta?: string }[];
  serie: number[];
  filas: { a: string; b: string; c: string; estado?: 'ok' | 'riesgo' | 'critico' }[];
  tituloPanel: string;
  className?: string;
};

const PUNTO = {
  ok: 'bg-muted',
  riesgo: 'bg-ink',
  critico: 'bg-accent',
} as const;

/**
 * Maqueta de interfaz dentro de un marco de navegador. No es una captura: es
 * la interfaz construida en codigo, de modo que respeta el tema claro u oscuro
 * y se ve nitida en cualquier pantalla.
 */
export function MockupApp({
  producto,
  secciones,
  activa = 0,
  indicadores,
  serie,
  filas,
  tituloPanel,
  className,
}: MockupProps) {
  return (
    <div className={cn('overflow-hidden border border-line bg-surface', className)}>
      {/* Barra del navegador */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-line" />
          ))}
        </span>
        <span className="ml-2 flex-1 truncate border border-line px-3 py-1 font-mono text-[10px] text-faint">
          {producto.toLowerCase().replace(/\s+/g, '')}.arqo.app
        </span>
      </div>

      <div className="flex">
        {/* Navegacion lateral */}
        <nav className="hidden w-44 shrink-0 border-r border-line p-4 sm:block" aria-hidden>
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
            {producto}
          </span>
          <ul className="mt-6 space-y-1">
            {secciones.map((s, i) => (
              <li
                key={s}
                className={cn(
                  'truncate px-2.5 py-1.5 text-[11px]',
                  i === activa ? 'bg-ink text-bg' : 'text-muted',
                )}
              >
                {s}
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {tituloPanel}
          </span>

          {/* Indicadores */}
          <div className="mt-4 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {indicadores.map((k) => (
              <div key={k.etiqueta} className="bg-surface p-3">
                <span className="block truncate font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                  {k.etiqueta}
                </span>
                <span className="tnum mt-1.5 block text-lg font-bold leading-none">{k.valor}</span>
                {k.delta && (
                  <span className="tnum mt-1.5 block font-mono text-[10px] text-accent">
                    {k.delta}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Serie */}
          <div className="mt-4 border border-line p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                Ultimos 30 dias
              </span>
              <span className="w-20">
                <Sparkline datos={serie.slice(-10)} />
              </span>
            </div>
            <div className="mt-2">
              <AreaChart datos={serie} alto={110} animar={false} />
            </div>
          </div>

          {/* Tabla */}
          <table className="mt-4 w-full border-collapse text-left">
            <tbody>
              {filas.map((f) => (
                <tr key={f.a} className="border-b border-line/60 last:border-0">
                  <td className="py-2 pr-3 font-mono text-[10px] text-faint">{f.a}</td>
                  <td className="py-2 pr-3 text-[11px]">{f.b}</td>
                  <td className="tnum py-2 pr-3 text-right text-[11px] text-muted">{f.c}</td>
                  <td className="w-4 py-2">
                    <span
                      className={cn('block h-1.5 w-1.5 rounded-full', PUNTO[f.estado ?? 'ok'])}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
