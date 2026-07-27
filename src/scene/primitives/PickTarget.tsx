import { useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { WireBox } from './WireBox'

interface PickTargetProps {
  position: [number, number, number]
  size: [number, number, number]
  active?: boolean
  hovered?: boolean
  accent: string
  guideColor?: string
  onClick: () => void
  onHover: (over: boolean) => void
}

/** Invisible meshes must stay visible for raycasting — use opacity 0 instead. */
const HIT_PAD = 1.28

/** Pick volume + overlay guide; local hover for responsive wire highlight */
export function PickTarget({
  position,
  size,
  active = false,
  hovered = false,
  accent,
  guideColor = '#8a9098',
  onClick,
  onHover,
}: PickTargetProps) {
  const [localHover, setLocalHover] = useState(false)
  const lit = active || hovered || localHover
  const hitSize: [number, number, number] = [
    size[0] * HIT_PAD,
    size[1] * HIT_PAD,
    size[2] * HIT_PAD,
  ]

  const enter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setLocalHover(true)
    onHover(true)
  }

  const leave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setLocalHover(false)
    onHover(false)
  }

  return (
    <group position={position}>
      <WireBox
        size={size}
        color={lit ? accent : guideColor}
        fillOpacity={active ? 0.12 : lit ? 0.06 : 0}
        fillColor={accent}
        lineOpacity={active ? 1 : lit ? 0.95 : 0.48}
        overlay
        passive
      />
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={enter}
        onPointerMove={enter}
        onPointerOut={leave}
      >
        <boxGeometry args={hitSize} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}
