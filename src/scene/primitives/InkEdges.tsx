import { Edges } from '@react-three/drei'
import { createContext, useContext } from 'react'
import type { ScenePalette } from '../palette'

/** Overrides edge ink color for a subtree (teardown blueprint tint). */
export const EdgeInkContext = createContext<string | null>(null)

const PaletteCtx = createContext<ScenePalette | null>(null)

export function PaletteProvider({ palette, children }: { palette: ScenePalette; children: React.ReactNode }) {
  return <PaletteCtx.Provider value={palette}>{children}</PaletteCtx.Provider>
}

export function usePalette(): ScenePalette {
  const p = useContext(PaletteCtx)
  if (!p) throw new Error('usePalette requires PaletteProvider')
  return p
}

/** Resting edge ink on a mesh — line survives when fill fades. */
export function InkEdges({
  threshold = 15,
  lineWidth = 1,
  color,
}: {
  threshold?: number
  lineWidth?: number
  color?: string
}) {
  const pal = usePalette()
  const override = useContext(EdgeInkContext)
  const ink = color ?? override ?? pal.fg
  return <Edges threshold={threshold} color={ink} lineWidth={lineWidth} />
}
