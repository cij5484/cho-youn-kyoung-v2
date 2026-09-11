import { validateAnalysisPair, type AnalysisIdentity, type AnalysisPair } from './analysis-catalog.ts'

// Vite emits separate chunks: only the selected recording's two JSON modules are fetched and parsed.
const modules = import.meta.glob<unknown>(['./analysis/*/*.features.json', './analysis/*/*.percussion.json'], { import: 'default' })

export async function loadAnalysis(identity: AnalysisIdentity): Promise<AnalysisPair> {
  const stem = `./analysis/${identity.path.replace(/\.mp3$/, '')}`
  const features = modules[`${stem}.features.json`], percussion = modules[`${stem}.percussion.json`]
  if (!features || !percussion) throw new Error(`Missing album analysis: ${identity.trackId}`)
  const [featureData, percussionData] = await Promise.all([features(), percussion()])
  const pair = validateAnalysisPair(featureData, percussionData, identity)
  if (!pair) throw new Error(`Invalid album analysis: ${identity.trackId}`)
  return pair
}
