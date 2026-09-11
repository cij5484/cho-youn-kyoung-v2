import {
  Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, SRGBColorSpace,
  TextureLoader, Vector2, WebGLRenderer, WebGLRenderTarget, type Texture,
} from 'three'

// Dondre Green /stories published index.js: two textures, a soft diagonal mask,
// progress 0→1 over 1s expo.out. Its class is called displacement, but does not deform UVs.
// Re-expressed here with native-aspect containment and interruption snapshots.
const fragmentShader = `
  uniform sampler2D fromImage, toImage;
  uniform vec2 imageAspects;
  uniform float stageAspect, progress;
  varying vec2 vUv;
  vec4 contained(sampler2D image, vec2 uv, float aspect) {
    vec2 size = vec2(min(1., aspect / stageAspect), min(1., stageAspect / aspect));
    vec2 point = (uv - .5) / size + .5;
    if (min(point.x, point.y) < 0. || max(point.x, point.y) > 1.) return vec4(0.);
    return texture2D(image, point);
  }
  void main() {
    float diagonal = (vUv.x - vUv.y + 1.) * .5;
    float edge = progress * 1.5;
    float reveal = progress <= 0. ? 0. : 1. - smoothstep(edge - .5, edge, diagonal);
    gl_FragColor = mix(contained(fromImage, vUv, imageAspects.x), contained(toImage, vUv, imageAspects.y), reveal);
    #include <colorspace_fragment>
  }
`

let rememberedWorkId = ''

