# Codebase Exploration Lantern

> **Power Chords 17** · Engineering & Integration · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Explain an unfamiliar codebase. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Explain an unfamiliar codebase. Use it to produce: codebase guide; key call graph; question-specific walkthrough.

## Before you start

Provide the following information or explicitly mark it unknown:

- Repository access
- entry points
- user question
- runtime stack

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install codebase-navigation-and-explanation --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-codebase-navigation-and-explanation` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Codebase Exploration Lantern** skill. Explain how authentication flows from the web route to the database layer. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Map directories and dependencies
2. Identify entry points and request paths
3. Trace key data structures
4. Summarize architectural tradeoffs
5. Cite file paths and exact symbols

## Expected deliverables

- Codebase guide
- key call graph
- question-specific walkthrough

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not invent files or functions absent from supplied code
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Codebase Exploration Lantern**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Codebase Exploration Lantern illustrative workflow](../../assets/capability-demos/codebase-navigation-and-explanation.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/codebase-navigation-and-explanation/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Map directories and dependencies"]
  step1["Identify entry points and request paths"]
  step2["Trace key data structures"]
  step3["Summarize architectural tradeoffs"]
  step4["Cite file paths and exact symbols"]
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

- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [Egonex-AI/Understand-Anything at 98d6dca71240](https://github.com/Egonex-AI/Understand-Anything/blob/98d6dca712407b8cbf0bca21b539c197e5a7825c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [morluto/rea at bacc1e38464c](https://github.com/morluto/rea/blob/bacc1e38464ce7eb87ce1fb6fb552c6b1854ac15/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
