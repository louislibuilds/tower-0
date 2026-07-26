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

const STANDARD_ROOMS: Record<Exclude<FloorId, '52' | '23' | '99'>, ComponentType<RoomProps>> = {
  G: LobbyRoom,
  B2: InfraRoom,
  B10: TechCentreRoom,
  roof: RoofRoom,
}

interface FloorRoomProps extends RoomProps {
  floorId: FloorId
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

  const Room = STANDARD_ROOMS[floorId as Exclude<FloorId, '52' | '23' | '99'>]
  if (!Room) return null
  return <Room theme={theme} accent={accent} entered={entered} hover={hover} />
}
