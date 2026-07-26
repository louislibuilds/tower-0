import { lazy, Suspense, type ComponentType } from 'react'
import { typologyMat, type TypologyProps } from '../types'

export type LabTypologySlug =
  | 'unihack-2026'
  | 'cloud-computing'
  | 'nlp'
  | 'dl'
  | 'kata'

const LaunchPadStation = lazy(() =>
  import('./LaunchPadStation').then((m) => ({ default: m.LaunchPadStation })),
)
const ServerRackBay = lazy(() =>
  import('./ServerRackBay').then((m) => ({ default: m.ServerRackBay })),
)
const InterviewBooth = lazy(() =>
  import('./InterviewBooth').then((m) => ({ default: m.InterviewBooth })),
)
const MocapStage = lazy(() => import('./MocapStage').then((m) => ({ default: m.MocapStage })))
const DocumentFoundryStation = lazy(() =>
  import('./DocumentFoundryStation').then((m) => ({ default: m.DocumentFoundryStation })),
)

const LAB_TYPOLOGY: Record<LabTypologySlug, ComponentType<TypologyProps>> = {
  'unihack-2026': LaunchPadStation,
  'cloud-computing': ServerRackBay,
  nlp: InterviewBooth,
  dl: MocapStage,
  kata: DocumentFoundryStation,
}

export function LabTypology({ slug, ...props }: TypologyProps & { slug: string }) {
  const Comp = LAB_TYPOLOGY[slug as LabTypologySlug]
  if (!Comp) return null
  return (
    <Suspense fallback={null}>
      <Comp {...props} />
    </Suspense>
  )
}

/** Plinth slab under each station */
export function StationPlinth({
  theme,
  accent,
  entered,
  active,
  width = 0.16,
  depth = 0.13,
}: TypologyProps & { width?: number; depth?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  return (
    <mesh position={[0, 0.02, 0]}>
      <boxGeometry args={[width, 0.04, depth]} />
      <meshStandardMaterial
        color={m.body}
        emissive={lit ? accent : '#000'}
        emissiveIntensity={lit ? 0.08 : 0}
      />
    </mesh>
  )
}
