import { test, expect, type Page } from '@playwright/test'

async function ready(page: Page, path = '/') {
  await page.goto(path)
  await expect(page.locator('.home-closing')).toHaveAttribute('data-motion', /ready|reduced/)
  await page.evaluate(() => document.fonts.ready)
}
async function scene(page: Page, selector: string, progress = 0) {
  if (selector === '.performance-scene' || selector === '.artist-scene') { progress=selector === '.performance-scene' ? .28 : .87; selector='.stage-artist-sequence' }
  await page.locator(selector).evaluate((element, p) => {
    const box = element.getBoundingClientRect()
    scrollTo({ top: scrollY + box.top + Math.max(0, box.height - innerHeight) * p, behavior: 'instant' })
  }, progress)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

test('HOME has the complete scene sequence and five authentic selections without default comparison chrome', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await ready(page)
  await expect(page.locator('[data-home-scene]')).toHaveCount(5)
  expect(await page.locator('[data-home-scene]').evaluateAll(elements => elements.map(e => (e as HTMLElement).dataset.homeScene))).toEqual(['04', '05', '06', '07', '08'])
  await expect(page.locator('.selected-work')).toHaveCount(5)
  await expect(page.locator('.p2k-comparison,.type-study')).toHaveCount(0)
  for (const id of ['.works-scene', '.album-object-scene', '.performance-scene', '.artist-scene', '.home-outro']) await scene(page, id, 1)
  // Lazy media is requested by real exposure, including the previously offstage ribbon/object choices.
  await scene(page,'.works-scene')
  for(let i=0;i<5;i++){
    await page.locator('.works-selector button').nth(i).click()
    await expect(page.locator('.works-scene')).toHaveAttribute('data-ribbon-index',String(i))
    await expect.poll(()=>page.locator('.selected-work img').nth(i).evaluate(e=>(e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  await scene(page,'.album-object-scene',.5)
  for(let i=0;i<3;i++){
    await page.locator('.album-selector button').nth(i).click()
    await expect.poll(()=>page.locator('.album-exchange-slot[data-active="true"] img').evaluateAll(images=>images.every(e=>(e as HTMLImageElement).complete&&(e as HTMLImageElement).naturalWidth>0))).toBe(true)
  }
  const images = await page.locator('.home-closing img').evaluateAll(async elements => {
    const images = elements as HTMLImageElement[]
    await Promise.all(images.map(image => image.decode().catch(() => {})))
    return images.map(image => ({ loaded: image.complete && image.naturalWidth > 0, source: image.currentSrc }))
  })
  expect(images.every(image => image.loaded)).toBe(true)
  await expect(page.locator('.outro-invitation .editorial-link')).toHaveAttribute('href', '/works/')
  expect(errors).toEqual([])
})

test('the short works ribbon exposes each selection and keeps native hash navigation to its subject', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await ready(page)
  await scene(page, '.works-scene', 1)
  await expect.poll(() => page.locator('.works-scene').evaluate(e => Number(e.style.getPropertyValue('--scene-p')))).toBe(1)
  await page.locator('.works-selector button').nth(2).click()
  await expect(page.locator('.works-scene')).toHaveAttribute('data-ribbon-index','2')
  await page.locator('.work-3 a').click()
  await expect(page).toHaveURL(/#album-object$/)
  await expect(page.locator('.album-presentation')).toHaveAttribute('data-selected-album', 'album:yeongsan-hoesang-2026')
  await scene(page, '.works-scene', .25); await page.locator('.works-selector button').nth(1).click(); await page.locator('.work-2 a').click()
  await expect(page).toHaveURL(/#performance$/)
  await expect(page.locator('.performance-caption h2')).toHaveText('풀고, 엮다')
  await expect(page.locator('.work-5 a')).toHaveAttribute('href','https://choyounkyoung.com/performance/sanjo-gil-2026-08-16/')
})

test('each ribbon image is large, fully exposed and clear of the shared heading and caption ledger', async ({ page }) => {
  await ready(page)
  for (const [width, height] of [[1440, 1000], [1280, 720], [1024, 768], [768, 1024]]) {
    await page.setViewportSize({ width, height }); await scene(page, '.works-scene')
    for(let i=0;i<5;i++){
      await page.locator('.works-selector button').nth(i).click()
      await expect(page.locator('.works-scene')).toHaveAttribute('data-ribbon-index',String(i))
      await expect.poll(()=>page.locator('.selected-work').nth(i).evaluate(element=>{
        const image=element.querySelector('.work-image')!.getBoundingClientRect(),root=element.closest('.works-sticky')!
        const heading=root.querySelector('.works-header')!.getBoundingClientRect(),ledger=root.querySelector('.works-ledger')!.getBoundingClientRect()
        const center=document.elementFromPoint(image.x+image.width/2,image.y+image.height/2)
        return image.top>=heading.bottom+10&&image.bottom<=ledger.top-10&&image.left>=0&&image.right<=innerWidth&&Math.min(image.width,image.height)>Math.min(innerWidth*.28,innerHeight*.33)&&!!center?.closest('.selected-work')?.isSameNode(element)
      }),{message:`${width}×${height} / work ${i+1}`}).toBe(true)
    }
  }
})

test('SOUND strands converge into two points, orbit a work, carry into the object and reverse cleanly', async ({ page }) => {
  await ready(page)
  await page.locator('.works-scene').evaluate(element => scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * .5, behavior: 'instant' }))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-line-handoff', '0.500')
  await expect.poll(() => page.locator('.works-axis').evaluate(e => Number(getComputedStyle(e).opacity))).toBeGreaterThan(.5)
  const path = await page.locator('.works-axis path').first().getAttribute('d'); expect(path).toMatch(/^M-?\d/)
  await scene(page,'.works-scene',.5)
  await expect(page.locator('.works-scene')).toHaveAttribute('data-ribbon-index','2')
  const image=page.locator('.work-3 .work-image'); await image.hover()
  await expect(page.locator('.works-scene')).toHaveAttribute('data-motif','orbit')
  await expect(page.locator('.works-scene')).toHaveAttribute('data-orbit-work','2')
  await page.mouse.move(2,2); await expect(page.locator('.works-scene')).toHaveAttribute('data-motif','free')
  await page.locator('.album-object-scene').evaluate(e=>scrollTo({top:scrollY+e.getBoundingClientRect().top-innerHeight*.4,behavior:'instant'}))
  await expect(page.locator('.works-scene')).toHaveAttribute('data-motif','object-handoff')
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-line-handoff', '0.000')
  await expect(page.locator('.poster-lines')).toHaveCSS('opacity', '1')
})

test('album surface supports drag, keyboard, front/back and selection without resetting its pose', async ({ page }) => {
  await ready(page); await scene(page, '.album-object-scene', .55)
  const surface = page.locator('.album-object-surface')
  await surface.scrollIntoViewIfNeeded(); await surface.focus(); await expect(surface).toHaveAttribute('data-turn',/-?\d/)
  const beforeTurn=Number(await surface.getAttribute('data-turn'))
  await page.keyboard.press('ArrowRight')
  await expect.poll(async () => Number(await surface.getAttribute('data-turn'))).toBeGreaterThan(beforeTurn+30)
  await expect(surface).toHaveCSS('perspective','1200px')
  expect(await surface.evaluate(e=>parseFloat(e.style.getPropertyValue('--album-depth')))).toBeGreaterThan(20)
  await page.getByRole('button', { name: '뒷면', exact: true }).click()
  await expect.poll(async () => Number(await surface.getAttribute('data-turn'))).toBeCloseTo(180, 0)
  await page.locator('.album-selector button').nth(2).click()
  await expect(page.locator('.album-presentation')).toHaveAttribute('data-selected-album', 'album:pyeongjo-hoesang-2026')
  expect(Number(await surface.getAttribute('data-turn'))).toBeCloseTo(180, 0)
  const current=page.locator('.album-exchange-slot[data-active="true"]')
  await expect(current).toHaveCount(1)
  await expect.poll(()=>current.evaluate(e=>e.getAnimations().length)).toBe(0)
  await page.locator('.album-selector button').nth(0).click()
  await page.locator('.album-selector button').nth(1).click()
  await expect(page.locator('.album-presentation')).toHaveAttribute('data-selected-album','album:yeongsan-hoesang-2026')
  await expect.poll(()=>page.locator('.album-exchange-slot').evaluateAll(elements=>elements.every(e=>!e.getAnimations().length))).toBe(true)
  await expect(page.locator('.album-exchange-slot:visible')).toHaveCount(1)
  await page.getByRole('button', { name: '앞면', exact: true }).click()
  await expect.poll(async () => Number(await surface.getAttribute('data-turn')) % 360).toBeCloseTo(0, 0)
  const box = (await surface.boundingBox())!
  await page.mouse.move(box.x + box.width * .3, box.y + box.height * .5); await page.mouse.down()
  await page.mouse.move(box.x + box.width * .7, box.y + box.height * .5, { steps: 12 }); await page.mouse.up()
  await expect.poll(async () => Number(await surface.getAttribute('data-turn'))).toBeGreaterThan(40)
  await expect(surface).toHaveAttribute('data-dragging', 'false')
})

test('navigation adapts to the actual stage and returns to Ivory; opening and closing the menu preserves the scene', async ({ page }) => {
  await ready(page); await scene(page, '.performance-scene', .5)
  const navigation = page.locator('.editorial-navigation')
  await expect(navigation).toHaveAttribute('data-home-dark', 'true')
  await expect(navigation).toHaveCSS('color', 'color(srgb 0.956863 0.941176 0.909804)')
  const before = await page.evaluate(() => scrollY)
  await page.getByRole('button', { name: 'MENU', exact: true }).click(); await expect(page.locator('dialog')).toBeVisible()
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(2)
  await scene(page, '.artist-scene', .4); await expect(navigation).toHaveAttribute('data-home-dark', 'false')
})

for (const width of [320, 390]) test(`mobile ${width}: authored scroll ribbon, visible content, working CTAs and no horizontal/scroll lock`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 }); await ready(page)
  await expect(page.locator('.works-sticky')).toHaveCSS('position','sticky')
  for(let i=0;i<5;i++){
    await scene(page,'.works-scene',i/4)
    await expect(page.locator('.works-scene')).toHaveAttribute('data-ribbon-index',String(i))
    await expect(page.locator('.works-current h3')).toHaveText(await page.locator('.selected-work h3').nth(i).innerText())
    const image=await page.locator('.selected-work .work-image').nth(i).boundingBox()
    expect(image!.width).toBeGreaterThan(width*.6)
  }
  for (const id of ['.works-scene', '.album-object-scene', '.performance-scene', '.artist-scene', '.home-outro']) {
    await scene(page, id, .5)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const bad = await page.locator(`${id} h2:visible, ${id} h3:visible, ${id} .editorial-link:visible, ${id} .work-caption:visible`).evaluateAll(elements => elements.filter(element => {
      const box = element.getBoundingClientRect(); return box.left < -1 || box.right > innerWidth + 1 || box.width < 1
    }).map(element => element.className))
    expect(bad).toEqual([])
  }
  await page.locator('.outro-invitation .editorial-link').click(); await expect(page).toHaveURL(/\/works\/$/)
  await expect(page.locator('.home-closing,audio')).toHaveCount(0)
})

