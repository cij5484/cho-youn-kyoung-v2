import { useEffect, useRef } from 'react'
import { artistPortrait, homeImage } from './content.ts'
import { EditorialLink } from './EditorialLink.tsx'

export function ArtistScene({ locale }: { locale: 'ko' | 'en' }) {
  const portrait = homeImage(artistPortrait), surface = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = surface.current!, fine = matchMedia('(hover: hover) and (pointer: fine)'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, x = 0, y = 0
    function paint() { frame = 0; element.style.setProperty('--portrait-x', `${x.toFixed(2)}px`); element.style.setProperty('--portrait-y', `${y.toFixed(2)}px`) }
    function move(event: PointerEvent) {
      if (!fine.matches || reduced.matches) return
      const box = element.getBoundingClientRect(); x = ((event.clientX - box.left) / box.width - .5) * 16; y = ((event.clientY - box.top) / box.height - .5) * 12
      if (!frame) frame = requestAnimationFrame(paint)
    }
    function reset() { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(paint) }
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', reset); reduced.addEventListener('change', reset)
    return () => { if (frame) cancelAnimationFrame(frame); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); reduced.removeEventListener('change', reset) }
  }, [])
  return <section id="artist" className="artist-scene" data-home-scene="07" aria-labelledby="artist-heading">
    <div className="section-kicker"><span>07 / THE ARTIST</span><span>해금 연주자 조윤경</span></div>
    <figure ref={surface} className="artist-portrait"><div className="artist-portrait-aperture"><img src={portrait.url} width={portrait.width} height={portrait.height} alt={portrait.alt} loading="lazy" decoding="async"/></div><figcaption>CHO YOUN KYOUNG <span>HAEGEUM ARTIST</span></figcaption></figure>
    <div className="artist-copy"><p className="artist-pretitle">두 현 사이,<br/>하나의 목소리.</p><h2 id="artist-heading">조윤경</h2><p className="artist-statement">해금으로 시간을 잇습니다.<br/>오래된 선율과 오늘의 감각이<br/>하나의 소리로 만나는 곳.</p><EditorialLink to="/about/" locale={locale}>연주자 이야기 보기</EditorialLink></div>
    <p className="artist-name-bridge" aria-hidden="true" lang="en">REMEMBER<br/><em>THE NAME.</em></p>
  </section>
}
