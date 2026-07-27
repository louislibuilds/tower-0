import { Fragment } from 'react'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox, bpLine } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 6
const ROOM_D = 5

const RACKS: [number, number][] = [
  [0.2, 0.2],
  [0.2, 1.4],
  [0.2, 2.6],
  [1.6, 0.2],
  [1.6, 1.4],
  [1.6, 2.6],
  [3.0, 0.2],
  [3.0, 1.4],
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

/** B2 infrastructure · server rack grid + chilled aisle */
export function InfraRackLayout({
  theme,
  accent,
  entered,
  active,
  scale = 1,
}: TypologyProps & { active?: boolean; scale?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  const uplinks = useMemo(
    () =>
      [0.7, 2.1, 3.5].map((x) => {
        const seg = bpLine(x, 0.5, 2.2, x, 4.5, 2.2, ROOM_W, ROOM_D)
        return { key: x, seg }
      }),
    [],
  )

  return (
    <group scale={scale}>
      <BpMesh box={bpBox(0, 0, 0, ROOM_W, 0.12, 3.8, ROOM_W, ROOM_D)} color={m.pal.graphite} />
      <BpMesh box={bpBox(0, 0, 0, 0.12, ROOM_D, 3.8, ROOM_W, ROOM_D)} color={m.pal.graphite} />

      {RACKS.map(([x, y], i) => (
        <Fragment key={i}>
          <BpMesh box={bpBox(x, y, 0, 1.0, 0.9, 3.4, ROOM_W, ROOM_D)} color={m.alt} />
          {Array.from({ length: 7 }, (_, j) => (
            <BpMesh
              key={j}
              box={bpBox(x + 0.06, y + 0.06, j * 0.44 + 0.12, 0.88, 0.78, 0.3, ROOM_W, ROOM_D)}
              color={j % 2 ? m.pal.glass : m.body}
              emissive={lit && j % 2 ? accent : undefined}
              emissiveIntensity={0.12}
            />
          ))}
        </Fragment>
      ))}

      <BpMesh
        box={bpBox(4.0, 0.5, 0, 1.6, 1.1, 1.85, ROOM_W, ROOM_D)}
        color={m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.08}
      />
      <BpMesh
        box={bpBox(4.0, 3.5, 0, 1.5, 0.65, 0.22, ROOM_W, ROOM_D)}
        color={lit ? m.warm : m.pal.resin}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.1}
      />

      {uplinks.map(({ key, seg }) => (
        <Line
          key={key}
          points={[new THREE.Vector3(...seg[0]), new THREE.Vector3(...seg[1])]}
          color={lit ? accent : m.pal.graphite}
          lineWidth={1}
          transparent
          opacity={0.5}
          dashed
          dashSize={0.04}
          gapSize={0.03}
        />
      ))}
    </group>
  )
}
