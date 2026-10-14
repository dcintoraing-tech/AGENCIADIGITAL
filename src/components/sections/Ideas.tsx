import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { articulos } from '@/content/insights';

export function Ideas() {
  const [principal, ...resto] = articulos.slice(0, 4);

  return (
    <section className="pt-section">
      <div className="shell">
        <SectionHead
          marca="11 / Ideas"
          lineas={['Lo que', 'aprendimos.']}
          apoyo="Notas de trabajo sobre decisiones tecnicas que se repiten proyecto tras proyecto."
          accion={
            <Link href="/ideas" className="link-line font-mono text-label uppercase text-ink">
              Leer todo
            </Link>
          }
        />

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* Articulo destacado */}
          <Reveal as="article" className="lg:col-span-7">
            <Link href={`/ideas/${principal.slug}`} className="group block" data-cursor="Leer">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={principal.imagen}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="font-mono text-label uppercase text-accent">
                  {principal.categoria}
                </span>
                <span className="font-mono text-label text-faint">{principal.lectura}</span>
              </div>

              <h3 className="mt-4 text-d3 font-bold">
                <span className="link-line inline">{principal.titulo}</span>
              </h3>
              <p className="mt-4 max-w-prose leading-relaxed text-muted">{principal.bajada}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                {principal.autor} · {principal.fechaLegible}
              </p>
            </Link>
          </Reveal>

          {/* Resto, como indice */}
          <div className="lg:col-span-4 lg:col-start-9">
            <ul>
              {resto.map((a, i) => (
                <Reveal as="li" key={a.slug} retraso={i * 0.07} className="border-b border-line py-7 first:border-t first:pt-0 lg:first:pt-7">
                  <Link href={`/ideas/${a.slug}`} className="group block">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-label uppercase text-accent">
                        {a.categoria}
                      </span>
                      <span className="font-mono text-label text-faint">{a.lectura}</span>
                    </div>
                    <h3 className="mt-3 text-lead font-bold leading-snug">
                      <span className="link-line inline">{a.titulo}</span>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{a.bajada}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
