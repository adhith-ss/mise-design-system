/* Additive Figma actions for Mise DLS 0.2.0-rc.1. Never publishes. Never deletes. */
figma.showUI(`<html><body style="font:14px system-ui;padding:20px;color:#272e2a;line-height:1.45">
<h2 style="margin:0 0 8px;font-size:16px">Mise DLS 0.2.0-rc.1</h2>
<p style="margin:0 0 12px;font-size:13px">Open Mise_DLS. Actions are additive and idempotent where noted. Never publishes. Never deletes.</p>
<button id="import" style="display:block;width:100%;padding:12px;margin:0 0 8px;background:#304b3d;color:white;border:0;border-radius:6px;font-size:13px;font-weight:600">Add release candidate pages</button>
<button id="archive" style="display:block;width:100%;padding:12px;margin:0 0 8px;background:#43524b;color:white;border:0;border-radius:6px;font-size:13px;font-weight:600">Archive current set as MVP Pilot</button>
<button id="patterns" style="display:block;width:100%;padding:12px;margin:0 0 8px;background:#1e6b4b;color:white;border:0;border-radius:6px;font-size:13px;font-weight:600">Add patterns page</button>
<button id="patterns-update" style="display:block;width:100%;padding:12px;margin:0 0 8px;background:#607940;color:white;border:0;border-radius:6px;font-size:13px;font-weight:600">Update patterns page</button>
<p id="status" role="status" style="font-size:13px;min-height:2.5em"></p>
<script>
const post=type=>{document.querySelectorAll('button').forEach(b=>b.disabled=true);parent.postMessage({pluginMessage:{type}},'*')};
document.getElementById('import').onclick=()=>post('import');
document.getElementById('archive').onclick=()=>post('archive');
document.getElementById('patterns').onclick=()=>post('patterns');
document.getElementById('patterns-update').onclick=()=>post('patterns-update');
onmessage=e=>{document.getElementById('status').textContent=e.data.pluginMessage||'';document.querySelectorAll('button').forEach(b=>b.disabled=false)};
</script>
</body></html>`,{width:440,height:420});

function parseColor(value){
  const v=String(value).trim();
  if(/^#[0-9a-fA-F]{6}$/.test(v)){
    const h=v.slice(1);
    return {r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255,a:1};
  }
  const rgba=v.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if(rgba){
    return {r:Number(rgba[1])/255,g:Number(rgba[2])/255,b:Number(rgba[3])/255,a:rgba[4]===undefined?1:Number(rgba[4])};
  }
  return null;
}
function isColorValue(value){return Boolean(parseColor(value));}
function color(value){
  const parsed=parseColor(value);
  if(!parsed)throw new Error(`Unsupported color value: ${value}`);
  return {r:parsed.r,g:parsed.g,b:parsed.b};
}
function paint(value){
  const parsed=parseColor(value);
  if(!parsed)throw new Error(`Unsupported paint value: ${value}`);
  return [{type:'SOLID',color:{r:parsed.r,g:parsed.g,b:parsed.b},opacity:parsed.a}];
}
async function text(parent,value,x,y,size=14,weight='Regular',fill='#272e2a',width=800){
  const n=figma.createText();parent.appendChild(n);n.fontName={family:'Manrope',style:weight};n.characters=value;n.fontSize=size;n.fills=paint(fill);n.x=x;n.y=y;n.resize(width,n.height);n.textAutoResize='HEIGHT';return n;
}
function rectangle(parent,x,y,w,h,fill,radius=6){const n=figma.createRectangle();parent.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=paint(fill);n.cornerRadius=radius;return n;}
function page(name){const n=figma.createPage();n.name=name;return n;}
async function imageComponent(parent,name,base64,x,y,size){
  const c=figma.createComponent();parent.appendChild(c);c.name=name;c.resize(size,size);c.x=x;c.y=y;c.fills=[];
  const image=figma.createImage(figma.base64Decode(base64));const r=figma.createRectangle();c.appendChild(r);r.resize(size,size);r.fills=[{type:'IMAGE',imageHash:image.hash,scaleMode:'FIT'}];return c;
}

