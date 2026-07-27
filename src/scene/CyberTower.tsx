import { Html, Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../context/SiteContext'
import { getFloor, type FloorId } from '../building/program'
import {
  bandExtrudeProgress,
  shaftExtrudeProgress,
  spireExtrudeProgress,
} from '../building/sitePhase'
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
import { TowerMass } from './mass/TowerMass'
import { EdgeInkContext, WindowMatrix } from './primitives'
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
  teardownFill?: number
  teardownBlueprint?: number
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
  shellFade,
}: {
  segment: ShaftSegment
  extrude: number
  theme: Theme
  shellFade: boolean
}) {
  const pal = getScenePalette(theme)
  const shaftExtrude = shaftExtrudeProgress(extrude)
  const y = segment.yBottom + (segment.height / 2) * shaftExtrude
  const h = segment.height * shaftExtrude
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

  const isNight = theme === 'dark'
  const shaftFill = isNight ? pal.bpFace : pal.resin
  const shaftOpacity = shellFade ? 0.06 : isNight ? 0.18 : 1

  if (shaftExtrude < 0.01) return null

  return (
    <group position={[0, y, 0]}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={shaftFill}
          roughness={0.85}
          metalness={isNight ? 0.15 : 0.05}
          transparent={shellFade || isNight}
          opacity={shaftOpacity}
          depthWrite={!shellFade && !isNight}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={isNight ? pal.neon : pal.graphite}
          transparent
          opacity={shellFade ? 0.45 : isNight ? 0.7 : 0.55}
        />
      </lineSegments>
      {Array.from({ length: 5 }).map((_, i) => {
        const x = -w / 2 + 0.12 + i * ((w - 0.24) / 4)
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.006]}>
            <planeGeometry args={[0.04, h * 0.96]} />
            <meshStandardMaterial
              color={isNight ? pal.neon : pal.shade}
              transparent
              opacity={shellFade ? 0.1 : isNight ? 0.22 : 0.4}
            />
          </mesh>
        )
      })}
      {floorLines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={isNight ? pal.neonBright : pal.grid}
          lineWidth={0.5}
          transparent
          opacity={isNight ? 0.55 : 0.4}
        />
      ))}
    </group>
  )
}

