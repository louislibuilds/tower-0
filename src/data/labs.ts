import type { LocaleStrings } from '../i18n/strings'
import { labProjects, type LabProject } from './projects'

export type LabResearchStatus = 'pending' | 'active' | 'completed'

export interface LabSuite {
  slug: string
  code: string
  status: LabResearchStatus
  /** Reserved suite — no project payload yet */
  empty?: boolean
}

export const LAB_SUITES: LabSuite[] = [
  { slug: 'unihack-2026', code: '001', status: 'completed' },
  { slug: 'cloud-computing', code: '002', status: 'completed' },
  { slug: 'nlp', code: '003', status: 'completed' },
  { slug: 'dl', code: '004', status: 'completed' },
  { slug: 'kata', code: '005', status: 'active' },
  { slug: 'lab-006', code: '006', status: 'pending', empty: true },
  { slug: 'lab-007', code: '007', status: 'pending', empty: true },
  { slug: 'lab-008', code: '008', status: 'pending', empty: true },
]

export function labSuite(slug: string): LabSuite | undefined {
  return LAB_SUITES.find((s) => s.slug === slug)
}

export function labProject(slug: string): LabProject | undefined {
  return labProjects.find((p) => p.slug === slug)
}

export function labCardTitle(code: string): string {
  return `Lab ${code}`
}

export function labStatusLabel(status: LabResearchStatus, l: LocaleStrings['lab']): string {
  if (status === 'pending') return l.statusPending
  if (status === 'active') return l.statusActive
  return l.statusCompleted
}

export function labResearchTitle(
  suite: LabSuite,
  strings: LocaleStrings,
): string {
  if (suite.empty) return strings.lab.emptyResearchTitle
  const loc = strings.projects[suite.slug as keyof typeof strings.projects]
  const project = labProject(suite.slug)
  return loc?.title ?? project?.title ?? suite.slug
}

export function labTagline(suite: LabSuite, strings: LocaleStrings): string {
  const status = labStatusLabel(suite.status, strings.lab)
  const title = labResearchTitle(suite, strings)
  return `${status} ‧ ${title}`
}
