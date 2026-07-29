import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ViewportLayout } from '../hooks/useViewportLayout'

interface MobileShellContextValue {
  layout: ViewportLayout
  railDrawerOpen: boolean
  exhibitDrawerOpen: boolean
  openRailDrawer: () => void
  closeRailDrawer: () => void
  openExhibitDrawer: () => void
  closeExhibitDrawer: () => void
  toggleRailDrawer: () => void
  toggleExhibitDrawer: () => void
}

const MobileShellContext = createContext<MobileShellContextValue | null>(null)

export function MobileShellProvider({
  layout,
  children,
}: {
  layout: ViewportLayout
  children: ReactNode
}) {
  const [railDrawerOpen, setRailDrawerOpen] = useState(false)
  const [exhibitDrawerOpen, setExhibitDrawerOpen] = useState(false)

  const openRailDrawer = useCallback(() => setRailDrawerOpen(true), [])
  const closeRailDrawer = useCallback(() => setRailDrawerOpen(false), [])
  const openExhibitDrawer = useCallback(() => setExhibitDrawerOpen(true), [])
  const closeExhibitDrawer = useCallback(() => setExhibitDrawerOpen(false), [])
  const toggleRailDrawer = useCallback(() => setRailDrawerOpen((v) => !v), [])
  const toggleExhibitDrawer = useCallback(() => setExhibitDrawerOpen((v) => !v), [])

  const value = useMemo(
    () => ({
      layout,
      railDrawerOpen,
      exhibitDrawerOpen,
      openRailDrawer,
      closeRailDrawer,
      openExhibitDrawer,
      closeExhibitDrawer,
      toggleRailDrawer,
      toggleExhibitDrawer,
    }),
    [
      layout,
      railDrawerOpen,
      exhibitDrawerOpen,
      openRailDrawer,
      closeRailDrawer,
      openExhibitDrawer,
      closeExhibitDrawer,
      toggleRailDrawer,
      toggleExhibitDrawer,
    ],
  )

  return <MobileShellContext.Provider value={value}>{children}</MobileShellContext.Provider>
}

export function useMobileShell() {
  return useContext(MobileShellContext)
}
