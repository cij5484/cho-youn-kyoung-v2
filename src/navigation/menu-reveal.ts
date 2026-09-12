export type MenuPhase = 'closed' | 'opening' | 'open' | 'closing'

// Header, preferences, HOME, WORKS, MEDIA, ABOUT, CONTACT: composed irregularity, never random on replay.
export const menuKeyTimings = [[0,.64],[.03,.81],[.10,.84],[.205,.785],[.045,.915],[.16,.81],[.085,.865]] as const

// One shared native timeline: reversing keeps every layer at its current visual position.
export function createMenuReveal(dialog: HTMLDialogElement, notify: (phase: MenuPhase) => void) {
  // One clock, independently delayed keys; every reverse starts from the current sampled pose.
  const duration = 680, closeRate = 1.3
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
    const easing = 'cubic-bezier(.16,1,.3,1)'
    // Header, preferences and each page carry their own paper; there is no separately switching header fill.
    dialog.querySelectorAll('.menu-key').forEach((item, index) => {
      const [start,end] = menuKeyTimings[index] ?? [0,.8]
      add(item, { transform: 'translateX(105%)', easing }, { transform: 'translateX(0)' }, start,end)
    })
    dialog.querySelectorAll('.menu-item-reveal').forEach((item, index) => {
      const [start,end] = menuKeyTimings[index+2] ?? [0,.8]
      add(item, { transform: 'translateX(28px)', opacity: 0, easing }, { transform: 'translateX(0)', opacity: 1 }, start+.06,end+.02)
    })
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
      // Dismissal shares the sampled pose and is slightly quicker than entry.
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
