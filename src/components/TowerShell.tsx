import { lazy, Suspense } from 'react'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { ExhibitOverlay } from './hud/ExhibitOverlay'
import { SiteAnnotation, SiteChrome, SiteRail, SiteTitleblock } from './hud/SiteChrome'
import { TowerSilhouette } from './TowerSilhouette'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

export function TowerShell() {
  const {
    floorId,
    hoveredFloorId,
    labRoomSlug,
    libraryRoomSlug,
    warehouseStop,
    theme,
    strings,
    goToFloor,
    setHoveredFloor,
    setLabRoomSlug,
    setHoveredLabSlug,
    setLibraryRoomSlug,
    setWarehouseStop,
  } = useSite()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

  return (
    <div className="site-root" data-experience="siteline">
      {use3D ? (
        <Suspense fallback={<div className="site-fallback-bg"><TowerSilhouette activeId={floorId} /></div>}>
          <TowerScene
            activeFloorId={floorId}
            hoveredFloorId={hoveredFloorId}
            labRoomSlug={labRoomSlug}
            libraryRoomSlug={libraryRoomSlug}
            warehouseStop={warehouseStop}
            reducedMotion={reducedMotion}
            theme={theme}
            bootLabel={strings.site.constructing}
            onFloorHover={setHoveredFloor}
            onFloorClick={goToFloor}
            onLabRoomClick={setLabRoomSlug}
            onLabRoomHover={setHoveredLabSlug}
            onLibraryRoomClick={setLibraryRoomSlug}
            onLibraryRoomHover={() => {}}
            onWarehouseStop={setWarehouseStop}
          />
        </Suspense>
      ) : (
        <div className="site-fallback-bg">
          <TowerSilhouette activeId={floorId} />
          <p className="site-fallback-note">
            {strings.site.fallback}{!webgl ? ' · WebGL' : ''}{reducedMotion ? ' · reduced motion' : ''}
          </p>
        </div>
      )}

      <SiteTitleblock />
      <SiteRail />
      <SiteChrome />
      <SiteAnnotation />
      <ExhibitOverlay />
    </div>
  )
}
