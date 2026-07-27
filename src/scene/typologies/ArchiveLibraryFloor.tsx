import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import type { ViewMode } from '../../building/viewMode'
import { useSite } from '../../context/SiteContext'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { FloorPlate } from '../primitives/FloorPlate'
import { chunkPosition, vaultCornerAnchor, VAULT_CHUNKS } from './floorChunks'
import { ArchiveVaultLayout } from './layouts/ArchiveVaultLayout'
import { LibraryStackLayout } from './layouts/LibraryStackLayout'
import { blueprintFitScale, floorPlateSize } from './interiorScale'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'
import { lerpZoom, useZoomMorph } from './useZoomMorph'

interface ArchiveLibraryFloorProps extends TypologyProps {
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

const POD_SCALE_RATIO = 0.4
const POD_FIT_MARGIN = 0.48

/** 99 · Library + Archive pods — corner suites with zoom morph */
export function ArchiveLibraryFloor(props: ArchiveLibraryFloorProps) {
  const {
    theme,
    accent,
    entered,
    viewMode,
    libraryRoomSlug,
    onLibraryRoomClick,
    onLibraryRoomHover,
    onBookClick,
    onCredentialClick,
  } = props

  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('99')
  const zone = { w: plate.w * 0.44, d: plate.d * 0.82 }
  const podScale = blueprintFitScale(6, 5, zone, POD_FIT_MARGIN) * POD_SCALE_RATIO
  const focusScale = blueprintFitScale(6, 5, plate, 0.78)

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      {(['library', 'archive'] as const).map((slug) => {
        const chunk = VAULT_CHUNKS[slug]
        const active = libraryRoomSlug === slug
        const thin = !!libraryRoomSlug && !active
        const zoomed = active && (viewMode === 'room' || viewMode === 'focus')
        const [cx, , cz] = chunkPosition(chunk)
        const [tx, , tz] = vaultCornerAnchor(slug, plate, focusScale)

        return (
          <VaultMorphZone
            key={slug}
            slug={slug}
            chunk={chunk}
            podScale={podScale}
            focusScale={focusScale}
            fromPos={[cx, 0, cz]}
            toPos={[tx, 0, tz]}
            zoomed={zoomed}
            thin={thin}
            active={active}
            theme={theme}
            accent={accent}
            entered={entered}
            viewMode={viewMode}
            onClick={() => onLibraryRoomClick(slug)}
            onHover={onLibraryRoomHover}
            onBookClick={onBookClick}
            onCredentialClick={onCredentialClick}
          />
        )
      })}
    </FloorPlate>
  )
}

function VaultMorphZone({
  slug,
  chunk,
  podScale,
  focusScale,
  fromPos,
  toPos,
  zoomed,
  thin,
  active,
  theme,
  accent,
  entered,
  viewMode,
  onClick,
  onHover,
  onBookClick,
  onCredentialClick,
}: {
  slug: LibraryRoomSlug
  chunk: (typeof VAULT_CHUNKS)['library']
  podScale: number
  focusScale: number
  fromPos: [number, number, number]
  toPos: [number, number, number]
  zoomed: boolean
  thin: boolean
  active: boolean
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  viewMode: ViewMode
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}) {
  const { strings } = useSite()
  const { w, d, h } = chunk.size
  const label =
    slug === 'library' ? strings.library.libraryTitle : strings.library.archiveTitle
  const progress = useZoomMorph(zoomed)
  const groupRef = useRef<Group>(null)
  const [showShell, setShowShell] = useState(false)
  const shellRef = useRef(false)
  const footprintW = w * 0.86
  const footprintD = d * 0.86

  useFrame(() => {
    const p = progress.current
    const scale = lerpZoom(podScale, focusScale, p)
    groupRef.current?.position.set(
      lerpZoom(fromPos[0], toPos[0], p),
      0,
      lerpZoom(fromPos[2], toPos[2], p),
    )
    groupRef.current?.scale.setScalar(scale)

    const nextShell = p > 0.58
    if (nextShell !== shellRef.current) {
      shellRef.current = nextShell
      setShowShell(nextShell)
    }
  })

  const roomLocked = zoomed && viewMode === 'room'

  return (
    <ThinnedStation thin={thin}>
      <group ref={groupRef}>
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
              if (thin || roomLocked) return
              e.stopPropagation()
              onClick()
            }}
          >
            <boxGeometry args={[footprintW + 0.06, h + 0.06, footprintD + 0.06]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

          {!zoomed && (
            <StationFootprint
              width={footprintW}
              depth={footprintD}
              theme={theme}
              accent={accent}
              active={active}
              thin={thin}
            />
          )}

          {slug === 'library' ? (
            <LibraryStackLayout
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              showShell={showShell}
              scale={1}
            />
          ) : (
            <ArchiveVaultLayout
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              scale={1}
            />
          )}

          {zoomed && slug === 'library' && showShell &&
            libraryBooks.map((book, i) => {
              const row = Math.floor(i / 2)
              const col = i % 2
              const x = -0.12 + col * 0.08
              const y = 0.1 + row * 0.14
              const z = 0.12

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
                  <boxGeometry args={[0.08, 0.18, 0.08]} />
                  <meshBasicMaterial transparent opacity={0} />
                </mesh>
              )
            })}

          {zoomed && slug === 'archive' && showShell &&
            credentials.slice(0, 6).map((cred, i) => {
              const row = Math.floor(i / 3)
              const col = i % 3
              const x = -0.22 + col * 0.22
              const y = 0.08 + row * 0.2
              const z = 0.1

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
                  <boxGeometry args={[0.16, 0.2, 0.04]} />
                  <meshBasicMaterial transparent opacity={0} />
                </mesh>
              )
            })}

          {!thin && (
            <Html center position={[0, (h * 0.5 + 0.08) / focusScale, 0]} style={{ pointerEvents: 'none' }}>
              <div
                className={`scene-label scene-label--lab ${active ? 'scene-label--active' : ''} ${zoomed ? 'scene-label--hidden' : ''}`}
              >
                {label}
              </div>
            </Html>
          )}
        </group>
      </group>
    </ThinnedStation>
  )
}
