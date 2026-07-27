/** Lab station camera anchors — no React/Three imports (safe for presets.ts) */

import {
  chunkLookAtY,
  chunkPosition,
  LAB_CHUNKS,
  type ExhibitChunk,
  labChunk,
} from './floorChunks'

export interface LabCameraComposition {
  slug: string
  /** Eye offset from lookAt — resume2 L2 relationships, scaled to tower bands */
  eyeOffset: [number, number, number]
  zoom: number
}

/**
 * Per-lab ortho compositions mapped from resume2 L2 presets:
 * crowd · iotbay · farm · gundam · ephemeral → 001–005
 * @see https://resume2-ruddy.vercel.app/#/L2/crowd
 */
export const LAB_CAMERA_COMPOSITIONS: LabCameraComposition[] = [
  { slug: 'unihack-2026', eyeOffset: [1.75, 0.95, 2.85], zoom: 280 },
  { slug: 'cloud-computing', eyeOffset: [-1.75, 0.85, 2.85], zoom: 230 },
  { slug: 'nlp', eyeOffset: [2.2, 1.15, 2.75], zoom: 260 },
  { slug: 'dl', eyeOffset: [-2.2, 1.15, 2.75], zoom: 300 },
  { slug: 'kata', eyeOffset: [0.05, 0.9, 3.15], zoom: 270 },
]

export interface LabStationAnchor {
  slug: string
  code: string
  /** Position inside 52F interior (local space, includes tier lift) */
  pos: [number, number, number]
  cameraSide: 'left' | 'right'
  lookAtY: number
  zoom: number
}

/** 52F floor overview — all chunks readable before picking a station */
export const LAB_FLOOR_OVERVIEW_ZOOM = 172

function compositionFor(slug: string): LabCameraComposition {
  return (
    LAB_CAMERA_COMPOSITIONS.find((c) => c.slug === slug) ?? {
      slug,
      eyeOffset: [1.6, 0.9, 2.8],
      zoom: 270,
    }
  )
}

function toAnchor(chunk: ExhibitChunk): LabStationAnchor {
  const comp = compositionFor(chunk.slug)
  return {
    slug: chunk.slug,
    code: chunk.code ?? '',
    pos: chunkPosition(chunk),
    cameraSide: chunk.cameraSide,
    lookAtY: chunkLookAtY(chunk),
    zoom: comp.zoom,
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

/** Resume2-style composed preset for one lab station */
export function labCameraPreset(
  floorY: number,
  slug: string,
): { position: [number, number, number]; lookAt: [number, number, number]; zoom: number } {
  const station = labStation(slug)
  if (!station) {
    return {
      position: [1.6, floorY + 1.2, 3.0],
      lookAt: [0, floorY + 0.12, 0],
      zoom: LAB_FLOOR_OVERVIEW_ZOOM,
    }
  }
  const comp = compositionFor(slug)
  const lookAt: [number, number, number] = [
    station.pos[0],
    floorY + station.lookAtY,
    station.pos[2],
  ]
  const [ex, ey, ez] = comp.eyeOffset
  return {
    lookAt,
    position: [lookAt[0] + ex, lookAt[1] + ey, lookAt[2] + ez],
    zoom: comp.zoom,
  }
}
