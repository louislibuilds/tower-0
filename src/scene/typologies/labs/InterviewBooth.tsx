import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

function BpMesh({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
  metalness = 0.2,
  opacity = 1,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
  metalness?: number
  opacity?: number
}) {
  return (
    <mesh position={box.position}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? '#000'}
        emissiveIntensity={emissiveIntensity}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}

/** 003 · Interview Booth ??partition + desk + mic + waveform + seat */
export function InterviewBooth({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const wave = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const x = -0.07 + i * 0.012
        const y = 0.14 + Math.sin(i * 0.75) * 0.028
        return new THREE.Vector3(x, y, -0.02)
      }),
    [],
  )

  const partition = bpBox(0.4, 0.14, 0.55, 2.5, 0.09, 1.45)
  const desk = bpBox(1.0, 0.8, 0, 2.0, 1.0, 0.62)
  const monitor = bpBox(1.5, 0.85, 0.62, 0.98, 0.09, 0.75)
  const chair = bpBox(1.2, 1.9, 0, 0.72, 0.72, 0.44)
  const chairBack = bpBox(1.2, 2.58, 0.44, 0.72, 0.1, 0.52)
  const lampPole = bpBox(2.3, 2.1, 0, 0.12, 0.12, 1.45)
  const lampHead = bpBox(2.08, 2.02, 1.45, 0.54, 0.32, 0.3)
  const sideDesk = bpBox(1.0, 3.2, 0, 2.0, 1.0, 0.62)
  const sideScreen = bpBox(1.5, 3.3, 0.67, 0.88, 0.09, 0.72)

  return (
    <group>
      <BpMesh box={partition} color={lit ? accent : m.alt} emissive={lit ? accent : undefined} emissiveIntensity={0.12} />
      <BpMesh box={desk} color={m.body} />
      <BpMesh box={monitor} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.2} />
      <BpMesh box={chair} color={m.pal.concrete} />
      <BpMesh box={chairBack} color={m.pal.resin} />
      <BpMesh box={lampPole} color={m.edge} metalness={0.85} />
      <BpMesh box={lampHead} color={m.body} />
      <mesh position={[0.03, 0.1, 0.045]}>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 6]} />
        <meshStandardMaterial color={m.edge} metalness={0.85} />
      </mesh>
      <BpMesh box={sideDesk} color={m.body} opacity={0.92} />
      <BpMesh box={sideScreen} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.18} />
      <Line points={wave} color={lit ? accent : m.edge} lineWidth={lit ? 2 : 1} />
    </group>
  )
}
