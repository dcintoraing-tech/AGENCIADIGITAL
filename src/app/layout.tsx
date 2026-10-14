import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';
import { site } from '@/content/site';
import './globals.css';

/* Tres voces tipograficas: una grotesca apretada para la estructura, una
   monoespaciada para los datos y una romana en cursiva para el acento editorial. */
const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — ${site.eslogan}`,
    template: `%s — ${site.nombre}`,
  },
  description: site.descripcion,
  keywords: [
    'agencia digital',
    'desarrollo de software a medida',
    'sistemas empresariales',
    'automatizacion de procesos',
    'inteligencia artificial aplicada',
    'dashboards y business intelligence',
    'e-commerce',
    'integraciones de API',
  ],
  authors: [{ name: site.nombre }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: site.url,
    siteName: site.nombre,
    title: `${site.nombre} — ${site.eslogan}`,
    description: site.descripcion,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.nombre} — ${site.eslogan}`,
    description: site.descripcion,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
    { media: '(prefers-color-scheme: light)', color: '#F1EEE8' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="grain min-h-screen antialiased">
        <Providers>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[10001] focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-label focus:uppercase focus:text-bg"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
