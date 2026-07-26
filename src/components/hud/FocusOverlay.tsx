import { labProjects } from '../../data/projects'
import { libraryBooks } from '../../data/libraryBooks'
import { credentials } from '../../data/credentials'
import { useSite } from '../../context/SiteContext'

/** Center overlay when a book, certificate, or lab is in focus */
export function FocusOverlay() {
  const {
    viewMode,
    floorId,
    labRoomSlug,
    selectedBookSlug,
    selectedCredentialSlug,
    toggleBook,
    toggleCredential,
    toggleLabRoom,
    handleBookClick,
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
          <button type="button" className="focus-card__action" onClick={() => handleBookClick(selectedBookSlug)}>
            Open site ↗
          </button>
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

  if (floorId === '52' && labRoomSlug) {
    const project = labProjects.find((p) => p.slug === labRoomSlug)
    const loc = project ? strings.projects[project.slug] : null
    if (!project) return null
    const labCode = `Lab-${String(labProjects.findIndex((p) => p.slug === labRoomSlug) + 1).padStart(3, '0')}`
    return (
      <div className="focus-overlay" role="dialog" aria-modal="true">
        <article className="focus-card">
          <button type="button" className="focus-card__close" onClick={() => toggleLabRoom(labRoomSlug)} aria-label="Close">
            ×
          </button>
          <p className="focus-card__eyebrow">{labCode} · Experiment</p>
          <h3>{loc?.title ?? project.title}</h3>
          <p className="focus-card__body">{loc?.hook ?? project.hook}</p>
          <div className="focus-card__meta">
            <span>{strings.lab.role}: {project.role}</span>
            {project.team && <span>{strings.lab.team}: {project.team}</span>}
            {project.course && <span>{strings.lab.course}: {project.course}</span>}
            {project.grade && <span>{project.mark ?? ''} {project.grade}</span>}
          </div>
          {project.links[0] && (
            <a className="focus-card__action" href={project.links[0].url} target="_blank" rel="noopener noreferrer">
              {project.links[0].label} ↗
            </a>
          )}
        </article>
      </div>
    )
  }

  return null
}
