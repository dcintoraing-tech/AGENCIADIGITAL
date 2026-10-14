import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { Metricas } from '@/components/sections/Metricas';
import { Tecnologia } from '@/components/sections/Tecnologia';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { ArqoMark } from '@/components/ui/Logo';
import { equipo, site } from '@/content/site';
import { img } from '@/content/images';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'ARQO es un estudio de catorce personas entre Guadalajara y Madrid que combina diseno, ingenieria, datos e inteligencia artificial.',
};

const PERFILES = [
  { area: 'Diseno de producto', personas: 4, detalle: 'Interfaz, sistema visual e investigacion' },
  { area: 'Ingenieria', personas: 6, detalle: 'Front, servicios, integraciones e infraestructura' },
  { area: 'Datos e IA', personas: 3, detalle: 'Modelado, tableros y modelos en produccion' },
  { area: 'Direccion de proyecto', personas: 1, detalle: 'Alcance, plazos y relacion con el cliente' },
];

export default function PaginaNosotros() {
  return (
    <>
      <PageHeader
        marca="Nosotros"
        lineas={['Disenadores que', 'entienden bases', 'de datos.']}
        entrada={equipo.cuerpo[0]}
        meta={[
          { etiqueta: 'Fundacion', valor: String(site.fundacion) },
          { etiqueta: 'Equipo', valor: '14 personas' },
          { etiqueta: 'Sedes', valor: 'Guadalajara y Madrid' },
        ]}
      />

      {/* Imagen principal */}
      <Reveal as="figure" className="shell pt-section">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={equipo.fotos.principal}
            alt="Equipo de ARQO en sesion de trabajo"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* Historia */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-10 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">Como empezo</span>
            </Reveal>
            <Reveal retraso={0.08}>
              <ArqoMark className="mt-10 hidden h-20 w-20 text-accent lg:block" />
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <TextReveal
              lineas={['Nada se presenta', 'si no funciona.']}
              as="h2"
              className="text-d3 font-bold"
            />
            {equipo.cuerpo.map((t, i) => (
              <Reveal key={i} retraso={0.1 + i * 0.06}>
                <p className="mt-6 max-w-prose text-lead leading-relaxed text-muted">{t}</p>
              </Reveal>
            ))}
            <Reveal retraso={0.24}>
              <p className="mt-6 max-w-prose text-lead leading-relaxed text-muted">
                {site.concepto.cuerpo}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="shell pt-section">
        <div className="hairline-t pt-5">
          <Reveal>
            <span className="eyebrow">Como trabajamos</span>
          </Reveal>
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
            {equipo.principios.map((p, i) => (
              <Reveal as="li" key={p.titulo} retraso={i * 0.06} className="bg-bg p-8">
                <span className="font-mono text-label uppercase text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-7 text-d4 font-bold">{p.titulo}</h3>
                <p className="mt-3 max-w-prose leading-relaxed text-muted">{p.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Composicion del equipo */}
      <section className="shell pt-section">
        <div className="hairline-t grid gap-x-10 gap-y-12 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">El equipo</span>
            </Reveal>
            <ul className="mt-10">
              {PERFILES.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.area}
                  retraso={i * 0.06}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5 first:border-t"
                >
                  <span>
                    <span className="block text-sm font-bold">{p.area}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                      {p.detalle}
                    </span>
                  </span>
                  <span className="tnum shrink-0 text-d4 font-bold leading-none">
                    {p.personas}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={img.pasilloVidrio}
                  alt="Pasillo del estudio con una sala de trabajo al fondo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal retraso={0.1}>
              <p className="mt-6 border-l border-accent py-1 pl-5 text-sm leading-relaxed text-muted">
                Trabajamos con un maximo de cuatro proyectos simultaneos. Es la unica forma que
                encontramos de que alguien del equipo pueda estar en sitio el dia del arranque.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Metricas />
      <Tecnologia />
    </>
  );
}
