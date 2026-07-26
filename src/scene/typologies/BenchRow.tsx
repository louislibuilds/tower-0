import { Html } from '@react-three/drei'
import { RoomShell } from '../primitives/RoomShell'
import { WireBox } from '../primitives/WireBox'
import { LabTypology, LabTypologyPreview } from './labs'
import { typologyMat, type TypologyProps } from './types'

export const LAB_LAYOUT: { slug: string; code: string; pos: [number, number, number] }[] = [
  { slug: 'unihack-2026', code: '001', pos: [-0.56, 0, -0.05] },
  { slug: 'cloud-computing', code: '002', pos: [-0.28, 0, -0.05] },
  { slug: 'nlp', code: '003', pos: [0, 0, -0.05] },
  { slug: 'dl', code: '004', pos: [0.28, 0, -0.05] },
  { slug: 'kata', code: '005', pos: [0.56, 0, -0.05] },
]

export const LAB_CAMERA_TARGETS: Record<string, [number, number, number]> = Object.fromEntries(
  LAB_LAYOUT.map(({ slug, pos }) => [slug, pos]),
)

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

/** 52 · Bench Row — five lab typologies in one interior */
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
    const layout = LAB_LAYOUT.find((l) => l.slug === labRoomSlug)
    return (
      <RoomShell width={0.62} depth={0.48} height={0.42} color={accent} floorColor={m.body}>
        <WireBox
          size={[0.48, 0.28, 0.08]}
          position={[0, 0.16, -0.48 / 2 + 0.12]}
          color={m.pal.graphite}
          fillOpacity={0.1}
        />
        <group position={[0, 0.1, 0]}>
          <LabTypology slug={labRoomSlug} theme={theme} accent={accent} entered={entered} active />
        </group>
        <Html center position={[0, 0.34, 0.08]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--lab scene-label--one-line">
            {layout ? labLabel(layout.code, layout.slug) : 'Lab'}
          </div>
        </Html>
      </RoomShell>
    )
  }

  return (
    <RoomShell width={FLOOR_W} depth={FLOOR_D} height={FLOOR_H} color={m.pal.graphite} floorColor={m.body}>
      {LAB_LAYOUT.map(({ slug, code, pos }) => {
        const active = labRoomSlug === slug
        const showAll = floorOverview && entered
        return (
          <LabBench
            key={slug}
            slug={slug}
            code={code}
            position={pos}
            active={active}
            highlighted={showAll || active}
            theme={theme}
            accent={accent}
            onClick={() => onLabRoomClick(slug)}
            onHover={onLabRoomHover}
          />
        )
      })}
    </RoomShell>
  )
}

function LabBench({
  slug,
  code,
  position,
  active,
  highlighted,
  theme,
  accent,
  onClick,
  onHover,
}: {
  slug: string
  code: string
  position: [number, number, number]
  active: boolean
  highlighted: boolean
  theme: TypologyProps['theme']
  accent: string
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const m = typologyMat(theme, accent, highlighted)
  const w = 0.22
  const d = 0.2
  const h = 0.26
  const lit = active || highlighted

  return (
    <group position={position}>
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
        <boxGeometry args={[w + 0.08, h + 0.08, d + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <WireBox
        size={[w, h, d]}
        position={[0, h / 2 + 0.02, 0]}
        color={lit ? accent : m.pal.graphite}
        fillOpacity={lit ? 0.14 : 0.06}
        fillColor={lit ? m.pal.glass : m.pal.resin}
      />

      <group position={[0, h / 2 + 0.02, 0.02]}>
        <LabTypologyPreview slug={slug} theme={theme} accent={accent} entered={highlighted} active={active} />
      </group>

      <Html center position={[0, h + 0.14, 0.02]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab scene-label--one-line ${active ? 'scene-label--active' : ''}`}>
          {labLabel(code, slug)}
        </div>
      </Html>
    </group>
  )
}
