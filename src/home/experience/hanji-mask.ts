const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }

/** Photo completion is deliberately earlier than the existing 07 exit at .955. */
export function artistExperienceFrame(sequenceProgress: number) {
  const p = clamp(sequenceProgress)
  return {
    reveal: smooth((p - .655) / .17),
    profile: smooth((p - .58) / .105),
    viewing: p >= .825 && p <= .955,
    seam: 1 - smooth((p - .635) / .02),
  }
}

function random(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + 83.17) * 43758.5453
  return value - Math.floor(value)
}
function noise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = smooth(x - ix), fy = smooth(y - iy)
  const a = random(ix, iy), b = random(ix + 1, iy), c = random(ix, iy + 1), d = random(ix + 1, iy + 1)
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy
}

export interface HanjiField { width: number; height: number; arrival: Float32Array }

/**
 * Immutable wet-arrival field, never a fluid simulation or a displacement of either photograph.
 * Bent capillary paths enter from the outgoing stage edge; staggered feeders join a broad front.
 * Anisotropic paper fibres and two noise scales roughen that front rather than growing circle cutouts.
 */
export function createHanjiField(width = 192, height = 288): HanjiField {
  const arrival = new Float32Array(width * height)
  let low = Infinity, high = -Infinity
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const u = x / Math.max(1, width - 1), v = y / Math.max(1, height - 1)
    const warp = (noise(u * 3.7, v * 4.8) - .5) * .19
    const fibre = (noise(u * 37, v * 8.5) - .5) * .065
      + (noise(u * 81, v * 23) - .5) * .025
    const bentY = v + .075 * Math.sin(u * 11.5) + warp
    const upper = .19 + Math.abs(bentY - .29) * .76 + (1 - u) * .61
    const centre = Math.abs(bentY - .59) * .83 + (1 - u) * .71
    const lower = .11 + Math.abs(bentY - .77) * .72 + (1 - u) * .54
    const value = Math.min(upper, centre, lower) + warp + fibre
    arrival[y * width + x] = value
    low = Math.min(low, value); high = Math.max(high, value)
  }
  const extent = Math.max(.0001, high - low)
  for (let i = 0; i < arrival.length; i++) arrival[i] = clamp((arrival[i] - low) / extent)
  return { width, height, arrival }
}

/** Exact endpoints are explicit; no residual dry specks or pointer perturbation can survive them. */
export function hanjiAlpha(arrival: number, progress: number) {
  if (progress <= 0) return 0
  if (progress >= 1) return 255
  return Math.round(smooth((progress - arrival) / .018 + .5) * 255)
}

export function paintHanjiMask(field: HanjiField, progress: number, rgba: Uint8ClampedArray) {
  for (let i = 0; i < field.arrival.length; i++) {
    const offset = i * 4
    rgba[offset] = rgba[offset + 1] = rgba[offset + 2] = 255
    rgba[offset + 3] = hanjiAlpha(field.arrival[i], progress)
  }
}
