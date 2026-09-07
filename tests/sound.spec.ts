import { test, expect, type Page } from '@playwright/test'

declare global { interface Window { soundContexts: AudioContext[]; retainedMedia: HTMLAudioElement } }
const root = (page: Page) => page.locator('.sound-experience')
const audio = (page: Page) => page.locator('audio')
const trigger = (page: Page) => page.locator('.listen-trigger')
// Preserve the original line-only regression baseline explicitly; canonical B2 is checked separately.
async function ready(page: Page, path='/?compare=a') {
  await page.goto(path); await page.locator('.sound-surface').waitFor(); await page.waitForLoadState('networkidle')
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})))})
}
async function seek(page: Page, p=1) {
  await page.locator('.poster-scene').evaluate((e,p)=>{const el=e as HTMLElement,stage=el.querySelector<HTMLElement>('.poster-stage')!;scrollTo(0,el.offsetTop+(el.offsetHeight-stage.offsetHeight)*p)},p)
  // Allow one native scroll pixel plus the diagnostic attribute's five-decimal rounding.
  await expect.poll(()=>page.locator('.poster-scene').evaluate((e,p)=>{
    const el=e as HTMLElement, travel=el.offsetHeight-el.querySelector<HTMLElement>('.poster-stage')!.offsetHeight
    return Math.abs(Number(el.dataset.targetProgress)-p)*travel - travel*.000005
  },p)).toBeLessThanOrEqual(1)
  await expect.poll(()=>page.locator('.poster-scene').evaluate(e=>(e as HTMLElement).dataset.progress===(e as HTMLElement).dataset.targetProgress)).toBe(true)
}
async function listen(page: Page) { await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','playing');await expect.poll(()=>audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeGreaterThan(.1) }

for(const [width,height] of [[320,568],[390,844],[768,1024],[1366,768],[1440,1000],[1920,1080]]) {
  test(`${width}: preserved first stages, bounded line release and independent SOUND composition`,async({browser},info)=>{
    const c=await browser.newContext({baseURL:'http://127.0.0.1:4179',viewport:{width,height},hasTouch:width<640,isMobile:width<640}),page=await c.newPage()
    await ready(page);await page.locator('.line-one').evaluate(el=>el.setAttribute('data-original','preserved'))
    for(const p of [.4*155/235,.78*155/235,155/235,.8,.9,1]) {
      await seek(page,p)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
      await expect(page.locator('.line-one')).toHaveAttribute('data-original','preserved')
      if(p>=155/235)for(const box of await page.locator('.poster-lines .tension-line').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom}}))){expect(box.x).toBeGreaterThanOrEqual(-1);expect(box.right).toBeLessThan(width+1);expect(box.bottom).toBeLessThan(height+1)}
    }
    await expect(root(page)).toHaveAttribute('data-sound-ready','true');await expect(trigger(page)).toHaveAccessibleName('미리듣기 재생')
    const button=(await trigger(page).boundingBox())!,caption=(await page.locator('.sound-caption').boundingBox())!
    expect(button.height).toBeGreaterThanOrEqual(44);expect(button.x+button.width).toBeLessThan(width+1);expect(caption.y+caption.height).toBeLessThan(height-12)
    if(width<640)await listen(page)
    await page.screenshot({path:info.outputPath(`${width}-sound.png`)});await c.close()
  })
}

