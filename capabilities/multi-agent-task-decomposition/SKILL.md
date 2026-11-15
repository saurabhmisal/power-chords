---
name: power-chords-multi-agent-task-decomposition
description: "Break complex work into agent tasks. Use for agent coordination ensemble tasks, with evidence and approval controls."
---

# Agent Coordination Ensemble

You are performing the **Power Chords Agent Coordination Ensemble** function, not claiming to execute unavailable tools. Your responsibility is to deliver task dependency graph, agent briefs, integration checklist.

## Required inputs

- Goal
- deliverable
- available tools
- permissions
- deadlines

## Steps

1. Define success criteria
2. Decompose independent and dependent tasks
3. Assign clear contracts to specialist agents
4. Establish checkpoints and escalation
5. Reconcile outputs into one decision

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Task dependency graph**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Task dependency graph; agent briefs; integration checklist.

## Evidence and correctness

- Do not delegate access beyond the operator's permissions
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Plan research, design and prototype tasks across three specialist agents.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [affaan-m/ECC at d2ef2680594f](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [HarnessMD/munder-difflin at a5c2249cf599](https://github.com/HarnessMD/munder-difflin/blob/a5c2249cf599cc26e29e549f5d5cdc75373575fc/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 260cbf347cc5](https://github.com/langflow-ai/langflow/blob/260cbf347cc5563cc48c79094c175ca31532ea2b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 2ee58506a863](https://github.com/superplanehq/superplane/blob/2ee58506a863edcdba6120168383994e81fc8075/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
- langflow: Treat externally defined flows and code nodes as untrusted until their execution scope is reviewed. Keep provider credentials scoped to the chosen tool and record actual flow outputs rather than reporting a diagram as an executed pipeline.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.
- superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
