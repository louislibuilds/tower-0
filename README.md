# Tower 0

> **Software is not written. It is constructed.**

Louis Li's Master of IT portfolio — a building you navigate floor by floor.

**Live:** _(deploy to Vercel)_

## Floor Plan

| Floor | Zone | Room | Content |
|-------|------|------|---------|
| **Roof** | R | Contact | Name, email, GitHub, LinkedIn, nagi, KATA |
| **99** | Tower | Library & Archive | Dean's List, MIT degree, UTS TSA leadership, awards |
| **52** | Tower | Laboratory | UniHack 2026, Cloud, NLP, DL, KATA |
| **23** | Tower | Warehouse | Academic timeline · semester grades · WAM |
| **G** | Ground | Lobby | Welcome · thesis · about |
| **B2** | Basement | Infrastructure | Skills · course links → projects |
| **B10** | Basement | Tech Centre | GitHub · print résumé · repo highlights |

URL deep links: `#/G`, `#/23`, `#/52`, `#/B2`, `#/B10`, `#/99`, `#/roof`

## Architecture

Inspired by [salieri009/resume2](https://github.com/salieri009/resume2) — portfolio as orthogonal building.

```
src/
  building/program.ts    Floor definitions, yCenter, hash routing
  scene/
    TowerScene.tsx       R3F Canvas + boot sequence
    TowerBuilding.tsx    3D tower mass, windows, elevator shaft
    palette.ts           INK theme colors
    motion.ts            GSAP durations & tower dimensions
  camera/OrthoRig.tsx    Orthographic camera per floor
  data/                  Profile, academic, projects, credentials, skills
  components/            Shell, HUD, panels, 2D fallback silhouette
  hooks/                 useFloorNavigation, useReducedMotion, useWebGL
  styles/tower.css
```

**Phase 1:** 2D tower UI with Framer Motion elevator transitions, hash routing, responsive layout.

**Phase 2 (current):** React Three Fiber orthographic 3D tower — boot ink→extrude sequence, per-floor camera travel, lit windows, elevator shaft. Lazy-loaded; falls back to 2D SVG when WebGL unavailable or `prefers-reduced-motion`.

**Phase 3 (planned):** Per-floor room exhibits, multi-language, PAPER/INK theme toggle.

## Development

```bash
npm install
npm run dev      # localhost:5173
npm run build
npm run preview  # localhost:4173
npm run lint
```

## Deploy

Vercel — connect `louislibuilds/tower-0` repo.

## Related

- [bubblechickenlab.com](https://www.bubblechickenlab.com) — nagi portfolio / blog / CMS
- [KATA](https://www.bubblechickenlab.com/kata) — résumé editor
- [masters-portfolio docs](../masters-portfolio/) — planning reference

## License

MIT · Louis Li · 2026
