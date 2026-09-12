import { productionSite } from '../../config/public-site.ts'
import { atmosphericCatalog, type AtmosphericImage } from '../works/candidates/atmospheric-catalog.ts'

export type SeoPage = {
  path: string
  title: string
  description: string
  image: { source: string; alt: string }
  structured?: Record<string, unknown>
}

// Public presentation facts only; never import the server-only publication draft.
// Sources: current About biography, Contact address, album summaries and performance records.
const portrait = {
  source: 'src/home/assets/artist-portrait.jpg',
  alt: '해금 연주자 조윤경의 공식 프로필 사진',
}
const person = { '@type': 'Person', name: '조윤경', '@id': `${productionSite.origin}/#person` }
const images: Record<AtmosphericImage, string> = {
  jiYoungHee: 'src/home/assets/ji-young-hee-front.webp',
  yeongsan: 'src/home/assets/yeongsan-front.webp',
  pyeongjo: 'src/home/assets/pyeongjo-front.webp',
  hanBeomSu: 'src/works/assets/han-beom-su-front.webp',
  pulgo: 'src/home/assets/pulgo-yeokda-poster.webp',
  sanjo: 'src/home/assets/sanjo-poster.webp',
  recital: 'src/works/assets/haegeum-recital-poster.webp',
}

const albumSummaries: Record<string, string> = {
  'ji-young-hee-ryu-haegeum-sanjo-2026': '지영희류 해금산조의 긴산조와 짧은산조를 여섯 트랙에 담았습니다.',
  'yeongsan-hoesang-2026': '상령산부터 군악까지, 영산회상 아홉 곡을 담은 조윤경의 해금정악 음반입니다.',
  'pyeongjo-hoesang-2026': '상령산부터 군악까지, 평조회상 여덟 곡을 담은 조윤경의 해금정악 음반입니다.',
  'han-beom-su-haegeum-sanjo-2020': '다스름, 긴 산조와 짧은 산조를 담은 조윤경의 한범수류 해금산조 음반입니다.',
}

const albumPages: SeoPage[] = atmosphericCatalog.filter(record => record.type === 'album').map(record => {
  const slug = record.id.slice('album:'.length)
  return {
    path: `/immersive/album/${slug}/`,
    title: `${record.title} | 조윤경`,
    description: albumSummaries[slug],
    image: { source: images[record.image], alt: `${record.title} 앨범 표지` },
    structured: {
      '@type': 'MusicAlbum', name: record.title, byArtist: person,
      // Unknown publication month/day and announced releases stay unspecified.
      ...(record.date && record.releaseState !== 'announced' ? { datePublished: record.date } : {}),
    },
  }
})

// Small metadata projection of performance-detail/performance-{record,variants}.json.
// Keep long restored reading text and biographies out of the page-head runtime.
const performanceFacts = [
  {
    "slug": "haegeum-jeongak-2026-09-22",
    "title": "풀고, 엮다",
    "subtitle": "조윤경의 해금정악",
    "date": "2026-09-22",
    "time": "19:30",
    "venue": "국립부산국악원 예지당",
    "address": "부산광역시 부산진구 국악로 2",
    "program": [
      "관악영산회상",
      "해금 상령산풀이"
    ]
  },
  {
    "slug": "sanjo-gil-2026-08-16",
    "title": "산조길, 둘",
    "subtitle": "한범수류 해금산조",
    "date": "2026-08-16",
    "time": "15:30",
    "venue": "해운대문화회관 고운홀",
    "address": "부산광역시 해운대구 양운로 97",
    "program": [
      "육자배기 · 흥타령",
      "한범수류 해금산조"
    ]
  },
  {
    "slug": "haegeum-2026-08-02",
    "title": "해금, 시대를 잇다",
    "subtitle": "해금 창작곡의 변천",
    "date": "2026-08-02",
    "time": "16:00",
    "venue": "향사아트센터",
    "address": "경북 칠곡군 석적읍 강변대로 1570 향사아트센터",
    "program": [
      "해금과 장구를 위한 소곡",
      "등롱",
      "적념",
      "춤사리기",
      "활의 노래",
      "소리 Sori"
    ]
  }
]

const performancePages: SeoPage[] = performanceFacts.map(record => {
  const catalogRecord = atmosphericCatalog.find(item => item.id === `performance:${record.slug}`)!
  return {
    path: `/immersive/performance/${record.slug}/`,
    title: `${record.title} — ${record.subtitle} | 조윤경`,
    description: `${record.date.replaceAll('-', '.')} ${record.time}, ${record.venue}. ${record.subtitle}. ${record.program.join(' · ')}.`,
    image: { source: images[catalogRecord.image], alt: `${record.title} 공연 포스터` },
    structured: {
      '@type': 'Event', name: record.title,
      startDate: `${record.date}T${record.time}:00+09:00`,
      location: { '@type': 'Place', name: record.venue, address: record.address },
      performer: person,
      // End time, ticket availability and event status are not inferred from a date.
    },
  }
})

export const publicPages: readonly SeoPage[] = [
  {
    path: '/', title: '조윤경 | CHO YOUN KYOUNG',
    description: '해금 연주자 조윤경의 공식 웹사이트. Classic과 Immersive에서 공연, 음반, 영상과 프로필을 만나볼 수 있습니다.',
    image: portrait,
  },
  {
    path: '/immersive/', title: '조윤경의 해금 | CHO YOUN KYOUNG',
    description: '조윤경의 해금과 연주, 음반과 공연. 정악과 산조, 해금 창작곡을 연주하는 해금 연주자의 작업을 소개합니다.',
    image: portrait,
  },
  {
    path: '/immersive/works/', title: '공연과 음반 | 조윤경',
    description: '조윤경의 해금 독주회와 음반 기록. 풀고, 엮다, 산조길, 둘, 해금, 시대를 잇다와 지영희류·한범수류 해금산조, 영산회상·평조회상.',
    image: { source: images.jiYoungHee, alt: '조윤경 해금산조 – 지영희류 앨범 표지' },
  },
  {
    path: '/immersive/about/', title: '프로필과 활동 | 조윤경',
    description: '해금 연주자 조윤경의 프로필, 학력, 수상과 독주회 기록. 국립부산국악원 기악단 단원, 국가무형유산 종묘제례악 이수자.',
    image: portrait,
  },
  {
    path: '/immersive/media/', title: '연주 영상과 기록 | 조윤경',
    description: '한범수류 해금산조, 제6회 해금 독주회, 강태홍류 산조중주 등 조윤경의 연주 영상과 기록.',
    image: portrait,
  },
  {
    path: '/immersive/contact/', title: '공연·협업 문의 | 조윤경',
    description: '조윤경 공연, 협업 및 문의. 이메일 cykguri@naver.com.',
    image: portrait,
  },
  ...albumPages,
  ...performancePages,
]
