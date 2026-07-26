import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import {
  getProgramFloor,
  getShaftSegments,
  programBaseY,
  programCenterY,
  PROGRAM_FLOORS,
  SPIRE_HEIGHT,
  type ProgramFloor,
  type ShaftSegment,
} from './towerGeometry'
import { CircuitBase } from './exhibits/CircuitBase'
import { FloorRoom } from './rooms'

interface CyberTowerProps {
  activeFloorId: FloorId
  hoveredFloorId: FloorId | null
  extrude: number
  ink: number
  theme: Theme
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
}

function themeColors(theme: Theme) {
  if (theme === 'dark') {
    return {
      body: '#0a0c14',
      bodyAlt: '#12151f',
      edge: '#1e2438',
      window: '#080a10',
      ground: '#04060c',
      fog: '#030308',
    }
  }
  return {
    body: '#ece8e0',
    bodyAlt: '#f8f6f2',
    edge: '#2a2a2a',
    window: '#d0ccc4',
    ground: '#eae6df',
    fog: '#eae6df',
  }
}

function ShaftSection({
  segment,
  extrude,
  theme,
}: {
  segment: ShaftSegment
  extrude: number
  theme: Theme
}) {
  const colors = themeColors(theme)
  const y = segment.yBottom + (segment.height / 2) * extrude
  const h = segment.height * extrude
  const w = segment.width * 0.92
  const d = segment.depth * 0.92

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])

  // Repeating floor lines inside shaft
  const floorLines = useMemo(() => {
    const lines: THREE.Vector3[][] = []
    const count = Math.min(segment.floorCount, 40)
    for (let i = 1; i < count; i++) {
      const fy = -h / 2 + (i / count) * h
      lines.push([
        new THREE.Vector3(-w / 2, fy, d / 2 + 0.005),
        new THREE.Vector3(w / 2, fy, d / 2 + 0.005),
      ])
    }
    return lines
  }, [h, w, d, segment.floorCount])

  // Vertical window columns
  const cols = 5

  return (
    <group position={[0, y, 0]}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={colors.body} roughness={0.4} metalness={0.6} transparent opacity={0.95} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={colors.edge} transparent opacity={0.5} />
      </lineSegments>
      {Array.from({ length: cols }).map((_, i) => {
        const x = -w / 2 + 0.12 + i * ((w - 0.24) / (cols - 1))
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.006]}>
            <planeGeometry args={[0.05, h * 0.96]} />
            <meshStandardMaterial color={colors.window} transparent opacity={0.7} roughness={0.3} metalness={0.5} />
          </mesh>
        )
      })}
      {floorLines.map((pts, i) => (
        <Line key={i} points={pts} color={colors.edge} lineWidth={0.5} transparent opacity={0.35} />
      ))}
    </group>
  )
}

function ProgramFloorBand({
  program,
  active,
  hovered,
  entered,
  extrude,
  theme,
  onFloorHover,
  onFloorClick,
  isolate,
}: {
  program: ProgramFloor
  active: boolean
  hovered: boolean
  entered: boolean
  extrude: number
  theme: Theme
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
  isolate: boolean
}) {
  const colors = themeColors(theme)
  const baseY = programBaseY(program)
  const y = baseY + (program.bandHeight / 2) * extrude
  const h = program.bandHeight * extrude
  const w = program.width
  const d = program.depth
  const lit = active || hovered

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])
  const neonIntensity = theme === 'dark' ? (lit ? 2.0 : 0.2) : 0
  const opacity = isolate && !entered ? 0.12 : 1

  return (
    <group position={[0, y, 0]}>
      {/* Hit target — full band clickable */}
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          onFloorHover(program.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onFloorHover(null)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onFloorClick(program.id)
        }}
      >
        <boxGeometry args={[w + 0.3, h + 0.1, d + 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Band mass */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={lit ? colors.bodyAlt : colors.body}
          emissive={lit && theme === 'dark' ? program.accent : '#000000'}
          emissiveIntensity={lit ? 0.15 : 0}
          roughness={theme === 'dark' ? 0.35 : 0.85}
          metalness={theme === 'dark' ? 0.65 : 0.05}
          transparent
          opacity={opacity}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={lit ? program.accent : colors.edge}
          transparent
          opacity={lit ? 1 : 0.6}
        />
      </lineSegments>

      {/* Window strips */}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = -w / 2 + 0.15 + i * ((w - 0.3) / 4)
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.008]}>
            <planeGeometry args={[0.06, h * 0.75]} />
            <meshStandardMaterial
              color={lit ? program.accent : colors.window}
              emissive={lit ? program.accent : '#000000'}
              emissiveIntensity={neonIntensity}
              transparent
              opacity={lit ? 0.95 : 0.45}
            />
          </mesh>
        )
      })}

      {/* Floor number label plane (visible when hovered/active) */}
      {(lit || entered) && (
        <mesh position={[-w / 2 - 0.08, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[h * 0.6, 0.25]} />
          <meshBasicMaterial
            color={program.accent}
            transparent
            opacity={theme === 'dark' ? 0.85 : 0.7}
          />
        </mesh>
      )}

      {/* 3D Room exhibit — visible when this floor is entered */}
      {entered && extrude > 0.6 && (
        <group position={[0, -0.05, d / 2 + 0.15]} scale={0.55}>
          <FloorRoom
            floorId={program.id}
            theme={theme}
            accent={program.accent}
            entered={entered}
            hover={hovered}
          />
        </group>
      )}

      {/* Setback ledge */}
      <mesh position={[0, h / 2 + 0.015, 0]}>
        <boxGeometry args={[w + 0.06, 0.03, d + 0.06]} />
        <meshStandardMaterial
          color={colors.edge}
          emissive={lit && theme === 'dark' ? program.accent : '#000000'}
          emissiveIntensity={lit ? 0.6 : 0}
        />
      </mesh>
    </group>
  )
}

