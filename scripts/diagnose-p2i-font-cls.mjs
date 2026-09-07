/* global window, document */
import { chromium } from '@playwright/test'
import { createServer } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { createHash } from 'node:crypto'
const directory='evidence/p2i-closeout', baseline='.checkpoints/p2i-closeout-p2a'
const paths=execFileSync('git',['ls-tree','-r','--name-only','7714907','labs/design-system','src/styles'],{encoding:'utf8'}).trim().split('\n')
const hashes=paths.map(path=>{
 const bytes=execFileSync('git',['show',`7714907:${path}`]);mkdirSync(dirname(resolve(baseline,path)),{recursive:true});writeFileSync(resolve(baseline,path),bytes)
 const hash=b=>createHash('sha256').update(b.toString().replaceAll('\r\n','\n')).digest('hex')
 return{path,p2a:hash(bytes),current:hash(readFileSync(path)),same:hash(bytes)===hash(readFileSync(path))}
})
const results=[],browser=await chromium.launch()
try{
 for(const [name,folder] of [['p2a',baseline],['p2i','.']]){
  const server=await createServer({configFile:false,root:resolve(folder,'labs/design-system'),publicDir:false,server:{host:'127.0.0.1',port:4186,strictPort:true,fs:{allow:[process.cwd()]}}});await server.listen()
  try{for(const [width,delay,repetition]of [[390,1200,1],[390,1200,2],[390,1200,3],[1440,1200,1],[390,0,1]]){
   const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage()
   await page.addInitScript(()=>{window.fontShifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.fontShifts.push({value:e.value,time:e.startTime,sources:e.sources.map(s=>({node:s.node?.className,previous:s.previousRect,current:s.currentRect}))})}).observe({type:'layout-shift',buffered:true})})
   if(delay)await page.route('**/*.woff2',async route=>{await new Promise(r=>setTimeout(r,delay));await route.continue()})
   await page.goto('http://127.0.0.1:4186/',{waitUntil:'domcontentloaded'})
   const box=()=>page.locator('[data-font="display"]').evaluate(el=>{const r=document.createRange();r.selectNodeContents(el);return{rect:el.getBoundingClientRect().toJSON(),textRects:[...r.getClientRects()].map(x=>x.toJSON()),fontsStatus:document.fonts.status}})
   const before=await box();if(repetition===1&&delay&&width===390)await page.screenshot({path:`${directory}/${name}-font-before.png`})
   await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);const after=await box()
   const shifts=await page.evaluate(()=>window.fontShifts);results.push({name,width,delay,repetition,before,after,cls:shifts.reduce((a,s)=>a+s.value,0),shifts})
   if(repetition===1&&delay&&width===390)await page.screenshot({path:`${directory}/${name}-font-after.png`})
   await context.close()
  }}finally{await server.close()}
 }
}finally{await browser.close()}
writeFileSync(`${directory}/font-cls-diagnosis.json`,JSON.stringify({baseline:'7714907',engine:'Windows Chromium',version:browser.version(),hashes,results},null,2)+'\n')
console.log(results.map(({name,width,delay,repetition,cls,before,after})=>({name,width,delay,repetition,cls,displayHeight:[before.rect.height,after.rect.height]})))
