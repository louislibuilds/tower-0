import { semesters } from '../data/academic'

/** Lateral pan stops for Warehouse · 23 — one per semester plinth */
export const WAREHOUSE_STOPS = semesters.map((_, i) => {
  const span = 1.2
  const n = semesters.length
  if (n <= 1) return 0
  return -span / 2 + (span * i) / (n - 1)
})
