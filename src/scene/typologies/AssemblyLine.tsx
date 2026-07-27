import type { ViewMode } from '../../building/viewMode'
import { areaLabel, FACTORY_AREAS, FACTORY_LINE_VARIANTS } from '../factoryStops'
import { BP_UNIT } from './blueprintLayout'
import { FloorPlate } from '../primitives/FloorPlate'
import { floorPlateSize } from './interiorScale'
import { FactoryLineLayout, FACTORY_BELT_SEGMENTS } from './layouts/FactoryLineLayout'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  viewMode?: ViewMode
  roomFocus?: boolean
  onSelectStop: (stop: number) => void
}

/** 23 · Assembly Line — side timeline, four lines on plate (no overflow) */
export function AssemblyLine({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: AssemblyLineProps) {
  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('23')
  const beltDepth = FACTORY_BELT_SEGMENTS * BP_UNIT
  const lineScale = (plate.d * 0.82) / beltDepth

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      <group position={[0, 0.01, 0]}>
        <FactoryLineLayout
          theme={theme}
          accent={accent}
          entered={entered}
          active
          lineScale={lineScale}
          factoryStop={factoryStop}
          onSelectStop={onSelectStop}
          showLabels={entered}
          areaLabels={FACTORY_AREAS.map((sem, i) => ({ label: areaLabel(i), detail: sem.label }))}
          lineVariants={FACTORY_LINE_VARIANTS}
        />
      </group>
    </FloorPlate>
  )
}
