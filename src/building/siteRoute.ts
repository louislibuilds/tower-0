import type { ViewMode } from './viewMode'
import type { FloorId } from './program'
import { FLOORS, getFloor } from './program'
import { labSuite } from '../data/labs'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { FACTORY_STOPS } from '../scene/factoryStops'

/** App mount path — matches vite.config base (bubblechicken.com/towerzero/…) */
export const SITE_BASE_PATH = '/towerzero'

export type SiteLocation =
  | { kind: 'tower' }
  | { kind: 'floor'; floorId: FloorId }
  | { kind: 'room'; floorId: FloorId; room: string }
  | { kind: 'focus'; floorId: '99'; room: LibraryRoomSlug; item: string }

export interface SiteViewState {
  atTower: boolean
  floorId: FloorId | null
  viewMode: ViewMode
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  factoryStop: number | null
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
}

function normalizeBase(): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  return base || SITE_BASE_PATH
}

/** Strip vite base prefix → path segments (no leading slash) */
export function pathSegments(pathname = typeof window !== 'undefined' ? window.location.pathname : ''): string[] {
  const base = normalizeBase()
  let rest = pathname
  if (rest.startsWith(base)) {
    rest = rest.slice(base.length)
  }
  return rest.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
}

function parseFloorSlug(raw: string): FloorId | null {
  const slug = raw.toLowerCase()
  if (slug === 'r' || slug === 'roof') return 'roof'
  const found = FLOORS.find((f) => f.id.toLowerCase() === slug || f.code.toLowerCase() === slug)
  return found?.id ?? null
}

export function factoryAreaSlug(index: number): string {
  return `area-${String(index + 1).padStart(2, '0')}`
}

export function parseFactoryAreaSlug(segment: string): number | null {
  const m = segment.match(/^area-(\d{2})$/i)
  if (!m) return null
  const index = parseInt(m[1], 10) - 1
  return index >= 0 && index < FACTORY_STOPS.length ? index : null
}

function isLibraryRoom(s: string): s is LibraryRoomSlug {
  return s === 'archive' || s === 'library'
}

/** Pathname → canonical site location */
export function parseSiteLocation(pathname?: string): SiteLocation {
  const parts = pathSegments(pathname)
  if (parts.length === 0) return { kind: 'tower' }

  const floorId = parseFloorSlug(parts[0])
  if (!floorId) return { kind: 'tower' }

  if (parts.length === 1) {
    return { kind: 'floor', floorId }
  }

  const room = parts[1].toLowerCase()

  if (floorId === 'G') {
    if (room === 'lobby') return { kind: 'floor', floorId: 'G' }
    return { kind: 'floor', floorId: 'G' }
  }

  if (floorId === '99' && isLibraryRoom(room)) {
    if (parts.length >= 3) {
      return { kind: 'focus', floorId: '99', room, item: parts.slice(2).join('/') }
    }
    return { kind: 'room', floorId: '99', room }
  }

  if (floorId === '52') {
    if (labSuite(room) || room.startsWith('lab-')) {
      return { kind: 'room', floorId: '52', room }
    }
    return { kind: 'floor', floorId: '52' }
  }

  if (floorId === '23') {
    const stop = parseFactoryAreaSlug(room)
    if (stop !== null) {
      return { kind: 'room', floorId: '23', room }
    }
    return { kind: 'floor', floorId: '23' }
  }

  return { kind: 'floor', floorId }
}

