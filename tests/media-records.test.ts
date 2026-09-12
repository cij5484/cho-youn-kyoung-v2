import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('media has one featured film, unique verified video identities and ordered HTTPS press links', () => {
  const records = JSON.parse(readFileSync(new URL('../src/media/media-records.json', import.meta.url), 'utf8'))
  assert.equal(records.videos.length, 4)
  assert.equal(records.videos.filter((film: { format: string }) => film.format !== 'archive').length, 3)
  assert.deepEqual(records.videos.filter((film: { format: string }) => film.format === 'archive').map((film: { youtubeId: string }) => film.youtubeId), ['ubp2ClVdMYI'])
  assert.equal(records.videos.filter((film: { featured: boolean }) => film.featured).length, 1)
  assert.equal(new Set(records.videos.map((film: { youtubeId: string }) => film.youtubeId)).size, 4)
  for (const film of records.videos) {
    assert.match(film.youtubeId, /^[A-Za-z0-9_-]{11}$/)
    assert.equal(new URL(film.poster).hostname, 'i.ytimg.com')
    assert.ok(film.poster.includes(`/vi/${film.youtubeId}/`))
    assert.ok(film.aspect > 1 && film.aspect < 2)
  }
  assert.equal(records.press.length, 12)
  assert.equal(new Set(records.press.map((article: { url: string }) => article.url)).size, 12)
  for (let i = 0; i < records.press.length; i++) {
    assert.equal(new URL(records.press[i].url).protocol, 'https:')
    assert.ok(records.press[i].title && records.press[i].outlet)
    if (i) assert.ok(records.press[i - 1].publishedDate >= records.press[i].publishedDate)
  }
})
