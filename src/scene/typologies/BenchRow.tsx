import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import type { ViewMode } from '../../building/viewMode'
import { FloorPlate } from '../primitives/FloorPlate'
import { LAB_CHUNKS, chunkPosition, labCellAnchor, type ExhibitChunk } from './floorChunks'
import { LAB_BLUEPRINT_DIMS, blueprintFitScale, floorPlateSize } from './interiorScale'
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

const POD_SCALE_RATIO = 0.4
const POD_FIT_MARGIN = 0.48
const FOCUS_FIT_MARGIN = 0.78

/** 52 · Laboratory — five suites with zoom morph (mirrors ArchiveLibraryFloor 99F) */
export function BenchRow({
  theme,
  accent,
  entered,
  labRoomSlug,
  viewMode = 'floor',
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
        const podZone = { w: chunk.size.w * 0.92, d: chunk.size.d * 0.92 }
        const podScale = blueprintFitScale(gridW, gridD, podZone, POD_FIT_MARGIN) * POD_SCALE_RATIO
        const focusScale = blueprintFitScale(gridW, gridD, plate, FOCUS_FIT_MARGIN)
        const [cx, , cz] = chunkPosition(chunk)
        const [tx, , tz] = labCellAnchor(slug, plate, FOCUS_FIT_MARGIN)

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
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const { w, d, h } = chunk.size
  const code = chunk.code ?? ''
  const label = labLabel(code, slug)
  const progress = useZoomMorph(zoomed)
  const groupRef = useRef<Group>(null)
  const [showShell, setShowShell] = useState(false)
  const shellRef = useRef(false)
  const footprintW = w * 0.86
  const footprintD = d * 0.86

  useFrame(() => {
    const p = progress.current
    const scale = lerpZoom(podScale, focusScale, p)
    groupRef.current?.position.set(
      lerpZoom(fromPos[0], toPos[0], p),
      0,
      lerpZoom(fromPos[2], toPos[2], p),
    )
    groupRef.current?.scale.setScalar(scale)

    const nextShell = p > 0.58
    if (nextShell !== shellRef.current) {
      shellRef.current = nextShell
      setShowShell(nextShell)
    }
  })

  const roomLocked = zoomed && viewMode === 'room'

  return (
    <ThinnedStation thin={thin}>
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
            visible={false}
            onClick={(e) => {
              if (thin || roomLocked) return
              e.stopPropagation()
              onClick()
            }}
          >
            <boxGeometry args={[footprintW + 0.06, h + 0.06, footprintD + 0.06]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

          {!zoomed && (
            <StationFootprint
              width={footprintW}
              depth={footprintD}
              theme={theme}
              accent={accent}
              active={active}
              thin={thin}
            />
          )}

          <LabTypology
            slug={slug}
            theme={theme}
            accent={accent}
            entered={entered}
            active={active || showShell}
            showShell={showShell}
          />

          {!thin && (
            <Html center position={[0, (h * 0.5 + 0.08) / focusScale, 0]} style={{ pointerEvents: 'none' }}>
              <div
                className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''} ${zoomed ? 'scene-label--hidden' : ''}`}
              >
                {label}
              </div>
            </Html>
          )}
        </group>
      </group>
    </ThinnedStation>
  )
}
