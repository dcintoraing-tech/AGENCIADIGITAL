'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { ArqoMark } from '@/components/ui/Logo';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

const TIPOS = [
  { valor: 'sitio', etiqueta: 'Sitio web' },
  { valor: 'sistema', etiqueta: 'Sistema' },
  { valor: 'ecommerce', etiqueta: 'E-commerce' },
  { valor: 'automatizacion', etiqueta: 'Automatizacion' },
  { valor: 'ia', etiqueta: 'Inteligencia artificial' },
  { valor: 'dashboard', etiqueta: 'Dashboard' },
  { valor: 'otro', etiqueta: 'Otro' },
];

const PRESUPUESTOS = [
  'Menos de 150 000',
  '150 000 a 400 000',
  '400 000 a 900 000',
  'Mas de 900 000',
  'Todavia no lo se',
];

type Campos = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  tipo: string;
  presupuesto: string;
  mensaje: string;
};

const VACIO: Campos = {
  nombre: '',
  empresa: '',
  correo: '',
  telefono: '',
  tipo: '',
  presupuesto: '',
  mensaje: '',
};

type Errores = Partial<Record<keyof Campos, string>>;

/** Misma regla que aplica el servidor; aqui solo adelanta el aviso. */
const validar = (c: Campos): Errores => {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = 'Falta tu nombre.';
  if (!c.correo.trim()) e.correo = 'Falta el correo.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.correo.trim()))
    e.correo = 'Ese correo no parece valido.';
  if (!c.tipo) e.tipo = 'Elige el tipo de proyecto.';
  if (c.mensaje.trim().length < 20)
    e.mensaje = 'Cuentanos un poco mas: al menos veinte caracteres.';
  return e;
};

