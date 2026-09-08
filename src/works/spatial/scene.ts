import {
  BoxGeometry, DirectionalLight, Euler, HemisphereLight, Mesh, MeshStandardMaterial,
  NoToneMapping, PerspectiveCamera, Quaternion, Raycaster, Scene, SRGBColorSpace,
  TextureLoader, Vector2, Vector3, WebGLRenderer,
} from 'three'
import type { Texture } from 'three'
import type { WorkRecord } from '../catalog.ts'
import { clamp01, dampValue, focusedPlacement, spatialCursor, spatialPlacements, spatialPose, spatialTimeline, spatialTuning } from './model.ts'

export interface SpatialSceneOptions {
  canvas: HTMLCanvasElement
  stage: HTMLElement
  region: HTMLElement
  records: readonly WorkRecord[]
  images: Record<string, { src: string; width: number; height: number }>
  onFocus: (index: number, resolving: boolean) => void
  onStatus: (status: 'ready' | 'fallback', reason?: string) => void
}

export interface SpatialSnapshot {
  progress: number
  angle: number
  resolution: number
  focused: number
  hovered: number
  frames: number
  textures: number
  mobile: boolean
  objects: { id: string; position: number[]; quaternion: number[]; projected: { x: number; y: number }; scale: number; opacity: number; visible: boolean }[]
}

export interface SpatialSceneController { dispose: () => void; snapshot: () => SpatialSnapshot }

