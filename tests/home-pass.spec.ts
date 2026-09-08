import {test,expect,type Page} from '@playwright/test'
async function ready(page:Page){
  await page.goto('/')
  await page.locator('.sound-experience img').evaluateAll(images=>Promise.all(images.map(i=>(i as HTMLImageElement).decode())))
  await page.evaluate(()=>document.fonts.ready)
}
async function seek(page:Page,selector:string,p:number){
  await page.locator(selector).evaluate((e,p)=>{const height=e.querySelector<HTMLElement>('.poster-stage,.stage-artist-sticky')?.offsetHeight??innerHeight;scrollTo({top:scrollY+e.getBoundingClientRect().top+((e as HTMLElement).offsetHeight-height)*p,behavior:'instant'})},p)
  if(selector==='.stage-artist-sequence')await expect.poll(()=>page.locator(selector).evaluate(e=>{const d=(e as HTMLElement).dataset,travel=(e as HTMLElement).offsetHeight-e.querySelector<HTMLElement>('.stage-artist-sticky')!.offsetHeight,actual=Math.max(0,Math.min(1,-e.getBoundingClientRect().top/travel)).toFixed(4);return d.sequenceTarget===actual&&d.sequenceProgress===actual})).toBe(true)
}
for(const width of [390,1440])test(`LISTEN ${width}: gesture unlock, canonical frame, audible start; resume does not snap`,async({page})=>{
  await page.setViewportSize({width,height:900});await ready(page)
  await page.locator('audio').evaluate(e=>{
    const audio=e as HTMLAudioElement,root=audio.closest<HTMLElement>('.sound-experience')!
    ;(window as unknown as {audibleStarts:string[]}).audibleStarts=[]
    audio.addEventListener('playing',()=>{if(!audio.muted)(window as unknown as {audibleStarts:string[]}).audibleStarts.push(root.dataset.soundAlignment??'none')})
  })
  await seek(page,'.poster-scene',1.14)
  const root=page.locator('.sound-experience'),media=page.locator('audio'),button=page.locator('.listen-trigger')
  await expect(root).toHaveAttribute('data-sound-ready','true')
  const before=await page.evaluate(()=>scrollY)
  await button.click();await expect(root).toHaveAttribute('data-sound-alignment','aligned')
  await expect(root).toHaveAttribute('data-audio-state','playing')
  expect(await media.evaluate(e=>(e as HTMLAudioElement).currentTime)).toBeLessThan(1)
  expect(await page.evaluate(()=>scrollY)).toBeLessThan(before-50)
  expect(await root.evaluate(e=>Math.abs(scrollY-Number(e.dataset.soundFocusY)))).toBeLessThan(2)
  expect(await page.evaluate(()=>(window as unknown as {audibleStarts:string[]}).audibleStarts)).toEqual(['aligned'])
  const lines=await page.locator('.poster-lines .tension-line').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().toJSON()))
  for(const line of lines){expect(line.y).toBeGreaterThan(90);expect(line.bottom).toBeLessThan(450)}
  await button.click();await expect(root).toHaveAttribute('data-audio-state','paused')
  await page.evaluate(()=>scrollBy({top:35,behavior:'instant'}));const pausedY=await page.evaluate(()=>scrollY)
  await button.click();await expect(root).toHaveAttribute('data-audio-state','playing')
  expect(await page.evaluate(()=>scrollY)).toBe(pausedY)
})

test('SOUND alignment yields to explicit scroll and cancels playback intent',async({page})=>{
  await ready(page);await seek(page,'.poster-scene',1.2)
  const root=page.locator('.sound-experience');await expect(root).toHaveAttribute('data-sound-ready','true')
  await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-sound-alignment','aligning')
  await page.mouse.wheel(0,160)
  await expect(root).toHaveAttribute('data-sound-alignment','cancelled')
  await expect(root).toHaveAttribute('data-audio-state','paused')
  expect(await page.locator('audio').evaluate(e=>(e as HTMLAudioElement).paused)).toBe(true)
})

