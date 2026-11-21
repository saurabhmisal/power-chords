# Campaign Content Amplifier

> **Power Chords 45** · Marketing & Go-to-Market · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Produce multi-channel campaigns. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Produce multi-channel campaigns. Use it to produce: campaign briefs; draft copy; creative asset specs.

## Before you start

Provide the following information or explicitly mark it unknown:

- Value proposition
- brand guidance
- customer evidence
- audience

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install campaigns-and-content-production --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-campaigns-and-content-production` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Campaign Content Amplifier** skill. Draft a launch sequence for a new invoicing feature. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define campaign message hierarchy
2. Draft channel-specific copy
3. Create reusable assets with supported tools
4. Design approval and experimentation
5. Check claims against evidence

## Expected deliverables

- Campaign briefs
- draft copy
- creative asset specs

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not publish or impersonate people without authorization
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Campaign Content Amplifier**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Campaign Content Amplifier illustrative workflow](../../assets/capability-demos/campaigns-and-content-production.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/campaigns-and-content-production/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Define campaign message hierarchy"]
  step1["Draft channel-specific copy"]
  step2["Create reusable assets with supported tools"]
  step3["Design approval and experimentation"]
  step4["Check claims against evidence"]
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

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [coreyhaines31/marketingskills at 5b2b400eec1e](https://github.com/coreyhaines31/marketingskills/blob/5b2b400eec1e7e1cec76245a715d0b0d4fd2a9c1/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [raunakpatil/youtube-agentic-ai-studio at 22be5d044138](https://github.com/raunakpatil/youtube-agentic-ai-studio/blob/22be5d044138def44e96f0b26a2f1be66f491452/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lemomo-ai/lemo-opuscar at f9e204293930](https://github.com/lemomo-ai/lemo-opuscar/blob/f9e204293930952b61ba921cd8944d05f121beee/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [OpenMontageInc/OpenMontage at 2e003e65fa99](https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [hypit-ai/hypit at 9a6f688c3982](https://github.com/hypit-ai/hypit/blob/9a6f688c39829857d50dc596fa1218565585a9da/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [ethanplusai/sellbird at b212385259da](https://github.com/ethanplusai/sellbird/blob/b212385259da92246a56311d790d936e75dd70dd/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Review the marketing source migration from product-marketing-context to product-marketing and its .agents/product-marketing.md context location. Request authorized product, audience and positioning evidence before channel or conversion recommendations.
- lemo-opuscar: Check component-specific notices in LICENSE and LICENSES before reusing code, film styles or media. The source is recorded as NOASSERTION, so the earlier MIT catalog label is not a blanket grant. Install and validate the rendering toolchain separately, and distinguish style references from a verified rendered film. Review documentation, code and film permissions separately. Third-party narration, characters and marks remain outside the source’s grant even when included in a complete film.
- OpenMontage: The canonical source moved to OpenMontageInc/OpenMontage. Preserve earlier attribution and review AGPL requirements, the external media toolchain, service access and asset permissions before production use.
- hypit: Video variation reference; verify license, consent, likeness rights and source-asset permissions before reuse.
- harvey: The current original is Sellbird, formerly Harvey, and declares AGPL-3.0. Review configuration and data-home migration and license requirements before reuse. Account research and drafting do not authorize outreach or mailbox access. Sending messages or accessing mail requires explicit authorization.
- marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences. Check vendor-guide claims against the provider’s primary documentation when they affect a decision. Disclose relevant commercial relationships, distinguish tool fit from a recommendation, and verify actual connector access rather than relying on a registry label.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
