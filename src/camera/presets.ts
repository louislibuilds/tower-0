import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, programBaseY, SPIRE_HEIGHT, towerTotalHeight } from '../scene/towerGeometry'
import { FACTORY_STOPS } from '../scene/factoryStops'

export interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

/** Spire apex Y — identity plate mounts here */
export function roofPlateY(): number {
  const roof = getProgramFloor('roof')
  return programBaseY(roof) + roof.bandHeight + SPIRE_HEIGHT * 0.82
}

type Side = 'front' | 'left' | 'right' | 'diagL' | 'diagR'

const SIDE_OFFSET: Record<Side, [number, number]> = {
  front: [0.4, 4.2],
  left: [-1.8, 3.8],
  right: [1.8, 3.8],
  diagL: [-1.2, 4.8],
  diagR: [1.2, 4.8],
}

function closeStation(
  y: number,
  target: [number, number, number],
  side: Side,
  zoom: number,
  eyeLift = 0.45,
): CameraPreset {
  const [ox, oz] = SIDE_OFFSET[side]
  return {
    position: [target[0] + ox, y + eyeLift, target[2] + oz],
    lookAt: target,
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

const LAB_SIDES: Record<string, Side> = {
  'unihack-2026': 'left',
  'cloud-computing': 'front',
  nlp: 'right',
  dl: 'diagL',
  kata: 'diagR',
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
    const target: [number, number, number] = [0, plateY - 0.05, 0.06]
    if (viewMode === 'focus' || viewMode === 'room') {
      return closeStation(plateY, target, 'diagR', 185, 0.15)
    }
    if (viewMode === 'floor') {
      return { position: [1.4, plateY + 0.35, 5.5], lookAt: [0, plateY - 0.1, 0], zoom: 95 }
    }
    return { position: [2.8, plateY + 0.8, 9], lookAt: [0, plateY - 0.2, 0], zoom: 52 }
  }

  if (floorId === 'G') {
    if (viewMode === 'room' || viewMode === 'focus') {
      return closeStation(y, [0, y - 0.02, 0.08], 'diagL', 118)
    }
    return closeStation(y, [0, y, 0], 'front', 78, 0.75)
  }

  if (floorId === 'B10') {
    const target: [number, number, number] = [0, y - 0.08, 0]
    if (viewMode === 'room' || viewMode === 'focus') {
      return closeStation(y, target, 'right', 125)
    }
    return closeStation(y, target, 'diagR', 88, 0.65)
  }

  if (floorId === 'B2') {
    const target: [number, number, number] = [0, y - 0.08, 0]
    if (viewMode === 'room' || viewMode === 'focus') {
      return closeStation(y, target, 'left', 125)
    }
    return closeStation(y, target, 'diagL', 88, 0.65)
  }

  if (floorId === '23') {
    const stop = opts.factoryStop
    if (stop !== null && (viewMode === 'room' || viewMode === 'focus')) {
      const sx = FACTORY_STOPS[stop] ?? 0
      const target: [number, number, number] = [sx, y - 0.05, 0.1]
      return closeStation(y, target, stop % 2 === 0 ? 'left' : 'right', 135)
    }
    return closeStation(y, [0, y - 0.05, 0.08], 'front', 98, 0.55)
  }

  if (floorId === '52') {
    if (opts.labRoomSlug && (viewMode === 'room' || viewMode === 'focus')) {
      const base = LAB_ROOM_TARGETS[opts.labRoomSlug] ?? [0, 0, 0]
      const target: [number, number, number] = [base[0], y + base[1] * 0.3, base[2]]
      const side = LAB_SIDES[opts.labRoomSlug] ?? 'front'
      const zoom = viewMode === 'focus' ? 155 : 128
      return closeStation(y, target, side, zoom, 0.35)
    }
    return closeStation(y, [0, y - 0.05, 0], 'diagR', 102, 0.5)
  }

  if (floorId === '99') {
    const archive = opts.libraryRoomSlug === 'archive'
    const library = opts.libraryRoomSlug === 'library'

    if (opts.focusTarget === 'book' && library) {
      return closeStation(y, [-0.42, y + 0.05, 0.12], 'left', 168, 0.3)
    }
    if (opts.focusTarget === 'credential' && archive) {
      return closeStation(y, [0.38, y + 0.05, 0.08], 'right', 168, 0.3)
    }
    if (archive && viewMode === 'room') {
      return closeStation(y, [0.38, y + 0.02, 0.06], 'right', 132, 0.38)
    }
    if (library && viewMode === 'room') {
      return closeStation(y, [-0.42, y + 0.02, 0.1], 'left', 132, 0.38)
    }
    return closeStation(y, [0, y - 0.05, 0], 'front', 96, 0.55)
  }

  return closeStation(y, [0, y, 0], 'front', 72, 0.6)
}
