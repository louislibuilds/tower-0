import { semesters } from '../data/academic'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

/** Four parallel production lines (Z offsets on 23F floor plate) */
export const FACTORY_LINE_Z = [-0.4, -0.13, 0.14, 0.41] as const

export const FACTORY_STOPS = [...FACTORY_LINE_Z]

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}

/** Per-line layout variation (crate positions along belt X, belt segment count) */
export interface FactoryLineVariant {
  crates: number[]
  beltSegments: number
  tools: [number, number, number][]
}

export const FACTORY_LINE_VARIANTS: FactoryLineVariant[] = [
  { crates: [2.2, 6.8], beltSegments: 10, tools: [[7.4, 0.15, 0], [0.35, 0.15, 0]] },
  { crates: [1.5, 4.2, 7.8], beltSegments: 9, tools: [[8.1, 0.15, 0.12], [0.55, 0.15, -0.08]] },
  { crates: [3.1, 5.6], beltSegments: 11, tools: [[7.0, 0.15, 0.05], [0.2, 0.15, 0.1], [8.5, 0.15, -0.05]] },
  { crates: [2.8, 4.9, 7.2], beltSegments: 10, tools: [[6.8, 0.15, 0], [0.45, 0.15, 0.08]] },
]

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
