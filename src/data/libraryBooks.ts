import { profile } from './profile'

export interface LibraryBook {
  slug: string
  title: string
  url: string
}

export const libraryBooks: LibraryBook[] = [
  { slug: 'nagi', title: 'NAGI · Portfolio', url: 'https://www.bubblechickenlab.com/about' },
  { slug: 'kata', title: 'KATA · Résumé & Tracker', url: profile.links.kata },
  { slug: 'github', title: 'GitHub · louislibuilds', url: profile.links.github },
  { slug: 'linkedin', title: 'LinkedIn', url: profile.links.linkedin },
]
