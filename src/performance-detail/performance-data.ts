import record from './performance-record.json'
import { atmosphericImages } from '../works/candidates/atmospheric-assets.ts'
import outer from './assets/leaflet-outer.webp'
import inner from './assets/leaflet-inner.webp'
import kim from './assets/kim-seong-jun.webp'
import heo from './assets/heo-yu-jin.webp'
import yoon from './assets/yoon-seung-hwan.webp'
import hong from './assets/hong-se-a.webp'
import variants from './performance-variants.json'
import lee from './assets/lee-young-seop.webp'
import kimNaYoung from './assets/kim-na-young.webp'
import yang from './assets/yang-seung-hwan.webp'
import jin from './assets/jin-min-jin.webp'
import eo from './assets/eo-yoon-seok.webp'
import sanjoOuter from './assets/sanjo-outer.webp'
import sanjoInner from './assets/sanjo-inner.webp'
import recitalOuter from './assets/recital-outer.webp'
import recitalInner from './assets/recital-inner.webp'

const portraits: Record<string, string> = { '김성준': kim, '허유진': heo, '윤승환': yoon, '홍세아': hong }

export type PerformanceRecord = {
  variant: 'svg-mask' | 'dual-flow' | 'time-path'
  slug: string; title: string; subtitle: string; repertoire?: string; date: string; time: string
  venue: string; venueUrl?: string; fullIntroduction?: string[]; downloads?: { label: string; href: string }[]; address?: string; admission?: string[]; quote?: string; artistNote?: string[]; signature?: string
  program?: { title: string; subtitle?: string; movements?: string[]; instrumentation?: string; note?: string; shortNote?: string; fullNote?: string[]; year?: number; composer?: string; composerYears?: string; composerBio?: string[] }[]
  performers?: { name: string; role: string; portrait?: string; fullBio?: string[] }[]
  poster: { src: string; mobileSrc: string; width: number; height: number }
  archive?: { src: string; label: string; width: number; height: number }[]
}

export const performance: PerformanceRecord = {
  ...record, variant: 'svg-mask', poster: atmosphericImages.pulgo,
  performers: record.performers.map(person => ({ ...person, portrait: portraits[person.name] })),
  archive: [
    { src: outer, label: '리플렛 · 바깥면', width: 4000, height: 1419 },
    { src: inner, label: '리플렛 · 안쪽면', width: 4000, height: 1419 },
  ],
}

const variantAssets: Record<string, string> = {
  'lee-young-seop': lee, 'kim-na-young': kimNaYoung, 'yang-seung-hwan': yang,
  'jin-min-jin': jin, 'eo-yoon-seok': eo, 'yoon-seung-hwan': yoon,
  'sanjo-outer': sanjoOuter, 'sanjo-inner': sanjoInner, 'recital-outer': recitalOuter, 'recital-inner': recitalInner,
}
const variantPosters = { 'dual-flow': atmosphericImages.sanjo, 'time-path': atmosphericImages.recital }
export const performances: PerformanceRecord[] = [performance, ...variants.map((item): PerformanceRecord => {
  if (item.variant !== 'dual-flow' && item.variant !== 'time-path') throw new Error(`Unknown performance variant: ${item.variant}`)
  return { ...item, variant: item.variant, poster: variantPosters[item.variant],
    performers: item.performers.map(person => ({ ...person, portrait: variantAssets[person.portrait] })),
    archive: item.archive.map(page => ({ ...page, src: variantAssets[page.src] })),
  }
})]
