import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { OrthoRig, SiteLights } from '../camera/OrthoRig'
import { getScenePalette } from './palette'
import { CyberTower } from './CyberTower'
import { BootController } from './CyberTowerBoot'

interface TowerSceneProps {
  activeFloorId: FloorId
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
  onBookClick: (slug: string) => void
  onCredentialClick: (slug: string) => void
}

function InvalidateOnChange({ floorId, theme, viewMode }: { floorId: FloorId; theme: Theme; viewMode: ViewMode }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [floorId, theme, viewMode, invalidate])
  return null
}

function SceneContent(props: TowerSceneProps & { extrude: number; ink: number }) {
  const bg = getScenePalette(props.theme).paper
  return (
    <>
      <InvalidateOnChange floorId={props.activeFloorId} theme={props.theme} viewMode={props.viewMode} />
      <color attach="background" args={[bg]} />
      <SiteLights theme={props.theme} />
      <OrthoRig
        floorId={props.activeFloorId}
        viewMode={props.viewMode}
        factoryStop={props.factoryStop}
        libraryRoomSlug={props.libraryRoomSlug}
        labRoomSlug={props.labRoomSlug}
        selectedBookSlug={props.selectedBookSlug}
        selectedCredentialSlug={props.selectedCredentialSlug}
        reducedMotion={props.reducedMotion}
      />
      <CyberTower {...props} />
    </>
  )
}

export function TowerScene(props: TowerSceneProps) {
  const [extrude, setExtrude] = useState(props.reducedMotion ? 1 : 0)
  const [ink, setInk] = useState(props.reducedMotion ? 1 : 0)
  const [booted, setBooted] = useState(props.reducedMotion)
  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <div className={`site-canvas ${booted ? 'site-canvas--ready' : 'site-canvas--booting'}`}>
      <Canvas orthographic frameloop="always" dpr={[1, 2]} gl={{ antialias: true, alpha: false }} className="site-canvas__gl">
        <Suspense fallback={null}>
          <BootController reducedMotion={props.reducedMotion} onComplete={handleBootComplete} onExtrude={setExtrude} onInk={setInk}>
            <SceneContent {...props} extrude={extrude} ink={ink} />
          </BootController>
        </Suspense>
      </Canvas>
      {!booted && !props.reducedMotion && (
        <div className="site-canvas__boot" aria-hidden="true">{props.bootLabel}</div>
      )}
    </div>
  )
}
