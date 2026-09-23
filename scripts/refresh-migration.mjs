import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const app=path.resolve(root,'../mise-refresh');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
// Mechanical migration: the 13px product floor, keeping larger roles unchanged.
for(const dir of [path.join(root,'storybook/src'),path.join(app,'client/src')]) {
  for(const f of walk(dir).filter(f=>/\.(css|tsx|ts)$/.test(f))){
    let s=fs.readFileSync(f,'utf8');
    s=s.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g,(m,n)=>+n<13?'font-size: 13px':m);
    s=s.replace(/text-\[(\d+(?:\.\d+)?)px\]/g,(m,n)=>+n<13?'text-[13px]':m);
    s=s.replace(/fontSize=\{(\d+(?:\.\d+)?)\}/g,(m,n)=>+n<13?'fontSize={13}':m);
    if(f.startsWith(root)) s=s.replace(/(['"])lucide-react\1/g,"'@mise/icons/basil'");
    fs.writeFileSync(f,s);
  }
}
fs.mkdirSync(path.join(root,'storybook/public'),{recursive:true});
fs.cpSync(path.join(app,'client/public/plato'),path.join(root,'storybook/public/plato'),{recursive:true});
fs.cpSync(path.join(app,'client/public/illustrations'),path.join(root,'storybook/public/illustrations'),{recursive:true});
fs.copyFileSync(path.join(app,'client/public/basil-attribution.txt'),path.join(root,'storybook/public/basil-attribution.txt'));
fs.copyFileSync(path.join(app,'client/src/components/plato-avatar.tsx'),path.join(root,'storybook/src/components/chat-agent/PlatoAvatar.tsx'));
const css=fs.readFileSync(path.join(app,'client/src/plato-character.css'),'utf8');
fs.writeFileSync(path.join(root,'storybook/src/styles/plato.css'),css.slice(0,css.indexOf('.plato-welcome'))+'\n[data-motion="off"] .plato-avatar *{animation:none!important;transition:none!important}\n');
const icons=JSON.parse(fs.readFileSync(path.join(root,'../mise-basil-library/package/icons.json'),'utf8')).icons;
const mappings={AlertOctagon:'info-triangle',AlertTriangle:'info-triangle',ArrowUpRight:'arrow-right',Bot:'comment',Building2:'bank',Calendar:'calendar',Check:'check',CheckCircle2:'checked-box',ChevronDown:'caret-down',ChevronRight:'caret-right',ChevronUp:'caret-up',Clock:'clock',CreditCard:'card',Ellipsis:'other-1',FileText:'document',Gauge:'dialpad',Info:'info-circle',List:'rows',Package:'box',Phone:'phone',Plus:'plus',Receipt:'invoice',Search:'search',Settings:'settings',ShoppingCart:'shopping-cart',Sparkles:'lightbulb',Tag:'bookmark',TriangleAlert:'info-triangle',Truck:'box',Undo2:'reply',UtensilsCrossed:'book-open',Wrench:'settings-adjust',X:'cross'};
fs.mkdirSync(path.join(root,'storybook/src/icons'),{recursive:true});
const missing=Object.entries(mappings).filter(([k,v])=>!icons[v+'-outline']);
if(missing.length) throw Error('Unmapped Basil icons: '+JSON.stringify(missing));
fs.writeFileSync(path.join(root,'storybook/src/icons/paths.json'),JSON.stringify(Object.fromEntries(Object.entries(icons).map(([k,v])=>[k,v.body]))));
let code=`// Basil by Craftwork. CC BY 4.0. See public/basil-attribution.txt.\nimport {forwardRef,type SVGProps} from 'react';\nimport paths from './paths.json';\nexport type IconProps=SVGProps<SVGSVGElement>&{size?:number|string;absoluteStrokeWidth?:boolean};\nexport type LucideIcon=ReturnType<typeof icon>;\nfunction icon(name:keyof typeof paths,rotation=0){return forwardRef<SVGSVGElement,IconProps>(({size=24,strokeWidth:_s,absoluteStrokeWidth:_a,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden={props['aria-label']?undefined:true} {...props} data-icon={'basil:'+name}><g transform={rotation?'rotate('+rotation+' 12 12)':undefined} dangerouslySetInnerHTML={{__html:paths[name]}}/></svg>);}\nexport const basilNames=Object.keys(paths) as (keyof typeof paths)[];\nexport function BasilIcon({name,...props}:IconProps&{name:keyof typeof paths}){const Glyph=icon(name);return <Glyph {...props}/>;}\n`;
for(const [name,value] of Object.entries(mappings))code+=`export const ${name}=icon('${value}-outline',${name==='ArrowUpRight'?-45:0});\n`;
fs.writeFileSync(path.join(root,'storybook/src/icons/basil.tsx'),code);
fs.appendFileSync(path.join(root,'storybook/src/icons/basil.tsx'),`\n// Typographic minus and CSS status dot: primitives, not alternate icon artwork.\nexport const Minus=forwardRef<SVGSVGElement,IconProps>(({size=16,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" aria-hidden={true} {...props}><text x="12" y="18" textAnchor="middle" fill="currentColor" fontSize="24">−</text></svg>);\nexport const Circle=forwardRef<SVGSVGElement,IconProps>(({size=16,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" aria-hidden={true} {...props}><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>);\n`);
