# Jobbly web — context handoff

Written 2026-08-20. Delete once absorbed.

## Product

Jobbly is a Swedish iOS job-application app. Users swipe through job listings;
a right swipe authorizes Jobbly to submit one application on their behalf,
filling the employer's form with the user's CV and profile via AI.

- Listings come from **JobTech Dev / Arbetsförmedlingen** open API (Swedish jobs only)
- Audience: job seekers in Sweden, 18+
- App Store name: **Jobbly: Sök jobb på autopilot**
- Subtitle: **Svep. Vi skickar ansökan**
- App ID `6780935199` — https://apps.apple.com/app/id6780935199

## Status as of writing

- iOS app **approved** (v1.0, build 11), but not yet released — was flagged
  "removed from sale"; availability needs enabling in App Store Connect
- Deliberately **not launched yet**: support email doesn't work, DSA trader
  verification with Apple still open
- Backend live at `https://jobbly-backend-6yl1.onrender.com` (Render, Frankfurt)

## Pricing (keep the website consistent with these)

| Item | Price |
|---|---|
| Jobbly Pro, weekly | 59 kr |
| Jobbly Pro, monthly | 149 kr |
| Credit pack, 10 | 39 kr |
| Credit pack, 25 | 79 kr |
| Credit pack, 60 | 149 kr |

- Free tier: **5 applications/day**, on a rolling 24h window from exhaustion
- Pro: **25 applications/day**, within a **600/month** fair-use cap
- App itself is free to download

## Domain and DNS — read before touching anything

`jobbly.se` is registered at **Loopia** but DNS is authoritative at **Cloudflare**
(`andronicus.ns.cloudflare.com`, `violet.ns.cloudflare.com`). All DNS changes
happen in Cloudflare; Loopia has no DNS role.

Being pointed at **Vercel** (project `jobbly-web-eight.vercel.app`):

- `CNAME @   → 0541d2109f6e108a.vercel-dns-017.com` — **DNS only, grey cloud**
- `CNAME www → 0541d2109f6e108a.vercel-dns-017.com` — **DNS only, grey cloud**
- The old `A` records to `194.9.94.85/86` (a PHP placeholder host) must be
  deleted first — they block the CNAMEs
- Cloudflare's CNAME flattening is what makes an apex CNAME possible here

**Never delete these records.** They are the inbound email pipeline for employer
replies, and the DKIM key cannot be regenerated without reconfiguring Resend:

| Name | Type | Purpose |
|---|---|---|
| `apply.jobbly.se` | MX | inbound employer replies (Resend/SES) |
| `send.apply.jobbly.se` | MX | bounce/feedback |
| `resend._domainkey.apply.jobbly.se` | TXT | DKIM |
| `send.apply.jobbly.se` | TXT | SPF |

`support@jobbly.se` currently has **no MX at the root** and receives nothing,
despite being published as the support contact. Being fixed separately —
if you add SPF at the root, merge into a single record, never two.

## Legal pages — App Store depends on these URLs

Currently served from a separate repo, `~/Documents/GitHub/jobbly-policies`,
published at GitHub Pages:

- https://brickphone.github.io/jobbly-policies/integritetspolicy.html
- https://brickphone.github.io/jobbly-policies/anvandarvillkor.html
- https://brickphone.github.io/jobbly-policies/support.html

These are registered in App Store Connect (privacy policy URL, support URL) and
hardcoded in the iOS app at `jobswipe/jobswipe/Resources/AppLegalLinks.swift`.

If you move them to jobbly.se: keep the GitHub URLs working (or update App Store
Connect metadata), and note the iOS app needs a **new build** to change its links.

## Voice

Swedish throughout. Existing copy leans on "Sök jobb på autopilot",
"Svep. Vi skickar ansökan", "Du swipar. AI:n söker direkt.",
"Var först på bollen". Plain, direct, no corporate filler.

## Stack

Next.js (app router), React, TypeScript. `app/`, `components/`, `lib/`.
Deployed on Vercel.
