# Semantic and context-aware retrieval

> **Power Chords 09** · Document Intelligence · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Retrieve relevant context. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Retrieve relevant context. Use it to produce: cited answer; retrieval trace; coverage assessment.

## Before you start

Provide the following information or explicitly mark it unknown:

- Authorized knowledge corpus
- question
- access policies
- freshness requirements

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install semantic-and-context-aware-retrieval --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-semantic-and-context-aware-retrieval` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Semantic and context-aware retrieval** skill. Find every decision related to SSO migration and summarize unresolved blockers. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Interpret the information need
2. Apply source permissions before retrieval
3. Choose keyword or semantic strategy
4. Rank passages by relevance and recency
5. Synthesize with exact citations and unresolved gaps

## Expected deliverables

- Cited answer
- retrieval trace
- coverage assessment

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not answer as though missing or stale content is current
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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [Graphify-Labs/graphify at 16218bfc80d4](https://github.com/Graphify-Labs/graphify/blob/16218bfc80d4ca2799734d045039f7ed1a5fa9fb/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [RyanCodrai/turbovec at c3b043b99229](https://github.com/RyanCodrai/turbovec/blob/c3b043b992290ff223b903046af7f6683768241c/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Lethe044/hermes-life-os at 5a572ba5f24c](https://github.com/Lethe044/hermes-life-os/blob/5a572ba5f24c227b987c22e0b4fe06e2bdba6975/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Shubhamsaboo/awesome-llm-apps at c129f31036f5](https://github.com/Shubhamsaboo/awesome-llm-apps/blob/c129f31036f5ba0bba42cbb63937a66946fdf2c0/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Distinguish extracted relationships from inferred graph edges; graph traversal is not vector similarity. Record the parsing or model-backed ingestion path used for each source.
- awesome-llm-apps: Example-agent and RAG patterns; examples are not preconfigured or security-reviewed Power Chords integrations.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
