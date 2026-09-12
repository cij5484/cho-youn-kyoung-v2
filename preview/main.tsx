import { createRoot } from 'react-dom/client'
import EditionApp from '../src/entry/EditionApp.tsx'
import '../labs/interaction/interaction.css'

createRoot(document.getElementById('root')!).render(<EditionApp/>)