export function locationToViewState(loc: SiteLocation): SiteViewState {
  if (loc.kind === 'tower') {
    return {
      atTower: true,
      floorId: null,
      viewMode: 'tower',
      labRoomSlug: null,
      libraryRoomSlug: null,
      factoryStop: null,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  if (loc.kind === 'floor') {
    return {
      atTower: false,
      floorId: loc.floorId,
      viewMode: loc.floorId === 'roof' ? 'room' : 'floor',
      labRoomSlug: null,
      libraryRoomSlug: null,
      factoryStop: null,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  if (loc.kind === 'focus') {
    return {
      atTower: false,
      floorId: '99',
      viewMode: 'focus',
      labRoomSlug: null,
      libraryRoomSlug: loc.room,
      factoryStop: null,
      selectedBookSlug: loc.room === 'library' ? loc.item : null,
      selectedCredentialSlug: loc.room === 'archive' ? loc.item : null,
    }
  }

  // room
  if (loc.floorId === '52') {
    return {
      atTower: false,
      floorId: '52',
      viewMode: 'room',
      labRoomSlug: loc.room,
      libraryRoomSlug: null,
      factoryStop: null,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  if (loc.floorId === '99') {
    const libRoom = isLibraryRoom(loc.room) ? loc.room : null
    return {
      atTower: false,
      floorId: '99',
      viewMode: libRoom ? 'room' : 'floor',
      labRoomSlug: null,
      libraryRoomSlug: libRoom,
      factoryStop: null,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  if (loc.floorId === '23') {
    const stop = parseFactoryAreaSlug(loc.room)
    return {
      atTower: false,
      floorId: '23',
      viewMode: stop !== null ? 'room' : 'floor',
      labRoomSlug: null,
      libraryRoomSlug: null,
      factoryStop: stop,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  if (loc.floorId === 'G' && loc.room === 'lobby') {
    return {
      atTower: false,
      floorId: 'G',
      viewMode: 'floor',
      labRoomSlug: null,
      libraryRoomSlug: null,
      factoryStop: null,
      selectedBookSlug: null,
      selectedCredentialSlug: null,
    }
  }

  return {
    atTower: false,
    floorId: loc.floorId,
    viewMode: 'room',
    labRoomSlug: null,
    libraryRoomSlug: null,
    factoryStop: null,
    selectedBookSlug: null,
    selectedCredentialSlug: null,
  }
}

/** Canonical location → browser pathname (includes base) */
export function buildSitePath(loc: SiteLocation): string {
  const base = normalizeBase()
  const join = (...parts: string[]) =>
    `${base}/${parts.map((p) => encodeURIComponent(p)).join('/')}`.replace(/\/+/g, '/')

  if (loc.kind === 'tower') {
    return `${base}/`.replace(/\/+/g, '/')
  }

  if (loc.kind === 'floor') {
    if (loc.floorId === 'G') return join('G', 'lobby')
    if (loc.floorId === 'roof') return join('R')
    return join(loc.floorId)
  }

  if (loc.kind === 'focus') {
    return join('99', loc.room, loc.item)
  }

  if (loc.floorId === 'G') {
    return join('G', 'lobby')
  }

  if (loc.floorId === '23') {
    const stop = parseFactoryAreaSlug(loc.room)
    if (stop !== null) return join('23', factoryAreaSlug(stop))
  }

  return join(loc.floorId, loc.room)
}

export function parentLocation(loc: SiteLocation): SiteLocation {
  switch (loc.kind) {
    case 'focus':
      return { kind: 'room', floorId: '99', room: loc.room }
    case 'room':
      return { kind: 'floor', floorId: loc.floorId }
    case 'floor':
      return { kind: 'tower' }
    default:
      return { kind: 'tower' }
  }
}

export function defaultFloorLocation(floorId: FloorId): SiteLocation {
  if (floorId === 'G') return { kind: 'floor', floorId: 'G' }
  if (floorId === 'roof') return { kind: 'floor', floorId: 'roof' }
  return { kind: 'floor', floorId }
}

/** Migrate legacy hash URLs (#/52, #/tower) to path routes */
export function migrateHashRoute(): string | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  const match = hash.match(/^#\/([^/?#]*)/)
  if (!match) return null

  const slug = match[1].toLowerCase()
  let loc: SiteLocation
  if (!slug || slug === 'tower') {
    loc = { kind: 'tower' }
  } else {
    const floorId = parseFloorSlug(slug)
    loc = floorId ? defaultFloorLocation(floorId) : { kind: 'tower' }
  }
  return buildSitePath(loc)
}

export function bookFocusLocation(slug: string): SiteLocation {
  return { kind: 'focus', floorId: '99', room: 'library', item: slug }
}

export function credentialFocusLocation(slug: string): SiteLocation {
  return { kind: 'focus', floorId: '99', room: 'archive', item: slug }
}

export function labRoomLocation(slug: string): SiteLocation {
  return { kind: 'room', floorId: '52', room: slug }
}

export function libraryRoomLocation(slug: LibraryRoomSlug): SiteLocation {
  return { kind: 'room', floorId: '99', room: slug }
}

export function factoryStopLocation(stop: number): SiteLocation {
  return { kind: 'room', floorId: '23', room: factoryAreaSlug(stop) }
}

export function floorLabel(id: FloorId): string {
  return getFloor(id).label
}
