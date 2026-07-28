import { AnimatePresence, motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import { profile } from '../../data/profile'
import { gradeSummary } from '../../data/academic'
import { LAB_SUITES, labCardTitle, labProject, labSuite, labTagline } from '../../data/labs'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import { experiences } from '../../data/experience'
import { techCentreLinks } from '../../data/techLinks'
import { ResumePdfPreview } from '../resume/ResumePdfPreview'
import { resumeLocaleForSite } from '../../data/resumePrint'
import { softSkillGroups, techSkillGroups } from '../../data/skills'
import { FLOOR_HERO_TAGLINES, LOBBY_RESUME_LABELS, TECH_SKILLS_TITLE } from '../../data/resumeLabels'
import type { FloorId } from '../../building/program'
import { FLOORS } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { LIBRARY_ROOMS } from '../../data/libraryRooms'

import { FACTORY_AREAS, areaLabel, factoryHighlight } from '../../scene/factoryStops'

function gradeClass(grade: string) {
  if (grade === 'HD') return 'grade-hd'
  if (grade === 'D') return 'grade-d'
  return 'grade-cr'
}

function LobbyPanelHeader() {
  const { strings } = useSite()
  const s = strings.lobby
  const eyebrow = `G · ${profile.brand} · ${profile.siteCode}`

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{s.welcomeName}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{profile.tagline}</p>
      <hr className="tower-exhibit-roof__rule" />
      <blockquote className="tower-exhibit-card__thesis">{s.motto}</blockquote>
      <p className="tower-exhibit-card__body">{s.floorIntro}</p>
    </>
  )
}

