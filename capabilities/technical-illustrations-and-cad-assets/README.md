# Technical illustrations and CAD assets

> **Power Chords 24/52** · Design & Creation · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

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

> Use the Power Chords **Technical illustrations and CAD assets** skill. Visualize the exploded components of a warehouse conveyor sensor mount. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

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

No native runtime adapter currently executes this capability independently. The skill supplies instructions and output rules to a host AI agent; operations requiring specialized tools must be carried out by tools that your agent actually supports.

**Implementation status:** `adapter_required`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All 52 capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)
