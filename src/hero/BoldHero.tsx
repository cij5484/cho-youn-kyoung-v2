import { useRef } from 'react'
import { useHeroMotion } from './useHeroMotion.ts'
import initialPortrait from './assets/portrait-initial.webp'
import instrumentPortrait from './assets/portrait-instrument.webp'
import initialSmall from './assets/portrait-initial-640.webp'
import instrumentSmall from './assets/portrait-instrument-640.webp'

const sizes = '(max-width: 639px) 90vw, 80vw'
const Name = () => <><span className="word word-cho">CHO</span><span className="word word-youn">YOUN</span><span className="word word-kyoung">KYOUNG</span></>

// The selected direction has no variant prop, query mode or alternative composition dependency.
export function BoldHero({ continuationId }: { continuationId: string }) {
  const scene = useRef<HTMLElement>(null)
  useHeroMotion(scene)
  return <section ref={scene} className="bold-hero poster-scene" aria-labelledby="artist-name">
    <div className="poster-stage">
      <h1 id="artist-name" className="hero-visually-hidden" lang="en">CHO YOUN KYOUNG</h1>
      <div className="poster-type poster-type-back" aria-hidden="true" lang="en"><Name /></div>
      <figure className="portrait-plane" lang="ko" aria-label="조윤경의 보라 한복 옆·뒤태에서 해금이 보이는 모습으로 이어지는 사진">
        <img className="portrait portrait-initial" src={initialPortrait} srcSet={`${initialSmall} 640w, ${initialPortrait} 1023w`} sizes={sizes} width="1023" height="1537" fetchPriority="high" alt="보라 한복을 입은 조윤경의 옆·뒤태" />
        <div className="portrait-next" aria-hidden="true"><img className="portrait portrait-instrument" src={instrumentPortrait} srcSet={`${instrumentSmall} 640w, ${instrumentPortrait} 1024w`} sizes={sizes} width="1024" height="1536" decoding="async" alt="" /></div>
      </figure>
      <div className="poster-type poster-type-front" aria-hidden="true" lang="en"><Name /></div>
      <div className="poster-lines" aria-hidden="true"><span className="tension-line line-one" /><span className="tension-line line-two" /></div>
      <p className="poster-signature"><span lang="ko">조윤경</span><span lang="en">HAEGEUM ARTIST</span></p>
      <p className="poster-aside" lang="en">TWO STRINGS.<br />A WORLD BETWEEN.</p>
      <a className="poster-scroll" href={`#${continuationId}`}><span lang="en">SCROLL TO SHIFT</span><span aria-hidden="true">↓</span></a>
    </div>
  </section>
}
