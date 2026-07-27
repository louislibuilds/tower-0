import { Html } from '@react-three/drei'
import { RoomShell } from '../primitives/RoomShell'
import { LAB_CHUNKS, chunkPosition, type ExhibitChunk } from './floorChunks'
import { lab52Interior } from './interiorScale'
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

/** 52 · Laboratory ??one flat floor shell, five scattered station blocks */
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
  const interior = lab52Interior()
  const enteringLab = !!labRoomSlug

  return (
    <RoomShell
      width={interior.w}
      depth={interior.d}
      height={interior.h}
      color={m.pal.graphite}
      floorColor={m.body}
    >
      {LAB_CHUNKS.map((chunk) => {
        const slug = chunk.slug
        const active = labRoomSlug === slug
        const thin = enteringLab && !active
        const lit = active || (entered && !enteringLab)
        const [cx, cy, cz] = chunkPosition(chunk)

        return (
          <group key={slug} position={[cx, cy, cz]}>
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
    </RoomShell>
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
        <boxGeometry args={[w + 0.14, h + 0.14, d + 0.14]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <StationFootprint width={w} depth={d} theme={theme} accent={accent} active={lit} thin={thin} />
      <group position={[0, 0.04, 0]}>
        <LabTypology slug={slug} theme={theme} accent={accent} entered={entered} active={lit} />
      </group>

      {!thin && (
        <Html center position={[0, h + 0.22, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>
            {labLabel(code, slug)}
          </div>
        </Html>
      )}
    </group>
  )
}
