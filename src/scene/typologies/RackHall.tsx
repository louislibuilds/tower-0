import { Html } from '@react-three/drei'
import { RoomShell } from '../primitives/RoomShell'
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
    <RoomShell width={interior.w} depth={interior.d} height={interior.h} color={m.pal.graphite} floorColor={m.body} openFront>
      <group position={[0, 0.02, 0]}>
        <TechCentreLayout theme={theme} accent={accent} entered={entered} active={lit} scale={layoutScale} />
      </group>

      <Html center position={[0.38, 0.28, 0.16]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--tiny ${lit ? 'scene-label--active' : ''}`}>PRINT</div>
      </Html>
    </RoomShell>
  )
}
