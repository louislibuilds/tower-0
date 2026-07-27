import { Html } from '@react-three/drei'
import { Fragment } from 'react'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { BackWallPanel, RoomShell } from '../primitives/RoomShell'
import {
  chunkPosition,
  vaultChunk,
  VAULT_CHUNKS,
} from './floorChunks'
import { ArchiveVaultLayout, ArchiveVaultPod } from './layouts/ArchiveVaultLayout'
import { vault99Interior } from './interiorScale'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'

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

/** 99 · Stack Room + Vault Wall — one floor shell, two station blocks */
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

  const m = typologyMat(theme, accent, entered)
  const interior = vault99Interior()

  return (
    <RoomShell
      width={interior.w}
      depth={interior.d}
      height={interior.h}
      color={m.pal.graphite}
      floorColor={m.body}
    >
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.015, interior.d * 0.88]} />
        <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.5} />
      </mesh>

      {(['library', 'archive'] as const).map((slug) => {
        const chunk = VAULT_CHUNKS[slug]
        const [cx, cy, cz] = chunkPosition(chunk)
        const active = libraryRoomSlug === slug
        const expanded = roomFocus && active

        if (roomFocus && libraryRoomSlug && !active) {
          return null
        }

        const thin = !!libraryRoomSlug && !active

        return (
          <group key={slug} position={[cx, cy, cz]}>
            {expanded ? (
              slug === 'library' ? (
                <StackRoomInterior
                  theme={theme}
                  accent={accent}
                  entered={entered}
                  selectedBookSlug={selectedBookSlug}
                  onBookClick={onBookClick}
                />
              ) : (
                <VaultWallInterior
                  theme={theme}
                  accent={accent}
                  entered={entered}
                  selectedCredentialSlug={selectedCredentialSlug}
                  onCredentialClick={onCredentialClick}
                />
              )
            ) : (
              <ThinnedStation thin={thin}>
                {slug === 'library' ? (
                  <StackRoomPod
                    active={active}
                    thin={thin}
                    chunk={chunk}
                    theme={theme}
                    onClick={() => onLibraryRoomClick('library')}
                    onHover={onLibraryRoomHover}
                    body={m.body}
                    accent={accent}
                    pal={m.pal}
                  />
                ) : (
                  <VaultWallPod
                    active={active}
                    thin={thin}
                    chunk={chunk}
                    theme={theme}
                    entered={entered}
                    onClick={() => onLibraryRoomClick('archive')}
                    onHover={onLibraryRoomHover}
                    accent={accent}
                  />
                )}
              </ThinnedStation>
            )}
          </group>
        )
      })}
    </RoomShell>
  )
}

