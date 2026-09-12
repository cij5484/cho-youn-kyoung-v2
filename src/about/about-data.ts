import bowPortraitThumbnail from './assets/thumbnails/portrait-08.webp'
import monochromePortraitThumbnail from './assets/thumbnails/portrait-16.webp'
import closePortraitThumbnail from './assets/thumbnails/portrait-25.webp'
import yellowPortraitThumbnail from './assets/thumbnails/portrait-32.webp'
import violetPortraitThumbnail from './assets/thumbnails/portrait-35.webp'
import standingPortraitThumbnail from './assets/thumbnails/portrait-11.webp'
import lightHanbokPortraitThumbnail from './assets/thumbnails/portrait-14.webp'
import traditionalPortraitThumbnail from './assets/thumbnails/portrait-20.webp'
import blackHanbokPortraitThumbnail from './assets/thumbnails/portrait-31.webp'
import seatedVioletPortraitThumbnail from './assets/thumbnails/portrait-36.webp'
import backVioletPortraitThumbnail from './assets/thumbnails/portrait-39.webp'
import formalPortraitThumbnail from './assets/thumbnails/artist-portrait-960.webp'
export { default as mobilePortraitHero } from './assets/portrait-hero-mobile.webp'
import bowPortrait from './assets/portrait-08.webp'
import monochromePortrait from './assets/portrait-16.webp'
import closePortrait from './assets/portrait-25.webp'
import yellowPortrait from './assets/portrait-32.webp'
import violetPortrait from './assets/portrait-35.webp'
import standingPortrait from './assets/portrait-11.webp'
import lightHanbokPortrait from './assets/portrait-14.webp'
import traditionalPortrait from './assets/portrait-20.webp'
import blackHanbokPortrait from './assets/portrait-31.webp'
import seatedVioletPortrait from './assets/portrait-36.webp'
import backVioletPortrait from './assets/portrait-39.webp'
import formalPortrait from '../home/assets/artist-portrait-960.webp'
import { atmosphericCatalog } from '../works/candidates/atmospheric-catalog.ts'

// Authentic, already optimized gallery photographs from the operating site's
// src/data/profile.ts / public/assets/artist/gallery. Capture dates are unknown;
// the image order does not assert a photographic chronology.
export const portraits = [
  { src: violetPortrait, thumbnail: violetPortraitThumbnail, alt: '보라색 한복을 입고 해금을 든 조윤경', label: '해금', aspect: 1023 / 1537 },
  { src: closePortrait, thumbnail: closePortraitThumbnail, alt: '해금과 활 너머로 아래를 바라보는 조윤경의 얼굴', label: 'Portrait', aspect: 3 / 2 },
  { src: monochromePortrait, thumbnail: monochromePortraitThumbnail, alt: '한복을 입고 해금과 활을 든 조윤경의 흑백 사진', label: '해금과 활', aspect: 2 / 3 },
  { src: yellowPortrait, thumbnail: yellowPortraitThumbnail, alt: '노란 한복을 입은 조윤경의 얼굴을 가까이 담은 사진', label: 'Portrait', aspect: 3 / 2 },
  { src: bowPortrait, thumbnail: bowPortraitThumbnail, alt: '검은 의상을 입고 바닥에 앉아 활을 가로로 든 조윤경', label: '해금과 활', aspect: 2 / 3 },
  { src: formalPortrait, thumbnail: formalPortraitThumbnail, alt: '검정 정장을 입고 손을 모은 조윤경의 공식 프로필 사진', label: 'Portrait', aspect: 2 / 3 },
  { src: standingPortrait, thumbnail: standingPortraitThumbnail, alt: '검은 의상을 입고 해금과 활을 든 채 서 있는 조윤경의 측면 사진', label: '해금과 활', aspect: 1600 / 2400 },
  { src: lightHanbokPortrait, thumbnail: lightHanbokPortraitThumbnail, alt: '밝은 한복을 입고 해금을 들고 서 있는 조윤경의 전신 사진', label: '해금', aspect: 1569 / 2400 },
  { src: traditionalPortrait, thumbnail: traditionalPortraitThumbnail, alt: '연두빛 한복을 입고 전통 머리장식을 한 조윤경', label: 'Portrait', aspect: 1600 / 2400 },
  { src: blackHanbokPortrait, thumbnail: blackHanbokPortraitThumbnail, alt: '검은 한복을 입고 붉은 띠를 두른 조윤경', label: 'Portrait', aspect: 1591 / 2400 },
  { src: seatedVioletPortrait, thumbnail: seatedVioletPortraitThumbnail, alt: '보라색 한복을 입고 앉아 해금과 활을 든 조윤경의 전신 사진', label: '해금과 활', aspect: 1024 / 1536 },
  { src: backVioletPortrait, thumbnail: backVioletPortraitThumbnail, alt: '보라색 한복을 입고 해금과 함께 뒷모습을 보이는 조윤경의 전신 사진', label: '해금', aspect: 1023 / 1537 },
] as const

