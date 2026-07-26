import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { areaLabel, FACTORY_AREAS, FACTORY_STOPS } from '../factoryStops'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

interface FactoryRoomProps extends RoomProps {
  factoryStop: number | null
  onSelectStop: (stop: number) => void
}

/** 23 · Factory — four semester production lines (Area 01 → 04) */
export function FactoryRoom({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: FactoryRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <planeGeometry args={[1.5, 0.6]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>

      {/* Main conveyor spine */}
      <Line
        points={[
          new THREE.Vector3(-0.7, -0.08, 0.08),
          new THREE.Vector3(0.7, -0.08, 0.08),
        ]}
        color={pal.graphite}
        lineWidth={1.2}
      />

      {FACTORY_AREAS.map((sem, i) => (
        <ProductionLine
          key={sem.id}
          index={i}
          x={FACTORY_STOPS[i] ?? 0}
          label={areaLabel(i)}
          semesterLabel={sem.label}
          active={factoryStop === i}
          entered={entered}
          theme={theme}
          accent={accent}
          onSelect={() => onSelectStop(i)}
        />
      ))}
    </group>
  )
}

function ProductionLine({
  index,
  x,
  label,
  semesterLabel,
  active,
  entered,
  theme,
  accent,
  onSelect,
}: {
  index: number
  x: number
  label: string
  semesterLabel: string
  active: boolean
  entered: boolean
  theme: RoomProps['theme']
  accent: string
  onSelect: () => void
}) {
  const pal = getScenePalette(theme)
  const lit = active
  const belt = useMemo(
    () => [
      new THREE.Vector3(-0.12, -0.06, 0.06),
      new THREE.Vector3(0.12, -0.06, 0.06),
    ],
    [],
  )

  return (
    <group position={[x, 0, 0]}>
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'crosshair'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        <boxGeometry args={[0.28, 0.5, 0.35]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Area marker post */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.22, 0.1, 0.18]} />
        <meshStandardMaterial color={pal.concrete} roughness={0.85} />
      </mesh>

      {/* Belt */}
      <Line points={belt} color={lit ? accent : pal.grid} lineWidth={lit ? 1.5 : 0.8} />

      {/* Crates on line — count grows with area index */}
      {Array.from({ length: index + 1 }).map((_, j) => (
        <mesh key={j} position={[-0.06 + j * 0.08, -0.02 + j * 0.06, 0.1]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color={lit ? pal.glass : pal.resin}
            transparent
            opacity={entered ? 0.9 : 0.55}
          />
        </mesh>
      ))}

      {/* Overhead gantry arm */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.04, 0.22, 0.04]} />
        <meshStandardMaterial color={pal.graphite} metalness={0.7} />
      </mesh>
      <mesh position={[0.08, 0.08, 0]}>
        <boxGeometry args={[0.16, 0.03, 0.03]} />
        <meshStandardMaterial color={pal.graphite} metalness={0.7} />
      </mesh>

      {lit && entered && (
        <Html center position={[0, 0.38, 0.12]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">
            {label}
            <br />
            {semesterLabel}
          </div>
        </Html>
      )}

      {lit && entered && (
        <mesh position={[0, 0.32, 0.12]}>
          <planeGeometry args={[0.2, 0.05]} />
          <meshBasicMaterial color={pal.paper} transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  )
}

/** @deprecated */
export const WarehouseRoom = FactoryRoom
