/* global document, window */
import { chromium } from '@playwright/test'
import { mkdirSync,writeFileSync } from 'node:fs'
const browser=await chromium.launch(),output='.checkpoints/p2k-inspection';mkdirSync(output,{recursive:true})
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message))
  await page.goto('http://127.0.0.1:4180/');await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready)
  const results=[]
  for(const p of [0,.23,.37,.51,.64,.71,.82,.93,1]){
    await page.evaluate(p=>{const s=document.querySelector('.poster-scene');window.scrollTo(0,s.offsetTop+(s.offsetHeight-s.querySelector('.poster-stage').offsetHeight)*p)},p)
    await page.waitForTimeout(1100);await page.screenshot({path:`${output}/${p}.png`})
    results.push(await page.locator('.sound-experience').evaluate(e=>({...e.dataset})))
  }
  await page.locator('.listen-trigger').first().click();await page.waitForTimeout(3500);await page.screenshot({path:`${output}/playing.png`})
  await page.locator('.type-study').scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.screenshot({path:`${output}/typography.png`})
  console.log({errors,results});writeFileSync(`${output}/results.json`,JSON.stringify({errors,results},null,2))
} finally {await browser.close()}
