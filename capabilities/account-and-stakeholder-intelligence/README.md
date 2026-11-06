# Account and stakeholder intelligence

> **Power Chords 04** · Research & Discovery · **Native assistive** — used by the first-party Workroom as part of supported structured workflows; not a full standalone engine.

Build an account context map. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Build an account context map. Use it to produce: account brief; stakeholder map; open-items ledger.

## Before you start

Provide the following information or explicitly mark it unknown:

- Account notes
- stakeholder list
- CRM exports
- meeting transcripts

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install account-and-stakeholder-intelligence --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-account-and-stakeholder-intelligence` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Account and stakeholder intelligence** skill. Prepare a stakeholder map for a hospital CIO onboarding an analytics platform. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Identify the account's objectives and constraints
2. Map roles and decision influence
3. Summarize commitments with owners
4. Mark unanswered questions and access boundaries
5. Prepare targeted follow-up questions

## Expected deliverables

- Account brief
- stakeholder map
- open-items ledger

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Avoid speculating about private motives or personal attributes
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

The local Workroom uses this capability within: Customer Discovery → PRD. To try a complete workflow run `npm start` and choose the named workflow. This is *structured drafting*, not independent runtime execution of the full domain capability.

**Implementation status:** `native_assistive`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [anthropics/knowledge-work-plugins at ab4cb1cd383b](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [ethanplusai/harvey at 6b6a23a78909](https://github.com/ethanplusai/harvey/blob/6b6a23a789090e165802baef4104ee4618a3e169/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- harvey: Sales research and drafting reference; sending outreach or accessing mail requires explicit authorization.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
