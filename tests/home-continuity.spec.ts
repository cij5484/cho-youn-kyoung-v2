import {test,expect,type Page} from '@playwright/test'
async function ready(page:Page){await page.goto('/');await page.evaluate(()=>document.fonts.ready)}
async function stage(page:Page,p:number){
  await page.locator('.stage-artist-sequence').evaluate((e,p)=>scrollTo({top:scrollY+e.getBoundingClientRect().top+((e as HTMLElement).offsetHeight-e.querySelector<HTMLElement>('.stage-artist-sticky')!.offsetHeight)*p,behavior:'instant'}),p)
  await expect.poll(()=>page.locator('.stage-artist-sequence').evaluate((e,p)=>{
    const root=e as HTMLElement,travel=root.offsetHeight-root.querySelector<HTMLElement>('.stage-artist-sticky')!.offsetHeight
    const actual=Math.max(0,Math.min(1,-root.getBoundingClientRect().top/travel)).toFixed(4)
    return Math.abs(Number(actual)-p)<=1/travel&&root.dataset.sequenceTarget===actual&&root.dataset.sequenceProgress===actual
  },p)).toBe(true)
}
test('two-point tension cues are selective and stop rendering in completed compositions',async({page})=>{
  await ready(page);const owner=page.locator('.home-closing')
  await stage(page,.12);await expect.poll(async()=>Number(await owner.getAttribute('data-motif-presence'))).toBeGreaterThan(.3)
  await stage(page,.3);await expect(owner).toHaveAttribute('data-orbit-state','quiet')
  await expect(owner).toHaveAttribute('data-motif-presence','0.0000')
  await owner.evaluate(e=>{const probe=window as unknown as{quietMutations:number};probe.quietMutations=0;const observer=new MutationObserver(records=>{probe.quietMutations+=records.filter(r=>r.attributeName==='data-orbit0-x').length});observer.observe(e,{attributes:true});setTimeout(()=>observer.disconnect(),220)})
  // A bounded observation window measures idle work, not animation synchronization.
  await page.waitForTimeout(250)
  expect(await page.evaluate(()=>(window as unknown as{quietMutations:number}).quietMutations)).toBe(0)
  await stage(page,.76);await expect.poll(async()=>Number(await owner.getAttribute('data-motif-presence'))).toBeGreaterThan(.3)
  await stage(page,.87);await expect(owner).toHaveAttribute('data-orbit-state','quiet')
})
test('afterimages carry source material over short boundaries and disappear in reduced motion',async({page})=>{
  await ready(page)
  const memories=page.locator('.scene-afterimages')
  for(const [selector,offset,state] of [['.stage-artist-sequence',.5,'album-light'],['.home-outro',.66,'artist-edge']] as const){
    await page.locator(selector).evaluate((e,p)=>scrollTo({top:scrollY+e.getBoundingClientRect().top-innerHeight*p,behavior:'instant'}),offset)
    await expect(memories).toHaveAttribute('data-afterimage',state)
    expect(await memories.evaluate(e=>[...e.children].some(child=>Number(getComputedStyle(child).opacity)>.1))).toBe(true)
  }
  await expect(page.locator('.work-plane-memory')).toHaveCount(0)
  await page.emulateMedia({reducedMotion:'reduce'})
  await expect(memories).toHaveCSS('display','none');await expect(memories).toHaveAttribute('data-afterimage','suspended')
  await expect(page.locator('.selected-work').first()).toHaveCSS('clip-path','none')
})
