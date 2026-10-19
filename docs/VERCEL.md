# Vercel deployment

Import this repository into Vercel with the Other framework preset and Node.js 24. The checked-in configuration builds the public app and deploys `/api/hosted` as a Node.js function. No API keys or database provisioning are required.

The hosted Workroom supports all four native document workflows, capability toggles, the 52-source catalog, GitHub inspection, and Markdown downloads. Each request uses its own in-memory SQLite database and temporary directory, which are closed and removed after the response. Customer context is processed on the server; it is not intentionally retained there or written to application logs.

The most recent 30 documents and settings are stored in browser localStorage, not a shared server database. Browser storage is not encrypted, does not sync between devices, and is erased when site data is cleared. Download important documents. The public app has no shared account or cross-user history. Source inspection uses public GitHub access and may be rate-limited.

Third-party package installation and intent routing remain local-runtime features. The online catalog links to those source repositories; it does not execute third-party software. Native generation is deterministic drafting, not an LLM service. Run `npm start` for the complete local runtime.

Validation: `npm test`, `npm run validate:capabilities`, `npm run validate:catalog`, and `node scripts/build-hosted.mjs`.
