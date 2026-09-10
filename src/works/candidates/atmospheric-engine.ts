import {
  Color, Mesh, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera,
  PlaneGeometry, Raycaster, Scene, ShaderMaterial, SRGBColorSpace, Texture,
  Vector2, Vector3, WebGLRenderer,
} from 'three'
import { atmosphericCatalog as worksCatalog } from './atmospheric-catalog.ts'
import type { AtmosphericImage as WorkImage } from './atmospheric-catalog.ts'

const clamp = (n: number, low = 0, high = 1) => Math.max(low, Math.min(high, n))
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
const damp = (a: number, b: number, dt: number, rate: number) => a + (b - a) * (1 - Math.exp(-rate * dt))
const ivory = new Color('#f4f0e8')
const placements = [
  [.82, .18, .018], [-1.15, .22, -.025], [1.08, .18, .018], [-.96, .12, -.018],
  [.85, .32, .022], [-.72, .20, -.02], [.91, .12, .02],
] as const
const moods: Record<WorkImage, readonly [string, string]> = {
  jiYoungHee: ['#846f64', '#b8a182'], yeongsan: ['#60758b', '#b5a182'], pulgo: ['#bd965d', '#a47253'],
  sanjo: ['#375778', '#a7bfc4'], pyeongjo: ['#baabc9', '#8ab3b0'],
  hanBeomSu: ['#76a591', '#aaa87e'], recital: ['#b79061', '#817885'],
}
const palette = worksCatalog.map(record => moods[record.image].map(value => new Color(value)))

/** A work keeps its own room: the camera pauses while the viewer reads. */
export function atmosphericTimeline(progress: number, mobile: boolean) {
  const cursor = .18 + clamp(progress / .86) * (worksCatalog.length - .54)
  const focus = Math.min(worksCatalog.length - 1, Math.floor(cursor))
  const local = cursor - focus
  const gap = mobile ? 2.9 : 4.7
  const viewingDistance = mobile ? 7.7 : 10.4
  const passage = Math.min(worksCatalog.length - 1, focus + .04 * smooth(local / .43) + .96 * smooth((local - .43) / .57))
  const resolution = smooth((progress - .86) / .14)
  const phase = resolution > 0 ? 'archive' : local < .24 ? 'approach' : local < .32 ? 'focus'
    : local < .43 ? 'hold' : 'departure'
  // Never borrow the next work's color during this work's focus/hold.
  const mood = Math.min(worksCatalog.length - 1, focus + smooth((local - .46) / .54))
  return { cursor, gap, viewingDistance, cameraZ: viewingDistance - passage * gap,
    focus, resolution, phase, mood }
}

export function atmosphericDepth(index: number, cursor: number) {
  const local = cursor - index
  const approach = smooth(local / .24)
  const departure = smooth((local - .22) / .78)
  // A distant next surface enters only after the outgoing image has grown and softened.
  const incoming = local < 0 ? .28 * smooth((local + .40) / .40) : .28 + .72 * approach
  const finalWork = index === worksCatalog.length - 1
  // Clear the final large surface before archive assembly; its real row thumbnail reveals with the list.
  const fade = finalWork ? smooth((local - .40) / .22) : smooth((local - .52) / .44)
  return { delta: index - cursor, approach, departure, opacity: incoming * (1 - fade) }
}

export function atmosphericTextureSize(width: number, height: number, mobile: boolean) {
  const factor = Math.min(1, (mobile ? 1024 : 1600) / Math.max(width, height))
  return { width: Math.max(1, Math.round(width * factor)), height: Math.max(1, Math.round(height * factor)) }
}

/** All four edges fit the actual type-free band, including short desktop windows. */
export function atmosphericFit(ratio: number, distance: number, viewportWidth: number,
  viewportHeight: number, top: number, bottom: number, mobile: boolean) {
  const span = 2 * distance * Math.tan((mobile ? 43 : 42) * Math.PI / 360)
  const available = Math.max(1, bottom - top)
  const width = Math.min(available * .94 / ratio, viewportWidth * (mobile ? .84 : .61)) * span / viewportHeight
  const y = (1 - (top + bottom) / viewportHeight) * span / 2
  return { width, y }
}

