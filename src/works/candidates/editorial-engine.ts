import {
  CanvasTexture, Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial,
  SRGBColorSpace, Vector2, WebGLRenderer,
} from 'three'

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value))

/** Orthographic world units are CSS pixels; no parallel layout model can drift from DOM. */
export function editorialPlane(rect: { left: number; top: number; width: number; height: number }, viewport: { width: number; height: number }) {
  return { x: rect.left + rect.width / 2 - viewport.width / 2, y: viewport.height / 2 - rect.top - rect.height / 2, width: rect.width, height: rect.height }
}

export function editorialReveal(top: number, imageHeight: number, viewportHeight: number) {
  if (viewportHeight <= 0 || imageHeight <= 0) return 0
  return clamp((viewportHeight * .98 - top) / (viewportHeight * .44 + Math.min(imageHeight, viewportHeight) * .16))
}

export function editorialTextureSize(width: number, height: number, mobile: boolean) {
  const limit = mobile ? 1024 : 1600
  const ratio = Math.min(1, limit / Math.max(1, width, height))
  return { width: Math.max(1, Math.round(width * ratio)), height: Math.max(1, Math.round(height * ratio)) }
}

export type EditorialSelection = {
  recordId: string
  href: string
  image: string
  nativeAspect: number
  rect: { x: number; y: number; width: number; height: number }
  reveal: number
}

type EditorialRoot = HTMLElement & {
  __worksSnapshot?: () => unknown
  __worksSelection?: () => EditorialSelection | null
}

type Surface = {
  image: HTMLImageElement
  slot: HTMLElement
  anchor: HTMLAnchorElement
  mesh: Mesh<PlaneGeometry, ShaderMaterial>
  texture: CanvasTexture
  raster: HTMLCanvasElement
  progress: number
  target: number
  focused: boolean
  uploaded: { width: number; height: number }
}

