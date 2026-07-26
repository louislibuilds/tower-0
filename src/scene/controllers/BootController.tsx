import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { DUR, EASE_INK, EASE_SITE } from '../motion'

interface BootControllerProps {
  reducedMotion: boolean
  onComplete: () => void
  onSurveyStart?: () => void
  onExtrude: (v: number) => void
  onInk: (v: number) => void
  children: React.ReactNode
}

/** Ink-on → staggered extrude → boot hold (Phase B). */
export function BootController({
  reducedMotion,
  onComplete,
  onSurveyStart,
  onExtrude,
  onInk,
  children,
}: BootControllerProps) {
  const done = useRef(false)
  const invalidate = useThree((s) => s.invalidate)
  const onCompleteRef = useRef(onComplete)
  const onSurveyRef = useRef(onSurveyStart)
  const onExtrudeRef = useRef(onExtrude)
  const onInkRef = useRef(onInk)
  onCompleteRef.current = onComplete
  onSurveyRef.current = onSurveyStart
  onExtrudeRef.current = onExtrude
  onInkRef.current = onInk

  useEffect(() => {
    if (done.current) return
    if (reducedMotion) {
      done.current = true
      onInkRef.current(1)
      onExtrudeRef.current(1)
      onSurveyRef.current?.()
      onCompleteRef.current()
      invalidate()
      return
    }

    const state = { ink: 0, extrude: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true
          onCompleteRef.current()
        }
      },
    })

    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInkRef.current(state.ink)
        invalidate()
      },
    })
      .call(() => onSurveyRef.current?.())
      .to(state, {
        extrude: 1,
        duration: DUR.extrude,
        ease: EASE_SITE,
        onUpdate: () => {
          onExtrudeRef.current(state.extrude)
          invalidate()
        },
      })
      .to({}, { duration: DUR.bootHold })

    return () => {
      tl.kill()
    }
  }, [reducedMotion, invalidate])

  return <>{children}</>
}