function Spire({ yBase, extrude, theme, active }: { yBase: number; extrude: number; theme: Theme; active: boolean }) {
  const colors = themeColors(theme)
  const y = yBase * extrude

  return (
    <group position={[0, y, 0]}>
      {[0, 1, 2, 3, 4].map((i) => {
        const taper = 1 - i * 0.15
        return (
          <mesh key={i} position={[0, i * 0.28 + 0.15, 0]}>
            <boxGeometry args={[0.35 * taper, 0.22, 0.35 * taper]} />
            <meshStandardMaterial
              color={colors.edge}
              emissive={active && theme === 'dark' ? '#ffc400' : '#000000'}
              emissiveIntensity={active ? 1.2 : 0}
              metalness={0.8}
              roughness={0.25}
            />
          </mesh>
        )
      })}
      <mesh position={[0, SPIRE_HEIGHT * 0.75, 0]}>
        <cylinderGeometry args={[0.012, 0.025, SPIRE_HEIGHT * 0.7, 6]} />
        <meshStandardMaterial
          color={colors.edge}
          emissive={active && theme === 'dark' ? '#00e5ff' : '#000000'}
          emissiveIntensity={active ? 2 : 0}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  )
}

export function CyberTower({
  activeFloorId,
  hoveredFloorId,
  extrude,
  ink,
  theme,
  onFloorHover,
  onFloorClick,
}: CyberTowerProps) {
  const colors = themeColors(theme)
  const invalidate = useThree((s) => s.invalidate)
  const activeProgram = getProgramFloor(activeFloorId)
  const activeY = programCenterY(activeProgram)
  const shaftSegments = useMemo(() => getShaftSegments(), [])
  const glowRef = useRef<THREE.PointLight>(null)

  useEffect(() => {
    if (!glowRef.current) return
    glowRef.current.color.set(theme === 'dark' ? activeProgram.accent : '#ffffff')
    invalidate()
  }, [activeFloorId, activeProgram, theme, invalidate])

  const footprintW = PROGRAM_FLOORS[0].width
  const footprintD = PROGRAM_FLOORS[0].depth
  const footprint = useMemo(() => {
    const pts = [
      new THREE.Vector3(-footprintW / 2, 0.02, -footprintD / 2),
      new THREE.Vector3(footprintW / 2, 0.02, -footprintD / 2),
      new THREE.Vector3(footprintW / 2, 0.02, footprintD / 2),
      new THREE.Vector3(-footprintW / 2, 0.02, footprintD / 2),
      new THREE.Vector3(-footprintW / 2, 0.02, -footprintD / 2),
    ]
    return pts.slice(0, Math.max(2, Math.floor(pts.length * ink)))
  }, [ink, footprintW, footprintD])

  const roofProgram = getProgramFloor('roof')
  const spireBase = programBaseY(roofProgram) + roofProgram.bandHeight
  const isolate = activeFloorId !== 'G'

  return (
    <group>
      <fog attach="fog" args={[colors.fog, 25, 55]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color={colors.ground}
          roughness={theme === 'dark' ? 0.12 : 0.9}
          metalness={theme === 'dark' ? 0.88 : 0.05}
        />
      </mesh>

      <Line points={[[-8, 0.03, 0], [8, 0.03, 0]]} color={colors.edge} lineWidth={1} transparent opacity={0.5} />

      {footprint.length >= 2 && (
        <Line
          points={footprint}
          color={theme === 'dark' ? activeProgram.accent : '#1a1a1a'}
          lineWidth={1.5}
          transparent
          opacity={ink}
        />
      )}

      {extrude > 0.1 && (
        <CircuitBase
          extrude={extrude}
          theme={theme}
          active={activeFloorId === 'B10' || activeFloorId === 'B2'}
        />
      )}

      {extrude > 0.02 && (
        <>
          {/* Shaft sections — the empty numbered floors between program bands */}
          {shaftSegments.map((seg, i) => (
            <ShaftSection key={i} segment={seg} extrude={extrude} theme={theme} />
          ))}

          {/* Program floor bands with rooms */}
          {PROGRAM_FLOORS.map((program) => {
            const entered = program.id === activeFloorId
            const hovered = program.id === hoveredFloorId
            return (
              <ProgramFloorBand
                key={program.id}
                program={program}
                active={entered}
                hovered={hovered}
                entered={entered}
                extrude={extrude}
                theme={theme}
                isolate={isolate}
                onFloorHover={onFloorHover}
                onFloorClick={onFloorClick}
              />
            )
          })}

          {extrude > 0.85 && (
            <Spire
              yBase={spireBase}
              extrude={extrude}
              theme={theme}
              active={activeFloorId === 'roof'}
            />
          )}
        </>
      )}

      {theme === 'dark' && extrude > 0.5 && (
        <pointLight
          ref={glowRef}
          position={[1.5, activeY * extrude, 2.5]}
          intensity={1.5}
          distance={6}
          decay={2}
        />
      )}
    </group>
  )
}
