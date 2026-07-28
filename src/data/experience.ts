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
    title: 'Founder · Developer · Creator',
    location: 'Sydney, NSW',
    start: 'Jun 2026',
    end: 'Present',
    current: true,
    bullets: [
      'Independent practice under bubblechickenlab — products, portfolios, and tools where software meets storytelling and craft.',
      'Full-stack ownership from idea to ship: design, engineering, deployment, and the narrative around what gets published.',
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
