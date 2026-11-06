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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [langflow-ai/langflow at 60999cc9a735](https://github.com/langflow-ai/langflow/blob/60999cc9a7350e44dde3ef641baae864e10861f0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cheaper-inference/OmniRoute at aef364319c6a](https://github.com/cheaper-inference/OmniRoute/blob/aef364319c6ad29ec3b143fa5e672a0ad4fe731e/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lyogavin/airllm at 0f824d93bff5](https://github.com/lyogavin/airllm/blob/0f824d93bff5df03b80a58563ba24f09f67b409d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 37c6198b757b](https://github.com/superplanehq/superplane/blob/37c6198b757bb09bc00b1955da4ae1f238a06e39/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
