import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { buildTargets } from '../../config/build.ts'
import { HeroLab } from './HeroLab.tsx'

const base = location.pathname.startsWith(buildTargets.pagesPreview.base) ? buildTargets.pagesPreview.base : '/'
createRoot(document.getElementById('root')!).render(<BrowserRouter basename={base}><HeroLab /></BrowserRouter>)
