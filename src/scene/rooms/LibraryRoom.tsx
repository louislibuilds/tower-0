import { Html } from '@react-three/drei'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { getScenePalette } from '../palette'
import { BackWallPanel, RoomShell } from '../primitives/RoomShell'
import { themeMat, type RoomProps } from './types'

const LIB_W = 0.52
const LIB_D = 0.42
const LIB_H = 0.48
const ARC_W = 0.52
const ARC_D = 0.42
const ARC_H = 0.48

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

/** 99 · Archive + Library — interior dollhouse rooms */
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
        accent={accent}
        body={m.body}
        selectedBookSlug={selectedBookSlug}
        onBookClick={onBookClick}
        pal={pal}
      />
    )
  }

  if (roomFocus && libraryRoomSlug === 'archive') {
    return (
      <ArchiveInterior
        accent={accent}
        body={m.body}
        selectedCredentialSlug={selectedCredentialSlug}
        onCredentialClick={onCredentialClick}
        pal={pal}
      />
    )
  }

  return (
    <group>
      <group
        position={[-0.34, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onLibraryRoomHover('library') }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <LibraryPod
          active={libraryRoomSlug === 'library'}
          onClick={() => onLibraryRoomClick('library')}
          pal={pal}
          color={m.body}
          accent={accent}
        />
      </group>

      <group
        position={[0.34, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onLibraryRoomHover('archive') }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <ArchivePod
          active={libraryRoomSlug === 'archive'}
          onClick={() => onLibraryRoomClick('archive')}
          pal={pal}
          color={m.body}
          accent={accent}
        />
      </group>
    </group>
  )
}

function LibraryPod({
  active,
  onClick,
  pal,
  color,
  accent,
}: {
  active: boolean
  onClick: () => void
  pal: ReturnType<typeof getScenePalette>
  color: string
  accent: string
}) {
  return (
    <group>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[LIB_W + 0.08, LIB_H + 0.08, LIB_D + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <RoomShell width={LIB_W} depth={LIB_D} height={LIB_H} color={active ? accent : pal.graphite} floorColor={color}>
        <BackWallPanel width={0.44} height={0.38} depth={0.1} roomDepth={LIB_D} color={pal.graphite} accent={accent} active={active} />
        {[-0.1, 0, 0.1].map((x, i) => (
          <mesh key={x} position={[x, 0.12 + (i % 2) * 0.08, -LIB_D / 2 + 0.12]}>
            <boxGeometry args={[0.05, 0.16, 0.06]} />
            <meshStandardMaterial color={['#2F6BFF', '#5a8a5a', '#8a5a5a'][i]} />
          </mesh>
        ))}
      </RoomShell>
      <Html center position={[0, LIB_H / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Library</div>
      </Html>
    </group>
  )
}

function ArchivePod({
  active,
  onClick,
  pal,
  color,
  accent,
}: {
  active: boolean
  onClick: () => void
  pal: ReturnType<typeof getScenePalette>
  color: string
  accent: string
}) {
  return (
    <group>
      <mesh visible={false} onClick={(e) => { e.stopPropagation(); onClick() }}>
        <boxGeometry args={[ARC_W + 0.08, ARC_H + 0.08, ARC_D + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <RoomShell width={ARC_W} depth={ARC_D} height={ARC_H} color={active ? accent : pal.graphite} floorColor={color}>
        <BackWallPanel width={0.44} height={0.36} depth={0.06} roomDepth={ARC_D} color={pal.graphite} accent={accent} active={active} />
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.12 + i * 0.12, 0.1 + (i % 2) * 0.1, -ARC_D / 2 + 0.1]}>
            <boxGeometry args={[0.1, 0.13, 0.02]} />
            <meshStandardMaterial color="#d4d0c8" />
          </mesh>
        ))}
      </RoomShell>
      <Html center position={[0, ARC_H / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Archive</div>
      </Html>
    </group>
  )
}

function LibraryInterior({
  accent,
  body,
  selectedBookSlug,
  onBookClick,
  pal,
}: {
  accent: string
  body: string
  selectedBookSlug: string | null
  onBookClick: (slug: string) => void
  pal: ReturnType<typeof getScenePalette>
}) {
  const w = 0.78
  const d = 0.58
  const h = 0.52

  return (
    <RoomShell width={w} depth={d} height={h} color={pal.graphite} floorColor={body}>
      <BackWallPanel width={0.68} height={0.46} depth={0.12} roomDepth={d} color={pal.concrete} accent={accent} />
      {[-0.2, -0.06, 0.08, 0.22].map((y) => (
        <mesh key={y} position={[0, y + 0.08, -d / 2 + 0.14]}>
          <boxGeometry args={[0.64, 0.03, 0.1]} />
          <meshStandardMaterial color={pal.resin} />
        </mesh>
      ))}

      {libraryBooks.map((book, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        const active = selectedBookSlug === book.slug
        const colors = ['#2F6BFF', '#3a7a4a', '#8a4a4a', '#6a5a8a', '#8a7a3a']
        return (
          <mesh
            key={book.slug}
            position={[-0.14 + col * 0.28, 0.06 + row * 0.18, -d / 2 + 0.2]}
            onClick={(e) => { e.stopPropagation(); onBookClick(book.slug) }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
          >
            <boxGeometry args={[0.09, 0.2, 0.08]} />
            <meshStandardMaterial
              color={active ? accent : colors[i % colors.length]}
              emissive={active ? accent : '#000'}
              emissiveIntensity={active ? 0.2 : 0}
            />
          </mesh>
        )
      })}
    </RoomShell>
  )
}

function ArchiveInterior({
  accent,
  body,
  selectedCredentialSlug,
  onCredentialClick,
  pal,
}: {
  accent: string
  body: string
  selectedCredentialSlug: string | null
  onCredentialClick: (slug: string) => void
  pal: ReturnType<typeof getScenePalette>
}) {
  const w = 0.78
  const d = 0.58
  const h = 0.52
  const show = credentials.slice(0, 6)

  return (
    <RoomShell width={w} depth={d} height={h} color={pal.graphite} floorColor={body}>
      <BackWallPanel width={0.7} height={0.44} depth={0.06} roomDepth={d} color={pal.concrete} accent={accent} />

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const active = selectedCredentialSlug === cred.slug
        return (
          <group key={cred.slug} position={[-0.22 + col * 0.22, 0.08 + row * 0.2, -d / 2 + 0.12]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.17, 0.2, 0.02]} />
              <meshStandardMaterial color={pal.graphite} />
            </mesh>
            <mesh
              position={[0, 0, 0.015]}
              onClick={(e) => { e.stopPropagation(); onCredentialClick(cred.slug) }}
              onPointerOver={() => { document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = 'crosshair' }}
            >
              <boxGeometry args={[0.14, 0.17, 0.02]} />
              <meshStandardMaterial
                color={active ? accent : '#d8d4cc'}
                emissive={active ? accent : '#000'}
                emissiveIntensity={active ? 0.15 : 0}
              />
            </mesh>
          </group>
        )
      })}
    </RoomShell>
  )
}

export const LibraryRoom = ArchiveLibraryRoom
