# Debugging & QA Sentinel

> **Power Chords 19** · Engineering & Integration · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Investigate defects systematically. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Investigate defects systematically. Use it to produce: bug triage report; reproduction steps; regression checklist.

## Before you start

Provide the following information or explicitly mark it unknown:

- Bug report
- logs
- reproduction
- code access
- expected behavior

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install debugging-testing-and-qa --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-debugging-testing-and-qa` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Debugging & QA Sentinel** skill. Diagnose why an idempotent webhook is still creating duplicate records. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Form a minimal reproduction
2. Compare observed and expected states
3. Narrow likely causes using evidence
4. Propose instrumentation and targeted fixes
5. Define regression tests and rollback

## Expected deliverables

- Bug triage report
- reproduction steps
- regression checklist

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not claim a fix is tested without running tests
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Debugging & QA Sentinel**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `native_assistive`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Debugging & QA Sentinel illustrative workflow](../../assets/capability-demos/debugging-testing-and-qa.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/debugging-testing-and-qa/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Form a minimal reproduction"]
  step1["Compare observed and expected states"]
  step2["Narrow likely causes using evidence"]
  step3["Propose instrumentation and targeted fixes"]
  step4["Define regression tests and rollback"]
  review["Review evidence and validate deliverables"]
  approval{"External action approved?"}
  finish["Deliver or publish approved result"]
  input --> step0
  step0 --> step1
  step1 --> step2
  step2 --> step3
  step3 --> step4
  step4 --> review
  review --> approval
  approval -- Yes --> finish
  approval -- Revise --> step0
```

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 4bee369d4a41](https://github.com/garrytan/gstack/blob/4bee369d4a417fb82c6d43c0b79351428305ef10/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [affaan-m/ECC at d2ef2680594f](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DietrichGebert/ponytail at 96608e078b2d](https://github.com/DietrichGebert/ponytail/blob/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [cloudflare/security-audit-skill at c1c8a8c14710](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [vxcontrol/pentagi at cffed9485aa1](https://github.com/vxcontrol/pentagi/blob/cffed9485aa1cca70762cd08a57ac62a80406258/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at ee46dde75a40](https://github.com/EveryInc/compound-engineering-plugin/blob/ee46dde75a40e297bd8eac4055a410a771d3ac1d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [pbakaus/impeccable at acb4cfe14470](https://github.com/pbakaus/impeccable/blob/acb4cfe14470b1fdf51e855431af618d936b7db8/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- security-audit-skill: Independent finding verification and target-scoped security review; security testing requires explicit authorization.
- pentagi: Security orchestration reference only; no scanning or exploitation without explicit authorized scope.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- impeccable: Use scoped critique, accessibility and design-check guidance without treating its output as a verified fix. Do not install hooks, download its engine or invoke live-copy fallback without separate review. Preserve Codex approvals and isolation.
- gstack: Keep edit, test and review evidence attached to the change that produced it. Review the selected update channel and host permissions before external installation. A source workflow or claimed CI result is not evidence that the current Power Chords output was tested.
- compound-engineering-plugin: Use the planning, review and knowledge-capture steps that match the task. Preserve evidence and decisions where later work can find them, and choose additional reviewer roles for material risk rather than claiming unrun reviews.
- impeccable: Scope a design critique or deterministic interface check to a named surface and verify proposed changes in the rendered result. Do not install hooks, download an engine or invoke the live-copy fallback that disables approvals. Any future integration must preserve Codex approval and isolation.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
