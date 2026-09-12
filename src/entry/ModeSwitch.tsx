import { counterpartPath, editionHref, type Edition } from './mode-routing.ts'

export function ModeSwitch({ mode, path }: { mode: Edition; path: string }) {
  const base = import.meta.env.BASE_URL.replace(/immersive\/$/, '')
  // Standalone navigation studies do not have an edition shell.
  if (typeof window === 'undefined' || !window.location.pathname.startsWith(`${base}immersive/`)) return null
  return <nav className="edition-switch" aria-label="사이트 모드">
    <a href={editionHref('classic', counterpartPath(path), base)} aria-current={mode === 'classic' ? 'true' : undefined}>CLASSIC</a>
    <span aria-hidden="true">/</span>
    <a href={editionHref('immersive', counterpartPath(path), base)} aria-current={mode === 'immersive' ? 'true' : undefined}>IMMERSIVE</a>
  </nav>
}
