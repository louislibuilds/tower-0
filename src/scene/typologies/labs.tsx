import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { ComponentType } from 'react'
import { typologyMat, type TypologyProps } from './types'

/** 001 · Launch Pad — ramp platform + screen wall */
export function LaunchPad({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.04, 0.02]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.16, 0.04, 0.12]} />
        <meshStandardMaterial color={m.alt} />
      </mesh>
      <mesh position={[0, 0.14, -0.06]}>
        <boxGeometry args={[0.18, 0.12, 0.02]} />
        <meshStandardMaterial
          color={lit ? accent : m.pal.glass}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.25 : 0}
        />
      </mesh>
      {[-0.06, 0, 0.06].map((x) => (
        <mesh key={x} position={[x, 0.08, -0.05]}>
          <boxGeometry args={[0.04, 0.06, 0.01]} />
          <meshStandardMaterial color={m.pal.ink} />
        </mesh>
      ))}
    </group>
  )
}

/** 002 · Container Bay — crates on conveyor segment */
export function ContainerBay({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.2, 0.04, 0.1]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      {[
        [-0.06, 0.08, 0],
        [0.06, 0.1, 0.02],
        [0, 0.06, -0.04],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color={lit && i === 0 ? m.pal.chicken : m.pal.resin}
            emissive={lit && i === 0 ? m.pal.chicken : '#000'}
            emissiveIntensity={lit && i === 0 ? 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

/** 003 · Booth — partition + mic + waveform */
export function Booth({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const wave = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const x = -0.08 + i * 0.023
        const y = 0.16 + Math.sin(i * 0.9) * 0.03
        return new THREE.Vector3(x, y, -0.04)
      }),
    [],
  )

  return (
    <group>
      <mesh position={[-0.06, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.18, 0.12]} />
        <meshStandardMaterial color={m.alt} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.04, 0.08, 0.04]}>
        <boxGeometry args={[0.08, 0.04, 0.06]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      <mesh position={[0.04, 0.14, 0.06]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 6]} />
        <meshStandardMaterial color={m.edge} metalness={0.8} />
      </mesh>
      <Line points={wave} color={lit ? accent : m.edge} lineWidth={1.5} />
    </group>
  )
}

/** 004 · Capture Stage — ring light + mannequin */
export function CaptureStage({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 24]} />
        <meshStandardMaterial
          color={lit ? m.pal.chicken : m.pal.concrete}
          emissive={lit ? m.pal.chicken : '#000'}
          emissiveIntensity={lit ? 0.35 : 0}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <capsuleGeometry args={[0.035, 0.1, 4, 8]} />
        <meshStandardMaterial color={m.pal.glass} wireframe />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={lit ? accent : m.alt}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
    </group>
  )
}

/** 005 · Document Foundry — paper stack + printer */
export function DocumentFoundry({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.14, 0.16, 0.12]} />
        <meshStandardMaterial color={m.alt} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.04, 0.08]}>
        <boxGeometry args={[0.1, 0.02, 0.06]} />
        <meshStandardMaterial
          color={lit ? m.pal.chicken : m.pal.concrete}
          emissive={lit ? m.pal.chicken : '#000'}
          emissiveIntensity={lit ? 0.4 : 0}
        />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.06 + i * 0.03, 0.02 + i * 0.012, -0.04]}>
          <boxGeometry args={[0.08, 0.01, 0.06]} />
          <meshStandardMaterial color="#d8d4cc" />
        </mesh>
      ))}
    </group>
  )
}

export type LabTypologySlug =
  | 'unihack-2026'
  | 'cloud-computing'
  | 'nlp'
  | 'dl'
  | 'kata'

const LAB_TYPOLOGY: Record<LabTypologySlug, ComponentType<TypologyProps>> = {
  'unihack-2026': LaunchPad,
  'cloud-computing': ContainerBay,
  nlp: Booth,
  dl: CaptureStage,
  kata: DocumentFoundry,
}

export function LabTypology({ slug, ...props }: TypologyProps & { slug: string }) {
  const Comp = LAB_TYPOLOGY[slug as LabTypologySlug]
  if (!Comp) return null
  return <Comp {...props} />
}

/** Mini preview for bench row overview */
export function LabTypologyPreview({ slug, ...props }: TypologyProps & { slug: string }) {
  return (
    <group scale={0.85}>
      <LabTypology slug={slug} {...props} />
    </group>
  )
}
