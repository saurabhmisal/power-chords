# Power Chords publication proposal — awaiting approval

No draft code has been pushed, no release has been published, and the public website has not been changed. The legacy hourly GitHub auto-publisher has been disabled to enforce the new approval requirement. Saturday preparation remains active at 08:00 Asia/Kolkata, producing local proposals only.

## What would be published after approval

- Public capability names use a recognizable core function plus one distinctive word. All 52 existing capability IDs, URLs and install slugs remain compatible. The complete before/after list is in CAPABILITY_NAMES.md.
- The latest main-branch Reel-to-Knowledge CLI/MCP workflow and shared Source Sans 3 typography are preserved in the draft. Its real media-ingest/search/deduplication test passes with FFmpeg/ffprobe installed.
- All capabilities get a private Codex workspace path with working example inputs, real generated files, processing receipts and a verification gallery. This uses the existing local Codex sign-in and installed specialist tools, without copying credentials. Static hosting cannot run the local workspace; public multi-user runtime hosting is outside this proposal. See CODEX_RUNTIME.md for precise supported scope.
- Every capability gets a Power Chords page with its own original GIF that plays automatically, reduced-motion poster, workflow diagram, input/output checklist, example prompt, related capabilities and agent setup links. No GIF download option is shown.
- The homepage becomes a searchable, category-filtered Power Chords capability library. Repository cards and “Pinned upstream” wording are removed from the product pages. Attribution and technical revision records remain intact in notices and provenance files.
- 13 unsuitable source references are excluded from the active inventory, lockfile and capability mappings, leaving 64 documented reference sources. No repository is deleted from the GitHub account. Every removal and its reason is in SOURCE_DELIVERY_REVIEW.md.
- New or previously excluded repositories cannot be activated without a recorded delivery-path review.
- Weekly runs prepare a preview and checks, then wait for explicit approval. The proposed Pages workflow is manual and publishes only a specific approved main commit. The draft-check workflow cannot push, publish releases or deploy.
- Website scripts and styles use content hashes so a cached older asset cannot silently disable new interactions. Animation metadata prevents stale GIFs from being reused after workflow content changes. Standalone Markdown downloads link to their complete capability pages, and capability pages include the existing production-only analytics.

## What this proposal does not claim

Power Chords owns its original product experience, names, documentation, diagrams and schematic animations. Third-party projects retain their rights and licenses. A retained repository has a documented delivery path; this static source review does not prove it runs correctly or is integrated into Power Chords.

The private Codex workspace implements first-party execution paths for all capabilities, including the formerly missing specialist categories. Actual synthetic input-to-artifact runs and tool receipts are reviewable in the verification gallery. This does not certify arbitrary referenced repositories, production credentials or every external connector. Prototype apps are session-only; billing is a local state machine, browser automation covers public HTTP, and video is a rendered explainer. The old Workroom metadata remains separate for compatibility. The GIFs are clearly labelled illustrative process walkthroughs, not screen recordings of live execution. Names are editorial proposals, not trademark-clearance determinations.

## Review

- Local browser review: http://127.0.0.1:4333/review.html
- Working preview: http://127.0.0.1:4333/workspace.html
- Executed checks: http://127.0.0.1:4333/verification.html
- Product preview: http://127.0.0.1:4333/index.html#pc-capabilities
- Example capability: http://127.0.0.1:4333/capabilities/account-and-stakeholder-intelligence/index.html
- Full name mapping: docs/CAPABILITY_NAMES.md
- Source removal decisions and evidence: docs/SOURCE_DELIVERY_REVIEW.md and data/source-policy.json

## Validation

Live input-to-artifact checks for all capabilities with actual Codex calls and local processing; additional public-source and browser checks; detailed evidence in RUNTIME_VERIFICATION.md. Catalog and capability validators; complete Node test suite; static and hosted builds; internal page/download/asset checks; all 52 GIFs decoded as multi-frame images; browser checks for search, filtering, page navigation, motion controls, setup selection and responsive layout. The release stays unpublished until the user approves the concrete reviewed scope.

## Approval boundary

Approval of this proposal would authorize publishing these reviewed code, documentation, source-selection and website changes to saurabhmisal/power-chords and deploying the matching website. It does not authorize future refreshes, external outreach, deletion of user repositories, arbitrary source-repository execution, a public multi-user execution service or exposing the operator’s local Codex identity. Changes requested during review must be incorporated and shown again before publication. Neither silence nor an old approval authorizes publishing.
