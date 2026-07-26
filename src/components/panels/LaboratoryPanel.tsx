import { labProjects } from '../../data/projects'

export function LaboratoryPanel() {
  return (
    <div className="panel lab-panel">
      <p className="lab-panel__intro">
        Five project rooms on this floor — each a different typology of team work, from hackathon
        sprints to semester-long research pipelines.
      </p>
      <div className="lab-grid">
        {labProjects.map((project) => (
          <article key={project.slug} className="lab-card" id={project.slug}>
            <header className="lab-card__header">
              <h3>{project.title}</h3>
              {project.grade && (
                <span className="lab-card__grade">
                  {project.mark} {project.grade}
                </span>
              )}
            </header>
            <p className="lab-card__hook">{project.hook}</p>
            <dl className="lab-card__meta">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              {project.team && (
                <div>
                  <dt>Team</dt>
                  <dd>{project.team}</dd>
                </div>
              )}
              {project.course && (
                <div>
                  <dt>Course</dt>
                  <dd>{project.course}</dd>
                </div>
              )}
            </dl>
            <div className="lab-card__stack">
              {project.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="lab-card__links">
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
