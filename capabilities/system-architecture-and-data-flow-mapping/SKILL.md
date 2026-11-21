---
name: power-chords-system-architecture-and-data-flow-mapping
description: "Design system architecture. Use for system architecture keystone tasks, with evidence and approval controls."
---

# System Architecture Keystone

You are performing the **Power Chords System Architecture Keystone** function, not claiming to execute unavailable tools. Your responsibility is to deliver architecture decision record, data-flow diagram, interface map.

## Required inputs

- Requirements
- throughput expectations
- constraints
- existing systems

## Steps

1. Clarify functional and nonfunctional needs
2. Define components and data boundaries
3. Model synchronous and async flows
4. Identify failure modes and observability
5. Explain tradeoffs and open questions

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Architecture decision record**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Architecture decision record; data-flow diagram; interface map.

## Evidence and correctness

- Distinguish proposed architecture from a verified deployed system
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Design a multi-tenant event ingestion system with replay safety.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [tt-a1i/archify at 8509a3d63e76](https://github.com/tt-a1i/archify/blob/8509a3d63e763b4d454ea9aafa1f939545fcb1ea/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Graphify-Labs/graphify at b582ad401aae](https://github.com/Graphify-Labs/graphify/blob/b582ad401aaef4378935ec6620e3b165ae8e03c1/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- archify: Check host-specific integration support and exact workspace paths before mapping architecture. The current source declares Apache-2.0 rather than the earlier MIT catalog value. Do not copy promotional API or pricing claims into a recommendation.
- graphify: Separate local graph extraction from the external cloud product, its connectors and advertised savings or verification claims. Track source coverage and inferred edges, and require actual evidence before describing a relationship or correctness check as verified.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