test('no audio request or context before activation; keyboard starts actual analysed playback',async({page})=>{
  const payloads:string[]=[];page.on('request',r=>{if(r.url().endsWith('.m4a'))payloads.push(r.url())})
  await ready(page);await seek(page);await page.waitForTimeout(600)
  expect(payloads).toEqual([]);await expect(root(page)).toHaveAttribute('data-audio-context','not-created')
  expect(await audio(page).getAttribute('src')).toBeNull();expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBe(0)
  await trigger(page).focus();await expect(trigger(page)).toBeFocused();expect(await trigger(page).evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none')
  expect(await page.locator('.listen-composition').evaluate(el=>getComputedStyle(el).clipPath)).toBe('none')
  await trigger(page).press('Enter');await expect(root(page)).toHaveAttribute('data-audio-state','playing')
  await expect.poll(()=>audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeGreaterThan(.5)
  await expect.poll(async()=>Number(await root(page).getAttribute('data-audio-energy'))).toBeGreaterThan(.05)
  expect(payloads.length).toBeGreaterThan(0);expect(await page.locator('.sound-thread path').first().getAttribute('d')).not.toBe('M0 3H1000')
  const ys=await page.locator('.sound-thread path').first().evaluate(el=>[...el.getAttribute('d')!.matchAll(/L[\d.]+ ([\d.]+)/g)].map(m=>Number(m[1])))
  expect(Math.max(...ys)).toBeLessThanOrEqual(3.63);expect(Math.min(...ys)).toBeGreaterThanOrEqual(2.37)
})

test('pause damps to the exact straight pair, stops work and resumes the real media position',async({page})=>{
  await ready(page);await seek(page);await listen(page);await page.waitForTimeout(500);await trigger(page).click()
  await expect(root(page)).toHaveAttribute('data-audio-state','paused')
  const at=await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)
  await expect(root(page)).toHaveAttribute('data-audio-energy','0.0000',{timeout:2000})
  await expect(page.locator('.sound-thread path').first()).toHaveAttribute('d','M0 3H1000')
  const count=await root(page).getAttribute('data-analysis-frames');await page.waitForTimeout(400)
  expect(await root(page).getAttribute('data-analysis-frames')).toBe(count)
  expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeCloseTo(at,2)
  await expect(root(page)).toHaveAttribute('data-audio-context','suspended');await listen(page)
  await expect.poll(()=>audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeGreaterThan(at+.15)
})

test('the complete real excerpt ends naturally and REPLAY starts from the beginning',async({page})=>{
  test.setTimeout(40000);await ready(page);await seek(page);await listen(page)
  await expect(root(page)).toHaveAttribute('data-audio-state','ended',{timeout:23000})
  expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).ended)).toBe(true)
  await expect(trigger(page)).toHaveAccessibleName('미리듣기 다시 듣기');await expect(page.getByRole('status')).toHaveText('미리듣기 완료')
  await expect(page.locator('.sound-thread path').first()).toHaveAttribute('d','M0 3H1000')
  await listen(page);expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeLessThan(1)
})

test('reverse/offscreen pauses, becomes idle work and never resumes without another gesture',async({page})=>{
  await ready(page);await seek(page);await listen(page);await seek(page,.45)
  await expect(root(page)).toHaveAttribute('data-audio-state','paused');const at=await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)
  const count=await root(page).getAttribute('data-analysis-frames');await page.waitForTimeout(350)
  expect(await root(page).getAttribute('data-analysis-frames')).toBe(count)
  await seek(page);await page.waitForTimeout(300);expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeCloseTo(at,2)
  await expect(root(page)).toHaveAttribute('data-audio-state','paused');await listen(page)
})

test('rapid toggles and media seeks do not leave duplicate graphs or false playback',async({page})=>{
  await page.addInitScript(()=>{window.soundContexts=[];const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(options?:AudioContextOptions){super(options);window.soundContexts.push(this)}}})
  await ready(page);await seek(page);await listen(page)
  await audio(page).evaluate(e=>{(e as HTMLAudioElement).currentTime=8})
  await expect(root(page)).toHaveAttribute('data-audio-state','playing');await trigger(page).click();await audio(page).evaluate(e=>{(e as HTMLAudioElement).currentTime=2})
  await expect(root(page)).toHaveAttribute('data-audio-state','paused')
  for(let i=0;i<4;i++){await trigger(page).click();await trigger(page).click()}
  await expect(root(page)).toHaveAttribute('data-audio-state','paused');expect(await page.evaluate(()=>window.soundContexts.length)).toBe(1)
  await listen(page);await expect.poll(()=>audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeGreaterThan(2.1)
})

