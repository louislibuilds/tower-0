import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { areaLabel, FACTORY_AREAS, FACTORY_STOPS } from '../factoryStops'
import { RoomShell } from '../primitives/RoomShell'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  onSelectStop: (stop: number) => void
}

const FACT_W = 1.45
const FACT_D = 0.62
const FACT_H = 0.48

/** 23 · Assembly Line — semester production stations with warm LED status */
export function AssemblyLine({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: AssemblyLineProps) {
  const m = typologyMat(theme, accent, entered)

  return (
    <RoomShell width={FACT_W} depth={FACT_D} height={FACT_H} color={m.pal.graphite} floorColor={m.body} openFront>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.25, 0.05, 0.18]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      <Line
        points={[new THREE.Vector3(-0.62, 0.07, 0.1), new THREE.Vector3(0.62, 0.07, 0.1)]}
        color={m.pal.graphite}
        lineWidth={2}
      />

      {FACTORY_AREAS.map((sem, i) => (
        <ProductionStation
          key={sem.id}
          index={i}
          x={FACTORY_STOPS[i] ?? 0}
          label={areaLabel(i)}
          semesterLabel={sem.label}
          active={factoryStop === i}
          entered={entered}
          theme={theme}
          accent={accent}
          chicken={m.pal.chicken}
          onSelect={() => onSelectStop(i)}
        />
      ))}
    </RoomShell>
  )
}

function ProductionStation({
  index,
  x,
  label,
  semesterLabel,
  active,
  entered,
  theme,
  accent,
  chicken,
  onSelect,
}: {
  index: number
  x: number
  label: string
  semesterLabel: string
  active: boolean
  entered: boolean
  theme: TypologyProps['theme']
  accent: string
  chicken: string
  onSelect: () => void
}) {
  const m = typologyMat(theme, accent, entered)
  const lit = active
  const ledColor = lit ? chicken : m.pal.concrete
  const stationEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.22, 0.26, 0.22)),
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
        <boxGeometry args={[0.26, 0.45, 0.32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
        <meshStandardMaterial
          color={lit ? accent : m.pal.concrete}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.12 : 0}
        />
      </mesh>

      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[0.14, 0.22, 0.1]} />
        <meshStandardMaterial color={lit ? m.pal.glass : m.pal.resin} transparent opacity={0.85} />
      </mesh>
      <lineSegments geometry={stationEdges} position={[0, 0.24, 0]}>
        <lineBasicMaterial color={lit ? accent : m.pal.graphite} />
      </lineSegments>

      {/* Status LED strip — chicken warm yellow */}
      {Array.from({ length: 3 }).map((_, j) => (
        <mesh key={j} position={[-0.05 + j * 0.05, 0.36, 0.06]}>
          <boxGeometry args={[0.03, 0.03, 0.02]} />
          <meshStandardMaterial
            color={entered ? ledColor : m.pal.alum}
            emissive={entered && (lit || j === 0) ? chicken : '#000'}
            emissiveIntensity={entered ? (lit ? 0.9 : j === 0 ? 0.35 : 0) : 0}
          />
        </mesh>
      ))}

      {Array.from({ length: index + 1 }).map((_, j) => (
        <mesh key={j} position={[-0.06 + j * 0.08, 0.13, 0.1]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={lit ? m.pal.glass : m.pal.resin} />
        </mesh>
      ))}

      <Html center position={[0, 0.44, 0.12]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>{label}</div>
      </Html>

      {entered && (
        <Html center position={[0, 0.54, 0.08]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">{semesterLabel}</div>
        </Html>
      )}
    </group>
  )
}
