import { lazy, Suspense, type ComponentType } from 'react'
import { LAB_BLUEPRINT_DIMS } from '../interiorScale'
import { type TypologyProps } from '../types'
import { LabRoomShell } from './LabRoomShell'

export type LabTypologySlug =
  | 'unihack-2026'
  | 'cloud-computing'
  | 'nlp'
  | 'dl'
  | 'kata'
  | 'nagi'
  | 'tower-zero'
  | 'lab-008'

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
const NagiStation = lazy(() => import('./NagiStation').then((m) => ({ default: m.NagiStation })))
const TowerZeroStation = lazy(() =>
  import('./TowerZeroStation').then((m) => ({ default: m.TowerZeroStation })),
)
const EmptyLabStation = lazy(() =>
  import('./EmptyLabStation').then((m) => ({ default: m.EmptyLabStation })),
)

const LAB_TYPOLOGY: Record<LabTypologySlug, ComponentType<TypologyProps>> = {
  'unihack-2026': LaunchPadStation,
  'cloud-computing': ServerRackBay,
  nlp: InterviewBooth,
  dl: MocapStage,
  kata: DocumentFoundryStation,
  nagi: NagiStation,
  'tower-zero': TowerZeroStation,
  'lab-008': EmptyLabStation,
}

export function LabTypology({
  slug,
  showShell,
  ...props
}: TypologyProps & { slug: string; showShell?: boolean }) {
  const Comp = LAB_TYPOLOGY[slug as LabTypologySlug]
  if (!Comp) return null
  const [roomW, roomD] = LAB_BLUEPRINT_DIMS[slug] ?? [5, 5]
  return (
    <Suspense fallback={null}>
      <group position={[0, 0.012, 0]}>
        <LabRoomShell showShell={showShell} roomW={roomW} roomD={roomD} {...props} />
        <Comp {...props} showShell={showShell} />
      </group>
    </Suspense>
  )
}