const PREFIX='[MVP Pilot 0.1.0] ';
const RC_PREFIX='0.2.0-rc.1 /';
const RC_DOT='0.2.0-rc.1 ·';
const ARCHIVE_PREFIX='MVP Pilot / ';

async function archiveAsMvpPilot(){
  await figma.loadAllPagesAsync();
  let pagesRenamed=0;
  let descriptionsPrefixed=0;
  const pages=[...figma.root.children];
  for(const p of pages){
    if(p.name.startsWith(RC_PREFIX)||p.name.startsWith(RC_DOT)) continue;
    if(p.name.startsWith(ARCHIVE_PREFIX)) continue;
    if(p.name==='Icons · Archive (pre-0.2.0-rc.1)') continue;
    p.name=ARCHIVE_PREFIX+p.name;
    pagesRenamed++;
  }
  // Move archived pages after all release-candidate pages (stable order)
  const still=[...figma.root.children];
  const rc=still.filter(p=>p.name.startsWith(RC_PREFIX)||p.name.startsWith(RC_DOT));
  const archived=still.filter(p=>p.name.startsWith(ARCHIVE_PREFIX));
  const other=still.filter(p=>!rc.includes(p)&&!archived.includes(p));
  let i=0;
  for(const p of [...rc,...other,...archived]){
    figma.root.insertChild(i++,p);
  }
  function walk(node){
    if('description' in node && (node.type==='COMPONENT'||node.type==='COMPONENT_SET')){
      const d=node.description||'';
      if(!d.startsWith(PREFIX)){
        node.description=PREFIX+d;
        descriptionsPrefixed++;
      }
    }
    if('children' in node){
      for(const child of node.children) walk(child);
    }
  }
  for(const p of figma.root.children) walk(p);
  return {pagesRenamed,descriptionsPrefixed};
}

async function updatePatternsPage(){
  await figma.loadAllPagesAsync();
  const existing=figma.root.children.find(p=>p.name==='0.2.0-rc.1 / Patterns');
  if(!existing){
    throw new Error('No "0.2.0-rc.1 / Patterns" page found. Use Add patterns page first.');
  }
  const stamp=new Date().toISOString().slice(0,10);
  existing.name=`0.2.0-rc.1 / Patterns (superseded ${stamp})`;
  return addPatternsPage({allowExisting:true,superseded:existing.name});
}

