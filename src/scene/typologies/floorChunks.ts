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

export const MIN_CHUNK = { w: 0.28, d: 0.26, h: 0.32 } as const

/** 52F — five station anchors on a single flat floor slab */
export const LAB_CHUNKS: ExhibitChunk[] = [
  {
    id: 'lab-001',
    slug: 'unihack-2026',
    code: '001',
    pos: [0, 0, 0.32],
    size: { w: 0.34, d: 0.3, h: 0.36 },
    cameraSide: 'right',
  },
  {
    id: 'lab-002',
    slug: 'cloud-computing',
    code: '002',
    pos: [0.38, 0, 0.05],
    size: { w: 0.3, d: 0.28, h: 0.34 },
    cameraSide: 'left',
  },
  {
    id: 'lab-003',
    slug: 'nlp',
    code: '003',
    pos: [-0.46, 0, -0.2],
    size: { w: 0.32, d: 0.3, h: 0.38 },
    cameraSide: 'right',
  },
  {
    id: 'lab-004',
    slug: 'dl',
    code: '004',
    pos: [0.44, 0, -0.16],
    size: { w: 0.34, d: 0.3, h: 0.36 },
    cameraSide: 'left',
  },
  {
    id: 'lab-005',
    slug: 'kata',
    code: '005',
    pos: [-0.18, 0, -0.02],
    size: { w: 0.28, d: 0.26, h: 0.32 },
    cameraSide: 'right',
  },
]

export const VAULT_CHUNKS: Record<LibraryRoomSlug, ExhibitChunk> = {
  library: {
    id: 'vault-lib',
    slug: 'library',
    pos: [-0.34, 0, 0.12],
    size: { w: 0.48, d: 0.38, h: 0.42 },
    cameraSide: 'left',
  },
  archive: {
    id: 'vault-arc',
    slug: 'archive',
    pos: [0.38, 0, -0.1],
    size: { w: 0.46, d: 0.36, h: 0.4 },
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
