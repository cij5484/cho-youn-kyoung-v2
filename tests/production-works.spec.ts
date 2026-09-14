import { expect, test } from '@playwright/test'

// Independent public-record expectations: catches missing, duplicated and wrong-kind rows.
const albums = ['album:ji-young-hee-ryu-haegeum-sanjo-2026', 'album:yeongsan-hoesang-2026', 'album:pyeongjo-hoesang-2026', 'album:han-beom-su-haegeum-sanjo-2020']
const performances = ['performance:haegeum-jeongak-2026-09-22', 'performance:sanjo-gil-2026-08-16', 'performance:haegeum-2026-08-02']

test('actual production archive filters visible records, query, refresh and history', async ({ page }, info) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const mobile = info.project.name.endsWith('-mobile')
  const response = await page.goto('/immersive/works/#works-compact-archive')
  expect(response?.status()).toBe(200)
  await expect(page.locator('.works-page')).toHaveCount(0)
  const archive = page.locator('#works-compact-archive')
  await expect(archive).toHaveAttribute('data-index-view', 'false')
  const rows = mobile
    ? archive.locator('.atmospheric-archive-row:visible')
    : archive.locator('.archive-preview-list [data-work-id]:visible')
  const filters = { all: '전체 작업 7건', albums: '음반 4건', performances: '공연 3건' } as const
  const verify = async (filter: keyof typeof filters, ids: string[]) => {
    await expect(archive.getByRole('button', { name: filters[filter], exact: true })).toHaveAttribute('aria-pressed', 'true')
    await expect.poll(() => rows.evaluateAll(nodes => nodes.map(node => node.getAttribute('data-work-id')).sort())).toEqual([...ids].sort())
    await expect(archive.getByRole('status')).toHaveText(`${ids.length}개의 기록`)
    expect(new URL(page.url()).searchParams.get('type')).toBe(filter === 'all' ? null : filter)
    // Every visible result still leads to its semantic detail route.
    const links = mobile ? rows.locator('a') : rows
    for (const href of await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) {
      expect(href).toMatch(/^\/immersive\/(album|performance)\//)
    }
  }
  const select = async (filter: keyof typeof filters) => {
    const button = archive.getByRole('button', { name: filters[filter], exact: true })
    if (mobile) await button.tap()
    else await button.click()
  }
  await verify('all', [...albums, ...performances])
  await select('albums'); await verify('albums', albums)
  await select('performances'); await verify('performances', performances)
  await select('all'); await verify('all', [...albums, ...performances])
  await page.goBack(); await verify('performances', performances)
  await page.goBack(); await verify('albums', albums)
  expect((await page.reload())?.status()).toBe(200)
  await verify('albums', albums)
  await page.goForward(); await verify('performances', performances)
  expect(errors).toEqual([])
})
