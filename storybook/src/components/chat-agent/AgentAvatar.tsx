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
 * per the original 8-emotion character brief. Solid brand/600 tile, white
 * line art — no streak ring, that treatment is marketing-only (see
 * SplashWake and the Brand & Marketing Figma page).
 */
export function AgentAvatar({ emotion, size = 'md' }: AgentAvatarProps) {
  const dim = DIM[size];
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 200 200"
      role="img"
      aria-label={EMOTION_LABEL[emotion]}
      className="shrink-0"
    >
      <rect x="20" y="20" width="160" height="160" rx="32" fill="var(--mise-brand-600)" />
      {emotion === 'happy' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-happy-eye">
            <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-happy-eye">
            <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px' }} className="mise-agent-happy-plate">
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'sad' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-sad-eye-l">
            <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-sad-eye-r">
            <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
        </g>
      )}
      {emotion === 'angry' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-angry-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-angry-eye-l">
              <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-angry-eye-r">
              <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'confused' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-confused-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-confused-eye-l">
              <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-confused-eye-r">
              <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'surprised' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-surprised-eye">
            <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-surprised-eye">
            <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px' }} className="mise-agent-surprised-plate">
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'sleepy' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-sleepy-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-sleepy-eye">
              <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-sleepy-eye">
              <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'wink' && (
        <g transform="translate(30,30) scale(0.7)">
          <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-wink-eye-l">
            <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-wink-eye-r">
            <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '100px 150px', transform: 'rotate(3deg)' }}>
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
      {emotion === 'excited' && (
        <g transform="translate(30,30) scale(0.7)">
          <g className="mise-agent-excited-icon" style={{ transformOrigin: '100px 100px' }}>
            <g style={{ transformOrigin: '65px 70px' }} className="mise-agent-excited-eye">
              <line x1="65" y1="40" x2="65" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: '135px 70px' }} className="mise-agent-excited-eye">
              <line x1="135" y1="40" x2="135" y2="100" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            </g>
            <line x1="30" y1="150" x2="170" y2="150" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
            <line x1="50" y1="150" x2="62" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="150" y1="150" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <line x1="62" y1="178" x2="138" y2="178" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
    </svg>
  );
}
