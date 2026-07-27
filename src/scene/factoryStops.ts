import { semesters } from '../data/academic'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

/** Four timeline stations left→right on 23F plate (2024 Spring first) */
export const FACTORY_LINE_X = [-0.54, -0.18, 0.18, 0.54] as const

/** @deprecated Use FACTORY_LINE_X */
export const FACTORY_LINE_Z = FACTORY_LINE_X

export const FACTORY_STOPS = [...FACTORY_LINE_X]

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}

/** One crate in a pile — sizes in scene units, stacked on Y */
export interface FactoryCrate {
  x: number
  y: number
  z: number
  w: number
  h: number
  d: number
}

/** Varied crate piles — counts differ per semester, not 1→2→3→4 */
export const FACTORY_CRATE_STACKS: FactoryCrate[][] = [
  [
    { x: 0.06, y: 0.06, z: 0.04, w: 0.065, h: 0.075, d: 0.055 },
    { x: 0.02, y: 0.13, z: 0.03, w: 0.05, h: 0.06, d: 0.045 },
  ],
  [{ x: 0.05, y: 0.06, z: 0.04, w: 0.08, h: 0.09, d: 0.065 }],
  [
    { x: 0.04, y: 0.06, z: 0.035, w: 0.055, h: 0.065, d: 0.05 },
    { x: 0.07, y: 0.12, z: 0.045, w: 0.06, h: 0.07, d: 0.052 },
    { x: 0.03, y: 0.185, z: 0.038, w: 0.045, h: 0.055, d: 0.04 },
  ],
  [
    { x: 0.055, y: 0.06, z: 0.04, w: 0.07, h: 0.06, d: 0.05 },
    { x: 0.025, y: 0.115, z: 0.035, w: 0.055, h: 0.075, d: 0.048 },
  ],
]

/** Semester highlight — detail panel copy (not shown in 3D callouts) */
export interface FactoryHighlight {
  project: string
  takeaway: string
}

export const FACTORY_HIGHLIGHTS: FactoryHighlight[] = [
  { project: 'Enterprise IS · Database', takeaway: 'Full-stack foundations' },
  { project: 'Cloud SaaS · Data Analytics', takeaway: 'MERN + AWS pipeline' },
  { project: 'Cyber · Unix · Cloud Infra', takeaway: 'Systems & security depth' },
  { project: 'DL · NLP · Industry Project', takeaway: 'AI pipelines to production' },
]

export function factoryHighlight(index: number): FactoryHighlight {
  return FACTORY_HIGHLIGHTS[index] ?? FACTORY_HIGHLIGHTS[0]
}
