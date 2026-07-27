/**
 * Authored orthographic presets for every exhibit station.
 * Each entry is hand-tuned composition — not a shared formula.
 * Coordinates are band-local: lookAt xz + y offset from floor center; eye is offset from lookAt.
 */

import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, programBaseY, towerTotalHeight } from '../scene/towerGeometry'
import { floorPlateSize } from '../scene/typologies/interiorScale'
import { chunkBaseLookAt, labCellAnchor, labChunk, vaultCornerAnchor } from '../scene/typologies/floorChunks'

export interface AuthoredPreset {
  lookAt: [number, number, number]
  eye: [number, number, number]
  zoom: number
}

export interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

function compose(floorY: number, preset: AuthoredPreset): CameraPreset {
  const lookAt: [number, number, number] = [
    preset.lookAt[0],
    floorY + preset.lookAt[1],
    preset.lookAt[2],
  ]
  return {
    lookAt,
    position: [lookAt[0] + preset.eye[0], lookAt[1] + preset.eye[1], lookAt[2] + preset.eye[2]],
    zoom: preset.zoom,
  }
}

function labFocusPreset(slug: string): AuthoredPreset | null {
  const chunk = labChunk(slug)
  if (!chunk) return null
  const plate = floorPlateSize('52')
  const [tx, , tz] = labCellAnchor(slug, plate, 0.72)
  const eyeX = chunk.cameraSide === 'left' ? -0.44 : 0.44
  return { lookAt: [tx, chunkBaseLookAt(chunk), tz], eye: [eyeX, 0.12, 0.46], zoom: 462 }
}

/** 52F · five lab suites — back-wall gallery (99F pattern) */
const LAB_STATIONS: Record<string, AuthoredPreset> = {
  'unihack-2026': labFocusPreset('unihack-2026')!,
  'cloud-computing': labFocusPreset('cloud-computing')!,
  nlp: labFocusPreset('nlp')!,
  dl: labFocusPreset('dl')!,
  kata: labFocusPreset('kata')!,
}

const LAB_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.04, -0.1],
  eye: [0.38, 0.28, 1.78],
  zoom: 170,
}

function vaultFocusPreset(
  slug: LibraryRoomSlug,
  localLookAt: [number, number, number],
  eye: [number, number, number],
  zoom: number,
): AuthoredPreset {
  const plate = floorPlateSize('99')
  const scale = 0.78
  const [cx, baseY, cz] = vaultCornerAnchor(slug, plate, scale)
  return {
    lookAt: [cx + localLookAt[0], baseY + localLookAt[1], cz + localLookAt[2]],
    eye,
    zoom,
  }
}

const VAULT_PLATE = floorPlateSize('99')
const VAULT_FOCUS_SCALE = 0.78
const VAULT_LIB_ANCHOR = vaultCornerAnchor('library', VAULT_PLATE, VAULT_FOCUS_SCALE)
const VAULT_ARC_ANCHOR = vaultCornerAnchor('archive', VAULT_PLATE, VAULT_FOCUS_SCALE)

const VAULT_STATIONS: Record<LibraryRoomSlug, AuthoredPreset> = {
  library: {
    lookAt: [VAULT_LIB_ANCHOR[0], VAULT_LIB_ANCHOR[1], VAULT_LIB_ANCHOR[2]],
    eye: [0.42, 0.1, 0.42],
    zoom: 478,
  },
  archive: {
    lookAt: [VAULT_ARC_ANCHOR[0], VAULT_ARC_ANCHOR[1], VAULT_ARC_ANCHOR[2]],
    eye: [-0.42, 0.1, 0.42],
    zoom: 478,
  },
}

const VAULT_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.04, -0.08],
  eye: [0.38, 0.28, 1.75],
  zoom: 172,
}

const VAULT_BOOK_FOCUS = vaultFocusPreset('library', [0, 0.04, 0.08], [0.42, 0.1, 0.42], 478)

