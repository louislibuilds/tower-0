import { Html } from '@react-three/drei'
import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, techB10Interior } from './interiorScale'
import { TechCentreLayout } from './layouts/TechCentreLayout'
import { typologyMat, type TypologyProps } from './types'

const QUAD_OFFSETS: [number, number][] = [
  [-0.26, 0.22],
  [0.26, 0.22],
  [-0.26, -0.22],
  [0.26, -0.22],
]

/** B10 · Rack Hall — four tech centres filling the floor plate */
export function RackHall({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const interior = techB10Interior()
  const cellScale = blueprintFitScale(8, 6, { w: interior.w * 0.46, d: interior.d * 0.46 }, 0.88)

  return (
    <FloorPlate width={interior.w} depth={interior.d} color={m.pal.graphite} floorColor={m.body}>
      {QUAD_OFFSETS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]} scale={cellScale}>
          <TechCentreLayout theme={theme} accent={accent} entered={entered} active={lit} />
        </group>
      ))}

      <Html center position={[0.38, 0.22, 0.14]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--tiny ${lit ? 'scene-label--active' : ''}`}>PRINT</div>
      </Html>
    </FloorPlate>
  )
}
