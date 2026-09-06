import type { HeroContinuation } from '../hero/useHeroMotion.ts'
import { clampProgress } from '../hero/motion.ts'
import { instrumentAssets } from './assets.ts'
const ramp = (p: number, a: number, b: number) => { const t = clampProgress((p - a) / (b - a)); return t * t * (3 - 2 * t) }
const mix = (a: number, b: number, t: number) => a + (b - a) * t
// Percentage keyframes describe framing, not physical instrument dimensions or a camera model.
type Pose = { at: number; box: number[]; width: number; focus: number[]; target: number[] }
const desktop: Pose[] = [
  { at: .42, box: [.16, .03, .14, .97], width: 1.08, focus: [.67, .59], target: [.66, .6] },
  { at: .57, box: [.20, .04, .12, .06], width: 1.08, focus: [...instrumentAssets.playingFocus.contact], target: [.54, .57] },
  { at: .765, box: [.12, .03, .08, .32], width: 2.25, focus: [...instrumentAssets.playingFocus.body], target: [.68, .57] },
  { at: 1, box: [.12, .03, .08, .32], width: 2.30, focus: [...instrumentAssets.playingFocus.body], target: [.68, .57] },
]
const mobile: Pose[] = [
  { at: .42, box: [.30, .02, .16, .98], width: 1.3, focus: [.66, .59], target: [.62, .57] },
  { at: .57, box: [.30, .02, .16, .02], width: 1.3, focus: [.60, .59], target: [.56, .55] },
  { at: .765, box: [.24, .02, .12, .12], width: 2.7, focus: [...instrumentAssets.playingFocus.body], target: [.61, .59] },
  { at: 1, box: [.24, .02, .12, .12], width: 2.76, focus: [...instrumentAssets.playingFocus.body], target: [.61, .59] },
]
function poseAt(keys: Pose[], p: number) {
  const end = keys.findIndex(k => k.at >= p), i = end < 0 ? keys.length - 1 : Math.max(1, end)
  const a = keys[i - 1], b = keys[i], t = ramp(p, a.at, b.at)
  return { box: a.box.map((v, n) => mix(v, b.box[n], t)), width: mix(a.width, b.width, t), focus: a.focus.map((v, n) => mix(v, b.focus[n], t)), target: a.target.map((v, n) => mix(v, b.target[n], t)) }
}
function set(el: HTMLElement, key: string, value: string) { if (el.style.getPropertyValue(key) !== value) el.style.setProperty(key, value) }
const number = (el: HTMLElement, key: string, value: number, unit = '') => set(el, key, value.toFixed(4) + unit)
const inset = (box: number[]) => `inset(${box.map(n => (n * 100).toFixed(4) + '%').join(' ')})`
export const haegeumContinuation: HeroContinuation = {
  portraitEnd: .24,
  requiredImages: ".playing-image, .editorial-image",
  imageEntry: .40,
  pointerGain: p => 1 - ramp(p, .17, .36),
  paint(scene, stage, p, still) {
    const w = stage.clientWidth, h = stage.clientHeight, small = w < 640
    scene.dataset.fullSourceVisible = String(p > .795 && !still)
    const exit = ramp(p, .17, .36), head = ramp(p, .23, .40), incoming = ramp(p, .42, .575), full = ramp(p, .795, .975)
    number(scene, '--hero-exit', exit); number(scene, '--head-focus', head); number(scene, '--incoming', incoming); number(scene, '--full-reveal', full)
    // The original pair stays in the same DOM. It rotates into the peg/string axis, then opens along the bow.
    const heroP = clampProgress(p / .24), aperture = Number(scene.style.getPropertyValue('--aperture'))
    const pointerY = Number(scene.style.getPropertyValue('--pointer-y'))
    const photoW = small ? .86 : .735, photoH = small ? .73 : 1
    const headDrop = small ? 0 : head * h * .07
    number(scene, '--head-drop', headDrop, 'px')
    const photoBox = [(small ? .15 : 0)+headDrop/h+photoH*head*(small ? .02 : .025), head*.08+incoming*1.1+photoW*((1-aperture)*.45+head*(small ? .17 : .38)), (small ? .12 : 0)-headDrop/h+photoH*head*(small ? .12 : .08), (small ? .14 : .265)-head*.08-incoming*1.1+photoW*(1-aperture)*.55]
    set(scene.querySelector<HTMLElement>('.poster-type-front')!, 'clip-path', inset(photoBox))
    number(scene,'--index-entry',ramp(p,.32,.38))
    const header = scene.closest('.hero-shell')?.querySelector<HTMLElement>('header.editorial-navigation')
    if (header) number(header,'--navigation-paper',ramp(p,.33,.42))
    const start = small ? [0, .67 * h - heroP * 17, .97 * w, -14] : [.10 * w, .59 * h - heroP * 29 + pointerY * 3, .84 * w, -10 + heroP * 1.4]
    const lineHead = small ? [.30 * w, .39 * h, .33 * h, 88] : [.425 * w, .32 * h, .40 * h, 88]
    const lineBow = small ? [.04 * w, .55 * h, .91 * w, 1.4] : [.07 * w, .57 * h, .88 * w, 1.4]
    const lineBody = small ? [.52 * w, .34 * h, .40 * h, 86] : [.59 * w, .29 * h, .43 * h, 86]
    // The full frame grows from the resonator anchor while its image pulls back. This is editorial
    // alignment between disclosed sources, never a claim that the generated object's geometry is real.
    const ratio = instrumentAssets.full.height / instrumentAssets.full.width
    const indexTop = scene.querySelector<HTMLElement>('.instrument-index')!.offsetTop
    const mobileBottom = Math.min(h * .93, indexTop > 0 ? indexTop - 16 : h * .93)
    const fitHeight = small ? Math.max(1, Math.min(h * .71, mobileBottom - h * .22)) : h * .88
    const fitW = Math.min(small ? w * .98 : w * .48, fitHeight / ratio)
    const fitX = small ? (w - fitW) * .6 : w * .68 - fitW * .5
    const fitY = small ? h * .22 : h * .075
    const [bodyX, bodyY] = instrumentAssets.fullLandmarks.body
    const anchorX = mix(w * (small ? .61 : .68), fitX + fitW * bodyX, full)
    const anchorY = mix(h * (small ? .59 : .57), fitY + fitW * ratio * bodyY, full)
    const imageW = fitW * mix(small ? 2.1 : 2.7, 1, full)
    const imageX = anchorX - imageW * bodyX, imageY = anchorY - imageW * ratio * bodyY
    const top = instrumentAssets.fullLandmarks.stringTop, bottom = instrumentAssets.fullLandmarks.stringBottom
    const dx = (bottom[0] - top[0]) * imageW, dy = (bottom[1] - top[1]) * imageW * ratio
    const finalBox = small ? [.22,.02,1-mobileBottom/h,.02] : [.075,.055,.045,.40]
    const openingBox = [anchorY/h, 1-anchorX/w, 1-anchorY/h, anchorX/w]
    const opening = ramp(p,.795,.955), fullBox = finalBox.map((v,i) => mix(openingBox[i],v,opening))
    const stringY = imageY + imageW * ratio * top[1]
    const visibleStart = clampProgress((Math.max(stringY, fullBox[0] * h) - stringY) / dy)
    const visibleEnd = clampProgress(((1-fullBox[2])*h - stringY) / dy)
    const lineFull = [imageX + imageW * top[0] + dx*visibleStart, stringY + dy*visibleStart, Math.hypot(dx, dy)*Math.max(0,visibleEnd-visibleStart), Math.atan2(dy, dx) * 180 / Math.PI]
    const a = start.map((v,i) => mix(v,lineHead[i],head)), b = a.map((v,i) => mix(v,lineBow[i],incoming)), c = b.map((v,i) => mix(v,lineBody[i],ramp(p,.62,.76))), line = c.map((v,i) => mix(v,lineFull[i],full))
    const lines = scene.querySelectorAll<HTMLElement>('.tension-line')
    lines.forEach((el,i) => {
      number(el, 'left', line[0] + (head > 0 ? i * mix(0, 5, head) : 0), 'px')
      number(el, 'top', line[1] + i * mix((small ? 3 + aperture * 3 + heroP * 4 : 3 + aperture * 4 + heroP * 5 - pointerY), 0, head), 'px')
      number(el, 'width', line[2], 'px');set(el,'right','auto');set(el,'transform',`rotate(${line[3].toFixed(4)}deg)`)
    })
    const pose = poseAt(small ? mobile : desktop, p), field = scene.querySelector<HTMLElement>('.playing-field')!, im = scene.querySelector<HTMLElement>('.playing-image')!
    set(field,'clip-path',inset(pose.box));set(field,'visibility',p <= .42 || still ? 'hidden':'visible')
    const iw = w * pose.width * mix(1, .48, full), playingRatio = instrumentAssets.playing.height / instrumentAssets.playing.width
    number(im,'width',iw,'px');number(im,'height',iw * playingRatio,'px');set(im,'transform',`translate(${(mix(w*pose.target[0],anchorX,full)-iw*pose.focus[0]).toFixed(3)}px, ${(mix(h*pose.target[1],anchorY,full)-iw*playingRatio*pose.focus[1]).toFixed(3)}px)`)
    // The outgoing crop contracts onto the same body anchor, under the expanding full-image field.
    const closingBox = [anchorY/h-.04, 1-anchorX/w-.035, 1-anchorY/h-.04, anchorX/w-.035]
    const playingBox = pose.box.map((v,i) => mix(v,closingBox[i],ramp(p,.795,.895)))
    set(field,'clip-path',inset(playingBox))
    const ef = scene.querySelector<HTMLElement>('.editorial-field')!, ei = scene.querySelector<HTMLElement>('.editorial-image')!
    // Mask leads the pullback slightly: space opens before the object settles into its full silhouette.
    set(ef,'clip-path',inset(fullBox));set(ef,'visibility',p <= .795 || still ? 'hidden':'visible')
    number(ei,'width',imageW,'px');number(ei,'height',imageW*ratio,'px');set(ei,'transform',`translate(${imageX.toFixed(3)}px,${imageY.toFixed(3)}px)`)
    const index = p < .24 ? -1 : p < .48 ? 0 : p < .66 ? 1 : p < .855 ? 2 : 3
    scene.dataset.instrumentStage = ['hero','head','bow','resonance','full'][index+1]
    // One word at a time; the changing word rolls through its own editorial mask.
    const boundaries = [.24,.48,.66,.855,1.1], mask = index < 0 ? 0 : Math.min(ramp(p,boundaries[index],boundaries[index]+.03), 1-ramp(p,boundaries[index+1]-.025,boundaries[index+1]))
    scene.querySelectorAll<HTMLElement>('.instrument-keyword').forEach(el => {
      el.querySelectorAll<HTMLElement>('span').forEach((word,i) => {set(word,'display',i === index ? 'block':'none');set(word,'transform',`translateY(${((1-mask)*12).toFixed(3)}%)`);set(word,'clip-path',`inset(${((1-mask)*100).toFixed(3)}% 0 0)`)})
      number(el,'--keyword-y',index===0 ? (small ? 10 : 25) : index===1 ? (small ? 17 : mix(71,68,ramp(p,.48,.66))) : index===2 ? (small ? 15 : mix(16,12,ramp(p,.66,.855))) : (small ? 9 : mix(37,53,ramp(p,.855,.975))),'%')
    })
    const label = scene.querySelector<HTMLElement>('.stage-subject')!, count = scene.querySelector<HTMLElement>('.stage-number')!
    const subjects = ['HEAD / PEG','STRINGS / BOW','RESONANCE','FULL HAEGEUM']
    if (index >= 0) { if(label.textContent!==subjects[index])label.textContent=subjects[index];count.textContent='0'+(index+1) }
    const front=scene.querySelector<HTMLElement>('.keyword-front')!
    set(front,'clip-path',index===0?inset(photoBox):index===3?'inset(100%)':inset(playingBox))
  },
}
