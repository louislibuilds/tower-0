export interface Credential {
  slug: string
  year: number
  title: string
  issuer: string
  detail?: string
  body?: string
  bullets?: string[]
  credit?: string
}

/** Public sample — summary only; detailed honors & cert scans live in gitignored content/. */
export const credentials: Credential[] = [
  {
    slug: 'degree',
    year: 2026,
    title: 'Master of Information Technology',
    issuer: 'University of Technology Sydney',
    detail: 'Program · credit points',
    body: 'Graduation summary — replace in content/ with your public-safe version or keep private.',
  },
  {
    slug: 'award',
    year: 2026,
    title: 'Sample Honor or Award',
    issuer: 'Your Faculty or Organization',
    detail: 'Outstanding achievement · year',
    body: 'Forkers: add credentials in content/data/credentials.ts and matching keys in content/i18n/copy.ts.',
  },
]
