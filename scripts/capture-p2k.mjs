/* global window, document, requestAnimationFrame, scrollTo */
import { chromium, expect } from '@playwright/test'
import { createServer } from 'vite'
import {mkdirSync,writeFileSync} from 'node:fs'
const directory='evidence/p2k';mkdirSync(directory,{recursive:true})
const server=await createServer({configFile:'vite.interaction.config.ts',server:{port:4195,strictPort:true}});await server.listen()
const browser=await chromium.launch(),results=[]
try {
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}])for(const variant of ['a','b']){
    const id=`${viewport.width}-${variant}`,context=await browser.newContext({viewport,hasTouch:viewport.width<640,isMobile:viewport.width<640,recordVideo:{dir:'.checkpoints/p2k-videos',size:viewport}}),page=await context.newPage(),errors=[]
    page.on('pageerror',e=>errors.push(e.message))
    await page.addInitScript(()=>{
      window.p2kMetrics={callbacks:[],intervals:[],prior:0,longTasks:[],cls:0,points:[]}
      const raf=requestAnimationFrame
      window.requestAnimationFrame=callback=>raf(time=>{
        const cost=window.p2kMetrics,start=performance.now();callback(time);cost.callbacks.push(performance.now()-start)
        if(cost.prior===time)return;if(cost.prior)cost.intervals.push(time-cost.prior);cost.prior=time
        const root=document.querySelector('.sound-experience')
        if(root)cost.points.push({time,media:root.querySelector('audio').currentTime,progress:root.querySelector('.poster-scene').dataset.progress,
          active:root.dataset.p2kActive,cost:root.dataset.p2kCost,stage:root.dataset.p2kStage,frames:root.dataset.p2kFrames,
          point0:root.dataset.p2kPoint0,point1:root.dataset.p2kPoint1,janggu:root.dataset.jangguPoint,hits:root.dataset.jangguHits})
      })
      new PerformanceObserver(list=>window.p2kMetrics.longTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask',buffered:true})
      new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.p2kMetrics.cls+=e.value}).observe({type:'layout-shift',buffered:true})
      window.p2kReset=()=>{window.p2kMetrics={callbacks:[],intervals:[],prior:0,longTasks:[],cls:0,points:[]}}
    })
    await page.goto(`http://127.0.0.1:4195/?all=${variant}`);await page.waitForLoadState('networkidle')
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.p2kReset()})
    const samples=[]
    const record=async name=>{const raw=await page.evaluate(()=>window.p2kMetrics),p95=a=>a.length?[...a].sort((a,b)=>a-b)[Math.floor(a.length*.95)]:0
      samples.push({name,callbacks:raw.callbacks.length,callbackP95:p95(raw.callbacks),intervalP95:p95(raw.intervals),longTasks:raw.longTasks,cls:raw.cls,pointFrames:raw.points.length,points:raw.points});await page.evaluate(()=>window.p2kReset())}
    const travel=async(from,to,ms)=>page.evaluate(({from,to,ms})=>new Promise(resolve=>{const scene=document.querySelector('.poster-scene'),distance=scene.offsetHeight-scene.querySelector('.poster-stage').offsetHeight,start=performance.now();function step(now){const t=Math.min(1,(now-start)/ms);scrollTo({top:scene.offsetTop+distance*(from+(to-from)*t),behavior:'instant'});if(t<1)requestAnimationFrame(step);else resolve()}requestAnimationFrame(step)}),{from,to,ms})
    await page.waitForTimeout(3000);await page.screenshot({path:`${directory}/${id}-hero.png`});await record('hero-idle')
    await travel(0,.64,10500);await page.waitForTimeout(700);await page.screenshot({path:`${directory}/${id}-lock.png`});await record('convergence')
    await travel(.64,1,5000);await expect(page.locator('.sound-experience')).toHaveAttribute('data-sound-ready','true');await page.waitForTimeout(900);await page.screenshot({path:`${directory}/${id}-idle.png`});await record('sweep')
    await page.locator('.sound-surface .listen-trigger').click();await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state','playing')
    await page.waitForTimeout(6000);await page.screenshot({path:`${directory}/${id}-playing.png`});await record('play-first-six')
    await page.waitForTimeout(12300);await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state','ended');await record('play-through-end')
    await page.locator('.sound-surface .listen-trigger').click();await page.waitForTimeout(750);await page.locator('.sound-surface .listen-trigger').click();await page.waitForTimeout(650);await record('replay-pause')
    await page.locator('.type-study').scrollIntoViewIfNeeded();await page.waitForTimeout(500)
    for(const word of ['PAUSE','RESUME','REPLAY','PLAY']){await page.getByRole('button',{name:word,exact:true}).click();await page.waitForTimeout(850)}
    await page.screenshot({path:`${directory}/${id}-type.png`});await record('type-study')
    if(variant==='b'&&viewport.width===1440){
      await page.evaluate(()=>{const s=document.querySelector('.poster-scene');scrollTo({top:s.offsetTop+s.offsetHeight-s.querySelector('.poster-stage').offsetHeight,behavior:'instant'})});await page.waitForTimeout(1000)
      await page.locator('.p2k-comparison summary').click()
      for(const color of ['lacquer','burnt','rust']){await page.locator('#janggu-color').selectOption(color);await page.waitForTimeout(700);await page.locator('.p2k-comparison summary').click();await page.screenshot({path:`${directory}/color-${color}.png`});await page.locator('.p2k-comparison summary').click()}
    }
    const video=page.video();await context.close();await video.saveAs(`${directory}/${id}-realtime-silent.webm`)
    results.push({id,viewport,variant,errors,samples})
    console.log(`${id} captured; errors=${errors.length}`)
  }
} finally {await browser.close();await server.close()}
writeFileSync(`${directory}/motion-metrics.json`,JSON.stringify({browser:browser.version(),environment:'Windows, unthrottled Chromium, sequential development Lab. Mobile emulation, not a physical device. Videos are normal-speed silent screen recordings; live Lab supplies real audio.',results},null,2)+'\n')
console.log('P2K captures complete')
