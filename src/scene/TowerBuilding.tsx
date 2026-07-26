import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { FLOORS, type FloorId } from '../building/program'
import { DUR, EASE_INK, EASE_SITE, TOWER } from './motion'
import { palette } from './palette'

interface TowerBuildingProps {
  activeFloorId: FloorId
  extrude: number
  ink: number
  reducedMotion: boolean
}

const { width: W, depth: D, floorHeight: FH } = TOWER

function FloorWindows({
  y,
  active,
  isBasement,
}: {
  y: number
  active: boolean
  isBasement: boolean
}) {
  const litColor = isBasement ? palette.windowBasement : palette.windowLit
  const cols = 4
  const winW = 0.42
  const winH = 0.38
  const gap = 0.18
  const startX = -((cols - 1) * (winW + gap)) / 2

  return (
    <group position={[0, y, D / 2 + 0.01]}>
      {Array.from({ length: cols }).map((_, i) => (
        <mesh key={i} position={[startX + i * (winW + gap), 0, 0]}>
          <planeGeometry args={[winW, winH]} />
          <meshBasicMaterial
            color={active ? litColor : palette.windowOff}
            transparent
            opacity={active ? 0.95 : 0.45}
          />
        </mesh>
      ))}
    </group>
  )
}

function EdgeBox({
  w,
  h,
  d,
  position,
  opacity = 1,
}: {
  w: number
  h: number
  d: number
  position: [number, number, number]
  opacity?: number
}) {
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(w, h, d)
    return new THREE.EdgesGeometry(geo)
  }, [w, h, d])

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={palette.surface}
          transparent
          opacity={opacity * 0.85}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={palette.edge} transparent opacity={opacity} />
      </lineSegments>
    </group>
  )
}

