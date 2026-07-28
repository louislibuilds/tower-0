/** Theme-aware viewport cursors (orthographic scene canvas) */

const CANVAS_SEL = '.tower-canvas__gl'

const CROSSHAIR_DAY_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#2C2824" stroke-width="1.25" fill="none"/></svg>`,
)

const CROSSHAIR_NIGHT_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#E8F8FF" stroke-width="1.25" fill="none"/></svg>`,
)

export const SCENE_CROSSHAIR_DAY = `url("data:image/svg+xml,${CROSSHAIR_DAY_SVG}") 12 12, crosshair`
export const SCENE_CROSSHAIR_NIGHT = `url("data:image/svg+xml,${CROSSHAIR_NIGHT_SVG}") 12 12, crosshair`

function sceneCanvas(): HTMLElement | null {
  return document.querySelector(CANVAS_SEL)
}

export function sceneCrosshairCursor(): string {
  return document.documentElement.dataset.theme === 'dark'
    ? SCENE_CROSSHAIR_NIGHT
    : SCENE_CROSSHAIR_DAY
}

export function setSceneCursor(mode: 'crosshair' | 'pointer'): void {
  const el = sceneCanvas()
  if (!el) return
  el.style.cursor = mode === 'pointer' ? 'pointer' : sceneCrosshairCursor()
}

export function resetSceneCursor(): void {
  const el = sceneCanvas()
  if (el) el.style.cursor = sceneCrosshairCursor()
}
