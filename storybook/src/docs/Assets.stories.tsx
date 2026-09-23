import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BasilIcon, basilNames } from '../icons/basil';

const meta = {title:'Foundations/Asset library', parameters:{layout:'padded'}, tags:['autodocs']} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function Catalogue() {
  const [query,setQuery]=useState('');
  return <section style={{maxWidth:1100}}>
    <h1 style={{fontSize:24,fontWeight:700}}>Basil icon library</h1>
    <p style={{margin:'12px 0'}}>Green-only interface icons. Use Plato for agent identity.</p>
    <label htmlFor="icon-search">Find an icon</label>
    <input id="icon-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name" style={{display:'block',padding:10,border:'1px solid',borderRadius:6,margin:'8px 0 20px'}}/>
    <p role="status">{basilNames.filter(n=>n.includes(query.toLowerCase())).length} icons</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:12}}>
      {basilNames.filter(n=>n.includes(query.toLowerCase())).map(name=><div key={name} style={{padding:16,border:'1px solid var(--mise-line)',borderRadius:6,color:'var(--mise-brand-600)'}}><BasilIcon name={name} size={24}/><div style={{fontSize:13,marginTop:8,overflowWrap:'anywhere',color:'var(--mise-ink-700)'}}>{name}</div></div>)}
    </div>
    <p style={{marginTop:20}}>Basil by Craftwork, CC BY 4.0. Attribution accompanies the assets.</p>
  </section>
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
