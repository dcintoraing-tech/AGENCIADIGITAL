import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { articulos, articulosRelacionados, getArticulo, type Bloque } from '@/content/insights';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticulo(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.bajada,
    openGraph: {
      type: 'article',
      title: a.titulo,
      description: a.bajada,
      publishedTime: a.fecha,
      authors: [a.autor],
    },
  };
}

function Contenido({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case 'subtitulo':
      return <h2 className="mt-14 text-d4 font-bold">{bloque.texto}</h2>;
    case 'cita':
      return (
        <blockquote className="my-12 border-l border-accent py-2 pl-6 font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-snug">
          {bloque.texto}
        </blockquote>
      );
    case 'lista':
      return (
        <ul className="mt-8 space-y-0">
          {bloque.items.map((i) => (
            <li
              key={i}
              className="flex gap-4 border-b border-line py-3.5 leading-relaxed text-muted first:border-t"
            >
              <span className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" aria-hidden />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-6 leading-[1.75] text-muted">{bloque.texto}</p>;
  }
}

export default async function Articulo({ params }: Params) {
  const { slug } = await params;
  const a = getArticulo(slug);
  if (!a) notFound();

  const relacionados = articulosRelacionados(slug);

  return (
    <article className="pb-section">
      <header className="shell pt-[calc(var(--nav-h)+clamp(2.5rem,7vw,5rem))]">
        <Reveal>
          <Link
            href="/ideas"
            className="link-line font-mono text-label uppercase text-muted hover:text-ink"
          >
            &larr; Todas las ideas
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-line pt-5">
          <Reveal>
            <span className="eyebrow text-accent">{a.categoria}</span>
          </Reveal>
          <Reveal retraso={0.04}>
            <span className="eyebrow">{a.lectura} de lectura</span>
          </Reveal>
        </div>

        <TextReveal
          lineas={[a.titulo]}
          as="h1"
          className="mt-8 max-w-[18ch] text-d2 font-bold"
          retraso={0.06}
        />

        <Reveal retraso={0.14}>
          <p className="mt-8 max-w-prose text-lead text-muted">{a.bajada}</p>
        </Reveal>

        <Reveal retraso={0.2}>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-5">
            <span className="text-sm">{a.autor}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              {a.cargoAutor}
            </span>
            <time
              dateTime={a.fecha}
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-faint"
            >
              {a.fechaLegible}
            </time>
          </div>
        </Reveal>
      </header>

      <Reveal as="figure" className="shell mt-14">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={a.imagen} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </Reveal>

      <div className="shell mt-16">
        <div className="grid gap-x-10 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-4">
            {a.cuerpo.map((b, i) => (
              <Reveal key={i} retraso={0} desde={16}>
                <Contenido bloque={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <section className="shell pt-section">
        <div className="hairline-t pt-5">
          <span className="eyebrow">Seguir leyendo</span>
          <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {relacionados.map((r, i) => (
              <Reveal as="li" key={r.slug} retraso={i * 0.06}>
                <Link href={`/ideas/${r.slug}`} className="group block" data-cursor="Leer">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.imagen}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <span className="mt-5 block font-mono text-label uppercase text-accent">
                    {r.categoria}
                  </span>
                  <h3 className="mt-3 text-lead font-bold leading-snug">
                    <span className="link-line inline">{r.titulo}</span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
