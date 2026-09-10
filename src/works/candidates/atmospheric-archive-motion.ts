const clamp = (value: number) => Math.max(0, Math.min(1, value))
const phase = (value: number, from: number, to: number) => {
  const progress = clamp((value - from) / (to - from))
  return progress * progress * (3 - 2 * progress)
}

const properties = ['--aa-rule', '--aa-image', '--aa-meta', '--aa-index']

export function mountAtmosphericArchive(root: HTMLElement): () => void {
  const owner = root.closest('.atmospheric-experience')!
  const spatial = owner.querySelector<HTMLElement>('.atmospheric-depth')!
  const rows = [...root.querySelectorAll<HTMLElement>('[data-archive-row]')]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0, disposed = false
  const request = () => { if (!disposed && !document.hidden && !frame) frame = requestAnimationFrame(update) }
  const stop = () => { cancelAnimationFrame(frame); frame = 0 }
  function update() {
    frame = 0
    if (disposed || document.hidden) return
    const viewport = innerHeight
    const staticMode = reduced.matches || spatial.dataset.static === 'true'
    // Finish the paper assembly before the native INDEX anchor settles.
    const expansion = staticMode ? 1 : phase(Number(spatial.dataset.resolution ?? 0), 0, .88)
    const mobile = innerWidth <= 700
    const contentWidth = Math.min(document.documentElement.clientWidth, 1880)
    const gutter = mobile ? 24 : Math.min(64, innerWidth * .04)
    const railWidth = mobile ? Math.min(126, contentWidth * .33) : Math.min(340, contentWidth * .26)
    const railX = (document.documentElement.clientWidth + contentWidth) / 2 - gutter - railWidth
    const heading = spatial.querySelector<HTMLElement>('.atmospheric-heading')
    const headingBottom = heading ? heading.offsetTop + heading.offsetHeight : 200
    const step = 44
    const railTop = Math.max(headingBottom + 40, viewport * .29)
    const active = Number(spatial.dataset.focus ?? 0)
    root.dataset.indexExpansion = String(expansion)
    root.dataset.indexView = String(expansion < .999)
    root.style.setProperty('--aa-expansion', String(expansion))
    root.style.setProperty('--aa-rail-width', `${railWidth}px`)
    spatial.dataset.indexExpansion = String(expansion)
    const header = root.querySelector<HTMLElement>('.atmospheric-archive-heading')!
    header.inert = expansion < .95
    const endSettle = phase(viewport * 1.18 - root.getBoundingClientRect().bottom, 0, viewport * .18)
    rows.forEach((row, index) => {
      const link = row.querySelector<HTMLAnchorElement>('a')!
      const rect = row.getBoundingClientRect()
      const gathered = phase(expansion, 0, 1)
      const x = (railX - rect.left) * (1 - gathered)
      const y = (railTop + index * step + (row.dataset.kind !== rows[0].dataset.kind ? 12 : 0) - rect.top) * (1 - gathered)
      link.style.setProperty('--aa-project-x', `${x}px`)
      link.style.setProperty('--aa-project-y', `${y}px`)
      row.dataset.current = String(active === index)
      if (active === index && expansion < .95) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
      link.setAttribute('aria-label', expansion < .999
        ? `${link.querySelector('.atmospheric-archive-title')?.getAttribute('aria-label')} — 작품으로 이동`
        : `${link.querySelector('.atmospheric-archive-title')?.getAttribute('aria-label')} — 기존 사이트에서 기록 보기`)
      const arrival = Math.max(endSettle, clamp((viewport * .99 - rect.top) / (viewport * .3 + rect.height * .35)))
      const progress = staticMode || (expansion >= .999 && row.contains(document.activeElement)) ? 1 : Math.min(arrival, expansion)
      // All thumbnails share the assembly clock, independent of their row height in the viewport.
      const values = [phase(progress, .06, .52), phase(expansion, .24, .85),
        phase(progress, .32, .90), phase(progress, .55, 1)]
      values.forEach((value, i) => row.style.setProperty(properties[i], value.toFixed(4)))
      row.dataset.formation = expansion < .001 ? 'project-index' : progress >= .999 ? 'settled' : 'forming'
      row.dataset.archiveProgress = String(progress)
      if (active === index) {
        spatial.dataset.indexX = String(rect.left + x + railWidth / 2)
        spatial.dataset.indexY = String(rect.top + y + step / 2)
      }
    })
  }
  const mutations = new MutationObserver(request)
  mutations.observe(spatial, { attributes: true, attributeFilter: ['data-progress', 'data-focus', 'data-resolution', 'data-static'] })
  const resize = new ResizeObserver(request)
  resize.observe(root); resize.observe(spatial); resize.observe(root.querySelector('.atmospheric-archive-inner')!)
  const visibility = () => { if (document.hidden) stop(); else request() }
  window.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', request, { passive: true })
  root.addEventListener('focusin', request); root.addEventListener('focusout', request)
  document.addEventListener('visibilitychange', visibility)
  reduced.addEventListener('change', request)
  update()
  return () => {
    disposed = true; stop(); resize.disconnect(); mutations.disconnect()
    window.removeEventListener('scroll', request); window.removeEventListener('resize', request)
    root.removeEventListener('focusin', request); root.removeEventListener('focusout', request)
    document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', request)
    root.querySelector<HTMLElement>('.atmospheric-archive-heading')!.inert = false
    rows.forEach(row => {
      properties.forEach(property => row.style.removeProperty(property))
      const link = row.querySelector<HTMLElement>('a')!
      link.style.removeProperty('--aa-project-x'); link.style.removeProperty('--aa-project-y')
    })
  }
}
