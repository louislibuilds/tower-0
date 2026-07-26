import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import { OrthoRig, SiteLights } from '../camera/OrthoRig'
import { getScenePalette } from './palette'
import { CyberTower } from './CyberTower'
import { BootController } from './CyberTowerBoot'

interface TowerSceneProps {
  activeFloorId: FloorId
  hoveredFloorId: FloorId | null
  labRoomSlug: string | null
  reducedMotion: boolean
  theme: Theme
  bootLabel: string
  onFloorHover: (id: FloorId | null) => void
  onFloorClick: (id: FloorId) => void
  onLabRoomClick: (slug: string) => void
  onLabRoomHover: (slug: string | null) => void
}

function InvalidateOnChange({ floorId, theme }: { floorId: FloorId; theme: Theme }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [floorId, theme, invalidate])
  return null
}

function SceneContent(props: TowerSceneProps & { extrude: number; ink: number }) {
  const {
    activeFloorId,
    hoveredFloorId,
    labRoomSlug,
    reducedMotion,
    theme,
    extrude,
    ink,
    onFloorHover,
    onFloorClick,
    onLabRoomClick,
    onLabRoomHover,
  } = props
  const bg = getScenePalette(theme).paper

  return (
    <>
      <InvalidateOnChange floorId={activeFloorId} theme={theme} />
      <color attach="background" args={[bg]} />
      <SiteLights theme={theme} />
      <OrthoRig floorId={activeFloorId} reducedMotion={reducedMotion} />
      <CyberTower
        activeFloorId={activeFloorId}
        hoveredFloorId={hoveredFloorId}
        labRoomSlug={labRoomSlug}
        extrude={extrude}
        ink={ink}
        theme={theme}
        onFloorHover={onFloorHover}
        onFloorClick={onFloorClick}
        onLabRoomClick={onLabRoomClick}
        onLabRoomHover={onLabRoomHover}
      />
    </>
  )
}

export function TowerScene({
  activeFloorId,
  hoveredFloorId,
  labRoomSlug,
  reducedMotion,
  theme,
  bootLabel,
  onFloorHover,
  onFloorClick,
  onLabRoomClick,
  onLabRoomHover,
}: TowerSceneProps) {
  const [extrude, setExtrude] = useState(reducedMotion ? 1 : 0)
  const [ink, setInk] = useState(reducedMotion ? 1 : 0)
  const [booted, setBooted] = useState(reducedMotion)

  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <div className={`site-canvas ${booted ? 'site-canvas--ready' : 'site-canvas--booting'}`}>
      <Canvas
        orthographic
        frameloop="always"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        className="site-canvas__gl"
      >
        <Suspense fallback={null}>
          <BootController
            reducedMotion={reducedMotion}
            onComplete={handleBootComplete}
            onExtrude={setExtrude}
            onInk={setInk}
          >
            <SceneContent
              activeFloorId={activeFloorId}
              hoveredFloorId={hoveredFloorId}
              labRoomSlug={labRoomSlug}
              reducedMotion={reducedMotion}
              theme={theme}
              bootLabel={bootLabel}
              onFloorHover={onFloorHover}
              onFloorClick={onFloorClick}
              onLabRoomClick={onLabRoomClick}
              onLabRoomHover={onLabRoomHover}
              extrude={extrude}
              ink={ink}
            />
          </BootController>
        </Suspense>
      </Canvas>
      {!booted && !reducedMotion && (
        <div className="site-canvas__boot" aria-hidden="true">
          {bootLabel}
        </div>
      )}
    </div>
  )
}
