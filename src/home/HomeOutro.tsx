import { useState } from 'react'
import { EditorialLink } from './EditorialLink.tsx'

export function HomeOutro({ locale }: { locale: 'ko' | 'en' }) {
  const [credit, setCredit] = useState(0)
  return <footer className="home-outro" data-home-scene="08" aria-labelledby="outro-heading">
    <div className="outro-topline"><span>08 / AN OPEN END</span></div>
    <h2 id="outro-heading" className="outro-name" lang="en"><span>CHO</span><span>YOUN</span><span>KYOUNG</span></h2>
    <div className="outro-invitation"><p>HAEGEUM ARTIST</p><EditorialLink to="/works/" locale={locale}>모든 작품 보기</EditorialLink></div>
    <div className="outro-bottom"><p>© {new Date().getFullYear()} CHO YOUN KYOUNG</p><div className="outro-credit"><button type="button" onClick={() => setCredit(value => Math.min(2, value + 1))} aria-label={credit ? '제작자의 작은 인사' : '제작자 서명 보기'} aria-expanded={credit > 0}>{credit ? 'Sou.P' : 'Made with care ↗'}</button><span role="status">{credit === 2 ? '좋은 소리가 오래 닿기를. — Sou.P' : ''}</span></div></div>
  </footer>
}