/** Campo de texto con etiqueta monoespaciada y linea inferior. */
function Campo({
  etiqueta,
  nombre,
  valor,
  error,
  alCambiar,
  tipo = 'text',
  requerido,
  autoComplete,
  area,
}: {
  etiqueta: string;
  nombre: keyof Campos;
  valor: string;
  error?: string;
  alCambiar: (v: string) => void;
  tipo?: string;
  requerido?: boolean;
  autoComplete?: string;
  area?: boolean;
}) {
  const id = useId();
  const idError = `${id}-error`;
  const comun = cn(
    'mt-3 w-full border-0 border-b bg-transparent pb-3 text-lead text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-ink',
    error ? 'border-accent' : 'border-line',
  );

  return (
    <div>
      <label htmlFor={id} className="eyebrow">
        {etiqueta}
        {requerido && <span className="ml-1 text-accent">*</span>}
      </label>

      {area ? (
        <textarea
          id={id}
          name={nombre}
          rows={5}
          value={valor}
          onChange={(e) => alCambiar(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? idError : undefined}
          className={cn(comun, 'resize-y leading-relaxed')}
        />
      ) : (
        <input
          id={id}
          name={nombre}
          type={tipo}
          value={valor}
          autoComplete={autoComplete}
          onChange={(e) => alCambiar(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? idError : undefined}
          className={comun}
        />
      )}

      {error && (
        <p
          id={idError}
          className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function FormularioContacto() {
  const parametros = useSearchParams();
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<'inicial' | 'enviando' | 'listo' | 'error'>('inicial');

  // El cotizador llega aqui con el tipo y el rango ya elegidos.
  useEffect(() => {
    const tipo = parametros.get('tipo');
    const presupuesto = parametros.get('presupuesto');
    if (!tipo && !presupuesto) return;
    setCampos((c) => ({
      ...c,
      tipo: tipo && TIPOS.some((t) => t.valor === tipo) ? tipo : c.tipo,
      mensaje: presupuesto
        ? `Vengo del cotizador con una estimacion de ${presupuesto}. `
        : c.mensaje,
    }));
  }, [parametros]);

  const set = (k: keyof Campos) => (v: string) => {
    setCampos((c) => ({ ...c, [k]: v }));
    setErrores((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const enviar = async (evento: React.FormEvent) => {
    evento.preventDefault();
    const e = validar(campos);
    setErrores(e);
    if (Object.keys(e).length > 0) {
      document
        .getElementById('form-contacto')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setEstado('enviando');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(campos),
      });
      if (!r.ok) throw new Error('respuesta no valida');
      setEstado('listo');
    } catch {
      setEstado('error');
    }
  };

  return (
    <div id="form-contacto" className="scroll-mt-[calc(var(--nav-h)+2rem)]">
      <AnimatePresence mode="wait">
        {estado === 'listo' ? (
          <motion.div
            key="confirmacion"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.out }}
            className="border border-line p-10 lg:p-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.1 }}
            >
              <ArqoMark className="h-16 w-16 text-accent" />
            </motion.div>

            <h2 className="mt-10 text-d3 font-bold">Recibido, {campos.nombre.split(' ')[0]}.</h2>
            <p className="mt-6 max-w-prose text-lead text-muted">
              Lo leera una persona del equipo, no un filtro automatico. Respondemos en menos de
              24 horas habiles con una primera lectura del problema.
            </p>

            <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
              {[
                { t: 'Hoy', d: 'Leemos el brief y revisamos si falta contexto.' },
                { t: 'En 24 h', d: 'Respondemos con dudas concretas y una primera lectura.' },
                { t: 'Esta semana', d: 'Llamada de 45 minutos para acotar el alcance.' },
              ].map((p, i) => (
                <li key={p.t} className="bg-bg p-6">
                  <span className="font-mono text-label uppercase text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-5 block text-sm font-bold">{p.t}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{p.d}</span>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => {
                setCampos(VACIO);
                setEstado('inicial');
              }}
              className="link-line mt-12 font-mono text-label uppercase text-ink"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="formulario"
            onSubmit={enviar}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <Campo
                etiqueta="Nombre"
                nombre="nombre"
                valor={campos.nombre}
                error={errores.nombre}
                alCambiar={set('nombre')}
                autoComplete="name"
                requerido
              />
              <Campo
                etiqueta="Empresa"
                nombre="empresa"
                valor={campos.empresa}
                alCambiar={set('empresa')}
                autoComplete="organization"
              />
              <Campo
                etiqueta="Correo"
                nombre="correo"
                tipo="email"
                valor={campos.correo}
                error={errores.correo}
                alCambiar={set('correo')}
                autoComplete="email"
                requerido
              />
              <Campo
                etiqueta="Telefono"
                nombre="telefono"
                tipo="tel"
                valor={campos.telefono}
                alCambiar={set('telefono')}
                autoComplete="tel"
              />
            </div>

            <fieldset>
              <legend className="eyebrow">
                Tipo de proyecto<span className="ml-1 text-accent">*</span>
              </legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {TIPOS.map((t) => (
                  <button
                    key={t.valor}
                    type="button"
                    onClick={() => set('tipo')(t.valor)}
                    aria-pressed={campos.tipo === t.valor}
                    className={cn(
                      'border px-5 py-3 font-mono text-label uppercase transition-colors duration-300',
                      campos.tipo === t.valor
                        ? 'border-ink bg-ink text-bg'
                        : 'border-line text-muted hover:border-ink hover:text-ink',
                    )}
                  >
                    {t.etiqueta}
                  </button>
                ))}
              </div>
              {errores.tipo && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {errores.tipo}
                </p>
              )}
            </fieldset>

            <fieldset>
              <legend className="eyebrow">Presupuesto aproximado (MXN)</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {PRESUPUESTOS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set('presupuesto')(campos.presupuesto === p ? '' : p)}
                    aria-pressed={campos.presupuesto === p}
                    className={cn(
                      'border px-5 py-3 font-mono text-label uppercase transition-colors duration-300',
                      campos.presupuesto === p
                        ? 'border-accent text-ink'
                        : 'border-line text-muted hover:border-ink hover:text-ink',
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <Campo
              etiqueta="Cuentanos sobre el proyecto"
              nombre="mensaje"
              valor={campos.mensaje}
              error={errores.mensaje}
              alCambiar={set('mensaje')}
              area
              requerido
            />

            <div className="flex flex-wrap items-center gap-6 border-t border-line pt-10">
              <Boton type="submit" tamano="grande" magnetico disabled={estado === 'enviando'}>
                {estado === 'enviando' ? 'Enviando' : 'Iniciar proyecto'}
              </Boton>

              <p className="max-w-[40ch] text-[11px] leading-relaxed text-faint">
                Los campos marcados con asterisco son obligatorios. Nunca compartimos tus datos
                con terceros.
              </p>
            </div>

            {estado === 'error' && (
              <p role="alert" className="border border-accent p-5 text-sm text-ink">
                No pudimos enviar el mensaje. Escribenos directamente a{' '}
                <a href="mailto:proyectos@arqo.studio" className="link-line">
                  proyectos@arqo.studio
                </a>
                .
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
