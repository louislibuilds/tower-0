import { Html } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

interface ArchiveLibraryRoomProps extends RoomProps {
  libraryRoomSlug: LibraryRoomSlug | null
  roomFocus: boolean
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

/** 99 · Archive + Library — same floor, two rooms */
export function ArchiveLibraryRoom(props: ArchiveLibraryRoomProps) {
  const {
    theme,
    accent,
    entered,
    libraryRoomSlug,
    roomFocus,
    selectedBookSlug,
    selectedCredentialSlug,
    onLibraryRoomClick,
    onLibraryRoomHover,
    onBookClick,
    onCredentialClick,
  } = props
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)
  const floorEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.35, 0.02, 0.95)),
    [],
  )

  if (roomFocus && libraryRoomSlug === 'library') {
    return (
      <LibraryInterior
        theme={theme}
        accent={accent}
        body={m.body}
        selectedBookSlug={selectedBookSlug}
        onBookClick={onBookClick}
      />
    )
  }

  if (roomFocus && libraryRoomSlug === 'archive') {
    return (
      <ArchiveInterior
        theme={theme}
        accent={accent}
        body={m.body}
        selectedCredentialSlug={selectedCredentialSlug}
        onCredentialClick={onCredentialClick}
      />
    )
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.36, 0]}>
        <planeGeometry args={[1.35, 0.95]} />
        <meshStandardMaterial color={m.body} />
      </mesh>
      <lineSegments geometry={floorEdges} position={[0, -0.35, 0]}>
        <lineBasicMaterial color={pal.graphite} transparent opacity={0.45} />
      </lineSegments>

      {/* Center partition wall */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.06, 0.55, 0.85]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>

      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          onLibraryRoomHover('archive')
        }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <ArchivePod
          active={libraryRoomSlug === 'archive'}
          onClick={() => onLibraryRoomClick('archive')}
        />
      </group>

      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          onLibraryRoomHover('library')
        }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <LibraryPod active={libraryRoomSlug === 'library'} onClick={() => onLibraryRoomClick('library')} />
      </group>
    </group>
  )
}

function ArchivePod({ active, onClick }: { active: boolean; onClick: () => void }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.52, 0.48, 0.1)), [])
  return (
    <group position={[0.42, 0.02, -0.02]}>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[0.58, 0.55, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Certificate wall frame */}
      <mesh>
        <boxGeometry args={[0.52, 0.48, 0.08]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={active ? '#2F6BFF' : '#2A2C2E'} />
      </lineSegments>
      {/* Mini cert frames preview */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.14 + i * 0.14, 0.02 + (i % 2) * 0.12, 0.05]}>
          <boxGeometry args={[0.12, 0.16, 0.02]} />
          <meshStandardMaterial color="#d4d0c8" />
        </mesh>
      ))}
      <Html center position={[0, 0.38, 0.12]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Archive</div>
      </Html>
    </group>
  )
}

function LibraryPod({ active, onClick }: { active: boolean; onClick: () => void }) {
  const shelfEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.48, 0.52, 0.16)), [])
  return (
    <group position={[-0.42, 0.02, 0.08]}>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[0.55, 0.58, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Bookshelf body */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[0.48, 0.52, 0.14]} />
        <meshStandardMaterial color="#7a7a7a" />
      </mesh>
      <lineSegments geometry={shelfEdges} position={[0, 0, -0.04]}>
        <lineBasicMaterial color={active ? '#2F6BFF' : '#2A2C2E'} />
      </lineSegments>
      {/* Shelf boards */}
      {[-0.14, 0.02, 0.18].map((y) => (
        <mesh key={y} position={[0, y, -0.04]}>
          <boxGeometry args={[0.44, 0.03, 0.15]} />
          <meshStandardMaterial color="#9a9a9a" />
        </mesh>
      ))}
      {/* Book spines preview */}
      {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
        <mesh key={x} position={[x, 0.08, 0.02]}>
          <boxGeometry args={[0.06, 0.22, 0.08]} />
          <meshStandardMaterial color={['#2F6BFF', '#5a8a5a', '#8a5a5a', '#5a5a8a'][i]} />
        </mesh>
      ))}
      <Html center position={[0, 0.38, 0.12]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Library</div>
      </Html>
    </group>
  )
}

function LibraryInterior({
  theme,
  accent,
  body,
  selectedBookSlug,
  onBookClick,
}: {
  theme: RoomProps['theme']
  accent: string
  body: string
  selectedBookSlug: string | null
  onBookClick: (slug: string) => void
}) {
  const pal = getScenePalette(theme)
  const shelfEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.72, 0.62, 0.18)), [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
        <planeGeometry args={[0.95, 0.72]} />
        <meshStandardMaterial color={body} />
      </mesh>

      {/* Large bookshelf */}
      <mesh position={[-0.05, 0.06, -0.08]}>
        <boxGeometry args={[0.72, 0.62, 0.16]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>
      <lineSegments geometry={shelfEdges} position={[-0.05, 0.06, -0.08]}>
        <lineBasicMaterial color={pal.graphite} />
      </lineSegments>

      {/* Shelf boards */}
      {[-0.18, -0.02, 0.14].map((y) => (
        <mesh key={y} position={[-0.05, y, -0.08]}>
          <boxGeometry args={[0.68, 0.04, 0.17]} />
          <meshStandardMaterial color={pal.resin} />
        </mesh>
      ))}

      {libraryBooks.map((book, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        const active = selectedBookSlug === book.slug
        const colors = ['#2F6BFF', '#3a7a4a', '#8a4a4a', '#6a5a8a', '#8a7a3a']
        return (
          <group key={book.slug} position={[-0.22 + col * 0.28, -0.12 + row * 0.24, 0.02]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                onBookClick(book.slug)
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
            >
              <boxGeometry args={[0.1, 0.22, 0.12]} />
              <meshStandardMaterial
                color={active ? accent : colors[i % colors.length]}
                emissive={active ? accent : '#000'}
                emissiveIntensity={active ? 0.2 : 0}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function ArchiveInterior({
  theme,
  accent,
  body,
  selectedCredentialSlug,
  onCredentialClick,
}: {
  theme: RoomProps['theme']
  accent: string
  body: string
  selectedCredentialSlug: string | null
  onCredentialClick: (slug: string) => void
}) {
  const pal = getScenePalette(theme)
  const show = credentials.slice(0, 6)
  const wallEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.78, 0.58, 0.08)), [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
        <planeGeometry args={[0.95, 0.72]} />
        <meshStandardMaterial color={body} />
      </mesh>

      {/* Certificate wall */}
      <mesh position={[0, 0.06, -0.06]}>
        <boxGeometry args={[0.78, 0.58, 0.06]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>
      <lineSegments geometry={wallEdges} position={[0, 0.06, -0.06]}>
        <lineBasicMaterial color={pal.graphite} />
      </lineSegments>

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const active = selectedCredentialSlug === cred.slug
        return (
          <group key={cred.slug} position={[-0.24 + col * 0.24, -0.02 + row * 0.24, 0.02]}>
            {/* Frame */}
            <mesh position={[0, 0, -0.01]}>
              <boxGeometry args={[0.18, 0.22, 0.02]} />
              <meshStandardMaterial color={pal.graphite} />
            </mesh>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                onCredentialClick(cred.slug)
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
            >
              <boxGeometry args={[0.15, 0.18, 0.025]} />
              <meshStandardMaterial
                color={active ? accent : '#d8d4cc'}
                emissive={active ? accent : '#000'}
                emissiveIntensity={active ? 0.15 : 0}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export const LibraryRoom = ArchiveLibraryRoom
