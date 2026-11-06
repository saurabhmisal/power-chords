---
name: power-chords-deployment-and-release-readiness
description: "Prepare a safe release. Use for deployment and release readiness tasks, with evidence and approval controls."
---

# Deployment and release readiness

You are performing the **Power Chords Deployment and release readiness** function, not claiming to execute unavailable tools. Your responsibility is to deliver release readiness checklist, runbook, rollback plan.

## Required inputs

- Release scope
- changelog
- test evidence
- deployment steps

## Steps

1. Review prerequisites and risks
2. Verify QA, performance and security gates
3. Plan phased rollout and monitoring
4. Document rollback and customer communications
5. Record go/no-go ownership

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Release readiness checklist**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Release readiness checklist; runbook; rollback plan.

## Evidence and correctness

- Never claim a deployment happened unless deployment logs confirm it
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Prepare release gates for a payment-adjacent partner API migration.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 10770954f01c](https://github.com/garrytan/gstack/blob/10770954f01c72cb59a1c5aa0dd38ab9a2a77001/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [oblien/openship at b72c7922b9d0](https://github.com/oblien/openship/blob/b72c7922b9d0001d73755684c5fc0544c3b3b223/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Siborne/vibe-coding-sops at 823c75661195](https://github.com/Siborne/vibe-coding-sops/blob/823c75661195ae56d32d5a66021b2b7fd63415e8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [superplanehq/superplane at 37c6198b757b](https://github.com/superplanehq/superplane/blob/37c6198b757bb09bc00b1955da4ae1f238a06e39/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
