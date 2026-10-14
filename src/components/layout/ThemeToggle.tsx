'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

/**
 * Cambio de tema con revelado circular desde el propio control.
 * Usa View Transitions cuando el navegador lo soporta; si no, cae en una
 * transicion de color definida en globals.css.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => setMontado(true), []);

  const esOscuro = resolvedTheme !== 'light';
  const siguiente = esOscuro ? 'light' : 'dark';

  const cambiar = () => {
    const raiz = document.documentElement;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const conTransicion =
      'startViewTransition' in document && typeof document.startViewTransition === 'function';

    if (reducido || !conTransicion) {
      raiz.classList.add('theme-anim');
      setTheme(siguiente);
      window.setTimeout(() => raiz.classList.remove('theme-anim'), 500);
      return;
    }

    const caja = ref.current?.getBoundingClientRect();
    const x = caja ? caja.left + caja.width / 2 : window.innerWidth / 2;
    const y = caja ? caja.top + caja.height / 2 : 0;

    const vt = document.startViewTransition(() => {
      flushSync(() => setTheme(siguiente));
    });

    vt.ready.then(() => {
      const radio = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      raiz.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`],
        },
        {
          duration: 680,
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={cambiar}
      // Antes de montar no se conoce el tema guardado: una etiqueta dependiente
      // del tema rompria la hidratacion al diferir del marcado del servidor.
      aria-label={
        montado ? `Cambiar a tema ${siguiente === 'light' ? 'claro' : 'oscuro'}` : 'Cambiar tema'
      }
      className={cn(
        'relative h-[22px] w-[42px] shrink-0 rounded-full border border-line transition-colors duration-300 hover:border-ink',
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-ink transition-[left,background-color] duration-500 ease-inout',
          // Antes de montar se asume oscuro para que no parpadee en la hidratacion.
          montado && !esOscuro ? 'left-[24px]' : 'left-[4px]',
        )}
      />
    </button>
  );
}
