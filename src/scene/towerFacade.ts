import type { FloorId } from '../building/program'
import type { ProgramFloor } from './towerGeometry'
import { EXHIBIT_FLOOR_SPAN, FLOOR_UNIT, visualBandHeight, windowRowsFromBandHeight } from './towerGeometry'

/** Curtain wall width as fraction of band width */
export const FACADE_WIDTH_RATIO = 0.88

/** Side-face curtain width as fraction of band depth */
export const FACADE_SIDE_WIDTH_RATIO = 0.85

/** Vertical fill of band used for window grid */
export const FACADE_HEIGHT_RATIO = 0.72

/** Window pane height as fraction of cell (short curtain-wall look) */
export const WINDOW_PANE_FLOOR_RATIO = 0.42

export function exhibitFloorSpan(id: FloorId): number {
  return EXHIBIT_FLOOR_SPAN[id] ?? 1
}

/** Rows = band visual height ÷ one floor slice — matches original ~10–15 storey read */
export function facadeWindowRows(program: ProgramFloor): number {
  const curtainH = visualBandHeight(program) * FACADE_HEIGHT_RATIO
  return windowRowsFromBandHeight(curtainH)
}

export function facadeWindowCols(program: ProgramFloor, face: 'front' | 'side'): number {
  if (face === 'side') return 3
  if (program.id === 'B10' || program.id === 'B2') return 4
  if (program.id === 'roof') return 3
  return 5
}

/** Lobby transom rows from actual transom zone height */
export function lobbyTransomRows(transomHeight: number): number {
  return Math.max(3, Math.round((transomHeight * 0.94) / FLOOR_UNIT))
}

/** How often to draw floor lines on long shaft segments */
export function shaftFloorLineStep(floorCount: number): number {
  if (floorCount <= 6) return 1
  if (floorCount <= 16) return 2
  return Math.ceil(floorCount / 8)
}
