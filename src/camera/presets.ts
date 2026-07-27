import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { roofPlateY, stationCameraPreset } from './stationPresets'

export type { CameraPreset } from './stationPresets'

export { roofPlateY, stationCameraPreset }

/** Camera zoom ladder — tower → lobby → floor → room → focus */
export const ZOOM = {
  TOWER: 24,
  LOBBY: 78,
  FLOOR: 168,
  ROOM: 380,
  FOCUS: 240,
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
