/** The five states any record in Mise can be in. */
export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

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
