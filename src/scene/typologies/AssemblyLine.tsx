import type { ViewMode } from '../../building/viewMode'
import { areaLabel, FACTORY_AREAS } from '../factoryStops'
import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, factory23Interior } from './interiorScale'
import { FactoryLineLayout } from './layouts/FactoryLineLayout'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  viewMode?: ViewMode
  roomFocus?: boolean
  onSelectStop: (stop: number) => void
}

/** 23 · Assembly Line — blueprint conveyor with semester stop targets */
export function AssemblyLine({
  theme,
  accent,
  entered,
  factoryStop,
  viewMode = 'floor',
  roomFocus = false,
  onSelectStop,
}: AssemblyLineProps) {
  const m = typologyMat(theme, accent, entered)
  const interior = factory23Interior()
  const layoutScale = blueprintFitScale(11, 4, interior)
  const enteringFactory = factoryStop !== null && (viewMode === 'room' || viewMode === 'focus')

  return (
    <FloorPlate width={interior.w} depth={interior.d} color={m.pal.graphite} floorColor={m.body}>
      <group scale={layoutScale}>
        <FactoryLineLayout
          theme={theme}
          accent={accent}
          entered={entered}
          active
          factoryStop={factoryStop}
          onSelectStop={onSelectStop}
          showLabels={entered && !enteringFactory}
          roomFocus={roomFocus}
          areaLabels={FACTORY_AREAS.map((sem, i) => ({ label: areaLabel(i), detail: sem.label }))}
        />
      </group>
    </FloorPlate>
  )
}
