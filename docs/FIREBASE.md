# Power Chords Firebase hosting + functional API

**Status: draft migration only; no Firebase deployment or billing activation.**
The canonical repository remains PUBLIC by owner policy. Static marketing and capability catalogue pages can run on Spark Firebase Hosting. The optional interactive hosted Workroom requires Cloud Functions on Blaze; its public API may incur invocations/egress and must not go live without abuse and spend protections.

## Target topology

- Keep \`saurabhmisal/power-chords\` public (only public GitHub repository in the Lazo family).
- Use a dedicated **Firebase Hosting site** for \`powerchords.lazo.tools\`; do not reuse the Lazo homepage's default site ID inadvertently.
- The hosted \`/api/hosted\` endpoint goes to \`powerChordsHosted\` in Cloud Functions v2, region \`asia-south1\`; never use Vercel after verified cutover.
- The function reuses the reviewed Vercel request handler and local on-demand SQLite/temporary files. For each invocation it closes DB and removes temporary artifacts. It does not use Firestore or store user source material remotely.
- The portable instructions, local Workroom and GitHub source-registry remain usable independently and free of cloud database dependencies.

## Stage 1 — static hosting (Spark)

1. Choose the owned Firebase project and create a **secondary** Hosting site ID, for example \`lazo-power-chords\` (must be unclaimed), without replacing \`lazo-tools\`' homepage.
2. Run \`firebase target:apply hosting powerchords <EXACT_SITE_ID> --project <EXACT_PROJECT_ID>\`; this updates \`.firebaserc\` with the owner-verified target.
3. Run \`npm run build:site\` and review \`site/\` for public disclosure, licenses, no secrets. For Spark-only static deployment, use a temporary hosting-only Firebase configuration with \`public: site\` and no API rewrite. Do not claim hosted Workroom functionality in that release.
4. Deploy static Hosting only after live checks and custom-domain ownership. Keep the existing host and rollback capability until DNS + HTTPS verification is complete.

## Stage 2 — optional interactive Workroom (Blaze; explicitly approved)

1. Confirm \`firebase-functions\` SDK version compatibility, license/commit provenance and package lock.
2. The \`firebase.json\` in this branch is the **functional Workroom** configuration, using \`dist\` from \`scripts/build-hosted.mjs\` and the Cloud Function rewrite. Do NOT deploy it on Spark.
3. Run \`node scripts/prepare-firebase-functions.mjs\` to copy *only* reviewed server code into \`firebase/functions\`. Do not copy local run histories, API keys, SQLite files, credentials or private user material.
4. Add production anti-abuse controls beyond an Origin check (rate limiting, attacker-resistant quotas, App Check where viable, input timeouts and tested external source access boundaries). \`maxInstances: 1\` is a concurrency guard, not a universal bill cap.
5. Test the emulator, unsupported routes, method validation, 25 KiB limit, origin enforcement, unauthenticated provider access, source inspection, CPU/memory limits, error redaction and cross-user isolation.
6. Confirm native packages and \`node:sqlite\` work on the Firebase-supported Node 22 runtime. The main repository currently expects Node 24 and production parity has NOT been demonstrated.
7. Validate live preview before moving DNS; keep old Vercel function live for rollback. Remove Vercel only after the new endpoint and website pass acceptance.

## Release gates

- [ ] Owner-selected, connected Firebase project/site
- [ ] Explicit Blaze approval for functions and storage
- [ ] Existing Github Actions CI green (previous access-service CI lacked executable runner steps)
- [ ] Correct staged build and source file inventory
- [ ] Emulator integration/security tests
- [ ] Real Firebase staging acceptance, rate limits and spend alarms
- [ ] Custom domain, SSL and DNS rollback verified
- [ ] Explicit production traffic-switch approval

No GitHub repository visibility change is needed for Power Chords. Preserve its attribution and fork references.
