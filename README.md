# Tower 0

> **Software is not written. It is constructed.**

Louis Li's Master of IT portfolio — a cyberpunk skyscraper you navigate floor by floor.

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
- **Themes** — Dark (neon cyberpunk) / Light (ink drawing)
- **i18n** — English · 繁體中文 · 简体中文
- **2D fallback** — SVG plan when WebGL unavailable or reduced motion

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
  components/hud/            SiteChrome, ExhibitOverlay, FloorRail
  context/SiteContext.tsx    Theme + locale + navigation
  i18n/strings.ts            EN / zh-TW / zh-CN
  camera/OrthoRig.tsx        Per-floor orthographic camera
```

Orthographic tower portfolio · INK/PAPER siteline · cyberpunk reference art.

## License

MIT · Louis Li · 2026
