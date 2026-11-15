# App Prototyping Foundry

> **Power Chords 16** · Engineering & Integration · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Prototype an application. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Prototype an application. Use it to produce: prototype source; run instructions; known limitations.

## Before you start

Provide the following information or explicitly mark it unknown:

- Problem statement
- users
- preferred stack
- feature scope

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install rapid-application-prototyping --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-rapid-application-prototyping` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **App Prototyping Foundry** skill. Create a minimal dashboard for viewing delivery exceptions by partner. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Constrain the smallest useful slice
2. Draft UI and data entities
3. Generate runnable scaffolding when coding tools are available
4. Implement representative happy and error paths
5. Explain setup, test and missing integrations

## Expected deliverables

- Prototype source
- run instructions
- known limitations

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not call mock data a production backend
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **App Prototyping Foundry**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![App Prototyping Foundry illustrative workflow](../../assets/capability-demos/rapid-application-prototyping.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/rapid-application-prototyping/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Constrain the smallest useful slice"]
  step1["Draft UI and data entities"]
  step2["Generate runnable scaffolding when coding tools are available"]
  step3["Implement representative happy and error paths"]
  step4["Explain setup, test and missing integrations"]
  review["Review evidence and validate deliverables"]
  approval{"External action approved?"}
  finish["Deliver or publish approved result"]
  input --> step0
  step0 --> step1
  step1 --> step2
  step2 --> step3
  step3 --> step4
  step4 --> review
  review --> approval
  approval -- Yes --> finish
  approval -- Revise --> step0
```

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [addyosmani/agent-skills at 301b02b12bff](https://github.com/addyosmani/agent-skills/blob/301b02b12bff98e4688e6984af6556802322bbde/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [KonstantinKai/reelkit at 27fb5d7bea69](https://github.com/KonstantinKai/reelkit/blob/27fb5d7bea69d63bc5fa572c7f5a0f26127d7be7/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [meta/astryx at 7b3154197a9a](https://github.com/meta/astryx/blob/7b3154197a9a9fca33d4aab859a6b35989d0e9cc/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [pbakaus/impeccable at acb4cfe14470](https://github.com/pbakaus/impeccable/blob/acb4cfe14470b1fdf51e855431af618d936b7db8/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- astryx: Check React 19 support and use the scoped @astryxdesign/cli when a React implementation is requested. Verify component documentation, theming, keyboard interaction and template output. The native isolated HTML preview does not install React or Astryx.
- impeccable: Use scoped critique, accessibility and design-check guidance without treating its output as a verified fix. Do not install hooks, download its engine or invoke live-copy fallback without separate review. Preserve Codex approvals and isolation.
- reelkit: Count core, framework binding and overlay requirements separately before selecting an external UI interaction component. Check keyboard, touch, accessibility and responsive behavior in the rendered target rather than assuming framework parity.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.
- astryx: For a requested React interface, check React 19 compatibility and the scoped @astryxdesign/cli package before using component or template guidance. Verify theming, keyboard interaction and rendered states. The isolated HTML preview does not install this library.
- impeccable: Scope a design critique or deterministic interface check to a named surface and verify proposed changes in the rendered result. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approval and isolation.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
