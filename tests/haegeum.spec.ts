import { expect, test, type Page } from '@playwright/test'
async function ready(page: Page, path = '/') {
  const response = await page.goto(path)
  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow')
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.poster-stage img').evaluateAll(els => Promise.all(els.map(el => (el as HTMLImageElement).decode())))
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-progress', '0.00000')
}
async function seek(page: Page, value: number) {
  await page.evaluate(p => scrollTo(0, p * (document.querySelector<HTMLElement>('.poster-scene')!.offsetHeight - document.querySelector<HTMLElement>('.poster-stage')!.offsetHeight)), value)
  await expect.poll(async () => Number(await page.locator('.poster-scene').getAttribute('data-progress'))).toBeCloseTo(value, 2)
  await expect.poll(() => page.locator('.poster-scene').evaluate(el => (el as HTMLElement).dataset.progress === (el as HTMLElement).dataset.targetProgress)).toBe(true)
}
const stages = [[.4,'head','LINE'],[.59,'bow','TENSION'],[.78,'resonance','RESONANCE'],[1,'full','HAEGEUM']] as const
for (const [width, height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,1000],[1920,1080]]) {
  test(`${width}: four stages, readable keyword, independent framing and no overflow`, async ({ browser }, info) => {
    const context = await browser.newContext({baseURL:'http://127.0.0.1:4178', viewport:{width,height}, hasTouch:width<640, isMobile:width<640})
    const page = await context.newPage(), errors: string[] = [];page.on('pageerror', e=>errors.push(e.message));await ready(page)
    expect(await page.locator('h1').count()).toBe(1)
    for (const [p,stage,word] of stages) {
      await seek(page,p)
      await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-instrument-stage',stage)
      const visible = page.locator('.keyword-back > span').filter({visible:true})
      await expect(visible).toHaveCount(1);await expect(visible).toHaveText(word)
      const box=(await visible.boundingBox())!;expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width+1)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
      await expect(page.locator('.tension-line')).toHaveCount(2)
      await page.screenshot({path:info.outputPath(`${width}-${stage}.png`)})
    }
    await expect(page.getByText('AI-GENERATED VISUAL STUDY',{exact:true})).toBeVisible()
    expect(await page.evaluate(()=>!!document.querySelector('canvas,video,audio'))).toBe(false)
    expect(errors).toEqual([]);await context.close()
  })
}
test('native travel overlaps Hero exit; same DOM and reversible settled state',async ({page})=>{
  await ready(page);const before=await page.locator('.poster-stage').evaluate(el=>{el.dataset.continuity='same-stage';return (el as HTMLElement).offsetHeight})
  const distance=await page.locator('.haegeum-experience').evaluate(el=>(el as HTMLElement).offsetHeight)
  expect((distance-before)/await page.evaluate(()=>innerHeight)).toBeCloseTo(1.55,1)
  const sample=()=>page.locator('.tension-line,.playing-image,.editorial-image,.poster-type-back .word').evaluateAll(els=>els.map(el=>({style:(el as HTMLElement).getAttribute('style'),transform:getComputedStyle(el).transform,translate:getComputedStyle(el).translate})))
  await seek(page,.59);const middle=await sample();await seek(page,1);await seek(page,.59);expect(await sample()).toEqual(middle)
  await seek(page,0);await expect(page.locator('.poster-stage')).toHaveAttribute('data-continuity','same-stage')
  expect(await page.locator('.portrait-initial').evaluate(el=>getComputedStyle(el).opacity)).toBe('1')
})
test('rapid full/reverse scroll crosses one closed portrait frame and stops RAF',async ({page})=>{
  await ready(page)
  await page.evaluate(()=>{ const w=window as unknown as {samples:number[][];samplesDone:boolean};w.samples=[];w.samplesDone=false; const el=document.querySelector<HTMLElement>('.poster-scene')!;let count=0;function tick(){w.samples.push([+el.style.getPropertyValue('--source-next'),+el.style.getPropertyValue('--aperture')]);if(++count<140)requestAnimationFrame(tick);else w.samplesDone=true}requestAnimationFrame(tick) })
  await seek(page,1);await seek(page,0);await page.waitForTimeout(400)
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {samplesDone:boolean}).samplesDone)).toBe(true)
  const values=await page.evaluate(()=>(window as unknown as {samples:number[][]}).samples)
  let changes=0;for(let i=1;i<values.length;i++)if(values[i][0]!==values[i-1][0]){changes++;expect(Math.min(values[i][1],values[i-1][1])).toBeLessThan(.00001)}
  expect(changes).toBe(2)
  const calls=await page.evaluate(async()=>{const original=window.requestAnimationFrame;let count=0;window.requestAnimationFrame=cb=>{count++;return original(cb)};await new Promise(r=>setTimeout(r,250));window.requestAnimationFrame=original;return count})
  expect(calls).toBe(0)
})
test('reduced motion preserves static four-stage order and updates live',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-motion','reduced')
  expect(await page.locator('.poster-stage').evaluate(el=>getComputedStyle(el).position)).toBe('relative')
  await expect(page.locator('.instrument-static h3')).toHaveText(['LINE','TENSION','RESONANCE','HAEGEUM'])
  const boxes=await page.locator('.static-detail').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().top));expect(boxes).toEqual([...boxes].sort((a,b)=>a-b))
  await expect(page.locator('.static-full img')).toHaveAttribute('alt',/AI 생성/)
  await page.emulateMedia({reducedMotion:'no-preference'});await expect(page.locator('.haegeum-experience')).not.toHaveAttribute('data-motion','reduced')
  await seek(page,.59);await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-progress','0.00000')
})
test('keyboard skip, menu Esc restore, scroll release and semantic KO/EN counterpart',async({page}, info)=>{
  await ready(page);await seek(page,.59)
  const button=page.getByRole('button',{name:'MENU',exact:true});await button.focus();await page.keyboard.press('Enter')
  await expect(page.locator('dialog')).toHaveAttribute('data-phase','open');await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();await expect(button).toBeFocused()
  await button.press('Enter');await expect(page.locator('dialog')).toHaveAttribute('data-phase','open');await page.getByRole('link',{name:'English',exact:true}).click()
  await expect(page).toHaveURL(/\/en\/?$/);await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('.haegeum-experience')).toBeVisible()
  const skip=page.getByRole('link',{name:'SKIP SEQUENCE ↓',exact:true});await skip.focus();await expect(skip).toBeInViewport();await skip.press('Enter');await expect(page.locator('#haegeum-end')).toBeFocused()
  expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden')
  await page.screenshot({path:info.outputPath('keyboard-boundary.png')})
})
test('failed continuation image retains readable static narrative and functional navigation',async({page})=>{
  await page.route('**/haegeum-playing.webp',route=>route.abort());await page.goto('/')
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-instrument-error','true')
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-motion','reduced')
  await expect(page.locator('.instrument-static h3')).toHaveText(['LINE','TENSION','RESONANCE','HAEGEUM'])
  await page.getByRole('button',{name:'MENU',exact:true}).click();await expect(page.locator('dialog')).toHaveAttribute('data-phase','open')
})
test('late deep-scroll imagery selects static fallback rather than popping into the motion plane',async({page})=>{
  let release!:()=>void;const pending=new Promise<void>(r=>{release=r})
  await page.route('**/haegeum-playing.webp',async route=>{await pending;await route.continue()})
  await page.goto('/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>scrollTo(0,innerHeight*.9))
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-instrument-fallback','true')
  release();await page.locator('.playing-image').evaluate(el=>(el as HTMLImageElement).decode())
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-motion','reduced')
})
test('200% text and 320px preserve document reading order and navigation targets',async({page})=>{
  await page.setViewportSize({width:320,height:568});await ready(page);await page.addStyleTag({content:'html{font-size:200%}'})
  await expect(page.locator('.haegeum-experience')).toHaveAttribute('data-reflow','true');await expect(page.locator('.instrument-static h3')).toHaveCount(4)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  for(const control of await page.locator('header a,header button').all()){const box=(await control.boundingBox())!;expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44)}
})
