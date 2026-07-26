import type { ComponentType } from 'react'
import type { FloorId } from '../../building/program'
import { InfraRoom } from './InfraRoom'
import { LaboratoryRoom } from './LaboratoryRoom'
import { LibraryRoom } from './LibraryRoom'
import { LobbyRoom } from './LobbyRoom'
import { RoofRoom } from './RoofRoom'
import { TechCentreRoom } from './TechCentreRoom'
import { WarehouseRoom } from './WarehouseRoom'
import type { RoomProps } from './types'

const STANDARD_ROOMS: Record<Exclude<FloorId, '52'>, ComponentType<RoomProps>> = {
  G: LobbyRoom,
  '23': WarehouseRoom,
  B2: InfraRoom,
  B10: TechCentreRoom,
  '99': LibraryRoom,
  roof: RoofRoom,
}

interface FloorRoomProps extends RoomProps {
  floorId: FloorId
  labRoomSlug?: string | null
  onLabRoomClick?: (slug: string) => void
  onLabRoomHover?: (slug: string | null) => void
}

export function FloorRoom({
  floorId,
  theme,
  accent,
  entered,
  hover,
  labRoomSlug = null,
  onLabRoomClick = () => {},
  onLabRoomHover = () => {},
}: FloorRoomProps) {
  const Room = STANDARD_ROOMS[floorId as Exclude<FloorId, '52'>]
  if (!Room && floorId !== '52') return null

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

  return <Room theme={theme} accent={accent} entered={entered} hover={hover} />
}