test('MENU/Esc restores focus; counterpart navigation releases media and context',async({page})=>{
  await page.addInitScript(()=>{window.soundContexts=[];const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(options?:AudioContextOptions){super(options);window.soundContexts.push(this)}}})
  await ready(page);await seek(page);await listen(page);await audio(page).evaluate(el=>{window.retainedMedia=el as HTMLAudioElement})
  const menu=page.getByRole('button',{name:'MENU',exact:true});await menu.focus();await menu.press('Enter');await expect(page.locator('dialog')).toHaveAttribute('data-phase','open')
  const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,500);expect(await page.evaluate(()=>scrollY)).toBe(y)
  await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();await expect(menu).toBeFocused()
  await menu.click();await expect(page.locator('dialog')).toHaveAttribute('data-phase','open');await page.getByRole('link',{name:'English',exact:true}).click()
  await expect(page).toHaveURL(/\/en\/?$/);await expect(page.locator('html')).toHaveAttribute('lang','en')
  await expect.poll(()=>page.evaluate(()=>window.soundContexts[0].state)).toBe('closed')
  expect(await page.evaluate(()=>({paused:window.retainedMedia.paused,src:window.retainedMedia.getAttribute('src')}))).toEqual({paused:true,src:null})
  await seek(page);await expect(trigger(page)).toHaveAccessibleName('Play preview');await expect(root(page)).toHaveAttribute('data-audio-state','idle')
})

test('reduced motion keeps ordered narrative and real listening with static lines',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
  await expect(root(page)).toHaveAttribute('data-sound-static','true')
  await expect(page.locator('.static-detail')).toHaveCount(4);await expect(page.locator('.static-full')).toBeVisible()
  await trigger(page).scrollIntoViewIfNeeded();await listen(page);await page.waitForTimeout(300)
  expect(await root(page).getAttribute('data-analysis-frames')).toBe('0');expect(await root(page).getAttribute('data-audio-energy')).toBe('0')
  await expect(page.getByRole('status')).toHaveText('재생 중');await expect(page.locator('.sound-static-lines')).toBeVisible()
})

test('live reduced preference preserves truthful playback through static-layout reflow',async({page})=>{
  await ready(page);await seek(page);await listen(page)
  // In the static narrative, scroll into the same Sound surface after layout expands.
  await page.emulateMedia({reducedMotion:'reduce'});await trigger(page).scrollIntoViewIfNeeded()
  if(await root(page).getAttribute('data-audio-state')==='paused')await listen(page)
  await expect(root(page)).toHaveAttribute('data-sound-static','true');const count=await root(page).getAttribute('data-analysis-frames')
  await page.waitForTimeout(500);expect(await root(page).getAttribute('data-analysis-frames')).toBe(count)
  expect(await root(page).getAttribute('data-audio-energy')).toBe('0')
})

test('320px enlarged text has readable controls and no horizontal trap',async({page})=>{
  await page.setViewportSize({width:320,height:568});await ready(page);await page.addStyleTag({content:'html {font-size:200%}'})
  await expect(root(page)).toHaveAttribute('data-sound-static','true');await trigger(page).scrollIntoViewIfNeeded()
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  expect((await trigger(page).boundingBox())!.height).toBeGreaterThanOrEqual(44)
  await trigger(page).focus();await trigger(page).press('Space');await expect(root(page)).toHaveAttribute('data-audio-state','playing')
})

test('unavailable source is disabled and truthful, with no fake clock',async({page})=>{
  await page.route('**/src/sound/source.ts*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+"\nhomeSoundSource.src=null;homeSoundSource.status='unavailable';\n",contentType:'text/javascript'})})
  await ready(page);await seek(page);await expect(trigger(page)).toBeDisabled();await expect(root(page)).toHaveAttribute('data-audio-state','unavailable')
  await expect(page.getByRole('status')).toContainText('준비되지');expect(await audio(page).getAttribute('src')).toBeNull()
})

test('media failure is announced and retry never invents playback',async({page})=>{
  await page.route('**/*.m4a',route=>route.abort());await ready(page);await seek(page);await trigger(page).click()
  await expect(root(page)).toHaveAttribute('data-audio-state','error');await expect(page.getByRole('status')).toContainText('재생할 수 없습니다')
  expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBe(0)
  await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','error')
})

test('cancel while loading remains paused after delayed bytes arrive',async({page})=>{
  let release:()=>void=()=>{};const pending=new Promise<void>(resolve=>{release=resolve})
  await page.route('**/*.m4a',async route=>{await pending;await route.continue()})
  await ready(page);await seek(page);await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','loading')
  await trigger(page).click();release();await expect(root(page)).toHaveAttribute('data-audio-state','paused');await page.waitForTimeout(500)
  expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).paused)).toBe(true);expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBe(0)
  await listen(page)
})

