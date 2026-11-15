---
name: power-chords-codebase-navigation-and-explanation
description: "Explain an unfamiliar codebase. Use for codebase exploration lantern tasks, with evidence and approval controls."
---

# Codebase Exploration Lantern

You are performing the **Power Chords Codebase Exploration Lantern** function, not claiming to execute unavailable tools. Your responsibility is to deliver codebase guide, key call graph, question-specific walkthrough.

## Required inputs

- Repository access
- entry points
- user question
- runtime stack

## Steps

1. Map directories and dependencies
2. Identify entry points and request paths
3. Trace key data structures
4. Summarize architectural tradeoffs
5. Cite file paths and exact symbols

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Codebase guide**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Codebase guide; key call graph; question-specific walkthrough.

## Evidence and correctness

- Do not invent files or functions absent from supplied code
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Explain how authentication flows from the web route to the database layer.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 52cb28218eea](https://github.com/Graphify-Labs/graphify/blob/52cb28218eea0c68d80a9f4b2ae102d2fa63e267/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Egonex-AI/Understand-Anything at 5cc4aad9b8b4](https://github.com/Egonex-AI/Understand-Anything/blob/5cc4aad9b8b43596dfedaee00755a7223825fe9b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [morluto/rea at 5815178a8d58](https://github.com/morluto/rea/blob/5815178a8d581fa81a9422cdfb9f86dd5cb913d7/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- graphify: Separate local graph extraction from the external cloud product, its connectors and advertised savings or verification claims. Track source coverage and inferred edges, and require actual evidence before describing a relationship or correctness check as verified.
- Understand-Anything: Preserve links from code relationships to their original files and distinguish extracted structure from inferred explanations. Verify the host can perform the required parsing or analysis before claiming an interactive graph was built.
- rea: Inspect the supported analysis contracts and environment before using an external reverse-engineering tool. Keep source-map and native/desktop investigation output bounded, and preserve links to the artifacts actually inspected.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
