# Power Chords Codex workspace — private review

The workspace runs every capability through an actual input-to-artifact path. It reuses the operator's existing Codex CLI sign-in. Power Chords never reads or copies the credential. Codex reasoning creates research, strategy, product and engineering deliverables; local processing performs document extraction, OCR, retrieval, calculations, tests and media rendering. Results include files, hashes, timestamps and tool/model receipts.

This revision is an unpublished local draft. Publishing the repository or deploying the matching website requires explicit approval of the reviewed scope. Scheduled refreshes also prepare drafts only.

## Start the private preview

Requirements: Node 24, Python 3.11, uv, a signed-in Codex CLI and macOS for the bundled system-voice speech path. Setup installs Tesseract and FFmpeg/ffprobe through Homebrew. The latest Reel-to-Knowledge CLI/MCP workflow is preserved alongside the workspace; see [its guide](../workflows/reel-to-knowledge/README.md). Setup installs pinned packages and creates synthetic examples; the first retrieval, transcription and separation runs download model weights. Allow disk space and network access for those downloads. The acceptance environment is an 8 GB Apple Silicon Mac, with CPU workers limited for heavy audio processing.

```bash
codex login status
npm run setup:runtime
npm run build:site
node scripts/prepare-publication-review.mjs
npm run preview:runtime
```

Open http://127.0.0.1:4333/workspace.html. Select a capability, load a working example or provide your own inputs, then run it. Real processing may take several minutes. Run history, inputs and generated files stay in `.local/runtime/`; keep that ignored directory private. Uploaded text and extracted evidence are sent to the existing Codex connection when needed. Public research is opt-in per run. Codex plan availability and usage limits still apply.

`npm start` continues to run the older Workroom and its four offline drafting flows. Its `native_assistive` / `adapter_required` metadata describes that engine only. The new workspace is a separate runtime with execution paths for every stable capability ID. Installing portable SKILL.md files in Claude, Cursor, Gemini or another agent does not install this runtime or grant those agents access to the signed-in Codex account.

## Execution paths and supported scope

| Area | Actual processing | Boundaries |
|---|---|---|
| Research, product, strategy, planning, marketing, careers | Capability-specific Codex reasoning over supplied evidence; optional live public web search | No invented research or automatic outreach. Plans do not claim deployed business outcomes. |
| Documents | PDF, DOCX, XLSX, PPTX, text and structured-file extraction; scanned-PDF fallback through PDFium and OCR | Scanned PDFs limited to 20 pages. Encrypted or unsupported files fail visibly. |
| OCR | Tesseract text, confidence and bounding boxes | Recognition can be wrong; review extraction against the source. |
| Evidence graphs, journeys, architecture and workflows | Structured nodes/edges rendered as original SVG | Graphs distinguish evidence from proposals; diagrams are not deployed systems. |
| Semantic search | MiniLM ONNX embeddings and cosine ranking | Local supplied corpus, up to five results; no vector service credentials needed. |
| Apps, wireframes and interactive prototypes | Self-contained HTML/CSS/JavaScript artifacts with forms and state | Isolated session prototypes, without shared persistence, production authentication or external connectivity. |
| Debugging | QuickJS runs the supplied JavaScript assertions before and after a proposed fix | No filesystem/network host bindings; 32 MB and two-second limits. Other languages receive analysis, not unrun-test claims. |
| CAD and illustration | Dimensioned rectangular-box STL; SVG for other technical illustrations | Arbitrary shapes are illustrations, not certified manufacture-ready CAD. |
| Coordination | Separate Codex planner and reviewer calls | No hidden claim that arbitrary third-party agents were executed. |
| Local routines | Explicit activation of a reviewed recurring task | Server must remain running; 60 seconds–14 days between runs, maximum ten runs; explicit stop control. |
| Browser/API automation | Actual public HTTP reads, HTML evidence extraction, reviewed HTTP writes | No general browser clicking or authenticated private connectors. Exact URL/method/payload approval required for writes. |
| Workflow chaining | Two to four actually executed capability steps; previous results become next-step evidence | No recursive chains or scheduling from a chain. A failed step stops completion. |
| Permissions | Read/write/publication policy decisions and one-use action receipts | This local workspace has no publication/deployment endpoint. |
| Data and finance | SQLite SELECT, CSV/JSON summaries, chart SVG, filterable dashboard HTML, funnel ratios, linear forecast, unit economics | Up to 5,000 rows; table displays up to 1,000. SQL cannot write, attach databases or load extensions. Forecasts are simple mathematical baselines. |
| Billing | Line-item arithmetic, tax calculation, issue/pay/cancel state transitions, invoice JSON and HTML | No bank, payment processor, accounting connector or actual money movement. A `paid` fixture is a local state event. |
| Evaluation | Real Codex calls scored against explicit literal inclusion criteria | Small functional checks, not a comprehensive quality benchmark. |
| Speech | Whisper tiny.en transcription and timestamps; macOS system-voice WAV generation | Local CPU; English example model, no voice cloning. |
| Audio | Demucs four-stem separation with real output WAVs | Input limited to 120 seconds; separation quality varies. |
| Video | Original title-card scene rendering through FFmpeg to H.264 MP4, with generated storyboard/captions | Short rendered explainer, not photorealistic footage or a full video-editing suite. |
| SEO | Actual requested public HTML fetch, metadata/headings/schema evidence and Codex audit | No JavaScript-rendered crawl, authenticated analytics, ranking database or exhaustive site crawl. |
| Spatial and field data | Latitude/longitude or Point/LineString GeoJSON, topology, SVG map and regional summaries | EPSG:4326 input; no satellite feed, road-routing service or automatic survey collection. |

