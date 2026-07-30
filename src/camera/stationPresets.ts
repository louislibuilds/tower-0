/**
 * Authored orthographic presets for every exhibit station.
 * Each entry is hand-tuned composition — not a shared formula.
 * Coordinates are band-local: lookAt xz + y offset from floor center; eye is offset from lookAt.
 */

import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, programBaseY, towerTotalHeight, visualBandHeight } from '../scene/towerGeometry'
import { floorPlateSize } from '../scene/typologies/interiorScale'
import { labCellAnchor, labChunk, vaultCornerAnchor, LAB_CHUNKS } from '../scene/typologies/floorChunks'
import { FACTORY_LINE_X } from '../scene/factoryStops'

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

/** Shared room-view framing — oblique, pulled back from front face */
const SUITE_ROOM_EYE_Y = 0.28
const SUITE_ROOM_EYE_Z = 0.72
const SUITE_ROOM_EYE_X = 0.3
const SUITE_ROOM_ZOOM = 348
const SUITE_ROOM_LOOK_Y = 0.06
const SUITE_ROOM_LOOK_Z = 0.08

function labFocusPreset(slug: string): AuthoredPreset | null {
  const chunk = labChunk(slug)
  if (!chunk) return null
  const plate = floorPlateSize('52')
  const focusScale = 0.78
  const [tx, baseY, tz] = labCellAnchor(slug, plate, focusScale)
  const eyeX = chunk.cameraSide === 'left' ? -SUITE_ROOM_EYE_X : SUITE_ROOM_EYE_X
  return {
    lookAt: [tx, baseY + SUITE_ROOM_LOOK_Y, tz + SUITE_ROOM_LOOK_Z],
    eye: [eyeX, SUITE_ROOM_EYE_Y, SUITE_ROOM_EYE_Z],
    zoom: SUITE_ROOM_ZOOM,
  }
}

/** 52F · lab suites — back-wall gallery (99F pattern) */
const LAB_STATIONS: Record<string, AuthoredPreset> = Object.fromEntries(
  LAB_CHUNKS.map((chunk) => {
    const preset = labFocusPreset(chunk.slug)
    return preset ? ([chunk.slug, preset] as const) : null
  }).filter((entry): entry is [string, AuthoredPreset] => entry !== null),
)

const LAB_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.06, -0.18],
  eye: [0.55, 0.48, 2.15],
  zoom: 142,
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
    lookAt: [
      VAULT_LIB_ANCHOR[0],
      VAULT_LIB_ANCHOR[1] + SUITE_ROOM_LOOK_Y,
      VAULT_LIB_ANCHOR[2] + SUITE_ROOM_LOOK_Z,
    ],
    eye: [SUITE_ROOM_EYE_X, SUITE_ROOM_EYE_Y, SUITE_ROOM_EYE_Z],
    zoom: SUITE_ROOM_ZOOM,
  },
  archive: {
    lookAt: [
      VAULT_ARC_ANCHOR[0],
      VAULT_ARC_ANCHOR[1] + SUITE_ROOM_LOOK_Y,
      VAULT_ARC_ANCHOR[2] + SUITE_ROOM_LOOK_Z,
    ],
    eye: [-SUITE_ROOM_EYE_X, SUITE_ROOM_EYE_Y, SUITE_ROOM_EYE_Z],
    zoom: SUITE_ROOM_ZOOM,
  },
}

const VAULT_FLOOR_OVERVIEW: AuthoredPreset = {
  lookAt: [0, 0.06, -0.16],
  eye: [0.55, 0.48, 2.12],
  zoom: 144,
}

const VAULT_BOOK_FOCUS = vaultFocusPreset(
  'library',
  [0, SUITE_ROOM_LOOK_Y, SUITE_ROOM_LOOK_Z],
  [SUITE_ROOM_EYE_X, SUITE_ROOM_EYE_Y, SUITE_ROOM_EYE_Z],
  SUITE_ROOM_ZOOM,
)

const VAULT_CREDENTIAL_FOCUS = vaultFocusPreset(
  'archive',
  [0, SUITE_ROOM_LOOK_Y, SUITE_ROOM_LOOK_Z],
  [-SUITE_ROOM_EYE_X, SUITE_ROOM_EYE_Y, SUITE_ROOM_EYE_Z],
  SUITE_ROOM_ZOOM,
)

/** 23F · front elevation — closer, higher frame on stack midline */
function factoryTimelinePreset(factoryStop: number | null): AuthoredPreset {
  const band = getProgramFloor('23')
  const plateY = -band.interiorHeight / 2 + 0.34
  const focusX = factoryStop !== null ? (FACTORY_LINE_X[factoryStop] ?? 0) : 0
  const focused = factoryStop !== null
  return {
    lookAt: [focusX, plateY, 0],
    eye: [0, 0.12, focused ? 0.52 : 0.58],
    zoom: focused ? 478 : 448,
  }
}

/** G · threshold hall — +Z facade (same axis as tower windows & 52F), look toward −Z back */
const G_FLOOR: AuthoredPreset = { lookAt: [0, 0.1, -0.12], eye: [0.42, 0.72, 2.05], zoom: 76 }
const G_ROOM: AuthoredPreset = { lookAt: [0, 0.08, -0.08], eye: [0.15, 0.48, 1.28], zoom: 112 }

/** B10 · single hall (16 seats, 4 pods) */
const B10_FLOOR: AuthoredPreset = { lookAt: [0, 0.08, 0.06], eye: [0.48, 0.28, 0.92], zoom: 208 }
const B10_FOCUS: AuthoredPreset = { lookAt: [0, 0.08, 0.06], eye: [0.44, 0.26, 0.86], zoom: 224 }

/** B2 · riser core */
const B2_FLOOR: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [-0.42, 0.22, 0.68], zoom: 268 }
const B2_FOCUS: AuthoredPreset = { lookAt: [0, 0.06, 0.02], eye: [-0.38, 0.2, 0.62], zoom: 288 }

/** Roof · plate deck — look at identity plate on 99F top front edge */
function roofPresets(): { floor: AuthoredPreset; room: AuthoredPreset } {
  const roof = getProgramFloor('roof')
  const f99 = getProgramFloor('99')
  const plateY = programBaseY(f99) + visualBandHeight(f99) + 0.24
  const centerY = programCenterY(roof)
  const lift = plateY - centerY
  const zPlate = f99.depth / 2 + 0.02
  const xPlate = -f99.width / 2 + f99.width * 0.27
  return {
    floor: { lookAt: [xPlate, lift, zPlate], eye: [0.62, 0.42, 2.35], zoom: 76 },
    room: { lookAt: [xPlate, lift + 0.02, zPlate], eye: [0.24, 0.08, 1.05], zoom: 248 },
  }
}

export function roofPlateY(): number {
  const roof = getProgramFloor('roof')
  return programBaseY(roof) + visualBandHeight(roof) * 0.55
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

  if (opts.phase === 'boot' || opts.phase === 'scan') {
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
    return compose(y, factoryTimelinePreset(opts.factoryStop))
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
