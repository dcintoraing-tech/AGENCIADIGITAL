'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ease } from '@/lib/motion';

type Modo = { tipo: 'normal' } | { tipo: 'enlace' } | { tipo: 'medio'; etiqueta: string };

/**
 * Cursor del estudio: un punto que sigue al mouse sin retardo y un anillo que
 * llega un instante despues. Sobre piezas marcadas con data-cursor el anillo
 * crece y muestra una etiqueta.
 */
export function Cursor() {
  const [activo, setActivo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modo, setModo] = useState<Modo>({ tipo: 'normal' });
  const [presionado, setPresionado] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const anilloX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const anilloY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });

  useEffect(() => {
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fino.matches || reducido.matches) return;

    setActivo(true);
    document.documentElement.classList.add('has-cursor');

    const mover = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const destino = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select, [role="button"]',
      );

      if (!destino) return setModo({ tipo: 'normal' });

      const etiqueta = destino.dataset.cursor;
      if (etiqueta && etiqueta !== 'enlace') return setModo({ tipo: 'medio', etiqueta });
      setModo({ tipo: 'enlace' });
    };

    const salir = () => setVisible(false);
    const abajo = () => setPresionado(true);
    const arriba = () => setPresionado(false);

    window.addEventListener('mousemove', mover, { passive: true });
    document.addEventListener('mouseleave', salir);
    window.addEventListener('mousedown', abajo);
    window.addEventListener('mouseup', arriba);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', mover);
      document.removeEventListener('mouseleave', salir);
      window.removeEventListener('mousedown', abajo);
      window.removeEventListener('mouseup', arriba);
    };
  }, [x, y]);

  if (!activo) return null;

  const esMedio = modo.tipo === 'medio';
  const escala = presionado ? 0.82 : esMedio ? 1 : modo.tipo === 'enlace' ? 1.9 : 1;
  const lado = esMedio ? 92 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-ink/70 backdrop-invert-[0.08]"
        style={{ x: anilloX, y: anilloY }}
        animate={{
          width: lado,
          height: lado,
          scale: escala,
          opacity: visible ? 1 : 0,
          marginLeft: -lado / 2,
          marginTop: -lado / 2,
          backgroundColor: esMedio ? 'rgb(var(--c-accent))' : 'rgba(0,0,0,0)',
          borderColor: esMedio ? 'rgb(var(--c-accent))' : 'rgb(var(--c-ink) / 0.7)',
        }}
        transition={{ duration: 0.34, ease: ease.out }}
      >
        <AnimatePresence>
          {esMedio && (
            <motion.span
              key={modo.etiqueta}
              className="absolute inset-0 flex items-center justify-center text-center font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-accent-ink"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {modo.etiqueta}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 -ml-[2.5px] -mt-[2.5px] h-[5px] w-[5px] rounded-full bg-ink"
        style={{ x, y }}
        animate={{ opacity: visible && !esMedio ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
