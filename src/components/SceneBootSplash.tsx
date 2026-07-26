/** Neutral splash while the 3D scene chunk loads — no 2D silhouette flash */
export function SceneBootSplash({ label }: { label: string }) {
  return (
    <div className="site-scene-loading" aria-busy="true" aria-live="polite">
      <p className="site-scene-loading__label">{label}</p>
    </div>
  )
}
