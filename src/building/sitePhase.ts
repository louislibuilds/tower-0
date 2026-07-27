/** Site narrative phase — drives boot, lobby, exit choreography */
export type SitePhase =
  | 'boot'
  | 'scan'
  | 'lobby'
  | 'tower'
  | 'floor'
  | 'room'
  | 'focus'
  | 'exit'
  | 'void'

export function isInteractionLocked(phase: SitePhase): boolean {
  return phase === 'boot' || phase === 'scan' || phase === 'exit' || phase === 'void'
}

export function isBootSequence(phase: SitePhase): boolean {
  return phase === 'boot' || phase === 'scan'
}

/** Map global extrude [0–1] to per-band progress for staggered rise */
export function bandExtrudeProgress(globalExtrude: number, index: number, total: number): number {
  const span = 0.55 / Math.max(total, 1)
  const start = 0.18 + index * span * 0.85
  const end = start + span + 0.08
  if (globalExtrude <= start) return 0
  if (globalExtrude >= end) return 1
  return (globalExtrude - start) / (end - start)
}

export function shaftExtrudeProgress(globalExtrude: number): number {
  if (globalExtrude <= 0.12) return 0
  if (globalExtrude >= 0.35) return 1
  return (globalExtrude - 0.12) / 0.23
}

export function spireExtrudeProgress(globalExtrude: number): number {
  if (globalExtrude <= 0.82) return 0
  if (globalExtrude >= 0.98) return 1
  return (globalExtrude - 0.82) / 0.16
}

export function foundationExtrudeProgress(globalExtrude: number): number {
  if (globalExtrude <= 0.05) return 0
  if (globalExtrude >= 0.18) return 1
  return (globalExtrude - 0.05) / 0.13
}
