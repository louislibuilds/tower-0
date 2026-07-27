import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import { useSite } from '../../context/SiteContext'
import { FloorPlate } from '../primitives/FloorPlate'
import { LAB_CHUNKS, chunkPosition, type ExhibitChunk } from './floorChunks'
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
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

const POD_SCALE_RATIO = 0.38
const POD_FIT_MARGIN = 0.46

/** 52 · Laboratory — corridor floor with five zoom-morph lab pods (99F pattern) */
export function BenchRow({
  theme,
  accent,
  entered,
  labRoomSlug,
  roomFocus,
  onLabRoomClick,
  onLabRoomHover,
}: BenchRowProps) {
  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('52')
  const enteringLab = !!labRoomSlug

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      <mesh position={[0, 0.002, 0]}>
        <boxGeometry args={[0.14, 0.002, plate.d * 0.88]} />
        <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, 0.002, 0]}>
        <boxGeometry args={[plate.w * 0.68, 0.002, 0.1]} />
        <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.32} />
      </mesh>

      {LAB_CHUNKS.map((chunk) => {
        const slug = chunk.slug
        const active = labRoomSlug === slug
        const thin = enteringLab && !active
        const zoomed = active && roomFocus
        const [gridW, gridD] = LAB_BLUEPRINT_DIMS[slug] ?? [5, 5]
        const podScale = blueprintFitScale(gridW, gridD, chunk.size, POD_FIT_MARGIN) * POD_SCALE_RATIO
        const focusScale = blueprintFitScale(
          gridW,
          gridD,
          { w: chunk.size.w * 0.94, d: chunk.size.d * 0.94 },
          0.72,
        )
        const [cx, , cz] = chunkPosition(chunk)

        return (
          <LabMorphZone
            key={slug}
            chunk={chunk}
            slug={slug}
            code={chunk.code ?? ''}
            position={[cx, 0, cz]}
            rotation={chunk.rotation ?? 0}
            podScale={podScale}
            focusScale={focusScale}
            zoomed={zoomed}
            thin={thin}
            active={active}
            lit={active || (entered && !enteringLab)}
            theme={theme}
            accent={accent}
            entered={entered}
            onRoomClick={() => onLabRoomClick(slug)}
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
  code,
  position,
  rotation,
  podScale,
  focusScale,
  zoomed,
  thin,
  active,
  lit,
  theme,
  accent,
  entered,
  onRoomClick,
  onHover,
}: {
  chunk: ExhibitChunk
  slug: string
  code: string
  position: [number, number, number]
  rotation: number
  podScale: number
  focusScale: number
  zoomed: boolean
  thin: boolean
  active: boolean
  lit: boolean
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  onRoomClick: () => void
  onHover: (slug: string | null) => void
}) {
  const { hoveredLabSlug } = useSite()
  const { w, d, h } = chunk.size
  const progress = useZoomMorph(zoomed)
  const groupRef = useRef<Group>(null)
  const [showDetail, setShowDetail] = useState(false)
  const detailRef = useRef(false)
  const footprintW = w * 0.86
  const footprintD = d * 0.86
  const showFullLabel = hoveredLabSlug === slug || active

  useFrame(() => {
    const p = progress.current
    const scale = lerpZoom(podScale, focusScale, p)
    groupRef.current?.position.set(position[0], 0, position[2])
    groupRef.current?.scale.setScalar(scale)

    const next = p > 0.55
    if (next !== detailRef.current) {
      detailRef.current = next
      setShowDetail(next)
    }
  })

  return (
    <group rotation={[0, rotation, 0]}>
      <ThinnedStation thin={thin}>
        <group ref={groupRef}>
          <group
            onPointerOver={(e) => {
              if (thin) return
              e.stopPropagation()
              onHover(slug)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
              document.body.style.cursor = 'crosshair'
            }}
          >
            <mesh
              visible={false}
              onClick={(e) => {
                if (thin || zoomed) return
                e.stopPropagation()
                onRoomClick()
              }}
            >
              <boxGeometry args={[footprintW + 0.08, h + 0.08, footprintD + 0.08]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {!zoomed && (
              <StationFootprint
                width={footprintW}
                depth={footprintD}
                theme={theme}
                accent={accent}
                active={lit}
                thin={thin}
              />
            )}

            <group position={[0, 0.012, 0]}>
              <LabTypology
                slug={slug}
                theme={theme}
                accent={accent}
                entered={entered}
                active={lit || showDetail}
              />
            </group>

            {!thin && (
              <Html center position={[0, h * 0.55 + 0.06, 0]} style={{ pointerEvents: 'none' }}>
                <div className="scene-label-stack">
                  <div
                    className={`scene-label scene-label--tiny ${lit ? 'scene-label--active' : ''} ${zoomed ? 'scene-label--hidden' : ''}`}
                  >
                    Lab · {code}
                  </div>
                  {showFullLabel && !zoomed && (
                    <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>
                      {labShortTitle(slug)}
                    </div>
                  )}
                </div>
              </Html>
            )}
          </group>
        </group>
      </ThinnedStation>
    </group>
  )
}
