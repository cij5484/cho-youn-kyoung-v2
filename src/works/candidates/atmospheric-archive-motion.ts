import { appRoute } from '../../album-detail/album-navigation.ts'
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
  const links = rows.map(row => row.querySelector<HTMLAnchorElement>('a')!)
  const titles = links.map(link => link.querySelector('.atmospheric-archive-title')?.getAttribute('aria-label'))
  const heading = spatial.querySelector<HTMLElement>('.atmospheric-heading')
  const header = root.querySelector<HTMLElement>('.atmospheric-archive-heading')!
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
    const headingBottom = heading ? heading.offsetTop + heading.offsetHeight : 200
    const step = 44
    const railTop = Math.max(headingBottom + 40, viewport * .29)
    const active = Number(spatial.dataset.focus ?? 0)
    if (root.dataset.indexExpansion !== String(expansion)) {
      root.dataset.indexExpansion = String(expansion)
      root.dataset.indexView = String(expansion < .999)
      root.style.setProperty('--aa-expansion', String(expansion))
      spatial.dataset.indexExpansion = String(expansion)
    }
    if (root.style.getPropertyValue('--aa-rail-width') !== `${railWidth}px`) root.style.setProperty('--aa-rail-width', `${railWidth}px`)
    if (header.inert !== (expansion < .95)) header.inert = expansion < .95
    // Expansion changes layout: apply it first, then measure every row before writing row styles.
    const rects = rows.map(row => row.getBoundingClientRect())
    const gathered = phase(expansion, 0, 1)
    // Every row reveals on the same assembly clock, including rows below the viewport.
    const progress = expansion
    const values = [phase(progress, .06, .52), phase(progress, .24, .85),
      phase(progress, .32, .90), phase(progress, .55, 1)]
    rows.forEach((row, index) => {
      const link = links[index], rect = rects[index]
      const x = (railX - rect.left) * (1 - gathered)
      const y = (railTop + index * step + (row.dataset.kind !== rows[0].dataset.kind ? 12 : 0) - rect.top) * (1 - gathered)
      if (link.style.getPropertyValue('--aa-project-x') !== `${x}px`) link.style.setProperty('--aa-project-x', `${x}px`)
      if (link.style.getPropertyValue('--aa-project-y') !== `${y}px`) link.style.setProperty('--aa-project-y', `${y}px`)
      if (row.dataset.current !== String(active === index)) row.dataset.current = String(active === index)
      const current = active === index && expansion < .95
      if (current && !link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'true')
      else if (!current && link.hasAttribute('aria-current')) link.removeAttribute('aria-current')
      const label = `${titles[index]} — ${expansion < .999 ? '작품으로 이동' : appRoute(link.href)?.startsWith('/album/') ? '앨범 전시 보기' : '기존 사이트에서 기록 보기'}`
      if (link.getAttribute('aria-label') !== label) link.setAttribute('aria-label', label)
      values.forEach((value, i) => {
        if (row.style.getPropertyValue(properties[i]) !== value.toFixed(4)) row.style.setProperty(properties[i], value.toFixed(4))
      })
      const formation = expansion < .001 ? 'project-index' : progress >= .999 ? 'settled' : 'forming'
      if (row.dataset.formation !== formation) row.dataset.formation = formation
      if (row.dataset.archiveProgress !== String(progress)) row.dataset.archiveProgress = String(progress)
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
    header.inert = false
    rows.forEach((row, index) => {
      properties.forEach(property => row.style.removeProperty(property))
      const link = links[index]
      link.style.removeProperty('--aa-project-x'); link.style.removeProperty('--aa-project-y')
    })
  }
}
