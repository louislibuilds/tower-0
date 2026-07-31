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

/** Placeholders — add real entries in content/data/credentials.ts + matching keys in content/i18n/copy.ts. */
export const credentials: Credential[] = [
  {
    slug: 'degree',
    year: 2026,
    title: 'Your Degree',
    issuer: 'Your University',
    detail: 'Program code · credit points · optional WAM/GPA (only if you want them public)',
    body: 'Graduation summary — 2–3 sentences on themes, highlights, skills gained. Keep detailed marks private in content/ if preferred.',
  },
  {
    slug: 'certificate-a',
    year: 2026,
    title: 'Your Certificate or Honor',
    issuer: 'Issuing body',
    detail: 'Short label · year',
    body: 'Describe what this credential represents. Do not commit document scans to the public repo — use content/assets/factory/ in your private deploy.',
    bullets: ['Optional bullet for multi-line roles or achievements.'],
  },
  {
    slug: 'certificate-b',
    year: 2026,
    title: 'Another Certificate (optional)',
    issuer: 'Organization',
    detail: 'e.g. leadership · service · competition',
    body: 'Add or remove credential objects to match your Archive vault.',
  },
]
