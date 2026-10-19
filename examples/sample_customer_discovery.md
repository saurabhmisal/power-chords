# Demo: Partner Integration Customer Discovery

> **Power Chords Workroom** · Customer Discovery → PRD · Evidence-grounded first draft
> **Important:** This document uses only submitted context, fixed review templates and explicitly labeled assumptions. It is not external research, fact verification, system integration, or customer validation.


## Mission

Reduce time to first successful order integration without double-processing.

## Source context

A fictional merchant operations team manually reconciles orders across three APIs. Their support inbox receives repeated complaints about missing status updates. During a simulated interview, a team member said retries can create duplicate records. We do not yet know the baseline completion rate, number of affected merchants, or the API contract. These are fictional notes for a product demo.

## Evidence ledger

| Reference | Evidence supplied | Classification |
|---|---|---|
| E01 | A fictional merchant operations team manually reconciles orders across three APIs. Their support inbox receives repeated complaints about missing status updates. During a simulated interview, a team member said retries can create duplicate records. We do not yet know the baseline completion rate, number of affected merchants, or | User-provided evidence |
| E02 | A fictional merchant operations team manually reconciles orders across three APIs. | User-provided evidence |
| E03 | Their support inbox receives repeated complaints about missing status updates. | User-provided evidence |
| E04 | During a simulated interview, a team member said retries can create duplicate records. | User-provided evidence |
| E05 | We do not yet know the baseline completion rate, number of affected merchants, or the API contract. | User-provided evidence |
| E06 | These are fictional notes for a product demo. | User-provided evidence |

## What is not established

- [ ] Confirm the actual customer/users and impacted workflow.
- [ ] Validate quantities, baseline metrics and dates against a trusted source.
- [ ] Confirm constraints and dependencies with responsible teams.

## Problem statement

**Provisional problem:** Reduce time to first successful order integration without double-processing.

**Supporting observations:**
- **E01:** A fictional merchant operations team manually reconciles orders across three APIs. Their support inbox receives repeated complaints about missing status updates. During a simulated interview, a team member said retries can create duplicate records. We do not yet know the baseline completion rate, number of affected merchants, or the API contract. These are fictional notes for a product demo.
- **E02:** A fictional merchant operations team manually reconciles orders across three APIs.
- **E03:** Their support inbox receives repeated complaints about missing status updates.

## User journey — hypothesis to validate

| Stage | Customer task | Friction to inspect | Verification |
|---|---|---|---|
| Discover | Understand available options | Missing or conflicting information | Observe 3 representative user sessions |
| Prepare | Gather prerequisite data | Manual handoffs / inconsistent inputs | List actual documents and systems |
| Execute | Complete core workflow | Delays, errors or rework | Baseline elapsed time and error frequency |
| Confirm | Verify successful outcome | Unclear state or missing feedback | Measure successful completion |

## Requirements draft

| Priority | Requirement / testable outcome | Evidence status |
|---|---|---|
| P0 | Describe and validate the end-to-end current state | Needs customer confirmation |
| P0 | Detect incomplete or invalid inputs before advancing | Hypothesis |
| P1 | Expose status, ownership, and actionable errors | Hypothesis |
| P1 | Capture completion and failure events | Hypothesis |

## Measurement & experiment plan

**Hypothesis:** Removing validated workflow friction will improve successful task completion.

**Primary outcome:** successful completion rate (definition and baseline pending).

**Guardrails:** error rate, operator workload, customer escalations.

**Design:** baseline first; then an approved controlled rollout or holdout where feasible.

**Decision rule:** Define the required lift, minimum sample and observation window with stakeholders before launch.

## PM review checklist

- [ ] Validate problem and user segment with customer.
- [ ] Review prototype and scope with engineering and design.
- [ ] Confirm constraints, ownership, metrics and rollout decision.

## Review and sign-off

**Draft status:** Review required. Human verification is needed before external use, publication, or customer commitments.

**Production actions performed:** None.

