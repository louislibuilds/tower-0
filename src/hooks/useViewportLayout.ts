import { useEffect, useState } from 'react'

export type ViewportLayout = 'desktop' | 'tablet' | 'mobile'

const TABLET_MQ = '(max-width: 1100px)'
const MOBILE_MQ = '(max-width: 768px)'

function readLayout(): ViewportLayout {
  if (typeof window === 'undefined') return 'desktop'
  if (window.matchMedia(MOBILE_MQ).matches) return 'mobile'
  if (window.matchMedia(TABLET_MQ).matches) return 'tablet'
  return 'desktop'
}

export function useViewportLayout() {
  const [layout, setLayout] = useState<ViewportLayout>(readLayout)
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  }))

  useEffect(() => {
    const tabletMq = window.matchMedia(TABLET_MQ)
    const mobileMq = window.matchMedia(MOBILE_MQ)

    const sync = () => {
      setLayout(readLayout())
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    tabletMq.addEventListener('change', sync)
    mobileMq.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    sync()

    return () => {
      tabletMq.removeEventListener('change', sync)
      mobileMq.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  return {
    layout,
    isMobile: layout === 'mobile',
    isTablet: layout === 'tablet',
    isDesktop: layout === 'desktop',
    width: size.width,
    height: size.height,
    isPortrait: size.height > size.width,
  }
}
