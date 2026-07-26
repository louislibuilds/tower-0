import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { usePalette } from './InkEdges'

interface SurveyGridProps {
  extent?: number
  step?: number
  opacity?: number
}

/** Blueprint survey grid — fades at edges, used during boot. */
export function SurveyGrid({ extent = 10, step = 1, opacity = 0.35 }: SurveyGridProps) {
  const pal = usePalette()
  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = []
    for (let i = -extent; i <= extent; i += step) {
      pts.push([new THREE.Vector3(i, 0.005, -extent), new THREE.Vector3(i, 0.005, extent)])
      pts.push([new THREE.Vector3(-extent, 0.005, i), new THREE.Vector3(extent, 0.005, i)])
    }
    return pts
  }, [extent, step])

  return (
    <group>
      {lines.map((p, i) => (
        <Line key={i} points={p} color={pal.grid} lineWidth={1} transparent opacity={opacity} />
      ))}
    </group>
  )
}
