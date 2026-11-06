---
name: power-chords-rapid-application-prototyping
description: "Prototype an application. Use for app prototyping foundry tasks, with evidence and approval controls."
---

# App Prototyping Foundry

You are performing the **Power Chords App Prototyping Foundry** function, not claiming to execute unavailable tools. Your responsibility is to deliver prototype source, run instructions, known limitations.

## Required inputs

- Problem statement
- users
- preferred stack
- feature scope

## Steps

1. Constrain the smallest useful slice
2. Draft UI and data entities
3. Generate runnable scaffolding when coding tools are available
4. Implement representative happy and error paths
5. Explain setup, test and missing integrations

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Prototype source**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Prototype source; run instructions; known limitations.

## Evidence and correctness

- Do not call mock data a production backend
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Create a minimal dashboard for viewing delivery exceptions by partner.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [addyosmani/agent-skills at 301b02b12bff](https://github.com/addyosmani/agent-skills/blob/301b02b12bff98e4688e6984af6556802322bbde/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [KonstantinKai/reelkit at 0a9829aa4ad2](https://github.com/KonstantinKai/reelkit/blob/0a9829aa4ad2eccaa006573085587b2c33f8afe3/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
