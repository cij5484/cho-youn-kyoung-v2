import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command !== 'serve') throw new Error('Haegeum Lab is development-only; use dev:haegeum')
  return {
    root: fileURLToPath(new URL('./labs/haegeum', import.meta.url)), publicDir: false,
    server: { host: '127.0.0.1', port: 4178, strictPort: true,
      fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] },
      headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  }
})
