import { useCallback, useEffect, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import type { Mesh } from 'three'
import { WireBox } from './WireBox'
import { markTowerPick } from './pickVolume'

/** Slightly larger than band shell — easier tower-view picks on thin proportional bands */
const HIT_PAD = 1.32

interface FloorPickTargetProps {
  size: [number, number, number]
  accent: string
  hovered?: boolean
  enabled?: boolean
  hitPad?: number
  onClick: () => void
  onHover: (over: boolean) => void
}

/** Whole-band pick volume + hover-only WireBox guide */
export function FloorPickTarget({
  size,
  accent,
  hovered = false,
  enabled = true,
  hitPad = HIT_PAD,
  onClick,
  onHover,
}: FloorPickTargetProps) {
  const [localHover, setLocalHover] = useState(false)
  const lit = hovered || localHover
  const hitSize: [number, number, number] = [
    size[0] * hitPad,
    size[1] * hitPad,
    size[2] * hitPad,
  ]

  const bindPick = useCallback((mesh: Mesh | null) => {
    markTowerPick(mesh)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setLocalHover(false)
      onHover(false)
    }
  }, [enabled, onHover])

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

  return (
    <group>
      {lit && (
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
        ref={bindPick}
        raycast={enabled ? undefined : () => null}
        onClick={(e) => {
          if (!enabled) return
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={enter}
        onPointerOut={leave}
      >
        <boxGeometry args={hitSize} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}
