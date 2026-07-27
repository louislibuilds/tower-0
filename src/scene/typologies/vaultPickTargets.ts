import { bpBox, type BpBox } from './blueprintLayout'

const ROOM_W = 6
const ROOM_D = 5

/** One book per shelf column — full stack volume (LibraryStackLayout SHELVES) */
const LIBRARY_SHELF_X = [0.2, 1.4, 2.6, 3.8] as const

export function libraryBookPickBox(index: number): BpBox {
  const shelfX = LIBRARY_SHELF_X[index] ?? LIBRARY_SHELF_X[0]
  return bpBox(shelfX, 0.15, 0, 0.9, 0.4, 2.4, ROOM_W, ROOM_D)
}

/** Archive cabinets — same grid as ArchiveVaultLayout */
const ARCHIVE_CABINETS: [number, number][] = [
  [0.2, 0.2],
  [1.3, 0.2],
  [2.4, 0.2],
  [3.5, 0.2],
  [4.6, 0.2],
  [0.2, 1.5],
  [1.3, 1.5],
  [2.4, 1.5],
  [3.5, 1.5],
]

/** Full cabinet volume — orbit-safe from any camera angle */
export function archiveCredentialPickBox(index: number): BpBox {
  const [gx, gy] = ARCHIVE_CABINETS[index] ?? ARCHIVE_CABINETS[0]
  return bpBox(gx, gy, 0, 0.85, 0.55, 1.85, ROOM_W, ROOM_D)
}
