import type { Config } from 'tailwindcss';

const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: withAlpha('--c-bg'),
        surface: withAlpha('--c-surface'),
        raised: withAlpha('--c-raised'),
        line: withAlpha('--c-line'),
        ink: withAlpha('--c-ink'),
        muted: withAlpha('--c-muted'),
        faint: withAlpha('--c-faint'),
        accent: withAlpha('--c-accent'),
        'accent-ink': withAlpha('--c-accent-ink'),
        blueprint: withAlpha('--c-blueprint'),
      },
      fontFamily: {
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Escala fluida — el salto tipografico es el eje del diseno editorial.
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        d1: ['clamp(3.25rem, 11.5vw, 11rem)', { lineHeight: '0.86', letterSpacing: '-0.045em' }],
        d2: ['clamp(2.5rem, 7.5vw, 6.5rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        d3: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        d4: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.0625rem, 1.6vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
      },
      maxWidth: { shell: '96rem', prose: '68ch' },
      spacing: { gutter: 'var(--gutter)', section: 'clamp(5rem, 11vw, 10rem)' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        inout: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        sweep: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(300%)' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        blink: 'blink 1.1s step-end infinite',
        sweep: 'sweep 3.6s cubic-bezier(0.76,0,0.24,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
