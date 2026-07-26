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

/** Exhibit plinth — resin slab with signal boundary on hover. */
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
        document.body.style.cursor = 'crosshair'
        onHover?.(true)
      }}
      onPointerOut={() => {
        document.body.style.cursor = ''
        onHover?.(false)
      }}
    >
      <mesh position={[0, y, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color={pal.resin} transparent opacity={0.85} />
        <InkEdges lineWidth={hover ? 2 : 1} color={hover ? pal.signal : pal.graphite} />
      </mesh>
      <Line
        points={boundary}
        color={hover ? pal.signal : pal.graphite}
        lineWidth={hover ? 2 : 1}
        transparent
        opacity={hover ? 1 : 0.65}
      />
      <group position={[0, thickness + 0.01, 0]}>{children}</group>
    </group>
  )
}
