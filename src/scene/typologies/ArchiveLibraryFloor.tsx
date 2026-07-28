import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import type { ViewMode } from '../../building/viewMode'
import { useSite } from '../../context/SiteContext'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { FloorPlate } from '../primitives/FloorPlate'
import { PickTarget } from '../primitives/PickTarget'
import { markTowerPick } from '../primitives/pickVolume'
import { StationCallout } from '../primitives/StationCallout'
import { chunkPosition, vaultCornerAnchor, VAULT_CHUNKS, STATION_FOOTPRINT_INSET, STATION_HIT_MARGIN } from './floorChunks'
import { ArchiveVaultLayout } from './layouts/ArchiveVaultLayout'
import { LibraryStackLayout } from './layouts/LibraryStackLayout'
import { focusPodScale, floorPlateSize, overviewPodScale } from './interiorScale'
import { StationFootprint } from './StationFootprint'
import { ThinnedStation } from './ThinnedStation'
import { typologyMat, type TypologyProps } from './types'
import { lerpZoom, useZoomMorph } from './useZoomMorph'
import { archiveCredentialPickBox, libraryBookPickBox } from './vaultPickTargets'

interface ArchiveLibraryFloorProps extends TypologyProps {
  viewMode: ViewMode
  libraryRoomSlug: LibraryRoomSlug | null
  roomFocus: boolean
  floorOverview?: boolean
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

/** 99 · Library + Archive pods — corner suites with zoom morph */
export function ArchiveLibraryFloor(props: ArchiveLibraryFloorProps) {
  const {
    theme,
    accent,
    entered,
    viewMode,
    libraryRoomSlug,
    floorOverview = false,
    onLibraryRoomClick,
    onLibraryRoomHover,
    onBookClick,
    onCredentialClick,
    selectedBookSlug = null,
    selectedCredentialSlug = null,
  } = props

  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('99')
  const focusScale = focusPodScale(6, 5, plate)

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      {(['library', 'archive'] as const).map((slug) => {
        const chunk = VAULT_CHUNKS[slug]
        const active = libraryRoomSlug === slug
        const thin = !!libraryRoomSlug && !active
        const zoomed = active && (viewMode === 'room' || viewMode === 'focus')
        const podScale = overviewPodScale(6, 5, chunk.size, plate.w)
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
            floorOverview={floorOverview}
            onClick={() => onLibraryRoomClick(slug)}
            onHover={onLibraryRoomHover}
            onBookClick={onBookClick}
            onCredentialClick={onCredentialClick}
            selectedBookSlug={selectedBookSlug}
            selectedCredentialSlug={selectedCredentialSlug}
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
  floorOverview,
  onClick,
  onHover,
  onBookClick,
  onCredentialClick,
  selectedBookSlug = null,
  selectedCredentialSlug = null,
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
  floorOverview: boolean
  onClick: () => void
  onHover: (slug: LibraryRoomSlug | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
}) {
  const { strings, navigateBack } = useSite()
  const [hoveredBookSlug, setHoveredBookSlug] = useState<string | null>(null)
  const [hoveredCredentialSlug, setHoveredCredentialSlug] = useState<string | null>(null)
  const m = typologyMat(theme, accent, entered)
  const { w, d, h } = chunk.size
  const code = slug === 'library' ? 'LIB' : 'ARC'
  const title =
    slug === 'library' ? strings.library.libraryTitle : strings.library.archiveTitle
  const progress = useZoomMorph(zoomed)
  const groupRef = useRef<Group>(null)
  const [showShell, setShowShell] = useState(false)
  const shellRef = useRef(false)
  const footprintW = w * STATION_FOOTPRINT_INSET
  const footprintD = d * STATION_FOOTPRINT_INSET
  const hitW = footprintW + STATION_HIT_MARGIN.w
  const hitH = h + STATION_HIT_MARGIN.h
  const hitD = footprintD + STATION_HIT_MARGIN.d

  useFrame(() => {
    const p = progress.current
    const scale = lerpZoom(podScale, focusScale, p)
    groupRef.current?.position.set(
      lerpZoom(fromPos[0], toPos[0], p),
      0,
      lerpZoom(fromPos[2], toPos[2], p),
    )
    groupRef.current?.scale.setScalar(scale)

    const nextShell = zoomed && p > 0.58
    if (nextShell !== shellRef.current) {
      shellRef.current = nextShell
      setShowShell(nextShell)
    }
  })

  const roomLocked = zoomed && viewMode === 'room'

  return (
    <ThinnedStation thin={thin}>
      {floorOverview && !thin && !zoomed && (
        <group position={fromPos}>
          <StationCallout
            code={code}
            title={title}
            active={active}
            overview
            anchorY={h * podScale * 0.5}
            offset={chunk.calloutOffset ?? [0, 0.32, 0.18]}
          />
        </group>
      )}
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
            ref={(mesh) => markTowerPick(mesh)}
            raycast={roomLocked ? () => null : undefined}
            onClick={(e) => {
              if (thin || roomLocked) return
              e.stopPropagation()
              onClick()
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              if (viewMode === 'room' || viewMode === 'focus') {
                navigateBack()
              }
            }}
          >
            <boxGeometry args={[hitW, hitH, hitD]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <StationFootprint
            width={footprintW}
            depth={footprintD}
            theme={theme}
            accent={accent}
            active={active || zoomed}
            thin={thin}
          />

          {slug === 'library' ? (
            <LibraryStackLayout
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              thin={thin}
              showShell={showShell}
              scale={1}
            />
          ) : (
            <ArchiveVaultLayout
              theme={theme}
              accent={accent}
              entered={entered}
              active={active}
              thin={thin}
              scale={1}
            />
          )}

          {zoomed && slug === 'library' && viewMode === 'room' &&
            libraryBooks.map((book, i) => {
              const box = libraryBookPickBox(i)
              const lit = hoveredBookSlug === book.slug || selectedBookSlug === book.slug
              return (
                <group key={book.slug}>
                  <PickTarget
                    position={box.position}
                    size={box.size}
                    accent={accent}
                    guideColor={m.pal.graphite}
                    active={selectedBookSlug === book.slug}
                    hovered={hoveredBookSlug === book.slug}
                    onClick={() => onBookClick(book.slug)}
                    onHover={(over) => setHoveredBookSlug(over ? book.slug : null)}
                  />
                  {lit && (
                    <group position={box.position}>
                      <StationCallout
                        code={String(i + 1).padStart(3, '0')}
                        title={book.title}
                        active={selectedBookSlug === book.slug}
                        anchorY={box.size[1] / 2}
                        offset={[0, 0.28, 0.22]}
                      />
                    </group>
                  )}
                </group>
              )
            })}

          {zoomed && slug === 'archive' && viewMode === 'room' &&
            credentials.map((cred, i) => {
              const box = archiveCredentialPickBox(i)
              const lit = hoveredCredentialSlug === cred.slug || selectedCredentialSlug === cred.slug
              const loc = strings.credentials[cred.slug as keyof typeof strings.credentials]
              return (
                <group key={cred.slug}>
                  <PickTarget
                    position={box.position}
                    size={box.size}
                    accent={accent}
                    guideColor={m.pal.graphite}
                    active={selectedCredentialSlug === cred.slug}
                    hovered={hoveredCredentialSlug === cred.slug}
                    onClick={() => onCredentialClick(cred.slug)}
                    onHover={(over) => setHoveredCredentialSlug(over ? cred.slug : null)}
                  />
                  {lit && (
                    <group position={box.position}>
                      <StationCallout
                        code={String(i + 1).padStart(3, '0')}
                        title={loc?.title ?? cred.title}
                        active={selectedCredentialSlug === cred.slug}
                        anchorY={box.size[1] / 2}
                        offset={[0, 0.28, 0.22]}
                      />
                    </group>
                  )}
                </group>
              )
            })}

        </group>
      </group>
    </ThinnedStation>
  )
}
