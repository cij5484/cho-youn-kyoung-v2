import type { SignaturePointId } from './two-point-contract.ts'

export type SignatureAudioSample = { x: number; y: number; time: number }
/** Screen CSS pixels; velocity is pixels/second; time uses performance.now(). */
export type SignatureAudioPoint = SignatureAudioSample & { vx: number; vy: number; trail?: readonly SignatureAudioSample[] }
export type SignatureAudioPair = Record<SignaturePointId, SignatureAudioPoint>

const pages = new Map<string, Partial<SignatureAudioPair>>()
const listeners = new Set<() => void>()
let active = false

/** Producers keep their page clocks running while the persistent overlay borrows their paint. */
export const signatureAudioHandoff = {
  publish(owner: string, id: SignaturePointId, point: SignatureAudioPoint) {
    if (![point.x, point.y, point.vx, point.vy, point.time].every(Number.isFinite)) return
    const pair = pages.get(owner) ?? {}
    pair[id] = point; pages.set(owner, pair)
  },
  remove(owner: string, id?: SignaturePointId) {
    if (id) { const pair = pages.get(owner); if (pair) delete pair[id] }
    else pages.delete(owner)
  },
  getPagePair(fallback?: SignatureAudioPair): SignatureAudioPair | null {
    const pair: Partial<SignatureAudioPair> = {}
    for (const current of pages.values()) for (const id of ['haegeum', 'janggu'] as const) {
      const point = current[id]
      if (point && (!pair[id] || point.time >= pair[id]!.time)) pair[id] = point
    }
    pair.haegeum ??= fallback?.haegeum; pair.janggu ??= fallback?.janggu
    return pair.haegeum && pair.janggu ? pair as SignatureAudioPair : null
  },
  isActive: () => active,
  setActive(value: boolean) {
    if (active === value) return
    active = value; listeners.forEach(listener => listener())
  },
  subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener) } },
}
