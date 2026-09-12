/** Cylindrical coordinates and radial card orientation from the CSS3D helix model. */
export function portraitHelix(index: number, count: number, width: number, height: number, turn = 0) {
  const theta = index / Math.max(1, count - 1) * Math.PI * 3 + turn
  const radius = Math.min(width * .29, height * .34)
  return { x: Math.sin(theta) * radius, y: (index / Math.max(1, count - 1) - .5) * height * (width < 700 ? .64 : .46),
    z: Math.cos(theta) * radius, rotationY: ((theta * 180 / Math.PI + 180) % 360) - 180 }
}

/** Settled coordinates depend on viewport and identity, never scroll. */
export function portraitStrip(index: number, count: number, width: number, height: number, aspect: number) {
  const slot = height * .76 / Math.max(1, count)
  return { x: width * .37, y: -height * .38 + slot * (index + .5), z: 0,
    rotationY: 0, rotationX: 0, scale: Math.min(slot * .85 * aspect / 200, width * .19 / 200) }
}
