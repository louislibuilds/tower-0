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

/** 23 · Factory — four semester production lines with bold geometry */
export function FactoryRoom({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: FactoryRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)
  const floorEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.55, 0.02, 0.72)),
    [],
  )

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.36, 0]}>
        <planeGeometry args={[1.55, 0.72]} />
        <meshStandardMaterial color={m.body} />
      </mesh>
      <lineSegments geometry={floorEdges} position={[0, -0.35, 0]}>
        <lineBasicMaterial color={pal.graphite} />
      </lineSegments>

      {/* Main conveyor belt — long rectangle */}
      <mesh position={[0, -0.12, 0.1]}>
        <boxGeometry args={[1.35, 0.06, 0.22]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>
      <Line
        points={[
          new THREE.Vector3(-0.68, -0.08, 0.22),
          new THREE.Vector3(0.68, -0.08, 0.22),
        ]}
        color={pal.graphite}
        lineWidth={2}
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
  const stationEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.28, 0.32, 0.28)),
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
        <boxGeometry args={[0.32, 0.55, 0.38]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Station platform — square */}
      <mesh position={[0, -0.06, 0.08]}>
        <boxGeometry args={[0.28, 0.1, 0.28]} />
        <meshStandardMaterial color={lit ? accent : pal.concrete} emissive={lit ? accent : '#000'} emissiveIntensity={lit ? 0.12 : 0} />
      </mesh>

      {/* Vertical marker — rectangle */}
      <mesh position={[0, 0.14, 0.08]}>
        <boxGeometry args={[0.18, 0.28, 0.12]} />
        <meshStandardMaterial color={lit ? pal.glass : pal.resin} transparent opacity={0.85} />
      </mesh>
      <lineSegments geometry={stationEdges} position={[0, 0.14, 0.08]}>
        <lineBasicMaterial color={lit ? accent : pal.graphite} />
      </lineSegments>

      {/* Crates on belt */}
      {Array.from({ length: index + 1 }).map((_, j) => (
        <mesh key={j} position={[-0.08 + j * 0.1, -0.02, 0.22]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={lit ? pal.glass : pal.resin} />
        </mesh>
      ))}

      <Html center position={[0, 0.38, 0.18]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>
          {label}
        </div>
      </Html>

      {entered && (
        <Html center position={[0, 0.52, 0.14]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">{semesterLabel}</div>
        </Html>
      )}
    </group>
  )
}

/** @deprecated */
export const WarehouseRoom = FactoryRoom
