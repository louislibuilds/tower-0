import { RoomShell } from '../primitives/RoomShell'
import { lab52Interior, STATION_OVERVIEW } from './interiorScale'
import { LabTypology, StationPlinth } from './labs'
import { LAB_STATIONS } from './labAnchors'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'

export {
  LAB_CAMERA_TARGETS,
  LAB_STATIONS as LAB_LAYOUT,
} from './labAnchors'

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

/** 52 · Laboratory — five independent stations (resume2 scatter) */
export function BenchRow({
  theme,
  accent,
  entered,
  labRoomSlug,
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
      {LAB_STATIONS.map(({ slug, pos }) => {
        const active = labRoomSlug === slug
        const thin = enteringLab && !active
        const lit = active || (entered && !enteringLab)

        return (
          <group key={slug} position={pos}>
            <ThinnedStation thin={thin}>
              <LabStationBlock
                slug={slug}
                theme={theme}
                accent={accent}
                entered={entered}
                lit={lit}
                thin={thin}
                onClick={() => onLabRoomClick(slug)}
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
  slug,
  theme,
  accent,
  entered,
  lit,
  thin,
  onClick,
  onHover,
}: {
  slug: string
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  lit: boolean
  thin: boolean
  onClick: () => void
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
          if (thin) return
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[w + 0.1, h + 0.1, d + 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <StationPlinth theme={theme} accent={accent} entered={entered} active={lit} width={w} depth={d} />
      <group position={[0, 0.06, 0]}>
        <LabTypology slug={slug} theme={theme} accent={accent} entered={entered} active={lit} />
      </group>
    </group>
  )
}
