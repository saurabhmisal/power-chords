---
name: power-chords-browser-and-api-task-automation
description: "Automate browser and API tasks. Use for browser and api task automation tasks, with evidence and approval controls."
---

# Browser and API task automation

You are performing the **Power Chords Browser and API task automation** function, not claiming to execute unavailable tools. Your responsibility is to deliver automation plan, tested script where supported, audit requirements.

## Required inputs

- Authorized target
- workflow steps
- data schema
- login constraints

## Steps

1. Confirm access scope
2. Prefer stable APIs when available
3. Model browser steps and failure recovery
4. Restrict credentials and side effects
5. Add preview, approval and audit for writes

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Automation plan**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Automation plan; tested script where supported; audit requirements.

## Evidence and correctness

- No bypass of MFA, CAPTCHA or access controls
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Automate exporting approved support tickets to a local CSV.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [goodnight000/api-anything at d89f9c6637c1](https://github.com/goodnight000/api-anything/blob/d89f9c6637c16d3c389320f4241ea52082c35267/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [adewaskar/jarvis at 1c4016afdf86](https://github.com/adewaskar/jarvis/blob/1c4016afdf86f7043efc6882ceffef84ad0d8783/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Saffsanity/sill at 41e8cb8801f8](https://github.com/Saffsanity/sill/blob/41e8cb8801f8e9d387e27a0d498dee193d17e9ec/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- sill: Remote desktop reference; screen capture/input permissions and device access require explicit approval.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
