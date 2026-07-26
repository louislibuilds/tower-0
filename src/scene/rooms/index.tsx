import type { ComponentType } from 'react'
import type { FloorId } from '../../building/program'
import type { Theme } from '../../context/SiteContext'
import { InfraRoom } from './InfraRoom'
import { LaboratoryRoom } from './LaboratoryRoom'
import { LibraryRoom } from './LibraryRoom'
import { LobbyRoom } from './LobbyRoom'
import { RoofRoom } from './RoofRoom'
import { TechCentreRoom } from './TechCentreRoom'
import { WarehouseRoom } from './WarehouseRoom'

const ROOMS: Record<FloorId, ComponentType<{ theme: Theme; accent: string; entered: boolean; hover: boolean }>> = {
  G: LobbyRoom,
  '23': WarehouseRoom,
  '52': LaboratoryRoom,
  B2: InfraRoom,
  B10: TechCentreRoom,
  '99': LibraryRoom,
  roof: RoofRoom,
}

interface FloorRoomProps {
  floorId: FloorId
  theme: Theme
  accent: string
  entered: boolean
  hover: boolean
}

export function FloorRoom({ floorId, theme, accent, entered, hover }: FloorRoomProps) {
  const Room = ROOMS[floorId]
  if (!Room) return null
  return <Room theme={theme} accent={accent} entered={entered} hover={hover} />
}
