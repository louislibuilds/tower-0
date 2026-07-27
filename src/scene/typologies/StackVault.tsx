import { Html } from '@react-three/drei'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { RoomShell } from '../primitives/RoomShell'
import {
  chunkPosition,
  VAULT_CHUNKS,
} from './floorChunks'
import { ArchiveVaultLayout, ArchiveVaultPod } from './layouts/ArchiveVaultLayout'
import { LibraryStackLayout, LibraryStackPod } from './layouts/LibraryStackLayout'
import { blueprintFitScale, vault99Interior, vaultZoneInterior } from './interiorScale'
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

/** 99 · Stack Room + Vault Wall ??one floor shell, two station blocks */
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
                    entered={entered}
                    onClick={() => onLibraryRoomClick('library')}
                    onHover={onLibraryRoomHover}
                    accent={accent}
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
  accent,
  entered,
}: {
  active: boolean
  thin: boolean
  chunk: (typeof VAULT_CHUNKS)['library']
  theme: TypologyProps['theme']
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
  accent: string
  entered: boolean
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
      <group position={[0, 0.02, -0.02]}>
        <LibraryStackPod theme={theme} accent={accent} entered={entered} active={active} />
      </group>
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
  selectedBookSlug: _selectedBookSlug,
  onBookClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  selectedBookSlug: string | null
  onBookClick: (slug: string) => void
}) {
  const zone = vaultZoneInterior()
  const scale = blueprintFitScale(6, 5, zone)
  const id = zone.d

  return (
    <group>
      <LibraryStackLayout theme={theme} accent={accent} entered={entered} active scale={scale} />

      {libraryBooks.map((book, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        const x = (-0.12 + col * 0.08) * scale
        const y = (0.1 + row * 0.14) * scale
        const z = -id / 2 + 0.16 * scale

        return (
          <mesh
            key={book.slug}
            position={[x, y, z]}
            visible={false}
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
            <boxGeometry args={[0.08 * scale, 0.18 * scale, 0.08 * scale]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )
      })}
    </group>
  )
}

function VaultWallInterior({
  theme,
  accent,
  entered,
  selectedCredentialSlug: _selectedCredentialSlug,
  onCredentialClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  selectedCredentialSlug: string | null
  onCredentialClick: (slug: string) => void
}) {
  const zone = vaultZoneInterior()
  const scale = blueprintFitScale(6, 5, zone)
  const id = zone.d
  const show = credentials.slice(0, 6)

  return (
    <group>
      <group position={[0, 0.02, 0]}>
        <ArchiveVaultLayout theme={theme} accent={accent} entered={entered} active scale={scale} />
      </group>

      {show.map((cred, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const x = (-0.22 + col * 0.22) * scale
        const y = (0.08 + row * 0.2) * scale
        const z = -id / 2 + 0.12 * scale

        return (
          <mesh
            key={cred.slug}
            position={[x, y, z]}
            visible={false}
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
            <boxGeometry args={[0.16 * scale, 0.2 * scale, 0.04 * scale]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )
      })}
    </group>
  )
}

export { StackRoomInterior as StackRoom, VaultWallInterior as VaultWall }
