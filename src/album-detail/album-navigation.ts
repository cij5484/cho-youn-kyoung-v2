import { isPerformanceStudyRoute } from '../performance-detail/performance-navigation.ts'

/** The approved exhibition is also published by the development-preview build. */
export const localAlbumStudy = () => (import.meta.env.MODE === 'development-preview' || import.meta.env.MODE === 'public-site') || typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)

export function albumStudyHref(record: { id: string; type: string; referenceUrl: string }) {
  if (record.type === 'performance' && isPerformanceStudyRoute(`/performance/${record.id.slice(12)}`)) return appHref(`/performance/${record.id.slice(12)}/`)
  return localAlbumStudy() && record.type === 'album' ? appHref(`/album/${record.id.slice(6)}/`) : record.referenceUrl
}

export const isLocalDetailRoute = (route: string | null) => Boolean(route?.startsWith('/album/')
  || isPerformanceStudyRoute(route))

/** A URL commit alone does not mean the old detail DOM has been replaced. */
export function detailDestinationMatches(requested: string, current: string | null, owner: string | undefined) {
  const path = (value: string | null | undefined) => value?.split(/[?#]/)[0].replace(/\/$/, '')
  return path(requested) === path(current) && path(requested) === path(owner)
}

export function requestAlbumEntry(href: string, src: string, bounds: { x: number; y: number; width: number; height: number }) {
  return !window.dispatchEvent(new CustomEvent('album-entry', { cancelable: true, detail: { href, src, bounds } }))
}

export const appHref = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** Native URLs include the Pages base; React Router destinations do not. */
export function appRoute(href: string) {
  const url = new URL(href, location.href), base = import.meta.env.BASE_URL
  return url.origin === location.origin && url.pathname.startsWith(base)
    ? `/${url.pathname.slice(base.length)}${url.search}${url.hash}` : null
}
