'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { servicios } from '@/content/services';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';

/**
 * Indice de servicios. En lugar de una rejilla de tarjetas iguales, una lista
 * tipografica: al recorrerla con el cursor, la fotografia del servicio sigue al
 * puntero y la fila revela su dato duro.
 */
export function Servicios() {
  const [activo, setActivo] = useState<number | null>(null);
  const lista = useRef<HTMLUListElement>(null);
  const reducido = useMovimientoReducido();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.7 });

  const seguir = (e: React.MouseEvent) => {
    const caja = lista.current?.getBoundingClientRect();
    if (!caja) return;
    x.set(e.clientX - caja.left);
    y.set(e.clientY - caja.top);
  };

  return (
    <section id="servicios" className="pt-section">
      <div className="shell">
        <SectionHead
          marca="02 / Servicios"
          lineas={['Lo que', 'construimos.']}
          apoyo="Siete capacidades que se combinan en un mismo equipo. La mayoria de los proyectos usa tres o cuatro a la vez, y esa es exactamente la razon de que existan juntas."
          accion={
            <Link
              href="/servicios"
              className="link-line font-mono text-label uppercase text-ink"
              data-active="false"
            >
              Ver el detalle de cada servicio
            </Link>
          }
        />

        <ul
          ref={lista}
          className="relative mt-16"
          onMouseMove={seguir}
          onMouseLeave={() => setActivo(null)}
        >
          {servicios.map((s, i) => (
            <li key={s.id} className="border-b border-line first:border-t">
              <Link
                href={`/servicios#${s.id}`}
                onMouseEnter={() => setActivo(i)}
                onFocus={() => setActivo(i)}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-7 transition-opacity duration-500 md:py-8"
                style={{
                  opacity: activo === null || activo === i ? 1 : 0.38,
                }}
              >
                <span className="col-span-2 font-mono text-label text-faint md:col-span-1">
                  {s.indice}
                </span>

                <h3 className="col-span-10 text-d4 font-bold transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-5">
                  {s.titulo}
                </h3>

                <p className="col-span-10 col-start-3 max-w-prose text-sm leading-relaxed text-muted md:col-span-4 md:col-start-auto">
                  {s.resumen}
                </p>

                <span className="col-span-10 col-start-3 flex items-baseline gap-2 md:col-span-2 md:col-start-auto md:flex-col md:items-end md:gap-0.5">
                  <span className="tnum font-mono text-sm text-accent">{s.dato.valor}</span>
                  <span className="text-[11px] leading-tight text-faint md:text-right">
                    {s.dato.etiqueta}
                  </span>
                </span>
              </Link>
            </li>
          ))}

          {/* Fotografia que acompana al cursor */}
          {!reducido && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[260px] w-[200px] -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:block"
              style={{ x: sx, y: sy }}
            >
              <AnimatePresence mode="wait">
                {activo !== null && (
                  <motion.div
                    key={servicios[activo].id}
                    className="relative h-full w-full"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  >
                    <Image
                      src={servicios[activo].imagen}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </ul>
      </div>
    </section>
  );
}
