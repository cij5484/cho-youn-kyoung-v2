import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { resolveAlbumAnalysis, validateAnalysisPair, type AnalysisIdentity } from '../src/audio/analysis-catalog.ts'

const read = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const recordings = read('../src/audio/recordings.json') as { source: string; path: string; sha256: string }[]
// Read only the authored track tuples; importing AlbumDetail's image/3D assets is unnecessary for this contract.
const albumSource = readFileSync(new URL('../src/album-detail/album-data.ts', import.meta.url), 'utf8')
const albums = [...albumSource.matchAll(/^ {2}'([^']+)': \{([\s\S]*?)(?=^ {2}'[^']+': \{|^})/gm)]
const pairFor = (identity: AnalysisIdentity) => {
  const stem = `../src/audio/analysis/${identity.path.replace(/\.mp3$/, '')}`
  return [read(`${stem}.features.json`), read(`${stem}.percussion.json`)] as const
}

test('all 29 authored album/source/index tuples resolve to their exact registered pair, without cross-album filename collisions', () => {
  assert.equal(albums.length, 4)
  const seen = new Set<string>()
  for (const [, slug, body] of albums) {
    const sources = [...body.matchAll(/audioUrl: '([^']+)'/g)].map(match => match[1])
    sources.forEach((source, index) => {
      const record = recordings.find(item => item.source === source)!
      assert.ok(record)
      const identity = resolveAlbumAnalysis(slug, index, source)
      assert.deepEqual(identity, { path: record.path, source, sourceSha256: record.sha256,
        trackId: `album:${record.path.replace(/\.mp3$/, '').replace('/', ':')}` })
      assert.ok(!seen.has(identity!.trackId)); seen.add(identity!.trackId)
      const [features, percussion] = pairFor(identity!)
      assert.ok(validateAnalysisPair(features, percussion, identity!), identity!.trackId)
      assert.equal(resolveAlbumAnalysis(slug, index + 1, source), null)
      assert.equal(resolveAlbumAnalysis(slug, index, `${source}?other-version`), null)
      for (const [, other] of albums) if (other !== slug) assert.equal(resolveAlbumAnalysis(other, index, source), null)
    })
  }
  assert.equal(seen.size, 29); assert.equal(seen.size, recordings.length)
  for (const index of [-1, .5, Infinity, NaN]) assert.equal(resolveAlbumAnalysis(albums[0][1], index, recordings[0].source), null)
  for (const slug of ['missing', '__proto__', 'constructor']) assert.equal(resolveAlbumAnalysis(slug, 0, recordings[0].source), null)
})

test('stale identities, malformed channels, mismatched durations and invalid percussion events are rejected', () => {
  const identity = resolveAlbumAnalysis(albums[0][1], 0, recordings[0].source)!
  const [features, percussion] = pairFor(identity)
  assert.ok(validateAnalysisPair(features, percussion, identity))
  for (const patch of [{ path: 'other/01.mp3' }, { source: `${identity.source}?other` }, { sourceSha256: 'f'.repeat(64) }, { trackId: 'other' }]) {
    assert.equal(validateAnalysisPair(features, percussion, { ...identity, ...patch }), null)
  }
  for (const patch of [{ sourceSha256: 'f'.repeat(64) }, { trackId: 'other' }, { duration: features.duration + 1 }, { energy: [-1] }]) {
    assert.equal(validateAnalysisPair({ ...features, ...patch }, percussion, identity), null)
  }
  for (const patch of [{ version: 'other' }, { sourceSha256: 'f'.repeat(64) }, { trackId: 'other' }, { duration: Infinity },
    { hits: null }, { hits: [null] }, { hits: [{ time: -1, score: .8, flatness: .5 }] },
    { hits: [{ time: features.duration, score: .8, flatness: .5 }] }, { hits: [{ time: 1, score: 1.1, flatness: .5 }] },
    { hits: [{ time: 1, score: .8, flatness: NaN }] }, { hits: [percussion.hits[0], percussion.hits[0]] }]) {
    assert.equal(validateAnalysisPair(features, { ...percussion, ...patch }, identity), null)
  }
  const other = resolveAlbumAnalysis(albums[1][1], 0, recordings.find(record => record.path.startsWith('yeongsan/'))!.source)!
  assert.equal(validateAnalysisPair(...pairFor(other), identity), null)
})
