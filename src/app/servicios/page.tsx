import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/sections/PageHeader';
import { Automatizacion } from '@/components/sections/Automatizacion';
import { Tableros } from '@/components/sections/Tableros';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { servicios } from '@/content/services';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Desarrollo web, software a medida, e-commerce, automatizacion, inteligencia artificial, datos y BI, e integraciones.',
};

export default function PaginaServicios() {
  return (
    <>
      <PageHeader
        marca="Servicios"
        lineas={['Siete capacidades,', 'un mismo equipo.']}
        entrada="No subcontratamos. El equipo que levanta el proceso es el que escribe el codigo y el que acompana el arranque. Por eso las capacidades estan juntas: casi ningun proyecto usa una sola."
        meta={[
          { etiqueta: 'Capacidades', valor: String(servicios.length) },
          { etiqueta: 'Equipo', valor: '14 personas' },
          { etiqueta: 'Modelo', valor: 'Proyecto cerrado o retainer' },
        ]}
      />

      <div className="shell pt-section">
        {servicios.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="hairline-t scroll-mt-[calc(var(--nav-h)+2rem)] py-section first:pt-12"
          >
            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="font-mono text-label text-faint">{s.indice}</span>
                </Reveal>
                <TextReveal
                  lineas={[s.titulo]}
                  as="h2"
                  className="mt-6 text-d2 font-bold"
                  retraso={0.05}
                />
                <Reveal retraso={0.12}>
                  <p className="mt-7 max-w-prose text-lead text-muted">{s.descripcion}</p>
                </Reveal>

                <Reveal retraso={0.18}>
                  <div className="mt-10 border-l border-accent py-1 pl-5">
                    <span className="tnum block text-d3 font-bold leading-none">
                      {s.dato.valor}
                    </span>
                    <span className="mt-2.5 block max-w-[32ch] text-sm leading-relaxed text-muted">
                      {s.dato.etiqueta}
                    </span>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <div
                    className={`relative overflow-hidden ${
                      i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'
                    }`}
                  >
                    <Image
                      src={s.imagen}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <Reveal retraso={0.08}>
                    <h3 className="eyebrow">Que incluye</h3>
                    <ul className="mt-5 space-y-2.5">
                      {s.capacidades.map((c) => (
                        <li
                          key={c}
                          className="border-b border-line pb-2.5 text-sm leading-relaxed text-muted"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal retraso={0.14}>
                    <h3 className="eyebrow">Que se entrega</h3>
                    <ul className="mt-5 space-y-2.5">
                      {s.entregables.map((e) => (
                        <li
                          key={e}
                          className="border-b border-line pb-2.5 text-sm leading-relaxed text-ink"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Automatizacion />
      <Tableros />

      <section className="shell pt-section">
        <Reveal>
          <Link
            href="/contacto"
            className="group flex flex-col items-start justify-between gap-6 border border-line p-8 transition-colors duration-500 hover:border-ink sm:flex-row sm:items-center sm:p-10"
          >
            <span>
              <span className="block text-d4 font-bold">No sabes cual necesitas.</span>
              <span className="mt-2 block max-w-prose text-sm text-muted">
                Es lo normal. Describe el problema y nosotros proponemos el camino.
              </span>
            </span>
            <span className="shrink-0 font-mono text-label uppercase text-ink">
              Iniciar proyecto &rarr;
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
