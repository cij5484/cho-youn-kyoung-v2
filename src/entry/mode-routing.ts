export type Edition = 'classic' | 'immersive'

/** Entry shell. The two applications retain their own routers and assets. */
export function editionRoute(pathname: string, base = '/') {
  pathname = `/${pathname.slice(base.length)}`
  const match = pathname.match(/^\/(classic|immersive)(\/.*)?$/)
  if (match) return { mode: match[1] as Edition, path: match[2] || '/' }
  return { mode: pathname === '/' ? null : 'immersive' as Edition, path: pathname }
}

export const editionHref = (mode: Edition, path = '/', base = '/') => `${base}${mode}${path.startsWith('/') ? path : `/${path}`}`

// Detail slugs are shared by the authored catalogs. Unknown/local tool paths return home.
export function counterpartPath(path: string) {
  return /^\/(?:works|about|media|contact)(?:\/|$)|^\/(?:album|performance)\/[a-z0-9-]+\/?$/.test(path) ? path : '/'
}
