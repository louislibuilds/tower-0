import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { HTML_LANG, LOCALE_LABELS, STRINGS, isLocale, type Locale, type LocaleStrings } from '../i18n/strings'

import type { FloorId } from '../building/program'

import type { ViewMode } from '../building/viewMode'

import type { SitePhase } from '../building/sitePhase'

import { isInteractionLocked } from '../building/sitePhase'

import type { LibraryRoomSlug } from '../data/libraryRooms'

import { libraryBooks } from '../data/libraryBooks'

import { useSiteNavigation } from '../hooks/useSiteNavigation'

import {
  bookFocusLocation,
  credentialFocusLocation,
  defaultFloorLocation,
  factoryStopLocation,
  labRoomLocation,
  libraryRoomLocation,
  locationToViewState,
  parentLocation,
  factoryAreaSlug,
} from '../building/siteRoute'

import { applyTowerTokens } from '../design/applyTokens'
import { DEFAULT_FONT_STACK } from '../design/tokens'

import { printResumePdf, resumeLocaleForSite } from '../data/resumePrint'

import { FACTORY_STOPS } from '../scene/factoryStops'



export type Theme = 'dark' | 'light'



interface SiteContextValue {

  theme: Theme

  locale: Locale

  strings: LocaleStrings

  floorId: FloorId | null

  atTower: boolean

  viewMode: ViewMode

  phase: SitePhase

  bootDone: boolean

  interactionLocked: boolean

  hoveredFloorId: FloorId | null

  hoveredLabSlug: string | null

  hoveredLibraryRoomSlug: LibraryRoomSlug | null

  hoveredFactoryStop: number | null

  floor: ReturnType<typeof useSiteNavigation>['floor']

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

  setHoveredLibraryRoomSlug: (slug: LibraryRoomSlug | null) => void

  setHoveredFactoryStop: (stop: number | null) => void

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

  goToTower: () => void

  setHoveredFloor: (id: FloorId | null) => void

  setTheme: (t: Theme) => void

  toggleTheme: () => void

  setLocale: (l: Locale) => void

  localeLabels: typeof LOCALE_LABELS

  finishBoot: () => void

  setPhase: (p: SitePhase) => void

  startExit: () => void

  reopenSite: () => void

  /** Zoom out one navigation level (focus → room → floor → tower) */
  navigateBack: () => void

  resumePreviewOpen: boolean
  openResumePreview: () => void
  closeResumePreview: () => void
  printResume: () => void
}



const SiteContext = createContext<SiteContextValue | null>(null)



function loadTheme(): Theme {

  if (typeof window === 'undefined') return 'dark'

  return (localStorage.getItem('tower0-theme') as Theme) || 'dark'

}



function loadLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('tower0-locale')
  if (stored === 'zh-CN') return 'zh-TW'
  return isLocale(stored) ? stored : 'en'
}



function clearInteriorHover(setters: {
  setHoverLab: (v: string | null) => void
  setHoverLib: (v: LibraryRoomSlug | null) => void
  setHoverFactory: (v: number | null) => void
}) {
  setters.setHoverLab(null)
  setters.setHoverLib(null)
  setters.setHoverFactory(null)
}



