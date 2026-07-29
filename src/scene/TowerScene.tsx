import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { isBootSequence } from '../building/sitePhase'
import { useSite } from '../context/SiteContext'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { OrthoRig, SiteLights } from '../camera/OrthoRig'
import { BootController } from './controllers/BootController'
import { TeardownController } from './controllers/TeardownController'
import { getScenePalette } from './palette'
import { resetSceneCursor } from './sceneCursor'
import { PaletteProvider } from './primitives'
import { CyberTower } from './CyberTower'

interface TowerSceneProps {
  activeFloorId: FloorId | null
  viewMode: ViewMode
  hoveredFloorId: FloorId | null
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  factoryStop: number | null
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  reducedMotion: boolean
  theme: Theme
  bootLabel: string
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
  onLibraryRoomClick: (slug: LibraryRoomSlug) => void
  onLibraryRoomHover: (slug: LibraryRoomSlug | null) => void
  onFactoryStop: (stop: number) => void
  onFactoryStopHover: (stop: number | null) => void
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

function InvalidateOnChange({
  floorId,
  theme,
  viewMode,
  phase,
}: {
  floorId: FloorId | null
  theme: Theme
  viewMode: ViewMode
  phase: string
}) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [floorId, theme, viewMode, phase, invalidate])
  return null
}

function SceneContent(
  props: TowerSceneProps & {
    extrude: number
    ink: number
    teardownFill?: number
    teardownBlueprint?: number
  },
) {
  const { phase, bootDone } = useSite()
  const bg = getScenePalette(props.theme).bg
  return (
    <>
      <InvalidateOnChange
        floorId={props.activeFloorId ?? 'G'}
        theme={props.theme}
        viewMode={props.viewMode}
        phase={phase}
      />
      <color attach="background" args={[bg]} />
      <SiteLights theme={props.theme} />
      <OrthoRig
        floorId={props.activeFloorId ?? 'G'}
        viewMode={props.viewMode}
        phase={phase}
        bootDone={bootDone}
        factoryStop={props.factoryStop}
        libraryRoomSlug={props.libraryRoomSlug}
        labRoomSlug={props.labRoomSlug}
        selectedBookSlug={props.selectedBookSlug}
        selectedCredentialSlug={props.selectedCredentialSlug}
        reducedMotion={props.reducedMotion}
      />
      <CyberTower
        {...props}
        teardownFill={props.teardownFill ?? 1}
        teardownBlueprint={props.teardownBlueprint ?? 0}
      />
    </>
  )
}

export function TowerScene(props: TowerSceneProps) {
  const { phase, finishBoot, setPhase, bootDone } = useSite()
  const [extrude, setExtrude] = useState(props.reducedMotion ? 1 : 0)
  const [ink, setInk] = useState(props.reducedMotion ? 1 : 0)
  const [teardownFill, setTeardownFill] = useState(1)
  const [teardownBlueprint, setTeardownBlueprint] = useState(0)
  const [booted, setBooted] = useState(props.reducedMotion || bootDone)
  const [bootKey, setBootKey] = useState(0)

  useEffect(() => {
    if (props.reducedMotion && !bootDone) finishBoot()
  }, [props.reducedMotion, bootDone, finishBoot])

  useEffect(() => {
    if (phase === 'boot' && !bootDone) {
      setExtrude(0)
      setInk(0)
      setBooted(false)
      setTeardownFill(1)
      setTeardownBlueprint(0)
      setBootKey((k) => k + 1)
    }
  }, [phase, bootDone])

  const handleBootComplete = useCallback(() => {
    setBooted(true)
    finishBoot()
  }, [finishBoot])

  const handleTeardownComplete = useCallback(() => {
    setPhase('void')
  }, [setPhase])

  const pal = getScenePalette(props.theme)
  const sceneProps = { ...props, extrude, ink, teardownFill, teardownBlueprint }
  const runningBoot = !bootDone && phase !== 'exit' && phase !== 'void'
  const runningTeardown = phase === 'exit'

  useEffect(() => {
    resetSceneCursor()
  }, [props.theme])

  return (
    <div className={`tower-canvas ${booted ? 'tower-canvas--ready' : 'tower-canvas--booting'}`}>
      <Canvas orthographic frameloop="always" dpr={[1, 2]} gl={{ antialias: true, alpha: false }} className="tower-canvas__gl">
        <Suspense fallback={null}>
          <PaletteProvider palette={pal}>
            {runningTeardown ? (
              <TeardownController
                reducedMotion={props.reducedMotion}
                active
                onComplete={handleTeardownComplete}
                onExtrude={setExtrude}
                onInk={setInk}
                onFill={setTeardownFill}
                onBlueprint={setTeardownBlueprint}
              >
                <SceneContent {...sceneProps} />
              </TeardownController>
            ) : runningBoot ? (
              <BootController
                key={bootKey}
                reducedMotion={props.reducedMotion}
                onComplete={handleBootComplete}
                onScanStart={() => setPhase('scan')}
                onExtrude={setExtrude}
                onInk={setInk}
              >
                <SceneContent {...sceneProps} />
              </BootController>
            ) : (
              <SceneContent {...sceneProps} extrude={1} ink={1} teardownFill={1} teardownBlueprint={0} />
            )}
          </PaletteProvider>
        </Suspense>
      </Canvas>
      {isBootSequence(phase) && !booted && !props.reducedMotion && (
        <div className="tower-canvas__boot" aria-hidden="true">{props.bootLabel}</div>
      )}
    </div>
  )
}
