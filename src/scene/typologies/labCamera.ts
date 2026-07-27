/** Lab station camera anchors — no React/Three imports (safe for presets.ts) */

import {
  chunkLookAtY,
  chunkPosition,
  LAB_CHUNKS,
  type ExhibitChunk,
  labChunk,
} from './floorChunks'

export interface LabStationAnchor {
  slug: string
  code: string
  /** Position inside 52F interior (local space, includes tier lift) */
  pos: [number, number, number]
  cameraSide: 'left' | 'right'
  /** L3 room entry ortho zoom */
  roomZoom: number
  /** L4 part-hero ortho zoom */
  partZoom: number
  /** World-space lookAt lift above floor center (typology heart) */
  lookAtY: number
}

export const LAB_ROOM_ZOOM = 320
export const LAB_PART_ZOOM = 460

/** 52F floor overview — scattered chunks readable at L2 */
export const LAB_FLOOR_OVERVIEW_ZOOM = 172

function toAnchor(chunk: ExhibitChunk): LabStationAnchor {
  return {
    slug: chunk.slug,
    code: chunk.code ?? '',
    pos: chunkPosition(chunk),
    cameraSide: chunk.cameraSide,
    roomZoom: chunk.roomZoom ?? LAB_ROOM_ZOOM,
    partZoom: chunk.partZoom ?? LAB_PART_ZOOM,
    lookAtY: chunkLookAtY(chunk),
  }
}

export const LAB_STATIONS: LabStationAnchor[] = LAB_CHUNKS.map(toAnchor)

export const LAB_CAMERA_TARGETS: Record<string, [number, number, number]> = Object.fromEntries(
  LAB_STATIONS.map(({ slug, pos }) => [slug, pos]),
)

export function labStation(slug: string): LabStationAnchor | undefined {
  const chunk = labChunk(slug)
  return chunk ? toAnchor(chunk) : LAB_STATIONS.find((s) => s.slug === slug)
}
