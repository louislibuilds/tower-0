import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, programBaseY, towerTotalHeight } from '../scene/towerGeometry'
import { FACTORY_STOPS } from '../scene/factoryStops'

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

const LAB_ROOM_TARGETS: Record<string, [number, number, number]> = {
  'unihack-2026': [-0.55, 0, 0.28],
  'cloud-computing': [0, 0, -0.18],
  nlp: [0.55, 0, 0.28],
  dl: [-0.32, 0, -0.32],
  kata: [0.38, 0, -0.28],
}

export function cameraPreset(
  floorId: FloorId,
  viewMode: ViewMode,
  opts: {
    factoryStop: number | null
    libraryRoomSlug: LibraryRoomSlug | null
    labRoomSlug: string | null
    focusTarget: 'book' | 'credential' | 'lab' | null
  },
): CameraPreset {
  const pf = getProgramFloor(floorId)
  const y = programCenterY(pf)
  const midY = towerTotalHeight() / 2 - 1

  if (viewMode === 'tower' || (floorId === 'G' && viewMode !== 'floor')) {
    return { position: [8.5, midY + 2, 22], lookAt: [0, midY - 0.5, 0], zoom: 24 }
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
    if (viewMode === 'room' || viewMode === 'focus') {
      return interiorEntry(y, target, 'right', 145)
    }
    return closeStation(y, target, 'diagR', 95, 0.45)
  }

  if (floorId === 'B2') {
    const target: [number, number, number] = [0, y + 0.02, 0.05]
    if (viewMode === 'room' || viewMode === 'focus') {
      return interiorEntry(y, target, 'left', 145)
    }
    return closeStation(y, target, 'diagL', 95, 0.45)
  }

  if (floorId === '23') {
    const stop = opts.factoryStop
    if (stop !== null && (viewMode === 'room' || viewMode === 'focus')) {
      const sx = FACTORY_STOPS[stop] ?? 0
      const target: [number, number, number] = [sx, y + 0.02, 0.12]
      return closeStation(y, target, stop % 2 === 0 ? 'left' : 'right', 148)
    }
    return closeStation(y, [0, y + 0.02, 0.1], 'front', 105, 0.4)
  }

  if (floorId === '52') {
    if (opts.labRoomSlug && (viewMode === 'room' || viewMode === 'focus')) {
      const base = LAB_ROOM_TARGETS[opts.labRoomSlug] ?? [0, 0, 0]
      const target: [number, number, number] = [base[0], y + 0.05, base[2]]
      const zoom = viewMode === 'focus' ? 210 : 185
      return interiorEntry(y, target, base[0] < 0 ? 'left' : 'right', zoom)
    }
    return closeStation(y, [0, y + 0.02, 0], 'diagR', 108, 0.38)
  }

  if (floorId === '99') {
    const archive = opts.libraryRoomSlug === 'archive'
    const library = opts.libraryRoomSlug === 'library'

    if (opts.focusTarget === 'book' && library) {
      return interiorEntry(y, [-0.42, y + 0.06, 0.1], 'left', 205)
    }
    if (opts.focusTarget === 'credential' && archive) {
      return interiorEntry(y, [0.38, y + 0.06, 0.08], 'right', 205)
    }
    if (archive && viewMode === 'room') {
      return interiorEntry(y, [0.38, y + 0.04, 0.06], 'right', 175)
    }
    if (library && viewMode === 'room') {
      return interiorEntry(y, [-0.42, y + 0.04, 0.1], 'left', 175)
    }
    return closeStation(y, [0, y + 0.02, 0], 'front', 100, 0.42)
  }

  return closeStation(y, [0, y, 0], 'front', 72, 0.55)
}
