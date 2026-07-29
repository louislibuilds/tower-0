import { TOWER_COLORS, TOWER_EASE, TOWER_GRADES, getTowerFonts, type FontStack, type ThemeMode } from './tokens'

/** Push canonical token values onto :root so 2D HUD and 3D palette stay in sync */
export function applyTowerTokens(theme: ThemeMode, fontStack: FontStack = 'heritage') {
  const c = TOWER_COLORS[theme]
  const fonts = getTowerFonts(fontStack)
  const root = document.documentElement.style

  root.setProperty('--tower-bg', c.bg)
  root.setProperty('--tower-mass', c.mass)
  root.setProperty('--tower-panel', c.panel)
  root.setProperty('--tower-fg', c.fg)
  root.setProperty('--tower-muted', c.muted)
  root.setProperty('--tower-ink', c.ink)
  root.setProperty('--tower-metal', c.metal)
  root.setProperty('--tower-glass', c.glass)
  root.setProperty('--tower-blueprint', c.blueprint)
  root.setProperty('--tower-accent', c.accent)
  root.setProperty('--tower-warm', c.warm)
  root.setProperty('--tower-warm-muted', c.warmMuted)
  root.setProperty('--tower-grid', c.grid)
  root.setProperty('--tower-depth', c.depth)
  root.setProperty('--tower-glow', c.glow)
  root.setProperty('--tower-glow-bright', c.glowBright)
  root.setProperty('--tower-glow-green', c.glowGreen)
  root.setProperty('--tower-bp-face', c.bpFace)
  root.setProperty('--tower-bp-edge', c.bpEdge)
  root.setProperty('--tower-panel-elevated', c.panelElevated)

  root.setProperty('--tower-font-display', fonts.display)
  root.setProperty('--tower-font-mono', fonts.mono)
  root.setProperty('--tower-font-body', fonts.body)
  root.setProperty('--tower-ease', TOWER_EASE[theme])

  root.setProperty('--tower-grade-hd', TOWER_GRADES.hd)
  root.setProperty('--tower-grade-d', TOWER_GRADES.d)
  root.setProperty('--tower-grade-cr', TOWER_GRADES.cr)

  const fgPct = theme === 'dark' ? '22%' : '14%'
  const edgePct = theme === 'dark' ? '28%' : '22%'
  root.setProperty('--tower-border', `color-mix(in srgb, ${c.fg} ${fgPct}, transparent)`)
  root.setProperty('--tower-edge', `color-mix(in srgb, ${c.fg} ${edgePct}, transparent)`)

  const cursorStroke = theme === 'dark' ? '%2388D4F0' : '%232C2824'
  root.setProperty(
    '--tower-scene-cursor',
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 5v14M5 12h14' stroke='${cursorStroke}' stroke-width='1.25' fill='none'/%3E%3C/svg%3E") 12 12, crosshair`,
  )

  const scrollMix = theme === 'dark' ? c.glow : c.muted
  const scrollHoverMix = theme === 'dark' ? c.glowBright : c.accent
  root.setProperty('--scrollbar-size', '6px')
  root.setProperty(
    '--scrollbar-thumb',
    `color-mix(in srgb, ${scrollMix} ${theme === 'dark' ? '44%' : '52%'}, transparent)`,
  )
  root.setProperty(
    '--scrollbar-thumb-hover',
    `color-mix(in srgb, ${scrollHoverMix} ${theme === 'dark' ? '68%' : '62%'}, transparent)`,
  )
}
