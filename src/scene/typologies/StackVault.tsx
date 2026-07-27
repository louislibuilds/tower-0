import { Html } from '@react-three/drei'
import type { ViewMode } from '../../building/viewMode'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { RoomShell } from '../primitives/RoomShell'
import { chunkPosition, VAULT_CHUNKS } from './floorChunks'
import { ArchiveVaultLayout } from './layouts/ArchiveVaultLayout'
import { LibraryStackLayout } from './layouts/LibraryStackLayout'
import { blueprintFitScale, vault99Interior, vaultZoneInterior } from './interiorScale'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'

interface StackVaultProps extends TypologyProps {
  viewMode: ViewMode
  libraryRoomSlug: LibraryRoomSlug | null
  roomFocus: boolean
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

const POD_SCALE_RATIO = 0.44

function isVaultZoomed(slug: LibraryRoomSlug, libraryRoomSlug: LibraryRoomSlug | null, viewMode: ViewMode) {
  return libraryRoomSlug === slug && (viewMode === 'room' || viewMode === 'focus')
}

/** 99 · Stack Room + Vault Wall — one floor shell, two station blocks */
export function StackVaultFloor(props: StackVaultProps) {
  const {
    theme,
    accent,
    entered,
    viewMode,
    libraryRoomSlug,
    roomFocus,
    onLibraryRoomClick,
    onLibraryRoomHover,
    onBookClick,
    onCredentialClick,
  } = props

  const m = typologyMat(theme, accent, entered)
  const interior = vault99Interior()
  const zone = vaultZoneInterior()
  const roomScale = blueprintFitScale(6, 5, zone)
  const podScale = roomScale * POD_SCALE_RATIO
  const anyZoomed = !!libraryRoomSlug && (viewMode === 'room' || viewMode === 'focus')

  return (
    <RoomShell
      width={interior.w}
      depth={interior.d}
      height={interior.h}
      color={m.pal.graphite}
      floorColor={m.body}
      openFront={anyZoomed}
    >
      {!anyZoomed && (
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.1, 0.015, interior.d * 0.88]} />
          <meshStandardMaterial color={m.pal.concrete} transparent opacity={0.5} />
        </mesh>
      )}

      {(['library', 'archive'] as const).map((slug) => {
        const chunk = VAULT_CHUNKS[slug]
        const [cx, cy, cz] = chunkPosition(chunk)
        const zoomed = isVaultZoomed(slug, libraryRoomSlug, viewMode)

        if (roomFocus && libraryRoomSlug && libraryRoomSlug !== slug) {
          return null
        }

        const thin = !!libraryRoomSlug && libraryRoomSlug !== slug

        return (
          <group key={slug} position={[cx, cy, cz]}>
            {zoomed ? (
              slug === 'library' ? (
                <LibraryRoomInterior
                  theme={theme}
                  accent={accent}
                  entered={entered}
                  scale={roomScale}
                  onBookClick={onBookClick}
                />
              ) : (
                <VaultWallInterior
                  theme={theme}
                  accent={accent}
                  entered={entered}
                  scale={roomScale}
                  onCredentialClick={onCredentialClick}
                />
              )
            ) : (
              <VaultZonePod
                slug={slug}
                chunk={chunk}
                scale={podScale}
                theme={theme}
                accent={accent}
                entered={entered}
                active={libraryRoomSlug === slug}
                thin={thin}
                onClick={() => onLibraryRoomClick(slug)}
                onHover={onLibraryRoomHover}
              />
            )}
          </group>
        )
      })}
    </RoomShell>
  )
}

function VaultZonePod({
  slug,
  chunk,
  scale,
  theme,
  accent,
  entered,
  active,
  thin,
  onClick,
  onHover,
}: {
  slug: LibraryRoomSlug
  chunk: (typeof VAULT_CHUNKS)['library']
  scale: number
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  active: boolean
  thin: boolean
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
}) {
  const { w, d, h } = chunk.size
  const label = slug === 'library' ? 'Stack Room' : 'Vault Wall'

  return (
    <ThinnedStation thin={thin}>
      <group
        onPointerOver={(e) => {
          if (thin) return
          e.stopPropagation()
          onHover(slug)
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
          {slug === 'library' ? (
            <LibraryStackLayout
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              scale={scale}
              showShell
            />
          ) : (
            <ArchiveVaultLayout theme={theme} accent={accent} entered={entered} active={active} scale={scale} />
          )}
        </group>
        {!thin && (
          <Html center position={[0, h / 2 + 0.12, 0]} style={{ pointerEvents: 'none' }}>
            <div className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''}`}>{label}</div>
          </Html>
        )}
      </group>
    </ThinnedStation>
  )
}

function LibraryRoomInterior({
  theme,
  accent,
  entered,
  scale,
  onBookClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  scale: number
  onBookClick: (slug: string) => void
}) {
  const zone = vaultZoneInterior()
  const id = zone.d

  return (
    <group>
      <LibraryStackLayout
        theme={theme}
        accent={accent}
        entered={entered}
        active
        scale={scale}
        showShell={false}
      />

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
  scale,
  onCredentialClick,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  scale: number
  onCredentialClick: (slug: string) => void
}) {
  const zone = vaultZoneInterior()
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

export { LibraryRoomInterior as StackRoom, VaultWallInterior as VaultWall }
