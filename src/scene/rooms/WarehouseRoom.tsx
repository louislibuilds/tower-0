import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { semesters } from '../../data/academic'
import { DUR, EASE_INK } from '../motion'
import { getScenePalette } from '../palette'
import { WAREHOUSE_STOPS } from '../timelineStops'
import { themeMat, type RoomProps } from './types'

const EXPLODE_GAP = 0.22

interface WarehouseRoomProps extends RoomProps {
  warehouseStop: number
  onSelectStop: (stop: number) => void
}

/** 23 · Warehouse — exploded semester assemblies (resume2 TimelineHall) */
export function WarehouseRoom({
  theme,
  accent,
  entered,
  warehouseStop,
  onSelectStop,
}: WarehouseRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <planeGeometry args={[1.45, 0.55]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>

      <Line
        points={[
          new THREE.Vector3(-0.65, -0.05, 0.05),
          new THREE.Vector3(0.65, -0.05, 0.05),
        ]}
        color={pal.graphite}
        lineWidth={0.8}
        transparent
        opacity={0.45}
      />

      {semesters.map((sem, i) => (
        <SemesterStage
          key={sem.id}
          x={WAREHOUSE_STOPS[i] ?? 0}
          subjectCount={sem.subjects.length}
          active={warehouseStop === i}
          entered={entered}
          theme={theme}
          accent={accent}
          onSelect={() => onSelectStop(i)}
        />
      ))}
    </group>
  )
}

function SemesterStage({
  x,
  subjectCount,
  active,
  entered,
  theme,
  accent,
  onSelect,
}: {
  x: number
  subjectCount: number
  active: boolean
  entered: boolean
  theme: RoomProps['theme']
  accent: string
  onSelect: () => void
}) {
  const pal = getScenePalette(theme)
  const invalidate = useThree((s) => s.invalidate)
  const [hover, setHover] = useState(false)
  const [p, setP] = useState(active ? 1 : 0)
  const pRef = useRef(active ? 1 : 0)
  const lifts = Math.min(3, Math.max(1, Math.ceil(subjectCount / 2)))
  const lit = active || hover

  useEffect(() => {
    const target = active || hover ? 1 : 0
    const o = { v: pRef.current }
    const tw = gsap.to(o, {
      v: target,
      duration: DUR.assemble,
      ease: EASE_INK,
      onUpdate: () => {
        pRef.current = o.v
        setP(o.v)
        invalidate()
      },
    })
    return () => {
      tw.kill()
    }
  }, [active, hover, invalidate])

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.22, 0.12, 0.18)), [])

  return (
    <group position={[x, 0, 0]}>
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'crosshair'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        <boxGeometry args={[0.28, 0.55, 0.28]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Exempt base plinth */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.24, 0.08, 0.2]} />
        <meshStandardMaterial color={pal.concrete} roughness={0.85} />
      </mesh>

      {Array.from({ length: lifts }).map((_, k) => {
        const dy = (1 - p) * EXPLODE_GAP * (k + 1)
        return (
          <group key={k} position={[0, -0.05 + dy + k * 0.14, 0]}>
            {!active && p < 0.95 && (
              <Line
                points={[
                  new THREE.Vector3(0, -0.05, 0),
                  new THREE.Vector3(0, -0.05 - EXPLODE_GAP * (k + 1), 0),
                ]}
                color={pal.grid}
                lineWidth={0.5}
                dashed
                dashSize={0.04}
                gapSize={0.03}
                transparent
                opacity={0.5}
              />
            )}
            <mesh>
              <boxGeometry args={[0.2, 0.1, 0.16]} />
              <meshStandardMaterial
                color={lit ? pal.glass : pal.resin}
                transparent
                opacity={entered ? 0.9 : 0.55}
              />
            </mesh>
            <lineSegments geometry={edges}>
              <lineBasicMaterial color={lit ? accent : pal.graphite} transparent opacity={0.75} />
            </lineSegments>
          </group>
        )
      })}

      {lit && entered && (
        <mesh position={[0, 0.32, 0.12]}>
          <planeGeometry args={[0.22, 0.06]} />
          <meshBasicMaterial color={pal.paper} transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  )
}
