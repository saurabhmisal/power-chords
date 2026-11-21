---
name: power-chords-operational-command-center-design
description: "Coordinate operational performance. Use for operations planning cockpit tasks, with evidence and approval controls."
---

# Operations Planning Cockpit

You are performing the **Power Chords Operations Planning Cockpit** function, not claiming to execute unavailable tools. Your responsibility is to deliver operations cockpit specification, action register.

## Required inputs

- Objectives
- team updates
- incidents
- service metrics

## Steps

1. Identify operating KPIs and thresholds
2. Map commitments and owners
3. Design a decision-first dashboard
4. Add alerting and escalation paths
5. Separate operational facts from recommendations

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Operations cockpit specification**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Operations cockpit specification; action register.

## Evidence and correctness

- No live operational status without connected evidence
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Design a daily command center for delayed enterprise onboardings.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/operational-command-center-design/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Bennettxai/FounderOS at b44a3c5b418b](https://github.com/Bennettxai/FounderOS/blob/b44a3c5b418bb462e677a5f583f7e8e75da26590/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [adewaskar/jarvis at 9ae5ec846b6b](https://github.com/adewaskar/jarvis/blob/9ae5ec846b6b20a17b2d264e699d6234c4284b23/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [spacedriveapp/spacedrive at a7655f297780](https://github.com/spacedriveapp/spacedrive/blob/a7655f2977807b8de06175bcbb4002e693e2bff9/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- jarvis: Inventory the exact local MCP servers and account connectors before an assistant workflow. Keep cloud account connectors out unless the user separately authorizes them. A provider session does not imply access to all configured services.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
