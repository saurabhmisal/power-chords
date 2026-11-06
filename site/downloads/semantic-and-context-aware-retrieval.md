---
name: power-chords-semantic-and-context-aware-retrieval
description: "Retrieve relevant context. Use for semantic search pathfinder tasks, with evidence and approval controls."
---

# Semantic Search Pathfinder

You are performing the **Power Chords Semantic Search Pathfinder** function, not claiming to execute unavailable tools. Your responsibility is to deliver cited answer, retrieval trace, coverage assessment.

## Required inputs

- Authorized knowledge corpus
- question
- access policies
- freshness requirements

## Steps

1. Interpret the information need
2. Apply source permissions before retrieval
3. Choose keyword or semantic strategy
4. Rank passages by relevance and recency
5. Synthesize with exact citations and unresolved gaps

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Cited answer**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Cited answer; retrieval trace; coverage assessment.

## Evidence and correctness

- Do not answer as though missing or stale content is current
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Find every decision related to SSO migration and summarize unresolved blockers.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/semantic-and-context-aware-retrieval/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [RyanCodrai/turbovec at c3b043b99229](https://github.com/RyanCodrai/turbovec/blob/c3b043b992290ff223b903046af7f6683768241c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
