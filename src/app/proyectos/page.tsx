import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { Proyectos } from '@/components/sections/Proyectos';
import { Metricas } from '@/components/sections/Metricas';
import { proyectos } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Casos de estudio de ARQO: comercio, sistemas internos, hospitalidad, inmobiliaria, fitness y SaaS.',
};

export default function PaginaProyectos() {
  const industrias = new Set(proyectos.map((p) => p.industria.split(' / ')[0]));

  return (
    <>
      <PageHeader
        marca="Proyectos"
        lineas={['Seis sistemas', 'en produccion.']}
        entrada="Cada caso empieza igual: una operacion que crecio mas rapido que sus herramientas. Lo que cambia es la industria y lo que estaba en juego."
        meta={[
          { etiqueta: 'Casos publicados', valor: String(proyectos.length) },
          { etiqueta: 'Industrias', valor: String(industrias.size) },
          { etiqueta: 'Periodo', valor: '2023 — 2025' },
        ]}
      />
      <Proyectos />
      <Metricas />
    </>
  );
}