function LobbyExhibit() {
  const { strings } = useSite()
  const s = strings.lobby
  return (
    <>
      <LobbyPanelHeader />

      <div className="tower-exhibit-stats tower-exhibit-stats--hero">
        <div className="tower-exhibit-stat tower-exhibit-stat--hero">
          <span>{profile.gpa}/{profile.gpaScale}</span>
          <label>{s.gpa}</label>
        </div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero">
          <span>{profile.wam}</span>
          <label>{s.wam}</label>
        </div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero">
          <span>{gradeSummary.HD}</span>
          <label>{s.hdCount}</label>
        </div>
        {profile.deansList && (
          <div className="tower-exhibit-stat tower-exhibit-stat--hero">
            <span>✦</span>
            <label>{s.deansList}</label>
          </div>
        )}
      </div>

      <dl className="tower-exhibit-card__meta">
        <div><dt>{LOBBY_RESUME_LABELS.degree}</dt><dd>{profile.degree}</dd></div>
        <div><dt>{LOBBY_RESUME_LABELS.institution}</dt><dd>{profile.institution}</dd></div>
        <div><dt>{LOBBY_RESUME_LABELS.program}</dt><dd>{profile.programCode} · {profile.programStart} – {profile.programEnd}</dd></div>
        <div><dt>{LOBBY_RESUME_LABELS.location}</dt><dd>{profile.location}</dd></div>
      </dl>

      <h4 className="tower-exhibit-section-title">{LOBBY_RESUME_LABELS.experience}</h4>
      <div className="tower-exhibit-experience">
        {experiences.slice(0, 2).map((exp) => (
          <article key={exp.slug} className="tower-exhibit-experience__item">
            <strong>{exp.title}</strong>
            <span>{exp.company} · {exp.start} – {exp.end}</span>
            <p>{exp.bullets[0]}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function FactoryStats() {
  const { strings } = useSite()
  const w = strings.factory
  const s = strings.lobby
  return (
    <div className="tower-exhibit-stats tower-exhibit-stats--hero">
      <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{profile.wam}</span><label>{w.wam}</label></div>
      <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.HD}</span><label>{w.hd}</label></div>
      <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.D}</span><label>{w.d}</label></div>
      {profile.deansList && (
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>✦</span><label>{s.deansList}</label></div>
      )}
    </div>
  )
}

function FactoryPanelHeader({ areaIndex }: { areaIndex?: number }) {
  const { strings } = useSite()
  const w = strings.factory
  const eyebrow = `23F · ${profile.brand} · ${profile.siteCode}`

  if (areaIndex !== undefined) {
    const sem = FACTORY_AREAS[areaIndex]
    const hl = factoryHighlight(areaIndex)
    return (
      <>
        <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
        <h3 className="tower-exhibit-card__name">{areaLabel(areaIndex)} · {sem.label}</h3>
        <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">
          {hl.project} ‧ {hl.takeaway}
        </p>
        <hr className="tower-exhibit-roof__rule" />
      </>
    )
  }

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{w.heroTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{FLOOR_HERO_TAGLINES.factory}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{w.floorIntro}</p>
    </>
  )
}

function FactoryOverview() {
  const { strings } = useSite()
  const w = strings.factory
  return (
    <>
      <FactoryPanelHeader />
      <FactoryStats />
      <p className="tower-exhibit-card__hint">{w.selectArea}</p>
      <div className="tower-exhibit-timeline">
        {FACTORY_AREAS.map((sem, i) => (
          <div key={sem.id} className="tower-exhibit-timeline__sem">
            <div className="tower-exhibit-timeline__head">
              <strong>{areaLabel(i)} · {sem.label}</strong>
              {sem.avgMark !== null && <span>{w.avg} {sem.avgMark}</span>}
            </div>
            {sem.subjects.map((sub) => (
              <div key={sub.code} className="tower-exhibit-timeline__row">
                <span>{sub.code} {sub.title}</span>
                <span className={gradeClass(sub.grade)}>{sub.mark ?? '—'} {sub.grade}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function FactoryExhibit({ factoryStop }: { factoryStop: number }) {
  const { strings, toggleFactoryStop } = useSite()
  const w = strings.factory
  const activeSem = FACTORY_AREAS[factoryStop]

  return (
    <>
      <FactoryPanelHeader areaIndex={factoryStop} />
      <FactoryStats />

      <div className="tower-exhibit-semester-tabs">
        {FACTORY_AREAS.map((sem, i) => (
          <button
            key={sem.id}
            type="button"
            className={factoryStop === i ? 'is-active' : undefined}
            onClick={() => toggleFactoryStop(i)}
          >
            {areaLabel(i)} · {sem.label}
          </button>
        ))}
      </div>

      {activeSem && (
        <div className="tower-exhibit-timeline tower-exhibit-timeline--focus">
          <div className="tower-exhibit-timeline__sem">
            <div className="tower-exhibit-timeline__head">
              <strong>{areaLabel(factoryStop)} · {activeSem.label}</strong>
              {activeSem.avgMark !== null && <span>{w.avg} {activeSem.avgMark}</span>}
            </div>
            {activeSem.subjects.map((sub) => (
              <div key={sub.code} className="tower-exhibit-timeline__row">
                <span>{sub.code} {sub.title}</span>
                <span className={gradeClass(sub.grade)}>{sub.mark ?? '—'} {sub.grade}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <details className="tower-exhibit-details">
        <summary>{w.allAreas}</summary>
        <div className="tower-exhibit-timeline">
          {FACTORY_AREAS.map((sem, i) => (
            <div key={sem.id} className="tower-exhibit-timeline__sem">
              <div className="tower-exhibit-timeline__head">
                <strong>{areaLabel(i)} · {sem.label}</strong>
                {sem.avgMark !== null && <span>{w.avg} {sem.avgMark}</span>}
              </div>
              {sem.subjects.map((sub) => (
                <div key={sub.code} className="tower-exhibit-timeline__row">
                  <span>{sub.code} {sub.title}</span>
                  <span className={gradeClass(sub.grade)}>{sub.mark ?? '—'} {sub.grade}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
    </>
  )
}

function LabExhibit({ labRoomSlug }: { labRoomSlug: string | null }) {
  const { strings, toggleLabRoom } = useSite()
  const l = strings.lab
  const eyebrow = `52F · ${profile.brand} · ${profile.siteCode}`

  if (labRoomSlug) {
    const suite = labSuite(labRoomSlug)
    if (!suite) return null
    const p = labProject(labRoomSlug)
    const loc = p ? strings.projects[p.slug as keyof typeof strings.projects] : null
    const cardTitle = labCardTitle(suite.code)
    const tagline = labTagline(suite, strings)

    if (suite.empty) {
      return (
        <>
          <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
          <h3 className="tower-exhibit-card__name">{cardTitle}</h3>
          <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{tagline}</p>
          <hr className="tower-exhibit-roof__rule" />
          <p className="tower-exhibit-card__body">{l.emptyIntro}</p>
        </>
      )
    }

    if (!p) return null

    return (
      <>
        <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
        <h3 className="tower-exhibit-card__name">{cardTitle}</h3>
        <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{tagline}</p>
        <hr className="tower-exhibit-roof__rule" />
        {(loc?.body ?? loc?.hook ?? p.hook).split('\n\n').map((para, i) => (
          <p key={i} className="tower-exhibit-card__body">{para}</p>
        ))}
        <div className="tower-exhibit-project__meta">
          <span>{l.role}: {loc?.role ?? p.role}</span>
          {(loc?.team ?? p.team) && <span>{l.team}: {loc?.team ?? p.team}</span>}
          {(loc?.course ?? p.course) && <span>{l.course}: {loc?.course ?? p.course}</span>}
          {p.stack.length > 0 && (
            <span className="tower-exhibit-project__stack">{p.stack.join(' · ')}</span>
          )}
        </div>
        <div className="tower-exhibit-project__links">
          {p.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{l.heroTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{FLOOR_HERO_TAGLINES.lab}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{l.floorIntro}</p>
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {LAB_SUITES.map((suite) => (
          <button
            key={suite.slug}
            type="button"
            className="tower-exhibit-vault-entry"
            onClick={() => toggleLabRoom(suite.slug)}
          >
            <strong>{labCardTitle(suite.code)}</strong>
            <span>{labTagline(suite, strings)}</span>
          </button>
        ))}
      </div>
    </>
  )
}

function ExhibitElevator({ currentFloorId }: { currentFloorId: FloorId }) {
  const { strings, toggleFloor } = useSite()

  return (
    <nav className="tower-exhibit-elevator" aria-label={strings.site.elevatorLabel}>
      <p className="tower-exhibit-elevator__label">{strings.site.elevatorLabel}</p>
      <ul className="tower-exhibit-elevator__shaft">
        {FLOORS.map((floor) => {
          const loc = strings.floors[floor.id]
          const isHere = floor.id === currentFloorId
          const title = loc?.title ?? floor.title
          return (
            <li key={floor.id}>
              <button
                type="button"
                className={isHere ? 'is-here' : undefined}
                disabled={isHere}
                aria-current={isHere ? 'location' : undefined}
                aria-label={`${floor.label} · ${title}`}
                onClick={() => toggleFloor(floor.id)}
              >
                {floor.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function InfraPanelHeader() {
  const { strings } = useSite()
  const b = strings.infra
  const eyebrow = `B2 · ${profile.brand} · ${profile.siteCode}`

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{b.heroTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{FLOOR_HERO_TAGLINES.infra}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{b.floorIntro}</p>
    </>
  )
}

function TechSkillGroupList() {
  return (
    <div className="tower-exhibit-skills">
      {techSkillGroups.map((g) => (
        <div key={g.category}>
          <strong>{g.category}</strong>
          <p>{g.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

function SoftSkillGroupList({ groups }: { groups: typeof softSkillGroups }) {
  return (
    <div className="tower-exhibit-skills">
      {groups.map((g) => (
        <div key={g.category}>
          <strong>{g.category}</strong>
          <p>{g.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

function InfraExhibit() {
  const { strings } = useSite()
  const i = strings.infra
  return (
    <>
      <InfraPanelHeader />
      <h4 className="tower-exhibit-section-title">{TECH_SKILLS_TITLE}</h4>
      <TechSkillGroupList />
      <h4 className="tower-exhibit-section-title">{i.softSkillsTitle}</h4>
      <SoftSkillGroupList groups={i.softSkillGroups} />
    </>
  )
}

function TechPanelHeader() {
  const { strings } = useSite()
  const t = strings.tech
  const eyebrow = `B10 · ${profile.brand} · ${profile.siteCode}`

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{t.heroTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{FLOOR_HERO_TAGLINES.tech}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{t.floorIntro}</p>
    </>
  )
}

function TechExhibit() {
  const { strings, locale, openResumePreview, printResume } = useSite()
  const t = strings.tech
  const resumeLocale = resumeLocaleForSite(locale)

  return (
    <>
      <TechPanelHeader />

      <h4 className="tower-exhibit-section-title">{t.socialTitle}</h4>
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {techCentreLinks.map((link) => (
          <a
            key={link.key}
            className="tower-exhibit-vault-entry tower-exhibit-vault-entry--link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>{t.linkLabels[link.key]}</strong>
            <span>{link.desc}</span>
          </a>
        ))}
      </div>

      <h4 className="tower-exhibit-section-title">{t.printerTitle}</h4>
      <p className="tower-exhibit-card__body">{t.resumeIntro}</p>
      <div className="tower-resume-preview-embed">
        <ResumePdfPreview resumeLocale={resumeLocale} compact />
      </div>

      <div className="tower-exhibit-actions">
        <button type="button" className="tower-exhibit-action" onClick={openResumePreview}>
          <strong>{t.openPreview}</strong>
          <span>{t.previewHint}</span>
          <em>{t.openPreview}</em>
        </button>
        <button type="button" className="tower-exhibit-action" onClick={printResume}>
          <strong>{t.print}</strong>
          <span>{t.printDesc}</span>
          <em>{t.printNow}</em>
        </button>
      </div>

      <p className="tower-exhibit-card__body tower-exhibit-card__body--mute">
        {t.kataNote}{' '}
        <a href={profile.links.kata} target="_blank" rel="noopener noreferrer">
          {t.openKata}
        </a>
      </p>
    </>
  )
}

function ArchiveExhibit() {
  const { strings, toggleCredential } = useSite()
  const l = strings.library
  const eyebrow = `99F · ${profile.brand} · ${profile.siteCode}`

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{l.archiveTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{l.archiveTagline}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{l.archiveIntro}</p>
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {credentials.map((cred) => {
          const loc = strings.credentials[cred.slug as keyof typeof strings.credentials]
          return (
            <button
              key={cred.slug}
              type="button"
              className="tower-exhibit-vault-entry"
              onClick={() => toggleCredential(cred.slug)}
            >
              <strong>{loc?.title ?? cred.title}</strong>
              <span>{cred.year} · {loc?.detail ?? cred.detail ?? cred.issuer}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

function LibraryPlatformExhibit() {
  const { strings, toggleBook } = useSite()
  const l = strings.library
  const eyebrow = `99F · ${profile.brand} · ${profile.siteCode}`
  const featured = experiences.find((exp) => exp.slug === 'bubblechickenlab')

  const bookDetail = (slug: string) => l.publications[slug]?.description ?? ''

  const bookTitle = (slug: string, fallback: string) => l.publications[slug]?.title ?? fallback

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{l.libraryTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{l.libraryTagline}</p>
      <hr className="tower-exhibit-roof__rule" />
      <p className="tower-exhibit-card__body">{l.libraryIntro}</p>
      {featured && (
        <>
          <h4 className="tower-exhibit-section-title">{l.librarianTitle}</h4>
          <div className="tower-exhibit-experience">
            <article className="tower-exhibit-experience__item">
              <strong>{profile.displayName}</strong>
              <span>{l.featuredRole}</span>
              <span>{featured.company} · {featured.start} – {featured.end}</span>
              <ul>
                {l.featuredBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </div>
        </>
      )}
      <h4 className="tower-exhibit-section-title">{l.publicationsTitle}</h4>
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {libraryBooks.map((book) => (
          <button
            key={book.slug}
            type="button"
            className="tower-exhibit-vault-entry"
            onClick={() => toggleBook(book.slug)}
          >
            <strong>{bookTitle(book.slug, book.title)}</strong>
            <span>{bookDetail(book.slug)}</span>
          </button>
        ))}
      </div>
    </>
  )
}

function Floor99Exhibit({ libraryRoomSlug }: { libraryRoomSlug: LibraryRoomSlug | null }) {
  const { strings, toggleLibraryRoom } = useSite()
  const l = strings.library

  if (libraryRoomSlug === 'archive') return <ArchiveExhibit />
  if (libraryRoomSlug === 'library') return <LibraryPlatformExhibit />

  const eyebrow = `99F · ${profile.brand} · ${profile.siteCode}`

  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{l.heroTitle}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{FLOOR_HERO_TAGLINES.library}</p>
      <hr className="tower-exhibit-roof__rule" />
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {LIBRARY_ROOMS.map((room) => (
          <button
            key={room.slug}
            type="button"
            className="tower-exhibit-vault-entry"
            onClick={() => toggleLibraryRoom(room.slug)}
          >
            <strong>{room.slug === 'archive' ? l.archiveTitle : l.libraryTitle}</strong>
            <span>{room.slug === 'archive' ? l.archiveIntro : l.libraryIntro}</span>
          </button>
        ))}
      </div>
    </>
  )
}

function RoofExhibit() {
  const { strings, openResumePreview } = useSite()
  const r = strings.roof
  const eyebrow = `${profile.locationShort} · ${profile.brand} · ${profile.siteCode}`
  const links = [
    { label: r.linkLabels.email, url: profile.links.email, desc: 'louis.li.builds@gmail.com' },
    { label: r.linkLabels.github, url: profile.links.github, desc: 'louislibuilds' },
    { label: r.linkLabels.linkedin, url: profile.links.linkedin, desc: 'louis-li-builds' },
    { label: r.linkLabels.portfolio, url: profile.links.portfolio, desc: 'bubblechickenlab.com/work' },
    { label: r.linkLabels.kata, url: profile.links.kata, desc: 'bubblechickenlab.com/kata' },
  ]
  return (
    <>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{eyebrow}</p>
      <h3 className="tower-exhibit-card__name">{profile.displayName}</h3>
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{r.cta}</p>
      <hr className="tower-exhibit-roof__rule" />
      <div className="tower-exhibit-contacts tower-exhibit-contacts--stack">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          >
            <strong>{link.label}</strong><span>{link.desc}</span>
          </a>
        ))}
      </div>
      <button type="button" className="tower-exhibit-roof__print" onClick={openResumePreview}>
        {r.printResume}
      </button>
    </>
  )
}

function FocusExhibit() {
  const { strings, selectedBookSlug, selectedCredentialSlug, handleBookClick } = useSite()
  const f = strings.focus

  if (selectedBookSlug) {
    const book = libraryBooks.find((b) => b.slug === selectedBookSlug)
    if (!book) return null
    const pub = strings.library.publications[book.slug]
    return (
      <>
        <p className="tower-exhibit-card__eyebrow">{strings.library.libraryTitle}</p>
        <h3 className="tower-exhibit-card__name">{pub?.title ?? book.title}</h3>
        <p className="tower-exhibit-card__body">{pub?.description ?? book.url}</p>
        <button type="button" className="tower-exhibit-card__action" onClick={() => handleBookClick(book.slug)}>
          {f.bookOpen}
        </button>
      </>
    )
  }

  if (selectedCredentialSlug) {
    const cred = credentials.find((c) => c.slug === selectedCredentialSlug)
    const loc = cred ? strings.credentials[cred.slug as keyof typeof strings.credentials] : null
    if (!cred) return null
    const summary = loc?.detail ?? cred.detail
    const body = loc?.body ?? cred.body
    const bullets = loc?.bullets ?? cred.bullets
    const credit = loc?.credit ?? cred.credit
    const showSummary = summary && summary !== cred.issuer
    return (
      <>
        <p className="tower-exhibit-card__eyebrow">{f.credentialEyebrow}</p>
        <time className="tower-exhibit-card__meta">{cred.year}</time>
        <h3 className="tower-exhibit-card__name">{loc?.title ?? cred.title}</h3>
        <p className="tower-exhibit-card__issuer">{cred.issuer}</p>
        {showSummary && <p className="tower-exhibit-card__body tower-exhibit-card__body--lead">{summary}</p>}
        {body && <p className="tower-exhibit-card__body">{body}</p>}
        {bullets && bullets.length > 0 && (
          <ul className="tower-exhibit-card__bullets">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {credit && <p className="tower-exhibit-card__body tower-exhibit-card__body--credit">{credit}</p>}
      </>
    )
  }

  return null
}

function ExhibitBody({
  floorId,
  labRoomSlug,
  libraryRoomSlug,
  factoryStop,
}: {
  floorId: FloorId
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  factoryStop: number | null
}) {
  switch (floorId) {
    case 'G': return <LobbyExhibit />
    case '23': return factoryStop !== null ? <FactoryExhibit factoryStop={factoryStop} /> : <FactoryOverview />
    case '52': return <LabExhibit labRoomSlug={labRoomSlug} />
    case 'B2': return <InfraExhibit />
    case 'B10': return <TechExhibit />
    case '99': return <Floor99Exhibit libraryRoomSlug={libraryRoomSlug} />
    case 'roof': return <RoofExhibit />
    default: return null
  }
}

export function ExhibitOverlay() {
  const {
    floorId,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    floor,
    direction,
    strings,
    viewMode,
    selectedBookSlug,
    selectedCredentialSlug,
  } = useSite()

  if (!floorId || !floor) return null

  const floorStrings = strings.floors[floorId]
  const overlayKey =
    viewMode === 'focus'
      ? `focus-${selectedBookSlug ?? selectedCredentialSlug ?? 'none'}`
      : floorId === '52' && labRoomSlug
        ? `${floorId}-${labRoomSlug}`
        : floorId === '99' && libraryRoomSlug
          ? `${floorId}-${libraryRoomSlug}`
          : floorId === '23' && factoryStop !== null
            ? `${floorId}-${factoryStop}`
            : floorId

  const isRoofPanel = floorId === 'roof' && viewMode !== 'focus'
  const isVaultPanel = floorId === '99'
  const isLabPanel = floorId === '52'
  const isFactoryPanel = floorId === '23'
  const isLobbyPanel = floorId === 'G'
  const isInfraPanel = floorId === 'B2'
  const isTechPanel = floorId === 'B10'
  const isMinimalPanel = isRoofPanel || isVaultPanel || isLabPanel || isFactoryPanel || isLobbyPanel || isInfraPanel || isTechPanel

  const headerTitle =
    floorStrings?.exhibitTitle ?? floor.title
  const headerSubtitle = floorStrings?.exhibitHook ?? floor.subtitle

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.aside
        key={overlayKey}
        className={isMinimalPanel ? 'tower-exhibit tower-exhibit--roof' : 'tower-exhibit'}
        custom={direction}
        initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-label={floorId === 'roof' ? profile.displayName : floorStrings?.exhibitTitle}
      >
        {!isMinimalPanel && (
        <header className="tower-exhibit-card__header">
          <span className="tower-exhibit-card__badge" data-zone={floor.zone}>{floor.label}</span>
          <div>
            <h2>{headerTitle}</h2>
            {headerSubtitle && <p>{headerSubtitle}</p>}
          </div>
        </header>
        )}
        <div className="tower-exhibit-card__scroll">
          {viewMode === 'focus' ? (
            <FocusExhibit />
          ) : (
            <>
              <ExhibitBody
                floorId={floorId}
                labRoomSlug={labRoomSlug}
                libraryRoomSlug={libraryRoomSlug}
                factoryStop={factoryStop}
              />
              <ExhibitElevator currentFloorId={floorId} />
            </>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
