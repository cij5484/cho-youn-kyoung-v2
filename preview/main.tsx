import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { InteractionLab } from '../labs/interaction/InteractionLab.tsx'
import '../labs/interaction/interaction.css'

// Deploy the existing development composition without changing its visual/runtime owners.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}><InteractionLab /></BrowserRouter>,
)
