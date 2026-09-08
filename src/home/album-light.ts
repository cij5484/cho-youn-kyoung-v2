export type AlbumLightTone = readonly [number, number, number]

/** RGB means of the three retained front-cover derivatives, not additional brand colors. */
export const albumLightTones: Readonly<Record<string, AlbumLightTone>> = {
  'album:ji-young-hee-ryu-haegeum-sanjo-2026': [227, 219, 206],
  'album:yeongsan-hoesang-2026': [88, 86, 87],
  'album:pyeongjo-hoesang-2026': [207, 208, 213],
}

export interface AlbumLight {
  x: number
  y: number
  rgb: [number, number, number]
  energy: number
  moving: boolean
}

export function albumLightDirection(turn: number, tilt: number) {
  return { x: Math.sin(turn * Math.PI / 180), y: Math.sin(tilt * Math.PI / 180) }
}

export function createAlbumLight(turn: number, tilt: number, tone: AlbumLightTone): AlbumLight {
  return { ...albumLightDirection(turn, tilt), rgb: [...tone], energy: 0, moving: false }
}

/** The reflection follows the actual pose, more slowly than the object's 11/s response. */
export function advanceAlbumLight(light: AlbumLight, turn: number, tilt: number, tone: AlbumLightTone, dt: number, reduced: boolean) {
  const direction = albumLightDirection(turn, tilt)
  const directionStep = reduced ? 1 : 1 - Math.exp(-3.8 * dt)
  const toneStep = reduced ? 1 : 1 - Math.exp(-3.1 * dt)
  const error = Math.hypot(direction.x - light.x, direction.y - light.y)
  light.x += (direction.x - light.x) * directionStep
  light.y += (direction.y - light.y) * directionStep
  light.rgb = light.rgb.map((channel, i) => channel + (tone[i] - channel) * toneStep) as AlbumLight['rgb']
  light.energy += ((reduced ? 0 : Math.min(1, error * 1.8)) - light.energy) * directionStep
  light.moving = Math.abs(direction.x - light.x) > .001 || Math.abs(direction.y - light.y) > .001
    || light.rgb.some((channel, i) => Math.abs(tone[i] - channel) > .05) || light.energy > .001
  if (!light.moving) {
    light.x = direction.x; light.y = direction.y; light.rgb = [...tone]; light.energy = 0
  }
  return light
}
