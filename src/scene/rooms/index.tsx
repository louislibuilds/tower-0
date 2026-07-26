import type { ComponentType } from 'react'
import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { ArchiveLibraryRoom } from './LibraryRoom'
import { InfraRoom } from './InfraRoom'
import { LaboratoryRoom } from './LaboratoryRoom'
import { LobbyRoom } from './LobbyRoom'
import { RoofRoom } from './RoofRoom'
import { TechCentreRoom } from './TechCentreRoom'
import { WarehouseRoom } from './WarehouseRoom'
import type { RoomProps } from './types'

const STANDARD_ROOMS: Record<Exclude<FloorId, '52' | '23' | '99'>, ComponentType<RoomProps>> = {
  G: LobbyRoom,
  B2: InfraRoom,
  B10: TechCentreRoom,
  roof: RoofRoom,
}

interface FloorRoomProps extends RoomProps {
  floorId: FloorId
  labRoomSlug?: string | null
  libraryRoomSlug?: LibraryRoomSlug | null
  warehouseStop?: number
  onLabRoomClick?: (slug: string) => void
  onLabRoomHover?: (slug: string | null) => void
  onLibraryRoomClick?: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover?: (slug: LibraryRoomSlug | null) => void
  onWarehouseStop?: (stop: number) => void
}

export function FloorRoom({
  floorId,
  theme,
  accent,
  entered,
  hover,
  labRoomSlug = null,
  libraryRoomSlug = null,
  warehouseStop = 0,
  onLabRoomClick = () => {},
  onLabRoomHover = () => {},
  onLibraryRoomClick = () => {},
  onLibraryRoomHover = () => {},
  onWarehouseStop = () => {},
}: FloorRoomProps) {
  if (floorId === '52') {
    return (
      <LaboratoryRoom
        theme={theme}
        accent={accent}
        entered={entered}
        hover={hover}
        labRoomSlug={labRoomSlug}
        onLabRoomClick={onLabRoomClick}
        onLabRoomHover={onLabRoomHover}
      />
    )
  }

  if (floorId === '23') {
    return (
      <WarehouseRoom
        theme={theme}
        accent={accent}
        entered={entered}
        hover={hover}
        warehouseStop={warehouseStop}
        onSelectStop={onWarehouseStop}
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
        onLibraryRoomClick={onLibraryRoomClick}
        onLibraryRoomHover={onLibraryRoomHover}
      />
    )
  }

  const Room = STANDARD_ROOMS[floorId as Exclude<FloorId, '52' | '23' | '99'>]
  if (!Room) return null
  return <Room theme={theme} accent={accent} entered={entered} hover={hover} />
}