test('missing Web Audio capability keeps real playback with an explicit static visual',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'AudioContext',{value:undefined,configurable:true})})
  await ready(page);await seek(page);await listen(page);await expect(page.locator('.sound-visual-fallback')).toBeVisible()
  await expect(root(page)).toHaveAttribute('data-analysis-frames','0')
})

test('direct anchor and rapid reverse preserve the single line pair without starting audio',async({page})=>{
  await ready(page);await page.locator('.sequence-skip').focus();await page.locator('.sequence-skip').press('Enter')
  await expect(page).toHaveURL(/#sound-entry$/);await expect(root(page)).toHaveAttribute('data-sound-ready','true');await expect(page.locator('#sound-entry')).toBeFocused()
  const snapshot=()=>page.locator('.poster-lines .tension-line').evaluateAll(els=>els.map(el=>el.getAttribute('style')))
  await seek(page);const before=await snapshot();await seek(page,.1);await seek(page);expect(await snapshot()).toEqual(before)
  await expect(page.locator('.poster-lines .tension-line')).toHaveCount(2);await expect(root(page)).toHaveAttribute('data-audio-context','not-created')
})

test('a technically present but unapproved source cannot activate media',async({page})=>{
  await page.route('**/src/sound/source.ts*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+"\nhomeSoundSource.status='not-yet-approved';\n",contentType:'text/javascript'})})
  await ready(page);await seek(page);await expect(trigger(page)).toBeDisabled();await expect(root(page)).toHaveAttribute('data-audio-state','unavailable')
  expect(await audio(page).getAttribute('src')).toBeNull();await expect(root(page)).toHaveAttribute('data-audio-context','not-created')
})

test('hidden-document event pauses and suspends; visibility return never autoplays',async({page})=>{
  await ready(page);await seek(page);await listen(page)
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))})
  await expect(root(page)).toHaveAttribute('data-audio-state','paused');await expect(root(page)).toHaveAttribute('data-audio-context','suspended')
  const count=await root(page).getAttribute('data-analysis-frames');await page.waitForTimeout(250);expect(await root(page).getAttribute('data-analysis-frames')).toBe(count)
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:false,configurable:true});document.dispatchEvent(new Event('visibilitychange'))})
  await expect(root(page)).toHaveAttribute('data-audio-state','paused')
})

test('failed instrument imagery preserves static narrative followed by usable SOUND',async({page})=>{
  await page.route('**/*haegeum-editorial-ai.webp',route=>route.abort());await ready(page)
  await expect(root(page)).toHaveAttribute('data-sound-static','true');await trigger(page).scrollIntoViewIfNeeded();await listen(page)
  await expect(page.locator('.static-full')).toBeVisible();await expect(page.getByRole('status')).toHaveText('재생 중')
  await expect(root(page)).toHaveAttribute('data-analysis-frames','0')
})

test('a stalled source times out truthfully and leaves no background analysis',async({page})=>{
  let release:()=>void=()=>{};const pending=new Promise<void>(resolve=>{release=resolve})
  await page.route('**/*.m4a',async route=>{await pending;await route.abort()})
  try {
    await ready(page);await seek(page);await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','loading')
    await expect(root(page)).toHaveAttribute('data-audio-state','error',{timeout:14000})
    expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBe(0)
    await expect(root(page)).toHaveAttribute('data-audio-context','suspended')
  } finally { release() }
})

test('resizing active playback to mobile settles every old desktop sample on pause',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await ready(page);await seek(page);await listen(page);await page.waitForTimeout(300)
  await page.setViewportSize({width:390,height:844});await seek(page)
  if(await root(page).getAttribute('data-audio-state')==='paused')await listen(page)
  await page.waitForTimeout(200);await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','paused')
  await expect(page.locator('.sound-thread path').first()).toHaveAttribute('d','M0 3H1000')
  const count=await root(page).getAttribute('data-analysis-frames');await page.waitForTimeout(350);expect(await root(page).getAttribute('data-analysis-frames')).toBe(count)
})

