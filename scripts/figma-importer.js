/* Appends new release pages only. Never overwrites baseline components or publishes. */
figma.showUI(`<html><body style="font:14px system-ui;padding:20px;color:#272e2a">
<h2>Mise DLS 0.2.0-rc.1</h2>
<p>Open Mise_DLS before continuing. This adds release-candidate foundations, native control specimens, Basil icons and approved artwork on new pages. Existing pages remain unchanged.</p>
<p>This is not a complete component migration or a saved Figma version. Review, reconcile component bindings, then create a named version manually.</p>
<button id="import" style="padding:12px;background:#304b3d;color:white;border:0;border-radius:6px">Add release candidate pages</button>
<p id="status" role="status"></p>
<script>document.getElementById('import').onclick=()=>{document.getElementById('import').disabled=true;parent.postMessage({pluginMessage:{type:'import'}},'*')};onmessage=e=>{document.getElementById('status').textContent=e.data.pluginMessage||''}</script>
</body></html>`,{width:440,height:330});
function color(hex){const h=hex.replace('#','');return {r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255};}
function paint(hex){return [{type:'SOLID',color:color(hex)}];}
async function text(parent,value,x,y,size=14,weight='Regular',fill='#272e2a',width=800){
  const n=figma.createText();parent.appendChild(n);n.fontName={family:'Manrope',style:weight};n.characters=value;n.fontSize=size;n.fills=paint(fill);n.x=x;n.y=y;n.resize(width,n.height);n.textAutoResize='HEIGHT';return n;
}
function rectangle(parent,x,y,w,h,fill,radius=6){const n=figma.createRectangle();parent.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=paint(fill);n.cornerRadius=radius;return n;}
function page(name){const n=figma.createPage();n.name=name;return n;}
async function imageComponent(parent,name,base64,x,y,size){
  const c=figma.createComponent();parent.appendChild(c);c.name=name;c.resize(size,size);c.x=x;c.y=y;c.fills=[];
  const image=figma.createImage(figma.base64Decode(base64));const r=figma.createRectangle();c.appendChild(r);r.resize(size,size);r.fills=[{type:'IMAGE',imageHash:image.hash,scaleMode:'FIT'}];return c;
}
figma.ui.onmessage=async msg=>{
  if(msg.type!=='import')return;
  try{
    if(figma.fileKey && figma.fileKey!=='OYSStcuycsv9G63w7TC1uc')throw new Error('Open the canonical Mise_DLS file before importing.');
    await figma.loadAllPagesAsync();
    if(figma.root.children.some(p=>p.name==='0.2.0-rc.1 / Foundations'))throw new Error('Release pages already exist. Review them instead of importing twice.');
    await Promise.all(['Regular','Medium','SemiBold','Bold'].map(style=>figma.loadFontAsync({family:'Manrope',style})));
    const foundations=page('0.2.0-rc.1 / Foundations');
    await text(foundations,'Mise DLS · 0.2.0-rc.1',0,0,32,'Bold');
    await text(foundations,'RELEASE CANDIDATE · Accessibility validation and component reconciliation required',0,52,14);
    for(const [theme,values] of Object.entries(DATA.tokens.themes)){
      const x=theme==='light'?0:1000;
      const frame=figma.createFrame();foundations.appendChild(frame);frame.name=theme;frame.x=x;frame.y=120;frame.resize(930,1700);frame.fills=paint(values.surface);
      await text(frame,`${theme} theme`,24,24,24,'Bold',values['ink-900']);
      const collection=figma.variables.createVariableCollection(`Mise 0.2.0-rc.1 / ${theme}`);
      let row=0;
      for(const [key,value] of Object.entries(values)){
        if(!/^#[0-9a-fA-F]{6}$/.test(value))continue;
        const variable=figma.variables.createVariable(key,collection,'COLOR');variable.setValueForMode(collection.defaultModeId,color(value));
        const xx=24+(row%3)*300,yy=80+Math.floor(row/3)*68;
        rectangle(frame,xx,yy,32,32,value);
        await text(frame,`${key}\n${value}`,xx+44,yy,13,'Regular',values['ink-900'],235);row++;
      }
    }
    const typography=page('0.2.0-rc.1 / Type and controls');
    let y=0;
    for(const [role,size] of [['Metadata',13],['Body',14],['Section',18],['Page title',32],['Metric',36]]){
      const style=figma.createTextStyle();style.name=`Mise 0.2.0-rc.1/${role}`;style.fontName={family:'Manrope',style:'Medium'};style.fontSize=size;
      await text(typography,`${role} · ${size}px · Menu margin 76.2%`,0,y,size,'Medium');y+=70;
    }
    await text(typography,'13 px floor. Page titles: 24–32 px; metrics: 28–36 px. Figma specimens show the upper bound; CSS uses rem-based clamp().',0,y,14);y+=90;
    for(const [theme,t] of Object.entries(DATA.tokens.themes)){
      const x=theme==='light'?0:700;const variants=[];
      for(const [index,state] of ['Rest','Hover','Focus','Disabled'].entries()){
        const c=figma.createComponent();typography.appendChild(c);c.name=`State=${state}`;c.x=x+index*160;c.y=y;c.resize(140,40);c.cornerRadius=6;c.fills=paint(state==='Hover'?t['action-hover']:t.action);
        if(state==='Focus'){c.strokes=paint(t['focus-border']);c.strokeWeight=2;c.effects=[{type:'DROP_SHADOW',color:{...color(t['focus-halo']),a:1},offset:{x:0,y:0},radius:0,spread:3,visible:true,blendMode:'NORMAL'}];}
        if(state==='Disabled')c.opacity=.4;
        await text(c,'Save changes',12,10,13,'Bold',t['on-action'],116);variants.push(c);
      }
      const set=figma.combineAsVariants(variants,typography);set.name=`Mise 0.2.0-rc.1 / Button / ${theme}`;set.description='Primary button specimens. Bind semantic variables and reconcile production variants before publishing.';
      const input=figma.createComponent();typography.appendChild(input);input.name=`Mise 0.2.0-rc.1 / Field / ${theme}`;input.x=x;input.y=y+120;input.resize(320,106);input.fills=paint(t.surface);
      await text(input,'Reason for change',0,0,13,'Bold',t['ink-900'],320);
      const box=rectangle(input,0,28,320,44,t.surface);box.strokes=paint(t['control-border']);
      await text(input,'Explain the cost adjustment',12,41,14,'Regular',t['ink-500'],296);
      await text(input,'Required before approval.',0,82,13,'Regular',t['ink-500'],320);
    }
    const iconPage=page('0.2.0-rc.1 / Basil icons');
    await text(iconPage,'Basil · green-only product icons',0,0,28,'Bold');
    await text(iconPage,'Craftwork · CC BY 4.0 · Original geometry preserved. Decorative icons are hidden from assistive technology.',0,48,13);
    let i=0;
    for(const [name,paths] of Object.entries(DATA.icons)){
      const c=figma.createComponent();iconPage.appendChild(c);c.name=`Basil/${name}`;c.resize(24,24);c.x=(i%12)*150;c.y=100+Math.floor(i/12)*90;c.fills=[];
      const svg=figma.createNodeFromSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${paths.replaceAll('currentColor','#1E6B4B')}</svg>`);c.appendChild(svg);svg.x=0;svg.y=0;
      await text(iconPage,name,c.x,c.y+32,13,'Regular','#43524b',140);i++;
    }
    const art=page('0.2.0-rc.1 / Workflow artwork');
    await text(art,'Approved workflow artwork and Plato',0,0,28,'Bold');i=0;
    for(const [name,data] of Object.entries(DATA.assets)){
      if(name.startsWith('plato/')&&!name.endsWith('thumbnail.png'))continue;
      const x=(i%5)*260,yy=90+Math.floor(i/5)*260;
      await imageComponent(art,name.replace('.png',''),data,x,yy,200);
      await text(art,name,x,yy+210,13,'Regular','#43524b',240);i++;
    }
    await text(art,'Plato: Ready · Composing · Preparing · Needs input · Review · Saved · Not connected · Stopped.\nUse the supplied layered animation in code. Figma artwork is static; do not imply animated state variants were imported.',0,90+Math.ceil(i/5)*260,14,'Regular','#43524b',1050);
    await figma.setCurrentPageAsync(foundations);figma.viewport.scrollAndZoomIntoView(foundations.children);
    figma.ui.postMessage('Release pages added. Review and reconcile, then save a named Figma version. No baseline pages changed; no library published.');
  }catch(error){figma.ui.postMessage(`Import stopped: ${error.message}. Check for partially added release pages before retrying.`);}
};
