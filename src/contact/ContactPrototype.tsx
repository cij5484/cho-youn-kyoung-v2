import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './contact.css'

const email = 'cykguri@naver.com'
const words = ['PERFORMANCE', 'COLLABORATION', 'INQUIRIES']

export default function ContactPrototype() {
  const page = useRef<HTMLElement>(null)
  const emailLink = useRef<HTMLAnchorElement>(null)
  const alive = useRef(false)
  const reset = useRef<number | undefined>(undefined)
  const [copy, setCopy] = useState<'idle' | 'pending' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    alive.current = true
    const element = page.current!
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const lines = Array.from(element.querySelectorAll<HTMLElement>('.contact-type-motion'))
      let pointerX = 0, pointerY = 0
      const render = () => {
        const scroll = Math.max(0, Math.min(1, -element.getBoundingClientRect().top / window.innerHeight))
        // KineticTypePageTransition: repeated text rows travel independently; contact keeps a quiet range.
        lines.forEach((line, index) => {
          const direction = index === 1 ? -1 : 1
          gsap.to(line, {
            x: direction * (pointerX * 18 + scroll * 38),
            y: pointerY * (index + 1) * 2 - scroll * 9,
            skewX: pointerX * direction * .7,
            duration: .8, ease: 'power3.out', overwrite: true,
          })
        })
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        const bounds = element.getBoundingClientRect()
        pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1
        pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1
        render()
      }
      const leave = () => { pointerX = 0; pointerY = 0; render() }
      gsap.fromTo(element.querySelectorAll('.contact-type-window'),
        { clipPath: 'inset(100% 0 0)' },
        { clipPath: 'inset(0% 0 0)', duration: .8, stagger: .08, ease: 'power3.out', clearProps: 'clipPath' })
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)
      window.addEventListener('scroll', render, { passive: true })
      return () => {
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
        window.removeEventListener('scroll', render)
        gsap.killTweensOf(lines)
        gsap.set(lines, { clearProps: 'transform' })
      }
    }, element)
    return () => {
      alive.current = false
      window.clearTimeout(reset.current)
      motion.revert()
    }
  }, [])

  const copyEmail = async () => {
    window.clearTimeout(reset.current)
    setCopy('pending')
    try {
      await navigator.clipboard.writeText(email)
      if (!alive.current) return
      setCopy('copied')
      reset.current = window.setTimeout(() => setCopy('idle'), 2000)
    } catch {
      if (!alive.current) return
      setCopy('failed')
      const range = document.createRange()
      range.selectNodeContents(emailLink.current!)
      window.getSelection()?.removeAllRanges()
      window.getSelection()?.addRange(range)
      emailLink.current?.focus({ preventScroll: true })
    }
  }

  return <article className="contact-page" ref={page} data-copy={copy} aria-labelledby="contact-title">
    <header className="contact-heading">
      <h1 id="contact-title">Contact</h1>
      <p>CHO YOUN KYOUNG</p>
    </header>

    <div className="contact-type" aria-label="공연, 협업 및 문의">
      {words.map((word, index) => <div className="contact-type-window" key={word} aria-hidden="true">
        <div className="contact-type-motion"><div className="contact-type-track">
          <span className="contact-type-echo">{word}</span>
          <span className="contact-type-word">
            <span className="contact-word-original">{word}</span>
            {index === 2 && <span className="contact-word-copied">COPIED</span>}
          </span>
          <span className="contact-type-echo">{word}</span>
        </div></div>
      </div>)}
    </div>

    <section className="contact-details" aria-label="연락처">
      <p className="contact-inquiry-label">공연 · 협업 문의</p>
      <address><a ref={emailLink} className="contact-email" href={`mailto:${email}`}>{email}</a></address>
      <div className="contact-actions">
        <a href={`mailto:${email}`}>이메일 보내기</a>
        <button type="button" onClick={() => void copyEmail()} disabled={copy === 'pending'} aria-busy={copy === 'pending'}>
          {copy === 'copied' ? '복사 완료' : copy === 'pending' ? '복사 중' : '이메일 복사'}
        </button>
      </div>
      <p className="contact-copy-status" role="status" aria-live="polite">
        {copy === 'copied' ? '이메일 주소를 복사했습니다.' : copy === 'failed' ? '복사할 수 없습니다. 선택된 이메일 주소를 직접 복사해 주세요.' : '\u00a0'}
      </p>
    </section>

    <footer className="contact-footer">
      <span>해금 연주자 조윤경</span>
      <a href="https://www.instagram.com/cho.younkyoung/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — 새 창">INSTAGRAM</a>
    </footer>
  </article>
}
