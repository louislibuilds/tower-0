import { semesters } from '../data/academic'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

export const FACTORY_STOPS = FACTORY_AREAS.map((_, i, arr) => {
  const span = 1.35
  const n = arr.length
  if (n <= 1) return 0
  return -span / 2 + (span * i) / (n - 1)
})

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}
