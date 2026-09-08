import {test,expect,type Page} from '@playwright/test'
async function ready(page:Page,path='/'){
  await page.goto(path);await page.locator('.spatial-canvas').first().waitFor({state:'attached'})
  // Only this suite's imagery is readiness-critical. Later HOME lazy assets should not be forced at the Hero.
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll<HTMLImageElement>('.sound-experience img')].map(i=>i.decode().catch(()=>{})))})
}
async function seek(page:Page,p:number){
  await page.evaluate(p=>{const s=document.querySelector<HTMLElement>('.poster-scene')!;scrollTo(0,s.offsetTop+(s.offsetHeight-s.querySelector<HTMLElement>('.poster-stage')!.offsetHeight)*p)},p)
  await expect.poll(()=>page.locator('.poster-scene').evaluate((e,p)=>Math.abs(Number(e.dataset.targetProgress)-p)<.001&&e.dataset.progress===e.dataset.targetProgress,p)).toBe(true)
  // The independent visual renderer consumes the settled scroll state on its next frame.
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
}
test('A retains frozen line/word presentation; comparison changes do not remount native audio',async({page})=>{
  await ready(page,'/?all=a');const root=page.locator('.sound-experience');await expect(root).toHaveAttribute('data-spatial-points','false')
  await expect(page.locator('.sound-surface .listen-mask')).toHaveCount(1);await expect(page.locator('.sound-surface .glyph-label')).toHaveCount(0)
  await seek(page,1);await page.locator('audio').evaluate(e=>e.dataset.identity='same-element')
  await page.locator('.p2k-comparison summary').click()
  // URL-backed controlled inputs commit with the router transition; observe the settled choice.
  for(const label of ['공간을 흐르는 두 점','해금과 장구','글자 재조립']){const choice=page.getByLabel(label,{exact:true});await choice.click();await expect(choice).toBeChecked()}
  await expect(page.locator('audio')).toHaveAttribute('data-identity','same-element');await expect(page.locator('.spatial-canvas')).toHaveCount(2)
})
test('free trajectories have depth and bounded history, lock precisely to authored imagery, reverse cleanly',async({page})=>{
  await ready(page);const root=page.locator('.sound-experience'),one=await root.getAttribute('data-p2k-point0');await page.waitForTimeout(500)
  expect(await root.getAttribute('data-p2k-point0')).not.toBe(one)
  await seek(page,155/235);await expect(root).toHaveAttribute('data-p2k-stage','LOCK-ON')
  for(let i=0;i<2;i++){const data=await root.evaluate((e,i)=>({point:JSON.parse(e.dataset[`p2kPoint${i}`]!),target:JSON.parse(e.dataset[`p2kTarget${i}`]!)}),i);expect(Math.hypot(data.point.x-data.target.x,data.point.y-data.target.y)).toBeLessThan(.1)}
  expect(Number(await root.getAttribute('data-p2k-history'))).toBeLessThanOrEqual(320)
  await seek(page,0);await expect(root).toHaveAttribute('data-p2k-stage','FREE MOTION')
  await expect(page.locator('.poster-lines')).toHaveCSS('visibility','hidden')
})
test('SOUND sweep establishes horizontal lines; idle Janggu moves without fake playback',async({page})=>{
  await ready(page);await seek(page,.88)
  const root=page.locator('.sound-experience');const first=JSON.parse((await root.getAttribute('data-p2k-point0'))!)
  await expect(page.locator('.line-one')).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, 0)')
  await seek(page,.96);const next=JSON.parse((await root.getAttribute('data-p2k-point0'))!);expect(next.x).toBeGreaterThan(first.x);expect(next.y).toBeCloseTo(first.y,0)
  await seek(page,1);await expect(root).toHaveAttribute('data-janggu-hits','0');expect(await page.locator('audio').evaluate(e=>(e as HTMLAudioElement).paused)).toBe(true)
  const before=await root.getAttribute('data-janggu-point');await page.waitForTimeout(350);expect(await root.getAttribute('data-janggu-point')).not.toBe(before)
})
test('native playback drives conservative accents, no accents during pause and seek does not replay missed events',async({page})=>{
  await ready(page);await seek(page,1);const root=page.locator('.sound-experience'),button=page.locator('.sound-surface .listen-trigger')
  await button.click();await expect(root).toHaveAttribute('data-audio-state','playing')
  await expect.poll(async()=>Number(await root.getAttribute('data-janggu-hits'))).toBeGreaterThan(0)
  await expect.poll(async()=>Number(await root.getAttribute('data-janggu-activity'))).toBeGreaterThan(.8)
  await button.click();await expect(root).toHaveAttribute('data-audio-state','paused');const hits=await root.getAttribute('data-janggu-hits')
  await page.waitForTimeout(300);expect(await root.getAttribute('data-janggu-hits')).toBe(hits)
  await expect.poll(async()=>Number(await root.getAttribute('data-janggu-activity'))).toBeLessThan(.1)
  await page.locator('audio').evaluate(e=>{(e as HTMLAudioElement).currentTime=14});await page.waitForTimeout(200);expect(await root.getAttribute('data-janggu-hits')).toBe(hits)
  await expect(page.locator('.sound-surface .glyph-label')).toHaveAttribute('data-word','RESUME')
  await expect(button).toHaveAccessibleName('미리듣기 계속 듣기')
})

