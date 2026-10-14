import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { Proceso } from '@/components/sections/Proceso';
import { Cotizador } from '@/components/sections/Cotizador';

export const metadata: Metadata = {
  title: 'Proceso',
  description:
    'Seis fases, de descubrimiento a evolucion. Como trabaja ARQO y que se entrega en cada etapa.',
};

export default function PaginaProceso() {
  return (
    <>
      <PageHeader
        marca="Proceso"
        lineas={['Seis fases.', 'Ninguna opcional.']}
        entrada="Las dos primeras deciden si el proyecto va a servir para algo. Las cuatro siguientes solo lo ejecutan bien. Saltarse las primeras es la forma mas cara de ahorrar tiempo."
        meta={[
          { etiqueta: 'Duracion tipica', valor: '14 a 24 semanas' },
          { etiqueta: 'Ciclo de entrega', valor: '2 semanas' },
          { etiqueta: 'Acompanamiento', valor: '3 meses posteriores' },
        ]}
      />
      <Proceso />
      <Cotizador />
    </>
  );
}
