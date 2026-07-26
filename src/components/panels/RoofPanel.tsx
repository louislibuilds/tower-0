import { useSite } from '../../context/SiteContext'
import { profile } from '../../data/profile'

const contactLinks = [
  { label: 'Email', url: profile.links.email, desc: 'louis.li.builds@gmail.com' },
  { label: 'GitHub', url: profile.links.github, desc: 'github.com/louislibuilds' },
  { label: 'LinkedIn', url: profile.links.linkedin, desc: 'linkedin.com/in/louis-li-builds' },
  { label: 'nagi', url: profile.links.nagi, desc: 'bubblechickenlab.com' },
  { label: 'KATA', url: profile.links.kata, desc: 'bubblechickenlab.com/kata' },
  { label: 'Instagram', url: profile.links.instagram, desc: '@bubblechickenlab' },
]

export function RoofPanel() {
  const { strings } = useSite()
  const r = strings.roof
  return (
    <div className="panel roof-panel">
      <div className="roof-panel__plate">
        <p className="roof-panel__site">{r.site}</p>
        <h2 className="roof-panel__name">{profile.displayName}</h2>
        <p className="roof-panel__legal">{profile.legalName}</p>
        <p className="roof-panel__location">{profile.location}</p>
      </div>

      <div className="roof-panel__links">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className="contact-link"
            href={link.url}
            target={link.url.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          >
            <span className="contact-link__label">{link.label}</span>
            <span className="contact-link__desc">{link.desc}</span>
          </a>
        ))}
      </div>

      <footer className="roof-panel__footer">
        <p>{r.footer}</p>
        <p className="roof-panel__copy">{r.copy.replace('{year}', String(new Date().getFullYear()))}</p>
      </footer>
    </div>
  )
}
