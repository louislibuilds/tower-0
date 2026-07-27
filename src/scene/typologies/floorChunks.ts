import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { getProgramFloor } from '../towerGeometry'
import { bandInterior } from './interiorScale'

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
}

export function floorInterior(floorId: FloorId) {
  const band = getProgramFloor(floorId)
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export const MIN_CHUNK = { w: 0.28, d: 0.26, h: 0.32 } as const

/**
 * 52F — five labs on a double-loaded corridor (max 8 suites + circulation).
 * North row ×3 faces south; south row ×2 faces north.
 */
export const LAB_CHUNKS: ExhibitChunk[] = [
  {
    id: 'lab-001',
    slug: 'unihack-2026',
    code: '001',
    pos: [-0.54, 0, 0.4],
    size: { w: 0.36, d: 0.3, h: 0.34 },
    cameraSide: 'right',
    rotation: Math.PI,
  },
  {
    id: 'lab-002',
    slug: 'cloud-computing',
    code: '002',
    pos: [0, 0, 0.4],
    size: { w: 0.36, d: 0.3, h: 0.34 },
    cameraSide: 'right',
    rotation: Math.PI,
  },
  {
    id: 'lab-003',
    slug: 'nlp',
    code: '003',
    pos: [0.54, 0, 0.4],
    size: { w: 0.36, d: 0.3, h: 0.34 },
    cameraSide: 'left',
    rotation: Math.PI,
  },
  {
    id: 'lab-004',
    slug: 'dl',
    code: '004',
    pos: [-0.42, 0, -0.38],
    size: { w: 0.36, d: 0.3, h: 0.34 },
    cameraSide: 'right',
    rotation: 0,
  },
  {
    id: 'lab-005',
    slug: 'kata',
    code: '005',
    pos: [0.42, 0, -0.38],
    size: { w: 0.36, d: 0.3, h: 0.34 },
    cameraSide: 'left',
    rotation: 0,
  },
]

/** 99F — library back-left corner, archive back-right corner */
export const VAULT_CHUNKS: Record<LibraryRoomSlug, ExhibitChunk> = {
  library: {
    id: 'vault-lib',
    slug: 'library',
    pos: [-0.52, 0, -0.46],
    size: { w: 0.52, d: 0.42, h: 0.4 },
    cameraSide: 'right',
    rotation: 0,
  },
  archive: {
    id: 'vault-arc',
    slug: 'archive',
    pos: [0.52, 0, -0.46],
    size: { w: 0.5, d: 0.4, h: 0.38 },
    cameraSide: 'left',
    rotation: 0,
  },
}

export function chunkPosition(chunk: ExhibitChunk): [number, number, number] {
  return chunk.pos
}

/** Station footprint center — not label height */
export function chunkBaseLookAt(chunk: ExhibitChunk): number {
  return chunk.lookAtY ?? 0.04
}

/** @deprecated Use chunkBaseLookAt */
export function chunkLookAtY(chunk: ExhibitChunk): number {
  return chunkBaseLookAt(chunk)
}

export function labChunk(slug: string): ExhibitChunk | undefined {
  return LAB_CHUNKS.find((c) => c.slug === slug)
}

export function vaultChunk(slug: LibraryRoomSlug): ExhibitChunk {
  return VAULT_CHUNKS[slug]
}

/** Corner anchor for vault room focus (library = back-left, archive = back-right) */
export function vaultCornerAnchor(
  slug: LibraryRoomSlug,
  interior: { w: number; d: number },
  scale: number,
) {
  const halfW = ((6 * 0.1 * scale) / 2) * 0.98
  const halfD = ((5 * 0.1 * scale) / 2) * 0.98
  const x = slug === 'library' ? -interior.w / 2 + halfW + 0.03 : interior.w / 2 - halfW - 0.03
  const z = -interior.d / 2 + halfD + 0.03
  return [x, 0.04, z] as const
}
