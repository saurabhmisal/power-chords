# Remaining installed skill cleanup: 15 November 2026

Status: local draft awaiting approval before GitHub or website publication. The owner explicitly requested checking the other 31 installed Codex skills, cleaning redundant instructions, updating those local copies now and showing the changes before publication. This authorizes the local installed cleanup, not publication.

Repository baseline: `1ff5fa8728809e07e2eaa76f53249eae5569aba7`. Local branch: `draft/remaining-skill-dedup-20261115`.

## Review result

Reviewed all 31 target SKILL.md files and their structured source guidance. Nine skills contain 11 pairs of overlapping source-specific notes. Each pair becomes one consolidated note. No additional exact repeated sentences were found in the skill bodies by the review check. Related instructions with distinct purposes are retained, including general approval controls and their source-specific applications. README and SKILL.md remain standalone documents and are not deduplicated against each other. Common rules across independent skills are not removed.

| Skill | Consolidated references | Notes before → after |
|---|---|---|
| Sales Research Beacon | harvey | 2 → 1 |
| Campaign Content Amplifier | lemo-opuscar, OpenMontage, harvey | 6 → 3 |
| Codebase Exploration Lantern | compound-engineering-plugin | 2 → 1 |
| Growth Experiments Momentum | umami | 2 → 1 |
| Dashboard Reporting Panorama | umami | 2 → 1 |
| Release Readiness Runway | superplane | 2 → 1 |
| Funnel Diagnostics Pulse | umami | 2 → 1 |
| Launch Planning Launchpad | harvey | 2 → 1 |
| SQL Analysis Quarry | umami | 2 → 1 |

## Consolidated wording

- harvey: The current original is Sellbird, formerly Harvey, and declares AGPL-3.0. Review configuration and data-home migration and license requirements before reuse. Account research and drafting do not authorize outreach or mailbox access. Sending messages or accessing mail requires explicit authorization.

- lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The source is recorded as NOASSERTION, so the earlier MIT catalog label is not a blanket grant. Install and validate the rendering toolchain separately, and distinguish style references from a verified rendered film.

- OpenMontage: The canonical source moved to OpenMontageInc/OpenMontage. Preserve earlier attribution and review AGPL requirements, the external media toolchain, service access and asset permissions before production use.

- compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.

- umami: Before installing external analytics or collecting events, review database, secrets, deployment configuration, consent, data retention and access. Distinguish source events from acquisition and retention measures. This instruction pack does not configure an analytics server or default admin account.

- superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.

The consolidated notes retain explicit mail and outreach authorization, the Harvey/Sellbird migration and AGPL notice, component-specific media licensing, rendering-toolchain validation, attribution, external service and asset permissions, separate host-plugin review, actual review evidence, orchestration boundaries and licensing, and analytics consent, retention, secrets and access requirements. No tools, services or execution features are installed by this cleanup.

## Reviewed without changes

The following 22 skills have no redundant source instructions requiring cleanup in this review:

- Customer Discovery Compass
- Market Research Atlas
- Competitive Research Prism
- Evidence Mapping Mosaic
- Document Ingestion Intake
- OCR Extraction Lens
- Knowledge Graph Constellation
- Semantic Search Pathfinder
- PRD Blueprint
- Journey Mapping Trail
- Product Roadmap Horizon
- Prioritization Summit
- Experiment Design Catalyst
- API Planning Bridge
- System Architecture Keystone
- Architecture Diagrams Schematic
- Agent Evaluation Benchmark
- Forecast Modeling Outlook
- Unit Economics Balance
- Operations Planning Cockpit
- Resource Planning Cadence
- SEO Research Radar

The three previously cleaned design skills are excluded from this request and remain byte for byte unchanged. In total, 25 of the 34 installed Power Chords packs remain unchanged.

## Proposed repository changes

Update only the nine affected source-guidance arrays in data/capability-guides.json and regenerate their nine SKILL.md files, nine README.md files, nine capability.json manifests and nine website Markdown downloads. Preserve names, IDs, workflow steps, outputs, examples, upstream revisions, license notices, weekly notes, GIFs, other guidance and runtime code. Include this review proposal as the only additional document. There is no new upstream refresh or runtime change.

## Local installed copies

Back up and update only the nine affected personal Codex packs. Preserve their portable links, source revision, license notices and extra files. Record this as an explicitly requested unpublished local override, with the installed published base revision, the newer repository baseline, draft proposal path and current file hashes. These nine installed packs currently derive from weekly release 0809c7cba3d1b82cdbf54b7d83626eafe0385857. The draft repository also includes the separate published design cleanup 1ff5fa8728809e07e2eaa76f53249eae5569aba7.

Preserve all 22 reviewed/no-change installations and the three previously cleaned design packs byte for byte. Future weekly installation updates must preserve the local overrides until this cleanup is included in an approved publication or the owner explicitly supersedes it. Do not restore the redundant source notes from an older release.

## Checks and publication gate

Catalog and capability validators, static and hosted builds, relative-link and installed-hash checks, 18 skill-folder validations and whitespace checks passed. Non-target fields, source guidance and installed skill files were verified unchanged. Each repeated source now has one consolidated note in the affected installed and draft packs. All 31 reviewed installed packs have no repeated source entries. This editorial-only cleanup does not require live model or third-party execution tests.

No branch push, public pull request, release, workflow dispatch or deployment is authorized. Show the before-and-after preview and obtain fresh approval of this exact proposal before publication. Recheck current remote main and the saved file hashes when approval arrives. After verified approved publication and deployment, reconcile the nine installation records and portable links to the exact published commit and clear the completed local overrides.
