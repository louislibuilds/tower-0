import { libraryBooks } from '../../data/libraryBooks'
import { credentials } from '../../data/credentials'
import { useSite } from '../../context/SiteContext'

/** Center overlay when a book or certificate is in focus */
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

  if (selectedBookSlug) {
    const book = libraryBooks.find((b) => b.slug === selectedBookSlug)
    if (!book) return null
    return (
      <div className="focus-overlay" role="dialog" aria-modal="true">
        <article className="focus-card">
          <button type="button" className="focus-card__close" onClick={() => toggleBook(selectedBookSlug)} aria-label="Close">
            ×
          </button>
          <p className="focus-card__eyebrow">Library · Book</p>
          <h3>{book.title}</h3>
          <p className="focus-card__body">{strings.platformApps?.[book.slug]?.hook ?? book.title}</p>
          <a
            className="focus-card__action"
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open site ↗
          </a>
        </article>
      </div>
    )
  }

  if (selectedCredentialSlug) {
    const cred = credentials.find((c) => c.slug === selectedCredentialSlug)
    const loc = cred ? strings.credentials[cred.slug as keyof typeof strings.credentials] : null
    if (!cred) return null
    return (
      <div className="focus-overlay" role="dialog" aria-modal="true">
        <article className="focus-card">
          <button type="button" className="focus-card__close" onClick={() => toggleCredential(selectedCredentialSlug)} aria-label="Close">
            ×
          </button>
          <p className="focus-card__eyebrow">Archive · {cred.year}</p>
          <h3>{loc?.title ?? cred.title}</h3>
          <p className="focus-card__issuer">{cred.issuer}</p>
          <p className="focus-card__body">{loc?.detail ?? cred.detail}</p>
        </article>
      </div>
    )
  }

  return null
}
