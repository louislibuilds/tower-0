import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { Theme } from '../../context/SiteContext'
import { getScenePalette } from '../palette'

interface CircuitBaseProps {
  extrude: number
  theme: Theme
  active: boolean
}

export function CircuitBase({ extrude, theme, active }: CircuitBaseProps) {
  const pal = getScenePalette(theme)
  const accent = active ? pal.signal : pal.grid
  const boardColor = pal.shade

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
    <group position={[0, -0.5 * extrude, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color={boardColor} roughness={0.85} metalness={0.15} />
      </mesh>

      {traces.map((pts, i) => (
        <Line key={i} points={pts} color={accent} lineWidth={0.8} transparent opacity={0.55} />
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
