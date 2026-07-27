import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { HTML_LANG, LOCALE_LABELS, STRINGS, isLocale, type Locale, type LocaleStrings } from '../i18n/strings'

import type { FloorId } from '../building/program'

import type { ViewMode } from '../building/viewMode'

import type { SitePhase } from '../building/sitePhase'

import { isInteractionLocked } from '../building/sitePhase'

import type { LibraryRoomSlug } from '../data/libraryRooms'

import { libraryBooks } from '../data/libraryBooks'

import { useFloorNavigation } from '../hooks/useFloorNavigation'

import { FACTORY_STOPS } from '../scene/factoryStops'



export type Theme = 'dark' | 'light'



interface SiteContextValue {

  theme: Theme

  locale: Locale

  strings: LocaleStrings

  floorId: FloorId

  viewMode: ViewMode

  phase: SitePhase

  bootDone: boolean

  interactionLocked: boolean

  hoveredFloorId: FloorId | null

  hoveredLabSlug: string | null

  floor: ReturnType<typeof useFloorNavigation>['floor']

  direction: number

  labRoomSlug: string | null

  libraryRoomSlug: LibraryRoomSlug | null

  factoryStop: number | null

  selectedBookSlug: string | null

  selectedCredentialSlug: string | null

  setLabRoomSlug: (slug: string | null) => void

  setLibraryRoomSlug: (slug: LibraryRoomSlug | null) => void

  setFactoryStop: (stop: number | null) => void

  setSelectedBookSlug: (slug: string | null) => void

  setSelectedCredentialSlug: (slug: string | null) => void

  setHoveredLabSlug: (slug: string | null) => void

  toggleFloor: (id: FloorId) => void

  toggleLabRoom: (slug: string) => void

  toggleLibraryRoom: (slug: LibraryRoomSlug) => void

  toggleFactoryStop: (stop: number) => void

  nextFactoryStop: () => void

  prevFactoryStop: () => void

  toggleBook: (slug: string) => void

  toggleCredential: (slug: string) => void

  handleBookClick: (slug: string) => void

  openBook: (slug: string) => void

  goToFloor: (id: FloorId) => void

  setHoveredFloor: (id: FloorId | null) => void

  setTheme: (t: Theme) => void

  toggleTheme: () => void

  setLocale: (l: Locale) => void

  localeLabels: typeof LOCALE_LABELS

  finishBoot: () => void

  setPhase: (p: SitePhase) => void

  startExit: () => void

  reopenSite: () => void

}



const SiteContext = createContext<SiteContextValue | null>(null)



function loadTheme(): Theme {

  if (typeof window === 'undefined') return 'dark'

  return (localStorage.getItem('tower0-theme') as Theme) || 'dark'

}



function loadLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('tower0-locale')
  return isLocale(stored) ? stored : 'en'
}



function clearFloorSelections(setters: {

  setLab: (v: string | null) => void

  setLib: (v: LibraryRoomSlug | null) => void

  setFactory: (v: number | null) => void

  setBook: (v: string | null) => void

  setCred: (v: string | null) => void

  setHoverLab: (v: string | null) => void

}) {

  setters.setLab(null)

  setters.setLib(null)

  setters.setFactory(null)

  setters.setBook(null)

  setters.setCred(null)

  setters.setHoverLab(null)

}



