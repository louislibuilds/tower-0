import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { EASE_INK } from '../motion'
import { partialPolyline } from './geometry'
import { usePalette } from './InkEdges'

interface FlowTraceProps {
  restRuns: THREE.Vector3[][]
  path: THREE.Vector3[]
  active: boolean
  reducedMotion?: boolean
  duration?: number
}

/** Graphite wiring at rest; signal current traces path on hover/attention. */
export function FlowTrace({
  restRuns,
  path,
  active,
  reducedMotion = false,
  duration = 1.0,
}: FlowTraceProps) {
  const pal = usePalette()
  const [progress, setProgress] = useState(0)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      invalidate()
      return
    }
    if (reducedMotion) {
      setProgress(1)
      invalidate()
      return
    }
    const state = { p: 0 }
    const tween = gsap.to(state, {
      p: 1,
      duration,
      ease: EASE_INK,
      onUpdate: () => {
        setProgress(state.p)
        invalidate()
      },
    })
    return () => {
      tween.kill()
    }
  }, [active, reducedMotion, duration, invalidate])

  const traced = useMemo(() => partialPolyline(path, progress), [path, progress])

  return (
    <group>
      {restRuns.map((run, i) => (
        <Line key={i} points={run} color={pal.fg} lineWidth={1} transparent opacity={0.45} />
      ))}
      {active && progress > 0.001 && (
        <Line points={traced} color={pal.accent} lineWidth={2} transparent opacity={0.95} />
      )}
    </group>
  )
}
