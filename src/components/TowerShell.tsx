import { lazy, Suspense, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import { MobileShellProvider, useMobileShell } from '../context/MobileShellContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useViewportLayout } from '../hooks/useViewportLayout'
import { useWebGL } from '../hooks/useWebGL'
import { DelayedExhibitOverlay } from './DelayedExhibitOverlay'
import { ExitOverlay, BootPlateOverlay } from './hud/BootPlateOverlay'
import { ExhibitOverlay } from './hud/ExhibitOverlay'
import { FocusOverlay } from './hud/FocusOverlay'
import { MobileDrawer } from './hud/MobileDrawer'
import { SceneBootSplash } from './SceneBootSplash'
import { TowerCredits, TowerMobileFooter, TowerRail, TowerStatus, TowerToolbar } from './hud/TowerHud'
import { ResumePrintDrawer } from './resume/ResumePrintDrawer'
import { TowerFallbackPoster } from './TowerFallbackPoster'
import { resetSceneCursor } from '../scene/sceneCursor'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

function MobileDrawerEffects() {
  const { viewMode, atTower, floorId } = useSite()
  const mobile = useMobileShell()

  useEffect(() => {
    if (!mobile || mobile.layout !== 'mobile') return
    if (viewMode === 'tower' || atTower || !floorId) {
      mobile.closeExhibitDrawer()
    }
  }, [viewMode, atTower, floorId, mobile])

  return null
}

function MobileDrawers() {
  const { strings, floorId, viewMode, bootDone, phase } = useSite()
  const mobile = useMobileShell()

  if (!mobile || mobile.layout !== 'mobile') return null

  const showExhibit =
    bootDone && phase !== 'void' && phase !== 'exit' && viewMode !== 'tower' && !!floorId

  return (
    <>
      <MobileDrawer
        side="left"
        open={mobile.railDrawerOpen}
        onClose={mobile.closeRailDrawer}
        title={strings.site.floors}
      >
        <div className="tower-drawer-rail">
          <TowerCredits />
          <TowerRail />
        </div>
      </MobileDrawer>
      {showExhibit && (
        <MobileDrawer
          side="right"
          open={mobile.exhibitDrawerOpen}
          onClose={mobile.closeExhibitDrawer}
          title={strings.site.details}
        >
          <div className="tower-drawer-exhibit">
            <ExhibitOverlay />
          </div>
        </MobileDrawer>
      )}
    </>
  )
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
  const { layout } = useViewportLayout()
  const use3D = webgl

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

  const showDesktopExhibit =
    layout !== 'mobile' &&
    bootDone &&
    phase !== 'void' &&
    phase !== 'exit' &&
    viewMode !== 'tower' &&
    floorId

  return (
    <MobileShellProvider layout={layout}>
      <div className="tower-root" data-layout={layout} data-experience="tower0">
        <MobileDrawerEffects />
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
            <TowerFallbackPoster theme={theme} activeId={floorId ?? undefined} />
            <p className="tower-fallback-note">{strings.site.fallback}</p>
          </div>
        )}

        {layout !== 'mobile' && (
          <aside className="tower-sidebar">
            <TowerCredits />
            {!interactionLocked && <TowerRail />}
          </aside>
        )}
        <TowerToolbar />
        <TowerMobileFooter />
        {!interactionLocked && <TowerStatus />}
        <BootPlateOverlay visible={phase === 'boot' || phase === 'scan'} />
        {phase === 'void' && <ExitOverlay onReopen={reopenSite} />}
        <FocusOverlay />
        {showDesktopExhibit && <DelayedExhibitOverlay />}
        {phase === 'exit' && (
          <div className="tower-exit-progress" aria-hidden="true">
            {strings.site.rollingDrawing}
          </div>
        )}
        <MobileDrawers />
        <ResumePrintDrawer />
      </div>
    </MobileShellProvider>
  )
}
