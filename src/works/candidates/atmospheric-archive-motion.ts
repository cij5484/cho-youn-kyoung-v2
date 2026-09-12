import { appRoute } from '../../album-detail/album-navigation.ts'

/** The existing final archive keeps its layout; the helix owner handles its entrance. */
export function mountAtmosphericArchive(root: HTMLElement): () => void {
  const records = root.querySelector<HTMLElement>('.atmospheric-archive-records')!
  const preview = root.querySelector<HTMLElement>('.atmospheric-archive-preview')
  const desktop = matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)')
  root.dataset.indexExpansion = '1'; root.dataset.indexView = 'false'
  root.style.setProperty('--aa-expansion','1')
  const update = () => {
    records.inert = !!preview && desktop.matches
    if (preview) preview.inert = !desktop.matches
  }
  root.querySelectorAll<HTMLAnchorElement>('.atmospheric-archive-link').forEach(link => {
    const title = link.querySelector('.atmospheric-archive-title')?.getAttribute('aria-label')
    link.setAttribute('aria-label', `${title} — ${appRoute(link.href)?.startsWith('/performance/') ? '공연 기록 보기' : '앨범 전시 보기'}`)
  })
  desktop.addEventListener('change',update); update()
  return () => { desktop.removeEventListener('change',update); records.inert=false; if(preview) preview.inert=false }
}
