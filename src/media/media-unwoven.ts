import * as THREE from 'three'
import { mediaLoomFrame, mediaLoomGeometry, mediaLoomState } from './media-loom-model'

// Geometry and deformation mechanics studied from Clément Grellier's Unwoven:
// https://github.com/clementgrellier/unwoven/blob/main/index.html
// This is a finite, scroll-driven film frame, with no marquee or autoplay clock.
const vertexShader = `
  attribute float aThread;
  attribute float aRim;
  uniform vec2 uFrame;
  uniform float uTear;
  uniform float uProgress;
  uniform float uScale;
  uniform float uTravel;
  varying vec2 vUv;
  varying float vRim;
  varying float vTear;
  varying float vSeed;
  float hash(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
  void main() {
    vUv = uv; vRim = aRim;
    float seed = hash(aThread + 31.0);
    float other = hash(aThread * 3.7 + 19.0);
    float tear = uTear * (.78 + .22 * sin(uv.x * 3.14159));
    float release = pow(tear, 1.4);
    vec3 p = position;
    p.xy *= uFrame * uScale;
    float direction = seed < .5 ? -1.0 : 1.0;
    p.x += direction * release * uTravel * (.18 + other * .82);
    p.y += (seed - .5) * uFrame.y * .42 * release * release;
    p.y += sin(uv.x * 8.0 + uProgress * 13.0 + seed * 6.2831)
      * uFrame.y * (.018 + other * .028) * release;
    vTear = tear; vSeed = seed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const fragmentShader = `
  uniform sampler2D uImage;
  uniform sampler2D uNext;
  uniform float uProgress;
  varying vec2 vUv;
  varying float vRim;
  varying float vTear;
  varying float vSeed;
  void main() {
    float rim = abs(vRim);
    float core = mix(.86, .16 + vSeed * .12, smoothstep(0.0, .85, vTear));
    float band = 1.0 - smoothstep(core - .08, core + .06, rim);
    float alpha = mix(1.0, band, smoothstep(.03, .30, vTear));
    vec3 color = mix(texture2D(uImage, vUv).rgb, texture2D(uNext, vUv).rgb, smoothstep(.38, .62, uProgress));
    color *= 1.0 - vTear * .22 * rim * rim;
    color = mix(color, vec3(.875, .854, .807), smoothstep(.55, 1.0, vTear) * .40);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`

export function mountMediaLoom({ host, source, aspect, sources }: { host: HTMLElement; source: string; aspect: number; sources: string[] }) {
  let disposed = false
  const layout = { aspect }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const frame = () => {
    const size = mediaLoomFrame(host.clientWidth, host.clientHeight, layout.aspect)
    host.style.setProperty('--loom-frame-width', `${size.width}px`)
    host.style.setProperty('--loom-frame-height', `${size.height}px`)
    return size
  }
  const progress = { value: 0 }
  frame()
  // Real still remains the complete experience without motion or WebGL.
  if (reduced.matches) {
    const observer = new ResizeObserver(frame)
    observer.observe(host)
    return { dispose: () => observer.disconnect(), scrub: (_from: string, _to: string, ratio: number) => { layout.aspect = ratio; frame() } }
  }
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  } catch {
    const observer = new ResizeObserver(frame)
    observer.observe(host)
    return { dispose: () => observer.disconnect(), scrub: (_from: string, _to: string, ratio: number) => { layout.aspect = ratio; frame() } }
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none'
  host.append(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10)
  camera.position.z = 1
  const data = mediaLoomGeometry()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.position, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(data.uv, 2))
  geometry.setAttribute('aRim', new THREE.Float32BufferAttribute(data.rim, 1))
  geometry.setAttribute('aThread', new THREE.Float32BufferAttribute(data.thread, 1))
  geometry.setIndex(data.index)
  const uniforms = { uImage: { value: null as THREE.Texture | null }, uNext: { value: null as THREE.Texture | null }, uFrame: { value: new THREE.Vector2() },
    uTear: { value: 0 }, uProgress: { value: 0 }, uScale: { value: 1 }, uTravel: { value: 0 } }
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true,
    depthTest: false, depthWrite: false, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.frustumCulled = false
  scene.add(mesh)
  let visible = true
  let failed = false
  renderer.debug.onShaderError = () => { failed = true }
  const draw = () => {
    if (disposed || failed || reduced.matches || !visible || !uniforms.uImage.value || !uniforms.uNext.value) return
    const state = mediaLoomState(progress.value)
    const size = frame()
    uniforms.uFrame.value.set(size.width, size.height)
    uniforms.uProgress.value = state.progress
    uniforms.uTear.value = state.tear
    uniforms.uScale.value = 1
    uniforms.uTravel.value = Math.max(0, Math.min(size.width * .28, (host.clientWidth - size.width) / 2 - 2))
    renderer.render(scene, camera)
    if (failed) return
    host.dataset.loom = 'ready'
    host.dataset.phase = state.phase
    host.style.setProperty('--loom-progress', String(state.progress))
  }
  const resize = () => {
    const width = Math.max(1, host.clientWidth), height = Math.max(1, host.clientHeight)
    camera.left = -width / 2; camera.right = width / 2
    camera.top = height / 2; camera.bottom = -height / 2
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    frame(); draw()
  }
  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  const visibility = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting
    if (visible) draw()
  })
  visibility.observe(host)
  const contextLost = (event: Event) => {
    event.preventDefault()
    failed = true
    delete host.dataset.loom
  }
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  const motionChange = () => {
    if (reduced.matches) {
      delete host.dataset.loom
      renderer.domElement.hidden = true
    } else {
      renderer.domElement.hidden = false
      draw()
    }
  }
  reduced.addEventListener('change', motionChange)
  const textures = new Map<string, THREE.Texture>()
  let from = source, to = source
  const update = () => {
    uniforms.uImage.value = textures.get(from) ?? null
    uniforms.uNext.value = textures.get(to) ?? null
    const ready = !!uniforms.uImage.value && !!uniforms.uNext.value && !failed && !reduced.matches
    renderer.domElement.hidden = !ready
    if (!ready) { delete host.dataset.loom; delete host.dataset.phase }
    frame(); draw()
  }
  // Only the three section posters; keep both adjacent textures for reversible scroll blending.
  for (const url of new Set([source, ...sources])) {
    new THREE.TextureLoader().load(url, texture => {
      if (disposed) { texture.dispose(); return }
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      textures.set(url, texture)
      update()
    }, undefined, () => { if (!disposed) update() })
  }
  const scrub = (previous: string, next: string, ratio: number, value = 0) => {
    from = previous; to = next; layout.aspect = ratio; progress.value = value
    update()
  }
  const dispose = () => {
    disposed = true

    observer.disconnect(); visibility.disconnect()
    reduced.removeEventListener('change', motionChange)
    renderer.domElement.removeEventListener('webglcontextlost', contextLost)
    textures.forEach(texture => texture.dispose())
    geometry.dispose(); material.dispose(); renderer.dispose()
    renderer.domElement.remove()
    delete host.dataset.loom; delete host.dataset.phase
    host.style.removeProperty('--loom-progress')
  }
  return { dispose, scrub }
}
