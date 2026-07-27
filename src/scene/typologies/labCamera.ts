/** Lab station layout anchors — camera presets live in camera/stationPresets.ts */

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
  pos: [number, number, number]
  lookAtY: number
}

function toAnchor(chunk: ExhibitChunk): LabStationAnchor {
  return {
    slug: chunk.slug,
    code: chunk.code ?? '',
    pos: chunkPosition(chunk),
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
