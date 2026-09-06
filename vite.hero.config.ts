import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command !== 'serve') throw new Error('Hero Lab is development-only; use dev:hero')
  return {
    root: fileURLToPath(new URL('./labs/hero', import.meta.url)), publicDir: false,
    server: { host: '127.0.0.1', port: 4177, strictPort: true,
      fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] },
      headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  }
})
