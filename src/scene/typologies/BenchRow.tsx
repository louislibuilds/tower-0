import { RoomShell } from '../primitives/RoomShell'
import { WireBox } from '../primitives/WireBox'
import { LabTypology } from './labs'
import { LAB_STATIONS, labStation } from './labAnchors'
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

const FLOOR_W = 1.55
const FLOOR_D = 0.72
const FLOOR_H = 0.46

interface BenchRowProps extends TypologyProps {
  labRoomSlug: string | null
  roomFocus: boolean
  floorOverview: boolean
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — five independent stations (resume2 scatter, not a row) */
export function BenchRow({
  theme,
  accent,
  entered,
  labRoomSlug,
  roomFocus,
  floorOverview,
  onLabRoomClick,
  onLabRoomHover,
}: BenchRowProps) {
  const m = typologyMat(theme, accent, entered)

  if (roomFocus && labRoomSlug) {
    return (
      <LabStationBlock
        slug={labRoomSlug}
        code={labStation(labRoomSlug)?.code ?? '000'}
        theme={theme}
        accent={accent}
        entered={entered}
        active
        enlarged
        onClick={() => onLabRoomClick(labRoomSlug)}
        onHover={onLabRoomHover}
      />
    )
  }

  return (
    <RoomShell width={FLOOR_W} depth={FLOOR_D} height={FLOOR_H} color={m.pal.graphite} floorColor={m.body}>
      {LAB_STATIONS.map(({ slug, code, pos }) => {
        const active = labRoomSlug === slug
        const showAll = floorOverview && entered
        if (labRoomSlug && labRoomSlug !== slug) return null
        return (
          <group key={slug} position={pos}>
            <LabStationBlock
              slug={slug}
              code={code}
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              highlighted={showAll || active}
              onClick={() => onLabRoomClick(slug)}
              onHover={onLabRoomHover}
            />
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
  active,
  highlighted = false,
  enlarged = false,
  onClick,
  onHover,
}: {
  slug: string
  code: string
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  active: boolean
  highlighted?: boolean
  enlarged?: boolean
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const m = typologyMat(theme, accent, entered)
  const lit = active || highlighted
  const w = enlarged ? 0.72 : 0.3
  const d = enlarged ? 0.55 : 0.26
  const h = enlarged ? 0.44 : 0.3

  return (
    <group>
      <mesh
        visible={false}
        onPointerOver={(e) => {
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
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[w + 0.12, h + 0.12, d + 0.12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <RoomShell
        width={w}
        depth={d}
        height={h}
        color={lit ? accent : m.pal.graphite}
        floorColor={m.body}
        openFront
      >
        <WireBox
          size={[w * 0.82, h * 0.55, 0.06]}
          position={[0, h * 0.38, -d / 2 + 0.1]}
          color={m.pal.graphite}
          fillOpacity={0.08}
        />
        <group position={[0, h * 0.22, 0.04]} scale={enlarged ? 1.35 : 1}>
          <LabTypology slug={slug} theme={theme} accent={accent} entered={entered} active={lit} />
        </group>
      </RoomShell>
    </group>
  )
}
