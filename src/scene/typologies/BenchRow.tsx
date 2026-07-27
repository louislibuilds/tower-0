import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import type { ViewMode } from '../../building/viewMode'
import { useSite } from '../../context/SiteContext'
import { FloorPlate } from '../primitives/FloorPlate'
import { markTowerPick } from '../primitives/pickVolume'
import { StationCallout } from '../primitives/StationCallout'
import { LAB_CHUNKS, chunkPosition, labCellAnchor, STATION_FOOTPRINT_INSET, STATION_HIT_MARGIN, type ExhibitChunk } from './floorChunks'
import { focusPodScale, floorPlateSize, LAB_BLUEPRINT_DIMS, overviewPodScale } from './interiorScale'
import { LabTypology } from './labs'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'
import { lerpZoom, useZoomMorph } from './useZoomMorph'

export { LAB_CAMERA_TARGETS, LAB_STATIONS as LAB_LAYOUT } from './labAnchors'

export function labShortTitle(slug: string): string {
  if (slug === 'unihack-2026') return 'Unihack 2026'
  if (slug === 'cloud-computing') return 'SUNishop'
  if (slug === 'nlp') return 'Mock Interview'
  if (slug === 'dl') return 'VTuber Mocap'
  if (slug === 'kata') return 'KATA'
  return slug
}

export function labLabel(code: string, slug: string): string {
  return `Lab · ${code} ${labShortTitle(slug)}`
}

interface BenchRowProps extends TypologyProps {
  labRoomSlug: string | null
  roomFocus: boolean
  floorOverview: boolean
  viewMode?: ViewMode
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — five suites with zoom morph (mirrors ArchiveLibraryFloor 99F) */
export function BenchRow({
  theme,
  accent,
  entered,
  labRoomSlug,
  viewMode = 'floor',
  floorOverview = false,
  onLabRoomClick,
  onLabRoomHover,
}: BenchRowProps) {
  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('52')

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      {LAB_CHUNKS.map((chunk) => {
        const slug = chunk.slug
        const active = labRoomSlug === slug
        const thin = !!labRoomSlug && !active
        const zoomed = active && (viewMode === 'room' || viewMode === 'focus')
        const [gridW, gridD] = LAB_BLUEPRINT_DIMS[slug] ?? [5, 5]
        const podScale = overviewPodScale(gridW, gridD, chunk.size, plate.w)
        const focusScale = focusPodScale(gridW, gridD, plate)
        const [cx, , cz] = chunkPosition(chunk)
        const [tx, , tz] = labCellAnchor(slug, plate, focusScale)

        return (
          <LabMorphZone
            key={slug}
            chunk={chunk}
            slug={slug}
            podScale={podScale}
            focusScale={focusScale}
            fromPos={[cx, 0, cz]}
            toPos={[tx, 0, tz]}
            zoomed={zoomed}
            thin={thin}
            active={active}
            theme={theme}
            accent={accent}
            entered={entered}
            viewMode={viewMode}
            floorOverview={floorOverview}
            onClick={() => onLabRoomClick(slug)}
            onHover={onLabRoomHover}
          />
        )
      })}
    </FloorPlate>
  )
}

function LabMorphZone({
  chunk,
  slug,
  podScale,
  focusScale,
  fromPos,
  toPos,
  zoomed,
  thin,
  active,
  theme,
  accent,
  entered,
  viewMode,
  floorOverview,
  onClick,
  onHover,
}: {
  chunk: ExhibitChunk
  slug: string
  podScale: number
  focusScale: number
  fromPos: [number, number, number]
  toPos: [number, number, number]
  zoomed: boolean
  thin: boolean
  active: boolean
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  viewMode: ViewMode
  floorOverview: boolean
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const { navigateBack } = useSite()
  const { w, d, h } = chunk.size
  const code = chunk.code ?? ''
  const title = labShortTitle(slug)
  const progress = useZoomMorph(zoomed)
  const groupRef = useRef<Group>(null)
  const [showShell, setShowShell] = useState(false)
  const shellRef = useRef(false)
  const footprintW = w * STATION_FOOTPRINT_INSET
  const footprintD = d * STATION_FOOTPRINT_INSET
  const hitW = footprintW + STATION_HIT_MARGIN.w
  const hitH = h + STATION_HIT_MARGIN.h
  const hitD = footprintD + STATION_HIT_MARGIN.d

  useFrame(() => {
    const p = progress.current
    const scale = lerpZoom(podScale, focusScale, p)
    groupRef.current?.position.set(
      lerpZoom(fromPos[0], toPos[0], p),
      0,
      lerpZoom(fromPos[2], toPos[2], p),
    )
    groupRef.current?.scale.setScalar(scale)

    const nextShell = zoomed && p > 0.58
    if (nextShell !== shellRef.current) {
      shellRef.current = nextShell
      setShowShell(nextShell)
    }
  })

  const roomLocked = zoomed && viewMode === 'room'

  return (
    <ThinnedStation thin={thin}>
      {floorOverview && !thin && !zoomed && (
        <group position={fromPos}>
          <StationCallout
            code={code}
            title={title}
            active={active}
            overview
            anchorY={h * podScale * 0.5}
            offset={chunk.calloutOffset ?? [0, 0.32, 0.18]}
          />
        </group>
      )}
      <group ref={groupRef}>
        <group
          onPointerOver={(e) => {
            if (thin) return
            e.stopPropagation()
            onHover(slug)
          }}
          onPointerOut={() => onHover(null)}
        >
          <mesh
            ref={(m) => markTowerPick(m)}
            raycast={roomLocked ? () => null : undefined}
            onClick={(e) => {
              if (thin || roomLocked) return
              e.stopPropagation()
              onClick()
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              if (viewMode === 'room' || viewMode === 'focus') {
                navigateBack()
              }
            }}
          >
            <boxGeometry args={[hitW, hitH, hitD]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <StationFootprint
            width={footprintW}
            depth={footprintD}
            theme={theme}
            accent={accent}
            active={active || zoomed}
            thin={thin}
          />

          <LabTypology
            slug={slug}
            theme={theme}
            accent={accent}
            entered={entered}
            active={active || (showShell && zoomed)}
            thin={thin}
            showShell={showShell}
          />
        </group>
      </group>
    </ThinnedStation>
  )
}
