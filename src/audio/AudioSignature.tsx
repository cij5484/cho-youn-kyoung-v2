import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { signatureAudioHandoff, type SignatureAudioPair, type SignatureAudioPoint, type SignatureAudioSample } from '../signature/audio-handoff.ts'
import { twoPointContract } from '../signature/two-point-contract.ts'
import { createJangguOrbit, freePoint, project } from '../interaction-prototype/model.ts'
import { interactionTuning } from '../interaction-prototype/tuning.ts'
import { globalPlayback } from './global-playback.ts'

type DepthSample = SignatureAudioSample & { z?: number }
type DepthPair = Record<'haegeum' | 'janggu', SignatureAudioPoint & { z?: number }>

/** Persistent paint owner. Page owners keep computing the destinations while their paint is borrowed. */
export function AudioSignature() {
  const surface = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = surface.current!, candidate = canvas.getContext('2d')
    if (!candidate) return
    const context = candidate
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, previous = 0, phase = .7, width = 0, height = 0, dirty = true
    let points: SignatureAudioPair | null = null, mode: 'page' | 'enter' | 'docked' | 'return' | 'tail' = 'page'
    let modeSince = 0, settled = 0, seek: HTMLElement | null = null, box: DOMRect | null = null
    let player: HTMLElement | null = null, playerBox: DOMRect | null = null
    const histories: Record<'haegeum' | 'janggu', DepthSample[]> = { haegeum: [], janggu: [] }
    const depth = { haegeum: 0, janggu: 0 }, orbit = createJangguOrbit()
    let bowTime = .7
    let lastTargets: DepthPair | null = null
    const request = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint) }
    const invalidate = () => { dirty = true; request() }
    const sizing = new ResizeObserver(invalidate)
    sizing.observe(document.documentElement)
    function measure() {
      dirty = false
      const next = document.querySelector<HTMLElement>('[data-global-audio-progress]')
      if (next !== seek) { if (seek) sizing.unobserve(seek); seek = next; if (seek) sizing.observe(seek) }
      const nextPlayer = next?.closest<HTMLElement>('.album-mini-player') ?? null
      if (nextPlayer !== player) { if (player) sizing.unobserve(player); player = nextPlayer; if (player) sizing.observe(player) }
      if (seek) box = seek.getBoundingClientRect()
      playerBox = player?.getBoundingClientRect() ?? null
      if (width === innerWidth && height === innerHeight) return
      width = innerWidth; height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, width < 700 ? 1.25 : 1.5)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    function ambient(now: number): SignatureAudioPair {
      return {
        haegeum: { x: width * .14, y: height * .52 + Math.sin(phase) * 12, vx: 0, vy: Math.cos(phase) * 12, time: now },
        janggu: { x: width * .86, y: height * .6 + Math.sin(phase * .7) * 8, vx: 0, vy: Math.cos(phase * .7) * 5.6, time: now },
      }
    }
    function copy(pair: SignatureAudioPair) {
      points = { haegeum: { ...pair.haegeum }, janggu: { ...pair.janggu } }
      for (const id of twoPointContract.order) histories[id] = pair[id].trail?.map(sample => ({ ...sample })) ?? [{ x: pair[id].x, y: pair[id].y, time: pair[id].time }]
    }
    function playerTargets(now: number, dt: number): DepthPair {
      const signal = globalPlayback.sample(dt), bounds = box!
      const { phase: beatPhase, activity } = orbit.advance(dt, globalPlayback.snapshot().playing)
      bowTime += dt * (.22 + activity * .5 + signal.haegeum * 1.65 + signal.texture * .3)
      const cx = bounds.left + bounds.width / 2, cy = bounds.top + bounds.height / 2
      const frame = playerBox ?? bounds
      const halfWidth = Math.max(2, Math.min(bounds.width * .55, cx - frame.left - 8, frame.right - cx - 8))
      const halfHeight = Math.max(2, Math.min(cy - frame.top, frame.bottom - cy) - 8)
      const bow = freePoint(bowTime, 0), range = .42 + activity * .38 + signal.haegeum * .48
      // HOME's perspective and free bow path, recomposed around the progress bar's horizontal axis.
      // Keep independent musical phases: neither point follows playback percentage.
      const local = {
        haegeum: { x: .5 + (bow.x - .5) * range,
          y: .5 + (bow.y - .49) * (1.15 + signal.haegeum * .8) * (.2 + activity * .8),
          z: bow.z * (1 + signal.haegeum * .5) },
        janggu: { x: .5 + Math.sin(beatPhase) * (.15 + activity * .28),
          y: .5 + Math.cos(beatPhase * 3) * (.025 + activity * .10) - signal.janggu * .33,
          z: Math.sin(beatPhase * 3) * interactionTuning.janggu.depth * 2.8 },
      }
      const targets = {} as DepthPair
      for (const id of twoPointContract.order) {
        const projected = project(local[id], 1, 1)
        const vibration = id === 'haegeum' ? Math.sin(now * .029) * signal.texture * .08 : 0
        // Compress toward the actual player edges smoothly; preserve depth without leaving its frame.
        const x = cx + Math.tanh((projected.x - .5) * 2.4) * halfWidth
        const y = cy + Math.tanh((projected.y - .5) * 3 + vibration) * halfHeight
        // Actual projected target velocity includes musical changes and perspective, not just its phase.
        const prior = lastTargets?.[id], elapsed = prior ? (now - prior.time) / 1000 : 0
        targets[id] = { x, y, z: projected.z, time: now,
          vx: elapsed > 0 && elapsed < .1 ? (x - prior!.x) / elapsed : 0,
          vy: elapsed > 0 && elapsed < .1 ? (y - prior!.y) / elapsed : 0 }
      }
      lastTargets = targets
      return targets
    }
    function follow(point: SignatureAudioPoint, target: SignatureAudioPoint, dt: number, rate: number) {
      // Critically damped position + velocity: changing destination never overwrites outgoing state.
      const decay = Math.exp(-rate * dt)
      for (const [position, velocity] of [['x', 'vx'], ['y', 'vy']] as const) {
        const delta = point[position] - target[position], speed = point[velocity] - target[velocity]
        const step = (speed + rate * delta) * dt
        point[position] = target[position] + target[velocity] * dt + (delta + step) * decay
        point[velocity] = target[velocity] + (speed - rate * step) * decay
      }
    }
    function draw(now: number, append: boolean) {
      context!.clearRect(0, 0, width, height)
      context.save()
      if (mode === 'docked' && playerBox) {
        // Also contain old trail samples after a responsive resize. Entry/return retain their page handoff.
        context.beginPath(); context.rect(playerBox.left + 3, playerBox.top + 3, playerBox.width - 6, playerBox.height - 6); context.clip()
      }
      for (const id of twoPointContract.order) {
        const history = histories[id], point = points![id], identity = twoPointContract.points[id]
        if (append) history.push({ x: point.x, y: point.y, z: depth[id], time: now })
        while (history.length && (now - history[0].time > twoPointContract.moving.trailMs || history.length > 144)) history.shift()
        context!.strokeStyle = identity.color; context!.lineCap = 'round'
        for (const far of [true, false]) {
          // The far half of each orbit passes behind the progress track; its fill stays readable.
          context!.save()
          if (far && box) {
            context!.beginPath(); context!.rect(0, 0, width, height)
            context!.rect(box.left - 1, box.top + box.height / 2 - 5, box.width + 2, 10)
            context!.clip('evenodd')
          }
          for (let i = 1; i < history.length; i++) {
            const a = history[i - 1], b = history[i]
            if (((b.z ?? 0) < 0) !== far) continue
            const fresh = Math.max(0, 1 - (now - b.time) / twoPointContract.moving.trailMs)
            const near = Math.max(0, Math.min(1, (b.z ?? 0) + .5))
            context!.globalAlpha = fresh ** twoPointContract.moving.fadeExponent * twoPointContract.moving.opacity * (.5 + near * .5)
            context!.lineWidth = Math.max(.15, twoPointContract.moving.trailWidth * fresh * (.65 + near * .7))
            context!.beginPath(); context!.moveTo(a.x, a.y); context!.lineTo(b.x, b.y); context!.stroke()
          }
          context!.restore()
        }
      }
      context.restore()
    }
    function paint(now: number) {
      frame = 0
      if (document.hidden) { previous = 0; return }
      const dt = previous ? Math.min(.04, (now - previous) / 1000) : 1 / 60
      previous = now; phase += dt
      if (dirty || !seek?.isConnected) measure()
      const active = globalPlayback.snapshot().active, page = signatureAudioHandoff.getPagePair()
      if (active && box && (mode === 'page' || mode === 'tail' || mode === 'return')) {
        if (!points || mode === 'page') copy(signatureAudioHandoff.getPagePair(ambient(now))!)
        signatureAudioHandoff.setActive(true); mode = 'enter'; modeSince = now; settled = 0
      } else if (!active && (mode === 'enter' || mode === 'docked')) { mode = 'return'; modeSince = now; settled = 0 }
      canvas.dataset.phase = mode
      if (mode === 'page' || !points) { context.clearRect(0, 0, width, height); previous = 0; return }
      if (reduced.matches) {
        context.clearRect(0, 0, width, height)
        histories.haegeum.length = 0; histories.janggu.length = 0
        if (!active) { signatureAudioHandoff.setActive(false); mode = 'page'; points = null; return }
        for (const [index, id] of twoPointContract.order.entries()) {
          const x = box!.left + box!.width * (index ? .72 : .39), y = box!.top + box!.height / 2 + (index ? 13 : -13)
          points[id] = { x, y, vx: 0, vy: 0, time: now }
          context.fillStyle = twoPointContract.points[id].color; context.globalAlpha = .9; context.fillRect(x - 4, y - 1.8, 8, 3.6)
        }
        // Static mode redraws on media/layout events, never an ambient RAF.
        previous = 0; return
      }
      if (mode === 'tail') {
        draw(now, false)
        if (!histories.haegeum.length && !histories.janggu.length) { mode = 'page'; points = null; previous = 0; return }
      } else {
        const targets: DepthPair = mode === 'return' ? signatureAudioHandoff.getPagePair(ambient(now))! : playerTargets(now, dt)
        let distance = 0, velocityGap = 0
        for (const id of twoPointContract.order) {
          const point = points[id], target = targets[id]
          const rate = mode === 'docked' && id === 'janggu' ? 24 : id === 'haegeum' ? 10 : 11
          // Let the outgoing tangent carry the first part of a new flight before steering inward.
          const steering = mode === 'enter' || mode === 'return' ? Math.min(1, .04 + (now - modeSince) / 550) : 1
          follow(point, target, dt, rate * steering)
          depth[id] += ((target.z ?? 0) - depth[id]) * (1 - Math.exp(-8 * dt))
          distance += Math.hypot(point.x - target.x, point.y - target.y)
          velocityGap += Math.hypot(point.vx - target.vx, point.vy - target.vy)
        }
        if (mode === 'enter' && now - modeSince > 1400 && distance < 8) mode = 'docked'
        draw(now, true)
        if (mode === 'return') {
          settled = distance < 2 && velocityGap < 18 ? settled + 1 : 0
          if (settled > 5 || !page && now - modeSince > 2200) {
            signatureAudioHandoff.setActive(false); mode = 'tail'
          }
        }
      }
      request()
    }
    const unsubscribe = globalPlayback.subscribe(invalidate)
    const visibility = () => { previous = 0; if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else invalidate() }
    window.addEventListener('resize', invalidate); document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', invalidate)
    invalidate()
    return () => {
      cancelAnimationFrame(frame); sizing.disconnect(); unsubscribe(); signatureAudioHandoff.setActive(false)
      window.removeEventListener('resize', invalidate); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', invalidate)
      canvas.width = 0; canvas.height = 0
    }
  }, [])
  return createPortal(<canvas ref={surface} className="global-audio-signature" aria-hidden="true"/>, document.body)
}
