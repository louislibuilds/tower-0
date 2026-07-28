import { AnimatePresence, motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import { profile } from '../../data/profile'
import { gradeSummary } from '../../data/academic'
import { labProjects } from '../../data/projects'
import { credentials } from '../../data/credentials'
import { libraryBooks } from '../../data/libraryBooks'
import { experiences } from '../../data/experience'
import { platformApps, platformSummary } from '../../data/platform'
import { courseLinks, skillGroups } from '../../data/skills'
import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { LIBRARY_ROOMS } from '../../data/libraryRooms'

import { FACTORY_AREAS, areaLabel } from '../../scene/factoryStops'

function gradeClass(grade: string) {
  if (grade === 'HD') return 'grade-hd'
  if (grade === 'D') return 'grade-d'
  return 'grade-cr'
}

function LobbyExhibit() {
  const { strings } = useSite()
  const s = strings.lobby
  return (
    <>
      <p className="tower-exhibit-card__eyebrow">{s.welcome}</p>
      <blockquote className="tower-exhibit-card__thesis">{s.thesis}</blockquote>
      <p className="tower-exhibit-card__body">{s.bio}</p>

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
        <div><dt>{s.degree}</dt><dd>{profile.degree}</dd></div>
        <div><dt>{s.institution}</dt><dd>{profile.institution}</dd></div>
        <div><dt>{s.program}</dt><dd>{profile.programCode} · {profile.programStart} – {profile.programEnd}</dd></div>
        <div><dt>{s.location}</dt><dd>{profile.location}</dd></div>
      </dl>

      <h4 className="tower-exhibit-section-title">{s.experienceTitle}</h4>
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

function FactoryOverview() {
  const { strings } = useSite()
  const w = strings.factory
  const s = strings.lobby
  return (
    <>
      <div className="tower-exhibit-stats tower-exhibit-stats--hero">
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{profile.wam}</span><label>{w.wam}</label></div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.HD}</span><label>{w.hd}</label></div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.D}</span><label>{w.d}</label></div>
        {profile.deansList && (
          <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>✦</span><label>{s.deansList}</label></div>
        )}
      </div>
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
  const s = strings.lobby
  const activeSem = FACTORY_AREAS[factoryStop]

  return (
    <>
      <div className="tower-exhibit-stats tower-exhibit-stats--hero">
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{profile.wam}</span><label>{w.wam}</label></div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.HD}</span><label>{w.hd}</label></div>
        <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>{gradeSummary.D}</span><label>{w.d}</label></div>
        {profile.deansList && (
          <div className="tower-exhibit-stat tower-exhibit-stat--hero"><span>✦</span><label>{s.deansList}</label></div>
        )}
      </div>

      <p className="tower-exhibit-card__hint">{w.selectArea}</p>

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
  const { strings } = useSite()
  const l = strings.lab

  if (labRoomSlug) {
    const p = labProjects.find((proj) => proj.slug === labRoomSlug)
    if (!p) return null
    const loc = strings.projects[p.slug]
    return (
      <article className="tower-exhibit-project tower-exhibit-project--solo">
        <h4>{loc?.title ?? p.title}</h4>
        <p>{loc?.hook ?? p.hook}</p>
        <div className="tower-exhibit-project__meta">
          <span>{l.role}: {loc?.role ?? p.role}</span>
          {(loc?.course ?? p.course) && <span>{l.course}: {loc?.course ?? p.course}</span>}
          {p.grade && <span>{p.mark} {p.grade}</span>}
        </div>
        {p.stack.length > 0 && (
          <p className="tower-exhibit-project__stack">{p.stack.join(' · ')}</p>
        )}
        <div className="tower-exhibit-project__links">
          {p.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
          ))}
        </div>
      </article>
    )
  }

  return (
    <>
      <p className="tower-exhibit-card__body">{l.intro}</p>
      <p className="tower-exhibit-card__hint">{l.selectRoom}</p>
      <div className="tower-exhibit-projects">
        {labProjects.map((p) => {
          const loc = strings.projects[p.slug]
          return (
            <article key={p.slug} className="tower-exhibit-project">
              <h4>{loc?.title ?? p.title}</h4>
              <p>{loc?.hook ?? p.hook}</p>
            </article>
          )
        })}
      </div>
    </>
  )
}

