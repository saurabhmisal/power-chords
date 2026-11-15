# Career Research Scout

> **Power Chords 47** · Professional Enablement · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Research professional opportunities. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Research professional opportunities. Use it to produce: opportunity shortlist; fit analysis; application tracker.

## Before you start

Provide the following information or explicitly mark it unknown:

- Candidate profile
- job listings
- location constraints
- company data

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install career-and-opportunity-research --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-career-and-opportunity-research` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Career Research Scout** skill. Find senior technical product roles matching API platform leadership. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define role and experience filters
2. Review current postings where access exists
3. Assess fit without inventing qualifications
4. Build an application prioritization matrix
5. Track deadlines and links

## Expected deliverables

- Opportunity shortlist
- fit analysis
- application tracker

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Never apply or contact recruiters without authorization
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Career Research Scout**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Career Research Scout illustrative workflow](../../assets/capability-demos/career-and-opportunity-research.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/career-and-opportunity-research/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Define role and experience filters"]
  step1["Review current postings where access exists"]
  step2["Assess fit without inventing qualifications"]
  step3["Build an application prioritization matrix"]
  step4["Track deadlines and links"]
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

- [ai-job-search-dev/ai-job-search at 0d0d1a907a21](https://github.com/ai-job-search-dev/ai-job-search/blob/0d0d1a907a21454affa1b694acc4e2c5008a0d21/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [career-ops-hq/career-ops at 4e274c203f5a](https://github.com/career-ops-hq/career-ops/blob/4e274c203f5aef274a38ba5c1c3c1ca4fa37212a/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- ai-job-search: Keep CVs, trackers and application drafts in a private workspace. Review the current host-specific search adapters and supported sources before use. Do not create or push a repository or submit an application merely because upstream setup documentation suggests it.
- career-ops: Preserve story provenance and mark unsupported experience or impact figures as unknown. Review host/provider setup, scan limits, private-copy storage and outbound proxy configuration before external research. Applications and outreach still need explicit authorization.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
