export type FloorId = 'B10' | 'B2' | 'G' | '23' | '52' | '99' | 'roof'

export interface FloorDef {
  id: FloorId
  label: string
  code: string
  zone: 'basement' | 'ground' | 'tower' | 'roof'
  title: string
  subtitle: string
  /** 0 = lowest (B10), 6 = highest (roof) — for elevator animation */
  elevation: number
  /** 3D scene Y center (meters) */
  yCenter: number
}

export const FLOORS: FloorDef[] = [
  {
    id: 'B10',
    label: 'B10',
    code: 'B10',
    zone: 'basement',
    title: 'Tech Centre',
    subtitle: 'GitHub · Print Résumé',
    elevation: 0,
    yCenter: -3.2,
  },
  {
    id: 'B2',
    label: 'B2',
    code: 'B2',
    zone: 'basement',
    title: 'Infrastructure',
    subtitle: 'Skills · Courses · Project Links',
    elevation: 1,
    yCenter: -1.8,
  },
  {
    id: 'G',
    label: 'G',
    code: 'G',
    zone: 'ground',
    title: 'Lobby',
    subtitle: 'Welcome · About · Thesis',
    elevation: 2,
    yCenter: 0.6,
  },
  {
    id: '23',
    label: '23',
    code: '23',
    zone: 'tower',
    title: 'Warehouse',
    subtitle: 'Academic Timeline · Semester Grades',
    elevation: 3,
    yCenter: 1.9,
  },
  {
    id: '52',
    label: '52',
    code: '52',
    zone: 'tower',
    title: 'Laboratory',
    subtitle: 'Group Projects · Research',
    elevation: 4,
    yCenter: 3.2,
  },
  {
    id: '99',
    label: '99',
    code: '99',
    zone: 'tower',
    title: 'Library & Archive',
    subtitle: 'Awards · Credentials · Leadership',
    elevation: 5,
    yCenter: 4.5,
  },
  {
    id: 'roof',
    label: 'R',
    code: 'roof',
    zone: 'roof',
    title: 'Roof',
    subtitle: 'Contact · Identity Plate',
    elevation: 6,
    yCenter: 5.8,
  },
]

export const DEFAULT_FLOOR: FloorId = 'G'

export function getFloor(id: FloorId): FloorDef {
  return FLOORS.find((f) => f.id === id) ?? FLOORS[2]
}

export function parseFloorFromHash(hash: string): FloorId {
  const match = hash.match(/^#\/([^/?#]+)/)
  if (!match) return DEFAULT_FLOOR
  const slug = match[1].toLowerCase()
  const found = FLOORS.find((f) => f.id.toLowerCase() === slug || f.code.toLowerCase() === slug)
  return found?.id ?? DEFAULT_FLOOR
}

export function floorHash(id: FloorId): string {
  return `#/${id}`
}
