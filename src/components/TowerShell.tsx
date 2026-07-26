import { lazy, Suspense, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { DelayedExhibitOverlay } from './DelayedExhibitOverlay'
import { FocusOverlay } from './hud/FocusOverlay'
import { SceneBootSplash } from './SceneBootSplash'
import { SiteAnnotation, SiteChrome, SiteRail, SiteTitleblock } from './hud/SiteChrome'
import { TowerSilhouette } from './TowerSilhouette'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

function preloadTowerScene() {
  void import('../scene/TowerScene')
}

export function TowerShell() {
  const {
    floorId,
    viewMode,
    hoveredFloorId,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    selectedBookSlug,
    selectedCredentialSlug,
    theme,
    strings,
    toggleFloor,
    setHoveredFloor,
    toggleLabRoom,
    setHoveredLabSlug,
    toggleLibraryRoom,
    toggleFactoryStop,
    handleBookClick,
    toggleCredential,
  } = useSite()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

  useEffect(() => {
    if (use3D) preloadTowerScene()
  }, [use3D])

  return (
    <div className="site-root" data-experience="siteline">
      {use3D ? (
        <Suspense fallback={<SceneBootSplash label={strings.site.constructing} />}>
          <TowerScene
            activeFloorId={floorId}
            viewMode={viewMode}
            hoveredFloorId={hoveredFloorId}
            labRoomSlug={labRoomSlug}
            libraryRoomSlug={libraryRoomSlug}
            factoryStop={factoryStop}
            selectedBookSlug={selectedBookSlug}
            selectedCredentialSlug={selectedCredentialSlug}
            reducedMotion={reducedMotion}
            theme={theme}
            bootLabel={strings.site.constructing}
            onFloorHover={setHoveredFloor}
            onFloorClick={toggleFloor}
            onLabRoomClick={toggleLabRoom}
            onLabRoomHover={setHoveredLabSlug}
            onLibraryRoomClick={toggleLibraryRoom}
            onLibraryRoomHover={() => {}}
            onFactoryStop={toggleFactoryStop}
            onBookClick={handleBookClick}
            onCredentialClick={toggleCredential}
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
      <FocusOverlay />
      {viewMode !== 'focus' && <DelayedExhibitOverlay />}
    </div>
  )
}
