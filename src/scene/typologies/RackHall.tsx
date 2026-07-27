import { Html } from '@react-three/drei'
import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, techB10Interior } from './interiorScale'
import { TechCentreLayout } from './layouts/TechCentreLayout'
import { typologyMat, type TypologyProps } from './types'

/** B10 · Rack Hall ??blueprint command centre + print slot */
export function RackHall({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const interior = techB10Interior()
  const layoutScale = blueprintFitScale(8, 6, interior)

  return (
    <FloorPlate width={interior.w} depth={interior.d} color={m.pal.graphite} floorColor={m.body}>
      <group scale={layoutScale}>
        <TechCentreLayout theme={theme} accent={accent} entered={entered} active={lit} />
      </group>

      <Html center position={[0.38, 0.28, 0.16]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--tiny ${lit ? 'scene-label--active' : ''}`}>PRINT</div>
      </Html>
    </FloorPlate>
  )
}
