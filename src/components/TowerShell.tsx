import { lazy, Suspense, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { DelayedExhibitOverlay } from './DelayedExhibitOverlay'
import { ExitOverlay, BootPlateOverlay } from './hud/BootPlateOverlay'
import { FocusOverlay } from './hud/FocusOverlay'
import { SceneBootSplash } from './SceneBootSplash'
import { TowerCredits, TowerRail, TowerStatus, TowerToolbar } from './hud/TowerHud'
import { TowerSilhouette } from './TowerSilhouette'
import { resetSceneCursor } from '../scene/sceneCursor'

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
    setHoveredLibraryRoomSlug,
    setHoveredFactoryStop,
    toggleLibraryRoom,
    toggleFactoryStop,
    handleBookClick,
    toggleCredential,
    phase,
    bootDone,
    interactionLocked,
    reopenSite,
    navigateBack,
  } = useSite()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || interactionLocked) return
      e.preventDefault()
      navigateBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [interactionLocked, navigateBack])

  useEffect(() => {
    resetSceneCursor()
  }, [theme])

  return (
    <div className="tower-root" data-experience="tower0">
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
            onLibraryRoomHover={setHoveredLibraryRoomSlug}
            onFactoryStopHover={setHoveredFactoryStop}
            onFactoryStop={toggleFactoryStop}
            onBookClick={handleBookClick}
            onCredentialClick={toggleCredential}
          />
        </Suspense>
      ) : (
        <div className="tower-fallback-bg">
          <TowerSilhouette activeId={floorId ?? undefined} theme={theme} />
          <p className="tower-fallback-note">
            {strings.site.fallback}{reducedMotion ? ' · reduced motion' : ''}
          </p>
        </div>
      )}

      <aside className="tower-sidebar">
        <TowerCredits />
        {!interactionLocked && <TowerRail />}
      </aside>
      <TowerToolbar />
      {!interactionLocked && <TowerStatus />}
      <BootPlateOverlay visible={phase === 'boot' || phase === 'scan'} />
      {phase === 'void' && <ExitOverlay onReopen={reopenSite} />}
      <FocusOverlay />
      {bootDone && phase !== 'void' && phase !== 'exit' && viewMode !== 'tower' && floorId && (
        <DelayedExhibitOverlay />
      )}
      {phase === 'exit' && (
        <div className="tower-exit-progress" aria-hidden="true">
          {strings.site.rollingDrawing}
        </div>
      )}
    </div>
  )
}
