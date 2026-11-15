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

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 4bee369d4a41](https://github.com/garrytan/gstack/blob/4bee369d4a417fb82c6d43c0b79351428305ef10/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [affaan-m/ECC at d2ef2680594f](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DietrichGebert/ponytail at 96608e078b2d](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cloudflare/security-audit-skill at c1c8a8c14710](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [vxcontrol/pentagi at cffed9485aa1](https://github.com/vxcontrol/pentagi/blob/cffed9485aa1cca70762cd08a57ac62a80406258/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [pbakaus/impeccable at acb4cfe14470](https://github.com/pbakaus/impeccable/blob/acb4cfe14470b1fdf51e855431af618d936b7db8/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- security-audit-skill: Independent finding verification and target-scoped security review; security testing requires explicit authorization.
- pentagi: Security orchestration reference only; no scanning or exploitation without explicit authorized scope.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- impeccable: Use scoped critique, accessibility and design-check guidance without treating its output as a verified fix. Do not install hooks, download its engine or invoke live-copy fallback without separate review. Preserve Codex approvals and isolation.
- gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.
- impeccable: Scope a design critique or deterministic interface check to a named surface and verify proposed changes in the rendered result. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approval and isolation.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
