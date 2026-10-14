'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type Contexto = {
  lenis: Lenis | null;
  /** Congela el scroll: lo usa el menu movil mientras esta abierto. */
  bloquear: (v: boolean) => void;
  irA: (destino: string | number) => void;
};

const LenisCtx = createContext<Contexto>({ lenis: null, bloquear: () => {}, irA: () => {} });

export const useLenis = () => useContext(LenisCtx);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null);
  const [listo, setListo] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducido) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Curva propia: entra rapido y frena largo, sin sensacion de flotacion.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.95,
    });
    ref.current = lenis;
    setListo(true);

    let cuadro = requestAnimationFrame(function bucle(t: number) {
      lenis.raf(t);
      cuadro = requestAnimationFrame(bucle);
    });

    return () => {
      cancelAnimationFrame(cuadro);
      lenis.destroy();
      ref.current = null;
      setListo(false);
    };
  }, []);

  // Cada navegacion arranca arriba, sin animar el salto.
  useEffect(() => {
    ref.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  const valor: Contexto = {
    lenis: listo ? ref.current : null,
    bloquear: (v) => (v ? ref.current?.stop() : ref.current?.start()),
    irA: (destino) => {
      if (ref.current) ref.current.scrollTo(destino, { offset: -80, duration: 1.2 });
      else if (typeof destino === 'string') {
        document.querySelector(destino)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  };

  return <LenisCtx.Provider value={valor}>{children}</LenisCtx.Provider>;
}
