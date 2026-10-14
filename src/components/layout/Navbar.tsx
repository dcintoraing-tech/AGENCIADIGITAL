'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useLenis } from './SmoothScroll';
import { BotonEnlace } from '@/components/ui/Boton';
import { Logo } from '@/components/ui/Logo';
import { site } from '@/content/site';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { scrollY } = useScroll();
  const [oculta, setOculta] = useState(false);
  const [solida, setSolida] = useState(false);
  const [abierta, setAbierta] = useState(false);
  const [previo, setPrevio] = useState(0);
  const pathname = usePathname();
  const { bloquear } = useLenis();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolida(y > 24);
    // Se esconde al bajar y reaparece al subir, salvo en la cabecera.
    if (!abierta) setOculta(y > previo && y > 220);
    setPrevio(y);
  });

  useEffect(() => setAbierta(false), [pathname]);

  useEffect(() => {
    bloquear(abierta);
    document.body.style.overflow = abierta ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierta, bloquear]);

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500',
          solida && !abierta
            ? 'border-b border-line bg-bg/80 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
        animate={{ y: oculta ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: ease.out }}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="ARQO, ir al inicio"
            className="relative z-10 text-[1.0625rem] transition-opacity duration-300 hover:opacity-70"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={activo(item.href)}
                className="link-line font-mono text-label uppercase text-muted transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:block" />

            <BotonEnlace
              href={site.cta.href}
              flecha={false}
              className="hidden px-6 py-3 lg:inline-flex"
            >
              {site.cta.label}
            </BotonEnlace>

            <button
              type="button"
              onClick={() => setAbierta((v) => !v)}
              aria-expanded={abierta}
              aria-label={abierta ? 'Cerrar menu' : 'Abrir menu'}
              className="relative z-10 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <motion.span
                className="block h-[1.5px] w-6 bg-ink"
                animate={{ rotate: abierta ? 45 : 0, y: abierta ? 3.75 : 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              />
              <motion.span
                className="block h-[1.5px] w-6 bg-ink"
                animate={{ rotate: abierta ? -45 : 0, y: abierta ? -3.75 : 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MenuMovil abierta={abierta} alCerrar={() => setAbierta(false)} />
    </>
  );
}

function MenuMovil({ abierta, alCerrar }: { abierta: boolean; alCerrar: () => void }) {
  return (
    <AnimatePresence>
      {abierta && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-bg lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.62, ease: ease.inOut }}
        >
          <div className="shell flex flex-1 flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2.5rem)]">
            <nav aria-label="Principal movil">
              <ul>
                {[...site.nav, { label: 'Contacto', href: '/contacto' }].map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.25 } }}
                      transition={{ duration: 0.7, ease: ease.out, delay: 0.14 + i * 0.055 }}
                    >
                      <Link
                        href={item.href}
                        onClick={alCerrar}
                        className="flex items-baseline justify-between py-4 text-d3 font-bold"
                      >
                        {item.label}
                        <span className="font-mono text-label text-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12 space-y-7"
            >
              <BotonEnlace href={site.cta.href} onClick={alCerrar} ancho tamano="grande">
                {site.cta.label}
              </BotonEnlace>

              <div className="flex items-end justify-between gap-6">
                <div className="space-y-1">
                  <a
                    href={`mailto:${site.contacto.email}`}
                    className="block text-sm text-muted transition-colors hover:text-ink"
                  >
                    {site.contacto.email}
                  </a>
                  <a
                    href={`tel:${site.contacto.telefono.replace(/\s/g, '')}`}
                    className="block text-sm text-muted transition-colors hover:text-ink"
                  >
                    {site.contacto.telefono}
                  </a>
                </div>
                <ThemeToggle />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
