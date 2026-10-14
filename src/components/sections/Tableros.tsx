import { DemoDashboard } from '@/components/dashboard/DemoDashboard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

const CAPACIDADES = [
  {
    titulo: 'Indicadores con dueno',
    texto: 'Cada numero tiene una definicion escrita y una persona que responde por el.',
  },
  {
    titulo: 'Operativo, no solo ejecutivo',
    texto: 'El tablero del almacen y el del consejo salen del mismo modelo de datos.',
  },
  {
    titulo: 'Actualizado al minuto',
    texto: 'Carga incremental sobre el almacen; el cierre diario tarda menos de cinco minutos.',
  },
  {
    titulo: 'Accesos por area',
    texto: 'Cada rol ve su alcance. El control de permisos vive en la base, no en la vista.',
  },
];

export function Tableros() {
  return (
    <section id="tableros" className="pt-section">
      <div className="shell">
        <SectionHead
          marca="07 / Datos y tableros"
          lineas={['Sistemas de', 'informacion.']}
          apoyo="Este tablero funciona. Cambia el periodo, selecciona una region u ordena la tabla: es el mismo tipo de interfaz que entregamos en produccion."
        />

        <Reveal className="mt-16">
          <DemoDashboard />
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CAPACIDADES.map((c, i) => (
            <Reveal key={c.titulo} retraso={i * 0.06}>
              <h3 className="text-sm font-bold">{c.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