test('reduced motion keeps all scenes readable and explicit album faces and Sou.P operable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await ready(page)
  await expect(page.locator('.home-closing')).toHaveAttribute('data-motion', 'reduced')
  await scene(page, '.album-object-scene', .5)
  await page.getByRole('button', { name: '뒷면', exact: true }).click()
  await expect.poll(async () => Math.abs(Number(await page.locator('.album-object-surface').getAttribute('data-turn')))).toBe(180)
  await scene(page, '.home-outro', 1)
  await page.getByRole('button', { name: '제작자 서명 보기' }).click(); await expect(page.locator('.outro-credit button')).toHaveText('Sou.P')
  await page.getByRole('button', { name: '제작자의 작은 인사' }).click(); await expect(page.locator('.outro-credit [role="status"]')).toContainText('좋은 소리가 오래 닿기를.')
})

test('EN shell keeps authored Korean source language explicit and preserves semantic route prefixes', async ({ page }) => {
  await ready(page); await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('.home-closing')).toHaveAttribute('lang', 'ko')
  await expect(page.locator('.album-selection .editorial-link')).toHaveAttribute('href', '/en/album/ji-young-hee-ryu-haegeum-sanjo-2026/')
  await expect(page.locator('.artist-copy .editorial-link')).toHaveAttribute('href', '/en/about/')
  await expect(page.locator('.outro-invitation .editorial-link')).toHaveAttribute('href', '/en/works/')
  await page.locator('.works-scene').evaluate(element => scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * .5, behavior: 'instant' }))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-line-handoff', '0.500')
  const endpoint = await page.locator('.works-axis path').first().evaluate(e => Number(e.getAttribute('d')!.split('H')[1]))
  expect(endpoint).toBeGreaterThan(0);expect(endpoint).toBeLessThan(page.viewportSize()!.width)
})

