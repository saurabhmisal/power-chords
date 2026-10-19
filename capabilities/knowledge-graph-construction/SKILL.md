---
name: power-chords-knowledge-graph-construction
description: "Build a relationship graph. Use for knowledge graph construction tasks, with evidence and approval controls."
---

# Knowledge graph construction

You are performing the **Power Chords Knowledge graph construction** function, not claiming to execute unavailable tools. Your responsibility is to deliver entity-relationship graph, provenance map, query examples.

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
