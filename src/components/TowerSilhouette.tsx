import { useMemo } from 'react'
import type { Theme } from '../context/SiteContext'
import { FLOORS, type FloorId } from '../building/program'
import { useSite } from '../context/SiteContext'
import { getScenePalette } from '../scene/palette'

interface TowerSilhouetteProps {
  activeId?: FloorId
  theme?: Theme
  /** Poster mode ??wider canvas for no-WebGL fallback backdrop */
  poster?: boolean
}

const LIT_FLOORS: Record<FloorId, number> = {
  B10: 0,
  B2: 1,
  G: 2,
  '23': 3,
  '52': 4,
  '99': 5,
  roof: 6,
}

function PerspectiveGrid({ color, opacity }: { color: string; opacity: number }) {
  const lines = useMemo(() => {
    const pts: { x1: number; y1: number; x2: number; y2: number }[] = []
    const horizon = 368
    const base = 420
    for (let i = 0; i <= 160; i += 16) {
      pts.push({ x1: i, y1: horizon, x2: 80 + i * 0.5, y2: base })
    }
    for (let j = horizon; j <= base; j += 14) {
      const t = (j - horizon) / (base - horizon)
      const inset = 24 * t
      pts.push({ x1: inset, y1: j, x2: 160 - inset, y2: j })
    }
    return pts
  }, [])

  return (
    <g opacity={opacity}>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={0.6} />
      ))}
    </g>
  )
}

export function TowerSilhouette({ activeId, theme: themeProp, poster = false }: TowerSilhouetteProps) {
  const { theme: ctxTheme, strings, floorId } = useSite()
  const theme = themeProp ?? ctxTheme
  const resolvedActive = activeId ?? floorId ?? undefined
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  const activeIdx = resolvedActive ? LIT_FLOORS[resolvedActive] : 2

  const bodyFront = dark ? '#2a3444' : pal.bg
  const bodySide = dark ? '#1e2630' : pal.mass
  const bodyStroke = dark ? '#6ea8ff' : pal.fg
  const bandStroke = dark ? '#4a6080' : pal.mass
  const activeStroke = dark ? pal.warm : pal.accent
  const windowLit = dark ? '#f5c842' : pal.glow
  const windowBasement = pal.accent
  const windowOff = dark ? '#3a4555' : pal.mass
  const roofFill = dark ? '#3a7bd5' : pal.panel
  const shaftFill = dark ? pal.warm : pal.accent
  const skyTop = dark ? '#121820' : '#eef2f6'
  const skyBottom = dark ? '#1a2430' : '#f8fafc'

  const shaftY = 340 - activeIdx * 48 - 40

  return (
    <div className={`tower-silhouette${poster ? ' tower-silhouette--poster' : ''}`} aria-hidden="true" data-theme={theme}>
      <svg viewBox="0 0 160 420" className="tower-silhouette__svg">
        <defs>
          <linearGradient id="tower-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="100%" stopColor={skyBottom} />
          </linearGradient>
          <linearGradient id="tower-mass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bodyFront} stopOpacity={0.95} />
            <stop offset="100%" stopColor={bodySide} stopOpacity={0.88} />
          </linearGradient>
        </defs>

        <rect width="160" height="420" fill="url(#tower-sky)" />
        <PerspectiveGrid color={pal.grid} opacity={dark ? 0.28 : 0.42} />

        {/* Side face ??subtle depth */}
        <polygon
          points="92,28 108,36 108,368 92,368"
          fill={bodySide}
          fillOpacity={0.75}
          stroke={bodyStroke}
          strokeWidth={0.8}
          opacity={0.85}
        />

        {/* Roof */}
        <polygon points="60,8 108,32 12,32" fill={roofFill} stroke={bodyStroke} strokeWidth={1.1} opacity={0.94} />
        <rect x="52" y="12" width="16" height="7" rx="1.5" fill={shaftFill} opacity={dark ? 0.9 : 0.78} />

        {/* Tower body */}
        <rect
          x="28"
          y="28"
          width="64"
          height="340"
          fill="url(#tower-mass)"
          stroke={bodyStroke}
          strokeWidth={1.2}
        />

        {/* Floor bands + windows */}
        {FLOORS.filter((f) => f.zone !== 'roof').map((floor) => {
          const idx = LIT_FLOORS[floor.id]
          const yBase = 340 - idx * 48
          const lit = idx === activeIdx
          const isBasement = floor.zone === 'basement'

          return (
            <g key={floor.id}>
              <line
                x1="28"
                y1={yBase}
                x2="92"
                y2={yBase}
                stroke={lit ? activeStroke : bandStroke}
                strokeWidth={lit ? 1.6 : 0.7}
                opacity={lit ? 1 : 0.5}
              />
              {[0, 1, 2, 3].map((col) => (
                <rect
                  key={col}
                  x={34 + col * 14}
                  y={yBase - 36}
                  width="10"
                  height="14"
                  rx="1.5"
                  fill={lit ? (isBasement ? windowBasement : windowLit) : windowOff}
                  opacity={lit ? (dark ? 0.95 : 0.85) : 0.35}
                  stroke={lit ? activeStroke : 'none'}
                  strokeWidth={0.5}
                />
              ))}
              <text
                x="22"
                y={yBase - 18}
                fill={lit ? pal.ink : pal.muted}
                fontSize="7"
                fontFamily="var(--tower-font-mono, monospace)"
                textAnchor="end"
                opacity={lit ? 1 : 0.65}
              >
                {floor.label}
              </text>
            </g>
          )
        })}

        {/* Ground line */}
        <line
          x1="0"
          y1="368"
          x2="160"
          y2="368"
          stroke={pal.fg}
          strokeWidth={1}
          opacity={0.55}
        />

        {/* Elevator shaft indicator */}
        <rect
          x="86"
          y={shaftY}
          width="4"
          height="10"
          rx="1"
          fill={shaftFill}
          opacity={0.92}
          className="tower-silhouette__shaft"
        />
      </svg>

      <div className="tower-silhouette__caption">
        <span className="tower-silhouette__name">{strings.stamp.code.split(' · ')[0]}</span>
        <span className="tower-silhouette__sub">{strings.site.siteCode}</span>
      </div>
    </div>
  )
}
