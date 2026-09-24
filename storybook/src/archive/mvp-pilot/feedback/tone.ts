import { CheckCircle2, AlertTriangle, AlertOctagon, Info, Circle, type LucideIcon } from 'lucide-react';

/** The five states any record in Mise can be in. */
export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export const TONE_ICON: Record<Tone, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertOctagon,
  info: Info,
  neutral: Circle,
};

/** Tinted background + border, shared by Banner and Toast. */
export const TONE_BG: Record<Tone, string> = {
  success: 'border-brand-200 bg-tone-success-bg',
  warning: 'border-warn bg-tone-warning-bg',
  danger: 'border-danger-line bg-tone-danger-bg',
  info: 'border-line bg-tone-info-bg',
  neutral: 'border-line bg-tone-neutral-bg',
};

/** The colour the Card/Banner streak border rotates through, per tone. */
export const TONE_STREAK: Record<Tone, string> = {
  success: 'var(--mise-brand-600)',
  warning: 'var(--mise-warn)',
  danger: 'var(--mise-danger)',
  info: 'var(--mise-tone-info-fg)',
  neutral: 'var(--mise-ink-500)',
};

export const TONE_SUBTLE: Record<Tone, string> = {
  success: 'bg-tone-success-bg text-tone-success-fg',
  warning: 'bg-tone-warning-bg text-tone-warning-fg',
  danger: 'bg-tone-danger-bg text-tone-danger-fg',
  info: 'bg-tone-info-bg text-tone-info-fg',
  neutral: 'bg-tone-neutral-bg text-tone-neutral-fg',
};

export const TONE_FG: Record<Tone, string> = {
  success: 'text-tone-success-fg',
  warning: 'text-tone-warning-fg',
  danger: 'text-tone-danger-fg',
  info: 'text-tone-info-fg',
  neutral: 'text-tone-neutral-fg',
};

export const TONE_DOT: Record<Tone, string> = {
  success: 'bg-tone-success-fg',
  warning: 'bg-tone-warning-fg',
  danger: 'bg-tone-danger-fg',
  info: 'bg-tone-info-fg',
  neutral: 'bg-tone-neutral-fg',
};