async function addPatternsPage(opts={}){
  await figma.loadAllPagesAsync();
  if(!opts.allowExisting && figma.root.children.some(p=>p.name==='0.2.0-rc.1 / Patterns')){
    throw new Error('Patterns page already exists. Use Update patterns page to replace it.');
  }
  await Promise.all(['Regular','Medium','SemiBold','Bold'].map(style=>figma.loadFontAsync({family:'Manrope',style})));
  const patterns=DATA.patterns||{};
  const names=Object.keys(patterns);
  if(!names.length) throw new Error('No pattern specs in package (DATA.patterns empty). Rebuild with build-figma-package.mjs.');
  const light=DATA.tokens.themes.light;
  const pageNode=page('0.2.0-rc.1 / Patterns');
  await text(pageNode,'Mise DLS · Workflow patterns',0,0,28,'Bold',light['--mise-ink-900']);
  await text(pageNode,'Specimens for DecisionApproval, ForecastScenario, WeeklySnapshot, ImportWizard, SourcesStatus, MetricCard, DishDetailSheet, SessionHistory, PlatoDrawer. 13 px minimum. Bind to Mise 0.2.0-rc.1 variables.',0,44,13,'Regular',light['--mise-ink-700'],1100);
  let y=100;
  for(const name of names){
    const spec=patterns[name];
    const states=Array.isArray(spec.states)&&spec.states.length?spec.states:['default'];
    const variants=[];
    for(const [index,state] of states.entries()){
      const c=figma.createComponent();
      pageNode.appendChild(c);
      c.name=`State=${state}`;
      c.layoutMode='VERTICAL';
      c.primaryAxisSizingMode='AUTO';
      c.counterAxisSizingMode='FIXED';
      c.resize(360,10);
      c.paddingTop=16;c.paddingBottom=16;c.paddingLeft=16;c.paddingRight=16;
      c.itemSpacing=8;
      c.cornerRadius=8;
      c.fills=paint(light['--mise-surface']);
      c.strokes=paint(light['--mise-control-border']);
      c.strokeWeight=1;
      c.x=index*380;c.y=y;
      const title=await text(c,`${name} · ${state}`,0,0,14,'SemiBold',light['--mise-ink-900'],320);
      title.layoutAlign='STRETCH';
      const rawCopy=spec.copy;
      const copyLines=(Array.isArray(rawCopy)?rawCopy:Object.values(rawCopy||{})).map(String).slice(0,8);
      for(const line of copyLines){
        const t=await text(c,line,0,0,13,'Regular',light['--mise-ink-700'],320);
        t.layoutAlign='STRETCH';
      }
      if(Array.isArray(spec.anatomy)){
        for(const part of spec.anatomy.slice(0,4)){
          const t=await text(c,'· '+String(part),0,0,13,'Regular',light['--mise-ink-500'],320);
          t.layoutAlign='STRETCH';
        }
      }
      variants.push(c);
    }
    if(variants.length>1){
      const set=figma.combineAsVariants(variants,pageNode);
      set.name=`Pattern / ${name}`;
      set.description=`[0.2.0-rc.1 Patterns] ${spec.overview||name}`;
      set.x=0;set.y=y;
    }else{
      variants[0].name=`Pattern / ${name}`;
      variants[0].description=`[0.2.0-rc.1 Patterns] ${spec.overview||name}`;
    }
    y+=Math.max(220, 80+((spec.copy||[]).length+4)*22)+40;
  }
  await figma.setCurrentPageAsync(pageNode);
  figma.viewport.scrollAndZoomIntoView(pageNode.children);
  return {patterns:names.length};
}

