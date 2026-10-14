'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import {
  complejidades,
  disenos,
  estimar,
  formatoMXN,
  integraciones,
  tiposProyecto,
  volumenes,
  type Seleccion,
} from '@/content/estimator';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Opcion = { valor: string; titulo: string; nota: string };

function Grupo({
  titulo,
  indice,
  opciones,
  valor,
  alElegir,
  columnas = 3,
}: {
  titulo: string;
  indice: string;
  opciones: readonly Opcion[];
  valor: string;
  alElegir: (v: string) => void;
  columnas?: number;
}) {
  return (
    <fieldset className="border-t border-line pt-6">
      <legend className="sr-only">{titulo}</legend>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-label text-faint">{indice}</span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-ink">{titulo}</span>
      </div>

      <div
        className={cn(
          'mt-5 grid gap-2',
          columnas === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {opciones.map((o) => {
          const activa = valor === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              onClick={() => alElegir(o.valor)}
              aria-pressed={activa}
              className={cn(
                'border p-4 text-left transition-colors duration-300',
                activa
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line text-ink hover:border-ink',
              )}
            >
              <span className="block text-sm font-bold">{o.titulo}</span>
              <span
                className={cn(
                  'mt-1.5 block text-[11px] leading-relaxed',
                  activa ? 'text-bg/70' : 'text-muted',
                )}
              >
                {o.nota}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Cotizador() {
  const [seleccion, setSeleccion] = useState<Seleccion>({
    tipo: 'sistema',
    complejidad: 'media',
    volumen: 'empresa',
    integraciones: ['erp'],
    diseno: 'medida',
  });

  const resultado = useMemo(() => estimar(seleccion), [seleccion]);

  const alternar = (v: string) =>
    setSeleccion((s) => ({
      ...s,
      integraciones: s.integraciones.includes(v)
        ? s.integraciones.filter((x) => x !== v)
        : [...s.integraciones, v],
    }));

  const parametros = new URLSearchParams({
    tipo: seleccion.tipo,
    presupuesto: `${formatoMXN(resultado.min)} a ${formatoMXN(resultado.max)}`,
  });

  return (
    <section id="cotizador" className="pt-section">
      <div className="shell">
        <SectionHead
          marca="10 / Cotizador"
          lineas={['Una idea del', 'orden de magnitud.']}
          apoyo="No sustituye una conversacion, pero evita la primera reunion incomoda. Ajusta las variables y mira como se mueve el rango."
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <Grupo
              indice="01"
              titulo="Tipo de proyecto"
              opciones={tiposProyecto}
              valor={seleccion.tipo}
              alElegir={(v) => setSeleccion((s) => ({ ...s, tipo: v }))}
            />
            <Grupo
              indice="02"
              titulo="Complejidad"
              opciones={complejidades}
              valor={seleccion.complejidad}
              alElegir={(v) => setSeleccion((s) => ({ ...s, complejidad: v }))}
            />
            <Grupo
              indice="03"
              titulo="Personas que lo usaran"
              opciones={volumenes}
              valor={seleccion.volumen}
              alElegir={(v) => setSeleccion((s) => ({ ...s, volumen: v }))}
            />

            <fieldset className="border-t border-line pt-6">
              <legend className="sr-only">Integraciones</legend>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-label text-faint">04</span>
                <span className="font-mono text-label uppercase tracking-[0.14em] text-ink">
                  Integraciones
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase text-faint">
                  Varias posibles
                </span>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {integraciones.map((o) => {
                  const activa = seleccion.integraciones.includes(o.valor);
                  return (
                    <button
                      key={o.valor}
                      type="button"
                      onClick={() => alternar(o.valor)}
                      aria-pressed={activa}
                      className={cn(
                        'flex items-start gap-3 border p-4 text-left transition-colors duration-300',
                        activa ? 'border-accent text-ink' : 'border-line text-ink hover:border-ink',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 block h-3 w-3 shrink-0 border transition-colors duration-200',
                          activa ? 'border-accent bg-accent' : 'border-line',
                        )}
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold">{o.titulo}</span>
                        <span className="mt-1.5 block text-[11px] leading-relaxed text-muted">
                          {o.nota}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Grupo
              indice="05"
              titulo="Diseno"
              opciones={disenos}
              valor={seleccion.diseno}
              alElegir={(v) => setSeleccion((s) => ({ ...s, diseno: v }))}
            />
          </div>

          {/* Resultado */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] border border-line p-7">
              <span className="eyebrow">Proyecto estimado</span>

              {/* Dos lineas: un rango de seis cifras no cabe en una sola columna */}
              <motion.dl
                key={`${resultado.min}-${resultado.max}`}
                className="mt-6 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              >
                {(
                  [
                    ['Desde', resultado.min],
                    ['Hasta', resultado.max],
                  ] as const
                ).map(([etiqueta, monto]) => (
                  <div key={etiqueta} className="flex items-baseline gap-3">
                    <dt className="w-12 shrink-0 font-mono text-[10px] uppercase text-faint">
                      {etiqueta}
                    </dt>
                    <dd className="tnum min-w-0 text-[clamp(1.35rem,2.4vw,1.875rem)] font-bold leading-none">
                      {formatoMXN(monto)}
                    </dd>
                  </div>
                ))}
              </motion.dl>

              <dl className="mt-8 space-y-4 border-t border-line pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10px] uppercase text-faint">Duracion</dt>
                  <dd className="tnum text-sm">
                    {resultado.semanasMin} a {resultado.semanasMax} semanas
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10px] uppercase text-faint">Equipo</dt>
                  <dd className="tnum text-sm">{resultado.perfiles} perfiles</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10px] uppercase text-faint">Integraciones</dt>
                  <dd className="tnum text-sm">{seleccion.integraciones.length}</dd>
                </div>
              </dl>

              {/* De donde sale el numero */}
              <div className="mt-8 border-t border-line pt-6">
                <span className="font-mono text-[10px] uppercase text-faint">Composicion</span>
                <ul className="mt-4 space-y-2.5">
                  {resultado.detalle.map((d) => (
                    <li key={d.concepto}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="truncate text-[11px] text-muted">{d.concepto}</span>
                        <span className="tnum shrink-0 font-mono text-[10px] text-faint">
                          {d.peso} %
                        </span>
                      </div>
                      <div className="mt-1.5 h-px w-full bg-line">
                        <motion.div
                          className="h-full bg-accent"
                          animate={{ width: `${d.peso}%` }}
                          transition={{ duration: 0.5, ease: ease.out }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contacto?${parametros.toString()}`}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 font-mono text-label uppercase text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
              >
                Afinar con el equipo
              </Link>

              <p className="mt-5 text-[11px] leading-relaxed text-faint">
                Rango de referencia en pesos mexicanos para un alcance como el descrito.
                El presupuesto real se cierra despues de la fase de descubrimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
