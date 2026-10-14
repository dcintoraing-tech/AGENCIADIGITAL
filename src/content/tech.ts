export type Tecnologia = {
  nombre: string;
  capa: Capa;
  rol: string;
  /** Desde que ano forma parte del repertorio del estudio. */
  desde: number;
  proyectos: number;
};

export type Capa = 'Interfaz' | 'Servidor' | 'Datos' | 'Inteligencia' | 'Infraestructura';

export const capas: Capa[] = ['Interfaz', 'Servidor', 'Datos', 'Inteligencia', 'Infraestructura'];

export const tecnologias: Tecnologia[] = [
  { nombre: 'React', capa: 'Interfaz', rol: 'Base de toda interfaz que construimos.', desde: 2018, proyectos: 35 },
  { nombre: 'Next.js', capa: 'Interfaz', rol: 'Renderizado en servidor y rutas de aplicacion.', desde: 2019, proyectos: 31 },
  { nombre: 'TypeScript', capa: 'Interfaz', rol: 'Tipado estricto de punta a punta. No negociable.', desde: 2019, proyectos: 33 },
  { nombre: 'Tailwind CSS', capa: 'Interfaz', rol: 'Sistema de estilos con restricciones explicitas.', desde: 2021, proyectos: 27 },
  { nombre: 'React Native', capa: 'Interfaz', rol: 'Aplicaciones moviles cuando el navegador no alcanza.', desde: 2021, proyectos: 6 },

  { nombre: 'Node.js', capa: 'Servidor', rol: 'Servicios y capas de integracion.', desde: 2018, proyectos: 29 },
  { nombre: 'Python', capa: 'Servidor', rol: 'Procesamiento de datos, modelos y automatizacion.', desde: 2018, proyectos: 22 },
  { nombre: 'FastAPI', capa: 'Servidor', rol: 'Servicios de datos y de inferencia.', desde: 2021, proyectos: 11 },

  { nombre: 'PostgreSQL', capa: 'Datos', rol: 'La base por defecto. Casi siempre es suficiente.', desde: 2018, proyectos: 32 },
  { nombre: 'Supabase', capa: 'Datos', rol: 'Autenticacion, almacenamiento y tiempo real.', desde: 2022, proyectos: 18 },
  { nombre: 'Redis', capa: 'Datos', rol: 'Cache, colas y bloqueos de concurrencia.', desde: 2020, proyectos: 14 },
  { nombre: 'Power BI', capa: 'Datos', rol: 'Tableros para direcciones que ya viven en Microsoft.', desde: 2020, proyectos: 13 },

  { nombre: 'Claude', capa: 'Inteligencia', rol: 'Lectura de documentos y asistentes internos.', desde: 2024, proyectos: 9 },
  { nombre: 'OpenAI', capa: 'Inteligencia', rol: 'Clasificacion, resumen y busqueda semantica.', desde: 2023, proyectos: 11 },
  { nombre: 'scikit-learn', capa: 'Inteligencia', rol: 'Modelos tabulares de prediccion y segmentacion.', desde: 2019, proyectos: 8 },
  { nombre: 'pgvector', capa: 'Inteligencia', rol: 'Busqueda semantica sin salir de PostgreSQL.', desde: 2023, proyectos: 7 },

  { nombre: 'Vercel', capa: 'Infraestructura', rol: 'Despliegue y red de distribucion.', desde: 2020, proyectos: 26 },
  { nombre: 'Docker', capa: 'Infraestructura', rol: 'Paridad entre desarrollo y produccion.', desde: 2019, proyectos: 24 },
  { nombre: 'GitHub Actions', capa: 'Infraestructura', rol: 'Integracion y despliegue continuo.', desde: 2020, proyectos: 28 },
  { nombre: 'Grafana', capa: 'Infraestructura', rol: 'Monitoreo, trazas y alertas.', desde: 2021, proyectos: 15 },
];

export const tecnologiaTitulo = 'Las herramientas cambian. La ingenieria permanece.';

export const tecnologiaIntro =
  'No elegimos tecnologia por novedad. La elegimos porque alguien va a tener que mantenerla dentro de cinco anos, y ese alguien puede no ser nosotros.';