test('replay reuses buffered media and its single graph instead of issuing another load',async({page})=>{
  await page.addInitScript(()=>{window.soundContexts=[];const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(options?:AudioContextOptions){super(options);window.soundContexts.push(this)}}})
  await ready(page);await seek(page)
  await audio(page).evaluate(el=>{el.dataset.loads='0';el.addEventListener('loadstart',()=>{el.dataset.loads=String(Number(el.dataset.loads)+1)})})
  await listen(page);await audio(page).evaluate(el=>{const a=el as HTMLAudioElement;a.currentTime=a.duration-.1})
  await expect(root(page)).toHaveAttribute('data-audio-state','ended')
  const loads=await audio(page).getAttribute('data-loads')
  await listen(page);expect(await audio(page).getAttribute('data-loads')).toBe(loads)
  expect(await page.evaluate(()=>window.soundContexts.length)).toBe(1)
  expect(await audio(page).evaluate(el=>(el as HTMLAudioElement).currentTime)).toBeLessThan(1)
})

test('line friction rejects DC drift, retains current points and damps after interruption',async({page})=>{
  await ready(page)
  const observation=await page.evaluate(async()=>{
    const moduleURL=performance.getEntriesByType('resource').find(entry=>entry.name.includes('/src/sound/line-response.ts'))!.name
    const {createLineResponse}=await import(moduleURL)
    const holder=document.createElement('i'),controller=createLineResponse([holder],()=>false)
    const constant=new Float32Array(1024).fill(.2)
    for(let i=0;i<12;i++)controller.paint(constant,33,false)
    const values=()=>[...holder.querySelector('path')!.getAttribute('d')!.matchAll(/L[\d.]+ ([\d.]+)/g)].map(m=>Number(m[1])-3)
    const dcMax=Math.max(...values().map(Math.abs))
    const rough=new Float32Array(1024).map((_,i)=>(i%7-3)*.06)
    for(let i=0;i<8;i++)controller.paint(rough,33,false)
    const activeMax=Math.max(...values().map(Math.abs)),before=holder.querySelector('path')!.getAttribute('d')
    controller.paint(null,0,false);const zeroTimePause=holder.querySelector('path')!.getAttribute('d')
    const damping=[]
    for(let i=0;i<22;i++){controller.paint(null,33,false);damping.push(Math.max(0,...values().map(Math.abs)))}
    const settled=holder.querySelector('path')!.getAttribute('d');controller.destroy()
    return{dcMax,activeMax,before,zeroTimePause,damping,settled,remaining:holder.childElementCount}
  })
  expect(observation.dcMax).toBe(0);expect(observation.activeMax).toBeGreaterThan(.01);expect(observation.activeMax).toBeLessThan(.63)
  expect(observation.zeroTimePause).toBe(observation.before)
  observation.damping.slice(1).forEach((value,i)=>expect(value).toBeLessThanOrEqual(observation.damping[i]+.001))
  expect(observation.settled).toBe('M0 3H1000');expect(observation.remaining).toBe(0)
})

test('320px KO and EN captions and all listening states have distinct readable space',async({page})=>{
  await page.setViewportSize({width:320,height:568})
  for(const path of ['/','/en/']){
    await ready(page,path);await seek(page)
    for(const state of ['idle','playing','paused']){
      if(state==='playing')await listen(page)
      if(state==='paused'){await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','paused')}
      const info=(await page.locator('.listen-composition').boundingBox())!,caption=(await page.locator('.sound-caption').boundingBox())!
      expect(caption.y).toBeGreaterThan(info.y+info.height+8);expect(caption.y+caption.height).toBeLessThan(556)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
      const text=(await page.locator('.listen-mask').boundingBox())!,mark=(await page.locator('.listen-mark').boundingBox())!
      expect(text.x+text.width).toBeLessThan(mark.x-3)
    }
  }
})

test('eight route returns release every previous context and do not accumulate Sound DOM',async({page})=>{
  await page.addInitScript(()=>{window.soundContexts=[];const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(options?:AudioContextOptions){super(options);window.soundContexts.push(this)}}})
  await ready(page)
  for(let i=0;i<8;i++){
    await seek(page);await listen(page)
    await expect(page.locator('audio')).toHaveCount(1);await expect(page.locator('.sound-thread')).toHaveCount(2)
    await page.getByRole('button',{name:'MENU',exact:true}).click();await expect(page.locator('dialog')).toHaveAttribute('data-phase','open')
    await page.getByRole('link',{name:i%2===0?'English':'한국어',exact:true}).click()
    await expect.poll(()=>page.evaluate(()=>window.soundContexts.every(c=>c.state==='closed'))).toBe(true)
    await expect(root(page)).toHaveAttribute('data-audio-context','not-created')
  }
  expect(await page.evaluate(()=>window.soundContexts.length)).toBe(8)
})

