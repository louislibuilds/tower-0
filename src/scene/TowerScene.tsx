import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import { OrthoRig, SiteLights } from '../camera/OrthoRig'
import { BootController, CyberTower } from './CyberTower'

interface TowerSceneProps {
  activeFloorId: FloorId
  reducedMotion: boolean
  theme: Theme
  bootLabel: string
}

function InvalidateOnChange({ floorId, theme }: { floorId: FloorId; theme: Theme }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [floorId, theme, invalidate])
  return null
}

function SceneContent({
  activeFloorId,
  reducedMotion,
  theme,
  extrude,
  ink,
}: TowerSceneProps & { extrude: number; ink: number }) {
  const bg = theme === 'dark' ? '#030308' : '#eae6df'

  return (
    <>
      <InvalidateOnChange floorId={activeFloorId} theme={theme} />
      <color attach="background" args={[bg]} />
      <SiteLights theme={theme} />
      <OrthoRig floorId={activeFloorId} reducedMotion={reducedMotion} />
      <CyberTower
        activeFloorId={activeFloorId}
        extrude={extrude}
        ink={ink}
        reducedMotion={reducedMotion}
        theme={theme}
      />
    </>
  )
}

export function TowerScene({ activeFloorId, reducedMotion, theme, bootLabel }: TowerSceneProps) {
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
              reducedMotion={reducedMotion}
              theme={theme}
              bootLabel={bootLabel}
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
