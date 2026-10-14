import { Hero } from '@/components/sections/Hero';
import { Cinta, Manifiesto } from '@/components/sections/Manifiesto';
import { Servicios } from '@/components/sections/Servicios';
import { Proyectos } from '@/components/sections/Proyectos';
import { Proceso } from '@/components/sections/Proceso';
import { Tecnologia } from '@/components/sections/Tecnologia';
import { Automatizacion } from '@/components/sections/Automatizacion';
import { Tableros } from '@/components/sections/Tableros';
import { Metricas } from '@/components/sections/Metricas';
import { Testimonios } from '@/components/sections/Testimonios';
import { Estudio } from '@/components/sections/Estudio';
import { Cotizador } from '@/components/sections/Cotizador';
import { Ideas } from '@/components/sections/Ideas';

export default function Inicio() {
  return (
    <>
      <Hero />
      <Cinta />
      <Manifiesto />
      <Servicios />
      <Proyectos />
      <Proceso />
      <Tecnologia />
      <Automatizacion />
      <Tableros />
      <Metricas />
      <Testimonios />
      <Estudio />
      <Cotizador />
      <Ideas />
    </>
  );
}