test('P2I: A/B and tail comparison preserves media position, graph, focus and the original line nodes',async({page})=>{
  await page.addInitScript(()=>{window.soundContexts=[];const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(options?:AudioContextOptions){super(options);window.soundContexts.push(this)}}})
  await ready(page);await seek(page);await listen(page)
  await audio(page).evaluate(el=>{window.retainedMedia=el as HTMLAudioElement})
  await page.locator('.line-one').evaluate(el=>{el.dataset.preserved='yes'})
  const at=await audio(page).evaluate(el=>(el as HTMLAudioElement).currentTime)
  await page.locator('.sound-comparison summary').click()
  await page.getByRole('radio',{name:'B · Bow contact',exact:true}).check()
  await expect(root(page)).toHaveAttribute('data-sound-visual','bow-contact')
  await expect.poll(()=>page.locator('.bow-contact').evaluate(el=>Number((el as SVGElement).style.opacity))).toBeGreaterThan(.3)
  await page.getByLabel('Tail',{exact:true}).selectOption('medium')
  await expect(root(page)).toHaveAttribute('data-contact-trail','medium')
  for(const tail of ['short','long','extra-long']){await page.getByLabel('Tail',{exact:true}).selectOption(tail);await expect(root(page)).toHaveAttribute('data-contact-trail',tail)}
  for(const violet of ['editorial','ink','electric']){await page.getByLabel('Violet',{exact:true}).selectOption(violet);await expect(root(page)).toHaveAttribute('data-contact-violet',violet)}
  await page.getByLabel('Activity',{exact:true}).selectOption('medium');await expect(root(page)).toHaveAttribute('data-contact-activity','medium')
  await page.getByLabel('Activity',{exact:true}).selectOption('bold')
  await page.getByRole('radio',{name:'A · Line only',exact:true}).check();await expect(page.locator('.bow-contact')).toHaveCount(0)
  await expect(page.getByRole('radio',{name:'A · Line only',exact:true})).toBeFocused()
  await page.getByRole('radio',{name:'B · Bow contact',exact:true}).check()
  expect(await audio(page).evaluate(el=>el===window.retainedMedia)).toBe(true)
  expect(await audio(page).evaluate(el=>(el as HTMLAudioElement).currentTime)).toBeGreaterThan(at)
  expect(await page.evaluate(()=>window.soundContexts.length)).toBe(1)
  await expect(page.locator('.line-one')).toHaveAttribute('data-preserved','yes')
  await expect(page.locator('.sound-thread')).toHaveCount(2);await expect(page.locator('.bow-contact')).toHaveCount(1)
})

