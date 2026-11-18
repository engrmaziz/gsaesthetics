# GS Aesthetic

Marketing site and content desk for GS Aesthetic, the Gulberg 2 clinic at [gsaesthetic.online](https://gsaesthetic.online). Public pages cover the hairline method, every service, the studio, the journal, the visit, and the legal pages. Staff edit the copy from `/admin`. There is no database: the site reads `src/data/content.json`, and publishing on Vercel commits that file back to GitHub so the next build picks it up.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, `next-themes`.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dev server is [http://localhost:3000](http://localhost:3000). This project is usually started on port 3010:

```bash
npx next dev -p 3010
```

Set `ADMIN_PASSWORD` in `.env.local` before opening `/admin`. Production has no default password.

## Environment

| Variable | Where it is used |
| --- | --- |
| `ADMIN_PASSWORD` | Signs the `hmd_admin` session cookie. Required for `/admin`. |
| `GITHUB_TOKEN` | Lets the desk commit `src/data/content.json` when the app is running on Vercel. A fine-grained token with contents write on this repo is enough. |
| `GITHUB_REPO_OWNER` | `engrmaziz` |
| `GITHUB_REPO_NAME` | `gsaesthetics` |
| `GITHUB_BRANCH` | Branch the desk writes to. Defaults to `main`. |

Locally, Publish writes `src/data/content.json` on disk. On Vercel, Publish uses the GitHub contents API. Without the three GitHub variables, the desk reports that nothing was saved.

Do not commit `.env.local`.

## Content

`src/data/content.json` is the source of truth. Types live in `src/lib/types.ts`. Pages read it through `src/lib/content.ts`.

The desk (`/admin`) edits practice details, the hero, the founder, the method, services, the gallery, the journal, notes, and visit details. Legal pages, categories, and adding or removing entries are still edited in the JSON file.

## Routes

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/method` | Hairline method |
| `/about` | Practice |
| `/services`, `/services/[slug]` | Menu and each treatment |
| `/care/[category]` | A category of treatments |
| `/results` | Studio |
| `/journal`, `/journal/[slug]` | Journal |
| `/contact` | Visit and WhatsApp |
| `/legal/[slug]` | Privacy, terms, medical disclaimer, cookies |
| `/admin` | Content desk |

## Theme

Light mode is warm paper, olive ink, and one clay accent. Dark mode swaps those tokens under `.dark` and follows the system until someone uses the sun/moon control in the navigation. The footer, ticker, and founder band stay on the fixed night colour so the dark logo lockup remains readable.

## Deploy

Import the repo on Vercel. Set the environment variables above. `next build` generates the public pages as static output from `content.json`. A publish from the desk commits that file, which triggers the next deployment.

```bash
npm run build
```