test('shared stage light and portrait seam respond to the pointer and settle on leave',async({page})=>{
  await ready(page)
  for(const selector of ['.performance-scene','.artist-scene']){
    await scene(page,selector)
    const surface=page.locator('.stage-artist-sequence')
    await page.mouse.move(1000,450)
    await expect(surface).toHaveAttribute('data-surface','responding')
    await expect.poll(()=>surface.evaluate(e=>parseFloat(e.style.getPropertyValue('--surface-x')))).toBeGreaterThan(.4)
    const moving=page.locator(selector==='.performance-scene'?'.shared-image-frame':'.artist-hanbok')
    expect(await moving.evaluate(e=>getComputedStyle(e).transform)).not.toBe('none')
    await page.mouse.move(1,1)
    await expect(surface).toHaveAttribute('data-surface','rest')
  }
})

test('SOUND exit contracts rightward before releasing headless Violet and Lacquer trails', async ({ page }) => {
  await page.addInitScript(() => {
    const probe = window as unknown as { worksArcs: number; worksColors: string[] }
    probe.worksArcs = 0; probe.worksColors = []
    const arc = CanvasRenderingContext2D.prototype.arc, stroke = CanvasRenderingContext2D.prototype.stroke
    CanvasRenderingContext2D.prototype.arc = function (...args: Parameters<typeof arc>) {
      if (this.canvas.classList.contains('works-motif')) probe.worksArcs++
      return arc.apply(this, args)
    }
    CanvasRenderingContext2D.prototype.stroke = function (path?: Path2D) {
      if (this.canvas.classList.contains('works-motif') && typeof this.strokeStyle === 'string' && !probe.worksColors.includes(this.strokeStyle)) probe.worksColors.push(this.strokeStyle)
      return Reflect.apply(stroke,this,path ? [path] : [])
    }
  })
  await ready(page)
  await page.locator('.bold-hero img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())))
  await scene(page, '.bold-hero', 1)
  await expect(page.locator('.bold-hero')).toHaveAttribute('data-progress', '1.00000')
  async function handoff(value: number) {
    await page.locator('.works-scene').evaluate((element, value) => scrollTo({top:scrollY+element.getBoundingClientRect().top-innerHeight*(1-value),behavior:'instant'}),value)
    await expect(page.locator('.home-closing')).toHaveAttribute('data-line-handoff',value.toFixed(3))
    return page.locator('.works-axis path').first().evaluate(e=>e.getAttribute('d')!.match(/-?\d+(?:\.\d+)?/g)!.map(Number))
  }
  const early = await handoff(.15), middle = await handoff(.3), late = await handoff(.45)
  expect(early[0]).toBeLessThan(middle[0]); expect(middle[0]).toBeLessThan(late[0])
  for (const p of [middle,late]) { expect(p[2]).toBeCloseTo(early[2],1); expect(p[1]).toBeCloseTo(early[1],1) }
  const collapsed = await handoff(.6); expect(collapsed[0]).toBeCloseTo(collapsed[2],1)
  await expect(page.locator('.works-axis')).toHaveCSS('opacity','0')
  await handoff(.85)
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {worksColors:string[]}).worksColors.sort())).toEqual(['#6334e5','#a33d36'])
  expect(await page.evaluate(()=>(window as unknown as {worksArcs:number}).worksArcs)).toBe(0)
  const reverse = await handoff(.3); expect(reverse).toEqual(middle)
  await handoff(0); await expect(page.locator('.poster-lines')).toHaveCSS('opacity','1')
})

