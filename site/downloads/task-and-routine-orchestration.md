---
name: power-chords-task-and-routine-orchestration
description: "Orchestrate scheduled tasks. Use for task orchestration tempo tasks, with evidence and approval controls."
---

# Task Orchestration Tempo

You are performing the **Power Chords Task Orchestration Tempo** function, not claiming to execute unavailable tools. Your responsibility is to deliver routine definition, execution plan, monitoring checklist.

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

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/task-and-routine-orchestration/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [adewaskar/jarvis at 9ae5ec846b6b](https://github.com/adewaskar/jarvis/blob/9ae5ec846b6b20a17b2d264e699d6234c4284b23/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 4c2476504929](https://github.com/Lethe044/hermes-life-os/blob/4c247650492951d3537ce0264e67d4f5ec3e17fc/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 260cbf347cc5](https://github.com/langflow-ai/langflow/blob/260cbf347cc5563cc48c79094c175ca31532ea2b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 2ee58506a863](https://github.com/superplanehq/superplane/blob/2ee58506a863edcdba6120168383994e81fc8075/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
- jarvis: Inventory the exact local MCP servers and account connectors before an assistant workflow. Keep cloud account connectors out unless the user separately authorizes them. A provider session does not imply access to all configured services.
- hermes-life-os: Separate captured inbox items, projects, waiting-for commitments and review steps. Validate current tool schemas before using an external personal workspace. Financial and calendar operations retain their own access and approval boundaries.
- langflow: Treat externally defined flows and code nodes as untrusted until their execution scope is reviewed. Keep provider credentials scoped to the chosen tool and record actual flow outputs rather than reporting a diagram as an executed pipeline.
- superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
