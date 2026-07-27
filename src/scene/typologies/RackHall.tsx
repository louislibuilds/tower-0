import { Html } from '@react-three/drei'
import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, floorPlateSize } from './interiorScale'
import { TechCentreLayout } from './layouts/TechCentreLayout'
import { typologyMat, type TypologyProps } from './types'

const QUAD_OFFSETS: [number, number][] = [
  [-0.32, 0.28],
  [0.32, 0.28],
  [-0.32, -0.28],
  [0.32, -0.28],
]

/** B10 · Rack Hall — four tech centres filling the floor plate */
export function RackHall({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const plate = floorPlateSize('B10')
  const cellScale = blueprintFitScale(8, 6, { w: plate.w * 0.46, d: plate.d * 0.46 }, 0.88)

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body} variant="grid">
      {QUAD_OFFSETS.map(([x, z], i) => (
        <group key={i} position={[x, 0.01, z]} scale={cellScale}>
          <TechCentreLayout theme={theme} accent={accent} entered={entered} active={lit} />
        </group>
      ))}

      <Html center position={[0.38, 0.22, 0.14]} style={{ pointerEvents: 'none' }}>
        <div className={`scene-label scene-label--tiny ${lit ? 'scene-label--active' : ''}`}>PRINT</div>
      </Html>
    </FloorPlate>
  )
}
