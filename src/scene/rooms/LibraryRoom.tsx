import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { credentials } from '../../data/credentials'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { EASE_SITE } from '../motion'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

interface ArchiveLibraryRoomProps extends RoomProps {
  libraryRoomSlug: LibraryRoomSlug | null
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
}

/** 99 · Archive (plan chest) + Library (reading desk) — same floor, two rooms */
export function ArchiveLibraryRoom({
  theme,
  accent,
  entered,
  libraryRoomSlug,
  onLibraryRoomClick,
  onLibraryRoomHover,
}: ArchiveLibraryRoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <planeGeometry args={[1.35, 0.95]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>

      {/* Partition wall between archive and library */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.85]} />
        <meshStandardMaterial color={pal.concrete} transparent opacity={0.85} />
      </mesh>

      <ArchiveWing
        active={libraryRoomSlug === 'archive'}
        entered={entered}
        theme={theme}
        accent={accent}
        onClick={() => onLibraryRoomClick('archive')}
        onHover={onLibraryRoomHover}
      />

      <LibraryWing
        active={libraryRoomSlug === 'library'}
        entered={entered}
        theme={theme}
        accent={accent}
        onClick={() => onLibraryRoomClick('library')}
        onHover={onLibraryRoomHover}
      />
    </group>
  )
}

function ArchiveWing({
  active,
  entered: _entered,
  theme,
  accent,
  onClick,
  onHover,
}: {
  active: boolean
  entered: boolean
  theme: RoomProps['theme']
  accent: string
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
}) {
  const pal = getScenePalette(theme)
  const invalidate = useThree((s) => s.invalidate)
  const [hover, setHover] = useState(false)
  const drawerRefs = useRef<(THREE.Group | null)[]>([])
  const lit = active || hover
  const showCount = Math.min(4, credentials.length)

  useEffect(() => {
    drawerRefs.current.forEach((g, i) => {
      if (!g) return
      const open = active && i === 0
      gsap.to(g.position, {
        z: -0.08 + (open ? 0.12 : 0),
        duration: 0.4,
        ease: EASE_SITE,
        onUpdate: invalidate,
      })
    })
  }, [active, invalidate])

  return (
    <group position={[0.38, 0, -0.05]}>
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          onHover('archive')
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          onHover(null)
          document.body.style.cursor = 'crosshair'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[0.55, 0.6, 0.45]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.52, 0.45, 0.38]} />
        <meshStandardMaterial color={pal.resin} roughness={0.85} />
      </mesh>

      {Array.from({ length: showCount }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            drawerRefs.current[i] = el
          }}
          position={[-0.15 + i * 0.1, 0.08 + i * 0.1, -0.08]}
        >
          <mesh>
            <boxGeometry args={[0.38, 0.06, 0.28]} />
            <meshStandardMaterial color={lit ? pal.concrete : pal.shade} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.04, 0.14]}>
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshStandardMaterial color={accent} />
          </mesh>
        </group>
      ))}

      {lit && (
        <Html center position={[0, 0.42, 0.2]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">Archive</div>
        </Html>
      )}
    </group>
  )
}

function LibraryWing({
  active,
  entered,
  theme,
  accent,
  onClick,
  onHover,
}: {
  active: boolean
  entered: boolean
  theme: RoomProps['theme']
  accent: string
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
}) {
  const pal = getScenePalette(theme)
  const [hover, setHover] = useState(false)
  const lit = active || hover
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.42, 0.06, 0.28)), [])

  return (
    <group position={[-0.42, 0, 0.12]}>
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          onHover('library')
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          onHover(null)
          document.body.style.cursor = 'crosshair'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[0.5, 0.55, 0.45]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Desk */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.42, 0.06, 0.28]} />
        <meshStandardMaterial color={pal.concrete} metalness={0.55} roughness={0.4} />
      </mesh>
      <lineSegments geometry={edges} position={[0, -0.12, 0]}>
        <lineBasicMaterial color={lit ? accent : pal.graphite} />
      </lineSegments>

      {/* Desk lamp / light patch */}
      <mesh position={[0.12, 0.08, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.14, 8]} />
        <meshStandardMaterial color={pal.graphite} metalness={0.7} />
      </mesh>
      <mesh position={[0.12, 0.16, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color={pal.signal}
          emissive={entered && lit ? pal.signal : '#000000'}
          emissiveIntensity={entered && lit ? 0.35 : 0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Open book / platform */}
      <mesh position={[-0.08, -0.06, 0.06]} rotation={[0.2, 0.3, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.14]} />
        <meshStandardMaterial color={pal.glass} transparent opacity={0.75} />
      </mesh>

      {lit && (
        <Html center position={[0, 0.35, 0.15]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">Library</div>
        </Html>
      )}
    </group>
  )
}

/** @deprecated use ArchiveLibraryRoom */
export const LibraryRoom = ArchiveLibraryRoom
