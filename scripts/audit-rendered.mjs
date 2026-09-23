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
const quick=process.argv.includes('--quick');
const selected=quick?entries.filter((e,i,all)=>all.findIndex(a=>a.title===e.title)===i):entries;
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
const results=[];
for(const theme of ['light','dark']){
  for(const entry of selected){
    try{
      await page.goto(`${base}/iframe.html?id=${entry.id}&viewMode=story&globals=theme:${theme};motion:off`,{waitUntil:'domcontentloaded'});
      await page.locator('#storybook-root > *').first().waitFor({state:'attached',timeout:5000});
      await page.waitForTimeout(90);
      await page.addScriptTag({content:axe});
      const audit=await page.evaluate(async()=>{
        const result=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
        const small=[...document.querySelectorAll('#storybook-root *')].filter(el=>el.getBoundingClientRect().width && el.getBoundingClientRect().height && [...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize)<13).map(el=>({text:el.textContent.slice(0,80),size:getComputedStyle(el).fontSize}));
        return {violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary,html:n.html,checks:n.any.map(c=>({id:c.id,data:c.data}))}))})),small,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      results.push({id:entry.id,title:entry.title,theme,...audit});
    }catch(error){results.push({id:entry.id,theme,error:String(error)});if(results.filter(r=>r.error).length>=3)throw error;}
    fs.writeFileSync(path.join(root,quick?'audit-quick.json':'audit-all.json'),JSON.stringify(results,null,2));
    if(results.length%20===0)console.log(`Checked ${results.length} rendered stories`);
  }
}
await browser.close();
server.closeAllConnections();
await new Promise(resolve=>server.close(resolve));
console.log(JSON.stringify({checked:results.length,errors:results.filter(r=>r.error).length,violations:results.filter(r=>r.violations?.length).length,small:results.filter(r=>r.small?.length).length}));
