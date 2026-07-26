/** Site 9 color law — INK (dark) / PAPER (light) from resume2 */
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
  chicken: string
  chickenMute: string
  grid: string
  shade: string
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
  glass: '#B8C4D4',
  blueprint: '#1E3A5F',
  signal: '#2F6BFF',
  chicken: '#E8B84A',
  chickenMute: '#C49A3A',
  grid: '#D0CEC8',
  shade: '#565A5F',
}

export const INK_PRINT: ScenePalette = {
  print: 'ink',
  paper: '#0E0F10',
  concrete: '#3A3C40',
  resin: '#1A1B1D',
  graphite: '#E6E4DF',
  mute: '#A8AAAE',
  ink: '#F2F1ED',
  alum: '#6A7078',
  glass: '#33404E',
  blueprint: '#5B82BC',
  signal: '#2F6BFF',
  chicken: '#E8B84A',
  chickenMute: '#B8922E',
  grid: '#2A2C2E',
  shade: '#08090A',
}

export function getScenePalette(theme: 'light' | 'dark'): ScenePalette {
  return theme === 'dark' ? INK_PRINT : PAPER_PRINT
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
  windowLit: INK_PRINT.signal,
  windowBasement: INK_PRINT.blueprint,
  windowOff: INK_PRINT.alum,
}
