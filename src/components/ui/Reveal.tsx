'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, vistaUnaVez } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos; se usa para escalonar bloques hermanos. */
  retraso?: number;
  /** Desplazamiento inicial en pixeles. */
  desde?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'figure';
};

/**
 * Aparicion al entrar en pantalla. Es el movimiento mas repetido del sitio,
 * asi que se mantiene corto y siempre en la misma direccion: hacia arriba.
 *
 * El arbol renderizado no cambia con la preferencia de movimiento: solo se
 * desactiva la animacion. De lo contrario la hidratacion fallaria.
 */
export function Reveal({ children, className, retraso = 0, desde = 24, as = 'div' }: Props) {
  const reducido = useMovimientoReducido();
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      className={cn(className)}
      initial={{ opacity: 0, y: desde }}
      whileInView={{ opacity: 1, y: 0 }}
      // El servidor ya escribio el estado inicial en el HTML. Si la persona
      // pidio menos movimiento hay que llevarlo al estado final de inmediato,
      // o el bloque se quedaria invisible para siempre.
      animate={reducido ? { opacity: 1, y: 0 } : undefined}
      viewport={vistaUnaVez}
      transition={{ duration: reducido ? 0 : 0.85, ease: ease.out, delay: reducido ? 0 : retraso }}
    >
      {children}
    </Etiqueta>
  );
}
