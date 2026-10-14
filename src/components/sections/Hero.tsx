'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { BotonEnlace } from '@/components/ui/Boton';
import { Sparkline } from '@/components/dashboard/charts';
import { img } from '@/content/images';
import { pulso } from '@/content/dashboardData';
import { ease } from '@/lib/motion';
import { useMovimientoReducido } from '@/lib/useMovimientoReducido';

const LINEAS = ['Construimos', 'lo que tu negocio'];

/** Ancho de la columna de imagen; el texto reserva este espacio a su derecha. */
const COLUMNA = 'min(24vw, 420px)';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducido = useMovimientoReducido();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: la imagen se queda atras y el texto sube un poco mas rapido.
  const yImagen = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacidad = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const suaveY = useSpring(yImagen, { stiffness: 120, damping: 28, mass: 0.6 });

  const d = reducido ? 0 : 1;

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Columna de imagen: sangra hasta el borde superior, por detras de la navegacion */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-[78vh] lg:block"
        style={{ width: COLUMNA }}
      >
        <motion.div className="relative h-full w-full overflow-hidden" style={{ y: suaveY }}>
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.14, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ scale: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.5 * d, ease: ease.inOut, delay: 0.25 * d }}
          >
            <Image
              src={img.volumenBlanco}
              alt="Fachada curva de un edificio contemporaneo vista desde abajo"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 24vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Velo superior: mantiene legible la navegacion sobre la fotografia */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
      </div>

      <motion.div
        className="shell relative flex min-h-[100svh] flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2rem)]"
        style={{ y: yTexto, opacity: opacidad }}
      >
        {/* Meta superior — reserva el ancho de la columna de imagen */}
        <motion.div
          className="flex flex-col gap-1.5 border-t border-line pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          style={{ paddingRight: `max(0px, calc(${COLUMNA} - var(--gutter) + 1.5rem))` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 * d, delay: 0.1 * d }}
        >
          <span className="eyebrow leading-relaxed">
            Estudio de ingenieria de producto digital
          </span>
          <span className="eyebrow shrink-0 sm:text-right">
            Guadalajara / Madrid
            <span className="ml-3 hidden text-faint xl:inline">Est. 2018</span>
          </span>
        </motion.div>

        {/* Titular */}
        <div
          className="caja-titulo py-[clamp(2.5rem,7vh,6rem)]"
          style={{ paddingRight: `max(0px, calc(${COLUMNA} - var(--gutter) + 2rem))` }}
        >
          <h1 className="titulo-hero font-bold">
            {LINEAS.map((linea, i) => (
              <span key={linea} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1 * d, ease: ease.out, delay: (0.3 + i * 0.09) * d }}
                >
                  {linea}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1 * d, ease: ease.out, delay: 0.48 * d }}
              >
                <span className="font-serif font-normal italic tracking-[-0.02em]">todavia</span>{' '}
                no tiene.
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Pie del encabezado */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 * d, ease: ease.out, delay: 0.75 * d }}
          >
            <p className="max-w-[46ch] text-lead text-muted">
              Convertimos operaciones complejas en productos digitales simples. Plataformas,
              sistemas internos, comercio, datos y automatizacion, construidos para durar.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BotonEnlace href="/proyectos" magnetico>
                Ver proyectos
              </BotonEnlace>
              <BotonEnlace href="/contacto" variante="contorno" flecha={false}>
                Cuentanos tu idea
              </BotonEnlace>
            </div>
          </motion.div>

          {/* Panel vivo: una muestra del tipo de interfaz que construimos */}
          <motion.div
            className="lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 * d, ease: ease.out, delay: 0.95 * d }}
          >
            <PanelPulso />
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          className="mt-10 flex items-center gap-4 border-t border-line pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 * d, delay: 1.2 * d }}
        >
          <span className="eyebrow">Desplaza</span>
          <span className="relative h-px flex-1 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 w-16 bg-ink"
              animate={{ x: ['-100%', '1200%'] }}
              transition={{
                duration: 3.2,
                ease: ease.inOut,
                repeat: reducido ? 0 : Infinity,
                repeatDelay: 0.4,
              }}
            />
          </span>
          <span className="eyebrow hidden sm:block">Diseno · Ingenieria · Datos · IA</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Tarjeta compacta de indicadores. Es una interfaz real, no un adorno. */
function PanelPulso() {
  return (
    <div className="border border-line bg-surface/80 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Operacion en vivo
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-muted">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
          Activo
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            Pedidos / hora
          </span>
          <span className="tnum mt-1 block text-[2rem] font-bold leading-none">52</span>
        </div>
        <span className="tnum mb-1 font-mono text-[11px] text-accent">+18.4 %</span>
      </div>

      <Sparkline datos={pulso} className="mt-4" />

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
        {[
          { k: 'Latencia', v: '184 ms' },
          { k: 'Errores', v: '0.02 %' },
          { k: 'Uptime', v: '99.98 %' },
        ].map((x) => (
          <div key={x.k}>
            <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
              {x.k}
            </span>
            <span className="tnum mt-1 block text-sm text-ink">{x.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
