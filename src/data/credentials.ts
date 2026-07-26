export interface Credential {
  slug: string
  year: number
  title: string
  issuer: string
  detail?: string
}

export const credentials: Credential[] = [
  {
    slug: 'deans-list',
    year: 2026,
    title: "Dean's List",
    issuer: 'UTS Faculty of Engineering & IT',
    detail: 'Outstanding academic achievement',
  },
  {
    slug: 'degree',
    year: 2026,
    title: 'Master of Information Technology',
    issuer: 'University of Technology Sydney',
    detail: 'C04295 · 96 CP · WAM 86.9 · GPA 6.5/7 · Passed',
  },
  {
    slug: 'techfest',
    year: 2026,
    title: 'TechFest AI Showcase Nominee',
    issuer: 'UTS · Dr. Nabin Sharma',
    detail: 'VTuber Motion Pipeline (Deep Learning project)',
  },
  {
    slug: 'tsa-founder',
    year: 2025,
    title: 'UTS Taiwan Student Association — Co-founder',
    issuer: 'UTS TSA',
    detail: 'Founded association; 1,000+ followers',
  },
  {
    slug: 'tsa-vp',
    year: 2025,
    title: 'Vice President & Secretary',
    issuer: 'UTS TSA',
    detail: 'Event delivery · volunteer coordination · Jun 2025 – Jun 2026',
  },
  {
    slug: 'tsa-consultant',
    year: 2026,
    title: 'Consultant',
    issuer: 'UTS TSA',
    detail: 'Advisory role for association operations',
  },
  {
    slug: 'acf',
    year: 2026,
    title: 'ACF Mentoring Program',
    issuer: 'Australia Career Forum',
    detail: 'Mentee · mentor Howard C.',
  },
]
