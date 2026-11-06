# Release Readiness Runway

> **Power Chords 20** · Engineering & Integration · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Prepare a safe release. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Prepare a safe release. Use it to produce: release readiness checklist; runbook; rollback plan.

## Before you start

Provide the following information or explicitly mark it unknown:

- Release scope
- changelog
- test evidence
- deployment steps

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install deployment-and-release-readiness --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-deployment-and-release-readiness` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Release Readiness Runway** skill. Prepare release gates for a payment-adjacent partner API migration. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Review prerequisites and risks
2. Verify QA, performance and security gates
3. Plan phased rollout and monitoring
4. Document rollback and customer communications
5. Record go/no-go ownership

## Expected deliverables

- Release readiness checklist
- runbook
- rollback plan

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Never claim a deployment happened unless deployment logs confirm it
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Release Readiness Runway**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `native_assistive`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Release Readiness Runway illustrative workflow](../../assets/capability-demos/deployment-and-release-readiness.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/deployment-and-release-readiness/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Review prerequisites and risks"]
  step1["Verify QA, performance and security gates"]
  step2["Plan phased rollout and monitoring"]
  step3["Document rollback and customer communications"]
  step4["Record go/no-go ownership"]
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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [garrytan/gstack at 10770954f01c](https://github.com/garrytan/gstack/blob/10770954f01c72cb59a1c5aa0dd38ab9a2a77001/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [oblien/openship at b72c7922b9d0](https://github.com/oblien/openship/blob/b72c7922b9d0001d73755684c5fc0544c3b3b223/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [superplanehq/superplane at 37c6198b757b](https://github.com/superplanehq/superplane/blob/37c6198b757bb09bc00b1955da4ae1f238a06e39/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- superplane: Engineering orchestration candidate; service credentials, production writes and license need review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
