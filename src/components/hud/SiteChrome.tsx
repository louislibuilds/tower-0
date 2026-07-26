import { FLOORS } from '../../building/program'
import { FACTORY_AREAS, areaLabel } from '../../scene/factoryStops'
import { libraryBooks } from '../../data/libraryBooks'
import { credentials } from '../../data/credentials'
import { labProjects } from '../../data/projects'
import { labLabel } from '../../scene/rooms/LaboratoryRoom'
import { LIBRARY_ROOMS } from '../../data/libraryRooms'
import { profile } from '../../data/profile'
import { useSite } from '../../context/SiteContext'
import type { Locale } from '../../i18n/strings'
import { getFloor } from '../../building/program'

/** Top-right — lang + Day/Night toggle */
export function SiteChrome() {
  const { strings, theme, toggleTheme, locale, setLocale, localeLabels, bootDone, startExit, phase } = useSite()

  return (
    <div className="site-chrome">
      {bootDone && phase !== 'exit' && phase !== 'void' && (
        <button type="button" className="site-chrome-exit" onClick={startExit}>
          Roll drawing
        </button>
      )}
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
        aria-label={theme === 'dark' ? strings.site.themeLight : strings.site.themeDark}
      >
        {theme === 'dark' ? strings.site.themeLight : strings.site.themeDark}
      </button>
    </div>
  )
}

/** Top-left title block */
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

/** Left rail — brand card + floor list + sub-rooms */
export function SiteRail() {
  const {
    floorId,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    toggleFloor,
    toggleLabRoom,
    toggleLibraryRoom,
    toggleFactoryStop,
    toggleBook,
    toggleCredential,
    strings,
  } = useSite()

  return (
    <aside className="site-rail">
      <button type="button" className="site-rail-brand" onClick={() => toggleFloor('G')}>
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
                <button type="button" onClick={() => toggleFloor(floor.id)}>
                  <span className="site-rail-id">{floor.label}</span>
                  <span>{loc?.title ?? floor.title}</span>
                </button>

                {floor.id === '23' && active && (
                  <ul className="site-rail-rooms">
                    {FACTORY_AREAS.map((sem, i) => (
                      <li key={sem.id}>
                        <button
                          type="button"
                          className={factoryStop === i ? 'is-room-active' : undefined}
                          onClick={() => toggleFactoryStop(i)}
                        >
                          {areaLabel(i)} · {sem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {floor.id === '52' && active && (
                  <ul className="site-rail-rooms">
                    {labProjects.map((p, i) => {
                      const code = String(i + 1).padStart(3, '0')
                      return (
                        <li key={p.slug}>
                          <button
                            type="button"
                            className={labRoomSlug === p.slug ? 'is-room-active' : undefined}
                            onClick={() => toggleLabRoom(p.slug)}
                          >
                            {labLabel(code, p.slug)}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}

                {floor.id === '99' && active && (
                  <ul className="site-rail-rooms">
                    {LIBRARY_ROOMS.map((room) => (
                      <li key={room.slug}>
                        <button
                          type="button"
                          className={libraryRoomSlug === room.slug ? 'is-room-active' : undefined}
                          onClick={() => toggleLibraryRoom(room.slug)}
                        >
                          {room.slug === 'archive'
                            ? strings.library.archiveTitle
                            : strings.library.libraryTitle}
                        </button>
                      </li>
                    ))}
                    {libraryRoomSlug === 'library' &&
                      libraryBooks.map((book) => (
                        <li key={book.slug}>
                          <button type="button" onClick={() => toggleBook(book.slug)}>
                            ↳ {book.title}
                          </button>
                        </li>
                      ))}
                    {libraryRoomSlug === 'archive' &&
                      credentials.slice(0, 6).map((cred) => (
                        <li key={cred.slug}>
                          <button type="button" onClick={() => toggleCredential(cred.slug)}>
                            ↳ {cred.title}
                          </button>
                        </li>
                      ))}
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

/** Bottom-center annotation */
export function SiteAnnotation() {
  const { hoveredFloorId, hoveredLabSlug, floorId, labRoomSlug, libraryRoomSlug, factoryStop, strings } =
    useSite()

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

    if (floorId === '99' && libraryRoomSlug) {
      const roomLabel =
        libraryRoomSlug === 'archive' ? strings.library.archiveTitle : strings.library.libraryTitle
      return (
        <div className="site-anno site-anno--muted">
          {f.label} · {roomLabel}
        </div>
      )
    }

    if (floorId === '23') {
      const sem = factoryStop !== null ? FACTORY_AREAS[factoryStop] : null
      return (
        <div className="site-anno site-anno--muted">
          {f.label} · {sem ? `${areaLabel(factoryStop!)} · ${sem.label}` : loc?.title}
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