const VAULT_CREDENTIAL_FOCUS = vaultFocusPreset('archive', [0, 0.04, 0.08], [-0.42, 0.1, 0.42], 478)

/** 23F · side timeline — all lines visible left→right, no per-stop camera swing */
const FACTORY_TIMELINE_VIEW: AuthoredPreset = {
  lookAt: [0, 0.04, 0.02],
  eye: [2.05, 0.34, 0.12],
  zoom: 162,
}

/** G · threshold hall */
const G_FLOOR: AuthoredPreset = { lookAt: [0, 0, 0], eye: [0.35, 0.55, 2.8], zoom: 82 }
const G_ROOM: AuthoredPreset = { lookAt: [0, -0.02, 0.08], eye: [-0.55, 0.38, 1.05], zoom: 128 }

/** B10 · rack hall */
const B10_FLOOR: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [0.42, 0.22, 0.68], zoom: 268 }
const B10_FOCUS: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [0.38, 0.2, 0.62], zoom: 288 }

/** B2 · riser core */
const B2_FLOOR: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [-0.42, 0.22, 0.68], zoom: 268 }
const B2_FOCUS: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [-0.38, 0.2, 0.62], zoom: 288 }

/** Roof · plate deck — look at identity plate on 99F top front edge */
function roofPresets(): { floor: AuthoredPreset; room: AuthoredPreset } {
  const roof = getProgramFloor('roof')
  const f99 = getProgramFloor('99')
  const plateY = programBaseY(f99) + f99.bandHeight + 0.24
  const centerY = programCenterY(roof)
  const lift = plateY - centerY
  const zPlate = f99.depth / 2 + 0.02
  return {
    floor: { lookAt: [0, lift, zPlate], eye: [0.62, 0.42, 2.35], zoom: 76 },
    room: { lookAt: [0, lift + 0.02, zPlate], eye: [0.24, 0.08, 1.05], zoom: 248 },
  }
}

export function roofPlateY(): number {
  const roof = getProgramFloor('roof')
  return programBaseY(roof) + roof.bandHeight * 0.55
}

export function stationCameraPreset(
  floorId: FloorId,
  viewMode: ViewMode,
  opts: {
    phase: SitePhase
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
    return compose(y, G_FLOOR)
  }

  if (floorId === 'roof') {
    const roof = roofPresets()
    if (viewMode === 'focus' || viewMode === 'room') return compose(y, roof.room)
    return compose(y, roof.floor)
  }

  if (floorId === 'G') {
    if (viewMode === 'room' || viewMode === 'focus') return compose(y, G_ROOM)
    return compose(y, G_FLOOR)
  }

  if (floorId === 'B10') {
    return compose(y, viewMode === 'focus' ? B10_FOCUS : B10_FLOOR)
  }

  if (floorId === 'B2') {
    return compose(y, viewMode === 'focus' ? B2_FOCUS : B2_FLOOR)
  }

  if (floorId === '23') {
    return compose(y, FACTORY_TIMELINE_VIEW)
  }

  if (floorId === '52') {
    if (opts.labRoomSlug && viewMode === 'room') {
      const preset = LAB_STATIONS[opts.labRoomSlug]
      if (preset) return compose(y, preset)
    }
    return compose(y, LAB_FLOOR_OVERVIEW)
  }

  if (floorId === '99') {
    if (opts.focusTarget === 'book') return compose(y, VAULT_BOOK_FOCUS)
    if (opts.focusTarget === 'credential') return compose(y, VAULT_CREDENTIAL_FOCUS)
    if (opts.libraryRoomSlug && viewMode === 'room') {
      return compose(y, VAULT_STATIONS[opts.libraryRoomSlug])
    }
    return compose(y, VAULT_FLOOR_OVERVIEW)
  }

  return compose(y, { lookAt: [0, 0, 0], eye: [0.35, 0.45, 2.2], zoom: 78 })
}

/** @deprecated Use stationCameraPreset — kept for lab layout exports */
export const LAB_FLOOR_OVERVIEW_ZOOM = LAB_FLOOR_OVERVIEW.zoom
