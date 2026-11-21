# Exact instruction changes: 21 November 2026

Status: unpublished. These are the exact final before-and-after source-guidance changes relative to current remote main. Installation instructions, stable skill IDs, workflow steps, outputs and approval rules remain compatible. Shared requirements in independently usable skills and standalone README/SKILL documents are intentionally retained.

Baseline: `e54b907e9230186211e435c84a2d2e95700be60c`. 28 affected skills, 47 changed source-note groups, including 17 redundant pairs consolidated in 10 packs.

## Document Ingestion Intake

Stable ID: `06`. Package: `power-chords-multi-format-document-ingestion`.

### book-to-skill

Before:

No source-specific guidance note.

After:

> book-to-skill: Preserve page evidence and paragraph boundaries inside table cells, and check for stale extraction output or missing chapters before using a document. Remote search/read needs a separately authorized provider and permission to access the selected edition. Do not configure a provider or publish a generated skill from a conversion request alone.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Knowledge Graph Constellation

Stable ID: `08`. Package: `power-chords-knowledge-graph-construction`.

### Understand-Anything

Before:

> Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built.

After:

> Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built. When comparing code graphs, distinguish same-named functions by their owning container and check overload signatures against the matching owner before calling a function new, changed or removed.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Experiment Design Catalyst

Stable ID: `14`. Package: `power-chords-hypothesis-and-experiment-design`.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## API Planning Bridge

Stable ID: `15`. Package: `power-chords-api-design-and-integration-planning`.

### api-anything

Before:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup.

After:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup. Honor rate limits and Retry-After rather than switching to a browser to evade throttling. Review proxy routing separately. An export scan may warn without blocking, so inspect credential-like fields before sharing a specification and never print their values.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## App Prototyping Foundry

Stable ID: `16`. Package: `power-chords-rapid-application-prototyping`.

### reelkit

Before:

> reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
> reelkit: Count core, framework binding and overlay requirements separately before selecting an external UI interaction component. Check keyboard, touch, accessibility and responsive behavior in the rendered target rather than assuming framework parity.

After:

> reelkit: Touch-first slider reference. Check core, framework binding and overlay requirements separately. Test keyboard, touch, accessibility, input behavior and responsive states in the rendered target rather than assuming framework parity.

### compound-engineering-plugin

Before:

> compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
> compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.

After:

> compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.

### agent-skills

Before:

No source-specific guidance note.

After:

> agent-skills: Use the project’s own verification tools for interface work. Pair automated accessibility findings with keyboard, focus, reduced-motion and screen-reader checks, and do not report conformance from an automated scan alone.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Codebase Exploration Lantern

Stable ID: `17`. Package: `power-chords-codebase-navigation-and-explanation`.

### Understand-Anything

Before:

> Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built.

After:

> Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built. When comparing code graphs, distinguish same-named functions by their owning container and check overload signatures against the matching owner before calling a function new, changed or removed.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Debugging & QA Sentinel

Stable ID: `19`. Package: `power-chords-debugging-testing-and-qa`.

### compound-engineering-plugin

Before:

> compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
> compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.

After:

> compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.

### impeccable

Before:

> impeccable: Use scoped critique, accessibility and design-check guidance without treating its output as a verified fix. Do not install hooks, download its engine or invoke live-copy fallback without separate review. Preserve Codex approvals and isolation.
> impeccable: Scope a design critique or deterministic interface check to a named surface and verify proposed changes in the rendered result. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approval and isolation.

After:

> impeccable: Scope critique, accessibility and deterministic design checks to a named surface, and verify proposed changes in the rendered result. Guidance is not proof of a fix. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approvals and isolation.

### gstack

Before:

> gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested.

After:

> gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested. Before validation, record the reviewed revision and identify local edits that could change the result. Preserve failed and flaky attempts alongside successful retries rather than reporting only the final pass.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Release Readiness Runway

Stable ID: `20`. Package: `power-chords-deployment-and-release-readiness`.

### gstack

Before:

> gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested.

After:

> gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested. Before validation, record the reviewed revision and identify local edits that could change the result. Preserve failed and flaky attempts alongside successful retries rather than reporting only the final pass.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## UX Wireframing Canvas

Stable ID: `21`. Package: `power-chords-wireframing-and-ux-exploration`.

### reelkit

Before:

> reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
> reelkit: Count core, framework binding and overlay requirements separately before selecting an external UI interaction component. Check keyboard, touch, accessibility and responsive behavior in the rendered target rather than assuming framework parity.

After:

> reelkit: Touch-first slider reference. Check core, framework binding and overlay requirements separately. Test keyboard, touch, accessibility, input behavior and responsive states in the rendered target rather than assuming framework parity.