test('album hover spans both axes, retains its rendered pose on drag start and settles on leave',async({page})=>{
  await ready(page);await scene(page,'.album-object-scene',.55)
  const surface=page.locator('.album-object-surface');await surface.scrollIntoViewIfNeeded()
  const box=(await surface.boundingBox())!
  const pose=()=>surface.evaluate(e=>({turn:parseFloat(e.style.getPropertyValue('--object-turn')),tilt:parseFloat(e.style.getPropertyValue('--object-tilt'))}))
  await page.mouse.move(box.x+box.width*.1,box.y+box.height*.2)
  await expect.poll(()=>surface.getAttribute('data-moving')).toBe('false');const left=await pose()
  await page.mouse.move(box.x+box.width*.9,box.y+box.height*.8)
  await expect.poll(()=>surface.getAttribute('data-moving')).toBe('false');const right=await pose()
  expect(right.turn-left.turn).toBeGreaterThan(40);expect(left.tilt-right.tilt).toBeGreaterThan(22)
  await page.mouse.down();const held=await pose();expect(Math.abs(held.turn-right.turn)).toBeLessThan(.2)
  await page.mouse.up();await page.mouse.move(1,1)
  await expect.poll(()=>surface.getAttribute('data-moving')).toBe('false')
  expect(Number(await surface.getAttribute('data-pointer-turn'))).toBeCloseTo(0,1)
  expect((await pose()).tilt).toBeCloseTo(-12,1)
})

