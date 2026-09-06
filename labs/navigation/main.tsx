import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { buildTargets } from '../../config/build.ts'
import { NavigationLab } from './NavigationLab.tsx'

// Both existing base contracts can be exercised without registering a production route.
const base = window.location.pathname.startsWith(buildTargets.pagesPreview.base) ? buildTargets.pagesPreview.base : buildTargets.root.base
createRoot(document.getElementById('root')!).render(<BrowserRouter basename={base}><NavigationLab /></BrowserRouter>)