The former missing-integration categories now have first-party paths within these limits. Retained GitHub source repositories remain attributed design references. The workspace does not install, execute or certify every referenced repository or commercial connector.

## Reviewable evidence

`npm run verify:runtime` exercises each capability through the same authenticated HTTP API as the browser. It uses explicit synthetic examples, actual Codex calls and installed native processors. The private report is `.local/runtime/verification.json`; open `/verification.html` for links to each run, its files and receipts. Passed cases are reused; remove a case from that private report to rerun it after relevant changes. Supply capability IDs as arguments to limit the run. Live verification consumes Codex plan usage; ordinary tests do not.

Acceptance checks include document extraction, invoice OCR, semantic rank, actual JavaScript regression assertions, SQLite revenue totals, forecast and funnel values, invoice transitions, separate reviewer calls, chained results, real WAV/MP4 headers, four separated audio stems and map topology. Browser interaction checks separately exercise generated forms, dashboard filtering and the workspace controls. The illustrative GIFs remain process illustrations, not recordings of these tests.

## Isolation and failure behavior

The server binds only to 127.0.0.1, checks Host and Origin and requires an HttpOnly SameSite session. Generated HTML uses an opaque sandbox allowing inline scripts and local form handlers, with external form submission and network access blocked. It cannot access the workspace cookie, parent page or local files. Public HTTP access validates and pins DNS, rejects private addresses and revalidates redirects. Code execution uses QuickJS with no host bindings. Codex runs with shell, apps, plugins and delegated agents disabled, in a separate cancellable process group.

Specialist dependencies are checked before a capability is offered as available. Missing inputs, failed processing, missing deliverables, invalid diagrams or failed regression checks produce a failed run with an explanation. A completed run proves the recorded input-to-output operation, not the correctness of every model claim or the readiness of a production integration. Uploaded content is evidence, never permission to act. External write approval is bound to an exact request digest and can be used only once. Routines remain inactive until explicitly activated and are not silently restored after restart.

## Hosting and portability

The website and portable packs can be built statically, but a static host or Vercel static deployment cannot execute this Mac's signed-in Codex or native tools. This preview deliberately stays local. A future public multi-user runtime would need user authentication, separate per-user Codex/provider authorization, durable isolated jobs, supported server speech processing, storage, quotas and connector-specific permissions. Approval to publish this revision does not authorize exposing the local service or sharing this user's Codex identity with website visitors.

See [third-party notices](../THIRD_PARTY_NOTICES.md), [adapter extension contract](ADAPTER_SDK.md) and [publication proposal](PUBLICATION_PROPOSAL.md).
