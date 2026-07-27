import { useSite } from '../../context/SiteContext'

/** Bottom hint during focus — detail lives in side panel, not center pop-up */
export function FocusOverlay() {
  const {
    viewMode,
    labRoomSlug,
    selectedBookSlug,
    selectedCredentialSlug,
    toggleBook,
    toggleCredential,
    exitLabFocus,
    strings,
  } = useSite()

  if (viewMode !== 'focus') return null

  const onBack = () => {
    if (selectedBookSlug) toggleBook(selectedBookSlug)
    else if (selectedCredentialSlug) toggleCredential(selectedCredentialSlug)
    else if (labRoomSlug) exitLabFocus()
  }

  return (
    <div className="focus-hint" role="status" aria-live="polite">
      <span className="focus-hint__label">{strings.focus.panelHint}</span>
      <button type="button" className="focus-hint__back" onClick={onBack}>
        {strings.focus.back}
      </button>
    </div>
  )
}
