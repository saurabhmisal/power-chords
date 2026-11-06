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

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/multi-agent-task-decomposition/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [affaan-m/ECC at b38be6a7f635](https://github.com/affaan-m/ECC/blob/b38be6a7f6350964d59328b52f0624e1d1d552d1/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [HarnessMD/munder-difflin at 8b3cebf06f0b](https://github.com/HarnessMD/munder-difflin/blob/8b3cebf06f0b0c084d5ab28d2949a2e6c07d0806/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 60999cc9a735](https://github.com/langflow-ai/langflow/blob/60999cc9a7350e44dde3ef641baae864e10861f0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 37c6198b757b](https://github.com/superplanehq/superplane/blob/37c6198b757bb09bc00b1955da4ae1f238a06e39/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
