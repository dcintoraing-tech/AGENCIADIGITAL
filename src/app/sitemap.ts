import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { proyectos } from '@/content/projects';
import { articulos } from '@/content/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const ahora = new Date();

  const fijas = ['', '/proyectos', '/servicios', '/proceso', '/nosotros', '/ideas', '/contacto'];

  return [
    ...fijas.map((ruta) => ({
      url: `${base}${ruta}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: ruta === '' ? 1 : 0.8,
    })),
    ...proyectos.map((p) => ({
      url: `${base}/proyectos/${p.slug}`,
      lastModified: ahora,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...articulos.map((a) => ({
      url: `${base}/ideas/${a.slug}`,
      lastModified: new Date(a.fecha),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
