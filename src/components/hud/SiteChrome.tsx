import { FLOORS } from '../../building/program'
import { labProjects } from '../../data/projects'
import { profile } from '../../data/profile'
import { useSite } from '../../context/SiteContext'
import type { Locale } from '../../i18n/strings'
import { getFloor } from '../../building/program'

/** Top-right — lang + INK/PAPER toggle (Site 9 chrome) */
export function SiteChrome() {
  const { strings, theme, toggleTheme, locale, setLocale, localeLabels } = useSite()

  return (
    <div className="site-chrome">
      <div className="site-chrome-langs" role="group" aria-label="Language">
        {(Object.keys(localeLabels) as Locale[]).map((l) => (
          <button
            key={l}
            type="button"
            className={locale === l ? 'is-active' : undefined}
            onClick={() => setLocale(l)}
          >
            {localeLabels[l]}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="site-chrome-theme"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? strings.site.themePaper : strings.site.themeInk}
      >
        {theme === 'dark' ? strings.site.themePaper : strings.site.themeInk}
      </button>
    </div>
  )
}

/** Top-left title block — architect field */
export function SiteTitleblock() {
  const { strings } = useSite()

  return (
    <div className="site-titleblock">
      <p className="site-titleblock-zone">{strings.site.zoneName}</p>
      <p className="site-titleblock-name">{strings.site.architectName}</p>
      <p className="site-titleblock-role">{strings.site.architectRole}</p>
      <div className="site-titleblock-links">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.links.nagi} target="_blank" rel="noopener noreferrer">nagi</a>
      </div>
    </div>
  )
}

/** Left rail — brand card + floor list + lab sub-rooms */
export function SiteRail() {
  const { floorId, goToFloor, labRoomSlug, setLabRoomSlug, strings } = useSite()

  return (
    <aside className="site-rail">
      <button type="button" className="site-rail-brand" onClick={() => goToFloor('G')}>
        <span className="site-rail-title">{strings.site.siteTitle}</span>
        <span className="site-rail-code">{strings.site.siteCode}</span>
      </button>

      <nav aria-label="Floor navigation">
        <ul className="site-rail-floors">
          {[...FLOORS].reverse().map((floor) => {
            const active = floor.id === floorId
            const loc = strings.floors[floor.id]
            return (
              <li key={floor.id} className={active ? 'is-active' : undefined}>
                <button type="button" onClick={() => goToFloor(floor.id)}>
                  <span className="site-rail-id">{floor.label}</span>
                  <span>{loc?.title ?? floor.title}</span>
                </button>
                {floor.id === '52' && active && (
                  <ul className="site-rail-rooms">
                    {labProjects.map((p) => {
                      const locP = strings.projects[p.slug]
                      return (
                        <li key={p.slug}>
                          <button
                            type="button"
                            className={labRoomSlug === p.slug ? 'is-room-active' : undefined}
                            onClick={() => setLabRoomSlug(p.slug)}
                          >
                            {locP?.title ?? p.title}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <p className="site-rail-hint">{strings.site.hint}</p>
    </aside>
  )
}

/** Bottom-center annotation — hover label or default hint */
export function SiteAnnotation() {
  const { hoveredFloorId, hoveredLabSlug, floorId, labRoomSlug, strings } = useSite()

  if (hoveredLabSlug && floorId === '52') {
    const project = labProjects.find((p) => p.slug === hoveredLabSlug)
    const loc = project ? strings.projects[project.slug] : null
    return (
      <div className="site-anno" aria-live="polite">
        52 · Lab · {loc?.title ?? project?.title}
      </div>
    )
  }

  if (hoveredFloorId) {
    const f = getFloor(hoveredFloorId)
    const loc = strings.floors[hoveredFloorId]
    return (
      <div className="site-anno" aria-live="polite">
        {f.label} · F{f.floorNumber} · {loc?.title ?? f.title}
      </div>
    )
  }

  if (floorId !== 'G') {
    const f = getFloor(floorId)
    const loc = strings.floors[floorId]
    if (floorId === '52' && labRoomSlug) {
      const project = labProjects.find((p) => p.slug === labRoomSlug)
      const locP = project ? strings.projects[project.slug] : null
      return (
        <div className="site-anno site-anno--muted">
          {f.label} · {locP?.title ?? project?.title}
        </div>
      )
    }
    return (
      <div className="site-anno site-anno--muted">
        {f.label} · {loc?.title ?? f.title}
      </div>
    )
  }

  return (
    <div className="site-anno site-anno--muted">
      {strings.site.hint}
    </div>
  )
}
