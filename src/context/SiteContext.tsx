import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LOCALE_LABELS, STRINGS, type Locale, type LocaleStrings } from '../i18n/strings'
import type { FloorId } from '../building/program'
import { useFloorNavigation } from '../hooks/useFloorNavigation'

export type Theme = 'dark' | 'light'

interface SiteContextValue {
  theme: Theme
  locale: Locale
  strings: LocaleStrings
  floorId: FloorId
  hoveredFloorId: FloorId | null
  hoveredLabSlug: string | null
  floor: ReturnType<typeof useFloorNavigation>['floor']
  direction: number
  labRoomSlug: string | null
  setLabRoomSlug: (slug: string | null) => void
  setHoveredLabSlug: (slug: string | null) => void
  goToFloor: (id: FloorId) => void
  setHoveredFloor: (id: FloorId | null) => void
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setLocale: (l: Locale) => void
  localeLabels: typeof LOCALE_LABELS
}

const SiteContext = createContext<SiteContextValue | null>(null)

function loadTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem('tower0-theme') as Theme) || 'dark'
}

function loadLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  return (localStorage.getItem('tower0-locale') as Locale) || 'en'
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const nav = useFloorNavigation()
  const [theme, setThemeState] = useState<Theme>(loadTheme)
  const [locale, setLocaleState] = useState<Locale>(loadLocale)
  const [hoveredFloorId, setHoveredFloor] = useState<FloorId | null>(null)
  const [labRoomSlug, setLabRoomSlugState] = useState<string | null>(null)
  const [hoveredLabSlug, setHoveredLabSlug] = useState<string | null>(null)

  const setLabRoomSlug = useCallback((slug: string | null) => {
    setLabRoomSlugState(slug)
  }, [])

  const goToFloor = useCallback(
    (id: FloorId) => {
      nav.goToFloor(id)
      if (id !== '52') {
        setLabRoomSlugState(null)
        setHoveredLabSlug(null)
      }
    },
    [nav],
  )

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
    document.documentElement.lang = l === 'en' ? 'en' : l
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = locale === 'en' ? 'en' : locale
  }, [theme, locale])

  const strings = STRINGS[locale]

  const value = useMemo(
    () => ({
      theme,
      locale,
      strings,
      floorId: nav.floorId,
      hoveredFloorId,
      hoveredLabSlug,
      labRoomSlug,
      floor: nav.floor,
      direction: nav.direction,
      goToFloor,
      setHoveredFloor,
      setLabRoomSlug,
      setHoveredLabSlug,
      setTheme,
      toggleTheme,
      setLocale,
      localeLabels: LOCALE_LABELS,
    }),
    [
      theme,
      locale,
      strings,
      nav,
      hoveredFloorId,
      hoveredLabSlug,
      labRoomSlug,
      goToFloor,
      setTheme,
      toggleTheme,
      setLocale,
      setLabRoomSlug,
    ],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