function InfraExhibit() {
  const { strings } = useSite()
  const i = strings.infra
  return (
    <>
      <h4 className="tower-exhibit-section-title">{i.skillsTitle}</h4>
      <div className="tower-exhibit-skills">
        {skillGroups.map((g) => (
          <div key={g.category}>
            <strong>{strings.skillGroups[g.category as keyof typeof strings.skillGroups] ?? g.category}</strong>
            <p>{g.items.join(' · ')}</p>
          </div>
        ))}
      </div>
      <h4 className="tower-exhibit-section-title">{i.coursesTitle}</h4>
      <div className="tower-exhibit-courses">
        {courseLinks.map((c) => (
          <div key={c.code} className="tower-exhibit-course">
            <span>{c.code}</span>
            <span>{c.title}</span>
            <span className={`grade-${c.grade.toLowerCase()}`}>{c.mark ?? '—'} {c.grade}</span>
            {c.projectUrl && (
              <a href={c.projectUrl} target="_blank" rel="noopener noreferrer">{i.viewProject}</a>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

function TechExhibit() {
  const { strings } = useSite()
  const t = strings.tech
  return (
    <>
      <p className="tower-exhibit-card__body">{t.intro}</p>
      <p className="tower-exhibit-card__body">{platformSummary}</p>
      <div className="tower-exhibit-actions">
        <a className="tower-exhibit-action" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <strong>{t.github}</strong><span>{t.githubDesc}</span><em>{t.openProfile}</em>
        </a>
        <a className="tower-exhibit-action" href={profile.links.nagi} target="_blank" rel="noopener noreferrer">
          <strong>{t.nagi}</strong><span>{t.nagiDesc}</span><em>{t.openNagi}</em>
        </a>
        <a className="tower-exhibit-action" href={profile.links.kata} target="_blank" rel="noopener noreferrer">
          <strong>{t.kata}</strong><span>{t.kataDesc}</span><em>{t.openKata}</em>
        </a>
        <button type="button" className="tower-exhibit-action" onClick={() => window.print()}>
          <strong>{t.print}</strong><span>{t.printDesc}</span><em>{t.printNow}</em>
        </button>
      </div>
    </>
  )
}

function ArchiveExhibit() {
  const { strings, toggleCredential } = useSite()
  const l = strings.library
  return (
    <>
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
  const { strings } = useSite()
  const l = strings.library
  return (
    <>
      <p className="tower-exhibit-card__body">{l.libraryIntro}</p>
      <div className="tower-exhibit-projects">
        {platformApps.map((app) => {
          const loc = strings.platformApps?.[app.slug]
          return (
            <article key={app.slug} className="tower-exhibit-project">
              <h4>{loc?.name ?? app.name}</h4>
              <p>{loc?.hook ?? app.hook}</p>
              <p className="tower-exhibit-project__stack">{app.stack.join(' · ')}</p>
              <div className="tower-exhibit-project__links">
                <a href={app.url} target="_blank" rel="noopener noreferrer">{app.path} ↗</a>
              </div>
            </article>
          )
        })}
      </div>
      <h4 className="tower-exhibit-section-title">{l.experienceTitle}</h4>
      <div className="tower-exhibit-experience">
        {experiences.map((exp) => (
          <article key={exp.slug} className="tower-exhibit-experience__item">
            <strong>{exp.title}</strong>
            <span>{exp.company} · {exp.start} – {exp.end}</span>
            <ul>
              {exp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
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
      <p className="tower-exhibit-card__eyebrow tower-exhibit-roof__eyebrow">{l.heroTagline}</p>
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
  const { strings } = useSite()
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
      <button type="button" className="tower-exhibit-roof__print" onClick={() => window.print()}>
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
    return (
      <>
        <p className="tower-exhibit-card__eyebrow">{strings.library.libraryTitle}</p>
        <h3 className="tower-exhibit-card__name">{book.title}</h3>
        <p className="tower-exhibit-card__body">
          {book.slug === 'nagi'
            ? strings.platformApps.nagi.hook
            : book.slug === 'kata'
              ? strings.platformApps['kata-editor'].hook
              : book.url}
        </p>
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
  const isVaultOverview = floorId === '99' && !libraryRoomSlug && viewMode !== 'focus'
  const isMinimalPanel = isRoofPanel || isVaultOverview

  const headerTitle =
    floorId === '23'
      ? strings.factory.panelTitle
      : floorId === 'roof'
        ? floorStrings?.title ?? floor.title
        : floorId === '99' && libraryRoomSlug === 'archive'
          ? strings.library.archiveTitle
          : floorId === '99' && libraryRoomSlug === 'library'
            ? strings.library.libraryTitle
            : floorStrings?.exhibitTitle ?? floor.title
  const headerSubtitle =
    floorId === '23'
      ? `${strings.factory.panelFloor} — ${floorStrings?.exhibitHook ?? floor.subtitle}`
      : floorId === 'roof' || isVaultOverview
        ? null
        : floorId === '99' && libraryRoomSlug
          ? null
          : floorStrings?.exhibitHook ?? floor.subtitle

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
            <ExhibitBody
              floorId={floorId}
              labRoomSlug={labRoomSlug}
              libraryRoomSlug={libraryRoomSlug}
              factoryStop={factoryStop}
            />
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
