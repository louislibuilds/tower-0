import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, towerTotalHeight } from '../scene/towerGeometry'
import { FACTORY_STOPS } from '../scene/factoryStops'

export interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

const LAB_ROOM_OFFSETS: Record<string, [number, number, number]> = {
  'unihack-2026': [-0.55, 0.05, 0.28],
  'cloud-computing': [0, 0.12, -0.18],
  nlp: [0.55, 0.05, 0.28],
  dl: [-0.32, -0.18, -0.32],
  kata: [0.38, -0.18, -0.28],
}

export function cameraPreset(
  floorId: FloorId,
  viewMode: ViewMode,
  opts: {
    factoryStop: number | null
    libraryRoomSlug: LibraryRoomSlug | null
    labRoomSlug: string | null
    focusTarget: 'book' | 'credential' | null
  },
): CameraPreset {
  const pf = getProgramFloor(floorId)
  const y = programCenterY(pf)
  const midY = towerTotalHeight() / 2 - 1

  if (viewMode === 'tower' || (floorId === 'G' && viewMode !== 'floor')) {
    return { position: [7.5, midY + 1.2, 19], lookAt: [0, midY - 0.3, 0], zoom: 26 }
  }

  if (floorId === 'roof') {
    if (viewMode === 'focus' || viewMode === 'room') {
      return { position: [0.35, y + 0.55, 5.2], lookAt: [0, y + 0.18, 0.28], zoom: 155 }
    }
    if (viewMode === 'floor') {
      return { position: [1.2, y + 1.8, 8], lookAt: [0, y + 0.35, 0.15], zoom: 72 }
    }
    return { position: [2.5, y + 2.2, 11], lookAt: [0, y + 0.3, 0], zoom: 44 }
  }

  if (floorId === 'G') {
    return { position: [4.5, y + 0.9, 8], lookAt: [0, y + 0.05, 0], zoom: 62 }
  }

  if (floorId === 'B10' || floorId === 'B2') {
    const z = viewMode === 'room' ? 6.5 : 8.5
    const zoom = viewMode === 'room' ? 78 : 58
    return { position: [4.8, y + 1.0, z], lookAt: [0, y - 0.05, 0], zoom }
  }

  if (floorId === '23') {
    const stop = opts.factoryStop
    if (stop !== null && (viewMode === 'room' || viewMode === 'focus')) {
      const sx = FACTORY_STOPS[stop] ?? 0
      return {
        position: [sx + 0.15, y + 0.65, 6.2],
        lookAt: [sx, y + 0.02, 0.05],
        zoom: 88,
      }
    }
    return { position: [0.2, y + 1.0, 7.5], lookAt: [0, y + 0.05, 0], zoom: 64 }
  }

  if (floorId === '52') {
    if (opts.labRoomSlug && (viewMode === 'room' || viewMode === 'focus')) {
      const off = LAB_ROOM_OFFSETS[opts.labRoomSlug] ?? [0, 0, 0]
      return {
        position: [off[0] + 0.25, y + off[1] + 0.55, 6],
        lookAt: [off[0], y + off[1] + 0.1, off[2]],
        zoom: 92,
      }
    }
    return { position: [3.5, y + 0.85, 7.2], lookAt: [0, y + 0.05, 0], zoom: 66 }
  }

  if (floorId === '99') {
    const archive = opts.libraryRoomSlug === 'archive'
    const library = opts.libraryRoomSlug === 'library'

    if (opts.focusTarget === 'book' && library) {
      return { position: [-0.55, y + 0.55, 5.5], lookAt: [-0.42, y + 0.12, 0.08], zoom: 108 }
    }
    if (opts.focusTarget === 'credential' && archive) {
      return { position: [0.5, y + 0.55, 5.5], lookAt: [0.38, y + 0.15, -0.02], zoom: 108 }
    }
    if (archive && viewMode === 'room') {
      return { position: [0.65, y + 0.75, 6.5], lookAt: [0.38, y + 0.08, -0.05], zoom: 82 }
    }
    if (library && viewMode === 'room') {
      return { position: [-0.55, y + 0.75, 6.5], lookAt: [-0.42, y + 0.08, 0.1], zoom: 82 }
    }
    return { position: [0.3, y + 1.0, 7.8], lookAt: [0, y + 0.05, 0], zoom: 64 }
  }

  return { position: [4, y + 0.75, 7.5], lookAt: [0, y, 0], zoom: 58 }
}