function StackRoomPod({
  active,
  thin,
  chunk,
  theme,
  onClick,
  onHover,
  body,
  accent,
  pal,
}: {
  active: boolean
  thin: boolean
  chunk: (typeof VAULT_CHUNKS)['library']
  theme: TypologyProps['theme']
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
  body: string
  accent: string
  pal: ReturnType<typeof typologyMat>['pal']
}) {
  const { w, d, h } = chunk.size

  return (
    <group
      onPointerOver={(e) => {
        if (thin) return
        e.stopPropagation()
        onHover('library')
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh
        visible={false}
        onClick={(e) => {
          if (thin) return
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[w + 0.08, h + 0.08, d + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <StationFootprint width={w} depth={d} theme={theme} accent={accent} active={active} thin={thin} />
      <BackWallPanel
          width={w * 0.82}
          height={h * 0.72}
          depth={0.1}
          roomDepth={d}
          color={pal.graphite}
          accent={accent}
          active={active}
        />
        {[-0.14, -0.04, 0.06, 0.16].map((y, row) =>
          Array.from({ length: 4 }).map((_, col) => {
            const x = -0.12 + col * 0.08
            const colors = ['#2F6BFF', '#5a8a5a', '#8a5a5a', '#6a5a8a']
            return (
              <Fragment key={`${row}-${col}`}>
                <mesh position={[x, y + 0.1, -d / 2 + 0.12]}>
                  <boxGeometry args={[0.05, 0.1 + (col % 2) * 0.02, 0.05]} />
                  <meshStandardMaterial color={colors[(row + col) % colors.length]} />
                </mesh>
                {[0, 1, 2].map((j) => (
                  <mesh key={j} position={[x, y + 0.04 + j * 0.04, -d / 2 + 0.15]}>
                    <boxGeometry args={[0.038, 0.022, 0.032]} />
                    <meshStandardMaterial color={j % 2 ? pal.chicken : '#d8d4cc'} />
                  </mesh>
                ))}
              </Fragment>
            )
          }),
        )}
      <mesh position={[0.08, 0.04, 0.06]}>
        <boxGeometry args={[0.14, 0.04, 0.1]} />
        <meshStandardMaterial color={body} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.1, 0.07, 0.06]}>
        <boxGeometry args={[0.06, 0.008, 0.08]} />
        <meshStandardMaterial color={pal.chicken} emissive={active ? pal.chicken : '#000'} emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0.2, 0.12, 0.1]}>
        <boxGeometry args={[0.012, 0.14, 0.012]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      {!thin && (
        <Html center position={[0, h / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Stack Room</div>
        </Html>
      )}
    </group>
  )
}

function VaultWallPod({
  active,
  thin,
  chunk,
  theme,
  entered,
  onClick,
  onHover,
  accent,
}: {
  active: boolean
  thin: boolean
  chunk: (typeof VAULT_CHUNKS)['archive']
  theme: TypologyProps['theme']
  entered: boolean
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
  accent: string
}) {
  const { w, d, h } = chunk.size

  return (
    <group
      onPointerOver={(e) => {
        if (thin) return
        e.stopPropagation()
        onHover('archive')
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh
        visible={false}
        onClick={(e) => {
          if (thin) return
          e.stopPropagation()
          onClick()
        }}
      >
        <boxGeometry args={[w + 0.08, h + 0.08, d + 0.08]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <StationFootprint width={w} depth={d} theme={theme} accent={accent} active={active} thin={thin} />
      <group position={[0, 0.04, -0.02]}>
        <ArchiveVaultPod theme={theme} accent={accent} entered={entered} active={active} />
      </group>
      {!thin && (
        <Html center position={[0, h / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>Vault Wall</div>
        </Html>
      )}
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
  const chunk = vaultChunk('library')
  const { w, d, h } = chunk.size
  const iw = w * 1.08
  const id = d * 1.06
  const ih = h * 0.92

  return (
    <RoomShell width={iw} depth={id} height={ih} color={m.pal.graphite} floorColor={m.body}>
      <BackWallPanel width={iw * 0.88} height={ih * 0.82} depth={0.12} roomDepth={id} color={m.pal.concrete} accent={accent} />
      {[-0.2, -0.06, 0.08, 0.22].map((y) => (
        <mesh key={y} position={[0, y + 0.08, -id / 2 + 0.14]}>
          <boxGeometry args={[iw * 0.82, 0.03, 0.1]} />
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
                  position={[x, y, -id / 2 + 0.2]}
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
                <mesh position={[x, y + 0.09, -id / 2 + 0.2]}>
                  <boxGeometry args={[0.05, 0.02, 0.05]} />
                  <meshStandardMaterial color="#e8e4dc" />
                </mesh>
              </Fragment>
            )
          }

          return (
            <mesh key={`${row}-${col}`} position={[x, y, -id / 2 + 0.2]}>
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
  const chunk = vaultChunk('archive')
  const { w, d, h } = chunk.size
  const iw = w * 1.08
  const id = d * 1.06
  const ih = h * 0.92
  const show = credentials.slice(0, 6)

  return (
    <RoomShell width={iw} depth={id} height={ih} color={m.pal.graphite} floorColor={m.body}>
      <group position={[0, 0.02, 0]}>
        <ArchiveVaultLayout theme={theme} accent={accent} entered={entered} active scale={1.05} />
      </group>

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const active = selectedCredentialSlug === cred.slug
        return (
          <group key={cred.slug} position={[-0.22 + col * 0.22, 0.08 + row * 0.2, -id / 2 + 0.12]}>
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
