import { useEffect } from 'react'
import { createSceneMagnet } from './scene-magnet.ts'

/** Canonical HOME native alignment owner. Development UI can explicitly override it. */
export function SceneMagnet({ host }: { host: HTMLElement }) {
  useEffect(() => createSceneMagnet(host), [host])
  return null
}
