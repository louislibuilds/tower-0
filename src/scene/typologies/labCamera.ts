/** Lab station camera anchors — no React/Three imports (safe for presets.ts) */

export interface LabStationAnchor {
  slug: string
  code: string
  /** Position inside 52F interior (local space) */
  pos: [number, number, number]
  cameraSide: 'left' | 'right'
  /** Ortho zoom — higher = tighter framing on typology */
  zoom: number
  /** World-space lookAt lift above floor center (typology heart) */
  lookAtY: number
}

/** Phase G — extreme close framing (resume2-style part hero shot) */
export const LAB_STATIONS: LabStationAnchor[] = [
  { slug: 'unihack-2026', code: '001', pos: [0, 0, 0.28], cameraSide: 'right', zoom: 468, lookAtY: 0.14 },
  { slug: 'cloud-computing', code: '002', pos: [0, 0, -0.3], cameraSide: 'left', zoom: 452, lookAtY: 0.13 },
  { slug: 'nlp', code: '003', pos: [-0.36, 0, 0.02], cameraSide: 'right', zoom: 475, lookAtY: 0.15 },
  { slug: 'dl', code: '004', pos: [0.36, 0, 0.02], cameraSide: 'left', zoom: 485, lookAtY: 0.16 },
  { slug: 'kata', code: '005', pos: [0.18, 0, -0.18], cameraSide: 'right', zoom: 458, lookAtY: 0.13 },
]

/** 52F floor overview — still see scatter but closer than tower */
export const LAB_FLOOR_OVERVIEW_ZOOM = 198

export const LAB_CAMERA_TARGETS: Record<string, [number, number, number]> = Object.fromEntries(
  LAB_STATIONS.map(({ slug, pos }) => [slug, pos]),
)

export function labStation(slug: string): LabStationAnchor | undefined {
  return LAB_STATIONS.find((s) => s.slug === slug)
}
