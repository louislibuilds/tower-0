/** Boot stamp — TOWER 0 identity during ink / survey */
export function StampOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <div className="site-stamp" aria-hidden="true">
      <p className="site-stamp__code">TOWER 0</p>
      <p className="site-stamp__name">LOUIS LI</p>
      <p className="site-stamp__rev">LEARNING IS CONSTRUCTION · REV A</p>
    </div>
  )
}

/** Shown after exit teardown completes */
export function ExitOverlay({ onReopen }: { onReopen: () => void }) {
  return (
    <div className="site-exit-overlay">
      <p className="site-exit-overlay__label">END OF SET</p>
      <button type="button" className="site-exit-overlay__btn" onClick={onReopen}>
        REOPEN THE TOWER
      </button>
    </div>
  )
}
