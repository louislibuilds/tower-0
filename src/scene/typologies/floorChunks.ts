import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { getProgramFloor } from '../towerGeometry'
import { bandInterior } from './interiorScale'

/** Vertical tier within a multi-room floor — lower slab vs raised mezzanine */
export type ChunkTier = 'lower' | 'raised'

export interface ExhibitChunk {
  id: string
  slug: string
  code?: string
  pos: [number, number, number]
  size: { w: number; d: number; h: number }
  tier: ChunkTier
  cameraSide: 'left' | 'right'
  lookAtY?: number
}

export const RAISED_TIER_LIFT = 0.12

export function tierLift(tier: ChunkTier): number {
  return tier === 'raised' ? RAISED_TIER_LIFT : 0
}

export function floorInterior(floorId: FloorId) {
  const band = getProgramFloor(floorId)
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export const MIN_CHUNK = { w: 0.42, d: 0.38, h: 0.48 } as const

/** 52F — five authored station anchors inside enlarged band (~1.80 × 1.44 interior) */
export const LAB_CHUNKS: ExhibitChunk[] = [
  {
    id: 'lab-001',
    slug: 'unihack-2026',
    code: '001',
    pos: [0, 0, 0.38],
    size: { w: 0.52, d: 0.48, h: 0.55 },
    tier: 'lower',
    cameraSide: 'right',
  },
  {
    id: 'lab-002',
    slug: 'cloud-computing',
    code: '002',
    pos: [0.48, 0, 0.06],
    size: { w: 0.46, d: 0.44, h: 0.52 },
    tier: 'lower',
    cameraSide: 'left',
  },
  {
    id: 'lab-003',
    slug: 'nlp',
    code: '003',
    pos: [-0.58, 0, -0.24],
    size: { w: 0.5, d: 0.46, h: 0.58 },
    tier: 'raised',
    cameraSide: 'right',
  },
  {
    id: 'lab-004',
    slug: 'dl',
    code: '004',
    pos: [0.55, 0, -0.2],
    size: { w: 0.52, d: 0.48, h: 0.56 },
    tier: 'raised',
    cameraSide: 'left',
  },
  {
    id: 'lab-005',
    slug: 'kata',
    code: '005',
    pos: [-0.22, 0, -0.02],
    size: { w: 0.44, d: 0.4, h: 0.5 },
    tier: 'lower',
    cameraSide: 'right',
  },
]

export const VAULT_CHUNKS: Record<LibraryRoomSlug, ExhibitChunk> = {
  library: {
    id: 'vault-lib',
    slug: 'library',
    pos: [-0.42, 0, 0.14],
    size: { w: 0.74, d: 0.56, h: 0.62 },
    tier: 'lower',
    cameraSide: 'left',
  },
  archive: {
    id: 'vault-arc',
    slug: 'archive',
    pos: [0.46, 0, -0.12],
    size: { w: 0.7, d: 0.52, h: 0.58 },
    tier: 'raised',
    cameraSide: 'right',
  },
}

export function chunkPosition(chunk: ExhibitChunk): [number, number, number] {
  return [chunk.pos[0], tierLift(chunk.tier) + chunk.pos[1], chunk.pos[2]]
}

export function chunkLookAtY(chunk: ExhibitChunk): number {
  return chunk.lookAtY ?? 0.1 + tierLift(chunk.tier)
}

export function labChunk(slug: string): ExhibitChunk | undefined {
  return LAB_CHUNKS.find((c) => c.slug === slug)
}

export function vaultChunk(slug: LibraryRoomSlug): ExhibitChunk {
  return VAULT_CHUNKS[slug]
}
