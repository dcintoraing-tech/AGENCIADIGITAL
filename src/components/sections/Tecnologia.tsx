'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { capas, tecnologias, tecnologiaIntro, tecnologiaTitulo } from '@/content/tech';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * El repertorio tecnico dibujado como una seccion constructiva: cinco estratos,
 * de la interfaz a la infraestructura. El ancho de cada bloque es proporcional
 * al numero de proyectos en los que se uso, asi que la imagen dice algo real
 * sobre el estudio y no es una fila de logotipos.
 */
export function Tecnologia() {
  const [capaActiva, setCapaActiva] = useState<string | null>(null);
  const [detalle, setDetalle] = useState<(typeof tecnologias)[number] | null>(null);

  const porCapa = useMemo(
    () => capas.map((c) => ({ capa: c, items: tecnologias.filter((t) => t.capa === c) })),
    [],
  );

  const visible = detalle ?? tecnologias.find((t) => t.nombre === 'PostgreSQL')!;

  return (
    <section className="pt-section">
      <div className="shell">
        <SectionHead
          marca="05 / Tecnologia"
          lineas={['Las herramientas cambian.', 'La ingenieria permanece.']}
          apoyo={tecnologiaIntro}
          tamano="d3"
        />

        {/* Filtro por estrato */}
        <div className="mt-14 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCapaActiva(null)}
            className={cn(
              'border px-4 py-2 font-mono text-label uppercase transition-colors duration-300',
              capaActiva === null
                ? 'border-ink bg-ink text-bg'
                : 'border-line text-muted hover:border-ink hover:text-ink',
            )}
          >
            Todo
          </button>
          {capas.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCapaActiva(capaActiva === c ? null : c)}
              className={cn(
                'border px-4 py-2 font-mono text-label uppercase transition-colors duration-300',
                capaActiva === c
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line text-muted hover:border-ink hover:text-ink',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Estratos */}
          <div className="lg:col-span-8">
            {porCapa.map(({ capa, items }, fila) => {
              const atenuada = capaActiva !== null && capaActiva !== capa;
              const total = items.reduce((a, t) => a + t.proyectos, 0);

              return (
                <motion.div
                  key={capa}
                  className="border-b border-line py-6 first:border-t"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: ease.out, delay: fila * 0.06 }}
                  animate={{ opacity: atenuada ? 0.3 : 1 }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow text-ink">{capa}</span>
                    <span className="font-mono text-[10px] uppercase text-faint">
                      {items.length} herramientas
                    </span>
                  </div>

                  {/* En movil los bloques se reparten en varias filas; la lectura
                      proporcional solo tiene sentido cuando caben en una sola. */}
                  <div className="mt-4 flex flex-wrap gap-1 sm:flex-nowrap">
                    {items.map((t) => (
                      <button
                        key={t.nombre}
                        type="button"
                        onMouseEnter={() => setDetalle(t)}
                        onFocus={() => setDetalle(t)}
                        onClick={() => setDetalle(t)}
                        style={{ ['--peso' as string]: t.proyectos / total }}
                        className={cn(
                          'group relative min-w-0 flex-auto overflow-hidden border px-3 py-3 text-left transition-colors duration-300 sm:[flex:var(--peso)_1_0%]',
                          detalle?.nombre === t.nombre
                            ? 'border-accent bg-accent text-accent-ink'
                            : 'border-line hover:border-ink',
                        )}
                        aria-label={`${t.nombre}: ${t.rol}`}
                      >
                        <span className="block truncate font-mono text-[11px] uppercase tracking-[0.06em]">
                          {t.nombre}
                        </span>
                        <span
                          className={cn(
                            'tnum mt-1.5 block text-[10px]',
                            detalle?.nombre === t.nombre ? 'text-accent-ink/75' : 'text-faint',
                          )}
                        >
                          {t.proyectos}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              El ancho de cada bloque es proporcional a los proyectos en que se uso
            </p>
          </div>

          {/* Ficha de la herramienta */}
          <div className="lg:col-span-3 lg:col-start-10">
            <div className="sticky top-[calc(var(--nav-h)+3rem)] border border-line p-6">
              <span className="eyebrow">Herramienta</span>
              <motion.div key={visible.nombre} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: ease.out }}>
                <h3 className="mt-5 text-d4 font-bold">{visible.nombre}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{visible.rol}</p>

                <dl className="mt-7 space-y-3 border-t border-line pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase text-faint">Estrato</dt>
                    <dd className="text-sm">{visible.capa}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase text-faint">En uso desde</dt>
                    <dd className="tnum text-sm">{visible.desde}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase text-faint">Proyectos</dt>
                    <dd className="tnum text-sm">{visible.proyectos}</dd>
                  </div>
                </dl>
              </motion.div>
            </div>
          </div>
        </div>

        <p className="sr-only">{tecnologiaTitulo}</p>
      </div>
    </section>
  );
}
