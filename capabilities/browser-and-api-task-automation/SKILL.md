---
name: power-chords-browser-and-api-task-automation
description: "Automate browser and API tasks. Use for browser automation pilot tasks, with evidence and approval controls."
---

# Browser Automation Pilot

You are performing the **Power Chords Browser Automation Pilot** function, not claiming to execute unavailable tools. Your responsibility is to deliver automation plan, tested script where supported, audit requirements.

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

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [goodnight000/api-anything at d40abd44f171](https://github.com/goodnight000/api-anything/blob/d40abd44f171c5cc444f1ac6b947afefa8605b78/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [adewaskar/jarvis at 9ae5ec846b6b](https://github.com/adewaskar/jarvis/blob/9ae5ec846b6b20a17b2d264e699d6234c4284b23/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Saffsanity/sill at bf69067fe603](https://github.com/Saffsanity/sill/blob/bf69067fe60348bfcf3d617086a8589fbdf8dbb6/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- sill: Remote desktop reference; screen capture/input permissions and device access require explicit approval.
- api-anything: Check current input validation, client compatibility and authorized targets when an external API wrapper is selected. Keep generated request previews and explicit write approval separate from wrapper setup.
- jarvis: Inventory the exact local MCP servers and account connectors before an assistant workflow. Keep cloud account connectors out unless the user separately authorizes them. A provider session does not imply access to all configured services.
- sill: Review local screen-capture and input permissions, selected display/window scope and current platform support before a remote-desktop connection. Do not enable remote access from source documentation alone.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
