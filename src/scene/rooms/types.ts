import type { Theme } from '../../context/SiteContext'

export interface RoomProps {
  theme: Theme
  accent: string
  entered: boolean
  hover: boolean
}

export function themeMat(theme: Theme, accent: string, entered: boolean) {
  const dark = theme === 'dark'
  return {
    body: dark ? '#0c0e18' : '#f0ece4',
    alt: dark ? '#141824' : '#e4e0d8',
    edge: dark ? '#2a3050' : '#1a1a1a',
    emissive: entered && dark ? accent : '#000000',
    emissiveIntensity: entered && dark ? 1.2 : 0,
    metalness: dark ? 0.7 : 0.1,
    roughness: dark ? 0.35 : 0.85,
  }
}
