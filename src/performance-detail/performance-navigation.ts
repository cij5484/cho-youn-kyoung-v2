/** Approved for the development preview; production routing remains separate. */
export const performanceStudySlug = 'haegeum-jeongak-2026-09-22'
export const performanceStudySlugs = [performanceStudySlug, 'sanjo-gil-2026-08-16', 'haegeum-2026-08-02'] as const
export const localPerformanceStudy = () => import.meta.env.MODE === 'development-preview' || import.meta.env.DEV && typeof window !== 'undefined'
  && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
export const isPerformanceStudyRoute = (route: string | null) => localPerformanceStudy()
  && performanceStudySlugs.some(slug => route?.replace(/\/$/, '') === `/performance/${slug}`)
