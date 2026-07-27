import { areaLabel, FACTORY_AREAS } from '../factoryStops'
import { RoomShell } from '../primitives/RoomShell'
import { blueprintFitScale, factory23Interior } from './interiorScale'
import { FactoryLineLayout } from './layouts/FactoryLineLayout'
import { typologyMat, type TypologyProps } from './types'

interface AssemblyLineProps extends TypologyProps {
  factoryStop: number | null
  onSelectStop: (stop: number) => void
}

/** 23 · Assembly Line ??blueprint conveyor with semester stop targets */
export function AssemblyLine({
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
}: AssemblyLineProps) {
  const m = typologyMat(theme, accent, entered)
  const interior = factory23Interior()
  const layoutScale = blueprintFitScale(11, 4, interior, 0.88)

  return (
    <RoomShell width={interior.w} depth={interior.d} height={interior.h} color={m.pal.graphite} floorColor={m.body} openFront>
      <group position={[0, 0.02, 0]}>
        <FactoryLineLayout
          theme={theme}
          accent={accent}
          entered={entered}
          active
          scale={layoutScale}
          factoryStop={factoryStop}
          onSelectStop={onSelectStop}
          showLabels={entered}
          areaLabels={FACTORY_AREAS.map((sem, i) => ({ label: areaLabel(i), detail: sem.label }))}
        />
      </group>
    </RoomShell>
  )
}
