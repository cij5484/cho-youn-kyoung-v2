import type { AssetRecord } from '../assets.ts'
import type { Album } from '../models.ts'
import type { Locales } from '../shared.ts'

// P1C approved mapping, not authored-copy review or permission to publish.
// Source ledger: docs/redesign/review/album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md
function koDraft<T>(value: T, source: string): Locales<T> {
  return { ko: { source: 'machine-assisted', status: 'draft', value,
    provenance: { sourceRef: `p1c:ji-young-hee-sanjo:${source}`, author: 'Codex (P1C mapping draft)' } } }
}

export const jiYoungHeeSanjoCover = {
  id: 'asset:jyh-2026-cover-front', kind: 'image', lifecycle: 'provisional',
  // Identifies the audited WebP derivative; no master storage or runtime URL is claimed.
  masterRef: 'p1b:ji-young-hee-sanjo:web-front',
} as const satisfies AssetRecord

export const jiYoungHeeSanjoDraft = {
  kind: 'album',
  id: 'album:ji-young-hee-ryu-haegeum-sanjo-2026',
  slug: 'ji-young-hee-ryu-haegeum-sanjo-2026',
  publication: { status: 'draft' },
  content: koDraft({
    title: '조윤경 해금산조 – 지영희류',
    summary: '해금 연주자 조윤경의 지영희류 해금산조 음반. 긴산조와 짧은산조를 여섯 트랙에 담았다.',
  }, 'ko-copy'),
  category: 'sanjo',
  // Confirmed date; this stored status does not auto-publish when the date passes.
  release: { status: 'upcoming', date: { precision: 'day', value: '2026-09-08' } },
  productNumber: 'JEC-0528',
  // Printed timings remain in P1C. durationSeconds awaits measured-source evidence.
  tracks: [
    { id: 'jyh-2026-track-01', number: 1, content: koDraft({ title: '진양' }, 'track-01'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
    { id: 'jyh-2026-track-02', number: 2, content: koDraft({ title: '중모리' }, 'track-02'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
    { id: 'jyh-2026-track-03', number: 3, content: koDraft({ title: '중중모리' }, 'track-03'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
    { id: 'jyh-2026-track-04', number: 4, content: koDraft({ title: '굿거리' }, 'track-04'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
    { id: 'jyh-2026-track-05', number: 5, content: koDraft({ title: '자진모리' }, 'track-05'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
    { id: 'jyh-2026-track-06', number: 6, content: koDraft({ title: '짧은산조' }, 'track-06'),
      source: { status: 'unavailable', reason: 'V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다.' } },
  ],
  credits: [
    { id: 'jyh-2026-credit-haegeum', content: koDraft({ name: '조윤경', role: '해금' }, 'credit-haegeum') },
    { id: 'jyh-2026-credit-janggu', content: koDraft({ name: '이영섭', role: '장구' }, 'credit-janggu') },
    { id: 'jyh-2026-credit-producer', content: koDraft({ name: '조윤경', role: '프로듀싱' }, 'credit-producer') },
    { id: 'jyh-2026-credit-recording', content: koDraft({ name: '떨기나무', role: '녹음' }, 'credit-recording') },
    { id: 'jyh-2026-credit-mixing', content: koDraft({ name: '떨기나무', role: '믹싱' }, 'credit-mixing') },
    { id: 'jyh-2026-credit-mastering', content: koDraft({ name: '떨기나무', role: '마스터링' }, 'credit-mastering') },
    { id: 'jyh-2026-credit-distribution', content: koDraft({ name: '조은뮤직', role: '유통' }, 'credit-distribution') },
    { id: 'jyh-2026-credit-design', content: koDraft({ name: 'Soul.P', role: '디자인' }, 'credit-design') },
  ],
  presentation: {
    cover: {
      asset: { id: jiYoungHeeSanjoCover.id, kind: 'image' }, role: 'cover',
      alt: koDraft('조윤경 해금산조 – 지영희류 음반 패키지 앞면', 'cover-alt'),
      aspectRatio: { width: 2048, height: 1834 },
    },
  },
} as const satisfies Album
