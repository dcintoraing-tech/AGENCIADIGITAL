'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { casosIA, flujo, lab } from '@/content/lab';
import { img } from '@/content/images';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';

/**
 * Seccion de IA y automatizacion. El diagrama no es decorativo: describe el
 * recorrido real de un dato, de la entrada en bruto al sistema que lo usa.
 */
export function Automatizacion() {
  return (
    <section className="pt-section">
      <div className="shell">
        <SectionHead
          marca="06 / IA y automatizacion"
          lineas={[lab.titulo]}
          apoyo={lab.intro}
        />

        <Flujo />

        {/* Casos */}
        <div className="mt-24 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul>
              {casosIA.map((c, i) => (
                <Reveal as="li" key={c.titulo} retraso={i * 0.05} className="border-b border-line py-7 first:border-t">
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="text-d4 font-bold">{c.titulo}</h3>
                    <span className="tnum shrink-0 font-mono text-sm text-accent">
                      {c.metrica.valor}
                    </span>
                  </div>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{c.texto}</p>
                  <p className="mt-2 text-[11px] text-faint">{c.metrica.etiqueta}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={img.laboratorio}
                  alt="Ingeniera supervisando una celda de automatizacion industrial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal retraso={0.12}>
              <p className="mt-6 border-l border-accent py-1 pl-5 text-sm leading-relaxed text-muted">
                {lab.nota}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** DATOS -> MODELO -> PROCESAMIENTO -> RESULTADO */
function Flujo() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.4 });
  const reducido = useMovimientoReducido();

  return (
    <div ref={ref} className="mt-20">
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {flujo.map((etapa, i) => (
          <motion.div
            key={etapa.clave}
            className="relative flex flex-col bg-bg p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={enVista ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: ease.out, delay: i * 0.12 }}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-label uppercase text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < flujo.length - 1 && (
                <span className="font-mono text-label text-faint" aria-hidden>
                  &rarr;
                </span>
              )}
            </div>

            <h3 className="mt-6 text-d4 font-bold">{etapa.titulo}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{etapa.texto}</p>

            <ul className="mt-6 space-y-1.5 border-t border-line pt-5">
              {etapa.detalle.map((d, j) => (
                <motion.li
                  key={d}
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                  initial={{ opacity: 0, x: -6 }}
                  animate={enVista ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.4, ease: ease.out, delay: 0.4 + i * 0.12 + j * 0.05 }}
                >
                  {d}
                </motion.li>
              ))}
            </ul>

            {/* Pulso que recorre el conector entre etapas */}
            {i < flujo.length - 1 && !reducido && (
              <span
                aria-hidden
                className="absolute -right-px top-0 hidden h-full w-px overflow-hidden lg:block"
              >
                <motion.span
                  className="absolute left-0 h-10 w-px bg-accent"
                  initial={{ y: '-120%' }}
                  animate={enVista ? { y: ['-120%', '420%'] } : undefined}
                  transition={{
                    duration: 1.8,
                    ease: ease.inOut,
                    delay: 1 + i * 0.45,
                    repeat: Infinity,
                    repeatDelay: 2.6,
                  }}
                />
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
        Recorrido de un documento, desde que entra hasta que actualiza un indicador
      </p>
    </div>
  );
}
