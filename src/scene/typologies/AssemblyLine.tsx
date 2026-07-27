import type { ViewMode } from '../../building/viewMode'
import { FloorPlate } from '../primitives/FloorPlate'
import { FactoryTimelineLayout } from './layouts/FactoryTimelineLayout'
import { floorPlateSize } from './interiorScale'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  viewMode?: ViewMode
  roomFocus?: boolean
  onSelectStop: (stop: number) => void
}

/** 23 · Assembly Line — horizontal timeline with assembly arms */
export function AssemblyLine({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: AssemblyLineProps) {
  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('23')

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      <FactoryTimelineLayout
        theme={theme}
        accent={accent}
        entered={entered}
        active
        plateWidth={plate.w}
        factoryStop={factoryStop}
        onSelectStop={onSelectStop}
      />
    </FloorPlate>
  )
}
