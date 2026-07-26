import { credentials } from '../../data/credentials'
import { profile } from '../../data/profile'

export function LibraryPanel() {
  return (
    <div className="panel library-panel">
      <div className="library-panel__hero">
        <h2>Archive & Credentials</h2>
        <p>
          {profile.degree} · {profile.institution} · WAM {profile.wam}
        </p>
      </div>

      <div className="credential-grid">
        {credentials.map((cred) => (
          <article key={`${cred.year}-${cred.title}`} className="credential-card">
            <time className="credential-card__year">{cred.year}</time>
            <h3>{cred.title}</h3>
            <p className="credential-card__issuer">{cred.issuer}</p>
            {cred.detail && <p className="credential-card__detail">{cred.detail}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
