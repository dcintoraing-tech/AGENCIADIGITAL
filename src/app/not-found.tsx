import Link from 'next/link';
import { ArqoMark } from '@/components/ui/Logo';
import { proyectos } from '@/content/projects';

export default function NoEncontrado() {
  return (
    <div className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--nav-h)]">
      <ArqoMark className="h-16 w-16 text-accent" />
      <h1 className="mt-10 text-d2 font-bold">Esta pagina no existe.</h1>
      <p className="mt-6 max-w-prose text-lead text-muted">
        El enlace esta roto o la pagina cambio de sitio. Estos son los caminos que si llevan a
        algun lado.
      </p>

      <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
        {[
          { href: '/proyectos', t: 'Proyectos', d: `${proyectos.length} casos de estudio` },
          { href: '/servicios', t: 'Servicios', d: 'Siete capacidades' },
          { href: '/contacto', t: 'Contacto', d: 'Cuentanos tu idea' },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="group bg-bg p-7 transition-colors hover:bg-surface">
            <span className="block text-d4 font-bold">
              <span className="link-line inline-block">{l.t}</span>
            </span>
            <span className="mt-2 block text-sm text-muted">{l.d}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
