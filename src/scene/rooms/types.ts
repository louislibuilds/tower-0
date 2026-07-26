import type { Theme } from '../../context/SiteContext'
import { getScenePalette } from '../palette'

export interface RoomProps {
  theme: Theme
  accent: string
  entered: boolean
  hover: boolean
}

export function themeMat(theme: Theme, accent: string, entered: boolean) {
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  return {
    body: pal.resin,
    alt: pal.concrete,
    edge: pal.graphite,
    emissive: entered && dark ? accent : '#000000',
    emissiveIntensity: entered && dark ? 0.3 : 0,
    metalness: dark ? 0.5 : 0.1,
    roughness: dark ? 0.45 : 0.85,
  }
}
