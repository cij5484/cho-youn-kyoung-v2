import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'
import { blindFrames } from '../src/performance-detail/performance-mask.ts'
import { dualFlowPosition } from '../src/performance-detail/performance-dual-flow.ts'

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')

test('two real catalogs keep distinct signatures and exact chronological work identity', () => {
  const variants = JSON.parse(read('../src/performance-detail/performance-variants.json'))
  assert.deepEqual(variants.map((record: { variant: string }) => record.variant), ['dual-flow', 'time-path'])
  assert.deepEqual(variants[1].program.map((work: { year: number; title: string; composer: string }) => [work.year, work.title, work.composer]), [
    [1966, '해금과 장구를 위한 소곡', '김흥교'], [1978, '등롱', '김기수'], [1989, '적념', '김영재'],
    [1999, '춤사리기', '이해식'], [2009, '활의 노래', '이정면'], [2014, '소리 Sori', 'Donald Reid Womack'],
  ])
  assert.equal(variants[0].program.length, 2)
  for (const record of variants) for (const work of record.program) assert.ok(work.note.startsWith(work.shortNote))
})

test('dual flow varies by item and direction then resolves exactly without drift', () => {
  for (let step = 0; step <= 100; step++) {
    for (let item = 0; item < 6; item++) {
      const left = dualFlowPosition(step / 100, item, 1), right = dualFlowPosition(step / 100, item, -1)
      assert.ok(left.x >= 0 && left.x <= 1)
      assert.ok(right.x <= 0 && right.x >= -1)
      assert.ok(Math.abs(left.y) <= 22 && Math.abs(right.y) <= 22)
    }
  }
  assert.notEqual(dualFlowPosition(.4, 0, 1).x, dualFlowPosition(.4, 1, 1).x)
  assert.notEqual(dualFlowPosition(.4, 1, 1).x, -dualFlowPosition(.4, 1, -1).x)
  assert.equal(Math.abs(dualFlowPosition(1, 3, -1).x), 0)
  assert.equal(Math.abs(dualFlowPosition(1, 3, -1).y), 0)
})

test('the local performance study uses verified content and original poster identity', () => {
  const record = JSON.parse(read('../src/performance-detail/performance-record.json'))
  assert.equal(record.slug, 'haegeum-jeongak-2026-09-22')
  assert.equal(record.date, '2026-09-22')
  assert.equal(record.program.length, 2)
  assert.deepEqual(record.performers.map((person: { name: string }) => person.name), ['김성준', '허유진', '윤승환', '홍세아'])
  assert.ok(record.performers.every((person: { fullBio: string[] }) => person.fullBio.length >= 4))
  assert.ok(record.performers[0].fullBio.includes('부산대학교 교수'))
  assert.ok(record.performers[2].fullBio.includes('現 국립부산국악원 기악단 부수석'))
  assert.ok(record.artistNote.join(' ').includes(record.quote))
  const manifest = JSON.parse(read('../src/performance-detail/source-manifest.json'))
  for (const asset of manifest) assert.ok(existsSync(new URL(`../src/performance-detail/${asset.file}`, import.meta.url)))
  assert.match(read('../src/performance-detail/performance-data.ts'), /poster: atmosphericImages\.pulgo/)
  assert.match(read('../src/performance-detail/performance-navigation.ts'), /import\.meta\.env\.DEV/)
  // HOME owns this global selector (ivory type, pointer-events:none).
  assert.doesNotMatch(read('../src/performance-detail/PerformanceDetail.tsx'), /className="[^"]*\bperformance-scene\b/)
  assert.doesNotMatch(read('../src/performance-detail/PerformanceDetail.tsx'), /공연을 읽다|OFFICIAL POSTER|무대를 담은 종이|함께 엮는 사람들|또 다른 무대/)
  const transition = read('../src/album-detail/AlbumRouteTransition.tsx')
  assert.match(transition, /\[data-performance-poster\]/)
  assert.match(transition, /origin\.kind/)
})

test('the scroll mask opens 30 paired bands bottom to top, without gaps', () => {
  assert.equal(blindFrames.length, 60)
  for (let band = 0; band < 30; band++) {
    const top = blindFrames[band * 2], bottom = blindFrames[band * 2 + 1]
    assert.equal(top.fromY, bottom.fromY)
    assert.ok(top.y < top.fromY)
    assert.equal(bottom.y, bottom.fromY)
    assert.ok(top.y + top.height >= bottom.y)
    assert.ok(bottom.y + bottom.height >= 1 - band / 30)
    if (band > 0) assert.ok(top.fromY < blindFrames[(band - 1) * 2].fromY)
  }
  const motion = read('../src/performance-detail/performance-mask.ts')
  assert.match(motion, /scrub: \.65/)
  assert.match(motion, /each: \.02/)
  assert.match(motion, /prefers-reduced-motion: no-preference/)
  assert.doesNotMatch(motion, /addEventListener\(['"](?:wheel|touchmove)/)
})
