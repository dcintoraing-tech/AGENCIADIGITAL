'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { equipo } from '@/content/site';

/** Bloque de estudio en la portada: corto, con imagen propia y sin relato corporativo. */
export function Estudio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section className="pt-section">
      <div className="shell">
        <SectionHead
          marca="09 / Estudio"
          lineas={['Catorce personas', 'en dos ciudades.']}
          apoyo={equipo.cuerpo[0]}
        />

        <div ref={ref} className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden">
              <motion.div className="absolute inset-x-0 -top-[7%] h-[114%]" style={{ y: y1 }}>
                <Image
                  src={equipo.fotos.principal}
                  alt="Equipo de ARQO trabajando alrededor de una mesa larga"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <Reveal retraso={0.1}>
              <p className="mt-8 max-w-prose leading-relaxed text-muted">{equipo.cuerpo[1]}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[3/4] overflow-hidden lg:mt-20">
              <motion.div className="absolute inset-x-0 -top-[6%] h-[112%]" style={{ y: y2 }}>
                <Image
                  src={equipo.fotos.secundaria}
                  alt="Sesion de trabajo en el estudio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Principios */}
        <ul className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {equipo.principios.map((p, i) => (
            <Reveal as="li" key={p.titulo} retraso={i * 0.06} className="bg-bg p-7">
              <span className="font-mono text-label uppercase text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-sm font-bold">{p.titulo}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.texto}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal retraso={0.1}>
          <Link
            href="/nosotros"
            className="link-line mt-10 inline-block font-mono text-label uppercase text-ink"
          >
            Conocer al estudio
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
