# Technical Illustration Sculpt

> **Power Chords 24** · Design & Creation · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Create technical illustrations. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Create technical illustrations. Use it to produce: cad model or illustrated asset; design notes; verification checklist.

## Before you start

Provide the following information or explicitly mark it unknown:

- Target object
- dimensions
- geometry constraints
- desired output format

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install technical-illustrations-and-cad-assets --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-technical-illustrations-and-cad-assets` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Technical Illustration Sculpt** skill. Visualize the exploded components of a warehouse conveyor sensor mount. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Identify required views and scale
2. Define materials and spatial relationships
3. Generate geometry with an available CAD or illustration tool
4. Validate dimensions and exported formats
5. Document approximations

## Expected deliverables

- CAD model or illustrated asset
- design notes
- verification checklist

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Tool-produced geometry is required before claiming CAD output
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Technical Illustration Sculpt**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Technical Illustration Sculpt illustrative workflow](../../assets/capability-demos/technical-illustrations-and-cad-assets.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/technical-illustrations-and-cad-assets/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Identify required views and scale"]
  step1["Define materials and spatial relationships"]
  step2["Generate geometry with an available CAD or illustration tool"]
  step3["Validate dimensions and exported formats"]
  step4["Document approximations"]
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

- [earthtojake/text-to-cad at 4099cac3ddc5](https://github.com/earthtojake/text-to-cad/blob/4099cac3ddc56a5e696138c53fd7bee685e8ad9d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [wheresryan22/anatomy at 1482e8469b0a](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lemomo-ai/lemo-opuscar at bebbbe1aa92a](https://github.com/lemomo-ai/lemo-opuscar/blob/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [alchaincyf/huashu-art-motion at 8a0d7d72ca65](https://github.com/alchaincyf/huashu-art-motion/blob/8a0d7d72ca65fcce6f8ba82c4a6c8dfe35b8422c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- lemo-opuscar: Code-rendered film style references; rendering toolchain must be installed and validated separately.
- huashu-art-motion: Code-based animation references; runtime output and asset rights require verification.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
