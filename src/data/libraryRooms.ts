export type LibraryRoomSlug = 'archive' | 'library'

export const LIBRARY_ROOMS: { slug: LibraryRoomSlug; label: string }[] = [
  { slug: 'archive', label: 'Archive' },
  { slug: 'library', label: 'Library' },
]
