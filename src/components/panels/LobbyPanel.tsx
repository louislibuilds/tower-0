import { profile } from '../../data/profile'

export function LobbyPanel() {
  return (
    <div className="panel lobby-panel">
      <p className="lobby-panel__greeting">Welcome to</p>
      <h2 className="lobby-panel__tower">Tower 0</h2>
      <p className="lobby-panel__name">{profile.displayName}</p>

      <blockquote className="lobby-panel__thesis">{profile.tagline}</blockquote>

      <p className="lobby-panel__bio">{profile.bio}</p>

      <dl className="lobby-panel__meta">
        <div>
          <dt>Degree</dt>
          <dd>{profile.degree}</dd>
        </div>
        <div>
          <dt>Institution</dt>
          <dd>{profile.institution}</dd>
        </div>
        <div>
          <dt>WAM</dt>
          <dd>{profile.wam}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
      </dl>

      <p className="lobby-panel__hint">
        Select a floor from the rail → or use the elevator to explore this building.
      </p>
    </div>
  )
}