test('P2I: smooth B uses a wide trajectory, long actual path and one Violet marker',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await ready(page,'/?compare=b');await seek(page)
  await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0');await expect(root(page)).toHaveAttribute('data-analysis-frames','0')
  await expect(root(page)).toHaveAttribute('data-contact-trail','long');await listen(page)
  const points=await page.evaluate(async()=>{
    const values:{x:number;y:number;tail:number;t:number}[]=[]
    await new Promise<void>(resolve=>{const start=performance.now();const tick=(t:number)=>{
      const svg=document.querySelector<SVGSVGElement>('.bow-contact')!
      values.push({x:Number(svg.dataset.x),y:Number(svg.dataset.y),tail:Number(svg.dataset.trailSpan),t})
      if(t-start<6500)requestAnimationFrame(tick);else resolve()
    };requestAnimationFrame(tick)})
    const els=[...document.querySelectorAll<HTMLElement>('.poster-lines .tension-line')]
    return {values,y:els.map(e=>parseFloat(e.style.top)),analysis:Number(document.querySelector<HTMLElement>('.sound-experience')!.dataset.analysisFrames)}
  })
  expect(Math.max(...points.values.map(p=>p.x))-Math.min(...points.values.map(p=>p.x))).toBeGreaterThan(400)
  expect(Math.min(...points.values.map(p=>p.y))).toBeLessThan(points.y[0]-40)
  expect(Math.max(...points.values.map(p=>p.y))).toBeGreaterThan(points.y[1])
  expect(Math.max(...points.values.map(p=>p.tail))).toBeGreaterThan(65)
  const moves=points.values.slice(1).map((p,i)=>({d:Math.hypot(p.x-points.values[i].x,p.y-points.values[i].y),dt:p.t-points.values[i].t}))
  for(const m of moves.filter(p=>p.dt<23))expect(m.d).toBeLessThan(25)
  expect(moves.filter(p=>p.d>.05).length).toBeGreaterThan(points.analysis*1.4)
  await expect(page.locator('.contact-head')).toHaveCount(1);await expect(page.locator('.contact-echo')).toHaveCount(0)
  expect(await page.locator('.bow-contact').evaluate(e=>e.children.length)).toBe(13)
  await expect(page.locator('.bow-contact')).toHaveAttribute('aria-hidden','true');await expect(page.locator('.bow-contact')).toHaveCSS('pointer-events','none')
  expect(await page.locator('.contact-head').evaluate(el=>getComputedStyle(el).fill)).toBe('rgb(99, 52, 229)')
  expect(await page.locator('.sound-thread path').first().evaluate(el=>getComputedStyle(el).stroke)).toBe('rgb(43, 42, 39)')
})

test('P2I: B pause settles all work; natural end/replay fades back from the outgoing contact position',async({page})=>{
  await ready(page,'/?compare=b');await seek(page);await listen(page);await page.waitForTimeout(600)
  await trigger(page).click();await expect(root(page)).toHaveAttribute('data-audio-state','paused')
  await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  const pausedY=await page.locator('.bow-contact').getAttribute('data-y'),frames=await root(page).getAttribute('data-analysis-frames')
  await page.waitForTimeout(400);expect(await root(page).getAttribute('data-analysis-frames')).toBe(frames)
  expect(await page.locator('.bow-contact').getAttribute('data-y')).toBe(pausedY)
  await listen(page);await expect.poll(()=>page.locator('.bow-contact').evaluate(e=>Number((e as SVGElement).style.opacity))).toBeGreaterThan(.2)
  await audio(page).evaluate(e=>{const a=e as HTMLAudioElement;a.currentTime=a.duration-.15})
  await expect(root(page)).toHaveAttribute('data-audio-state','ended');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  await listen(page)
  expect(await audio(page).evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeLessThan(1)
  await expect.poll(()=>page.locator('.bow-contact').evaluate(e=>Number((e as SVGElement).style.opacity))).toBeGreaterThan(.4)
})

test('P2I: B reduced motion is a static contact with real audio and zero analysis',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page,'/?compare=b')
  await trigger(page).scrollIntoViewIfNeeded();await listen(page)
  await expect(page.locator('.sound-static-contact')).toBeVisible();await expect(page.locator('.bow-contact')).toBeHidden()
  const before=await page.locator('.sound-static-contact').boundingBox()
  await page.waitForTimeout(450);expect(await page.locator('.sound-static-contact').boundingBox()).toEqual(before)
  await expect(root(page)).toHaveAttribute('data-analysis-frames','0')
  await trigger(page).focus();await trigger(page).press('Space');await expect(root(page)).toHaveAttribute('data-audio-state','paused')
})

