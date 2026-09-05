import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, relative, resolve, sep } from 'node:path'
import { getBuildTarget } from '../config/build.ts'

// Test server, not production routing: directory indexes + redirects, NO SPA fallback.
const target = getBuildTarget(process.argv[2])
const root = resolve(target.directory, 'static')
await stat(resolve(root, 'index.html'))
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.data': 'text/x-script',
}
const server = createServer(async (request, response) => {
  const fail = (status) => {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(`${status} ${status === 404 ? 'Not Found' : 'Bad Request'}`)
  }
  try {
    const url = new URL(request.url ?? '/', 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    if (target.base !== '/' && pathname === target.base.slice(0, -1)) {
      response.writeHead(301, { Location: `${target.base}${url.search}` })
      response.end()
      return
    }
    if (!pathname.startsWith(target.base)) return fail(404)
    let file = resolve(root, pathname.slice(target.base.length))
    const within = relative(root, file)
    if (within === '..' || within.startsWith(`..${sep}`) || within.includes(':')) return fail(400)
    const info = await stat(file)
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` })
        response.end()
        return
      }
      file = resolve(file, 'index.html')
    }
    const content = await readFile(file)
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream' })
    response.end(request.method === 'HEAD' ? undefined : content)
  } catch (error) {
    fail(error instanceof URIError ? 400 : 404)
  }
})
server.listen(target.previewPort, '127.0.0.1', () => {
  console.log(`Strict static spike: http://127.0.0.1:${target.previewPort}${target.base}`)
})
