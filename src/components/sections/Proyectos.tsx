'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { proyectos, type Proyecto } from '@/content/projects';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Composicion editorial: ningun proyecto ocupa el mismo lugar ni el mismo
 * formato. Las posiciones estan escritas a mano para que la pagina tenga ritmo
 * y aire, en vez de una cuadricula de seis piezas iguales.
 */
const COMPOSICION = [
  { celda: 'lg:col-span-6 lg:col-start-1', formato: 'aspect-[4/5]', desfase: 'lg:mt-0' },
  { celda: 'lg:col-span-5 lg:col-start-8', formato: 'aspect-[16/11]', desfase: 'lg:mt-32' },
  { celda: 'lg:col-span-4 lg:col-start-2', formato: 'aspect-square', desfase: 'lg:-mt-16' },
  { celda: 'lg:col-span-6 lg:col-start-7', formato: 'aspect-[4/3]', desfase: 'lg:mt-24' },
  { celda: 'lg:col-span-5 lg:col-start-1', formato: 'aspect-[3/4]', desfase: 'lg:mt-8' },
  { celda: 'lg:col-span-5 lg:col-start-8', formato: 'aspect-[5/4]', desfase: 'lg:-mt-24' },
];

export function Proyectos({ limite }: { limite?: number }) {
  const lista = limite ? proyectos.slice(0, limite) : proyectos;

  return (
    <section id="proyectos" className="pt-section">
      <div className="shell">
        <SectionHead
          marca="03 / Proyectos"
          lineas={['Trabajo', 'entregado.']}
          apoyo="Seis proyectos de seis industrias distintas. En todos hay una misma constante: el sistema sustituyo a un proceso que ya no daba mas de si."
          accion={
            <Link href="/proyectos" className="link-line font-mono text-label uppercase text-ink">
              Ver todos los casos
            </Link>
          }
        />

        <div className="mt-20 grid gap-x-10 gap-y-20 lg:grid-cols-12 lg:gap-y-10">
          {lista.map((p, i) => (
            <TarjetaProyecto
              key={p.slug}
              proyecto={p}
              composicion={COMPOSICION[i % COMPOSICION.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TarjetaProyecto({
  proyecto,
  composicion,
}: {
  proyecto: Proyecto;
  composicion: (typeof COMPOSICION)[number];
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Parallax interno: la imagen se desplaza dentro de su marco al pasar.
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.article
      ref={ref}
      className={cn(composicion.celda, composicion.desfase)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: ease.out }}
    >
      <Link href={`/proyectos/${proyecto.slug}`} className="group block" data-cursor="Ver caso">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <span className="font-mono text-label uppercase text-faint">
            {proyecto.indice}
            <span className="mx-2">—</span>
            <span className="text-muted">{proyecto.industria}</span>
          </span>
          <span className="font-mono text-label text-faint">{proyecto.anio}</span>
        </div>

        <div className={cn('relative mt-5 overflow-hidden', composicion.formato)}>
          <motion.div className="absolute inset-x-0 -top-[6%] h-[112%]" style={{ y }}>
            <Image
              src={proyecto.portada}
              alt={`Proyecto ${proyecto.nombre} — ${proyecto.industria}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
            />
          </motion.div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-d4 font-bold">
              <span className="link-line inline-block">{proyecto.nombre}</span>
            </h3>
            <p className="mt-2.5 max-w-[34ch] text-sm leading-relaxed text-muted">
              {proyecto.resumen}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="tnum block text-d4 font-bold leading-none text-accent">
              {proyecto.resultado.valor}
            </span>
            <span className="mt-1.5 block max-w-[12ch] text-[11px] leading-tight text-faint">
              {proyecto.resultado.etiqueta}
            </span>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
          {proyecto.tecnologias.slice(0, 5).map((t) => (
            <li
              key={t}
              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Link>
    </motion.article>
  );
}
