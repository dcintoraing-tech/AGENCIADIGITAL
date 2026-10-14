import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { testimonios } from '@/content/testimonials';
import { cn } from '@/lib/utils';

/** Posiciones escritas a mano: ningun testimonio pesa lo mismo que otro. */
const COMPOSICION: Record<string, string> = {
  flama: 'lg:col-span-5 lg:col-start-1',
  vertice: 'lg:col-span-5 lg:col-start-8 lg:mt-24',
  'casa-27': 'lg:col-span-5 lg:col-start-2 lg:mt-4',
  athletica: 'lg:col-span-4 lg:col-start-8',
  nero: 'lg:col-span-4 lg:col-start-3 lg:mt-4',
};

export function Testimonios() {
  const principal = testimonios.find((t) => t.peso === 'principal')!;
  const resto = testimonios.filter((t) => t.peso !== 'principal');

  return (
    <section className="pt-section">
      <div className="shell">
        <SectionHead marca="08 / Clientes" lineas={['Lo que dicen', 'despues.']} />

        {/* Testimonio principal */}
        <figure className="mt-16 grid gap-x-10 gap-y-8 border-t border-line pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <blockquote className="text-d3 font-bold">
              <span className="font-serif font-normal italic">&ldquo;</span>
              {principal.texto}
              <span className="font-serif font-normal italic">&rdquo;</span>
            </blockquote>
          </Reveal>

          <Reveal retraso={0.12} className="lg:col-span-3 lg:col-start-10">
            <figcaption className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={principal.retrato}
                  alt={`Retrato de ${principal.autor}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block text-sm font-bold">{principal.autor}</span>
                <span className="block text-[11px] leading-relaxed text-muted">
                  {principal.cargo}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                  {principal.empresa}
                </span>
              </span>
            </figcaption>

            {principal.proyecto && (
              <Link
                href={`/proyectos/${principal.proyecto}`}
                className="link-line mt-5 inline-block font-mono text-label uppercase text-ink"
              >
                Ver el caso
              </Link>
            )}
          </Reveal>
        </figure>

        {/* Resto, en composicion asimetrica */}
        <div className="mt-20 grid gap-x-10 gap-y-14 lg:grid-cols-12 lg:gap-y-6">
          {resto.map((t, i) => (
            <Reveal
              as="figure"
              key={t.id}
              retraso={i * 0.06}
              className={cn('border-t border-line pt-7', COMPOSICION[t.id])}
            >
              <blockquote
                className={cn(
                  'leading-relaxed',
                  t.peso === 'medio' ? 'text-lead' : 'text-base text-muted',
                )}
              >
                {t.texto}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={t.retrato}
                    alt={`Retrato de ${t.autor}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm">{t.autor}</span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {t.cargo} · {t.empresa}
                  </span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
