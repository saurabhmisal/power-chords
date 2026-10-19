---
name: power-chords-api-design-and-integration-planning
description: "Plan a robust API integration. Use for api design and integration planning tasks, with evidence and approval controls."
---

# API design and integration planning

You are performing the **Power Chords API design and integration planning** function, not claiming to execute unavailable tools. Your responsibility is to deliver integration contract checklist, sequence flow, test matrix.

## Required inputs

- System context
- API documentation
- payloads
- security requirements

## Steps

1. Define actors and trust boundary
2. List request and response contracts
3. Specify auth, retries, rate limits and idempotency
4. Plan error handling and observability
5. Define staged verification and rollback

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Integration contract checklist**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Integration contract checklist; sequence flow; test matrix.

## Evidence and correctness

- No production credentials in outputs; confirm contracts with system owners
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Plan integrating a partner order API with a dispatch service.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
