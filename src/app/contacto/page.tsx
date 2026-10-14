import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormularioContacto } from '@/components/sections/FormularioContacto';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Cuentanos que estas intentando construir. Respondemos en menos de 24 horas habiles con una primera lectura del problema.',
};

export default function PaginaContacto() {
  return (
    <div className="pb-section">
      <header className="shell pt-[calc(var(--nav-h)+clamp(3rem,9vw,7rem))]">
        <Reveal>
          <span className="eyebrow">Contacto</span>
        </Reveal>
        <TextReveal
          lineas={['Que estas', 'intentando', 'construir.']}
          as="h1"
          className="mt-8 text-d1 font-bold"
          retraso={0.05}
        />
        <Reveal retraso={0.14}>
          <p className="mt-10 max-w-prose text-lead text-muted">
            No hace falta que llegues con el proyecto definido. La mayoria de nuestros clientes
            llega con un problema y una sospecha. Con eso basta para empezar.
          </p>
        </Reveal>
      </header>

      <div className="shell pt-section">
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96" />}>
              <FormularioContacto />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-line pt-6">
              <h2 className="eyebrow">Directo</h2>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href={`mailto:${site.contacto.email}`} className="link-line text-lead">
                    {site.contacto.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contacto.telefono.replace(/\s/g, '')}`}
                    className="link-line text-lead"
                  >
                    {site.contacto.telefono}
                  </a>
                </li>
              </ul>
              <p className="mt-5 text-sm text-muted">{site.contacto.horario}</p>
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <h2 className="eyebrow">Estudios</h2>
              <ul className="mt-6 space-y-6">
                {site.contacto.direcciones.map((d) => (
                  <li key={d.ciudad}>
                    <span className="block text-sm font-bold">{d.ciudad}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{d.linea}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <h2 className="eyebrow">Que pasa despues</h2>
              <ol className="mt-6 space-y-5">
                {[
                  'Leemos el brief completo y revisamos tu sitio o sistema actual.',
                  'Respondemos en menos de 24 horas habiles con dudas concretas.',
                  'Llamada de 45 minutos para acotar alcance, plazo y presupuesto.',
                  'Propuesta por escrito con fases, entregables y precio cerrado.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="shrink-0 font-mono text-label text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
