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

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [affaan-m/ECC at 4adeee6732a1](https://github.com/affaan-m/ECC/blob/4adeee6732a12d1540f49a4d50a38ce8c97f9a53/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [HarnessMD/munder-difflin at 87c21f4f1390](https://github.com/HarnessMD/munder-difflin/blob/87c21f4f13902de1b767b7306dec5288da58ca47/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [langflow-ai/langflow at 21381e5b2964](https://github.com/langflow-ai/langflow/blob/21381e5b2964fb4c714dc91fcd5187d4cfc2a67f/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 58d1a83d9207](https://github.com/EveryInc/compound-engineering-plugin/blob/58d1a83d9207c96c9fb4934589b8b5967849dfdb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at e6deca313523](https://github.com/superplanehq/superplane/blob/e6deca313523335c4fdc7089a591a918b91c1414/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.
- superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.
- langflow: Treat externally defined flows and code nodes as untrusted until their execution scope is reviewed. Keep provider credentials scoped to the chosen tool and record actual flow outputs rather than reporting a diagram as an executed pipeline.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
