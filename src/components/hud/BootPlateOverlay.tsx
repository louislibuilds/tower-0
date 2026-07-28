import { useSite } from '../../context/SiteContext'

/** Boot plate — TOWER 0 identity during ink / scan */
export function BootPlateOverlay({ visible }: { visible: boolean }) {
  const { strings } = useSite()
  if (!visible) return null
  return (
    <div className="tower-boot-plate" aria-hidden="true">
      <p className="tower-boot-plate__code">{strings.stamp.code}</p>
      <p className="tower-boot-plate__name">{strings.stamp.name}</p>
    </div>
  )
}

/** Shown after exit teardown completes */
export function ExitOverlay({ onReopen }: { onReopen: () => void }) {
  const { strings } = useSite()
  return (
    <div className="tower-exit">
      <p className="tower-exit__label">{strings.exit.label}</p>
      <button type="button" className="tower-exit__btn" onClick={onReopen}>
        {strings.exit.reopen}
      </button>
    </div>
  )
}
