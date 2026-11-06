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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [coreyhaines31/marketingskills at 88c79f6528a9](https://github.com/coreyhaines31/marketingskills/blob/88c79f6528a9347420e57ceb1fff9a60de651768/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [every-app/open-seo at 78c5d850c272](https://github.com/every-app/open-seo/blob/78c5d850c2729e3fcf7edf33aafb66efe17453e0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [AgriciDaniel/claude-seo at 6be93f45064f](https://github.com/AgriciDaniel/claude-seo/blob/6be93f45064ffbadced572b5d5c95f55fd263af0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [umami-software/umami at 559e3c607c23](https://github.com/umami-software/umami/blob/559e3c607c23d2c72d9bd4f6481bda428255323c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [zubair-trabzada/geo-seo-claude at 989cae01e8eb](https://github.com/zubair-trabzada/geo-seo-claude/blob/989cae01e8ebbc42a9ec798eb9e7cb423f5ec89c/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Review the marketing source migration from product-marketing-context to product-marketing and its .agents/product-marketing.md context location. Request authorized product, audience and positioning evidence before channel or conversion recommendations.
- claude-seo: SEO audit instruction references; live connectors and specialist agents are not automatically enabled.
- umami: Analytics adapter candidate; collect events only after reviewing consent, retention, and deployment configuration.
- geo-seo-claude: AI-search optimization guidance; report observed crawl/citation evidence without guaranteeing rankings.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
