import { Html, Line } from '@react-three/drei'
import { useMemo, useState } from 'react'
import * as THREE from 'three'
import { CORE_RISERS, RISER_GAUGE, type CoreRiserDef } from '../../data/coreRisers'
import { RoomShell } from '../primitives/RoomShell'
import { typologyMat, type TypologyProps } from './types'

const riserX = (i: number) => -0.42 + i * 0.21

/** B2 · Riser Core — skills as building services; each pipe serves a 52F lab */
export function RiserCore({ theme, accent, entered, active = false }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const [hovered, setHovered] = useState<number | null>(null)
  const activeRiser = hovered !== null ? CORE_RISERS[hovered] : null
  const aiUplink = useMemo(
    () => [new THREE.Vector3(riserX(1), 0.38, 0), new THREE.Vector3(riserX(1), 0.55, 0.05)],
    [],
  )

  return (
    <RoomShell width={1.05} depth={0.72} height={0.48} color={m.pal.graphite} floorColor={m.body}>
      {CORE_RISERS.map((riser, i) => (
        <RiserColumn
          key={riser.id}
          riser={riser}
          x={riserX(i)}
          lit={lit}
          hover={hovered === i}
          theme={theme}
          accent={accent}
          onHover={(h) => setHovered(h ? i : null)}
        />
      ))}

      {activeRiser && (
        <Html center position={[0, 0.42, 0.12]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--lab scene-label--one-line scene-label--active">
            SERVES · {activeRiser.serves.tag}
          </div>
        </Html>
      )}

      {activeRiser?.id === 'ai' && (
        <Line points={aiUplink} color={accent} lineWidth={2} />
      )}
    </RoomShell>
  )
}

function RiserColumn({
  riser,
  x,
  lit,
  hover,
  theme,
  accent,
  onHover,
}: {
  riser: CoreRiserDef
  x: number
  lit: boolean
  hover: boolean
  theme: TypologyProps['theme']
  accent: string
  onHover: (h: boolean) => void
}) {
  const m = typologyMat(theme, accent, lit)
  const g = RISER_GAUGE[riser.id]
  const h = 0.28 + g * 2.2
  const hot = lit && (hover || riser.id === 'ai')

  return (
    <group
      position={[x, 0.12, -0.08]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'crosshair'
      }}
      onPointerOut={() => {
        onHover(false)
        document.body.style.cursor = 'crosshair'
      }}
    >
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[g, g, h, 10]} />
        <meshStandardMaterial
          color={m.alt}
          emissive={hot ? accent : '#000'}
          emissiveIntensity={hot ? 0.35 : 0}
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, h + 0.02, g + 0.005]}>
        <boxGeometry args={[g * 2.2, 0.025, 0.012]} />
        <meshStandardMaterial color={m.pal.alum} metalness={0.6} />
      </mesh>

      <Html center position={[0, h + 0.08, 0.02]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--tiny ${hover ? 'scene-label--active' : ''}`}>
          {riser.letter} · {riser.trade.split(' / ')[0]}
        </div>
      </Html>

      {hover && (
        <Line
          points={[
            new THREE.Vector3(0, 0.04, 0.06),
            new THREE.Vector3(0, h * 0.6, 0.06),
            new THREE.Vector3(0.08, h * 0.75, 0.1),
          ]}
          color={accent}
          lineWidth={1.5}
        />
      )}
    </group>
  )
}
