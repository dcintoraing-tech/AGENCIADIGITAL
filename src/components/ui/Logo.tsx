import { cn } from '@/lib/utils';

/**
 * Isotipo ARQO: un arco de medio punto apoyado en su linea de cota.
 * El trazo (7 unidades sobre 40) iguala el astil de Archivo 700, de modo que
 * marca y logotipo tienen el mismo color tipografico.
 */
export function ArqoMark({
  className,
  conCota = true,
}: {
  className?: string;
  conCota?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('block', className)}
    >
      <path
        d="M7.25 35V20a12.75 12.75 0 0 1 25.5 0v15"
        stroke="currentColor"
        strokeWidth={7}
      />
      {conCota && <path d="M1 36.25h38" stroke="currentColor" strokeWidth={2.5} />}
    </svg>
  );
}

/**
 * Lockup completo. El arco se escala para que su cota caiga exactamente sobre
 * la linea base del logotipo: ambas piezas comparten horizontal.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-[0.3em] font-bold leading-none tracking-[-0.035em]',
        className,
      )}
    >
      {/* 0.845em = altura de capital del arco; el desfase lo apoya en la linea base */}
      <ArqoMark className="h-[0.845em] w-auto translate-y-[0.079em]" conCota={false} />
      <span>ARQO</span>
      <span className="sr-only">— estudio de ingenieria de producto digital</span>
    </span>
  );
}