async function trailInk(page: Page) {
  return page.locator('.home-closing > .works-motif').evaluateAll(canvases=>canvases.reduce((sum,element)=>{
    const canvas=element as HTMLCanvasElement, data=canvas.getContext('2d')!.getImageData(0,0,canvas.width,canvas.height).data
    for(let i=3;i<data.length;i+=4) if(data[i]>10)sum++
    return sum
  },0))
}

test('one headless pair follows the album object, yields at stage/artist thresholds, ends and returns on reverse',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await ready(page)
  await page.locator('.home-closing > .works-motif').evaluateAll(elements=>{
    (window as unknown as {closingCanvases:Element[]}).closingCanvases=elements
  })
  await page.locator('.album-object-surface').scrollIntoViewIfNeeded()
  await page.mouse.move(600,450)
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-scene','5')
  const center=()=>page.locator('.home-closing').evaluate(e=>({x:(Number(e.dataset.orbit0X)+Number(e.dataset.orbit1X))/2,y:(Number(e.dataset.orbit0Y)+Number(e.dataset.orbit1Y))/2}))
  const objectCenter=()=>page.locator('.album-exchange-slot[data-active="true"] .album-object-pose').evaluate(e=>{const b=e.getBoundingClientRect();return{x:b.x+b.width/2,y:b.y+b.height/2}})
  await expect.poll(async()=>Math.abs((await center()).x-(await objectCenter()).x)).toBeLessThan(45)
  await page.mouse.move(950,580)
  await expect.poll(async()=>Math.abs((await center()).x-(await objectCenter()).x)).toBeLessThan(45)
  expect(Math.abs((await center()).x-950)).toBeGreaterThan(80)
  for(const [selector,number] of [['.performance-scene','6'],['.artist-scene','7'],['.outro-name','8']]){
    if(number==='8')await page.locator(selector).scrollIntoViewIfNeeded();else await scene(page,selector)
    await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-scene',number)
    if(number==='8')await expect.poll(()=>trailInk(page)).toBeGreaterThan(100)
    else await expect.poll(()=>trailInk(page)).toBe(0)
    expect(await page.evaluate(()=>(window as unknown as {closingCanvases:Element[]}).closingCanvases.every(e=>e.isConnected))).toBe(true)
  }
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-state','finished')
  expect(await trailInk(page)).toBe(0)
  await page.evaluate(()=>scrollBy({top:-innerHeight*.5,behavior:'instant'}))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-state','running')
  await expect.poll(()=>trailInk(page)).toBeGreaterThan(100)
})