async function addReleaseCandidatePages(){
  if(figma.fileKey && figma.fileKey!=='OYSStcuycsv9G63w7TC1uc')throw new Error('Open the canonical Mise_DLS file before importing.');
  await figma.loadAllPagesAsync();
  if(figma.root.children.some(p=>p.name==='0.2.0-rc.1 / Foundations'))throw new Error('Release pages already exist. Review them instead of importing twice.');
  await Promise.all(['Regular','Medium','SemiBold','Bold'].map(style=>figma.loadFontAsync({family:'Manrope',style})));

  const light=DATA.tokens.themes.light;
  const dark=DATA.tokens.themes.dark;
  const required=[
    '--mise-ink-900','--mise-ink-700','--mise-ink-500','--mise-ink-400','--mise-ink-300',
    '--mise-control-border','--mise-on-action','--mise-on-danger',
    '--mise-focus-border','--mise-focus-halo','--mise-scrim','--mise-selected',
  ];
  const missingRequired=required.filter(name=>!(name in light)||!(name in dark)||!isColorValue(light[name])||!isColorValue(dark[name]));
  if(missingRequired.length){
    throw new Error(`Token import rejected — missing or non-color light/dark pair: ${missingRequired.join(', ')}`);
  }

  const foundations=page('0.2.0-rc.1 / Foundations');
  await text(foundations,'Mise DLS · 0.2.0-rc.1',0,0,32,'Bold');
  await text(foundations,'RELEASE CANDIDATE · Accessibility validation and component reconciliation required',0,52,14);

  const collection=figma.variables.createVariableCollection('Mise 0.2.0-rc.1');
  const lightModeId=collection.modes[0].modeId;
  collection.renameMode(lightModeId,'light');
  const darkModeId=collection.addMode('dark');
  const colorKeys=[...new Set([...Object.keys(light),...Object.keys(dark)])]
    .filter(key=>isColorValue(light[key])&&isColorValue(dark[key]))
    .sort();
  for(const key of colorKeys){
    const variable=figma.variables.createVariable(key,collection,'COLOR');
    const lightParsed=parseColor(light[key]);
    const darkParsed=parseColor(dark[key]);
    variable.setValueForMode(lightModeId,{r:lightParsed.r,g:lightParsed.g,b:lightParsed.b,a:lightParsed.a});
    variable.setValueForMode(darkModeId,{r:darkParsed.r,g:darkParsed.g,b:darkParsed.b,a:darkParsed.a});
  }

  for(const [theme,values] of Object.entries(DATA.tokens.themes)){
    const x=theme==='light'?0:1000;
    const frame=figma.createFrame();foundations.appendChild(frame);frame.name=theme;frame.x=x;frame.y=120;frame.resize(930,1700);frame.fills=paint(values['--mise-surface']);
    await text(frame,`${theme} theme`,24,24,24,'Bold',values['--mise-ink-900']);
    let row=0;
    for(const [key,value] of Object.entries(values)){
      if(!isColorValue(value))continue;
      const xx=24+(row%3)*300,yy=80+Math.floor(row/3)*68;
      rectangle(frame,xx,yy,32,32,value);
      await text(frame,`${key}\n${value}`,xx+44,yy,13,'Regular',values['--mise-ink-900'],235);row++;
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
      const c=figma.createComponent();typography.appendChild(c);c.name=`State=${state}`;c.x=x+index*160;c.y=y;c.resize(140,40);c.cornerRadius=6;c.fills=paint(state==='Hover'?t['--mise-action-hover']:t['--mise-action']);
      if(state==='Focus'){c.strokes=paint(t['--mise-focus-border']);c.strokeWeight=2;c.effects=[{type:'DROP_SHADOW',color:{...color(t['--mise-focus-halo']),a:1},offset:{x:0,y:0},radius:0,spread:3,visible:true,blendMode:'NORMAL'}];}
      if(state==='Disabled')c.opacity=.4;
      await text(c,'Save changes',12,10,13,'Bold',t['--mise-on-action'],116);variants.push(c);
    }
    const set=figma.combineAsVariants(variants,typography);set.name=`Mise 0.2.0-rc.1 / Button / ${theme}`;set.description='Primary button specimens. Bind semantic variables and reconcile production variants before publishing.';
    const input=figma.createComponent();typography.appendChild(input);input.name=`Mise 0.2.0-rc.1 / Field / ${theme}`;input.x=x;input.y=y+120;input.resize(320,106);input.fills=paint(t['--mise-surface']);
    await text(input,'Reason for change',0,0,13,'Bold',t['--mise-ink-900'],320);
    const box=rectangle(input,0,28,320,44,t['--mise-surface']);box.strokes=paint(t['--mise-control-border']);
    await text(input,'Explain the cost adjustment',12,41,14,'Regular',t['--mise-ink-500'],296);
    await text(input,'Required before approval.',0,82,13,'Regular',t['--mise-ink-500'],320);
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
}

figma.ui.onmessage=async msg=>{
  try{
    if(msg.type==='import'){
      await addReleaseCandidatePages();
      figma.ui.postMessage('Release pages added. Review and reconcile, then save a named Figma version. No baseline pages changed; no library published.');
      return;
    }
    if(msg.type==='archive'){
      const result=await archiveAsMvpPilot();
      figma.ui.postMessage(`MVP Pilot archive done. Pages renamed: ${result.pagesRenamed}. Component descriptions prefixed: ${result.descriptionsPrefixed}. Idempotent on re-run.`);
      return;
    }
    if(msg.type==='patterns'){
      const result=await addPatternsPage();
      figma.ui.postMessage(`Patterns page added with ${result.patterns} pattern components. No library published.`);
      return;
    }
    if(msg.type==='patterns-update'){
      const result=await updatePatternsPage();
      figma.ui.postMessage(`Patterns page updated (${result.patterns} patterns). Previous page renamed; no other pages touched; no library published.`);
      return;
    }
  }catch(error){
    figma.ui.postMessage(`Stopped: ${error.message}. Check for partial pages before retrying.`);
  }
};
