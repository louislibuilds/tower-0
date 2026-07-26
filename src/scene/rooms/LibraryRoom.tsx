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

  if (roomFocus && libraryRoomSlug === 'library') {
    return (
      <LibraryInterior
        theme={theme}
        accent={accent}
        body={m.body}
        selectedBookSlug={selectedBookSlug}
        onBookClick={onBookClick}
        focus
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
        focus
      />
    )
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <planeGeometry args={[1.35, 0.95]} />
        <meshStandardMaterial color={m.body} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.85]} />
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
  return (
    <group position={[0.38, 0, -0.05]}>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[0.55, 0.55, 0.45]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.4, 0.08]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>
      {active && (
        <Html center position={[0, 0.42, 0.15]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">Archive</div>
        </Html>
      )}
    </group>
  )
}

function LibraryPod({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <group position={[-0.42, 0, 0.1]}>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[0.5, 0.55, 0.45]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.4, 0.06, 0.26]} />
        <meshStandardMaterial color="#9a9a9a" />
      </mesh>
      <mesh position={[-0.12, 0.05, -0.08]}>
        <boxGeometry args={[0.22, 0.35, 0.12]} />
        <meshStandardMaterial color="#7a7a7a" />
      </mesh>
      {active && (
        <Html center position={[0, 0.42, 0.15]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">Library</div>
        </Html>
      )}
    </group>
  )
}

function LibraryInterior({
  theme,
  accent,
  body,
  selectedBookSlug,
  onBookClick,
  focus,
}: {
  theme: RoomProps['theme']
  accent: string
  body: string
  selectedBookSlug: string | null
  onBookClick: (slug: string) => void
  focus?: boolean
}) {
  const pal = getScenePalette(theme)
  const shelfEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.55, 0.55, 0.18)), [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[0.85, 0.65]} />
        <meshStandardMaterial color={body} />
      </mesh>
      <mesh position={[-0.05, 0.05, -0.06]}>
        <boxGeometry args={[0.55, 0.55, 0.14]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>
      <lineSegments geometry={shelfEdges} position={[-0.05, 0.05, -0.06]}>
        <lineBasicMaterial color={pal.graphite} />
      </lineSegments>

      {libraryBooks.map((book, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        const active = selectedBookSlug === book.slug
        return (
          <group key={book.slug} position={[-0.18 + col * 0.22, -0.05 + row * 0.22, 0.02]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                onBookClick(book.slug)
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
            >
              <boxGeometry args={[0.08, 0.18, 0.1]} />
              <meshStandardMaterial color={active ? accent : pal.glass} />
            </mesh>
          </group>
        )
      })}

      {focus && selectedBookSlug && (
        <Html center position={[0, 0.5, 0.1]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">
            {libraryBooks.find((b) => b.slug === selectedBookSlug)?.title}
          </div>
        </Html>
      )}
    </group>
  )
}

function ArchiveInterior({
  theme,
  accent,
  body,
  selectedCredentialSlug,
  onCredentialClick,
  focus,
}: {
  theme: RoomProps['theme']
  accent: string
  body: string
  selectedCredentialSlug: string | null
  onCredentialClick: (slug: string) => void
  focus?: boolean
}) {
  const pal = getScenePalette(theme)
  const show = credentials.slice(0, 6)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[0.85, 0.65]} />
        <meshStandardMaterial color={body} />
      </mesh>
      <mesh position={[0, 0.05, -0.05]}>
        <boxGeometry args={[0.65, 0.5, 0.06]} />
        <meshStandardMaterial color={pal.concrete} />
      </mesh>

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const active = selectedCredentialSlug === cred.slug
        return (
          <group key={cred.slug} position={[-0.22 + col * 0.22, 0.02 + row * 0.22, 0.02]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                onCredentialClick(cred.slug)
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
            >
              <boxGeometry args={[0.16, 0.2, 0.02]} />
              <meshStandardMaterial color={active ? accent : pal.glass} emissive={active ? accent : '#000'} emissiveIntensity={active ? 0.15 : 0} />
            </mesh>
          </group>
        )
      })}

      {focus && selectedCredentialSlug && (
        <Html center position={[0, 0.5, 0.1]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--active">
            {credentials.find((c) => c.slug === selectedCredentialSlug)?.title}
          </div>
        </Html>
      )}
    </group>
  )
}

export const LibraryRoom = ArchiveLibraryRoom
