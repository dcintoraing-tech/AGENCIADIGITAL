'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import type { Proyecto } from '@/content/projects';

/** Cabecera del caso de estudio: ficha tecnica y fotografia a sangre con parallax. */
export function PortadaCaso({ proyecto }: { proyecto: Proyecto }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <header>
      <div className="shell pt-[calc(var(--nav-h)+clamp(2.5rem,7vw,5rem))]">
        <Reveal>
          <Link
            href="/proyectos"
            className="link-line font-mono text-label uppercase text-muted hover:text-ink"
          >
            &larr; Todos los proyectos
          </Link>
        </Reveal>

        <div className="mt-10 flex items-baseline gap-5 border-t border-line pt-5">
          <Reveal>
            <span className="font-mono text-label text-faint">{proyecto.indice}</span>
          </Reveal>
          <Reveal retraso={0.05}>
            <span className="eyebrow text-ink">{proyecto.industria}</span>
          </Reveal>
        </div>

        <TextReveal
          lineas={[proyecto.nombre]}
          as="h1"
          className="mt-8 text-d1 font-bold"
          retraso={0.08}
        />

        <div className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <Reveal retraso={0.14} className="lg:col-span-6">
            <p className="max-w-prose text-lead text-muted">{proyecto.descripcion}</p>
          </Reveal>

          <Reveal retraso={0.2} className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-3 border-t border-line pt-5">
              {[
                { k: 'Ano', v: String(proyecto.anio) },
                { k: 'Lugar', v: proyecto.lugar },
                { k: 'Servicios', v: proyecto.servicios.join(', ') },
              ].map((m) => (
                <div key={m.k} className="flex items-baseline justify-between gap-6">
                  <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {m.k}
                  </dt>
                  <dd className="text-right text-sm">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="relative mt-14 h-[52vh] min-h-[340px] overflow-hidden lg:h-[72vh]">
        <motion.div className="absolute inset-0" style={{ y, scale: escala }}>
          <Image
            src={proyecto.galeria[0].src}
            alt={proyecto.galeria[0].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="shell">
        <p className="mt-4 max-w-prose text-[11px] leading-relaxed text-faint">
          {proyecto.galeria[0].pie}
        </p>
      </div>
    </header>
  );
}