const atmosphereVertex = `
varying vec2 vPosition;
void main() { vPosition = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
// Independently authored pigment fields. No borrowed shader/source or source imagery.
const atmosphereFragment = `
precision highp float;
varying vec2 vPosition;
uniform vec3 uPaper;
uniform vec3 uCool;
uniform vec3 uWarm;
uniform vec2 uPointer;
uniform float uAspect;
uniform float uDepth;
uniform float uBreath;
uniform float uPhase;
uniform float uResolve;
float grain(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1037, 0.0973, 0.1099));
  q += dot(q, q.yzx + 19.17);
  return fract((q.x + q.y) * q.z);
}
float field(vec2 p, vec2 center, vec2 extent) {
  vec2 d = (p - center) / extent;
  return exp(-dot(d, d) * 1.45);
}
void main() {
  vec2 p = vPosition - .5;
  p.x *= uAspect;
  float fold = sin(p.y * 3.4 + uDepth * .57 + uPhase * .09) * .10;
  p.x += fold;
  vec2 pointer = uPointer * vec2(.075, .045);
  float passage = sin(uDepth * .66) * .24;
  float cool = field(p, vec2(-.41 + passage, .11) + pointer, vec2(.92, .75));
  float warm = field(p, vec2(.39 - passage * .48, -.17) - pointer, vec2(.85, .58));
  float halo = field(p, vec2(.07, .31 + passage * .23), vec2(.42, .91));
  float presence = (1.0 - uResolve) * (.72 + uBreath * .04);
  vec3 color = mix(uPaper, uCool, cool * presence);
  color = mix(color, uWarm, warm * presence * .90);
  color = mix(color, uPaper, halo * (.12 + uBreath * .06));
  color += (grain(gl_FragCoord.xy) - .5) * .009;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  #include <colorspace_fragment>
}
`

interface AtmosphericOptions {
  canvas: HTMLCanvasElement
  root: HTMLElement
  stage: HTMLElement
  region: HTMLElement
  images: Record<WorkImage, { src: string; width: number; height: number }>
  mobile: boolean
  onReady: () => void
  onFocus: (index: number, archive: boolean) => void
  onFailure: (reason: string) => void
}

export function createAtmosphericEngine(options: AtmosphericOptions): { dispose: () => void } | null {
  const { root, stage, region, canvas, mobile } = options
  let renderer: WebGLRenderer
  try {
    const context = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!context || context.isContextLost()) { options.onFailure('webgl-unavailable'); return null }
    renderer = new WebGLRenderer({ canvas, context, antialias: false, alpha: false })
  } catch { options.onFailure('webgl-unavailable'); return null }
  renderer.outputColorSpace = SRGBColorSpace
  renderer.autoClear = false
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5))

  const scene = new Scene()
  const camera = new PerspectiveCamera(mobile ? 43 : 42, 1, .1, 70)
  const backdrop = new Scene()
  const backdropCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const paper = new ShaderMaterial({
    vertexShader: atmosphereVertex, fragmentShader: atmosphereFragment, depthWrite: false, depthTest: false,
    uniforms: {
      uPaper: { value: ivory }, uCool: { value: palette[0][0].clone() }, uWarm: { value: palette[0][1].clone() },
      uPointer: { value: new Vector2() }, uAspect: { value: 1 }, uDepth: { value: 0 },
      uBreath: { value: 0 }, uPhase: { value: 0 }, uResolve: { value: 0 },
    },
  })
  const backgroundGeometry = new PlaneGeometry(2, 2)
  backdrop.add(new Mesh(backgroundGeometry, paper))
  const geometry = new PlaneGeometry(1, 1)
  const objects = worksCatalog.map((record, index) => {
    const image = options.images[record.image]
    const material = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })
    const mesh = new Mesh(geometry, material)
    mesh.userData.index = index
    mesh.visible = false
    scene.add(mesh)
    return { mesh, material, ratio: image.height / image.width }
  })
  const textures = new Set<Texture>()
  const staging = new Set<HTMLCanvasElement>()
  const pending = new Set<HTMLImageElement>()
  const pointer = new Vector2()
  const pointerTarget = new Vector2()
  const raycaster = new Raycaster()
  const hitPointer = new Vector2()
  const projection = new Vector3()
  let disposed = false
  let ready = false
  let frame = 0
  let frames = 0
  let lastTime = 0
  let progress = 0
  let targetProgress = 0
  let velocity = 0
  let drift = 0
  let breath = 0
  let phase = 0
  let focus = -1
  let archive = false
  let hovered = -1
  let hoverAmount = 0
  let scrollStart = 0
  let scrollRange = 1
  let width = 1
  let height = 1
  let safeTop = 0
  let safeBottom = 1
  let contentWidth = 1
  let visible = stage.getBoundingClientRect().bottom > 0 && stage.getBoundingClientRect().top < innerHeight
  let modal = Boolean(document.querySelector('dialog[open]'))
  let press: { x: number; y: number; scroll: number; time: number } | null = null

  function wake() {
    if (!disposed && visible && !document.hidden && !modal && !frame) frame = requestAnimationFrame(render)
  }
  function sleep() {
    cancelAnimationFrame(frame); frame = 0; lastTime = 0
    root.dataset.renderState = 'sleeping'
  }
  function render(time: number) {
    frame = 0
    if (disposed || !visible || document.hidden || modal) return
    const dt = lastTime ? Math.min(.045, (time - lastTime) / 1000) : 1 / 60
    lastTime = time
    const oldProgress = progress
    progress = damp(progress, targetProgress, dt, 8.4)
    if (Math.abs(progress - targetProgress) < .000015) progress = targetProgress
    velocity = damp(velocity, (progress - oldProgress) / dt, dt, 7)
    if (Math.abs(velocity) < .0003) velocity = 0
    const signedEnergy = clamp(velocity * 2.9, -1, 1)
    drift = damp(drift, signedEnergy, dt, 4)
    breath = damp(breath, Math.abs(signedEnergy), dt, 5.6)
    pointer.lerp(pointerTarget, 1 - Math.exp(-5.7 * dt))
    hoverAmount = damp(hoverAmount, hovered >= 0 ? 1 : 0, dt, 9)
    phase += dt
    const timeline = atmosphericTimeline(progress, mobile)
    const { cursor, gap, viewingDistance, resolution } = timeline
    camera.position.set(pointer.x * (mobile ? 0 : .025), 0, timeline.cameraZ)
    camera.updateMatrixWorld()
    if (focus !== timeline.focus || archive !== (resolution > .1)) {
      focus = timeline.focus; archive = resolution > .1
      options.onFocus(focus, archive)
    }
    objects.forEach(({ mesh, material, ratio }, index) => {
      const depth = atmosphericDepth(index, cursor)
      const [baseX, , tilt] = placements[index]
      const imageAreaWidth = contentWidth * (mobile ? .60 : .68)
      const fit = atmosphericFit(ratio, viewingDistance, imageAreaWidth, height, safeTop, safeBottom, mobile)
      const viewSpan = 2 * viewingDistance * Math.tan(camera.fov * Math.PI / 360)
      const imageCenterX = (imageAreaWidth - contentWidth) * .5 * viewSpan / height
      const nextDistance = Math.max(0, depth.delta) * gap
      // Travel through the image plane: readable approach grows continuously into full-frame cover.
      // Derive the near distance from the real aspect ratio, so even a narrow poster covers the viewport.
      const coverDistance = Math.min(fit.width * height / width, fit.width * ratio) / (2 * Math.tan(camera.fov * Math.PI / 360))
      const distance = viewingDistance * Math.pow(coverDistance * .58 / viewingDistance, depth.departure)
        + (1 - depth.approach) * gap * 1.6 + nextDistance
      const centering = smooth(depth.departure)
      const x = (imageCenterX + baseX * (mobile ? .06 : .23)) * (1 - centering)
      const y = (fit.y + drift * .04) * (1 - centering)
      mesh.position.set(x + pointer.x * .025, y + pointer.y * .015, camera.position.z - distance)
      mesh.rotation.set(-drift * .025 * (1 - centering), tilt * (1 - depth.approach), 0)
      const activeHover = hovered === index ? hoverAmount : 0
      let objectWidth = fit.width * (1 + activeHover * .008)
      // The persistent titles now own the archive transformation. The final surface
      // retreats gently behind their widening field; no separate image-to-list flight.
      mesh.position.z -= resolution * gap * .6
      mesh.position.x -= resolution * .18
      objectWidth *= 1 - resolution * .12
      mesh.scale.set(objectWidth, objectWidth * ratio, 1)
      material.opacity = depth.opacity * (1 - smooth((resolution - .15) / .70))
      material.depthWrite = material.opacity > .995
      mesh.visible = ready && material.opacity > .004
    })
    const mood = timeline.mood
    const first = Math.floor(mood), next = Math.min(first + 1, worksCatalog.length - 1)
    const blend = mood - first
    paper.uniforms.uCool.value.copy(palette[first][0]).lerp(palette[next][0], blend)
    paper.uniforms.uWarm.value.copy(palette[first][1]).lerp(palette[next][1], blend)
    paper.uniforms.uPointer.value.copy(pointer)
    paper.uniforms.uDepth.value = mood
    paper.uniforms.uPhase.value = phase
    paper.uniforms.uBreath.value = breath
    paper.uniforms.uResolve.value = resolution
    renderer.setViewport(0, 0, width, height)
    renderer.setScissorTest(false)
    renderer.clear()
    renderer.render(backdrop, backdropCamera)
    renderer.clearDepth()
    renderer.setViewport(0, 0, width, height)
    renderer.render(scene, camera)
    renderer.setScissorTest(false)
    const bounds = canvas.getBoundingClientRect()
    const describe = (index: number, prefix: string) => {
      const object = objects[index]
      projection.copy(object.mesh.position).project(camera)
      const distance = camera.position.z - object.mesh.position.z
      const span = 2 * distance * Math.tan(camera.fov * Math.PI / 360)
      root.dataset[`${prefix}X`] = String(bounds.left + (projection.x + 1) * width / 2)
      root.dataset[`${prefix}Y`] = String(bounds.top + (1 - projection.y) * height / 2)
      root.dataset[`${prefix}Width`] = String(object.mesh.scale.x / span * height)
      root.dataset[`${prefix}Height`] = String(object.mesh.scale.y / span * height)
    }
    describe(focus, 'focus'); describe(Math.min(worksCatalog.length - 1, focus + 1), 'next')
    root.dataset.resolution = resolution.toFixed(5)
    root.dataset.segmentPhase = timeline.phase
    root.dataset.mood = mood.toFixed(4)
    root.style.setProperty('--atmospheric-resolution', resolution.toFixed(4))
    frames++
    root.dataset.progress = progress.toFixed(5)
    root.dataset.focus = String(focus)
    root.dataset.frames = String(frames)
    root.dataset.breath = breath.toFixed(4)
    root.dataset.drift = drift.toFixed(4)
    const moving = Math.abs(progress - targetProgress) > .000015 || Math.abs(velocity) > .0003
      || Math.abs(drift) > .001 || breath > .001 || pointer.distanceTo(pointerTarget) > .001
      || Math.abs(hoverAmount - (hovered >= 0 ? 1 : 0)) > .001
    root.dataset.renderState = moving ? 'running' : 'settled'
    if (moving) frame = requestAnimationFrame(render)
  }

  function scroll() {
    targetProgress = clamp((window.scrollY - scrollStart) / scrollRange)
    wake()
  }
  function resize() {
    if (disposed) return
    const stageBounds = stage.getBoundingClientRect()
    const navigation = document.querySelector<HTMLElement>('.editorial-navigation')
    // Do not leave an opaque WebGL layer behind the fixed header. Chromium's occlusion
    // composition can otherwise drop a header-height strip despite a fully painted framebuffer.
    const obstruction = navigation ? Math.min(stageBounds.height, navigation.getBoundingClientRect().height) : 0
    stage.style.setProperty('--atmospheric-obstruction', `${obstruction}px`)
    const bounds = canvas.getBoundingClientRect()
    width = Math.max(1, bounds.width); height = Math.max(1, bounds.height)
    const heading = root.querySelector<HTMLElement>('.atmospheric-heading')?.getBoundingClientRect()
    const caption = root.querySelector<HTMLElement>('.atmospheric-caption')?.getBoundingClientRect()
    safeTop = clamp((heading?.bottom ?? bounds.top) - bounds.top + 24, 0, height)
    safeBottom = clamp((caption?.top ?? bounds.bottom) - bounds.top - 24, safeTop + 1, height)
    renderer.setSize(width, height, false)
    contentWidth = Math.min(width, 1880)
    root.dataset.contentWidth = String(contentWidth)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    paper.uniforms.uAspect.value = width / height
    scrollStart = region.getBoundingClientRect().top + scrollY
    scrollRange = Math.max(1, region.offsetHeight - stage.offsetHeight)
    root.dataset.scrollStart = String(scrollStart)
    root.dataset.scrollRange = String(scrollRange)
    root.dataset.dpr = String(renderer.getPixelRatio())
    scroll()
    if (frames === 0) progress = targetProgress
  }
  function hit(x: number, y: number) {
    const rect = canvas.getBoundingClientRect()
    hitPointer.set((x - rect.left) / width * 2 - 1, 1 - (y - rect.top) / rect.height * 2)
    raycaster.setFromCamera(hitPointer, camera)
    const match = raycaster.intersectObjects(objects.filter(object => object.mesh.visible && object.material.opacity > .4).map(object => object.mesh), false)[0]
    return match ? match.object.userData.index as number : -1
  }
  function pointerMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return
    const rect = stage.getBoundingClientRect()
    pointerTarget.set(clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1), clamp(1 - (event.clientY - rect.top) / rect.height * 2, -1, 1))
    hovered = hit(event.clientX, event.clientY)
    canvas.style.cursor = hovered >= 0 ? 'pointer' : ''
    wake()
  }
  function pointerLeave() { pointerTarget.set(0, 0); hovered = -1; canvas.style.cursor = ''; wake() }
  function pointerDown(event: PointerEvent) {
    if (event.isPrimary && event.button === 0) press = { x: event.clientX, y: event.clientY, scroll: scrollY, time: performance.now() }
  }
  function pointerUp(event: PointerEvent) {
    const start = press; press = null
    if (!start || performance.now() - start.time > 650 || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10 || Math.abs(scrollY - start.scroll) > 5) return
    const index = hit(event.clientX, event.clientY)
    if (index >= 0) window.location.assign(worksCatalog[index].referenceUrl)
  }
  function pointerCancel() { press = null }
  function visibility() { if (document.hidden) sleep(); else { lastTime = 0; scroll() } }
  function lost(event: Event) { event.preventDefault(); fail('context-lost') }
  const observer = new IntersectionObserver(entries => {
    const wasVisible = visible
    visible = entries.some(entry => entry.isIntersecting)
    if (visible) {
      lastTime = 0; scroll()
      // Resume at the actual location after an offscreen jump, not a stale earlier work.
      if (!wasVisible) { progress = targetProgress; velocity = 0; drift = 0; breath = 0 }
    } else sleep()
  })
  const sizing = new ResizeObserver(resize)
  const dialogs = new MutationObserver(() => {
    const open = Boolean(document.querySelector('dialog[open]'))
    if (modal === open) return
    modal = open
    if (modal) sleep(); else { lastTime = 0; wake() }
  })
  function dispose() {
    if (disposed) return
    disposed = true
    sleep()
    observer.disconnect(); sizing.disconnect(); dialogs.disconnect()
    window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', visibility)
    stage.removeEventListener('pointermove', pointerMove); stage.removeEventListener('pointerleave', pointerLeave)
    canvas.removeEventListener('pointerdown', pointerDown); canvas.removeEventListener('pointerup', pointerUp)
    canvas.removeEventListener('pointercancel', pointerCancel); canvas.removeEventListener('webglcontextlost', lost)
    pending.forEach(image => { image.onload = null; image.onerror = null; image.src = '' }); pending.clear()
    textures.forEach(texture => texture.dispose()); textures.clear()
    staging.forEach(buffer => { buffer.width = 0; buffer.height = 0 }); staging.clear()
    objects.forEach(({ material }) => { material.map = null; material.dispose() })
    geometry.dispose(); backgroundGeometry.dispose(); paper.dispose()
    scene.clear(); backdrop.clear(); renderer.dispose(); renderer.forceContextLoss()
    stage.style.removeProperty('--atmospheric-obstruction')
    canvas.style.cursor = ''
    Reflect.deleteProperty(root, '__worksSnapshot')
    root.dataset.renderState = 'disposed'
  }
  function fail(reason: string) { if (!disposed) { dispose(); options.onFailure(reason) } }

  observer.observe(stage); sizing.observe(stage); sizing.observe(region)
  for (const element of [document.querySelector('.editorial-navigation'), root.querySelector('.atmospheric-heading'), root.querySelector('.atmospheric-caption')]) {
    if (element) sizing.observe(element)
  }
  dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })
  window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', visibility)
  stage.addEventListener('pointermove', pointerMove, { passive: true }); stage.addEventListener('pointerleave', pointerLeave)
  canvas.addEventListener('pointerdown', pointerDown, { passive: true }); canvas.addEventListener('pointerup', pointerUp, { passive: true })
  canvas.addEventListener('pointercancel', pointerCancel); canvas.addEventListener('webglcontextlost', lost)
  Object.defineProperty(root, '__worksSnapshot', { configurable: true, value: () => ({
    progress, targetProgress, velocity, drift, breath, pointer: pointer.toArray(), mood: atmosphericTimeline(progress, mobile).mood, frames,
    camera: camera.position.toArray(), textures: textures.size, pending: pending.size,
    mobile, state: root.dataset.renderState, textureSizes: [...textures].map(texture => {
      const source = texture.image
      return source instanceof HTMLCanvasElement || source instanceof HTMLImageElement
        ? { width: source.width, height: source.height } : { width: 0, height: 0 }
    }),
    objects: objects.map(({ mesh, material }, index) => {
      projection.copy(mesh.position).project(camera)
      const bounds = canvas.getBoundingClientRect()
      return { id: worksCatalog[index].id, position: mesh.position.toArray(), rotation: mesh.rotation.toArray(), opacity: material.opacity, scale: mesh.scale.toArray(),
        projected: [bounds.left + (projection.x + 1) * width / 2, bounds.top + (1 - projection.y) * height / 2] }
    }),
  }) })
  renderer.debug.onShaderError = () => { queueMicrotask(() => fail('shader-unavailable')) }
  resize()
  worksCatalog.forEach((record, index) => {
    const image = new Image()
    pending.add(image)
    image.onload = () => {
      pending.delete(image)
      if (disposed) return
      const size = atmosphericTextureSize(image.naturalWidth, image.naturalHeight, mobile)
      const buffer = document.createElement('canvas')
      buffer.width = size.width; buffer.height = size.height
      const context = buffer.getContext('2d')
      if (!context) { fail('texture-upload-unavailable'); return }
      try { context.drawImage(image, 0, 0, size.width, size.height) }
      catch { buffer.width = 0; buffer.height = 0; fail('texture-upload-unavailable'); return }
      staging.add(buffer)
      const texture = new Texture(buffer)
      texture.colorSpace = SRGBColorSpace; texture.needsUpdate = true
      texture.anisotropy = Math.min(2, renderer.capabilities.getMaxAnisotropy())
      textures.add(texture)
      objects[index].material.map = texture; objects[index].material.needsUpdate = true
      root.dataset.textures = String(textures.size)
      if (textures.size === worksCatalog.length) { ready = true; options.onReady() }
      wake()
    }
    image.onerror = () => { pending.delete(image); fail('texture-unavailable') }
    image.src = options.images[record.image].src
  })
  return { dispose }
}
