'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';
import { cn } from '@/lib/utils';

type LineasProps = {
  /** Los saltos de linea se escriben a mano: la composicion tipografica no se deja al azar. */
  lineas: string[];
  className?: string;
  lineaClassName?: string;
  retraso?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
};

/**
 * Titular que sube linea por linea desde detras de una mascara.
 * Cada linea es un bloque con overflow oculto; el texto entra desde abajo.
 */
export function TextReveal({
  lineas,
  className,
  lineaClassName,
  retraso = 0,
  as: Etiqueta = 'h2',
}: LineasProps) {
  const reducido = useMovimientoReducido();

  return (
    <Etiqueta className={cn(className)}>
      {lineas.map((linea, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineaClassName)}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            // Sin movimiento, la linea sube al final de golpe: el SSR la dejo
            // fuera de la mascara y de otro modo no se leeria nunca.
            animate={reducido ? { y: '0%' } : undefined}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reducido ? 0 : 1,
              ease: ease.out,
              delay: reducido ? 0 : retraso + i * 0.08,
            }}
          >
            {linea}
          </motion.span>
        </span>
      ))}
    </Etiqueta>
  );
}
