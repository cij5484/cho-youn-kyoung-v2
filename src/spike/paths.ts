// Router links use logical paths; React Router adds its centrally configured basename.
export function routeHref(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`
}

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function logicalPath(pathname: string) {
  const base = import.meta.env.BASE_URL
  const path = base !== '/' && pathname.startsWith(base)
    ? `/${pathname.slice(base.length)}`
    : pathname
  return path.replace(/\/+$/, '') || '/'
}

export function canonicalCandidate(path: string) {
  return new URL(publicAsset(routeHref(path)), import.meta.env.VITE_SPIKE_ORIGIN).href
}
