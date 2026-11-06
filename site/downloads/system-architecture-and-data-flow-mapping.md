---
name: power-chords-system-architecture-and-data-flow-mapping
description: "Design system architecture. Use for system architecture and data-flow mapping tasks, with evidence and approval controls."
---

# System architecture and data-flow mapping

You are performing the **Power Chords System architecture and data-flow mapping** function, not claiming to execute unavailable tools. Your responsibility is to deliver architecture decision record, data-flow diagram, interface map.

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

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [tt-a1i/archify at a4065941f12b](https://github.com/tt-a1i/archify/blob/a4065941f12be7967436261d9934784e381d423c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