for(const width of [320,390,768,1440])test(`stage aperture / same seam into identity ${width}: forward and reverse`,async({page})=>{
  await page.setViewportSize({width,height:900});await ready(page)
  const sequence=page.locator('.stage-artist-sequence')
  await expect(page.locator('#performance-heading')).toHaveText('풀고, 엮다')
  await expect(page.locator('.stage-date')).toHaveAttribute('datetime','2026-09-22T19:30:00+09:00')
  await expect(page.locator('.performance-caption a')).toHaveAttribute('href','https://choyounkyoung.com/performance/haegeum-jeongak-2026-09-22/')
  const seam=await page.locator('.shared-seam').elementHandle()
  await seek(page,'.stage-artist-sequence',0)
  await expect(sequence).toHaveAttribute('data-stage-opening','0.0000')
  await seek(page,'.stage-artist-sequence',.28);await expect(sequence).toHaveAttribute('data-stage-opening','1.0000')
  await expect(page.locator('.performance-poster')).toBeVisible()
  await seek(page,'.stage-artist-sequence',.56);await expect(sequence).toHaveAttribute('data-sequence-state','handoff')
  const middle=await page.locator('.shared-seam').evaluate(e=>e.getBoundingClientRect().x)
  await seek(page,'.stage-artist-sequence',.87);await expect(sequence).toHaveAttribute('data-sequence-state','artist')
  await expect.poll(()=>sequence.getAttribute('data-identity-handoff')).toBe('1.0000')
  expect(await seam!.evaluate(e=>e.isConnected)).toBe(true)
  await expect(page.locator('.artist-hanbok')).toHaveAttribute('src',/artist-portrait-hanbok/)
  const clip=await page.locator('.artist-hanbok').evaluate(e=>getComputedStyle(e).clipPath)
  expect(clip).not.toBe('none')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  await seek(page,'.stage-artist-sequence',.56)
  await expect.poll(()=>page.locator('.shared-seam').evaluate(e=>Math.abs(e.getBoundingClientRect().x)),{message:'same boundary returns to its previous position'}).toBeCloseTo(middle,0)
})

test('real browser touch: horizontal first swipe rotates, vertical swipe scrolls, release settles',async({browserName,browser})=>{
  test.skip(browserName!=='chromium','Chromium CDP provides native touch injection; WebKit mouse/keyboard contracts run in home.spec.')
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage()
  try{
    await page.goto('http://127.0.0.1:4180/');await page.locator('.album-object-surface').scrollIntoViewIfNeeded()
    const surface=page.locator('.album-object-surface')
    await expect(surface).toHaveAttribute('data-turn',/-?\d/)
    const box=(await surface.boundingBox())!,cdp=await context.newCDPSession(page)
    const x=box.x+box.width*.3,y=box.y+box.height*.5,before=Number(await surface.getAttribute('data-turn')),scroll=await page.evaluate(()=>scrollY)
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]})
    for(let i=1;i<=12;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+i*8,y:y+1}]})
    await expect.poll(async()=>Number(await surface.getAttribute('data-turn'))).toBeGreaterThan(before+45)
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
    await expect(surface).toHaveAttribute('data-dragging','false')
    expect(Math.abs(await page.evaluate(()=>scrollY)-scroll)).toBeLessThan(2)
    await expect(surface).toHaveAttribute('data-moving','false')
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]})
    for(let i=1;i<=12;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+1,y:y-i*12}]})
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
    await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(scroll+70)
    await expect(surface).toHaveAttribute('data-dragging','false')
  }finally{await context.close()}
})

test('reduced motion: still portraits, all work links, explicit sound state and instant alignment',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
  await expect(page.locator('.stage-artist-sequence')).toHaveAttribute('data-sequence-state','static')
  await expect(page.locator('.shared-seam')).toHaveCSS('display','none')
  expect(await page.locator('.selected-work').evaluateAll(es=>es.every(e=>!(e as HTMLElement).inert))).toBe(true)
  await page.locator('.listen-trigger').scrollIntoViewIfNeeded();await page.locator('.listen-trigger').click()
  await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state','playing')
  await expect(page.locator('#sound-state')).toHaveText('재생 중')
})

test('SOUND slow source: cancelling alignment immediately clears the pending muted primer',async({page})=>{
  let release!:()=>void
  const gate=new Promise<void>(resolve=>{release=resolve})
  await page.route('**/*.m4a',async route=>{await gate;await route.continue()})
  try{
    await ready(page);await seek(page,'.poster-scene',1.2)
    const root=page.locator('.sound-experience');await expect(root).toHaveAttribute('data-sound-ready','true')
    await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-sound-alignment','aligning')
    await page.mouse.wheel(0,140)
    await expect(root).toHaveAttribute('data-audio-state','paused')
    expect(await page.locator('audio').evaluate(e=>{const a=e as HTMLAudioElement;return a.paused&&!a.muted})).toBe(true)
  } finally {release();await page.unrouteAll({behavior:'wait'})}
})
