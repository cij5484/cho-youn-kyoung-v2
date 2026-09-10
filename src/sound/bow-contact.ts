import { contactTuning, createContactMotion, type ContactActivity, type ContactTrail, type ContactViolet, type SoundVisual } from './contact-motion.ts'
import { tuningPresets, type BowPresetName } from './tuning-presets.ts'
import { trailEdge, trailNormal } from '../motion/trail-geometry.ts'
import { signatureAudioHandoff, type SignatureAudioSample } from '../signature/audio-handoff.ts'

export function createBowContact(root: HTMLElement, holders: HTMLElement[], mobile: () => boolean) {
  const diagnostics = new URLSearchParams(window.location.search).get('diagnostics') === '1'
  const ns = 'http://www.w3.org/2000/svg', motion = createContactMotion()
  let visual: SoundVisual = 'line-only', trail: ContactTrail = 'long', activity: ContactActivity = 'bold'
  let preset: BowPresetName = 'HOME_SIGNATURE'
  let svg: SVGSVGElement | null = null, head: SVGEllipseElement | null = null, bands: SVGPathElement[] = []
  // Fixed allocation; chronological path history, not a set of particle/echo elements.
  const capacity = contactTuning.desktop.historySamples, xs = new Float64Array(capacity), ys = new Float64Array(capacity), times = new Float64Array(capacity)
  let cursor = 0, count = 0, clock = 0, lastX = 0, lastY = 0, angle = 90
  let audioPosition: SignatureAudioSample | undefined
  const staticMarker = root.querySelector<HTMLElement>('.sound-static-contact')
  function publishStatic() {
    const bounds = staticMarker?.getBoundingClientRect()
    if (visual === 'bow-contact' && !document.hidden && bounds && bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0 && bounds.top < innerHeight && bounds.right > 0 && bounds.left < innerWidth) {
      signatureAudioHandoff.publish('home-contact-static', 'haegeum', { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2, vx: 0, vy: 0, time: performance.now() })
    } else signatureAudioHandoff.remove('home-contact-static')
  }
  function audioOwnership() {
    if (svg) svg.style.visibility = signatureAudioHandoff.isActive() ? 'hidden' : ''
    if (staticMarker) staticMarker.style.visibility = signatureAudioHandoff.isActive() ? 'hidden' : ''
    if (!signatureAudioHandoff.isActive()) { count = 0; bands.forEach(path => path.setAttribute('d', '')); if (head) head.style.opacity = '0' }
    publishStatic()
  }
  const unsubscribeAudio = signatureAudioHandoff.subscribe(audioOwnership)
  const staticState = new MutationObserver(publishStatic)
  staticState.observe(root, { attributes: true, attributeFilter: ['data-sound-static', 'data-sound-ready'] })
  window.addEventListener('scroll', publishStatic, { passive: true }); window.addEventListener('resize', publishStatic)
  document.addEventListener('visibilitychange', publishStatic)
  function hide() { signatureAudioHandoff.remove('home-contact'); audioPosition = undefined; motion.hide(); count = 0; if (svg) svg.style.opacity = '0'; publishStatic() }
  function configure(next: SoundVisual, length: ContactTrail, intensity: ContactActivity, violet: ContactViolet, profile: BowPresetName) {
    preset = profile; root.dataset.bowPreset = profile
    trail = length; activity = intensity; visual = next
    root.dataset.soundVisual = visual; root.dataset.contactTrail = trail; root.dataset.contactActivity = activity; root.dataset.contactViolet = violet
    const color = contactTuning.colors[violet]
    root.style.setProperty('--contact-color', color); root.style.setProperty('--contact-anchor', '50%')
    for (const size of ['desktop', 'mobile'] as const) {
      const tune = contactTuning[size]
      root.style.setProperty(`--contact-width-${size}`, `${tune.width}px`)
      root.style.setProperty(`--contact-height-${size}`, `${tune.height}px`)
      root.style.setProperty(`--contact-presence-${size}`, String(contactTuning.marker.staticOpacity * contactTuning.violetStrength))
      root.style.setProperty(`--contact-radius-${size}`, '50%')
    }
    if (visual === 'line-only') { hide(); svg?.remove(); svg = null; head = null; bands = []; return }
    if (svg) { svg.style.color = color; audioOwnership(); return }
    if (!holders[0]?.parentElement) return
    svg = document.createElementNS(ns, 'svg')
    svg.classList.add('bow-contact'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false')
    svg.style.color = color; svg.style.opacity = '0'
    bands = Array.from({ length: contactTuning.bands }, (_, i) => {
      const path = document.createElementNS(ns, 'path'); path.classList.add('contact-tail'); path.dataset.ageBand = String(i)
      svg!.prepend(path); return path
    })
    head = document.createElementNS(ns, 'ellipse'); head.classList.add('contact-head'); svg.append(head)
    holders[0].parentElement.append(svg)
    audioOwnership()
  }
  return {
    configure, sample: motion.sample,
    paint(playing: boolean, dt: number) {
      if (!svg || !head || visual !== 'bow-contact') return false
      if (Number(root.style.getPropertyValue('--sound-release')) < .94) { hide(); return false }
      const state = motion.advance(dt, playing, activity, tuningPresets[preset]), isMobile = mobile(), tune = isMobile ? contactTuning.mobile : contactTuning.desktop
      const setting = contactTuning.trail[trail]
      const x0 = parseFloat(holders[0].style.left), y0 = parseFloat(holders[0].style.top), width = parseFloat(holders[0].style.width)
      const gap = parseFloat(holders[1].style.top) - y0, center = y0 + gap / 2
      // Shared holder geometry owns positioning. No layout measurement per frame.
      // Mobile uses more room above the pair, preserving the real LISTEN hit target below.
      const upper = Math.min(tune.upper, y0 * tune.upperFraction), lower = Math.min(tune.lower, y0 * tune.lowerFraction)
      const x = x0 + width * (contactTuning.horizontal.center + state.lateral * contactTuning.horizontal.range * state.range)
      const y = center + ((lower - upper) / 2 + state.vertical * (upper + lower) / 2) * state.range
      const dx = x - lastX, dy = y - lastY
      if (count && Math.hypot(dx, dy) > .02) {
        const wanted = Math.atan2(dy, dx) * 180 / Math.PI
        const delta = ((wanted - angle + 270) % 180 + 180) % 180 - 90
        angle += delta * (1 - Math.exp(-dt / 75))
      }
      lastX = x; lastY = y; clock += dt
      if (state.presence) {
        const bounds = svg.getBoundingClientRect(), now = performance.now(), sample = { x: bounds.left + x, y: bounds.top + y, time: now }
        const elapsed = audioPosition ? Math.max(.001, (now - audioPosition.time) / 1000) : 1
        signatureAudioHandoff.publish('home-contact', 'haegeum', { ...sample, vx: audioPosition ? (sample.x - audioPosition.x) / elapsed : 0, vy: audioPosition ? (sample.y - audioPosition.y) / elapsed : 0 })
        audioPosition = sample
      } else signatureAudioHandoff.remove('home-contact')
      if (state.presence) { xs[cursor] = x; ys[cursor] = y; times[cursor] = clock; cursor = (cursor + 1) % capacity; count = Math.min(count + 1, tune.historySamples) }
      if (signatureAudioHandoff.isActive()) { if (!state.unsettled) count = 0; return state.unsettled }
      // Feature-driven duration stays stable; musical response changes opacity and actual traveled distance.
      const historyMs = setting.historyMs * contactTuning.trailPersistence * tune.historyScale * (preset === 'B2_REFERENCE' ? contactTuning.history.base + contactTuning.history.activityGain * state.activity : 1)
      const points: { x: number; y: number; age: number }[] = []
      for (let i = 0; i < count; i++) {
        const j = (cursor - 1 - i + capacity) % capacity, age = (clock - times[j]) / historyMs
        if (age > 1) break
        points.push({ x: xs[j], y: ys[j], age })
      }
      // Fixed age bands taper width/opacity along the actual path, including direction reversals.
      const ribbons: string[][] = bands.map(() => [])
      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i], q = points[i + 1], before = points[Math.max(0, i - 1)], after = points[Math.min(points.length - 1, i + 2)]
        const n = trailNormal(before, q), m = trailNormal(p, after), w = setting.width * (1 - p.age) / 2, v = setting.width * (1 - q.age) / 2
        const pair = (a: typeof p, normal: typeof n, size: number) => { const edge=trailEdge(a,normal,size);return `${edge.x.toFixed(2)},${edge.y.toFixed(2)}` }
        const band = Math.min(bands.length - 1, Math.floor((p.age + q.age) * .5 * bands.length))
        ribbons[band].push(`M${pair(p,n,w)}L${pair(q,m,v)}L${pair(q,m,-v)}L${pair(p,n,-w)}Z`)
      }
      bands.forEach((path, i) => { path.setAttribute('d', ribbons[i].join('')); path.style.opacity = String(setting.opacity * state.trailEmphasis * (1 - (i + .5) / bands.length) ** contactTuning.history.fadeExponent) })
      head.style.opacity = String(contactTuning.marker.opacity)
      head.setAttribute('cx', x.toFixed(3)); head.setAttribute('cy', y.toFixed(3)); head.setAttribute('rx', String(setting.width / 2)); head.setAttribute('ry', String(setting.width / 4))
      head.setAttribute('transform', `rotate(${angle.toFixed(2)} ${x.toFixed(3)} ${y.toFixed(3)})`)
      svg.style.opacity = (state.presence * contactTuning.violetStrength).toFixed(4)
      if (diagnostics) {
        svg.dataset.x = x.toFixed(3); svg.dataset.y = y.toFixed(3); svg.dataset.presence = state.presence.toFixed(4)
        svg.dataset.rate = state.rate.toFixed(3); svg.dataset.history = String(points.length)
        svg.dataset.historyMs = historyMs.toFixed(2)
        svg.dataset.trailSpan = points.length ? Math.max(...points.map(p => Math.hypot(p.x-x,p.y-y))).toFixed(2) : '0'
      }
      if (!state.unsettled) { count = 0; bands.forEach(path => path.setAttribute('d', '')) }
      return state.unsettled
    },
    reset: hide,
    destroy() {
      unsubscribeAudio(); staticState.disconnect()
      window.removeEventListener('scroll', publishStatic); window.removeEventListener('resize', publishStatic)
      document.removeEventListener('visibilitychange', publishStatic)
      hide(); signatureAudioHandoff.remove('home-contact-static'); svg?.remove(); svg = null; head = null; bands = []
    },
  }
}
