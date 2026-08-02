# Tower 0

> **Rome wasn't built in a day — neither is good software.**

Louis Li's Master of IT portfolio — a cyberpunk skyscraper by night, an architectural model by day. Navigate floor by floor.

**Live (subpath):** [bubblechickenlab.com/towerzero](https://www.bubblechickenlab.com/towerzero/) · **Repo:** [github.com/louislibuilds/tower-zero](https://github.com/louislibuilds/tower-zero)

> **Forking?** Author contact stays in `content.sample/`; **grades, cert scans, and detailed marks** live in gitignored `content/` only. See [content.sample/README.md](./content.sample/README.md).

## Floor plan


| Floor        | Zone              | Content                                                                         |
| ------------ | ----------------- | ------------------------------------------------------------------------------- |
| **Roof** `R` | Contact           | Email, GitHub, LinkedIn, Portfolio, NAGI, KATA                                  |
| **99**       | Library & Archive | Credentials (Dean's List, degree, TSA) · library shelf (NAGI, KATA)             |
| **52**       | Laboratory        | Up to eight lab suites (template ships 3 placeholders; live site: UniHack, SUNishop, NLP, VTuber MoCap, KATA, NAGI, Tower Zero + reserved bay) |
| **23**       | Factory           | Academic timeline · four semester production lines (Area 01–04)                 |
| **G**        | Lobby             | Welcome · thesis · about · stats                                                |
| **B2**       | Infrastructure    | Tech stack · soft skills                                                        |
| **B10**      | Tech Centre       | Social links (LinkedIn, Instagram, Threads, Portfolio, GitHub) · résumé print   |


Site UI is available in **English · 繁體中文 · 日本語** (in-app language switcher). This README stays in English for developers.

## URLs

Routing is **path-based** (legacy `#/…` hashes redirect on load). Default production base is `/towerzero/`.


| Path                         | Destination               |
| ---------------------------- | ------------------------- |
| `/towerzero/`                | Tower overview            |
| `/towerzero/G/lobby`         | Lobby                     |
| `/towerzero/23`              | Factory overview          |
| `/towerzero/23/area-01`      | Factory · semester line 1 |
| `/towerzero/52`              | Laboratory overview       |
| `/towerzero/52/sample-project` | Lab suite · template placeholder |
| `/towerzero/52/tower-zero` | Lab suite · Tower Zero (this project) |
| `/towerzero/52/nagi` | Lab suite · example slug from live `content/` |
| `/towerzero/99/library`      | Library                   |
| `/towerzero/99/archive`      | Archive                   |
| `/towerzero/99/library/nagi` | Library · focus item      |
| `/towerzero/B2`              | Infrastructure            |
| `/towerzero/B10`             | Tech Centre               |
| `/towerzero/R`               | Roof                      |


Lab and library item slugs come from `content/` (or `content.sample/` when forking). Local dev: `npm run dev` → `http://localhost:5173/towerzero/` (see `vite.config.ts` · `SITE_BASE_PATH` in `src/building/siteRoute.ts`).

## Features

- **Full-viewport 3D tower** — art-deco tiered cyberpunk skyscraper (React Three Fiber, **orthographic camera**)
- **Per-floor exhibits** — 3D typologies + glass HUD overlay cards
- **Boot sequence** — footprint ink → staggered tower extrude · exit teardown
- **Themes** — Day (warm architectural maquette) / Night (cyber glass HUD)
- **i18n** — English · 繁體中文 · 日本語
- **Responsive shell** — mobile floor / details drawers
- **2D fallback** — SVG elevation when WebGL unavailable or reduced motion
- **Social preview** — Open Graph + Twitter cards (`public/og-poster.svg`) for LinkedIn and link unfurling
- **Analytics** — Vercel Web Analytics with path-based pageviews on floor navigation

## Tech stack

- **React 19** + **TypeScript** — UI shell, routing, i18n
- **Vite 8** — dev server and production build
- **Three.js** · **React Three Fiber** · **Drei** — orthographic 3D tower and floor typologies
- **GSAP** · **Framer Motion** — boot / exit sequences and HUD motion
- **PDF.js** — in-browser résumé preview (B10)
- **oxlint** — linting
- **@vercel/analytics** — route pageviews (tower + floor paths)
- **Vercel** — hosting (subpath `/towerzero/`)

## Development

```bash
npm install
npm run content:init   # first time: copy content.sample → content/
npm run dev            # http://localhost:5173/towerzero/
npm run build
npm run preview
npm run lint
npm run verify:viewport-zoom   # responsive ortho-camera zoom regression check
```

## Deploy

Connect repo to [Vercel](https://vercel.com) — framework preset **Vite**, output `dist`.

- Subpath deploy (default): `VITE_BASE_PATH=/towerzero/`
- Root deploy: `VITE_BASE_PATH=/`

### Personal content vs public template

| Path | In public repo? | Purpose |
|------|----------------|---------|
| `content.sample/` | Yes | Author identity & contact; illustrative stats; no real grades or cert scans |
| `content/` | **No** (gitignored) | Real WAM/GPA, transcript rows, cert images, résumé PDFs, full **`i18n/copy.ts`** |
| `src/i18n/strings.ts` | Yes | UI chrome only (labels, hints, floor titles) |

**Local / production with your data:** keep a `content/` folder (run `npm run content:init` once, then customize). Vite prefers `content/` over `content.sample/` when present.

**Public GitHub + Vercel (your live site):** the public repo alone builds with placeholders. To deploy your real site, use one of:

1. **Private deploy repo (recommended)** — mirror this codebase, commit `content/` there (e.g. `tower-zero-deploy`), point Vercel at it. Keep the public repo as the forkable template.
2. **Force-add on a private remote** — `git add -f content/` only on a private GitHub repo used for deploy.
3. **Same machine CI** — build locally or in a private pipeline where `content/` exists, deploy `dist/` (no GitHub content needed).

You do **not** need a second codebase — only separate **public template** vs **private deploy** remotes if you want both open-source and a personal live site.

## Architecture

```
content.sample/              Fork-safe profile + placeholder certs + sample i18n (committed)
content/                     Personal overlay (gitignored)
scripts/sync-content-assets.mjs   Copies content/resume → public/resume
src/
  i18n/strings.ts            UI chrome — merges content/i18n/copy at build time
  building/siteRoute.ts      Path routing + legacy hash migration
  hooks/useSiteNavigation.ts History API navigation + analytics pageviews
  design/tokens.ts           Colors, typography, theme tokens
  scene/CyberTower.tsx       Tiered tower + spire + circuit base
  scene/typologies/          Per-floor 3D room layouts
  components/hud/            TowerHud, ExhibitOverlay, BootPlateOverlay
  context/SiteContext.tsx    Theme, locale, navigation, boot/exit
  camera/OrthoRig.tsx        Orthographic camera stations
```

## Acknowledgments

Inspired by [salieri009/resume2](https://github.com/salieri009/resume2) (SITE 009); Especially the timeline idea, orthographic building navigation, HUD layout, camera stations, and boot/transition language.

Tower 0 builds a separate visual system on top (design tokens, typography, UI chrome, responsive mobile shell) and uses a **Day / Night** palette rather than PAPER/INK. Content and 3D typologies are original to this project.

## License

[MIT License](./LICENSE) — Copyright © 2026 Louis Li.

You may use, modify, and distribute this project under the terms of the license above. Attribution is appreciated but not required beyond what the license states.
