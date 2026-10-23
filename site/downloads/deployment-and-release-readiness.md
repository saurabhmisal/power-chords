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
