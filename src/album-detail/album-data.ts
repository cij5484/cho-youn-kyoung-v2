import jyhTray from './assets/jyh-interior-tray.webp'
import yeongsanInside from './assets/yeongsan-interior-booklet.webp'
import yeongsanTray from './assets/yeongsan-interior-tray.webp'
import yeongsanDisc from './assets/yeongsan-cd-label.webp'
import yeongsanBooklet01 from './assets/yeongsan-booklet-01.webp'
import yeongsanBooklet02 from './assets/yeongsan-booklet-02.webp'
import yeongsanBooklet03 from './assets/yeongsan-booklet-03.webp'
import yeongsanBooklet04 from './assets/yeongsan-booklet-04.webp'
import yeongsanBooklet05 from './assets/yeongsan-booklet-05.webp'
import yeongsanBooklet06 from './assets/yeongsan-booklet-06.webp'
import yeongsanBooklet07 from './assets/yeongsan-booklet-07.webp'
import yeongsanBooklet08 from './assets/yeongsan-booklet-08.webp'
import yeongsanBooklet09 from './assets/yeongsan-booklet-09.webp'
import yeongsanBooklet10 from './assets/yeongsan-booklet-10.webp'
import yeongsanBooklet11 from './assets/yeongsan-booklet-11.webp'
import pyeongjoInside from './assets/pyeongjo-interior-booklet.webp'
import pyeongjoTray from './assets/pyeongjo-interior-tray.webp'
import pyeongjoDisc from './assets/pyeongjo-cd-label.webp'
import pyeongjoBooklet01 from './assets/pyeongjo-booklet-01.webp'
import pyeongjoBooklet02 from './assets/pyeongjo-booklet-02.webp'
import pyeongjoBooklet03 from './assets/pyeongjo-booklet-03.webp'
import pyeongjoBooklet04 from './assets/pyeongjo-booklet-04.webp'
import pyeongjoBooklet05 from './assets/pyeongjo-booklet-05.webp'
import pyeongjoBooklet06 from './assets/pyeongjo-booklet-06.webp'
import pyeongjoBooklet07 from './assets/pyeongjo-booklet-07.webp'
import pyeongjoBooklet08 from './assets/pyeongjo-booklet-08.webp'
import pyeongjoBooklet09 from './assets/pyeongjo-booklet-09.webp'
import pyeongjoBooklet10 from './assets/pyeongjo-booklet-10.webp'
import pyeongjoBooklet11 from './assets/pyeongjo-booklet-11.webp'
import hanbeomsuBack from './assets/hanbeomsu-back.webp'
import hanbeomsuDisc from './assets/hanbeomsu-cd-label.webp'
import hanbeomsuBooklet01 from './assets/hanbeomsu-booklet-01.webp'
import hanbeomsuBooklet02 from './assets/hanbeomsu-booklet-02.webp'
import hanbeomsuBooklet03 from './assets/hanbeomsu-booklet-03.webp'
import hanbeomsuBooklet04 from './assets/hanbeomsu-booklet-04.webp'
import hanbeomsuBooklet05 from './assets/hanbeomsu-booklet-05.webp'
import hanbeomsuBooklet06 from './assets/hanbeomsu-booklet-06.webp'
import hanbeomsuBooklet07 from './assets/hanbeomsu-booklet-07.webp'
import hanbeomsuBooklet08 from './assets/hanbeomsu-booklet-08.webp'
import hanbeomsuBooklet09 from './assets/hanbeomsu-booklet-09.webp'
import hanbeomsuBooklet10 from './assets/hanbeomsu-booklet-10.webp'
import hanbeomsuBooklet11 from './assets/hanbeomsu-booklet-11.webp'
import { atmosphericCatalog } from '../works/candidates/atmospheric-catalog.ts'
import { atmosphericImages } from '../works/candidates/atmospheric-assets.ts'
import jyhBack from '../home/assets/ji-young-hee-back.webp'
import yeongsanBack from '../home/assets/yeongsan-back.webp'
import pyeongjoBack from '../home/assets/pyeongjo-back.webp'
import jyhInside from './assets/jyh-interior-booklet.webp'
import jyhDisc from './assets/jyh-cd-label.webp'
import booklet01 from './assets/jyh-booklet-01.webp'
import booklet02 from './assets/jyh-booklet-02.webp'
import booklet03 from './assets/jyh-booklet-03.webp'
import booklet04 from './assets/jyh-booklet-04.webp'
import booklet05 from './assets/jyh-booklet-05.webp'
import booklet06 from './assets/jyh-booklet-06.webp'
import booklet07 from './assets/jyh-booklet-07.webp'

