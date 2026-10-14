import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';
import { cn } from '@/lib/utils';

type Props = {
  /** Numero o etiqueta monoespaciada que marca el inicio de seccion. */
  marca: string;
  lineas: string[];
  apoyo?: string;
  accion?: ReactNode;
  className?: string;
  tamano?: 'd2' | 'd3';
};

/**
 * Cabecera de seccion. Siempre la misma estructura: una regla, una etiqueta
 * monoespaciada, un titular grande y, a veces, un texto de apoyo a la derecha.
 */
export function SectionHead({
  marca,
  lineas,
  apoyo,
  accion,
  className,
  tamano = 'd2',
}: Props) {
  return (
    <div className={cn('hairline-t pt-5', className)}>
      <Reveal>
        <span className="eyebrow">{marca}</span>
      </Reveal>

      <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-12 md:items-end">
        <TextReveal
          lineas={lineas}
          as="h2"
          className={cn(
            'font-bold md:col-span-7 lg:col-span-7',
            tamano === 'd2' ? 'text-d2' : 'text-d3',
          )}
        />

        {(apoyo || accion) && (
          <div className="md:col-span-5 md:col-start-9 lg:col-start-9">
            {apoyo && (
              <Reveal retraso={0.1}>
                <p className="max-w-prose text-lead text-muted">{apoyo}</p>
              </Reveal>
            )}
            {accion && (
              <Reveal retraso={0.18}>
                <div className="mt-7">{accion}</div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
