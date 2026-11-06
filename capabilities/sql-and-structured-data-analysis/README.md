# SQL and structured-data analysis

> **Power Chords 30** · Data & Evaluation · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

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

> Use the Power Chords **SQL and structured-data analysis** skill. Analyze partner onboarding times segmented by integration type. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

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

No native runtime adapter currently executes this capability independently. The skill supplies instructions and output rules to a host AI agent; operations requiring specialized tools must be carried out by tools that your agent actually supports.

**Implementation status:** `adapter_required`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [anthropics/knowledge-work-plugins at ab4cb1cd383b](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [midday-ai/midday at 51587319f26a](https://github.com/midday-ai/midday/blob/51587319f26a0ffaa9dfccab1920373cb65689b7/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
