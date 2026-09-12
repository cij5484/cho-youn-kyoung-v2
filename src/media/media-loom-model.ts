const smooth = (from: number, to: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - from) / (to - from)))
  return t * t * (3 - 2 * t)
}

export function mediaFilmScrollState(progress: number, count: number) {
  const position = Math.max(0, Math.min(1, progress)) * Math.max(0, count - 1)
  const from = Math.min(Math.floor(position), Math.max(0, count - 2))
  const to = Math.min(from + 1, count - 1)
  const value = smooth(.18, .82, position - from)
  return { from, to, value, index: value < .5 ? from : to, mix: smooth(.2, .8, value) }
}

export function mediaLoomState(progress: number) {
  const p = Math.max(0, Math.min(1, progress))
  const tear = smooth(.10, .43, p) * (1 - smooth(.58, .92, p))
  return { progress: p, tear, scale: 1 + smooth(.55, .94, p) * .08,
    phase: p >= .92 ? 'reformed' : tear > .01 ? 'unwoven' : 'woven' }
}

export function mediaLoomFrame(width: number, height: number, aspect: number) {
  const ratio = Number.isFinite(aspect) && aspect > 0 ? aspect : 16 / 9
  const frameWidth = Math.max(1, Math.min(1000, width * .82, height * .64 * ratio))
  return { width: frameWidth, height: frameWidth / ratio }
}

// Ribbons do not share vertices: neighbouring rows must be able to separate.
export function mediaLoomGeometry(threads = 26, segments = 24) {
  const position: number[] = [], uv: number[] = [], rim: number[] = [], thread: number[] = [], index: number[] = []
  for (let row = 0; row < threads; row++) {
    const offset = position.length / 3
    for (let edge = 0; edge < 2; edge++) {
      for (let column = 0; column <= segments; column++) {
        const u = column / segments, v = (row + edge) / threads
        position.push(u - .5, v - .5, 0)
        uv.push(u, v)
        rim.push(edge * 2 - 1)
        thread.push(row)
      }
    }
    for (let column = 0; column < segments; column++) {
      const a = offset + column, b = a + segments + 1
      index.push(a, a + 1, b, a + 1, b + 1, b)
    }
  }
  return { position, uv, rim, thread, index }
}
