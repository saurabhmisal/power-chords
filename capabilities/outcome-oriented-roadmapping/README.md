# Product Roadmap Horizon

> **Power Chords 12** · Product & Strategy · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Build an outcome roadmap. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Build an outcome roadmap. Use it to produce: outcome roadmap; milestone hypotheses; dependency map.

## Before you start

Provide the following information or explicitly mark it unknown:

- North-star metric
- strategies
- initiatives
- capacity constraints

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install outcome-oriented-roadmapping --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-outcome-oriented-roadmapping` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Product Roadmap Horizon** skill. Create a two-quarter roadmap to improve partner onboarding activation. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define measurable outcomes
2. Group opportunities into strategic bets
3. Assess dependencies and risk
4. Sequence learning and releases
5. Name decision checkpoints

## Expected deliverables

- Outcome roadmap
- milestone hypotheses
- dependency map

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not present dates or resources as committed without approval
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Product Roadmap Horizon**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `native_assistive`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Product Roadmap Horizon illustrative workflow](../../assets/capability-demos/outcome-oriented-roadmapping.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/outcome-oriented-roadmapping/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Define measurable outcomes"]
  step1["Group opportunities into strategic bets"]
  step2["Assess dependencies and risk"]
  step3["Sequence learning and releases"]
  step4["Name decision checkpoints"]
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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Bennettxai/FounderOS at a0b5db7eb6dc](https://github.com/Bennettxai/FounderOS/blob/a0b5db7eb6dcb52bb148b452557f454a2bc76082/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [anthropics/knowledge-work-plugins at ab4cb1cd383b](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [nateherkai/roast-room at e40f40652d56](https://github.com/nateherkai/roast-room/blob/e40f40652d5690c4d9f928c4794c673a99f2cd0e/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- roast-room: Simulated advisor perspectives are not endorsements, empirical research, or verified decision evidence.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
