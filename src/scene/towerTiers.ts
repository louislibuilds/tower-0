import type { FloorId } from '../building/program'

export interface TowerTier {
  floorId: FloorId
  yBase: number
  height: number
  width: number
  depth: number
  /** Neon accent for this tier */
  accent: string
}

/** Art-deco tiered cyberpunk tower — setbacks rise with elevation */
export const TOWER_TIERS: TowerTier[] = [
  { floorId: 'B10', yBase: -3.8, height: 1.35, width: 4.4, depth: 3.2, accent: '#00e5ff' },
  { floorId: 'B2', yBase: -2.45, height: 1.35, width: 4.0, depth: 3.0, accent: '#00e5ff' },
  { floorId: 'G', yBase: 0, height: 1.45, width: 3.6, depth: 2.8, accent: '#ffc400' },
  { floorId: '23', yBase: 1.45, height: 1.35, width: 3.2, depth: 2.6, accent: '#ff6b35' },
  { floorId: '52', yBase: 2.8, height: 1.35, width: 2.8, depth: 2.4, accent: '#b026ff' },
  { floorId: '99', yBase: 4.15, height: 1.35, width: 2.4, depth: 2.2, accent: '#ffc400' },
]

export const SPIRE_BASE = 5.5
export const SPIRE_HEIGHT = 2.2

export function tierCenterY(tier: TowerTier): number {
  return tier.yBase + tier.height / 2
}

export function getTier(floorId: FloorId): TowerTier | undefined {
  return TOWER_TIERS.find((t) => t.floorId === floorId)
}
