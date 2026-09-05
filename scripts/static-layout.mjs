// Deterministic path mapping over official output, independent of OS or route depth.
export function staticLayout(files, { base, publicFiles, routePaths }) {
  const prefix = base.slice(1)
  const mapping = new Map()
  for (const source of [...files].sort()) {
    if (source.includes('\\') || source.includes(':') || source.split('/').some((part) => !part || part === '..')) {
      throw new Error(`Unsafe artifact path: ${source}`)
    }
    if (source.startsWith('.vite/') || source.endsWith('.gitkeep')) continue
    if (source.endsWith('.map')) throw new Error(`Unexpected public source map: ${source}`)
    // Preserve raw fallback in client/ only. It is not part of this static-host contract.
    if (source === '__spa-fallback.html' || (prefix && source === 'index.html')) continue
    let destination = source
    if (prefix) {
      if (source.startsWith(prefix)) destination = source.slice(prefix.length)
      else if (!source.startsWith('assets/') && !publicFiles.has(source)) {
        throw new Error(`Unrecognized React Router subpath output: ${source}`)
      }
    }
    if (destination === 'build-info.json' || mapping.has(destination)) {
      throw new Error(`Static artifact collision: ${destination}`)
    }
    mapping.set(destination, source)
  }
  for (const path of routePaths) {
    const htmlPath = `${path === '/' ? '' : `${path.slice(1)}/`}index.html`
    if (!mapping.has(htmlPath)) throw new Error(`Missing prerender output: ${htmlPath}`)
  }
  return mapping
}
