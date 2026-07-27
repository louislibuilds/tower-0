/** Blueprint grid → Three.js station coords (see internal-docs/TYPOLOGY-SKETCHES.md) */

export const BP_UNIT = 0.1

export interface BpBox {
  position: [number, number, number]
  size: [number, number, number]
}

/** Grid floor cell (x,y) + height z → centered Three.js box */
export function bpBox(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  roomW = 5,
  roomD = 5,
): BpBox {
  const u = BP_UNIT
  return {
    position: [(x + w / 2 - roomW / 2) * u, (z + h / 2) * u, (y + d / 2 - roomD / 2) * u],
    size: [w * u, h * u, d * u],
  }
}

/** Line segment endpoints in station space */
export function bpLine(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  roomW = 5,
  roomD = 5,
): [[number, number, number], [number, number, number]] {
  const u = BP_UNIT
  const to = (x: number, y: number, z: number): [number, number, number] => [
    (x - roomW / 2) * u,
    z * u,
    (y - roomD / 2) * u,
  ]
  return [to(x1, y1, z1), to(x2, y2, z2)]
}
