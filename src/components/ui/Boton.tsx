'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Magnetic } from './Magnetic';
import { cn } from '@/lib/utils';

type Variante = 'solido' | 'contorno';

const base =
  'group relative inline-flex items-center justify-center gap-3 font-mono text-label uppercase tracking-[0.14em] transition-colors duration-300 ease-out select-none disabled:opacity-60';

const variantes: Record<Variante, string> = {
  solido: 'bg-ink text-bg hover:bg-accent hover:text-accent-ink',
  contorno: 'border border-line text-ink hover:border-ink hover:bg-ink hover:text-bg',
};

const tamanos = {
  medio: 'px-7 py-4',
  grande: 'px-8 py-5',
} as const;

function Flecha() {
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-[0.72em] w-[0.72em] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth={1.6} />
    </svg>
  );
}

type Comun = {
  children: ReactNode;
  variante?: Variante;
  tamano?: keyof typeof tamanos;
  flecha?: boolean;
  /** Atrae el control hacia el cursor. Reservado para la accion principal. */
  magnetico?: boolean;
  /** Ocupa todo el ancho disponible. */
  ancho?: boolean;
  className?: string;
};

const envolver = (magnetico: boolean, ancho: boolean, nodo: ReactNode) =>
  magnetico ? <Magnetic className={ancho ? 'block' : 'inline-block'}>{nodo}</Magnetic> : nodo;

export function BotonEnlace({
  children,
  href,
  variante = 'solido',
  tamano = 'medio',
  flecha = true,
  magnetico = false,
  ancho = false,
  className,
  ...rest
}: Comun & ComponentProps<typeof Link>) {
  return envolver(
    magnetico,
    ancho,
    <Link
      href={href}
      className={cn(base, variantes[variante], tamanos[tamano], ancho && 'w-full', className)}
      {...rest}
    >
      {children}
      {flecha && <Flecha />}
    </Link>,
  );
}

export function Boton({
  children,
  variante = 'solido',
  tamano = 'medio',
  flecha = true,
  magnetico = false,
  ancho = false,
  className,
  ...rest
}: Comun & ComponentProps<'button'>) {
  return envolver(
    magnetico,
    ancho,
    <button
      className={cn(base, variantes[variante], tamanos[tamano], ancho && 'w-full', className)}
      {...rest}
    >
      {children}
      {flecha && <Flecha />}
    </button>,
  );
}
