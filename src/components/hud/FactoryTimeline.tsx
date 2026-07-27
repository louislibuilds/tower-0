import { useRef } from 'react'
import { useSite } from '../../context/SiteContext'
import { areaLabel, FACTORY_AREAS, factoryHighlight } from '../../scene/factoryStops'

/** Bottom timeline rail for 23F — resume2-style semester cards + arrows */
export function FactoryTimelineRail() {
  const {
    floorId,
    viewMode,
    factoryStop,
    nextFactoryStop,
    prevFactoryStop,
    toggleFactoryStop,
  } = useSite()

  const lastIndex = useRef(factoryStop ?? 0)
  const dir = useRef<'rise' | 'fall'>('rise')

  if (floorId !== '23' || viewMode === 'tower') return null

  const activeIndex = factoryStop ?? lastIndex.current
  if (factoryStop !== null) lastIndex.current = factoryStop

  const sem = FACTORY_AREAS[activeIndex]
  const highlight = factoryHighlight(activeIndex)
  const animClass = dir.current === 'rise' ? 'factory-timeline-card--rise' : 'factory-timeline-card--fall'

  const goPrev = () => {
    dir.current = 'fall'
    prevFactoryStop()
  }

  const goNext = () => {
    dir.current = 'rise'
    nextFactoryStop()
  }

  return (
    <div className="factory-timeline-rail" role="region" aria-label="Semester timeline">
      <button type="button" className="factory-timeline-arrow" onClick={goPrev} aria-label="Previous semester">
        ←
      </button>

      <button
        type="button"
        className={`factory-timeline-card ${animClass}`}
        key={activeIndex}
        onClick={() => toggleFactoryStop(activeIndex)}
      >
        <p className="factory-timeline-card__eyebrow">{areaLabel(activeIndex)} · {sem.label}</p>
        <p className="factory-timeline-card__project">{highlight.project}</p>
        <p className="factory-timeline-card__takeaway">{highlight.takeaway}</p>
        {sem.avgMark !== null && (
          <p className="factory-timeline-card__meta">Avg {sem.avgMark}</p>
        )}
      </button>

      <button type="button" className="factory-timeline-arrow" onClick={goNext} aria-label="Next semester">
        →
      </button>
    </div>
  )
}
