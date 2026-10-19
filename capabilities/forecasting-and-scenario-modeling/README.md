# Forecasting and scenario modeling

> **Power Chords 34/52** · Data & Evaluation · **Native assistive** — used by the first-party Workroom as part of supported structured workflows; not a full standalone engine.

Model uncertain futures. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Model uncertain futures. Use it to produce: scenario model; sensitivity table; assumptions log.

## Before you start

Provide the following information or explicitly mark it unknown:

- Baseline dataset
- assumptions
- unit economics
- time horizon

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install forecasting-and-scenario-modeling --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-forecasting-and-scenario-modeling` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Forecasting and scenario modeling** skill. Model expected onboarding revenue at three adoption rates. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define drivers and units
2. Build best-base-worst cases
3. Stress-test sensitive inputs
4. Estimate confidence ranges where justified
5. Identify decisions triggered by thresholds

## Expected deliverables

- Scenario model
- sensitivity table
- assumptions log

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Clearly label projections as scenarios, not forecasts guaranteed to occur
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

The local Workroom uses this capability within: Product Decision Brief. To try a complete workflow run `npm start` and choose the named workflow. This is *structured drafting*, not independent runtime execution of the full domain capability.

**Implementation status:** `native_assistive`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All 52 capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)
