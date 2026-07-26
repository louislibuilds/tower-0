import { Html } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { labProjects } from '../../data/projects'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

const LAB_LAYOUT: { slug: string; pos: [number, number, number] }[] = [
  { slug: 'unihack-2026', pos: [-0.55, 0.05, 0.28] },
  { slug: 'cloud-computing', pos: [0, 0.12, -0.18] },
  { slug: 'nlp', pos: [0.55, 0.05, 0.28] },
  { slug: 'dl', pos: [-0.32, -0.18, -0.32] },
  { slug: 'kata', pos: [0.38, -0.18, -0.28] },
]

interface LaboratoryRoomProps extends RoomProps {
  labRoomSlug: string | null
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

/** 52 · Laboratory — five clickable project sub-rooms */
export function LaboratoryRoom({
  theme,
  accent,
  entered,
  labRoomSlug,
  onLabRoomClick,
  onLabRoomHover,
}: LaboratoryRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  const partitionEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.35, 0.5, 0.95)),
    [],
  )

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[1.35, 0.95]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>

      <lineSegments geometry={partitionEdges} position={[0, -0.05, 0]}>
        <lineBasicMaterial color={pal.graphite} transparent opacity={0.35} />
      </lineSegments>

      {LAB_LAYOUT.map(({ slug, pos }) => {
        const active = labRoomSlug === slug
        const project = labProjects.find((p) => p.slug === slug)
        if (!project) return null

        return (
          <LabSubRoom
            key={slug}
            slug={slug}
            title={project.title}
            position={pos}
            active={active}
            entered={entered}
            theme={theme}
            accent={accent}
            onClick={() => onLabRoomClick(slug)}
            onHover={onLabRoomHover}
          />
        )
      })}
    </group>
  )
}

function LabSubRoom({
  slug,
  title,
  position,
  active,
  entered,
  theme,
  accent,
  onClick,
  onHover,
}: {
  slug: string
  title: string
  position: [number, number, number]
  active: boolean
  entered: boolean
  theme: RoomProps['theme']
  accent: string
  onClick: () => void
  onHover: (slug: string | null) => void
}) {
  const pal = getScenePalette(theme)
  const lit = active || entered
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.38, 0.32, 0.32)), [])

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
        <boxGeometry args={[0.42, 0.36, 0.36]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh>
        <boxGeometry args={[0.36, 0.06, 0.28]} />
        <meshStandardMaterial color={pal.concrete} metalness={0.6} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial
          color={lit ? pal.glass : pal.resin}
          transparent
          opacity={active ? 0.95 : 0.65}
        />
      </mesh>

      <lineSegments geometry={edges} position={[0, 0.2, 0]}>
        <lineBasicMaterial color={active ? accent : pal.graphite} transparent opacity={active ? 1 : 0.7} />
      </lineSegments>

      {active && (
        <Html center position={[0, 0.55, 0]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">{title.split(' — ')[0]}</div>
        </Html>
      )}
    </group>
  )
}
