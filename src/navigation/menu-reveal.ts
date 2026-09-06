export type MenuPhase = 'closed' | 'opening' | 'open' | 'closing'

// One shared native timeline: reversing keeps every layer at its current visual position.
export function createMenuReveal(dialog: HTMLDialogElement, notify: (phase: MenuPhase) => void) {
  // Approved Bold direction: 500ms entry / 400ms full dismissal. Tune only with Hero review.
  const duration = 500, closeRate = 1.25
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let animations: Animation[] = []
  let wantedOpen = false
  let previousOverflow: string | undefined
  let disposed = false

  function phase(value: MenuPhase) {
    dialog.dataset.phase = value
    if (!disposed) notify(value)
  }
  function release() {
    if (previousOverflow !== undefined) document.documentElement.style.overflow = previousOverflow
    previousOverflow = undefined
  }
  function cancelAnimations() {
    for (const animation of animations) { animation.onfinish = null; animation.cancel() }
    animations = []
  }
  function closeImmediately() {
    wantedOpen = false
    cancelAnimations()
    if (dialog.open) dialog.close()
    release()
    phase('closed')
  }
  function finish() {
    if (!wantedOpen) { closeImmediately(); return }
    // CSS is the fully open fallback. Remove finished effects rather than retaining compositor layers.
    cancelAnimations()
    phase('open')
  }
  function build(time: number) {
    const add = (element: Element, from: Keyframe, to: Keyframe, start = 0, end = 1) => {
      const frames: Keyframe[] = [
        { ...from, offset: 0 },
        ...(start > 0 ? [{ ...from, offset: start }] : []),
        { ...to, offset: end },
        ...(end < 1 ? [{ ...to, offset: 1 }] : []),
      ]
      const animation = element.animate(frames, { duration, fill: 'both', easing: 'linear' })
      animation.id = 'editorial-menu-reveal'
      animation.pause(); animation.currentTime = time
      animations.push(animation)
    }
    const easing = 'cubic-bezier(.22,.61,.36,1)'
    // Bold opens an angled leading edge from the MENU side; type itself is never skewed.
    add(dialog.querySelector('.menu-surface')!,
      { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 120% 100%)', easing },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }, .05, .8)
    add(dialog.querySelector('.menu-intro h2')!, { transform: 'translateY(110%)', easing }, { transform: 'translateY(0%)' }, .16, .52)
    add(dialog.querySelector('.menu-entry-rule')!, { transform: 'scaleX(0)', easing }, { transform: 'scaleX(1)' }, .16, .66)
    dialog.querySelectorAll('.menu-item-reveal').forEach((item, index) => {
      add(item, { transform: 'translate(16px, 110%)', easing }, { transform: 'translate(0px, 0%)' }, .22 + index * .06, .76 + index * .06)
    })
    dialog.querySelectorAll('.menu-row-rule').forEach((item, index) => {
      add(item, { transform: 'scaleX(0)', easing }, { transform: 'scaleX(1)' }, .2 + index * .06, .7 + index * .06)
    })
    add(dialog.querySelector('.menu-bottom')!, { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(8px)', easing },
      { clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0px)' }, .64, 1)
    add(dialog.querySelector('.trigger-switch')!, { transform: 'translateY(0%)', easing }, { transform: 'translateY(-50%)' }, 0, .42)
    add(dialog.querySelector('.symbol-lines')!, { transform: 'rotate(0deg)', easing }, { transform: 'rotate(45deg)' }, 0, .42)
    animations[0].onfinish = finish
  }
  function move(open: boolean) {
    if (!open && !dialog.open) return
    wantedOpen = open
    if (open && !dialog.open) {
      previousOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      dialog.showModal()
      dialog.scrollTop = 0
      dialog.querySelector<HTMLButtonElement>('.menu-toggle')!.focus({ preventScroll: true })
    }
    if (!open && dialog.contains(document.activeElement)) {
      dialog.querySelector<HTMLButtonElement>('.menu-toggle')!.focus({ preventScroll: true })
    }
    phase(open ? 'opening' : 'closing')
    if (reduced.matches || typeof dialog.animate !== 'function') { finish(); return }
    if (!animations.length) build(open ? 0 : duration)
    const time = Number(animations[0].currentTime ?? 0)
    // No timers or delayed callbacks: all tracks reverse from the same sampled time.
    for (const animation of animations) {
      animation.pause(); animation.currentTime = time
      // A complete dismissal takes 400ms; interrupted dismissal keeps the same sampled pose.
      animation.playbackRate = open ? 1 : -closeRate
      animation.play()
    }
  }
  const preferenceChanged = () => { if (reduced.matches && dialog.open) finish() }
  reduced.addEventListener('change', preferenceChanged)
  return {
    open: () => move(true), close: () => move(false), toggle: () => move(!wantedOpen), closeImmediately,
    destroy: () => { disposed = true; reduced.removeEventListener('change', preferenceChanged); closeImmediately() },
  }
}
