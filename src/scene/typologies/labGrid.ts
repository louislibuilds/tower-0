/** 52F lab grid geometry — up to 8 suites; slugs come from content/data/labs.ts */
export type LabGridSlot = {
  pos: [number, number, number]
  size: { w: number; d: number; h: number }
  cameraSide: 'left' | 'right'
  rotation?: number
  lookAtY?: number
  calloutOffset?: [number, number, number]
}

export const LAB_GRID_SLOTS: LabGridSlot[] = [
  {
    pos: [-0.2, 0, -0.45],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'left',
    calloutOffset: [0, 0.34, 0.06],
  },
  {
    pos: [-0.6, 0, 0.4],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'right',
    calloutOffset: [-0.48, 0.3, 0.28],
  },
  {
    pos: [0.6, 0, -0.45],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'left',
    calloutOffset: [0.48, 0.34, -0.28],
  },
  {
    pos: [-0.6, 0, -0.45],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'right',
    calloutOffset: [-0.48, 0.34, -0.28],
  },
  {
    pos: [0.6, 0, 0.4],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'left',
    calloutOffset: [0.48, 0.3, 0.28],
  },
  {
    pos: [-0.2, 0, 0.4],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'right',
    calloutOffset: [0, 0.3, 0.28],
  },
  {
    pos: [0.2, 0, -0.45],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'left',
    calloutOffset: [0.2, 0.34, -0.2],
  },
  {
    pos: [0.2, 0, 0.4],
    size: { w: 0.46, d: 0.4, h: 0.36 },
    cameraSide: 'right',
    calloutOffset: [0.2, 0.3, 0.28],
  },
]
