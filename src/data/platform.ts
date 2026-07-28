export interface PlatformApp {
  slug: string
  name: string
  path: string
  hook: string
  stack: string[]
  url: string
}

export const platformApps: PlatformApp[] = [
  {
    slug: 'nagi',
    name: 'Portfolio',
    path: '/work',
    hook: 'Self-hosted personal site — portfolio and writing in one place.',
    stack: ['React', 'Three.js', 'Supabase', 'TipTap'],
    url: 'https://www.bubblechickenlab.com/work',
  },
  {
    slug: 'kata',
    name: 'KATA',
    path: '/kata',
    hook: 'Draft résumés and track applications in one workflow — local or cloud saves, PDF export when you need it.',
    stack: ['React', 'TypeScript', 'Supabase', 'Local + Cloud'],
    url: 'https://www.bubblechickenlab.com/kata',
  },
]

export const platformSummary =
  'Shipped work on bubblechickenlab.com — portfolio and writing, KATA for the job search; repos and exports behind them.'
