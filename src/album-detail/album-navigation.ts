/** This exhibition is a local design study, independent of public content publication. */
export const localAlbumStudy = () => typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)

export function albumStudyHref(record: { id: string; type: string; referenceUrl: string }) {
  return localAlbumStudy() && record.type === 'album' ? `/album/${record.id.slice(6)}/` : record.referenceUrl
}

export function requestAlbumEntry(href: string, src: string, bounds: { x: number; y: number; width: number; height: number }) {
  return !window.dispatchEvent(new CustomEvent('album-entry', { cancelable: true, detail: { href, src, bounds } }))
}