// Facts: legacy src/data/profile.ts; current role and former principal role:
// docs/redesign/10-ABOUT-MEDIA-CONTACT.md, user-confirmed 2026-09-08.
export const biography = [
  '조윤경은 국립국악학교와 서울국악예술고등학교를 거쳐 한양대학교 음악대학 국악과 및 동 대학원 국악학과를 졸업하고 한양대학교 음악학박사(D.M.A.) 학위를 받았다. 제27회 온나라국악경연대회 해금부문 금상을 수상했으며, 2009년부터 독주회와 창작음악 시리즈를 이어 오고 있다.',
  '현재 국립부산국악원 기악단 단원이며, 국가무형유산 종묘제례악 이수자이자 우리음악앙상블 새.생(new.生) 동인으로 활동하고 있다. 정악과 산조, 해금 창작곡을 연주하며 음반과 무대로 작업을 이어 간다.',
] as const

export const milestones = [
  { year: '2026', title: '풀고, 엮다', detail: '09.22 · 해금상령산풀이 · 관악영산회상' },
  { year: '2026', title: '산조길, 둘', detail: '08.16 · 한범수류 해금산조' },
  { year: '2026', title: '해금, 시대를 잇다', detail: '08.02 · 해금 창작곡의 변천' },
  { year: '2023', title: '산조길, 하나', detail: '지영희류 해금산조' },
  { year: '2022', title: '5인의 작곡가', detail: '조윤경의 해금 VII · 창작음악 시리즈' },
  { year: '2020', title: '한범수류 해금산조', detail: '해금산조 음반 발매' },
  { year: '2014', title: '편', detail: '제3회 해금독주회' },
  { year: '2009', title: '활의 노래', detail: '독주회 시리즈의 시작' },
] as const

export const careerGroups = [
  { title: '현재', items: [
    '국립부산국악원 기악단 단원',
    '국가무형유산 종묘제례악 이수자',
    '우리음악앙상블 새.생(new.生) 동인',
  ] },
  { title: '학력', items: [
    '국립국악학교 졸업',
    '서울국악예술고등학교 졸업 (현 국립전통예술고등학교)',
    '한양대학교 음악대학 국악과 졸업',
    '한양대학교 대학원 국악학과 졸업',
    '한양대학교 음악학박사(D.M.A.)',
  ] },
  { title: '수상', items: [
    '제27회 온나라국악경연대회 해금부문 금상',
  ] },
  { title: '주요 경력', items: [
    '前 국립부산국악원 기악단 수석',
    '前 한양대학교 겸임교수',
    '前 부산대학교 강사',
    '前 부산예술대학교 겸임교수',
    '前 부산예술중·고등학교 강사',
  ] },
] as const

export const recitals = [
  { year: '2009', title: '활의 노래' },
  { year: '2011', title: '활의 노래 II' },
  { year: '2014', title: '편' },
  { year: '2016', title: '전환 — 옛것을 바라보는 시점의 변화' },
  { year: '2018', title: '조윤경의 해금 V' },
  { year: '2020', title: '전환 II — 옛것을 바라보는 시점의 변화' },
  { year: '2022', title: '조윤경의 해금 VII: 창작음악시리즈 — 5인의 작곡가' },
  { year: '2023', title: '산조길, 하나 — 지영희류 해금산조' },
  { year: '2026', title: '해금, 시대를 잇다', date: '2026-08-02', href: '/performance/haegeum-2026-08-02/' },
  { year: '2026', title: '산조길, 둘', date: '2026-08-16', href: '/performance/sanjo-gil-2026-08-16/' },
  { year: '2026', title: '풀고, 엮다', date: '2026-09-22', href: '/performance/haegeum-jeongak-2026-09-22/' },
] as const

export const discography = atmosphericCatalog.filter(record => record.type === 'album').map(record => ({
  year: String(record.year), title: record.title, href: `/album/${record.id.slice('album:'.length)}/`,
}))

