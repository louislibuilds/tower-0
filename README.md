# Tower 0

> **Rome wasn't built in a day — neither is good software.**

Louis Li's Master of IT portfolio — a cyberpunk skyscraper by night, an architectural model by day. Navigate floor by floor.

**Repo:** [github.com/louislibuilds/tower-0](https://github.com/louislibuilds/tower-0)

## Floor Plan

| Floor | Room | Content |
|-------|------|---------|
| **Roof** | Contact | Email, GitHub, LinkedIn, nagi, KATA |
| **99** | Library & Archive | Dean's List, MIT degree, UTS TSA, awards |
| **52** | Laboratory | UniHack 2026, Cloud, NLP, DL, KATA |
| **23** | Warehouse | Academic timeline · semester grades |
| **G** | Lobby | Welcome · thesis · about |
| **B2** | Infrastructure | Skills · course → project links |
| **B10** | Tech Centre | GitHub · print résumé |

URL: `#/G`, `#/23`, `#/52`, `#/B2`, `#/B10`, `#/99`, `#/roof`

## Features

- **Full-viewport 3D tower** — art-deco tiered cyberpunk skyscraper (React Three Fiber, orthographic camera)
- **Per-floor exhibits** — holographic 3D markers + glass overlay cards
- **Boot sequence** — footprint ink → tower extrude
- **Themes** — Day (warm architectural model) / Night (neon cyberpunk)
- **i18n** — English · 繁體中文 · 日本語
- **2D fallback** — SVG elevation when WebGL unavailable or reduced motion

## Development

```bash
npm install
npm run dev      # localhost:5173
npm run build
npm run preview
```

## Deploy

Connect repo to [Vercel](https://vercel.com) — framework preset **Vite**, output `dist`.

## Architecture

```
src/
  scene/CyberTower.tsx       Tiered tower + spire + circuit base
  scene/exhibits/            Floor holograms, circuit board
  components/hud/            TowerHud, ExhibitOverlay, BootPlateOverlay
  context/SiteContext.tsx    Theme + locale + navigation
  i18n/strings.ts            EN / zh-TW / ja
  camera/OrthoRig.tsx        Per-floor orthographic camera
```

Day architectural tower · Night cyberpunk · Louis Li portfolio.

## Acknowledgments & design lineage

Tower 0 shares a **design lineage** with [salieri009/resume2](https://github.com/salieri009/resume2) (SITE 009 · *The Architecture of Software*) — both treat a portfolio as an **orthographic building** you visit floor by floor, rather than a page you scroll.

**What is shared (interaction pattern, not a visual clone):**

- The **portfolio-as-architecture** metaphor — floors as life stages, rooms as projects or records
- **Parallel projection only** — the camera stays orthographic; the model admits it is a model
- A familiar **HUD layout**: floor rail on the left, exhibit panel on the right, language / theme / résumé controls in the chrome
- Boot (ink-on footprint → extrude) and exit (teardown → reopen) as part of the experience

If you have seen SITE 009, the **interface furniture** will feel related. That is intentional: the navigation grammar comes from the same reference family.

**What is different (especially visually):**

- **Print system:** resume2 uses **PAPER / INK** — the same drawing in light and as a **negative print** (blueprint register). Tower 0 uses **Day / Night** — by day a warm **architectural maquette** on paper; by night a **cyberpunk glass HUD** (glow, blur, neon cyan). Night is not an inverted sheet of the same drawing.
- **Visual identity:** terracotta / blueprint Day palette, cyber Night palette, Tower 0 / bubblechickenlab branding — not SITE 009 / Siteline
- **Content & structure:** Louis Li’s UTS MIT story, floor program (G · 23 · 52 · 99 · B2 · B10), projects, credentials, and 3D room typologies are authored for this site
- **Implementation:** separate codebase, tokens, typologies, mobile drawer shell, PDF résumé preview

**In short:** same *genre* (architectural orthographic portfolio), different *print* (PAPER·INK vs Day·Night), different *building* and *story*. Credit where the navigation pattern owes a debt; own what is original.

## License

MIT · Louis Li · 2026
