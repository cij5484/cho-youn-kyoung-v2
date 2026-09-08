import { test, expect, type Page } from '@playwright/test'
import { stageArtistFrame } from '../src/home/stage-artist-motion.ts'

async function seek(page:Page, progress:number) {
  const root=page.locator('.stage-artist-sequence')
  await root.evaluate((e,p)=>{
    const travel=(e as HTMLElement).offsetHeight-e.querySelector<HTMLElement>('.stage-artist-sticky')!.offsetHeight
    scrollTo({top:scrollY+e.getBoundingClientRect().top+travel*p,behavior:'instant'})
  },progress)
  await expect.poll(()=>root.evaluate((e,expected)=>{
    const element=e as HTMLElement,travel=element.offsetHeight-e.querySelector<HTMLElement>('.stage-artist-sticky')!.offsetHeight
    const actual=Math.max(0,Math.min(1,-e.getBoundingClientRect().top/travel)).toFixed(4)
    return Math.abs(Number(actual)-expected)<=1/travel&&element.dataset.sequenceTarget===actual&&element.dataset.sequenceProgress===actual
  },progress)).toBe(true)
}

// WebKit's document-to-viewport subtraction can differ below 1/1024 CSS px after long scrolls.
// Compare actual painted-pixel placement, while the pure timeline test asserts exact hold values.
const seamPosition=(page:Page)=>page.locator('.shared-seam').evaluate(e=>{
  const box=e.getBoundingClientRect();return{x:Math.round(box.x*devicePixelRatio),y:Math.round(box.y*devicePixelRatio)}
})

test('stage and identity each have a stable native-scroll threshold, with a reversible exit',()=>{
  expect(stageArtistFrame(.28)).toEqual(stageArtistFrame(.36))
  expect(stageArtistFrame(.85)).toEqual(stageArtistFrame(.9))
  expect(stageArtistFrame(.98)['artist-exit']).toBeGreaterThan(0)
  expect(stageArtistFrame(.9)['artist-exit']).toBe(0)
  expect(stageArtistFrame(1).seam).toBe(68)
})

for(const width of [320,390,768,1440])test(`date geometry holds clear of the poster; one seam owns stage, identity and exit ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/');await page.evaluate(()=>document.fonts.ready)
  const root=page.locator('.stage-artist-sequence'),seam=await page.locator('.shared-seam').elementHandle()
  await seek(page,.3)
  await expect(root).toHaveAttribute('data-stage-threshold','1.0000')
  const date=(await page.locator('.stage-date').boundingBox())!,poster=(await page.locator('.shared-image-frame').boundingBox())!
  expect(date.x+date.width<=poster.x||date.y+date.height<=poster.y).toBe(true)
  await expect(page.locator('.performance-image-window')).toHaveAttribute('data-content-id','performance:haegeum-jeongak-2026-09-22')
  await expect(page.locator('.performance-image-window')).toHaveAttribute('data-asset-id','asset:home-recital')
  await seek(page,.85);await expect(root).toHaveAttribute('data-artist-threshold','1.0000')
  const stable=await seamPosition(page)
  await seek(page,.9)
  const held=await seamPosition(page)
  expect(held.x).toBe(stable.x);expect(held.y).toBe(stable.y)
  await seek(page,.98);await expect.poll(async()=>Number(await root.getAttribute('data-artist-exit'))).toBeGreaterThan(0)
  expect(await seam!.evaluate(e=>e.isConnected)).toBe(true)
  await seek(page,.85);await expect(root).toHaveAttribute('data-artist-exit','0.0000')
  const returned=await seamPosition(page)
  expect(returned.x).toBe(stable.x);expect(returned.y).toBe(stable.y)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
})

test('portrait, mask and type use bounded depth without changing the authored crop transform',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('/');await page.evaluate(()=>document.fonts.ready);await seek(page,.91)
  const suit=page.locator('.artist-suit'),root=page.locator('.stage-artist-sequence')
  const crop=await suit.evaluate(e=>getComputedStyle(e).transform)
  await page.mouse.move(1300,300)
  await expect(root).toHaveAttribute('data-surface','responding')
  await expect.poll(()=>suit.evaluate(e=>parseFloat(getComputedStyle(e).translate))).toBeGreaterThan(1)
  const depth=await suit.evaluate(e=>getComputedStyle(e).translate.split(' ').map(parseFloat))
  expect(Math.abs(depth[0])).toBeLessThanOrEqual(2.5);expect(Math.abs(depth[1])).toBeLessThanOrEqual(3.5)
  expect(await suit.evaluate(e=>getComputedStyle(e).transform)).toBe(crop)
  expect(await root.evaluate(e=>getComputedStyle(e.querySelector('.artist-suit')!).translate===getComputedStyle(e.querySelector('.shared-seam')!).translate)).toBe(true)
})

test('reduced motion retains both identities with static date and no depth or seam motion',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/')
  await expect(page.locator('.stage-artist-sequence')).toHaveAttribute('data-sequence-state','static')
  await expect(page.locator('.shared-seam')).toHaveCSS('display','none')
  await expect(page.locator('.stage-date')).toHaveCSS('position','static')
  for(const selector of ['.stage-month','.stage-day','.artist-suit','.artist-hanbok','.artist-copy'])await expect(page.locator(selector)).toHaveCSS('translate','none')
  await expect(page.locator('.artist-suit')).toHaveAttribute('data-asset-id','asset:home-portrait')
  await expect(page.locator('.artist-hanbok')).toHaveAttribute('data-asset-id','asset:home-hanbok')
})
