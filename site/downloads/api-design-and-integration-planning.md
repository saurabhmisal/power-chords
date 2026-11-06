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

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [goodnight000/api-anything at d89f9c6637c1](https://github.com/goodnight000/api-anything/blob/d89f9c6637c16d3c389320f4241ea52082c35267/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [tt-a1i/archify at a4065941f12b](https://github.com/tt-a1i/archify/blob/a4065941f12be7967436261d9934784e381d423c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
