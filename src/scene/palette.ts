import { TOWER_COLORS, type ThemeMode } from '../design/tokens'

/** Tower 0 scene palette — mirrors CSS `--tower-*` tokens */
export interface ScenePalette {
  mode: ThemeMode
  bg: string
  mass: string
  panel: string
  fg: string
  muted: string
  ink: string
  metal: string
  glass: string
  blueprint: string
  accent: string
  warm: string
  warmMuted: string
  grid: string
  depth: string
  glow: string
  glowBright: string
  glowGreen: string
  bpFace: string
  bpEdge: string
  panelElevated: string
}

function toScenePalette(mode: ThemeMode): ScenePalette {
  return { mode, ...TOWER_COLORS[mode] }
}

export const TOWER_DAY = toScenePalette('light')
export const TOWER_NIGHT = toScenePalette('dark')

/** @deprecated use TOWER_DAY */
export const DAY_PRINT = TOWER_DAY
/** @deprecated use TOWER_NIGHT */
export const NIGHT_PRINT = TOWER_NIGHT
/** @deprecated use TOWER_DAY */
export const PAPER_PRINT = TOWER_DAY
/** @deprecated use TOWER_NIGHT */
export const INK_PRINT = TOWER_NIGHT

export function getScenePalette(theme: 'light' | 'dark'): ScenePalette {
  return theme === 'dark' ? TOWER_NIGHT : TOWER_DAY
}

/** Warm/cool highlight for blueprint typology fills */
export function typologyHighlight(theme: 'light' | 'dark', lit: boolean): {
  warm: string
  cool: string
  emissiveWarm: number
  emissiveCool: number
} {
  const pal = getScenePalette(theme)
  if (theme === 'dark') {
    return {
      warm: pal.warm,
      cool: pal.glowBright,
      emissiveWarm: lit ? 0.55 : 0.18,
      emissiveCool: lit ? 0.42 : 0.14,
    }
  }
  return {
    warm: pal.accent,
    cool: pal.blueprint,
    emissiveWarm: 0,
    emissiveCool: 0,
  }
}
