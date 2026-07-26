import { courseLinks, skillGroups } from '../../data/skills'

export function InfraPanel() {
  return (
    <div className="panel infra-panel">
      <section className="infra-section">
        <h3 className="infra-section__title">Skills — Risers & Pipes</h3>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.category} className="skills-group">
              <h4>{group.category}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="infra-section">
        <h3 className="infra-section__title">Course Links → Projects</h3>
        <div className="course-grid">
          {courseLinks.map((course) => (
            <article key={course.code} className="course-card">
              <div className="course-card__head">
                <span className="course-card__code">{course.code}</span>
                <span className={`course-card__grade grade-${course.grade.toLowerCase()}`}>
                  {course.mark ?? '—'} {course.grade}
                </span>
              </div>
              <h4>{course.title}</h4>
              {course.projectUrl && (
                <a href={course.projectUrl} target="_blank" rel="noopener noreferrer">
                  View project ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
