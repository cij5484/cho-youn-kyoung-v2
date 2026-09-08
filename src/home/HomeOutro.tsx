import { useRef, useState } from 'react'
import { EditorialLink } from './EditorialLink.tsx'
import { useOutroSurface } from './outro-surface.ts'
import { SceneRevisitIndex } from './SceneRevisitIndex.tsx'

export function HomeOutro({ locale }: { locale: 'ko' | 'en' }) {
  const [credit, setCredit] = useState(0)
  const root = useRef<HTMLElement>(null)
  useOutroSurface(root)
  return <footer ref={root} className="home-outro" data-home-scene="08" aria-labelledby="outro-heading">
    <div className="outro-topline"><span>08 / AN OPEN END</span></div>
    <h2 id="outro-heading" className="outro-name" lang="en" aria-label="Cho Youn Kyoung">{['CHO','YOUN','KYOUNG'].map(word=><span key={word} aria-hidden="true">{[...word].map((glyph,index)=><span data-outro-glyph key={index}>{glyph}</span>)}</span>)}</h2>
    <div className="outro-invitation"><p>HAEGEUM ARTIST</p><EditorialLink to="/works/" locale={locale}>모든 작품 보기</EditorialLink></div>
    <SceneRevisitIndex/>
    <div className="outro-bottom"><p>© {new Date().getFullYear()} CHO YOUN KYOUNG</p><div className="outro-credit"><button type="button" onClick={() => setCredit(value => Math.min(2, value + 1))} aria-label={credit ? '제작자의 작은 인사' : '제작자 서명 보기'} aria-expanded={credit > 0}>{credit ? 'Sou.P' : 'Made with care ↗'}</button><span role="status">{credit === 2 ? '좋은 소리가 오래 닿기를. — Sou.P' : ''}</span></div></div>
  </footer>
}
