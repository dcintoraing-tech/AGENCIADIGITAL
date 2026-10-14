'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';
import { ease } from '@/lib/motion';

const CLAVE = 'arqo:intro';

/**
 * Apertura de la primera visita. El arco se dibuja trazo a trazo, se asienta
 * sobre su cota y el telon se retira hacia arriba. Una vez por sesion.
 */
export function Intro() {
  const [mostrar, setMostrar] = useState(false);
  const [listo, setListo] = useState(false);
  const reducido = useMovimientoReducido();

  useEffect(() => {
    const visto = sessionStorage.getItem(CLAVE);
    if (visto || reducido) {
      setListo(true);
      return;
    }
    sessionStorage.setItem(CLAVE, '1');
    setMostrar(true);
    document.body.style.overflow = 'hidden';
    setListo(true);

    const t = window.setTimeout(() => {
      setMostrar(false);
      document.body.style.overflow = '';
    }, 2150);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [reducido]);

  if (!listo) return null;

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: ease.inOut }}
        >
          <div className="flex items-baseline gap-[0.3em] text-[clamp(2.5rem,9vw,6rem)] font-bold leading-none tracking-[-0.035em]">
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden
                className="h-[0.845em] w-auto translate-y-[0.079em]"
              >
                <motion.path
                  d="M7.25 35V20a12.75 12.75 0 0 1 25.5 0v15"
                  stroke="currentColor"
                  strokeWidth={7}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.05, ease: ease.inOut }}
                />
                <motion.path
                  d="M1 36.25h38"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: ease.out, delay: 0.95 }}
                />
              </svg>
            </motion.span>

            <span className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: ease.out, delay: 0.72 }}
              >
                ARQO
              </motion.span>
            </span>
          </div>

          <motion.span
            className="mt-7 font-mono text-label uppercase text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
          >
            De la idea a la obra
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
