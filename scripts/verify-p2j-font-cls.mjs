/* global window, document */
import { chromium } from '@playwright/test'
import { createServer } from 'vite'
import { writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const server=await createServer({configFile:'vite.lab.config.ts',server:{port:4186,strictPort:true}})
await server.listen()
const browser=await chromium.launch(),results=[]
try {
  for(const [width,mode,repetition] of [[390,'delayed',1],[390,'delayed',2],[390,'delayed',3],[1440,'delayed',1],[390,'normal',1],[320,'missing',1]]) {
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage()
    await page.addInitScript(()=>{window.fontShifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.fontShifts.push({value:e.value,time:e.startTime,sources:e.sources.map(s=>({node:s.node?.className,previous:s.previousRect,current:s.currentRect}))})}).observe({type:'layout-shift',buffered:true})})
    if(mode==='delayed')await page.route('**/*.woff2',async route=>{await new Promise(r=>setTimeout(r,1200));await route.continue()})
    if(mode==='missing')await page.route('**/*.woff2',route=>route.abort())
    await page.goto('http://127.0.0.1:4186/',{waitUntil:'domcontentloaded'})
    const geometry=()=>page.locator('.lab-masthead, .lab-masthead > *, main').evaluateAll(els=>els.map(e=>({tag:e.tagName,rect:e.getBoundingClientRect().toJSON()})))
    const before=await geometry()
    if(mode==='delayed' && repetition===1){
      // Playwright screenshot waits for document.fonts.ready; CDP captures the actual fallback frame.
      const session=await context.newCDPSession(page)
      const shot=await session.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})
      writeFileSync(`evidence/p2j/font-${width}-before.png`,Buffer.from(shot.data,'base64'));await session.detach()
    }
    await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100)
    const after=await geometry(),shifts=await page.evaluate(()=>window.fontShifts),cls=shifts.reduce((sum,e)=>sum+e.value,0)
    assert.ok(cls<.1,`${width} ${mode} CLS ${cls}`)
    if(repetition===1)await page.screenshot({path:`evidence/p2j/font-${width}-${mode}-after.png`})
    results.push({width,mode,repetition,cls,before,after,shifts});await context.close()
  }
} finally {await browser.close();await server.close()}
writeFileSync('evidence/p2j/font-cls.json',JSON.stringify({browser:browser.version(),threshold:.1,fontDelay:1200,postFontObservation:100,results},null,2)+'\n')
console.log(results.map(({width,mode,repetition,cls})=>({width,mode,repetition,cls})))
