# Growth Experiments Momentum

> **Power Chords 46** · Marketing & Go-to-Market · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Optimize acquisition and conversion. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Optimize acquisition and conversion. Use it to produce: growth experiment backlog; measurement plan.

## Before you start

Provide the following information or explicitly mark it unknown:

- Channel and funnel data
- segment mix
- guardrail metrics

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install conversion-and-growth-experimentation --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-conversion-and-growth-experimentation` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Growth Experiments Momentum** skill. Design a test to raise demo-request conversion while protecting lead quality. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Map the acquisition-to-activation funnel
2. Locate high-confidence friction
3. Prioritize growth hypotheses
4. Design a controlled test
5. Track incrementality and downstream retention

## Expected deliverables

- Growth experiment backlog
- measurement plan

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Distinguish correlation from causal lift
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Growth Experiments Momentum**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `native_assistive`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Growth Experiments Momentum illustrative workflow](../../assets/capability-demos/conversion-and-growth-experimentation.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/conversion-and-growth-experimentation/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Map the acquisition-to-activation funnel"]
  step1["Locate high-confidence friction"]
  step2["Prioritize growth hypotheses"]
  step3["Design a controlled test"]
  step4["Track incrementality and downstream retention"]
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

- [coreyhaines31/marketingskills at 1f837447b20b](https://github.com/coreyhaines31/marketingskills/blob/1f837447b20bb6f0e72d87b80ece1c221c362c7d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [every-app/open-seo at 2df84ff91461](https://github.com/every-app/open-seo/blob/2df84ff91461cc55b6c8bb98f3ce0f195d2e463d/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [AgriciDaniel/claude-seo at cca7e4a26799](https://github.com/AgriciDaniel/claude-seo/blob/cca7e4a267991aca880efade1fd12e8498caf2ce/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [umami-software/umami at b18d5144dfe7](https://github.com/umami-software/umami/blob/b18d5144dfe7342edeeca6f61d13ba3baabed9ad/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [zubair-trabzada/geo-seo-claude at 989cae01e8eb](https://github.com/zubair-trabzada/geo-seo-claude/blob/989cae01e8ebbc42a9ec798eb9e7cb423f5ec89c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Review the marketing source migration from product-marketing-context to product-marketing and its .agents/product-marketing.md context location. Request authorized product, audience and positioning evidence before channel or conversion recommendations.
- claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled.
- umami: Before installing external analytics or collecting events, review database, secrets, deployment configuration, consent, data retention and access. Distinguish source events from acquisition and retention measures. This instruction pack does not configure an analytics server or default admin account.
- geo-seo-claude: AI-search optimization guidance; report observed crawl/citation evidence without guaranteeing rankings.
- marketingskills: Keep public marketing observations, experiment evidence and judgment calls distinct. Review connector access and planned recurring actions before activation. An available integration guide does not establish a working connection or permission to contact audiences.
- open-seo: Separate observed public page evidence from paid or authenticated research. Review connector consent, credit limits and public-URL validation before external SEO tools. Preserve the provider and request that produced each finding.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
