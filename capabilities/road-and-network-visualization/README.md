# Road Networks Gridline

> **Power Chords 50** · Spatial & Field Intelligence · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Understand transport networks. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Understand transport networks. Use it to produce: network visualization plan; topology analysis; risk map.

## Before you start

Provide the following information or explicitly mark it unknown:

- Road network data
- target region
- vehicle constraints

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install road-and-network-visualization --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-road-and-network-visualization` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Road Networks Gridline** skill. Study access-road coverage around a proposed distribution center. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define network nodes and edges
2. Validate topology and data freshness
3. Identify chokepoints and coverage gaps
4. Compare routing or accessibility scenarios
5. Produce a readable network summary

## Expected deliverables

- Network visualization plan
- topology analysis
- risk map

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Network outputs require actual geodata to be called measured
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Road Networks Gridline**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Road Networks Gridline illustrative workflow](../../assets/capability-demos/road-and-network-visualization.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/road-and-network-visualization/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Define network nodes and edges"]
  step1["Validate topology and data freshness"]
  step2["Identify chokepoints and coverage gaps"]
  step3["Compare routing or accessibility scenarios"]
  step4["Produce a readable network summary"]
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

- [anvaka/city-roads at 35d6497db70d](https://github.com/anvaka/city-roads/blob/35d6497db70debf4508b4d75f17d80c4367d66a6/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [wheresryan22/anatomy at 1482e8469b0a](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
