import gsap from 'gsap'
import { useEffect, useRef } from 'react'

/** Smooth 0→1 progress when entering room focus (zoom-in feel). */
export function useZoomMorph(active: boolean, duration = 0.95) {
  const progress = useRef(active ? 1 : 0)
  const tween = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    tween.current?.kill()
    const state = { p: progress.current }
    tween.current = gsap.to(state, {
      p: active ? 1 : 0,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        progress.current = state.p
      },
    })
    return () => {
      tween.current?.kill()
    }
  }, [active, duration])

  return progress
}

/** Lerp helper for zoom morph groups. */
export function lerpZoom(a: number, b: number, t: number) {
  return a + (b - a) * t
}
