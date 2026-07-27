import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox, bpLine } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

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

/** 001 · Launch Pad — arena runway + observer pod + signal tower */
export function LaunchPadStation({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const roomW = 8
  const roomD = 5

  const runway = bpBox(3.85, 0.5, 0, 0.3, 4, 0.72, roomW, roomD)
  const netPostA = bpBox(3.82, 0.38, 0, 0.14, 0.14, 0.9, roomW, roomD)
  const netPostB = bpBox(3.82, 4.46, 0, 0.14, 0.14, 0.9, roomW, roomD)
  const observer = bpBox(0.2, 1.6, 0, 0.85, 0.85, 0.92, roomW, roomD)
  const observerSeat = bpBox(0.5, 1.66, 0.92, 0.42, 0.42, 0.52, roomW, roomD)
  const signalTower = bpBox(7.2, 1.5, 0, 0.22, 2.2, 1.8, roomW, roomD)

  const courtLines = useMemo(() => {
    const segs: [[number, number, number], [number, number, number]][] = [
      bpLine(0.5, 0.5, 0, 7.5, 0.5, 0, roomW, roomD),
      bpLine(0.5, 4.5, 0, 7.5, 4.5, 0, roomW, roomD),
      bpLine(0.5, 0.5, 0, 0.5, 4.5, 0, roomW, roomD),
      bpLine(7.5, 0.5, 0, 7.5, 4.5, 0, roomW, roomD),
      bpLine(4.0, 0.5, 0, 4.0, 4.5, 0, roomW, roomD),
    ]
    return segs.map(([a, b]) => [new THREE.Vector3(...a), new THREE.Vector3(...b)])
  }, [])

  const launchPath = useMemo(
    () => [new THREE.Vector3(-0.04, 0.06, 0.04), new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0.04, 0.14, -0.04)],
    [],
  )

  return (
    <group scale={0.62}>
      {courtLines.map((pts, i) => (
        <Line key={i} points={pts} color={m.pal.graphite} lineWidth={1} transparent opacity={0.45} />
      ))}
      <BpMesh box={runway} color={m.body} />
      <BpMesh box={netPostA} color={m.edge} />
      <BpMesh box={netPostB} color={m.edge} />
      <BpMesh box={observer} color={m.alt} />
      <BpMesh box={observerSeat} color={m.pal.resin} />
      <BpMesh
        box={signalTower}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.22}
      />
      <mesh position={[0, 0.14, -0.04]}>
        <boxGeometry args={[0.12, 0.08, 0.015]} />
        <meshStandardMaterial
          color={lit ? accent : m.pal.glass}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
      <Line points={launchPath} color={lit ? accent : m.edge} lineWidth={lit ? 2 : 1} />
    </group>
  )
}
