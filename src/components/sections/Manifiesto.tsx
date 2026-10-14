'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { ArqoMark } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { img } from '@/content/images';
import { site } from '@/content/site';

const CAPACIDADES = [
  'Desarrollo web',
  'Software a medida',
  'E-commerce',
  'Automatizacion',
  'Inteligencia artificial',
  'Datos & BI',
  'Integraciones',
];

/** Cinta continua de capacidades. Marca el cambio de registro tras el encabezado. */
export function Cinta() {
  const grupo = (oculto: boolean) => (
    // La segunda copia solo existe para encadenar el bucle: no se anuncia.
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={oculto || undefined}>
      {CAPACIDADES.map((c) => (
        <span key={c} className="flex shrink-0 items-center gap-12">
          <span className="eyebrow whitespace-nowrap text-ink">{c}</span>
          <ArqoMark className="h-3 w-3 shrink-0 text-accent" conCota={false} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="hairline-t hairline-b overflow-hidden py-4">
      <div
        className="flex w-max animate-marquee items-center"
        style={{ ['--marquee-duration' as string]: '46s' }}
      >
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}

export function Manifiesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // La fotografia se mueve mas despacio que la pagina: da profundidad sin estorbar.
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <section className="pt-section">
      <div className="shell">
        <div className="hairline-t grid gap-x-10 gap-y-12 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">El concepto</span>
            </Reveal>
            <Reveal retraso={0.1}>
              <ArqoMark className="mt-10 h-24 w-24 text-accent sm:h-32 sm:w-32" />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <TextReveal
              lineas={['Un arco no se sostiene', 'por su forma.']}
              as="h2"
              className="text-d3 font-bold"
            />
            <Reveal retraso={0.15}>
              <p className="mt-8 max-w-prose text-lead text-muted">{site.concepto.cuerpo}</p>
            </Reveal>
            <Reveal retraso={0.22}>
              <p className="mt-6 max-w-prose text-lead text-muted">
                Por eso no empezamos por la pantalla. Empezamos por entender donde cae el
                peso: que proceso aguanta la operacion, que dato sostiene la decision y que
                parte se rompe primero cuando la empresa crece.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Banda a sangre con parallax */}
      <div ref={ref} className="relative mt-20 h-[48vh] min-h-[320px] overflow-hidden lg:h-[62vh]">
        <motion.div className="absolute inset-x-0 -top-[9%] h-[118%]" style={{ y }}>
          <Image
            src={img.reticulaDorada}
            alt="Vista en contrapicado de dos torres que forman una reticula contra el cielo"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
      </div>

      <div className="shell">
        <Reveal>
          <p className="max-w-prose border-l border-accent py-1 pl-5 text-sm leading-relaxed text-muted">
            La estructura que no se ve es la que decide si el edificio sigue en pie a los
            veinte anos. En software pasa lo mismo, solo que el plazo es mas corto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
