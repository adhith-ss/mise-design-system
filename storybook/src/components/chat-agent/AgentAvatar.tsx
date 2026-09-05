import { useId } from 'react';
import { cx } from '../../lib/cx';

export type AgentEmotion =
  | 'happy' | 'sad' | 'angry' | 'confused' | 'surprised' | 'sleepy' | 'wink' | 'excited';

export interface AgentAvatarProps {
  /** What the agent is doing right now, expressed as one of Plato's 8 idle
   *  emotions — not a status label like AgentStatus, a face. */
  emotion: AgentEmotion;
  /** 24 / 30 / 40px — same steps as Avatar, so the two sit together in a
   *  mixed list without a visible size mismatch. */
  size?: 'sm' | 'md' | 'lg';
  /** 'solid' — brand/600 tile, white line art (default). 'bordered' — the
   *  source asset's other tile treatment: a white tile, mascot-ink line
   *  art, and a breathing brand-glow ring around the edge, for contexts
   *  that need the agent to read as "active" against a busier surface. */
  variant?: 'solid' | 'bordered';
}

const DIM = { sm: 24, md: 30, lg: 40 } as const;

const EMOTION_LABEL: Record<AgentEmotion, string> = {
  happy: 'Agent — happy', sad: 'Agent — sad', angry: 'Agent — angry',
  confused: 'Agent — confused', surprised: 'Agent — surprised', sleepy: 'Agent — sleepy',
  wink: 'Agent — wink', excited: 'Agent — excited',
};

/**
 * Plato, the agent's character, standing in for the agent the way Avatar
 * stands in for a person. Every emotion shares the exact same base
 * geometry (eyes at x=65/135, plate mouth); only the animation set differs,
 * per the original 8-emotion character brief. Both tile treatments from the
 * source asset are real variants here — 'solid' (brand/600 tile, white line
 * art) and 'bordered' (white tile, mascot-ink line art, breathing
 * brand-glow ring) — not marketing-only; SplashWake's streak stays
 * marketing-only, this is the same visual language reused product-side via
 * `--mise-mascot-ink` / `--mise-brand-glow-*`.
 */
export function AgentAvatar({ emotion, size = 'md', variant = 'solid' }: AgentAvatarProps) {
  const dim = DIM[size];
  const gradientId = useId();
  const bordered = variant === 'bordered';
  const tileFill = bordered ? '#FFFFFF' : 'var(--mise-brand-600)';
  const lineColor = bordered ? 'var(--mise-mascot-ink)' : '#FFFFFF';
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 200 200"
      role="img"
      aria-label={EMOTION_LABEL[emotion]}
      className="shrink-0"
    >
      {bordered && (
        <>
          <defs>
            <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="85" y1="0" x2="115" y2="200">
              <stop offset="0%" stopColor="var(--mise-brand-glow-start)" />
              <stop offset="100%" stopColor="var(--mise-brand-glow-end)" />
            </linearGradient>
          </defs>
          <path
            className="mise-agent-ring"
            d="M50,10 L150,10 A40,40 0 0,1 190,50 L190,150 A40,40 0 0,1 150,190 L50,190 A40,40 0 0,1 10,150 L10,50 A40,40 0 0,1 50,10 Z"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="16"
          />
        </>
      )}
      <rect x="20" y="20" width="160" height="160" rx="32" fill={tileFill} />
      {emotion === 'happy' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-happy-eye">
            <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-happy-eye">
            <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px' }} className="mise-agent-happy-plate">
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'sad' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-sad-eye-l">
            <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-sad-eye-r">
            <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
        </g>
      )}
      {emotion === 'angry' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-angry-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-angry-eye-l">
              <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-angry-eye-r">
              <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'confused' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-confused-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-confused-eye-l">
              <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-confused-eye-r">
              <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'surprised' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-surprised-eye">
            <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-surprised-eye">
            <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px' }} className="mise-agent-surprised-plate">
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'sleepy' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-sleepy-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-sleepy-eye">
              <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-sleepy-eye">
              <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'wink' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-wink-eye-l">
            <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-wink-eye-r">
            <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px', transform: 'rotate(3deg)' }}>
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'excited' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-excited-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-excited-eye">
              <line x1="65" y1="40" x2="65" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-excited-eye">
              <line x1="135" y1="40" x2="135" y2="100" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke={lineColor} strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke={lineColor} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
    </svg>
  );
}
