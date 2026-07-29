import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { InkEdges } from './InkEdges'
import { usePalette } from './InkEdges'

interface PlinthProps {
  width: number
  depth: number
  thickness?: number
  hover: boolean
  onHover?: (h: boolean) => void
  onClick?: () => void
  children?: React.ReactNode
}

/** Exhibit plinth ??resin slab with signal boundary on hover. */
export function Plinth({
  width,
  depth,
  thickness = 0.08,
  hover,
  onHover,
  onClick,
  children,
}: PlinthProps) {
  const pal = usePalette()
  const y = thickness / 2 + 0.001
  const boundary = useMemo(() => {
    const hw = width / 2
    const hd = depth / 2
    return [
      new THREE.Vector3(-hw, y, -hd),
      new THREE.Vector3(hw, y, -hd),
      new THREE.Vector3(hw, y, hd),
      new THREE.Vector3(-hw, y, hd),
      new THREE.Vector3(-hw, y, -hd),
    ]
  }, [width, depth, y])

  return (
    <group
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover?.(true)
      }}
      onPointerOut={() => {
        onHover?.(false)
      }}
    >
      <mesh position={[0, y, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color={pal.panel} transparent opacity={0.85} />
        <InkEdges lineWidth={hover ? 2 : 1} color={hover ? pal.accent : pal.fg} />
      </mesh>
      <Line
        points={boundary}
        color={hover ? pal.accent : pal.fg}
        lineWidth={hover ? 2 : 1}
        transparent
        opacity={hover ? 1 : 0.65}
      />
      <group position={[0, thickness + 0.01, 0]}>{children}</group>
    </group>
  )
}
