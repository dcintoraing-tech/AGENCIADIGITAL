'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Cursor } from './Cursor';
import { Intro } from './Intro';
import { SmoothScroll } from './SmoothScroll';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll>
        <Intro />
        <Cursor />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
