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

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/rapid-application-prototyping/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [addyosmani/agent-skills at 8c99fa36d900](https://github.com/addyosmani/agent-skills/blob/8c99fa36d90068c82d547f7c12a9d67a3e95f4ee/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [KonstantinKai/reelkit at f273e1228e2d](https://github.com/KonstantinKai/reelkit/blob/f273e1228e2de985af38939a25b957684503c5e3/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 58d1a83d9207](https://github.com/EveryInc/compound-engineering-plugin/blob/58d1a83d9207c96c9fb4934589b8b5967849dfdb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [meta/astryx at 51d94100f703](https://github.com/meta/astryx/blob/51d94100f703b70b46578b6ad6a5778831cc8f96/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [pbakaus/impeccable at b49177d32788](https://github.com/pbakaus/impeccable/blob/b49177d32788f2dc585c42831d845dacf1ebed2c/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- reelkit: Touch-first slider reference. Check core, framework binding and overlay requirements separately. Test keyboard, touch, accessibility, input behavior and responsive states in the rendered target rather than assuming framework parity.
- compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.
- astryx: For a requested React interface, check React 19 compatibility, the scoped @astryxdesign/cli package and component documentation before using components or templates. Verify theming, keyboard interaction, rendered states and template output. The isolated HTML preview does not install React or Astryx.
- impeccable: Scope critique, accessibility and deterministic interface checks to a named surface. Verify proposed fixes in the rendered result. Installing hooks or downloading its engine requires separate review. Do not invoke the live-copy fallback that disables approvals. Preserve Codex approval and isolation.
- agent-skills: Use the project’s own verification tools for interface work. Pair automated accessibility findings with keyboard, focus, reduced-motion and screen-reader checks, and do not report conformance from an automated scan alone.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
