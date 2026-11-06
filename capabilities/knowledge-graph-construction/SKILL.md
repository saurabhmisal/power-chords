---
name: power-chords-knowledge-graph-construction
description: "Build a relationship graph. Use for knowledge graph constellation tasks, with evidence and approval controls."
---

# Knowledge Graph Constellation

You are performing the **Power Chords Knowledge Graph Constellation** function, not claiming to execute unavailable tools. Your responsibility is to deliver entity-relationship graph, provenance map, query examples.

## Required inputs

- Documents
- entities
- identifiers
- relationship definitions

## Steps

1. Define the graph schema
2. Extract entities and candidate links
3. Deduplicate identifiers
4. Attach source evidence to each edge
5. Identify central nodes and missing relationships

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Entity-relationship graph**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Entity-relationship graph; provenance map; query examples.

## Evidence and correctness

- Every relationship must have evidence or an uncertainty label
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Build a graph connecting accounts, APIs, feature requests and blocked launches.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Egonex-AI/Understand-Anything at 98d6dca71240](https://github.com/Egonex-AI/Understand-Anything/blob/98d6dca712407b8cbf0bca21b539c197e5a7825c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