export function SiteProvider({ children }: { children: ReactNode }) {

  const nav = useFloorNavigation()

  const [theme, setThemeState] = useState<Theme>(loadTheme)

  const [locale, setLocaleState] = useState<Locale>(loadLocale)

  const [viewMode, setViewMode] = useState<ViewMode>('tower')

  const [phase, setPhase] = useState<SitePhase>('boot')

  const [bootDone, setBootDone] = useState(false)

  const [hoveredFloorId, setHoveredFloor] = useState<FloorId | null>(null)

  const [labRoomSlug, setLabRoomSlugState] = useState<string | null>(null)

  const [hoveredLabSlug, setHoveredLabSlug] = useState<string | null>(null)

  const setHoveredFloorSafe = useCallback(
    (id: FloorId | null) => {
      if (isInteractionLocked(phase)) return
      setHoveredFloor(id)
    },
    [phase],
  )

  const setHoveredLabSlugSafe = useCallback(
    (slug: string | null) => {
      if (isInteractionLocked(phase)) return
      setHoveredLabSlug(slug)
    },
    [phase],
  )

  const [libraryRoomSlug, setLibraryRoomSlugState] = useState<LibraryRoomSlug | null>(null)

  const [factoryStop, setFactoryStopState] = useState<number | null>(null)

  const [selectedBookSlug, setSelectedBookSlugState] = useState<string | null>(null)

  const [selectedCredentialSlug, setSelectedCredentialSlugState] = useState<string | null>(null)



  const clearSubs = useCallback(() => {

    clearFloorSelections({

      setLab: setLabRoomSlugState,

      setLib: setLibraryRoomSlugState,

      setFactory: setFactoryStopState,

      setBook: setSelectedBookSlugState,

      setCred: setSelectedCredentialSlugState,

      setHoverLab: setHoveredLabSlug,

    })

  }, [])



  const toggleFloor = useCallback(

    (id: FloorId) => {

      if (isInteractionLocked(phase)) return

      if (id === nav.floorId) {

        if (viewMode !== 'tower') {

          setViewMode('tower')

          clearSubs()

        } else {

          setViewMode(id === 'roof' ? 'room' : 'floor')

        }

        return

      }

      nav.goToFloor(id)

      clearSubs()

      setViewMode(id === 'roof' ? 'room' : 'floor')

    },

    [nav, viewMode, clearSubs, phase],

  )



  const finishBoot = useCallback(() => {

    setPhase('lobby')

    setBootDone(true)

    nav.goToFloor('G')

    setViewMode('floor')

  }, [nav])



  const startExit = useCallback(() => {
    if (isInteractionLocked(phase)) return

    clearSubs()

    setPhase('exit')

    setViewMode('tower')

  }, [clearSubs, phase])



  const reopenSite = useCallback(() => {

    setPhase('boot')

    setBootDone(false)

    clearSubs()

    setViewMode('tower')

    nav.goToFloor('G')

  }, [nav, clearSubs])



  const goToFloor = useCallback(

    (id: FloorId) => {

      if (isInteractionLocked(phase)) return

      if (id === nav.floorId && viewMode !== 'tower') {

        toggleFloor(id)

        return

      }

      nav.goToFloor(id)

      clearSubs()

      setViewMode(id === 'roof' ? 'room' : 'floor')

    },

    [nav, viewMode, toggleFloor, clearSubs, phase],

  )



  const toggleLabRoom = useCallback((slug: string) => {
    if (isInteractionLocked(phase)) return
    if (labRoomSlug === slug) {
      setLabRoomSlugState(null)
      setViewMode('floor')
      return
    }
    setLabRoomSlugState(slug)
    setSelectedBookSlugState(null)
    setSelectedCredentialSlugState(null)
    setViewMode('room')
  }, [labRoomSlug, phase])



  const toggleLibraryRoom = useCallback((slug: LibraryRoomSlug) => {
    if (isInteractionLocked(phase)) return

    setLibraryRoomSlugState((prev) => {

      if (prev === slug) {

        setViewMode('floor')

        setSelectedBookSlugState(null)

        setSelectedCredentialSlugState(null)

        return null

      }

      setViewMode('room')

      setSelectedBookSlugState(null)

      setSelectedCredentialSlugState(null)

      return slug

    })

  }, [phase])



  const toggleFactoryStop = useCallback((stop: number) => {
    if (isInteractionLocked(phase)) return

    setFactoryStopState((prev) => {

      if (prev === stop) {

        setViewMode('floor')

        return null

      }

      setViewMode('room')

      return stop

    })

  }, [phase])



  const stepFactoryStop = useCallback((delta: number) => {
    if (isInteractionLocked(phase)) return

    setFactoryStopState((prev) => {
      const current = prev ?? (delta > 0 ? -1 : FACTORY_STOPS.length)
      const next = (current + delta + FACTORY_STOPS.length) % FACTORY_STOPS.length
      setViewMode('room')
      return next
    })
  }, [phase])

  const nextFactoryStop = useCallback(() => stepFactoryStop(1), [stepFactoryStop])

  const prevFactoryStop = useCallback(() => stepFactoryStop(-1), [stepFactoryStop])



  const toggleBook = useCallback((slug: string) => {
    if (isInteractionLocked(phase)) return
    if (selectedBookSlug === slug) {
      setSelectedBookSlugState(null)
      setLibraryRoomSlugState(null)
      setViewMode('floor')
      return
    }
    setLibraryRoomSlugState('library')
    setSelectedCredentialSlugState(null)
    setSelectedBookSlugState(slug)
    setViewMode('focus')
  }, [selectedBookSlug, phase])



  const toggleCredential = useCallback((slug: string) => {
    if (isInteractionLocked(phase)) return
    if (selectedCredentialSlug === slug) {
      setSelectedCredentialSlugState(null)
      setLibraryRoomSlugState(null)
      setViewMode('floor')
      return
    }
    setLibraryRoomSlugState('archive')
    setSelectedBookSlugState(null)
    setSelectedCredentialSlugState(slug)
    setViewMode('focus')
  }, [selectedCredentialSlug, phase])



  const handleBookClick = useCallback(

    (slug: string) => {

      if (isInteractionLocked(phase)) return

      if (selectedBookSlug === slug && viewMode === 'focus') {

        const book = libraryBooks.find((b) => b.slug === slug)

        if (book) window.open(book.url, '_blank', 'noopener')

        return

      }

      toggleBook(slug)

    },

    [selectedBookSlug, viewMode, toggleBook, phase],

  )



  const openBook = useCallback((slug: string) => {

    const book = libraryBooks.find((b) => b.slug === slug)

    if (book) window.open(book.url, '_blank', 'noopener')

  }, [])



  const setTheme = useCallback((t: Theme) => {

    setThemeState(t)

    localStorage.setItem('tower0-theme', t)

    document.documentElement.dataset.theme = t

  }, [])



  const toggleTheme = useCallback(() => {

    setTheme(theme === 'dark' ? 'light' : 'dark')

  }, [theme, setTheme])



  const setLocale = useCallback((l: Locale) => {

    setLocaleState(l)

    localStorage.setItem('tower0-locale', l)

    document.documentElement.lang = HTML_LANG[l]

  }, [])



  useEffect(() => {

    document.documentElement.dataset.theme = theme

    document.documentElement.lang = HTML_LANG[locale]

  }, [theme, locale])



  /** Hash / sidebar floor changes should enter floor view (not stay in tower overview) */
  useEffect(() => {
    if (!bootDone || phase === 'boot' || phase === 'scan') return
    setViewMode(nav.floorId === 'roof' ? 'room' : 'floor')
  }, [nav.floorId, bootDone, phase])



  const strings = STRINGS[locale]



  const value = useMemo(

    () => ({

      theme,

      locale,

      strings,

      floorId: nav.floorId,

      viewMode,

      phase,

      bootDone,

      interactionLocked: isInteractionLocked(phase),

      hoveredFloorId,

      hoveredLabSlug,

      labRoomSlug,

      libraryRoomSlug,

      factoryStop,

      selectedBookSlug,

      selectedCredentialSlug,

      floor: nav.floor,

      direction: nav.direction,

      toggleFloor,

      goToFloor,

      setHoveredFloor: setHoveredFloorSafe,

      setLabRoomSlug: setLabRoomSlugState,

      setLibraryRoomSlug: setLibraryRoomSlugState,

      setFactoryStop: setFactoryStopState,

      toggleLabRoom,

      toggleLibraryRoom,

      toggleFactoryStop,

      nextFactoryStop,

      prevFactoryStop,

      toggleBook,

      toggleCredential,

      handleBookClick,

      openBook,

      setSelectedBookSlug: setSelectedBookSlugState,

      setSelectedCredentialSlug: setSelectedCredentialSlugState,

      setHoveredLabSlug: setHoveredLabSlugSafe,

      setTheme,

      toggleTheme,

      setLocale,

      localeLabels: LOCALE_LABELS,

      finishBoot,

      setPhase,

      startExit,

      reopenSite,

    }),

    [

      theme,

      locale,

      strings,

      nav,

      viewMode,

      phase,

      bootDone,

      hoveredFloorId,

      hoveredLabSlug,

      labRoomSlug,

      libraryRoomSlug,

      factoryStop,

      selectedBookSlug,

      selectedCredentialSlug,

      toggleFloor,

      goToFloor,

      toggleLabRoom,

      toggleLibraryRoom,

      toggleFactoryStop,

      nextFactoryStop,

      prevFactoryStop,

      toggleBook,

      toggleCredential,

      handleBookClick,

      openBook,

      setTheme,

      toggleTheme,

      setLocale,

      finishBoot,

      startExit,

      reopenSite,

      setHoveredFloorSafe,

      setHoveredLabSlugSafe,

    ],

  )



  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>

}



export function useSite() {

  const ctx = useContext(SiteContext)

  if (!ctx) throw new Error('useSite must be used within SiteProvider')

  return ctx

}

