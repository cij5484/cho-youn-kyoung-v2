// Spike targets only. These example origins do not configure a domain or deployment.
export const buildTargets = {
  root: {
    base: '/',
    directory: 'build-root',
    canonicalOrigin: 'https://site.example.invalid',
    previewPort: 4173,
  },
  pagesPreview: {
    base: '/cho-youn-kyoung-v2/',
    directory: 'build-pages-preview',
    canonicalOrigin: 'https://pages.example.invalid',
    previewPort: 4174,
  },
} as const

export type BuildTargetName = keyof typeof buildTargets

export function getBuildTarget(name = 'root') {
  if (name !== 'root' && name !== 'pagesPreview') {
    throw new Error(`Unknown build target: ${name}`)
  }
  return buildTargets[name]
}