test('closing trails suspend under menu and reduced motion without obstructing keyboard controls',async({page})=>{
  await ready(page);await page.locator('.album-object-surface').scrollIntoViewIfNeeded()
  await expect.poll(()=>trailInk(page)).toBeGreaterThan(100)
  await page.getByRole('button',{name:'MENU',exact:true}).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-state','suspended')
  expect(await trailInk(page)).toBe(0)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button',{name:'MENU',exact:true})).toBeFocused()
  await expect.poll(()=>trailInk(page)).toBeGreaterThan(100)
  await page.emulateMedia({reducedMotion:'reduce'})
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-state','suspended')
  await expect(page.locator('.works-motif-front')).toHaveCSS('display','none')
  expect(await trailInk(page)).toBe(0)
})

for(const width of [320,390])test(`closing trails on ${width}px follow scene subjects with native vertical scrolling`,async({page})=>{
  await page.setViewportSize({width,height:844});await ready(page)
  for(const selector of ['.work-1 .work-image','.work-4 .work-image','.album-object-surface','.outro-name']){
    if(selector.startsWith('.work-'))await scene(page,'.works-scene',selector.includes('4')?.75:0);else await page.locator(selector).scrollIntoViewIfNeeded()
    await expect(page.locator('.works-motif-front')).toHaveCSS('display','block')
    await expect.poll(()=>trailInk(page)).toBeGreaterThan(10)
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  await expect(page.locator('.works-motif-front')).toHaveCSS('pointer-events','none')
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}))
  await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-state','suspended')
  expect(await trailInk(page)).toBe(0)
})


for(const width of [320,390])test(`mobile Works ${width}: both colored trails move freely around the active scroll-driven work`,async({page})=>{
  await page.setViewportSize({width,height:844});await ready(page)
  for(const selector of ['.work-1 .work-image','.work-4 .work-image']){
    await scene(page,'.works-scene',selector.includes('4')?.75:0)
    await expect(page.locator('.home-closing')).toHaveAttribute('data-orbit-scene','4')
    await expect.poll(()=>page.locator('.home-closing > .works-motif').evaluateAll(elements=>{
      const counts=[0,0]
      for(const element of elements){
        const canvas=element as HTMLCanvasElement, data=canvas.getContext('2d')!.getImageData(0,0,canvas.width,canvas.height).data
        for(let i=0;i<data.length;i+=4)if(data[i+3]>12){
          if(data[i+2]>data[i]*1.5 && data[i]>50)counts[0]++
          if(data[i]>data[i+2]*1.5 && data[i]>70)counts[1]++
        }
      }
      return Math.min(...counts)
    })).toBeGreaterThan(10)
    const before=await page.locator('.home-closing').getAttribute('data-orbit0-x')
    await expect.poll(()=>page.locator('.home-closing').getAttribute('data-orbit0-x')).not.toBe(before)
    await expect(page.locator(selector).locator('..')).toHaveAttribute('href',/#album-object$/)
  }
})