### agent-skills

Before:

No source-specific guidance note.

After:

> agent-skills: Use the project’s own verification tools for interface work. Pair automated accessibility findings with keyboard, focus, reduced-motion and screen-reader checks, and do not report conformance from an automated scan alone.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Interactive Prototyping Playground

Stable ID: `22`. Package: `power-chords-interactive-prototype-construction`.

### reelkit

Before:

> reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
> reelkit: Count core, framework binding and overlay requirements separately before selecting an external UI interaction component. Check keyboard, touch, accessibility and responsive behavior in the rendered target rather than assuming framework parity.

After:

> reelkit: Touch-first slider reference. Check core, framework binding and overlay requirements separately. Test keyboard, touch, accessibility, input behavior and responsive states in the rendered target rather than assuming framework parity.

### hyperframes

Before:

> hyperframes: HTML-to-video rendering adapter candidate; rendering and external tools remain separate dependencies.
> hyperframes: Use the documented core skill set or an explicitly selected optional renderer integration. Check late assets, browser requirements and export results. Never install all optional skills or change telemetry merely because an upstream setup recipe suggests it.

After:

> hyperframes: HTML-to-video rendering reference. Rendering and external tools remain separate dependencies. Use the documented core skill set or an explicitly selected optional renderer integration, and check late assets, browser requirements and export results. Never install all optional skills or change telemetry merely because a source setup recipe suggests it.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Technical Illustration Sculpt

Stable ID: `24`. Package: `power-chords-technical-illustrations-and-cad-assets`.

### lemo-opuscar

Before:

> lemo-opuscar: Code-rendered film style references; rendering toolchain must be installed and validated separately.
> lemo-opuscar: Check the component-specific notice in LICENSE and LICENSES before reusing code, film styles or media. The API reports NOASSERTION for this source, so the earlier MIT catalog label is not a blanket grant. Keep style references separate from a verified rendered film.

After:

> lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The catalog reports NOASSERTION, so the earlier MIT label is not a blanket grant. Install and validate a selected rendering toolchain separately, and distinguish style references from a verified rendered film. Review documentation, code and film permissions separately. Third-party narration, characters and marks remain outside the source’s grant even when included in a complete film.

### text-to-cad

Before:

> text-to-cad: Match the requested CAD output format to the actual modeling and export toolchain. Distinguish an illustration, a generated model and manufacturing validation. Printing, CNC or sheet-metal service connections require separate approval.

After:

> text-to-cad: Match the requested CAD output format to the actual modeling and export toolchain. Distinguish an illustration, a generated model and manufacturing validation. Printing, CNC or sheet-metal service connections require separate approval. Review the selected installer’s update and plugin behavior before use. A modeling request does not authorize automatic updates or additional plugins. Inspect the actual exported model and manufacturing checks separately from the viewer.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Agent Coordination Ensemble

Stable ID: `25`. Package: `power-chords-multi-agent-task-decomposition`.

### compound-engineering-plugin

Before:

> compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
> compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.

After:

> compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.

### superplane

Before:

> superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
> superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

After:

> superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Task Orchestration Tempo

Stable ID: `26`. Package: `power-chords-task-and-routine-orchestration`.

### superplane

Before:

> superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
> superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

After:

> superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.

### hermes-life-os

Before:

> hermes-life-os: Separate captured inbox items, projects, waiting-for commitments and review steps. Validate current tool schemas before using an external personal workspace. Financial and calendar operations retain their own access and approval boundaries.

After:

> hermes-life-os: Separate captured inbox items, projects, waiting-for commitments and review steps. Validate current tool schemas before using an external personal workspace. Financial and calendar operations retain their own access and approval boundaries. Separate estimated task time from logged actual time when discussing capacity. State the planning window, available time and missing estimates, and treat personal before/after experiments as observations rather than causal proof. External time budgets and alerts need separate configuration approval.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Browser Automation Pilot

Stable ID: `27`. Package: `power-chords-browser-and-api-task-automation`.

### sill

Before:

> sill: Remote desktop reference; screen capture/input permissions and device access require explicit approval.
> sill: Review local screen-capture and input permissions, selected display/window scope and current platform support before a remote-desktop connection. Do not enable remote access from source documentation alone.

After:

> sill: Review platform support, selected display/window scope and local screen-capture, input and device-access permissions before a remote-desktop connection. Obtain explicit approval before enabling remote access. Source documentation alone does not provide authorization.

### api-anything

Before:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup.

After:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup. Honor rate limits and Retry-After rather than switching to a browser to evade throttling. Review proxy routing separately. An export scan may warn without blocking, so inspect credential-like fields before sharing a specification and never print their values.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Workflow Chaining Relay

