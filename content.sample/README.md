# Site content (sample)

This folder is the **public-repo template**. It ships:

- **Author identity & contact** — Louis Li, bubblechickenlab, email, GitHub, LinkedIn (OK to be public)
- **Placeholder academics** — illustrative course rows & stats, not real marks
- **Generic certificate graphics** — no official document scans
- **Sanitized narrative** — project stories without HD/WAM lines; credentials are summary placeholders only

Real grades, cert scans, and detailed credential copy live in gitignored **`content/`** (private deploy repo).

## Quick start (forking this repo)

```bash
npm run content:init   # copies content.sample → content/
# Edit content/data/*.ts, add your cert images & résumé PDFs
npm run dev
```

## Layout

```
content.sample/          ← committed (safe to fork)
content/                 ← your personal copy (gitignored)
  data/                  profile, academic, projects, …
  i18n/copy.ts           personal narrative (EN / zh-TW / ja)
  assets/factory/        certificate images for 23F wall
  resume/
    en/resume.pdf
    zh-TW/resume.pdf
```

When `content/` exists locally, Vite loads it instead of `content.sample/`.

## Personal narrative (`i18n/copy.ts`)

Long-form copy lives in **`content/i18n/copy.ts`** (not in `src/i18n/strings.ts`):

| Section | What to write |
|---------|----------------|
| `site` / `stamp` | Brand line and display name on boot plate |
| `lobby` | Motto + positioning paragraph |
| `factory` | University panel title and certificate labels on the 23F wall |
| `infra.softSkillGroups` | Soft skills grouped by category |
| `library` | Featured role, bullets, publication blurbs (keys must match `libraryBooks` slugs) |
| `projects` | Title, hook, body, role, team/course/credit per lab slug |
| `credentials` | Title, detail, body, bullets, credit per credential slug |

`src/i18n/strings.ts` keeps **UI chrome only** (button labels, floor names, hints). Forkers edit `content/i18n/copy.ts`; the sample file includes suggested placeholder text in all three locales.

## Certificate images

Place PNG or SVG files in `content/assets/factory/` and list them in `content/assets/factory/index.ts`. The sample uses `cert-placeholder.svg`.

**Do not commit official document scans** (degree testamur, letters with ID numbers) to a public repository.

## Résumé PDFs

Export PDFs from KATA (or your builder) into `content/resume/{en,zh-TW}/`. The `predev` / `prebuild` script copies them to `public/resume/` for static serving.

## Narrative copy

Project-specific long-form text lives in **`content/i18n/copy.ts`** — see the table in this README. UI labels remain in `src/i18n/strings.ts`.
