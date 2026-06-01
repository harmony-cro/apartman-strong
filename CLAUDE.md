# harmony-template-base

Category 1 template — static brochure site. Next.js 16 App Router + next-intl + Tailwind v4. **Deploy target is chosen at scaffold time** (Vercel or Hostinger).

## Stack

- **Framework:** Next.js 16 (App Router)
- **Node.js:** 24 LTS (set in `engines` field)
- **i18n:** next-intl — configure locales in `i18n/routing.ts`
- **Styling:** Tailwind CSS v4 — customize CSS variables in `app/globals.css`
- **Fonts:** Inter (Google Fonts) — swap in `app/[locale]/layout.tsx`
- **Deploy:** chosen per-site — Vercel (zero-config) or Hostinger Node hosting (standalone output). See "Choose a deploy target" below.

## Choose a deploy target (run once per scaffold)

The template ships **neutral** — no standalone output, no Hostinger-specific scripts. Choose a target before pushing:

```bash
node scripts/configure-deploy-target.mjs vercel      # OR
node scripts/configure-deploy-target.mjs hostinger
```

What the script does:

| | Vercel | Hostinger |
|---|---|---|
| `next.config.ts` | unchanged (minimal) | adds `output: 'standalone'` + `outputFileTracingRoot` |
| `package.json` build | `next build` | `next build && node scripts/prepare-standalone.mjs` |
| `scripts/` | unchanged | adds `prepare-standalone.mjs` + `start-hostinger-next.mjs` |
| Root doc | writes `DEPLOY-VERCEL.md` | writes `DEPLOY-HOSTINGER.md` |
| `.deploy-targets/` | deleted after run | deleted after run |

The script is one-shot per scaffold: after it runs, `.deploy-targets/` is removed and the site is committed to its target. To switch later, re-scaffold from `harmony-template-base` or edit the affected files manually.

## Customizing for a client

1. **Site config** → `lib/site.ts` — name, URL, phone, email, social links
2. **Locales** → `i18n/routing.ts` — set `locales` and `localePrefix`
3. **Translations** → `messages/hr.json` and `messages/en.json`
4. **Colors** → CSS variables in `app/globals.css`
5. **Nav links** → `components/Header.tsx`
6. **Pages** → add under `app/[locale]/`

## Single-language site (HR only)

In `i18n/routing.ts`:
```ts
locales: ['hr'],
defaultLocale: 'hr',
localePrefix: 'never',
```

Delete `messages/en.json`.

## Commands

```bash
npm run dev      # local dev server
npm run build    # build (target-specific — see above)
npm start        # start production server (Hostinger) / `vercel --prod` (Vercel)
npm run lint     # ESLint
```

## Skills that use this template

- `migrate-wp` — scaffolds a new site from this base, asks for deploy target as a Stage-0 question
- `batch-migrate` — runs `migrate-wp` for multiple sites in parallel
- `deploy-vercel` — Vercel-specific bootstrap (project create, env vars, domain, first deploy)
