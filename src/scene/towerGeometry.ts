import type { FloorId } from '../building/program'

/** One numbered floor = 1/111 of the tower mass (B10→101) — used for shafts & window row math */
export const FLOOR_UNIT = 0.1

/** Total numbered floors: B10…B1 (10) + G…100 (101) = 111 */
export const TOTAL_TOWER_FLOORS = 111

/**
 * Logical floors each exhibit band represents (G–6, 23–28, …).
 * Used for shaft gap math — visual height is separate (see visualHeight).
 */
export const EXHIBIT_FLOOR_SPAN: Record<FloorId, number> = {
  B10: 1,
  B2: 1,
  G: 7,
  '23': 6,
  '52': 5,
  '99': 2,
  roof: 1,
}

export interface ProgramFloor {
  id: FloorId
  /** Anchor floor number: B10=-10, G=0, 23, 52, 99, roof=101 */
  floorNumber: number
  /** Real floor span for shaft proportions */
  floorSpan: number
  /** Tower-shell band height — restored pre-scale values for comfortable room present */
  visualHeight: number
  /** Room layout height when inside a floor */
  interiorHeight: number
  width: number
  depth: number
  accent: string
}

/** Original comfortable band heights — also drive window row count via ÷ FLOOR_UNIT */
export const PROGRAM_FLOORS: ProgramFloor[] = [
  { id: 'B10', floorNumber: -10, floorSpan: 1, visualHeight: 1.3, interiorHeight: 1.3, width: 2.0, depth: 1.5, accent: '#2F6BFF' },
  { id: 'B2', floorNumber: -2, floorSpan: 1, visualHeight: 1.1, interiorHeight: 1.1, width: 1.9, depth: 1.4, accent: '#2F6BFF' },
  { id: 'G', floorNumber: 0, floorSpan: 7, visualHeight: 1.5, interiorHeight: 1.5, width: 1.8, depth: 1.4, accent: '#2F6BFF' },
  { id: '23', floorNumber: 23, floorSpan: 6, visualHeight: 1.2, interiorHeight: 1.2, width: 1.85, depth: 1.45, accent: '#2F6BFF' },
  { id: '52', floorNumber: 52, floorSpan: 5, visualHeight: 1.35, interiorHeight: 1.35, width: 2.2, depth: 1.75, accent: '#2F6BFF' },
  { id: '99', floorNumber: 99, floorSpan: 2, visualHeight: 1.25, interiorHeight: 1.25, width: 2.0, depth: 1.55, accent: '#2F6BFF' },
  { id: 'roof', floorNumber: 101, floorSpan: 1, visualHeight: 0.9, interiorHeight: 0.9, width: 1.0, depth: 1.0, accent: '#2F6BFF' },
]

export const SPIRE_HEIGHT = 1.8

const SORTED_FLOORS = [...PROGRAM_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber)

export function visualBandHeight(p: ProgramFloor): number {
  return p.visualHeight
}

export function topFloorNumber(p: ProgramFloor): number {
  return p.floorNumber + p.floorSpan - 1
}

export function floorToY(n: number): number {
  return n * FLOOR_UNIT
}

/** Empty shaft height between two consecutive program floors */
export function shaftGapHeight(lower: ProgramFloor, upper: ProgramFloor): number {
  const emptyFloors = upper.floorNumber - topFloorNumber(lower) - 1
  if (emptyFloors <= 0) return 0.03
  return emptyFloors * FLOOR_UNIT
}

export function programBaseY(p: ProgramFloor): number {
  if (p.id === 'G') return 0

  if (p.id === 'B2') {
    const g = getProgramFloor('G')
    return -(shaftGapHeight(p, g) + visualBandHeight(p))
  }

  if (p.id === 'B10') {
    const b2 = getProgramFloor('B2')
    return programBaseY(b2) - shaftGapHeight(p, b2) - visualBandHeight(p)
  }

  if (p.id === 'roof') {
    const f99 = getProgramFloor('99')
    return programBaseY(f99) + visualBandHeight(f99) + 0.06
  }

  return floorToY(p.floorNumber)
}

export function programCenterY(p: ProgramFloor): number {
  return programBaseY(p) + visualBandHeight(p) / 2
}

export function getProgramFloor(id: FloorId): ProgramFloor {
  return PROGRAM_FLOORS.find((f) => f.id === id) ?? PROGRAM_FLOORS[2]
}

export interface ShaftSegment {
  yBottom: number
  yTop: number
  height: number
  width: number
  depth: number
  floorCount: number
}

/** Shaft between consecutive program floors — the "empty" numbered floors */
export function getShaftSegments(): ShaftSegment[] {
  const segments: ShaftSegment[] = []

  for (let i = 0; i < SORTED_FLOORS.length - 1; i++) {
    const lower = SORTED_FLOORS[i]
    const upper = SORTED_FLOORS[i + 1]
    const yBottom = programBaseY(lower) + visualBandHeight(lower)
    const yTop = programBaseY(upper)
    const height = yTop - yBottom
    if (height <= 0.01) continue

    const width = (lower.width + upper.width) / 2
    const depth = (lower.depth + upper.depth) / 2
    const floorCount = upper.floorNumber - topFloorNumber(lower) - 1

    segments.push({ yBottom, yTop, height, width, depth, floorCount })
  }

  return segments
}

export function towerTotalHeight(): number {
  const roof = PROGRAM_FLOORS.find((f) => f.id === 'roof')!
  return programBaseY(roof) + visualBandHeight(roof) + SPIRE_HEIGHT
}

export function widthAtY(y: number): number {
  for (let i = 0; i < SORTED_FLOORS.length - 1; i++) {
    const a = SORTED_FLOORS[i]
    const b = SORTED_FLOORS[i + 1]
    const ya = programCenterY(a)
    const yb = programCenterY(b)
    if (y >= ya && y <= yb) {
      const t = (y - ya) / (yb - ya)
      return a.width + (b.width - a.width) * t
    }
  }
  return SORTED_FLOORS[SORTED_FLOORS.length - 1].width
}

/** Window rows ≈ how many FLOOR_UNIT slices fit in the band (≈ original pre-scale look) */
export function windowRowsFromBandHeight(bandHeight: number): number {
  return Math.max(2, Math.round(bandHeight / FLOOR_UNIT))
}
