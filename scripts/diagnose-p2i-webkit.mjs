/* global window, document, scrollTo, AudioContext */
import { chromium, webkit, expect } from '@playwright/test'
import { createServer } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'
const directory='evidence/p2i-closeout', bytes=readFileSync('src/sound/assets/hanbeomsu-jungjungmori-preview.m4a'), requests=[],timers=new Set()
const server=await createServer({configFile:'vite.sound.config.ts',server:{port:4191,strictPort:true},plugins:[{name:'p2i-diagnostic-only-http-faults',configureServer(s){s.middlewares.use((req,res,next)=>{
 if(!req.url.startsWith('/__p2i_probe/'))return next()
 requests.push({url:req.url,time:Date.now(),agent:req.headers['user-agent']})
 res.setHeader('Cache-Control','no-store')
 if(req.url.includes('/missing.')){res.statusCode=404;res.end('Missing diagnostic media');return}
 const send=()=>{if(res.destroyed)return;res.setHeader('Content-Type','audio/mp4');res.setHeader('Content-Length',bytes.length);res.end(bytes)}
 const delay=req.url.includes('/stall.')?15000:req.url.includes('/cancel.')?1800:0
 if(delay){const t=setTimeout(()=>{timers.delete(t);send()},delay);timers.add(t)}else send()
 })}}]});await server.listen()
const results=[]
try{for(const [name,engine]of Object.entries({chromium,webkit})){
 const browser=await engine.launch()
 try{for(const mode of ['valid','intercept','missing','stall','cancel']){
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),events=[]
  let interceptCalls=0
  const target=`/__p2i_probe/${mode}.m4a?engine=${name}&run=${Date.now()}`
  await page.route('**/src/sound/source.ts*',async route=>{const response=await route.fetch();await route.fulfill({response,body:await response.text()+`\nhomeSoundSource.src=${JSON.stringify(target)};\n`,contentType:'text/javascript'})})
  if(mode==='intercept')await page.route('**/__p2i_probe/intercept.m4a?*',route=>{interceptCalls++;return route.abort()})
  await page.goto('http://127.0.0.1:4191/?compare=b');await page.waitForLoadState('networkidle')
  await page.evaluate(()=>{const a=document.querySelector('audio');window.audioProbeEvents=[];for(const event of ['loadstart','loadedmetadata','playing','waiting','pause','error','ended'])a.addEventListener(event,()=>window.audioProbeEvents.push({event,time:performance.now(),position:a.currentTime,error:a.error?.code||0}));const s=document.querySelector('.poster-scene');scrollTo(0,s.offsetTop+s.offsetHeight-s.querySelector('.poster-stage').offsetHeight)})
  await expect.poll(()=>page.locator('.poster-scene').evaluate(e=>e.dataset.progress===e.dataset.targetProgress)).toBe(true)
  await page.locator('.listen-trigger').click()
  if(mode==='cancel'){
   await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state','loading')
   await page.locator('.listen-trigger').click();await page.waitForTimeout(2300)
  }else await page.waitForTimeout(mode==='stall'?13200:1400)
  const state=await page.evaluate(()=>{const a=document.querySelector('audio'),r=document.querySelector('.sound-experience');return{phase:r.dataset.audioState,position:a.currentTime,paused:a.paused,error:a.error?.code||0,readyState:a.readyState,audioContext:typeof AudioContext,context:r.dataset.audioContext,analysis:r.dataset.analysisFrames,fallback:!!document.querySelector('.sound-visual-fallback'),events:window.audioProbeEvents}})
  events.push(...state.events);delete state.events
  // Actual HTTP faults are assertions, independently of the Windows media interception experiment.
  if(mode==='valid'){expect(state.phase).toBe('playing');expect(state.position).toBeGreaterThan(.1);if(state.audioContext==='undefined'){expect(state.fallback).toBe(true);expect(Number(state.analysis)).toBe(0)}}
  if(mode==='missing'||mode==='stall'){expect(state.phase).toBe('error');expect(state.paused).toBe(true);expect(state.position).toBe(0)}
  if(mode==='cancel'){expect(state.phase).toBe('paused');expect(state.paused).toBe(true);expect(state.position).toBe(0)}
  results.push({engine:name,version:browser.version(),mode,target,interceptCalls,serverRequests:requests.filter(r=>r.url===target),state,events})
  await context.close()
 }}finally{await browser.close()}
}}finally{for(const t of timers)clearTimeout(t);server.httpServer?.closeAllConnections();await server.close()}
writeFileSync(`${directory}/webkit-http-diagnosis.json`,JSON.stringify({purpose:'Compare actual same-origin server faults with Playwright route interception; real retained excerpt, no mocked media or AudioContext.',results},null,2)+'\n')
console.log(results.map(({engine,mode,interceptCalls,serverRequests,state})=>({engine,mode,interceptCalls,serverRequestCount:serverRequests.length,...state})))
