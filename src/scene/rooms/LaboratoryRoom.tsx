import { Html } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { labProjects } from '../../data/projects'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

const LAB_LAYOUT: { slug: string; code: string; pos: [number, number, number] }[] = [
  { slug: 'unihack-2026', code: 'Lab-001', pos: [-0.55, 0, 0.22] },
  { slug: 'cloud-computing', code: 'Lab-002', pos: [0, 0, -0.12] },
  { slug: 'nlp', code: 'Lab-003', pos: [0.55, 0, 0.22] },
  { slug: 'dl', code: 'Lab-004', pos: [-0.32, 0, -0.28] },
  { slug: 'kata', code: 'Lab-005', pos: [0.38, 0, -0.28] },
]

interface LaboratoryRoomProps extends RoomProps {
  labRoomSlug: string | null
  roomFocus: boolean
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — numbered box rooms */
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
  const floorEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.45, 0.02, 1.0)),
    [],
  )
  const roomEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.85, 0.55, 0.72)), [])

  if (roomFocus && labRoomSlug) {
    const project = labProjects.find((p) => p.slug === labRoomSlug)
    const layout = LAB_LAYOUT.find((l) => l.slug === labRoomSlug)

    return (
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
          <planeGeometry args={[1.0, 0.78]} />
          <meshStandardMaterial color={m.body} />
        </mesh>

        {/* Box room shell */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.85, 0.55, 0.72]} />
          <meshStandardMaterial color={pal.resin} transparent opacity={0.35} />
        </mesh>
        <lineSegments geometry={roomEdges} position={[0, 0.08, 0]}>
          <lineBasicMaterial color={accent} />
        </lineSegments>

        {/* Door frame */}
        <mesh position={[0, -0.08, 0.37]}>
          <boxGeometry args={[0.28, 0.32, 0.04]} />
          <meshStandardMaterial color={pal.concrete} />
        </mesh>

        <Html center position={[0, 0.42, 0.38]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--lab">
            {layout?.code ?? 'Lab'}
          </div>
        </Html>

        {project && (
          <Html center position={[0, 0.28, 0.1]} style={{ pointerEvents: 'none' }}>
            <div className="scene-label scene-label--active scene-label--lab-title">
              {project.title.split(' — ')[0]}
            </div>
          </Html>
        )}
      </group>
    )
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.34, 0]}>
        <planeGeometry args={[1.45, 1.0]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
      <lineSegments geometry={floorEdges} position={[0, -0.33, 0]}>
        <lineBasicMaterial color={pal.graphite} transparent opacity={0.5} />
      </lineSegments>

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
    </group>
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
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.34, 0.32, 0.34)), [])

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
        <boxGeometry args={[0.38, 0.36, 0.38]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Box room */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.34, 0.32, 0.34]} />
        <meshStandardMaterial
          color={active ? pal.glass : pal.resin}
          transparent
          opacity={active ? 0.95 : entered ? 0.75 : 0.5}
        />
      </mesh>
      <lineSegments geometry={edges} position={[0, 0.12, 0]}>
        <lineBasicMaterial color={active ? accent : pal.graphite} />
      </lineSegments>

      {/* Door */}
      <mesh position={[0, 0.02, 0.18]}>
        <boxGeometry args={[0.12, 0.18, 0.03]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>

      <Html center position={[0, 0.38, 0.2]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>
          {code}
        </div>
      </Html>

      {(active || entered) && (
        <Html center position={[0, 0.52, 0.15]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">
            {title.split(' — ')[0]}
          </div>
        </Html>
      )}
    </group>
  )
}
