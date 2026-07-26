import { FLOORS } from '../../building/program'
import { useSite } from '../../context/SiteContext'
import type { Locale } from '../../i18n/strings'

export function SiteChrome() {
  const { strings, theme, toggleTheme, locale, setLocale, localeLabels } = useSite()

  return (
    <header className="site-chrome">
      <div className="site-chrome__brand">
        <span className="site-chrome__name">{strings.site.name}</span>
        <span className="site-chrome__tagline">{strings.site.tagline}</span>
      </div>
      <div className="site-chrome__controls">
        <div className="site-chrome__lang" role="group" aria-label="Language">
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              className={locale === l ? 'site-chrome__pill site-chrome__pill--active' : 'site-chrome__pill'}
              onClick={() => setLocale(l)}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="site-chrome__theme"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? strings.site.themeLight : strings.site.themeDark}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}

export function FloorRailHud() {
  const { floorId, goToFloor, strings } = useSite()

  return (
    <nav className="floor-rail-hud" aria-label="Floor navigation">
      <div className="floor-rail-hud__label">{strings.site.floors}</div>
      <ol>
        {[...FLOORS].reverse().map((floor) => {
          const active = floor.id === floorId
          const loc = strings.floors[floor.id]
          return (
            <li key={floor.id}>
              <button
                type="button"
                className={active ? 'floor-rail-hud__btn floor-rail-hud__btn--active' : 'floor-rail-hud__btn'}
                data-zone={floor.zone}
                onClick={() => goToFloor(floor.id)}
                aria-current={active ? 'true' : undefined}
              >
                <span className="floor-rail-hud__code">{floor.label}</span>
                <span className="floor-rail-hud__name">{loc?.title ?? floor.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function ElevatorHud() {
  const { floor, direction, strings } = useSite()
  const loc = strings.floors[floor.id]

  return (
    <div className="elevator-hud-bar" aria-live="polite">
      <span className="elevator-hud-bar__arrow">
        {direction > 0 ? '▲' : direction < 0 ? '▼' : '●'}
      </span>
      <span className="elevator-hud-bar__floor">{floor.label}</span>
      <span className="elevator-hud-bar__title">{loc?.title ?? floor.title}</span>
    </div>
  )
}