export interface AlbumExhibit {
  slug: string; title: string; subtitle: string; year: number
  front: string; back?: string; disc?: string; inside?: string; trayInside?: string; booklet: string[]
  tracks: { title: string; printedDuration: string; audioUrl?: string }[]
  credits: { role: string; name: string }[]
  mood: string; statement: string; summary: string
}

// LOCAL R&D only. Public legacy album facts, P1C confirmed credits and provisional artwork.
// Printed timings are not decoded durations. No server-only draft import. Public legacy audio connection authorized for this local pass.
const details: Record<string, Omit<AlbumExhibit, 'slug' | 'title' | 'year' | 'front'>> = {
  'ji-young-hee-ryu-haegeum-sanjo-2026': {
    subtitle: '지영희류', mood: 'paper', statement: '해금과 산조',
    summary: '지영희류 해금산조의 긴산조와 짧은산조를 여섯 트랙에 담았습니다.',
    back: jyhBack, disc: jyhDisc, inside: jyhInside, trayInside: jyhTray,
    booklet: [booklet01, booklet02, booklet03, booklet04, booklet05, booklet06, booklet07],
    tracks: [
      { title: '진양', printedDuration: '12:51', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/01_jinyang.mp3' }, { title: '중모리', printedDuration: '09:49', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/02_jungmori.mp3' },
      { title: '중중모리', printedDuration: '03:06', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/03_jungjungmori.mp3' }, { title: '굿거리', printedDuration: '02:20', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/04_gutgeori.mp3' },
      { title: '자진모리', printedDuration: '02:43', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/05_jajinmori.mp3' }, { title: '짧은산조', printedDuration: '12:06', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/06_short-sanjo.mp3' },
    ],
    credits: [
      { role: '해금', name: '조윤경' }, { role: '장구', name: '이영섭' },
      { role: '프로듀싱', name: '조윤경' }, { role: '녹음', name: '떨기나무' },
      { role: '믹싱', name: '떨기나무' }, { role: '마스터링', name: '떨기나무' },
      { role: '유통', name: '조은뮤직' }, { role: '디자인', name: 'Soul.P' },
    ],
  },
  'yeongsan-hoesang-2026': {
    subtitle: '영산회상', mood: 'blue', statement: '해금의 정악',
    summary: '상령산부터 군악까지, 영산회상 아홉 곡을 담은 조윤경의 해금정악 음반입니다.',
    back: yeongsanBack, inside: yeongsanInside, trayInside: yeongsanTray, disc: yeongsanDisc,
    booklet: [yeongsanBooklet01, yeongsanBooklet02, yeongsanBooklet03, yeongsanBooklet04, yeongsanBooklet05, yeongsanBooklet06, yeongsanBooklet07, yeongsanBooklet08, yeongsanBooklet09, yeongsanBooklet10, yeongsanBooklet11],
    tracks: [
      { title: '중광지곡 상령산', printedDuration: '13:29', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/01_sangryeongsan.mp3' }, { title: '중광지곡 중령산', printedDuration: '10:26', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/02_jungnyeongsan.mp3' },
      { title: '중광지곡 세령산', printedDuration: '03:42', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/03_seryongsan.mp3' }, { title: '중광지곡 가락덜이', printedDuration: '02:28', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/04_garakdeori.mp3' },
      { title: '중광지곡 상현도드리', printedDuration: '04:19', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/05_sanghyeondodeuri.mp3' }, { title: '중광지곡 하현도드리', printedDuration: '02:58', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/06_hahyeondodeuri.mp3' },
      { title: '중광지곡 염불도드리', printedDuration: '04:10', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/07_yeombuldodeuri.mp3' }, { title: '중광지곡 타령', printedDuration: '03:06', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/08_taryeong.mp3' },
      { title: '중광지곡 군악', printedDuration: '04:04', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/yeongsan/09_gunak.mp3' },
    ],
    credits: [
      { role: '프로듀싱', name: '조윤경' }, { role: '녹음 · 믹싱 · 마스터링', name: '이음사운드' },
      { role: '유통', name: '조은뮤직' }, { role: '디자인', name: 'Soul.P' },
    ],
  },
  'pyeongjo-hoesang-2026': {
    subtitle: '평조회상', mood: 'ivory', statement: '해금의 정악',
    summary: '상령산부터 군악까지, 평조회상 여덟 곡을 담은 조윤경의 해금정악 음반입니다.',
    back: pyeongjoBack, inside: pyeongjoInside, trayInside: pyeongjoTray, disc: pyeongjoDisc,
    booklet: [pyeongjoBooklet01, pyeongjoBooklet02, pyeongjoBooklet03, pyeongjoBooklet04, pyeongjoBooklet05, pyeongjoBooklet06, pyeongjoBooklet07, pyeongjoBooklet08, pyeongjoBooklet09, pyeongjoBooklet10, pyeongjoBooklet11],
    tracks: [
      { title: '평조회상 상령산', printedDuration: '13:36', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/01_sangryeongsan.mp3' }, { title: '평조회상 중령산', printedDuration: '11:42', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/02_jungnyeongsan.mp3' },
      { title: '평조회상 세령산', printedDuration: '04:01', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/03_seryongsan.mp3' }, { title: '평조회상 가락덜이', printedDuration: '02:31', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/04_garakdeori.mp3' },
      { title: '평조회상 상현도드리', printedDuration: '04:22', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/05_sanghyeondodeuri.mp3' }, { title: '평조회상 염불도드리', printedDuration: '04:18', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/06_yeombuldodeuri.mp3' },
      { title: '평조회상 타령', printedDuration: '03:14', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/07_taryeong.mp3' }, { title: '평조회상 군악', printedDuration: '04:13', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/pyeongjo/08_gunak.mp3' },
    ],
    credits: [
      { role: '프로듀싱', name: '조윤경' }, { role: '녹음 · 믹싱 · 마스터링', name: '이음사운드' },
      { role: '유통', name: '조은뮤직' }, { role: '디자인', name: 'Soul.P' },
    ],
  },
  'han-beom-su-haegeum-sanjo-2020': {
    subtitle: '한범수류', mood: 'ink', statement: '해금과 산조',
    summary: '다스름, 긴 산조와 짧은 산조를 담은 조윤경의 한범수류 해금산조 음반입니다.',
    back: hanbeomsuBack, disc: hanbeomsuDisc,
    // Public legacy maps its booklet cover to both interior panels; no physical inside claim.
    inside: hanbeomsuBooklet01, trayInside: hanbeomsuBooklet01,
    booklet: [hanbeomsuBooklet01, hanbeomsuBooklet02, hanbeomsuBooklet03, hanbeomsuBooklet04, hanbeomsuBooklet05, hanbeomsuBooklet06, hanbeomsuBooklet07, hanbeomsuBooklet08, hanbeomsuBooklet09, hanbeomsuBooklet10, hanbeomsuBooklet11],
    // Legacy record has no printed timings for this album; preserve absence instead of guessing.
    tracks: [
      { title: '다스름', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/01_daseureum.mp3' }, { title: '긴 산조 - 진양', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/02_long-sanjo_jinyang.mp3' },
      { title: '긴 산조 - 중모리', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/03_long-sanjo_jungmori.mp3' }, { title: '긴 산조 - 중중모리', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/04_long-sanjo_jungjungmori.mp3' },
      { title: '긴 산조 - 자진모리', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/05_long-sanjo_jajinmori.mp3' }, { title: '짧은 산조', printedDuration: '', audioUrl: 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/06_short-sanjo.mp3' },
    ],
    credits: [
      { role: '프로듀싱', name: '조윤경' }, { role: '녹음 · 믹싱 · 마스터링', name: '이음사운드' },
      { role: '사진', name: '한상균 · 어반그레이스튜디오' }, { role: '디자인', name: '디자인끌림' },
    ],
  },
}

export const albums: AlbumExhibit[] = atmosphericCatalog.filter(record => record.type === 'album').map(record => {
  const slug = record.id.slice('album:'.length)
  return { slug, title: record.title, year: record.year, front: atmosphericImages[record.image].src, ...details[slug] }
})
