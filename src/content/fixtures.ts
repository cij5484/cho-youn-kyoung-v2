import type { ImageUse } from './assets.ts'
import type { Album, ContentCatalog, Media, Performance, Press, Profile } from './models.ts'
import type { Edition, Locales } from './shared.ts'

// Fabricated neutral examples only. No real person, recording, event, article or media source is claimed.
export const fixtureAsOf = '2026-09-05T00:00:00Z'
export function reviewedFixture<T>(value: T): Edition<T> {
  return { source: 'authored', status: 'reviewed', value,
    provenance: { sourceRef: 'fixture:p1a', author: 'neutral-fixture' },
    review: { reviewer: 'neutral-fixture', reviewedAt: fixtureAsOf } }
}
export function fixtureLocales<T>(ko: T, en: T): Locales<T> {
  return { ko: reviewedFixture(ko), en: reviewedFixture(en) }
}
export const fixtureImage = {
  asset: { kind: 'image', id: 'asset:neutral-image' }, role: 'cover',
  alt: fixtureLocales('경로 검사 도형', 'Path-check shape'),
  aspectRatio: { width: 1, height: 1 }, mobile: { crop: { x: 0, y: 0, width: 1, height: 1 } },
} as const satisfies ImageUse

export const albumFixture = {
  kind: 'album', id: 'album:fixture-a', slug: 'neutral-album-a', publication: { status: 'published' },
  content: fixtureLocales(
    { title: '앨범 테스트 A', summary: '중립 앨범 schema fixture.', story: '실제 작품 내용이 아닙니다.' },
    { title: 'Album fixture A', summary: 'Neutral album schema fixture.', story: 'Not a real release.' }),
  category: 'other', release: { status: 'upcoming', date: { precision: 'year', value: 2027 } },
  tracks: [{ id: 'track-a', number: 1, content: fixtureLocales({ title: '트랙 테스트' }, { title: 'Track fixture' }),
    source: { status: 'coming-soon', reason: 'No playable fixture recording exists.' } }],
  credits: [{ id: 'credit-a', content: fixtureLocales({ name: '참여자 예시', role: '역할 예시' }, { name: 'Fixture participant', role: 'Fixture role' }) }],
  presentation: { cover: fixtureImage, featured: true, order: 1,
    object3d: { asset: { kind: 'model3d', id: 'asset:future-model' }, geometryProfileRef: 'fixture:geometry', displayProfileRef: 'fixture:display' } },
  related: [{ kind: 'performance', id: 'performance:fixture-a' }, { kind: 'media', id: 'media:fixture-a' }],
  links: [{ role: 'streaming', url: 'https://stream.example.invalid/fixture', label: fixtureLocales('외부 링크 예시', 'External fixture link') }],
} as const satisfies Album

export const performanceFixture = {
  kind: 'performance', id: 'performance:fixture-a', slug: 'neutral-performance-a', publication: { status: 'published' },
  content: fixtureLocales(
    { title: '공연 테스트 A', summary: '중립 공연 schema fixture.', venue: '가상 장소', artistNote: '중립 메모', pullQuote: '예시 문구' },
    { title: 'Performance fixture A', summary: 'Neutral performance schema fixture.', venue: 'Fixture venue', artistNote: 'Neutral note', pullQuote: 'Fixture quote' }),
  category: 'other', event: { status: 'scheduled', date: { precision: 'day', value: '2027-01-02' }, time: { localStart: '19:00', timeZone: 'Asia/Seoul' } },
  program: [{ id: 'program-a', content: fixtureLocales({ title: '프로그램 예시', note: '해설 예시' }, { title: 'Program fixture', note: 'Fixture note' }) }],
  cast: [], presentation: { visualMode: 'poster', hero: { ...fixtureImage, role: 'hero' }, order: 1 },
  archive: { poster: { ...fixtureImage, role: 'poster' }, videos: [{ kind: 'media', id: 'media:fixture-a' }] },
  related: [{ kind: 'album', id: 'album:fixture-a' }, { kind: 'press', id: 'press:fixture-a' }],
} as const satisfies Performance