const vertex = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Ordered columns and offset cells reconstruct a photograph. No noise texture, ripple,
// paper grain or HOME material is used; the fully resolved sample is the original colour.
const fragment = /* glsl */`
  uniform sampler2D uImage;
  uniform vec2 uImageSize;
  uniform vec2 uBounds;
  uniform float uReveal;
  uniform vec3 uInk;
  varying vec2 vUv;
  void main() {
    float imageAspect = uImageSize.x / uImageSize.y;
    float frameAspect = uBounds.x / max(uBounds.y, 1.0);
    vec2 cover = vec2(min(frameAspect / imageAspect, 1.0), min(imageAspect / frameAspect, 1.0));
    vec2 uv = (vUv - 0.5) * cover + 0.5;
    vec4 photograph = texture2D(uImage, uv);
    if (uReveal > 0.998) {
      gl_FragColor = photograph;
    } else {
      vec2 grid = vec2(clamp(floor(uBounds.x / 28.0), 7.0, 26.0), clamp(floor(uBounds.y / 36.0), 9.0, 32.0));
      vec2 cell = floor(vec2(vUv.x, 1.0 - vUv.y) * grid);
      float columnOrder = mod(cell.x * 3.0, 7.0) / 7.0;
      float row = (cell.y + 0.5) / grid.y;
      float threshold = row * 0.73 + columnOrder * 0.13;
      float field = smoothstep(threshold - 0.085, threshold + 0.015, uReveal);
      float resolve = smoothstep(threshold + 0.025, threshold + 0.15, uReveal);
      vec2 cellCentre = (floor(vUv * grid) + 0.5) / grid;
      vec2 assembledUv = mix((cellCentre - 0.5) * cover + 0.5, uv, resolve);
      vec3 assembled = texture2D(uImage, assembledUv).rgb;
      float columnEdge = smoothstep(0.91, 0.99, fract(vUv.x * grid.x));
      vec3 material = mix(uInk, assembled, resolve);
      material = mix(material, uInk, columnEdge * (1.0 - resolve) * 0.42);
      gl_FragColor = vec4(material, field * photograph.a);
    }
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

export function createEditorialEngine(element: HTMLElement): () => void {
  const host = element as EditorialRoot
  const images = [...host.querySelectorAll<HTMLImageElement>('.works-editorial-image img')].slice(0, 6)
  let destroyed = false
  let failed = false
  let resourcesReleased = false
  let failureDetail: string | null = null
  let shaderDiagnostic: {
    linked: boolean; vertexCompiled: boolean; fragmentCompiled: boolean
    programLog: string; vertexLog: string; fragmentLog: string
  } | null = null
  let raf = 0
  let previousTime = 0
  let frameCount = 0
  let inView = false
  let selected: EditorialSelection | null = null
  const surfaces: Surface[] = []
  const removeImageListeners: (() => void)[] = []
  const pending = new Set<HTMLImageElement>()
  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, .1, 10)
  camera.position.z = 1
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
  } catch {
    host.dataset.state = 'fallback'
    host.dataset.static = 'true'
    host.dataset.renderState = 'webgl-unavailable'
    return () => undefined
  }
  renderer.outputColorSpace = SRGBColorSpace
  renderer.setClearColor(0, 0)
  renderer.domElement.className = 'works-editorial-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.append(renderer.domElement)
  let viewport = { width: window.innerWidth, height: window.innerHeight }
  let mobileUploads = viewport.width <= 639

  const stopFrame = () => {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    previousTime = 0
  }
  const fallback = (reason: string, error?: unknown) => {
    if (failed || destroyed) return
    failed = true
    stopFrame()
    failureDetail = error instanceof Error ? error.message : null
    host.dataset.state = 'fallback'
    host.dataset.static = 'true'
    host.dataset.renderState = reason
    releaseResources()
  }
  renderer.debug.checkShaderErrors = true
  renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
    if (destroyed || failed || shaderDiagnostic) return
    shaderDiagnostic = {
      linked: Boolean(gl.getProgramParameter(program, gl.LINK_STATUS)),
      vertexCompiled: Boolean(gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)),
      fragmentCompiled: Boolean(gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)),
      programLog: gl.getProgramInfoLog(program) || '',
      vertexLog: gl.getShaderInfoLog(vertexShader) || '',
      fragmentLog: gl.getShaderInfoLog(fragmentShader) || '',
    }
    // A custom hook replaces Three's default logging, so retain visible diagnostics.
    console.error('WORKS editorial shader compilation/link failed', shaderDiagnostic)
    const error = new Error(JSON.stringify(shaderDiagnostic))
    // Three invokes this inside renderer.render(). Release only after it unwinds.
    queueMicrotask(() => {
      if (!destroyed && !failed) fallback('shader-compile-link-failed', error)
    })
  }
  const requestFrame = () => {
    if (destroyed || failed || shaderDiagnostic || !inView || document.hidden || raf) return
    raf = requestAnimationFrame(paint)
  }
  const measureViewport = () => {
    viewport = { width: window.innerWidth, height: window.innerHeight }
    const mobile = viewport.width <= 639
    if (mobile !== mobileUploads) {
      for (const surface of surfaces) {
        const size = editorialTextureSize(surface.image.naturalWidth, surface.image.naturalHeight, mobile)
        if (size.width === surface.uploaded.width && size.height === surface.uploaded.height) continue
        const raster = document.createElement('canvas')
        raster.width = size.width
        raster.height = size.height
        const context = raster.getContext('2d', { alpha: false })
        if (!context) { raster.width = raster.height = 0; fallback('texture-resize-failed'); return }
        try { context.drawImage(surface.image, 0, 0, size.width, size.height) }
        catch (error) { raster.width = raster.height = 0; throw error }
        const texture = new CanvasTexture(raster)
        texture.colorSpace = SRGBColorSpace
        surface.mesh.material.uniforms.uImage.value = texture
        surface.texture.dispose()
        surface.raster.width = surface.raster.height = 0
        surface.texture = texture
        surface.raster = raster
        surface.uploaded = size
      }
      mobileUploads = mobile
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5))
    renderer.setSize(viewport.width, viewport.height, false)
    camera.left = -viewport.width / 2
    camera.right = viewport.width / 2
    camera.top = viewport.height / 2
    camera.bottom = -viewport.height / 2
    camera.updateProjectionMatrix()
    requestFrame()
  }
  function paint(time: number) {
    raf = 0
    if (destroyed || failed || !inView || document.hidden) return
    const delta = previousTime ? Math.min((time - previousTime) / 1000, .05) : 1 / 60
    previousTime = time
    const hostRect = host.getBoundingClientRect()
    const progress = clamp((viewport.height - hostRect.top) / (hostRect.height + viewport.height))
    host.dataset.progress = progress.toFixed(4)
    let moving = false
    for (const surface of surfaces) {
      const rect = surface.image.getBoundingClientRect()
      const plane = editorialPlane(rect, viewport)
      surface.mesh.position.set(plane.x, plane.y, 0)
      surface.mesh.scale.set(plane.width, plane.height, 1)
      surface.mesh.material.uniforms.uBounds.value.set(plane.width, plane.height)
      const visible = rect.bottom > 0 && rect.top < viewport.height && rect.width > 0 && rect.height > 0
      surface.mesh.visible = visible
      surface.target = surface.focused ? 1 : editorialReveal(rect.top, rect.height, viewport.height)
      // Native scroll controls the target. A finite settling tail lets the material front
      // read as assembly; reversing scroll reverses this same state, without a new tween.
      if (!visible || surface.focused) surface.progress = surface.target
      else {
        const distance = surface.target - surface.progress
        surface.progress += distance * (1 - Math.exp(-delta / .19))
        if (Math.abs(distance) < .002) surface.progress = surface.target
        else moving = true
      }
      surface.mesh.material.uniforms.uReveal.value = surface.progress
    }
    try {
      // Clip the fixed canvas to this gallery's current document extent, never to HOME/nav.
      const bottom = clamp(viewport.height - hostRect.bottom, 0, viewport.height)
      const top = clamp(viewport.height - hostRect.top, 0, viewport.height)
      renderer.setScissorTest(false)
      renderer.clear()
      renderer.setScissor(0, bottom, viewport.width, Math.max(0, top - bottom))
      renderer.setScissorTest(true)
      renderer.render(scene, camera)
      if (failed || destroyed || shaderDiagnostic) return
      if (surfaces.length) {
        host.dataset.state = 'ready'
        host.dataset.static = 'false'
        surfaces.forEach(surface => { surface.slot.dataset.rendered = 'true' })
      }
      frameCount++
      host.dataset.renderState = moving ? 'animating' : 'settled'
    } catch (error) {
      if (shaderDiagnostic) return
      fallback('render-failed', error)
      return
    }
    if (moving) requestFrame()
    else previousTime = 0
  }

  const prepare = async (image: HTMLImageElement) => {
    if (destroyed || failed || shaderDiagnostic || pending.has(image) || surfaces.some(surface => surface.image === image)) return
    if (!image.complete || image.naturalWidth === 0) return
    pending.add(image)
    let ownedRaster: HTMLCanvasElement | undefined
    let ownedTexture: CanvasTexture | undefined
    let ownedMaterial: ShaderMaterial | undefined
    let ownedGeometry: PlaneGeometry | undefined
    let committed = false
    try {
      await image.decode()
      if (destroyed || failed || shaderDiagnostic) return
      const slot = image.closest<HTMLElement>('.works-editorial-image')!
      const anchor = image.closest<HTMLAnchorElement>('a[data-record-id]')!
      const uploaded = editorialTextureSize(image.naturalWidth, image.naturalHeight, viewport.width <= 639)
      const raster = ownedRaster = document.createElement('canvas')
      raster.width = uploaded.width
      raster.height = uploaded.height
      const context = raster.getContext('2d', { alpha: false })
      if (!context) return
      context.drawImage(image, 0, 0, uploaded.width, uploaded.height)
      const texture = ownedTexture = new CanvasTexture(raster)
      texture.colorSpace = SRGBColorSpace
      texture.generateMipmaps = true
      const material = ownedMaterial = new ShaderMaterial({
        vertexShader: vertex, fragmentShader: fragment, transparent: true, depthTest: false, depthWrite: false,
        uniforms: {
          uImage: { value: texture },
          uImageSize: { value: new Vector2(image.naturalWidth, image.naturalHeight) },
          uBounds: { value: new Vector2(uploaded.width, uploaded.height) },
          uReveal: { value: 0 },
          uInk: { value: new Color('#393a34') },
        },
      })
      const mesh = new Mesh(ownedGeometry = new PlaneGeometry(1, 1), material)
      mesh.frustumCulled = false
      mesh.renderOrder = images.indexOf(image)
      const surface: Surface = { image, slot, anchor, mesh, texture, raster, progress: 0, target: 0, focused: anchor === document.activeElement, uploaded }
      surfaces.push(surface)
      scene.add(mesh)
      committed = true
      requestFrame()
    } catch (error) {
      // The actual DOM image stays visible when this individual enhancement cannot decode.
      if (!destroyed && !failed) {
        const slot = image.closest<HTMLElement>('.works-editorial-image')!
        slot.dataset.rendered = 'false'
        slot.dataset.enhancementError = error instanceof Error ? error.message : 'image-prepare-failed'
      }
    } finally {
      if (!committed) {
        ownedGeometry?.dispose()
        ownedMaterial?.dispose()
        ownedTexture?.dispose()
        if (ownedRaster) ownedRaster.width = ownedRaster.height = 0
      }
      pending.delete(image)
    }
  }

  const captureSelection = (anchor: HTMLAnchorElement): EditorialSelection | null => {
    const image = anchor.querySelector<HTMLImageElement>('img')
    if (!image) return null
    const rect = image.getBoundingClientRect()
    const surface = surfaces.find(candidate => candidate.image === image)
    return {
      recordId: anchor.dataset.recordId!, href: anchor.href, image: image.currentSrc || image.src,
      nativeAspect: (image.naturalWidth || image.width) / (image.naturalHeight || image.height),
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      reveal: surface?.progress ?? 1,
    }
  }
  const onSelect = (event: Event) => {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-record-id]') : null
    if (!anchor || !host.contains(anchor)) return
    selected = captureSelection(anchor)
    host.dataset.selectedId = anchor.dataset.recordId
    host.dispatchEvent(new CustomEvent('works:selection', { bubbles: true, detail: selected }))
    // The actual link owns navigation. No interception, page clone or invented Detail.
  }
  const onFocus = () => {
    for (const surface of surfaces) surface.focused = surface.anchor === document.activeElement
    requestFrame()
  }
  const onVisibility = () => {
    if (destroyed || failed) return
    if (document.hidden) { stopFrame(); host.dataset.renderState = 'hidden' }
    else requestFrame()
  }
  const onContextLost = () => fallback('context-lost')
  const onResize = () => {
    if (destroyed || failed) return
    try { measureViewport() }
    catch (error) { fallback('viewport-resize-failed', error) }
  }
  const snapshot = () => ({
    engine: 'dom-webgl-editorial', state: host.dataset.state, renderState: host.dataset.renderState,
    progress: Number(host.dataset.progress || 0), frameCount, rafPending: !!raf,
    viewport, selected, textureCount: surfaces.length, resourcesReleased, failureDetail, shaderDiagnostic, pendingDecodes: pending.size,
    surfaces: surfaces.map(surface => ({
      id: surface.anchor.dataset.recordId, reveal: surface.progress, target: surface.target,
      rect: surface.image.getBoundingClientRect().toJSON(), upload: surface.uploaded,
      plane: { x: surface.mesh.position.x, y: surface.mesh.position.y, width: surface.mesh.scale.x, height: surface.mesh.scale.y },
    })),
  })
  const selection = () => selected
  host.__worksSnapshot = snapshot
  host.__worksSelection = selection

  const observer = new IntersectionObserver(entries => {
    if (destroyed || failed) return
    inView = entries.some(entry => entry.isIntersecting)
    renderer.domElement.style.visibility = inView ? 'visible' : 'hidden'
    if (inView) requestFrame()
    else { stopFrame(); host.dataset.renderState = 'offscreen' }
  })
  observer.observe(host)
  const resize = new ResizeObserver(onResize)
  resize.observe(host)
  images.forEach(image => {
    resize.observe(image)
    const load = () => { void prepare(image) }
    image.addEventListener('load', load)
    removeImageListeners.push(() => image.removeEventListener('load', load))
    void prepare(image)
  })
  window.addEventListener('scroll', requestFrame, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  window.visualViewport?.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  host.addEventListener('click', onSelect)
  host.addEventListener('focusin', onFocus)
  host.addEventListener('focusout', onFocus)
  renderer.domElement.addEventListener('webglcontextlost', onContextLost)
  const initial = host.getBoundingClientRect()
  inView = initial.bottom > 0 && initial.top < window.innerHeight
  try { measureViewport() }
  catch (error) { fallback('viewport-init-failed', error) }

  // Failure and normal unmount share this owner. Failure releases rendering resources
  // immediately; the lightweight native-link identity adapter remains until unmount.
  function releaseResources() {
    if (resourcesReleased) return
    resourcesReleased = true
    stopFrame()
    observer.disconnect()
    resize.disconnect()
    removeImageListeners.forEach(remove => remove())
    window.removeEventListener('scroll', requestFrame)
    window.removeEventListener('resize', onResize)
    window.visualViewport?.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    host.removeEventListener('focusin', onFocus)
    host.removeEventListener('focusout', onFocus)
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
    pending.clear()
    for (const image of images) {
      const slot = image.closest<HTMLElement>('.works-editorial-image')
      if (slot) {
        delete slot.dataset.rendered
        delete slot.dataset.enhancementError
      }
    }
    for (const surface of surfaces.splice(0)) {
      delete surface.slot.dataset.rendered
      scene.remove(surface.mesh)
      surface.mesh.geometry.dispose()
      surface.mesh.material.dispose()
      surface.texture.dispose()
      surface.raster.width = surface.raster.height = 0
    }
    renderer.debug.onShaderError = null
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
    renderer.domElement.width = renderer.domElement.height = 0
  }

  return () => {
    if (destroyed) return
    destroyed = true
    releaseResources()
    host.removeEventListener('click', onSelect)
    if (host.__worksSnapshot === snapshot) delete host.__worksSnapshot
    if (host.__worksSelection === selection) delete host.__worksSelection
    delete host.dataset.selectedId
  }
}
