import { readFileSync } from 'node:fs'
import type { ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

/** Test-only real HTTP faults: Windows Media Foundation can bypass Playwright page.route(). */
export function audioFaultServer(): Plugin {
  const bytes = readFileSync(new URL('../../src/sound/assets/hanbeomsu-jungjungmori-preview.m4a', import.meta.url))
  const pending = new Map<string, Set<ServerResponse>>(), released = new Set<string>()
  const send = (response: ServerResponse) => { if (!response.destroyed) { response.setHeader('Content-Type','audio/mp4'); response.setHeader('Content-Length',bytes.length); response.end(bytes) } }
  return { name: 'test-only-native-media-faults', configureServer(server) {
    server.middlewares.use((request,response,next) => {
      const match = /^\/__test-audio\/(error|hold|release)\/([\w-]+)(?:\.m4a)?$/.exec(request.url ?? '')
      if (!match) return next()
      response.setHeader('Cache-Control','no-store')
      const [,mode,id] = match
      if (mode === 'release') { released.add(id); pending.get(id)?.forEach(send); pending.delete(id); response.end('released'); return }
      if (mode === 'error') { response.statusCode=404; response.end('Missing test media'); return }
      if (released.has(id)) { send(response); return }
      const waiting = pending.get(id) ?? new Set(); waiting.add(response); pending.set(id,waiting)
      response.on('close',()=>{waiting.delete(response); if(!waiting.size)pending.delete(id)})
    })
    server.httpServer?.on('close',()=>{pending.clear();released.clear()})
  } }
}
