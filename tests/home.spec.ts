import { test, expect, type Page } from '@playwright/test'

async function ready(page: Page, path = '/') {
  await page.goto(path)
  await expect(page.locator('.home-closing')).toHaveAttribute('data-motion', /ready|reduced/)
  await page.evaluate(() => document.fonts.ready)
}
async function scene(page: Page, selector: string, progress = 0) {
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
  await scene(page, '.works-scene', 1); await page.locator('.work-5 a').click()
  await expect(page).toHaveURL(/#performance$/)
  await expect(page.locator('.performance-caption h3')).toHaveText('산조길, 둘')
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

for (const width of [320, 390]) test(`mobile ${width}: four-column reflow, visible content, working CTAs and no horizontal/scroll lock`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 }); await ready(page)
  const columns = await page.locator('.works-board').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length)
  expect(columns).toBe(4)
  await expect(page.locator('.work-caption:visible')).toHaveCount(5)
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

test('stage light and intact portrait respond to pointer position and settle on leave',async({page})=>{
  await ready(page)
  for(const selector of ['.performance-scene','.artist-scene']){
    await scene(page,selector)
    const surface=page.locator(selector),box=(await surface.boundingBox())!
    await page.mouse.move(box.x+box.width*.8,Math.min(650,box.y+box.height*.35))
    await expect(surface).toHaveAttribute('data-surface','responding')
    await expect.poll(()=>surface.evaluate(e=>parseFloat(e.style.getPropertyValue('--surface-x')))).toBeGreaterThan(.4)
    const moving=page.locator(selector==='.performance-scene'?'.performance-image-window':'.artist-portrait-mount')
    expect(await moving.evaluate(e=>getComputedStyle(e).transform)).not.toBe('none')
    await page.mouse.move(1,1)
    await expect(surface).toHaveAttribute('data-surface','rest')
  }
})
