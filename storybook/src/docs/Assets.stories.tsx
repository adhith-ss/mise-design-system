import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BasilIcon, basilNames } from '../icons/basil';

const meta = {title:'Foundations/Asset library', parameters:{layout:'padded'}, tags:['autodocs']} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

// Grouped catalogue. Every glyph on this page ships in the app; the reserve
// group covers agent-first flows the docs describe (Plato, sources, drafts,
// simulations, history) that are not fully wired in the current release.
const groups: Record<string, string[]> = {
  Navigation: [
    'caret-down-outline','caret-up-outline','caret-right-outline','caret-left-outline',
    'arrow-right-outline','cross-outline','check-outline','plus-outline','other-1-outline','rows-outline'
  ],
  Workflow: [
    'search-outline','settings-outline','settings-adjust-outline','reply-outline',
    'checked-box-outline','clock-outline','calendar-outline','document-outline','invoice-outline'
  ],
  Domain: [
    'bank-outline','book-open-outline','bookmark-outline','box-outline','card-outline',
    'shopping-cart-outline','phone-outline','dialpad-outline'
  ],
  Feedback: [
    'info-circle-outline','info-triangle-outline','lightbulb-outline','comment-outline'
  ],
  'Agent reserve': [
    'user-outline','lock-outline','refresh-outline','send-outline',
    'pause-outline','play-outline','eye-outline','edit-outline','copy-outline',
    'download-outline','upload-outline','trash-outline','history-outline',
    'chart-pie-outline','filter-outline','star-outline','cross-solid'
  ],
};

function Catalogue() {
  const [query,setQuery]=useState('');
  const q = query.toLowerCase().trim();
  const filteredGroups = Object.entries(groups).map(([g,list]) => [g, list.filter(n => n.includes(q))] as const).filter(([,list]) => list.length);
  const total = filteredGroups.reduce((n, [,list]) => n + list.length, 0);
  return <section style={{maxWidth:1100}}>
    <h1 style={{fontSize:24,fontWeight:700}}>Basil icon library · Mise set</h1>
    <p style={{margin:'12px 0'}}>Green-only interface icons, pruned to the glyphs Mise ships plus a small reserve for agent-first flows. Use Plato for agent identity, never a Basil glyph.</p>
    <ul style={{margin:'12px 0 20px',paddingLeft:'1.2em',lineHeight:1.6}}>
      <li>Every icon is available as a named export from <code>@mise/dls/icons</code> and by name via <code>BasilIcon</code>.</li>
      <li>Reserve glyphs live in the library so the next agent flow does not require another library edit.</li>
      <li>Aliases (<code>ChevronDown</code>, <code>Trash</code>, <code>Refresh</code>, etc.) keep authoring calm; direct <code>name</code> access still works.</li>
    </ul>
    <label htmlFor="icon-search">Find an icon</label>
    <input id="icon-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name" style={{display:'block',padding:10,border:'1px solid',borderRadius:6,margin:'8px 0 20px',minWidth:280,fontSize:13}}/>
    <p role="status" style={{fontSize:13}}>{total} of {basilNames.length} icons shown</p>
    {filteredGroups.map(([g,list]) => <div key={g} style={{marginTop:24}}>
      <h2 style={{fontSize:16,fontWeight:600,margin:'0 0 12px'}}>{g}</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:12}}>
        {list.map(name => <div key={name} style={{padding:16,border:'1px solid var(--mise-line)',borderRadius:6,color:'var(--mise-brand-600)'}}>
          <BasilIcon name={name as never} size={24}/>
          <div style={{fontSize:13,marginTop:8,overflowWrap:'anywhere',color:'var(--mise-ink-700)'}}>{name}</div>
        </div>)}
      </div>
    </div>)}
    <p style={{marginTop:24,fontSize:13}}>Basil by Craftwork, CC BY 4.0. Attribution accompanies the assets.</p>
  </section>;
}
export const BasilCatalogue: Story = {render:()=> <Catalogue/>};

const illustrations = [
  ['first-import','Before the first import','Introduce the required source and show Import data.'],
  ['first-forecast','Before the first scenario','Introduce a scenario without implying a prediction.'],
  ['snapshot-saved','Snapshot saved','Show once after a confirmed save, alongside its timestamp.'],
  ['upload-success','Upload checked','Only after validation; distinguish staged from applied.'],
  ['approval','Plan approved','Only after explicit approval succeeds.'],
  ['queue-clear','No decisions to review','Keep History available.'],
  ['history-empty','No activity yet','Explain which actions appear here.'],
  ['inspect-data','Data needs attention','Show the error and recovery action beside the image.'],
  ['loading','Loading','Keep a textual status and cancellation when applicable.'],
  ['page-down','Page unavailable','Keep a retry or navigation action visible.']
];
export const WorkflowIllustrations: Story = {render:()=> <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:24,maxWidth:1100}}>{illustrations.map(([file,title,usage])=><figure key={file} style={{border:'1px solid var(--mise-line)',padding:20,borderRadius:12}}><img src={`./illustrations/${file}.png`} alt="" style={{width:160,height:130,objectFit:'contain'}}/><figcaption><strong>{title}</strong><p style={{fontSize:13,marginTop:8}}>{usage}</p></figcaption></figure>)}</div>};
