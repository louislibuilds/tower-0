/** Tower 0 design tokens — single source for 2D HUD + 3D scene palette */

export type ThemeMode = 'light' | 'dark'

export interface TowerColorTokens {
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

export const TOWER_COLORS: Record<ThemeMode, TowerColorTokens> = {
  light: {
    bg: '#F7F4EF',
    mass: '#D4CFC6',
    panel: '#EDE8E0',
    fg: '#2C2824',
    muted: '#6B6560',
    ink: '#1A1714',
    metal: '#B0AAA2',
    glass: '#A8B8B0',
    blueprint: '#3D6B5C',
    accent: '#C45C26',
    warm: '#D4923A',
    warmMuted: '#A8742E',
    grid: '#DDD6CC',
    depth: '#5C5650',
    glow: '#3D6B5C',
    glowBright: '#5A8A72',
    glowGreen: '#4A7A58',
    bpFace: '#D4E0D8',
    bpEdge: '#3D6B5C',
    panelElevated: '#EDE8E0',
  },
  dark: {
    bg: '#0C1218',
    mass: '#1A3848',
    panel: '#142028',
    fg: '#88D4F0',
    muted: '#5A8AA0',
    ink: '#E8F8FF',
    metal: '#3A5870',
    glass: '#33404E',
    blueprint: '#5B82BC',
    accent: '#3A8AFF',
    warm: '#E8B84A',
    warmMuted: '#B8922E',
    grid: '#1A4058',
    depth: '#080C10',
    glow: '#00AAD0',
    glowBright: '#56DAFF',
    glowGreen: '#36FEA0',
    bpFace: '#143848',
    bpEdge: '#00AAD0',
    panelElevated: '#1A1B1D',
  },
}

export const TOWER_FONTS_CLASSIC = {
  display: "'Georgia', 'Times New Roman', serif",
  mono: "'Consolas', 'Monaco', 'Courier New', monospace",
  body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const

export const TOWER_FONTS_CYBER = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, Consolas, monospace",
  body: "'Space Grotesk', system-ui, sans-serif",
} as const

export const TOWER_FONTS_HERITAGE = {
  display: "'Libre Baskerville', 'Iowan Old Style', Palatino, Georgia, serif",
  mono: "'IBM Plex Mono', 'SF Mono', ui-monospace, Consolas, monospace",
  body: "'Source Serif 4', 'Iowan Old Style', Palatino, Georgia, serif",
} as const

export type FontStack = 'classic' | 'heritage' | 'cyber'

/** Active site typeface — change here to swap stacks without UI */
export const DEFAULT_FONT_STACK: FontStack = 'heritage'

export const FONT_STACK_ORDER: FontStack[] = ['classic', 'heritage', 'cyber']

export function getTowerFonts(stack: FontStack) {
  switch (stack) {
    case 'cyber':
      return TOWER_FONTS_CYBER
    case 'heritage':
      return TOWER_FONTS_HERITAGE
    default:
      return TOWER_FONTS_CLASSIC
  }
}

export function nextFontStack(stack: FontStack): FontStack {
  const i = FONT_STACK_ORDER.indexOf(stack)
  return FONT_STACK_ORDER[(i + 1) % FONT_STACK_ORDER.length] ?? 'classic'
}

export const TOWER_EASE: Record<ThemeMode, string> = {
  light: 'cubic-bezier(0.25, 0.92, 0.38, 1)',
  dark: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

/** Grade chip colors (HUD only) */
export const TOWER_GRADES = {
  hd: '#1a6b3a',
  d: '#C45C26',
  cr: '#8a6a00',
} as const
