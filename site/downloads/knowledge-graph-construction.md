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

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/knowledge-graph-construction/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 52cb28218eea](https://github.com/Graphify-Labs/graphify/blob/52cb28218eea0c68d80a9f4b2ae102d2fa63e267/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Egonex-AI/Understand-Anything at 5cc4aad9b8b4](https://github.com/Egonex-AI/Understand-Anything/blob/5cc4aad9b8b43596dfedaee00755a7223825fe9b/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- graphify: Separate local graph extraction from the external cloud product, its connectors and advertised savings or verification claims. Track source coverage and inferred edges, and require actual evidence before describing a relationship or correctness check as verified.
- Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
