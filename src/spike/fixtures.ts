export interface SpikeRoute {
  id: string
  path: string
  pattern: string
  name: string
  lang: 'ko' | 'en'
}

// Disposable fixtures, not album/performance content or a complete locale catalog.
export const spikeRoutes: SpikeRoute[] = [
  { id: 'ko-home', path: '/', pattern: '/', name: 'HOME', lang: 'ko' },
  { id: 'ko-works', path: '/works', pattern: '/works', name: 'WORKS', lang: 'ko' },
  { id: 'ko-albums', path: '/albums', pattern: '/albums', name: 'ALBUMS', lang: 'ko' },
  { id: 'ko-performances', path: '/performances', pattern: '/performances', name: 'PERFORMANCES', lang: 'ko' },
  { id: 'ko-album', path: '/album/test-album', pattern: '/album/:id', name: 'ALBUM TEST', lang: 'ko' },
  { id: 'ko-performance', path: '/performance/test-performance', pattern: '/performance/:id', name: 'PERFORMANCE TEST', lang: 'ko' },
  { id: 'ko-media', path: '/media', pattern: '/media', name: 'MEDIA', lang: 'ko' },
  { id: 'ko-about', path: '/about', pattern: '/about', name: 'ABOUT', lang: 'ko' },
  { id: 'ko-contact', path: '/contact', pattern: '/contact', name: 'CONTACT', lang: 'ko' },
  { id: 'en-home', path: '/en', pattern: '/en', name: 'HOME', lang: 'en' },
  { id: 'en-works', path: '/en/works', pattern: '/en/works', name: 'WORKS', lang: 'en' },
  { id: 'en-album', path: '/en/album/test-album', pattern: '/en/album/:id', name: 'ALBUM TEST', lang: 'en' },
  { id: 'en-performance', path: '/en/performance/test-performance', pattern: '/en/performance/:id', name: 'PERFORMANCE TEST', lang: 'en' },
]

export function findSpikeRoute(pathname: string) {
  return spikeRoutes.find(({ path }) => path === (pathname.replace(/\/+$/, '') || '/'))
}
