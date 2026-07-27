import type { Theme } from '../../context/SiteContext'
import { getScenePalette, typologyHighlight } from '../palette'

export interface TypologyProps {
  theme: Theme
  accent: string
  entered: boolean
  active?: boolean
  /** Non-active sibling pod — ghost fill, no emissive */
  thin?: boolean
  /** Accepted for RoomProps compatibility */
  hover?: boolean
  /** Room shell visible during zoom morph (lab typologies) */
  showShell?: boolean
}

export function typologyMat(theme: Theme, _accent: string, entered: boolean) {
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  const lit = entered
  const hi = typologyHighlight(theme, lit)

  return {
    body: pal.resin,
    alt: pal.concrete,
    edge: pal.graphite,
    pal,
    warm: hi.warm,
    cool: hi.cool,
    emissiveWarm: hi.emissiveWarm,
    emissiveCool: hi.emissiveCool,
    emissive: entered && dark ? pal.neonBright : '#000000',
    emissiveIntensity: entered && dark ? 0.32 : 0,
    metalness: dark ? 0.55 : 0.1,
    roughness: dark ? 0.4 : 0.85,
  }
}
