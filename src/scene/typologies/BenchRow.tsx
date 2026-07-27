import { Html } from '@react-three/drei'
import { FloorPlate } from '../primitives/FloorPlate'
import { LAB_CHUNKS, chunkPosition, type ExhibitChunk } from './floorChunks'
import { LAB_BLUEPRINT_DIMS, blueprintFitScale, floorPlateSize } from './interiorScale'
import { LabTypology } from './labs'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'

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
  return `Lab - ${code} ${labShortTitle(slug)}`
}

interface BenchRowProps extends TypologyProps {
  labRoomSlug: string | null
  roomFocus: boolean
  floorOverview: boolean
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — corridor floor plate with five suite cells */
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
        <boxGeometry args={[0.16, 0.002, plate.d * 0.9]} />
        <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.002, 0]}>
        <boxGeometry args={[plate.w * 0.72, 0.002, 0.12]} />
        <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.4} />
      </mesh>

      {LAB_CHUNKS.map((chunk) => {
        const slug = chunk.slug
        const active = labRoomSlug === slug
        const thin = enteringLab && !active
        const lit = active || (entered && !enteringLab)
        const [cx, , cz] = chunkPosition(chunk)

        return (
          <group key={slug} position={[cx, 0, cz]} rotation={[0, chunk.rotation ?? 0, 0]}>
            <ThinnedStation thin={thin}>
              <LabStationBlock
                chunk={chunk}
                slug={slug}
                theme={theme}
                accent={accent}
                entered={entered}
                lit={lit}
                thin={thin}
                roomFocus={roomFocus && active}
                code={chunk.code ?? ''}
                onRoomClick={() => onLabRoomClick(slug)}
                onHover={onLabRoomHover}
              />
            </ThinnedStation>
          </group>
        )
      })}
    </FloorPlate>
  )
}

function LabStationBlock({
  chunk,
  slug,
  code,
  theme,
  accent,
  entered,
  lit,
  thin,
  roomFocus,
  onRoomClick,
  onHover,
}: {
  chunk: ExhibitChunk
  slug: string
  code: string
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  lit: boolean
  thin: boolean
  roomFocus: boolean
  onRoomClick: () => void
  onHover: (slug: string | null) => void
}) {
  const { w, d, h } = chunk.size
  const [gridW, gridD] = LAB_BLUEPRINT_DIMS[slug] ?? [5, 5]
  const typologyScale = blueprintFitScale(gridW, gridD, { w: w * 0.92, d: d * 0.92 }, 0.72)

  return (
    <group>
      <mesh
        visible={false}
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
        onClick={(e) => {
          if (thin || roomFocus) return
          e.stopPropagation()
          onRoomClick()
        }}
      >
        <boxGeometry args={[w + 0.12, h + 0.12, d + 0.12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <StationFootprint width={w} depth={d} theme={theme} accent={accent} active={lit} thin={thin} />
      <group position={[0, 0.012, 0]} scale={typologyScale}>
        <LabTypology slug={slug} theme={theme} accent={accent} entered={entered} active={lit} />
      </group>

      {!thin && (
        <Html center position={[0, h + 0.16, 0]} style={{ pointerEvents: 'none' }}>
          <div
            className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''} ${roomFocus ? 'scene-label--hidden' : ''}`}
          >
            {labLabel(code, slug)}
          </div>
        </Html>
      )}
    </group>
  )
}
