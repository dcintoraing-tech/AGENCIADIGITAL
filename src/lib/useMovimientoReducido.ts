'use client';

import { useEffect, useState } from 'react';

/**
 * Preferencia de movimiento reducido, estable en SSR.
 *
 * `useReducedMotion` de framer-motion no coincide entre servidor y cliente, y
 * ramificar el arbol con ese valor rompe la hidratacion. Este hook devuelve
 * siempre `false` en el primer render y se actualiza despues de montar, de modo
 * que el marcado inicial es identico en ambos lados. Por eso nunca se usa para
 * cambiar la estructura del arbol, solo para anular duraciones.
 */
export function useMovimientoReducido() {
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sincronizar = () => setReducido(mq.matches);
    sincronizar();
    mq.addEventListener('change', sincronizar);
    return () => mq.removeEventListener('change', sincronizar);
  }, []);

  return reducido;
}
