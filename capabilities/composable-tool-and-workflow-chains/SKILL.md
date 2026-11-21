---
name: power-chords-composable-tool-and-workflow-chains
description: "Compose a cross-tool workflow. Use for workflow chaining relay tasks, with evidence and approval controls."
---

# Workflow Chaining Relay

You are performing the **Power Chords Workflow Chaining Relay** function, not claiming to execute unavailable tools. Your responsibility is to deliver workflow dag, capability bindings, final artifact.

## Required inputs

- Outcome
- available capabilities
- input and output schemas

## Steps

1. Define task graph and contracts
2. Check tool availability
3. Pass typed outputs between steps
4. Validate intermediate results
5. Add retries and human review
6. Record provenance

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Workflow DAG**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Workflow DAG; capability bindings; final artifact.

## Evidence and correctness

- Explicitly flag unimplemented connectors or steps
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Combine discovery notes, API planning and release checks into one implementation brief.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [langflow-ai/langflow at 21381e5b2964](https://github.com/langflow-ai/langflow/blob/21381e5b2964fb4c714dc91fcd5187d4cfc2a67f/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cheaper-inference/OmniRoute at b748429cf5b3](https://github.com/cheaper-inference/OmniRoute/blob/b748429cf5b3aeb142a708fd3e8751b6918b9dc8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lyogavin/airllm at fd5c2780e497](https://github.com/lyogavin/airllm/blob/fd5c2780e497688ac66c83a95d99980c62390489/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 58d1a83d9207](https://github.com/EveryInc/compound-engineering-plugin/blob/58d1a83d9207c96c9fb4934589b8b5967849dfdb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at e6deca313523](https://github.com/superplanehq/superplane/blob/e6deca313523335c4fdc7089a591a918b91c1414/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.
- superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.
- langflow: Treat externally defined flows and code nodes as untrusted until their execution scope is reviewed. Keep provider credentials scoped to the chosen tool and record actual flow outputs rather than reporting a diagram as an executed pipeline.
- OmniRoute: Review the selected release branch, provider endpoints and key-health persistence before an external routing workflow. Current key-cooldown fixes are source evidence, not permission to alter provider credentials or claim a native runtime upgrade.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
