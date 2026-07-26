import { useSite } from '../../context/SiteContext'

/** Boot stamp — TOWER 0 identity during ink / survey */
export function StampOverlay({ visible }: { visible: boolean }) {
  const { strings } = useSite()
  if (!visible) return null
  return (
    <div className="site-stamp" aria-hidden="true">
      <p className="site-stamp__code">{strings.stamp.code}</p>
      <p className="site-stamp__name">{strings.stamp.name}</p>
      <p className="site-stamp__rev">{strings.stamp.rev}</p>
    </div>
  )
}

/** Shown after exit teardown completes */
export function ExitOverlay({ onReopen }: { onReopen: () => void }) {
  const { strings } = useSite()
  return (
    <div className="site-exit-overlay">
      <p className="site-exit-overlay__label">{strings.exit.label}</p>
      <button type="button" className="site-exit-overlay__btn" onClick={onReopen}>
        {strings.exit.reopen}
      </button>
    </div>
  )
}
