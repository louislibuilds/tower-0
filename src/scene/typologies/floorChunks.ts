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
  /** Camera look-at height; defaults to station footprint center */
  lookAtY?: number
}

export function floorInterior(floorId: FloorId) {
  const band = getProgramFloor(floorId)
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export const MIN_CHUNK = { w: 0.42, d: 0.38, h: 0.48 } as const

/** 52F — five station anchors on a single flat floor slab */
export const LAB_CHUNKS: ExhibitChunk[] = [
  {
    id: 'lab-001',
    slug: 'unihack-2026',
    code: '001',
    pos: [0, 0, 0.38],
    size: { w: 0.52, d: 0.48, h: 0.55 },
    cameraSide: 'right',
  },
  {
    id: 'lab-002',
    slug: 'cloud-computing',
    code: '002',
    pos: [0.48, 0, 0.06],
    size: { w: 0.46, d: 0.44, h: 0.52 },
    cameraSide: 'left',
  },
  {
    id: 'lab-003',
    slug: 'nlp',
    code: '003',
    pos: [-0.58, 0, -0.24],
    size: { w: 0.5, d: 0.46, h: 0.58 },
    cameraSide: 'right',
  },
  {
    id: 'lab-004',
    slug: 'dl',
    code: '004',
    pos: [0.55, 0, -0.2],
    size: { w: 0.52, d: 0.48, h: 0.56 },
    cameraSide: 'left',
  },
  {
    id: 'lab-005',
    slug: 'kata',
    code: '005',
    pos: [-0.22, 0, -0.02],
    size: { w: 0.44, d: 0.4, h: 0.5 },
    cameraSide: 'right',
  },
]

export const VAULT_CHUNKS: Record<LibraryRoomSlug, ExhibitChunk> = {
  library: {
    id: 'vault-lib',
    slug: 'library',
    pos: [-0.42, 0, 0.14],
    size: { w: 0.74, d: 0.56, h: 0.62 },
    cameraSide: 'left',
  },
  archive: {
    id: 'vault-arc',
    slug: 'archive',
    pos: [0.46, 0, -0.12],
    size: { w: 0.7, d: 0.52, h: 0.58 },
    cameraSide: 'right',
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
