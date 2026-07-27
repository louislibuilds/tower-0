import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, programBaseY, towerTotalHeight } from '../scene/towerGeometry'
import { FACTORY_STOPS } from '../scene/factoryStops'
import { labStation, LAB_FLOOR_OVERVIEW_ZOOM } from '../scene/typologies/labCamera'
import { chunkPosition, vaultChunk } from '../scene/typologies/floorChunks'

/** Camera zoom ladder — L0 tower → L1 lobby → L2 floor → L3 room → L4 part */
export const ZOOM = {
  L0_TOWER: 24,
  L1_LOBBY: 78,
  L2_FLOOR: 168,
  L3_ROOM: 320,
  L4_PART: 460,
} as const

export interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

/** Identity plate center on roof deck */
export function roofPlateY(): number {
  const roof = getProgramFloor('roof')
  return programBaseY(roof) + roof.bandHeight * 0.55
}

type Side = 'front' | 'left' | 'right' | 'diagL' | 'diagR'

const SIDE_OFFSET: Record<Side, [number, number]> = {
  front: [0.35, 3.2],
  left: [-1.4, 2.8],
  right: [1.4, 2.8],
  diagL: [-1.0, 3.4],
  diagR: [1.0, 3.4],
}

function closeStation(
  y: number,
  target: [number, number, number],
  side: Side,
  zoom: number,
  eyeLift = 0.35,
): CameraPreset {
  const [ox, oz] = SIDE_OFFSET[side]
  return {
    position: [target[0] + ox, y + eyeLift, target[2] + oz],
    lookAt: target,
    zoom,
  }
}

/** Resume2-style oblique entry — camera low, looking into room volume */
function interiorEntry(
  floorY: number,
  roomCenter: [number, number, number],
  from: 'left' | 'right',
  zoom: number,
): CameraPreset {
  const sign = from === 'left' ? -1 : 1
  return {
    position: [roomCenter[0] + sign * 1.1, floorY + 0.2, roomCenter[2] + 2.6],
    lookAt: [roomCenter[0], roomCenter[1], roomCenter[2]],
    zoom,
  }
}

/** L3 room entry — oblique framing of whole chunk shell */
function labStationRoomEntry(
  floorY: number,
  target: [number, number, number],
  from: 'left' | 'right',
  zoom: number,
): CameraPreset {
  const sign = from === 'left' ? -1 : 1
  return {
    position: [target[0] + sign * 1.0, floorY + 0.22, target[2] + 2.2],
    lookAt: [target[0], target[1], target[2]],
    zoom,
  }
}
/** L4 extreme close — camera almost inside the station typology */
function labStationCloseEntry(
  target: [number, number, number],
  from: 'left' | 'right',
  zoom: number,
): CameraPreset {
  const sign = from === 'left' ? -1 : 1
  return {
    position: [target[0] + sign * 0.18, target[1] + 0.05, target[2] + 0.34],
    lookAt: target,
    zoom,
  }
}

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
): CameraPreset {
  const pf = getProgramFloor(floorId)
  const y = programCenterY(pf)
  const midY = towerTotalHeight() / 2 - 1

  if (opts.phase === 'boot' || opts.phase === 'survey') {
    return { position: [10, midY + 2.5, 20], lookAt: [0, 0.4, 0], zoom: 28 }
  }

  if (opts.phase === 'exit' || opts.phase === 'void') {
    return { position: [9, midY + 2.2, 24], lookAt: [0, midY - 0.5, 0], zoom: 22 }
  }

  if (viewMode === 'tower' || (floorId === 'G' && viewMode !== 'floor' && opts.phase !== 'lobby')) {
    return { position: [8.5, midY + 2, 22], lookAt: [0, midY - 0.5, 0], zoom: 24 }
  }

  if (opts.phase === 'lobby' && floorId === 'G' && viewMode === 'floor') {
    return closeStation(y, [0, y, 0], 'front', 78, 0.65)
  }

  if (floorId === 'roof') {
    const plateY = roofPlateY()
    const target: [number, number, number] = [0, plateY + 0.08, 0.18]
    if (viewMode === 'focus' || viewMode === 'room') {
      return { position: [0.55, plateY + 0.22, 2.8], lookAt: target, zoom: 240 }
    }
    return { position: [1.8, plateY + 0.55, 5.5], lookAt: [0, plateY, 0.1], zoom: 72 }
  }

  if (floorId === 'G') {
    if (viewMode === 'room' || viewMode === 'focus') {
      return closeStation(y, [0, y - 0.02, 0.08], 'diagL', 118)
    }
    return closeStation(y, [0, y, 0], 'front', 78, 0.65)
  }

  if (floorId === 'B10') {
    const target: [number, number, number] = [0, y + 0.02, 0.05]
    return interiorEntry(y, target, 'right', viewMode === 'focus' ? 165 : 158)
  }

  if (floorId === 'B2') {
    const target: [number, number, number] = [0, y + 0.02, 0.05]
    return interiorEntry(y, target, 'left', viewMode === 'focus' ? 165 : 158)
  }

  if (floorId === '23') {
    const stop = opts.factoryStop
    if (stop !== null && (viewMode === 'room' || viewMode === 'focus')) {
      const sx = FACTORY_STOPS[stop] ?? 0
      const target: [number, number, number] = [sx, y + 0.02, 0.12]
      return closeStation(y, target, stop % 2 === 0 ? 'left' : 'right', 198)
    }
    return closeStation(y, [0, y + 0.02, 0.1], 'front', 168, 0.35)
  }

  if (floorId === '52') {
    const station = opts.labRoomSlug ? labStation(opts.labRoomSlug) : null
    if (station && viewMode === 'focus' && opts.focusTarget === 'lab') {
      const target: [number, number, number] = [station.pos[0], y + station.lookAtY, station.pos[2]]
      return labStationCloseEntry(target, station.cameraSide, station.partZoom)
    }
    if (station && viewMode === 'room') {
      const target: [number, number, number] = [station.pos[0], y + station.lookAtY, station.pos[2]]
      return labStationRoomEntry(y, target, station.cameraSide, station.roomZoom)
    }
    return closeStation(y, [0, y + 0.02, 0], 'front', LAB_FLOOR_OVERVIEW_ZOOM, 0.38)
  }

  if (floorId === '99') {
    const archive = opts.libraryRoomSlug === 'archive'
    const library = opts.libraryRoomSlug === 'library'

    if (opts.focusTarget === 'book' && library) {
      return interiorEntry(y, [0, y + 0.04, -0.08], 'left', 210)
    }
    if (opts.focusTarget === 'credential' && archive) {
      return interiorEntry(y, [0, y + 0.04, -0.08], 'right', 210)
    }
    if (archive && viewMode === 'room') {
      const chunk = vaultChunk('archive')
      const [cx, , cz] = chunkPosition(chunk)
      const target: [number, number, number] = [cx, y + 0.12, cz]
      return labStationRoomEntry(y, target, chunk.cameraSide, chunk.roomZoom ?? ZOOM.L3_ROOM)
    }
    if (library && viewMode === 'room') {
      const chunk = vaultChunk('library')
      const [cx, , cz] = chunkPosition(chunk)
      const target: [number, number, number] = [cx, y + 0.12, cz]
      return labStationRoomEntry(y, target, chunk.cameraSide, chunk.roomZoom ?? ZOOM.L3_ROOM)
    }
    return closeStation(y, [0, y + 0.02, 0], 'front', 140, 0.42)
  }

  return closeStation(y, [0, y, 0], 'front', 72, 0.55)
}
