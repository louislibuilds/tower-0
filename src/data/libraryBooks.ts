import { profile } from './profile'

export interface LibraryBook {
  slug: string
  title: string
  url: string
}

export const libraryBooks: LibraryBook[] = [
  { slug: 'nagi', title: 'nagi · Portfolio', url: profile.links.nagi },
  { slug: 'kata', title: 'KATA · Résumé & Tracker', url: profile.links.kata },
  { slug: 'github', title: 'GitHub · louislibuilds', url: profile.links.github },
  { slug: 'linkedin', title: 'LinkedIn', url: profile.links.linkedin },
]
