import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { cn } from '@/lib/utils';

type Props = {
  marca: string;
  lineas: string[];
  entrada?: string;
  meta?: { etiqueta: string; valor: string }[];
  extra?: ReactNode;
  className?: string;
};

/** Cabecera comun a todas las paginas interiores. Misma estructura, mismo ritmo. */
export function PageHeader({ marca, lineas, entrada, meta, extra, className }: Props) {
  return (
    <header className={cn('shell pt-[calc(var(--nav-h)+clamp(3rem,9vw,7rem))]', className)}>
      <Reveal>
        <span className="eyebrow">{marca}</span>
      </Reveal>

      <TextReveal
        lineas={lineas}
        as="h1"
        className="mt-8 text-d1 font-bold"
        retraso={0.05}
      />

      <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-8 lg:grid-cols-12">
        {entrada && (
          <Reveal retraso={0.12} className="lg:col-span-6">
            <p className="max-w-prose text-lead text-muted">{entrada}</p>
          </Reveal>
        )}

        {meta && (
          <Reveal retraso={0.18} className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-3">
              {meta.map((m) => (
                <div key={m.etiqueta} className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {m.etiqueta}
                  </dt>
                  <dd className="text-right text-sm">{m.valor}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {extra}
      </div>
    </header>
  );
}
