import type { ViewMode } from '../../building/viewMode'
import { areaLabel, FACTORY_AREAS } from '../factoryStops'
import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, floorPlateSize } from './interiorScale'
import { FactoryLineLayout } from './layouts/FactoryLineLayout'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  viewMode?: ViewMode
  roomFocus?: boolean
  onSelectStop: (stop: number) => void
}

/** 23 · Assembly Line — four parallel production lines on full floor plate */
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
  const plate = floorPlateSize('23')
  const layoutScale = blueprintFitScale(10, 5.4, plate, 0.88)
  const enteringFactory = factoryStop !== null && (viewMode === 'room' || viewMode === 'focus')

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body}>
      <group position={[0, 0.01, 0]} scale={layoutScale}>
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
