import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { areaLabel, FACTORY_AREAS, FACTORY_STOPS } from '../factoryStops'
import { getScenePalette } from '../palette'
import { RoomShell } from '../primitives/RoomShell'
import { themeMat, type RoomProps } from './types'

interface FactoryRoomProps extends RoomProps {
  factoryStop: number | null
  onSelectStop: (stop: number) => void
}

const FACT_W = 1.45
const FACT_D = 0.62
const FACT_H = 0.48

/** 23 · Factory — interior floor with production lines */
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
    <RoomShell width={FACT_W} depth={FACT_D} height={FACT_H} color={pal.graphite} floorColor={m.body} openFront>
      {/* Conveyor belt on floor */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.25, 0.05, 0.18]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>
      <Line
        points={[new THREE.Vector3(-0.62, 0.07, 0.1), new THREE.Vector3(0.62, 0.07, 0.1)]}
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
    </RoomShell>
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
    <group position={[x, 0, 0.05]}>
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

      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.28, 0.1, 0.28]} />
        <meshStandardMaterial color={lit ? accent : pal.concrete} emissive={lit ? accent : '#000'} emissiveIntensity={lit ? 0.12 : 0} />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.18, 0.28, 0.12]} />
        <meshStandardMaterial color={lit ? pal.glass : pal.resin} transparent opacity={0.85} />
      </mesh>
      <lineSegments geometry={stationEdges} position={[0, 0.3, 0]}>
        <lineBasicMaterial color={lit ? accent : pal.graphite} />
      </lineSegments>

      {Array.from({ length: index + 1 }).map((_, j) => (
        <mesh key={j} position={[-0.08 + j * 0.1, 0.16, 0.12]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={lit ? pal.glass : pal.resin} />
        </mesh>
      ))}

      <Html center position={[0, 0.52, 0.15]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>{label}</div>
      </Html>

      {entered && (
        <Html center position={[0, 0.64, 0.1]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">{semesterLabel}</div>
        </Html>
      )}
    </group>
  )
}

/** @deprecated */
export const WarehouseRoom = FactoryRoom
