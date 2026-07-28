import { FLOORS } from '../../building/program'
import { FACTORY_AREAS, areaLabel } from '../../scene/factoryStops'
import { libraryBooks } from '../../data/libraryBooks'
import { credentials } from '../../data/credentials'
import { LAB_SUITES, labCardTitle, labResearchTitle, labSuite } from '../../data/labs'
import { LIBRARY_ROOMS } from '../../data/libraryRooms'
import { profile } from '../../data/profile'
import { useSite } from '../../context/SiteContext'
import type { Locale } from '../../i18n/strings'
import { getFloor } from '../../building/program'

/** Top-right — lang + Day/Night toggle */
export function TowerToolbar() {
  const { strings, theme, toggleTheme, locale, setLocale, localeLabels, bootDone, startExit, phase, openResumePreview } = useSite()

  return (
    <div className="tower-toolbar">
      {bootDone && phase !== 'exit' && phase !== 'void' && (
        <button type="button" className="tower-toolbar-btn tower-toolbar-exit" onClick={startExit}>
          {strings.site.rollDrawing}
        </button>
      )}
      <div className="tower-toolbar-langs" role="group" aria-label="Language">
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
        className="tower-toolbar-btn tower-toolbar-theme"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? strings.site.themeLight : strings.site.themeDark}
      >
        {theme === 'dark' ? strings.site.themeLight : strings.site.themeDark}
      </button>
      {phase !== 'exit' && phase !== 'void' && (
        <button
          type="button"
          className="tower-toolbar-btn tower-toolbar-resume"
          onClick={openResumePreview}
        >
          {strings.site.printResume}
        </button>
      )}
    </div>
  )
}

/** Top-left author block — same hierarchy as G lobby detail card */
export function TowerCredits() {
  const { strings } = useSite()
  const s = strings.site
  const eyebrow = `${profile.brand} · ${profile.siteCode}`
  const gradYear = profile.programEnd.match(/\d{4}/)?.[0] ?? '2026'
  const credential = `${profile.institution}, ${profile.degree} · GPA ${profile.gpa}/${profile.gpaScale} · WAM ${profile.wam} · ${gradYear} ${s.creditsComplete}`

  return (
    <div className="tower-credits">
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow tower-credits__eyebrow">{eyebrow}</p>
      <h2 className="tower-credits__name">{s.architectName}</h2>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow tower-credits__tagline">
        {profile.tagline}
      </p>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow tower-credits__credential">{credential}</p>
      <div className="tower-credits-links">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer">{s.linkGithub}</a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">{s.linkLinkedin}</a>
        <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">{s.linkPortfolio}</a>
      </div>
    </div>
  )
}

