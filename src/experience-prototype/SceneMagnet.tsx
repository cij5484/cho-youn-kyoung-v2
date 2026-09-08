import { useEffect } from 'react'
import { createSceneMagnet } from './scene-magnet.ts'

/** Mounted only after the user explicitly enables the development comparison. */
export function SceneMagnet({ host }: { host: HTMLElement }) {
  useEffect(() => createSceneMagnet(host), [host])
  return null
}
