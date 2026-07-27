import { Fragment } from 'react'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox, bpLine } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 11
const ROOM_D = 4
const STATIONS = [0.3, 2.9, 5.5, 8.1] as const

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

/** 23F factory · conveyor belt + four assembly stations */
export function FactoryLineLayout({
  theme,
  accent,
  entered,
  active,
  scale = 1,
}: TypologyProps & { active?: boolean; scale?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  const beltPosts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const seg = bpLine(i + 0.5, 1.5, 0.22, i + 0.5, 2.5, 0.22, ROOM_W, ROOM_D)
        return { key: i, seg }
      }),
    [],
  )

  return (
    <group scale={scale}>
      {Array.from({ length: 11 }, (_, i) => (
        <BpMesh
          key={i}
          box={bpBox(i, 1.5, 0, 1, 1, 0.22, ROOM_W, ROOM_D)}
          color={m.pal.concrete}
          emissive={lit ? accent : undefined}
          emissiveIntensity={0.04}
        />
      ))}

      {beltPosts.map(({ key, seg }) => (
        <Line
          key={key}
          points={[new THREE.Vector3(...seg[0]), new THREE.Vector3(...seg[1])]}
          color={m.pal.graphite}
          lineWidth={1}
          transparent
          opacity={0.45}
          dashed
          dashSize={0.04}
          gapSize={0.03}
        />
      ))}

      {STATIONS.map((sx, si) => (
        <Fragment key={si}>
          <BpMesh box={bpBox(sx, 0.2, 0, 1.5, 1, 0.62, ROOM_W, ROOM_D)} color={m.alt} />
          <BpMesh
            box={bpBox(sx + 0.25, 0.25, 0.62, 1.0, 0.09, 0.82, ROOM_W, ROOM_D)}
            color={m.pal.glass}
            emissive={lit ? accent : undefined}
            emissiveIntensity={0.1}
          />
          <BpMesh box={bpBox(sx + 0.65, 0.5, 0.62, 0.1, 0.1, 1.1, ROOM_W, ROOM_D)} color={m.pal.alum} />
          <BpMesh box={bpBox(sx + 0.28, 0.45, 1.72, 0.82, 0.14, 0.1, ROOM_W, ROOM_D)} color={m.pal.alum} />
          <BpMesh box={bpBox(sx + 0.26, 0.36, 1.62, 0.14, 0.14, 0.22, ROOM_W, ROOM_D)} color={m.pal.graphite} />
          <BpMesh
            box={bpBox(sx, 2.72, 0, 1.5, 0.35, 0.18, ROOM_W, ROOM_D)}
            color={lit ? m.pal.chicken : m.pal.resin}
            emissive={lit ? m.pal.chicken : undefined}
            emissiveIntensity={0.08}
          />
        </Fragment>
      ))}

      {[1.8, 4.5, 7.2].map((px, i) => (
        <BpMesh
          key={i}
          box={bpBox(px, 1.6, 0.22, 0.52, 0.82, 0.52, ROOM_W, ROOM_D)}
          color={lit ? m.pal.chicken : '#d8d4cc'}
        />
      ))}
    </group>
  )
}
