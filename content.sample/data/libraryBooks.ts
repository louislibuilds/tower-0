import { profile } from './profile'

export interface LibraryBook {
  slug: string
  title: string
  url: string
}

/** Slugs must match publications keys in content/i18n/copy.ts. Roof/B10 use profile.links. */
export const libraryBooks: LibraryBook[] = [
  { slug: 'portfolio', title: 'Portfolio', url: profile.links.portfolio },
  { slug: 'github', title: 'GitHub', url: profile.links.github },
  { slug: 'linkedin', title: 'LinkedIn', url: profile.links.linkedin },
]
