import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getBuildTarget, type BuildTargetName } from '../config/build.ts'

export async function assertDesignArtifacts(targetName: BuildTargetName) {
  const target = getBuildTarget(targetName)
  let fontBytes = 0, fontFiles = 0, javascriptBytes = 0
  const markers = ['P2A_DESIGN_SYSTEM_LAB_ONLY', 'lab-sheet', 'Design foundation', 'labs/design-system', 'P2B_NAVIGATION_LAB_ONLY', 'editorial-navigation', 'navigation-menu', 'nav-lab-space', 'labs/navigation', 'P2C_HERO_LAB_ONLY', 'P2D_HERO_LAB_ONLY', 'bold-hero', 'src/hero', 'poster-scene', 'portrait-initial', 'portrait-instrument', 'labs/hero']
  async function inspect(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name)
      if (entry.isDirectory()) { await inspect(path); continue }
      assert.ok(!path.includes('/lab/') && !/portrait-(initial|instrument)|labs\/hero/.test(path), `Lab artifact path: ${path}`)
      const bytes = await readFile(path)
      for (const marker of markers) assert.ok(!bytes.includes(Buffer.from(marker)), `Lab content leaked: ${path}`)
      if (entry.name.endsWith('.woff2')) { fontFiles++; fontBytes += bytes.length }
      if (entry.name.endsWith('.js')) javascriptBytes += bytes.length
    }
  }
  // Inspect raw client too: the packager must not merely hide a leaked lab bundle.
  await inspect(resolve(target.directory, 'client'))
  fontBytes = 0; fontFiles = 0; javascriptBytes = 0
  await inspect(resolve(target.directory, 'static'))
  const manifest = JSON.parse(await readFile(resolve(target.directory, 'static/build-info.json'), 'utf8'))
  assert.equal(manifest.routes.length, 18)
  assert.ok(manifest.routes.every((path: string) => !path.includes('/lab')))
  const cssNames = (await readdir(resolve(target.directory, 'static/assets'))).filter(name => name.endsWith('.css'))
  let localFontUrls = 0
  for (const name of cssNames) {
    const css = await readFile(resolve(target.directory, 'static/assets', name), 'utf8')
    if (!css.includes('Noto Sans KR Variable')) continue
    for (const family of ['Noto Sans KR Variable', 'Noto Serif KR Variable', 'Cormorant Garamond Variable']) assert.ok(css.includes(family))
    assert.ok(css.includes('font-display:swap'))
    assert.ok(!css.includes('fonts.googleapis.com') && !css.includes('fonts.gstatic.com'))
    for (const match of css.matchAll(/url\(["']?([^"')]+\.woff2)["']?\)/g)) {
      assert.ok(match[1].startsWith(`${target.base}assets/`), `Wrong font base: ${match[1]}`)
      const bytes = await readFile(resolve(target.directory, 'static', match[1].slice(target.base.length)))
      assert.equal(bytes.subarray(0, 4).toString(), 'wOF2')
      localFontUrls++
    }
  }
  assert.ok(localFontUrls > 0, 'Production foundation must emit self-hosted WOFF2 fonts')
  for (const name of ['cormorant-garamond', 'noto-serif-kr', 'noto-sans-kr']) {
    assert.deepEqual(await readFile(resolve(target.directory, `static/licenses/${name}-OFL.txt`)),
      await readFile(`node_modules/@fontsource-variable/${name}/LICENSE`))
  }
  return { target: targetName, routes: 18, labExcluded: true, localFontUrls, fontFiles, fontBytes, javascriptBytes }
}
