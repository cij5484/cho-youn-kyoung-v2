import { expect, type Page } from '@playwright/test'
import type { SpikeRoute } from '../src/spike/fixtures.ts'

// Expected URLs are derived independently of the production URL/metadata helpers.
export async function expectLocaleMetadata(page: Page, fixture: SpikeRoute, origin: string, base: string) {
  const ko = fixture.lang === 'ko' ? fixture.path : fixture.path.slice(3) || '/'
  const en = `/en${ko === '/' ? '' : ko}`
  const absolute = (path: string) => origin + base + (path === '/' ? '' : `${path.slice(1)}/`)
  const canonical = absolute(fixture.path)
  await expect(page.locator('html')).toHaveAttribute('lang', fixture.lang)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
  await expect(page.locator('link[hreflang]')).toHaveCount(3)
  for (const [lang, path] of [['ko', ko], ['en', en], ['x-default', ko]]) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute('href', absolute(path))
  }
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', `${fixture.name} (${fixture.lang}) | P0B`)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', `Routing spike: ${fixture.path} [${fixture.lang}]. Test metadata only.`)
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical)
}
