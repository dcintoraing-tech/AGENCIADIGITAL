'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';
import { cn } from '@/lib/utils';

type Props = {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  decimales?: number;
  duracion?: number;
  className?: string;
};

/** Numero que cuenta al entrar en pantalla. Una sola vez, sin rebote. */
export function Counter({
  valor,
  sufijo = '',
  prefijo = '',
  decimales = 0,
  duracion = 1.8,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });
  const reducido = useMovimientoReducido();
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    if (reducido) {
      setActual(valor);
      return;
    }
    const control = animate(0, valor, {
      duration: duracion,
      ease: ease.out,
      onUpdate: (v) => setActual(v),
    });
    return () => control.stop();
  }, [enVista, valor, duracion, reducido]);

  return (
    <span ref={ref} className={cn('tnum', className)}>
      {prefijo}
      {actual.toLocaleString('es-MX', {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,
      })}
      {sufijo}
    </span>
  );
}
