import { motion } from 'framer-motion'
import { FLOORS, type FloorId } from '../building/program'

interface TowerSilhouetteProps {
  activeId: FloorId
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

export function TowerSilhouette({ activeId }: TowerSilhouetteProps) {
  const activeIdx = LIT_FLOORS[activeId]

  return (
    <div className="tower-silhouette" aria-hidden="true">
      <svg viewBox="0 0 120 420" className="tower-silhouette__svg">
        <defs>
          <linearGradient id="towerFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1f2e" />
            <stop offset="100%" stopColor="#0d1017" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Roof */}
        <polygon points="60,8 95,28 25,28" fill="#2a3142" stroke="#4a5568" strokeWidth="1" />
        <rect x="52" y="12" width="16" height="6" rx="1" fill="#f0c040" opacity="0.9" filter="url(#glow)" />

        {/* Tower body */}
        <rect x="28" y="28" width="64" height="340" fill="url(#towerFill)" stroke="#3d4556" strokeWidth="1.5" />

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
                stroke={lit ? '#f0c040' : '#2d3548'}
                strokeWidth={lit ? 1.5 : 0.5}
                opacity={lit ? 1 : 0.6}
              />
              {[0, 1, 2, 3].map((col) => (
                <rect
                  key={col}
                  x={34 + col * 14}
                  y={yBase - 36}
                  width="10"
                  height="14"
                  rx="1"
                  fill={lit ? (isBasement ? '#4a9eff' : '#f0c040') : '#1e2433'}
                  opacity={lit ? 0.85 : 0.35}
                  filter={lit ? 'url(#glow)' : undefined}
                />
              ))}
              <text
                x="14"
                y={yBase - 18}
                fill={lit ? '#e8eaed' : '#5a6478'}
                fontSize="7"
                fontFamily="monospace"
                textAnchor="end"
              >
                {floor.label}
              </text>
            </g>
          )
        })}

        {/* Ground line */}
        <line x1="0" y1="368" x2="120" y2="368" stroke="#4a5568" strokeWidth="1" strokeDasharray="4 3" />
        <text x="60" y="382" fill="#5a6478" fontSize="6" fontFamily="monospace" textAnchor="middle">
          GROUND
        </text>

        {/* Elevator shaft indicator */}
        <motion.rect
          x="86"
          y="32"
          width="4"
          height="8"
          rx="1"
          fill="#f0c040"
          filter="url(#glow)"
          animate={{ y: 340 - activeIdx * 48 - 40 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </svg>

      <div className="tower-silhouette__caption">
        <span className="tower-silhouette__name">TOWER 0</span>
        <span className="tower-silhouette__sub">SITE · LOUIS LI</span>
      </div>
    </div>
  )
}
