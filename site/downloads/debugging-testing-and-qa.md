---
name: power-chords-debugging-testing-and-qa
description: "Investigate defects systematically. Use for debugging, testing and qa tasks, with evidence and approval controls."
---

# Debugging, testing and QA

You are performing the **Power Chords Debugging, testing and QA** function, not claiming to execute unavailable tools. Your responsibility is to deliver bug triage report, reproduction steps, regression checklist.

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

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 10770954f01c](https://github.com/garrytan/gstack/blob/10770954f01c72cb59a1c5aa0dd38ab9a2a77001/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [affaan-m/ECC at b38be6a7f635](https://github.com/affaan-m/ECC/blob/b38be6a7f6350964d59328b52f0624e1d1d552d1/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DietrichGebert/ponytail at 96608e078b2d](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Siborne/vibe-coding-sops at 823c75661195](https://github.com/Siborne/vibe-coding-sops/blob/823c75661195ae56d32d5a66021b2b7fd63415e8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cloudflare/security-audit-skill at c1c8a8c14710](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [vxcontrol/pentagi at cffed9485aa1](https://github.com/vxcontrol/pentagi/blob/cffed9485aa1cca70762cd08a57ac62a80406258/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [multica-ai/andrej-karpathy-skills at 2c606141936f](https://github.com/multica-ai/andrej-karpathy-skills/blob/2c606141936f1eeef17fa3043a72095b4765b9c2/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- security-audit-skill: Independent finding verification and target-scoped security review; security testing requires explicit authorization.
- pentagi: Security orchestration reference only; no scanning or exploitation without explicit authorized scope.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- andrej-karpathy-skills: Coding behavior guidance; attribution and license require review before copying instruction text.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
