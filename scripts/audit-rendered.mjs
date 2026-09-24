import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const root=path.resolve(import.meta.dirname,'..');
const axe=fs.readFileSync(path.join(root,'storybook/node_modules/axe-core/axe.min.js'),'utf8');
const directory=path.join(root,'storybook/storybook-static');
const server=http.createServer((req,res)=>{
  const file=path.join(directory,decodeURIComponent(new URL(req.url,'http://local').pathname));
  try { const data=fs.readFileSync(file.endsWith('/')?file+'index.html':file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data); } catch {res.statusCode=404;res.end('Not found');}
});
await new Promise(resolve=>server.listen(6007,'127.0.0.1',resolve));
const base=process.env.DLS_URL||'http://127.0.0.1:6007';
const index=await(await fetch(`${base}/index.json`)).json();
const entries=Object.values(index.entries).filter(e=>e.type==='story');
const isArchived=e=>(Array.isArray(e.tags)&& (e.tags.includes('archived')||e.tags.includes('mvp-pilot'))) || String(e.title||'').startsWith('MVP Pilot');
const archived=entries.filter(isArchived);
const live=entries.filter(e=>!isArchived(e));
const quick=process.argv.includes('--quick');
const selected=quick?live.filter((e,i,all)=>all.findIndex(a=>a.title===e.title)===i):live;
const browser=await chromium.launch({headless:true});
const results=[];
async function auditStory(page, entry, theme){
  await page.goto(`${base}/iframe.html?id=${entry.id}&viewMode=story&globals=theme:${theme};motion:off`,{waitUntil:'domcontentloaded'});
  try {
    await page.locator('#storybook-root > *').first().waitFor({state:'attached',timeout:10000});
  } catch {}
  await page.waitForTimeout(120);
  await page.evaluate((source)=>{
    if(window.axe) return;
    const s=document.createElement('script');
    s.textContent=source;
    document.documentElement.appendChild(s);
  }, axe);
  return page.evaluate(async()=>{
    async function run(){
      return window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
    }
    let result;
    try { result=await run(); }
    catch(err){
      if(!String(err).includes('already running')) throw err;
      await new Promise(r=>setTimeout(r,400));
      result=await run();
    }
    const small=[...document.querySelectorAll('#storybook-root *')].filter(el=>el.getBoundingClientRect().width && el.getBoundingClientRect().height && [...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize)<13).map(el=>({text:el.textContent.slice(0,80),size:getComputedStyle(el).fontSize}));
    return {violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary,html:n.html,checks:n.any.map(c=>({id:c.id,data:c.data}))}))})),small,overflow:document.documentElement.scrollWidth>innerWidth};
  });
}
for(const theme of ['light','dark']){
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  for(const entry of selected){
    try{
      const audit=await auditStory(page, entry, theme);
      results.push({id:entry.id,title:entry.title,theme,...audit});
    }catch(error){
      results.push({id:entry.id,theme,error:String(error)});
    }
    fs.writeFileSync(path.join(root,quick?'audit-quick.json':'audit-all.json'),JSON.stringify(results,null,2));
    if(results.length%20===0)console.log(`Checked ${results.length} rendered stories`);
  }
  await page.close();
}
await browser.close();
server.closeAllConnections();
await new Promise(resolve=>server.close(resolve));
const summary={
  checked:results.length,
  errors:results.filter(r=>r.error).length,
  violations:results.filter(r=>r.violations?.length).length,
  small:results.filter(r=>r.small?.length).length,
  archived:'archived (not gated)',
  archivedCount:archived.length,
};
console.log(JSON.stringify(summary));
if(summary.errors||summary.violations||summary.small) process.exitCode=1;
