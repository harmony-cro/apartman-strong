# Apartman Strong — `web/`

Cat 1 brochure for a five-star apartment rental in Slavonski Brod. Migrated from
WordPress + Elementor to **Next.js 16 + next-intl + Tailwind v4**, redesigned per
the `sources/stitch` "Organic Sophistication" handoff. **Deploy target: Vercel**
(team `harmony-hr`).

## Stack & commands
- Next.js 16 App Router · next-intl (HR default, EN) · Tailwind v4 · `sharp`
- `npm run dev` · `npm run build` · `npm start` · `npm run lint`
- Local preview is reached at **`http://192.168.1.103:3100`** — NOT `localhost`
  (the browser tooling runs on a different machine; localhost won't resolve).

## Design system (do not drift)
Tokens live in `app/globals.css`. Palette: deep-forest `#1A4548` (primary/buttons/
footer), brushed-gold `#C5A377` (accent/links/icons), warm-ivory surfaces
(`#fff8f5` / `#fcfaf8`) — never pure white/black. Fonts: **Libre Caslon Text**
(headings, `--font-heading`) + **Work Sans** (body). Icons are inline SVG
(`components/Icon.tsx`) — we deliberately did NOT load the Material Symbols font.
Full rationale in `../work/stitch-analysis.md`.

## Structure
- `app/[locale]/page.tsx` — home: Hero → About → CtaBand → ApartmentSection ×2 → HouseRules → Contact
- `app/[locale]/galerija/page.tsx` — gallery grid + lightbox (`components/Gallery.tsx`)
- `data/gallery.json` — 71 curated photos (built by curate step); webp in `public/images/gallery/{full,thumb}`
- `messages/hr.json` (verbatim from WP dump) · `messages/en.json` (**draft — needs native review**)
- `lib/site.ts` — name, phone, email, address, geo, socials

## Enquiry form — Brevo SMTP (same as autoskola-ezra)
`app/actions/enquiry.ts` sends via nodemailer + Brevo. **Recipient = `sb.dejan@gmail.com`**
(`ENQUIRY_TO`). Production env on Vercel: `SMTP_HOST=smtp-relay.brevo.com`,
`SMTP_PORT=465`, `SMTP_USER=<acct>@smtp-brevo.com`, `SMTP_PASS=<Brevo key>`,
`MAIL_FROM=noreply@apartmanstrong.hr` (Brevo-verified sender, kept distinct from
SMTP_USER). **Without `SMTP_HOST` the action dry-runs** (logs + returns success) —
safe for staging. See `.env.example`.

## Open items to confirm with client before go-live
1. **House-rules copy** is from the stitch MOCKUP, not the WP dump (the dump's popup
   was empty): check-in 15:00–24:00, check-out 07:00–11:30, 3-day cancellation,
   cash-only, no pets, no smoking. Confirm these are real (`messages/*.json` → `houseRules`).
2. **EN copy** is a careful draft — native-speaker pass needed.
3. Visible/booking email: site shows `sb.dejan@gmail.com`; `booking@apartmanstrong.hr`
   also existed on the old site. Form delivers to the Gmail (client decision).
4. `lib/site.ts` `geo` lat/lng is approximate — refine.
5. Gallery alt text is generic; could be enriched per-photo.

## Deploy
This site already ran `configure-deploy-target.mjs vercel` (no `output: 'standalone'`).
Use the `deploy-vercel` skill. Repo: `git@github.com:harmony-cro/apartman-strong.git`
(SSH push works as `harmony-cro`). Migration plan + status: `../MIGRATION-PLAN.md`.