test('Janggu records every visual frame and subdivides its continuous ribbon independently of audio cues',async({page})=>{
  await ready(page);await seek(page,1);await page.locator('.sound-surface .listen-trigger').click()
  await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state','playing')
  const sample=await page.evaluate(()=>new Promise<{frames:number;samples:number;subdivided:boolean;moving:number}>(resolve=>{
    const root=document.querySelector<HTMLElement>('.sound-experience')!,startFrames=Number(root.dataset.p2kFrames),startSamples=Number(root.dataset.jangguSamples)
    let calls=0,moving=0,previous='',subdivided=false
    const read=()=>{
      const next=root.dataset.jangguPoint!;if(previous&&next!==previous)moving++;previous=next
      subdivided ||= Number(root.dataset.jangguRibbonPoints)>Number(root.dataset.jangguSamples)
      if(++calls===18)resolve({frames:Number(root.dataset.p2kFrames)-startFrames,samples:Number(root.dataset.jangguSamples)-startSamples,subdivided,moving});else requestAnimationFrame(read)
    };requestAnimationFrame(read)
  }))
  expect(sample.samples).toBe(sample.frames);expect(sample.moving).toBeGreaterThan(14);expect(sample.subdivided).toBe(true)
})
test('menu and offscreen suspend the experimental loop, resume without resource growth',async({page})=>{
  await ready(page);const root=page.locator('.sound-experience');await page.getByRole('button',{name:'MENU',exact:true}).click();await expect(root).toHaveAttribute('data-p2k-active','false')
  const frozen=await root.getAttribute('data-p2k-frames');await page.waitForTimeout(150);expect(await root.getAttribute('data-p2k-frames')).toBe(frozen)
  await page.keyboard.press('Escape');await expect(root).toHaveAttribute('data-p2k-active','true')
  await page.evaluate(()=>{const spacer=document.createElement('div');spacer.style.height='120vh';spacer.dataset.test='offscreen-fixture';document.body.append(spacer);scrollTo(0,document.body.scrollHeight)});await expect(root).toHaveAttribute('data-p2k-active','false')
  await seek(page,0);await expect(root).toHaveAttribute('data-p2k-active','true');await expect(page.locator('.spatial-canvas')).toHaveCount(2)
})
test('shared glyph DOM identity survives PAUSE/RESUME and rapid interrupted transitions settle',async({page})=>{
  await ready(page,'/?study=type');await page.locator('.type-study').scrollIntoViewIfNeeded();const label=page.locator('.type-study .glyph-label')
  await page.getByRole('button',{name:'PAUSE',exact:true}).click();await expect(label).toHaveAttribute('data-word','PAUSE');await page.waitForTimeout(480)
  await label.locator('[data-char="E"]').evaluate(e=>e.dataset.preserved='yes')
  await page.getByRole('button',{name:'RESUME',exact:true}).click();await expect(label.locator('[data-char="E"][data-preserved="yes"]')).toHaveCount(1)
  for(const word of ['PLAY','PAUSE','REPLAY','RESUME'])await page.getByRole('button',{name:word,exact:true}).click()
  await page.waitForTimeout(500);await expect(label.locator('.state-glyph')).toHaveCount(6)
  expect(await label.locator('.state-glyph').evaluateAll(elements=>elements.sort((a,b)=>Number((a as HTMLElement).dataset.slot)-Number((b as HTMLElement).dataset.slot)).map(e=>e.textContent).join(''))).toBe('RESUME')
  expect(await label.evaluate(e=>e.getAnimations({subtree:true}).length)).toBe(0)
})
for(const width of [320,390])test(`mobile ${width}: adaptive buffer, legible type, playback in emulated viewport`,async({page})=>{
  await page.setViewportSize({width,height:844});await ready(page);await seek(page,1)
  const root=page.locator('.sound-experience');await page.locator('.listen-trigger').first().click();await expect(root).toHaveAttribute('data-audio-state','playing')
  await expect(page.locator('.sound-surface .glyph-label')).toHaveAttribute('data-word','PAUSE');await page.waitForTimeout(500)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  expect(Number(await root.getAttribute('data-p2k-history'))).toBeLessThanOrEqual(224)
  const bounds=await page.locator('.sound-surface .glyph-label').boundingBox();expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width)
})
test('reduced motion keeps authentic static sequence, stable glyphs and keyboard playback',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await expect(page.locator('.instrument-static')).toBeVisible()
  const root=page.locator('.sound-experience');await expect(root).toHaveAttribute('data-p2k-active','false')
  await page.locator('.listen-trigger').first().scrollIntoViewIfNeeded();await page.locator('.listen-trigger').first().focus();await page.keyboard.press('Enter')
  await expect(root).toHaveAttribute('data-audio-state','playing');await expect(page.locator('.sound-surface .glyph-label')).toHaveAttribute('data-word','PAUSE')
  expect(await page.locator('.sound-surface .glyph-label').evaluate(e=>e.getAnimations({subtree:true}).length)).toBe(0)
})
test('no Web Audio: declared static Haegeum and offline Janggu candidates follow real media',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'AudioContext',{value:undefined,configurable:true}))
  await ready(page,'/en');await seek(page,1);await expect(page.locator('html')).toHaveAttribute('lang','en')
  await page.locator('.listen-trigger').first().click();const root=page.locator('.sound-experience')
  await expect(root).toHaveAttribute('data-audio-state','playing')
  await expect(page.locator('.sound-visual-fallback')).toHaveText('Static Haegeum · Janggu uses precomputed percussion candidates.')
  await expect.poll(async()=>Number(await root.getAttribute('data-janggu-hits'))).toBeGreaterThan(0)
  await expect(root).toHaveAttribute('data-analysis-frames','0');await expect(page.locator('.bow-contact')).toHaveCSS('opacity','0')
  expect(await page.locator('audio').evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeGreaterThan(0)
})
test('leaving HOME unmounts the experiments and native media; route fixture is not a new page',async({page})=>{
  await ready(page);await page.getByRole('button',{name:'MENU',exact:true}).click()
  await page.locator('dialog a[href="/works/"]').click();await expect(page).toHaveURL(/\/works\/$/)
  await expect(page.locator('audio')).toHaveCount(0);await expect(page.locator('.spatial-canvas')).toHaveCount(0)
  await page.getByText('Return to interaction study →').click();await expect(page.locator('.spatial-canvas')).toHaveCount(2)
})
