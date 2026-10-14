import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MockupApp } from '@/components/dashboard/Mockup';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { PortadaCaso } from '@/components/sections/PortadaCaso';
import { getProyecto, proyectos, proyectoVecino } from '@/content/projects';
import { mockups } from '@/content/mockups';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) return {};
  return {
    title: `${p.nombre} — ${p.industria}`,
    description: p.descripcion,
    openGraph: { title: `${p.nombre} — ${p.industria}`, description: p.descripcion },
  };
}

export default async function CasoDeEstudio({ params }: Params) {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) notFound();

  const { anterior, siguiente } = proyectoVecino(slug);
  const mockup = mockups[slug];

  return (
    <article className="pb-section">
      <PortadaCaso proyecto={p} />

      {/* Resultados de cabecera */}
      <section className="shell mt-16 lg:mt-24">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {p.metricas.map((m, i) => (
            <Reveal key={m.etiqueta} retraso={i * 0.08} className="bg-bg px-6 py-9">
              <span className="tnum block text-d3 font-bold leading-none text-accent">
                {m.valor}
              </span>
              <span className="mt-5 block text-sm text-muted">{m.etiqueta}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* El problema */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-10 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">El problema</span>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <TextReveal lineas={[p.problema.titulo]} as="h2" className="text-d3 font-bold" />
            {p.problema.parrafos.map((t, i) => (
              <Reveal key={i} retraso={0.1 + i * 0.06}>
                <p className="mt-6 max-w-prose text-lead leading-relaxed text-muted">{t}</p>
              </Reveal>
            ))}

            <Reveal retraso={0.25}>
              <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
                {p.problema.puntos.map((punto) => (
                  <li key={punto} className="bg-bg p-5 text-sm leading-relaxed text-muted">
                    {punto}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Imagen de contexto */}
      <Reveal as="figure" className="shell pt-section">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={p.galeria[1].src}
            alt={p.galeria[1].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-4 max-w-prose text-[11px] leading-relaxed text-faint">
          {p.galeria[1].pie}
        </figcaption>
      </Reveal>

      {/* La solucion */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-10 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">La solucion</span>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <TextReveal lineas={[p.solucion.titulo]} as="h2" className="text-d3 font-bold" />
            {p.solucion.parrafos.map((t, i) => (
              <Reveal key={i} retraso={0.1 + i * 0.06}>
                <p className="mt-6 max-w-prose text-lead leading-relaxed text-muted">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {p.solucion.piezas.map((pieza, i) => (
            <Reveal key={pieza.nombre} retraso={i * 0.06} className="bg-bg p-6">
              <span className="font-mono text-label uppercase text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-sm font-bold">{pieza.nombre}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{pieza.texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interfaz */}
      {mockup && (
        <section className="shell pt-section">
          <Reveal>
            <span className="eyebrow">La interfaz</span>
          </Reveal>
          <Reveal retraso={0.1} className="mt-8">
            <MockupApp {...mockup} />
          </Reveal>
          <Reveal retraso={0.16}>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              Reconstruccion de la interfaz entregada, con datos de ejemplo
            </p>
          </Reveal>
        </section>
      )}

      {/* El proceso */}
      <section className="shell pt-section">
        <div className="hairline-t pt-5">
          <Reveal>
            <span className="eyebrow">El proceso</span>
          </Reveal>

          <ol className="mt-12">
            {p.proceso.map((fase, i) => (
              <Reveal
                as="li"
                key={fase.fase}
                retraso={i * 0.05}
                className="grid gap-x-10 gap-y-3 border-b border-line py-7 lg:grid-cols-12"
              >
                <span className="font-mono text-label text-faint lg:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-d4 font-bold lg:col-span-3">{fase.fase}</h3>
                <span className="font-mono text-label uppercase text-muted lg:col-span-2">
                  {fase.semanas}
                </span>
                <p className="max-w-prose leading-relaxed text-muted lg:col-span-6">{fase.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Imagen de cierre */}
      <Reveal as="figure" className="shell pt-section">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={p.galeria[2].src}
            alt={p.galeria[2].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-4 max-w-prose text-[11px] leading-relaxed text-faint">
          {p.galeria[2].pie}
        </figcaption>
      </Reveal>

      {/* Resultado */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-10 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">Resultado</span>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <TextReveal lineas={[p.impacto.titulo]} as="h2" className="text-d3 font-bold" />
            {p.impacto.parrafos.map((t, i) => (
              <Reveal key={i} retraso={0.1 + i * 0.06}>
                <p className="mt-6 max-w-prose text-lead leading-relaxed text-muted">{t}</p>
              </Reveal>
            ))}

            <Reveal as="figure" retraso={0.2} className="mt-14 border-l border-accent pl-6">
              <blockquote className="text-d4 font-bold leading-snug">{p.cita.texto}</blockquote>
              <figcaption className="mt-5 font-mono text-label uppercase text-muted">
                {p.cita.autor} — {p.cita.cargo}
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tecnologia */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-8 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">Tecnologia</span>
            </Reveal>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {p.tecnologias.map((t) => (
                  <li
                    key={t}
                    className="border border-line px-4 py-2 font-mono text-label uppercase text-ink"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal retraso={0.1}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {p.servicios.map((s) => (
                  <li key={s} className="text-sm text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Navegacion entre casos */}
      <nav className="shell pt-section" aria-label="Otros proyectos">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {[
            { etiqueta: 'Caso anterior', p: anterior },
            { etiqueta: 'Caso siguiente', p: siguiente },
          ].map(({ etiqueta, p: vecino }) => (
            <Link
              key={etiqueta}
              href={`/proyectos/${vecino.slug}`}
              className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-bg p-7"
              data-cursor="Ver caso"
            >
              <span className="eyebrow relative z-10">{etiqueta}</span>
              <span className="relative z-10">
                <span className="block text-d3 font-bold">{vecino.nombre}</span>
                <span className="mt-1.5 block font-mono text-label uppercase text-muted">
                  {vecino.industria}
                </span>
              </span>
              <Image
                src={vecino.portada}
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-20"
              />
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
