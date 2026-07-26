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
    name: 'nagi',
    path: '/',
    hook: 'Portfolio-as-architecture — this tower lives here. Trilingual UI, CMS, case studies.',
    stack: ['React', 'Three.js', 'Supabase', 'TipTap'],
    url: 'https://www.bubblechickenlab.com',
  },
  {
    slug: 'kata-editor',
    name: 'KATA Editor',
    path: '/kata/editor',
    hook: 'Craft résumé variants with live preview and PDF export — the sheet this tower prints from.',
    stack: ['React', 'TypeScript', 'PDF Export'],
    url: 'https://www.bubblechickenlab.com/kata/editor',
  },
  {
    slug: 'kata-tracker',
    name: 'KATA Tracker',
    path: '/kata/tracker',
    hook: 'Local-first job application tracker used daily during the job search.',
    stack: ['React', 'Supabase', 'Local-first'],
    url: 'https://www.bubblechickenlab.com/kata/tracker',
  },
]

export const platformSummary =
  'Full-stack engineer operating a 3-app production platform on bubblechickenlab.com — sole builder from database schema to deploy.'