/** Left rail — brand card + floor list + sub-rooms */
export function TowerRail() {
  const {
    floorId,
    viewMode,
    atTower,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    goToTower,
    toggleFloor,
    toggleLabRoom,
    toggleLibraryRoom,
    toggleFactoryStop,
    toggleBook,
    toggleCredential,
    strings,
  } = useSite()

  const railFloorOpen = !atTower && viewMode !== 'tower' && floorId !== null

  return (
    <aside className="tower-rail">
      <button type="button" className="tower-rail-brand" onClick={goToTower}>
        <span className="tower-rail-title">{strings.site.siteTitle}</span>
        <span className="tower-rail-code">{strings.site.siteCode}</span>
      </button>

      <nav aria-label="Floor navigation">
        <ul className="tower-rail-floors">
          {[...FLOORS].reverse().map((floor) => {
            const active = railFloorOpen && floor.id === floorId
            const loc = strings.floors[floor.id]
            return (
              <li key={floor.id} className={active ? 'is-active' : undefined}>
                <button type="button" onClick={() => toggleFloor(floor.id)}>
                  <span className="tower-rail-id">{floor.label}</span>
                  <span>{loc?.title ?? floor.title}</span>
                </button>

                {floor.id === '23' && active && (
                  <ul className="tower-rail-rooms">
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
                  <ul className="tower-rail-rooms">
                    {LAB_SUITES.map((suite) => (
                      <li key={suite.slug}>
                        <button
                          type="button"
                          className={labRoomSlug === suite.slug ? 'is-room-active' : undefined}
                          onClick={() => toggleLabRoom(suite.slug)}
                        >
                          {labCardTitle(suite.code)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {floor.id === '99' && active && (
                  <ul className="tower-rail-rooms">
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

      <p className="tower-rail-hint">{strings.site.hint}</p>
    </aside>
  )
}

/** Bottom-center status line */
export function TowerStatus() {
  const {
    hoveredFloorId,
    hoveredLabSlug,
    hoveredLibraryRoomSlug,
    hoveredFactoryStop,
    floorId,
    viewMode,
    atTower,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    prevFactoryStop,
    nextFactoryStop,
    strings,
  } = useSite()

  if (viewMode === 'tower' || atTower) {
    return (
      <div className="tower-status tower-status--muted">
        {strings.site.hint}
      </div>
    )
  }

  if (!floorId) {
    return (
      <div className="tower-status tower-status--muted">
        {strings.site.hint}
      </div>
    )
  }

  if (hoveredLabSlug && floorId === '52') {
    const suite = labSuite(hoveredLabSlug)
    if (suite) {
      return (
        <div className="tower-status" aria-live="polite">
          52 · {labCardTitle(suite.code)} · {labResearchTitle(suite, strings)}
        </div>
      )
    }
  }

  if (hoveredLibraryRoomSlug && floorId === '99') {
    const roomLabel =
      hoveredLibraryRoomSlug === 'archive' ? strings.library.archiveTitle : strings.library.libraryTitle
    return (
      <div className="tower-status" aria-live="polite">
        99 · {hoveredLibraryRoomSlug === 'archive' ? 'Archive' : 'Library'} · {roomLabel}
      </div>
    )
  }

  if (hoveredFactoryStop !== null && floorId === '23') {
    const sem = FACTORY_AREAS[hoveredFactoryStop]
    return (
      <div className="tower-status" aria-live="polite">
        23 · {areaLabel(hoveredFactoryStop)} · {sem?.label ?? ''}
      </div>
    )
  }

  if (hoveredFloorId) {
    const f = getFloor(hoveredFloorId)
    const loc = strings.floors[hoveredFloorId]
    return (
      <div className="tower-status" aria-live="polite">
        {f.label} · F{f.floorNumber} · {loc?.title ?? f.title}
      </div>
    )
  }

  if (floorId !== 'G') {
    const f = getFloor(floorId)
    const loc = strings.floors[floorId]

    if (floorId === '52' && labRoomSlug) {
      const suite = labSuite(labRoomSlug)
      if (suite) {
        return (
          <div className="tower-status tower-status--muted">
            {f.label} · {labCardTitle(suite.code)}
          </div>
        )
      }
    }

    if (floorId === '99' && libraryRoomSlug) {
      const roomLabel =
        libraryRoomSlug === 'archive' ? strings.library.archiveTitle : strings.library.libraryTitle
      return (
        <div className="tower-status tower-status--muted">
          {f.label} · {roomLabel}
        </div>
      )
    }

    if (floorId === '23') {
      const sem = factoryStop !== null ? FACTORY_AREAS[factoryStop] : null
      if (factoryStop !== null && sem) {
        const atFirst = factoryStop === 0
        const atLast = factoryStop === FACTORY_AREAS.length - 1
        return (
          <div className="tower-status tower-status--nav tower-status--muted" aria-live="polite">
            <button
              type="button"
              className="tower-status__chev tower-status__chev--prev"
              disabled={atFirst}
              aria-label="Previous area"
              onClick={prevFactoryStop}
            />
            <span className="tower-status__label">
              {f.label} · {areaLabel(factoryStop)} · {sem.label}
            </span>
            <button
              type="button"
              className="tower-status__chev tower-status__chev--next"
              disabled={atLast}
              aria-label="Next area"
              onClick={nextFactoryStop}
            />
          </div>
        )
      }
      return (
        <div className="tower-status tower-status--muted">
          {f.label} · {loc?.title}
        </div>
      )
    }

    return (
      <div className="tower-status tower-status--muted">
        {f.label} · {loc?.title ?? f.title}
      </div>
    )
  }

  return (
    <div className="tower-status tower-status--muted">
      {strings.site.hint}
    </div>
  )
}
