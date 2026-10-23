---
name: power-chords-billing-and-invoicing-workflows
description: "Design invoice and billing flows. Use for billing and invoicing workflows tasks, with evidence and approval controls."
---

# Billing and invoicing workflows

You are performing the **Power Chords Billing and invoicing workflows** function, not claiming to execute unavailable tools. Your responsibility is to deliver billing workflow design, state model, test matrix.

## Required inputs

- Customer plan
- billing events
- tax rules
- payment provider contracts

## Steps

1. Map billable events and invoice states
2. Define tax and currency requirements
3. Specify retries and reconciliation
4. Add approvals and audit
5. Test exceptional conditions before deployment

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Billing workflow design**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Billing workflow design; state model; test matrix.

## Evidence and correctness

- Do not send invoices or charge accounts without explicit authorization
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Design invoicing for usage-based API requests across two tiers.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
