import type { FloorId } from '../building/program'

export type CoreRiserId = 'enterprise' | 'ai' | 'cloud' | 'nlp' | 'frontend'

export interface CoreRiserDef {
  id: CoreRiserId
  letter: string
  trade: string
  tools: string[]
  serves: { floor: FloorId; lab: string; tag: string }
  extra?: string
}

/** B2 mechanical core — each riser terminates in a 52F lab it serves */
export const CORE_RISERS: CoreRiserDef[] = [
  {
    id: 'enterprise',
    letter: 'A',
    trade: 'BACKEND',
    tools: ['Java', 'Node', 'SQL'],
    serves: { floor: '52', lab: 'cloud-computing', tag: 'Lab 002 · SUNishop' },
  },
  {
    id: 'ai',
    letter: 'B',
    trade: 'AI / DL / CNN',
    tools: ['PyTorch', 'MediaPipe', 'ONNX'],
    serves: { floor: '52', lab: 'dl', tag: 'Lab 004 · VTuber Mocap' },
    extra: 'CNN',
  },
  {
    id: 'cloud',
    letter: 'C',
    trade: 'CLOUD',
    tools: ['AWS', 'Docker', 'CI/CD'],
    serves: { floor: '52', lab: 'cloud-computing', tag: 'Lab 002 · SUNishop' },
  },
  {
    id: 'nlp',
    letter: 'D',
    trade: 'NLP',
    tools: ['STT', 'STAR', 'Python'],
    serves: { floor: '52', lab: 'nlp', tag: 'Lab 003 · Mock Interview' },
  },
  {
    id: 'frontend',
    letter: 'E',
    trade: 'FRONTEND',
    tools: ['React', 'Three.js', 'TS'],
    serves: { floor: '52', lab: 'unihack-2026', tag: 'Lab 001 · Unihack 2026' },
  },
]

export const RISER_GAUGE: Record<CoreRiserId, number> = {
  enterprise: 0.09,
  cloud: 0.075,
  ai: 0.07,
  nlp: 0.065,
  frontend: 0.06,
}

export function riserForLab(labSlug: string): CoreRiserDef | undefined {
  return CORE_RISERS.find((r) => r.serves.lab === labSlug)
}
