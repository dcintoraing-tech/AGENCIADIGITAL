import Link from 'next/link';
import { BotonEnlace } from '@/components/ui/Boton';
import { ArqoMark } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { site } from '@/content/site';
import { servicios } from '@/content/services';
import { proyectos } from '@/content/projects';

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative mt-section border-t border-line">
      {/* Llamada final: el ultimo bloque del sitio es una invitacion, no un formulario */}
      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Siguiente paso</span>
            <TextReveal
              lineas={['Cuentanos que', 'estas intentando', 'construir.']}
              as="h2"
              className="mt-8 text-d2 font-bold"
            />
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            <Reveal retraso={0.1}>
              <p className="text-lead text-muted">
                Respondemos en menos de 24 horas habiles con una primera lectura del
                problema, no con un catalogo de servicios.
              </p>
            </Reveal>
            <Reveal retraso={0.18}>
              <BotonEnlace href="/contacto" tamano="grande" magnetico className="self-start">
                Iniciar proyecto
              </BotonEnlace>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Mapa del sitio */}
      <div className="shell border-t border-line py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="ARQO, ir al inicio" className="inline-block">
              <ArqoMark className="h-9 w-9 text-ink" />
            </Link>
            <p className="mt-6 max-w-[26ch] text-sm leading-relaxed text-muted">
              {site.eslogan} Estudio de ingenieria de producto digital desde {site.fundacion}.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Servicios">
            <h3 className="eyebrow">Servicios</h3>
            <ul className="mt-5 space-y-2.5">
              {servicios.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicios#${s.id}`}
                    className="link-line text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Proyectos">
            <h3 className="eyebrow">Proyectos</h3>
            <ul className="mt-5 space-y-2.5">
              {proyectos.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="link-line text-sm text-muted transition-colors hover:text-ink"
                  >
                    {p.nombre}
                    <span className="ml-2 text-faint">{p.indice}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="eyebrow">Contacto</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${site.contacto.email}`} className="link-line hover:text-ink">
                  {site.contacto.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contacto.telefono.replace(/\s/g, '')}`}
                  className="link-line hover:text-ink"
                >
                  {site.contacto.telefono}
                </a>
              </li>
              {site.contacto.direcciones.map((d) => (
                <li key={d.ciudad} className="pt-2">
                  <span className="block text-ink">{d.ciudad}</span>
                  <span className="block text-faint">{d.linea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-label uppercase text-faint">
          {anio} ARQO — Proyecto ficticio de portafolio
        </p>
        <ul className="flex flex-wrap gap-6">
          {site.redes.map((r) => (
            <li key={r.nombre}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line font-mono text-label uppercase text-muted transition-colors hover:text-ink"
              >
                {r.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
