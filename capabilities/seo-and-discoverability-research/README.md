# SEO and discoverability research

> **Power Chords 43** · Marketing & Go-to-Market · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Audit discoverability and SEO. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Audit discoverability and SEO. Use it to produce: seo audit; content opportunity backlog.

## Before you start

Provide the following information or explicitly mark it unknown:

- Website
- audience
- target keywords
- performance metrics

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install seo-and-discoverability-research --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-seo-and-discoverability-research` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **SEO and discoverability research** skill. Audit discoverability for a B2B developer tooling landing page. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Inspect available pages and technical signals
2. Map intent to keywords
3. Identify content and technical gaps
4. Prioritize recommendations
5. Define measurement and review cadence

## Expected deliverables

- SEO audit
- content opportunity backlog

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Current ranking or traffic claims need fresh measurements
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

No native runtime adapter currently executes this capability independently. The skill supplies instructions and output rules to a host AI agent; operations requiring specialized tools must be carried out by tools that your agent actually supports.

**Implementation status:** `adapter_required`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [every-app/open-seo at 78c5d850c272](https://github.com/every-app/open-seo/blob/78c5d850c2729e3fcf7edf33aafb66efe17453e0/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [coreyhaines31/marketingskills at 88c79f6528a9](https://github.com/coreyhaines31/marketingskills/blob/88c79f6528a9347420e57ceb1fff9a60de651768/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Review the marketing source migration from product-marketing-context to product-marketing and its .agents/product-marketing.md context location. Request authorized product, audience and positioning evidence before channel or conversion recommendations.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
