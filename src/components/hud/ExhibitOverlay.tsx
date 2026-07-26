import { AnimatePresence, motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import { profile } from '../../data/profile'
import { gradeSummary, semesters } from '../../data/academic'
import { labProjects } from '../../data/projects'
import { credentials } from '../../data/credentials'
import { courseLinks, skillGroups } from '../../data/skills'
import type { FloorId } from '../../building/program'

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
      <blockquote className="exhibit-card__thesis">{s.thesis}</blockquote>
      <p className="exhibit-card__body">{s.bio}</p>
      <dl className="exhibit-card__meta">
        <div><dt>{s.degree}</dt><dd>{profile.degree}</dd></div>
        <div><dt>{s.institution}</dt><dd>{profile.institution}</dd></div>
        <div><dt>{s.wam}</dt><dd>{profile.wam}</dd></div>
        <div><dt>{s.location}</dt><dd>{profile.location}</dd></div>
      </dl>
    </>
  )
}

function WarehouseExhibit() {
  const { strings } = useSite()
  const w = strings.warehouse
  return (
    <>
      <div className="exhibit-stats">
        <div className="exhibit-stat"><span>{profile.wam}</span><label>{w.wam}</label></div>
        <div className="exhibit-stat"><span>{profile.cp}</span><label>{w.cp}</label></div>
        <div className="exhibit-stat"><span>{gradeSummary.HD}</span><label>{w.hd}</label></div>
        <div className="exhibit-stat"><span>{gradeSummary.D}</span><label>{w.d}</label></div>
      </div>
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
      <div className="exhibit-actions">
        <a className="exhibit-action" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <strong>{t.github}</strong><span>{t.githubDesc}</span><em>{t.openProfile}</em>
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

function LibraryExhibit() {
  const { strings } = useSite()
  const l = strings.library
  return (
    <>
      <p className="exhibit-card__body">{l.heroSub}</p>
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

function ExhibitBody({ floorId, labRoomSlug }: { floorId: FloorId; labRoomSlug: string | null }) {
  switch (floorId) {
    case 'G': return <LobbyExhibit />
    case '23': return <WarehouseExhibit />
    case '52': return <LabExhibit labRoomSlug={labRoomSlug} />
    case 'B2': return <InfraExhibit />
    case 'B10': return <TechExhibit />
    case '99': return <LibraryExhibit />
    case 'roof': return <RoofExhibit />
    default: return null
  }
}

export function ExhibitOverlay() {
  const { floorId, labRoomSlug, floor, direction, strings } = useSite()
  const floorStrings = strings.floors[floorId]
  const overlayKey = floorId === '52' && labRoomSlug ? `${floorId}-${labRoomSlug}` : floorId

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
          <ExhibitBody floorId={floorId} labRoomSlug={labRoomSlug} />
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
