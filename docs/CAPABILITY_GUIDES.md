# The 52 Power Chords capability guides

Install any capability as an independent, function-named skill package into a supported agent. Each linked directory contains `README.md`, `SKILL.md`, `capability.json`, and an example request.

```bash
node scripts/capabilities-cli.mjs list
node scripts/capabilities-cli.mjs install 10 --agent codex --project .
```

**Honest status:** 23 capabilities contribute to four evidence-grounded Workroom drafting flows; the others provide portable instructions and need a matching execution adapter for automated operations. Instruction portability is not the same as a working OCR, browser, media, data, or infrastructure runtime.

| # | Capability | Family | Current status |
|---|---|---|---|
| 01 | [Customer problem discovery](../capabilities/customer-problem-discovery/README.md) | Research & Discovery | Workroom-assisted |
| 02 | [Market landscape analysis](../capabilities/market-landscape-analysis/README.md) | Research & Discovery | Needs tool adapter |
| 03 | [Competitive product teardown](../capabilities/competitive-product-teardown/README.md) | Research & Discovery | Needs tool adapter |
| 04 | [Account and stakeholder intelligence](../capabilities/account-and-stakeholder-intelligence/README.md) | Research & Discovery | Workroom-assisted |
| 05 | [Evidence triangulation and opportunity mapping](../capabilities/evidence-triangulation-and-opportunity-mapping/README.md) | Research & Discovery | Workroom-assisted |
| 06 | [Multi-format document ingestion](../capabilities/multi-format-document-ingestion/README.md) | Document Intelligence | Needs tool adapter |
| 07 | [OCR and structured extraction](../capabilities/ocr-and-structured-extraction/README.md) | Document Intelligence | Needs tool adapter |
| 08 | [Knowledge graph construction](../capabilities/knowledge-graph-construction/README.md) | Document Intelligence | Needs tool adapter |
| 09 | [Semantic and context-aware retrieval](../capabilities/semantic-and-context-aware-retrieval/README.md) | Document Intelligence | Needs tool adapter |
| 10 | [PRD and specification writing](../capabilities/prd-and-specification-writing/README.md) | Product & Strategy | Workroom-assisted |
| 11 | [End-to-end journey and workflow mapping](../capabilities/end-to-end-journey-and-workflow-mapping/README.md) | Product & Strategy | Workroom-assisted |
| 12 | [Outcome-oriented roadmapping](../capabilities/outcome-oriented-roadmapping/README.md) | Product & Strategy | Workroom-assisted |
| 13 | [Opportunity sizing and prioritization](../capabilities/opportunity-sizing-and-prioritization/README.md) | Product & Strategy | Workroom-assisted |
| 14 | [Hypothesis and experiment design](../capabilities/hypothesis-and-experiment-design/README.md) | Product & Strategy | Workroom-assisted |
| 15 | [API design and integration planning](../capabilities/api-design-and-integration-planning/README.md) | Engineering & Integration | Workroom-assisted |
| 16 | [Rapid application prototyping](../capabilities/rapid-application-prototyping/README.md) | Engineering & Integration | Needs tool adapter |
| 17 | [Codebase navigation and explanation](../capabilities/codebase-navigation-and-explanation/README.md) | Engineering & Integration | Needs tool adapter |
| 18 | [System architecture and data-flow mapping](../capabilities/system-architecture-and-data-flow-mapping/README.md) | Engineering & Integration | Workroom-assisted |
| 19 | [Debugging, testing and QA](../capabilities/debugging-testing-and-qa/README.md) | Engineering & Integration | Workroom-assisted |
| 20 | [Deployment and release readiness](../capabilities/deployment-and-release-readiness/README.md) | Engineering & Integration | Workroom-assisted |
| 21 | [Wireframing and UX exploration](../capabilities/wireframing-and-ux-exploration/README.md) | Design & Creation | Needs tool adapter |
| 22 | [Interactive prototype construction](../capabilities/interactive-prototype-construction/README.md) | Design & Creation | Needs tool adapter |
| 23 | [Architecture and sequence diagrams](../capabilities/architecture-and-sequence-diagrams/README.md) | Design & Creation | Needs tool adapter |
| 24 | [Technical illustrations and CAD assets](../capabilities/technical-illustrations-and-cad-assets/README.md) | Design & Creation | Needs tool adapter |
| 25 | [Multi-agent task decomposition](../capabilities/multi-agent-task-decomposition/README.md) | Agentic Automation | Workroom-assisted |
| 26 | [Task and routine orchestration](../capabilities/task-and-routine-orchestration/README.md) | Agentic Automation | Workroom-assisted |
| 27 | [Browser and API task automation](../capabilities/browser-and-api-task-automation/README.md) | Agentic Automation | Needs tool adapter |
| 28 | [Composable tool and workflow chains](../capabilities/composable-tool-and-workflow-chains/README.md) | Agentic Automation | Workroom-assisted |
| 29 | [Permission-scoped execution and controls](../capabilities/permission-scoped-execution-and-controls/README.md) | Agentic Automation | Workroom-assisted |
| 30 | [SQL and structured-data analysis](../capabilities/sql-and-structured-data-analysis/README.md) | Data & Evaluation | Needs tool adapter |
| 31 | [Dashboards and visual reporting](../capabilities/dashboards-and-visual-reporting/README.md) | Data & Evaluation | Needs tool adapter |
| 32 | [Funnel, retention and operational diagnostics](../capabilities/funnel-retention-and-operational-diagnostics/README.md) | Data & Evaluation | Workroom-assisted |
| 33 | [LLM and agent evaluation](../capabilities/llm-and-agent-evaluation/README.md) | Data & Evaluation | Needs tool adapter |
| 34 | [Forecasting and scenario modeling](../capabilities/forecasting-and-scenario-modeling/README.md) | Data & Evaluation | Workroom-assisted |
| 35 | [Billing and invoicing workflows](../capabilities/billing-and-invoicing-workflows/README.md) | Business & Operations | Needs tool adapter |
| 36 | [Unit economics and financial modeling](../capabilities/unit-economics-and-financial-modeling/README.md) | Business & Operations | Workroom-assisted |
| 37 | [Operational command-center design](../capabilities/operational-command-center-design/README.md) | Business & Operations | Workroom-assisted |
| 38 | [Time and resource planning](../capabilities/time-and-resource-planning/README.md) | Business & Operations | Workroom-assisted |
| 39 | [Speech transcription and meeting notes](../capabilities/speech-transcription-and-meeting-notes/README.md) | Voice & Media | Needs tool adapter |
| 40 | [Text-to-speech and voice interfaces](../capabilities/text-to-speech-and-voice-interfaces/README.md) | Voice & Media | Needs tool adapter |
| 41 | [Audio separation and editing](../capabilities/audio-separation-and-editing/README.md) | Voice & Media | Needs tool adapter |
| 42 | [Video demos and educational content](../capabilities/video-demos-and-educational-content/README.md) | Voice & Media | Needs tool adapter |
| 43 | [SEO and discoverability research](../capabilities/seo-and-discoverability-research/README.md) | Marketing & Go-to-Market | Needs tool adapter |
| 44 | [Launch and channel planning](../capabilities/launch-and-channel-planning/README.md) | Marketing & Go-to-Market | Workroom-assisted |
| 45 | [Campaigns and content production](../capabilities/campaigns-and-content-production/README.md) | Marketing & Go-to-Market | Needs tool adapter |
| 46 | [Conversion and growth experimentation](../capabilities/conversion-and-growth-experimentation/README.md) | Marketing & Go-to-Market | Workroom-assisted |
| 47 | [Career and opportunity research](../capabilities/career-and-opportunity-research/README.md) | Professional Enablement | Needs tool adapter |
| 48 | [Interview preparation and learning plans](../capabilities/interview-preparation-and-learning-plans/README.md) | Professional Enablement | Needs tool adapter |
| 49 | [Location and map-based research](../capabilities/location-and-map-based-research/README.md) | Spatial & Field Intelligence | Needs tool adapter |
| 50 | [Road and network visualization](../capabilities/road-and-network-visualization/README.md) | Spatial & Field Intelligence | Needs tool adapter |
| 51 | [Geospatial data visualization](../capabilities/geospatial-data-visualization/README.md) | Spatial & Field Intelligence | Needs tool adapter |
| 52 | [Location-driven field insights](../capabilities/location-driven-field-insights/README.md) | Spatial & Field Intelligence | Needs tool adapter |

## User controls

The capability CLI copies files only; it does not run untrusted code. Use `--force` to explicitly overwrite an installed skill you own, and `--dest` to target another skills folder. Disabling Workroom capabilities still uses the existing local settings API.
