/* global document, window, requestAnimationFrame, scrollTo */
import {chromium} from '@playwright/test'
import {createServer} from 'vite'
import {writeFileSync} from 'node:fs'
const browser=await chromium.launch(),results=[]
try{
  for(const fixture of [{id:'unchanged-sound-default',config:'vite.sound.config.ts',query:''},{id:'p2k-A',config:'vite.interaction.config.ts',query:'?all=a'},{id:'p2k-B',config:'vite.interaction.config.ts',query:'?all=b'}]){
    const server=await createServer({configFile:fixture.config,server:{port:4196,strictPort:true}});await server.listen()
    try{
      const page=await browser.newPage({viewport:{width:1440,height:1000}})
      await page.goto(`http://127.0.0.1:4196/${fixture.query}`);await page.waitForLoadState('networkidle')
      await page.evaluate(async()=>{await document.fonts.ready;window.shifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())window.shifts.push({value:e.value,hadRecentInput:e.hadRecentInput,sources:e.sources.map(s=>({node:s.node?.getAttribute?.('class')||s.node?.nodeName,parent:s.node?.parentElement?.getAttribute('class'),previous:s.previousRect,current:s.currentRect}))})}).observe({type:'layout-shift'})})
      await page.evaluate(()=>new Promise(resolve=>{const s=document.querySelector('.poster-scene'),distance=s.offsetHeight-s.querySelector('.poster-stage').offsetHeight,start=performance.now();function frame(now){const p=Math.min(1,(now-start)/7000);scrollTo({top:s.offsetTop+distance*p,behavior:'instant'});if(p<1)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)}))
      await page.waitForTimeout(600);results.push({fixture:fixture.id,shifts:await page.evaluate(()=>window.shifts)});await page.close()
    }finally{await server.close()}
  }
}finally{await browser.close()}
writeFileSync('evidence/p2k/scroll-shift-diagnosis.json',JSON.stringify({browser:browser.version(),note:'Programmatic native scroll, same retained source/default components. Raw layout-shift entries are not a font-loading CLS or a production deployment metric.',results},null,2)+'\n')
console.log(results.map(r=>({fixture:r.fixture,total:r.shifts.filter(e=>!e.hadRecentInput).reduce((a,e)=>a+e.value,0),sources:[...new Set(r.shifts.flatMap(e=>e.sources.map(s=>s.node)))]})))
