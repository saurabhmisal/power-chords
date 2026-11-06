# Private Codex runtime verification

Status: unpublished review draft. Report updated 2026-11-06T18:57:01.649Z.

52/52 capability paths passed representative synthetic input-to-artifact checks through the authenticated HTTP API used by the browser. Actual Codex calls and installed processors ran; successful cases have generated files, SHA-256 hashes and execution receipts. The initial video case exposed a blocked subtitle extension; the runtime now accepts SRT/VTT and the rerun produced a real MP4. Expanded graph outputs were rerun after implementation.

This proves the recorded examples, not every possible input, commercial integration or production workflow. Supported scope and limits are in [CODEX_RUNTIME.md](CODEX_RUNTIME.md). Every model result still requires review.

## Results

| ID | Capability | Result | Output files | Codex calls | Processing steps |
|---|---|---|---|---|---|
| 01 | Customer Discovery Compass | Passed | 3 | 1 | 0 |
| 02 | Market Research Atlas | Passed | 3 | 1 | 0 |
| 03 | Competitive Research Prism | Passed | 3 | 1 | 0 |
| 04 | Sales Research Beacon | Passed | 3 | 1 | 0 |
| 05 | Evidence Mapping Mosaic | Passed | 4 | 1 | 0 |
| 06 | Document Ingestion Intake | Passed | 4 | 1 | 1 |
| 07 | OCR Extraction Lens | Passed | 5 | 1 | 2 |
| 08 | Knowledge Graph Constellation | Passed | 4 | 1 | 0 |
| 09 | Semantic Search Pathfinder | Passed | 4 | 1 | 1 |
| 10 | PRD Blueprint | Passed | 3 | 1 | 0 |
| 11 | Journey Mapping Trail | Passed | 4 | 1 | 0 |
| 12 | Product Roadmap Horizon | Passed | 4 | 1 | 0 |
| 13 | Prioritization Summit | Passed | 3 | 1 | 0 |
| 14 | Experiment Design Catalyst | Passed | 3 | 1 | 0 |
| 15 | API Planning Bridge | Passed | 4 | 1 | 0 |
| 16 | App Prototyping Foundry | Passed | 4 | 1 | 0 |
| 17 | Codebase Exploration Lantern | Passed | 4 | 1 | 0 |
| 18 | System Architecture Keystone | Passed | 4 | 1 | 0 |
| 19 | Debugging & QA Sentinel | Passed | 6 | 1 | 2 |
| 20 | Release Readiness Runway | Passed | 3 | 1 | 0 |
| 21 | UX Wireframing Canvas | Passed | 4 | 1 | 0 |
| 22 | Interactive Prototyping Playground | Passed | 4 | 1 | 0 |
| 23 | Architecture Diagrams Schematic | Passed | 4 | 1 | 0 |
| 24 | Technical Illustration Sculpt | Passed | 5 | 1 | 0 |
| 25 | Agent Coordination Ensemble | Passed | 5 | 2 | 0 |
| 26 | Task Orchestration Tempo | Passed | 4 | 1 | 0 |
| 27 | Browser Automation Pilot | Passed | 5 | 1 | 0 |
| 28 | Workflow Chaining Relay | Passed | 4 | 1 | 0 |
| 29 | Permission Controls Vault | Passed | 4 | 1 | 0 |
| 30 | SQL Analysis Quarry | Passed | 9 | 1 | 1 |
| 31 | Dashboard Reporting Panorama | Passed | 7 | 1 | 1 |
| 32 | Funnel Diagnostics Pulse | Passed | 5 | 1 | 1 |
| 33 | Agent Evaluation Benchmark | Passed | 4 | 3 | 0 |
| 34 | Forecast Modeling Outlook | Passed | 5 | 1 | 1 |
| 35 | Billing Workflows Ledger | Passed | 5 | 1 | 1 |
| 36 | Unit Economics Balance | Passed | 5 | 1 | 1 |
| 37 | Operations Planning Cockpit | Passed | 6 | 1 | 1 |
| 38 | Resource Planning Cadence | Passed | 3 | 1 | 0 |
| 39 | Speech Transcription Scribe | Passed | 5 | 1 | 1 |
| 40 | Voice Generation Chorus | Passed | 5 | 1 | 1 |
| 41 | Audio Separation Studio | Passed | 8 | 1 | 1 |
| 42 | Video Creation Storyboard | Passed | 6 | 1 | 1 |
| 43 | SEO Research Radar | Passed | 4 | 1 | 1 |
| 44 | Launch Planning Launchpad | Passed | 3 | 1 | 0 |
| 45 | Campaign Content Amplifier | Passed | 4 | 1 | 0 |
| 46 | Growth Experiments Momentum | Passed | 3 | 1 | 0 |
| 47 | Career Research Scout | Passed | 3 | 1 | 0 |
| 48 | Interview Preparation Rehearsal | Passed | 3 | 1 | 0 |
| 49 | Location Research Waypoint | Passed | 5 | 1 | 1 |
| 50 | Road Networks Gridline | Passed | 6 | 1 | 1 |
| 51 | Geospatial Visualization Terra | Passed | 6 | 1 | 1 |
| 52 | Field Insights Meridian | Passed | 5 | 1 | 1 |

## Concrete checks

- Invoice image recognized as PC-204; document text extracted from actual PDF and DOCX files.
- MiniLM retrieval ranked the supplied webhook-deduplication passage first.
- Generated JavaScript fix passed the supplied regression assertions in QuickJS. SQL writes, file attachment and host filesystem access were blocked.
- Actual SQLite aggregate revenue was 6050; cost 3350; contribution 2700. Linear forecast next period was 2000; funnel conversion was calculated from counts. Invoice total 1375 and issue/pay transitions matched supplied inputs.
- Separate planner and reviewer calls completed. A two-stage SQL-to-dashboard chain executed actual child runs.
- Whisper transcribed a synthetic spoken sentence; system speech produced WAV; Demucs produced four real stems; FFmpeg produced H.264 MP4.
- GeoJSON road graph had four nodes and three edges; coordinate inputs generated actual SVG maps.
- Additional checks fetched the public SQLite homepage with HTTP 200, executed four native Codex web-search events with official citations, and built a dashboard from CSV input. These runs are separate from the synthetic capability matrix.
- Browser checks added a delivery exception, assigned an owner and resolved it; validated and completed a generated onboarding prototype; and filtered dashboard rows to North, updating revenue to 2800, cost to 1600 and contribution to 1200. Generated forms run without granting same-origin access or external network access.

- A reviewed 60-second routine activated in the browser, started a real completed capability run and was stopped in the browser. A synthetic loopback HTTP write remained held until explicit approval and then executed once (HTTP 200, update count 1). A separate running request was cancelled.

## Inspect and reproduce

Start the private workspace, then open http://127.0.0.1:4333/verification.html. Each case links its actual run and downloadable output files. Private raw reports and run IDs stay under ignored .local/runtime. No credentials or model weights are part of the proposed publication.

Run npm run verify:runtime for live checks (uses the signed-in Codex plan), npm test for offline/native checks, and python3 scripts/audit-website.py for internal website checks. The live runner skips already-passed cases; remove a relevant case from its private report to rerun it.

Nothing in this report authorizes publication.
