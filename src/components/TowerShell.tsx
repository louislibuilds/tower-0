import { lazy, Suspense } from 'react'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { DelayedExhibitOverlay } from './DelayedExhibitOverlay'
import { ExitOverlay, StampOverlay } from './hud/StampOverlay'
import { FocusOverlay } from './hud/FocusOverlay'
import { SceneBootSplash } from './SceneBootSplash'
import { SiteAnnotation, SiteChrome, SiteRail, SiteTitleblock } from './hud/SiteChrome'
import { FactoryTimelineRail } from './hud/FactoryTimeline'
import { TowerSilhouette } from './TowerSilhouette'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

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
    phase,
    bootDone,
    interactionLocked,
    reopenSite,
  } = useSite()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

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
      {!interactionLocked && <SiteRail />}
      <SiteChrome />
      {!interactionLocked && <SiteAnnotation />}
      {!interactionLocked && <FactoryTimelineRail />}
      <StampOverlay visible={phase === 'boot' || phase === 'survey'} />
      {phase === 'void' && <ExitOverlay onReopen={reopenSite} />}
      <FocusOverlay />
      {bootDone && phase !== 'void' && phase !== 'exit' && viewMode !== 'tower' && <DelayedExhibitOverlay />}
      {phase === 'exit' && (
        <div className="site-exit-progress" aria-hidden="true">
          {strings.site.rollingDrawing}
        </div>
      )}
    </div>
  )
}
