'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { proceso } from '@/content/process';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * El proceso no se lee como una lista: se recorre. El panel de la izquierda
 * queda fijo y cambia de fotografia y de numero conforme cada fase entra en el
 * centro de la pantalla.
 */
export function Proceso() {
  const [activo, setActivo] = useState(0);

  return (
    <section id="proceso" className="pt-section">
      <div className="shell">
        <SectionHead
          marca="04 / Proceso"
          lineas={['Como', 'trabajamos.']}
          apoyo="Seis fases. Las dos primeras deciden si el proyecto va a servir para algo; las cuatro siguientes solo lo ejecutan bien."
        />

        <div className="mt-20 grid gap-x-10 lg:grid-cols-12">
          {/* Panel fijo */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={proceso[activo].indice}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: ease.out }}
                  >
                    <Image
                      src={proceso[activo].imagen}
                      alt=""
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={proceso[activo].indice}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: ease.out }}
                    >
                      <span className="block text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em]">
                        {proceso[activo].indice}
                      </span>
                      <span className="mt-2 block font-mono text-label uppercase text-muted">
                        {proceso[activo].duracion}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Barra de avance por fases */}
              <div className="mt-6 flex gap-1.5">
                {proceso.map((p, i) => (
                  <span key={p.indice} className="h-px flex-1 bg-line">
                    <motion.span
                      className="block h-full origin-left bg-ink"
                      animate={{ scaleX: i <= activo ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: ease.out }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fases */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {proceso.map((paso, i) => (
              <Fase
                key={paso.indice}
                paso={paso}
                indice={i}
                activo={activo === i}
                alActivar={setActivo}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Fase({
  paso,
  indice,
  activo,
  alActivar,
}: {
  paso: (typeof proceso)[number];
  indice: number;
  activo: boolean;
  /** Debe ser estable: aqui se pasa directamente el setter de useState. */
  alActivar: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Franja estrecha alrededor del centro: solo una fase puede estar activa.
  const enVista = useInView(ref, { margin: '-48% 0px -48% 0px' });

  useEffect(() => {
    if (enVista) alActivar(indice);
  }, [enVista, indice, alActivar]);

  return (
    <li
      ref={ref}
      className="border-b border-line py-10 first:border-t first:pt-10 lg:py-14"
    >
      <div className="flex items-baseline gap-5">
        <span
          className={cn(
            'font-mono text-label transition-colors duration-500',
            activo ? 'text-accent' : 'text-faint',
          )}
        >
          {paso.indice}
        </span>
        <h3 className="text-d3 font-bold">{paso.titulo}</h3>
      </div>

      <p className="mt-5 text-lead">{paso.frase}</p>
      <p className="mt-4 max-w-prose leading-relaxed text-muted">{paso.texto}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="font-mono text-label uppercase text-faint lg:hidden">
          {paso.duracion}
        </span>
        <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
          {paso.entregables.map((e) => (
            <li
              key={e}
              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
            >
              {e}
            </li>
          ))}
        </ul>
      </div>

      {/* Imagen en movil: el panel fijo no existe por debajo de lg */}
      <div className="relative mt-8 aspect-[16/10] overflow-hidden lg:hidden">
        <Image src={paso.imagen} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </li>
  );
}
