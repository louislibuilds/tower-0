import { semesters } from '../data/academic'
import { bpPoint } from './typologies/blueprintLayout'
import { blueprintFitScale, floorPlateSize } from './typologies/interiorScale'

/** Factory areas — Area 01 = oldest semester (2024 Spring) → Area 04 = newest */
export const FACTORY_AREAS = [...semesters].reverse()

/** Factory line blueprint grid (11×4 room, four semester stops) */
export const FACTORY_BLUEPRINT = { w: 11, d: 4 } as const
export const FACTORY_STATION_GRID_X = [0.3, 2.9, 5.5, 8.1] as const
export const FACTORY_CRATE_COUNTS = [2, 4, 6, 9] as const

/** Conveyor roller top — crate bottoms sit here (scene units) */
export const FACTORY_BELT_TOP = 0.022

export function factoryPlateScale() {
  const plate = floorPlateSize('23')
  return blueprintFitScale(FACTORY_BLUEPRINT.w, FACTORY_BLUEPRINT.d, plate, 0.85)
}

/** Station center X on the floor plate (for camera pan) */
export function factoryStationSceneX(index: number): number {
  const sx = FACTORY_STATION_GRID_X[index] ?? FACTORY_STATION_GRID_X[0]
  const scale = factoryPlateScale()
  return bpPoint(sx + 0.75, 2.0, 0, FACTORY_BLUEPRINT.w, FACTORY_BLUEPRINT.d)[0] * scale
}

/** Four timeline stations left→right on 23F plate (2024 Spring first) */
export const FACTORY_LINE_X = FACTORY_STATION_GRID_X.map((_, i) => factoryStationSceneX(i))

export const FACTORY_STOPS = [...FACTORY_LINE_X]

/** End-of-line completion plaque — blueprint x after Area 04 */
export const FACTORY_COMPLETION_BP_X = 10.15

export function areaLabel(index: number) {
  return `Area ${String(index + 1).padStart(2, '0')}`
}

/** Shared timeline datum height in blueprint z (FactoryTimelineRail) */
export const FACTORY_TIMELINE_BP_Z = 3.8

export function semesterTimelineLabel(index: number) {
  const sem = FACTORY_AREAS[index]
  if (!sem) return ''
  const abbr = sem.session === 'Spring' ? 'SPR' : 'AUT'
  return `${sem.year} ${abbr}`
}

export type FactoryCrateVariant = 'plain' | 'tape' | 'label' | 'both'

/** One crate in a pile — station-local coords on the conveyor belt */
export interface FactoryCrate {
  /** Lateral offset on belt */
  x: number
  /** Center Y (computed from belt + stack) */
  y: number
  /** Depth offset along belt */
  z: number
  w: number
  h: number
  d: number
  rotY?: number
  variant?: FactoryCrateVariant
  /** Cardboard tone multiplier (0.88–1.08) */
  tone?: number
}

/** Hand-tuned piles on the belt — x/z offsets only; y from stack builder */
const CRATE_PILE_PRESETS: Record<number, Omit<FactoryCrate, 'y'>[]> = {
  2: [
    { x: -0.032, z: -0.012, w: 0.058, h: 0.05, d: 0.052, rotY: 0.11, variant: 'tape', tone: 0.94 },
    { x: 0.028, z: 0.018, w: 0.048, h: 0.062, d: 0.044, rotY: -0.14, variant: 'label', tone: 1.02 },
  ],
  4: [
    { x: -0.042, z: -0.018, w: 0.055, h: 0.048, d: 0.05, rotY: 0.06, variant: 'plain', tone: 0.96 },
    { x: 0.014, z: 0.008, w: 0.062, h: 0.054, d: 0.056, rotY: -0.08, variant: 'both', tone: 1.0 },
    { x: -0.018, z: 0.022, w: 0.05, h: 0.046, d: 0.048, rotY: 0.18, variant: 'tape', tone: 0.92 },
    { x: 0.038, z: -0.008, w: 0.054, h: 0.058, d: 0.05, rotY: -0.05, variant: 'label', tone: 1.05 },
  ],
  6: [
    { x: -0.048, z: -0.02, w: 0.052, h: 0.046, d: 0.048, rotY: 0.04, variant: 'plain', tone: 0.95 },
    { x: 0.0, z: 0.01, w: 0.06, h: 0.05, d: 0.054, rotY: -0.1, variant: 'tape', tone: 1.0 },
    { x: 0.042, z: -0.015, w: 0.054, h: 0.052, d: 0.046, rotY: 0.12, variant: 'label', tone: 0.98 },
    { x: -0.024, z: 0.024, w: 0.056, h: 0.048, d: 0.05, rotY: -0.06, variant: 'both', tone: 0.93 },
    { x: 0.02, z: -0.022, w: 0.048, h: 0.044, d: 0.042, rotY: 0.15, variant: 'tape', tone: 1.04 },
    { x: 0.05, z: 0.018, w: 0.05, h: 0.05, d: 0.048, rotY: -0.12, variant: 'plain', tone: 0.97 },
  ],
  9: [
    { x: -0.05, z: -0.022, w: 0.05, h: 0.044, d: 0.046, rotY: 0.05, variant: 'plain', tone: 0.94 },
    { x: -0.008, z: 0.012, w: 0.056, h: 0.048, d: 0.052, rotY: -0.07, variant: 'tape', tone: 1.0 },
    { x: 0.034, z: -0.018, w: 0.054, h: 0.046, d: 0.048, rotY: 0.1, variant: 'label', tone: 0.96 },
    { x: 0.054, z: 0.008, w: 0.046, h: 0.042, d: 0.044, rotY: -0.14, variant: 'plain', tone: 1.03 },
    { x: -0.034, z: 0.02, w: 0.052, h: 0.046, d: 0.05, rotY: 0.08, variant: 'both', tone: 0.98 },
    { x: 0.008, z: -0.024, w: 0.058, h: 0.05, d: 0.052, rotY: -0.05, variant: 'tape', tone: 0.92 },
    { x: 0.044, z: 0.016, w: 0.048, h: 0.044, d: 0.046, rotY: 0.16, variant: 'label', tone: 1.05 },
    { x: -0.012, z: -0.01, w: 0.05, h: 0.042, d: 0.048, rotY: -0.09, variant: 'tape', tone: 0.97 },
    { x: 0.028, z: 0.026, w: 0.054, h: 0.048, d: 0.05, rotY: 0.11, variant: 'both', tone: 1.01 },
  ],
}

function buildCrateStack(count: number): FactoryCrate[] {
  const preset = CRATE_PILE_PRESETS[count] ?? CRATE_PILE_PRESETS[9]
  const columnTops = [FACTORY_BELT_TOP, FACTORY_BELT_TOP, FACTORY_BELT_TOP]

  return preset.map((crate, i) => {
    const col = i % 3
    const bottom = columnTops[col]
    const y = bottom + crate.h / 2
    columnTops[col] = bottom + crate.h
    return { ...crate, y }
  })
}

export const FACTORY_CRATE_STACKS: FactoryCrate[][] = FACTORY_CRATE_COUNTS.map(buildCrateStack)
