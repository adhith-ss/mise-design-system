import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'figma-release-0.2.0-rc.1');
fs.mkdirSync(out,{recursive:true});
const baseline=fs.readFileSync(path.join(root,'storybook/src/styles/tokens.css'),'utf8');
const refresh=fs.readFileSync(path.join(root,'storybook/src/styles/refresh.css'),'utf8');
// Preserve CSS custom-property names exactly (--mise-*), including required
// refresh tokens: --mise-ink-*, --mise-control-border, --mise-on-action,
// --mise-on-danger, --mise-focus-*, --mise-scrim, --mise-selected.
const declarations=s=>Object.fromEntries([...s.matchAll(/(--mise-[\w-]+):\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));
// Include full baseline (scrim lives after the Rail block). Omit rail-only
// surface tokens from the handoff package — they are not part of the RC theme.
const primitive=Object.fromEntries(
  Object.entries(declarations(baseline)).filter(([name])=>!name.startsWith('--mise-rail-'))
);
const light={...primitive,...declarations(refresh.split('.dark,')[0])};
const dark={...light,...declarations(refresh.split('.dark,')[1].split('color-scheme:dark')[0])};
const required=[
  '--mise-ink-900','--mise-ink-700','--mise-ink-500','--mise-ink-400','--mise-ink-300',
  '--mise-control-border','--mise-on-action','--mise-on-danger',
  '--mise-focus-border','--mise-focus-halo','--mise-scrim','--mise-selected',
];
const missing=required.filter(name=>!(name in light)||!(name in dark));
if(missing.length){
  throw new Error(`tokens.json gate failed — missing light/dark pair for: ${missing.join(', ')}`);
}
const tokens={version:'0.2.0-rc.1',themes:{light,dark}};
fs.writeFileSync(path.join(out,'tokens.json'),JSON.stringify(tokens,null,2));
const icons=JSON.parse(fs.readFileSync(path.join(root,'storybook/src/icons/paths.json'),'utf8'));
const assets=Object.fromEntries(['plato','illustrations'].flatMap(dir=>fs.readdirSync(path.join(root,'storybook/public',dir)).filter(x=>x.endsWith('.png')).map(file=>[`${dir}/${file}`,fs.readFileSync(path.join(root,'storybook/public',dir,file)).toString('base64')])));
const patternsDir=path.join(root,'storybook/src/patterns');
const patterns={};
if(fs.existsSync(patternsDir)){
  for(const file of fs.readdirSync(patternsDir).filter(f=>f.endsWith('.spec.json'))){
    const name=file.replace(/\.spec\.json$/,'');
    patterns[name]=JSON.parse(fs.readFileSync(path.join(patternsDir,file),'utf8'));
  }
}
const payload={tokens,icons,assets,patterns};
const runtime=fs.readFileSync(path.join(root,'scripts/figma-importer.js'),'utf8');
fs.writeFileSync(path.join(out,'code.js'),`const DATA=${JSON.stringify(payload)};\n${runtime}`);
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({name:'Mise DLS 0.2.0-rc.1 · additive import',id:'mise-dls-020-rc1-import',api:'1.0.0',main:'code.js',editorType:['figma'],documentAccess:'dynamic-page',networkAccess:{allowedDomains:['none']}},null,2));
fs.copyFileSync(path.join(root,'storybook/public/basil-attribution.txt'),path.join(out,'basil-attribution.txt'));
fs.copyFileSync(path.join(root,'FIGMA-RELEASE-HANDOFF.md'),path.join(out,'README.md'));
console.log(`Built additive importer with ${Object.keys(icons).length} Basil icons, ${Object.keys(assets).length} raster assets, ${Object.keys(patterns).length} patterns.`);