for(const width of [320,390])test(`P2I: ${width}px B has an independent visible mark and no input or scroll trap`,async({page})=>{
  await page.setViewportSize({width,height:width===320?568:844});await ready(page,'/en/?compare=b');await seek(page);await listen(page)
  await expect.poll(()=>page.locator('.bow-contact').evaluate(e=>Number((e as SVGElement).style.opacity))).toBeGreaterThan(.3)
  const mark=(await page.locator('.contact-head').boundingBox())!
  expect(mark.width).toBeGreaterThanOrEqual(3.5);expect(mark.height).toBeGreaterThanOrEqual(3.5);expect(mark.x).toBeGreaterThan(45);expect(mark.y).toBeGreaterThan(145)
  await expect(page.locator('.contact-head')).toHaveAttribute('rx','4');await expect(page.locator('.contact-head')).toHaveAttribute('ry','1.8')
  const dock=(await page.locator('.sound-comparison').boundingBox())!
  for(const element of [page.locator('.sound-caption'),trigger(page)]){
    const box=(await element.boundingBox())!
    const overlaps=dock.x<box.x+box.width && dock.x+dock.width>box.x && dock.y<box.y+box.height && dock.y+dock.height>box.y
    expect(overlaps).toBe(false)
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  await seek(page,.3);await expect(root(page)).toHaveAttribute('data-audio-state','paused');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  const frames=await root(page).getAttribute('data-analysis-frames');await page.waitForTimeout(350);expect(await root(page).getAttribute('data-analysis-frames')).toBe(frames)
  await seek(page);await expect(root(page)).toHaveAttribute('data-audio-state','paused')
})

test('P2I: B missing analyser/failing source never substitutes an animated contact for playback',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'AudioContext',{value:undefined,configurable:true})})
  await ready(page,'/?compare=b');await seek(page);await listen(page)
  await expect(page.locator('.sound-visual-fallback')).toBeVisible();await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  await expect(root(page)).toHaveAttribute('data-analysis-frames','0')
  await page.route('**/*.m4a',route=>route.abort());await ready(page,'/?compare=b');await seek(page);await trigger(page).click()
  await expect(root(page)).toHaveAttribute('data-audio-state','error');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
})

test('P2I: B teardown removes old contact SVGs and hidden/reduced changes stop work',async({page})=>{
  await ready(page,'/?compare=b');await seek(page);await listen(page)
  const old=await page.locator('.bow-contact').elementHandle()
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))})
  await expect(root(page)).toHaveAttribute('data-audio-state','paused');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:false,configurable:true});document.dispatchEvent(new Event('visibilitychange'))})
  await listen(page);await page.emulateMedia({reducedMotion:'reduce'});await trigger(page).scrollIntoViewIfNeeded()
  await expect(page.locator('.sound-static-contact')).toBeVisible();await expect(page.locator('.bow-contact')).toBeHidden()
  await page.getByRole('button',{name:'MENU',exact:true}).click();await expect(page.locator('dialog')).toHaveAttribute('data-phase','open')
  await page.getByRole('link',{name:'English',exact:true}).click()
  await expect.poll(()=>old!.evaluate(el=>el.isConnected)).toBe(false)
  await expect(page.locator('.bow-contact')).toHaveCount(1);await expect(page.locator('audio')).toHaveCount(1)
})

for (const path of ['/', '/en?activity=medium&tail=short&violet=ink']) {
  test(`canonical SOUND ${path}: frozen B2 without comparison controls`, async ({ page }) => {
    await ready(page, path); await seek(page)
    await expect(root(page)).toHaveAttribute('data-sound-visual', 'bow-contact')
    await expect(root(page)).toHaveAttribute('data-contact-activity', 'bold')
    await expect(root(page)).toHaveAttribute('data-contact-trail', 'long')
    await expect(root(page)).toHaveAttribute('data-contact-violet', 'electric')
    await expect(page.locator('.sound-comparison')).toHaveCount(0)
    await expect(page.locator('.bow-contact')).toHaveCount(1)
    expect(await page.locator('.bow-contact').evaluate(el => getComputedStyle(el).color)).toBe('rgb(99, 52, 229)')
    await listen(page); await trigger(page).click()
    await expect(root(page)).toHaveAttribute('data-audio-state', 'paused')
  })
}
