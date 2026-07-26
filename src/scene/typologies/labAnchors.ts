/** Lab station anchors — resume2-style scatter within 52F band */

export interface LabStationAnchor {
  slug: string
  code: string
  /** Position inside 52F interior (local space) */
  pos: [number, number, number]
  cameraSide: 'left' | 'right'
  zoom: number
}

export const LAB_STATIONS: LabStationAnchor[] = [
  { slug: 'unihack-2026', code: '001', pos: [0, 0, 0.28], cameraSide: 'right', zoom: 255 },
  { slug: 'cloud-computing', code: '002', pos: [0, 0, -0.3], cameraSide: 'left', zoom: 248 },
  { slug: 'nlp', code: '003', pos: [-0.36, 0, 0.02], cameraSide: 'right', zoom: 258 },
  { slug: 'dl', code: '004', pos: [0.36, 0, 0.02], cameraSide: 'left', zoom: 262 },
  { slug: 'kata', code: '005', pos: [0.18, 0, -0.18], cameraSide: 'right', zoom: 252 },
]

export const LAB_CAMERA_TARGETS: Record<string, [number, number, number]> = Object.fromEntries(
  LAB_STATIONS.map(({ slug, pos }) => [slug, pos]),
)

export function labStation(slug: string): LabStationAnchor | undefined {
  return LAB_STATIONS.find((s) => s.slug === slug)
}
