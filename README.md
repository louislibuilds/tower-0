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
  building/program.ts    Floor definitions & hash routing
  data/                  Profile, academic, projects, credentials, skills
  components/
    TowerShell.tsx       3-column layout
    TowerSilhouette.tsx  SVG building with lit windows
    ElevatorHUD.tsx      Animated elevator indicator
    FloorRail.tsx        Floor navigation
    FloorPanel.tsx       Content router with transitions
    panels/              One panel per floor
  hooks/useFloorNavigation.ts
  styles/tower.css       INK theme · architectural typography
```

**Phase 1 (current):** 2D tower UI with Framer Motion elevator transitions, hash routing, responsive layout.

**Phase 2 (planned):** React Three Fiber orthographic building, multi-language, PAPER/INK theme toggle.

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
