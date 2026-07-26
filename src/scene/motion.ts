export const DUR = {
  ink: 0.8,
  extrude: 1.6,
  civic: 0.85,
  threshold: 1.25,
  roofAscent: 1.5,
  assemble: 0.55,
  pan: 0.7,
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
