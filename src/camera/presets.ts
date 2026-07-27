import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { roofPlateY, stationCameraPreset } from './stationPresets'

export type { CameraPreset } from './stationPresets'

export { roofPlateY, stationCameraPreset }

/** Camera zoom ladder — L0 tower → L1 lobby → L2 floor → L3 room → L4 focus */
export const ZOOM = {
  L0_TOWER: 24,
  L1_LOBBY: 78,
  L2_FLOOR: 168,
  L3_ROOM: 380,
  L4_FOCUS: 240,
} as const

export function cameraPreset(
  floorId: FloorId,
  viewMode: ViewMode,
  opts: {
    phase: SitePhase
    bootDone: boolean
    factoryStop: number | null
    libraryRoomSlug: LibraryRoomSlug | null
    labRoomSlug: string | null
    focusTarget: 'book' | 'credential' | 'lab' | null
  },
) {
  return stationCameraPreset(floorId, viewMode, opts)
}
