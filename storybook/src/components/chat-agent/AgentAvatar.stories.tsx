import type {Meta,StoryObj} from '@storybook/react';
import {AgentAvatar} from './AgentAvatar';
import {platoStates,type PlatoState} from './PlatoAvatar';
const meta={title:'Chat & Agent/Agent Avatar',component:AgentAvatar,args:{state:'ready',size:'lg',animate:true},parameters:{docs:{description:{component:'The approved image-based Plato thumbnail. Eight task-linked states, a complete plate, and quiet motion. Always pair operational status with text; the mascot alone is not a status announcement.'}}}} satisfies Meta<typeof AgentAvatar>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Ready:Story={};
export const Composing:Story={args:{state:'attentive'}};
export const Preparing:Story={args:{state:'working'}};
export const NeedsInput:Story={args:{state:'clarify'}};
export const Review:Story={args:{state:'review'}};
export const ConfirmedSave:Story={args:{state:'success',confirmedSave:true}};
export const NotConnected:Story={args:{state:'blocked'}};
export const Stopped:Story={args:{state:'paused'}};
export const MotionOff:Story={args:{animate:false}};
export const AllStates:Story={render:()=> <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:24,maxWidth:560}}>
  {(Object.keys(platoStates) as PlatoState[]).map(state=><div key={state}><AgentAvatar state={state} size="lg" confirmedSave={state==='success'}/><p style={{fontSize:13,marginTop:12}}>{platoStates[state].label}</p></div>)}
</div>};
