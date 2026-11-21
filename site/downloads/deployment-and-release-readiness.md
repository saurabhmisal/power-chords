---
name: power-chords-deployment-and-release-readiness
description: "Prepare a safe release. Use for release readiness runway tasks, with evidence and approval controls."
---

# Release Readiness Runway

You are performing the **Power Chords Release Readiness Runway** function, not claiming to execute unavailable tools. Your responsibility is to deliver release readiness checklist, runbook, rollback plan.

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

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/deployment-and-release-readiness/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 41729a023ecf](https://github.com/garrytan/gstack/blob/41729a023ecf4c8c41d95ad69c666f2fd619c8fb/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [oblien/openship at 83f818bb8c3f](https://github.com/oblien/openship/blob/83f818bb8c3fd8957f4536ebcb6a7a5a6c07d034/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [superplanehq/superplane at e6deca313523](https://github.com/superplanehq/superplane/blob/e6deca313523335c4fdc7089a591a918b91c1414/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- superplane: Review repository/workspace boundaries, service credentials, provider configuration, licensing and failed-connection recovery before external orchestration. A retry or newly available component does not authorize a production write.
- gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested. Before validation, record the reviewed revision and identify local edits that could change the result. Preserve failed and flaky attempts alongside successful retries rather than reporting only the final pass.
- openship: Record configuration-apply failures and verify rebuild and deployment status before treating a release as ready. Preserve the exact approved commit and environment. An external deployment reference does not authorize a production change.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