function ProgramFloorBand({
  program,
  active,
  hovered,
  entered,
  globalExtrude,
  bandIndex,
  totalBands,
  teardownFill,
  theme,
  shellFade,
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
  globalExtrude: number
  bandIndex: number
  totalBands: number
  teardownFill: number
  theme: Theme
  shellFade: boolean
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
  const bandProgress = bandExtrudeProgress(globalExtrude, bandIndex, totalBands)
  const baseY = programBaseY(program)
  const y = baseY + (program.bandHeight / 2) * bandProgress
  const h = program.bandHeight * bandProgress
  const w = program.width
  const d = program.depth
  const lit = active || hovered
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])
  const isNight = theme === 'dark'
  const zone = getFloor(program.id).zone
  const windowPattern = zone === 'basement' ? 'basement' as const : zone === 'roof' ? 'tower' as const : 'grid' as const

  const fillOpacity = (() => {
    if (shellFade) return 0.12
    if (entered && (viewMode === 'room' || viewMode === 'focus')) {
      if (program.id === '52' && labRoomSlug) return isNight ? 0.1 : 0.05
      if (program.id === '99' && libraryRoomSlug) return isNight ? 0.1 : 0.05
      if (program.id === '23' && factoryStop !== null) return isNight ? 0.1 : 0.05
      if (program.id === 'B2' || program.id === 'B10') return isNight ? 0.12 : 0.06
      return isNight ? 0.14 : 0.08
    }
    if (entered && viewMode === 'floor') {
      if (program.id === 'B2' || program.id === 'B10') return 0.1
    }
    if (entered && viewMode !== 'tower') {
      return viewMode === 'floor' ? 0.28 : 0.22
    }
    return 1
  })() * teardownFill

  const hideFacade =
    entered &&
    (viewMode === 'room' || viewMode === 'focus' || viewMode === 'floor') &&
    ((program.id === '52' && !!labRoomSlug) ||
      (program.id === '99' && !!libraryRoomSlug) ||
      (program.id === '23' && factoryStop !== null) ||
      program.id === 'B2' ||
      program.id === 'B10')

  if (bandProgress < 0.01) return null

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
          color={isNight ? pal.bpFace : lit ? pal.concrete : pal.resin}
          roughness={isNight ? 0.35 : 0.85}
          metalness={isNight ? 0.2 : 0.05}
          transparent
          opacity={fillOpacity * (isNight && entered ? 0.85 : 1)}
          depthWrite={fillOpacity > 0.25}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={lit ? pal.signal : pal.graphite}
          transparent
          opacity={shellFade ? 0.7 : lit ? 1 : 0.65}
        />
      </lineSegments>

      {
        !hideFacade && (
        <group position={[0, 0, d / 2 + 0.01]}>
          <WindowMatrix
            width={w * 0.88}
            height={h * 0.72}
            cols={zone === 'basement' ? 4 : 5}
            rows={zone === 'roof' ? 2 : 4}
            pattern={windowPattern}
            night={isNight}
            active={lit}
            accentRatio={0.12}
          />
        </group>
        )
      }

      {isNight && entered && (
        <pointLight position={[0, 0.35, 0]} intensity={0.85} distance={4.5} color={pal.neonBright} decay={2} />
      )}

      {entered && bandProgress > 0.6 && (
        <group
          position={[0, -h / 2 + 0.02, 0]}
          scale={
            program.id === 'roof'
              ? viewMode === 'room' || viewMode === 'focus'
                ? 1.2
                : 0.95
              : viewMode === 'room' || viewMode === 'focus'
                ? program.id === '52' && labRoomSlug
                  ? 0.92
                  : program.id === '99'
                    ? 0.95
                    : 0.88
                : viewMode === 'floor' && program.id === '52'
                  ? 0.78
                  : viewMode === 'floor' && program.id === '99'
                    ? 0.76
                    : viewMode === 'floor' && (program.id === 'B2' || program.id === 'B10')
                      ? 0.88
                    : viewMode === 'floor' && (labRoomSlug || libraryRoomSlug || factoryStop !== null)
                      ? 0.74
                      : 0.64
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
        <meshStandardMaterial color={pal.graphite} transparent opacity={shellFade ? 0.45 : 0.8} />
      </mesh>
    </group>
  )
}

function Spire({
  yBase,
  extrude,
  theme,
  active,
  shellFade,
}: {
  yBase: number
  extrude: number
  theme: Theme
  active: boolean
  shellFade: boolean
}) {
  const pal = getScenePalette(theme)
  const spireProgress = spireExtrudeProgress(extrude)
  const y = yBase * spireProgress
  const faded = shellFade && !active

  if (spireProgress < 0.01) return null

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
              opacity={faded ? 0.12 : 1}
              depthWrite={!faded}
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
  teardownFill = 1,
  teardownBlueprint = 0,
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
  const hideGround = activeFloorId === 'B2' || activeFloorId === 'B10'
  const isNight = theme === 'dark'

  useEffect(() => {
    if (!glowRef.current) return
    glowRef.current.color.set(pal.signal)
    invalidate()
  }, [activeFloorId, activeProgram, pal.signal, invalidate])

  const footprintW = PROGRAM_FLOORS[0].width
  const footprintD = PROGRAM_FLOORS[0].depth
  const edgeInk = useMemo(() => {
    if (teardownBlueprint <= 0) return null
    return '#' + new THREE.Color(pal.graphite).lerp(new THREE.Color(pal.blueprint), teardownBlueprint).getHexString()
  }, [teardownBlueprint, pal.graphite, pal.blueprint])

  const roofProgram = getProgramFloor('roof')
  const spireBase = programBaseY(roofProgram) + roofProgram.bandHeight

  return (
    <EdgeInkContext.Provider value={edgeInk}>
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

      <TowerMass
        ink={ink}
        extrude={extrude}
        theme={theme}
        footprintW={footprintW}
        footprintD={footprintD}
      />

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
            <ShaftSection key={i} segment={seg} extrude={extrude} theme={theme} shellFade={isolate} />
          ))}

          {PROGRAM_FLOORS.map((program, bandIndex) => {
            const entered = program.id === activeFloorId
            const hovered = program.id === hoveredFloorId
            const shellFade = isolate && !entered
            return (
              <ProgramFloorBand
                key={program.id}
                program={program}
                active={entered}
                hovered={hovered}
                entered={entered}
                globalExtrude={extrude}
                bandIndex={bandIndex}
                totalBands={PROGRAM_FLOORS.length}
                teardownFill={teardownFill}
                theme={theme}
                shellFade={shellFade}
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

          {spireExtrudeProgress(extrude) > 0.01 && (
            <Spire
              yBase={spireBase}
              extrude={extrude}
              theme={theme}
              active={activeFloorId === 'roof'}
              shellFade={isolate && activeFloorId !== 'roof'}
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
    </EdgeInkContext.Provider>
  )
}

export { BootController } from './controllers/BootController'
