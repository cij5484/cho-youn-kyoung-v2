const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p) }

/** A little time at each year; the final scroll interval opens the complete score. */
export function timePathFrame(progress: number, count: number) {
  const cursor = clamp(progress / .84) * Math.max(0, count - 1)
  const segment = Math.min(Math.max(0, count - 2), Math.floor(cursor))
  const along = smooth((cursor - segment - .16) / .68)
  return { segment, along, active: Math.min(count - 1, segment + Number(along >= .5)), overview: smooth((progress - .86) / .12) }
}

export const timePathCheckpoint = (index: number, count: number) => .84 * clamp(index / Math.max(1, count - 1))

/** Responsive anchor/control geometry, following the reference's recalculated cubic paths. */
export function timePathGeometry(width: number, height: number, count: number, mobile: boolean) {
  const anchors = Array.from({ length: count }, (_, index) => {
    const p = index / Math.max(1, count - 1)
    return mobile
      ? { x: width * (index % 2 ? .76 : .24), y: height * (.12 + .76 * p) }
      : { x: width * (.07 + .86 * p), y: height * (.5 + Math.cos(index * Math.PI) * .24) }
  })
  const segments = anchors.slice(1).map((end, index) => {
    const start = anchors[index]
    const c1 = mobile ? { x: start.x, y: start.y + (end.y - start.y) * .62 } : { x: start.x + (end.x - start.x) * .5, y: start.y }
    const c2 = mobile ? { x: end.x, y: end.y - (end.y - start.y) * .62 } : { x: end.x - (end.x - start.x) * .5, y: end.y }
    return `M ${start.x} ${start.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`
  })
  return { anchors, segments, path: segments.map((segment, index) => index ? segment.slice(segment.indexOf('C')) : segment).join(' ') }
}
