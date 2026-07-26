import { gradeSummary, semesters } from '../../data/academic'
import { profile } from '../../data/profile'

function gradeClass(grade: string) {
  if (grade === 'HD') return 'grade-hd'
  if (grade === 'D') return 'grade-d'
  return 'grade-cr'
}

export function WarehousePanel() {
  return (
    <div className="panel warehouse-panel">
      <div className="warehouse-panel__summary">
        <div className="stat-card">
          <span className="stat-card__value">{profile.wam}</span>
          <span className="stat-card__label">WAM</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{profile.cp}</span>
          <span className="stat-card__label">Credit Points</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{gradeSummary.HD}</span>
          <span className="stat-card__label">High Distinction</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{gradeSummary.D}</span>
          <span className="stat-card__label">Distinction</span>
        </div>
      </div>

      <div className="timeline">
        {semesters.map((sem) => (
          <article key={sem.id} className="timeline__semester">
            <header className="timeline__header">
              <h3>{sem.label}</h3>
              {sem.avgMark !== null && (
                <span className="timeline__avg">Avg {sem.avgMark}</span>
              )}
            </header>
            <ul className="timeline__subjects">
              {sem.subjects.map((sub) => (
                <li key={sub.code} className="timeline__row">
                  <div className="timeline__info">
                    <span className="timeline__code">{sub.code}</span>
                    <span className="timeline__title">{sub.title}</span>
                  </div>
                  <div className="timeline__marks">
                    {sub.mark !== null && (
                      <div className="timeline__bar-wrap">
                        <div
                          className="timeline__bar"
                          style={{ width: `${sub.mark}%` }}
                          data-grade={sub.grade}
                        />
                      </div>
                    )}
                    <span className={`timeline__mark ${gradeClass(sub.grade)}`}>
                      {sub.mark ?? '—'} {sub.grade}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
