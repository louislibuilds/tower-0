/**
 * B10 Tech Centre — hall layout (blueprint grid)
 *
 * Hall: 16 × 12 cells
 * · BACK_WALL — single WALL_SCREEN
 * · Four PODS — 4 seats + shared PRINT_BAY each
 */

export const B10_HALL_W = 16
export const B10_HALL_D = 12

export const B10_ROOM_W = B10_HALL_W
export const B10_ROOM_D = B10_HALL_D

export const B10_POD_W = 8
export const B10_POD_D = 6

export const B10_POD_ORIGINS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [8, 0],
  [0, 6],
  [8, 6],
] as const

export const B10_FLOOR_SLAB = { x: 0, y: 0, z: 0, w: B10_HALL_W, d: 0.12, h: 3.5 } as const

/** Back wall · one wide command screen */
export const B10_WALL_SCREEN = { x: 0.4, y: 0.14, z: 0.45, w: 15.2, d: 0.06, h: 2.6 } as const

export const B10_POD_CONSOLE_ANCHORS: ReadonlyArray<readonly [number, number]> = [
  [0.5, 1.5],
  [2.8, 1.5],
  [0.5, 3.8],
  [2.8, 3.8],
] as const

export const B10_POD_PRINT_BAY = { x: 5.5, y: 2.0, z: 0, w: 2.2, d: 2.5, h: 0.68 } as const

export const B10_POD_PRINT_CRATES: ReadonlyArray<readonly [number, number]> = [
  [5.6, 4.6],
  [6.5, 4.6],
  [5.6, 1.8],
  [6.5, 1.8],
] as const

export const B10_POD_PRINT_LED = { x: 6.8, y: 4.2, z: 0.62, w: 0.14, d: 0.02, h: 0.06 } as const

export const B10_CONSOLE_DESK = { dx: 0, dy: 0, z: 0, w: 1.9, d: 1.05, h: 0.62 } as const
export const B10_SEAT_MONITOR = { dx: 0.32, dy: 0.06, z: 0.62, w: 1.26, d: 0.09, h: 0.88 } as const
export const B10_CHAIR = { dx: 0.45, dy: 1.25, z: 0, w: 0.72, d: 0.72, h: 0.46 } as const

export type B10LayoutPart =
  | 'FLOOR_SLAB'
  | 'WALL_SCREEN'
  | 'CONSOLE_DESK'
  | 'SEAT_MONITOR'
  | 'CHAIR'
  | 'PRINT_BAY'
  | 'PRINT_CRATE'
  | 'PRINT_LED'
