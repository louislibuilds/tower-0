# Site content (sample)

This folder is the **public-repo fork template**.

## What stays as author info (Louis / bubblechickenlab)

Only **contact & attribution** — safe to show on B10 (Tech Centre) and R Roof:

| File | Kept |
|------|------|
| `data/profile.ts` → `links` | email, GitHub, LinkedIn, portfolio, Instagram, Threads, bubblechickenlab URLs |
| `data/techLinks.ts` | B10 social handles (derived from `profile.links`) |
| `i18n/copy.ts` → `site` / `stamp` | Template author credit on boot plate |

## Everything else = placeholders

| Floor | Data files | i18n keys (`copy.ts`) |
|-------|------------|------------------------|
| **23F Factory** | `academic.ts` (4 sample semesters), `assets/factory/` (placeholder SVG) | `factory.panelTitle`, cert titles, **`factory.highlights[]`** (4 items, one per area) |
| **52F Laboratory** | `labs.ts` (3 suites), `projects.ts` | `projects.{slug}` — body, role, credit, team, course |
| **99F Library & Archive** | `credentials.ts`, `libraryBooks.ts`, `experience.ts` | `library.*`, `credentials.{slug}` |
| **B2 Infrastructure** | `skills.ts` (tech groups) | `infra.softSkillGroups` |

Suggested writing patterns (EN / zh-TW / ja), e.g.:

- 「這裡放你的證書標題」
- 「建議寫法：背景 → 你做了什麼 → 成果」
- Illustrative course rows (`Sample Course A`–`H`) — not real marks

Real grades, cert scans, résumé PDFs, and your narrative live in gitignored **`content/`** (private deploy).

## Quick start (forking)

```bash
npm run content:init   # copies content.sample → content/
# Edit content/data/*.ts and content/i18n/copy.ts
# Add cert images & résumé PDFs under content/
npm run dev
```

## Layout

```
content.sample/          ← committed (fork template)
content/                 ← your personal overlay (gitignored)
  data/
  i18n/copy.ts
  assets/factory/
  resume/
```

When `content/` exists locally, Vite loads it instead of `content.sample/`.

## Keys must match

| Data slugs | Must match i18n keys in |
|------------|-------------------------|
| `labs.ts` / `projects.ts` | `copy.ts` → `projects` |
| `credentials.ts` | `copy.ts` → `credentials` |
| `libraryBooks.ts` | `copy.ts` → `library.publications` |
| `academic.ts` semesters (reversed) | `copy.ts` → `factory.highlights` (Area 01 = index 0) |

## 52F lab count

Sample ships **3 suites** (`sample-project`, `tower-zero`, empty `lab-008`). The 3D scene derives pod count from `labs.ts` — your private `content/` can list up to 8.

## Certificate images

Place PNG/SVG in `content/assets/factory/` — **never commit official document scans** to the public repo.

## Résumé PDFs

`content/resume/{en,zh-TW}/` → copied to `public/resume/` at build time.
