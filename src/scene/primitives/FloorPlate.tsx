import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

interface FloorPlateProps {
  width: number
  depth: number
  color: string
  floorColor: string
  /** solid slab (default) or transparent grid lines only */
  variant?: 'solid' | 'grid'
  gridStep?: number
  children?: React.ReactNode
}

/** Flat exhibit slab — top surface at y=0, flush with band floor */
export function FloorPlate({
  width: w,
  depth: d,
  color,
  floorColor,
  variant = 'solid',
  gridStep = 0.12,
  children,
}: FloorPlateProps) {
  const thickness = 0.006
  const edge = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, thickness, d)), [w, d, thickness])

  const gridLines = useMemo(() => {
    if (variant !== 'grid') return []
    const hw = w / 2
    const hd = d / 2
    const pts: THREE.Vector3[][] = []
    for (let x = -hw; x <= hw + 0.001; x += gridStep) {
      pts.push([new THREE.Vector3(x, 0.002, -hd), new THREE.Vector3(x, 0.002, hd)])
    }
    for (let z = -hd; z <= hd + 0.001; z += gridStep) {
      pts.push([new THREE.Vector3(-hw, 0.002, z), new THREE.Vector3(hw, 0.002, z)])
    }
    return pts
  }, [variant, w, d, gridStep])

  return (
    <group>
      {variant === 'solid' && (
        <mesh position={[0, -thickness / 2, 0]}>
          <boxGeometry args={[w, thickness, d]} />
          <meshStandardMaterial color={floorColor} transparent opacity={0.92} roughness={0.85} />
        </mesh>
      )}

      {variant === 'grid' &&
        gridLines.map((p, i) => (
          <Line key={i} points={p} color={color} lineWidth={1} transparent opacity={0.28} />
        ))}

      <lineSegments geometry={edge} position={[0, -thickness / 2, 0]}>
        <lineBasicMaterial color={color} transparent opacity={variant === 'grid' ? 0.42 : 0.5} />
      </lineSegments>
      <group position={[0, 0.006, 0]}>{children}</group>
    </group>
  )
}
