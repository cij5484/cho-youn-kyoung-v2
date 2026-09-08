import { useEffect, useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { WorksFilter } from './catalog.ts'
import { convergenceProgress, reflowTransform, worldTransform } from './motion.ts'
import type { LayoutBox } from './motion.ts'

function pageBox(node: HTMLElement): LayoutBox {
  const box = node.getBoundingClientRect()
  return { left: box.left + window.scrollX, top: box.top + window.scrollY, width: box.width, height: box.height }
}

function layoutBox(node: HTMLElement): LayoutBox {
  // Destination geometry must ignore a still-running filter FLIP on its parent.
  let left = 0
  let top = 0
  let current: HTMLElement | null = node
  while (current) {
    left += current.offsetLeft
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  return { left, top, width: node.offsetWidth, height: node.offsetHeight }
}

function cards(node: HTMLElement): Map<string, LayoutBox> {
  return new Map(Array.from(node.querySelectorAll<HTMLElement>('[data-work-id]')).map(card => [card.dataset.workId!, pageBox(card)]))
}

export function useWorksChoreography(root: RefObject<HTMLElement | null>, filter: WorksFilter) {
  const previous = useRef(new Map<string, LayoutBox>())
  const toolbarPosition = useRef<number | null>(null)
  const animations = useRef<Animation[]>([])
  const capture = () => {
    const node = root.current
    if (!node) return
    previous.current = cards(node)
    toolbarPosition.current = node.querySelector('.works-archive-toolbar')!.getBoundingClientRect().top
  }

  useEffect(() => {
    const snapshot = () => {
      const node = root.current
      if (!node) return
      previous.current = cards(node)
      toolbarPosition.current = node.querySelector('.works-archive-toolbar')!.getBoundingClientRect().top
    }
    window.addEventListener('popstate', snapshot)
    return () => window.removeEventListener('popstate', snapshot)
  }, [root])

  useLayoutEffect(() => {
    const node = root.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const worlds = node.querySelector<HTMLElement>('.works-worlds')!
    const grid = node.querySelector<HTMLElement>('.works-grid')!
    let scheduled = 0
    let disposed = false
    let start = 0
    let end = 1
    let toolbarBottom = 0
    let thresholdBottom = 0
    let targets: { image: HTMLElement; opening: LayoutBox; destination: LayoutBox; start: number }[] = []
    const reset = () => {
      node.querySelectorAll<HTMLElement>('.works-image-transport').forEach(image => image.style.removeProperty('transform'))
      node.style.setProperty('--convergence', '1')
      node.style.setProperty('--threshold-reveal', '1')
      node.style.setProperty('--filter-reveal', '1')
      node.style.setProperty('--world-label-exit', '1')
      node.setAttribute('data-archive-phase', 'archive')
      node.setAttribute('data-works-stage', 'archive')
    }
    const paint = () => {
      scheduled = 0
      if (reduced.matches || filter !== 'all') { reset(); return }
      const progress = convergenceProgress(window.scrollY, start, end)
      node.style.setProperty('--convergence', progress.toFixed(5))
      node.setAttribute('data-archive-phase', progress <= .001 ? 'portal' : progress >= .999 ? 'archive' : 'reorganizing')
      node.setAttribute('data-works-stage', progress <= .001 ? 'dual-worlds' : progress >= .999 ? 'archive' : 'convergence')
      let imageTop = Infinity
      for (const target of targets) {
        const local = convergenceProgress(window.scrollY, target.start, end)
        target.image.style.transform = worldTransform(target.opening, target.destination, local)
        imageTop = Math.min(imageTop, target.opening.top + (target.destination.top - target.opening.top) * local)
      }
      const clamp = (value: number) => Math.max(0, Math.min(1, value))
      // Text enters only after the actual transported image clears its row.
      // The artwork stays fully visible throughout; only the competing type is masked.
      node.style.setProperty('--threshold-reveal', String(progress >= .999 ? 1 : clamp((imageTop - thresholdBottom - 8) / 28)))
      node.style.setProperty('--filter-reveal', String(progress >= .999 ? 1 : clamp((imageTop - toolbarBottom - 8) / 28)))
      node.style.setProperty('--world-label-exit', String(clamp((progress - .07) / .24)))
    }
    const schedule = () => { if (!scheduled) scheduled = requestAnimationFrame(paint) }
    const measure = () => {
      if (disposed) return
      node.setAttribute('data-worlds-ready', reduced.matches ? 'false' : 'true')
      if (reduced.matches || filter !== 'all') {
        if (reduced.matches) animations.current.forEach(animation => animation.cancel())
        targets = []; reset(); return
      }
      const worldBox = pageBox(worlds)
      const gridBox = pageBox(grid)
      const mobile = window.matchMedia('(max-width: 600px)').matches
      start = Math.max(0, worldBox.top - window.innerHeight * (mobile ? .13 : .30))
      const headerBottom = document.querySelector('.editorial-navigation')?.getBoundingClientRect().bottom ?? 76
      const toolbarBox = pageBox(node.querySelector<HTMLElement>('.works-archive-toolbar')!)
      const thresholdBox = pageBox(node.querySelector<HTMLElement>('.works-threshold')!)
      toolbarBottom = toolbarBox.top + toolbarBox.height
      thresholdBottom = thresholdBox.top + thresholdBox.height
      const filterHeight = toolbarBox.height
      end = Math.max(start + 1, gridBox.top - Math.max(144, headerBottom + filterHeight + 28))
      node.setAttribute('data-convergence-start', String(start))
      node.setAttribute('data-convergence-end', String(end))
      targets = Array.from(node.querySelectorAll<HTMLElement>('.works-card[data-emphasis="portal"]')).map(card => {
        const slot = card.querySelector<HTMLElement>('.works-image-slot')!
        const anchor = node.querySelector<HTMLElement>(`[data-world-anchor="${card.dataset.kind}"]`)!
        const opening = pageBox(anchor)
        const localStart = mobile ? Math.min(end - 160, Math.max(start, opening.top - window.innerHeight * .55)) : start
        return { image: slot.querySelector<HTMLElement>('.works-image-transport')!, opening, destination: layoutBox(slot), start: localStart }
      })
      paint()
    }
    measure()
    if (toolbarPosition.current !== null) {
      const top = node.querySelector('.works-archive-toolbar')!.getBoundingClientRect().top
      // A query change removes/restores the introduction. Preserve the filter's
      // actual viewport position instead of stranding the reader further down.
      const beforeScroll = window.scrollY
      window.scrollBy({ top: top - toolbarPosition.current, behavior: 'instant' })
      const scrollDelta = window.scrollY - beforeScroll
      previous.current.forEach(box => { box.top += scrollDelta })
      toolbarPosition.current = null
      paint()
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    reduced.addEventListener('change', measure)
    void document.fonts.ready.then(measure)
    return () => {
      disposed = true
      cancelAnimationFrame(scheduled)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      reduced.removeEventListener('change', measure)
    }
  }, [filter, root])

  useLayoutEffect(() => {
    const node = root.current
    if (!node) return
    animations.current.forEach(animation => animation.cancel())
    animations.current = []
    const after = cards(node)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && previous.current.size) {
      node.querySelectorAll<HTMLElement>('[data-work-id]').forEach(card => {
        const from = previous.current.get(card.dataset.workId!)
        const to = after.get(card.dataset.workId!)!
        animations.current.push(card.animate(from ? [
          { transform: reflowTransform(from, to) }, { transform: 'none' },
        ] : [
          { transform: 'translateY(20px)' }, { transform: 'none' },
        ], { duration: 400, easing: 'cubic-bezier(.2,.7,.2,1)' }))
      })
    }
    previous.current = after
    return () => {
      animations.current.forEach(animation => animation.cancel())
      animations.current = []
    }
  }, [filter, root])
  return capture
}
