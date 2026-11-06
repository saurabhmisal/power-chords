# Launch and channel planning

> **Power Chords 44** · Marketing & Go-to-Market · **Native assistive** — used by the first-party Workroom as part of supported structured workflows; not a full standalone engine.

Plan a measurable product launch. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Plan a measurable product launch. Use it to produce: launch plan; messaging matrix; go/no-go checklist.

## Before you start

Provide the following information or explicitly mark it unknown:

- Target segment
- product promise
- launch constraints
- channels

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install launch-and-channel-planning --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-launch-and-channel-planning` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Launch and channel planning** skill. Plan a regional launch for a healthcare scheduling API. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define launch goals and offer
2. Map audiences and channels
3. Sequence rollout workstreams
4. Define go/no-go checklist and owner
5. Specify success and rollback metrics

## Expected deliverables

- Launch plan
- messaging matrix
- go/no-go checklist

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] No externally committed dates without owner sign-off
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

The local Workroom uses this capability within: Launch Readiness Plan. To try a complete workflow run `npm start` and choose the named workflow. This is *structured drafting*, not independent runtime execution of the full domain capability.

**Implementation status:** `native_assistive`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [coreyhaines31/marketingskills at 88c79f6528a9](https://github.com/coreyhaines31/marketingskills/blob/88c79f6528a9347420e57ceb1fff9a60de651768/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [mmccaff/PlacesToPostYourStartup at 1941a95f344d](https://github.com/mmccaff/PlacesToPostYourStartup/blob/1941a95f344d90ea5ffe2e0b4c25ffa92dfd3d73/README.md) — catalog license: CC0-1.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Review the marketing source migration from product-marketing-context to product-marketing and its .agents/product-marketing.md context location. Request authorized product, audience and positioning evidence before channel or conversion recommendations.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
