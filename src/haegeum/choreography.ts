import type { HeroContinuation } from '../hero/useHeroMotion.ts'
import { clampProgress } from '../hero/motion.ts'
const ramp = (p: number, a: number, b: number) => { const t = clampProgress((p - a) / (b - a)); return t * t * (3 - 2 * t) }
const mix = (a: number, b: number, t: number) => a + (b - a) * t
// Percentage keyframes describe framing, not physical instrument dimensions or a camera model.
type Pose = { at: number; box: number[]; width: number; focus: number[]; target: number[] }
const desktop: Pose[] = [
  { at: .42, box: [.16, .03, .14, .97], width: 1.08, focus: [.67, .59], target: [.66, .6] },
  { at: .57, box: [.20, .04, .12, .06], width: 1.08, focus: [.55, .59], target: [.54, .57] },
  { at: .76, box: [.12, .03, .08, .32], width: 2.25, focus: [.714, .612], target: [.68, .57] },
  { at: 1, box: [.12, .03, .08, .32], width: 2.25, focus: [.714, .612], target: [.68, .57] },
]
const mobile: Pose[] = [
  { at: .42, box: [.30, .02, .16, .98], width: 1.3, focus: [.66, .59], target: [.62, .57] },
  { at: .57, box: [.30, .02, .16, .02], width: 1.3, focus: [.60, .59], target: [.56, .55] },
  { at: .76, box: [.24, .02, .12, .12], width: 2.7, focus: [.714, .612], target: [.61, .59] },
  { at: 1, box: [.24, .02, .12, .12], width: 2.7, focus: [.714, .612], target: [.61, .59] },
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
    const exit = ramp(p, .17, .36), head = ramp(p, .23, .38), incoming = ramp(p, .42, .56), full = ramp(p, .81, .97)
    number(scene, '--hero-exit', exit); number(scene, '--head-focus', head); number(scene, '--incoming', incoming); number(scene, '--full-reveal', full)
    // The original pair stays in the same DOM. It rotates into the peg/string axis, then opens along the bow.
    const heroP = clampProgress(p / .24), aperture = Number(scene.style.getPropertyValue('--aperture'))
    const pointerY = Number(scene.style.getPropertyValue('--pointer-y'))
    const photoW = small ? .86 : .735, photoH = small ? .73 : 1
    const photoBox = [(small ? .15 : 0)+photoH*head*(small ? .02 : .025), head*.08+incoming*1.1+photoW*((1-aperture)*.45+head*(small ? .17 : .38)), (small ? .12 : 0)+photoH*head*(small ? .12 : .08), (small ? .14 : .265)-head*.08-incoming*1.1+photoW*(1-aperture)*.55]
    set(scene.querySelector<HTMLElement>('.poster-type-front')!, 'clip-path', inset(photoBox))
    number(scene,'--index-entry',ramp(p,.32,.38))
    const header = scene.closest('.hero-shell')?.querySelector<HTMLElement>('header.editorial-navigation')
    if (header) number(header,'--navigation-paper',ramp(p,.33,.42))
    const start = small ? [0, .67 * h - heroP * 17, .97 * w, -14] : [.10 * w, .59 * h - heroP * 29 + pointerY * 3, .84 * w, -10 + heroP * 1.4]
    const lineHead = small ? [.30 * w, .39 * h, .33 * h, 88] : [.425 * w, .32 * h, .40 * h, 88]
    const lineBow = small ? [.04 * w, .55 * h, .91 * w, 1.4] : [.07 * w, .57 * h, .88 * w, 1.4]
    const lineBody = small ? [.52 * w, .34 * h, .40 * h, 86] : [.59 * w, .29 * h, .43 * h, 86]
    // Final pair follows the generated editorial image only as a visual alignment, not physical evidence.
    const imageW = Math.min(small ? w * .98 : w * .48, h * (small ? .76 : .9) / 1.5)
    const imageX = small ? (w - imageW) * .6 : w * .68 - imageW * .5
    const imageY = small ? h * .22 : h * .055
    const lineFull = [imageX + imageW * .414, imageY + imageW * .84, imageW * .51, 90]
    const a = start.map((v,i) => mix(v,lineHead[i],head)), b = a.map((v,i) => mix(v,lineBow[i],incoming)), c = b.map((v,i) => mix(v,lineBody[i],ramp(p,.62,.76))), line = c.map((v,i) => mix(v,lineFull[i],full))
    const lines = scene.querySelectorAll<HTMLElement>('.tension-line')
    lines.forEach((el,i) => {
      number(el, 'left', line[0] + (head > 0 ? i * mix(0, 5, head) : 0), 'px')
      number(el, 'top', line[1] + i * mix((small ? 3 + aperture * 3 + heroP * 4 : 3 + aperture * 4 + heroP * 5 - pointerY), 0, head), 'px')
      number(el, 'width', line[2], 'px');set(el,'right','auto');set(el,'transform',`rotate(${line[3].toFixed(4)}deg)`)
    })
    const pose = poseAt(small ? mobile : desktop, p), field = scene.querySelector<HTMLElement>('.playing-field')!, im = scene.querySelector<HTMLElement>('.playing-image')!
    set(field,'clip-path',inset(pose.box));set(field,'visibility',p <= .42 || still ? 'hidden':'visible')
    const iw = w * pose.width
    number(im,'width',iw,'px');number(im,'height',iw * 1.5,'px');set(im,'transform',`translate(${(w*pose.target[0]-iw*pose.focus[0]).toFixed(3)}px, ${(h*pose.target[1]-iw*1.5*pose.focus[1]).toFixed(3)}px)`)
    const ef = scene.querySelector<HTMLElement>('.editorial-field')!, ei = scene.querySelector<HTMLElement>('.editorial-image')!
    const finalBox = small ? [.22,.02,.07,.02] : [.055,.055,.045,.40]
    set(ef,'clip-path',inset([finalBox[0],finalBox[1],finalBox[2],mix(1-finalBox[1],finalBox[3],full)]));set(ef,'visibility',p <= .81 || still ? 'hidden':'visible')
    number(ei,'width',imageW,'px');number(ei,'height',imageW*1.5,'px');set(ei,'transform',`translate(${imageX.toFixed(3)}px,${imageY.toFixed(3)}px)`)
    const index = p < .24 ? -1 : p < .48 ? 0 : p < .66 ? 1 : p < .86 ? 2 : 3
    scene.dataset.instrumentStage = ['hero','head','bow','resonance','full'][index+1]
    // One word at a time; the changing word rolls through its own editorial mask.
    const boundaries = [.24,.48,.66,.86,1.1], mask = index < 0 ? 0 : Math.min(ramp(p,boundaries[index],boundaries[index]+.035), 1-ramp(p,boundaries[index+1]-.02,boundaries[index+1]))
    scene.querySelectorAll<HTMLElement>('.instrument-keyword').forEach(el => {
      el.querySelectorAll<HTMLElement>('span').forEach((word,i) => {set(word,'display',i === index ? 'block':'none');set(word,'transform',`translateY(${((1-mask)*12).toFixed(3)}%)`);set(word,'clip-path',`inset(${((1-mask)*100).toFixed(3)}% 0 0)`)})
      number(el,'--keyword-y',index===0 ? (small ? 10 : 25) : index===1 ? (small ? 17 : 69) : index===2 ? (small ? 15 : 14) : (small ? 9 : 62),'%')
    })
    const label = scene.querySelector<HTMLElement>('.stage-subject')!, count = scene.querySelector<HTMLElement>('.stage-number')!
    const subjects = ['HEAD / PEG','STRINGS / BOW','RESONANCE','FULL HAEGEUM']
    if (index >= 0) { if(label.textContent!==subjects[index])label.textContent=subjects[index];count.textContent='0'+(index+1) }
    const front=scene.querySelector<HTMLElement>('.keyword-front')!
    set(front,'clip-path',index===0?inset(photoBox):index===3?inset([pose.box[0],pose.box[1]+full*1.1,pose.box[2],pose.box[3]-full*1.1]):inset(pose.box))
  },
}
