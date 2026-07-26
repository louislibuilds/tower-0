import { Html } from '@react-three/drei'
import { labProjects } from '../../data/projects'
import { getScenePalette } from '../palette'
import { RoomShell } from '../primitives/RoomShell'
import { themeMat, type RoomProps } from './types'

const LAB_LAYOUT: { slug: string; code: string; pos: [number, number, number] }[] = [
  { slug: 'unihack-2026', code: 'Lab-001', pos: [-0.48, 0, -0.08] },
  { slug: 'cloud-computing', code: 'Lab-002', pos: [0, 0, 0.12] },
  { slug: 'nlp', code: 'Lab-003', pos: [0.48, 0, -0.08] },
  { slug: 'dl', code: 'Lab-004', pos: [-0.28, 0, 0.22] },
  { slug: 'kata', code: 'Lab-005', pos: [0.32, 0, 0.22] },
]

const FLOOR_W = 1.35
const FLOOR_D = 0.88
const FLOOR_H = 0.5

interface LaboratoryRoomProps extends RoomProps {
  labRoomSlug: string | null
  roomFocus: boolean
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — interior floor with numbered box rooms */
export function LaboratoryRoom({
  theme,
  accent,
  entered,
  labRoomSlug,
  roomFocus,
  onLabRoomClick,
  onLabRoomHover,
}: LaboratoryRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  if (roomFocus && labRoomSlug) {
    const project = labProjects.find((p) => p.slug === labRoomSlug)
    const layout = LAB_LAYOUT.find((l) => l.slug === labRoomSlug)

    return (
      <RoomShell width={0.72} depth={0.55} height={0.48} color={accent} floorColor={m.body}>
        <mesh position={[0, 0.18, -0.55 / 2 + 0.15]}>
          <boxGeometry args={[0.5, 0.3, 0.08]} />
          <meshStandardMaterial color={pal.resin} transparent opacity={0.35} />
        </mesh>
        <Html center position={[0, 0.38, 0.1]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--lab">{layout?.code ?? 'Lab'}</div>
        </Html>
        {project && (
          <Html center position={[0, 0.28, -0.05]} style={{ pointerEvents: 'none' }}>
            <div className="scene-label scene-label--active scene-label--lab-title">
              {project.title.split(' — ')[0]}
            </div>
          </Html>
        )}
      </RoomShell>
    )
  }

  return (
    <RoomShell width={FLOOR_W} depth={FLOOR_D} height={FLOOR_H} color={pal.graphite} floorColor={m.body}>
      {LAB_LAYOUT.map(({ slug, code, pos }) => {
        const active = labRoomSlug === slug
        const project = labProjects.find((p) => p.slug === slug)
        if (!project) return null
        return (
          <LabBox
            key={slug}
            slug={slug}
            code={code}
            title={project.title}
            position={pos}
            active={active}
            theme={theme}
            accent={accent}
            entered={entered}
            onClick={() => onLabRoomClick(slug)}
            onHover={onLabRoomHover}
          />
        )
      })}
    </RoomShell>
  )
}

function LabBox({
  slug,
  code,
  title,
  position,
  active,
  theme,
  accent,
  entered,
  onClick,
  onHover,
}: {
  slug: string
  code: string
  title: string
  position: [number, number, number]
  active: boolean
  theme: RoomProps['theme']
  accent: string
  entered: boolean
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const pal = getScenePalette(theme)
  const w = 0.28
  const d = 0.26
  const h = 0.3

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
        <boxGeometry args={[w + 0.06, h + 0.06, d + 0.06]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <RoomShell
        width={w}
        depth={d}
        height={h}
        color={active ? accent : pal.graphite}
        floorColor={pal.resin}
        openFront
      />

      <Html center position={[0, h / 2 + 0.1, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>{code}</div>
      </Html>

      {(active || entered) && (
        <Html center position={[0, h / 2 + 0.22, 0]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">{title.split(' — ')[0]}</div>
        </Html>
      )}
    </group>
  )
}
