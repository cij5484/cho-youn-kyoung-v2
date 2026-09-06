import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { buildTargets } from '../../config/build.ts'
import { SoundLab } from './SoundLab.tsx'
const base=location.pathname.startsWith(buildTargets.pagesPreview.base) ? buildTargets.pagesPreview.base : '/'
createRoot(document.getElementById('root')!).render(<BrowserRouter basename={base}><SoundLab /></BrowserRouter>)