export const mediaFixture = {
  kind: 'media', id: 'media:fixture-a', slug: 'neutral-media-a', publication: { status: 'published' },
  content: fixtureLocales({ title: '미디어 테스트', summary: '중립 영상 identity.' }, { title: 'Media fixture', summary: 'Neutral video identity.' }),
  date: { precision: 'year', value: 2027 }, category: 'performance', type: 'youtube',
  source: { videoId: 'abcdefghijk' }, poster: { ...fixtureImage, role: 'poster-frame' },
  presentation: { featured: true, aspectRatio: { width: 16, height: 9 } },
  related: [{ kind: 'performance', id: 'performance:fixture-a' }],
} as const satisfies Media
export const pressFixture = {
  kind: 'press', id: 'press:fixture-a', slug: 'neutral-press-a', publication: { status: 'published' },
  content: fixtureLocales({ title: '기사 테스트' }, { title: 'Press fixture' }),
  date: { precision: 'month', value: '2027-01' }, outlet: 'Fixture outlet', url: 'https://press.example.invalid/fixture', language: 'ko',
  related: [{ kind: 'performance', id: 'performance:fixture-a' }, { kind: 'album', id: 'album:fixture-a' }],
} as const satisfies Press
export const profileFixture = {
  kind: 'profile', id: 'profile:fixture-a', slug: 'neutral-profile-a', publication: { status: 'published' },
  content: fixtureLocales(
    { title: '프로필 테스트', shortIntroduction: '중립 소개', biography: '실제 인물 약력이 아닌 schema fixture.', currentRole: '예시 역할' },
    { title: 'Profile fixture', shortIntroduction: 'Neutral introduction', biography: 'Schema fixture, not an actual biography.', currentRole: 'Fixture role' }),
  selectedPerformances: [{ kind: 'performance', id: 'performance:fixture-a' }], portraits: [{ ...fixtureImage, role: 'portrait' }],
} as const satisfies Profile

export const neutralCatalog = {
  albums: [albumFixture], performances: [performanceFixture], media: [mediaFixture], press: [pressFixture], profiles: [profileFixture],
  career: [{ id: 'career-a', profileId: profileFixture.id, kind: 'education', date: { precision: 'year', value: 2020 },
    content: fixtureLocales({ title: '교육 예시', organization: '가상 기관' }, { title: 'Education fixture', organization: 'Fixture institution' }) }],
  assets: [
    { id: 'asset:neutral-image', kind: 'image', lifecycle: 'replace-required', masterRef: 'fixture:source-image', runtime: { url: 'spike/path-check.svg', mimeType: 'image/svg+xml', width: 16, height: 16 } },
    { id: 'asset:future-model', kind: 'model3d', lifecycle: 'replace-required', masterRef: 'fixture:unbuilt-master' },
  ],
} as const satisfies ContentCatalog

// One extra item per growing domain; records are the only additions. No component or route pattern is added.
export const growthCatalog = {
  ...neutralCatalog,
  albums: [...neutralCatalog.albums, { ...albumFixture, id: 'album:fixture-b', slug: 'neutral-album-b',
    content: { ko: reviewedFixture({ title: '앨범 테스트 B', summary: '번역 없는 neutral fixture.' }) } }],
  performances: [...neutralCatalog.performances, { ...performanceFixture, id: 'performance:fixture-b', slug: 'neutral-performance-b' }],
  media: [...neutralCatalog.media, { ...mediaFixture, id: 'media:fixture-b', slug: 'neutral-media-b', type: 'image', source: { ...fixtureImage, role: 'portrait' }, category: 'portrait' }],
  press: [...neutralCatalog.press, { ...pressFixture, id: 'press:fixture-b', slug: 'neutral-press-b', publication: { status: 'archived' } }],
} as const satisfies ContentCatalog
