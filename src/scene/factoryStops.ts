import { semesters } from '../data/academic'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

/** Four parallel production lines (Z offsets on 23F floor plate) */
export const FACTORY_LINE_Z = [-0.4, -0.13, 0.14, 0.41] as const

export const FACTORY_STOPS = [...FACTORY_LINE_Z]

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}
