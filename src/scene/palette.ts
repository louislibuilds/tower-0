/** Tower 0 color law — INK (dark / cyber) / PAPER (light / blueprint) */
export interface ScenePalette {
  print: 'paper' | 'ink'
  paper: string
  concrete: string
  resin: string
  graphite: string
  mute: string
  ink: string
  alum: string
  glass: string
  blueprint: string
  signal: string
  /** Legacy warm accent — use `warm` / `neon` for scene fills */
  chicken: string
  chickenMute: string
  grid: string
  shade: string
  /** Blueprint orthographic — day cyan stroke */
  neon: string
  /** Cyber night — bright cyan glow */
  neonBright: string
  /** Cyber night — green accent (Figma sG) */
  neonGreen: string
  /** Semi-transparent blueprint face (hex for material color; pair with opacity) */
  bpFace: string
  bpEdge: string
}

export const PAPER_PRINT: ScenePalette = {
  print: 'paper',
  paper: '#F2F1ED',
  concrete: '#C8C4BC',
  resin: '#E8E6E1',
  graphite: '#2A2C2E',
  mute: '#5A5D61',
  ink: '#0E0F10',
  alum: '#B6BBC2',
  glass: '#9CB8CC',
  blueprint: '#1E4A6E',
  signal: '#2F6BFF',
  chicken: '#E8B84A',
  chickenMute: '#C49A3A',
  grid: '#B8C8D8',
  shade: '#565A5F',
  neon: '#0094D0',
  neonBright: '#3AACDA',
  neonGreen: '#2A9870',
  bpFace: '#B8D4E8',
  bpEdge: '#0094D0',
}

export const INK_PRINT: ScenePalette = {
  print: 'ink',
  paper: '#0A0B0C',
  concrete: '#2E3238',
  resin: '#121418',
  graphite: '#8EC4DC',
  mute: '#6A8A9A',
  ink: '#E8F4FA',
  alum: '#4A6070',
  glass: '#1A3848',
  blueprint: '#5B82BC',
  signal: '#3A8AFF',
  chicken: '#E8B84A',
  chickenMute: '#B8922E',
  grid: '#1A3040',
  shade: '#06080A',
  neon: '#00AAD0',
  neonBright: '#56DAFF',
  neonGreen: '#36FEA0',
  bpFace: '#0E2838',
  bpEdge: '#00AAD0',
}

export function getScenePalette(theme: 'light' | 'dark'): ScenePalette {
  return theme === 'dark' ? INK_PRINT : PAPER_PRINT
}

/** Warm/cool highlight for blueprint typology fills */
export function typologyHighlight(theme: 'light' | 'dark', lit: boolean): { warm: string; cool: string; emissiveWarm: number; emissiveCool: number } {
  const pal = getScenePalette(theme)
  if (theme === 'dark') {
    return {
      warm: pal.neonGreen,
      cool: pal.neonBright,
      emissiveWarm: lit ? 0.35 : 0.08,
      emissiveCool: lit ? 0.28 : 0.06,
    }
  }
  return {
    warm: pal.blueprint,
    cool: pal.signal,
    emissiveWarm: 0,
    emissiveCool: 0,
  }
}

/** Legacy flat tokens for TowerBuilding (unused in main scene) */
export const palette = {
  paper: INK_PRINT.paper,
  surface: INK_PRINT.resin,
  edge: INK_PRINT.graphite,
  graphite: INK_PRINT.concrete,
  ink: INK_PRINT.ink,
  accent: INK_PRINT.signal,
  grid: INK_PRINT.grid,
  basement: INK_PRINT.glass,
  windowLit: INK_PRINT.neonBright,
  windowBasement: INK_PRINT.neon,
  windowOff: INK_PRINT.alum,
}
