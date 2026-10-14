import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/sections/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { articulos } from '@/content/insights';

export const metadata: Metadata = {
  title: 'Ideas',
  description:
    'Notas de trabajo sobre inteligencia artificial, automatizacion, sistemas empresariales, e-commerce, datos y diseno de interfaz.',
};

export default function PaginaIdeas() {
  const categorias = Array.from(new Set(articulos.map((a) => a.categoria)));

  return (
    <>
      <PageHeader
        marca="Ideas"
        lineas={['Notas de', 'trabajo.']}
        entrada="No escribimos sobre tendencias. Escribimos sobre decisiones tecnicas que se repiten proyecto tras proyecto y que casi siempre se toman por costumbre."
        meta={[
          { etiqueta: 'Articulos', valor: String(articulos.length) },
          { etiqueta: 'Temas', valor: String(categorias.length) },
          { etiqueta: 'Frecuencia', valor: 'Mensual' },
        ]}
      />

      <div className="shell pt-section">
        <ul>
          {articulos.map((a, i) => (
            <Reveal as="li" key={a.slug} retraso={(i % 3) * 0.05} className="border-b border-line first:border-t">
              <Link
                href={`/ideas/${a.slug}`}
                className="group grid grid-cols-1 items-center gap-x-10 gap-y-6 py-9 md:grid-cols-12"
                data-cursor="Leer"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-[4/3]">
                  <Image
                    src={a.imagen}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 24vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="md:col-span-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-label uppercase text-accent">{a.categoria}</span>
                    <span className="font-mono text-label text-faint">{a.lectura}</span>
                  </div>
                  <h2 className="mt-3.5 text-d4 font-bold">
                    <span className="link-line inline">{a.titulo}</span>
                  </h2>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{a.bajada}</p>
                </div>

                <div className="md:col-span-2 md:col-start-10 md:text-right">
                  <span className="block text-sm">{a.autor}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {a.fechaLegible}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