export function TowerBuilding({ activeFloorId, extrude, ink, reducedMotion }: TowerBuildingProps) {
  const groupRef = useRef<THREE.Group>(null)
  const shaftCarRef = useRef<THREE.Mesh>(null)
  const activeY = FLOORS.find((f) => f.id === activeFloorId)?.yCenter ?? 0.6
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const car = shaftCarRef.current
    if (!car) return
    const targetY = activeY * extrude
    if (reducedMotion) {
      car.position.y = targetY
      invalidate()
      return
    }
    const tween = gsap.to(car.position, {
      y: targetY,
      duration: DUR.civic,
      ease: EASE_SITE,
      onUpdate: () => invalidate(),
    })
    return () => {
      tween.kill()
    }
  }, [activeFloorId, activeY, extrude, reducedMotion, invalidate])

  const towerFloors = FLOORS.filter((f) => f.zone !== 'roof')
  const minY = Math.min(...towerFloors.map((f) => f.yCenter)) - FH / 2
  const maxY = Math.max(...towerFloors.map((f) => f.yCenter)) + FH / 2 + TOWER.roofHeight
  const totalH = maxY - minY
  const centerY = (minY + maxY) / 2

  const footprint = useMemo(() => {
    const pts = [
      new THREE.Vector3(-W / 2, 0.02, -D / 2),
      new THREE.Vector3(W / 2, 0.02, -D / 2),
      new THREE.Vector3(W / 2, 0.02, D / 2),
      new THREE.Vector3(-W / 2, 0.02, D / 2),
      new THREE.Vector3(-W / 2, 0.02, -D / 2),
    ]
    const count = Math.max(2, Math.floor(pts.length * ink))
    return pts.slice(0, count)
  }, [ink])

  const scaledH = totalH * extrude
  const scaledCenter = minY + scaledH / 2

  return (
    <group ref={groupRef}>
      {/* Infinite paper ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={palette.paper} roughness={1} />
      </mesh>

      {/* Survey grid */}
      {extrude > 0.1 && <GridLines />}

      {/* Ground line */}
      <Line
        points={[
          [-6, 0.03, 0],
          [6, 0.03, 0],
        ]}
        color={palette.ink}
        lineWidth={1}
        transparent
        opacity={0.6}
      />

      {/* Footprint ink */}
      {footprint.length >= 2 && (
        <Line points={footprint} color={palette.accent} lineWidth={1.5} transparent opacity={ink} />
      )}

      {extrude > 0.02 && (
        <>
          {/* Main tower mass */}
          <EdgeBox
            w={W}
            h={scaledH}
            d={D}
            position={[0, scaledCenter, 0]}
            opacity={extrude}
          />

          {/* Floor slabs & windows */}
          {towerFloors.map((floor) => {
            const floorY = minY + (floor.yCenter - minY + FH / 2) * extrude
            if (floorY < minY + 0.05) return null
            return (
              <group key={floor.id}>
                <mesh position={[0, floorY - FH / 2 * extrude, 0]}>
                  <boxGeometry args={[W + 0.02, 0.04, D + 0.02]} />
                  <meshStandardMaterial
                    color={floor.id === activeFloorId ? palette.accent : palette.graphite}
                    transparent
                    opacity={floor.id === activeFloorId ? 0.9 : 0.5}
                  />
                </mesh>
                <FloorWindows
                  y={floorY}
                  active={floor.id === activeFloorId}
                  isBasement={floor.zone === 'basement'}
                />
              </group>
            )
          })}

          {/* Roof cap */}
          {extrude > 0.85 && (
            <group position={[0, maxY * extrude, 0]}>
              <mesh position={[0, TOWER.roofHeight / 2, 0]}>
                <boxGeometry args={[W * 0.85, TOWER.roofHeight, D * 0.85]} />
                <meshStandardMaterial color={palette.graphite} roughness={0.85} />
              </mesh>
              <mesh position={[0, TOWER.roofHeight + 0.35, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[W * 0.55, 0.5, 4]} />
                <meshStandardMaterial color={palette.ink} roughness={0.8} />
              </mesh>
              {activeFloorId === 'roof' && (
                <mesh position={[0, TOWER.roofHeight + 0.1, D / 2 + 0.02]}>
                  <planeGeometry args={[1.2, 0.5]} />
                  <meshBasicMaterial color={palette.accent} transparent opacity={0.9} />
                </mesh>
              )}
            </group>
          )}

          {/* Elevator shaft */}
          <group position={[W / 2 + 0.15, centerY * extrude, 0]}>
            <mesh>
              <boxGeometry args={[0.12, scaledH, 0.12]} />
              <meshStandardMaterial color={palette.graphite} transparent opacity={0.6} />
            </mesh>
            <mesh ref={shaftCarRef} position={[0, activeY * extrude, 0]}>
              <boxGeometry args={[0.14, 0.22, 0.14]} />
              <meshStandardMaterial
                color={palette.accent}
                emissive={palette.accent}
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>

          {/* Lobby glass curtain (floor G) */}
          {extrude > 0.7 && (
            <mesh position={[0, FLOORS.find((f) => f.id === 'G')!.yCenter * extrude, D / 2 + 0.005]}>
              <planeGeometry args={[W * 0.55, FH * 0.7]} />
              <meshStandardMaterial
                color={palette.basement}
                transparent
                opacity={0.12}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>
          )}
        </>
      )}
    </group>
  )
}

function GridLines() {
  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = []
    for (let i = -8; i <= 8; i++) {
      pts.push([new THREE.Vector3(i, 0.005, -8), new THREE.Vector3(i, 0.005, 8)])
      pts.push([new THREE.Vector3(-8, 0.005, i), new THREE.Vector3(8, 0.005, i)])
    }
    return pts
  }, [])

  return (
    <group>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={palette.grid} lineWidth={0.5} transparent opacity={0.35} />
      ))}
    </group>
  )
}

interface BootControllerProps {
  reducedMotion: boolean
  onComplete: () => void
  onExtrude: (v: number) => void
  onInk: (v: number) => void
  children: React.ReactNode
}

export function BootController({
  reducedMotion,
  onComplete,
  onExtrude,
  onInk,
  children,
}: BootControllerProps) {
  const done = useRef(false)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (done.current) return

    if (reducedMotion) {
      done.current = true
      onInk(1)
      onExtrude(1)
      onComplete()
      invalidate()
      return
    }

    const state = { ink: 0, extrude: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      },
    })

    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInk(state.ink)
        invalidate()
      },
    }).to(state, {
      extrude: 1,
      duration: DUR.extrude,
      ease: EASE_SITE,
      onUpdate: () => {
        onExtrude(state.extrude)
        invalidate()
      },
    })

    return () => {
      tl.kill()
    }
  }, [reducedMotion, onComplete, onExtrude, onInk, invalidate])

  return <>{children}</>
}
