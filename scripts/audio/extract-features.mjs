import FFT from 'fft.js'
const clamp = n => Math.max(0, Math.min(1, n))
const quantize = n => Math.round(clamp(n) * 1000)
const percentile = (values, p) => [...values].sort((a,b) => a-b)[Math.floor((values.length-1)*p)] || 0

/** Conventional Hann-window STFT + positive band flux. No learned model, beat grid or track-specific cues. */
export function extractFeatures(pcm, sampleRate, identity, featureRate = 25) {
  if (!pcm.length || !pcm.every(Number.isFinite)) throw new Error('PCM must contain finite samples')
  if (!Number.isInteger(sampleRate) || sampleRate < 8000 || !Number.isFinite(featureRate) || featureRate < 1 || featureRate > 60) throw new Error('Invalid sample/feature rate')
  const size = 2048, fft = new FFT(size), spectrum = fft.createComplexArray(), input = new Float64Array(size)
  const duration = pcm.length / sampleRate, count = Math.ceil(duration * featureRate)
  const energy = [], rawFlux = [], tonal = [], previous = new Float64Array(size / 2)
  const low = Math.ceil(250 * size / sampleRate), high = Math.min(size/2-1, Math.floor(3500 * size / sampleRate))
  for (let frame = 0; frame < count; frame++) {
    const center = Math.round(frame * sampleRate / featureRate)
    let power = 0, mean = 0
    for (let i = 0; i < size; i++) mean += pcm[center + i - size/2] || 0
    mean /= size
    for (let i = 0; i < size; i++) {
      const sample = (pcm[center + i - size/2] || 0) - mean
      power += sample * sample
      input[i] = sample * (.5 - .5 * Math.cos(2 * Math.PI * i / (size-1)))
    }
    const rms = Math.sqrt(power / size)
    energy.push(rms < .0015 ? 0 : Math.log1p(rms * 12) / Math.log1p(.3 * 12))
    fft.realTransform(spectrum, input)
    let increase = 0, sum = 0, logarithms = 0
    for (let bin = low; bin <= high; bin++) {
      const amplitude = Math.hypot(spectrum[2*bin], spectrum[2*bin+1]) / size
      const magnitude = Math.log1p(amplitude * 100)
      increase += Math.max(0, magnitude - previous[bin]); previous[bin] = magnitude
      sum += amplitude; logarithms += Math.log(amplitude + 1e-12)
    }
    const bins = high - low + 1, flatness = Math.exp(logarithms / bins) / Math.max(1e-12, sum / bins)
    tonal.push(clamp(1-flatness))
    // Reduce broad percussive dominance; this is not source separation or identification of bow articulations.
    rawFlux.push(rms < .0015 ? 0 : increase / bins * (.25 + .75 * tonal.at(-1)))
  }
  const reference = Math.max(.02, percentile(rawFlux, .95))
  const flux = rawFlux.map(n => clamp(n / reference)), onsets = Array(count).fill(0)
  let lastOnset = -100, phrase = 0
  for (let i = 1; i < count-1; i++) {
    const median = percentile(flux.slice(Math.max(0,i-8), i), .5)
    if (energy[i] > .035 && flux[i] > Math.max(.12, median * 1.4) && flux[i] >= flux[i-1] && flux[i] > flux[i+1] && i-lastOnset >= Math.ceil(.12*featureRate)) {
      onsets[i] = quantize(flux[i]); lastOnset = i
    }
  }
  const phraseEnvelope = energy.map(e => { phrase += (clamp(e) - phrase) * (1-Math.exp(-1/featureRate/.65)); return quantize(phrase) })
  return { analysisVersion: 'bow-features/1', ...identity, sampleRate, featureRate, duration,
    energy: energy.map(quantize), onsets, spectralFlux: flux.map(quantize), phraseEnvelope, pitchContour: null }
}
