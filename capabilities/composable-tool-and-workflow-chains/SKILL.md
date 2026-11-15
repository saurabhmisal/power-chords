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

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [langflow-ai/langflow at 260cbf347cc5](https://github.com/langflow-ai/langflow/blob/260cbf347cc5563cc48c79094c175ca31532ea2b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cheaper-inference/OmniRoute at e92f3801b379](https://github.com/cheaper-inference/OmniRoute/blob/e92f3801b37906cc8846c92146efa4377198f2a6/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lyogavin/airllm at d7a4fea22ec1](https://github.com/lyogavin/airllm/blob/d7a4fea22ec1738bbc624c3aab822f5b4a27ac25/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 2ee58506a863](https://github.com/superplanehq/superplane/blob/2ee58506a863edcdba6120168383994e81fc8075/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.
- langflow: Treat externally defined flows and code nodes as untrusted until their execution scope is reviewed. Keep provider credentials scoped to the chosen tool and record actual flow outputs rather than reporting a diagram as an executed pipeline.
- OmniRoute: Review the selected release branch, provider endpoints and key-health persistence before an external routing workflow. Current key-cooldown fixes are source evidence, not permission to alter provider credentials or claim a native runtime upgrade.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.
- superplane: Review repository/workspace boundaries, provider configuration and failed-connection recovery before external orchestration. A retry or newly available component is not approval for a production write.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
