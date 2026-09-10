// Real-time silent screen recordings: use the live Lab to hear the unchanged excerpt.
/* global window, document, requestAnimationFrame, scrollTo */
import { chromium, expect } from '@playwright/test'
import { createServer } from 'vite'
import { writeFileSync } from 'node:fs'

const directory='evidence/p2j',server=await createServer({configFile:'vite.sound.config.ts',server:{port:4193,strictPort:true}})
await server.listen()
const browser=await chromium.launch(),results=[]
try {
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}])for(const variant of ['b2','signature']){
    const id=`${viewport.width}-${variant}`,context=await browser.newContext({viewport,recordVideo:{dir:'.checkpoints/p2j/videos',size:viewport},hasTouch:viewport.width<640,isMobile:viewport.width<640}),page=await context.newPage(),errors=[]
    page.on('pageerror',error=>errors.push(error.message))
    await page.addInitScript(()=>{
      const empty=()=>({durations:[],intervals:[],prior:0,longTasks:[],shifts:0,points:[]})
      window.responseCost=empty();window.clearResponseCost=()=>{window.responseCost=empty()}
      const raf=requestAnimationFrame
      window.requestAnimationFrame=cb=>raf(time=>{
        const c=window.responseCost,start=performance.now();cb(time);c.durations.push(performance.now()-start)
        if(c.prior===time)return
        if(c.prior)c.intervals.push(time-c.prior);c.prior=time
        const bow=document.querySelector('.bow-contact'),a=document.querySelector('audio')
        if(bow && a && !a.paused)c.points.push({time,media:a.currentTime,x:Number(bow.dataset.x),y:Number(bow.dataset.y),rate:Number(bow.dataset.rate),tail:Number(bow.dataset.trailSpan)})
      })
      new PerformanceObserver(list=>window.responseCost.longTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask',buffered:true})
      new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.responseCost.shifts+=e.value}).observe({type:'layout-shift',buffered:true})
    })
    await page.goto(`http://127.0.0.1:4193/?compare=b&response=${variant}&diagnostics=1`);await page.locator('.sound-surface').waitFor();await page.waitForLoadState('networkidle')
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))})
    await page.evaluate(()=>{const s=document.querySelector('.poster-scene');scrollTo(0,s.offsetTop+s.offsetHeight-s.querySelector('.poster-stage').offsetHeight)})
    const root=page.locator('.sound-experience'),stages=[]
    await expect(root).toHaveAttribute('data-sound-ready','true')
    await expect.poll(()=>page.locator('.poster-scene').evaluate(e=>e.dataset.progress===e.dataset.targetProgress)).toBe(true)
    const collect=async(name,ms)=>{
      await page.evaluate(()=>window.clearResponseCost());await page.waitForTimeout(ms)
      const raw=await page.evaluate(()=>window.responseCost),p95=a=>a.length?[...a].sort((a,b)=>a-b)[Math.floor((a.length-1)*.95)]:0
      const points=raw.points.filter(p=>Object.values(p).every(Number.isFinite)),moves=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y)),rates=points.map(p=>p.rate)
      const span=axis=>points.length?Math.max(...points.map(p=>p[axis]))-Math.min(...points.map(p=>p[axis])):0
      let reversals=0,last=0;for(let i=1;i<points.length;i++){const dy=points[i].y-points[i-1].y;if(Math.abs(dy)>.05){if(last*dy<0)reversals++;last=dy}}
      stages.push({name,callbackCount:raw.durations.length,callbackP95:p95(raw.durations),intervalP95:p95(raw.intervals),longTasks:raw.longTasks,cls:raw.shifts,samples:points.length,travel:moves.reduce((a,b)=>a+b,0),xSpan:span('x'),ySpan:span('y'),meanRate:rates.length?rates.reduce((a,b)=>a+b,0)/rates.length:0,rateP95:p95(rates),reversals,trailP95:p95(points.map(p=>p.tail)),points})
    }
    await collect('idle',500)
    await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-audio-state','playing')
    await collect('playing',10000);await page.screenshot({path:`${directory}/${id}-playing.png`})
    await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-audio-state','paused');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
    await collect('settled-pause',500)
    await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-audio-state','playing');await page.waitForTimeout(1000)
    await page.evaluate(()=>scrollTo(0,0));await expect(root).toHaveAttribute('data-audio-state','paused');await expect.poll(()=>page.locator('.poster-scene').evaluate(e=>e.dataset.progress===e.dataset.targetProgress)).toBe(true)
    await collect('offscreen',500)
    const video=page.video();await context.close();await video.saveAs(`${directory}/${id}-realtime-silent.webm`)
    results.push({id,viewport,variant,errors,stages})
  }
}finally{await browser.close();await server.close()}
writeFileSync(`${directory}/response-comparison.json`,JSON.stringify({environment:'Windows headless Chromium, unthrottled development Lab, sequential recordings. Callback cost excludes GPU; mobile is emulation.',browser:browser.version(),results},null,2)+'\n')
console.log(results.map(r=>({id:r.id,stages:r.stages.map(({points,...s})=>({...s,samples:points.length}))})))
