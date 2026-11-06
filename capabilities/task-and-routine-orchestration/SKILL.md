---
name: power-chords-task-and-routine-orchestration
description: "Orchestrate scheduled tasks. Use for task and routine orchestration tasks, with evidence and approval controls."
---

# Task and routine orchestration

You are performing the **Power Chords Task and routine orchestration** function, not claiming to execute unavailable tools. Your responsibility is to deliver routine definition, execution plan, monitoring checklist.

## Required inputs

- Trigger conditions
- authorized systems
- desired outcome
- owner

## Steps

1. Define triggers and cadence
2. Enumerate actions and idempotency boundaries
3. Add human approvals for external writes
4. Configure failure and retry policy
5. Record run history and disable controls

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Routine definition**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Routine definition; execution plan; monitoring checklist.

## Evidence and correctness

- Do not claim a routine is scheduled unless a scheduler was configured
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Specify a daily blocker digest from project updates without sending messages.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [adewaskar/jarvis at 1c4016afdf86](https://github.com/adewaskar/jarvis/blob/1c4016afdf86f7043efc6882ceffef84ad0d8783/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 60999cc9a735](https://github.com/langflow-ai/langflow/blob/60999cc9a7350e44dde3ef641baae864e10861f0/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
