import type { FloorId } from '../building/program'

/** One numbered floor = 0.1 m in scene space → tower ~11 units tall (B10→101) */
export const FLOOR_UNIT = 0.1

export interface ProgramFloor {
  id: FloorId
  /** Real floor number: B10=-10, G=0, 23, 52, 99, roof=101 */
  floorNumber: number
  /** Exhibit band thickness (visual only — not FLOOR_UNIT) */
  bandHeight: number
  width: number
  depth: number
  accent: string
}

export const PROGRAM_FLOORS: ProgramFloor[] = [
  { id: 'B10', floorNumber: -10, bandHeight: 1.3, width: 2.0, depth: 1.5, accent: '#2F6BFF' },
  { id: 'B2', floorNumber: -2, bandHeight: 1.1, width: 1.9, depth: 1.4, accent: '#2F6BFF' },
  { id: 'G', floorNumber: 0, bandHeight: 1.5, width: 1.8, depth: 1.4, accent: '#2F6BFF' },
  { id: '23', floorNumber: 23, bandHeight: 1.1, width: 1.6, depth: 1.25, accent: '#2F6BFF' },
  { id: '52', floorNumber: 52, bandHeight: 1.1, width: 1.4, depth: 1.15, accent: '#2F6BFF' },
  { id: '99', floorNumber: 99, bandHeight: 1.1, width: 1.2, depth: 1.05, accent: '#2F6BFF' },
  { id: 'roof', floorNumber: 101, bandHeight: 0.9, width: 1.0, depth: 1.0, accent: '#2F6BFF' },
]

export const SPIRE_HEIGHT = 1.8

export function floorToY(n: number): number {
  return n * FLOOR_UNIT
}

export function programBaseY(p: ProgramFloor): number {
  return floorToY(p.floorNumber)
}

export function programCenterY(p: ProgramFloor): number {
  return programBaseY(p) + p.bandHeight / 2
}

export function getProgramFloor(id: FloorId): ProgramFloor {
  return PROGRAM_FLOORS.find((p) => p.id === id) ?? PROGRAM_FLOORS[2]
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
  const sorted = [...PROGRAM_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber)
  const segments: ShaftSegment[] = []

  for (let i = 0; i < sorted.length - 1; i++) {
    const lower = sorted[i]
    const upper = sorted[i + 1]
    const yBottom = programBaseY(lower) + lower.bandHeight
    const yTop = programBaseY(upper)
    const height = yTop - yBottom
    if (height <= 0.01) continue

    const width = (lower.width + upper.width) / 2
    const depth = (lower.depth + upper.depth) / 2
    const floorCount = upper.floorNumber - lower.floorNumber - 1

    segments.push({ yBottom, yTop, height, width, depth, floorCount })
  }

  return segments
}

export function towerTotalHeight(): number {
  const roof = PROGRAM_FLOORS.find((p) => p.id === 'roof')!
  return programBaseY(roof) + roof.bandHeight + SPIRE_HEIGHT
}

export function widthAtY(y: number): number {
  const sorted = [...PROGRAM_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber)
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]
    const ya = programCenterY(a)
    const yb = programCenterY(b)
    if (y >= ya && y <= yb) {
      const t = (y - ya) / (yb - ya)
      return a.width + (b.width - a.width) * t
    }
  }
  return sorted[sorted.length - 1].width
}