export function mountArchivePreview(root: HTMLElement): () => void {
  const media = matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const rows = [...root.querySelectorAll<HTMLElement>('[data-preview-row]')]
  const links = rows.map(row => row.querySelector<HTMLAnchorElement>('a')!)
  const archive = root.closest<HTMLElement>('.atmospheric-archive')!
  const originalRows = [...archive.querySelectorAll<HTMLElement>('[data-archive-row]')]
  const originalIds = originalRows.map(row => row.dataset.workId!)
  const stage = root.querySelector<HTMLElement>('.archive-preview-stage')!
  const shown = () => media.matches && archive.dataset.indexView === 'false'
  const imageLink = root.querySelector<HTMLAnchorElement>('.archive-preview-image')!
  const image = imageLink.querySelector('img')!
  const host = root.querySelector<HTMLElement>('.archive-preview-canvas')!
  const caption = root.querySelector<HTMLElement>('[data-preview-caption]')!
  const year = root.querySelector<HTMLElement>('[data-preview-year]')!
  const textures = new Map<string, Texture>()
  const scene = new Scene(), camera = new OrthographicCamera(-1, 1, 1, -1, 0, 2)
  const geometry = new PlaneGeometry(2, 2)
  const material = new ShaderMaterial({ transparent: true, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
    fragmentShader, uniforms: { fromImage: { value: null }, toImage: { value: null },
      imageAspects: { value: new Vector2(1, 1) }, stageAspect: { value: 1 }, progress: { value: 1 } } })
  scene.add(new Mesh(geometry, material))
  let renderer: WebGLRenderer | undefined, disposed = false, sequence = 0
  let selected = Math.max(0, links.findIndex(link => link.dataset.workId === rememberedWorkId))
  let frame = 0, started = 0, width = 0, height = 0, snapshotIndex = 0
  let snapshots: WebGLRenderTarget[] = []
  const stop = () => { cancelAnimationFrame(frame); frame = 0 }
  const render = () => { if (renderer && width && height && !document.hidden) renderer.render(scene, camera) }
  function animate(now: number) {
    frame = 0
    if (disposed || document.hidden) return
    const elapsed = Math.min(1, (now - started) / 1000)
    material.uniforms.progress.value = elapsed === 1 ? 1 : 1 - 2 ** (-10 * elapsed)
    render()
    if (elapsed < 1) frame = requestAnimationFrame(animate)
  }
  function select(index: number) {
    selected = index
    const link = links[index], token = ++sequence
    rememberedWorkId = link.dataset.workId!
    stage.dataset.workId = rememberedWorkId
    rows.forEach((row, i) => { row.dataset.previewActive = String(index === i) })
    imageLink.href = link.href
    imageLink.setAttribute('aria-label', `${link.dataset.previewTitle} — 기록 보기`)
    image.src = link.dataset.previewSource!
    image.dataset.previewAspect = link.dataset.previewAspect!
    image.alt = link.dataset.previewTitle!
    caption.textContent = link.dataset.previewTitle!
    year.textContent = link.dataset.previewDate!
    if (!shown() || reduced.matches || !width || !height) return
    const src = link.dataset.previewSource!, aspect = Number(link.dataset.previewAspect)
    const apply = (texture: Texture) => {
      if (disposed || sequence !== token || !shown()) return
      if (!renderer) {
        try {
          renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
          renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
          renderer.setSize(width, height, false)
          host.append(renderer.domElement)
        } catch { return }
      }
      stop()
      const previous = material.uniforms.toImage.value as Texture | null
      if (previous && material.uniforms.progress.value < 1) {
        const size = renderer.getDrawingBufferSize(new Vector2())
        if (!snapshots.length) snapshots = [new WebGLRenderTarget(size.x, size.y), new WebGLRenderTarget(size.x, size.y)]
        const target = snapshots[snapshotIndex = 1 - snapshotIndex]
        target.setSize(size.x, size.y)
        renderer.setRenderTarget(target); renderer.render(scene, camera); renderer.setRenderTarget(null)
        material.uniforms.fromImage.value = target.texture
        material.uniforms.imageAspects.value.x = width / height
      } else {
        material.uniforms.fromImage.value = previous ?? texture
        material.uniforms.imageAspects.value.x = previous ? material.uniforms.imageAspects.value.y : aspect
      }
      material.uniforms.toImage.value = texture
      material.uniforms.imageAspects.value.y = aspect
      material.uniforms.stageAspect.value = width / height
      material.uniforms.progress.value = previous ? 0 : 1
      imageLink.dataset.renderer = 'ready'
      started = performance.now()
      if (previous) frame = requestAnimationFrame(animate)
      else render()
    }
    const cached = textures.get(src)
    if (cached) apply(cached)
    else new TextureLoader().load(src, texture => {
      if (disposed) { texture.dispose(); return }
      texture.colorSpace = SRGBColorSpace
      const existing = textures.get(src)
      if (existing) { texture.dispose(); apply(existing) }
      else { textures.set(src, texture); apply(texture) }
    }, undefined, () => { if (token === sequence) delete imageLink.dataset.renderer })
  }
  const events = links.map((link, index) => {
    const activate = () => { if (selected !== index) select(index) }
    link.addEventListener('pointerenter', activate); link.addEventListener('focus', activate)
    return () => { link.removeEventListener('pointerenter', activate); link.removeEventListener('focus', activate) }
  })
  const resize = new ResizeObserver(() => {
    const rect = host.getBoundingClientRect()
    width = Math.round(rect.width); height = Math.round(rect.height)
    if (!width || !height || !shown()) { stop(); return }
    renderer?.setSize(width, height, false)
    material.uniforms.stageAspect.value = width / height
    if (!material.uniforms.toImage.value) select(selected)
    else { material.uniforms.progress.value = 1; stop(); render() }
  })
  resize.observe(host)
  const mode = () => {
    stop(); sequence++
    // Only the visible preview owns the shared-image return slot. Spatial mode
    // restores the original catalog slots; Album's transition owner is unchanged.
    originalRows.forEach((row, index) => {
      if (shown()) delete row.dataset.workId
      else row.dataset.workId = originalIds[index]
    })
    if (!shown() || reduced.matches) delete imageLink.dataset.renderer
    select(selected)
  }
  const assembly = new MutationObserver(mode)
  assembly.observe(archive, { attributes: true, attributeFilter: ['data-index-view'] })
  const visibility = () => { stop(); if (!document.hidden) { material.uniforms.progress.value = 1; render() } }
  media.addEventListener('change', mode); reduced.addEventListener('change', mode)
  document.addEventListener('visibilitychange', visibility)
  mode()
  return () => {
    disposed = true; sequence++; stop(); resize.disconnect(); assembly.disconnect(); events.forEach(remove => remove())
    originalRows.forEach((row, index) => { row.dataset.workId = originalIds[index] })
    media.removeEventListener('change', mode); reduced.removeEventListener('change', mode)
    document.removeEventListener('visibilitychange', visibility)
    textures.forEach(texture => texture.dispose()); snapshots.forEach(target => target.dispose())
    geometry.dispose(); material.dispose(); renderer?.dispose(); renderer?.domElement.remove()
    delete imageLink.dataset.renderer
  }
}
