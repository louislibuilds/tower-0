/** INK theme palette — architectural drawing register */
export const palette = {
  void: '#0a0c10',
  paper: '#12151c',
  surface: '#1a1f2a',
  graphite: '#2a3142',
  ink: '#3d4556',
  muted: '#5a6478',
  text: '#e8eaed',
  accent: '#f0c040',
  basement: '#4a9eff',
  hd: '#34d399',
  windowOff: '#141820',
  windowLit: '#f0c040',
  windowBasement: '#4a9eff',
  edge: '#4a5568',
  grid: '#1e2433',
} as const

export type Palette = typeof palette
