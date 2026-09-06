import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command !== 'serve') throw new Error('Sound Lab is development-only; use dev:sound')
  return {
    root: fileURLToPath(new URL('./labs/sound', import.meta.url)), publicDir: false,
    server: { host: '127.0.0.1', port: 4179, strictPort: true,
      fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] },
      headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  }
})
