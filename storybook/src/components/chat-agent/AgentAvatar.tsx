import { PlatoAvatar, type PlatoState } from './PlatoAvatar';
export type AgentEmotion='happy'|'sad'|'angry'|'confused'|'surprised'|'sleepy'|'wink'|'excited';
export interface AgentAvatarProps {
  state?:PlatoState;
  /** Deprecated compatibility only. New consumers use task states. */
  emotion?:AgentEmotion;
  size?:'sm'|'md'|'lg';
  /** Deprecated. The approved image tile is the only product appearance. */
  variant?:'solid'|'bordered';
  animate?:boolean;
  confirmedSave?:boolean;
}
const map:Record<AgentEmotion,PlatoState>={happy:'ready',sad:'blocked',angry:'blocked',confused:'clarify',surprised:'review',sleepy:'paused',wink:'ready',excited:'ready'};
export function AgentAvatar({state,emotion,size='md',animate=true,confirmedSave=false}:AgentAvatarProps){
  return <PlatoAvatar state={state??(emotion?map[emotion]:'ready')} size={{sm:24,md:32,lg:48}[size]} animate={animate} celebrate={confirmedSave} labelled/>;
}
