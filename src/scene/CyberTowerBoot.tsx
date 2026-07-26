import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { DUR, EASE_INK, EASE_SITE } from './motion'

interface BootControllerProps {
  reducedMotion: boolean
  onComplete: () => void
  onExtrude: (v: number) => void
  onInk: (v: number) => void
  children: React.ReactNode
}

export function BootController({
  reducedMotion,
  onComplete,
  onExtrude,
  onInk,
  children,
}: BootControllerProps) {
  const done = useRef(false)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (done.current) return
    if (reducedMotion) {
      done.current = true
      onInk(1)
      onExtrude(1)
      onComplete()
      invalidate()
      return
    }
    const state = { ink: 0, extrude: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      },
    })
    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInk(state.ink)
        invalidate()
      },
    }).to(state, {
      extrude: 1,
      duration: DUR.extrude,
      ease: EASE_SITE,
      onUpdate: () => {
        onExtrude(state.extrude)
        invalidate()
      },
    })
    return () => {
      tl.kill()
    }
  }, [reducedMotion, onComplete, onExtrude, onInk, invalidate])

  return <>{children}</>
}
