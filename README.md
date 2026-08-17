# Jobbly web

Swedish marketing site for Jobbly, built with Next.js App Router and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Launch configuration

Update `appStoreUrl` in `lib/config.ts` when the App Store listing is public. The primary calls to action will automatically open that URL in a new tab; until then they scroll to the launch panel and show the intentional pre-launch note.

The Android interest form currently opens a pre-addressed email to `support@jobbly.se`, which works without a database and never pretends an address was saved. Replace the submit handler in `components/WaitlistForm.tsx` with a real list endpoint when one is available.

## Checks

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```
