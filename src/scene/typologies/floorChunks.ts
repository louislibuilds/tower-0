import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { LAB_SUITES, type LabSuite } from '../../data/labs'
import { getProgramFloor } from '../towerGeometry'
import { bandInterior, LAB_BLUEPRINT_DIMS } from './interiorScale'
import { LAB_GRID_SLOTS } from './labGrid'

export interface ExhibitChunk {
  id: string
  slug: string
  code?: string
  pos: [number, number, number]
  size: { w: number; d: number; h: number }
  cameraSide: 'left' | 'right'
  /** Y rotation — typology faces corridor / interior */
  rotation?: number
  /** Camera look-at height; defaults to station footprint center */
  lookAtY?: number
  /** Leader-line label offset from station anchor [x, y, z] */
  calloutOffset?: [number, number, number]
}

export function floorInterior(floorId: FloorId) {
  const band = getProgramFloor(floorId)
  return bandInterior(band.width, band.depth, band.interiorHeight)
}

export const MIN_CHUNK = { w: 0.34, d: 0.3, h: 0.34 } as const

/** Station click footprint vs chunk shell (larger = easier floor-level picking) */
export const STATION_FOOTPRINT_INSET = 0.92
export const STATION_HIT_MARGIN = { w: 0.18, h: 0.1, d: 0.18 } as const

export function buildLabChunks(suites: LabSuite[]): ExhibitChunk[] {
  return suites.slice(0, LAB_GRID_SLOTS.length).map((suite, i) => {
    const slot = LAB_GRID_SLOTS[i]
    return {
      id: `lab-${suite.code}`,
      slug: suite.slug,
      code: suite.code,
      ...slot,
    }
  })
}

/** 52F — lab suites from content/data/labs.ts (sample: 3 pods, personal: up to 8) */
export const LAB_CHUNKS: ExhibitChunk[] = buildLabChunks(LAB_SUITES)

/** 99F — library mid-left, archive top-right corner (slightly larger pods) */
export const VAULT_CHUNKS: Record<LibraryRoomSlug, ExhibitChunk> = {
  library: {
    id: 'vault-lib',
    slug: 'library',
    pos: [-0.5, 0, -0.04],
    size: { w: 0.66, d: 0.54, h: 0.44 },
    cameraSide: 'right',
    rotation: 0,
    calloutOffset: [-0.42, 0.42, 0.38],
  },
  archive: {
    id: 'vault-arc',
    slug: 'archive',
    pos: [0.52, 0, -0.54],
    size: { w: 0.66, d: 0.54, h: 0.44 },
    cameraSide: 'left',
    rotation: 0,
    calloutOffset: [0.42, 0.42, 0.38],
  },
}

export function chunkPosition(chunk: ExhibitChunk): [number, number, number] {
  return chunk.pos
}

/** Station footprint center — not label height */
export function chunkBaseLookAt(chunk: ExhibitChunk): number {
  return chunk.lookAtY ?? 0.04
}

export function labChunk(slug: string): ExhibitChunk | undefined {
  return LAB_CHUNKS.find((c) => c.slug === slug)
}

export function vaultChunk(slug: LibraryRoomSlug): ExhibitChunk {
  return VAULT_CHUNKS[slug]
}

/** Back-wall / front-row anchor when a 52F lab suite expands */
export function labCellAnchor(slug: string, interior: { w: number; d: number }, scale: number) {
  const chunk = labChunk(slug)
  if (!chunk) return [0, 0.04, 0] as const
  const [cx, , cz] = chunkPosition(chunk)
  const [, gridD] = LAB_BLUEPRINT_DIMS[slug] ?? [5, 5]
  const halfD = ((gridD * 0.1 * scale) / 2) * 0.96
  const backZ = -interior.d / 2 + halfD + 0.04
  const frontZ = interior.d / 2 - halfD - 0.04
  const z = cz > 0.06 ? Math.min(frontZ, cz + halfD * 0.45) : backZ
  return [cx, 0.04, z] as const
}

/** Corner / edge anchor when a vault suite expands (library = mid-left, archive = top-right) */
export function vaultCornerAnchor(
  slug: LibraryRoomSlug,
  interior: { w: number; d: number },
  scale: number,
) {
  const halfW = ((6 * 0.1 * scale) / 2) * 0.98
  const halfD = ((5 * 0.1 * scale) / 2) * 0.98
  if (slug === 'library') {
    const x = -interior.w / 2 + halfW + 0.04
    const z = -0.02
    return [x, 0.04, z] as const
  }
  const x = interior.w / 2 - halfW - 0.04
  const z = -interior.d / 2 + halfD + 0.04
  return [x, 0.04, z] as const
}
