---
name: power-chords-codebase-navigation-and-explanation
description: "Explain an unfamiliar codebase. Use for codebase navigation and explanation tasks, with evidence and approval controls."
---

# Codebase navigation and explanation

You are performing the **Power Chords Codebase navigation and explanation** function, not claiming to execute unavailable tools. Your responsibility is to deliver codebase guide, key call graph, question-specific walkthrough.

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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Egonex-AI/Understand-Anything at 98d6dca71240](https://github.com/Egonex-AI/Understand-Anything/blob/98d6dca712407b8cbf0bca21b539c197e5a7825c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [morluto/rea at bacc1e38464c](https://github.com/morluto/rea/blob/bacc1e38464ce7eb87ce1fb6fb552c6b1854ac15/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [abhishekcheriangeorge-ops/vibe-code-docs-stack at 2a8b2b1923d6](https://github.com/abhishekcheriangeorge-ops/vibe-code-docs-stack/blob/2a8b2b1923d668db996f65434f5cecb5b9475849/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
