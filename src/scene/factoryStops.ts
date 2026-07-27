import { semesters } from '../data/academic'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

/** Four timeline stations left→right on 23F plate space (2024 Spring at index 0) */
export const FACTORY_LINE_X = [-0.45, -0.15, 0.15, 0.45] as const

/** @deprecated Use FACTORY_LINE_X */
export const FACTORY_LINE_Z = FACTORY_LINE_X

export const FACTORY_STOPS = [...FACTORY_LINE_X]

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}

/** Per-line layout — crate count grows with semester index */
export interface FactoryLineVariant {
  crates: number[]
  beltSegments: number
  tools: [number, number, number][]
}

const CRATE_SETS: number[][] = [
  [2.8],
  [1.8, 3.6],
  [1.2, 2.8, 4.0],
  [0.8, 2.0, 3.2, 4.2],
]

export const FACTORY_LINE_VARIANTS: FactoryLineVariant[] = CRATE_SETS.map((crates, i) => ({
  crates,
  beltSegments: 8 + i,
  tools: i === 0 ? [[7.4, 0.15, 0]] : i === 1 ? [[8.0, 0.15, 0.08], [0.4, 0.15, 0]] : i === 2 ? [[7.2, 0.15, 0.05], [0.25, 0.15, 0.1]] : [[6.8, 0.15, 0], [0.45, 0.15, 0.08], [8.2, 0.15, -0.05]],
}))

/** Semester highlight card — project + key takeaway (resume2 timeline style) */
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
