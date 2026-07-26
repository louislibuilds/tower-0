/** Lab station anchors — resume2-style scatter, not a single row */

export interface LabStationAnchor {
  slug: string
  code: string
  /** Position inside 52F interior (local space) */
  pos: [number, number, number]
  /** Camera approach side when entering this station */
  cameraSide: 'left' | 'right'
  zoom: number
}

export const LAB_STATIONS: LabStationAnchor[] = [
  { slug: 'unihack-2026', code: '001', pos: [0, 0, 0.14], cameraSide: 'right', zoom: 300 },
  { slug: 'cloud-computing', code: '002', pos: [0, 0, -0.16], cameraSide: 'left', zoom: 285 },
  { slug: 'nlp', code: '003', pos: [-0.4, 0, 0], cameraSide: 'right', zoom: 295 },
  { slug: 'dl', code: '004', pos: [0.4, 0, 0], cameraSide: 'left', zoom: 305 },
  { slug: 'kata', code: '005', pos: [0.24, 0, -0.1], cameraSide: 'right', zoom: 290 },
]

export const LAB_CAMERA_TARGETS: Record<string, [number, number, number]> = Object.fromEntries(
  LAB_STATIONS.map(({ slug, pos }) => [slug, pos]),
)

export function labStation(slug: string): LabStationAnchor | undefined {
  return LAB_STATIONS.find((s) => s.slug === slug)
}
