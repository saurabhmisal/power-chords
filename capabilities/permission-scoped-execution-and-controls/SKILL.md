---
name: power-chords-permission-scoped-execution-and-controls
description: "Enforce access and approvals. Use for permission controls vault tasks, with evidence and approval controls."
---

# Permission Controls Vault

You are performing the **Power Chords Permission Controls Vault** function, not claiming to execute unavailable tools. Your responsibility is to deliver permission matrix, action policy, audit checklist.

## Required inputs

- Actors
- resource scope
- data classification
- action categories

## Steps

1. Inventory sensitive operations
2. Assign least-privilege scopes
3. Separate read from write actions
4. Add approval checkpoints and revocation
5. Design audit logging and retention

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Permission matrix**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Permission matrix; action policy; audit checklist.

## Evidence and correctness

- Never treat an instruction prompt as a security sandbox
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Define a permissions model for an agent reading tickets and drafting replies.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [affaan-m/ECC at b38be6a7f635](https://github.com/affaan-m/ECC/blob/b38be6a7f6350964d59328b52f0624e1d1d552d1/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [goodnight000/api-anything at d89f9c6637c1](https://github.com/goodnight000/api-anything/blob/d89f9c6637c16d3c389320f4241ea52082c35267/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cloudflare/security-audit-skill at c1c8a8c14710](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [vxcontrol/pentagi at cffed9485aa1](https://github.com/vxcontrol/pentagi/blob/cffed9485aa1cca70762cd08a57ac62a80406258/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Select one reviewed install method per host; inventory existing skills and hooks before adding agent harnesses. Shared workflow context does not imply shared credentials or permissions.
- security-audit-skill: Independent finding verification and target-scoped security review; security testing requires explicit authorization.
- pentagi: Security orchestration reference only; no scanning or exploitation without explicit authorized scope.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
