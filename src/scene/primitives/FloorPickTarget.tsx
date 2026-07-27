import { useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { WireBox } from './WireBox'

/** Slightly larger than band shell — easier tower-view picks on upper floors */
const HIT_PAD = 1.14

interface FloorPickTargetProps {
  size: [number, number, number]
  accent: string
  hovered?: boolean
  enabled?: boolean
  onClick: () => void
  onHover: (over: boolean) => void
}

/** Whole-band pick volume + hover WireBox guide (matches vault/library PickTarget) */
export function FloorPickTarget({
  size,
  accent,
  hovered = false,
  enabled = true,
  onClick,
  onHover,
}: FloorPickTargetProps) {
  const [localHover, setLocalHover] = useState(false)
  const lit = hovered || localHover
  const hitSize: [number, number, number] = [
    size[0] * HIT_PAD,
    size[1] * HIT_PAD,
    size[2] * HIT_PAD,
  ]

  const enter = (e: ThreeEvent<PointerEvent>) => {
    if (!enabled) return
    e.stopPropagation()
    setLocalHover(true)
    onHover(true)
  }

  const leave = (e: ThreeEvent<PointerEvent>) => {
    if (!enabled) return
    e.stopPropagation()
    setLocalHover(false)
    onHover(false)
  }

  const showGuide = lit

  return (
    <group>
      {showGuide && (
        <WireBox
          size={size}
          color={accent}
          fillOpacity={0.07}
          fillColor={accent}
          lineOpacity={0.95}
          overlay
          passive
        />
      )}
      <mesh
        raycast={enabled ? undefined : () => null}
        onClick={(e) => {
          if (!enabled) return
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