export function createSpatialScene(options: SpatialSceneOptions): SpatialSceneController | null {
  const { canvas, stage, region, records, images } = options
  let context: WebGL2RenderingContext | null
  try { context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' }) }
  catch { context = null }
  if (!context) { options.onStatus('fallback', 'webgl-unavailable'); return null }
  let renderer: WebGLRenderer
  try { renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true }) }
  catch { context.getExtension('WEBGL_lose_context')?.loseContext(); options.onStatus('fallback', 'renderer-unavailable'); return null }
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = NoToneMapping
  renderer.setClearColor(0xf4f0e8, 0)
  const scene = new Scene()
  const camera = new PerspectiveCamera(38, 1, .1, 70)
  const hemisphere = new HemisphereLight(0xffffff, 0x9a8870, 1.35)
  scene.add(hemisphere)
  const key = new DirectionalLight(0xfff5e6, 1.8)
  key.position.set(-4, 6, 8)
  scene.add(key)
  const fill = new DirectionalLight(0xffffff, .7)
  fill.position.set(6, 0, 5)
  scene.add(fill)
  const rim = new DirectionalLight(0xe7e0d7, 1.25)
  rim.position.set(2, 5, -5)
  scene.add(rim)

  const placements = spatialPlacements(records.map(record => record.type))
  const textures = new Set<Texture>()
  const loader = new TextureLoader()
  let disposed = false
  let resourcesDisposed = false
  let visible = true
  let loaded = 0
  let frame = 0
  let frames = 0
  let lastTime = 0
  let scrollStart = 0
  let scrollRange = 1
  let targetProgress = 0
  let progress = 0
  let currentAngle = 0
  let hovered = -1
  let focus = -1
  let resolving = false
  let mobile = window.matchMedia('(max-width: 700px)').matches
  let mobileScale = 1
  let pointerDown: { x: number; y: number; scroll: number; time: number } | null = null
  const pointer = new Vector2(10, 10)
  const raycaster = new Raycaster()
  const hoverQuaternion = new Quaternion()
  const projected = new Vector3()
  const meshes = records.map(record => {
    const image = images[record.image]
    const geometry = new BoxGeometry(1, image.height / image.width, record.type === 'album' ? .034 : .006)
    const edge = new MeshStandardMaterial({ color: 0xcfc5b4, roughness: .8, metalness: 0, transparent: true })
    const back = new MeshStandardMaterial({ color: 0xd9d2c5, roughness: .93, metalness: 0, transparent: true })
    const front = new MeshStandardMaterial({ color: 0xffffff, roughness: .9, metalness: 0, emissive: 0xfff1d8, emissiveIntensity: 0, transparent: true })
    const mesh = new Mesh(geometry, [edge, edge, edge, edge, front, back])
    mesh.userData.index = records.indexOf(record)
    scene.add(mesh)
    const pendingTexture = loader.load(image.src, texture => {
      if (disposed) { texture.dispose(); return }
      texture.colorSpace = SRGBColorSpace
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      front.map = texture
      front.needsUpdate = true
      loaded += 1
      stage.setAttribute('data-textures', String(loaded))
      if (loaded === records.length) options.onStatus('ready')
      wake()
    }, undefined, () => {
      if (!disposed) fail('texture-unavailable')
    })
    textures.add(pendingTexture)
    return { mesh, edge, back, front, hover: 0 }
  })

  function snapshot(): SpatialSnapshot {
    const rect = canvas.getBoundingClientRect()
    const timeline = spatialTimeline(progress, placements)
    return {
      progress, angle: currentAngle, resolution: timeline.resolution, focused: focus, hovered, frames, textures: loaded, mobile,
      objects: meshes.map(({ mesh, front }, index) => {
        projected.copy(mesh.position).project(camera)
        return { id: records[index].id, position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray(),
          projected: { x: rect.left + (projected.x + 1) / 2 * rect.width, y: rect.top + (1 - projected.y) / 2 * rect.height }, scale: mesh.scale.x, opacity: front.opacity, visible: mesh.visible }
      }),
    }
  }

  function setRenderState(state: string) { stage.setAttribute('data-render-state', state) }
  function wake() {
    if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(render)
  }

  function render(time: number) {
    frame = 0
    if (disposed || !visible || document.hidden) { setRenderState('offscreen'); return }
    const elapsed = lastTime ? Math.min(.05, (time - lastTime) / 1000) : 1 / 60
    lastTime = time
    const oldAngle = currentAngle
    progress = dampValue(progress, targetProgress, elapsed, 10.5)
    if (Math.abs(progress - targetProgress) < .00001) progress = targetProgress
    const timeline = spatialTimeline(progress, placements)
    currentAngle = timeline.angle
    const velocity = (currentAngle - oldAngle) / Math.max(.001, elapsed)
    const cursor = spatialCursor(currentAngle, placements)
    const focusIndex = focusedPlacement(currentAngle, placements)
    const resolutionState = timeline.resolution > .35
    if (focusIndex !== focus || resolutionState !== resolving) {
      focus = focusIndex; resolving = resolutionState
      stage.setAttribute('data-focus', records[focus].id)
      options.onFocus(focus, resolving)
    }
    let moving = Math.abs(progress - targetProgress) > .00001
    for (const [index, object] of meshes.entries()) {
      const pose = spatialPose(placements[index], currentAngle, timeline.resolution, mobile, velocity, cursor)
      const targetHover = hovered === index ? 1 : 0
      object.hover = dampValue(object.hover, targetHover, elapsed, 14)
      if (Math.abs(object.hover - targetHover) > .001) moving = true
      pose.position.z += object.hover * .18
      object.mesh.visible = pose.visibility > .005
      object.front.opacity = object.back.opacity = object.edge.opacity = pose.visibility
      hoverQuaternion.setFromEuler(new Euler(object.hover * -.018, object.hover * (records[index].type === 'album' ? .038 : -.018), 0))
      pose.quaternion.multiply(hoverQuaternion)
      object.mesh.position.copy(pose.position)
      object.mesh.scale.setScalar(pose.scale * mobileScale)
      if (frames === 0) object.mesh.quaternion.copy(pose.quaternion)
      else object.mesh.quaternion.slerp(pose.quaternion, 1 - Math.exp(-22 * elapsed))
      if (object.mesh.quaternion.angleTo(pose.quaternion) > .0007) moving = true
      object.front.emissiveIntensity = object.hover * .045
      object.edge.color.setHex(hovered === index ? 0xe1d5bf : 0xcfc5b4)
    }
    renderer.render(scene, camera)
    frames += 1
    stage.setAttribute('data-progress', progress.toFixed(5))
    stage.setAttribute('data-resolution', timeline.resolution.toFixed(5))
    stage.setAttribute('data-frames', String(frames))
    setRenderState(moving ? 'running' : 'settled')
    if (moving) frame = requestAnimationFrame(render)
  }

  function updateScroll() {
    targetProgress = clamp01((window.scrollY - scrollStart) / scrollRange)
    wake()
  }
  function resize() {
    if (disposed) return
    const box = stage.getBoundingClientRect()
    mobile = window.matchMedia('(max-width: 700px)').matches
    const tuning = mobile ? spatialTuning.mobile : spatialTuning.desktop
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, tuning.dpr))
    renderer.setSize(Math.max(1, box.width), Math.max(1, box.height), false)
    camera.aspect = Math.max(1, box.width) / Math.max(1, box.height)
    camera.fov = tuning.fov
    camera.position.set(0, 0, tuning.cameraZ)
    mobileScale = 1
    canvas.style.clipPath = ''
    if (mobile) {
      const heading = stage.querySelector('.spatial-heading')?.getBoundingClientRect()
      const copy = stage.querySelector('.spatial-focus-copy')?.getBoundingClientRect()
      const top = (heading?.bottom ?? box.top + 224) - box.top + 16
      const bottom = (copy?.top ?? box.bottom - 200) - box.top - 18
      const available = Math.max(120, bottom - top)
      canvas.style.clipPath = `inset(${top}px 0 ${Math.max(0, box.height - bottom)}px)`
      // Frame the gallery between real DOM typography, rather than allowing a
      // changing portrait ratio to rotate through the title or focused link.
      mobileScale = Math.min(1, available / (box.height * .44))
      camera.position.y = ((top + available / 2) / box.height - .5) * 2 * Math.tan(tuning.fov * Math.PI / 360) * tuning.cameraZ
    }
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
    scrollStart = region.getBoundingClientRect().top + window.scrollY
    scrollRange = Math.max(1, region.offsetHeight - stage.offsetHeight)
    stage.setAttribute('data-dpr', String(renderer.getPixelRatio()))
    stage.setAttribute('data-mobile', String(mobile))
    stage.setAttribute('data-scroll-start', String(scrollStart))
    stage.setAttribute('data-scroll-range', String(scrollRange))
    updateScroll()
  }
  function hit(clientX: number, clientY: number): number {
    const rect = canvas.getBoundingClientRect()
    pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1)
    raycaster.setFromCamera(pointer, camera)
    const intersection = raycaster.intersectObjects(meshes.filter(object => object.mesh.visible && object.front.opacity > .08).map(object => object.mesh), false)[0]
    return intersection ? intersection.object.userData.index as number : -1
  }
  function pointerMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return
    const index = hit(event.clientX, event.clientY)
    if (hovered !== index) { hovered = index; canvas.style.cursor = index < 0 ? '' : 'pointer'; stage.setAttribute('data-hover', String(index)); wake() }
  }
  function pointerLeave() { hovered = -1; canvas.style.cursor = ''; wake() }
  function pointerStart(event: PointerEvent) {
    if (event.isPrimary && event.button === 0) pointerDown = { x: event.clientX, y: event.clientY, scroll: window.scrollY, time: performance.now() }
  }
  function pointerEnd(event: PointerEvent) {
    const start = pointerDown
    pointerDown = null
    if (!start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10 || Math.abs(window.scrollY - start.scroll) > 4 || performance.now() - start.time > 650) return
    const index = hit(event.clientX, event.clientY)
    if (index >= 0) window.location.assign(records[index].referenceUrl)
  }
  function pointerCancel() { pointerDown = null }
  function visibilityChange() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; setRenderState('offscreen') }
    else if (visible) wake()
  }
  function releaseResources() {
    if (resourcesDisposed) return
    resourcesDisposed = true
    for (const { mesh, edge, back, front } of meshes) { mesh.geometry.dispose(); edge.dispose(); back.dispose(); front.dispose(); scene.remove(mesh) }
    textures.forEach(texture => texture.dispose())
    textures.clear()
    renderer.dispose()
    renderer.forceContextLoss()
  }
  function dispose() {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(frame)
    frame = 0
    observer.disconnect()
    resizeObserver.disconnect()
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', visibilityChange)
    canvas.removeEventListener('pointermove', pointerMove)
    canvas.removeEventListener('pointerleave', pointerLeave)
    canvas.removeEventListener('pointerdown', pointerStart)
    canvas.removeEventListener('pointerup', pointerEnd)
    canvas.removeEventListener('pointercancel', pointerCancel)
    canvas.removeEventListener('webglcontextlost', contextLost)
    canvas.style.cursor = ''
    Reflect.deleteProperty(stage, '__spatialWorksSnapshot')
    setRenderState('disposed')
    releaseResources()
  }
  function fail(reason: string) { dispose(); options.onStatus('fallback', reason) }
  function contextLost(event: Event) { event.preventDefault(); fail('context-lost') }
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting)
    if (visible) { lastTime = 0; updateScroll() }
    else { cancelAnimationFrame(frame); frame = 0; lastTime = 0; setRenderState('offscreen') }
  }, { threshold: 0 })
  const resizeObserver = new ResizeObserver(resize)
  observer.observe(region)
  resizeObserver.observe(stage)
  resizeObserver.observe(region)
  const heading = stage.querySelector('.spatial-heading')
  const copy = stage.querySelector('.spatial-focus-copy')
  if (heading) resizeObserver.observe(heading)
  if (copy) resizeObserver.observe(copy)
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', visibilityChange)
  canvas.addEventListener('pointermove', pointerMove, { passive: true })
  canvas.addEventListener('pointerleave', pointerLeave, { passive: true })
  canvas.addEventListener('pointerdown', pointerStart, { passive: true })
  canvas.addEventListener('pointerup', pointerEnd, { passive: true })
  canvas.addEventListener('pointercancel', pointerCancel, { passive: true })
  canvas.addEventListener('webglcontextlost', contextLost)
  Object.defineProperty(stage, '__spatialWorksSnapshot', { configurable: true, value: snapshot })
  resize()
  wake()
  return { dispose, snapshot }
}
