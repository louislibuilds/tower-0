import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { FloorId } from '../building/program'
import { OrthoRig, SiteLights } from '../camera/OrthoRig'
import { BootController, TowerBuilding } from './TowerBuilding'
import { palette } from './palette'

interface TowerSceneProps {
  activeFloorId: FloorId
  reducedMotion: boolean
}

function InvalidateOnChange({ floorId }: { floorId: FloorId }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [floorId, invalidate])
  return null
}

function SceneContent({
  activeFloorId,
  reducedMotion,
  extrude,
  ink,
}: TowerSceneProps & { extrude: number; ink: number }) {
  return (
    <>
      <InvalidateOnChange floorId={activeFloorId} />
      <color attach="background" args={[palette.void]} />
      <SiteLights />
      <OrthoRig floorId={activeFloorId} reducedMotion={reducedMotion} />
      <TowerBuilding
        activeFloorId={activeFloorId}
        extrude={extrude}
        ink={ink}
        reducedMotion={reducedMotion}
      />
    </>
  )
}

export function TowerScene({ activeFloorId, reducedMotion }: TowerSceneProps) {
  const [extrude, setExtrude] = useState(reducedMotion ? 1 : 0)
  const [ink, setInk] = useState(reducedMotion ? 1 : 0)
  const [booted, setBooted] = useState(reducedMotion)

  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <div className={`tower-scene ${booted ? 'tower-scene--ready' : 'tower-scene--booting'}`}>
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        className="tower-scene__canvas"
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
              extrude={extrude}
              ink={ink}
            />
          </BootController>
        </Suspense>
      </Canvas>
      {!booted && !reducedMotion && (
        <div className="tower-scene__boot-label" aria-hidden="true">
          Constructing…
        </div>
      )}
    </div>
  )
}
