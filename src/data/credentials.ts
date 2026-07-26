export interface Credential {
  year: number
  title: string
  issuer: string
  detail?: string
}

export const credentials: Credential[] = [
  {
    year: 2026,
    title: "Dean's List",
    issuer: 'UTS Faculty of Engineering & IT',
    detail: 'Outstanding academic achievement',
  },
  {
    year: 2026,
    title: 'Master of Information Technology',
    issuer: 'University of Technology Sydney',
    detail: 'C04295 · 96 CP · WAM 86.9 · Passed',
  },
  {
    year: 2026,
    title: 'TechFest AI Showcase Nominee',
    issuer: 'UTS · Dr. Nabin Sharma',
    detail: 'VTuber Motion Pipeline (Deep Learning project)',
  },
  {
    year: 2025,
    title: 'UTS Taiwan Student Association — Co-founder',
    issuer: 'UTS TSA',
    detail: 'Founded association; 1,000+ followers',
  },
  {
    year: 2025,
    title: 'Vice President & Secretary',
    issuer: 'UTS TSA',
    detail: 'Event delivery · volunteer coordination · Jun 2025 – Jun 2026',
  },
  {
    year: 2026,
    title: 'Consultant',
    issuer: 'UTS TSA',
    detail: 'Advisory role for association operations',
  },
  {
    year: 2026,
    title: 'ACF Mentoring Program',
    issuer: 'Australia Career Forum',
    detail: 'Mentee · mentor Howard C.',
  },
]
