export const DUR = {
  ink: 0.8,
  extrude: 1.6,
  civic: 0.95,
  threshold: 1.35,
  roofAscent: 1.65,
  assemble: 0.55,
  pan: 0.75,
  room: 1.05,
  focus: 0.85,
} as const

export const EASE_SITE = 'power2.inOut'
export const EASE_INK = 'power1.inOut'

/** Tower dimensions (meters) */
export const TOWER = {
  width: 3.2,
  depth: 2.4,
  floorHeight: 1.2,
  roofHeight: 0.6,
  groundY: 0,
} as const
