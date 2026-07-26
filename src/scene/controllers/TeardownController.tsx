import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { DUR, EASE_INK, EASE_SITE } from '../motion'

interface TeardownControllerProps {
  reducedMotion: boolean
  active: boolean
  onComplete: () => void
  onExtrude: (v: number) => void
  onInk: (v: number) => void
  onFill?: (v: number) => void
  onBlueprint?: (v: number) => void
  children: React.ReactNode
}

/** Exit: solid → wireframe → blueprint → plan → void (five registers). */
export function TeardownController({
  reducedMotion,
  active,
  onComplete,
  onExtrude,
  onInk,
  onFill,
  onBlueprint,
  children,
}: TeardownControllerProps) {
  const done = useRef(false)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (!active) {
      done.current = false
      return
    }
    if (done.current) return

    if (reducedMotion) {
      done.current = true
      onFill?.(0)
      onBlueprint?.(1)
      onExtrude(0)
      onInk(0)
      onComplete()
      invalidate()
      return
    }

    const state = { fill: 1, blueprint: 0, extrude: 1, ink: 1 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      },
    })

    tl.to(state, {
      fill: 0.06,
      duration: DUR.teardownFill,
      ease: EASE_SITE,
      onUpdate: () => {
        onFill?.(state.fill)
        invalidate()
      },
    })
      .to(state, {
        blueprint: 1,
        duration: DUR.teardownBlueprint,
        ease: EASE_SITE,
        onUpdate: () => {
          onBlueprint?.(state.blueprint)
          invalidate()
        },
      })
      .to(state, {
        extrude: 0,
        duration: DUR.teardownCollapse,
        ease: EASE_SITE,
        onUpdate: () => {
          onExtrude(state.extrude)
          invalidate()
        },
      })
      .to(state, {
        ink: 0,
        duration: DUR.teardownInk,
        ease: EASE_INK,
        onUpdate: () => {
          onInk(state.ink)
          invalidate()
        },
      })
      .to({}, { duration: DUR.teardownVoid })

    return () => {
      tl.kill()
    }
  }, [active, reducedMotion, onComplete, onExtrude, onInk, onFill, onBlueprint, invalidate])

  return <>{children}</>
}
