export interface Experience {
  slug: string
  company: string
  title: string
  location: string
  start: string
  end: string
  current?: boolean
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    slug: 'uts-tsa',
    company: 'UTS Taiwan Student Association',
    title: 'Co-founder · Vice President & Secretary',
    location: 'Sydney, NSW',
    start: 'Jun 2025',
    end: 'Jun 2026',
    bullets: [
      'Built the association from zero to 1,000+ followers across platforms.',
      'Led cross-functional volunteer delivery — scope, assign, unblock, ship on deadlines.',
      'Consultant role (2026) for ongoing association operations.',
    ],
  },
  {
    slug: 'bubblechickenlab',
    company: 'bubblechickenlab',
    title: 'Full-Stack Developer & Owner',
    location: 'Sydney, NSW',
    start: '2024',
    end: 'Present',
    current: true,
    bullets: [
      'Architected 3-app platform on one domain: portfolio (nagi), résumé editor, job tracker.',
      'Operate production stack: React, Three.js, Supabase, Edge Functions, Resend, SEO prerender.',
    ],
  },
  {
    slug: 'tutor',
    company: 'Self-employed',
    title: 'Private Tutor',
    location: 'Sydney, NSW',
    start: 'Sep 2024',
    end: 'Present',
    current: true,
    bullets: ['One-on-one tutoring for university and high-school students in Sydney.'],
  },
]