Stable ID: `28`. Package: `power-chords-composable-tool-and-workflow-chains`.

### compound-engineering-plugin

Before:

> compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
> compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.

After:

> compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.

### superplane

Before:

> superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
> superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

After:

> superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Permission Controls Vault

Stable ID: `29`. Package: `power-chords-permission-scoped-execution-and-controls`.

### api-anything

Before:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup.

After:

> api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup. Honor rate limits and Retry-After rather than switching to a browser to evade throttling. Review proxy routing separately. An export scan may warn without blocking, so inspect credential-like fields before sharing a specification and never print their values.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Funnel Diagnostics Pulse

Stable ID: `32`. Package: `power-chords-funnel-retention-and-operational-diagnostics`.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Resource Planning Cadence

Stable ID: `38`. Package: `power-chords-time-and-resource-planning`.

### hermes-life-os

Before:

> hermes-life-os: Separate captured inbox items, projects, waiting-for commitments and review steps. Validate current tool schemas before using an external personal workspace. Financial and calendar operations retain their own access and approval boundaries.

After:

> hermes-life-os: Separate captured inbox items, projects, waiting-for commitments and review steps. Validate current tool schemas before using an external personal workspace. Financial and calendar operations retain their own access and approval boundaries. Separate estimated task time from logged actual time when discussing capacity. State the planning window, available time and missing estimates, and treat personal before/after experiments as observations rather than causal proof. External time budgets and alerts need separate configuration approval.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Speech Transcription Scribe

Stable ID: `39`. Package: `power-chords-speech-transcription-and-meeting-notes`.

### VoiceStudio

Before:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine.

After:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Voice Generation Chorus

Stable ID: `40`. Package: `power-chords-text-to-speech-and-voice-interfaces`.

### VoiceStudio

Before:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine.

After:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Audio Separation Studio

Stable ID: `41`. Package: `power-chords-audio-separation-and-editing`.

### VoiceStudio

Before:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine.

After:

> VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Video Creation Storyboard

Stable ID: `42`. Package: `power-chords-video-demos-and-educational-content`.

### lemo-opuscar

Before:

> lemo-opuscar: Code-rendered film style references; rendering toolchain must be installed and validated separately.
> lemo-opuscar: Check the component-specific notice in LICENSE and LICENSES before reusing code, film styles or media. The API reports NOASSERTION for this source, so the earlier MIT catalog label is not a blanket grant. Keep style references separate from a verified rendered film.

After:

> lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The catalog reports NOASSERTION, so the earlier MIT label is not a blanket grant. Install and validate a selected rendering toolchain separately, and distinguish style references from a verified rendered film. Review documentation, code and film permissions separately. Third-party narration, characters and marks remain outside the source’s grant even when included in a complete film.

### OpenMontage

Before:

> OpenMontage: Agentic production reference; AGPL license and external media toolchain require review.
> OpenMontage: The canonical source moved to OpenMontageInc/OpenMontage. Preserve earlier attribution and AGPL review, and inspect external media-service and asset permissions before any production workflow.

After:

> OpenMontage: The canonical production reference moved to OpenMontageInc/OpenMontage. Preserve earlier attribution and AGPL review. Review the external media toolchain and media-service and asset permissions before any production workflow.

### hyperframes

Before:

> hyperframes: HTML-to-video rendering adapter candidate; rendering and external tools remain separate dependencies.
> hyperframes: Use the documented core skill set or an explicitly selected optional renderer integration. Check late assets, browser requirements and export results. Never install all optional skills or change telemetry merely because an upstream setup recipe suggests it.

After:

> hyperframes: HTML-to-video rendering reference. Rendering and external tools remain separate dependencies. Use the documented core skill set or an explicitly selected optional renderer integration, and check late assets, browser requirements and export results. Never install all optional skills or change telemetry merely because a source setup recipe suggests it.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## SEO Research Radar

Stable ID: `43`. Package: `power-chords-seo-and-discoverability-research`.

### claude-seo

Before:

> claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled.

After:

> claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled. Keep an explicitly authorized local audit target separate from untrusted cross-origin links. Recheck proxy and redirect destinations, and do not treat a trusted proxy as permission to fetch private targets.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Launch Planning Launchpad

Stable ID: `44`. Package: `power-chords-launch-and-channel-planning`.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Campaign Content Amplifier

Stable ID: `45`. Package: `power-chords-campaigns-and-content-production`.

### lemo-opuscar

Before:

> lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The source is recorded as NOASSERTION, so the earlier MIT catalog label is not a blanket grant. Install and validate the rendering toolchain separately, and distinguish style references from a verified rendered film.

After:

> lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The source is recorded as NOASSERTION, so the earlier MIT catalog label is not a blanket grant. Install and validate the rendering toolchain separately, and distinguish style references from a verified rendered film. Review documentation, code and film permissions separately. Third-party narration, characters and marks remain outside the source’s grant even when included in a complete film.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Growth Experiments Momentum

Stable ID: `46`. Package: `power-chords-conversion-and-growth-experimentation`.

### claude-seo

Before:

> claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled.

After:

> claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled. Keep an explicitly authorized local audit target separate from untrusted cross-origin links. Recheck proxy and redirect destinations, and do not treat a trusted proxy as permission to fetch private targets.

### marketingskills

Before:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.

After:

> marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Career Research Scout

Stable ID: `47`. Package: `power-chords-career-and-opportunity-research`.

### ai-job-search

Before:

> ai-job-search: Keep CVs, trackers and application drafts in a private workspace. Review the current host-specific search adapters and supported sources before use. Do not create or push a repository or submit an application merely because upstream setup documentation suggests it.

After:

> ai-job-search: Keep CVs, trackers and application drafts in a private workspace. Review the current host-specific search adapters and supported sources before use. Do not create or push a repository or submit an application merely because upstream setup documentation suggests it. The current source moves job-board search packs to community-portals. Check which portal, if any, is actually present before promising coverage. Review any separately selected pack and installer before use, and reject empty or hidden-only posting text as evidence.

### career-ops

Before:

> career-ops: Preserve story provenance and mark unsupported experience or impact figures as unknown. Review host/provider setup, scan limits, private-copy storage and outbound proxy configuration before external research. Applications and outreach still need explicit authorization.

After:

> career-ops: Preserve story provenance and mark unsupported experience or impact figures as unknown. Review host/provider setup, scan limits, private-copy storage and outbound proxy configuration before external research. Applications and outreach still need explicit authorization. A provider privacy guard does not cover files read directly by the host agent. Keep original personal data, token mappings and restoration material private, and review any workspace-tokenization operation before changing source documents. Do not adopt headless worker recipes that remove required approval controls.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Interview Preparation Rehearsal

Stable ID: `48`. Package: `power-chords-interview-preparation-and-learning-plans`.

### career-ops

Before:

> career-ops: Preserve story provenance and mark unsupported experience or impact figures as unknown. Review host/provider setup, scan limits, private-copy storage and outbound proxy configuration before external research. Applications and outreach still need explicit authorization.

After:

> career-ops: Preserve story provenance and mark unsupported experience or impact figures as unknown. Review host/provider setup, scan limits, private-copy storage and outbound proxy configuration before external research. Applications and outreach still need explicit authorization. A provider privacy guard does not cover files read directly by the host agent. Keep original personal data, token mappings and restoration material private, and review any workspace-tokenization operation before changing source documents. Do not adopt headless worker recipes that remove required approval controls.

### ai-job-search

Before:

> ai-job-search: Keep CVs, trackers and application drafts in a private workspace. Review the current host-specific search adapters and supported sources before use. Do not create or push a repository or submit an application merely because upstream setup documentation suggests it.

After:

> ai-job-search: Keep CVs, trackers and application drafts in a private workspace. Review the current host-specific search adapters and supported sources before use. Do not create or push a repository or submit an application merely because upstream setup documentation suggests it. The current source moves job-board search packs to community-portals. Check which portal, if any, is actually present before promising coverage. Review any separately selected pack and installer before use, and reject empty or hidden-only posting text as evidence.

### book-to-skill

Before:

No source-specific guidance note.

After:

> book-to-skill: Preserve page evidence and paragraph boundaries inside table cells, and check for stale extraction output or missing chapters before using a document. Remote search/read needs a separately authorized provider and permission to access the selected edition. Do not configure a provider or publish a generated skill from a conversion request alone.

Retained: the skill’s stable input/output contract, workflow and all distinct authorization, attribution, licensing, compatibility, verification and execution-limit requirements.

## Reviewed without operating-guidance changes

Customer Discovery Compass, Market Research Atlas, Competitive Research Prism, Sales Research Beacon, Evidence Mapping Mosaic, OCR Extraction Lens, Semantic Search Pathfinder, PRD Blueprint, Journey Mapping Trail, Product Roadmap Horizon, Prioritization Summit, System Architecture Keystone, Architecture Diagrams Schematic, SQL Analysis Quarry, Dashboard Reporting Panorama, Agent Evaluation Benchmark, Forecast Modeling Outlook, Billing Workflows Ledger, Unit Economics Balance, Operations Planning Cockpit, Location Research Waypoint, Road Networks Gridline, Geospatial Visualization Terra, Field Insights Meridian.

ReverseReel and No AI Slop were also reviewed without instruction or runtime changes.
