import { AnimatePresence, motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import { profile } from '../../data/profile'
import { gradeSummary, semesters } from '../../data/academic'
import { labProjects } from '../../data/projects'
import { credentials } from '../../data/credentials'
import { experiences } from '../../data/experience'
import { platformApps, platformSummary } from '../../data/platform'
import { courseLinks, skillGroups } from '../../data/skills'
import type { FloorId } from '../../building/program'
import type { LibraryRoomSlug } from '../../data/libraryRooms'
import { LIBRARY_ROOMS } from '../../data/libraryRooms'

const CRED_KEYS = [
  'deans-list',
  'degree',
  'techfest',
  'tsa-founder',
  'tsa-vp',
  'tsa-consultant',
  'acf',
] as const

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
      <p className="exhibit-card__eyebrow">{s.welcome}</p>
      <blockquote className="exhibit-card__thesis">{profile.thesis}</blockquote>
      <p className="exhibit-card__body">{profile.summary}</p>

      <div className="exhibit-stats exhibit-stats--hero">
        <div className="exhibit-stat exhibit-stat--hero">
          <span>{profile.wam}</span>
          <label>{s.wam}</label>
        </div>
        <div className="exhibit-stat">
          <span>{profile.cp}</span>
          <label>{s.cp}</label>
        </div>
        <div className="exhibit-stat">
          <span>{gradeSummary.HD}</span>
          <label>{s.hdCount}</label>
        </div>
        {profile.deansList && (
          <div className="exhibit-stat exhibit-stat--badge">
            <span>✦</span>
            <label>{s.deansList}</label>
          </div>
        )}
      </div>

      <dl className="exhibit-card__meta">
        <div><dt>{s.degree}</dt><dd>{profile.degree}</dd></div>
        <div><dt>{s.institution}</dt><dd>{profile.institution}</dd></div>
        <div><dt>{s.program}</dt><dd>{profile.programCode} · {profile.programStart} – {profile.programEnd}</dd></div>
        <div><dt>{s.location}</dt><dd>{profile.location}</dd></div>
      </dl>

      <h4 className="exhibit-section-title">{s.experienceTitle}</h4>
      <div className="exhibit-experience">
        {experiences.slice(0, 2).map((exp) => (
          <article key={exp.slug} className="exhibit-experience__item">
            <strong>{exp.title}</strong>
            <span>{exp.company} · {exp.start} – {exp.end}</span>
            <p>{exp.bullets[0]}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function WarehouseExhibit({ warehouseStop }: { warehouseStop: number }) {
  const { strings, setWarehouseStop } = useSite()
  const w = strings.warehouse
  const activeSem = semesters[warehouseStop]

  return (
    <>
      <div className="exhibit-stats">
        <div className="exhibit-stat"><span>{profile.wam}</span><label>{w.wam}</label></div>
        <div className="exhibit-stat"><span>{profile.cp}</span><label>{w.cp}</label></div>
        <div className="exhibit-stat"><span>{gradeSummary.HD}</span><label>{w.hd}</label></div>
        <div className="exhibit-stat"><span>{gradeSummary.D}</span><label>{w.d}</label></div>
      </div>

      <p className="exhibit-card__hint">{w.selectSemester}</p>

      <div className="exhibit-semester-tabs">
        {semesters.map((sem, i) => (
          <button
            key={sem.id}
            type="button"
            className={warehouseStop === i ? 'is-active' : undefined}
            onClick={() => setWarehouseStop(i)}
          >
            {sem.label}
          </button>
        ))}
      </div>

      {activeSem && (
        <div className="exhibit-timeline exhibit-timeline--focus">
          <div className="exhibit-timeline__sem">
            <div className="exhibit-timeline__head">
              <strong>{activeSem.label}</strong>
              {activeSem.avgMark !== null && <span>{w.avg} {activeSem.avgMark}</span>}
            </div>
            {activeSem.subjects.map((sub) => (
              <div key={sub.code} className="exhibit-timeline__row">
                <span>{sub.code} {sub.title}</span>
                <span className={gradeClass(sub.grade)}>{sub.mark ?? '—'} {sub.grade}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <details className="exhibit-details">
        <summary>{w.allSemesters}</summary>
        <div className="exhibit-timeline">
          {semesters.map((sem) => (
            <div key={sem.id} className="exhibit-timeline__sem">
              <div className="exhibit-timeline__head">
                <strong>{sem.label}</strong>
                {sem.avgMark !== null && <span>{w.avg} {sem.avgMark}</span>}
              </div>
              {sem.subjects.map((sub) => (
                <div key={sub.code} className="exhibit-timeline__row">
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
      <article className="exhibit-project exhibit-project--solo">
        <h4>{loc?.title ?? p.title}</h4>
        <p>{loc?.hook ?? p.hook}</p>
        <div className="exhibit-project__meta">
          <span>{l.role}: {loc?.role ?? p.role}</span>
          {(loc?.course ?? p.course) && <span>{l.course}: {loc?.course ?? p.course}</span>}
          {p.grade && <span>{p.mark} {p.grade}</span>}
        </div>
        {p.stack.length > 0 && (
          <p className="exhibit-project__stack">{p.stack.join(' · ')}</p>
        )}
        <div className="exhibit-project__links">
          {p.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
          ))}
        </div>
      </article>
    )
  }

  return (
    <>
      <p className="exhibit-card__body">{l.intro}</p>
      <p className="exhibit-card__hint">{l.selectRoom}</p>
      <div className="exhibit-projects">
        {labProjects.map((p) => {
          const loc = strings.projects[p.slug]
          return (
            <article key={p.slug} className="exhibit-project">
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
      <h4 className="exhibit-section-title">{i.skillsTitle}</h4>
      <div className="exhibit-skills">
        {skillGroups.map((g) => (
          <div key={g.category}>
            <strong>{strings.skillGroups[g.category as keyof typeof strings.skillGroups] ?? g.category}</strong>
            <p>{g.items.join(' · ')}</p>
          </div>
        ))}
      </div>
      <h4 className="exhibit-section-title">{i.coursesTitle}</h4>
      <div className="exhibit-courses">
        {courseLinks.map((c) => (
          <div key={c.code} className="exhibit-course">
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
      <p className="exhibit-card__body">{t.intro}</p>
      <p className="exhibit-card__body">{platformSummary}</p>
      <div className="exhibit-actions">
        <a className="exhibit-action" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <strong>{t.github}</strong><span>{t.githubDesc}</span><em>{t.openProfile}</em>
        </a>
        <a className="exhibit-action" href={profile.links.nagi} target="_blank" rel="noopener noreferrer">
          <strong>{t.nagi}</strong><span>{t.nagiDesc}</span><em>{t.openNagi}</em>
        </a>
        <a className="exhibit-action" href={profile.links.kata} target="_blank" rel="noopener noreferrer">
          <strong>{t.kata}</strong><span>{t.kataDesc}</span><em>{t.openKata}</em>
        </a>
        <button type="button" className="exhibit-action" onClick={() => window.print()}>
          <strong>{t.print}</strong><span>{t.printDesc}</span><em>{t.printNow}</em>
        </button>
      </div>
    </>
  )
}

function ArchiveExhibit() {
  const { strings } = useSite()
  const l = strings.library
  return (
    <>
      <p className="exhibit-card__body">{l.archiveIntro}</p>
      <div className="exhibit-credentials">
        {CRED_KEYS.map((key, idx) => {
          const cred = credentials[idx]
          const loc = strings.credentials[key]
          return (
            <article key={key} className="exhibit-credential">
              <time>{cred.year}</time>
              <h4>{loc?.title ?? cred.title}</h4>
              <p>{loc?.detail ?? cred.detail}</p>
            </article>
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
      <p className="exhibit-card__body">{l.libraryIntro}</p>
      <div className="exhibit-projects">
        {platformApps.map((app) => {
          const loc = strings.platformApps?.[app.slug]
          return (
            <article key={app.slug} className="exhibit-project">
              <h4>{loc?.name ?? app.name}</h4>
              <p>{loc?.hook ?? app.hook}</p>
              <p className="exhibit-project__stack">{app.stack.join(' · ')}</p>
              <div className="exhibit-project__links">
                <a href={app.url} target="_blank" rel="noopener noreferrer">{app.path} ↗</a>
              </div>
            </article>
          )
        })}
      </div>
      <h4 className="exhibit-section-title">{l.experienceTitle}</h4>
      <div className="exhibit-experience">
        {experiences.map((exp) => (
          <article key={exp.slug} className="exhibit-experience__item">
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
  const { strings } = useSite()
  const l = strings.library

  if (libraryRoomSlug === 'archive') return <ArchiveExhibit />
  if (libraryRoomSlug === 'library') return <LibraryPlatformExhibit />

  return (
    <>
      <p className="exhibit-card__body">{l.heroSub}</p>
      <p className="exhibit-card__hint">{l.selectRoom}</p>
      <div className="exhibit-room-cards">
        {LIBRARY_ROOMS.map((room) => (
          <article key={room.slug} className="exhibit-project">
            <h4>{room.slug === 'archive' ? l.archiveTitle : l.libraryTitle}</h4>
            <p>{room.slug === 'archive' ? l.archiveIntro : l.libraryIntro}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function RoofExhibit() {
  const { strings } = useSite()
  const r = strings.roof
  const links = [
    { label: 'Email', url: profile.links.email, desc: 'louis.li.builds@gmail.com' },
    { label: 'GitHub', url: profile.links.github, desc: 'louislibuilds' },
    { label: 'LinkedIn', url: profile.links.linkedin, desc: 'louis-li-builds' },
    { label: 'nagi', url: profile.links.nagi, desc: 'bubblechickenlab.com' },
    { label: 'KATA', url: profile.links.kata, desc: 'bubblechickenlab.com/kata' },
  ]
  return (
    <>
      <p className="exhibit-card__eyebrow">{r.site}</p>
      <h3 className="exhibit-card__name">{profile.displayName}</h3>
      <p className="exhibit-card__legal">{profile.legalName} · {profile.location}</p>
      <div className="exhibit-contacts">
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
      <p className="exhibit-card__footer">{r.footer}</p>
    </>
  )
}

function ExhibitBody({
  floorId,
  labRoomSlug,
  libraryRoomSlug,
  warehouseStop,
}: {
  floorId: FloorId
  labRoomSlug: string | null
  libraryRoomSlug: LibraryRoomSlug | null
  warehouseStop: number
}) {
  switch (floorId) {
    case 'G': return <LobbyExhibit />
    case '23': return <WarehouseExhibit warehouseStop={warehouseStop} />
    case '52': return <LabExhibit labRoomSlug={labRoomSlug} />
    case 'B2': return <InfraExhibit />
    case 'B10': return <TechExhibit />
    case '99': return <Floor99Exhibit libraryRoomSlug={libraryRoomSlug} />
    case 'roof': return <RoofExhibit />
    default: return null
  }
}

export function ExhibitOverlay() {
  const { floorId, labRoomSlug, libraryRoomSlug, warehouseStop, floor, direction, strings } = useSite()
  const floorStrings = strings.floors[floorId]
  const overlayKey =
    floorId === '52' && labRoomSlug
      ? `${floorId}-${labRoomSlug}`
      : floorId === '99' && libraryRoomSlug
        ? `${floorId}-${libraryRoomSlug}`
        : floorId === '23'
          ? `${floorId}-${warehouseStop}`
          : floorId

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.aside
        key={overlayKey}
        className="exhibit-overlay"
        custom={direction}
        initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-label={floorStrings?.exhibitTitle}
      >
        <header className="exhibit-card__header">
          <span className="exhibit-card__badge" data-zone={floor.zone}>{floor.label}</span>
          <div>
            <h2>{floorStrings?.exhibitTitle ?? floor.title}</h2>
            <p>{floorStrings?.exhibitHook ?? floor.subtitle}</p>
          </div>
        </header>
        <div className="exhibit-card__scroll">
          <ExhibitBody
            floorId={floorId}
            labRoomSlug={labRoomSlug}
            libraryRoomSlug={libraryRoomSlug}
            warehouseStop={warehouseStop}
          />
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
