import { Fragment } from 'react'
import { bpBox } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 8
const ROOM_D = 6
const CONSOLES: [number, number][] = [
  [0.5, 1.5],
  [2.8, 1.5],
  [0.5, 3.8],
  [2.8, 3.8],
]

function BpMesh({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <mesh position={box.position}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial color={color} emissive={emissive ?? '#000'} emissiveIntensity={emissiveIntensity} />
    </mesh>
  )
}

/** B10 tech centre · command wall + operator consoles + print bay */
export function TechCentreLayout({
  theme,
  accent,
  entered,
  active,
  scale = 1,
}: TypologyProps & { active?: boolean; scale?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group scale={scale}>
      <BpMesh box={bpBox(0, 0, 0, ROOM_W, 0.12, 3.5, ROOM_W, ROOM_D)} color={m.pal.graphite} />
      <BpMesh
        box={bpBox(0.3, 0.15, 0.35, 7.4, 0.09, 2.6, ROOM_W, ROOM_D)}
        color={m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.1}
      />

      {Array.from({ length: 8 }, (_, i) => {
        const px = 0.3 + i * 0.925
        return (
          <Fragment key={i}>
            <BpMesh
              box={bpBox(px, 0.14, 0.45, 0.88, 0.07, 1.1, ROOM_W, ROOM_D)}
              color={lit ? accent : m.pal.resin}
              emissive={lit ? accent : undefined}
              emissiveIntensity={0.15}
            />
            <BpMesh
              box={bpBox(px, 0.14, 1.72, 0.88, 0.07, 1.1, ROOM_W, ROOM_D)}
              color={lit ? accent : m.pal.resin}
              emissive={lit ? accent : undefined}
              emissiveIntensity={0.12}
            />
          </Fragment>
        )
      })}

      {CONSOLES.map(([x, y], i) => (
        <Fragment key={i}>
          <BpMesh box={bpBox(x, y, 0, 1.9, 1.05, 0.62, ROOM_W, ROOM_D)} color={m.alt} />
          <BpMesh
            box={bpBox(x + 0.32, y + 0.06, 0.62, 1.26, 0.09, 0.88, ROOM_W, ROOM_D)}
            color={m.pal.glass}
            emissive={lit ? accent : undefined}
            emissiveIntensity={0.1}
          />
          <BpMesh box={bpBox(x + 0.45, y + 1.25, 0, 0.72, 0.72, 0.46, ROOM_W, ROOM_D)} color={m.body} />
        </Fragment>
      ))}

      <BpMesh box={bpBox(5.5, 2.0, 0, 2.2, 2.5, 0.68, ROOM_W, ROOM_D)} color={m.alt} />
      {(
        [
          [5.6, 4.6],
          [6.5, 4.6],
          [5.6, 1.8],
          [6.5, 1.8],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <BpMesh key={i} box={bpBox(x, y, 0, 0.62, 0.62, 0.44, ROOM_W, ROOM_D)} color={m.pal.concrete} />
      ))}

      <BpMesh
        box={bpBox(6.8, 4.2, 0.62, 0.14, 0.02, 0.06, ROOM_W, ROOM_D)}
        color={lit ? m.warm : m.pal.concrete}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.45}
      />
    </group>
  )
}
