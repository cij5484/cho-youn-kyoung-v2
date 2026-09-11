import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const renderer = readFileSync(new URL('../src/audio/AudioSignature.tsx', import.meta.url), 'utf8')
const compact = renderer.replace(/\s+/g, ' ')

test('audio signature has no pitch-to-position dependency', () => {
  assert.doesNotMatch(renderer, /pitchMidi|pitchConfidence|pitchHeight|pitchWeight|pitchInfluence/)
  assert.doesNotMatch(renderer, /freePoint/)
  assert.ok(compact.includes('y: .5 - Math.cos(sweep) * .2 * bowPreset.verticalRange * bowRange,'))
})

test('authored energy damping, player bounds and continuous handoff remain intact', () => {
  assert.ok(compact.includes('const bowPreset = tuningPresets.HOME_SIGNATURE'))
  assert.ok(compact.includes('bowSweep += travel'))
  assert.ok(compact.includes('bowPhrase += travel * (bowPreset.horizontalActivity + .04 * response.haegeum)'))
  assert.ok(compact.includes('orbit.advance(dt * 1.5, false)'))
  assert.doesNotMatch(renderer, /snapshot\(\)\.playing/)
  assert.ok(compact.includes('Math.cos(beatPhase * 3) * interactionTuning.janggu.radius * (width <= 600 ? 2 : 1)'))
  assert.ok(compact.includes('Math.sin(beatPhase * 3) * interactionTuning.janggu.depth'))
  assert.ok(compact.includes('signal.janggu * interactionTuning.janggu.jumpHeight) / (halfHeight * 3)'))
  assert.ok(compact.includes('Math.tanh(verticalBias + (projected.y - .5) * verticalRange + vibration) * halfHeight'))
  assert.ok(compact.includes('cy + (projectedY - cy) * (width <= 600 ? .28 : 1)'))
  assert.doesNotMatch(renderer, /projectedY < cy|box.height \/ 2 - 20/)
  assert.ok(compact.includes('point[position] = target[position] + target[velocity] * dt + (delta + step) * decay'))
  assert.match(renderer, /copy\(signatureAudioHandoff\.getPagePair\(ambient\(now\)\)!\)/)
  assert.match(renderer, /signatureAudioHandoff\.setActive\(false\); mode = 'tail'/)
})
