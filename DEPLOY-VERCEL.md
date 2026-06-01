# Deploy to Vercel

This site is configured for Vercel. Vercel auto-deploys on every push to `main` once the project is linked to the GitHub repo.

## First-time setup (one per site)

Use the `deploy-vercel` Claude skill — it walks through:

1. Creating the Vercel project linked to `github.com/harmony-cro/<slug>` with Root Directory = `web`
2. Seeding `NEXT_PUBLIC_SITE_URL` and any server-side env vars (SMTP creds, etc.)
3. Attaching the custom domain + showing DNS records to set at the registrar
4. Triggering the first production deployment

All of this runs via the Vercel REST API (no dashboard clicking) using the team token. See `~/.claude/skills/deploy-vercel/SKILL.md`.

## After setup

Routine updates: just push to `main`. Vercel builds and deploys automatically — typically 1–3 minutes for a small Cat-1 brochure site.

- Inspect deploys: https://vercel.com/harmony-hr/<project-slug>
- Manual redeploy (without git push): `vercel --prod --token $VERCEL_TOKEN` from `web/`
- Rollback: `vercel promote <older-deploy-url> --token $VERCEL_TOKEN`

## Environment variables

| Variable | Required | Where |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Vercel project → Settings → Environment Variables (production + preview) |
| SMTP creds (if contact form server-action) | only if form is server-handled | Production + preview, type `encrypted` |

`NEXT_PUBLIC_*` is inlined at build time — change the value, redeploy.

## Switching deploy targets later

To move this site to Hostinger Node hosting instead:

```bash
node scripts/configure-deploy-target.mjs hostinger
```

That re-adds `output: 'standalone'`, `outputFileTracingRoot`, `scripts/prepare-standalone.mjs`, the Hostinger build step, and `DEPLOY-HOSTINGER.md`. Then commit and follow the Hostinger setup steps.
