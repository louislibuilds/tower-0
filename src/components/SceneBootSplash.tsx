/** Neutral splash while the 3D scene chunk loads — no 2D silhouette flash */
export function SceneBootSplash({ label }: { label: string }) {
  return (
    <div className="tower-loading" aria-busy="true" aria-live="polite">
      <p className="tower-loading__label">{label}</p>
    </div>
  )
}
