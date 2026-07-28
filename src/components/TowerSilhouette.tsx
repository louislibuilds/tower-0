import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Theme } from '../context/SiteContext'
import { FLOORS, type FloorId } from '../building/program'
import { useSite } from '../context/SiteContext'
import { getScenePalette } from '../scene/palette'

interface TowerSilhouetteProps {
  activeId?: FloorId
  theme?: Theme
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

function GroundGridLines({ color, opacity }: { color: string; opacity: number }) {
  const lines = useMemo(() => {
    const pts: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let i = 0; i <= 120; i += 12) {
      pts.push({ x1: i, y1: 368, x2: i, y2: 420 })
    }
    for (let j = 368; j <= 420; j += 12) {
      pts.push({ x1: 0, y1: j, x2: 120, y2: j })
    }
    return pts
  }, [])

  return (
    <g opacity={opacity}>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={0.5} />
      ))}
    </g>
  )
}

export function TowerSilhouette({ activeId, theme: themeProp }: TowerSilhouetteProps) {
  const { theme: ctxTheme, strings } = useSite()
  const theme = themeProp ?? ctxTheme
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  const activeIdx = activeId ? LIT_FLOORS[activeId] : -1

  const bodyFill = dark ? pal.resin : pal.paper
  const bodyStroke = pal.graphite
  const bandStroke = dark ? pal.mute : pal.concrete
  const activeStroke = dark ? pal.chicken : pal.signal
  const windowLit = dark ? pal.neonBright : pal.neon
  const windowBasement = pal.signal
  const windowOff = dark ? pal.shade : pal.concrete
  const labelActive = pal.ink
  const labelIdle = pal.mute
  const roofFill = dark ? pal.concrete : pal.resin
  const shaftFill = dark ? pal.chicken : pal.signal

  return (
    <div className="tower-silhouette" aria-hidden="true" data-theme={theme}>
      <svg viewBox="0 0 120 420" className="tower-silhouette__svg">
        <GroundGridLines color={pal.grid} opacity={dark ? 0.35 : 0.55} />

        {/* Roof */}
        <polygon
          points="60,8 95,28 25,28"
          fill={roofFill}
          stroke={bodyStroke}
          strokeWidth={1}
          opacity={0.92}
        />
        <rect
          x="52"
          y="12"
          width="16"
          height="6"
          rx="1"
          fill={shaftFill}
          opacity={dark ? 0.85 : 0.75}
        />

        {/* Tower body */}
        <rect
          x="28"
          y="28"
          width="64"
          height="340"
          fill={bodyFill}
          fillOpacity={0.88}
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
                strokeWidth={lit ? 1.4 : 0.6}
                opacity={lit ? 1 : 0.55}
              />
              {[0, 1, 2, 3].map((col) => (
                <rect
                  key={col}
                  x={34 + col * 14}
                  y={yBase - 36}
                  width="10"
                  height="14"
                  rx="1"
                  fill={lit ? (isBasement ? windowBasement : windowLit) : windowOff}
                  opacity={lit ? (dark ? 0.9 : 0.82) : 0.4}
                  stroke={lit ? activeStroke : 'none'}
                  strokeWidth={0.4}
                />
              ))}
              <text
                x="14"
                y={yBase - 18}
                fill={lit ? labelActive : labelIdle}
                fontSize="7"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="end"
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
          x2="120"
          y2="368"
          stroke={pal.graphite}
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.65}
        />

        {/* Shaft indicator */}
        <motion.rect
          x="86"
          y="32"
          width="4"
          height="8"
          rx="1"
          fill={shaftFill}
          animate={{ y: 340 - activeIdx * 48 - 40 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </svg>

      <div className="tower-silhouette__caption">
        <span className="tower-silhouette__name">{strings.stamp.code.split(' · ')[0]}</span>
        <span className="tower-silhouette__sub">{strings.site.siteCode}</span>
      </div>
    </div>
  )
}
