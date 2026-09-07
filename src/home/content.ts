import type { AssetRecord, ImageUse } from '../content/assets.ts'
import type { ContentDate, ContentRef, Locales } from '../content/shared.ts'
import jyhFront from './assets/ji-young-hee-front.webp'
import jyhBack from './assets/ji-young-hee-back.webp'
import jyhSpine from './assets/ji-young-hee-spine.webp'
import yeongsanFront from './assets/yeongsan-front.webp'
import yeongsanBack from './assets/yeongsan-back.webp'
import yeongsanSpine from './assets/yeongsan-spine.webp'
import pyeongjoFront from './assets/pyeongjo-front.webp'
import pyeongjoBack from './assets/pyeongjo-back.webp'
import pyeongjoSpine from './assets/pyeongjo-spine.webp'
import eraPoster from './assets/era-poster.webp'
import sanjoPoster from './assets/sanjo-poster.webp'
import portrait from './assets/artist-portrait.jpg'

// HOME selection projections reuse V2 identity/language/asset contracts. They do not publish archive records.
// Source facts: retained legacy data/albums.ts, data/performances.ts, data/profile.ts; asset hashes in assets/manifest.json.
const copy=(value:string,sourceRef:string):Locales<string>=>({ko:{source:'authored',status:'draft',value,
  provenance:{sourceRef,author:'Retained Korean source; V2 presentation review pending'}}})
export interface HomeWork {
  reference:ContentRef<'album'|'performance'>; title:Locales<string>; shortTitle:string; date:ContentDate
  image:ImageUse; sourceRef:string; slug:string
}
export interface AlbumPresentation {
  reference:ContentRef<'album'>; title:Locales<string>; category:'산조'|'정악'; front:string; back:string; spine:string
  aspect:number; number:string; slug:string
}
const image=(id:string,alt:string,role:ImageUse['role']):ImageUse=>({asset:{id:`asset:home-${id}`,kind:'image'},role,alt:copy(alt,`legacy-public:${id}`)})
export const homeAssets:AssetRecord[]=[
  {id:'asset:home-jyh',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:ji-young-hee-ryu-haegeum-sanjo-2026/front',runtime:{url:jyhFront,mimeType:'image/webp',width:2048,height:1834}},
  {id:'asset:home-yeongsan',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:yeongsan-hoesang-2026/front',runtime:{url:yeongsanFront,mimeType:'image/webp',width:1600,height:1420}},
  {id:'asset:home-pyeongjo',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:pyeongjo-hoesang-2026/front',runtime:{url:pyeongjoFront,mimeType:'image/webp',width:1600,height:1420}},
  {id:'asset:home-era',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:haegeum-2026-08-02/poster',runtime:{url:eraPoster,mimeType:'image/webp',width:1414,height:2000}},
  {id:'asset:home-sanjo',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:sanjo-gil-2026-08-16/poster',runtime:{url:sanjoPoster,mimeType:'image/webp',width:1440,height:2036}},
  {id:'asset:home-portrait',kind:'image',lifecycle:'provisional',masterRef:'legacy-public:artist/profile/portrait',runtime:{url:portrait,mimeType:'image/jpeg',width:1800,height:2700}},
]
export function homeImage(use:ImageUse){
  const asset=homeAssets.find(a=>a.id===use.asset.id)
  if(!asset?.runtime)throw new Error(`Missing HOME source: ${use.asset.id}`)
  return {...asset.runtime,alt:use.alt.ko.value}
}
export const homeAlbums:AlbumPresentation[]=[
  {reference:{kind:'album',id:'album:ji-young-hee-ryu-haegeum-sanjo-2026'},slug:'ji-young-hee-ryu-haegeum-sanjo-2026',title:copy('조윤경 해금산조 – 지영희류','p1c:ji-young-hee-sanjo:ko-copy'),category:'산조',front:jyhFront,back:jyhBack,spine:jyhSpine,aspect:2048/1834,number:'01'},
  {reference:{kind:'album',id:'album:yeongsan-hoesang-2026'},slug:'yeongsan-hoesang-2026',title:copy('조윤경 해금정악 – 영산회상','legacy:albums:yeongsan-hoesang-2026'),category:'정악',front:yeongsanFront,back:yeongsanBack,spine:yeongsanSpine,aspect:1600/1420,number:'02'},
  {reference:{kind:'album',id:'album:pyeongjo-hoesang-2026'},slug:'pyeongjo-hoesang-2026',title:copy('조윤경 해금정악 – 평조회상','legacy:albums:pyeongjo-hoesang-2026'),category:'정악',front:pyeongjoFront,back:pyeongjoBack,spine:pyeongjoSpine,aspect:1600/1420,number:'03'},
]
export const selectedWorks:HomeWork[]=[
  {reference:homeAlbums[0].reference,slug:homeAlbums[0].slug,title:homeAlbums[0].title,shortTitle:'지영희류 해금산조',date:{precision:'year',value:2026},image:image('jyh','지영희류 해금산조 음반 앞면','cover'),sourceRef:'p1c:ji-young-hee-sanjo'},
  {reference:{kind:'performance',id:'performance:haegeum-2026-08-02'},slug:'haegeum-2026-08-02',title:copy('해금, 시대를 잇다','legacy:performances:haegeum-2026-08-02'),shortTitle:'해금, 시대를 잇다',date:{precision:'day',value:'2026-08-02'},image:image('era','해금, 시대를 잇다 공식 공연 포스터','poster'),sourceRef:'legacy:performances:haegeum-2026-08-02'},
  {reference:homeAlbums[1].reference,slug:homeAlbums[1].slug,title:homeAlbums[1].title,shortTitle:'영산회상',date:{precision:'year',value:2026},image:image('yeongsan','영산회상 음반 앞면','cover'),sourceRef:'legacy:albums:yeongsan-hoesang-2026'},
  {reference:homeAlbums[2].reference,slug:homeAlbums[2].slug,title:homeAlbums[2].title,shortTitle:'평조회상',date:{precision:'year',value:2026},image:image('pyeongjo','평조회상 음반 앞면','cover'),sourceRef:'legacy:albums:pyeongjo-hoesang-2026'},
  {reference:{kind:'performance',id:'performance:sanjo-gil-2026-08-16'},slug:'sanjo-gil-2026-08-16',title:copy('산조길, 둘','legacy:performances:sanjo-gil-2026-08-16'),shortTitle:'산조길, 둘',date:{precision:'day',value:'2026-08-16'},image:image('sanjo','산조길, 둘 공식 공연 포스터','poster'),sourceRef:'legacy:performances:sanjo-gil-2026-08-16'},
]
export const stagePerformances=[
  {reference:selectedWorks[1].reference,slug:selectedWorks[1].slug,title:'해금, 시대를 잇다',subtitle:'해금 창작곡의 변천',date:'2026. 08. 02',venue:'향사아트센터',image:selectedWorks[1].image},
  {reference:selectedWorks[4].reference,slug:selectedWorks[4].slug,title:'산조길, 둘',subtitle:'한범수류 해금산조',date:'2026. 08. 16',venue:'해운대문화회관 고운홀',image:selectedWorks[4].image},
]
export const artistPortrait=image('portrait','검정 정장을 입고 손을 모은 해금 연주자 조윤경의 공식 프로필 사진','portrait')
export const contentPath=(work:{reference:ContentRef<'album'|'performance'>;slug:string})=>`/${work.reference.kind}/${work.slug}/`
