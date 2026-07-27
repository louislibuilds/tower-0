import { Html } from '@react-three/drei'
import { RoomShell } from '../primitives/RoomShell'
import { WireBox } from '../primitives/WireBox'
import { LAB_CHUNKS, chunkPosition, RAISED_TIER_LIFT } from './floorChunks'
import { lab52Interior, STATION_OVERVIEW } from './interiorScale'
import { LabTypology, StationPlinth } from './labs'
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

/** 52 · Laboratory — five chunk blocks with tier scatter (resume2-style) */
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
    <group>
      <WireBox
        size={[interior.w, 0.02, interior.d]}
        position={[0, -interior.h / 2 + 0.01, 0]}
        color={m.pal.graphite}
        fillOpacity={0.08}
        fillColor={m.body}
      />

      {/* Raised mezzanine strip — back row sits on this tier */}
      <mesh position={[0, -interior.h / 2 + RAISED_TIER_LIFT / 2, -0.08]}>
        <boxGeometry args={[interior.w * 0.88, RAISED_TIER_LIFT, interior.d * 0.42]} />
        <meshStandardMaterial color={m.pal.resin} transparent opacity={0.35} />
      </mesh>

      {LAB_CHUNKS.map((chunk) => {
        const slug = chunk.slug
        const active = labRoomSlug === slug
        const thin = enteringLab && !active
        const lit = active || (entered && !enteringLab)
        const [cx, cy, cz] = chunkPosition(chunk)
        const { w, d, h } = chunk.size

        return (
          <group key={slug} position={[cx, cy, cz]}>
            <ThinnedStation thin={thin}>
              <RoomShell
                width={w}
                depth={d}
                height={h}
                color={active ? accent : m.pal.graphite}
                floorColor={m.body}
              >
                <LabStationBlock
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
              </RoomShell>
            </ThinnedStation>
          </group>
        )
      })}
    </group>
  )
}

function LabStationBlock({
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
  const { w, d, h } = STATION_OVERVIEW

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

      <StationPlinth theme={theme} accent={accent} entered={entered} active={lit} width={w} depth={d} />
      <group position={[0, 0.06, 0]}>
        <LabTypology slug={slug} theme={theme} accent={accent} entered={entered} active={lit} />
      </group>

      <Html center position={[0, h + 0.18, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${lit ? 'scene-label--active' : ''}`}>
          {labLabel(code, slug)}
        </div>
      </Html>
    </group>
  )
}
