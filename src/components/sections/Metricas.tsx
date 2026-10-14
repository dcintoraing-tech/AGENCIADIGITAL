import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { metricas } from '@/content/site';

export function Metricas() {
  return (
    <section className="pt-section">
      <div className="shell">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((m, i) => (
            <Reveal key={m.etiqueta} retraso={i * 0.08} className="bg-bg px-6 py-10 lg:px-8 lg:py-14">
              <Counter
                valor={m.valor}
                sufijo={m.sufijo}
                className="block text-d2 font-bold leading-none"
              />
              <span className="mt-6 block text-sm font-bold">{m.etiqueta}</span>
              <span className="mt-1.5 block text-[11px] leading-relaxed text-faint">{m.nota}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
