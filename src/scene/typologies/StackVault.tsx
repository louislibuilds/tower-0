import { Html } from '@react-three/drei'
import { Fragment } from 'react'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { BackWallPanel, RoomShell } from '../primitives/RoomShell'
import { typologyMat, type TypologyProps } from './types'

const POD_W = 0.52
const POD_D = 0.42
const POD_H = 0.48

interface StackVaultProps extends TypologyProps {
  libraryRoomSlug: LibraryRoomSlug | null
  roomFocus: boolean
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

/** 99 · Stack Room + Vault Wall — library and archive pods */
export function StackVaultFloor(props: StackVaultProps) {
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

  if (roomFocus && libraryRoomSlug === 'library') {
    return (
      <StackRoomInterior
        theme={theme}
        accent={accent}
        entered={entered}
        selectedBookSlug={selectedBookSlug}
        onBookClick={onBookClick}
      />
    )
  }

  if (roomFocus && libraryRoomSlug === 'archive') {
    return (
      <VaultWallInterior
        theme={theme}
        accent={accent}
        entered={entered}
        selectedCredentialSlug={selectedCredentialSlug}
        onCredentialClick={onCredentialClick}
      />
    )
  }

  const m = typologyMat(theme, accent, entered)

  return (
    <group>
      <group
        position={[-0.34, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onLibraryRoomHover('library')
        }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <StackRoomPod
          active={libraryRoomSlug === 'library'}
          onClick={() => onLibraryRoomClick('library')}
          body={m.body}
          accent={accent}
          pal={m.pal}
        />
      </group>

      <group
        position={[0.34, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onLibraryRoomHover('archive')
        }}
        onPointerOut={() => onLibraryRoomHover(null)}
      >
        <VaultWallPod
          active={libraryRoomSlug === 'archive'}
          onClick={() => onLibraryRoomClick('archive')}
          body={m.body}
          accent={accent}
          pal={m.pal}
        />
      </group>
    </group>
  )
}

function StackRoomPod({
  active,
  onClick,
  body,
  accent,
  pal,
}: {
  active: boolean
  onClick: () => void
  body: string
  accent: string
  pal: ReturnType<typeof typologyMat>['pal']
}) {
  return (
    <group>
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[POD_W + 0.08, POD_H + 0.08, POD_D + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <RoomShell width={POD_W} depth={POD_D} height={POD_H} color={active ? accent : pal.graphite} floorColor={body}>
        <BackWallPanel
          width={0.44}
          height={0.38}
          depth={0.1}
          roomDepth={POD_D}
          color={pal.graphite}
          accent={accent}
          active={active}
        />
        {[-0.14, -0.04, 0.06, 0.16].map((y, row) =>
          Array.from({ length: 4 }).map((_, col) => {
            const x = -0.12 + col * 0.08
            const colors = ['#2F6BFF', '#5a8a5a', '#8a5a5a', '#6a5a8a']
            return (
              <mesh key={`${row}-${col}`} position={[x, y + 0.1, -POD_D / 2 + 0.12]}>
                <boxGeometry args={[0.05, 0.1 + (col % 2) * 0.02, 0.05]} />
                <meshStandardMaterial color={colors[(row + col) % colors.length]} />
              </mesh>
            )
          }),
        )}
      </RoomShell>
      <Html center position={[0, POD_H / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Stack Room</div>
      </Html>
    </group>
  )
}

function VaultWallPod({
  active,
  onClick,
  body,
  accent,
  pal,
}: {
  active: boolean
  onClick: () => void
  body: string
  accent: string
  pal: ReturnType<typeof typologyMat>['pal']
}) {
  return (
    <group>
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[POD_W + 0.08, POD_H + 0.08, POD_D + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <RoomShell width={POD_W} depth={POD_D} height={POD_H} color={active ? accent : pal.graphite} floorColor={body}>
        <BackWallPanel
          width={0.44}
          height={0.36}
          depth={0.06}
          roomDepth={POD_D}
          color={pal.graphite}
          accent={accent}
          active={active}
        />
        {[0, 1, 2].map((i) => (
          <group key={i} position={[-0.12 + i * 0.12, 0.14, -POD_D / 2 + 0.1]}>
            <mesh>
              <boxGeometry args={[0.1, 0.13, 0.02]} />
              <meshStandardMaterial color={pal.concrete} />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <boxGeometry args={[0.08, 0.1, 0.01]} />
              <meshStandardMaterial color="#d4d0c8" />
            </mesh>
          </group>
        ))}
      </RoomShell>
      <Html center position={[0, POD_H / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Vault Wall</div>
      </Html>
    </group>
  )
}

function StackRoomInterior({
  theme,
  accent,
  entered,
  selectedBookSlug,
  onBookClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  selectedBookSlug: string | null
  onBookClick: (slug: string) => void
}) {
  const m = typologyMat(theme, accent, entered)
  const w = 0.78
  const d = 0.58
  const h = 0.52

  return (
    <RoomShell width={w} depth={d} height={h} color={m.pal.graphite} floorColor={m.body}>
      <BackWallPanel width={0.68} height={0.46} depth={0.12} roomDepth={d} color={m.pal.concrete} accent={accent} />
      {[-0.2, -0.06, 0.08, 0.22].map((y) => (
        <mesh key={y} position={[0, y + 0.08, -d / 2 + 0.14]}>
          <boxGeometry args={[0.64, 0.03, 0.1]} />
          <meshStandardMaterial color={m.pal.resin} />
        </mesh>
      ))}

      {Array.from({ length: 4 }).flatMap((_, row) =>
        Array.from({ length: 6 }).map((__, col) => {
          const bookIdx = row * 2 + (col < 2 ? col : -1)
          const book = col < 2 && bookIdx < libraryBooks.length ? libraryBooks[bookIdx] : null
          const x = -0.25 + col * 0.1
          const y = 0.05 + row * 0.14
          const colors = ['#2F6BFF', '#3a7a4a', '#8a4a4a', '#6a5a8a', '#8a7a3a', '#4a6a8a', '#7a5a4a']
          const tint = colors[(row * 6 + col) % colors.length]
          const active = book && selectedBookSlug === book.slug

          if (book) {
            return (
              <Fragment key={`${row}-${col}`}>
              <mesh
                position={[x, y, -d / 2 + 0.2]}
                onClick={(e) => {
                  e.stopPropagation()
                  onBookClick(book.slug)
                }}
                onPointerOver={() => {
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'crosshair'
                }}
              >
                <boxGeometry args={[0.07, 0.16, 0.07]} />
                <meshStandardMaterial
                  color={active ? accent : tint}
                  emissive={active ? accent : '#000'}
                  emissiveIntensity={active ? 0.2 : 0}
                />
              </mesh>
              <mesh position={[x, y + 0.09, -d / 2 + 0.2]}>
                <boxGeometry args={[0.05, 0.02, 0.05]} />
                <meshStandardMaterial color="#e8e4dc" />
              </mesh>
              </Fragment>
            )
          }

          return (
            <mesh key={`${row}-${col}`} position={[x, y, -d / 2 + 0.2]}>
              <boxGeometry args={[0.06, 0.14 + (col % 3) * 0.02, 0.06]} />
              <meshStandardMaterial color={tint} />
            </mesh>
          )
        }),
      )}
    </RoomShell>
  )
}

function VaultWallInterior({
  theme,
  accent,
  entered,
  selectedCredentialSlug,
  onCredentialClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  selectedCredentialSlug: string | null
  onCredentialClick: (slug: string) => void
}) {
  const m = typologyMat(theme, accent, entered)
  const w = 0.78
  const d = 0.58
  const h = 0.52
  const show = credentials.slice(0, 6)

  return (
    <RoomShell width={w} depth={d} height={h} color={m.pal.graphite} floorColor={m.body}>
      <BackWallPanel width={0.7} height={0.44} depth={0.06} roomDepth={d} color={m.pal.concrete} accent={accent} />

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const active = selectedCredentialSlug === cred.slug
        return (
          <group key={cred.slug} position={[-0.22 + col * 0.22, 0.08 + row * 0.2, -d / 2 + 0.12]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.17, 0.2, 0.02]} />
              <meshStandardMaterial color={m.pal.graphite} />
            </mesh>
            <mesh
              position={[0, 0, 0.015]}
              onClick={(e) => {
                e.stopPropagation()
                onCredentialClick(cred.slug)
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'crosshair'
              }}
            >
              <boxGeometry args={[0.14, 0.17, 0.02]} />
              <meshStandardMaterial
                color={active ? accent : '#d8d4cc'}
                emissive={active ? accent : '#000'}
                emissiveIntensity={active ? 0.15 : 0}
              />
            </mesh>
            <mesh position={[0, 0.06, 0.028]}>
              <circleGeometry args={[0.018, 12]} />
              <meshStandardMaterial color={m.pal.chicken} metalness={0.6} />
            </mesh>
          </group>
        )
      })}
    </RoomShell>
  )
}

export { StackRoomInterior as StackRoom, VaultWallInterior as VaultWall }
