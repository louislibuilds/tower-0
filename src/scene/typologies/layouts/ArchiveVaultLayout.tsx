import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox, bpFloorBox, bpLine } from '../blueprintLayout'
import { ghostLit } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

const CABINETS: [number, number][] = [
  [0.2, 0.2],
  [1.3, 0.2],
  [2.4, 0.2],
  [3.5, 0.2],
  [4.6, 0.2],
  [0.2, 1.5],
  [1.3, 1.5],
  [2.4, 1.5],
  [3.5, 1.5],
]

const ROOM_W = 6
const ROOM_D = 5

function BpMesh({
  box,
  color,
  thin = false,
  emissive,
  emissiveIntensity = 0,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  thin?: boolean
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <TypologyBpMesh box={box} color={color} thin={thin} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  )
}

/** 99F archive · filing cabinet grid + review table + stacked records */
export function ArchiveVaultLayout({
  theme,
  accent,
  entered,
  active,
  thin,
  scale = 1,
}: TypologyProps & { active?: boolean; scale?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)

  const drawerLines = useMemo(
    () =>
      CABINETS.flatMap(([x, y], i) =>
        ([0.62, 1.08, 1.54] as number[]).map((z, j) => {
          const seg = bpLine(x, y + 0.55, z, x + 0.85, y + 0.55, z, ROOM_W, ROOM_D)
          return { key: `${i}-${j}`, seg }
        }),
      ),
    [],
  )

  const table = bpBox(1.5, 2.9, 0, 2.5, 1.4, 0.65, ROOM_W, ROOM_D)
  const folders = [0, 1, 2].map((i) => bpBox(1.7 + i * 0.72, 3.1, 0.65, 0.55, 0.88, 0.16, ROOM_W, ROOM_D))
  const stackA = bpBox(4.4, 3.5, 0, 0.95, 0.95, 0.72, ROOM_W, ROOM_D)
  const stackB = bpBox(4.4, 3.5, 0.72, 0.95, 0.95, 0.72, ROOM_W, ROOM_D)

  return (
    <group scale={scale}>
      <BpMesh box={bpFloorBox(ROOM_W, ROOM_D)} color={m.body} thin={thin} />
      {CABINETS.map(([x, y], i) => {
        const cab = bpBox(x, y, 0, 0.85, 0.55, 1.85, ROOM_W, ROOM_D)
        return <BpMesh key={i} box={cab} color={m.alt} thin={thin} />
      })}
      {!thin &&
        drawerLines.map(({ key, seg }) => (
          <Line
            key={key}
            points={[new THREE.Vector3(...seg[0]), new THREE.Vector3(...seg[1])]}
            color={lit ? accent : m.pal.fg}
            lineWidth={1}
            transparent
            opacity={0.55}
            raycast={() => null}
          />
        ))}
      <BpMesh box={table} color={m.body} thin={thin} />
      {folders.map((folder, i) => (
        <BpMesh
          key={i}
          box={folder}
          thin={thin}
          color={lit ? m.warm : '#d8d4cc'}
          emissive={lit ? m.warm : undefined}
          emissiveIntensity={0.1}
        />
      ))}
      <BpMesh
        box={stackA}
        thin={thin}
        color={lit ? m.warm : m.pal.mass}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.08}
      />
      <BpMesh
        box={stackB}
        thin={thin}
        color={lit ? m.warm : m.pal.mass}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.08}
      />
    </group>
  )
}
