import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { Theme } from '../../context/SiteContext'
import { getProgramFloor, programBaseY } from '../towerGeometry'
import { getScenePalette } from '../palette'

interface CircuitBaseProps {
  extrude: number
  theme: Theme
  active: boolean
}

export function CircuitBase({ theme, active }: CircuitBaseProps) {
  const pal = getScenePalette(theme)
  const dark = theme === 'dark'
  const accent = active ? (dark ? pal.neonBright : pal.signal) : dark ? pal.neon : pal.grid
  const boardColor = dark ? pal.bpFace : pal.shade
  const b10Base = programBaseY(getProgramFloor('B10'))

  const traces = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let x = -3; x <= 3; x += 0.5) {
      runs.push([new THREE.Vector3(x, 0.04, -2), new THREE.Vector3(x + 0.3, 0.04, -1.5)])
    }
    for (let z = -2; z <= 2; z += 0.6) {
      runs.push([new THREE.Vector3(-3, 0.04, z), new THREE.Vector3(-2, 0.04, z + 0.4)])
      runs.push([new THREE.Vector3(2, 0.04, z), new THREE.Vector3(3, 0.04, z - 0.3)])
    }
    return runs
  }, [])

  const chips = useMemo(
    () =>
      [
        [-1.2, -0.8],
        [0.8, 0.5],
        [-0.3, 1.0],
        [1.5, -0.5],
      ] as [number, number][],
    [],
  )

  return (
    <group position={[0, b10Base - 0.08, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} raycast={() => null}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial
          color={boardColor}
          roughness={0.85}
          metalness={dark ? 0.2 : 0.15}
          transparent={dark}
          opacity={dark ? 0.35 : 1}
        />
      </mesh>

      {traces.map((pts, i) => (
        <Line key={i} points={pts} color={accent} lineWidth={0.8} transparent opacity={dark ? 0.45 : 0.55} />
      ))}

      {chips.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <boxGeometry args={[0.5, 0.08, 0.35]} />
          <meshStandardMaterial color={pal.concrete} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}
