import type { Theme } from '../../context/SiteContext'
import { getScenePalette } from '../palette'

export interface TypologyProps {
  theme: Theme
  accent: string
  entered: boolean
  active?: boolean
  /** Accepted for RoomProps compatibility */
  hover?: boolean
}

export function typologyMat(theme: Theme, accent: string, entered: boolean) {
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  return {
    body: pal.resin,
    alt: pal.concrete,
    edge: pal.graphite,
    pal,
    emissive: entered && dark ? accent : '#000000',
    emissiveIntensity: entered && dark ? 0.3 : 0,
    metalness: dark ? 0.5 : 0.1,
    roughness: dark ? 0.45 : 0.85,
  }
}
