import { createReadStream } from 'node:fs'
import { readFile, realpath, stat } from 'node:fs/promises'
import { createServer, type Server } from 'node:http'
import { extname, isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const parentOrigins = ['http://127.0.0.1:4180', 'http://localhost:4180']
const assetOrigins = [...parentOrigins, 'http://127.0.0.1:4181', 'http://localhost:4181']
const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
}

export const classicBridge = (parentOrigins: readonly string[]) => String.raw`(() => {
  let parentOrigin;
  try { parentOrigin = new URL(document.referrer).origin; } catch { return; }
  if (window.parent === window || !${JSON.stringify(parentOrigins)}.includes(parentOrigin)) return;
  const replace = history.replaceState.bind(history);
  const validPath = value => typeof value === 'string' && value.length <= 4096 &&
    value.startsWith('/') && !value.startsWith('//') && !/[\\\u0000-\u001f]/.test(value);
  const currentPath = () => location.hash.slice(1) || '/';
  const send = (type, extra = {}) => parent.postMessage({ type, path: currentPath(), ...extra }, parentOrigin);
  for (const method of ['pushState', 'replaceState']) {
    history[method] = (state, unused, url) => {
      replace(state, unused, url);
      send('classic-route', { replace: method === 'replaceState' });
    };
  }
  addEventListener('message', event => {
    if (event.origin !== parentOrigin || event.source !== parent ||
      event.data?.type !== 'classic-navigate' || !validPath(event.data.path)) return;
    if (event.data.path === currentPath()) return;
    replace(history.state, '', '#' + event.data.path);
    dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  addEventListener('hashchange', () => send('classic-route', { replace: true }));
  send('classic-route', { replace: true });
  let sawLoading = false;
  let finished = false;
  let timeout;
  const finish = timedOut => {
    if (finished) return;
    finished = true;
    observer.disconnect();
    clearTimeout(timeout);
    send('classic-ready', { timedOut });
  };
  const check = () => {
    const loading = Boolean(document.querySelector('.initial-load-screen'));
    sawLoading ||= loading;
    if (sawLoading && !loading) finish(false);
  };
  const observer = new MutationObserver(check);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  timeout = setTimeout(() => finish(true), 15000);
  addEventListener('pagehide', () => { observer.disconnect(); clearTimeout(timeout); }, { once: true });
  check();
})();`

export function entryClassicServer(): Plugin {
  let server: Server | undefined
  const close = () => {
    server?.close()
    server?.closeAllConnections()
    server = undefined
  }

  return {
    name: 'entry-classic-server',
    apply: 'serve',
    async configureServer(vite) {
      const directory = fileURLToPath(new URL('../.cache/entry-classic/', import.meta.url))
      let root: string
      try {
        root = await realpath(directory)
        if (!(await stat(resolve(root, 'index.html'))).isFile()) throw new Error('Missing index.html')
      } catch {
        throw new Error('Classic preview build is missing. Build the separate Classic output into .cache/entry-classic before starting ENTRY.')
      }
      server = createServer(async (request, response) => {
        const fail = (status: number, message: string) => {
          response.removeHeader('Content-Length')
          response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' })
          response.end(request.method === 'HEAD' ? undefined : message)
        }
        response.setHeader('X-Robots-Tag', 'noindex, nofollow')
        response.setHeader('Cache-Control', 'no-store')
        response.setHeader('Vary', 'Origin')
        const origin = request.headers.origin
        if (origin && !assetOrigins.includes(origin)) return fail(403, 'Origin not allowed')
        if (origin) response.setHeader('Access-Control-Allow-Origin', origin)
        response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        if (request.method === 'OPTIONS') {
          response.writeHead(204)
          response.end()
          return
        }
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          response.setHeader('Allow', 'GET, HEAD, OPTIONS')
          return fail(405, 'Method not allowed')
        }
        try {
          const pathname = decodeURIComponent((request.url ?? '/').split('?')[0])
          if (!pathname.startsWith('/') || pathname.startsWith('//') || /[\\:]/.test(pathname) || pathname.includes('\0') ||
            pathname.split('/').includes('..')) return fail(400, 'Invalid path')
          let file = resolve(root, `.${pathname}`)
          if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
          file = await realpath(file)
          const within = relative(root, file)
          if (isAbsolute(within) || within === '..' || within.startsWith(`..${sep}`)) return fail(403, 'Path outside Classic build')
          const info = await stat(file)
          if (!info.isFile()) return fail(404, 'Not found')
          response.setHeader('Content-Type', mimeTypes[extname(file).toLowerCase()] ?? 'application/octet-stream')
          if (extname(file).toLowerCase() === '.html') {
            const html = await readFile(file, 'utf8')
            response.end(request.method === 'HEAD' ? undefined : html.replace('</head>', `<script>${classicBridge(parentOrigins)}</script></head>`))
            return
          }
          response.setHeader('Content-Length', info.size)
          if (request.method === 'HEAD') return response.end()
          const stream = createReadStream(file)
          stream.once('error', () => {
            if (response.headersSent) response.destroy()
            else fail(500, 'Unable to read Classic asset')
          })
          response.once('close', () => stream.destroy())
          stream.pipe(response)
        } catch (error) {
          fail(error instanceof URIError ? 400 : 404, error instanceof URIError ? 'Invalid path encoding' : 'Not found')
        }
      })
      const currentServer = server
      try {
        await new Promise<void>((accept, reject) => {
          currentServer.once('error', reject)
          currentServer.listen(4181, '127.0.0.1', () => {
            currentServer.removeListener('error', reject)
            accept()
          })
        })
      } catch (error) {
        close()
        if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
          throw new Error('Classic preview port 4181 is already in use. Close its current owner and restart ENTRY.', { cause: error })
        }
        throw error
      }
      vite.httpServer?.once('close', close)
      vite.config.logger.info('Classic preview: http://127.0.0.1:4181/')
    },
    closeBundle: close,
  }
}
