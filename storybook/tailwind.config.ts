import type { Config } from 'tailwindcss';

const t = (name: string) => `var(--mise-${name})`;

export default {
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: t('brand-50'), 100: t('brand-100'), 200: t('brand-200'),
          500: t('brand-500'), 600: t('brand-600'), 700: t('brand-700'),
          800: t('brand-800'), 900: t('brand-900'),
        },
        ink: {
          900: t('ink-900'), 700: t('ink-700'), 500: t('ink-500'),
          400: t('ink-400'), 300: t('ink-300'),
        },
        canvas: t('canvas'),
        surface: { DEFAULT: t('surface'), raised: t('surface-raised'), sunken: t('sunken') },
        line: { DEFAULT: t('line'), soft: t('line-soft') },
        neutral: { 200: t('neutral-200') },
        danger: { DEFAULT: t('danger'), line: t('danger-line'), border: t('danger-border') },
        warn: { DEFAULT: t('warn'), ink: t('warn-ink'), bg: t('warn-bg') },
        alert: t('alert'),
        tone: {
          'success-bg': t('tone-success-bg'), 'success-fg': t('tone-success-fg'),
          'warning-bg': t('tone-warning-bg'), 'warning-fg': t('tone-warning-fg'),
          'danger-bg': t('tone-danger-bg'), 'danger-fg': t('tone-danger-fg'),
          'info-bg': t('tone-info-bg'), 'info-fg': t('tone-info-fg'),
          'neutral-bg': t('tone-neutral-bg'), 'neutral-fg': t('tone-neutral-fg'),
        },
      },
      borderRadius: {
        sm: t('radius-sm'), md: t('radius-md'), lg: t('radius-lg'),
        xl: t('radius-xl'), pill: t('radius-pill'), control: t('radius-control'),
      },
      boxShadow: {
        popover: t('shadow-popover'),
        overlay: t('shadow-overlay'),
        raised: t('shadow-raised'),
      },
      fontFamily: {
        sans: [t('font-sans')],
        data: [t('font-data')],
      },
      height: { sm: t('control-sm'), md: t('control-md'), lg: t('control-lg') },
      transitionTimingFunction: { mise: t('ease') },
      transitionDuration: { fast: '120ms', base: '180ms' },
    },
  },
  plugins: [],
} satisfies Config;
