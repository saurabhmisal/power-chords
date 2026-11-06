# Task Orchestration Tempo

> **Power Chords 26** · Agentic Automation · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Orchestrate scheduled tasks. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Orchestrate scheduled tasks. Use it to produce: routine definition; execution plan; monitoring checklist.

## Before you start

Provide the following information or explicitly mark it unknown:

- Trigger conditions
- authorized systems
- desired outcome
- owner

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install task-and-routine-orchestration --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-task-and-routine-orchestration` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Task Orchestration Tempo** skill. Specify a daily blocker digest from project updates without sending messages. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define triggers and cadence
2. Enumerate actions and idempotency boundaries
3. Add human approvals for external writes
4. Configure failure and retry policy
5. Record run history and disable controls

## Expected deliverables

- Routine definition
- execution plan
- monitoring checklist

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not claim a routine is scheduled unless a scheduler was configured
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Task Orchestration Tempo**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `native_assistive`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Task Orchestration Tempo illustrative workflow](../../assets/capability-demos/task-and-routine-orchestration.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/task-and-routine-orchestration/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Define triggers and cadence"]
  step1["Enumerate actions and idempotency boundaries"]
  step2["Add human approvals for external writes"]
  step3["Configure failure and retry policy"]
  step4["Record run history and disable controls"]
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

- [adewaskar/jarvis at 1c4016afdf86](https://github.com/adewaskar/jarvis/blob/1c4016afdf86f7043efc6882ceffef84ad0d8783/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 60999cc9a735](https://github.com/langflow-ai/langflow/blob/60999cc9a7350e44dde3ef641baae864e10861f0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 37c6198b757b](https://github.com/superplanehq/superplane/blob/37c6198b757bb09bc00b1955da4ae1f238a06e39/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
