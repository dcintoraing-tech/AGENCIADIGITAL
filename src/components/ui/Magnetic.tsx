'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';

type Props = {
  children: ReactNode;
  /** Cuanto sigue al cursor, de 0 a 1. */
  fuerza?: number;
  className?: string;
};

/**
 * Atrae ligeramente el elemento hacia el cursor. Se reserva para los pocos
 * controles que importan: el boton principal y el cambio de tema.
 */
export function Magnetic({ children, fuerza = 0.28, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useMovimientoReducido();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const mover = (e: React.MouseEvent<HTMLDivElement>) => {
    const caja = ref.current?.getBoundingClientRect();
    if (!caja) return;
    x.set((e.clientX - (caja.left + caja.width / 2)) * fuerza);
    y.set((e.clientY - (caja.top + caja.height / 2)) * fuerza);
  };

  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={reducido ? undefined : mover}
      onMouseLeave={reducido ? undefined : soltar}
    >
      {children}
    </motion.div>
  );
}
