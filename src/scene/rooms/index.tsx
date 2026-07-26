import type { ComponentType } from 'react'
import type { FloorId } from '../../building/program'
import type { ViewMode } from '../../building/viewMode'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { FactoryRoom } from './FactoryRoom'
import { ArchiveLibraryRoom } from './LibraryRoom'
import { InfraRoom } from './InfraRoom'
import { LaboratoryRoom } from './LaboratoryRoom'
import { LobbyRoom } from './LobbyRoom'
import { RoofRoom } from './RoofRoom'
import { TechCentreRoom } from './TechCentreRoom'
import type { RoomProps } from './types'

const STANDARD_ROOMS: Record<'G' | 'B2' | 'B10', ComponentType<RoomProps>> = {
  G: LobbyRoom,
  B2: InfraRoom,
  B10: TechCentreRoom,
}

interface FloorRoomProps extends RoomProps {
  floorId: FloorId
  bandHeight?: number
  viewMode: ViewMode
  labRoomSlug?: string | null
  libraryRoomSlug?: LibraryRoomSlug | null
  factoryStop?: number | null
  selectedBookSlug?: string | null
  selectedCredentialSlug?: string | null
  onLabRoomClick?: (slug: string) => void
  onLabRoomHover?: (slug: string | null) => void
  onLibraryRoomClick?: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover?: (slug: LibraryRoomSlug | null) => void
  onFactoryStop?: (stop: number) => void
  onBookClick?: (slug: string) => void
  onCredentialClick?: (slug: string) => void
}

export function FloorRoom({
  floorId,
  bandHeight = 0.9,
  viewMode,
  theme,
  accent,
  entered,
  hover,
  labRoomSlug = null,
  libraryRoomSlug = null,
  factoryStop = null,
  selectedBookSlug = null,
  selectedCredentialSlug = null,
  onLabRoomClick = () => {},
  onLabRoomHover = () => {},
  onLibraryRoomClick = () => {},
  onLibraryRoomHover = () => {},
  onFactoryStop = () => {},
  onBookClick = () => {},
  onCredentialClick = () => {},
}: FloorRoomProps) {
  const roomFocus = viewMode === 'room' || viewMode === 'focus'

  if (floorId === '52') {
    return (
      <LaboratoryRoom
        theme={theme}
        accent={accent}
        entered={entered}
        hover={hover}
        labRoomSlug={labRoomSlug}
        roomFocus={roomFocus && !!labRoomSlug}
        onLabRoomClick={onLabRoomClick}
        onLabRoomHover={onLabRoomHover}
      />
    )
  }

  if (floorId === '23') {
    return (
      <FactoryRoom
        theme={theme}
        accent={accent}
        entered={entered}
        hover={hover}
        factoryStop={factoryStop}
        onSelectStop={onFactoryStop}
      />
    )
  }

  if (floorId === '99') {
    return (
      <ArchiveLibraryRoom
        theme={theme}
        accent={accent}
        entered={entered}
        hover={hover}
        libraryRoomSlug={libraryRoomSlug}
        roomFocus={roomFocus && !!libraryRoomSlug}
        selectedBookSlug={selectedBookSlug}
        selectedCredentialSlug={selectedCredentialSlug}
        onLibraryRoomClick={onLibraryRoomClick}
        onLibraryRoomHover={onLibraryRoomHover}
        onBookClick={onBookClick}
        onCredentialClick={onCredentialClick}
      />
    )
  }

  const Room = floorId === 'G' || floorId === 'B2' || floorId === 'B10' ? STANDARD_ROOMS[floorId] : null
  if (floorId === 'roof') {
    return <RoofRoom theme={theme} entered={entered} bandHeight={bandHeight} />
  }
  if (!Room) return null
  return <Room theme={theme} accent={accent} entered={entered} hover={hover} />
}