export function SiteProvider({ children }: { children: ReactNode }) {

  const nav = useSiteNavigation()

  const [theme, setThemeState] = useState<Theme>(loadTheme)

  const [locale, setLocaleState] = useState<Locale>(loadLocale)

  const [phase, setPhase] = useState<SitePhase>('boot')

  const [bootDone, setBootDone] = useState(false)

  const [resumePreviewOpen, setResumePreviewOpen] = useState(false)

  const openResumePreview = useCallback(() => setResumePreviewOpen(true), [])
  const closeResumePreview = useCallback(() => setResumePreviewOpen(false), [])
  const printResume = useCallback(() => {
    setResumePreviewOpen(false)
    window.requestAnimationFrame(() => {
      printResumePdf(resumeLocaleForSite(locale))
    })
  }, [locale])

  const routeLive = bootDone && phase !== 'boot' && phase !== 'scan'
  const routeView = useMemo(
    () => (routeLive ? locationToViewState(nav.location) : null),
    [routeLive, nav.location],
  )

  const viewMode = routeView?.viewMode ?? 'tower'
  const labRoomSlug = routeView?.labRoomSlug ?? null
  const libraryRoomSlug = routeView?.libraryRoomSlug ?? null
  const factoryStop = routeView?.factoryStop ?? null
  const selectedBookSlug = routeView?.selectedBookSlug ?? null
  const selectedCredentialSlug = routeView?.selectedCredentialSlug ?? null

  const [hoveredFloorId, setHoveredFloor] = useState<FloorId | null>(null)

  const [hoveredLabSlug, setHoveredLabSlug] = useState<string | null>(null)

  const [hoveredLibraryRoomSlug, setHoveredLibraryRoomSlug] = useState<LibraryRoomSlug | null>(null)

  const [hoveredFactoryStop, setHoveredFactoryStop] = useState<number | null>(null)

  const clearInteriorHoverState = useCallback(() => {
    clearInteriorHover({
      setHoverLab: setHoveredLabSlug,
      setHoverLib: setHoveredLibraryRoomSlug,
      setHoverFactory: setHoveredFactoryStop,
    })
  }, [])

  const clearSubs = useCallback(() => {
    clearInteriorHoverState()
  }, [clearInteriorHoverState])

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

  const setHoveredLibraryRoomSlugSafe = useCallback(
    (slug: LibraryRoomSlug | null) => {
      if (isInteractionLocked(phase)) return
      setHoveredLibraryRoomSlug(slug)
    },
    [phase],
  )

  const setHoveredFactoryStopSafe = useCallback(
    (stop: number | null) => {
      if (isInteractionLocked(phase)) return
      setHoveredFactoryStop(stop)
    },
    [phase],
  )

  const toggleFloor = useCallback(
    (id: FloorId) => {
      if (isInteractionLocked(phase)) return
      if (nav.atTower || nav.floorId !== id) {
        nav.goToFloor(id)
        return
      }
      nav.goToTower()
    },
    [nav, phase],
  )

  const finishBoot = useCallback(() => {
    setPhase('lobby')
    setBootDone(true)
    nav.goToFloor('G')
  }, [nav])

  const startExit = useCallback(() => {
    if (isInteractionLocked(phase)) return
    clearSubs()
    setPhase('exit')
    nav.goToTower()
  }, [clearSubs, phase, nav])

  const reopenSite = useCallback(() => {
    setPhase('boot')
    setBootDone(false)
    clearSubs()
    nav.goToTower()
  }, [nav, clearSubs])

  const goToFloor = useCallback(
    (id: FloorId) => {
      if (isInteractionLocked(phase)) return
      if (!nav.atTower && nav.floorId === id && viewMode !== 'tower') {
        toggleFloor(id)
        return
      }
      nav.goToFloor(id)
    },
    [nav, viewMode, toggleFloor, phase],
  )

  const goToTower = useCallback(() => {
    if (isInteractionLocked(phase)) return
    nav.goToTower()
    setHoveredFloorSafe(null)
    clearInteriorHoverState()
  }, [nav, phase, setHoveredFloorSafe, clearInteriorHoverState])

  const toggleLabRoom = useCallback(
    (slug: string) => {
      if (isInteractionLocked(phase)) return
      const onRoom =
        nav.location.kind === 'room' && nav.location.floorId === '52' && nav.location.room === slug
      if (onRoom && (viewMode === 'room' || viewMode === 'focus')) return
      if (onRoom) {
        nav.navigate(defaultFloorLocation('52'))
        return
      }
      nav.navigate(labRoomLocation(slug))
    },
    [nav, viewMode, phase],
  )

  const toggleLibraryRoom = useCallback(
    (slug: LibraryRoomSlug) => {
      if (isInteractionLocked(phase)) return
      const onRoom =
        nav.location.kind === 'room' && nav.location.floorId === '99' && nav.location.room === slug
      if (onRoom && (viewMode === 'room' || viewMode === 'focus')) return
      if (onRoom) {
        nav.navigate(defaultFloorLocation('99'))
        return
      }
      nav.navigate(libraryRoomLocation(slug))
    },
    [nav, phase, viewMode],
  )

  const toggleFactoryStop = useCallback(
    (stop: number) => {
      if (isInteractionLocked(phase)) return
      const areaSlug = factoryAreaSlug(stop)
      const onStop =
        nav.location.kind === 'room' && nav.location.floorId === '23' && nav.location.room === areaSlug
      if (onStop && viewMode === 'room') return
      if (onStop) {
        nav.navigate(defaultFloorLocation('23'))
        return
      }
      nav.navigate(factoryStopLocation(stop))
    },
    [nav, phase, viewMode],
  )

  const navigateBack = useCallback(() => {
    if (isInteractionLocked(phase)) return
    nav.navigate(parentLocation(nav.location))
    setHoveredFloorSafe(null)
    clearInteriorHoverState()
  }, [phase, nav, setHoveredFloorSafe, clearInteriorHoverState])

  const stepFactoryStop = useCallback(
    (delta: number) => {
      if (isInteractionLocked(phase)) return
      const current = factoryStop ?? 0
      const next = Math.max(0, Math.min(FACTORY_STOPS.length - 1, current + delta))
      if (next === current) return
      nav.navigate(factoryStopLocation(next))
    },
    [phase, factoryStop, nav],
  )

  const nextFactoryStop = useCallback(() => stepFactoryStop(1), [stepFactoryStop])

  const prevFactoryStop = useCallback(() => stepFactoryStop(-1), [stepFactoryStop])



  const toggleBook = useCallback(
    (slug: string) => {
      if (isInteractionLocked(phase)) return
      if (selectedBookSlug === slug) {
        nav.navigate(libraryRoomLocation('library'))
        return
      }
      nav.navigate(bookFocusLocation(slug))
    },
    [selectedBookSlug, phase, nav],
  )

  const toggleCredential = useCallback(
    (slug: string) => {
      if (isInteractionLocked(phase)) return
      if (selectedCredentialSlug === slug) {
        nav.navigate(libraryRoomLocation('archive'))
        return
      }
      nav.navigate(credentialFocusLocation(slug))
    },
    [selectedCredentialSlug, phase, nav],
  )



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

    document.documentElement.dataset.font = DEFAULT_FONT_STACK

    document.documentElement.lang = HTML_LANG[locale]

    applyTowerTokens(theme, DEFAULT_FONT_STACK)

  }, [theme, locale])



  const strings = STRINGS[locale]



  const value = useMemo(

    () => ({

      theme,

      locale,

      strings,

      floorId: nav.floorId,

      atTower: nav.atTower,

      viewMode,

      phase,

      bootDone,

      interactionLocked: isInteractionLocked(phase),

      hoveredFloorId,

      hoveredLabSlug,

      hoveredLibraryRoomSlug,

      hoveredFactoryStop,

      labRoomSlug,

      libraryRoomSlug,

      factoryStop,

      selectedBookSlug,

      selectedCredentialSlug,

      floor: nav.floor,

      direction: nav.direction,

      toggleFloor,

      goToFloor,

      goToTower,

      setHoveredFloor: setHoveredFloorSafe,

      setLabRoomSlug: (slug: string | null) => {
        if (slug) nav.navigate(labRoomLocation(slug))
        else nav.navigate(defaultFloorLocation('52'))
      },

      setLibraryRoomSlug: (slug: LibraryRoomSlug | null) => {
        if (slug) nav.navigate(libraryRoomLocation(slug))
        else nav.navigate(defaultFloorLocation('99'))
      },

      setFactoryStop: (stop: number | null) => {
        if (stop !== null) nav.navigate(factoryStopLocation(stop))
        else nav.navigate(defaultFloorLocation('23'))
      },

      toggleLabRoom,

      toggleLibraryRoom,

      toggleFactoryStop,

      nextFactoryStop,

      prevFactoryStop,

      toggleBook,

      toggleCredential,

      handleBookClick,

      openBook,

      setSelectedBookSlug: (slug: string | null) => {
        if (slug) nav.navigate(bookFocusLocation(slug))
        else nav.navigate(libraryRoomLocation('library'))
      },

      setSelectedCredentialSlug: (slug: string | null) => {
        if (slug) nav.navigate(credentialFocusLocation(slug))
        else nav.navigate(libraryRoomLocation('archive'))
      },

      setHoveredLabSlug: setHoveredLabSlugSafe,

      setHoveredLibraryRoomSlug: setHoveredLibraryRoomSlugSafe,

      setHoveredFactoryStop: setHoveredFactoryStopSafe,

      setTheme,

      toggleTheme,

      setLocale,

      localeLabels: LOCALE_LABELS,

      finishBoot,

      setPhase,

      startExit,

      reopenSite,

      navigateBack,

      resumePreviewOpen,
      openResumePreview,
      closeResumePreview,
      printResume,

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

      hoveredLibraryRoomSlug,

      hoveredFactoryStop,

      labRoomSlug,

      libraryRoomSlug,

      factoryStop,

      selectedBookSlug,

      selectedCredentialSlug,

      toggleFloor,

      goToFloor,

      goToTower,

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

      setHoveredLibraryRoomSlugSafe,

      setHoveredFactoryStopSafe,

      navigateBack,

      resumePreviewOpen,
      openResumePreview,
      closeResumePreview,
      printResume,

    ],

  )



  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>

}



export function useSite() {

  const ctx = useContext(SiteContext)

  if (!ctx) throw new Error('useSite must be used within SiteProvider')

  return ctx

}

