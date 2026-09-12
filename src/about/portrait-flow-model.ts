/** Cylindrical coordinates and radial card orientation from the CSS3D helix model. */
export function portraitHelix(index: number, count: number, width: number, height: number, turn = 0) {
  const theta = index / Math.max(1, count - 1) * Math.PI * 3 + turn
  const radius = Math.min(width * .29, height * .34)
  return { x: Math.sin(theta) * radius, y: (index / Math.max(1, count - 1) - .5) * height * (width < 700 ? .64 : .46),
    z: Math.cos(theta) * radius, rotationY: ((theta * 180 / Math.PI + 180) % 360) - 180 }
}

/** Two continuous ribbons wind through the same cylinder as the portraits. */
export function portraitSignature(time: number, instrument: number, width: number, height: number, turn = 0) {
  const phase = time * (instrument ? .94 : 1.2) + instrument * Math.PI
  const position = .5 + .43 * Math.sin(phase * .57)
  return portraitHelix(position, 2, width, height, turn + phase - position * Math.PI * 3)
}

/** Settled coordinates depend on viewport and identity, never scroll. */
export function portraitStrip(index: number, count: number, width: number, height: number, aspect: number) {
  const slot = height * .76 / Math.max(1, count)
  return { x: width * .37, y: -height * .38 + slot * (index + .5), z: 0,
    rotationY: 0, rotationX: 0, scale: Math.min(slot * .85 * aspect / 200, width * .19 / 200) }
}
