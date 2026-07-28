import { Line } from '@react-three/drei'
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
import { EdgeInkContext, FloorPickTarget, GroundGrid, LobbyAutoDoors, StationCallout, WindowMatrix } from './primitives'
import { FloorRoom } from './rooms'
import { IdentityPlate } from './typologies/IdentityPlate'

import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'

interface CyberTowerProps {
  activeFloorId: FloorId | null
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
  onFactoryStopHover: (stop: number | null) => void
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
      <mesh raycast={() => null}>
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
      <lineSegments geometry={edges} raycast={() => null}>
        <lineBasicMaterial
          color={isNight ? pal.neon : pal.graphite}
          transparent
          opacity={shellFade ? 0.45 : isNight ? 0.7 : 0.55}
        />
      </lineSegments>
      {Array.from({ length: 5 }).map((_, i) => {
        const x = -w / 2 + 0.12 + i * ((w - 0.24) / 4)
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.006]} raycast={() => null}>
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

/** Dollhouse cutaway — drop +Z front & +X right faces (camera side), decorative only */
function BandCutawayShell({
  w,
  h,
  d,
  color,
  opacity,
}: {
  w: number
  h: number
  d: number
  color: string
  opacity: number
}) {
  const t = 0.035
  const skip = () => null

  return (
    <group>
      <mesh position={[0, 0, -d / 2 + t / 2]} raycast={skip}>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <mesh position={[-w / 2 + t / 2, 0, 0]} raycast={skip}>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <mesh position={[0, -h / 2 + t / 2, 0]} raycast={skip}>
        <boxGeometry args={[w, t, d]} />
        <meshStandardMaterial color={color} transparent opacity={opacity * 0.85} depthWrite={false} />
      </mesh>
    </group>
  )
}

function ProgramFloorBand({
  program,
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
  onFactoryStopHover,
  onBookClick,
  onCredentialClick,
}: {
  program: ProgramFloor
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
  onFactoryStopHover: (stop: number | null) => void
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
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])
  const isNight = theme === 'dark'
  const zone = getFloor(program.id).zone
  const windowPattern = zone === 'basement' ? 'basement' as const : zone === 'roof' ? 'tower' as const : 'grid' as const

  /** Site-rail floor zoom — peel camera-facing band faces, keep back/side shell */
  const floorCutaway =
    entered &&
    viewMode === 'floor' &&
    !labRoomSlug &&
    !libraryRoomSlug &&
    (program.id === '52' || program.id === '99')

  const hideBandShell =
    entered && program.id === '23' && (viewMode === 'floor' || viewMode === 'room' || viewMode === 'focus')

  const shellColor = isNight ? pal.bpFace : entered ? pal.concrete : pal.resin

  const fillOpacity = (() => {
    if (shellFade) return 0.12
    if (hideBandShell) return 0
    if (floorCutaway) return isNight ? 0.22 : 0.18
    if (entered && (viewMode === 'room' || viewMode === 'focus')) {
      if (program.id === '52' && labRoomSlug) return isNight ? 0.1 : 0.05
      if (program.id === '99' && libraryRoomSlug) return isNight ? 0.1 : 0.05
      if (program.id === '23' && factoryStop !== null) return isNight ? 0.1 : 0.05
      if (program.id === 'B2' || program.id === 'B10') return isNight ? 0.12 : 0.06
      return isNight ? 0.14 : 0.08
    }
    if (entered && viewMode === 'floor') {
      if (program.id === 'B2' || program.id === 'B10' || program.id === '23') return 0.1
    }
    if (entered && viewMode !== 'tower') {
      return viewMode === 'floor' ? 0.28 : 0.22
    }
    return 1
  })() * teardownFill

  const hideFacade =
    entered &&
    (viewMode === 'room' || viewMode === 'focus' || floorCutaway) &&
    ((program.id === '52' && (floorCutaway || !!labRoomSlug)) ||
      (program.id === '99' && (floorCutaway || !!libraryRoomSlug)) ||
      (program.id === '23' && (viewMode === 'floor' || viewMode === 'room' || factoryStop !== null)) ||
      program.id === 'B2' ||
      program.id === 'B10')

  /** Floors with clickable interior pods on floor overview */
  const hasInteriorPods = program.id === '52' || program.id === '99' || program.id === '23'

  /** Off while inside a floor/room so interior pod picks win; re-enabled at tower overview */
  const disableFloorPick =
    viewMode !== 'tower' &&
    entered &&
    ((viewMode === 'floor' && hasInteriorPods) ||
      ((viewMode === 'room' || viewMode === 'focus') &&
        ((program.id === '52' && !!labRoomSlug) ||
          (program.id === '99' && !!libraryRoomSlug) ||
          (program.id === '23' && factoryStop !== null) ||
          program.id === 'B2' ||
          program.id === 'B10')))

  if (bandProgress < 0.01) return null

  return (
    <group position={[0, y, 0]}>
      {floorCutaway ? (
        <BandCutawayShell w={w} h={h} d={d} color={shellColor} opacity={fillOpacity * teardownFill} />
      ) : (
        !hideBandShell && (
          <mesh raycast={() => null}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color={shellColor}
              roughness={isNight ? 0.35 : 0.85}
              metalness={isNight ? 0.2 : 0.05}
              transparent
              opacity={fillOpacity * (isNight && entered ? 0.85 : 1)}
              depthWrite={fillOpacity > 0.25}
            />
          </mesh>
        )
      )}

      {!hideBandShell && !floorCutaway && (
      <lineSegments geometry={edges} raycast={() => null}>
        <lineBasicMaterial
          color={pal.graphite}
          transparent
          opacity={shellFade ? 0.2 : entered ? 0.72 : 0.58}
        />
      </lineSegments>
      )}

      {
        !hideFacade && !shellFade && (
        <group position={[0, 0, d / 2 + 0.01]}>
          {program.id === 'G' ? (
            <LobbyAutoDoors
              bandWidth={w}
              bandHeight={h}
              night={isNight}
              active={hovered}
            />
          ) : (
            <WindowMatrix
              width={w * 0.88}
              height={h * 0.72}
              cols={zone === 'basement' ? 4 : 5}
              rows={zone === 'roof' ? 2 : 4}
              pattern={windowPattern}
              night={isNight}
              active={hovered}
              accentRatio={0.12}
            />
          )}
        </group>
        )
      }

      {isNight && entered && !hideBandShell && !floorCutaway && (
        <pointLight position={[0, 0.35, 0]} intensity={0.85} distance={4.5} color={pal.neonBright} decay={2} />
      )}

      {entered && bandProgress > 0.6 && viewMode !== 'tower' && (
        <group position={[0, -h / 2, 0]}>
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
            onFactoryStopHover={onFactoryStopHover}
            onBookClick={onBookClick}
            onCredentialClick={onCredentialClick}
          />
        </group>
      )}

      {hovered && (
        <StationCallout
          code={getFloor(program.id).label}
          title={getFloor(program.id).title}
          edge
          anchorY={h * 0.5}
          offset={[0, 0.22, d * 0.5 + 0.2]}
        />
      )}

      {viewMode !== 'tower' && !hideBandShell && !floorCutaway && (
      <mesh position={[0, h / 2 + 0.012, 0]} raycast={() => null}>
        <boxGeometry args={[w + 0.04, 0.025, d + 0.04]} />
        <meshStandardMaterial
          color={isNight ? pal.graphite : shellColor}
          transparent
          opacity={shellFade ? 0.16 : isNight ? 0.8 : 0.35}
        />
      </mesh>
      )}

      {!disableFloorPick && (
      <FloorPickTarget
        size={[w, h, d]}
        accent={pal.signal}
        hovered={hovered}
        hitPad={viewMode === 'tower' ? 1.22 : undefined}
        onClick={() => onFloorClick(program.id)}
        onHover={(over) => onFloorHover(over ? program.id : null)}
      />
      )}
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
  onFactoryStopHover,
  onBookClick,
  onCredentialClick,
}: CyberTowerProps) {
  const pal = getScenePalette(theme)
  const invalidate = useThree((s) => s.invalidate)
  const activeProgram = activeFloorId ? getProgramFloor(activeFloorId) : getProgramFloor('G')
  const activeY = programCenterY(activeProgram)
  const shaftSegments = useMemo(() => getShaftSegments(), [])
  const glowRef = useRef<THREE.PointLight>(null)
  const isolate = viewMode !== 'tower' && activeFloorId !== null && activeFloorId !== 'G'
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
  const f99 = getProgramFloor('99')
  const identityPlateY = programBaseY(f99) + f99.bandHeight
  const identityPlateX = -f99.width / 2 + f99.width * 0.27
  const identityPlateZ = f99.depth / 2 + 0.015
  const showIdentityPlate = extrude > 0.55

  return (
    <EdgeInkContext.Provider value={edgeInk}>
    <group>
      <fog attach="fog" args={[pal.paper, 30, 70]} />

      {extrude > 0.05 && <GroundGrid extent={12} step={0.75} opacity={0.24} />}

      <Line points={[[-8, 0.03, 0], [8, 0.03, 0]]} color={pal.graphite} lineWidth={1} transparent opacity={0.35} />

      <TowerMass
        ink={ink}
        extrude={extrude}
        theme={theme}
        footprintW={footprintW}
        footprintD={footprintD}
        showGroundGrid={false}
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
            const entered =
              activeFloorId !== null && program.id === activeFloorId && viewMode !== 'tower'
            const hovered = program.id === hoveredFloorId
            const shellFade = isolate && !entered
            return (
              <ProgramFloorBand
                key={program.id}
                program={program}
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
                onFactoryStopHover={onFactoryStopHover}
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

          {showIdentityPlate && (
            <group position={[identityPlateX, identityPlateY, identityPlateZ]}>
              <IdentityPlate
                theme={theme}
                focus={activeFloorId === 'roof'}
                muted={activeFloorId === '99'}
              />
            </group>
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
