---
name: power-chords-debugging-testing-and-qa
description: "Investigate defects systematically. Use for debugging & qa sentinel tasks, with evidence and approval controls."
---

# Debugging & QA Sentinel

You are performing the **Power Chords Debugging & QA Sentinel** function, not claiming to execute unavailable tools. Your responsibility is to deliver bug triage report, reproduction steps, regression checklist.

## Required inputs

- Bug report
- logs
- reproduction
- code access
- expected behavior

## Steps

1. Form a minimal reproduction
2. Compare observed and expected states
3. Narrow likely causes using evidence
4. Propose instrumentation and targeted fixes
5. Define regression tests and rollback

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Bug triage report**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Bug triage report; reproduction steps; regression checklist.

## Evidence and correctness

- Do not claim a fix is tested without running tests
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Diagnose why an idempotent webhook is still creating duplicate records.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/debugging-testing-and-qa/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 41729a023ecf](https://github.com/garrytan/gstack/blob/41729a023ecf4c8c41d95ad69c666f2fd619c8fb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [affaan-m/ECC at 4adeee6732a1](https://github.com/affaan-m/ECC/blob/4adeee6732a12d1540f49a4d50a38ce8c97f9a53/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DietrichGebert/ponytail at 96608e078b2d](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cloudflare/security-audit-skill at c1c8a8c14710](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [vxcontrol/pentagi at cffed9485aa1](https://github.com/vxcontrol/pentagi/blob/cffed9485aa1cca70762cd08a57ac62a80406258/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 58d1a83d9207](https://github.com/EveryInc/compound-engineering-plugin/blob/58d1a83d9207c96c9fb4934589b8b5967849dfdb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [pbakaus/impeccable at b49177d32788](https://github.com/pbakaus/impeccable/blob/b49177d32788f2dc585c42831d845dacf1ebed2c/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- security-audit-skill: Independent finding verification and target-scoped security review; security testing requires explicit authorization.
- pentagi: Security orchestration reference only; no scanning or exploitation without explicit authorized scope.
- compound-engineering-plugin: Select planning, implementation, review and knowledge-capture steps that match the task. Retain evidence and decisions for later work. Add reviewer roles for material risks and report only reviews actually performed. Host plugins require separate installation review.
- impeccable: Scope critique, accessibility and deterministic design checks to a named surface, and verify proposed changes in the rendered result. Guidance is not proof of a fix. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approvals and isolation.
- gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested. Before validation, record the reviewed revision and identify local edits that could change the result. Preserve failed and flaky attempts alongside successful retries rather than reporting only the final pass.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
