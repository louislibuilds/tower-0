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
import { FACTORY_STOPS } from '../scene/factoryStops'
import { chunkBaseLookAt, chunkPosition, labChunk, vaultChunk } from '../scene/typologies/floorChunks'

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

function labPresetFromChunk(slug: string, eye: [number, number, number], zoom: number): AuthoredPreset | null {
  const chunk = labChunk(slug)
  if (!chunk) return null
  const [cx, , cz] = chunkPosition(chunk)
  return { lookAt: [cx, chunkBaseLookAt(chunk), cz], eye, zoom }
}

/** 52F · five lab stations — lookAt at footprint base, low eye offset */
const LAB_STATIONS: Record<string, AuthoredPreset> = {
  'unihack-2026': labPresetFromChunk('unihack-2026', [0.52, 0.14, 0.58], 485)!,
  'cloud-computing': labPresetFromChunk('cloud-computing', [-0.52, 0.14, 0.58], 465)!,
  nlp: labPresetFromChunk('nlp', [0.62, 0.14, 0.56], 480)!,
  dl: labPresetFromChunk('dl', [-0.62, 0.14, 0.56], 505)!,
  kata: labPresetFromChunk('kata', [0.02, 0.14, 0.64], 475)!,
}

const LAB_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.04, 0],
  eye: [0.42, 0.48, 2.05],
  zoom: 188,
}

/** 99F · stack + vault blocks at scatter anchors */
function vaultPreset(slug: LibraryRoomSlug, eye: [number, number, number], zoom: number): AuthoredPreset {
  const chunk = vaultChunk(slug)
  const [cx, , cz] = chunkPosition(chunk)
  return { lookAt: [cx, chunkBaseLookAt(chunk), cz], eye, zoom }
}

function vaultFocusPreset(
  slug: LibraryRoomSlug,
  localLookAt: [number, number, number],
  eye: [number, number, number],
  zoom: number,
): AuthoredPreset {
  const chunk = vaultChunk(slug)
  const [cx, , cz] = chunkPosition(chunk)
  const baseY = chunkBaseLookAt(chunk)
  return {
    lookAt: [cx + localLookAt[0], baseY + localLookAt[1], cz + localLookAt[2]],
    eye,
    zoom,
  }
}

const VAULT_STATIONS: Record<LibraryRoomSlug, AuthoredPreset> = {
  library: vaultPreset('library', [0.48, 0.14, 0.58], 420),
  archive: vaultPreset('archive', [-0.48, 0.14, 0.58], 435),
}

const VAULT_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.04, 0],
  eye: [0.38, 0.45, 1.95],
  zoom: 168,
}

const VAULT_BOOK_FOCUS = vaultFocusPreset('library', [0, 0.02, -0.04], [0.48, 0.14, 0.58], 420)

const VAULT_CREDENTIAL_FOCUS = vaultFocusPreset('archive', [0, 0.02, -0.04], [-0.48, 0.14, 0.58], 435)

/** 23F · four semester areas */
const FACTORY_STATIONS: AuthoredPreset[] = FACTORY_STOPS.map((sx, i) => ({
  lookAt: [sx, 0.04, 0.1],
  eye: [i % 2 === 0 ? 0.58 : -0.58, 0.32, 0.88],
  zoom: 220 + (i % 2) * 12,
}))

const FACTORY_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.03, 0.06],
  eye: [0.35, 0.42, 1.85],
  zoom: 178,
}

/** G · threshold hall */
const G_FLOOR: AuthoredPreset = { lookAt: [0, 0, 0], eye: [0.35, 0.55, 2.8], zoom: 82 }
const G_ROOM: AuthoredPreset = { lookAt: [0, -0.02, 0.08], eye: [-0.55, 0.38, 1.05], zoom: 128 }

/** B10 · rack hall */
const B10_FLOOR: AuthoredPreset = { lookAt: [0, 0.02, 0.05], eye: [0.62, 0.34, 0.95], zoom: 168 }
const B10_FOCUS: AuthoredPreset = { lookAt: [0, 0.02, 0.05], eye: [0.58, 0.3, 0.88], zoom: 178 }

/** B2 · riser core */
const B2_FLOOR: AuthoredPreset = { lookAt: [0, 0.02, 0.05], eye: [-0.62, 0.34, 0.95], zoom: 168 }
const B2_FOCUS: AuthoredPreset = { lookAt: [0, 0.02, 0.05], eye: [-0.58, 0.3, 0.88], zoom: 178 }

/** Roof · plate deck */
function roofPresets(): { floor: AuthoredPreset; room: AuthoredPreset } {
  const roof = getProgramFloor('roof')
  const plateY = programBaseY(roof) + roof.bandHeight * 0.55
  const centerY = programCenterY(roof)
  const lift = plateY - centerY
  return {
    floor: { lookAt: [0, lift, 0.1], eye: [0.72, 0.55, 2.4], zoom: 78 },
    room: { lookAt: [0, lift + 0.08, 0.18], eye: [0.28, 0.18, 0.95], zoom: 255 },
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
    if (opts.factoryStop !== null && (viewMode === 'room' || viewMode === 'focus')) {
      const preset = FACTORY_STATIONS[opts.factoryStop] ?? FACTORY_STATIONS[0]
      return compose(y, preset)
    }
    return compose(y, FACTORY_FLOOR_OVERVIEW)
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
