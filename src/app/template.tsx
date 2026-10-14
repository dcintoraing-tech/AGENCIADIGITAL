'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';

/**
 * Transicion entre paginas. Un telon cubre la pantalla en el primer cuadro de
 * cada ruta y se retira hacia arriba mientras el contenido entra. Al vivir en
 * template.tsx se vuelve a montar en cada navegacion.
 *
 * La estructura es identica con y sin movimiento reducido: lo unico que cambia
 * es la duracion, para no romper la hidratacion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reducido = useMovimientoReducido();
  const d = reducido ? 0 : 1;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9997] origin-top bg-bg"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.72 * d, ease: ease.inOut }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 * d, ease: ease.out, delay: 0.16 * d }}
      >
        {children}
      </motion.div>
    </>
  );
}
