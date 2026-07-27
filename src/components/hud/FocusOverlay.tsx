import { useSite } from '../../context/SiteContext'

/** Bottom hint during focus — detail lives in side panel, not center pop-up */
export function FocusOverlay() {
  const {
    viewMode,
    selectedBookSlug,
    selectedCredentialSlug,
    toggleBook,
    toggleCredential,
    strings,
  } = useSite()

  if (viewMode !== 'focus') return null

  const onBack = () => {
    if (selectedBookSlug) toggleBook(selectedBookSlug)
    else if (selectedCredentialSlug) toggleCredential(selectedCredentialSlug)
  }

  return (
    <div className="tower-focus-hint" role="status" aria-live="polite">
      <span className="tower-focus-hint__label">{strings.focus.panelHint}</span>
      <button type="button" className="tower-focus-hint__back" onClick={onBack}>
        {strings.focus.back}
      </button>
    </div>
  )
}
