import { useState } from 'react'
import { PrimitiveGalleryCanvas } from './PrimitiveGalleryScene'
import '../styles/tower.css'
import '../styles/scrollbars.css'

const STATIONS = [
  { id: 'ink', label: 'partialPolyline', hint: 'Ink-on footprint (loops)' },
  { id: 'edges', label: 'InkEdges', hint: 'Fill fades · edges hold' },
  { id: 'windows', label: 'WindowMatrix', hint: 'Grid panes · chicken warm dots' },
  { id: 'ground', label: 'GroundWash + BlobShadow', hint: 'Authored grounding' },
  { id: 'plinth', label: 'Plinth', hint: 'Hover boundary · crosshair' },
  { id: 'flow', label: 'FlowTrace', hint: 'Hover rear lane · signal trace' },
  { id: 'grid', label: 'GroundGrid', hint: 'Boot blueprint grid (background)' },
]

/** Dev sandbox — primitive gallery. Route: /towerzero/dev/typologies */
export function TypologyGallery() {
  const [night, setNight] = useState(true)

  return (
    <div className="typology-gallery" data-theme="dark">
      <header className="typology-gallery__header">
        <div>
          <p className="typology-gallery__eyebrow">TOWER 0 · DEV SANDBOX</p>
          <h1 className="typology-gallery__title">Primitive Gallery</h1>
          <p className="typology-gallery__sub">Component sandbox — not wired to main tower yet</p>
        </div>
        <div className="typology-gallery__actions">
          <label className="typology-gallery__toggle">
            <input type="checkbox" checked={night} onChange={(e) => setNight(e.target.checked)} />
            Night windows
          </label>
          <a className="typology-gallery__link" href="/towerzero/G/lobby">
            ← Back to tower
          </a>
        </div>
      </header>

      <PrimitiveGalleryCanvas night={night} />

      <ul className="typology-gallery__legend">
        {STATIONS.map((s) => (
          <li key={s.id}>
            <strong>{s.label}</strong>
            <span>{s.hint}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
