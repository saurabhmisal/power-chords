# SQL Analysis Quarry

> **Power Chords 30** · Data & Evaluation · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Analyze structured datasets. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Analyze structured datasets. Use it to produce: sql queries; analytic memo; reproducible tables.

## Before you start

Provide the following information or explicitly mark it unknown:

- Schema
- CSV or SQL source
- business questions
- metric definitions

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install sql-and-structured-data-analysis --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-sql-and-structured-data-analysis` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **SQL Analysis Quarry** skill. Analyze partner onboarding times segmented by integration type. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Validate schema and data access
2. Profile nulls and duplicates
3. Define trustworthy aggregates
4. Run queries when SQL tools are available
5. Analyze segments and uncertainty

## Expected deliverables

- SQL queries
- analytic memo
- reproducible tables

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Never invent query results without executing against data
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **SQL Analysis Quarry**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![SQL Analysis Quarry illustrative workflow](../../assets/capability-demos/sql-and-structured-data-analysis.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/sql-and-structured-data-analysis/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Validate schema and data access"]
  step1["Profile nulls and duplicates"]
  step2["Define trustworthy aggregates"]
  step3["Run queries when SQL tools are available"]
  step4["Analyze segments and uncertainty"]
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

- [anthropics/knowledge-work-plugins at ab4cb1cd383b](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [midday-ai/midday at 51587319f26a](https://github.com/midday-ai/midday/blob/51587319f26a0ffaa9dfccab1920373cb65689b7/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [umami-software/umami at 559e3c607c23](https://github.com/umami-software/umami/blob/559e3c607c23d2c72d9bd4f6481bda428255323c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- umami: Analytics adapter candidate; collect events only after reviewing consent, retention, and deployment configuration.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
