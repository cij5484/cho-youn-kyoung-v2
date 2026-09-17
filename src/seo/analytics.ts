import { productionSite } from '../../config/public-site.ts'

const measurementId = 'G-BTYPR6K7NY'

export function initializeAnalytics(production: boolean) {
  if (!production || location.origin !== productionSite.origin || window.self !== window.top) return
  if (document.getElementById('site-ga4')) return

  const analyticsWindow = window as Window & { dataLayer?: unknown[] }
  analyticsWindow.dataLayer ??= []
  function gtag(...args: unknown[]) {
    // Google tag consumes Arguments objects, not arrays.
    if (!args.length) return
    // eslint-disable-next-line prefer-rest-params
    analyticsWindow.dataLayer!.push(arguments)
  }
  gtag('js', new Date())
  // This stream has Enhanced Measurement history page views enabled.
  // It owns initial + SPA page_view events; do not also send manual events.
  gtag('config', measurementId)
  const script = document.createElement('script')
  script.id = 'site-ga4'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.append(script)
}
