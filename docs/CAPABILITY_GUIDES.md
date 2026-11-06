# Power Chords capability guides

Install any capability as an independent, function-named skill package into a supported agent. Each linked directory contains `README.md`, `SKILL.md`, `capability.json`, and an example request.

```bash
node scripts/capabilities-cli.mjs list
node scripts/capabilities-cli.mjs install 10 --agent codex --project .
```

**Execution:** All capabilities have a private Codex workspace path. Specialist operations use installed local tools; planning and research produce evidence-grounded Codex deliverables. See [runtime guide](CODEX_RUNTIME.md) for supported inputs, actual verification and limits. Portable instruction installation alone does not install processing tools.

| # | Capability | Family | Current status |
|---|---|---|---|
| 01 | [Customer Discovery Compass](../capabilities/customer-problem-discovery/README.md) | Research & Discovery | Codex workspace |
| 02 | [Market Research Atlas](../capabilities/market-landscape-analysis/README.md) | Research & Discovery | Codex workspace |
| 03 | [Competitive Research Prism](../capabilities/competitive-product-teardown/README.md) | Research & Discovery | Codex workspace |
| 04 | [Sales Research Beacon](../capabilities/account-and-stakeholder-intelligence/README.md) | Research & Discovery | Codex workspace |
| 05 | [Evidence Mapping Mosaic](../capabilities/evidence-triangulation-and-opportunity-mapping/README.md) | Research & Discovery | Codex workspace |
| 06 | [Document Ingestion Intake](../capabilities/multi-format-document-ingestion/README.md) | Document Intelligence | Codex workspace |
| 07 | [OCR Extraction Lens](../capabilities/ocr-and-structured-extraction/README.md) | Document Intelligence | Codex workspace |
| 08 | [Knowledge Graph Constellation](../capabilities/knowledge-graph-construction/README.md) | Document Intelligence | Codex workspace |
| 09 | [Semantic Search Pathfinder](../capabilities/semantic-and-context-aware-retrieval/README.md) | Document Intelligence | Codex workspace |
| 10 | [PRD Blueprint](../capabilities/prd-and-specification-writing/README.md) | Product & Strategy | Codex workspace |
| 11 | [Journey Mapping Trail](../capabilities/end-to-end-journey-and-workflow-mapping/README.md) | Product & Strategy | Codex workspace |
| 12 | [Product Roadmap Horizon](../capabilities/outcome-oriented-roadmapping/README.md) | Product & Strategy | Codex workspace |
| 13 | [Prioritization Summit](../capabilities/opportunity-sizing-and-prioritization/README.md) | Product & Strategy | Codex workspace |
| 14 | [Experiment Design Catalyst](../capabilities/hypothesis-and-experiment-design/README.md) | Product & Strategy | Codex workspace |
| 15 | [API Planning Bridge](../capabilities/api-design-and-integration-planning/README.md) | Engineering & Integration | Codex workspace |
| 16 | [App Prototyping Foundry](../capabilities/rapid-application-prototyping/README.md) | Engineering & Integration | Codex workspace |
| 17 | [Codebase Exploration Lantern](../capabilities/codebase-navigation-and-explanation/README.md) | Engineering & Integration | Codex workspace |
| 18 | [System Architecture Keystone](../capabilities/system-architecture-and-data-flow-mapping/README.md) | Engineering & Integration | Codex workspace |
| 19 | [Debugging & QA Sentinel](../capabilities/debugging-testing-and-qa/README.md) | Engineering & Integration | Codex workspace |
| 20 | [Release Readiness Runway](../capabilities/deployment-and-release-readiness/README.md) | Engineering & Integration | Codex workspace |
| 21 | [UX Wireframing Canvas](../capabilities/wireframing-and-ux-exploration/README.md) | Design & Creation | Codex workspace |
| 22 | [Interactive Prototyping Playground](../capabilities/interactive-prototype-construction/README.md) | Design & Creation | Codex workspace |
| 23 | [Architecture Diagrams Schematic](../capabilities/architecture-and-sequence-diagrams/README.md) | Design & Creation | Codex workspace |
| 24 | [Technical Illustration Sculpt](../capabilities/technical-illustrations-and-cad-assets/README.md) | Design & Creation | Codex workspace |
| 25 | [Agent Coordination Ensemble](../capabilities/multi-agent-task-decomposition/README.md) | Agentic Automation | Codex workspace |
| 26 | [Task Orchestration Tempo](../capabilities/task-and-routine-orchestration/README.md) | Agentic Automation | Codex workspace |
| 27 | [Browser Automation Pilot](../capabilities/browser-and-api-task-automation/README.md) | Agentic Automation | Codex workspace |
| 28 | [Workflow Chaining Relay](../capabilities/composable-tool-and-workflow-chains/README.md) | Agentic Automation | Codex workspace |
| 29 | [Permission Controls Vault](../capabilities/permission-scoped-execution-and-controls/README.md) | Agentic Automation | Codex workspace |
| 30 | [SQL Analysis Quarry](../capabilities/sql-and-structured-data-analysis/README.md) | Data & Evaluation | Codex workspace |
| 31 | [Dashboard Reporting Panorama](../capabilities/dashboards-and-visual-reporting/README.md) | Data & Evaluation | Codex workspace |
| 32 | [Funnel Diagnostics Pulse](../capabilities/funnel-retention-and-operational-diagnostics/README.md) | Data & Evaluation | Codex workspace |
| 33 | [Agent Evaluation Benchmark](../capabilities/llm-and-agent-evaluation/README.md) | Data & Evaluation | Codex workspace |
| 34 | [Forecast Modeling Outlook](../capabilities/forecasting-and-scenario-modeling/README.md) | Data & Evaluation | Codex workspace |
| 35 | [Billing Workflows Ledger](../capabilities/billing-and-invoicing-workflows/README.md) | Business & Operations | Codex workspace |
| 36 | [Unit Economics Balance](../capabilities/unit-economics-and-financial-modeling/README.md) | Business & Operations | Codex workspace |
| 37 | [Operations Planning Cockpit](../capabilities/operational-command-center-design/README.md) | Business & Operations | Codex workspace |
| 38 | [Resource Planning Cadence](../capabilities/time-and-resource-planning/README.md) | Business & Operations | Codex workspace |
| 39 | [Speech Transcription Scribe](../capabilities/speech-transcription-and-meeting-notes/README.md) | Voice & Media | Codex workspace |
| 40 | [Voice Generation Chorus](../capabilities/text-to-speech-and-voice-interfaces/README.md) | Voice & Media | Codex workspace |
| 41 | [Audio Separation Studio](../capabilities/audio-separation-and-editing/README.md) | Voice & Media | Codex workspace |
| 42 | [Video Creation Storyboard](../capabilities/video-demos-and-educational-content/README.md) | Voice & Media | Codex workspace |
| 43 | [SEO Research Radar](../capabilities/seo-and-discoverability-research/README.md) | Marketing & Go-to-Market | Codex workspace |
| 44 | [Launch Planning Launchpad](../capabilities/launch-and-channel-planning/README.md) | Marketing & Go-to-Market | Codex workspace |
| 45 | [Campaign Content Amplifier](../capabilities/campaigns-and-content-production/README.md) | Marketing & Go-to-Market | Codex workspace |
| 46 | [Growth Experiments Momentum](../capabilities/conversion-and-growth-experimentation/README.md) | Marketing & Go-to-Market | Codex workspace |
| 47 | [Career Research Scout](../capabilities/career-and-opportunity-research/README.md) | Professional Enablement | Codex workspace |
| 48 | [Interview Preparation Rehearsal](../capabilities/interview-preparation-and-learning-plans/README.md) | Professional Enablement | Codex workspace |
| 49 | [Location Research Waypoint](../capabilities/location-and-map-based-research/README.md) | Spatial & Field Intelligence | Codex workspace |
| 50 | [Road Networks Gridline](../capabilities/road-and-network-visualization/README.md) | Spatial & Field Intelligence | Codex workspace |
| 51 | [Geospatial Visualization Terra](../capabilities/geospatial-data-visualization/README.md) | Spatial & Field Intelligence | Codex workspace |
| 52 | [Field Insights Meridian](../capabilities/location-driven-field-insights/README.md) | Spatial & Field Intelligence | Codex workspace |

## User controls

The capability CLI copies files only; it does not run untrusted code. Use `--force` to explicitly overwrite an installed skill you own, and `--dest` to target another skills folder. Disabling Workroom capabilities still uses the existing local settings API.
