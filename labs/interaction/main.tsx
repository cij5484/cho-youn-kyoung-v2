import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { InteractionLab } from './InteractionLab.tsx'
createRoot(document.getElementById('root')!).render(<BrowserRouter><InteractionLab /></BrowserRouter>)
