import type { LocaleStrings } from '../../src/i18n/strings'
import { labProjects, type LabProject } from './projects'

export type LabResearchStatus = 'pending' | 'active' | 'completed'

export interface LabSuite {
  slug: string
  code: string
  status: LabResearchStatus
  empty?: boolean
}

/** Minimal demo suites — expand in content/data/labs.ts. Slugs must match content/i18n/copy.ts projects keys. */
export const LAB_SUITES: LabSuite[] = [
  { slug: 'sample-project', code: '001', status: 'completed' },
  { slug: 'tower-zero', code: '007', status: 'active' },
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
