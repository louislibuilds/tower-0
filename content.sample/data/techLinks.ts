import { profile } from './profile'

export interface TechLink {
  key: 'linkedin' | 'instagram' | 'threads' | 'portfolio' | 'github'
  url: string
  desc: string
}

/** B10 Tech Centre — template author contact. Replace links in content/data/profile.ts. */
export const techCentreLinks: TechLink[] = [
  { key: 'linkedin', url: profile.links.linkedin, desc: 'louis-li-builds' },
  { key: 'instagram', url: profile.links.instagram, desc: '@bubblechickenlab' },
  { key: 'threads', url: profile.links.threads, desc: '@bubblechickenlab' },
  { key: 'portfolio', url: profile.links.portfolio, desc: 'bubblechickenlab.com/work' },
  { key: 'github', url: profile.links.github, desc: 'louislibuilds' },
]
