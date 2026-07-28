/** Tower 0 color law — Day (architectural model) / Night (cyberpunk) */
export interface ScenePalette {
  mode: 'day' | 'night'
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
  /** Day model — sage stroke on warm ground */
  neon: string
  /** Night cyber — bright cyan glow */
  neonBright: string
  /** Night cyber — green accent */
  neonGreen: string
  /** Semi-transparent typology face (hex for material color; pair with opacity) */
  bpFace: string
  bpEdge: string
}

export const DAY_PRINT: ScenePalette = {
  mode: 'day',
  paper: '#F7F4EF',
  concrete: '#D4CFC6',
  resin: '#EDE8E0',
  graphite: '#2C2824',
  mute: '#6B6560',
  ink: '#1A1714',
  alum: '#B0AAA2',
  glass: '#A8B8B0',
  blueprint: '#3D6B5C',
  signal: '#C45C26',
  chicken: '#D4923A',
  chickenMute: '#A8742E',
  grid: '#DDD6CC',
  shade: '#5C5650',
  neon: '#3D6B5C',
  neonBright: '#5A8A72',
  neonGreen: '#4A7A58',
  bpFace: '#D4E0D8',
  bpEdge: '#3D6B5C',
}

export const NIGHT_PRINT: ScenePalette = {
  mode: 'night',
  paper: '#0C1218',
  concrete: '#1A3848',
  resin: '#142028',
  graphite: '#88D4F0',
  mute: '#5A8AA0',
  ink: '#E8F8FF',
  alum: '#3A5870',
  glass: '#143848',
  blueprint: '#5B82BC',
  signal: '#3A8AFF',
  chicken: '#E8B84A',
  chickenMute: '#B8922E',
  grid: '#1A4058',
  shade: '#080C10',
  neon: '#00AAD0',
  neonBright: '#56DAFF',
  neonGreen: '#36FEA0',
  bpFace: '#143848',
  bpEdge: '#00AAD0',
}

/** @deprecated use DAY_PRINT */
export const PAPER_PRINT = DAY_PRINT
/** @deprecated use NIGHT_PRINT */
export const INK_PRINT = NIGHT_PRINT

export function getScenePalette(theme: 'light' | 'dark'): ScenePalette {
  return theme === 'dark' ? NIGHT_PRINT : DAY_PRINT
}

/** Warm/cool highlight for blueprint typology fills */
export function typologyHighlight(theme: 'light' | 'dark', lit: boolean): { warm: string; cool: string; emissiveWarm: number; emissiveCool: number } {
  const pal = getScenePalette(theme)
  if (theme === 'dark') {
    return {
      warm: pal.chicken,
      cool: pal.neonBright,
      emissiveWarm: lit ? 0.55 : 0.18,
      emissiveCool: lit ? 0.42 : 0.14,
    }
  }
  return {
    warm: pal.signal,
    cool: pal.blueprint,
    emissiveWarm: 0,
    emissiveCool: 0,
  }
}
