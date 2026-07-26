import { Html, Line } from '@react-three/drei'
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
import { getScenePalette } from './palette'
import { CircuitBase } from './exhibits/CircuitBase'
import { FloorRoom } from './rooms'

import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'

interface CyberTowerProps {
  activeFloorId: FloorId
  hoveredFloorId: FloorId | null
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  factoryStop: number | null
  viewMode: ViewMode
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  extrude: number
  ink: number
  theme: Theme
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onFactoryStop: (stop: number) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

function ShaftSection({
  segment,
  extrude,
  theme,
  wireframe,
}: {
  segment: ShaftSegment
  extrude: number
  theme: Theme
  wireframe: boolean
}) {
  const pal = getScenePalette(theme)
  const y = segment.yBottom + (segment.height / 2) * extrude
  const h = segment.height * extrude
  const w = segment.width * 0.92
  const d = segment.depth * 0.92
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])

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

  return (
    <group position={[0, y, 0]}>
      {!wireframe && (
        <mesh>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={pal.resin} roughness={0.85} metalness={0.05} />
        </mesh>
      )}
      {wireframe && (
        <mesh>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={pal.resin} transparent opacity={0.05} depthWrite={false} />
        </mesh>
      )}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={pal.graphite} transparent opacity={wireframe ? 0.35 : 0.55} />
      </lineSegments>
      {Array.from({ length: 5 }).map((_, i) => {
        const x = -w / 2 + 0.12 + i * ((w - 0.24) / 4)
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.006]}>
            <planeGeometry args={[0.04, h * 0.96]} />
            <meshStandardMaterial
              color={pal.shade}
              transparent
              opacity={wireframe ? 0.15 : 0.4}
            />
          </mesh>
        )
      })}
      {floorLines.map((pts, i) => (
        <Line key={i} points={pts} color={pal.grid} lineWidth={0.5} transparent opacity={0.4} />
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
  wireframe,
  labRoomSlug,
  libraryRoomSlug,
  factoryStop,
  viewMode,
  selectedBookSlug,
  selectedCredentialSlug,
  onFloorHover,
  onFloorClick,
  onLabRoomClick,
  onLabRoomHover,
  onLibraryRoomClick,
  onLibraryRoomHover,
  onFactoryStop,
  onBookClick,
  onCredentialClick,
}: {
  program: ProgramFloor
  active: boolean
  hovered: boolean
  entered: boolean
  extrude: number
  theme: Theme
  wireframe: boolean
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  factoryStop: number | null
  viewMode: ViewMode
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onFactoryStop: (stop: number) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}) {
  const pal = getScenePalette(theme)
  const baseY = programBaseY(program)
  const y = baseY + (program.bandHeight / 2) * extrude
  const h = program.bandHeight * extrude
  const w = program.width
  const d = program.depth
  const lit = active || hovered
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])

  return (
    <group position={[0, y, 0]}>
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
          document.body.style.cursor = 'crosshair'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onFloorClick(program.id)
        }}
      >
        <boxGeometry args={[w + 0.3, h + 0.1, d + 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={lit ? pal.concrete : pal.resin}
          roughness={0.85}
          metalness={0.05}
          transparent
          opacity={
            wireframe
              ? 0.06
              : entered && viewMode !== 'tower'
                ? 0.2
                : 1
          }
          depthWrite={!wireframe && !(entered && viewMode !== 'tower')}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={lit ? pal.signal : pal.graphite}
          transparent
          opacity={wireframe ? 0.9 : lit ? 1 : 0.65}
        />
      </lineSegments>

      {!wireframe &&
        Array.from({ length: 5 }).map((_, i) => {
          const x = -w / 2 + 0.15 + i * ((w - 0.3) / 4)
          return (
            <mesh key={i} position={[x, 0, d / 2 + 0.008]}>
              <planeGeometry args={[0.05, h * 0.75]} />
              <meshStandardMaterial
                color={theme === 'dark' ? pal.glass : lit ? pal.glass : pal.shade}
                emissive={theme === 'dark' ? (lit ? pal.signal : '#1a2840') : '#000000'}
                emissiveIntensity={theme === 'dark' ? (lit ? 0.55 : 0.12) : 0}
                transparent
                opacity={theme === 'dark' ? 0.85 : lit ? 0.7 : 0.35}
              />
            </mesh>
          )
        })}

      {theme === 'dark' && entered && !wireframe && (
        <pointLight position={[0, 0.15, d / 2 + 0.3]} intensity={0.35} distance={2.5} color={pal.signal} decay={2} />
      )}

      {entered && extrude > 0.6 && (
        <group
          position={[0, -h * 0.06, 0]}
          scale={
            program.id === 'roof'
              ? viewMode === 'room' || viewMode === 'focus'
                ? 1.2
                : 0.95
              : viewMode === 'room' || viewMode === 'focus'
                ? 1.05
                : viewMode === 'floor' && program.id === '52'
                  ? 0.98
                  : viewMode === 'floor' && (labRoomSlug || libraryRoomSlug || factoryStop !== null)
                    ? 0.88
                    : 0.72
          }
        >
          <FloorRoom
            floorId={program.id}
            bandHeight={program.bandHeight}
            theme={theme}
            accent={pal.signal}
            entered={entered}
            hover={hovered}
            labRoomSlug={labRoomSlug}
            libraryRoomSlug={libraryRoomSlug}
            factoryStop={factoryStop}
            viewMode={viewMode}
            selectedBookSlug={selectedBookSlug}
            selectedCredentialSlug={selectedCredentialSlug}
            onLabRoomClick={onLabRoomClick}
            onLabRoomHover={onLabRoomHover}
            onLibraryRoomClick={onLibraryRoomClick}
            onLibraryRoomHover={onLibraryRoomHover}
            onFactoryStop={onFactoryStop}
            onBookClick={onBookClick}
            onCredentialClick={onCredentialClick}
          />
        </group>
      )}

      {hovered && (
        <Html center position={[0, h / 2 + 0.35, d / 2 + 0.15]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label">
            {program.id} · F{program.floorNumber}
          </div>
        </Html>
      )}

      <mesh position={[0, h / 2 + 0.012, 0]}>
        <boxGeometry args={[w + 0.04, 0.025, d + 0.04]} />
        <meshStandardMaterial color={pal.graphite} transparent opacity={wireframe ? 0.4 : 0.8} />
      </mesh>
    </group>
  )
}

function Spire({
  yBase,
  extrude,
  theme,
  active,
  wireframe,
}: {
  yBase: number
  extrude: number
  theme: Theme
  active: boolean
  wireframe: boolean
}) {
  const pal = getScenePalette(theme)
  const y = yBase * extrude

  return (
    <group position={[0, y, 0]}>
      {[0, 1, 2, 3, 4].map((i) => {
        const taper = 1 - i * 0.15
        return (
          <mesh key={i} position={[0, i * 0.28 + 0.15, 0]}>
            <boxGeometry args={[0.35 * taper, 0.22, 0.35 * taper]} />
            <meshStandardMaterial
              color={pal.concrete}
              transparent
              opacity={wireframe && !active ? 0.06 : 1}
              depthWrite={!(wireframe && !active)}
            />
          </mesh>
        )
      })}
      <mesh position={[0, SPIRE_HEIGHT * 0.75, 0]}>
        <cylinderGeometry args={[0.012, 0.025, SPIRE_HEIGHT * 0.7, 6]} />
        <meshStandardMaterial color={active ? pal.signal : pal.graphite} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function CyberTower({
  activeFloorId,
  hoveredFloorId,
  labRoomSlug,
  libraryRoomSlug,
  factoryStop,
  viewMode,
  selectedBookSlug,
  selectedCredentialSlug,
  extrude,
  ink,
  theme,
  onFloorHover,
  onFloorClick,
  onLabRoomClick,
  onLabRoomHover,
  onLibraryRoomClick,
  onLibraryRoomHover,
  onFactoryStop,
  onBookClick,
  onCredentialClick,
}: CyberTowerProps) {
  const pal = getScenePalette(theme)
  const invalidate = useThree((s) => s.invalidate)
  const activeProgram = getProgramFloor(activeFloorId)
  const activeY = programCenterY(activeProgram)
  const shaftSegments = useMemo(() => getShaftSegments(), [])
  const glowRef = useRef<THREE.PointLight>(null)
  const isolate = viewMode !== 'tower' && activeFloorId !== 'G'
  const hideGround =
    viewMode !== 'tower' || activeFloorId === 'B2' || activeFloorId === 'B10'
  const isNight = theme === 'dark'

  useEffect(() => {
    if (!glowRef.current) return
    glowRef.current.color.set(pal.signal)
    invalidate()
  }, [activeFloorId, activeProgram, pal.signal, invalidate])

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

  return (
    <group>
      <fog attach="fog" args={[pal.paper, 30, 70]} />

      {!hideGround && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color={pal.paper} roughness={1} />
        </mesh>
      )}

      {!hideGround && (
        <Line points={[[-8, 0.03, 0], [8, 0.03, 0]]} color={pal.graphite} lineWidth={1} transparent opacity={0.35} />
      )}

      {footprint.length >= 2 && (
        <Line points={footprint} color={pal.signal} lineWidth={1.5} transparent opacity={ink} />
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
          {shaftSegments.map((seg, i) => (
            <ShaftSection key={i} segment={seg} extrude={extrude} theme={theme} wireframe={isolate} />
          ))}

          {PROGRAM_FLOORS.map((program) => {
            const entered = program.id === activeFloorId
            const hovered = program.id === hoveredFloorId
            const wireframe = isolate && !entered
            return (
              <ProgramFloorBand
                key={program.id}
                program={program}
                active={entered}
                hovered={hovered}
                entered={entered}
                extrude={extrude}
                theme={theme}
                wireframe={wireframe}
                labRoomSlug={labRoomSlug}
                libraryRoomSlug={libraryRoomSlug}
                factoryStop={factoryStop}
                viewMode={viewMode}
                selectedBookSlug={selectedBookSlug}
                selectedCredentialSlug={selectedCredentialSlug}
                onFloorHover={onFloorHover}
                onFloorClick={onFloorClick}
                onLabRoomClick={onLabRoomClick}
                onLabRoomHover={onLabRoomHover}
                onLibraryRoomClick={onLibraryRoomClick}
                onLibraryRoomHover={onLibraryRoomHover}
                onFactoryStop={onFactoryStop}
                onBookClick={onBookClick}
                onCredentialClick={onCredentialClick}
              />
            )
          })}

          {extrude > 0.85 && (
            <Spire
              yBase={spireBase}
              extrude={extrude}
              theme={theme}
              active={activeFloorId === 'roof'}
              wireframe={isolate && activeFloorId !== 'roof'}
            />
          )}
        </>
      )}

      {isolate && isNight && extrude > 0.5 && (
        <pointLight ref={glowRef} position={[1.2, activeY * extrude, 2]} intensity={0.8} distance={6} decay={2} />
      )}

      {isNight && extrude > 0.5 && (
        <ambientLight intensity={0.12} color="#2F6BFF" />
      )}
    </group>
  )
}

export { BootController } from './CyberTowerBoot'
