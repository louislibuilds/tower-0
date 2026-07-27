import type { RoomProps } from './types'

/** 23 · Factory — delegates to AssemblyLine typology */
export { AssemblyLine as FactoryRoom } from '../typologies/AssemblyLine'

/** @deprecated */
export { AssemblyLine as WarehouseRoom } from '../typologies/AssemblyLine'

export type FactoryRoomProps = RoomProps & {
  factoryStop: number | null
  viewMode?: import('../../building/viewMode').ViewMode
  roomFocus?: boolean
  onSelectStop: (stop: number) => void
}
