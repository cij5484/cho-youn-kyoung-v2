import { useEffect, useRef } from 'react'
import trayUrl from './assets/cd-tray-prototype.glb?url'

/** User's GLB, viewed from above in the existing folding paper slot. No perpetual render loop. */
export default function TraySurface({ artwork }: { artwork: string }) {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = host.current!
    let disposed = false, cleanup = () => {}
    async function load() {
      const [THREE, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
        import('three'), import('three/addons/loaders/GLTFLoader.js'), import('three/addons/environments/RoomEnvironment.js'),
      ])
      if (disposed) return
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth <= 700 ? 1 : 1.5))
      renderer.setClearColor(0x000000, 0); renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      const scene = new THREE.Scene(), camera = new THREE.OrthographicCamera(-.075, .075, .075, -.075, .001, 2)
      camera.position.set(0, .3, 0); camera.up.set(0, 0, -1); camera.lookAt(0, 0, 0)
      const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment()
      const environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; scene.environmentIntensity = .7
      room.dispose(); pmrem.dispose()
      scene.add(new THREE.HemisphereLight(0xffffff, 0x9b9384, 1))
      const light = new THREE.DirectionalLight(0xffffff, 2); light.position.set(-.2, .5, .2); scene.add(light)
      const materials = new Set<InstanceType<typeof THREE.Material>>(), geometries = new Set<InstanceType<typeof THREE.BufferGeometry>>()
      const textures = new Set<InstanceType<typeof THREE.Texture>>()
      const disposeObject = (object: InstanceType<typeof THREE.Object3D>) => object.traverse(child => {
        if (child instanceof THREE.Mesh) { geometries.add(child.geometry); for (const material of (Array.isArray(child.material) ? child.material : [child.material])) materials.add(material) }
      })
      const draw = () => {
        if (disposed || !element.clientWidth || !element.clientHeight || document.hidden) return
        const width = element.clientWidth, height = element.clientHeight, aspect = width / height
        const halfHeight = Math.max(.069, .071 / aspect)
        camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect; camera.top = halfHeight; camera.bottom = -halfHeight
        camera.updateProjectionMatrix(); renderer.setSize(width, height, false); renderer.render(scene, camera)
      }
      const resize = new ResizeObserver(draw)
      cleanup = () => {
        resize.disconnect(); document.removeEventListener('visibilitychange', draw)
        geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose())
        textures.forEach(texture => texture.dispose()); environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
      }
      const gltf = await new GLTFLoader().loadAsync(trayUrl)
      disposeObject(gltf.scene)
      if (disposed) { geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); return }
      // The prototype's neutral disc has no UVs. Keep our authentic printed CD above the tray.
      const disc = gltf.scene.getObjectByName('R02_CD_Disc'); if (disc) disc.visible = false
      scene.add(gltf.scene)
      const paperTexture = await new THREE.TextureLoader().loadAsync(artwork)
      if (disposed) { paperTexture.dispose(); return }
      textures.add(paperTexture)
      paperTexture.colorSpace = THREE.SRGBColorSpace
      const paper = new THREE.Mesh(new THREE.PlaneGeometry(.136, .132), new THREE.MeshBasicMaterial({ map: paperTexture, toneMapped: false }))
      paper.rotation.x = -Math.PI / 2; paper.position.y = -.0002; scene.add(paper); disposeObject(paper)
      element.append(renderer.domElement); element.dataset.state = 'ready'
      resize.observe(element); document.addEventListener('visibilitychange', draw); draw()
    }
    void load().catch(() => { cleanup(); if (!disposed) element.dataset.state = 'fallback' })
    return () => { disposed = true; cleanup() }
  }, [artwork])
  return <div ref={host} className="exhibit-tray-surface" data-state="loading" aria-hidden="true"/>
}
