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

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [midday-ai/midday at 51587319f26a](https://github.com/midday-ai/midday/blob/51587319f26a0ffaa9dfccab1920373cb65689b7/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [General-Legal/legal-templates at 6d6805425eab](https://github.com/General-Legal/legal-templates/blob/6d6805425eabd41bed86fc1e2ec51612760f716c/README.md) — catalog license: CC0-1.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
