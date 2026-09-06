import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// A separate development entry: never registered with the production router or prerender catalog.
export default defineConfig(({ command }) => {
  if (command !== 'serve') throw new Error('P2A Design System Lab is development-only; use dev:design-system')
  return {
    root: fileURLToPath(new URL('./labs/design-system', import.meta.url)),
    publicDir: false,
    server: {
      host: '127.0.0.1', port: 4175, strictPort: true,
      fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] },
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    },
  }
})
