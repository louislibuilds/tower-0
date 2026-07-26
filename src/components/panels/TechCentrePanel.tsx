import { profile } from '../../data/profile'

export function TechCentrePanel() {
  return (
    <div className="panel tech-panel">
      <p className="tech-panel__intro">
        Underground tech centre — source control, deployment artifacts, and printable résumé sheets.
      </p>

      <div className="tech-actions">
        <a
          className="tech-action-card"
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="tech-action-card__icon">⌥</span>
          <h3>GitHub</h3>
          <p>louislibuilds — repos, commits, open source</p>
          <span className="tech-action-card__cta">Open profile ↗</span>
        </a>

        <a className="tech-action-card" href={profile.links.kata} target="_blank" rel="noopener noreferrer">
          <span className="tech-action-card__icon">▣</span>
          <h3>KATA Editor</h3>
          <p>Craft & export résumé — live editor with PDF export</p>
          <span className="tech-action-card__cta">Open KATA ↗</span>
        </a>

        <button
          type="button"
          className="tech-action-card tech-action-card--print"
          onClick={() => window.print()}
        >
          <span className="tech-action-card__icon">⎙</span>
          <h3>Print Résumé</h3>
          <p>Print this site&apos;s identity plate or use KATA for full résumé sheets</p>
          <span className="tech-action-card__cta">Print now</span>
        </button>
      </div>

      <div className="tech-panel__repos">
        <h3>Highlighted Repos</h3>
        <ul>
          <li>
            <a href="https://github.com/louislibuilds/kata.app" target="_blank" rel="noopener noreferrer">
              kata.app
            </a>
            — Resume & job tracker
          </li>
          <li>
            <a
              href="https://github.com/louislibuilds/your-rock-is-coming"
              target="_blank"
              rel="noopener noreferrer"
            >
              your-rock-is-coming
            </a>
            — UniHack 2026
          </li>
          <li>
            <a
              href="https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining"
              target="_blank"
              rel="noopener noreferrer"
            >
              SUNi-Make-Your-Day-Shining
            </a>
            — Cloud e-commerce
          </li>
          <li>
            <a
              href="https://github.com/louis-li-builds/dl-cnn-UTSproject51-vtuber-mediapipe-kalidokit"
              target="_blank"
              rel="noopener noreferrer"
            >
              dl-cnn-vtuber
            </a>
            — Deep learning VTuber pipeline
          </li>
        </ul>
      </div>
    </div>
  )
}
